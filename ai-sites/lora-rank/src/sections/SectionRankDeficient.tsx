import React from "react";
import SectionFrame from "../components/SectionFrame";

const SPECTRUM = [
  { i: 1, val: 0.94 },
  { i: 2, val: 0.78 },
  { i: 3, val: 0.62 },
  { i: 4, val: 0.48 },
  { i: 5, val: 0.36 },
  { i: 6, val: 0.27 },
  { i: 7, val: 0.20 },
  { i: 8, val: 0.15 },
  { i: 9, val: 0.11 },
  { i: 10, val: 0.08 },
  { i: 11, val: 0.06 },
  { i: 12, val: 0.045 },
  { i: 13, val: 0.034 },
  { i: 14, val: 0.026 },
  { i: 15, val: 0.020 },
  { i: 16, val: 0.015 },
  ...Array.from({ length: 48 }).map((_, k) => ({
    i: 17 + k,
    val: 0.012 * Math.pow(0.85, k),
  })),
];

export default function SectionRankDeficient() {
  return (
    <SectionFrame num="03" label="为什么 r 大了不再涨" background="bg-butter/20">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        r 从 16 加到 256，效果几乎不涨。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        LoRA 在指令微调任务上，r=8 跟 r=256 实测差距不到 1 个百分点。LoRA 本身没问题；
        微调想给模型加的那点改动（记作 <span className="font-semibold text-ink">ΔW</span>，
        就是微调前后权重的差）本来就只有几个重要方向，r 开再大也塞不进新东西。业内把这种
        「真正重要的方向没几个」叫 <span className="font-semibold text-ink">低秩 / rank-deficient</span>。
      </p>

      <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
        <div className="card-stamp p-6 bg-white">
          <div className="flex items-baseline justify-between mb-2">
            <span className="font-mono text-xs text-ink-tertiary">
              把 ΔW 拆成方向，看每个多重要
              <span className="ml-1.5 px-1 py-0.5 bg-ink/8 border border-ink/20 rounded text-ink/55">进阶 · SVD</span>
            </span>
            <span className="font-mono text-xs text-ink">纵轴 log · 越靠右越没用</span>
          </div>

          <svg viewBox="0 0 640 280" className="w-full h-auto">
            <line x1="40" y1="240" x2="620" y2="240" stroke="#241C15" strokeWidth="1.5" />
            <line x1="40" y1="20" x2="40" y2="240" stroke="#241C15" strokeWidth="1.5" />

            {SPECTRUM.slice(0, 64).map((s) => {
              const x = 40 + (s.i / 65) * 580;
              const h = Math.max(2, (Math.log10(s.val + 0.001) + 3) * 50);
              const y = 240 - h;
              const isUseful = s.i <= 16;
              return (
                <rect
                  key={s.i}
                  x={x - 3}
                  y={y}
                  width={5}
                  height={h}
                  fill={isUseful ? "#1B4B5A" : "#E07A5F"}
                  opacity={isUseful ? 1 : 0.45}
                />
              );
            })}

            <line x1={40 + (16.5 / 65) * 580} y1={20} x2={40 + (16.5 / 65) * 580} y2={240}
                  stroke="#241C15" strokeWidth="2" strokeDasharray="5 5" />
            <text x={40 + (16.5 / 65) * 580 + 8} y={36}
                  fontFamily="Geist Mono, monospace" fontSize="11" fill="#241C15" fontWeight="700">
              r=16 ↑ 这之后能量几乎为 0
            </text>

            <text x={40} y={260} fontFamily="Geist Mono, monospace" fontSize="10" fill="#88837C">1</text>
            <text x={40 + (16 / 65) * 580} y={260} fontFamily="Geist Mono, monospace" fontSize="10" fill="#88837C" textAnchor="middle">16</text>
            <text x={40 + (32 / 65) * 580} y={260} fontFamily="Geist Mono, monospace" fontSize="10" fill="#88837C" textAnchor="middle">32</text>
            <text x={40 + (64 / 65) * 580} y={260} fontFamily="Geist Mono, monospace" fontSize="10" fill="#88837C" textAnchor="end">64</text>
          </svg>

          <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
            横轴是第几个方向，纵轴是这个方向有多重要。前 16 根高高的，是真正在干活的方向；
            后面贴着地的几乎没用 —— r 超过 16，多出来的就花在这些没用的方向上了。
            <span className="text-ink-tertiary">（这张谱是示意，帮你感受形状，不是某次精确测量）</span>
          </p>
          <div className="mt-3 flex gap-4 font-mono text-xs">
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-teal" /> 有用方向（前 16）</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 bg-coral opacity-45" /> 几乎为 0 的方向</span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-stamp p-5 bg-ink text-cream">
            <div className="eyebrow text-butter mb-2">来自 Hu et al. § 7.2</div>
            <p className="text-base leading-relaxed">
              原 LoRA 论文里就有个实验：固定其他变量，把 r 从 1 拉到 64。
              <span className="text-butter font-semibold"> 验证集得分从 r=4 之后基本不动了。 </span>
            </p>
            <p className="mt-3 text-sm text-cream/80 leading-relaxed">
              意思是：真实任务里 ΔW 要学的方向，本来就只有 4-8 个。多给它 56 个方向，它也只能拿这几个干活。
            </p>
          </div>

          <div className="card-stamp p-5 bg-butter/40">
            <div className="eyebrow text-ink-tertiary mb-2">实战意义</div>
            <ul className="space-y-2 text-sm text-ink leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                <span>从 r=8 起步训练。效果不够再翻倍。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                <span>验证集分数不涨就停 — 加大 r 浪费显存。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                <span>少数代码 / 数学 / 长上下文任务，effective rank 真的需要 64+。</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
