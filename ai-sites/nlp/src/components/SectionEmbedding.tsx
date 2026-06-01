/**
 * Section 04 · Embedding：把 token 变成意义
 *
 * 用 Word2Vec 2013 经典 king − man + woman ≈ queen 当直觉。
 * 用户点选起点词（king / paris / walking …），看 (起点 − 性别向量 + 反向 = 目标) 在 2D 平面变化。
 *
 * 下方接 MTEB 2026 排行 SVG 横向 bar —— 13 年过去，embedding 这一步比以往都重要。
 *
 * 反模板：
 *   - 不抄 distill 的「温度 slider + 5 类概率柱」（那是 logit softmax 不是 embedding 空间）
 *   - 不抄 moe 的 2D 平面拖 token（那是路由可视化，token 自由拖；这里是固定 5 组类比，点选）
 */
import React, { useMemo, useState } from "react";

type Analogy = {
  /** 关系标签 */
  label: string;
  /** "起点" 词 */
  a: string;
  /** 要减去的属性 */
  b: string;
  /** 要加上的属性 */
  c: string;
  /** 期望的目标 */
  d: string;
  /** 每个词在 2D 平面上的固定坐标 (0~100) */
  coords: Record<string, [number, number]>;
};

const ANALOGIES: Analogy[] = [
  {
    label: "性别 · 王室",
    a: "king",
    b: "man",
    c: "woman",
    d: "queen",
    coords: {
      king: [72, 38],
      man: [58, 60],
      woman: [38, 60],
      queen: [52, 38],
    },
  },
  {
    label: "国家 · 首都",
    a: "France",
    b: "Paris",
    c: "Tokyo",
    d: "Japan",
    coords: {
      France: [30, 45],
      Paris: [30, 70],
      Tokyo: [78, 70],
      Japan: [78, 45],
    },
  },
  {
    label: "动词时态",
    a: "walking",
    b: "walk",
    c: "swim",
    d: "swimming",
    coords: {
      walking: [38, 35],
      walk: [38, 65],
      swim: [72, 65],
      swimming: [72, 35],
    },
  },
];

/* MTEB 2026 排行（avg 分） · 来源 awesomeagents.ai 2026/04 + Gemini Embedding 2 Mar 2026 */
const MTEB_2026 = [
  { rank: 1, name: "Gemini Embedding 001", vendor: "Google", score: 68.32, dims: 3072, max: 8192, tone: "bg-pop" },
  { rank: 2, name: "Voyage-3.1-large", vendor: "Voyage AI", score: 67.40, dims: 2048, max: 32768, tone: "bg-coral" },
  { rank: 3, name: "Jina Embeddings v4", vendor: "Jina AI", score: 66.81, dims: 1024, max: 32768, tone: "bg-teal" },
  { rank: 4, name: "Voyage-3-large", vendor: "Voyage AI", score: 66.80, dims: 2048, max: 32768, tone: "bg-coral" },
  { rank: 5, name: "Cohere Embed v4", vendor: "Cohere", score: 65.20, dims: 1024, max: 512, tone: "bg-teal" },
  { rank: 6, name: "text-embedding-3-large", vendor: "OpenAI", score: 64.60, dims: 3072, max: 8191, tone: "bg-butter" },
  { rank: 7, name: "BGE-M3", vendor: "BAAI (开源)", score: 63.00, dims: 1024, max: 8192, tone: "bg-ink" },
  { rank: 8, name: "text-embedding-3-small", vendor: "OpenAI", score: 62.26, dims: 1536, max: 8191, tone: "bg-butter" },
];

const MAX_BAR_SCORE = 70;
const MIN_BAR_SCORE = 60;

const SectionEmbedding: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = ANALOGIES[activeIdx];

  /* 简单计算：a - b + c 的"伪向量"在平面上的位置 ≈ a 减去 b 的偏移，再加 c 的位置 */
  const computed = useMemo(() => {
    const [ax, ay] = active.coords[active.a];
    const [bx, by] = active.coords[active.b];
    const [cx, cy] = active.coords[active.c];
    return [ax - bx + cx, ay - by + cy] as [number, number];
  }, [active]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 04</span>
          <span className="section-anchor-label">step 2 · tokens → meaning</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          第二道工序：让每个 token 在<br className="hidden md:block" />
          一个空间里站到该站的位置。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-12">
          2013 年 Word2Vec 第一次证明：词可以变成数字，而且数字之间还能算加减 ——
          king − man + woman 算出来的向量真的离 queen 最近。
          13 年过去，embedding 在 2026 仍然是必需的 —— 搜索、RAG（先搜资料再让模型回答）、内容审核都靠它。
        </p>

        <div className="grid lg:grid-cols-12 gap-8 mb-16">
          {/* 左：analogy 选择 */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-3">
              点一组关系，看式子在右边发生
            </div>
            <div className="space-y-3 mb-6">
              {ANALOGIES.map((a, i) => {
                const on = i === activeIdx;
                return (
                  <button
                    key={a.label}
                    onClick={() => setActiveIdx(i)}
                    className={[
                      "w-full text-left p-4 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring",
                      on
                        ? "bg-ink text-cream shadow-stamp-lg -translate-x-0.5 -translate-y-0.5"
                        : "bg-cream text-ink hover:bg-butter shadow-stamp",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">
                        {a.label}
                      </span>
                      <span
                        className={[
                          "font-mono text-[10px]",
                          on ? "text-butter" : "text-coral",
                        ].join(" ")}
                      >
                        {on ? "● 选中" : "○"}
                      </span>
                    </div>
                    <div className="font-display font-extrabold text-[16px] leading-snug">
                      {a.a} − {a.b} + {a.c} ≈ {a.d}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 计算式子展示 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-4 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2">
                vec({active.a}) − vec({active.b}) + vec({active.c})
              </div>
              <div className="flex items-center gap-2 font-display font-extrabold text-[20px] text-ink flex-wrap">
                <Pill word={active.a} tone="butter" />
                <span className="text-coral">−</span>
                <Pill word={active.b} tone="white" />
                <span className="text-coral">+</span>
                <Pill word={active.c} tone="white" />
                <span className="text-ink/40">≈</span>
                <Pill word={active.d} tone="teal" />
              </div>
              <p className="mt-3 font-mono text-[10.5px] text-ink/55 leading-relaxed">
                平面上看：从 {active.a} 出发，沿 {active.b}→{active.c} 这条「方向向量」走，落点离 {active.d} 的位置很近。
              </p>
            </div>
          </div>

          {/* 右：2D 平面 */}
          <div className="lg:col-span-7">
            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  embedding 平面 · 2D 投影（真实是 300+ 维）
                </div>
                <div className="font-mono text-[10px] text-ink/40">
                  Word2Vec · Mikolov 2013
                </div>
              </div>
              <div className="relative w-full aspect-[5/4]">
                <svg
                  viewBox="0 0 100 80"
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* 网格 */}
                  <defs>
                    <pattern
                      id="emb-grid"
                      x="0"
                      y="0"
                      width="10"
                      height="10"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 10 0 L 0 0 0 10"
                        stroke="#241C15"
                        strokeWidth="0.15"
                        fill="none"
                        opacity="0.18"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="80" fill="url(#emb-grid)" />

                  {/* a − b 的差向量箭头（红色，提示这是"方向"） */}
                  <ArrowLine
                    from={active.coords[active.b]}
                    to={active.coords[active.a]}
                    color="#E07A5F"
                    dashed
                    label="a−b 方向"
                  />
                  {/* c 加上同样方向到达 computed */}
                  <ArrowLine
                    from={active.coords[active.c]}
                    to={computed}
                    color="#E07A5F"
                    dashed
                  />
                  {/* 起点 a → 终点 (computed) 主线（实线，墨色） */}
                  <ArrowLine
                    from={active.coords[active.a]}
                    to={computed}
                    color="#241C15"
                    label="走相同方向"
                  />

                  {/* 4 个真实词 */}
                  {([
                    [active.a, "butter", "起点"],
                    [active.b, "white", "减去"],
                    [active.c, "white", "加上"],
                    [active.d, "teal", "目标"],
                  ] as const).map(([w, tone, role]) => {
                    const [x, y] = active.coords[w];
                    const fill =
                      tone === "butter"
                        ? "#F4D35E"
                        : tone === "teal"
                          ? "#1B4B5A"
                          : "#FFFFFF";
                    const tcolor =
                      tone === "teal" ? "#FBEFE3" : "#241C15";
                    return (
                      <g key={w}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4.2"
                          fill={fill}
                          stroke="#241C15"
                          strokeWidth="0.8"
                        />
                        <text
                          x={x}
                          y={y + 1.4}
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="3"
                          fontWeight="700"
                          fill={tcolor}
                        >
                          {w}
                        </text>
                        <text
                          x={x}
                          y={y + 8.5}
                          textAnchor="middle"
                          fontFamily="Geist Mono, monospace"
                          fontSize="2.2"
                          fill="#241C15"
                          opacity="0.55"
                        >
                          {role}
                        </text>
                      </g>
                    );
                  })}

                  {/* 计算出的位置 (≈ d) */}
                  <g>
                    <circle
                      cx={computed[0]}
                      cy={computed[1]}
                      r="3"
                      fill="#FF4D74"
                      stroke="#241C15"
                      strokeWidth="0.8"
                    >
                      <animate
                        attributeName="r"
                        values="3;3.6;3"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <text
                      x={computed[0]}
                      y={computed[1] - 5}
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="2.6"
                      fontWeight="700"
                      fill="#241C15"
                    >
                      a−b+c
                    </text>
                  </g>
                </svg>
              </div>
              <div className="mt-3 flex items-center gap-4 font-mono text-[10px] text-ink/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-pop border border-ink" />
                  算出的位置
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal border border-ink" />
                  期望目标
                </span>
                <span>距离越近 → 关系学到了</span>
              </div>
            </div>
          </div>
        </div>

        {/* MTEB 排行 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2">
                MTEB 英文榜 · 2026/04 · 越高越准
              </div>
              <h3 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-tight">
                2026 谁家 embedding 最准？
              </h3>
              <p className="mt-2 font-mono text-[11px] text-ink/55">
                MTEB = 各家 embedding 模型谁更准的排行榜
              </p>
            </div>
            <p className="font-sans text-[13.5px] text-ink/65 max-w-md">
              Gemini Embedding 001 连续 4 个月稳坐第一。开源端 BGE-M3 也能进前 10 —— 自己跑也行。
            </p>
          </div>

          <div className="space-y-2.5">
            {MTEB_2026.map((m) => {
              const pct =
                ((m.score - MIN_BAR_SCORE) / (MAX_BAR_SCORE - MIN_BAR_SCORE)) *
                100;
              return (
                <div
                  key={m.name}
                  className="grid grid-cols-[28px_1fr_auto] sm:grid-cols-[28px_180px_1fr_72px] gap-3 items-center group"
                >
                  <div className="font-mono text-[11px] font-bold text-ink/45 tabular-nums">
                    #{m.rank}
                  </div>
                  <div className="min-w-0">
                    <div className="font-sans font-bold text-[13.5px] text-ink truncate">
                      {m.name}
                    </div>
                    <div className="font-mono text-[10px] text-ink/45">
                      {m.vendor} · {m.dims}d · ctx {m.max.toLocaleString()}
                    </div>
                  </div>
                  <div className="hidden sm:block relative h-7 bg-white border-2 border-ink rounded-md overflow-hidden">
                    <div
                      className={[
                        "h-full border-r-2 border-ink transition-all duration-500 ease-spring origin-left",
                        m.tone,
                      ].join(" ")}
                      style={{ width: `${Math.max(6, pct)}%` }}
                    />
                  </div>
                  <div className="text-right font-display font-extrabold text-[16px] text-ink tabular-nums">
                    {m.score.toFixed(2)}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 font-mono text-[10.5px] text-ink/45">
            来源：awesomeagents.ai MTEB Rankings 2026/04 · Gemini Embedding 2 公告 2026-03-10（the-decoder.com）
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── 小工具组件 ─── */

const Pill: React.FC<{ word: string; tone: "butter" | "white" | "teal" }> = ({
  word,
  tone,
}) => {
  const cls =
    tone === "butter"
      ? "bg-butter text-ink"
      : tone === "teal"
        ? "bg-teal text-cream"
        : "bg-white text-ink";
  return (
    <span
      className={[
        "inline-flex items-center px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[14px] font-semibold",
        cls,
      ].join(" ")}
    >
      {word}
    </span>
  );
};

const ArrowLine: React.FC<{
  from: [number, number];
  to: [number, number];
  color: string;
  dashed?: boolean;
  label?: string;
}> = ({ from, to, color, dashed, label }) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 0.1) return null;
  const ux = dx / len;
  const uy = dy / len;
  // 末端缩进 4 给箭头留位置
  const tx = x2 - ux * 4;
  const ty = y2 - uy * 4;
  // 箭头三角
  const px = tx + uy * 1.6;
  const py = ty - ux * 1.6;
  const qx = tx - uy * 1.6;
  const qy = ty + ux * 1.6;
  // label 位置
  const mx = (x1 + x2) / 2 + uy * 2.4;
  const my = (y1 + y2) / 2 - ux * 2.4;
  return (
    <g>
      <line
        x1={x1 + ux * 4}
        y1={y1 + uy * 4}
        x2={tx}
        y2={ty}
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeDasharray={dashed ? "1.4 1.2" : undefined}
      />
      <polygon points={`${x2},${y2} ${px},${py} ${qx},${qy}`} fill={color} />
      {label && (
        <text
          x={mx}
          y={my}
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="2.1"
          fill={color}
          opacity="0.85"
        >
          {label}
        </text>
      )}
    </g>
  );
};

export default SectionEmbedding;
