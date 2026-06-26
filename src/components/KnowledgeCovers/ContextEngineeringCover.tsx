/**
 * Context Engineering 封面
 *
 * 隐喻：模型每次干活只能看一只「有限的窗口托盘」。一堆候选信息卡排在左边，
 *       有人挑出几张高信号的放进托盘，其余的被筛掉。讲的就是「挑哪些放进去」。
 * 视觉构图（viewBox 320×200）：
 *   - 左侧：一摞候选信息卡（灰白小条），其中两张被挑中往右走
 *   - 右侧：teal 描边的窗口托盘，里面整齐放着 3 张被选中的彩色卡
 *   - 中间：挑选箭头 + 一个被筛掉打叉的卡
 *   - hover：被选中的卡轻轻浮入托盘，sparkle 旋转
 *
 * 跟 ContextWindowCover（横向窗 + token 药丸流入）刻意拉开：
 *   - 这张强调「挑选」动作（候选堆 → 筛 → 托盘），那张强调「窗口被填满」
 *   - 主色 coral 暖底，那张 butter
 */
import React from "react";
import CoverShell from "./CoverShell";

const ContextEngineeringCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral/10" dotOpacity={0.08}>
      {/* 左侧候选信息卡堆 */}
      <g transform="translate(26,58)">
        <text x="0" y="-8" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          CANDIDATES
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(${i * 3},${i * 17})`}>
            <rect x="0" y="0" width="66" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" />
            <rect x="5" y="5" width={40 - i * 5} height="3" rx="1.5" fill="#241C15" opacity="0.35" />
          </g>
        ))}
      </g>

      {/* 挑选箭头 */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M 104 78 Q 134 70 162 70" strokeDasharray="4 4" />
        <path d="M 156 66 L 164 70 L 156 74" strokeLinejoin="round" />
      </g>

      {/* 被筛掉的卡（打叉） */}
      <g transform="translate(120,128)">
        <rect x="0" y="0" width="44" height="13" rx="3" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.6" opacity="0.55" />
        <g stroke="#E07A5F" strokeWidth="2.2" strokeLinecap="round">
          <line x1="14" y1="2" x2="30" y2="11" />
          <line x1="30" y1="2" x2="14" y2="11" />
        </g>
      </g>

      {/* 右侧窗口托盘 */}
      <g transform="translate(176,44)">
        {/* 标签 */}
        <rect x="0" y="-2" width="92" height="14" rx="3" fill="#241C15" />
        <text x="46" y="8" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#FBEFE3">
          CONTEXT
        </text>

        {/* 托盘阴影 + 外框 */}
        <rect x="0" y="20" width="118" height="104" rx="10" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
        <rect x="0" y="20" width="118" height="104" rx="10" fill="#FBEFE3" stroke="#1B4B5A" strokeWidth="2.5" />

        {/* 选中的 3 张彩色卡 */}
        <SelCard y={32} fill="#1B4B5A" label="系统指令" text="#FBEFE3" hover="group-hover:-translate-y-0.5" />
        <SelCard y={62} fill="#F4D35E" label="挑出的资料" text="#241C15" hover="group-hover:translate-y-0.5" />
        <SelCard y={92} fill="#FF4D74" label="当前问题" text="#FBEFE3" hover="group-hover:-translate-y-0.5" />
      </g>

      {/* 装饰：右上 sparkle */}
      <g transform="translate(292,30)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#F4D35E" stroke="#241C15" strokeWidth="1.3" />
        </g>
      </g>
    </CoverShell>
  );
};

const SelCard: React.FC<{ y: number; fill: string; label: string; text: string; hover: string }> = ({
  y,
  fill,
  label,
  text,
  hover,
}) => (
  <g transform={`translate(10,${y})`}>
    <g className={`transition-transform duration-500 ease-spring ${hover}`}>
      <rect x="0" y="0" width="98" height="22" rx="5" fill={fill} stroke="#241C15" strokeWidth="2" />
      <text x="49" y="15" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill={text}>
        {label}
      </text>
    </g>
  </g>
);

export default ContextEngineeringCover;
