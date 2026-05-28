/**
 * Section 05 · 3D 并行：DP × TP × PP
 *
 * 三个维度独立 stepper（约束乘积 = 16 GPU）。
 * 视觉 = 16 GPU 的 PP 分组 + 内部 TP×DP 网格。区别于 Hero 的「N 个并排柱」和 ZeRO 的「4×3 网格」。
 *
 * 三轴含义：
 *   DP (Data Parallel) · 数据并行 · 每组吃不同 batch · ZeRO 在这一维里发力
 *   TP (Tensor Parallel) · 张量并行 · 一层矩阵乘横切到多卡（Megatron 风）
 *   PP (Pipeline Parallel) · 流水线并行 · 模型按层切到多卡，流水跑
 *
 * 数据来源：
 *   Llama 3.1 405B pretrain · TP=8, PP=8, VP=2, CP=4, 总 512 GPU
 *     来自 docs.nvidia.com/nemo/megatron-bridge/latest/models/llm/llama3.html
 *   3D 并行通论：deepspeedai/DeepSpeed README · DeepSpeed-MoE 论文
 */
import React, { useState } from "react";

/* 合法的 DP × TP × PP = 16 组合 */
type Combo = { dp: number; tp: number; pp: number };

const COMBOS: Combo[] = [
  { dp: 16, tp: 1, pp: 1 },
  { dp: 8, tp: 2, pp: 1 },
  { dp: 4, tp: 4, pp: 1 },
  { dp: 4, tp: 2, pp: 2 },
  { dp: 2, tp: 4, pp: 2 },
  { dp: 2, tp: 2, pp: 4 },
  { dp: 1, tp: 4, pp: 4 },
  { dp: 1, tp: 8, pp: 2 },
];

const PRESETS: { label: string; combo: Combo; note: string }[] = [
  {
    label: "7B · 单机 8 卡 ×2",
    combo: { dp: 16, tp: 1, pp: 1 },
    note: "纯 ZeRO 数据并行就够",
  },
  {
    label: "70B · 双机训练",
    combo: { dp: 4, tp: 4, pp: 1 },
    note: "一层切到 4 卡，4 份梯度",
  },
  {
    label: "175B · 大节点",
    combo: { dp: 2, tp: 4, pp: 2 },
    note: "层也切、行也切，再 DP",
  },
  {
    label: "405B 风格 (缩到 16 卡)",
    combo: { dp: 1, tp: 4, pp: 4 },
    note: "Llama 3 405B 用 TP=8,PP=8 · 这是缩小演示",
  },
];

const Section3D: React.FC = () => {
  const [combo, setCombo] = useState<Combo>(COMBOS[2]);

  const isValid = (c: Combo) => c.dp * c.tp * c.pp === 16;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">3D parallelism</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          16 张 GPU 怎么切？
          <br />
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">三维切，每维管不同事</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          ZeRO 只管「数据」这一维。模型一旦大到一层的矩阵都装不下，
          还要靠 <strong className="text-ink">张量并行 (TP)</strong> 把一层切到多卡、
          <strong className="text-ink">流水线并行 (PP)</strong> 把模型按层切到多卡。
          三者一起就是 <strong className="text-ink">3D 并行</strong>。下面调三个数字看 16 张卡怎么变。
        </p>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：3 个 stepper + 预设 */}
          <div className="lg:col-span-5 space-y-3">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 space-y-4">
              <div className="flex items-baseline justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  三维切法
                </div>
                <div className="font-mono text-[11px] text-ink/45">
                  DP × TP × PP = {combo.dp * combo.tp * combo.pp}
                </div>
              </div>
              <Stepper
                axis="DP"
                full="Data Parallel · 数据并行"
                detail="不同卡吃不同 batch · ZeRO 在这里发力"
                color="coral"
                value={combo.dp}
                onChange={(v) => {
                  const next = { ...combo, dp: v };
                  if (isValid(next)) setCombo(next);
                  else {
                    /* 自动找最接近的合法解 */
                    const match = COMBOS.find((c) => c.dp === v);
                    if (match) setCombo(match);
                  }
                }}
                options={[1, 2, 4, 8, 16]}
              />
              <Stepper
                axis="TP"
                full="Tensor Parallel · 张量并行"
                detail="一层的矩阵乘横切 · Megatron 风"
                color="teal"
                value={combo.tp}
                onChange={(v) => {
                  const next = { ...combo, tp: v };
                  if (isValid(next)) setCombo(next);
                  else {
                    const match = COMBOS.find((c) => c.tp === v);
                    if (match) setCombo(match);
                  }
                }}
                options={[1, 2, 4, 8]}
              />
              <Stepper
                axis="PP"
                full="Pipeline Parallel · 流水并行"
                detail="模型按层切 · 一批数据流过整条线"
                color="butter-deep"
                value={combo.pp}
                onChange={(v) => {
                  const next = { ...combo, pp: v };
                  if (isValid(next)) setCombo(next);
                  else {
                    const match = COMBOS.find((c) => c.pp === v);
                    if (match) setCombo(match);
                  }
                }}
                options={[1, 2, 4, 8]}
              />
            </div>

            {/* 预设 */}
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ── 或者用真实预设
              </div>
              <div className="space-y-1.5">
                {PRESETS.map((p) => {
                  const on =
                    p.combo.dp === combo.dp &&
                    p.combo.tp === combo.tp &&
                    p.combo.pp === combo.pp;
                  return (
                    <button
                      key={p.label}
                      onClick={() => setCombo(p.combo)}
                      className={[
                        "w-full text-left px-3 py-2 rounded-lg border-2 transition-all duration-200",
                        on
                          ? "border-ink bg-ink text-cream shadow-stamp"
                          : "border-ink/20 bg-white text-ink hover:border-ink hover:-translate-y-0.5",
                      ].join(" ")}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-display text-[13.5px] font-bold">
                          {p.label}
                        </span>
                        <span
                          className={[
                            "font-mono text-[10px]",
                            on ? "text-butter" : "text-ink/45",
                          ].join(" ")}
                        >
                          {p.combo.dp}·{p.combo.tp}·{p.combo.pp}
                        </span>
                      </div>
                      <div
                        className={[
                          "text-[11.5px] mt-0.5",
                          on ? "text-cream/65" : "text-ink/55",
                        ].join(" ")}
                      >
                        {p.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：16 GPU 网格 */}
          <div className="lg:col-span-7 bg-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
            <div className="flex items-baseline justify-between mb-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter">
                16 GPUs · {combo.dp}D × {combo.tp}T × {combo.pp}P
              </div>
              <div className="font-mono text-[10px] text-cream/45">
                来源 · NVIDIA Megatron Bridge 2026
              </div>
            </div>

            <GpuLayout combo={combo} />

            {/* 三色图例 */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px]">
              <Legend color="bg-coral" label="DP rank · 不同 batch" />
              <Legend color="bg-teal" label="TP rank · 同层不同列" />
              <Legend color="bg-butter-deep" label="PP stage · 不同层" />
            </div>

            <div className="mt-5 px-3 py-2.5 bg-cream/10 border border-cream/15 rounded-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter/80 mb-1">
                解读
              </div>
              <p className="text-[13.5px] text-cream/90 leading-relaxed">
                {readout(combo)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function readout(c: Combo): string {
  if (c.dp === 16) {
    return "纯数据并行：16 卡都跑同一份模型，各吃不同 batch，梯度对齐。ZeRO 拆这一维就够。";
  }
  if (c.tp >= 4 && c.pp >= 2) {
    return `每层先横切到 ${c.tp} 卡（TP），又把整个模型按层切成 ${c.pp} 段流水（PP）。${
      c.dp > 1 ? `剩下 ${c.dp} 路复制各吃不同 batch。` : "几乎没有数据复制。"
    } Llama 3 405B 走这条路。`;
  }
  if (c.tp >= 4) {
    return `每层切到 ${c.tp} 卡上算（TP），${c.dp} 份复制吃不同 batch。TP 用于一层装不下时。`;
  }
  if (c.pp >= 2) {
    return `模型按层切成 ${c.pp} 段流水（PP），${c.dp} 份复制各吃 batch。PP 让 micro-batch 同时在不同段上跑。`;
  }
  return `${c.dp} 路数据并行，每层 TP=${c.tp} 横切。常见的「双机 70B」就长这样。`;
}

const Stepper: React.FC<{
  axis: string;
  full: string;
  detail: string;
  color: "coral" | "teal" | "butter-deep";
  value: number;
  options: number[];
  onChange: (v: number) => void;
}> = ({ axis, full, detail, color, value, options, onChange }) => {
  const bg = { coral: "bg-coral", teal: "bg-teal", "butter-deep": "bg-butter-deep" }[color];
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1">
        <div className="flex items-baseline gap-2">
          <span className={`px-1.5 py-0.5 ${bg} border border-ink rounded font-mono text-[10px] font-bold text-ink`}>
            {axis}
          </span>
          <span className="font-display text-[13.5px] font-bold text-ink">{full.split(" · ")[1]}</span>
        </div>
        <span className="font-display text-[22px] font-bold text-ink tabular-nums leading-none">
          {value}
        </span>
      </div>
      <div className="font-mono text-[10.5px] text-ink/55 mb-2">{detail}</div>
      <div className="grid grid-cols-5 gap-1">
        {options.map((opt) => {
          const on = opt === value;
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              className={[
                "py-1 rounded border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                on
                  ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                  : "bg-white text-ink hover:bg-cream",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * 16 GPU 网格布局
 *
 * 外层：PP 个组（横向排列，代表「模型不同段」）
 * 每组内部：DP × TP 矩阵（DP 行 × TP 列）
 * 颜色：
 *   - PP 用 butter-deep / butter / butter-soft 三档区分
 *   - TP 在每个 PP 组内用 teal / cream 交替
 *   - DP rank 用数字标
 */
const GpuLayout: React.FC<{ combo: Combo }> = ({ combo }) => {
  const ppGroups = Array.from({ length: combo.pp });
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${combo.pp}, minmax(0, 1fr))` }}
      key={`${combo.dp}-${combo.tp}-${combo.pp}`}
    >
      {ppGroups.map((_, ppIdx) => (
        <div
          key={ppIdx}
          className="border-2 border-butter rounded-xl p-2.5 bg-cream/5 animate-enter-fade"
          style={{ animationDelay: `${ppIdx * 60}ms` }}
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-butter mb-1.5 text-center">
            PP {ppIdx} · 层 {Math.floor((ppIdx * 80) / combo.pp)}–{Math.floor(((ppIdx + 1) * 80) / combo.pp) - 1}
          </div>
          <div className="flex justify-center">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: `repeat(${combo.tp}, 38px)` }}
            >
              {Array.from({ length: combo.dp * combo.tp }).map((_, k) => {
                const dpIdx = Math.floor(k / combo.tp);
                const tpIdx = k % combo.tp;
                const tpColor = tpIdx % 2 === 0 ? "bg-teal" : "bg-cream";
                const tpText = tpIdx % 2 === 0 ? "text-cream" : "text-ink";
                return (
                  <div
                    key={k}
                    className={`${tpColor} ${tpText} border-2 border-ink rounded-md w-[38px] h-[38px] flex flex-col items-center justify-center`}
                    title={`DP=${dpIdx} · TP=${tpIdx} · PP=${ppIdx}`}
                  >
                    <span className="font-mono text-[9px] font-bold leading-none">
                      D{dpIdx}
                    </span>
                    <span className="font-mono text-[8px] opacity-75 leading-none mt-0.5">
                      T{tpIdx}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className={`w-2.5 h-2.5 ${color} border border-ink rounded-sm`} />
    <span className="font-mono text-cream/75">{label}</span>
  </span>
);

export default Section3D;
