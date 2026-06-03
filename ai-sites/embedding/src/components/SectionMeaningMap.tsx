import React, { useMemo, useState } from "react";
import { GripHorizontal, Move } from "lucide-react";

type Point = {
  id: string;
  text: string;
  x: number;
  y: number;
  group: "leave" | "expense" | "weekend";
};

const POINTS: Point[] = [
  { id: "a", text: "年假按工龄怎么算", x: 76, y: 76, group: "leave" },
  { id: "b", text: "入职多久有带薪假", x: 116, y: 90, group: "leave" },
  { id: "c", text: "假期能不能结转", x: 92, y: 128, group: "leave" },
  { id: "d", text: "差旅报销需要发票吗", x: 250, y: 84, group: "expense" },
  { id: "e", text: "机票酒店怎么走报销", x: 282, y: 126, group: "expense" },
  { id: "f", text: "周末适合去哪玩", x: 236, y: 220, group: "weekend" },
  { id: "g", text: "附近有什么餐厅", x: 298, y: 238, group: "weekend" },
];

const groupColor: Record<Point["group"], string> = {
  leave: "#F4D35E",
  expense: "#E07A5F",
  weekend: "#1B4B5A",
};

const SectionMeaningMap: React.FC = () => {
  const [query, setQuery] = useState({ x: 132, y: 112 });
  const [dragging, setDragging] = useState(false);

  const nearest = useMemo(() => {
    return [...POINTS]
      .map((p) => ({ ...p, dist: Math.hypot(p.x - query.x, p.y - query.y) }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3);
  }, [query]);

  const updateFromPointer = (event: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 360;
    const y = ((event.clientY - rect.top) / rect.height) * 280;
    setQuery({ x: Math.max(28, Math.min(332, x)), y: Math.max(28, Math.min(252, y)) });
  };

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">meaning as location</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="mb-5 max-w-3xl font-display text-display-lg text-ink">
              数字多到看不懂，
              <br />
              可以先想成一个位置。
            </h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>
                一串数字叫向量。向量可以理解成一组坐标，帮机器把内容放到一张“意思地图”上。
              </p>
              <p>
                左侧这团都在聊年假。右上角那团都在聊报销。右下角那团聊周末活动。
              </p>
              <p>
                拖动黄色问题点，看看它离哪几句话最近。Embedding 用来找资料时，第一步就是找离问题最近的几句话。
              </p>
            </div>

            <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-4 shadow-stamp">
              <div className="mb-3 flex items-center gap-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                <Move className="h-3.5 w-3.5" strokeWidth={2.4} />
                drag the query dot
              </div>
              <ol className="space-y-2">
                {nearest.map((p, index) => (
                  <li key={p.id} className="flex items-center gap-3 rounded-xl border-2 border-ink bg-white px-3 py-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-butter font-mono text-[11px] font-bold">
                      {index + 1}
                    </span>
                    <span className="min-w-0 flex-1 text-[13.5px] text-ink/80">{p.text}</span>
                    <span className="font-mono text-[10.5px] text-ink/45">
                      距离 {Math.round(p.dist)}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 font-mono text-[10px] leading-relaxed text-ink/45">
                示意地图，帮你感受趋势，不是精确统计。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-cream p-4 shadow-stamp-lg">
              <svg
                viewBox="0 0 360 280"
                className="h-auto w-full touch-none rounded-2xl border-2 border-ink bg-white"
                onPointerDown={(event) => {
                  setDragging(true);
                  event.currentTarget.setPointerCapture(event.pointerId);
                }}
                onPointerMove={updateFromPointer}
                onPointerUp={() => setDragging(false)}
                onPointerCancel={() => setDragging(false)}
                aria-label="Embedding 语义地图"
              >
                <g stroke="#241C15" strokeWidth="0.5" opacity="0.08">
                  {Array.from({ length: 13 }).map((_, i) => (
                    <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="280" />
                  ))}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`h-${i}`} x1="0" y1={i * 30} x2="360" y2={i * 30} />
                  ))}
                </g>

                <ClusterLabel x={42} y={42} text="年假" />
                <ClusterLabel x={222} y={48} text="报销" />
                <ClusterLabel x={224} y={196} text="周末" />

                {POINTS.map((p) => (
                  <g key={p.id}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="11"
                      fill={groupColor[p.group]}
                      stroke="#241C15"
                      strokeWidth="2"
                      opacity={nearest.some((n) => n.id === p.id) ? 1 : 0.72}
                    />
                    {nearest.some((n) => n.id === p.id) && (
                      <circle cx={p.x} cy={p.y} r="18" fill="none" stroke="#241C15" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.45" />
                    )}
                  </g>
                ))}

                {nearest.map((p) => (
                  <line
                    key={`line-${p.id}`}
                    x1={query.x}
                    y1={query.y}
                    x2={p.x}
                    y2={p.y}
                    stroke="#241C15"
                    strokeWidth="1.4"
                    strokeDasharray="5 6"
                    opacity="0.35"
                  />
                ))}

                <g transform={`translate(${query.x},${query.y})`} className="cursor-grab">
                  <circle r="18" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
                  <GripHorizontal x="-8" y="-8" className="h-4 w-4 text-ink" strokeWidth={2.5} />
                </g>
              </svg>

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <Legend color="#F4D35E" text="人事制度" />
                <Legend color="#E07A5F" text="财务报销" />
                <Legend color="#1B4B5A" text="生活闲聊" dark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ClusterLabel: React.FC<{ x: number; y: number; text: string }> = ({ x, y, text }) => (
  <text x={x} y={y} fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" letterSpacing="2" fill="#241C15" opacity="0.45">
    {text}
  </text>
);

const Legend: React.FC<{ color: string; text: string; dark?: boolean }> = ({ color, text, dark }) => (
  <div className="flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-3 py-2 text-[12px] text-ink/70">
    <span className="h-4 w-4 rounded-full border-2 border-ink" style={{ backgroundColor: color }} />
    <span>{text}</span>
    {dark && <span className="font-mono text-[10px] text-ink/40">深色点</span>}
  </div>
);

export default SectionMeaningMap;
