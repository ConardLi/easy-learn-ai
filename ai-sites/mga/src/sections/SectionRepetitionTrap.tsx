import React, { useMemo, useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { RotateCcw, AlertTriangle, ExternalLink } from "lucide-react";

const POINTS = [
  { epoch: 1, base: 2.34, mga: 2.34 },
  { epoch: 2, base: 2.37, mga: 2.35 },
  { epoch: 3, base: 2.41, mga: 2.36 },
  { epoch: 4, base: 2.45, mga: 2.37 },
  { epoch: 5, base: 2.48, mga: 2.38 },
  { epoch: 6, base: 2.52, mga: 2.39 },
  { epoch: 8, base: 2.56, mga: 2.41 },
  { epoch: 10, base: 2.59, mga: 2.42 },
];

const MIN = 2.3;
const MAX = 2.65;
const PAD_L = 56;
const PAD_R = 24;
const PAD_T = 24;
const PAD_B = 40;
const W = 640;
const H = 320;

function sx(e: number) {
  return PAD_L + ((e - 1) / 9) * (W - PAD_L - PAD_R);
}
function sy(v: number) {
  return PAD_T + (1 - (v - MIN) / (MAX - MIN)) * (H - PAD_T - PAD_B);
}

export default function SectionRepetitionTrap() {
  const [epoch, setEpoch] = useState(5);

  const pt = useMemo(() => {
    return POINTS.reduce((closest, p) =>
      Math.abs(p.epoch - epoch) < Math.abs(closest.epoch - epoch) ? p : closest,
    );
  }, [epoch]);

  const gap = (pt.base - pt.mga).toFixed(2);

  const basePath = POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.epoch)},${sy(p.base)}`).join(" ");
  const mgaPath = POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${sx(p.epoch)},${sy(p.mga)}`).join(" ");

  return (
    <SectionFrame num="01" label="Why MGA" background="bg-butter/30">
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink leading-tight mb-6">
            同样的数据训第二遍，
            <br />
            考分不降反升。
          </h2>
          <p className="text-base text-ink-secondary leading-relaxed mb-4 bg-cream border-l-4 border-coral pl-4 py-2">
            先认两个词：<strong className="text-ink">loss</strong> = 模型的考分，越低越好；<strong className="text-ink">epoch</strong> = 同一批数据训到第几遍（epoch=2 就是第二遍）。
          </p>
          <p className="text-lg text-ink-secondary leading-relaxed mb-4">
            把同一批 token（文本切成的小块，约等于字 / 词）训过 3 遍以上，模型在没见过的题目上考分（验证集 loss）会慢慢往上爬 —— 业内管这叫「重复退化」。
          </p>
          <p className="text-lg text-ink-secondary leading-relaxed mb-4">
            多训几遍并不会让它更聪明，只是在死背训练集里的噪声；遇到没背过的内容，泛化就会变差。继续训，越训越差。
          </p>
          <p className="text-base text-ink-tertiary leading-relaxed">
            MGA 想做的事：让每一遍训练看到的字面都不一样，背后的知识却还是同一份。
          </p>

          <a
            href="../pretrain/index.html"
            className="mt-6 inline-flex items-start gap-3 px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">「数据墙」是怎么来的？</span>
              <span className="text-ink/70">
                {" "}
                干净语料为什么会见底、模型规模和数据量该怎么配，
                <strong className="text-ink">《预训练》</strong>里讲得更全。
              </span>
            </span>
          </a>

          <div className="mt-6 p-4 bg-cream border-2 border-ink rounded-2xl shadow-stamp inline-flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-coral" />
            <span className="text-sm font-mono text-ink">
              拖动看训练遍数变多时，两条线怎么分开
            </span>
          </div>
        </div>

        <div className="card-stamp p-6">
          <div className="flex items-center justify-between mb-4 font-mono text-xs text-ink-tertiary">
            <span>验证集考分 VALIDATION LOSS · 越低越好</span>
            <span className="font-semibold text-ink">训练遍数 DATA EPOCHS</span>
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {[2.3, 2.4, 2.5, 2.6].map((v) => (
              <g key={v}>
                <line
                  x1={PAD_L}
                  y1={sy(v)}
                  x2={W - PAD_R}
                  y2={sy(v)}
                  stroke="#241C15"
                  strokeOpacity={0.08}
                  strokeWidth={1}
                />
                <text
                  x={PAD_L - 8}
                  y={sy(v) + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontFamily="Geist Mono, monospace"
                  fill="#88837C"
                >
                  {v.toFixed(1)}
                </text>
              </g>
            ))}
            {[1, 3, 5, 8, 10].map((e) => (
              <text
                key={e}
                x={sx(e)}
                y={H - 12}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Geist Mono, monospace"
                fill="#88837C"
              >
                {e}×
              </text>
            ))}

            <path
              d={basePath}
              stroke="#E07A5F"
              strokeWidth={3}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d={mgaPath}
              stroke="#1B4B5A"
              strokeWidth={3}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            <line
              x1={sx(pt.epoch)}
              y1={PAD_T}
              x2={sx(pt.epoch)}
              y2={H - PAD_B}
              stroke="#241C15"
              strokeOpacity={0.4}
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />

            <circle cx={sx(pt.epoch)} cy={sy(pt.base)} r={6} fill="#E07A5F" stroke="#241C15" strokeWidth={2} />
            <circle cx={sx(pt.epoch)} cy={sy(pt.mga)} r={6} fill="#1B4B5A" stroke="#241C15" strokeWidth={2} />

            <g transform={`translate(${sx(pt.epoch) + 10}, ${sy(pt.base) - 12})`}>
              <rect x={0} y={-14} width={64} height={20} fill="#E07A5F" stroke="#241C15" strokeWidth={2} rx={4} />
              <text x={32} y={1} textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="white" fontWeight="600">
                {pt.base.toFixed(2)}
              </text>
            </g>
            <g transform={`translate(${sx(pt.epoch) + 10}, ${sy(pt.mga) + 16})`}>
              <rect x={0} y={-14} width={64} height={20} fill="#1B4B5A" stroke="#241C15" strokeWidth={2} rx={4} />
              <text x={32} y={1} textAnchor="middle" fontSize="11" fontFamily="Geist Mono, monospace" fill="white" fontWeight="600">
                {pt.mga.toFixed(2)}
              </text>
            </g>
          </svg>

          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={epoch}
            onChange={(e) => setEpoch(Number(e.target.value))}
            className="mt-2 w-full accent-ink"
          />

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-coral border border-ink" />
                <span className="text-ink-secondary">直接重复训练</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-teal border border-ink" />
                <span className="text-ink-secondary">MGA 重写后训练</span>
              </span>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-ink-tertiary">差距</div>
              <div className="font-display text-2xl text-coral font-bold flex items-center gap-1">
                <RotateCcw className="w-5 h-5" />
                {gap}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
