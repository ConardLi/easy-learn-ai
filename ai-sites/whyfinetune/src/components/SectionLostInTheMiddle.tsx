/**
 * Section 04 · Lost in the Middle · 长 context 不是免费的
 *
 * 让用户拖一个"关键句"在 context 长度条上的位置，看模型召回率。
 * 上方切总长（8K / 32K / 128K / 1M），下方切难度（单点 / 多点聚合）。
 *
 * 数据来源：
 *   Lost in the Middle arXiv:2307.03172
 *   RULER benchmark 2024（NVIDIA）+ 2026 复测
 *   Long-Context Models Killed RAG?（dev.to 2025-10）
 *
 * 关键事实：所有声称 1M 的模型在 64-128k 的「多点聚合」任务上都会跌破 60%。
 */
import React, { useState, useMemo } from "react";

type Length = "8K" | "32K" | "128K" | "1M";
type Diff = "single" | "multi";

/**
 * 根据总长 + 任务难度，返回 U 形召回曲线的 5 个采样点。
 * 取自 RULER 2024 论文 + 后续复测的近似（深度 0/25/50/75/100）。
 */
const RECALL: Record<Length, Record<Diff, number[]>> = {
  "8K":   { single: [99, 98, 97, 98, 99], multi: [96, 92, 88, 92, 96] },
  "32K":  { single: [98, 92, 84, 92, 97], multi: [88, 72, 60, 70, 85] },
  "128K": { single: [94, 78, 58, 76, 90], multi: [76, 52, 36, 48, 70] },
  "1M":   { single: [86, 58, 32, 52, 78], multi: [62, 32, 18, 28, 55] },
};

const LENGTHS: { id: Length; label: string; note: string }[] = [
  { id: "8K", label: "8K", note: "GPT-3.5 时代" },
  { id: "32K", label: "32K", note: "早期 long" },
  { id: "128K", label: "128K", note: "GPT-4o · Claude 3.5" },
  { id: "1M", label: "1M", note: "Gemini 2.5 / Claude Sonnet 4" },
];

const DIFFS: { id: Diff; label: string; sub: string }[] = [
  { id: "single", label: "找单个事实", sub: "needle in a haystack" },
  { id: "multi", label: "聚合 3 处证据", sub: "multi-hop · 真实 RAG 查询" },
];

/** 用 5 个 anchor 点做 catmull-rom-like 插值，输出 100 段路径 d */
function buildPath(samples: number[]): string {
  const points: [number, number][] = samples.map((y, i) => [(i / 4) * 300 + 10, 110 - (y / 100) * 90]);
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const cx1 = x1 + (x2 - x1) * 0.5;
    const cx2 = x1 + (x2 - x1) * 0.5;
    d += ` C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
  }
  return d;
}

/** 按当前 depth (0-100) 在采样数组里插值 */
function recallAt(samples: number[], depth: number): number {
  const t = (depth / 100) * 4;
  const i0 = Math.floor(t);
  const i1 = Math.min(4, i0 + 1);
  const f = t - i0;
  return samples[i0] * (1 - f) + samples[i1] * f;
}

const SectionLostInTheMiddle: React.FC = () => {
  const [length, setLength] = useState<Length>("128K");
  const [diff, setDiff] = useState<Diff>("multi");
  const [depth, setDepth] = useState(50);

  const samples = RECALL[length][diff];
  const path = useMemo(() => buildPath(samples), [samples]);
  const recall = recallAt(samples, depth);

  const recallTone =
    recall >= 85 ? "text-teal" : recall >= 60 ? "text-ink" : recall >= 35 ? "text-butter-deep" : "text-coral";
  const barTone =
    recall >= 85 ? "bg-teal" : recall >= 60 ? "bg-butter-deep" : recall >= 35 ? "bg-pop" : "bg-coral";

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">long ctx · pitfall</span>
        </div>

        <h2 className="font-display text-display-lg text-ink max-w-3xl mb-3">
          1M context 不等于 1M 都能用
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-9">
          一句关键句藏在长 context 里，藏在两头模型还能找出来，藏中段就开始丢。
          拖下面那个 token 位置游标，看召回怎么塌。
        </p>

        <div className="grid lg:grid-cols-12 gap-7">
          {/* 主区：曲线 + 拖条 */}
          <div className="lg:col-span-8">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6">
              {/* 顶部数字 */}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-0.5">
                    relevant info · 召回率
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-display text-[44px] font-bold leading-none tabular-nums ${recallTone}`}>
                      {recall.toFixed(0)}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                    needle 位置
                  </div>
                  <div className="font-mono text-[14px] text-ink tabular-nums">
                    第 {depth}% 深度
                  </div>
                </div>
              </div>

              {/* SVG 曲线 */}
              <svg viewBox="0 0 320 130" className="w-full h-auto mb-3">
                {/* y 刻度网格 */}
                <g stroke="#241C15" strokeWidth="0.5" opacity="0.1">
                  <line x1="10" y1="20" x2="310" y2="20" />
                  <line x1="10" y1="65" x2="310" y2="65" />
                  <line x1="10" y1="110" x2="310" y2="110" />
                </g>
                {/* y label */}
                <g
                  fontFamily="Geist Mono, monospace"
                  fontSize="7"
                  fill="#241C15"
                  opacity="0.4"
                  textAnchor="end"
                >
                  <text x="8" y="22">100</text>
                  <text x="8" y="67">50</text>
                  <text x="8" y="113">0</text>
                </g>
                {/* x label */}
                <g
                  fontFamily="Geist Mono, monospace"
                  fontSize="7"
                  fill="#241C15"
                  opacity="0.45"
                  textAnchor="middle"
                >
                  <text x="10" y="124">开头</text>
                  <text x="160" y="124">中段</text>
                  <text x="310" y="124">结尾</text>
                </g>

                {/* 填充区 */}
                <path
                  d={`${path} L 310 110 L 10 110 Z`}
                  fill="#F4D35E"
                  opacity="0.18"
                />
                {/* 曲线 */}
                <path
                  d={path}
                  fill="none"
                  stroke="#241C15"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* 5 个 anchor 圆 */}
                {samples.map((y, i) => (
                  <circle
                    key={i}
                    cx={(i / 4) * 300 + 10}
                    cy={110 - (y / 100) * 90}
                    r="2.6"
                    fill="#241C15"
                  />
                ))}

                {/* 当前位置游标 */}
                {(() => {
                  const x = 10 + (depth / 100) * 300;
                  const y = 110 - (recall / 100) * 90;
                  return (
                    <g>
                      <line
                        x1={x}
                        y1="15"
                        x2={x}
                        y2="110"
                        stroke="#E07A5F"
                        strokeWidth="1.6"
                        strokeDasharray="3 2"
                      />
                      <circle cx={x} cy={y} r="5.5" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
                    </g>
                  );
                })()}
              </svg>

              {/* 拖条 */}
              <div className="mt-4">
                <div className="flex justify-between font-mono text-[10px] text-ink/45 uppercase tracking-[0.18em] mb-1">
                  <span>0%</span>
                  <span>把 needle 拖到哪</span>
                  <span>100%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full accent-coral"
                />
              </div>

              {/* 一句结论 */}
              <div className="mt-5 px-3.5 py-2.5 bg-cream border-l-4 border-coral rounded-r-md text-[13px] text-ink/85 leading-snug">
                {length === "8K" && diff === "single" && "8K 单点：模型读啥都答得出来，没问题。"}
                {length === "8K" && diff === "multi" && "8K 多点：中段稍降，但仍 > 85%。"}
                {length === "32K" && diff === "single" && "32K 单点：中段开始掉到 80% 出头。"}
                {length === "32K" && diff === "multi" && "32K 多点聚合：中段已掉到 60%——RAG 在这里还是更稳。"}
                {length === "128K" && diff === "single" && "128K 单点：中段只剩 58%。模型「看到」过，但答不出来。"}
                {length === "128K" && diff === "multi" && "128K 多点：中段塌到 36%。这是真实 RAG 查询常见的难度。"}
                {length === "1M" && diff === "single" && "1M 单点：中段砍半。Gemini 2.5 Pro 也救不了。"}
                {length === "1M" && diff === "multi" && "1M 多点：中段只剩 18%。这就是为什么大窗口没让 RAG 失业。"}
              </div>
            </div>
          </div>

          {/* 右侧：长度 + 难度切换 */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-2">
                ① context 总长
              </div>
              <div className="grid grid-cols-2 gap-2">
                {LENGTHS.map((l) => {
                  const on = l.id === length;
                  return (
                    <button
                      key={l.id}
                      onClick={() => setLength(l.id)}
                      className={[
                        "text-left px-3 py-2.5 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                          : "bg-white text-ink hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      <div className="font-display font-bold text-[18px]">{l.label}</div>
                      <div
                        className={[
                          "font-mono text-[10px] mt-0.5",
                          on ? "text-butter" : "text-ink/40",
                        ].join(" ")}
                      >
                        {l.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-2">
                ② 任务难度
              </div>
              <div className="space-y-2">
                {DIFFS.map((d) => {
                  const on = d.id === diff;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDiff(d.id)}
                      className={[
                        "w-full text-left px-3.5 py-2.5 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                        on
                          ? "bg-coral text-white shadow-stamp -translate-y-0.5"
                          : "bg-white text-ink hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      <div className="font-semibold text-[14px]">{d.label}</div>
                      <div
                        className={[
                          "font-mono text-[10px] mt-0.5",
                          on ? "text-white/75" : "text-ink/40",
                        ].join(" ")}
                      >
                        {d.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 数据条 */}
            <div className="bg-white border-2 border-ink rounded-2xl p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-2">
                此刻召回率
              </div>
              <div className="h-3 bg-ink/8 rounded-full overflow-hidden border border-ink/15 mb-2">
                <div
                  className={`h-full ${barTone} transition-all duration-300 ease-spring`}
                  style={{ width: `${recall}%` }}
                />
              </div>
              <p className="text-[11.5px] text-ink/60 leading-snug">
                90+ 可用 · 60-90 边缘 · 60 以下别再赌
              </p>
            </div>
          </div>
        </div>

        <p className="mt-7 font-mono text-[10px] text-ink/40">
          数据来源：Liu et al. Lost in the Middle arXiv:2307.03172（2023）+ RULER NVIDIA 2024 +
          dev.to 实测复盘 2025-10 · 不同模型有差，曲线为同窗口数尺寸中位数
        </p>
      </div>
    </section>
  );
};

export default SectionLostInTheMiddle;
