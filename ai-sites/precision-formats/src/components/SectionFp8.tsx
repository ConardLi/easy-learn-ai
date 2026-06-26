/**
 * Section 05 · FP8 + 混合精度，2026 现状
 *
 * 讲两件事：
 *   1. 混合精度：训练时分开对待 —— 算得快的部分用低精度，要准的部分用高精度，混着来
 *   2. FP8 在 2026 已经从推理走进训练（DeepSeek-V3 用 FP8 训练；NVIDIA Blackwell 原生支持 FP8/FP6/FP4）
 *
 * 交互：pill 切换「全程 FP32 / 混合精度」，对比同一训练流程里各步用什么格式 + 整体收益。
 */
import React, { useState } from "react";

type Mode = "fp32" | "mixed";

type StepInfo = {
  step: string;
  fmt32: string;
  fmtMixed: string;
  why: string;
};

const FLOW: StepInfo[] = [
  { step: "前向计算（算预测）", fmt32: "FP32", fmtMixed: "FP8 / BF16", why: "量大、对精度不敏感，用低精度算得快、省显存" },
  { step: "反向计算（算梯度）", fmt32: "FP32", fmtMixed: "FP8 / BF16", why: "同样量大，低精度足够" },
  { step: "更新权重（攒变化）", fmt32: "FP32", fmtMixed: "FP32", why: "误差会累积，这步保留高精度，别让小数丢光" },
];

const SectionFp8: React.FC = () => {
  const [mode, setMode] = useState<Mode>("mixed");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">fp8 &amp; mixed precision · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          训练时不同步骤，用不同格式
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-9">
          <p>
            训练就是模型反复猜答案、对答案、改自己。这里的「改自己」要算出每个数字该往哪调（叫<span className="font-bold">梯度</span>），再把调整累加到模型那堆数字（叫<span className="font-bold">权重</span>）上。
          </p>
          <p>
            这些步骤里，有的算量大但不怕糙，有的一糙就出错。聪明的做法是分开对待：能用低精度的地方用低精度图快，要紧的地方留高精度保准。这叫<span className="font-bold">混合精度</span>。
          </p>
          <p>
            切换下面两种模式，看同一套训练流程里每步用什么格式。
          </p>
        </div>

        {/* 模式切换 */}
        <div className="inline-flex gap-1.5 p-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-8">
          {(["fp32", "mixed"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={[
                "px-5 py-2 rounded-full font-semibold text-[14px] transition-all duration-250 ease-spring",
                mode === m ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
              ].join(" ")}
            >
              {m === "fp32" ? "全程 FP32" : "混合精度"}
            </button>
          ))}
        </div>

        {/* 流程 */}
        <div className="space-y-3 mb-8">
          {FLOW.map((f, i) => {
            const fmt = mode === "fp32" ? f.fmt32 : f.fmtMixed;
            const isHigh = fmt === "FP32";
            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
                <div className="flex items-center gap-3 sm:w-64 shrink-0">
                  <span className="flex items-center justify-center w-7 h-7 bg-cream border-2 border-ink rounded-full font-mono text-[12px] font-bold text-ink shrink-0">
                    {i + 1}
                  </span>
                  <span className="font-display text-[15px] font-bold text-ink">{f.step}</span>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <span
                    className={[
                      "font-mono text-[13px] font-bold px-3 py-1.5 rounded-lg border-2 border-ink transition-colors duration-300 shrink-0",
                      isHigh ? "bg-teal text-cream" : "bg-pop text-cream",
                    ].join(" ")}
                  >
                    {fmt}
                  </span>
                  {mode === "mixed" && (
                    <span className="text-[13px] text-ink/65 leading-snug">{f.why}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 收益对比 */}
        <div className="grid sm:grid-cols-2 gap-3 mb-9">
          <div className="px-5 py-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 mb-1.5">全程 FP32</div>
            <p className="text-[14px] text-ink/75 leading-relaxed">最稳，但显存吃得多、训得慢。现在很少有人这么练大模型了。</p>
          </div>
          <div className="px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 mb-1.5">混合精度</div>
            <p className="text-[14px] text-ink/80 leading-relaxed">显存省一大截、训练快很多，准确率几乎不掉。这是 2026 的主流练法。</p>
          </div>
        </div>

        {/* 2026 现状 */}
        <div className="px-5 py-4 bg-ink text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">2026 现状 · FP8 走进训练</div>
          <p className="text-[15px] leading-relaxed">
            FP8 以前主要用在推理，现在已经能用来训练了 —— DeepSeek-V3 就是用 FP8 大规模训出来的。NVIDIA 的 Blackwell 芯片原生支持 FP8（还有更短的 FP6、FP4），让又小又快的训练真正落地。
          </p>
        </div>

        <p className="mt-6 font-mono text-[10px] text-ink/40">
          来源 · DeepSeek-V3 技术报告（FP8 训练）· NVIDIA Blackwell 架构（FP8/FP6/FP4）· 2026
        </p>
      </div>
    </section>
  );
};

export default SectionFp8;
