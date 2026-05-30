/**
 * Section 04 · LIMA 假说·1000 条 vs 50000 条
 *
 * 反直觉钩子：LIMA 2023 论文 —— 1000 条手挑高质量 SFT 数据，65B LLaMA 跑赢 52000 条 Alpaca。
 *
 * 交互（L3 slider × 2）：用户调"数量 N"和"质量 Q"，看模拟得分曲线。
 * 验证一句话：quality × quantity 这个乘积有顶 —— 烂数据再多也救不回。
 *
 * 数据来源：LIMA arXiv:2305.11206 / Tulu 3 arXiv:2411.15124 / TuluTalk arXiv:2506.06522
 */
import React, { useState, useMemo } from "react";

const SectionLimaBet: React.FC = () => {
  /* N = 数据量（log scale 1~6, 即 10^1 ~ 10^6） */
  const [logN, setLogN] = useState(3); // 默认 1000
  /* Q = 质量百分位（0~100，高 = 经过严格人工挑选 + 去重） */
  const [Q, setQ] = useState(95);

  /* 模拟得分函数（不严谨，参考 LIMA / TuluTalk / OpenHermes 实测趋势）：
     score = sigmoid( logN ) × quality_factor，质量太低有上限封顶。 */
  const score = useMemo(() => {
    const n = Math.pow(10, logN);
    const qNorm = Q / 100;
    // 量的贡献：log 增长，到 5K 左右进入收益递减
    const qty = Math.tanh(Math.log10(n) / 2.4) * 100;
    // 质量惩罚：质量 < 60 时上限严格压
    const qualityCap = 30 + 70 * Math.pow(qNorm, 0.8);
    return Math.min(qty * (0.5 + 0.5 * qNorm), qualityCap);
  }, [logN, Q]);

  /* 真实参考点 */
  const REFS = [
    { name: "LIMA", n: 1000, q: 98, s: 78, note: "Meta 2023 · 750 网络精选 + 250 手写" },
    { name: "Alpaca", n: 52000, q: 55, s: 62, note: "Stanford 2023 · GPT-3.5 一键生" },
    { name: "OpenHermes", n: 1000000, q: 78, s: 81, note: "Teknium · 多源混合" },
    { name: "Magpie-Air-300K", n: 300000, q: 88, s: 84, note: "Llama 3 自抽取 · 2024" },
    { name: "Tulu 3 SFT-Mix", n: 939343, q: 88, s: 86, note: "AllenAI 2024 · 9 桶 23M 候选去重" },
  ];

  const N = Math.pow(10, logN);
  const formatN = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(n >= 1e4 ? 0 : 1) + "K";
    return Math.round(n).toString();
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">DATA 质量 × 数量</span>
        </div>

        <h2 className="font-display text-display-lg mb-3">
          1000 条好数据，能打 50000 条普通数据
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          这是 Meta 2023 年发表 LIMA 论文得出的结论：65B LLaMA 只用 1000 条精挑细选的（提问，回答），人类盲测 43% 答案不输给 GPT-4。三年后这一假说大体成立，但 2026 主流配方走向了「数十万条 + 严格过滤」的中道。下面拖两根 slider 自己试。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：两根 slider + 实时得分 */}
          <div className="lg:col-span-5 space-y-5">
            <SliderRow
              label="数据量 N"
              value={logN}
              min={1}
              max={6}
              step={0.1}
              onChange={setLogN}
              display={formatN(N)}
              sub="条 instruction-response 对"
            />
            <SliderRow
              label="质量 Q"
              value={Q}
              min={0}
              max={100}
              step={1}
              onChange={setQ}
              display={`${Q}`}
              sub="百分位 · 100 = 严格人工挑选 + 去重 + 去 hallucination"
            />

            {/* 实时得分 */}
            <div className="bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  AlpacaEval 估算分
                </div>
                <div className="font-mono text-[10px] text-ink/45">满分 100</div>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className={[
                    "font-display text-[52px] font-bold leading-none tabular-nums",
                    score >= 80 ? "text-teal" : score >= 60 ? "text-ink" : "text-coral",
                  ].join(" ")}
                >
                  {score.toFixed(1)}
                </span>
                <span className="font-mono text-[11px] text-ink/50">分</span>
              </div>
              <div className="h-3 bg-cream border-2 border-ink rounded-full overflow-hidden">
                <div
                  className={[
                    "h-full transition-all duration-400 ease-spring",
                    score >= 80 ? "bg-teal" : score >= 60 ? "bg-butter-deep" : "bg-coral",
                  ].join(" ")}
                  style={{ width: `${Math.min(score, 100)}%` }}
                />
              </div>
              <p className="mt-3 font-sans text-[12.5px] text-ink/70 leading-relaxed">
                {Q < 50
                  ? "质量太低，数据再多也压不上来 —— alignment tax 提前到账。"
                  : score > 80
                  ? "好数据 + 中等量级，超过很多大模型 SFT 配方。"
                  : "中规中矩。还能再涨，试试拉高质量。"}
              </p>
            </div>
          </div>

          {/* 右：真实点位散落图 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ↑ 真实 SFT 配方落位 · 你的点 = 红圈
              </div>

              {/* SVG 散点图 */}
              <div className="aspect-[5/3] w-full">
                <svg viewBox="0 0 500 300" className="w-full h-full">
                  <defs>
                    <pattern
                      id="grid-fine"
                      x="0"
                      y="0"
                      width="50"
                      height="30"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M50 0 L0 0 L0 30"
                        fill="none"
                        stroke="#241C15"
                        strokeWidth="0.5"
                        opacity="0.08"
                      />
                    </pattern>
                  </defs>
                  <rect
                    x="40"
                    y="20"
                    width="440"
                    height="240"
                    fill="url(#grid-fine)"
                  />
                  {/* 轴 */}
                  <line
                    x1="40"
                    y1="260"
                    x2="480"
                    y2="260"
                    stroke="#241C15"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="40"
                    y1="20"
                    x2="40"
                    y2="260"
                    stroke="#241C15"
                    strokeWidth="1.5"
                  />
                  {/* x 轴刻度（log） */}
                  {[1, 2, 3, 4, 5, 6].map((d) => {
                    const x = 40 + ((d - 1) / 5) * 440;
                    return (
                      <g key={d}>
                        <line
                          x1={x}
                          y1="260"
                          x2={x}
                          y2="264"
                          stroke="#241C15"
                          strokeWidth="1.2"
                        />
                        <text
                          x={x}
                          y="278"
                          fontFamily="Geist Mono, monospace"
                          fontSize="9"
                          fill="#88837C"
                          textAnchor="middle"
                        >
                          10^{d}
                        </text>
                      </g>
                    );
                  })}
                  <text
                    x="260"
                    y="295"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fill="#5A5147"
                    textAnchor="middle"
                  >
                    数据量 N
                  </text>
                  {/* y 轴刻度 */}
                  {[0, 25, 50, 75, 100].map((y) => {
                    const yPos = 260 - (y / 100) * 240;
                    return (
                      <g key={y}>
                        <line
                          x1="36"
                          y1={yPos}
                          x2="40"
                          y2={yPos}
                          stroke="#241C15"
                          strokeWidth="1.2"
                        />
                        <text
                          x="30"
                          y={yPos + 3}
                          fontFamily="Geist Mono, monospace"
                          fontSize="9"
                          fill="#88837C"
                          textAnchor="end"
                        >
                          {y}
                        </text>
                      </g>
                    );
                  })}

                  {/* 真实点位 */}
                  {REFS.map((r) => {
                    const x = 40 + ((Math.log10(r.n) - 1) / 5) * 440;
                    const y = 260 - (r.s / 100) * 240;
                    return (
                      <g key={r.name}>
                        <circle
                          cx={x}
                          cy={y}
                          r="6"
                          fill="#F4D35E"
                          stroke="#241C15"
                          strokeWidth="2"
                        />
                        <text
                          x={x + 9}
                          y={y - 6}
                          fontFamily="Geist Mono, monospace"
                          fontSize="9.5"
                          fontWeight="700"
                          fill="#241C15"
                        >
                          {r.name}
                        </text>
                        <text
                          x={x + 9}
                          y={y + 5}
                          fontFamily="Geist Mono, monospace"
                          fontSize="8.5"
                          fill="#88837C"
                        >
                          {r.s} 分
                        </text>
                      </g>
                    );
                  })}

                  {/* 用户点 */}
                  {(() => {
                    const x = 40 + ((logN - 1) / 5) * 440;
                    const y = 260 - (score / 100) * 240;
                    return (
                      <g>
                        <circle
                          cx={x}
                          cy={y}
                          r="14"
                          fill="none"
                          stroke="#E07A5F"
                          strokeWidth="2.5"
                          strokeDasharray="4 3"
                          className="animate-dash-flow"
                        />
                        <circle cx={x} cy={y} r="5" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* 数据集小卡 */}
              <div className="grid sm:grid-cols-2 gap-2 mt-4">
                {REFS.map((r) => (
                  <div
                    key={r.name}
                    className="px-3 py-2 bg-cream border-2 border-ink/25 rounded-lg"
                  >
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[11.5px] font-bold text-ink">
                        {r.name}
                      </span>
                      <span className="font-mono text-[10px] text-ink/55">
                        {formatN(r.n)} · {r.s} 分
                      </span>
                    </div>
                    <p className="font-mono text-[10px] text-ink/55 mt-0.5">
                      {r.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-3 font-mono text-[10px] text-ink/50 leading-relaxed">
              source · LIMA arXiv:2305.11206 / Alpaca crfm.stanford.edu / Magpie arXiv:2406.08464 / Tulu 3 arXiv:2411.15124 / TuluTalk arXiv:2506.06522
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
  sub,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
  sub: string;
}) {
  return (
    <div className="bg-white border-2 border-ink rounded-xl p-4">
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
          {label}
        </span>
        <span className="font-display text-[28px] font-bold text-ink leading-none tabular-nums">
          {display}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-coral"
      />
      <p className="mt-1 font-mono text-[10px] text-ink/50">{sub}</p>
    </div>
  );
}

export default SectionLimaBet;
