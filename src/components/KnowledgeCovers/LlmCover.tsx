/**
 * LLM 封面
 *
 * 隐喻：大模型 = 一个被海量神经元填满的「脑」，左侧吃 token、右侧吐 token。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央大圆 = 脑（白底 / ink 描边 / 内置 8×8 神经元点阵 + coral 高亮）
 *   - 左侧 4 个 mono token 方块（"轻 松 理 解"） →  脑
 *   - 脑  → 右侧 4 个 token 方块（"L L M ✦"）
 *   - 上方一条 coral 弧（表示 attention 流）
 *   - 装饰：右上 sparkle、左下小方块
 *
 * hover 行为：脑外圈 ring 微微扩散；左右 token 各往中心位移 2px。
 */
import React from "react";
import CoverShell from "./CoverShell";

const LlmCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 上方装饰弧 —— attention 流 */}
      <path
        d="M 30 30 Q 160 -8 290 30"
        stroke="#E07A5F"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="3 4"
        opacity="0.55"
      />

      {/* 装饰：右上 sparkle */}
      <g transform="translate(285,28) rotate(15)" className="origin-center transition-transform duration-700 group-hover:rotate-45">
        <path
          d="M 0 -8 L 1.5 -1.5 L 8 0 L 1.5 1.5 L 0 8 L -1.5 1.5 L -8 0 L -1.5 -1.5 Z"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.2"
        />
      </g>

      {/* 装饰：左下小方块 */}
      <g transform="translate(30,170) rotate(-12)" className="origin-center transition-transform duration-500 group-hover:-rotate-2">
        <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* 左侧输入 token 串 */}
      <g className="transition-transform duration-500 ease-out group-hover:translate-x-1">
        {[
          { y: 50, label: "轻" },
          { y: 82, label: "松" },
          { y: 114, label: "理" },
          { y: 146, label: "解" },
        ].map((t, i) => (
          <g key={`in-${i}`} transform={`translate(30, ${t.y})`}>
            <rect
              x="0"
              y="-12"
              width="32"
              height="24"
              rx="5"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="16"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill="#241C15"
            >
              {t.label}
            </text>
            {/* 连接到脑的细线 */}
            <line x1="34" y1="0" x2="105" y2="100" stroke="#241C15" strokeWidth="0.8" opacity="0.22" />
          </g>
        ))}
      </g>

      {/* 中央：脑 */}
      <g transform="translate(160,100)">
        {/* hover 时的扩散环 */}
        <circle
          cx="0"
          cy="0"
          r="50"
          fill="none"
          stroke="#E07A5F"
          strokeWidth="2"
          opacity="0"
          className="transition-all duration-500 group-hover:opacity-60 group-hover:r-[58]"
          style={{ transformOrigin: "center" }}
        />
        {/* 主圆 */}
        <circle cx="0" cy="0" r="46" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        {/* clipPath 限定神经元矩阵在圆内 */}
        <defs>
          <clipPath id="llm-brain-clip">
            <circle cx="0" cy="0" r="42" />
          </clipPath>
        </defs>
        <g clipPath="url(#llm-brain-clip)">
          {/* 8 列 × 8 行神经元 */}
          {Array.from({ length: 8 }).flatMap((_, i) =>
            Array.from({ length: 8 }).map((_, j) => {
              const x = -42 + i * 12 + 6;
              const y = -42 + j * 12 + 6;
              /* 用确定哈希挑出几个高亮点，避免每次渲染抖动 */
              const seed = (i * 31 + j * 17) % 13;
              const highlight = seed === 1 || seed === 5 || seed === 9;
              const med = seed === 3 || seed === 7;
              return (
                <circle
                  key={`n-${i}-${j}`}
                  cx={x}
                  cy={y}
                  r={highlight ? 2.2 : med ? 1.8 : 1.4}
                  fill={highlight ? "#E07A5F" : med ? "#241C15" : "#241C15"}
                  opacity={highlight ? 1 : med ? 0.55 : 0.22}
                />
              );
            }),
          )}
        </g>
        {/* 标签 LLM */}
        <rect
          x="-22"
          y="34"
          width="44"
          height="18"
          rx="9"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="46"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          LLM
        </text>
      </g>

      {/* 右侧输出 token 串 */}
      <g className="transition-transform duration-500 ease-out group-hover:-translate-x-1">
        {[
          { y: 50, label: "看", tone: "ink" },
          { y: 82, label: "得", tone: "ink" },
          { y: 114, label: "懂", tone: "coral" },
          { y: 146, label: "！", tone: "ink" },
        ].map((t, i) => (
          <g key={`out-${i}`} transform={`translate(258, ${t.y})`}>
            {/* 连接到脑的细线 */}
            <line x1="-3" y1="0" x2="-58" y2="0" stroke="#241C15" strokeWidth="0.8" opacity="0.22" />
            <rect
              x="0"
              y="-12"
              width="32"
              height="24"
              rx="5"
              fill={t.tone === "coral" ? "#E07A5F" : "#FFFFFF"}
              stroke="#241C15"
              strokeWidth="2"
            />
            <text
              x="16"
              y="5"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="13"
              fontWeight="800"
              fill={t.tone === "coral" ? "#FBEFE3" : "#241C15"}
            >
              {t.label}
            </text>
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default LlmCover;
