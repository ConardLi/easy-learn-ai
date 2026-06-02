/**
 * Section 05 · Chinchilla 算账（整站视觉锚）
 *
 * 反相邻：Section 04 用 slider，这里换两个 stepper (+/-) 单独调 N（参数）和 D（数据）。
 *
 * DeepMind 2022 那篇 Chinchilla 论文找到的规律：
 * 给定算力预算 C ≈ 6 × N × D，N（参数）和 D（数据）按 20:1 配最划算。
 * GPT-3 当年的 1.7:1 严重欠训；Llama 3 8B 现在是 1875:1 极端过训。
 *
 * 用户拖两个 stepper → 实时算 ratio + 算力 + 落在哪个区。
 * 散点图叠上 10 个真实模型 + Chinchilla 对角线。
 */
import React, { useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";

const N_LEVELS = [1, 3, 7, 14, 30, 70, 175, 405, 1000]; // billion params
const D_LEVELS = [0.1, 0.3, 1, 3, 6, 10, 15, 30, 60, 100]; // trillion tokens

type RealModel = {
  id: string;
  name: string;
  n: number; // B params
  d: number; // T tokens
  year: string;
  ratio: number;
  note?: string;
  flag: "under" | "near" | "over" | "extreme";
};

function computeRatio(n: number, d: number) {
  return (d * 1000) / n; // tokens-per-param
}

function flagOf(ratio: number): RealModel["flag"] {
  if (ratio < 5) return "under";
  if (ratio < 50) return "near";
  if (ratio < 200) return "over";
  return "extreme";
}

const MODELS: RealModel[] = [
  { id: "gpt2", name: "GPT-2", n: 1.5, d: 0.04, year: "2019", ratio: 26.7, flag: "near" },
  { id: "gpt3", name: "GPT-3", n: 175, d: 0.3, year: "2020", ratio: 1.7, flag: "under" },
  { id: "gopher", name: "Gopher", n: 280, d: 0.3, year: "2021", ratio: 1.07, flag: "under" },
  { id: "chinchilla", name: "Chinchilla ★", n: 70, d: 1.4, year: "2022", ratio: 20.0, flag: "near", note: "20:1 论文推荐配比" },
  { id: "llama2-70b", name: "Llama 2 70B", n: 70, d: 2, year: "2023", ratio: 28.6, flag: "near" },
  { id: "phi-4", name: "Phi-4", n: 14, d: 9.8, year: "2024", ratio: 700, flag: "extreme" },
  { id: "llama3-8b", name: "Llama 3 8B", n: 8, d: 15, year: "2024", ratio: 1875, flag: "extreme", note: "94× 超塞" },
  { id: "llama3-405b", name: "Llama 3.1 405B", n: 405, d: 15.6, year: "2024", ratio: 38.5, flag: "near" },
  { id: "deepseek-v3", name: "DeepSeek-V3 †", n: 671, d: 14.8, year: "2024", ratio: 22.1, flag: "near", note: "MoE 按总参算" },
  { id: "qwen3", name: "Qwen3 235B", n: 235, d: 36, year: "2025", ratio: 153, flag: "over" },
];

// 散点图坐标系
const X_MIN = 0;
const X_MAX = 3.2;
const Y_MIN = -1.5;
const Y_MAX = 2.0;
const PLOT_W = 410;
const PLOT_H = 220;
const PLOT_LEFT = 50;
const PLOT_TOP = 20;

function sx(logN: number): number {
  return PLOT_LEFT + ((logN - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
}
function sy(logD: number): number {
  return PLOT_TOP + PLOT_H - ((logD - Y_MIN) / (Y_MAX - Y_MIN)) * PLOT_H;
}

const SectionChinchilla: React.FC = () => {
  const [nIdx, setNIdx] = useState(7); // Llama 3.1 405B 附近
  const [dIdx, setDIdx] = useState(6); // 15T tokens

  const n = N_LEVELS[nIdx];
  const d = D_LEVELS[dIdx];
  const ratio = computeRatio(n, d);
  const flag = flagOf(ratio);

  // 计算预算 FLOPs C ≈ 6ND
  const C = useMemo(() => 6 * n * 1e9 * d * 1e12, [n, d]);
  const logC = Math.log10(C);

  // Chinchilla 最优数据量
  const dOptimal = (20 * n) / 1000; // in T tokens

  const flagInfo: Record<RealModel["flag"], { label: string; bg: string; text: string }> = {
    under: {
      label: "严重欠训",
      bg: "bg-coral",
      text: "数据太少 · 模型记不住",
    },
    near: {
      label: "Chinchilla 附近",
      bg: "bg-teal",
      text: "训得最划算 · 论文最优区",
    },
    over: {
      label: "过训",
      bg: "bg-butter-deep",
      text: "再塞数据涨得慢 · 但推理便宜",
    },
    extreme: {
      label: "极端过训",
      bg: "bg-pop",
      text: "现代小模型套路 · 牺牲训练换推理",
    },
  };

  const info = flagInfo[flag];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">chinchilla-math</span>
        </div>

        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-[1.08]">
            参数和数据，
            <br />
            到底应该几比几？
          </h2>
          <p className="text-[15px] text-ink/75 leading-relaxed max-w-xl">
            模型越大、数据越多、算力越多，效果越好 —— 这条经验规律叫 scaling law（缩放定律）。
            Chinchilla 是它的一条实用结论：DeepMind 2022 那篇论文算出，每个参数配 20 个 token 最划算，
            往两边偏都浪费。但 Llama 3 之后大家都偏到了「过训」那边 —— 因为部署比训练贵。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* 左：双 stepper */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 space-y-6">
              {/* N stepper */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ① 模型大小 N
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {n}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">B 参数</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNIdx((i) => Math.max(0, i - 1))}
                    disabled={nIdx === 0}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:bg-cream transition-colors shadow-stamp active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    aria-label="N decrease"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <div className="flex-1 h-10 bg-cream border-2 border-ink rounded-xl flex items-center px-3">
                    <div className="flex-1 h-2 bg-white border border-ink/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-coral transition-all duration-300"
                        style={{ width: `${((nIdx + 1) / N_LEVELS.length) * 100}%` }}
                      />
                    </div>
                    <span className="ml-3 font-mono text-[11px] text-ink/55 tabular-nums">
                      {nIdx + 1}/{N_LEVELS.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setNIdx((i) => Math.min(N_LEVELS.length - 1, i + 1))}
                    disabled={nIdx === N_LEVELS.length - 1}
                    className="w-10 h-10 rounded-xl bg-ink text-cream border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:translate-x-0.5 transition-transform shadow-stamp active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    aria-label="N increase"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex justify-between font-mono text-[9.5px] text-ink/40 mt-1.5">
                  <span>1B</span>
                  <span>14B</span>
                  <span>70B</span>
                  <span>405B</span>
                  <span>1T</span>
                </div>
              </div>

              {/* D stepper */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ② 训练数据 D
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {d}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">T tokens</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDIdx((i) => Math.max(0, i - 1))}
                    disabled={dIdx === 0}
                    className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:bg-cream transition-colors shadow-stamp active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    aria-label="D decrease"
                  >
                    <Minus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <div className="flex-1 h-10 bg-cream border-2 border-ink rounded-xl flex items-center px-3">
                    <div className="flex-1 h-2 bg-white border border-ink/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal transition-all duration-300"
                        style={{ width: `${((dIdx + 1) / D_LEVELS.length) * 100}%` }}
                      />
                    </div>
                    <span className="ml-3 font-mono text-[11px] text-ink/55 tabular-nums">
                      {dIdx + 1}/{D_LEVELS.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setDIdx((i) => Math.min(D_LEVELS.length - 1, i + 1))}
                    disabled={dIdx === D_LEVELS.length - 1}
                    className="w-10 h-10 rounded-xl bg-ink text-cream border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:translate-x-0.5 transition-transform shadow-stamp active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    aria-label="D increase"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex justify-between font-mono text-[9.5px] text-ink/40 mt-1.5">
                  <span>0.1T</span>
                  <span>3T</span>
                  <span>15T</span>
                  <span>60T</span>
                  <span>100T</span>
                </div>
              </div>

              {/* 实时算账 */}
              <div className="border-t-2 border-dashed border-ink/15 pt-5 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    token : param
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display text-[26px] font-bold text-ink tabular-nums leading-none">
                      {ratio < 10 ? ratio.toFixed(1) : Math.round(ratio)}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">: 1</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    算力 C ≈ 6ND
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[20px] font-bold text-ink tabular-nums leading-none">
                      10
                    </span>
                    <span className="font-display text-[14px] font-bold text-ink tabular-nums leading-none">
                      ^{logC.toFixed(1)}
                    </span>
                    <span className="font-mono text-[10px] text-ink/55 ml-1">FLOPs</span>
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    最优 D（按 20:1）
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[18px] font-bold text-ink/75 tabular-nums leading-none">
                      {dOptimal < 1 ? dOptimal.toFixed(2) : dOptimal.toFixed(1)}
                    </span>
                    <span className="font-mono text-[10px] text-ink/55">T</span>
                  </div>
                </div>

                <div
                  className={[
                    "mt-3 px-4 py-3 rounded-2xl border-2 border-ink shadow-stamp",
                    info.bg,
                    flag === "near" ? "text-cream" : flag === "extreme" ? "text-cream" : "text-ink",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.18em] font-semibold",
                      flag === "near" || flag === "extreme"
                        ? "text-cream/75"
                        : "text-ink/65",
                    ].join(" ")}
                  >
                    判定
                  </div>
                  <div className="font-display text-[18px] font-bold mt-0.5">
                    {info.label}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10.5px] mt-1",
                      flag === "near" || flag === "extreme"
                        ? "text-cream/75"
                        : "text-ink/70",
                    ].join(" ")}
                  >
                    {info.text}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右：散点图 */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                ③ 真实模型 vs Chinchilla 对角线
              </div>
              <div className="text-[13px] text-ink/75 mb-3 leading-snug">
                每个点是一个真实模型。蓝色对角线 = 20:1。线之上 = 数据多了，线之下 = 数据少了。
              </div>

              <svg
                viewBox="0 0 500 280"
                className="w-full"
                fontFamily="Geist Mono, monospace"
              >
                {/* y 轴网格 */}
                {[-1, 0, 1, 2].map((y) => (
                  <g key={`yg-${y}`}>
                    <line
                      x1={PLOT_LEFT}
                      x2={PLOT_LEFT + PLOT_W}
                      y1={sy(y)}
                      y2={sy(y)}
                      stroke="#241C15"
                      strokeWidth="0.6"
                      opacity="0.12"
                      strokeDasharray="2 4"
                    />
                    <text
                      x={PLOT_LEFT - 6}
                      y={sy(y) + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill="#241C15"
                      opacity="0.55"
                    >
                      {Math.pow(10, y) >= 1
                        ? `${Math.pow(10, y).toFixed(0)}T`
                        : `${(Math.pow(10, y) * 1000).toFixed(0)}B`}
                    </text>
                  </g>
                ))}

                {/* x 轴网格 */}
                {[0, 1, 2, 3].map((x) => (
                  <g key={`xg-${x}`}>
                    <line
                      x1={sx(x)}
                      x2={sx(x)}
                      y1={PLOT_TOP}
                      y2={PLOT_TOP + PLOT_H}
                      stroke="#241C15"
                      strokeWidth="0.6"
                      opacity="0.12"
                      strokeDasharray="2 4"
                    />
                    <text
                      x={sx(x)}
                      y={PLOT_TOP + PLOT_H + 14}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#241C15"
                      opacity="0.55"
                    >
                      {Math.pow(10, x) >= 1000
                        ? `${(Math.pow(10, x) / 1000).toFixed(0)}T`
                        : `${Math.pow(10, x).toFixed(0)}B`}
                    </text>
                  </g>
                ))}

                {/* Chinchilla 对角线 */}
                <line
                  x1={sx(0.2)}
                  y1={sy(-1.5)}
                  x2={sx(3.2)}
                  y2={sy(1.5)}
                  stroke="#1B4B5A"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <text
                  x={sx(2.6)}
                  y={sy(0.7)}
                  fontSize="10"
                  fontWeight="700"
                  fill="#1B4B5A"
                  transform={`rotate(-22, ${sx(2.6)}, ${sy(0.7)})`}
                >
                  Chinchilla 20 : 1
                </text>

                {/* 真实模型点 */}
                {MODELS.map((m) => {
                  const x = sx(Math.log10(m.n));
                  const y = sy(Math.log10(m.d));
                  const color =
                    m.flag === "under"
                      ? "#E07A5F"
                      : m.flag === "near"
                        ? "#1B4B5A"
                        : m.flag === "over"
                          ? "#E5BD3A"
                          : "#FF4D74";
                  return (
                    <g key={m.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill={color}
                        stroke="#241C15"
                        strokeWidth="1.5"
                      />
                      <text
                        x={x + 9}
                        y={y + 3}
                        fontSize="9"
                        fill="#241C15"
                        fontWeight="600"
                      >
                        {m.name}
                      </text>
                    </g>
                  );
                })}

                {/* 当前点（用户调出来的） */}
                <g>
                  <circle
                    cx={sx(Math.log10(n))}
                    cy={sy(Math.log10(d))}
                    r="14"
                    fill="none"
                    stroke="#241C15"
                    strokeWidth="2"
                    strokeDasharray="3 3"
                    className="animate-pulse-dot"
                  />
                  <circle
                    cx={sx(Math.log10(n))}
                    cy={sy(Math.log10(d))}
                    r="7"
                    fill="#241C15"
                    stroke="#F4D35E"
                    strokeWidth="2.5"
                  />
                  <text
                    x={sx(Math.log10(n))}
                    y={sy(Math.log10(d)) - 17}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="800"
                    fill="#241C15"
                  >
                    你
                  </text>
                </g>

                {/* 轴 label */}
                <text
                  x={PLOT_LEFT + PLOT_W / 2}
                  y={PLOT_TOP + PLOT_H + 30}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#241C15"
                  opacity="0.65"
                  letterSpacing="1"
                >
                  参数 N →
                </text>
                <text
                  x={16}
                  y={PLOT_TOP + 14}
                  fontSize="10"
                  fill="#241C15"
                  opacity="0.65"
                  letterSpacing="1"
                >
                  ↑ 数据 D
                </text>
              </svg>

              {/* 图例 */}
              <div className="mt-2 flex flex-wrap gap-3 font-mono text-[10px] text-ink/65">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-coral border border-ink/40" />
                  欠训
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal border border-ink/40" />
                  Chinchilla 附近
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-butter-deep border border-ink/40" />
                  过训
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pop border border-ink/40" />
                  极端过训
                </span>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/45 leading-relaxed">
                来源 · Hoffmann et al. 2022 Chinchilla arXiv:2203.15556 · Llama 3 Herd
                arXiv:2407.21783 · DeepSeek-V3 arXiv:2412.19437 · † MoE 模型按总参数计，按激活参数会更偏过训
              </p>
            </div>
          </div>
        </div>

        {/* 反直觉收尾事实 */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-pop text-cream border-2 border-ink rounded-2xl p-5 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mb-1">
              Llama 3 8B
            </div>
            <div className="font-display text-[26px] font-bold leading-none mb-2 tabular-nums">
              1875 : 1
            </div>
            <div className="text-[12.5px] leading-snug">
              比 Chinchilla 最优多塞了 94× 数据。原因：小模型部署便宜，多花点训练换更省的推理。
            </div>
          </div>
          <div className="bg-teal text-cream border-2 border-ink rounded-2xl p-5 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-75 mb-1">
              GPT-3 当年
            </div>
            <div className="font-display text-[26px] font-bold leading-none mb-2 tabular-nums">
              1.7 : 1
            </div>
            <div className="text-[12.5px] leading-snug">
              175B 参数只配 300B token。Chinchilla 论文说，同样算力训个 70B / 1.4T 就能反超 GPT-3。
            </div>
          </div>
          <div className="bg-butter border-2 border-ink rounded-2xl p-5 shadow-stamp">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 mb-1">
              Karpathy
            </div>
            <div className="font-display text-[22px] font-bold leading-tight mb-2 text-ink">
              「现代 LLM 普遍欠训 100-1000×」
            </div>
            <div className="text-[12.5px] leading-snug text-ink/80">
              指 Chinchilla 时代之后，大家为了部署便宜，训练数据往往没加到论文说的上限。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionChinchilla;
