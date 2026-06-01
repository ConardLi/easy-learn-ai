/**
 * Agent Sandbox 封面
 *
 * 隐喻：围栏（方形虚线 + 角部 ✕ 防护标）里一个 Agent 小角色，
 *      围栏外有 3 个攻击箭头试图穿入，箭头头部都被弹回（变成 ✕）。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央偏左：butter 填底的方形围栏（虚线边）+ 4 角的 ✕ 防护标
 *   - 围栏中心：Agent 小角色（teal 主体 + cream 眼睛）
 *   - 围栏外 3 个角度：cmd 标签 + 入向箭头 + 弹回 ✕ 标
 *   - 装饰：左上 sparkle、右下 SHIELD 圆标
 *
 * 跟相邻 Agent 系列拉开：
 *   - AgentCover：圆轨道 + 工具触手
 *   - AgentLoopCover：椭圆 + 5 阶段节点
 *   - AgentMemoryCover：抽屉柜
 *   - 这里：方形围栏 + 弹回箭头，整体偏「边界 + 阻挡」语义
 *
 * hover：4 角 ✕ 防护标顺时针轻转；围栏内 Agent 微缩放；外部箭头小幅前后晃。
 */
import React from "react";
import CoverShell from "./CoverShell";

const ATTACKS = [
  { angle: -135, label: "rm -rf" },
  { angle: -45, label: "curl evil" },
  { angle: 135, label: "cat .ssh" },
];

const CENTER_X = 160;
const CENTER_Y = 102;
const FENCE_W = 158;
const FENCE_H = 110;
const FENCE_RX = 14;

const AgentSandboxCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 装饰：左上 sparkle */}
      <g transform="translate(34,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[120deg]">
          <path
            d="M 0 -7 L 1.2 -1.2 L 7 0 L 1.2 1.2 L 0 7 L -1.2 1.2 L -7 0 L -1.2 -1.2 Z"
            fill="#F4D35E"
            stroke="#241C15"
            strokeWidth="1.2"
          />
        </g>
      </g>

      {/* 装饰：右下 SHIELD 小圆标 */}
      <g transform="translate(286,172)">
        <g
          className="origin-center transition-transform duration-[1200ms] ease-spring group-hover:rotate-[-30deg]"
          style={{ transformBox: "fill-box" }}
        >
          <circle cx="0" cy="0" r="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
          {/* shield shape */}
          <path
            d="M 0 -7 L 5 -5 L 5 1 Q 5 5 0 7 Q -5 5 -5 1 L -5 -5 Z"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <path d="M -2.5 -0.5 L -0.5 2 L 3 -2.5" stroke="#241C15" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* ─── 外部攻击箭头（先画，让围栏盖在上面） ─── */}
      {ATTACKS.map((a, i) => {
        const rad = (a.angle * Math.PI) / 180;
        // 箭头起点（围栏外远处）+ 终点（围栏边缘上的弹回点）
        const startR = 110;
        const endR = 78;
        const sx = CENTER_X + Math.cos(rad) * startR;
        const sy = CENTER_Y + Math.sin(rad) * startR;
        const ex = CENTER_X + Math.cos(rad) * endR;
        const ey = CENTER_Y + Math.sin(rad) * endR;
        const labelR = 124;
        const lx = CENTER_X + Math.cos(rad) * labelR;
        const ly = CENTER_Y + Math.sin(rad) * labelR;
        return (
          <g key={i}>
            {/* cmd 标签 */}
            <g transform={`translate(${lx},${ly})`}>
              <rect
                x="-20"
                y="-7"
                width="40"
                height="14"
                rx="3"
                fill="#FBEFE3"
                stroke="#241C15"
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="7"
                fontWeight="700"
                fill="#241C15"
              >
                {a.label}
              </text>
            </g>

            {/* 入向虚线箭头 + 微晃 */}
            <g
              className="transition-transform duration-500 ease-spring group-hover:scale-95"
              style={{ transformOrigin: `${sx}px ${sy}px`, transformBox: "fill-box" }}
            >
              <line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="#E07A5F"
                strokeWidth="1.8"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />
              <g transform={`translate(${ex},${ey}) rotate(${a.angle + 180})`}>
                <path d="M -4 -3 L 0 0 L -4 3 Z" fill="#E07A5F" />
              </g>
            </g>

            {/* 弹回 ✕ 标 */}
            <g transform={`translate(${ex},${ey})`}>
              <circle cx="0" cy="0" r="6" fill="#FBEFE3" stroke="#E07A5F" strokeWidth="1.6" />
              <path
                d="M -2.5 -2.5 L 2.5 2.5 M 2.5 -2.5 L -2.5 2.5"
                stroke="#E07A5F"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </g>
          </g>
        );
      })}

      {/* ─── 围栏阴影 ─── */}
      <rect
        x={CENTER_X - FENCE_W / 2 + 3}
        y={CENTER_Y - FENCE_H / 2 + 3}
        width={FENCE_W}
        height={FENCE_H}
        rx={FENCE_RX}
        fill="#241C15"
        opacity="0.85"
      />
      {/* 围栏主体（虚线边） */}
      <rect
        x={CENTER_X - FENCE_W / 2}
        y={CENTER_Y - FENCE_H / 2}
        width={FENCE_W}
        height={FENCE_H}
        rx={FENCE_RX}
        fill="#FBE891"
        fillOpacity="0.65"
        stroke="#241C15"
        strokeWidth="2.5"
        strokeDasharray="6 4"
      />

      {/* SANDBOX 顶部小标 */}
      <g transform={`translate(${CENTER_X},${CENTER_Y - FENCE_H / 2 - 8})`}>
        <rect x="-32" y="-8" width="64" height="14" rx="3" fill="#241C15" />
        <text
          x="0"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fontWeight="800"
          letterSpacing="1.6"
          fill="#FBEFE3"
        >
          SANDBOX
        </text>
      </g>

      {/* 围栏 4 角 ✕ 防护标，hover 顺时针转 */}
      {[
        { x: CENTER_X - FENCE_W / 2, y: CENTER_Y - FENCE_H / 2 },
        { x: CENTER_X + FENCE_W / 2, y: CENTER_Y - FENCE_H / 2 },
        { x: CENTER_X - FENCE_W / 2, y: CENTER_Y + FENCE_H / 2 },
        { x: CENTER_X + FENCE_W / 2, y: CENTER_Y + FENCE_H / 2 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x},${c.y})`}>
          <g
            className="origin-center transition-transform duration-600 ease-spring group-hover:rotate-[90deg]"
            style={{ transformBox: "fill-box" }}
          >
            <circle cx="0" cy="0" r="8" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
            <path
              d="M -3.5 -3.5 L 3.5 3.5 M 3.5 -3.5 L -3.5 3.5"
              stroke="#241C15"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </g>
        </g>
      ))}

      {/* ─── 中央：Agent 小角色 ─── */}
      <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
        <g
          className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105"
          style={{ transformBox: "fill-box" }}
        >
          {/* 阴影 */}
          <rect x="-22" y="-18" width="44" height="36" rx="9" fill="#241C15" opacity="0.85" transform="translate(2,2)" />
          {/* 主体 */}
          <rect x="-22" y="-18" width="44" height="36" rx="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
          {/* 天线 */}
          <line x1="0" y1="-18" x2="0" y2="-26" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
          <circle cx="0" cy="-28" r="2.6" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
          {/* 眼睛 */}
          <circle cx="-7" cy="-5" r="2.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.2" />
          <circle cx="-7" cy="-5" r="1.1" fill="#241C15" />
          <circle cx="7" cy="-5" r="2.6" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.2" />
          <circle cx="7" cy="-5" r="1.1" fill="#241C15" />
          {/* 微笑（在围栏里活得很开心） */}
          <path d="M -5 5 Q 0 9 5 5" fill="none" stroke="#FBEFE3" strokeWidth="1.6" strokeLinecap="round" />
          {/* AGENT 底标 */}
          <text
            x="0"
            y="15"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fontWeight="800"
            letterSpacing="1.4"
            fill="#FBEFE3"
            opacity="0.85"
          >
            AGENT
          </text>
        </g>
      </g>

      {/* 底部 OS 强制小标 */}
      <g transform="translate(160,180)">
        <rect x="-46" y="-8" width="92" height="14" rx="7" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
        <text
          x="0"
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          fill="#241C15"
        >
          ENFORCED BY OS
        </text>
      </g>
    </CoverShell>
  );
};

export default AgentSandboxCover;
