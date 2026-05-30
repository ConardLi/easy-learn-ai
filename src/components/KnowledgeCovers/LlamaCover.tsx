/**
 * Llama 封面
 *
 * 隐喻：Llama 4 代版本号（1 / 2 / 3 / 4）四枚 ticket 横排，
 *   每枚一个不同 tone，左上挂"open weights"印章，右上一颗简化 llama 头像 stamp。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左上：coral "open weights" 倾斜印章
 *   - 右上：圆角矩形 stamp 写大写 LLaMA + 一颗简化耳朵/眼睛 svg
 *   - 中央：4 个 stamp ticket（version 1 → 4），每个 sub-label 显示一句关键事实
 *     · 1 dense / 2 commercial / 3 GQA / 4 MoE
 *   - tickets 之间用 1.5 px 黑实线 + 三角箭头连接
 *   - 底部一条粗虚线时间轴 + 2023/24/25 年份刻度
 *
 * hover 行为：
 *   - 4 张 ticket 微浮起 + 阴影变深（依次延迟）
 *   - "open weights" 印章微旋转
 *   - 右上 LLaMA stamp 轻微缩放
 */
import React from "react";
import CoverShell from "./CoverShell";

type Ticket = {
  v: string;
  fact: string;
  fill: string;
  text: string;
};

const TICKETS: Ticket[] = [
  { v: "1", fact: "dense", fill: "#FFFFFF", text: "#241C15" },
  { v: "2", fact: "commercial", fill: "#F4D35E", text: "#241C15" },
  { v: "3", fact: "GQA · 128K", fill: "#1B4B5A", text: "#FBE891" },
  { v: "4", fact: "MoE · MM", fill: "#E07A5F", text: "#FBEFE3" },
];

const LlamaCover: React.FC = () => {
  /* tickets 横向布局 */
  const X0 = 36;
  const STEP = 64;
  const Y_T = 80;
  const W = 50;
  const H = 56;

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* 左上：open weights 印章（倾斜） */}
      <g
        transform="translate(40,30) rotate(-7)"
        className="origin-center transition-transform duration-500 ease-out group-hover:rotate-2 group-hover:scale-105"
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
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
          letterSpacing="0.5"
        >
          open weights
        </text>
      </g>

      {/* 右上：LLaMA 字样 stamp + 简化 llama 头像 */}
      <g
        transform="translate(280,30) rotate(6)"
        className="origin-center transition-transform duration-500 ease-out group-hover:rotate-[-3deg] group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-13"
          width="56"
          height="26"
          rx="6"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        {/* 简化 llama 头：两只长耳朵 + 椭圆脸 */}
        <g transform="translate(-15,0)" stroke="#FBE891" strokeWidth="1.5" fill="none">
          <ellipse cx="0" cy="2" rx="5" ry="6" fill="#FBE891" />
          {/* 左耳 */}
          <path d="M -3 -3 L -4 -8" strokeLinecap="round" />
          {/* 右耳 */}
          <path d="M 3 -3 L 4 -8" strokeLinecap="round" />
          {/* 眼睛 */}
          <circle cx="-1.5" cy="2" r="0.9" fill="#241C15" stroke="none" />
        </g>
        <text
          x="6"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#FBE891"
          letterSpacing="0.8"
        >
          LLaMA
        </text>
      </g>

      {/* 4 张 ticket 横排 */}
      {TICKETS.map((t, i) => {
        const x = X0 + i * STEP;
        return (
          <g
            key={t.v}
            transform={`translate(${x},${Y_T})`}
            className="origin-center transition-transform duration-400 ease-out group-hover:-translate-y-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {/* ticket body */}
            <rect
              x="0"
              y="0"
              width={W}
              height={H}
              rx="6"
              fill={t.fill}
              stroke="#241C15"
              strokeWidth="1.8"
            />
            {/* ticket 撕缝（左右两侧 V notch 暗示） */}
            <circle cx="0" cy={H / 2} r="2.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="0.8" />
            <circle cx={W} cy={H / 2} r="2.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="0.8" />

            {/* version 大数字 */}
            <text
              x={W / 2}
              y="26"
              textAnchor="middle"
              fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
              fontSize="22"
              fontWeight="800"
              fill={t.text}
            >
              {t.v}
            </text>
            {/* 横线 */}
            <line
              x1="9"
              y1="32"
              x2={W - 9}
              y2="32"
              stroke={t.text}
              strokeWidth="0.8"
              opacity="0.5"
            />
            {/* 关键事实 */}
            <text
              x={W / 2}
              y="46"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="700"
              fill={t.text}
              letterSpacing="0.5"
            >
              {t.fact}
            </text>
          </g>
        );
      })}

      {/* 三段连接箭头：ticket 1→2 / 2→3 / 3→4 */}
      <g stroke="#241C15" strokeWidth="1.4" fill="#241C15">
        {[0, 1, 2].map((i) => {
          const x1 = X0 + i * STEP + W + 3;
          const x2 = X0 + (i + 1) * STEP - 3;
          const y = Y_T + H / 2;
          return (
            <g key={i}>
              <line x1={x1} y1={y} x2={x2 - 4} y2={y} strokeLinecap="round" />
              <polygon points={`${x2 - 4},${y - 3} ${x2 + 1},${y} ${x2 - 4},${y + 3}`} />
            </g>
          );
        })}
      </g>

      {/* 底部时间轴 */}
      <g>
        <line
          x1="30"
          y1="170"
          x2="290"
          y2="170"
          stroke="#241C15"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          opacity="0.55"
        />
        {[
          { x: 50, label: "2023" },
          { x: 130, label: "2024" },
          { x: 210, label: "2025" },
          { x: 280, label: "2026" },
        ].map((m) => (
          <g key={m.label}>
            <line x1={m.x} y1="166" x2={m.x} y2="174" stroke="#241C15" strokeWidth="1.4" />
            <text
              x={m.x}
              y="184"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9"
              fontWeight="700"
              fill="#241C15"
              opacity="0.7"
              letterSpacing="0.5"
            >
              {m.label}
            </text>
          </g>
        ))}
      </g>

      {/* 标题字 */}
      <text
        x="160"
        y="156"
        textAnchor="middle"
        fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
        fontSize="9.5"
        fontWeight="700"
        fill="#241C15"
        opacity="0.5"
        letterSpacing="0.6"
      >
        Meta · 4 generations
      </text>
    </CoverShell>
  );
};

export default LlamaCover;
