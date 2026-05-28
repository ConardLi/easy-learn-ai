/**
 * Section 01 · Hero
 *
 * Hero 开场纪律：先给「XXX 是什么？」的直白答案，再放钩子。
 *
 * 左：H1 + 一句话定义 + 白话三段 + 过渡句。
 * 右：主交互卡 ——
 *   ① ZeRO stage 4 chip (0/1/2/3)
 *   ② GPU 数 4 chip (2/4/8/16)
 *   ③ 实时显示 N 张 GPU 的显存堆叠柱（3 段：参数 / 梯度 / 优化器状态）
 *
 * 用户进站第一秒就能拖 stage 和 GPU 数，看一台 70B 模型怎么从「每卡都装一份」拆到「每卡 1/N」。
 *
 * 数据：Llama 3 70B BF16 训练 · 来自 archiesengupta.com/blog/memory-efficient-training-deep-dive
 *   2P + 2P + 8P = 12P 字节/参数 · 70B → 840 GB total state
 */
import React, { useState } from "react";
import { ArrowDown } from "lucide-react";

type Stage = 0 | 1 | 2 | 3;

const STAGES: { id: Stage; label: string; sub: string }[] = [
  { id: 0, label: "ZeRO-0", sub: "纯 DP · 每卡都存全份" },
  { id: 1, label: "ZeRO-1", sub: "拆 optimizer" },
  { id: 2, label: "ZeRO-2", sub: "拆 optimizer + grad" },
  { id: 3, label: "ZeRO-3", sub: "三件全拆" },
];

const GPU_COUNTS = [2, 4, 8, 16];

/* 70B BF16 训练状态：
 *   params  = 2 字节 × 70B = 140 GB（全卡复制）
 *   grads   = 2 字节 × 70B = 140 GB（全卡复制）
 *   opt     = 8 字节 × 70B = 560 GB（Adam: fp32 master + m + v）
 * 来源：archiesengupta.com/blog 2026
 */
const STATE_70B = { params: 140, grads: 140, opt: 560 } as const;

function perGpuMemory(stage: Stage, gpus: number) {
  const { params, grads, opt } = STATE_70B;
  switch (stage) {
    case 0:
      return { params, grads, opt };
    case 1:
      return { params, grads, opt: opt / gpus };
    case 2:
      return { params, grads: grads / gpus, opt: opt / gpus };
    case 3:
      return { params: params / gpus, grads: grads / gpus, opt: opt / gpus };
  }
}

const SectionHero: React.FC = () => {
  const [stage, setStage] = useState<Stage>(0);
  const [gpus, setGpus] = useState(4);

  const m = perGpuMemory(stage, gpus);
  const perGpu = m.params + m.grads + m.opt;
  const max = STATE_70B.params + STATE_70B.grads + STATE_70B.opt;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[6%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-coral border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                DeepSpeed · 训练优化库
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              DeepSpeed
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  Microsoft 开源的训练库，把一个单卡装不下的大模型拆开分摊到多张 GPU 上一起训。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练一个 70B 模型，光参数 + 梯度 + 优化器状态加起来就 840 GB。一张 80 GB 的 A100 装不下。
              </p>
              <p>
                DeepSpeed 干的事就一件：把这三块状态切碎，每张卡只存一份小份，要用的时候再凑齐。
              </p>
              <p>
                一台 8 卡机，从训不动 70B 变成能训 70B；甚至能把状态 offload 到 CPU 内存和 NVMe SSD，让 8 张卡训 1T 模型。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，就是「拆开分摊」这个动作本身。
              选 ZeRO 几档 + 多少张卡，看一张卡到底要扛多少显存。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：可视化卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 标题行 */}
              <div className="flex items-baseline justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  Llama 3 70B · BF16 训练
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  archiesengupta · 2026
                </div>
              </div>

              {/* ① ZeRO stage chip */}
              <div className="mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  ① ZeRO stage
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {STAGES.map((s) => {
                    const on = s.id === stage;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setStage(s.id)}
                        className={[
                          "py-2 px-1 rounded-md border-2 border-ink transition-all duration-250 ease-spring text-left",
                          on
                            ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                            : "bg-white text-ink hover:bg-cream",
                        ].join(" ")}
                      >
                        <div className="font-mono text-[11px] font-bold text-center">
                          {s.label}
                        </div>
                        <div
                          className={[
                            "font-mono text-[8.5px] mt-0.5 text-center leading-tight",
                            on ? "text-cream/60" : "text-ink/45",
                          ].join(" ")}
                        >
                          {s.sub}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ② GPU 数 chip */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  ② GPU 数
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {GPU_COUNTS.map((n) => {
                    const on = n === gpus;
                    return (
                      <button
                        key={n}
                        onClick={() => setGpus(n)}
                        className={[
                          "py-1.5 rounded-md border-2 border-ink font-mono text-[12px] font-bold transition-all duration-250 ease-spring",
                          on
                            ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                            : "bg-white text-ink hover:bg-cream",
                        ].join(" ")}
                      >
                        {n}×
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ③ 显存堆叠柱 · N 张 GPU 并排 */}
              <div className="pt-5 border-t border-ink/10">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ③ 每张 GPU 显存（GB）
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {Math.round(perGpu)}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">GB / 卡</span>
                  </div>
                </div>

                <GpuRow gpus={gpus} memPerGpu={m} max={max} />

                {/* 图例 */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px]">
                  <LegendDot color="bg-coral" label={`参数 ${m.params.toFixed(0)} GB`} />
                  <LegendDot color="bg-butter-deep" label={`梯度 ${m.grads.toFixed(0)} GB`} />
                  <LegendDot color="bg-teal" label={`优化器 ${m.opt.toFixed(0)} GB`} />
                </div>

                {/* 一行 verdict */}
                <div className="mt-4 px-3 py-2.5 bg-cream border-2 border-ink rounded-lg">
                  <p className="text-[13px] text-ink/80 leading-relaxed">
                    {verdict(stage, gpus, perGpu)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function verdict(stage: Stage, gpus: number, perGpu: number): string {
  const fitsA100 = perGpu <= 80;
  const fitsH100 = perGpu <= 80;
  if (stage === 0) {
    return `ZeRO-0 = 纯数据并行。每卡都存完整 840 GB，加再多卡也没用 —— 单卡放不下就是放不下。`;
  }
  if (perGpu > 200) {
    return `${gpus} 张卡每张还要扛 ${Math.round(perGpu)} GB，A100/H100 都装不下。继续拆 stage 或加卡。`;
  }
  if (perGpu > 80) {
    return `每卡 ${Math.round(perGpu)} GB · 80 GB 的 A100 不够。换 H200（141 GB）或继续提 stage。`;
  }
  if (perGpu > 40) {
    return `每卡 ${Math.round(perGpu)} GB · A100 80GB 能装下，再留点给 activation 和 batch。`;
  }
  return `每卡 ${Math.round(perGpu)} GB · 显存余量充足。这就是 ZeRO 的本事。`;
}

/* GPU 一排堆叠柱 */
const GpuRow: React.FC<{
  gpus: number;
  memPerGpu: { params: number; grads: number; opt: number };
  max: number;
}> = ({ gpus, memPerGpu, max }) => {
  const total = memPerGpu.params + memPerGpu.grads + memPerGpu.opt;
  const barHeight = 130;
  return (
    <div
      className="grid gap-1.5 items-end"
      style={{ gridTemplateColumns: `repeat(${gpus}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: gpus }).map((_, i) => {
        const h = (total / max) * barHeight;
        const params = (memPerGpu.params / max) * barHeight;
        const grads = (memPerGpu.grads / max) * barHeight;
        const opt = (memPerGpu.opt / max) * barHeight;
        return (
          <div key={i} className="flex flex-col items-center" style={{ minWidth: 0 }}>
            {/* 80GB A100 容量参考线 */}
            <div className="relative w-full" style={{ height: barHeight }}>
              <div
                className="absolute left-0 right-0 border-t border-dashed border-ink/35"
                style={{ bottom: (80 / max) * barHeight }}
                aria-hidden
              />
              {/* 柱：从底往上堆 opt → grads → params */}
              <div
                className="absolute bottom-0 left-0 right-0 flex flex-col-reverse rounded-md border-2 border-ink overflow-hidden transition-all duration-500 ease-spring"
                style={{ height: h }}
              >
                {opt > 0 && (
                  <div
                    className="bg-teal w-full"
                    style={{ height: `${(opt / total) * 100}%` }}
                  />
                )}
                {grads > 0 && (
                  <div
                    className="bg-butter-deep w-full"
                    style={{ height: `${(grads / total) * 100}%` }}
                  />
                )}
                {params > 0 && (
                  <div
                    className="bg-coral w-full"
                    style={{ height: `${(params / total) * 100}%` }}
                  />
                )}
              </div>
            </div>
            <div className="mt-1.5 font-mono text-[9px] text-ink/55">
              GPU{i}
            </div>
            <div className="font-mono text-[10px] font-bold text-ink tabular-nums">
              {Math.round(total)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className={`w-2.5 h-2.5 ${color} border border-ink rounded-sm`} />
    <span className="font-mono text-ink/70">{label}</span>
  </span>
);

export default SectionHero;
