/**
 * BERT 封面
 *
 * 隐喻：一句话中间被盖了一个 [MASK]，左右两边的词向中间挤，BERT 在头顶给出 top-3 候选词。
 *
 * 视觉构图（viewBox 320×200）：
 *   ─ 顶部：stamp 印章「MLM · 15%」（pop 色）
 *   ─ 中部 y=70：top-3 候选词条（butter / coral / teal） + 概率柱
 *   ─ 中下 y=130：一行 7 个 token 方块，第 4 个是 [MASK]（ink 黑大方块）
 *   ─ [MASK] 左右各 3 个邻居方块，左/右各画一条向中心汇聚的虚线箭头
 *   ─ 左下：bert-base 110M 小标
 *   ─ 右下：Encoder 堆叠 4 层小图标
 *
 * hover：候选词条左右微抖、箭头加速、Encoder 层呼吸。
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 句子结构：占位词 + [MASK] */
const LEFT_TOKENS = ["今", "天", "真"];
const RIGHT_TOKENS = ["，", "去", "！"];

/* top-3 候选词与概率 */
const CANDIDATES: { word: string; prob: number; tone: string; textColor: string }[] = [
  { word: "热", prob: 0.74, tone: "#F4D35E", textColor: "#241C15" }, // butter
  { word: "晒", prob: 0.12, tone: "#E07A5F", textColor: "#FBEFE3" }, // coral
  { word: "好", prob: 0.09, tone: "#1B4B5A", textColor: "#FBEFE3" }, // teal
];

/* 单 token 方块尺寸 */
const TOK_W = 22;
const TOK_H = 22;
const TOK_GAP = 4;
const ROW_Y = 138;
const ROW_CX = 160;
const MASK_W = 30;

/* 左右 3 个 token 的 x 坐标（中心对齐 [MASK]） */
const leftX = (i: number) => ROW_CX - MASK_W / 2 - TOK_GAP - (3 - i) * (TOK_W + TOK_GAP) + TOK_W / 2;
const rightX = (i: number) => ROW_CX + MASK_W / 2 + TOK_GAP + i * (TOK_W + TOK_GAP) + TOK_W / 2;

const BertCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* 顶部 stamp：MLM · 15% */}
      <g
        transform="translate(50,28) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-30"
          y="-11"
          width="60"
          height="22"
          rx="4"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1.4"
          fill="#FBEFE3"
        >
          MLM · 15%
        </text>
      </g>

      {/* 右上：Encoder 堆叠 4 层小图标 */}
      <g
        transform="translate(285,28)"
        className="origin-center transition-transform duration-500 group-hover:translate-y-[-2px]"
      >
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={`stack-${i}`}
            x="-22"
            y={-12 + i * 6}
            width="44"
            height="4"
            rx="1.2"
            fill={i === 0 ? "#241C15" : i === 1 ? "#5A5147" : "#88837C"}
            stroke="#241C15"
            strokeWidth="1"
            opacity={1 - i * 0.18}
          />
        ))}
        <text
          x="0"
          y="22"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fill="#88837C"
          letterSpacing="0.8"
        >
          12 layers
        </text>
      </g>

      {/* 中部：top-3 候选词条 */}
      <g transform="translate(160,72)">
        {/* 候选词容器小标题 */}
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fill="#88837C"
          letterSpacing="1.2"
        >
          top-3 candidates
        </text>

        {CANDIDATES.map((c, i) => {
          /* 三个候选词左右并排 */
          const x = (i - 1) * 48;
          const barWidth = c.prob * 38;
          return (
            <g
              key={`cand-${i}`}
              transform={`translate(${x},0)`}
              className="origin-center transition-transform duration-500"
            >
              {/* 词方块 */}
              <rect
                x="-19"
                y="-12"
                width="38"
                height="22"
                rx="4"
                fill={c.tone}
                stroke="#241C15"
                strokeWidth="1.8"
              />
              <text
                x="-3"
                y="3"
                textAnchor="middle"
                fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
                fontSize="13"
                fontWeight="800"
                fill={c.textColor}
              >
                {c.word}
              </text>
              {/* 概率小数字 */}
              <text
                x="9"
                y="3"
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill={c.textColor}
                opacity="0.7"
              >
                {(c.prob * 100).toFixed(0)}
              </text>
              {/* 概率柱 */}
              <line
                x1="-19"
                y1="14"
                x2="19"
                y2="14"
                stroke="#241C15"
                strokeWidth="0.6"
                opacity="0.2"
              />
              <line
                x1="-19"
                y1="14"
                x2={-19 + barWidth}
                y2="14"
                stroke="#241C15"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </g>

      {/* 候选词 → [MASK] 的下行虚线（一条） */}
      <line
        x1="160"
        y1="88"
        x2="160"
        y2={ROW_Y - TOK_H / 2 - 2}
        stroke="#241C15"
        strokeWidth="1.2"
        strokeDasharray="2 2"
        strokeLinecap="round"
        className="animate-dash-flow"
      />
      <polygon
        points={`156,${ROW_Y - TOK_H / 2 - 4} 160,${ROW_Y - TOK_H / 2 + 1} 164,${ROW_Y - TOK_H / 2 - 4}`}
        fill="#241C15"
      />

      {/* 句子行：左 3 + [MASK] + 右 3 */}
      {/* 左 3 个 token */}
      {LEFT_TOKENS.map((t, i) => (
        <g
          key={`l-${i}`}
          transform={`translate(${leftX(i)}, ${ROW_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-x-[2px]"
        >
          <rect
            x={-TOK_W / 2}
            y={-TOK_H / 2}
            width={TOK_W}
            height={TOK_H}
            rx="3.5"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.7"
          />
          <text
            y="3.5"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* 中间 [MASK] 大方块 */}
      <g transform={`translate(${ROW_CX}, ${ROW_Y})`}>
        <rect
          x={-MASK_W / 2}
          y={-TOK_H / 2}
          width={MASK_W}
          height={TOK_H}
          rx="3.5"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.7"
        />
        <text
          y="3.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          letterSpacing="0.8"
          fill="#F4D35E"
        >
          [MASK]
        </text>
      </g>

      {/* 右 3 个 token */}
      {RIGHT_TOKENS.map((t, i) => (
        <g
          key={`r-${i}`}
          transform={`translate(${rightX(i)}, ${ROW_Y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-x-[-2px]"
        >
          <rect
            x={-TOK_W / 2}
            y={-TOK_H / 2}
            width={TOK_W}
            height={TOK_H}
            rx="3.5"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="1.7"
          />
          <text
            y="3.5"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="12"
            fontWeight="800"
            fill="#241C15"
          >
            {t}
          </text>
        </g>
      ))}

      {/* 左 → [MASK] 汇聚弧线（attention 涌入） */}
      <path
        d={`M ${leftX(0)} ${ROW_Y + TOK_H / 2 + 4} Q ${(leftX(0) + ROW_CX) / 2} ${ROW_Y + 22} ${ROW_CX - MASK_W / 2 - 2} ${ROW_Y + TOK_H / 2 + 2}`}
        stroke="#E07A5F"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      {/* 右 → [MASK] 汇聚弧线 */}
      <path
        d={`M ${rightX(2)} ${ROW_Y + TOK_H / 2 + 4} Q ${(rightX(2) + ROW_CX) / 2} ${ROW_Y + 22} ${ROW_CX + MASK_W / 2 + 2} ${ROW_Y + TOK_H / 2 + 2}`}
        stroke="#1B4B5A"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 3"
        className="animate-dash-flow"
      />
      {/* 中央小箭头会聚点 */}
      <circle
        cx={ROW_CX}
        cy={ROW_Y + 28}
        r="2.5"
        fill="#E07A5F"
        stroke="#241C15"
        strokeWidth="1"
      />

      {/* 左下：bert-base 110M 小标 */}
      <g transform="translate(28,182) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="78"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="36"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          bert-base · 110M
        </text>
      </g>

      {/* 底部 caption：双向 encoder */}
      <text
        x="226"
        y="188"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        bidirectional encoder
      </text>
    </CoverShell>
  );
};

export default BertCover;
