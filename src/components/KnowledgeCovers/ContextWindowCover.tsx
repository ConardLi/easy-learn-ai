/**
 * Context Window 封面
 *
 * 隐喻：context window = 一只「横向的玻璃窗」框，模型这一秒看到的所有 token
 *       全在这一段。token 从左边以小药丸的形式排队飘进窗口；窗口右侧露出还剩
 *       的空闲区（虚斜线）。底部一条标尺 0 → 128K。
 *
 * 跟 AgentMemoryCover（三层档案柜）视觉刻意拉开：
 *   - 这张是 横向单条 + 流入；那张是 纵向多层 + 抽屉
 *   - 这张主色用 butter 暖底；那张是 cream 冷底
 *   - 这张主图元素是「窗框 + token 药丸」；那张是「抽屉柜 + 索引卡」
 *
 * hover 行为：
 *   - 顶上排队的 token 药丸往右整体平移一截（仿佛流入）
 *   - 窗口里靠右那段 占用 bar 涨一截
 *   - 右下 ∞ 旋转
 */
import React from "react";
import CoverShell from "./CoverShell";

type Seg = {
  key: string;
  label: string;
  w: number;
  fill: string;
  text: string;
};

const SEGS: Seg[] = [
  { key: "sys", label: "SYS", w: 10, fill: "#1B4B5A", text: "#FBEFE3" },
  { key: "tool", label: "TOOL", w: 16, fill: "#E07A5F", text: "#FBEFE3" },
  { key: "hist", label: "HISTORY", w: 56, fill: "#F4D35E", text: "#241C15" },
  { key: "now", label: "NOW", w: 14, fill: "#FF4D74", text: "#FBEFE3" },
];

const WIN_X = 36;
const WIN_Y = 86;
const WIN_W = 248;
const WIN_H = 44;

const ContextWindowCover: React.FC = () => {
  // 累计每段的 x 起点
  let runningX = WIN_X;
  const usedPctTotal = SEGS.reduce((s, x) => s + x.w, 0); // 96
  const usableUnit = WIN_W / 100; // 每 1% 占用对应的宽度

  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.1}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(28,26)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.4"
          />
        </g>
      </g>

      {/* 装饰：右下 ∞ */}
      <g transform="translate(286,170)">
        <g
          className="origin-center transition-transform duration-[1400ms] ease-linear group-hover:rotate-[180deg]"
          style={{ transformBox: "fill-box" }}
        >
          <circle cx="0" cy="0" r="11" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
          <text
            x="0"
            y="3.4"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="11"
            fontWeight="800"
            fill="#241C15"
          >
            ∞
          </text>
        </g>
      </g>

      {/* 装饰：左下小圆点阵 */}
      <g transform="translate(24,152)">
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
              opacity="0.4"
            />
          );
        })}
      </g>

      {/* 顶部小标签：CONTEXT WINDOW */}
      <g transform={`translate(${WIN_X},66)`}>
        <rect x="0" y="0" width="120" height="14" rx="3" fill="#241C15" />
        <text
          x="60"
          y="10"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.8"
          fill="#FBEFE3"
        >
          CONTEXT WINDOW
        </text>
      </g>
      <text
        x={WIN_X + WIN_W}
        y={76}
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.6"
        fill="#241C15"
        opacity="0.7"
      >
        128K tokens
      </text>

      {/* ─── 主窗：横向长条 ─── */}
      {/* 阴影 */}
      <rect
        x={WIN_X}
        y={WIN_Y}
        width={WIN_W}
        height={WIN_H}
        rx="6"
        fill="#241C15"
        opacity="0.9"
        transform="translate(3,3)"
      />
      {/* 主体（外框） */}
      <rect
        x={WIN_X}
        y={WIN_Y}
        width={WIN_W}
        height={WIN_H}
        rx="6"
        fill="#FBEFE3"
        stroke="#241C15"
        strokeWidth="2.5"
      />

      {/* 内部段 */}
      <g>
        {SEGS.map((seg, idx) => {
          const segW = seg.w * usableUnit;
          const x = runningX;
          runningX += segW;
          return (
            <g key={seg.key}>
              <rect
                x={x}
                y={WIN_Y + 2}
                width={segW - (idx === SEGS.length - 1 ? 2 : 0)}
                height={WIN_H - 4}
                fill={seg.fill}
                stroke="#241C15"
                strokeWidth="1.2"
                rx="2"
                opacity={idx === SEGS.length - 1 ? 0.95 : 1}
              />
              {segW >= 30 && (
                <text
                  x={x + segW / 2}
                  y={WIN_Y + WIN_H / 2 + 3.5}
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="8.5"
                  fontWeight="800"
                  letterSpacing="1.2"
                  fill={seg.text}
                >
                  {seg.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 空闲段（hover 时减少） */}
        <g className="transition-transform duration-700 ease-spring origin-left">
          <rect
            x={runningX}
            y={WIN_Y + 2}
            width={WIN_X + WIN_W - runningX - 2}
            height={WIN_H - 4}
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.2"
            strokeDasharray="3 2.5"
            rx="2"
            className="transition-all duration-700 ease-spring group-hover:opacity-50"
          />
          <text
            x={runningX + (WIN_X + WIN_W - runningX) / 2 - 1}
            y={WIN_Y + WIN_H / 2 + 3}
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.2"
            fill="#241C15"
            opacity="0.55"
          >
            FREE
          </text>
        </g>

        {/* hover 出现：一段额外占用，仿佛新 token 进入 */}
        <rect
          x={runningX}
          y={WIN_Y + 2}
          width={(WIN_X + WIN_W - runningX - 2) * 0.55}
          height={WIN_H - 4}
          rx="2"
          fill="#7A28CB"
          opacity="0"
          className="transition-opacity duration-500 ease-spring group-hover:opacity-95"
        />
      </g>

      {/* ─── 排队中的 token 药丸（顶部） ─── */}
      <g
        transform="translate(160,46)"
        className="transition-transform duration-[1100ms] ease-spring group-hover:translate-x-[28px]"
        style={{ transformBox: "fill-box" }}
      >
        {[
          { x: -60, w: 14, fill: "#7A28CB" },
          { x: -42, w: 10, fill: "#F4D35E" },
          { x: -28, w: 18, fill: "#7A28CB" },
          { x: -6, w: 12, fill: "#E07A5F" },
          { x: 12, w: 16, fill: "#7A28CB" },
          { x: 32, w: 10, fill: "#1B4B5A" },
        ].map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={-4}
            width={p.w}
            height={8}
            rx="3"
            fill={p.fill}
            stroke="#241C15"
            strokeWidth="1.2"
          />
        ))}
        {/* 流入箭头 */}
        <g transform="translate(54,0)">
          <line x1="0" y1="0" x2="10" y2="0" stroke="#241C15" strokeWidth="1.5" />
          <path d="M 6 -3 L 11 0 L 6 3" fill="none" stroke="#241C15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ─── 底部标尺 ─── */}
      <g transform={`translate(${WIN_X},${WIN_Y + WIN_H + 8})`}>
        {/* 主线 */}
        <line x1="0" y1="0" x2={WIN_W} y2="0" stroke="#241C15" strokeWidth="1.5" />
        {/* tick */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
          <g key={i} transform={`translate(${p * WIN_W},0)`}>
            <line x1="0" y1="0" x2="0" y2="3.5" stroke="#241C15" strokeWidth="1.5" />
            <text
              x="0"
              y="13"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="7"
              fontWeight="700"
              fill="#241C15"
              opacity="0.7"
            >
              {p === 0 ? "0" : `${Math.round(p * 128)}K`}
            </text>
          </g>
        ))}
      </g>

      {/* ─── 右下角小标：用量 % ─── */}
      <g transform="translate(258,156)">
        <rect x="-22" y="-7" width="44" height="14" rx="3" fill="#241C15" />
        <text
          x="0"
          y="3.2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1"
          fill="#FBEFE3"
          className="transition-opacity duration-500 group-hover:opacity-100"
        >
          FILL · {usedPctTotal}%
        </text>
      </g>
    </CoverShell>
  );
};

export default ContextWindowCover;
