/**
 * Agent Loop 封面
 *
 * 隐喻：五阶段循环本身 —— Perceive · Reason · Plan · Act · Observe 沿环排列，
 *      箭头串成闭环。视觉重点在「Loop」，跟 AgentCover（强调 Agent 小角色 + 工具）拉开区分。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央：cream 圆 + Geist Mono "LOOP" 大字
 *   - 围绕中央：5 个不同色阶段节点（butter/coral/teal/pop/ink）
 *   - 节点之间用箭头串成闭环（顺时针）
 *   - 装饰：左上 small sparkle、右下 small arrow
 *
 * hover：整个环慢速顺时针旋转；中央 LOOP 字微缩放；当前 active 节点跳一下。
 */
import React from "react";
import CoverShell from "./CoverShell";

const STAGES = [
  { label: "感知", color: "#F4D35E", textOnFill: "#241C15" },
  { label: "推理", color: "#E07A5F", textOnFill: "#FBEFE3" },
  { label: "规划", color: "#1B4B5A", textOnFill: "#FBEFE3" },
  { label: "行动", color: "#FF4D74", textOnFill: "#FBEFE3" },
  { label: "观察", color: "#241C15", textOnFill: "#FBEFE3" },
];

const CENTER_X = 160;
const CENTER_Y = 100;
const ORBIT_RX = 110;
const ORBIT_RY = 66;
const NODE_R = 18;

const AgentLoopCover: React.FC = () => {
  const stageCount = STAGES.length;

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上小齿轮 sparkle */}
      <g transform="translate(34,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-90">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下小箭头 + 数字 */}
      <g transform="translate(280,172)">
        <circle
          cx="0"
          cy="0"
          r="11"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="3.2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#241C15"
        >
          ∞
        </text>
      </g>

      {/* ─── 主体：旋转的环 ─── */}
      <g
        transform={`translate(${CENTER_X},${CENTER_Y})`}
        className="transition-transform duration-[2200ms] ease-linear group-hover:rotate-[60deg]"
        style={{ transformOrigin: "0px 0px", transformBox: "fill-box" }}
      >
        {/* 椭圆轨道（虚线） */}
        <ellipse
          cx="0"
          cy="0"
          rx={ORBIT_RX}
          ry={ORBIT_RY}
          fill="none"
          stroke="#241C15"
          strokeWidth="1.8"
          strokeDasharray="4 5"
          opacity="0.45"
        />

        {/* 5 个阶段节点 */}
        {STAGES.map((stage, i) => {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / stageCount; // 从顶上开始
          const x = Math.cos(angle) * ORBIT_RX;
          const y = Math.sin(angle) * ORBIT_RY;
          const nextAngle =
            -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / stageCount;
          // 节点之间的连接箭头 —— 在两节点中间画一个小三角，方向顺时针
          const midAngle = (angle + nextAngle) / 2;
          const mx = Math.cos(midAngle) * ORBIT_RX;
          const my = Math.sin(midAngle) * ORBIT_RY;
          const tangentDeg = (midAngle * 180) / Math.PI + 90;

          return (
            <g key={stage.label}>
              {/* 顺时针箭头标 */}
              <g transform={`translate(${mx},${my}) rotate(${tangentDeg})`}>
                <path
                  d="M -3.5 -3 L 4 0 L -3.5 3 Z"
                  fill="#241C15"
                  opacity="0.55"
                />
              </g>

              {/* 阶段节点圆 */}
              <g
                transform={`translate(${x},${y})`}
                className="origin-center transition-transform duration-500 ease-spring group-hover:scale-110"
                style={{
                  transformBox: "fill-box",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                {/* 阴影 */}
                <circle
                  cx="2"
                  cy="2"
                  r={NODE_R}
                  fill="#241C15"
                  opacity="0.85"
                />
                {/* 实体 */}
                <circle
                  cx="0"
                  cy="0"
                  r={NODE_R}
                  fill={stage.color}
                  stroke="#241C15"
                  strokeWidth="2"
                />
                {/* 阶段中文标 */}
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontFamily='"Plus Jakarta Sans", "Noto Sans SC", sans-serif'
                  fontSize="9.5"
                  fontWeight="800"
                  fill={stage.textOnFill}
                >
                  {stage.label}
                </text>
                {/* 编号小角标 */}
                <g transform={`translate(${NODE_R - 3},${-NODE_R + 4})`}>
                  <circle
                    cx="0"
                    cy="0"
                    r="6"
                    fill="#FBEFE3"
                    stroke="#241C15"
                    strokeWidth="1.4"
                  />
                  <text
                    x="0"
                    y="2.5"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="7"
                    fontWeight="700"
                    fill="#241C15"
                  >
                    {i + 1}
                  </text>
                </g>
              </g>
            </g>
          );
        })}
      </g>

      {/* ─── 中央 LOOP 文字 ─── */}
      <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
        <g
          className="origin-center transition-transform duration-400 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* 底圆阴影 */}
          <circle
            cx="3"
            cy="3"
            r="32"
            fill="#241C15"
            opacity="0.85"
          />
          {/* 主圆 */}
          <circle
            cx="0"
            cy="0"
            r="32"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          {/* LOOP 文字 */}
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="14"
            fontWeight="800"
            letterSpacing="1.5"
            fill="#241C15"
          >
            LOOP
          </text>
          {/* 下方小说明 */}
          <text
            x="0"
            y="11"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fontWeight="600"
            letterSpacing="2.2"
            fill="#88837C"
          >
            5 PHASES
          </text>

          {/* 中心点的循环弧（小圆下方的循环 hint） */}
          <path
            d="M -12 16 Q 0 22 12 16"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 12 16 L 9 13 M 12 16 L 15 13"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>
    </CoverShell>
  );
};

export default AgentLoopCover;
