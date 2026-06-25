import React, { useState } from "react";
import { ArrowDown } from "lucide-react";
import { StampLink } from "./common";

const STAGES = [
  {
    label: "刚读到",
    title: "保留字面线索",
    desc: "先看到“金色”和“毛发”这些局部内容。",
    x: 76,
    y: 190,
  },
  {
    label: "处理几步后",
    title: "接上周围内容",
    desc: "位置开始靠近颜色、动物和外观等相关区域。",
    x: 176,
    y: 124,
  },
  {
    label: "准备回答时",
    title: "突出当前任务",
    desc: "问题在识别动物时，位置会更靠近“金毛犬”。",
    x: 278,
    y: 72,
  },
];

const SectionHero: React.FC = () => {
  const [stage, setStage] = useState(0);
  const current = STAGES[stage];

  return (
    <section className="relative overflow-hidden bg-butter-soft px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 shadow-stamp">
              <span className="h-2 w-2 rounded-full bg-pop" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]">Representation Space · 表示空间</span>
            </div>
            <h1 className="mb-6 font-display text-display-xl">表示空间是什么？</h1>
            <p className="mb-5 max-w-xl font-display text-[21px] font-bold leading-snug lg:text-[24px]">
              <span className="relative inline-block">
                <span className="absolute bottom-0.5 left-0 right-0 h-4 bg-coral/55" />
                <span className="relative">表示空间是所有数字位置组成的地图，模型把内容放在其中。</span>
              </span>
            </p>
            <div className="max-w-xl space-y-3 text-[15.5px] leading-relaxed text-ink/75">
              <p>一段文字或一张图片经过计算后，会得到一组数字。可以把这组数字看成它在地图里的位置。</p>
              <p>模型看过大量例子后，会不断调整这些位置。内容越相似，位置通常越近。</p>
              <p>模型处理同一份内容时，也会多次改写数字。右边拖动处理阶段，看“金色毛发”的位置怎样变化。</p>
            </div>
            <div className="mt-7">
              <StampLink
                href="../embedding/index.html"
                title="和《Embedding》怎样分工？"
                desc="Embedding 是会被保存下来、用于搜索的数字表示。表示空间还包括模型每一步处理时临时产生的位置。"
                tone="butter"
              />
            </div>
            <div className="mt-8 inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream"><ArrowDown className="h-4 w-4" /></span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/55">继续往下看</span>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="min-w-0 overflow-hidden rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-ink/50">同一份内容 · 不同处理阶段</span>
                <span className="rounded-full border-2 border-ink bg-butter px-3 py-1 text-[12px] font-bold">{current.label}</span>
              </div>
              <svg viewBox="0 0 360 280" className="h-auto w-full rounded-2xl border-2 border-ink bg-cream" aria-label="同一内容在不同处理阶段改变位置的示意图">
                <g stroke="#241C15" strokeWidth=".5" opacity=".1">
                  {Array.from({ length: 13 }).map((_, i) => <line key={`v${i}`} x1={i * 30} y1="0" x2={i * 30} y2="280" />)}
                  {Array.from({ length: 10 }).map((_, i) => <line key={`h${i}`} x1="0" y1={i * 30} x2="360" y2={i * 30} />)}
                </g>
                <Area x={66} y={72} label="颜色" color="#F4D35E" />
                <Area x={188} y={166} label="动物" color="#E07A5F" />
                <Area x={286} y={68} label="金毛犬" color="#1B4B5A" dark />
                <path d="M76 190 Q150 160 176 124 Q225 88 278 72" fill="none" stroke="#241C15" strokeWidth="2" strokeDasharray="6 6" opacity=".38" />
                {STAGES.map((item, i) => (
                  <circle key={item.label} cx={item.x} cy={item.y} r={i === stage ? 19 : 8} fill={i <= stage ? "#FF4D74" : "#FFFFFF"} stroke="#241C15" strokeWidth={i === stage ? 3 : 2} opacity={i === stage ? 1 : .55} />
                ))}
                <g style={{ transform: `translate(${current.x}px, ${current.y}px)`, transition: "transform 260ms cubic-bezier(0.34,1.56,0.64,1)" }}>
                  <rect x="-44" y="27" width="88" height="27" rx="8" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
                  <text x="0" y="45" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" fill="#241C15">金色毛发</text>
                </g>
              </svg>
              <label className="mt-5 block rounded-2xl border-2 border-ink bg-cream p-4">
                <span className="mb-2 flex justify-between text-[12px] font-bold"><span>处理阶段</span><span className="font-mono">{stage + 1} / 3</span></span>
                <input type="range" min="0" max="2" step="1" value={stage} onChange={(e) => setStage(Number(e.target.value))} className="w-full accent-[#FF4D74]" />
              </label>
              <div className="mt-4 rounded-2xl border-2 border-ink bg-butter/35 p-4">
                <div className="font-display text-xl font-bold">{current.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-ink/65">{current.desc}</p>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/45">位置为教学示意，用来观察“同一内容会在处理过程中换位置”。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Area: React.FC<{ x: number; y: number; label: string; color: string; dark?: boolean }> = ({ x, y, label, color, dark }) => (
  <g>
    <circle cx={x} cy={y} r="28" fill={color} stroke="#241C15" strokeWidth="2" opacity=".38" />
    <text x={x} y={y + 4} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill={dark ? "#FBEFE3" : "#241C15"}>{label}</text>
  </g>
);

export default SectionHero;
