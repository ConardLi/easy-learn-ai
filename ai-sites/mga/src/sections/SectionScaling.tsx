import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

const POINTS = [
  { size: "377M", x: 0, baseline: 32.1, cosmo: 35.6, mga: 37.3 },
  { size: "1.3B", x: 1, baseline: 41.8, cosmo: 43.1, mga: 46.2 },
  { size: "7B", x: 2, baseline: 52.3, cosmo: 54.7, mga: 58.9 },
  { size: "13B", x: 3, baseline: 58.1, cosmo: 61.2, mga: 65.4 },
];

const W = 640;
const H = 340;
const PAD_L = 56;
const PAD_R = 32;
const PAD_T = 28;
const PAD_B = 44;
const Y_MIN = 28;
const Y_MAX = 70;

function sx(x: number) {
  return PAD_L + (x / 3) * (W - PAD_L - PAD_R);
}
function sy(v: number) {
  return PAD_T + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * (H - PAD_T - PAD_B);
}

const SERIES: { key: keyof (typeof POINTS)[0]; color: string; label: string }[] = [
  { key: "baseline", color: "#88837C", label: "直接重复 baseline" },
  { key: "cosmo", color: "#E07A5F", label: "Cosmopedia 合成" },
  { key: "mga", color: "#1B4B5A", label: "MGA 重写" },
];

export default function SectionScaling() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <SectionFrame num="05" label="Scaling 验证">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        模型越大，差距越拉得开。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        ByteDance 团队把三种数据策略一路 sweep 到 13B 参数 — MGA 的领先没有被规模稀释，反而比小模型更明显。这是 scaling-friendly 数据策略的重要信号。
      </p>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 items-start">
        <div className="card-stamp p-6 bg-white">
          <div className="flex items-center justify-between mb-3 font-mono text-xs text-ink-tertiary">
            <span>下游平均得分 · % 越高越好</span>
            <span className="font-semibold text-ink">MODEL SIZE</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {[30, 40, 50, 60, 70].map((v) => (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={sy(v)}
                  x2={W - PAD_R}
                  y2={sy(v)}
                  stroke="#241C15"
                  strokeOpacity={0.08}
                />
                <text
                  x={PAD_L - 8}
                  y={sy(v) + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontFamily="Geist Mono, monospace"
                  fill="#88837C"
                >
                  {v}
                </text>
              </g>
            ))}
            {POINTS.map((p) => (
              <text
                key={p.x}
                x={sx(p.x)}
                y={H - 14}
                textAnchor="middle"
                fontSize="12"
                fontFamily="Geist Mono, monospace"
                fill="#5A5147"
                fontWeight="600"
              >
                {p.size}
              </text>
            ))}

            {SERIES.map((s) => {
              const d = POINTS.map(
                (p, i) =>
                  `${i === 0 ? "M" : "L"}${sx(p.x)},${sy(p[s.key] as number)}`,
              ).join(" ");
              return (
                <path
                  key={s.key}
                  d={d}
                  stroke={s.color}
                  strokeWidth={3}
                  fill="none"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              );
            })}

            {POINTS.map((p, i) =>
              SERIES.map((s) => (
                <circle
                  key={`${i}-${s.key}`}
                  cx={sx(p.x)}
                  cy={sy(p[s.key] as number)}
                  r={hover === i ? 8 : 5}
                  fill={s.color}
                  stroke="#241C15"
                  strokeWidth={2}
                  style={{ transition: "r 0.2s" }}
                />
              )),
            )}

            {POINTS.map((p, i) => (
              <rect
                key={i}
                x={sx(p.x) - 40}
                y={PAD_T}
                width={80}
                height={H - PAD_T - PAD_B}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            ))}

            {hover !== null && (
              <g>
                <line
                  x1={sx(POINTS[hover].x)}
                  y1={PAD_T}
                  x2={sx(POINTS[hover].x)}
                  y2={H - PAD_B}
                  stroke="#241C15"
                  strokeOpacity={0.3}
                  strokeDasharray="4 4"
                />
              </g>
            )}
          </svg>

          <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono">
            {SERIES.map((s) => (
              <span key={s.key} className="flex items-center gap-2 text-ink-secondary">
                <span
                  className="w-3 h-3 border border-ink"
                  style={{ background: s.color }}
                />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {(hover === null ? POINTS : [POINTS[hover]]).map((p) => {
            const gapVsBase = (p.mga - p.baseline).toFixed(1);
            const gapVsCosmo = (p.mga - p.cosmo).toFixed(1);
            return (
              <div
                key={p.size}
                className="card-stamp p-5 bg-cream"
                onMouseEnter={() => setHover(POINTS.indexOf(p))}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="font-display text-2xl font-bold text-ink">
                    {p.size}
                  </span>
                  <span className="font-mono text-xs text-ink-tertiary">参数规模</span>
                </div>
                <div className="space-y-2">
                  <Row label="MGA" value={p.mga} color="#1B4B5A" />
                  <Row label="Cosmo" value={p.cosmo} color="#E07A5F" />
                  <Row label="Base" value={p.baseline} color="#88837C" />
                </div>
                <div className="mt-4 pt-3 border-t border-ink/10 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <div className="text-ink-tertiary">vs 重复 baseline</div>
                    <div className="text-teal font-bold text-base">+{gapVsBase}</div>
                  </div>
                  <div>
                    <div className="text-ink-tertiary">vs Cosmopedia</div>
                    <div className="text-teal font-bold text-base">+{gapVsCosmo}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <p className="text-xs text-ink-tertiary font-mono leading-relaxed px-1">
            悬浮图表上的数据点查看单一规模的细节。 数据自论文 Table 2 简化整理 · 13B 实验为关键 scaling 验证。
          </p>
        </div>
      </div>
    </SectionFrame>
  );
}

function Row({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        className="w-2.5 h-2.5 flex-shrink-0 border border-ink"
        style={{ background: color }}
      />
      <span className="font-mono text-xs text-ink-tertiary w-12">{label}</span>
      <span className="font-mono text-ink font-semibold flex-1 text-right">
        {value.toFixed(1)}
      </span>
      <div className="w-20 h-2 bg-white border border-ink/30 overflow-hidden">
        <div
          className="h-full"
          style={{ width: `${((value - 28) / 42) * 100}%`, background: color }}
        />
      </div>
    </div>
  );
}
