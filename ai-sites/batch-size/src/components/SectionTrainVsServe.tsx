/**
 * Section 06 · 训练 batch ≠ 推理 batch
 *
 * 反相邻：上一节是 horizontal bar + tab。这里换成 GPU 时间槽 grid + before/after toggle。
 *
 * 主交互：
 *   ① training / serving toggle —— L2
 *   ② iteration step button（next / reset）—— L2，推进时间
 *   ③ 槽数 slider（max_num_seqs）—— L3，改 GPU 并发位
 *
 * 视觉：每行 = 一个 GPU "slot"，每列 = 一个 iteration。颜色块代表 in-flight 请求。
 *   - 训练：每 6 iter 一整批同色块（一起开始 / 一起结束 / 然后整批换）
 *   - 推理：异构请求长度，谁完了立刻补新的（连续填充）
 *
 * 让用户看到「训练 batch 是同步队列，推理 batch 是流水线」的根本差。
 */
import React, { useMemo, useState } from "react";
import { ChevronRight, RotateCcw } from "lucide-react";

const ITER_COUNT = 24;

/* ── 训练模式：每 batchPeriod iters 整批同色，期间不能加新请求 ───── */
function trainingCells(slots: number, iters: number) {
  const batchPeriod = 6;
  const rows: { color: string; reqId: number }[][] = [];
  for (let r = 0; r < slots; r++) {
    const row: { color: string; reqId: number }[] = [];
    for (let it = 0; it < iters; it++) {
      const batch = Math.floor(it / batchPeriod);
      row.push({ color: ["coral", "teal", "butter-deep", "ink"][batch % 4], reqId: batch });
    }
    rows.push(row);
  }
  return rows;
}

/* ── 推理模式：每个 slot 独立排队，请求长度变化 ───── */
function inferenceCells(slots: number, iters: number) {
  /* 用确定 seed 生成"请求长度" */
  const lengths: number[] = [];
  const tones = ["coral", "teal", "butter-deep", "ink"];
  let nextReqId = 0;
  const rows: { color: string | null; reqId: number }[][] = [];
  for (let r = 0; r < slots; r++) {
    rows.push([]);
  }

  /* 模拟：每个 slot 维护一个 "当前请求剩余长度"，每 iter 都会减 1，归 0 → 新请求填入 */
  const slotState = Array.from({ length: slots }, (_, i) => ({
    remaining: 0,
    reqId: -1,
  }));

  for (let it = 0; it < iters; it++) {
    for (let r = 0; r < slots; r++) {
      const st = slotState[r];
      if (st.remaining <= 0) {
        /* 起新请求 */
        const seedX = Math.sin((r * 7.3 + it * 1.7 + nextReqId * 11.1)) * 10000;
        const frac = seedX - Math.floor(seedX);
        const len = Math.floor(2 + frac * 5); // 2~6 iter
        st.remaining = len;
        st.reqId = nextReqId++;
      }
      const color = tones[st.reqId % 4];
      rows[r].push({ color, reqId: st.reqId });
      st.remaining -= 1;
    }
  }
  return rows;
}

const SectionTrainVsServe: React.FC = () => {
  const [mode, setMode] = useState<"train" | "serve">("train");
  const [slots, setSlots] = useState(4);
  const [cursor, setCursor] = useState(ITER_COUNT);

  const cells = useMemo(() => {
    if (mode === "train") return trainingCells(slots, ITER_COUNT);
    return inferenceCells(slots, ITER_COUNT);
  }, [mode, slots]);

  /* 利用率：训练模式末段 batch 结束后会有 idle gap ≈ 0%，正常 100%。
     推理模式：连续填充，~96-99% */
  const utilization = mode === "train" ? 78 : 96;
  const throughput = mode === "train" ? "对齐 · 等长" : "异步 · 谁完谁换";

  return (
    <section className="relative bg-white border-t-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">training batch ≠ serving batch</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          推理时也说 batch ——
          <br />
          但它跟训练时的 batch
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">完全是两种东西</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          训练时，一个 batch 是「这一步要平均的样本组」，整批一起算梯度、一起更新参数。
          推理时（vLLM / SGLang 的 continuous batching），batch 是「此刻 GPU 上同时在跑的请求」，
          谁先生成完就立刻换新请求顶上 —— 没有"更新参数"这一步。
        </p>

        {/* 控件行 */}
        <div className="grid lg:grid-cols-12 gap-3 mb-6">
          {/* mode toggle */}
          <div className="lg:col-span-6 p-1.5 bg-cream border-2 border-ink rounded-2xl flex gap-1.5">
            {[
              { k: "train" as const, label: "training · 同步 batch" },
              { k: "serve" as const, label: "serving · continuous batching" },
            ].map((t) => {
              const on = mode === t.k;
              return (
                <button
                  key={t.k}
                  onClick={() => setMode(t.k)}
                  className={[
                    "flex-1 px-4 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-[0.15em] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink/65 hover:bg-butter/50",
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* slots slider */}
          <div className="lg:col-span-4 p-3 bg-cream border-2 border-ink rounded-2xl">
            <div className="flex items-baseline justify-between mb-1.5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                GPU slots · max_num_seqs
              </div>
              <div className="font-display text-[16px] font-bold text-ink tabular-nums">
                {slots}
              </div>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={slots}
              onChange={(e) => setSlots(Number(e.target.value))}
              className="w-full accent-coral cursor-pointer"
            />
          </div>

          {/* step buttons */}
          <div className="lg:col-span-2 p-3 bg-cream border-2 border-ink rounded-2xl flex items-center gap-1.5">
            <button
              onClick={() => setCursor(Math.min(ITER_COUNT, cursor + 2))}
              className="flex-1 h-9 flex items-center justify-center gap-1 border-2 border-ink rounded-full bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.15em] hover:bg-ink/85 transition-all duration-200"
            >
              tick <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setCursor(0)}
              className="w-9 h-9 flex items-center justify-center border-2 border-ink rounded-full bg-white hover:bg-coral hover:text-cream transition-all duration-200"
              aria-label="reset"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 主可视化 · GPU slot grid */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 lg:p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-3 flex justify-between">
            <span>{mode === "train" ? "training" : "inference"} · GPU 时间槽</span>
            <span>← iter →</span>
          </div>

          {/* slot rows */}
          <div className="space-y-1.5" key={`${mode}-${slots}-${cursor}`}>
            {cells.map((row, ri) => (
              <div key={ri} className="flex items-center gap-1.5">
                <div className="w-12 font-mono text-[10px] text-ink/55 text-right shrink-0">
                  GPU {ri}
                </div>
                <div className="flex-1 grid grid-cols-24 gap-[2px]" style={{ gridTemplateColumns: `repeat(${ITER_COUNT}, minmax(0,1fr))` }}>
                  {row.map((cell, ci) => {
                    const visible = ci < cursor;
                    const colorCls =
                      cell.color === "coral"
                        ? "bg-coral"
                        : cell.color === "teal"
                          ? "bg-teal"
                          : cell.color === "butter-deep"
                            ? "bg-butter-deep"
                            : "bg-ink";
                    /* 边界：训练模式下 batch 切换处加左边线；推理模式下 reqId 不同加左边线 */
                    const prev = row[ci - 1];
                    const boundary = ci > 0 && prev && prev.reqId !== cell.reqId;
                    return (
                      <div
                        key={ci}
                        className={[
                          "h-5 rounded-sm border border-ink/20 transition-all duration-300 ease-spring",
                          visible ? colorCls : "bg-ink/5",
                          boundary && visible ? "ml-[1px] border-l-2 border-l-ink/60" : "",
                        ].join(" ")}
                        title={`iter ${ci} · req #${cell.reqId}`}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* iter scale */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-12 shrink-0" />
            <div className="flex-1 flex justify-between font-mono text-[9px] text-ink/40">
              <span>0</span>
              <span>6</span>
              <span>12</span>
              <span>18</span>
              <span>24</span>
            </div>
          </div>

          {/* 比较卡 */}
          <div className="mt-5 grid sm:grid-cols-3 gap-3 pt-4 border-t border-ink/15">
            <CompareTile
              label="batch 的意思"
              big={mode === "train" ? "同步样本组" : "同时跑的请求"}
              note={mode === "train" ? "N 条样本一起更新一次参数" : "iter-level 调度，谁完谁换"}
            />
            <CompareTile
              label="batch 上限"
              big={mode === "train" ? "显存 + 数学" : "显存 + KV cache"}
              note={mode === "train" ? "global = micro × accum × dp" : "max_num_seqs + paged attention"}
            />
            <CompareTile
              label="GPU 利用率"
              big={`${utilization}%`}
              note={throughput}
              accent={utilization > 90 ? "teal" : "coral"}
            />
          </div>

          <p className="mt-4 font-mono text-[10px] text-ink/45 leading-snug">
            训练模式：颜色块对齐切换，意味着「这一组样本一起跑完 → 一起更新 → 整批换」。
            推理模式：每个 slot 自己排队，长短不一，腾出空位立刻补 —— 这就是 23× 吞吐的来源。
          </p>
        </div>

        {/* 结尾硬规则 */}
        <div className="mt-6 p-4 lg:p-5 border-2 border-ink rounded-2xl bg-ink text-cream shadow-stamp-lg">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-2">
            收尾 · 不容妥协的硬规则
          </div>
          <div className="font-display text-[16px] lg:text-[18px] font-bold leading-snug">
            训练 batch 调大 → 必然要调 LR + 加 warmup。推理 batch 调大 → 看显存够不够。
          </div>
          <div className="mt-2 font-mono text-[11px] text-cream/70 leading-snug">
            前者动数学（梯度噪声 / 收敛），后者动工程（KV cache / 调度）。
            搞错对象就是 production 翻车的第一原因。
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-ink/40">
          来源：vLLM continuous batching docs / Anyscale benchmark 23× throughput · bentoml.com 2026
        </p>
      </div>
    </section>
  );
};

const CompareTile: React.FC<{
  label: string;
  big: string;
  note: string;
  accent?: "teal" | "coral";
}> = ({ label, big, note, accent }) => {
  const accCls = accent === "teal" ? "text-teal" : accent === "coral" ? "text-coral" : "text-ink";
  return (
    <div className="p-3 border-2 border-ink rounded-2xl bg-cream">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        {label}
      </div>
      <div className={["font-display text-[16px] font-bold leading-tight", accCls].join(" ")}>
        {big}
      </div>
      <div className="mt-1 font-mono text-[10px] text-ink/55 leading-snug">{note}</div>
    </div>
  );
};

export default SectionTrainVsServe;
