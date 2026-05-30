/**
 * Section 03 · 调度器形状画板
 *
 * 反模板：6 个调度器 chip 切换 + 大幅 SVG 曲线 + 公式 + 用在哪。
 *   - 这是 chip + curve 范式（pill + matrix），不抢前面的 slider 也不抢后面的 stepper
 *   - 跟 distill 的"温度 T slider + 5 类柱"不一样 —— 这里 chip 是离散切形状
 *
 * 6 个调度器：
 *   1) Constant
 *   2) Linear decay
 *   3) Cosine decay (LLM 默认)
 *   4) Warmup + Cosine（Llama / GPT 都用）
 *   5) WSD (Warmup-Stable-Decay)（DeepSeek / MiniCPM）
 *   6) OneCycle（CV / 小模型）
 *
 * 可动元素：
 *   - 6 个 chip（L2 切换）
 *   - 总步数 stepper（L3）—— 改 totalSteps 看曲线 reflow
 *   - hover：曲线上的关键节点 hover 看坐标（基础礼貌）
 */
import React, { useMemo, useState } from "react";

type Sched = {
  id: string;
  name: string;
  formula: string;
  who: string;
  /** 给定 progress p ∈ [0,1] · warmupRatio · 输出 lr/peak ∈ [0,1] */
  fn: (p: number, warmupRatio: number) => number;
};

const SCHEDS: Sched[] = [
  {
    id: "const",
    name: "Constant",
    formula: "lr(t) = lr_peak",
    who: "教学 demo · 偶尔 LoRA · 几乎没人在 LLM 预训练用",
    fn: () => 1,
  },
  {
    id: "linear",
    name: "Linear decay",
    formula: "lr(t) = lr_peak · (1 − t/T)",
    who: "BERT / 早期 NLP · HuggingFace 默认 SFT 调度",
    fn: (p) => Math.max(0, 1 - p),
  },
  {
    id: "cosine",
    name: "Cosine decay",
    formula: "lr(t) = lr_min + ½(lr_peak − lr_min)·(1+cos(πt/T))",
    who: "GPT-3 / Llama / Mistral · 最主流",
    fn: (p) => 0.5 * (1 + Math.cos(Math.PI * p)),
  },
  {
    id: "warmup-cos",
    name: "Warmup + Cosine",
    formula: "warmup 期线性升 · 之后 cosine 降到 0.1·lr_peak",
    who: "Llama 3.1 405B / GPT-3 / 几乎所有现代大模型",
    fn: (p, w) => {
      if (p < w) return p / w;
      const q = (p - w) / (1 - w);
      return 0.1 + 0.9 * 0.5 * (1 + Math.cos(Math.PI * q));
    },
  },
  {
    id: "wsd",
    name: "WSD",
    formula: "warmup → 长期 constant → 末段急降",
    who: "DeepSeek V3 / MiniCPM · 训练长度可灵活延长",
    fn: (p, w) => {
      if (p < w) return p / w;
      if (p < 0.85) return 1;
      const q = (p - 0.85) / 0.15;
      return 1 - 0.95 * q;
    },
  },
  {
    id: "onecycle",
    name: "OneCycle",
    formula: "升到 peak → 降回起点（一次循环）",
    who: "ResNet 等 CV 训练 · super-convergence",
    fn: (p) => {
      if (p < 0.4) return 0.1 + 0.9 * (p / 0.4);
      const q = (p - 0.4) / 0.6;
      return 0.1 + 0.9 * 0.5 * (1 + Math.cos(Math.PI * q));
    },
  },
];

const TOTAL_OPTIONS = [10, 50, 100, 500, 1200, 12000];

const SectionSchedule: React.FC = () => {
  const [schedId, setSchedId] = useState("warmup-cos");
  const [totalIdx, setTotalIdx] = useState(4); // 1200 step
  const [warmupPct, setWarmupPct] = useState(5); // 5% of total

  const sched = SCHEDS.find((s) => s.id === schedId)!;
  const total = TOTAL_OPTIONS[totalIdx];
  const warmupSteps = Math.round((total * warmupPct) / 100);
  const warmupRatio = warmupPct / 100;

  /* 生成曲线 */
  const path = useMemo(() => {
    const N = 200;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
      const p = i / N;
      const v = sched.fn(p, warmupRatio);
      const x = 40 + p * 420;
      const y = 200 - v * 160;
      pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  }, [sched, warmupRatio]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint border-y-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">scheduler shapes</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3">
          一个 lr 不够，要给它配一条「形状」
        </h2>
        <p className="max-w-2xl text-[16px] text-ink/75 leading-relaxed mb-10">
          LLM 训几十万步，不能从头到尾用同一个 lr。
          开头要 warmup（防梯度爆炸），中段保持，末段降到接近 0（精修）。这条形状曲线就是「scheduler」。
        </p>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 左：6 个 chip */}
          <div className="lg:col-span-4">
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 选 scheduler
              </div>
              <div className="space-y-1.5">
                {SCHEDS.map((s) => {
                  const on = s.id === schedId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSchedId(s.id)}
                      className={[
                        "w-full text-left px-3 py-2.5 border-2 border-ink rounded-xl transition-all duration-250 ease-spring font-display font-bold",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-cream text-ink hover:bg-white",
                      ].join(" ")}
                    >
                      <div className="text-[15px] tabular-nums">{s.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 总步数 stepper + warmup 比例 */}
            <div className="card-stamp p-5 mt-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② 总步数 / warmup
              </div>

              <div className="mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    total steps
                  </span>
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {total.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={TOTAL_OPTIONS.length - 1}
                  step={1}
                  value={totalIdx}
                  onChange={(e) => setTotalIdx(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer mt-1"
                />
                <div className="flex justify-between mt-0.5 font-mono text-[10px] text-ink/40">
                  <span>10</span>
                  <span>1.2k</span>
                  <span>12k</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    warmup
                  </span>
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {warmupPct}% · {warmupSteps.toLocaleString()} 步
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={20}
                  step={1}
                  value={warmupPct}
                  onChange={(e) => setWarmupPct(Number(e.target.value))}
                  disabled={schedId !== "warmup-cos" && schedId !== "wsd"}
                  className="w-full accent-coral cursor-pointer mt-1 disabled:opacity-30"
                />
                <p className="mt-1 font-mono text-[10px] text-ink/45">
                  warmup 仅对 Warmup+Cosine / WSD 生效。Llama 3 用 0.7%（8000/1.2M）。
                </p>
              </div>
            </div>
          </div>

          {/* 右：大曲线 + 公式 + 用在哪 */}
          <div className="lg:col-span-8">
            <div className="card-stamp p-5 lg:p-6">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    曲线形状
                  </div>
                  <div className="font-display text-[26px] font-bold text-ink leading-tight">
                    {sched.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    peak / min
                  </div>
                  <div className="font-display text-[22px] font-bold text-coral tabular-nums">
                    1.0 / {schedMinValue(sched).toFixed(2)}
                  </div>
                </div>
              </div>

              {/* 曲线 SVG */}
              <div className="bg-cream border-2 border-ink rounded-2xl p-3">
                <svg viewBox="0 0 480 230" className="w-full h-auto">
                  {/* 网格 */}
                  <defs>
                    <pattern id="sched-grid" x="0" y="0" width="42" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 42 0 L 0 0 0 20" fill="none" stroke="#241C15" strokeWidth="0.4" opacity="0.13" />
                    </pattern>
                  </defs>
                  <rect x="40" y="40" width="420" height="160" fill="url(#sched-grid)" />

                  {/* warmup 区域阴影（仅相关 sched） */}
                  {(schedId === "warmup-cos" || schedId === "wsd") && warmupRatio > 0 && (
                    <rect
                      x="40"
                      y="40"
                      width={420 * warmupRatio}
                      height="160"
                      fill="#F4D35E"
                      opacity="0.35"
                    />
                  )}

                  {/* WSD 末段 decay 阴影 */}
                  {schedId === "wsd" && (
                    <rect
                      x={40 + 420 * 0.85}
                      y="40"
                      width={420 * 0.15}
                      height="160"
                      fill="#E07A5F"
                      opacity="0.25"
                    />
                  )}

                  {/* 坐标轴 */}
                  <line x1="40" y1="200" x2="460" y2="200" stroke="#241C15" strokeWidth="1.4" />
                  <line x1="40" y1="40" x2="40" y2="200" stroke="#241C15" strokeWidth="1.4" />

                  {/* 主曲线 */}
                  <path d={path} fill="none" stroke="#241C15" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

                  {/* y 轴标记 */}
                  <text x="35" y="44" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="700">
                    lr_peak
                  </text>
                  <text x="35" y="204" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
                    0
                  </text>

                  {/* x 轴标记 */}
                  <text x="44" y="218" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#88837C">
                    step 0
                  </text>
                  <text x="456" y="218" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9.5" fill="#88837C">
                    step {total.toLocaleString()}
                  </text>

                  {/* warmup 标签 */}
                  {(schedId === "warmup-cos" || schedId === "wsd") && warmupRatio > 0 && (
                    <text
                      x={40 + 210 * warmupRatio}
                      y="55"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      fill="#241C15"
                    >
                      ←warmup→
                    </text>
                  )}

                  {/* WSD decay 标签 */}
                  {schedId === "wsd" && (
                    <text
                      x={40 + 420 * 0.925}
                      y="55"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                      fill="#E07A5F"
                    >
                      decay
                    </text>
                  )}
                </svg>
              </div>

              {/* 公式 + 用在哪 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div className="bg-cream border-2 border-ink rounded-xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    公式
                  </div>
                  <div className="font-mono text-[12px] text-ink leading-relaxed">
                    {sched.formula}
                  </div>
                </div>
                <div className="bg-cream border-2 border-ink rounded-xl p-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    谁在用
                  </div>
                  <div className="text-[13px] text-ink leading-relaxed">{sched.who}</div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/45">
                来源：Loshchilov 2017 (cosine, arXiv:1608.03983) · WSD/MiniCPM Hu 2024 · WSD-river-valley arXiv:2410.05192
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function schedMinValue(s: Sched): number {
  return s.fn(1, 0.05);
}

export default SectionSchedule;
