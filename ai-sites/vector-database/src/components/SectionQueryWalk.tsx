import React, { useMemo, useState } from "react";
import { Crosshair, MousePointer2 } from "lucide-react";
import { clamp, MiniBadge, SectionShell } from "./common";

const docs = [
  { id: "A", title: "离职结算规则", x: 70, y: 88, tone: "bg-butter", tag: "HR" },
  { id: "B", title: "未休年假折算", x: 115, y: 112, tone: "bg-butter", tag: "HR" },
  { id: "C", title: "调休申请流程", x: 210, y: 78, tone: "bg-coral", tag: "HR" },
  { id: "D", title: "财务报销时间", x: 276, y: 152, tone: "bg-teal text-cream", tag: "Finance" },
  { id: "E", title: "办公用品采购", x: 250, y: 218, tone: "bg-white", tag: "Admin" },
  { id: "F", title: "绩效面谈说明", x: 78, y: 214, tone: "bg-white", tag: "People" },
];

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

const SectionQueryWalk: React.FC = () => {
  const [queryX, setQueryX] = useState(102);
  const [queryY, setQueryY] = useState(128);
  const [topK, setTopK] = useState(2);

  const ranked = useMemo(
    () =>
      docs
        .map((doc) => ({ ...doc, dist: distance(queryX, queryY, doc.x, doc.y) }))
        .sort((a, b) => a.dist - b.dist),
    [queryX, queryY],
  );
  const picked = ranked.slice(0, topK).map((doc) => doc.id);

  const drag = (event: React.PointerEvent<SVGSVGElement>) => {
    if (event.buttons !== 1) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 340;
    const y = ((event.clientY - rect.top) / rect.height) * 280;
    setQueryX(clamp(x, 28, 312));
    setQueryY(clamp(y, 28, 252));
  };

  return (
    <SectionShell num="02" label="nearest neighbors" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg">查询也会先变成一个向量</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            用户问的问题也会配一串数字。数据库要做的事很直接：在很多资料向量里，找离它最近的几个。
          </p>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-white p-5 shadow-stamp">
            <div className="flex items-center justify-between gap-4">
              <MiniBadge>top-k</MiniBadge>
              <span className="font-mono text-sm font-bold">{topK} 条</span>
            </div>
            <input
              className="mt-5 w-full accent-coral"
              type="range"
              min={1}
              max={4}
              value={topK}
              onChange={(event) => setTopK(Number(event.target.value))}
            />
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              Top-K 是取回几条候选。取太少容易漏资料，取太多会把无关内容也塞给 AI。
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
          <div className="card-stamp bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <MiniBadge>拖动问题点</MiniBadge>
              <MousePointer2 className="h-4 w-4 text-ink/55" />
            </div>
            <svg
              viewBox="0 0 340 280"
              className="w-full touch-none rounded-2xl border-2 border-ink bg-cream"
              onPointerDown={drag}
              onPointerMove={drag}
              role="img"
              aria-label="向量空间里的查询点和文档点"
            >
              <defs>
                <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#241C15" strokeOpacity="0.08" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="340" height="280" fill="url(#grid)" />
              {docs.map((doc) => {
                const active = picked.includes(doc.id);
                return (
                  <g key={doc.id}>
                    {active && (
                      <line
                        x1={queryX}
                        y1={queryY}
                        x2={doc.x}
                        y2={doc.y}
                        stroke="#E07A5F"
                        strokeWidth="2"
                        strokeDasharray="5 5"
                      />
                    )}
                    <circle
                      cx={doc.x}
                      cy={doc.y}
                      r={active ? 17 : 13}
                      fill={active ? "#F4D35E" : "#FFFFFF"}
                      stroke="#241C15"
                      strokeWidth="2"
                    />
                    <text
                      x={doc.x}
                      y={doc.y + 4}
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="11"
                      fontWeight="800"
                      fill="#241C15"
                    >
                      {doc.id}
                    </text>
                  </g>
                );
              })}
              <g>
                <circle cx={queryX} cy={queryY} r="18" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
                <Crosshair x={queryX - 9} y={queryY - 9} width="18" height="18" color="#FBEFE3" strokeWidth="2.5" />
              </g>
            </svg>
            <p className="mt-3 text-xs leading-relaxed text-ink/55">
              示意图：平面只是为了好看清楚，真实向量空间通常有几百到几千个方向。
            </p>
          </div>

          <div className="space-y-3">
            {ranked.slice(0, 4).map((doc, index) => (
              <div
                key={doc.id}
                className={`rounded-2xl border-2 border-ink p-4 shadow-stamp ${
                  index < topK ? "bg-butter" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold">{doc.title}</p>
                  <span className="font-mono text-xs font-bold">#{index + 1}</span>
                </div>
                <p className="mt-1 text-sm text-ink/65">{doc.tag} · 距离 {Math.round(doc.dist)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionQueryWalk;
