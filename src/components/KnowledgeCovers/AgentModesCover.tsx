/**
 * Agent Modes 封面
 *
 * 隐喻：三档运行模式 = 一个变速杆 + 三盏信号灯
 *   - 左侧立面：三色信号灯柱（butter PLAN / coral DEFAULT / teal AUTO）
 *   - 右侧：底座 + 杆，杆顶旋钮写 MODE，停在中间档（DEFAULT）
 *   - 底座下三档刻度（PLAN / DEFAULT / AUTO）
 *
 * 跟相邻封面拉开：
 *   - AgentCover：中央小角色 + 工具轨道（圆形）
 *   - AgentLoopCover：5 节点循环（圆轨）
 *   - AgentMemoryCover：三层档案柜（纵向抽屉）
 *   - AgentModesCover：左信号柱 + 右变速杆（横向工业感）
 *
 * hover：
 *   - 杆从 DEFAULT 切到 AUTO（向右倾斜 + 平移）
 *   - 三盏灯依次错峰高亮（用 transitionDelay 模拟）
 *   - 旋钮颜色由 coral → teal（跟随档位语义）
 */
import React from "react";
import CoverShell from "./CoverShell";

const AgentModesCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上小 sparkle */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -6 L 1.1 -1.1 L 6 0 L 1.1 1.1 L 0 6 L -1.1 1.1 L -6 0 L -1.1 -1.1 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下小图章 "3" */}
      <g transform="translate(286,170)">
        <circle
          cx="0"
          cy="0"
          r="12"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="12"
          fontWeight="800"
          fill="#241C15"
        >
          3
        </text>
      </g>

      {/* ─── 左侧：信号灯柱 ─── */}
      <g transform="translate(64,100)">
        {/* 阴影底 */}
        <rect
          x="-22"
          y="-58"
          width="44"
          height="120"
          rx="10"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* 柱体 */}
        <rect
          x="-22"
          y="-58"
          width="44"
          height="120"
          rx="10"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* 顶帽 */}
        <rect
          x="-26"
          y="-66"
          width="52"
          height="10"
          rx="3"
          fill="#241C15"
        />
        {/* 灯 1 PLAN（butter） */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 0.5, transitionDelay: "0ms" }}
        >
          <circle cx="0" cy="-36" r="13" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
          {/* 高光 */}
          <circle cx="-4" cy="-40" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>
        {/* 灯 2 DEFAULT（coral） · 默认亮 */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 1, transitionDelay: "120ms" }}
        >
          <circle cx="0" cy="0" r="13" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
          <circle cx="-4" cy="-4" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>
        {/* 灯 3 AUTO（teal） */}
        <g
          className="transition-opacity duration-300 ease-spring group-hover:opacity-100"
          style={{ opacity: 0.5, transitionDelay: "240ms" }}
        >
          <circle cx="0" cy="36" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
          <circle cx="-4" cy="32" r="3" fill="#FBEFE3" opacity="0.85" />
        </g>

        {/* 立柱小铭牌 */}
        <g transform="translate(0,72)">
          <rect
            x="-22"
            y="-1"
            width="44"
            height="14"
            rx="3"
            fill="#241C15"
          />
          <text
            x="0"
            y="9"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="1.6"
            fill="#FBEFE3"
          >
            MODES
          </text>
        </g>
      </g>

      {/* ─── 中线分隔小点 ─── */}
      <g transform="translate(126,100)">
        {[-30, 0, 30].map((dy) => (
          <circle key={dy} cx="0" cy={dy} r="1.6" fill="#241C15" opacity="0.4" />
        ))}
      </g>

      {/* ─── 右侧：变速杆 ─── */}
      <g transform="translate(220,100)">
        {/* 底座阴影 */}
        <rect
          x="-58"
          y="32"
          width="116"
          height="26"
          rx="8"
          fill="#241C15"
          opacity="0.85"
          transform="translate(3,3)"
        />
        {/* 底座 */}
        <rect
          x="-58"
          y="32"
          width="116"
          height="26"
          rx="8"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        {/* 三档刻度槽 */}
        <line
          x1="-44"
          y1="45"
          x2="44"
          y2="45"
          stroke="#241C15"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          opacity="0.55"
        />
        {/* 档位定位点 */}
        {[-40, 0, 40].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy="45"
            r="3.5"
            fill="#241C15"
            opacity="0.7"
          />
        ))}

        {/* 档位标签条 */}
        <g transform="translate(0,72)">
          <text
            x="-40"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            PLAN
          </text>
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#241C15"
          >
            DEFAULT
          </text>
          <text
            x="40"
            y="0"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="1.4"
            fill="#241C15"
            opacity="0.7"
          >
            AUTO
          </text>
        </g>

        {/* 杆（默认 DEFAULT 位置 cx=0, hover 切到 AUTO cx=40） */}
        <g
          className="transition-transform duration-500 ease-spring group-hover:translate-x-[40px] group-hover:-rotate-[8deg]"
          style={{ transformOrigin: "0px 45px", transformBox: "fill-box" }}
        >
          {/* 杆身 */}
          <line
            x1="0"
            y1="45"
            x2="0"
            y2="-22"
            stroke="#241C15"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* 旋钮阴影 */}
          <circle cx="0" cy="-30" r="20" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
          {/* 旋钮：默认 coral（DEFAULT），hover 切 teal（AUTO） */}
          <circle
            cx="0"
            cy="-30"
            r="20"
            className="fill-coral transition-colors duration-500 ease-spring group-hover:fill-teal"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          {/* 旋钮上面的 MODE 字 */}
          <text
            x="0"
            y="-26"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="9"
            fontWeight="800"
            letterSpacing="1.2"
            fill="#FBEFE3"
          >
            MODE
          </text>
          {/* 旋钮上的小档指示线 */}
          <line
            x1="0"
            y1="-50"
            x2="0"
            y2="-44"
            stroke="#FBEFE3"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      </g>
    </CoverShell>
  );
};

export default AgentModesCover;
