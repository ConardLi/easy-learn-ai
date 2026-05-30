/**
 * Token 封面
 *
 * 隐喻：「1 个英文词 ≠ 1 个 token」。一行「strawberry」被两条裁切线切成 3 块，
 *       每块下面挂一个 token id 号码。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中上：「strawberry」一整词（display 字体，cream 描边背景），两条 dashed 切线穿过
 *   - 中下：3 个色块 token：「str」（butter）、「aw」（coral）、「berry」（teal），
 *           每块下方一个 mono id 数字
 *   - 右上：印章「1 → 3 tokens」（pop 色）
 *   - 左下：BPE / vocab 199,997 小标签
 *   - 左上：剪刀小标
 *
 * 跟 NlpCover 区分点：
 *   ─ Nlp 主图是「输入框 → 5 个 token → 向量柱 → y」，整链路
 *   ─ Token 主图聚焦「单词被切」这一动作 —— 1 个英文词被切成 3 块 + 各自 id
 *
 * hover：3 个色块依次上下错位（mimic 切开后散落），切线 dash 流动加速。
 */
import React from "react";
import CoverShell from "./CoverShell";

const PIECES: { text: string; tone: string; textColor: string; id: string }[] = [
  { text: "str", tone: "#F4D35E", textColor: "#241C15", id: "496" },
  { text: "aw", tone: "#E07A5F", textColor: "#FBEFE3", id: "2114" },
  { text: "berry", tone: "#1B4B5A", textColor: "#FBEFE3", id: "37738" },
];

const TokenCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 右上：印章 1 → 3 tokens */}
      <g
        transform="translate(280,28) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-32"
          y="-12"
          width="64"
          height="24"
          rx="4"
          fill="#FF4D74"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10.5"
          fontWeight="800"
          letterSpacing="1.0"
          fill="#FBEFE3"
        >
          1 → 3 tok
        </text>
      </g>

      {/* 左下：BPE 标签 */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="92"
          height="14"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="43"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#F4D35E"
        >
          BPE · o200k 199,997
        </text>
      </g>

      {/* 左上：剪刀 icon（手写 SVG，避免依赖 lucide） */}
      <g
        transform="translate(36,40) rotate(-12)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[4deg]"
      >
        <circle cx="-4" cy="-2" r="4" fill="none" stroke="#241C15" strokeWidth="1.6" />
        <circle cx="-4" cy="6" r="4" fill="none" stroke="#241C15" strokeWidth="1.6" />
        <line x1="0" y1="-2" x2="14" y2="2" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="0" y1="6" x2="14" y2="2" stroke="#241C15" strokeWidth="1.6" strokeLinecap="round" />
      </g>

      {/* 中上：「strawberry」整词 + 两条切线 */}
      <g transform="translate(160,80)">
        {/* 背景白条 */}
        <rect
          x="-110"
          y="-22"
          width="220"
          height="44"
          rx="8"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 词 */}
        <text
          x="0"
          y="7"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="26"
          fontWeight="800"
          letterSpacing="-0.4"
          fill="#241C15"
        >
          strawberry
        </text>
        {/* 两条切线（位置匹配 str|aw|berry 边界） */}
        <line
          x1="-46"
          y1="-30"
          x2="-46"
          y2="30"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="animate-dash-flow"
        />
        <line
          x1="-18"
          y1="-30"
          x2="-18"
          y2="30"
          stroke="#E07A5F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="animate-dash-flow"
        />
      </g>

      {/* 切线 → 切块 之间的小箭头 */}
      <g>
        <line
          x1="160"
          y1="108"
          x2="160"
          y2="124"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="2 2"
        />
        <polygon points="157,121 163,121 160,127" fill="#241C15" />
      </g>

      {/* 中下：3 个色块 token + id */}
      {PIECES.map((p, i) => {
        const totalWidth = 200;
        const gap = 8;
        const widthMap = [44, 36, 76]; // str / aw / berry · 按字符宽度
        let xOffset = -totalWidth / 2;
        for (let j = 0; j < i; j++) xOffset += widthMap[j] + gap;
        const x = 160 + xOffset + widthMap[i] / 2;
        return (
          <g
            key={p.text}
            transform={`translate(${x}, 148)`}
            className="origin-center transition-transform duration-500 group-hover:translate-y-1"
            style={{ transitionDelay: `${i * 80}ms` } as React.CSSProperties}
          >
            {/* token 块 */}
            <rect
              x={-widthMap[i] / 2}
              y={-14}
              width={widthMap[i]}
              height={28}
              rx="5"
              fill={p.tone}
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="0"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="14"
              fontWeight="800"
              fill={p.textColor}
            >
              {p.text}
            </text>
            {/* id 数字 */}
            <text
              x="0"
              y="29"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="0.4"
              fill="#88837C"
            >
              #{p.id}
            </text>
          </g>
        );
      })}

      {/* 底部 caption */}
      <text
        x="160"
        y="194"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
        letterSpacing="0.5"
      >
        1 word ≠ 1 token · 子词才是模型读到的最小单位
      </text>
    </CoverShell>
  );
};

export default TokenCover;
