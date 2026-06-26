/**
 * SectionArchitectures · 几种多 Agent 架构（核心加厚节）
 *
 * 交互（L3）：卡片/pill 切换 4 种架构，每种实时换 SVG 示意图 + 适用场景 + 一句话特征
 * 架构清单以 LangGraph 官方文档为准：
 *   Network（网络式）/ Supervisor（主管式）/ Hierarchical（层级式）/ Custom workflow（自定义流程，含流水线）
 * 另把 Handoff（交接）作为通信机制单独点一下，不混进架构清单。
 * 来源：LangGraph "Multi-agent architectures" 官方文档
 */
import React, { useState } from "react";

type ArchKey = "network" | "supervisor" | "hierarchical" | "custom";

const ARCHES: {
  key: ArchKey;
  name: string;
  en: string;
  oneLine: string;
  detail: string;
  fit: string;
}[] = [
  {
    key: "supervisor",
    name: "主管式",
    en: "Supervisor",
    oneLine: "一个主管派活给几个下属，下属干完把结果交回主管。",
    detail:
      "所有下属 Agent 只跟主管说话，彼此不直接联系。每轮由主管决定下一个该叫谁。像一个项目经理带着几个专员。",
    fit: "任务能清楚拆成几摊、需要一个总控来协调时。最常见、最好控的搭法。",
  },
  {
    key: "network",
    name: "网络式",
    en: "Network",
    oneLine: "几个 Agent 平起平坐，谁都能直接找谁。",
    detail:
      "没有固定主管，每个 Agent 自己决定下一个把话传给谁。适合那种谁先谁后说不准、需要互相商量的活。自由但更难控。",
    fit: "任务没有明确的先后顺序或层级，几个角色需要来回讨论时。",
  },
  {
    key: "hierarchical",
    name: "层级式",
    en: "Hierarchical",
    oneLine: "主管之上还有主管，像公司的多层组织架构。",
    detail:
      "一个总主管下面带几个小主管，每个小主管又各自带一队下属。任务一层层往下拆、结果一层层往上汇。是主管式的放大版。",
    fit: "任务特别大、一个主管管不过来，需要分成几个小组分别推进时。",
  },
  {
    key: "custom",
    name: "自定义流程",
    en: "Custom Workflow",
    oneLine: "提前把流程连死，谁接谁固定好，少数环节才让 AI 临时决定。",
    detail:
      "最常见的就是「流水线」：A 干完交给 B，B 干完交给 C，顺着走。流程是写死的，不靠 AI 临场判断，所以稳、好预测。",
    fit: "步骤顺序固定、不怎么需要临场决策时。比如「翻译 → 校对 → 排版」这种定式流水线。",
  },
];

const SectionArchitectures: React.FC = () => {
  const [active, setActive] = useState<ArchKey>("supervisor");
  const arch = ARCHES.find((a) => a.key === active)!;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Architectures</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px]">
          几个 AI 怎么连在一起？四种常见架构
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          有了角色，还得决定它们怎么连线、谁听谁的。下面是业界最常被提到的四种搭法
          （以 LangGraph 官方梳理为准）。点一个看它的连法和适合的场景。
        </p>

        {/* pill 切换 */}
        <div className="mt-9 flex flex-wrap gap-3">
          {ARCHES.map((a) => {
            const on = a.key === active;
            return (
              <button
                key={a.key}
                onClick={() => setActive(a.key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on
                    ? "bg-teal text-cream shadow-stamp -translate-y-0.5"
                    : "bg-cream text-ink/60 hover:text-ink hover:-translate-y-0.5",
                ].join(" ")}
              >
                {a.name}
                <span className="ml-2 font-mono text-[11px] opacity-70">{a.en}</span>
              </button>
            );
          })}
        </div>

        {/* 图 + 说明 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* 图 */}
          <div className="lg:col-span-6">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                连线示意
              </div>
              <div className="flex-1 flex items-center justify-center min-h-[280px]">
                <ArchDiagram kind={active} />
              </div>
            </div>
          </div>

          {/* 说明 */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="bg-teal text-cream border-2 border-ink rounded-2xl shadow-stamp p-6">
              <div className="font-display font-extrabold text-[24px] leading-none">
                {arch.name}
                <span className="ml-2 font-mono text-[13px] opacity-70">{arch.en}</span>
              </div>
              <p className="mt-4 font-sans text-[16px] leading-[1.7] text-cream/90">
                {arch.oneLine}
              </p>
            </div>
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                怎么运转
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/80">{arch.detail}</p>
            </div>
            <div className="bg-butter/40 border-2 border-ink rounded-2xl p-5">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                什么时候用它
              </div>
              <p className="font-sans text-[15px] leading-[1.7] text-ink/80">{arch.fit}</p>
            </div>
          </div>
        </div>

        {/* Handoff 注脚：通信机制，不是架构 */}
        <div className="mt-8 bg-cream border-2 border-dashed border-ink/30 rounded-2xl px-5 py-4 max-w-[820px]">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-1.5">
            顺带分清一个词：交接（Handoff）
          </div>
          <p className="font-sans text-[14px] leading-[1.7] text-ink/75">
            你可能听过「Handoff / 交接」。它说的是一个 Agent 把话筒递给另一个 Agent 这个
            <span className="font-bold text-ink">动作</span>本身，
            是上面几种架构内部传话的方式，不是第五种架构。OpenAI 的一个多 Agent 工具 Swarm 就主要靠交接来接力。
          </p>
        </div>
      </div>
    </section>
  );
};

/* ───────── 四种架构的 SVG 示意图 ───────── */

const Node: React.FC<{
  x: number;
  y: number;
  label: string;
  fill?: string;
  r?: number;
}> = ({ x, y, label, fill = "#FBEFE3", r = 22 }) => (
  <g transform={`translate(${x},${y})`}>
    <circle cx="0" cy="0" r={r} fill={fill} stroke="#241C15" strokeWidth="2.5" />
    <text
      x="0"
      y="4"
      textAnchor="middle"
      fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
      fontSize="11"
      fontWeight="700"
      fill="#241C15"
    >
      {label}
    </text>
  </g>
);

const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; dashed?: boolean }> = ({
  x1,
  y1,
  x2,
  y2,
  dashed,
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke="#241C15"
    strokeWidth="2"
    strokeLinecap="round"
    strokeDasharray={dashed ? "4 5" : undefined}
    opacity={dashed ? 0.6 : 0.85}
  />
);

const ArchDiagram: React.FC<{ kind: ArchKey }> = ({ kind }) => {
  if (kind === "supervisor") {
    return (
      <svg viewBox="0 0 320 260" className="w-full max-w-[320px]">
        <Line x1={160} y1={56} x2={70} y2={190} />
        <Line x1={160} y1={56} x2={160} y2={190} />
        <Line x1={160} y1={56} x2={250} y2={190} />
        <Node x={160} y={48} label="主管" fill="#1B4B5A" r={28} />
        <Node x={70} y={200} label="下属" fill="#E07A5F" />
        <Node x={160} y={200} label="下属" fill="#E07A5F" />
        <Node x={250} y={200} label="下属" fill="#E07A5F" />
      </svg>
    );
  }
  if (kind === "network") {
    return (
      <svg viewBox="0 0 320 260" className="w-full max-w-[320px]">
        <Line x1={90} y1={70} x2={230} y2={70} />
        <Line x1={90} y1={70} x2={90} y2={190} />
        <Line x1={90} y1={70} x2={230} y2={190} />
        <Line x1={230} y1={70} x2={90} y2={190} />
        <Line x1={230} y1={70} x2={230} y2={190} />
        <Line x1={90} y1={190} x2={230} y2={190} />
        <Node x={90} y={70} label="A" fill="#F4D35E" />
        <Node x={230} y={70} label="B" fill="#F4D35E" />
        <Node x={90} y={190} label="C" fill="#F4D35E" />
        <Node x={230} y={190} label="D" fill="#F4D35E" />
      </svg>
    );
  }
  if (kind === "hierarchical") {
    return (
      <svg viewBox="0 0 320 260" className="w-full max-w-[320px]">
        <Line x1={160} y1={42} x2={85} y2={120} />
        <Line x1={160} y1={42} x2={235} y2={120} />
        <Line x1={85} y1={120} x2={45} y2={210} />
        <Line x1={85} y1={120} x2={125} y2={210} />
        <Line x1={235} y1={120} x2={195} y2={210} />
        <Line x1={235} y1={120} x2={275} y2={210} />
        <Node x={160} y={38} label="总管" fill="#1B4B5A" r={26} />
        <Node x={85} y={125} label="组长" fill="#FF4D74" r={20} />
        <Node x={235} y={125} label="组长" fill="#FF4D74" r={20} />
        <Node x={45} y={216} label="员" fill="#E07A5F" r={17} />
        <Node x={125} y={216} label="员" fill="#E07A5F" r={17} />
        <Node x={195} y={216} label="员" fill="#E07A5F" r={17} />
        <Node x={275} y={216} label="员" fill="#E07A5F" r={17} />
      </svg>
    );
  }
  // custom / pipeline
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-[320px]">
      <defs>
        <marker id="arr" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#241C15" />
        </marker>
      </defs>
      <line x1={78} y1={100} x2={118} y2={100} stroke="#241C15" strokeWidth="2.5" markerEnd="url(#arr)" />
      <line x1={188} y1={100} x2={228} y2={100} stroke="#241C15" strokeWidth="2.5" markerEnd="url(#arr)" />
      <Node x={48} y={100} label="A" fill="#1B4B5A" />
      <Node x={158} y={100} label="B" fill="#E07A5F" />
      <Node x={268} y={100} label="C" fill="#F4D35E" />
      <text x="160" y="160" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fill="#88837C">
        一条线走到底
      </text>
    </svg>
  );
};

export default SectionArchitectures;
