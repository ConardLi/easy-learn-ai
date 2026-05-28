/**
 * RAG 封面
 *
 * 隐喻：RAG = 先翻资料 → 找到证据 → 给出有出处的答案。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：4 张倾斜叠放的文档卡片，其中 top 卡片是 coral（高亮命中的那张）
 *   - 中：teal 放大镜照在文档上
 *   - 右：butter 对话气泡，内含 ✓ 和小三角尾巴
 *   - 三者上方一条虚线 + 小箭头连接，暗示流程
 *   - 装饰：左上 sparkle、右下小方块
 *
 * hover 行为：放大镜向左下移动（似在扫读）、命中卡片上抬。
 */
import React from "react";
import CoverShell from "./CoverShell";

const RagCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 上方虚线流程指示弧 */}
      <path
        d="M 56 38 Q 160 8 264 38"
        stroke="#1B4B5A"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 5"
        opacity="0.55"
      />
      {/* 弧上的小箭头（中点偏右） */}
      <g transform="translate(220,18) rotate(28)">
        <path d="M -5 -3 L 3 0 L -5 3 Z" fill="#1B4B5A" opacity="0.7" />
      </g>

      {/* 装饰：左上 sparkle */}
      <g transform="translate(28,30) rotate(15)" className="origin-center transition-transform duration-700 group-hover:rotate-90">
        <path
          d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.2"
        />
      </g>

      {/* 装饰：右下小方块 */}
      <g transform="translate(298,176) rotate(20)">
        <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* ① 左侧文档堆 */}
      <g transform="translate(78,108)">
        {/* 后排 #3 */}
        <g transform="translate(-8,16) rotate(-10)">
          <DocCard fill="#FBEFE3" />
        </g>
        {/* 后排 #2 */}
        <g transform="translate(-4,8) rotate(-4)">
          <DocCard fill="#FFFFFF" />
        </g>
        {/* 中间 #1 */}
        <g transform="translate(0,0) rotate(2)">
          <DocCard fill="#FFFFFF" />
        </g>
        {/* 顶层命中卡 —— hover 时上抬 */}
        <g
          transform="translate(4,-8) rotate(6)"
          className="transition-transform duration-400 ease-out group-hover:-translate-y-3 origin-center"
        >
          <DocCard fill="#E07A5F" textFill="#FBEFE3" highlighted />
        </g>
      </g>

      {/* ② 中央放大镜 */}
      <g
        className="transition-transform duration-500 ease-out group-hover:translate-x-[-6px] group-hover:translate-y-2"
        style={{ transformOrigin: "center" }}
      >
        <g transform="translate(160,108)">
          {/* 手柄 */}
          <line
            x1="14"
            y1="14"
            x2="30"
            y2="30"
            stroke="#241C15"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="14"
            x2="30"
            y2="30"
            stroke="#1B4B5A"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* 镜框 */}
          <circle cx="0" cy="0" r="22" fill="#FBEFE3" stroke="#241C15" strokeWidth="3" />
          <circle cx="0" cy="0" r="22" fill="#1B4B5A" opacity="0.12" />
          {/* 镜框内的"找到了" ★ */}
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="20"
            fontWeight="800"
            fill="#1B4B5A"
          >
            ★
          </text>
          {/* 高光 */}
          <ellipse cx="-9" cy="-10" rx="5" ry="3" fill="#FFFFFF" opacity="0.85" transform="rotate(-30, -9, -10)" />
        </g>
      </g>

      {/* ③ 右侧答案气泡 */}
      <g transform="translate(252,98)">
        {/* 气泡尾巴 */}
        <path
          d="M -8 28 L -16 42 L -4 32 Z"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* 主气泡 */}
        <rect
          x="-30"
          y="-22"
          width="60"
          height="56"
          rx="14"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* 文字行 */}
        <line x1="-20" y1="-10" x2="20" y2="-10" stroke="#241C15" strokeWidth="2" strokeLinecap="round" opacity="0.65" />
        <line x1="-20" y1="-3" x2="14" y2="-3" stroke="#241C15" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        {/* 大对勾 */}
        <g transform="translate(0,16)">
          <circle cx="0" cy="0" r="10" fill="#241C15" />
          <path
            d="M -4.5 0 L -1.5 3.5 L 5 -3.5"
            stroke="#F4D35E"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* 底部 mono 流程说明（轻度强化主题） */}
      <text
        x="160"
        y="190"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        letterSpacing="3"
        fontWeight="700"
        fill="#241C15"
        opacity="0.42"
      >
        RETRIEVE  →  AUGMENT  →  GENERATE
      </text>
    </CoverShell>
  );
};

/* 单张文档卡片 —— 用一段段横线表示文本 */
const DocCard: React.FC<{
  fill: string;
  textFill?: string;
  highlighted?: boolean;
}> = ({ fill, textFill = "#241C15", highlighted = false }) => (
  <g>
    <rect
      x="-28"
      y="-32"
      width="56"
      height="64"
      rx="4"
      fill={fill}
      stroke="#241C15"
      strokeWidth="2"
    />
    {/* 文本行 */}
    <line x1="-20" y1="-20" x2="20" y2="-20" stroke={textFill} strokeWidth="2" strokeLinecap="round" opacity={highlighted ? 0.9 : 0.6} />
    <line x1="-20" y1="-12" x2="14" y2="-12" stroke={textFill} strokeWidth="2" strokeLinecap="round" opacity={highlighted ? 0.8 : 0.45} />
    <line x1="-20" y1="-4" x2="20" y2="-4" stroke={textFill} strokeWidth="2" strokeLinecap="round" opacity={highlighted ? 0.9 : 0.55} />
    <line x1="-20" y1="4" x2="10" y2="4" stroke={textFill} strokeWidth="2" strokeLinecap="round" opacity={highlighted ? 0.7 : 0.4} />
    {highlighted && (
      <g transform="translate(20,18)">
        <circle cx="0" cy="0" r="6.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
        <path
          d="M -3 0 L -1 2 L 3 -2"
          stroke="#1B4B5A"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    )}
  </g>
);

export default RagCover;
