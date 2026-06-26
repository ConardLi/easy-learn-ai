/**
 * 数据清洗 封面
 *
 * 隐喻：一个漏斗 —— 上面倒进一堆又脏又乱的料（重复/乱码/广告/有害），
 *       漏斗筛掉杂物，下面流出干净的好句子。讲的是「挑掉没用的、留下能用的」。
 * 视觉构图（viewBox 320×200）：
 *   - 上方：几条脏料（带删除线感）
 *   - 中间：漏斗形状
 *   - 下方：一颗干净的「✓ 干净料」滴落
 *   - hover：干净料滴轻微下落
 * 跟 training-dataset（料仓分类）刻意区分：这张强调「过滤动作」，主色 coral。
 */
import React from "react";
import CoverShell from "./CoverShell";

const DIRTY = [
  { x: 40, label: "重复 ×3", fill: "#FBEFE3" },
  { x: 128, label: "乱码 #@%", fill: "#FBEFE3" },
  { x: 216, label: "广告链接", fill: "#FBEFE3" },
];

const DataCleaningCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-coral/10" dotOpacity={0.08}>
      {/* 上方脏料 */}
      <g transform="translate(0,30)">
        {DIRTY.map((d, i) => (
          <g key={i} transform={`translate(${d.x},0)`}>
            <rect x="0" y="0" width="64" height="18" rx="4" fill={d.fill} stroke="#241C15" strokeWidth="1.8" opacity="0.65" />
            <text x="32" y="13" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8.5" fontWeight="700" fill="#241C15" opacity="0.7">
              {d.label}
            </text>
            <line x1="6" y1="4" x2="58" y2="15" stroke="#E07A5F" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          </g>
        ))}
      </g>

      {/* 漏斗 */}
      <g transform="translate(160,60)">
        <path
          d="M -88 0 L 88 0 L 24 70 L 24 104 L -24 104 L -24 70 Z"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* 漏斗内筛网线 */}
        <g stroke="#241C15" strokeWidth="1.4" opacity="0.4">
          <line x1="-60" y1="22" x2="60" y2="22" />
          <line x1="-42" y1="40" x2="42" y2="40" />
        </g>
      </g>

      {/* 下方干净料滴 */}
      <g transform="translate(160,176)" className="transition-transform duration-700 group-hover:translate-y-1">
        <rect x="-44" y="-14" width="88" height="22" rx="6" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        <text x="0" y="1" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill="#FBEFE3">
          ✓ 干净料
        </text>
      </g>

      {/* 装饰 sparkle */}
      <g transform="translate(294,28)">
        <g className="origin-center transition-transform duration-700 group-hover:rotate-[110deg]">
          <path d="M 0 -6 L 1 -1 L 6 0 L 1 1 L 0 6 L -1 1 L -6 0 L -1 -1 Z" fill="#FF4D74" stroke="#241C15" strokeWidth="1.3" />
        </g>
      </g>
    </CoverShell>
  );
};

export default DataCleaningCover;
