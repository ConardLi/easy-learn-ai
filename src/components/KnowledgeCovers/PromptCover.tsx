/**
 * Prompt 封面
 *
 * 隐喻：Prompt = 人发给模型的一段指令。
 *   左侧一个对话气泡，里面打着一行指令文字 + 闪烁光标；
 *   中间一支箭头把这段话送过去；
 *   右侧是模型方块（写 AI），收到后亮起来。
 *
 * 配色：teal 主调（跟兄弟站区分）+ cream 气泡 + butter/coral 点缀。
 * hover：气泡轻轻上浮，箭头向右推一下，模型方块微微放大。
 */
import React from "react";
import CoverShell from "./CoverShell";

const PromptCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* 装饰：右上小问号星点 */}
      <g transform="translate(288,34)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-45">
          <path
            d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 左侧：对话气泡（你打的 prompt） */}
      <g
        transform="translate(30,52)"
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-1.5"
      >
        {/* 阴影底 */}
        <rect x="3" y="3" width="138" height="86" rx="16" fill="#241C15" opacity="0.85" />
        {/* 气泡主体 */}
        <rect x="0" y="0" width="138" height="86" rx="16" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" />
        {/* 气泡小尾巴 */}
        <path d="M 22 84 L 22 100 L 40 86 Z" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" strokeLinejoin="round" />
        {/* 标签 PROMPT */}
        <text x="14" y="22" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#1B4B5A">
          PROMPT
        </text>
        {/* 指令文字行 */}
        <text x="14" y="44" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill="#241C15">
          帮我写一封
        </text>
        <text x="14" y="62" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill="#241C15">
          请假邮件
        </text>
        {/* 闪烁光标 */}
        <rect x="76" y="52" width="2.5" height="13" fill="#E07A5F" className="animate-pulse-dot" />
      </g>

      {/* 中间：箭头（送过去） */}
      <g
        transform="translate(178,95)"
        className="transition-transform duration-500 ease-spring group-hover:translate-x-2"
      >
        <line x1="0" y1="0" x2="42" y2="0" stroke="#241C15" strokeWidth="3" strokeLinecap="round" />
        <path d="M 36 -7 L 48 0 L 36 7 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* 右侧：模型方块 */}
      <g transform="translate(238,58)">
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* 阴影底 */}
          <rect x="3" y="3" width="66" height="74" rx="14" fill="#241C15" opacity="0.85" />
          {/* 主体 */}
          <rect x="0" y="0" width="66" height="74" rx="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
          {/* AI 标 */}
          <text
            x="33"
            y="34"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="17"
            fontWeight="700"
            letterSpacing="1"
            fill="#FBEFE3"
          >
            AI
          </text>
          {/* 模型 caption */}
          <text
            x="33"
            y="50"
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
            fontSize="8.5"
            fontWeight="700"
            fill="#F4D35E"
          >
            大模型
          </text>
          {/* 三个输出小点（它开始回） */}
          <g transform="translate(33,62)">
            <circle cx="-8" cy="0" r="2.4" fill="#FBEFE3" />
            <circle cx="0" cy="0" r="2.4" fill="#FBEFE3" />
            <circle cx="8" cy="0" r="2.4" fill="#FBEFE3" />
          </g>
        </g>
      </g>
    </CoverShell>
  );
};

export default PromptCover;
