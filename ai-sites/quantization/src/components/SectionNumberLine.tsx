/**
 * Section 02 · 数轴上发生了什么
 *
 * 讲清"量化的本质" —— 数轴被切成 2^bits 段，每个原始权重被吸附到最近 bin 中心。
 *
 * 这是 patterns 里的 slider 多视图（L3），区别于 Hero 的 pill + 单视图（L4）。
 *
 * 可动元素：
 *   ① 顶部 slider 调 bit 数（连续，区别于 hero 的离散 pill）
 *   ② 右上 toggle 「显示原始位置」（看吸附的"位移"）
 *   ③ 每个点 hover 看 (原 → 量化) 具体值（基础礼貌，不算第 3 个）
 */
import React, { useMemo, useState } from "react";

const TICKS = [-1.5, -1, -0.5, 0, 0.5, 1, 1.5];

/** 用确定算法生成一组类高斯分布权重（不依赖 Math.random，避免每次 render 抖） */
const WEIGHTS = generateBellSample(48);

const SectionNumberLine: React.FC = () => {
  const [bits, setBits] = useState(3);
  const [showOriginal, setShowOriginal] = useState(true);

  /* 计算 bin 边界、量化值、MSE */
  const { binEdges, quantized, mse, levels } = useMemo(() => {
    const lvls = Math.pow(2, bits);
    const range = 3; // -1.5 ~ 1.5
    const step = range / (lvls - 1);
    const edges: number[] = [];
    for (let i = 0; i <= lvls; i++) edges.push(-1.5 + i * step - step / 2);
    const q = WEIGHTS.map((w) => {
      const idx = Math.round((w + 1.5) / step);
      const clamped = Math.max(0, Math.min(lvls - 1, idx));
      return clamped * step - 1.5;
    });
    const e = WEIGHTS.reduce((s, w, i) => s + (w - q[i]) ** 2, 0) / WEIGHTS.length;
    return { binEdges: edges, quantized: q, mse: e, levels: lvls };
  }, [bits]);

  const compression = (32 / bits).toFixed(1);

  /* viewBox 600×220 · 数轴 y=140，散点 y 抖动 60-110 */
  const xScale = (v: number) => 40 + ((v + 1.5) / 3) * 520; // 边距 40

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">on the number line</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          量化的真相，就是把数轴
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">切几刀</span>
          </span>
          ，然后让每个值都<span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/50 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">就近站队</span>
          </span>。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          原始权重是连续的实数。量化把数轴切成
          <strong className="text-ink">2<sup>n</sup> 段</strong>，
          每个权重被「吸附」到所在段的中心点。切得越粗（bit 越小），段数越少，吸附距离越远 —— 这就是误差的来源。
        </p>

        {/* 控制区：左 slider / 右 toggle */}
        <div className="grid sm:grid-cols-12 gap-4 mb-6">
          <div className="sm:col-span-8 p-4 bg-cream border-2 border-ink rounded-2xl">
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                bit 数 · drag
              </div>
              <div className="font-display text-[24px] font-bold text-ink tabular-nums">
                {bits} <span className="font-mono text-[11px] text-ink/50">bit</span>
                <span className="ml-3 font-mono text-[11px] text-ink/45">
                  · {levels} 个 level
                </span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={bits}
              onChange={(e) => setBits(Number(e.target.value))}
              className="w-full accent-coral cursor-pointer"
            />
            <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
              <span>1 bit</span>
              <span>4 bit</span>
              <span>8 bit</span>
            </div>
          </div>

          <button
            onClick={() => setShowOriginal((v) => !v)}
            className={[
              "sm:col-span-4 p-4 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
              showOriginal
                ? "bg-ink text-cream shadow-stamp"
                : "bg-white text-ink hover:bg-cream shadow-[2px_2px_0_0_#241C15]",
            ].join(" ")}
          >
            <div className={["font-mono text-[10px] uppercase tracking-[0.2em] mb-1", showOriginal ? "text-butter" : "text-ink/55"].join(" ")}>
              show original · toggle
            </div>
            <div className="font-display text-[15px] font-bold leading-tight">
              {showOriginal ? "显示原始位置 · ON" : "只看量化结果 · OFF"}
            </div>
          </button>
        </div>

        {/* 主可视化：数轴 + 散点 + bin */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 overflow-hidden">
          <svg viewBox="0 0 600 220" className="w-full h-auto">
            {/* bin 区域 alternating 背景 */}
            {Array.from({ length: levels }).map((_, i) => {
              const x1 = xScale(binEdges[i]);
              const x2 = xScale(binEdges[i + 1]);
              return (
                <rect
                  key={`bin-${i}`}
                  x={x1}
                  y={20}
                  width={x2 - x1}
                  height={140}
                  fill={i % 2 === 0 ? "#FBEFE3" : "#F4D35E"}
                  fillOpacity="0.35"
                />
              );
            })}

            {/* bin 边界 */}
            {binEdges.slice(1, -1).map((e, i) => (
              <line
                key={`edge-${i}`}
                x1={xScale(e)}
                y1={20}
                x2={xScale(e)}
                y2={160}
                stroke="#241C15"
                strokeWidth="0.8"
                opacity="0.35"
                strokeDasharray="3 3"
              />
            ))}

            {/* bin 中心点 marker（在数轴上） */}
            {Array.from({ length: levels }).map((_, i) => {
              const center = (binEdges[i] + binEdges[i + 1]) / 2;
              return (
                <line
                  key={`center-${i}`}
                  x1={xScale(center)}
                  y1={155}
                  x2={xScale(center)}
                  y2={165}
                  stroke="#241C15"
                  strokeWidth="2"
                />
              );
            })}

            {/* 数轴主线 */}
            <line x1="40" y1="160" x2="560" y2="160" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />

            {/* 数轴刻度 */}
            {TICKS.map((t) => (
              <g key={`tick-${t}`}>
                <line x1={xScale(t)} y1={160} x2={xScale(t)} y2={166} stroke="#241C15" strokeWidth="1.5" />
                <text x={xScale(t)} y={184} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#88837C">
                  {t}
                </text>
              </g>
            ))}

            {/* 权重散点：原始（淡 + 小） + 量化后（实 + 大） + 连线 */}
            {WEIGHTS.map((w, i) => {
              const x1 = xScale(w);
              const x2 = xScale(quantized[i]);
              const y = 75 + (i % 7) * 9; // 视觉错落
              const moved = Math.abs(w - quantized[i]) > 0.01;
              return (
                <g key={`pt-${i}`}>
                  {showOriginal && moved && (
                    <>
                      <line
                        x1={x1}
                        y1={y}
                        x2={x2}
                        y2={y}
                        stroke="#E07A5F"
                        strokeWidth="0.8"
                        opacity="0.55"
                      />
                      <circle
                        cx={x1}
                        cy={y}
                        r="2.5"
                        fill="#FBEFE3"
                        stroke="#241C15"
                        strokeWidth="0.8"
                        opacity="0.55"
                      />
                    </>
                  )}
                  <circle
                    cx={x2}
                    cy={y}
                    r="3.2"
                    fill={moved ? "#E07A5F" : "#1B4B5A"}
                    stroke="#241C15"
                    strokeWidth="1"
                  >
                    <title>{`原: ${w.toFixed(3)} → 量化: ${quantized[i].toFixed(3)}`}</title>
                  </circle>
                </g>
              );
            })}

            {/* 注释 */}
            <text x="40" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" opacity="0.6">
              bin · 每段一个吸附中心
            </text>
            <text x="560" y="14" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#E07A5F" opacity="0.85">
              {showOriginal ? "● 原始  → ● 量化" : "● 量化后位置"}
            </text>
            <text x="40" y="208" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
              鼠标悬浮单点看具体值
            </text>
          </svg>
        </div>

        {/* metric 三卡 */}
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          <MetricCard label="平均误差 · MSE" value={mse.toFixed(4)} tone={mse < 0.005 ? "good" : mse < 0.05 ? "mid" : "bad"} />
          <MetricCard label="量化等级数" value={levels.toString()} suffix="个" tone="ink" />
          <MetricCard label="压缩比" value={`↓${compression}×`} tone="ink" />
        </div>
      </div>
    </section>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  suffix?: string;
  tone: "good" | "mid" | "bad" | "ink";
}> = ({ label, value, suffix, tone }) => {
  const toneClass = {
    good: "text-teal",
    mid: "text-butter-deep",
    bad: "text-coral",
    ink: "text-ink",
  }[tone];
  return (
    <div className="p-4 bg-cream border-2 border-ink rounded-2xl">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-display text-[26px] font-bold tabular-nums ${toneClass}`}>
          {value}
        </span>
        {suffix && <span className="font-mono text-[11px] text-ink/50">{suffix}</span>}
      </div>
    </div>
  );
};

/** 简易类高斯分布权重生成（确定算法 · 不引随机） */
function generateBellSample(n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    /* 用三角分布近似钟形：两个 uniform 求平均 */
    const u1 = ((i * 2654435761) % 997) / 997;
    const u2 = ((i * 40503 + 13) % 991) / 991;
    const u3 = ((i * 75 + 47) % 983) / 983;
    /* 三个 uniform 求平均 ≈ 中心极限 */
    const t = (u1 + u2 + u3) / 3; // 0~1
    /* 映射到 [-1.3, 1.3] */
    out.push(Number(((t - 0.5) * 2.6).toFixed(4)));
  }
  return out;
}

export default SectionNumberLine;
