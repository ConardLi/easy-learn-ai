/**
 * SFT 封面
 *
 * 隐喻：左边 (Q, A) 卡片对像传送带一样被一个一个吃进去 → 中央是 base 模型球 →
 *   球被 <|im_start|>...<|im_end|> chat-template "套子" 包住 → 右边变成会对话的 chat 模型
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：3 张 (Q, A) 卡叠在一起，标 instruction · response
 *   - 中：base 模型球（teal 圆）+ ChatML special token 环绕（coral 标签）
 *   - 右：chat 气泡，里面是 ✓ + 一行答案
 *   - 顶部 stamp："→ chat model"
 *   - 底部 caption："base + (q,a) × N"
 *
 * hover：
 *   - 卡片队列推进一步
 *   - chat-template 标签微微旋转（套子收紧感）
 *   - 右侧气泡轻浮上 1px
 */
import React from "react";
import CoverShell from "./CoverShell";

const SftCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-soft" dotOpacity={0.08}>
      {/* 顶部 stamp · → chat */}
      <g
        transform="translate(258,28) rotate(7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-34"
          y="-11"
          width="68"
          height="22"
          rx="11"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#F4D35E"
        >
          → chat
        </text>
      </g>

      {/* 左上 stamp · base */}
      <g
        transform="translate(38,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2"
      >
        <rect
          x="-26"
          y="-10"
          width="52"
          height="20"
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
          fontWeight="700"
          letterSpacing="1.2"
          fill="#FBEFE3"
        >
          BASE
        </text>
      </g>

      {/* 左下：caption */}
      <text
        x="38"
        y="188"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fontWeight="600"
        fill="#88837C"
      >
        base + (q, a) × N
      </text>

      {/* === 左侧：(Q, A) 卡片队列 === */}
      {/* 卡 3（最远 · 半透） */}
      <g
        transform="translate(34,100) rotate(-3)"
        opacity="0.45"
        className="transition-transform duration-500 group-hover:translate-x-2"
      >
        <rect
          x="-22"
          y="-22"
          width="44"
          height="44"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
      </g>

      {/* 卡 2（中间 · 半透） */}
      <g
        transform="translate(46,98) rotate(2)"
        opacity="0.7"
        className="transition-transform duration-500 group-hover:translate-x-2"
      >
        <rect
          x="-24"
          y="-24"
          width="48"
          height="48"
          rx="5"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.6"
        />
      </g>

      {/* 卡 1（前置 · 完整） */}
      <g
        transform="translate(62,95)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-3"
      >
        <rect
          x="-28"
          y="-28"
          width="56"
          height="56"
          rx="6"
          fill="#FFFFFF"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* Q 行 */}
        <text
          x="-22"
          y="-15"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#E07A5F"
          letterSpacing="0.5"
        >
          Q
        </text>
        <line x1="-12" y1="-16" x2="22" y2="-16" stroke="#241C15" strokeWidth="1.1" />
        <line x1="-12" y1="-10" x2="14" y2="-10" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
        {/* A 行 */}
        <text
          x="-22"
          y="5"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          fill="#1B4B5A"
          letterSpacing="0.5"
        >
          A
        </text>
        <line x1="-12" y1="4" x2="22" y2="4" stroke="#241C15" strokeWidth="1.1" />
        <line x1="-12" y1="10" x2="18" y2="10" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
        <line x1="-12" y1="16" x2="20" y2="16" stroke="#241C15" strokeWidth="1.1" opacity="0.6" />
      </g>

      {/* === 流动箭头：卡片 → base 球 === */}
      <g
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      >
        <path d="M 95 100 L 138 100" />
      </g>
      <polygon points="138,96 146,100 138,104" fill="#E07A5F" />

      {/* === 中央：base 模型球 + chat template 包裹 === */}
      {/* 套子 · <|im_start|> 左标签 */}
      <g
        transform="translate(160,68)"
        className="origin-bottom transition-transform duration-500 group-hover:translate-y-[-3px]"
      >
        <rect
          x="-30"
          y="-9"
          width="60"
          height="18"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          {"<|im_start|>"}
        </text>
      </g>

      {/* base 球 */}
      <g
        transform="translate(160,108)"
        className="origin-center transition-transform duration-500 group-hover:scale-105"
      >
        <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        <circle cx="-7" cy="-7" r="6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.4" opacity="0.85" />
        <circle cx="6" cy="4" r="4.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.4" opacity="0.85" />
        <circle cx="-4" cy="8" r="3" fill="#E07A5F" stroke="#241C15" strokeWidth="1.2" opacity="0.85" />
        <text
          y="22"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10"
          fontWeight="800"
          fill="#241C15"
        >
          model
        </text>
      </g>

      {/* 套子 · <|im_end|> 右标签 */}
      <g
        transform="translate(160,148)"
        className="origin-top transition-transform duration-500 group-hover:translate-y-[3px]"
      >
        <rect
          x="-28"
          y="-9"
          width="56"
          height="18"
          rx="3"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          {"<|im_end|>"}
        </text>
      </g>

      {/* === 中→右：reward 流动箭头 === */}
      <g
        stroke="#241C15"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
        opacity="0.6"
      >
        <path d="M 198 108 L 232 108" />
      </g>
      <polygon points="232,104 240,108 232,112" fill="#241C15" opacity="0.7" />

      {/* === 右侧：chat 气泡 === */}
      <g
        transform="translate(272,108)"
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        {/* 气泡主体 */}
        <rect
          x="-32"
          y="-26"
          width="64"
          height="52"
          rx="8"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 气泡尾巴 */}
        <polygon
          points="-32,16 -38,24 -28,12"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* ✓ + 文本占位 */}
        <circle cx="-22" cy="-14" r="4.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.4" />
        <path
          d="M -25 -14 L -23 -12 L -19 -16"
          stroke="#FBEFE3"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="-14" y1="-15" x2="22" y2="-15" stroke="#241C15" strokeWidth="1.2" />
        <line x1="-22" y1="-3" x2="22" y2="-3" stroke="#241C15" strokeWidth="1.2" opacity="0.7" />
        <line x1="-22" y1="6" x2="14" y2="6" stroke="#241C15" strokeWidth="1.2" opacity="0.7" />
        <line x1="-22" y1="15" x2="20" y2="15" stroke="#241C15" strokeWidth="1.2" opacity="0.4" />
      </g>
    </CoverShell>
  );
};

export default SftCover;
