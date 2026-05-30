/**
 * T5 封面
 *
 * 隐喻：encoder 框（左）+ decoder 框（右）+ 中间 cross-attention 箭头串。
 * 左下「translate English to German:」前缀小印章，右上「That is good.」→「Das ist gut.」转换示意。
 *
 * 跟 transformer cover（4 层堆叠 + Q/K/V chip + token 弧线）差异化：
 *   ─ transformer 是「self-attention · Q/K/V 拆三件套」
 *   ─ 这里是「encoder ↔ decoder · text-to-text · 多任务前缀」
 *
 * 跟 bert cover（一句话 + [MASK] + top-3 候选）差异化：
 *   ─ bert 是单 token mask 视觉
 *   ─ 这里是 encoder-decoder 双框 + 字符串转换视觉
 *
 * 视觉构图（viewBox 320×200）：
 *   ─ 左上 stamp「2019 · arXiv 1910.10683」（teal 横向 pill）
 *   ─ 顶部一行任务前缀 chip 流（4 个）
 *   ─ 中央偏左：encoder 框（4 层堆叠 · teal 描边）
 *   ─ 中央偏右：decoder 框（4 层堆叠 · coral 描边）
 *   ─ 中间：3 条 cross-attention dash 箭头（encoder → decoder）
 *   ─ 底部：「That is good.」→「Das ist gut.」字符串转换
 */
import React from "react";
import CoverShell from "./CoverShell";

const TASK_CHIPS = ["translate:", "summarize:", "cola:", "stsb:"];

const T5Cover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* 左上 stamp：T5 + 论文编号 */}
      <g
        transform="translate(54,24) rotate(-5)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-44"
          y="-11"
          width="88"
          height="22"
          rx="4"
          fill="#1B4B5A"
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
          2019 · 1910.10683
        </text>
      </g>

      {/* 顶部右侧：任务前缀 chip 横排（4 个） */}
      <g transform="translate(166,18)">
        {TASK_CHIPS.map((label, i) => (
          <g
            key={label}
            transform={`translate(${i * 36}, 0)`}
            className="origin-center transition-transform duration-500 group-hover:translate-y-[-1px]"
          >
            <rect
              x="0"
              y="0"
              width="34"
              height="13"
              rx="3"
              fill={i === 0 ? "#F4D35E" : "#FFFFFF"}
              stroke="#241C15"
              strokeWidth="1.4"
            />
            <text
              x="17"
              y="9"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="7"
              fontWeight="700"
              fill="#241C15"
              letterSpacing="0.3"
            >
              {label}
            </text>
          </g>
        ))}
      </g>

      {/* encoder 框（左） */}
      <g transform="translate(36,58)">
        {/* 框 */}
        <rect
          x="0"
          y="0"
          width="98"
          height="92"
          rx="8"
          fill="#FFFFFF"
          stroke="#1B4B5A"
          strokeWidth="2"
        />
        <text
          x="49"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          fill="#1B4B5A"
          letterSpacing="1"
        >
          ENCODER
        </text>
        {/* 4 层堆叠 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={`e-${i}`}
            x="10"
            y={22 + i * 16}
            width="78"
            height="12"
            rx="2.5"
            fill={i % 2 === 0 ? "#FBEFE3" : "#FFFFFF"}
            stroke="#241C15"
            strokeWidth="1.2"
          />
        ))}
        <text
          x="49"
          y="86"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.5"
        >
          双向 attention
        </text>
      </g>

      {/* decoder 框（右） */}
      <g transform="translate(186,58)">
        <rect
          x="0"
          y="0"
          width="98"
          height="92"
          rx="8"
          fill="#FFFFFF"
          stroke="#E07A5F"
          strokeWidth="2"
        />
        <text
          x="49"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          fill="#E07A5F"
          letterSpacing="1"
        >
          DECODER
        </text>
        {Array.from({ length: 4 }).map((_, i) => (
          <rect
            key={`d-${i}`}
            x="10"
            y={22 + i * 16}
            width="78"
            height="12"
            rx="2.5"
            fill={i % 2 === 0 ? "#FBEFE3" : "#FFFFFF"}
            stroke="#241C15"
            strokeWidth="1.2"
          />
        ))}
        <text
          x="49"
          y="86"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7"
          fontWeight="600"
          fill="#88837C"
          letterSpacing="0.5"
        >
          因果 mask + cross-attn
        </text>
      </g>

      {/* cross-attention：3 条 dash 箭头从 encoder → decoder */}
      {[0, 1, 2].map((i) => {
        const y = 70 + i * 22;
        return (
          <g key={`x-${i}`}>
            <line
              x1="134"
              y1={y}
              x2="186"
              y2={y}
              stroke="#241C15"
              strokeWidth="1.4"
              strokeDasharray="3 2"
              className="animate-dash-flow"
            />
            <polygon
              points={`184,${y - 3} 188,${y} 184,${y + 3}`}
              fill="#241C15"
            />
          </g>
        );
      })}
      <text
        x="160"
        y="138"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="7"
        fontWeight="700"
        fill="#88837C"
        letterSpacing="0.5"
      >
        cross-attention
      </text>

      {/* 底部：字符串转换示例 */}
      <g transform="translate(0,168)">
        {/* 输入 */}
        <rect
          x="22"
          y="0"
          width="118"
          height="22"
          rx="4"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="81"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="0.3"
        >
          That is good.
        </text>

        {/* 箭头 */}
        <line
          x1="142"
          y1="11"
          x2="176"
          y2="11"
          stroke="#E07A5F"
          strokeWidth="1.6"
          strokeDasharray="3 2"
          className="animate-dash-flow"
        />
        <polygon points="174,7 178,11 174,15" fill="#E07A5F" />

        {/* 输出 */}
        <rect
          x="180"
          y="0"
          width="118"
          height="22"
          rx="4"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="239"
          y="14"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="0.3"
        >
          Das ist gut.
        </text>
      </g>

      {/* 左下小标：text-to-text */}
      <g transform="translate(56,196) rotate(-2)" className="origin-left">
        <rect
          x="-2"
          y="-9"
          width="100"
          height="12"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="48"
          y="0"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          text-to-text framework
        </text>
      </g>
    </CoverShell>
  );
};

export default T5Cover;
