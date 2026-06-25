import React from "react";
import CoverShell from "./CoverShell";

const MultiQueryAttentionCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.08}>
    <text x="160" y="27" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" fill="#241C15">8 QUERY HEADS · 1 SHARED KV</text>
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-[1.03]" style={{ transformBox: "fill-box" }}>
      {Array.from({ length: 8 }, (_, index) => (
        <g key={index} transform={`translate(${28 + index * 35},48)`}>
          <rect width="27" height="30" rx="7" fill={index % 2 ? "#1B4B5A" : "#E07A5F"} stroke="#241C15" strokeWidth="2" />
          <text x="13.5" y="20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="900" fill="#FBEFE3">Q{index + 1}</text>
          <path d={`M13.5 32 L${160 - (28 + index * 35)} 82`} stroke="#241C15" strokeWidth="1.4" strokeDasharray="4 3" />
        </g>
      ))}
      <rect x="76" y="122" width="168" height="48" rx="14" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
      <text x="160" y="143" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="900" fill="#241C15">SHARED K · V</text>
      <text x="160" y="159" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="10" fontWeight="800" fill="#241C15">只保存一组前文线索和信息</text>
    </g>
  </CoverShell>
);

export default MultiQueryAttentionCover;
