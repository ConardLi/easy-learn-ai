import React from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

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
              r 就是 LoRA 那条窄补丁开多宽 —— 数字越大补丁越胖、能学的改动越复杂，也越吃显存。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              《LoRA》讲过：把大模型几十亿个权重冻住不动，旁边挂一条很窄的补丁，只训这条补丁。
              这条补丁有多宽，就由一个数 r 定 —— r 就是这一站的主角。
            </p>
            <p>
              r 开太大只是白吃显存，多数任务 r=8 就够。HuggingFace PEFT 的默认值就是 r=8；
              只有代码、数学这类难任务才需要 r=64+。
            </p>
            <p className="text-ink-tertiary text-base">
              右边这张表，是 r 这一个数字怎么定整条补丁的尺寸和能力。
            </p>
          </div>

          {/* 承接 lora：补丁是什么去 LoRA 站，这站只讲补丁多宽怎么选 */}
          <a
            href="../lora/index.html"
            className="mt-7 flex items-start gap-3 max-w-xl card-stamp p-5 bg-butter/40 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-4 h-4 text-ink" />
            </span>
            <span className="text-sm leading-relaxed text-ink-secondary">
              <span className="font-semibold text-ink">补丁 A·B 是什么、挂在哪几层、训完怎么部署 —— 那些《LoRA》那一站讲过了。</span>
              {" "}这一站只盯着那条补丁多宽（也就是 r）该怎么挑。
              <span className="font-semibold text-ink"> → 去《LoRA》</span>
            </span>
          </a>

          <div className="mt-8 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>往下拖 r，看显存、参数量、效果、够不够四个数怎么跟着变</span>
          </div>
        </div>

        <div>
          <div className="card-stamp p-6 md:p-7 bg-white">
            <div className="mb-3 font-mono text-xs text-ink-tertiary">原权重 W 不动，旁边加一条补丁 B·A</div>

            <p className="mb-3 text-[13px] leading-relaxed text-ink-secondary">
              B、A 就是那条补丁的两半，中间夹着的 r 就是补丁宽度。r 越大，两半越胖，要训的数字越多。
            </p>

            <div className="bg-cream rounded-2xl p-6 border-2 border-ink mb-5 flex items-center justify-center min-h-[200px]">
              <div className="flex items-center gap-3 font-display text-lg">
                <span className="text-ink-tertiary">y =</span>
                <span className="px-3 py-2 rounded-lg bg-ink text-butter">W</span>
                <span className="text-ink-tertiary">·x +</span>
                <span className="flex items-center">
                  <span className="px-2.5 py-2 rounded-l-lg bg-coral text-white border-2 border-r-0 border-ink">
                    B
                  </span>
                  <span className="px-2.5 py-2 rounded-r-lg bg-teal text-white border-2 border-l-0 border-ink">
                    A
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
