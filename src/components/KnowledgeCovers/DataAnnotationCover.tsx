/**
 * 数据标注 封面
 *
 * 隐喻：一条原始数据，被贴上一张「标签/正确答案」便签。讲的是「给数据贴上正确答案或标签」。
 * 视觉构图（viewBox 320×200）：
 *   - 左侧：一条原始样本卡（灰白，无标签）
 *   - 中间：一支手/笔贴标签的动作箭头
 *   - 右侧：同一条卡被贴上彩色标签便签（指令/偏好/评估）
 *   - hover：标签便签轻轻翘起
 * 跟同线其他刻意区分：这张强调「贴标签」动作，主色 pop。
 */
import React from "react";
import CoverShell from "./CoverShell";

const TAGS = [
  { y: 40, fill: "#FF4D74", label: "指令", text: "#FBEFE3" },
  { y: 86, fill: "#1B4B5A", label: "偏好", text: "#FBEFE3" },
  { y: 132, fill: "#F4D35E", label: "评估", text: "#241C15" },
];

const DataAnnotationCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-pop/10" dotOpacity={0.08}>
      {/* 左侧原始样本 */}
      <g transform="translate(24,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          RAW
        </text>
        {[40, 86, 132].map((y, i) => (
          <g key={i} transform={`translate(0,${y})`}>
            <rect x="0" y="0" width="92" height="30" rx="6" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <rect x="10" y="9" width="50" height="4" rx="2" fill="#241C15" opacity="0.35" />
            <rect x="10" y="18" width="34" height="4" rx="2" fill="#241C15" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* 中间贴标动作箭头 */}
      <g stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M 124 100 Q 152 100 178 100" strokeDasharray="4 4" />
        <path d="M 172 95 L 180 100 L 172 105" strokeLinejoin="round" />
      </g>

      {/* 右侧贴上标签的卡 */}
      <g transform="translate(188,0)">
        <text x="0" y="24" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="1.4" fill="#241C15" opacity="0.6">
          LABELED
        </text>
        {TAGS.map((t, i) => (
          <g key={i} transform={`translate(0,${t.y})`}>
            <rect x="0" y="0" width="92" height="30" rx="6" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
            <rect x="10" y="9" width="50" height="4" rx="2" fill="#241C15" opacity="0.35" />
            <rect x="10" y="18" width="34" height="4" rx="2" fill="#241C15" opacity="0.25" />
            {/* 标签便签 */}
            <g
              transform="translate(60,-8)"
              className={i % 2 === 0 ? "transition-transform duration-500 ease-spring group-hover:-rotate-6" : "transition-transform duration-500 ease-spring group-hover:rotate-6"}
              style={{ transformOrigin: "60px 4px" }}
            >
              <rect x="0" y="0" width="40" height="20" rx="5" fill={t.fill} stroke="#241C15" strokeWidth="2" />
              <text x="20" y="14" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="10.5" fontWeight="700" fill={t.text}>
                {t.label}
              </text>
            </g>
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default DataAnnotationCover;
