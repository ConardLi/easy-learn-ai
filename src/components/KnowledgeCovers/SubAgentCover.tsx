/**
 * SubAgent 封面
 *
 * 隐喻：主 Agent 把会污染主上下文的子任务外包给一个子 Agent，
 *      子 Agent 在独立空间（虚线框）里干活，只把一行摘要交回主 Agent。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左侧：主 Agent 大方块（coral） + 顶上标 MAIN
 *   - 中段：派出小箭头 + "DELEGATE" 标
 *   - 右侧：独立空间（虚线 rounded box），里面 SubAgent 小方块（butter）+ 一束噪声短条
 *   - 下方弧线箭头：从 SubAgent 回到主 Agent，箭头边上挂一张「摘要」小卡片
 *   - 装饰：左上 sparkle、右下小圆点
 *
 * hover：
 *   - SubAgent 小方块沿派出箭头方向再外滑一点
 *   - 摘要小卡片沿弧线方向回滑
 *   - 噪声短条幅度加大（被关在子空间里折腾）
 *   - sparkle 转角度
 *
 * 跟相邻 AgentCover (循环+工具触手) / AgentLoopCover (旋转环) /
 * AgentMemoryCover (三层档案柜抽屉) 都不同。
 */
import React from "react";
import CoverShell from "./CoverShell";

const SubAgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(34,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下小圆点阵 */}
      <g transform="translate(282,168)">
        {Array.from({ length: 6 }).map((_, i) => {
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

      {/* 顶部小标 MAIN CONVERSATION */}
      <g transform="translate(82,30)">
        <rect x="-44" y="-9" width="88" height="18" rx="9" fill="#241C15" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          MAIN AGENT
        </text>
      </g>

      {/* ─── 左：主 Agent 大方块 ─── */}
      <g transform="translate(82,108)">
        {/* 阴影 */}
        <rect
          x="-38"
          y="-36"
          width="76"
          height="72"
          rx="12"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* 主体 */}
        <rect
          x="-38"
          y="-36"
          width="76"
          height="72"
          rx="12"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* 眼睛 */}
        <circle cx="-12" cy="-12" r="3.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
        <circle cx="-12" cy="-12" r="1.6" fill="#241C15" />
        <circle cx="12" cy="-12" r="3.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
        <circle cx="12" cy="-12" r="1.6" fill="#241C15" />
        {/* 嘴 */}
        <path
          d="M -7 4 Q 0 9 7 4"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 底标 MAIN */}
        <text
          x="0"
          y="26"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          MAIN
        </text>
      </g>

      {/* ─── 派出箭头（左 → 右） ─── */}
      <g>
        <line
          x1="126"
          y1="100"
          x2="178"
          y2="92"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <path
          d="M 172 86 L 182 91 L 174 99"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* "DELEGATE" 标 */}
        <g transform="translate(152,78)">
          <rect x="-22" y="-7" width="44" height="13" rx="6.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.6"
            fill="#241C15"
          >
            DELEGATE
          </text>
        </g>
      </g>

      {/* ─── 右：独立空间虚线框 ─── */}
      <g transform="translate(238,98)">
        <rect
          x="-48"
          y="-44"
          width="96"
          height="98"
          rx="14"
          fill="none"
          stroke="#241C15"
          strokeWidth="1.6"
          strokeDasharray="5 4"
          opacity="0.55"
        />
        {/* 标签：独立空间 */}
        <g transform="translate(-22,-46)">
          <rect x="-22" y="-7" width="44" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.4" />
          <text
            x="0"
            y="2.5"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
          >
            ISOLATED
          </text>
        </g>

        {/* SubAgent 小方块（butter）—— hover 再外滑一点 */}
        <g className="transition-transform duration-500 ease-spring group-hover:translate-x-[4px] group-hover:-translate-y-[2px]">
          {/* 阴影 */}
          <rect
            x="-26"
            y="-30"
            width="52"
            height="48"
            rx="9"
            fill="#241C15"
            opacity="0.85"
            transform="translate(2.5,2.5)"
          />
          <rect
            x="-26"
            y="-30"
            width="52"
            height="48"
            rx="9"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="2.2"
          />
          {/* 小眼睛 */}
          <circle cx="-9" cy="-11" r="2.8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.3" />
          <circle cx="-9" cy="-11" r="1.2" fill="#241C15" />
          <circle cx="9" cy="-11" r="2.8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.3" />
          <circle cx="9" cy="-11" r="1.2" fill="#241C15" />
          {/* 小嘴 */}
          <path
            d="M -5 1 Q 0 4 5 1"
            fill="none"
            stroke="#241C15"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* SUB 标 */}
          <text
            x="0"
            y="13"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#241C15"
          >
            SUB
          </text>
        </g>

        {/* 子 Agent 下方的噪声短条 —— hover 时拉长（在独立空间里折腾） */}
        <g transform="translate(0,28)">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={-24}
              y={i * 4}
              height="2"
              rx="1"
              fill="#241C15"
              opacity={0.35 - i * 0.05}
              className="transition-all duration-500 ease-spring"
              style={{
                width: `${30 - i * 6}px`,
              }}
            />
          ))}
        </g>
      </g>

      {/* ─── 摘要回流：从子 Agent 弧线回主 Agent ─── */}
      <g>
        <path
          d="M 220 150 Q 160 188 100 156"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        {/* 箭头头朝主 Agent */}
        <path
          d="M 108 148 L 96 156 L 106 164"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 摘要小卡片 —— hover 时沿弧线方向回滑（向左） */}
        <g
          transform="translate(180,178)"
          className="transition-transform duration-500 ease-spring group-hover:-translate-x-[12px]"
        >
          {/* 阴影 */}
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="4"
            fill="#241C15"
            opacity="0.85"
            transform="translate(2,2)"
          />
          {/* 主体 */}
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="4"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <text
            x="-20"
            y="-1"
            fontFamily="Geist Mono, monospace"
            fontSize="6"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            SUMMARY
          </text>
          <line x1="-20" y1="3" x2="20" y2="3" stroke="#241C15" strokeWidth="1" opacity="0.45" />
          <line x1="-20" y1="6" x2="12" y2="6" stroke="#241C15" strokeWidth="1" opacity="0.45" />
        </g>
      </g>
    </CoverShell>
  );
};

export default SubAgentCover;
