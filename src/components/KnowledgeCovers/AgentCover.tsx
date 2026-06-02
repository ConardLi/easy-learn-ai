/**
 * Agent 封面
 *
 * 隐喻：Agent = 一个会思考、会动手、会观察的小脑 + 循环 + 工具触手。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央：coral 圆角矩形小角色（写「AGT」），有眼睛和小天线
 *   - 周围：虚线椭圆轨道（dashed circle）表示 Think→Act→Observe 循环
 *   - 轨道上挂 3 个工具节点（齿轮 / 闪电 / 数据库）
 *   - 三个动作标签 THINK / ACT / OBSERVE 排在三角
 *   - 装饰：左上 sparkle、右下小圆点
 *
 * hover 行为：循环轨道顺时针轻微转动；中央角色轻轻点头；工具节点做错峰浮动。
 */
import React from "react";
import CoverShell from "./CoverShell";

const AgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(36,32)">
        <g className="origin-center rotate-[20deg] transition-transform duration-700 group-hover:rotate-[110deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下 ring */}
      <g transform="translate(290,170)">
        <circle cx="0" cy="0" r="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* 外圈虚线循环轨道（椭圆）—— 静态，不再整体旋转，避免虚线重栅格化卡顿 */}
      <g transform="translate(160,100)">
        <g>
          <ellipse
            cx="0"
            cy="0"
            rx="115"
            ry="68"
            fill="none"
            stroke="#241C15"
            strokeWidth="2"
            strokeDasharray="5 6"
            opacity="0.55"
          />
          {/* 轨道上 3 个箭头点（循环方向暗示） */}
          {[0, 120, 240].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = Math.cos(rad) * 115;
            const y = Math.sin(rad) * 68;
            return (
              <g key={deg} transform={`translate(${x},${y}) rotate(${deg + 90})`}>
                <path d="M -4 -3 L 4 0 L -4 3 Z" fill="#241C15" />
              </g>
            );
          })}
        </g>
      </g>

      {/* 三个工具节点（在虚线圆上的方位） */}
      {/* 工具 1：齿轮（左上） */}
      <ToolNode x={62} y={62} label="工具" color="#F4D35E" hoverClassName="group-hover:-translate-y-1">
        <Gear />
      </ToolNode>
      {/* 工具 2：闪电（右上） */}
      <ToolNode x={258} y={62} label="行动" color="#1B4B5A" hoverClassName="group-hover:translate-y-1">
        <Bolt />
      </ToolNode>
      {/* 工具 3：眼睛（正下） */}
      <ToolNode x={160} y={180} label="观察" color="#FBEFE3" hoverClassName="group-hover:-translate-y-1">
        <Eye />
      </ToolNode>

      {/* 中央：Agent 小角色 */}
      <g transform="translate(160,100)">
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:-rotate-3 group-hover:scale-[1.03]"
          style={{ transformBox: "fill-box" }}
        >
          {/* 阴影底 */}
          <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#241C15" transform="translate(3,3)" opacity="0.85" />
          {/* 主体 */}
          <rect x="-30" y="-26" width="60" height="52" rx="12" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
          {/* 天线 */}
          <line x1="0" y1="-26" x2="0" y2="-36" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="0" cy="-38" r="3.5" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
          {/* 眼睛 */}
          <circle cx="-9" cy="-8" r="3.2" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <circle cx="-9" cy="-8" r="1.4" fill="#241C15" />
          <circle cx="9" cy="-8" r="3.2" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.5" />
          <circle cx="9" cy="-8" r="1.4" fill="#241C15" />
          {/* 嘴 */}
          <path d="M -6 6 Q 0 11 6 6" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
          {/* 底标 AGT */}
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fontWeight="700"
            letterSpacing="1.5"
            fill="#FBEFE3"
          >
            AGENT
          </text>
        </g>
      </g>
    </CoverShell>
  );
};

/* ----- 工具节点 ----- */

const ToolNode: React.FC<{
  x: number;
  y: number;
  label: string;
  color: string;
  hoverClassName?: string;
  children: React.ReactNode;
}> = ({ x, y, label, color, hoverClassName = "", children }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hoverClassName}`}>
      <circle cx="0" cy="0" r="16" fill={color} stroke="#241C15" strokeWidth="2.5" />
      {children}
      <g transform="translate(0,28)">
        <rect
          x="-18"
          y="-7"
          width="36"
          height="14"
          rx="7"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
          fontSize="9"
          fontWeight="700"
          fill="#FBEFE3"
        >
          {label}
        </text>
      </g>
    </g>
  </g>
);

/* ----- 工具图标 ----- */

const Gear: React.FC = () => (
  <g>
    {/* 8 颗齿 */}
    {Array.from({ length: 8 }).map((_, i) => {
      const deg = i * 45;
      const rad = (deg * Math.PI) / 180;
      const x1 = Math.cos(rad) * 7;
      const y1 = Math.sin(rad) * 7;
      const x2 = Math.cos(rad) * 11;
      const y2 = Math.sin(rad) * 11;
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />;
    })}
    <circle cx="0" cy="0" r="5" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
    <circle cx="0" cy="0" r="1.5" fill="#241C15" />
  </g>
);

const Bolt: React.FC = () => (
  <path
    d="M 1 -8 L -5 1 L 0 1 L -1 8 L 5 -1 L 0 -1 Z"
    fill="#F4D35E"
    stroke="#241C15"
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
);

const Eye: React.FC = () => (
  <g>
    <path d="M -8 0 Q 0 -6 8 0 Q 0 6 -8 0 Z" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
    <circle cx="0" cy="0" r="3" fill="#241C15" />
    <circle cx="1" cy="-1" r="0.9" fill="#FBEFE3" />
  </g>
);

export default AgentCover;
