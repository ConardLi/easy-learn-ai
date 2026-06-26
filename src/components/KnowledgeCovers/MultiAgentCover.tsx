/**
 * Multi Agent 封面
 *
 * 隐喻：一个总任务（顶部）分给几个各管一摊的小角色，它们连成一张协作网，再把结果汇拢。
 * 视觉构图（viewBox 320×200）：
 *   - 顶部中央：teal 主管方块（写「主管」）
 *   - 下方一排三个 worker 圆节点（coral / butter / pop），用连线挂到主管
 *   - hover：worker 节点错峰轻浮，连线虚线流动感（靠 group-hover 位移）
 */
import React from "react";
import CoverShell from "./CoverShell";

const MultiAgentCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* 连线 */}
      <g stroke="#241C15" strokeWidth="2" opacity="0.55">
        <line x1="160" y1="70" x2="80" y2="135" strokeDasharray="4 5" />
        <line x1="160" y1="70" x2="160" y2="135" strokeDasharray="4 5" />
        <line x1="160" y1="70" x2="240" y2="135" strokeDasharray="4 5" />
      </g>

      {/* 顶部主管方块 */}
      <g transform="translate(160,52)">
        <g className="origin-center transition-transform duration-400 ease-spring group-hover:-rotate-2">
          <rect x="-38" y="-22" width="76" height="44" rx="11" fill="#241C15" transform="translate(3,3)" opacity="0.85" />
          <rect x="-38" y="-22" width="76" height="44" rx="11" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
          <text x="0" y="6" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="15" fontWeight="800" fill="#FBEFE3">
            主管
          </text>
        </g>
      </g>

      {/* 三个 worker 节点 */}
      <Worker x={80} y={150} fill="#E07A5F" label="执行" hover="group-hover:-translate-y-1.5" textFill="#FBEFE3" />
      <Worker x={160} y={150} fill="#F4D35E" label="审查" hover="group-hover:translate-y-1.5" textFill="#241C15" />
      <Worker x={240} y={150} fill="#FF4D74" label="总结" hover="group-hover:-translate-y-1.5" textFill="#FBEFE3" />

      {/* 装饰：左上 sparkle */}
      <g transform="translate(34,30)">
        <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#F4D35E" stroke="#241C15" strokeWidth="1.2" />
      </g>
    </CoverShell>
  );
};

const Worker: React.FC<{
  x: number;
  y: number;
  fill: string;
  label: string;
  hover: string;
  textFill: string;
}> = ({ x, y, fill, label, hover, textFill }) => (
  <g transform={`translate(${x},${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hover}`}>
      <circle cx="0" cy="0" r="22" fill="#241C15" transform="translate(2,2)" opacity="0.8" />
      <circle cx="0" cy="0" r="22" fill={fill} stroke="#241C15" strokeWidth="2.5" />
      <text x="0" y="5" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="12" fontWeight="700" fill={textFill}>
        {label}
      </text>
    </g>
  </g>
);

export default MultiAgentCover;
