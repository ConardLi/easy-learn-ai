import React from "react";
import CoverShell from "./CoverShell";

const KvCacheCover: React.FC = () => (
  <CoverShell bgClassName="bg-coral/20" dotOpacity={0.08}>
    <g transform="translate(40,34)">
      <text x="0" y="0" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">
        GENERATED TOKENS
      </text>
      {["今", "天", "天", "气"].map((token, i) => (
        <g key={`${token}-${i}`} transform={`translate(${i * 43},18)`}>
          <rect width="34" height="34" rx="8" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
          <text x="17" y="23" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="14" fontWeight="700" fill="#241C15">
            {token}
          </text>
        </g>
      ))}
    </g>

    <path d="M119 92 V113" stroke="#241C15" strokeWidth="2.5" strokeDasharray="5 4" />
    <path d="M119 113 L114 104 H124 Z" fill="#241C15" />

    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-[1.03]" style={{ transformBox: "fill-box" }}>
      <rect x="53" y="118" width="214" height="52" rx="14" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
      <text x="69" y="139" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#FBEFE3">
        KV CACHE
      </text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${69 + i * 46},146)`}>
          <rect width="37" height="13" rx="4" fill={i === 3 ? "#F4D35E" : "#E07A5F"} stroke="#241C15" strokeWidth="1.5" />
          <text x="18.5" y="9.5" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="7" fontWeight="700" fill="#241C15">
            K{i + 1} V{i + 1}
          </text>
        </g>
      ))}
    </g>

    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      <rect x="232" y="43" width="48" height="45" rx="12" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
      <path d="M244 66 H268" stroke="#241C15" strokeWidth="2.5" />
      <path d="M261 59 L269 66 L261 73" fill="none" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="256" y="36" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="700" fill="#241C15">
        REUSE
      </text>
    </g>
  </CoverShell>
);

export default KvCacheCover;
