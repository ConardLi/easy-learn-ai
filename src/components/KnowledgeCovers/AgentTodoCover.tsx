/**
 * Agent TodoList 封面
 *
 * 隐喻：Agent TodoList = 一张折角的 Checklist 清单，钉在墙上。
 *      每一行是一项任务，✓ 和 ○（pending）相间排布，最底一行是
 *      正在 in_progress 的高亮项。视觉跟 AgentCover（循环+触手）/
 *      AgentLoopCover（旋转环）/ AgentMemoryCover（档案柜）都不同。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央：butter 色折角便利贴，顶部一颗 pop 色图钉
 *   - 便利贴内容：标题条 + 4 行任务（2 ✓ / 1 in_progress / 1 ○）
 *   - 右下角：折角三角（cream 色 + 阴影）
 *   - 装饰：左上 sparkle、右下小 ✓ 印章、左下小圆点阵
 *
 * hover 行为：
 *   - 便利贴整体轻微翘起（向上偏移 + 旋转角度变化）
 *   - 4 个 checkbox 错峰勾选：从上到下依次 0/120/240/360ms
 *   - 右下印章微缩放、左上 sparkle 转动
 */
import React from "react";
import CoverShell from "./CoverShell";

const STICKY_X = 90;
const STICKY_Y = 36;
const STICKY_W = 170;
const STICKY_H = 138;

const ITEMS = [
  { y: 80, text: "查日历", initialChecked: true, delayMs: 0 },
  { y: 100, text: "收邮件", initialChecked: true, delayMs: 120 },
  { y: 120, text: "扫 Git", initialChecked: false, delayMs: 240, inProgress: true },
  { y: 140, text: "起草日报", initialChecked: false, delayMs: 360 },
];

const AgentTodoCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：左下小圆点阵 */}
      <g transform="translate(34,150)">
        {Array.from({ length: 9 }).map((_, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          return (
            <circle
              key={i}
              cx={col * 6}
              cy={row * 6}
              r="1.2"
              fill="#241C15"
              opacity="0.35"
            />
          );
        })}
      </g>

      {/* 装饰：右下 ✓ 印章 */}
      <g transform="translate(286,170)">
        <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-110">
          <circle cx="0" cy="0" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
          <path
            d="M -5 0 L -1.5 4 L 5.5 -3.5"
            stroke="#FBEFE3"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </g>

      {/* 旁边小贴 · 旋转角度（左下） */}
      <g
        transform="translate(56,150) rotate(-12)"
        className="transition-transform duration-500 ease-spring group-hover:rotate-[-18deg]"
      >
        <rect
          x="-12"
          y="-9"
          width="40"
          height="18"
          rx="4"
          fill="#241C15"
          opacity="0.85"
          transform="translate(2,2)"
        />
        <rect
          x="-12"
          y="-9"
          width="40"
          height="18"
          rx="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="8"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1"
          fill="#FBEFE3"
        >
          ✕ SKIP
        </text>
      </g>

      {/* ─── 主体：折角便利贴 ─── */}
      <g
        transform={`translate(${STICKY_X + STICKY_W / 2},${STICKY_Y + STICKY_H / 2}) rotate(-3)`}
        className="origin-center transition-transform duration-500 ease-spring group-hover:rotate-[-5deg] group-hover:-translate-y-1"
        style={{ transformBox: "fill-box" }}
      >
        {/* 阴影底 */}
        <rect
          x={-STICKY_W / 2}
          y={-STICKY_H / 2}
          width={STICKY_W}
          height={STICKY_H}
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(4,4)"
        />
        {/* 便利贴本体 · butter 色 */}
        <rect
          x={-STICKY_W / 2}
          y={-STICKY_H / 2}
          width={STICKY_W}
          height={STICKY_H}
          rx="8"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.5"
        />

        {/* 顶部图钉（穿在便利贴正上方） */}
        <g transform={`translate(0,${-STICKY_H / 2 - 6})`}>
          <circle cx="0" cy="0" r="6" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
          <circle cx="0" cy="0" r="1.5" fill="#241C15" />
        </g>

        {/* 标题条 */}
        <g transform={`translate(${-STICKY_W / 2 + 12},${-STICKY_H / 2 + 22})`}>
          <text
            x="0"
            y="0"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#241C15"
            opacity="0.65"
          >
            /DAILY-BRIEF
          </text>
          <text
            x="0"
            y="13"
            fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
            fontSize="13"
            fontWeight="800"
            fill="#241C15"
          >
            今日待办
          </text>
        </g>

        {/* 分隔线 */}
        <line
          x1={-STICKY_W / 2 + 12}
          y1={-STICKY_H / 2 + 50}
          x2={STICKY_W / 2 - 12}
          y2={-STICKY_H / 2 + 50}
          stroke="#241C15"
          strokeWidth="1.2"
          strokeDasharray="3 2.5"
          opacity="0.5"
        />

        {/* 4 行任务 */}
        {ITEMS.map((item, i) => {
          const itemY = -STICKY_H / 2 + 64 + i * 18;
          return (
            <g key={i} transform={`translate(${-STICKY_W / 2 + 14},${itemY})`}>
              {/* checkbox */}
              <g
                className={
                  item.initialChecked || item.inProgress
                    ? "transition-transform duration-300 ease-spring"
                    : "transition-transform duration-300 ease-spring group-hover:scale-110"
                }
                style={{
                  transformBox: "fill-box",
                  transitionDelay: `${item.delayMs}ms`,
                }}
              >
                <rect
                  x="0"
                  y="-5"
                  width="10"
                  height="10"
                  rx="2"
                  fill={
                    item.initialChecked
                      ? "#241C15"
                      : item.inProgress
                      ? "#E07A5F"
                      : "#FBEFE3"
                  }
                  stroke="#241C15"
                  strokeWidth="1.5"
                />
                {/* ✓ 始终（initialChecked） */}
                {item.initialChecked && (
                  <path
                    d="M 2 0 L 4 2 L 8 -3"
                    stroke="#F4D35E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                )}
                {/* hover 时第 4 项也勾上 */}
                {!item.initialChecked && !item.inProgress && (
                  <path
                    d="M 2 0 L 4 2 L 8 -3"
                    stroke="#241C15"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ transitionDelay: `${item.delayMs}ms` }}
                  />
                )}
                {/* in_progress 圆点（脉冲） */}
                {item.inProgress && (
                  <circle
                    cx="5"
                    cy="0"
                    r="2"
                    fill="#FBEFE3"
                    className="animate-pulse-dot"
                  />
                )}
              </g>

              {/* 文字 */}
              <text
                x="18"
                y="3"
                fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                fontSize="10"
                fontWeight="700"
                fill="#241C15"
                opacity={item.initialChecked ? 0.55 : 0.9}
                textDecoration={item.initialChecked ? "line-through" : "none"}
              >
                {item.text}
              </text>

              {/* 编号 */}
              <text
                x={STICKY_W - 32}
                y="3"
                fontFamily="Geist Mono, monospace"
                fontSize="7.5"
                fontWeight="700"
                fill="#241C15"
                opacity="0.5"
                textAnchor="end"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        {/* 底部进度小条 */}
        <g transform={`translate(${-STICKY_W / 2 + 12},${STICKY_H / 2 - 16})`}>
          <rect
            x="0"
            y="0"
            width={STICKY_W - 24}
            height="5"
            rx="2.5"
            fill="#241C15"
            opacity="0.18"
          />
          <rect
            x="0"
            y="0"
            width={(STICKY_W - 24) * 0.4}
            height="5"
            rx="2.5"
            fill="#241C15"
            className="transition-all duration-700 ease-spring"
          />
          <text
            x={STICKY_W - 24}
            y="-2"
            textAnchor="end"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="700"
            letterSpacing="0.5"
            fill="#241C15"
            opacity="0.65"
          >
            2 / 5
          </text>
        </g>

        {/* 右下折角 · cream 色 */}
        <g transform={`translate(${STICKY_W / 2 - 18},${STICKY_H / 2 - 18})`}>
          <path
            d="M 0 18 L 18 0 L 18 18 Z"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="2"
          />
          <line
            x1="2"
            y1="16"
            x2="16"
            y2="2"
            stroke="#241C15"
            strokeWidth="1.2"
            opacity="0.45"
          />
        </g>
      </g>

      {/* 顶部小标签 · TODO */}
      <g transform="translate(160,14)">
        <rect
          x="-22"
          y="-6"
          width="44"
          height="14"
          rx="3"
          fill="#241C15"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.8"
          fill="#FBEFE3"
        >
          TODO
        </text>
      </g>
    </CoverShell>
  );
};

export default AgentTodoCover;
