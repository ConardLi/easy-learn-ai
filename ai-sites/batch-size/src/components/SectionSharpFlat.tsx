/**
 * Section 03 · 大 batch 的诅咒 · Sharp vs Flat
 *
 * 反直觉钩子放在这一节开头：小 batch 反而泛化更好。
 * Keskar et al. 2017（arXiv:1609.04836）：大 batch 易陷 sharp minima → 测试集准确率掉。
 *
 * 反相邻：上一节是 step trace + pill。这里换 1D loss landscape SVG 物理可视 + scrub slider。
 *
 * 主交互：
 *   ① batch 大小 pill（4 档：32 / 256 / 4096 / 65536）—— L2
 *   ② scrub slider 拖动训练 step（0..120）—— L3，球随之滑落到对应 minimum
 *   ③ "linear scaling + warmup" toggle —— L2，按 Goyal 2017，开了大 batch 也能找到 flat
 *
 * 视觉：手画 1D loss landscape（两个低谷：左 flat 宽，右 sharp 窄+深），球的最终位置由
 *   (batch, warmup) 决定，scrub 控制现在到了哪一步。
 */
import React, { useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";

const BATCH_PRESETS = [
  { n: 32, label: "32" },
  { n: 256, label: "256" },
  { n: 4096, label: "4 K" },
  { n: 65536, label: "64 K" },
];

/** 给定 batch + warmup，决定球最终落在哪个谷（x 坐标） */
function targetX(batch: number, warmup: boolean): number {
  if (warmup) {
    return 95; // flat 谷中心（左）—— warmup 救回来
  }
  if (batch <= 64) return 95; // flat
  if (batch <= 512) return 95 + (batch - 64) * 0.03; // 偏一点
  if (batch <= 8192) return 105 + (Math.log2(batch / 512)) * 14; // 渐入 sharp
  return 235; // sharp 谷中心（右）
}

/** 给定 batch + warmup，最终测试集 loss bonus（相对最优 100%） */
function testAcc(batch: number, warmup: boolean): number {
  if (warmup) {
    if (batch <= 64) return 99.0;
    if (batch <= 4096) return 98.8;
    if (batch <= 16384) return 98.3;
    return 97.6;
  }
  if (batch <= 64) return 99.0;
  if (batch <= 512) return 98.8;
  if (batch <= 4096) return 97.5;
  if (batch <= 16384) return 96.0;
  return 94.1; // Keskar 2017: 64→8192 → ~5% test acc 掉，CIFAR 量级
}

const SectionSharpFlat: React.FC = () => {
  const [batch, setBatch] = useState(256);
  const [warmup, setWarmup] = useState(false);
  const [step, setStep] = useState(120); // 0..120

  const tx = targetX(batch, warmup);
  const acc = testAcc(batch, warmup);

  /* 球的当前位置：step 越大越接近 tx，并下沉到 landscape y */
  const ballX = useMemo(() => {
    const startX = 160; // 顶上中央
    const t = Math.min(1, step / 120);
    /* 用 easeInOut */
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    return startX + (tx - startX) * e;
  }, [step, tx]);

  /* 给定 ballX 算 landscape 的 y 值（曲线公式） */
  const ballY = useMemo(() => landscapeY(ballX), [ballX]);

  /* "稳态"判定：step 接近 120 时露真相 */
  const settled = step >= 110;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">the large-batch curse</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          batch 从 64 拉到 8192，loss 一样降到 0 ——
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">测试集准确率却掉 5%</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          Keskar et al. 2017（arXiv:1609.04836）发现：大 batch 训练容易落进一个又窄又深的坑（sharp
          minima）—— 训练时 loss 压得很低，但参数稍微一抖、换一批没见过的题，loss 就崩。小 batch
          每步只看几条样本，更新本来就抖（这种抖叫梯度噪声），有时能把参数滚出窄坑、掉进一个更宽的
          坑（flat minima），换新题更稳。
        </p>

        {/* 控件行：左 pill / 中 scrub / 右 toggle */}
        <div className="grid lg:grid-cols-12 gap-4 mb-6">
          {/* batch pill */}
          <div className="lg:col-span-4 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              batch · pick
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {BATCH_PRESETS.map((b) => {
                const on = b.n === batch;
                return (
                  <button
                    key={b.n}
                    onClick={() => {
                      setBatch(b.n);
                      setStep(120);
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
          </div>

          {/* scrub */}
          <div className="lg:col-span-5 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                scrub training · drag
              </div>
              <div className="font-mono text-[12px] font-bold text-ink tabular-nums">
                step {step}
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={120}
              step={1}
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              className="w-full accent-coral cursor-pointer"
            />
            <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
              <span>init</span>
              <span>mid</span>
              <span>converged</span>
            </div>
          </div>

          {/* warmup toggle */}
          <button
            onClick={() => setWarmup((v) => !v)}
            className={[
              "lg:col-span-3 p-4 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
              warmup
                ? "bg-ink text-cream shadow-stamp"
                : "bg-white text-ink hover:bg-cream shadow-[2px_2px_0_0_#241C15]",
            ].join(" ")}
          >
            <div
              className={[
                "font-mono text-[10px] uppercase tracking-[0.2em] mb-1",
                warmup ? "text-butter" : "text-ink/55",
              ].join(" ")}
            >
              linear scale + warmup
            </div>
            <div className="font-display text-[15px] font-bold leading-tight">
              {warmup ? "Goyal 2017 · ON" : "naive · OFF"}
            </div>
          </button>
        </div>

        {/* 1D loss landscape SVG */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-5">
            {/* 左：landscape */}
            <div className="lg:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                loss landscape · 1D 切面
              </div>
              <svg viewBox="0 0 320 200" className="w-full h-auto border-2 border-ink/10 rounded-xl bg-cream/40">
                {/* flat 谷标签 */}
                <text x="95" y="22" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#1B4B5A">
                  flat
                </text>
                <text x="95" y="34" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15" opacity="0.55">
                  wide basin · 抗扰
                </text>

                {/* sharp 谷标签 */}
                <text x="235" y="22" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#E07A5F">
                  sharp
                </text>
                <text x="235" y="34" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fill="#241C15" opacity="0.55">
                  narrow · 一抖即崩
                </text>

                {/* landscape 曲线 · 用 path */}
                <path
                  d={landscapePath(40)}
                  stroke="#241C15"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* flat 谷的"宽"高亮 */}
                <rect x="75" y="125" width="40" height="38" fill="#1B4B5A" opacity="0.12" rx="2" />
                {/* sharp 谷的"窄"高亮 */}
                <rect x="228" y="110" width="14" height="55" fill="#E07A5F" opacity="0.18" rx="2" />

                {/* 轴线 · 表示参数 θ */}
                <line x1="20" y1="180" x2="300" y2="180" stroke="#241C15" strokeWidth="1.2" opacity="0.4" />
                <text x="20" y="195" fontFamily="Geist Mono, monospace" fontSize="8.5" fill="#88837C">
                  θ →
                </text>

                {/* 球 */}
                <g style={{ transform: `translate(${ballX - 160}px, ${ballY - 100}px)`, transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)" }}>
                  {/* 阴影 */}
                  <ellipse cx="160" cy="113" rx="9" ry="2.5" fill="#241C15" opacity="0.25" />
                  <circle cx="160" cy="100" r="9" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
                  <text x="160" y="103" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="700" fill="#241C15">
                    θ
                  </text>
                </g>

                {/* 当 settled 时，显示一条小竖线指示扰动 */}
                {settled && (
                  <g opacity={0.6}>
                    <line
                      x1={ballX - 12}
                      y1={ballY - 18}
                      x2={ballX + 12}
                      y2={ballY - 18}
                      stroke="#241C15"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                    />
                    <polygon
                      points={`${ballX - 14},${ballY - 18} ${ballX - 11},${ballY - 21} ${ballX - 11},${ballY - 15}`}
                      fill="#241C15"
                    />
                    <polygon
                      points={`${ballX + 14},${ballY - 18} ${ballX + 11},${ballY - 21} ${ballX + 11},${ballY - 15}`}
                      fill="#241C15"
                    />
                    <text
                      x={ballX}
                      y={ballY - 22}
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="7.5"
                      fill="#241C15"
                    >
                      perturb θ
                    </text>
                  </g>
                )}
              </svg>
              <p className="mt-2 font-mono text-[10px] text-ink/45">
                ↑ scrub slider 控制 step。小 batch（≤256）会落进左边宽坑；大 batch（≥4K）滚向右边窄坑。
                这是示意曲线，帮你感受趋势，不是精确统计。
              </p>
            </div>

            {/* 右：测试集 acc + 解释 */}
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                test accuracy · 收敛后
              </div>
              <div className="p-4 border-2 border-ink rounded-2xl bg-cream">
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={[
                      "font-display text-[36px] font-bold tabular-nums leading-none",
                      acc >= 98.5 ? "text-teal" : acc >= 97 ? "text-ink" : "text-coral",
                    ].join(" ")}
                  >
                    {acc.toFixed(1)}
                  </span>
                  <span className="font-mono text-[12px] text-ink/55">%</span>
                </div>
                <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                  <div
                    className={[
                      "h-full transition-all duration-400 ease-spring",
                      acc >= 98.5 ? "bg-teal" : acc >= 97 ? "bg-butter-deep" : "bg-coral",
                    ].join(" ")}
                    style={{ width: `${(acc - 90) * 10}%` }}
                  />
                </div>
                <div className="mt-3 font-mono text-[11px] text-ink/65 leading-snug">
                  {acc >= 98.5
                    ? "落进 flat 谷 · 测试集稳"
                    : acc >= 97
                      ? "边缘区 · 算 ok"
                      : "落进 sharp 谷 · 测试集崩"}
                </div>
              </div>

              <div className="mt-4 p-3 border-2 border-ink rounded-xl bg-white">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                  warmup 救得回来吗？
                </div>
                <div className="font-mono text-[11px] text-ink leading-snug">
                  {warmup ? (
                    <>
                      <span className="text-teal font-bold">能 · 大部分情况。</span>
                      <br />
                      开了之后球能爬出窄坑、落进宽坑，Llama 3 用过同思路。
                    </>
                  ) : (
                    <>
                      <span className="text-coral font-bold">不开 · 风险大。</span>
                      <br />
                      batch 涨了 lr 没跟上，球更容易卡在窄坑。
                    </>
                  )}
                </div>
              </div>

              {/* 分锅 + 互链：lr 怎么跟着调，去学习率站 §05 */}
              <a
                href="../learning-rate/index.html"
                className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-butter border-2 border-ink rounded-xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-mono text-[11px] leading-[1.6] text-ink/85">
                  大 batch 还要把 lr 跟着调大、配 warmup。具体乘多少、warmup 曲线怎么设 ——
                  算法都在《学习率》§05。
                </span>
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] text-ink/40">
          来源：Keskar et al. 2017（arXiv:1609.04836）· Goyal et al. 2017（arXiv:1706.02677, Linear Scaling Rule + warmup）
        </p>
      </div>
    </section>
  );
};

/* ── landscape 数学公式 + SVG path ─────────────────────────────────── */

/** 给定 x（30..290 范围），返回 landscape 的 y（数值越大 = 越低 / 越深） */
function landscapeY(x: number): number {
  /* 两个高斯 · 左 flat 宽（σ=24）/ 右 sharp 窄（σ=6） */
  const left = 60 * Math.exp(-Math.pow((x - 95) / 24, 2));
  const right = 80 * Math.exp(-Math.pow((x - 235) / 6, 2));
  /* y 越大越深 · 但 SVG y 是越大越下，所以 baseline 70 + valley = depth */
  return 80 + (60 - left - right); // 越深 y 越小
}

/** SVG path 从 x=20 到 x=300 */
function landscapePath(samples: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = 20 + (280 * i) / samples;
    const y = landscapeY(x);
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

export default SectionSharpFlat;
