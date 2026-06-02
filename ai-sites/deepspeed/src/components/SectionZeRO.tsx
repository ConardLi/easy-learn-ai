/**
 * Section 03 · ZeRO 怎么拆？单步 trace
 *
 * 主交互：4 步 trace（Stage 0 → 1 → 2 → 3），按 Prev / Next / 直接点 4 个 chip 跳。
 * 4 GPU × 3 状态（参数 / 梯度 / 优化器）网格：
 *   ─ 满色块 = 该 GPU 持有完整副本
 *   ─ 1/N 切片 = 该 GPU 只持有自己那一份
 * 右侧 panel：当前 stage 的「省了什么 / 多了什么通信 / 70B 单卡需要多少」
 *
 * 数据：emergentmind.com/topics/zero-redundancy-optimizer-zero 2025-2026 综合
 *   stage 内存对应 P+G+S/D · P/D+G+S/D · (P+G+S)/D
 * 通信量 · DP=2P · ZeRO-1,2=(G+1)P · ZeRO-3=(G+2)P
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Stage = 0 | 1 | 2 | 3;

type StageData = {
  id: Stage;
  label: string;
  /** 三状态在 4 卡上的分布：true = 完整副本，false = 1/N */
  layout: { params: boolean; grads: boolean; opt: boolean };
  memory70BText: string;
  comm: string;
  pros: string;
  cons: string;
  oneLiner: string;
};

const STAGES: StageData[] = [
  {
    id: 0,
    label: "ZeRO-0",
    layout: { params: true, grads: true, opt: true },
    memory70BText: "每卡 840 GB · 装不下",
    comm: "AllReduce(grads)",
    pros: "通信最少，等于最普通的多卡训练（PyTorch DDP）",
    cons: "什么都没拆 · 单卡装不下就是装不下",
    oneLiner: "数据并行。每张卡都存一整份。",
  },
  {
    id: 1,
    label: "ZeRO-1",
    layout: { params: true, grads: true, opt: false },
    memory70BText: "每卡 350 GB · 还是装不下",
    comm: "ReduceScatter(grads) + AllGather(weights)",
    pros: "只拆优化器状态 · 4× 显存收益、通信几乎不变",
    cons: "梯度和参数仍是每卡全份",
    oneLiner: "先拆最占地方的优化器状态，分到 N 张卡。",
  },
  {
    id: 2,
    label: "ZeRO-2",
    layout: { params: true, grads: false, opt: false },
    memory70BText: "每卡 175 GB · 还要再拆",
    comm: "ReduceScatter(grads) + AllGather(weights)",
    pros: "再拆梯度 · 8× 总收益、通信量不变",
    cons: "参数仍是全份 · 推荐绝大多数训练用 stage",
    oneLiner: "梯度也拆。这是 2026 大多数训练的甜蜜点。",
  },
  {
    id: 3,
    label: "ZeRO-3",
    layout: { params: false, grads: false, opt: false },
    memory70BText: "每卡 105 GB · 8 卡能塞下 70B",
    comm: "AllGather(weights)/层 + ReduceScatter(grads)",
    pros: "三件全拆 · 显存 ≈ 12P/N，N 卡完全摊薄",
    cons: "每一层都要现拉参数 · 通信 +50%",
    oneLiner: "参数也拆。每层算之前现凑、算完丢掉。",
  },
];

const SectionZeRO: React.FC = () => {
  const [cursor, setCursor] = useState<Stage>(0);
  const data = STAGES[cursor];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">how zero shards</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          ZeRO 有四档，
          <br />
          越往后每张卡占的
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">显存越少</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          ZeRO（Zero Redundancy Optimizer，零冗余优化器）是 DeepSpeed 的核心。
          它把训练占显存的三块 ——<strong className="text-ink">参数 / 梯度 / 优化器状态</strong>—— 从「每张卡都存一整份」改成「每张卡只存 1/N」。
          四个档（stage）一档比一档拆得多。点下面单步看 4 张卡上每块怎么变。
        </p>

        {/* stage chip */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 self-center mr-2">
            stage
          </span>
          {STAGES.map((s) => {
            const on = s.id === cursor;
            return (
              <button
                key={s.id}
                onClick={() => setCursor(s.id)}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:-translate-y-0.5 hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => setCursor((c) => (Math.max(0, c - 1) as Stage))}
              disabled={cursor === 0}
              className="p-1.5 rounded-full border-2 border-ink bg-white hover:bg-cream disabled:opacity-30 transition"
              aria-label="上一步"
            >
              <ChevronLeft className="w-4 h-4 text-ink" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setCursor((c) => (Math.min(3, c + 1) as Stage))}
              disabled={cursor === 3}
              className="p-1.5 rounded-full border-2 border-ink bg-white hover:bg-cream disabled:opacity-30 transition"
              aria-label="下一步"
            >
              <ChevronRight className="w-4 h-4 text-ink" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setCursor(0)}
              className="p-1.5 rounded-full border-2 border-ink bg-white hover:bg-cream transition"
              aria-label="重置"
            >
              <RotateCcw className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 主体：左 = 4 GPU 网格 · 右 = stage 说明 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 4 GPU 网格 */}
          <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7">
            <div className="flex items-baseline justify-between mb-4">
              <div className="font-display text-[18px] font-bold text-ink">{data.label}</div>
              <div className="font-mono text-[11px] text-coral font-bold">{data.oneLiner}</div>
            </div>

            <ZeROGrid layout={data.layout} key={cursor} />

            <p className="mt-3 font-mono text-[10.5px] text-ink/50 leading-snug">
              P / G / S = 参数 / 梯度 / 优化器状态，N = 一共几张卡。满色块 = 整份都在这张卡；切片 = 只存自己那 1/N。
            </p>

            {/* 内存公式 */}
            <div className="mt-4 px-3 py-2.5 bg-cream border-2 border-ink rounded-lg flex items-baseline justify-between gap-4">
              <div className="font-mono text-[11px] text-ink/65">
                单卡内存公式 ·{" "}
                <span className="font-bold text-ink">
                  {data.id === 0 && "P + G + S"}
                  {data.id === 1 && "P + G + S/N"}
                  {data.id === 2 && "P + G/N + S/N"}
                  {data.id === 3 && "(P + G + S) / N"}
                </span>
              </div>
              <div className="font-display text-[14px] font-bold text-ink">
                70B · 8 卡 → {data.memory70BText}
              </div>
            </div>
          </div>

          {/* stage 说明卡 */}
          <div className="lg:col-span-5 bg-ink text-cream rounded-3xl shadow-stamp-lg p-6 lg:p-7 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 bg-butter text-ink rounded font-mono text-[10px] font-bold tracking-wide">
                {data.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
                step {cursor + 1} / 4
              </span>
            </div>

            <h3 className="font-display text-[26px] lg:text-[30px] font-bold leading-tight mb-3">
              {data.oneLiner}
            </h3>

            <div className="space-y-3 mt-2">
              <Row label="通信" value={data.comm} mono />
              <Row label="得到" value={data.pros} />
              <Row label="代价" value={data.cons} tone="coral" />
            </div>

            <div className="mt-3 px-3 py-2 bg-cream/10 border border-cream/15 rounded-lg">
              <span className="inline-block px-1.5 py-0.5 bg-butter/80 text-ink rounded font-mono text-[8.5px] font-bold tracking-wide mr-1.5 align-middle">
                进阶
              </span>
              <span className="text-[11.5px] text-cream/70 leading-snug">
                AllReduce / ReduceScatter / AllGather 是卡和卡之间的几种数据交换动作 —— 把各卡的梯度汇总对齐、把拆开的参数片段凑齐。记成「卡间对账」就行。
              </span>
            </div>

            <div className="mt-auto pt-6">
              <div className="px-3 py-2.5 bg-cream/10 border border-cream/20 rounded-lg">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter/80 mb-1">
                  70B 训练 · 8 GPU
                </div>
                <p className="font-display text-[16px] font-bold leading-snug">
                  {data.memory70BText}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-ink/40">
          来源 · emergentmind.com/topics/zero-redundancy-optimizer-zero · ZeRO arXiv:1910.02054
        </p>
      </div>
    </section>
  );
};

/**
 * 4 GPU × 3 状态网格
 *
 * 每张 GPU 一个宽列，三行（参数/梯度/优化器）。
 * 满色 = 完整副本；切片 = 1/4 高亮（彩色），其他 3/4 是浅 ghost
 */
const ZeROGrid: React.FC<{
  layout: { params: boolean; grads: boolean; opt: boolean };
}> = ({ layout }) => {
  const rows = [
    { id: "params", label: "参数 P", color: "bg-coral", full: layout.params },
    { id: "grads", label: "梯度 G", color: "bg-butter-deep", full: layout.grads },
    { id: "opt", label: "优化器 S", color: "bg-teal", full: layout.opt },
  ];
  return (
    <div className="space-y-3 animate-enter-fade">
      {rows.map((row) => (
        <div key={row.id}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
              {row.label}
            </div>
            <div
              className={[
                "font-mono text-[10px] font-bold px-1.5 py-0.5 rounded",
                row.full ? "bg-coral/15 text-coral" : "bg-teal/15 text-teal",
              ].join(" ")}
            >
              {row.full ? "全份 · 每卡 P" : "分摊 · 每卡 P/N"}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              if (row.full) {
                /* 整块满色 */
                return (
                  <div
                    key={i}
                    className={`h-14 ${row.color} border-2 border-ink rounded-lg flex items-center justify-center`}
                  >
                    <span className="font-mono text-[10px] font-bold text-ink/85">
                      GPU{i}
                    </span>
                  </div>
                );
              }
              /* 切片：只有自己那 1/4 高亮，其他 3/4 是 ghost */
              return (
                <div
                  key={i}
                  className="relative h-14 bg-cream border-2 border-ink rounded-lg flex overflow-hidden"
                >
                  {[0, 1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className={[
                        "flex-1 border-r border-ink/15 last:border-r-0",
                        j === i ? row.color : "bg-cream",
                      ].join(" ")}
                    />
                  ))}
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold text-ink/70 pointer-events-none">
                    GPU{i}
                  </span>
                </div>
              );
            })}
          </div>
          {!row.full && (
            <div className="mt-1 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="text-center font-mono text-[9px] text-ink/45"
                >
                  GPU{i} · 1/4
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Row: React.FC<{
  label: string;
  value: string;
  mono?: boolean;
  tone?: "coral";
}> = ({ label, value, mono, tone }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55 mb-0.5">
      {label}
    </div>
    <p
      className={[
        "leading-snug",
        mono ? "font-mono text-[12.5px]" : "text-[13.5px]",
        tone === "coral" ? "text-coral" : "text-cream/90",
      ].join(" ")}
    >
      {value}
    </p>
  </div>
);

export default SectionZeRO;
