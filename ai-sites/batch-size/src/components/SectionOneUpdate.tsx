/**
 * Section 02 · 一次更新到底发生了什么
 *
 * 反相邻：上一节用了 slider，这里用 single-step trace + chip pill。
 *
 * 主交互：
 *   ① 5 步 trace（next / prev / reset）——「拿一个 batch → forward → backward → 求平均 → 更新」
 *   ② batch 大小 chip pill 切换（2 / 8 / 32），改变可视化里的样本盒数
 *   ③ hover 单个样本盒：看 loss / gradient 数（基础礼貌不算）
 *
 * 教育意图：让用户真切看到「batch 是一个整步里被平均的样本组」，
 *   而不是 quantization 数轴吸附那种空间隐喻。
 */
import React, { useMemo, useState } from "react";
import { Play, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

const BATCH_OPTIONS = [
  { n: 2, label: "batch=2" },
  { n: 8, label: "batch=8" },
  { n: 32, label: "batch=32" },
];

const PHASES = [
  { k: "load", title: "拿一批样本", note: "从 dataset 里抓 N 条", chip: "① load" },
  { k: "forward", title: "正向算 loss", note: "每条样本各算一个错值", chip: "② forward" },
  { k: "backward", title: "反向算梯度", note: "每条样本各得一个梯度向量", chip: "③ backward" },
  { k: "avg", title: "梯度求平均", note: "N 条梯度按算术平均合一", chip: "④ average" },
  { k: "step", title: "参数更新一步", note: "θ ← θ − η · ∇̄", chip: "⑤ step" },
] as const;

/* 用伪随机但确定的"样本 loss"，避免每次渲染抖 */
function pseudoLoss(seed: number): number {
  const x = Math.sin(seed * 91.3) * 10000;
  return 0.35 + Math.abs((x - Math.floor(x))) * 1.4; // 0.35~1.75
}

function pseudoGrad(seed: number): number {
  const x = Math.sin(seed * 31.7 + 2.4) * 10000;
  return ((x - Math.floor(x)) - 0.5) * 2; // -1 ~ +1
}

const SectionOneUpdate: React.FC = () => {
  const [batch, setBatch] = useState(8);
  const [phase, setPhase] = useState(0);

  /* 当前 batch 的样本 list */
  const samples = useMemo(() => {
    return Array.from({ length: batch }, (_, i) => ({
      id: i,
      loss: pseudoLoss(i + batch * 7),
      grad: pseudoGrad(i + batch * 7),
    }));
  }, [batch]);

  const meanGrad =
    samples.reduce((s, x) => s + x.grad, 0) / samples.length;

  /* 不同 batch 的 wall-clock 估算：每 step 的 GPU 时间 ≈ 0.1s × log(batch)+1，
     epoch 用 50k 样本算 */
  const epochSamples = 50_000;
  const stepsPerEpoch = epochSamples / batch;
  const secondsPerStep = 0.08 + 0.05 * Math.log2(batch); // 越大 step 越慢，但 step 数变少
  const totalSec = stepsPerEpoch * secondsPerStep;

  const cur = PHASES[phase];

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">one update · step by step</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          点一次「更新」按钮，模型里
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">真正发生了</span>
          </span>
          这五件事。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          batch 不是一组装饰品。它就是这一步里被平均的那 N 条样本 ——
          N 越大，平均结果越像「真梯度」，但每一步要扛的算力和显存也越多。
        </p>

        {/* 控制条：左 step 按钮 / 右 batch pill */}
        <div className="grid sm:grid-cols-12 gap-4 mb-6">
          {/* step 控制 */}
          <div className="sm:col-span-7 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                phase {phase + 1} / 5 · {cur.chip}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPhase(Math.max(0, phase - 1))}
                  disabled={phase === 0}
                  className="w-9 h-9 flex items-center justify-center border-2 border-ink rounded-full bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-butter transition-all duration-200"
                  aria-label="prev"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setPhase(Math.min(PHASES.length - 1, phase + 1))}
                  disabled={phase === PHASES.length - 1}
                  className="px-4 h-9 flex items-center gap-1.5 border-2 border-ink rounded-full bg-ink text-cream font-mono text-[11px] uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-ink/85 transition-all duration-200"
                >
                  next <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setPhase(0)}
                  className="w-9 h-9 flex items-center justify-center border-2 border-ink rounded-full bg-white hover:bg-coral hover:text-cream transition-all duration-200"
                  aria-label="reset"
                >
                  <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            {/* 当前 phase 标题 */}
            <div className="font-display text-[24px] font-bold text-ink leading-tight">
              {cur.title}
            </div>
            <div className="mt-1 text-[13px] text-ink/60">{cur.note}</div>
          </div>

          {/* batch pill */}
          <div className="sm:col-span-5 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              choose batch
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {BATCH_OPTIONS.map((b) => {
                const on = b.n === batch;
                return (
                  <button
                    key={b.n}
                    onClick={() => {
                      setBatch(b.n);
                      setPhase(0);
                    }}
                    className={[
                      "py-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink/70 hover:bg-butter",
                    ].join(" ")}
                  >
                    {b.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 font-mono text-[10px]">
              <div className="text-ink/55">每 epoch · {Math.round(stepsPerEpoch)} 步</div>
              <div className="text-ink/55 text-right">≈ {totalSec.toFixed(0)} 秒</div>
            </div>
          </div>
        </div>

        {/* 主可视化：N 个样本盒 + 一条梯度合并箭头 + 一个参数球 */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 overflow-hidden">
          <div
            key={`trace-${batch}-${phase}`}
            className="grid lg:grid-cols-12 gap-6"
          >
            {/* 左：样本盒网格 */}
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① this batch · {batch} samples
              </div>
              <div
                className={[
                  "grid gap-1.5 p-2 rounded-xl border-2",
                  phase >= 0 ? "border-ink/30 bg-cream/40" : "border-ink/0",
                  batch === 2 ? "grid-cols-2" : batch === 8 ? "grid-cols-4" : "grid-cols-8",
                ].join(" ")}
              >
                {samples.map((s, i) => (
                  <SampleBox
                    key={s.id}
                    idx={i}
                    loss={s.loss}
                    grad={s.grad}
                    phase={phase}
                  />
                ))}
              </div>

              {/* 平均梯度条 */}
              {phase >= 3 && (
                <div className="mt-5 p-4 border-2 border-ink rounded-2xl bg-butter/40 animate-enter-up">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    ④ average gradient · ∇̄
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-ink/10 rounded-full overflow-hidden border border-ink/20">
                      <div
                        className="h-full bg-ink transition-all duration-500 ease-spring"
                        style={{
                          width: `${Math.abs(meanGrad) * 50 + 20}%`,
                          marginLeft: meanGrad < 0 ? `${50 - Math.abs(meanGrad) * 50 - 20}%` : "50%",
                        }}
                      />
                    </div>
                    <div className="font-mono text-[14px] font-bold tabular-nums text-ink">
                      {meanGrad >= 0 ? "+" : ""}
                      {meanGrad.toFixed(3)}
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-[10px] text-ink/55">
                    把 {batch} 条样本的梯度取算术平均 = 这一步用的方向
                  </div>
                </div>
              )}
            </div>

            {/* 右：参数 θ 球 + 公式 */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ⑤ model params · θ
              </div>
              <div className="relative h-[180px] border-2 border-ink rounded-2xl bg-cream/40 overflow-hidden">
                {/* loss landscape 暗示 */}
                <svg viewBox="0 0 320 180" className="absolute inset-0 w-full h-full" aria-hidden>
                  <path
                    d="M 0 110 Q 80 50 160 110 T 320 110"
                    stroke="#241C15"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.25"
                  />
                  <path
                    d="M 0 130 Q 80 70 160 130 T 320 130"
                    stroke="#241C15"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.15"
                  />
                  {/* θ 球 · phase >= 4 时朝 mean grad 方向滑一格 */}
                  <g
                    className="transition-transform duration-700 ease-spring"
                    style={{
                      transform:
                        phase >= 4
                          ? `translate(${meanGrad > 0 ? 60 : -60}px, ${meanGrad > 0 ? -10 : -10}px)`
                          : "translate(0,0)",
                    }}
                  >
                    <circle cx="160" cy="100" r="14" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
                    <text
                      x="160"
                      y="105"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="11"
                      fontWeight="700"
                      fill="#FBEFE3"
                    >
                      θ
                    </text>
                  </g>
                  {phase >= 4 && (
                    <text
                      x="160"
                      y="155"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fill="#241C15"
                      opacity="0.65"
                    >
                      moved by η · ∇̄
                    </text>
                  )}
                </svg>
              </div>

              <div className="mt-4 p-3 border-2 border-ink rounded-xl bg-ink text-cream font-mono text-[13px]">
                <span className="text-butter">θ</span>
                <span className="text-ink-tertiary mx-2">←</span>
                <span className="text-butter">θ</span>
                <span className="text-coral mx-2">−</span>
                <span className="text-cream">η</span>
                <span className="text-ink-tertiary mx-1">·</span>
                <span className="text-cream">∇̄</span>
                <span className="text-ink-tertiary mx-2">where</span>
                <span className="text-cream">∇̄ = mean of {batch} grads</span>
              </div>

              <p className="mt-3 font-mono text-[10px] text-ink/55 leading-snug">
                把 batch 从 2 调到 32，每一步用的平均梯度更稳，但每秒能跑的"步"数下降。
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-ink/40">
          ※ 标准 SGD / Adam 一致：每个 step 都是「N 条样本 → 平均梯度 → 一次参数更新」。
        </p>
      </div>
    </section>
  );
};

const SampleBox: React.FC<{
  idx: number;
  loss: number;
  grad: number;
  phase: number;
}> = ({ idx, loss, grad, phase }) => {
  const seenLoaded = phase >= 0;
  const seenLoss = phase >= 1;
  const seenGrad = phase >= 2;
  const seenAvg = phase >= 3;

  return (
    <div
      title={`sample #${idx} · loss ${loss.toFixed(2)} · grad ${grad >= 0 ? "+" : ""}${grad.toFixed(2)}`}
      className={[
        "relative rounded-md border-2 border-ink p-1.5 aspect-square flex flex-col items-center justify-center transition-all duration-300 ease-spring",
        seenAvg
          ? "bg-ink/15"
          : seenGrad
            ? "bg-coral/30"
            : seenLoss
              ? "bg-butter/70"
              : seenLoaded
                ? "bg-white"
                : "bg-cream",
      ].join(" ")}
    >
      <div className="font-mono text-[8px] text-ink/55 leading-none mb-0.5">
        #{idx}
      </div>
      {seenLoss && (
        <div className="font-mono text-[9px] font-bold text-ink leading-none">
          {loss.toFixed(2)}
        </div>
      )}
      {seenGrad && (
        <div
          className={[
            "font-mono text-[8.5px] leading-none mt-0.5",
            grad >= 0 ? "text-teal" : "text-coral",
          ].join(" ")}
        >
          {grad >= 0 ? "↑" : "↓"}
          {Math.abs(grad).toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default SectionOneUpdate;
