/**
 * 训练数据集 封面
 *
 * 隐喻：一个大料仓/料斗，里面装着分门别类的几堆「料」（网页、书、人工、合成），
 *       底部一句「质量决定能力」。讲的是「一份数据集由哪几类料组成」。
 * 视觉构图（viewBox 320×200）：
 *   - 左侧：四个彩色料块堆叠，各带小标签
 *   - 右侧：一个大「DATASET」料箱，几条料汇入
 *   - hover：料块轻微浮动
 * 跟同线 data-cleaning（漏斗筛选）/dataset-construction（流水线）刻意区分：这张强调「分类汇总」。
 */
import React from "react";
import CoverShell from "./CoverShell";

const PILES = [
  { y: 36, fill: "#1B4B5A", label: "网络语料", text: "#FBEFE3" },
  { y: 66, fill: "#F4D35E", label: "开源数据", text: "#241C15" },
  { y: 96, fill: "#E07A5F", label: "人工编写", text: "#FBEFE3" },
  { y: 126, fill: "#FF4D74", label: "合成数据", text: "#FBEFE3" },
];

const TrainingDatasetCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-teal/10" dotOpacity={0.08}>
      {/* 左侧四类料块 */}
      <g transform="translate(24,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          SOURCES
        </text>
        {PILES.map((p, i) => (
          <g key={i} transform={`translate(0,${p.y})`} className="transition-transform duration-500 ease-spring" style={{ transformOrigin: "center" }}>
            <g className={i % 2 === 0 ? "group-hover:-translate-y-0.5 transition-transform duration-500" : "group-hover:translate-y-0.5 transition-transform duration-500"}>
              <rect x="0" y="0" width="92" height="22" rx="5" fill={p.fill} stroke="#241C15" strokeWidth="2" />
              <text x="46" y="15" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill={p.text}>
                {p.label}
              </text>
            </g>
          </g>
        ))}
      </g>

      {/* 汇入箭头 */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 122 80 Q 150 95 176 95" strokeDasharray="4 4" />
        <path d="M 170 90 L 178 95 L 170 100" strokeLinejoin="round" />
      </g>

      {/* 右侧 DATASET 料箱 */}
      <g transform="translate(186,42)">
        <rect x="0" y="-2" width="104" height="14" rx="3" fill="#241C15" />
        <text x="52" y="8" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.6" fill="#FBEFE3">
          DATASET
        </text>
        <rect x="0" y="20" width="108" height="96" rx="10" fill="#241C15" opacity="0.85" transform="translate(3,3)" />
        <rect x="0" y="20" width="108" height="96" rx="10" fill="#FBEFE3" stroke="#1B4B5A" strokeWidth="2.5" />
        {/* 箱内分层料 */}
        <rect x="12" y="34" width="84" height="16" rx="4" fill="#1B4B5A" opacity="0.85" />
        <rect x="12" y="54" width="84" height="16" rx="4" fill="#F4D35E" />
        <rect x="12" y="74" width="84" height="16" rx="4" fill="#E07A5F" opacity="0.85" />
        <rect x="12" y="94" width="84" height="16" rx="4" fill="#FF4D74" opacity="0.85" />
      </g>

      {/* 底部一句 */}
      <g transform="translate(186,168)">
        <text x="0" y="0" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="10" fontWeight="800" fill="#241C15" opacity="0.7">
          质量决定能力
        </text>
      </g>
    </CoverShell>
  );
};

export default TrainingDatasetCover;
