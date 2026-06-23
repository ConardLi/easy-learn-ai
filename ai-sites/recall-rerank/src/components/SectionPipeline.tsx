import React, { useMemo, useState } from "react";
import { Gauge, SearchCheck } from "lucide-react";
import { cx, MiniBadge, ScoreBar, SectionShell } from "./common";

const SectionPipeline: React.FC = () => {
  const [recallK, setRecallK] = useState(40);
  const [rerankN, setRerankN] = useState(5);

  const stats = useMemo(() => {
    const recall = Math.min(96, 48 + Math.log2(recallK) * 8);
    const precision = Math.max(48, Math.min(94, 62 + rerankN * 3 - Math.max(0, recallK - 60) * 0.12));
    const cost = Math.round(18 + recallK * 0.6 + rerankN * 5);
    const delay = Math.round(90 + recallK * 3 + rerankN * 26);
    return { recall, precision, cost, delay };
  }, [recallK, rerankN]);

  return (
    <SectionShell num="05" label="two stage pipeline" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-teal p-2 text-cream shadow-stamp">
            <SearchCheck className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg text-ink">两段式把快和准分开处理。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>召回要快，因为它要面对整个资料库。它先把范围缩小到几十条。</p>
            <p>重排要准，因为它只看这几十条。最后给 AI 的通常只有几条，顺序很要命。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 shadow-stamp">
            <div className="mb-5 flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              <span className="font-bold">调一下这两个旋钮</span>
            </div>
            <Control label="召回候选数" value={recallK} suffix="条" min={10} max={100} step={10} onChange={setRecallK} />
            <div className="mt-5">
              <Control label="重排后给 AI 的数量" value={rerankN} suffix="条" min={2} max={10} step={1} onChange={setRerankN} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink/60">示意曲线，帮你感受取舍，不是线上系统的真实延迟。</p>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-5 grid gap-3 sm:grid-cols-2">
            <Stat title="漏资料风险" value={`${Math.max(4, Math.round(100 - stats.recall))}%`} lowGood />
            <Stat title="答案依据质量" value={`${Math.round(stats.precision)}%`} />
            <Stat title="示意成本" value={String(stats.cost)} />
            <Stat title="示意延迟" value={`${stats.delay}ms`} />
          </div>

          <div className="rounded-2xl border-2 border-ink bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <MiniBadge>资料流向</MiniBadge>
              <span className="text-sm font-bold text-ink/62">全库 → 召回 {recallK} 条 → 重排 {rerankN} 条 → AI 回答</span>
            </div>
            <PipelineSvg recallK={recallK} rerankN={rerankN} />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ScoreBar label="召回覆盖" value={stats.recall} color="bg-teal" />
              <ScoreBar label="重排精度" value={stats.precision} color="bg-coral" />
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const Control: React.FC<{
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}> = ({ label, value, suffix, min, max, step, onChange }) => (
  <div>
    <div className="flex items-center justify-between gap-3">
      <MiniBadge>{label}</MiniBadge>
      <span className="font-mono text-sm font-bold">
        {value} {suffix}
      </span>
    </div>
    <input
      className="mt-4 w-full accent-coral"
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
  </div>
);

const Stat: React.FC<{ title: string; value: string; lowGood?: boolean }> = ({ title, value, lowGood = false }) => (
  <div className={cx("rounded-2xl border-2 border-ink p-4", lowGood ? "bg-white" : "bg-cream")}>
    <div className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-ink/50">{title}</div>
    <div className="mt-1 font-display text-[32px] font-bold leading-none text-ink">{value}</div>
  </div>
);

const PipelineSvg: React.FC<{ recallK: number; rerankN: number }> = ({ recallK, rerankN }) => {
  const recallWidth = 70 + recallK * 1.2;
  const finalWidth = 42 + rerankN * 5;

  return (
    <svg viewBox="0 0 560 190" className="h-auto w-full" aria-label="两段式流程示意">
      <defs>
        <marker id="pipe-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
          <path d="M0,0 L9,3 L0,6 Z" fill="#241C15" />
        </marker>
      </defs>
      <Stage x={18} y={42} width={118} label="资料库" fill="#FBEFE3" note="很多" />
      <path d="M150 92 H220" stroke="#241C15" strokeWidth="3" markerEnd="url(#pipe-arrow)" />
      <Stage x={232} y={34} width={recallWidth} label="召回候选" fill="#1B4B5A" light note={`${recallK} 条`} />
      <path d="M398 92 H452" stroke="#241C15" strokeWidth="3" markerEnd="url(#pipe-arrow)" />
      <Stage x={462} y={50} width={finalWidth} label="给 AI" fill="#F4D35E" note={`${rerankN} 条`} />
    </svg>
  );
};

const Stage: React.FC<{ x: number; y: number; width: number; label: string; fill: string; note: string; light?: boolean }> = ({
  x,
  y,
  width,
  label,
  fill,
  note,
  light = false,
}) => (
  <g transform={`translate(${x} ${y})`} className="transition-transform duration-250 ease-spring hover:-translate-y-1">
    <rect width={width} height="84" rx="16" fill={fill} stroke="#241C15" strokeWidth="3" />
    <text x={width / 2} y="37" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="18" fontWeight="900" fill={light ? "#FBEFE3" : "#241C15"}>
      {label}
    </text>
    <text x={width / 2} y="60" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="12" fontWeight="800" fill={light ? "#FBEFE3" : "#241C15"} opacity="0.72">
      {note}
    </text>
  </g>
);

export default SectionPipeline;
