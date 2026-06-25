import React from "react";
import CoverShell from "./CoverShell";

const SpeculativeDecodingCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter" dotOpacity={0.08}>
    <text x="28" y="31" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">DRAFT</text>
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-2">
      {["今", "天", "公", "园"].map((token, i) => (
        <g key={token} transform={`translate(${28 + i * 52},48)`}>
          <rect width="42" height="42" rx="10" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
          <text x="21" y="27" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="14" fontWeight="700" fill="#241C15">{token}</text>
        </g>
      ))}
    </g>
    <path d="M235 69 H277" stroke="#241C15" strokeWidth="2.5" strokeDasharray="5 4" />
    <path d="M277 69 L268 64 V74 Z" fill="#241C15" />
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105" style={{ transformBox: "fill-box" }}>
      <rect x="247" y="98" width="49" height="55" rx="13" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
      <path d="M258 125 L267 134 L286 112" fill="none" stroke="#F4D35E" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <text x="28" y="121" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">TARGET VERIFY</text>
    {["✓", "✓", "✓", "×"].map((mark, i) => (
      <g key={i} transform={`translate(${28 + i * 52},136)`}>
        <rect width="42" height="29" rx="8" fill={i === 3 ? "#E07A5F" : "#FBEFE3"} stroke="#241C15" strokeWidth="2" />
        <text x="21" y="20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="14" fontWeight="700" fill="#241C15">{mark}</text>
      </g>
    ))}
  </CoverShell>
);

export default SpeculativeDecodingCover;
