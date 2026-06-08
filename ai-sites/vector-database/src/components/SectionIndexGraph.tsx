import React, { useState } from "react";
import { ChevronLeft, ChevronRight, GitBranch, Route } from "lucide-react";
import { MiniBadge, SectionShell } from "./common";

const stages = [
  {
    title: "先站在一个入口点",
    text: "索引会给每个向量连一些邻居。查询进来时，先从一个入口点开始看。",
    active: ["N1"],
    edges: [] as string[],
  },
  {
    title: "沿着更近的邻居走",
    text: "如果旁边有更接近问题的点，就继续往那边走。它不用扫完整库。",
    active: ["N1", "N2", "N4"],
    edges: ["N1-N2", "N2-N4"],
  },
  {
    title: "在附近扩大一点",
    text: "到了一片相似区域，再看周围几个候选，避免刚好错过近邻。",
    active: ["N2", "N4", "N5", "N6"],
    edges: ["N2-N4", "N4-N5", "N4-N6"],
  },
  {
    title: "返回最像的几条",
    text: "最后把得分最高的几段原文取出来。AI 看到的是原文，不是那串数字。",
    active: ["N4", "N5"],
    edges: ["N4-N5"],
  },
];

const nodes = [
  { id: "N1", x: 54, y: 70, title: "入口" },
  { id: "N2", x: 142, y: 58, title: "候选" },
  { id: "N3", x: 260, y: 55, title: "远" },
  { id: "N4", x: 154, y: 142, title: "近" },
  { id: "N5", x: 226, y: 166, title: "最近" },
  { id: "N6", x: 88, y: 202, title: "相近" },
  { id: "N7", x: 284, y: 222, title: "远" },
];

const graphEdges = [
  ["N1", "N2"],
  ["N1", "N6"],
  ["N2", "N3"],
  ["N2", "N4"],
  ["N4", "N5"],
  ["N4", "N6"],
  ["N5", "N7"],
  ["N3", "N7"],
];

const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

const SectionIndexGraph: React.FC = () => {
  const [stage, setStage] = useState(0);
  const current = stages[stage];

  return (
    <SectionShell num="03" label="index graph" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-white p-2 shadow-stamp">
            <GitBranch className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">快，是因为提前修了路</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            上亿条向量不能每次全扫一遍。向量数据库会建索引，把相近的点连起来。查询时沿路找，速度会快很多。
          </p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div className="flex items-center gap-3">
              <Route className="h-5 w-5 text-coral" />
              <h3 className="text-2xl font-extrabold">{current.title}</h3>
            </div>
            <p className="mt-3 leading-relaxed text-ink/75">{current.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <button
                className="btn-stamp bg-white px-4 py-3"
                onClick={() => setStage((s) => Math.max(0, s - 1))}
                aria-label="上一步"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <MiniBadge>{stage + 1} / {stages.length}</MiniBadge>
              <button
                className="btn-stamp bg-butter px-4 py-3"
                onClick={() => setStage((s) => Math.min(stages.length - 1, s + 1))}
                aria-label="下一步"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="card-stamp bg-white p-5">
          <svg viewBox="0 0 340 270" className="w-full" role="img" aria-label="近邻图索引示意">
            {graphEdges.map(([a, b]) => {
              const from = nodeById[a];
              const to = nodeById[b];
              const active =
                current.edges.includes(`${a}-${b}`) || current.edges.includes(`${b}-${a}`);
              return (
                <line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={active ? "#E07A5F" : "#241C15"}
                  strokeOpacity={active ? 1 : 0.25}
                  strokeWidth={active ? 4 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            {nodes.map((node) => {
              const active = current.active.includes(node.id);
              return (
                <g key={node.id} className="transition-all duration-250 ease-spring">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={active ? 22 : 17}
                    fill={active ? "#F4D35E" : "#FBEFE3"}
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="11"
                    fontWeight="800"
                    fill="#241C15"
                  >
                    {node.id.slice(1)}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 38}
                    textAnchor="middle"
                    fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
                    fontSize="11"
                    fontWeight="700"
                    fill="#5A5147"
                  >
                    {node.title}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border-2 border-ink bg-cream p-3">
              <p className="font-bold">精确全扫</p>
              <p className="mt-1 text-sm text-ink/65">每条都比一遍，准，但数据大了慢。</p>
            </div>
            <div className="rounded-xl border-2 border-ink bg-butter p-3">
              <p className="font-bold">近似索引</p>
              <p className="mt-1 text-sm text-ink/65">少看很多点，通常够准，速度更适合线上服务。</p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionIndexGraph;
