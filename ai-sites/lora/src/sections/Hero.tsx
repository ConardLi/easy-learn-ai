import React from "react";
import { ChevronDown, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_1fr] gap-12 items-start">
        <div>
          <p className="eyebrow mb-6">
            Low-Rank Adaptation · Microsoft 2021
          </p>
          <h1 className="font-display text-display-xl text-ink leading-[1.04] mb-8">
            LoRA 是什么？
          </h1>

          <p className="text-2xl md:text-3xl font-display leading-snug">
            <span className="bg-butter px-2 box-decoration-clone">
              LoRA 把原模型每层权重冻住，旁边并联两个细矩阵 B×A，只训这两个，参数量降到原来的 1% 以内。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              核心公式：<span className="font-mono bg-cream border border-ink/20 px-2 py-0.5 rounded">y = Wx + (BA)·x</span>。B 和 A 都是细长矩阵 (d×r, r×d)，r 通常取 8 或 16 — 比 d 小一两个数量级。
            </p>
            <p>
              训完两种用法：直接把 BA 加回 W，叫 <span className="font-semibold text-ink">merge</span>，推理零额外开销；或者保持并联，运行时 <span className="font-semibold text-ink">hot-swap</span> 不同 adapter。
            </p>
            <p className="text-ink-tertiary text-base">
              右边是一份真实 LoRA 训练配置 — 不是示意。
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>下滚看部署、家族、跟 Full FT 的差距、工具链</span>
          </div>
        </div>

        <div>
          <div className="card-stamp p-6 md:p-7 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded-md bg-ink text-butter font-mono text-[10px] tracking-widest">PEFT 0.13</span>
              <span className="font-mono text-xs text-ink-tertiary">真实可跑配置</span>
            </div>

            <pre className="bg-cream border-2 border-ink rounded-xl p-4 font-mono text-xs leading-relaxed overflow-x-auto">
{`from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r              = 16,
    lora_alpha     = 32,
    lora_dropout   = 0.05,
    target_modules = ["q_proj","k_proj","v_proj","o_proj",
                      "gate_proj","up_proj","down_proj"],
    bias           = "none",
    task_type      = "CAUSAL_LM",
)

model = get_peft_model(base_model, config)
model.print_trainable_parameters()
# trainable: 41,943,040 || all: 8,072,204,288 || 0.52%`}
            </pre>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <Stat label="可训参数" value="0.52%" tone="coral" />
              <Stat label="r" value="16" tone="teal" />
              <Stat label="挂层" value="7 处" tone="ink" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-ink-tertiary">
              <Lock className="w-3.5 h-3.5" />
              <span>base 模型 8B 全程冻结，反向只走 4200 万参数</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "coral" | "teal" | "ink" }) {
  const bg = tone === "coral" ? "bg-coral text-white" : tone === "teal" ? "bg-teal text-white" : "bg-ink text-butter";
  return (
    <div>
      <div className={`${bg} border-2 border-ink rounded-xl py-2 font-display text-xl font-bold`}>{value}</div>
      <div className="mt-1 text-[10px] font-mono text-ink-tertiary tracking-widest uppercase">{label}</div>
    </div>
  );
}
