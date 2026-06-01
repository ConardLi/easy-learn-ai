/**
 * Agent Memory 封面
 *
 * 隐喻：长期记忆 = 一个三层档案柜（情景 / 语义 / 程序）；
 *      context window 是临时的"工作台"，要用就从抽屉里取一张卡片往上送。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 顶部小条：context window（临时 · 虚线边）
 *   - 中央：三层档案柜 抽屉 (butter / coral / teal)
 *   - 抽屉之间有"取出"箭头 上行
 *   - 装饰：左上 sparkle、右下 ∞ 标
 *
 * hover：三个抽屉错峰滑出一点；中间抽屉的卡片向上滑入 context；右下 ∞ 旋转。
 */
import React from "react";
import CoverShell from "./CoverShell";

const DRAWERS = [
  { label: "情景", en: "EPISODIC", color: "#F4D35E", textOn: "#241C15" },
  { label: "语义", en: "SEMANTIC", color: "#E07A5F", textOn: "#FBEFE3" },
  { label: "程序", en: "PROCEDURAL", color: "#1B4B5A", textOn: "#FBEFE3" },
];

const CABINET_X = 130;
const CABINET_Y = 78;
const CABINET_W = 130;
const DRAWER_H = 28;
const DRAWER_GAP = 4;

const AgentMemoryCover: React.FC = () => {
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

      {/* 装饰：右下 ∞ */}
      <g transform="translate(282,172)">
        <g className="origin-center transition-transform duration-[1400ms] ease-linear group-hover:rotate-[180deg]" style={{ transformBox: "fill-box" }}>
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
      <g transform="translate(28,150)">
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

      {/* ─── 顶部：CONTEXT WINDOW（临时工作台） ─── */}
      <g transform="translate(160,40)">
        {/* 阴影 */}
        <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#241C15" opacity="0.85" transform="translate(2,2)" />
        {/* 主体 · 虚线边表示"临时" */}
        <rect
          x="-65"
          y="-12"
          width="130"
          height="24"
          rx="6"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <text
          x="-58"
          y="3.5"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#241C15"
        >
          CONTEXT WINDOW
        </text>
        {/* 右侧小占用条 */}
        <rect x="20" y="-4" width="40" height="8" rx="4" fill="#241C15" opacity="0.1" />
        <rect
          x="20"
          y="-4"
          width="22"
          height="8"
          rx="4"
          fill="#FF4D74"
          className="transition-all duration-700 ease-spring group-hover:[width:34]"
        />
      </g>

      {/* ─── 取出箭头：从中间抽屉上行到 context ─── */}
      <g transform="translate(160,60)">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="14"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="3 3"
          opacity="0.65"
        />
        <path
          d="M -4 2 L 0 -3 L 4 2"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* ─── 中央：三层档案柜 ─── */}
      <g transform={`translate(${CABINET_X},${CABINET_Y})`}>
        {/* 柜体外阴影 */}
        <rect
          x="-3"
          y="-3"
          width={CABINET_W + 6}
          height={DRAWERS.length * (DRAWER_H + DRAWER_GAP) + 12}
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* 柜体底 */}
        <rect
          x="-3"
          y="-3"
          width={CABINET_W + 6}
          height={DRAWERS.length * (DRAWER_H + DRAWER_GAP) + 12}
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />

        {/* 三层抽屉 */}
        {DRAWERS.map((d, i) => (
          <g
            key={d.en}
            className="origin-left transition-transform duration-500 ease-spring"
            style={{
              transform: "translateX(0)",
              transitionDelay: `${i * 90}ms`,
              transformBox: "fill-box",
            }}
          >
            <g
              className={
                i === 0
                  ? "transition-transform duration-500 ease-spring group-hover:translate-x-[6px]"
                  : i === 1
                  ? "transition-transform duration-500 ease-spring group-hover:translate-x-[10px]"
                  : "transition-transform duration-500 ease-spring group-hover:translate-x-[4px]"
              }
            >
              <rect
                x="0"
                y={i * (DRAWER_H + DRAWER_GAP) + 4}
                width={CABINET_W}
                height={DRAWER_H}
                rx="5"
                fill={d.color}
                stroke="#241C15"
                strokeWidth="2"
              />
              {/* 抽屉拉手 */}
              <circle
                cx={CABINET_W - 12}
                cy={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2}
                r="3"
                fill="#241C15"
              />
              {/* 抽屉标签 */}
              <text
                x="14"
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2.5}
                fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                fontSize="13"
                fontWeight="800"
                fill={d.textOn}
              >
                {d.label}
              </text>
              {/* 英文小标 */}
              <text
                x="44"
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2}
                fontFamily="Geist Mono, monospace"
                fontSize="7.5"
                fontWeight="700"
                letterSpacing="1.5"
                fill={d.textOn}
                opacity="0.85"
              >
                {d.en}
              </text>
              {/* 编号 */}
              <text
                x={CABINET_W - 26}
                y={i * (DRAWER_H + DRAWER_GAP) + 4 + DRAWER_H / 2 + 2}
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill={d.textOn}
                opacity="0.7"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          </g>
        ))}

        {/* 顶部小标签：MEMORY */}
        <g transform="translate(0,-6)">
          <rect
            x="-2"
            y="-12"
            width="56"
            height="14"
            rx="3"
            fill="#241C15"
          />
          <text
            x="26"
            y="-2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fontWeight="800"
            letterSpacing="1.8"
            fill="#FBEFE3"
          >
            MEMORY
          </text>
        </g>
      </g>

      {/* 一张飞向 context 的小卡片（hover 时上移） */}
      <g
        transform="translate(160,80)"
        className="transition-all duration-600 ease-spring opacity-0 group-hover:opacity-100 group-hover:-translate-y-[26px]"
      >
        <rect
          x="-14"
          y="-7"
          width="28"
          height="14"
          rx="3"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <line x1="-9" y1="-2" x2="9" y2="-2" stroke="#241C15" strokeWidth="1" opacity="0.6" />
        <line x1="-9" y1="2" x2="6" y2="2" stroke="#241C15" strokeWidth="1" opacity="0.6" />
      </g>
    </CoverShell>
  );
};

export default AgentMemoryCover;
