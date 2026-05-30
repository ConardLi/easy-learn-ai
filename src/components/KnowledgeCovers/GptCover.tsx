/**
 * GPT 封面
 *
 * 隐喻：一个 ChatGPT 对话气泡里冒出三个一路放大的代际节点 ——
 *   GPT-1 (小灰点) → GPT-3 (中红点) → GPT-5 (大粉点)
 *   底下一行 token 序列 `next token →` 暗示「猜下一个 token」目标 8 年不变。
 *   右上 stamp「OpenAI · 2018→2026」，左上小 think 气泡冒「reasoning」字样表示 o 系合流。
 *
 * 视觉构图（viewBox 320×200）：
 *   ─ 顶部 y=24：左侧 think mini 气泡 / 右侧 stamp 2018→2026
 *   ─ 中部主舞台：大对话气泡 (rect rx=18) 占据中央
 *     里面横向排 3 个圆形节点（参数演化）+ 连接线
 *   ─ 底部 y=170：token 行（5 个小方块），最后一个是高亮 「next」
 *
 * hover：3 个节点轻微 float-y · stamp 微旋转
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 三代节点 · params 决定半径 */
const GENS = [
  { x: 95, name: "GPT-1", year: "'18", r: 10, fill: "#88837C", text: "117M" },
  { x: 160, name: "GPT-3", year: "'20", r: 16, fill: "#E07A5F", text: "175B" },
  { x: 225, name: "GPT-5", year: "'25", r: 22, fill: "#FF4D74", text: "?" },
];

/* 底部 token 行 */
const TOKENS = ["o", "p", "e", "n", "?"];

const GptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 右上 stamp · OpenAI · 2018→2026 */}
      <g
        transform="translate(282,28) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-32"
          y="-12"
          width="64"
          height="24"
          rx="4"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#F4D35E"
        >
          2018→26
        </text>
      </g>

      {/* 左上 think 小气泡 · 暗示 o 系 */}
      <g
        transform="translate(34,30) rotate(-4)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
          rx="5"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.6"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.4"
          fill="#FBEFE3"
        >
          &lt;think&gt;
        </text>
        {/* 气泡小尾巴 */}
        <polygon
          points="-4,11 0,16 4,11"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.4"
        />
      </g>

      {/* 中央主气泡 · ChatGPT 对话框 */}
      <g transform="translate(160,108)">
        <rect
          x="-110"
          y="-38"
          width="220"
          height="76"
          rx="18"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 气泡左下尾巴 */}
        <polygon
          points="-90,38 -78,52 -72,38"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* 顶部小标签 · GPT */}
        <text
          x="-94"
          y="-22"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="800"
          letterSpacing="1.4"
          fill="#88837C"
        >
          GPT · DECODER-ONLY
        </text>

        {/* 3 个代节点 + 连接虚线（坐标系基于 -110~110 中心） */}
        {/* 连接虚线（先画底层） */}
        {GENS.slice(0, -1).map((g, i) => {
          const next = GENS[i + 1];
          return (
            <line
              key={`link-${i}`}
              x1={g.x - 160 + g.r}
              y1="8"
              x2={next.x - 160 - next.r}
              y2="8"
              stroke="#241C15"
              strokeWidth="1.4"
              strokeDasharray="3 3"
              opacity="0.6"
            />
          );
        })}

        {GENS.map((g, i) => (
          <g
            key={g.name}
            transform={`translate(${g.x - 160}, 8)`}
            className="origin-center animate-float-y-sm"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            <circle
              cx="0"
              cy="0"
              r={g.r}
              fill={g.fill}
              stroke="#241C15"
              strokeWidth="1.8"
            />
            <text
              x="0"
              y={g.r + 11}
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="700"
              fill="#241C15"
            >
              {g.name} {g.year}
            </text>
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize={g.r > 14 ? "9" : "7.5"}
              fontWeight="800"
              fill={g.r > 14 ? "#FBEFE3" : "#241C15"}
            >
              {g.text}
            </text>
          </g>
        ))}
      </g>

      {/* 底部 token 行 · next token 隐喻 */}
      <g transform="translate(160,176)">
        <text
          x="-100"
          y="-3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#88837C"
          letterSpacing="1"
        >
          next token →
        </text>

        {TOKENS.map((t, i) => {
          const x = -54 + i * 28;
          const isNext = i === TOKENS.length - 1;
          return (
            <g key={i} transform={`translate(${x}, 0)`}>
              <rect
                x="-11"
                y="-9"
                width="22"
                height="18"
                rx="3"
                fill={isNext ? "#F4D35E" : "#FFFFFF"}
                stroke="#241C15"
                strokeWidth={isNext ? "1.8" : "1.4"}
              />
              <text
                y="3.5"
                textAnchor="middle"
                fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                fontSize="11"
                fontWeight="800"
                fill="#241C15"
              >
                {t}
              </text>
            </g>
          );
        })}
      </g>
    </CoverShell>
  );
};

export default GptCover;
