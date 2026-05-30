import React from "react";
import { ChevronDown } from "lucide-react";

const FORMULA_LAYERS = [
  { label: "W", w: 120, h: 120, fill: "#241C15", text: "d × d", textColor: "#F4D35E", note: "原权重 · 冻结" },
  { label: "B", w: 120, h: 28, fill: "#E07A5F", text: "d × r", textColor: "white", note: "B 矩阵" },
  { label: "A", w: 28, h: 120, fill: "#1B4B5A", text: "r × d", textColor: "white", note: "A 矩阵" },
];

export default function Hero() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 items-start">
        <div>
          <p className="eyebrow mb-6">LoRA Rank · 一个数字</p>
          <h1 className="font-display text-display-xl text-ink leading-[1.04] mb-8">
            r 是什么？
          </h1>

          <p className="text-2xl md:text-3xl font-display leading-snug">
            <span className="bg-butter px-2 box-decoration-clone">
              r 是 LoRA 公式里 B (d×r) 和 A (r×d) 共享的那个维度，决定能学多复杂的变化。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              r 越大，B、A 越胖，可训参数越多，能塞下的语义变化越复杂，但显存和训练时间也涨。
            </p>
            <p>
              r 不是越大越好。HuggingFace PEFT 默认 r=8 已能覆盖大多数指令微调；只有代码、数学这类难任务才需要 r=64+。
            </p>
            <p className="text-ink-tertiary text-base">
              右边是 r 这一个数字怎么决定整个 LoRA 的尺寸和能力。
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>下滚看 r 怎么挑、跟任务怎么对、α 怎么配</span>
          </div>
        </div>

        <div>
          <div className="card-stamp p-6 md:p-7 bg-white">
            <div className="mb-3 font-mono text-xs text-ink-tertiary">公式 · 同一个 r 出现两次</div>

            <div className="bg-cream rounded-2xl p-6 border-2 border-ink mb-5 flex items-center justify-center min-h-[200px]">
              <div className="flex items-center gap-3 font-display text-lg">
                <span className="text-ink-tertiary">y =</span>
                <span className="px-3 py-2 rounded-lg bg-ink text-butter">W</span>
                <span className="text-ink-tertiary">·x +</span>
                <span className="flex items-center">
                  <span className="px-2.5 py-2 rounded-l-lg bg-coral text-white border-2 border-r-0 border-ink">
                    B<sub className="text-[10px] font-mono ml-0.5 text-butter">d×r</sub>
                  </span>
                  <span className="px-2.5 py-2 rounded-r-lg bg-teal text-white border-2 border-l-0 border-ink">
                    A<sub className="text-[10px] font-mono ml-0.5 text-butter">r×d</sub>
                  </span>
                </span>
                <span className="text-ink-tertiary">·x</span>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <Line label="d (模型隐藏维度)" v="Llama-3-8B → 4096" />
              <Line label="r (rank)" v="可调 · 经典 8 / 16 / 32 / 64" />
              <Line label="可训参数 / 每层" v="2 · d · r" />
              <Line label="r=16 时" v="2 × 4096 × 16 = 131,072 / 层" />
            </div>

            <div className="mt-5 pt-4 border-t border-ink/15 text-xs font-mono text-ink-tertiary leading-relaxed">
              整模型可训参数 = 2dr × 层数 × 挂的 module 数。
              <br />
              Llama-3-8B all-linear · r=16 ≈ 41.9M 可训（0.52% 全模型）
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ label, v }: { label: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1 border-b border-ink/10 last:border-0">
      <span className="font-mono text-xs text-ink-tertiary">{label}</span>
      <span className="text-ink text-sm font-semibold text-right">{v}</span>
    </div>
  );
}
