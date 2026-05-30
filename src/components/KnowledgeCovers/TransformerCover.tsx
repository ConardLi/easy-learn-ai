/**
 * Transformer 封面
 *
 * 隐喻：4 层 transformer block 堆叠 + 一行 token 通过 cross-attention 弧线互连，
 *      右侧 Q/K/V 三个 chip 拆出 attention 三件套。
 *
 * 跟 bert cover（一句话 + [MASK] + top-3 候选 + 收敛箭头到 mask）区别：
 *   ─ bert 是「单词被 mask · 双向预测」隐喻
 *   ─ 这里是「token 之间互连 · 层堆 · Q/K/V」架构隐喻
 *
 * 视觉构图（viewBox 320×200）：
 *   ─ 左上 stamp「2017 · arXiv 1706.03762」（coral 横向 pill）
 *   ─ 右上 8 个小方点（multi-head 视觉）
 *   ─ 中央偏左：4 层 transformer block 堆叠
 *   ─ 中央偏右：Q / K / V 三块 chip 卡（butter / coral / teal）
 *   ─ 底部：4 个 input token，token 之间用 attention 弧线连
 *   ─ 底部 caption：self-attention · 一次性所有词
 *
 * hover：弧线流动加速 + multi-head 点呼吸 + Q/K/V chip 微旋。
 */
import React from "react";
import CoverShell from "./CoverShell";

const TOKENS = ["猫", "坐", "沙发", "上"];

/* token 位置：底部一行 */
const TOK_Y = 168;
const TOK_W = 26;
const TOK_H = 22;
const TOK_GAP = 8;
const TOK_X0 = 36; // 第一个 token 中心 x
const tokX = (i: number) => TOK_X0 + i * (TOK_W + TOK_GAP);

/* attention 弧：(from, to) 对。手挑 4 条，越过 block 堆向上突起 */
const ARCS: { a: number; b: number; tone: string }[] = [
  { a: 0, b: 2, tone: "#E07A5F" }, // 猫 → 沙发
  { a: 1, b: 3, tone: "#1B4B5A" }, // 坐 → 上
  { a: 0, b: 3, tone: "#241C15" }, // 猫 → 上
  { a: 2, b: 3, tone: "#F4D35E" }, // 沙发 → 上
];

const TransformerCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 左上 stamp：2017 论文 ID */}
      <g
        transform="translate(54,28) rotate(-5)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-44"
          y="-11"
          width="88"
          height="22"
          rx="4"
          fill="#E07A5F"
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
          letterSpacing="1.1"
          fill="#FBEFE3"
        >
          2017 · 1706.03762
        </text>
      </g>

      {/* 右上：8 个 head 小方点 */}
      <g
        transform="translate(238,28)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={`head-${i}`}
            x={i * 9}
            y="-4"
            width="7"
            height="8"
            rx="1.5"
            fill={
              i === 0 || i === 3 || i === 5
                ? "#241C15"
                : i === 1 || i === 6
                  ? "#E07A5F"
                  : "#F4D35E"
            }
            stroke="#241C15"
            strokeWidth="1"
          />
        ))}
        <text
          x="36"
          y="18"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.8"
        >
          8 heads
        </text>
      </g>

      {/* 中央偏左：4 层 transformer block 堆叠 */}
      <g transform="translate(56,58)">
        {Array.from({ length: 4 }).map((_, i) => (
          <g key={`blk-${i}`}>
            <rect
              x="0"
              y={i * 24}
              width="118"
              height="20"
              rx="5"
              fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
              stroke="#241C15"
              strokeWidth="1.75"
            />
            <text
              x="10"
              y={i * 24 + 13}
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="700"
              fill="#88837C"
              letterSpacing="0.8"
            >
              layer {4 - i}
            </text>
            {/* 每层右侧：attention + ffn 两个小标记 */}
            <circle
              cx="92"
              cy={i * 24 + 10}
              r="2.5"
              fill="#E07A5F"
              stroke="#241C15"
              strokeWidth="0.8"
            />
            <rect
              x="100"
              y={i * 24 + 7}
              width="6"
              height="6"
              rx="1"
              fill="#1B4B5A"
              stroke="#241C15"
              strokeWidth="0.8"
            />
          </g>
        ))}
        {/* ×N 标 */}
        <text
          x="59"
          y="106"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1"
        >
          × N
        </text>
      </g>

      {/* 中央偏右：Q / K / V 三块 chip */}
      <g transform="translate(212,62)">
        {[
          { label: "Q", fill: "#E07A5F", text: "#FBEFE3", y: 0 },
          { label: "K", fill: "#1B4B5A", text: "#FBEFE3", y: 28 },
          { label: "V", fill: "#F4D35E", text: "#241C15", y: 56 },
        ].map((q, i) => (
          <g
            key={q.label}
            transform={`translate(0, ${q.y})`}
            className="origin-left transition-transform duration-500"
          >
            <rect
              x="0"
              y="0"
              width="68"
              height="22"
              rx="5"
              fill={q.fill}
              stroke="#241C15"
              strokeWidth="1.75"
            />
            <text
              x="11"
              y="15"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill={q.text}
            >
              {q.label}
            </text>
            {/* 小柱条 */}
            <g transform="translate(26,5)">
              {[5, 8, 11, 6, 9].map((h, j) => (
                <rect
                  key={j}
                  x={j * 7}
                  y={13 - h}
                  width="5"
                  height={h}
                  rx="0.8"
                  fill={q.text}
                  opacity="0.7"
                />
              ))}
            </g>
          </g>
        ))}
        {/* softmax 收敛箭头 → output */}
        <path
          d="M 74 11 Q 96 41 74 71"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeDasharray="3 2"
          fill="none"
          strokeLinecap="round"
          className="animate-dash-flow"
        />
        <text
          x="98"
          y="44"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.6"
        >
          softmax
        </text>
      </g>

      {/* token 行（底部）+ 弧形 attention 连线（在 block 之上突起） */}
      {/* attention 弧线先画（在 token 之下层） */}
      {ARCS.map((arc, i) => {
        const xA = tokX(arc.a) + TOK_W / 2;
        const xB = tokX(arc.b) + TOK_W / 2;
        const yBase = TOK_Y - TOK_H / 2 - 2;
        const peak = 152 - i * 4; // 不同弧顶高
        const cx = (xA + xB) / 2;
        return (
          <path
            key={`arc-${i}`}
            d={`M ${xA} ${yBase} Q ${cx} ${peak} ${xB} ${yBase}`}
            stroke={arc.tone}
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2.5 2.5"
            className="animate-dash-flow"
            opacity="0.85"
          />
        );
      })}

      {/* token 方块 */}
      {TOKENS.map((t, i) => (
        <g
          key={`tk-${i}`}
          transform={`translate(${tokX(i)}, ${TOK_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
        >
          <rect
            x="0"
            y="0"
            width={TOK_W}
            height={TOK_H}
            rx="4"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.75"
          />
          <text
            x={TOK_W / 2}
            y={TOK_H / 2 + 4.5}
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="13"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* 左下：架构小标 */}
      <g transform="translate(28,193) rotate(-2)" className="origin-left">
        <rect
          x="-2"
          y="-9"
          width="106"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="51"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          decoder-only · 2026 主流
        </text>
      </g>

      {/* 右下 caption */}
      <text
        x="248"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        self-attention
      </text>
    </CoverShell>
  );
};

export default TransformerCover;
