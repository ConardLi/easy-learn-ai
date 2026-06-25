import React from "react";
import CoverShell from "./CoverShell";

const ModelInferenceCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.08}>
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-1">
      <rect x="34" y="72" width="72" height="56" rx="14" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.5" />
      <text x="70" y="94" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">
        INPUT
      </text>
      <g fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="12" fontWeight="700" fill="#241C15">
        <text x="49" y="116">帮</text>
        <text x="68" y="116">我</text>
        <text x="87" y="116">写</text>
      </g>
    </g>

    <path d="M112 100 H143" fill="none" stroke="#241C15" strokeWidth="2.5" strokeDasharray="5 4" />
    <path d="M143 100 L134 95 V105 Z" fill="#241C15" />

    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105" style={{ transformBox: "fill-box" }}>
      <rect x="148" y="52" width="66" height="96" rx="18" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
      <g fill="#F4D35E" stroke="#241C15" strokeWidth="1.5">
        <circle cx="167" cy="75" r="7" />
        <circle cx="195" cy="75" r="7" />
        <circle cx="167" cy="101" r="7" />
        <circle cx="195" cy="101" r="7" />
        <circle cx="181" cy="127" r="7" />
      </g>
      <g stroke="#FBEFE3" strokeWidth="2">
        <line x1="167" y1="82" x2="167" y2="94" />
        <line x1="195" y1="82" x2="195" y2="94" />
        <line x1="171" y1="106" x2="178" y2="121" />
        <line x1="191" y1="106" x2="184" y2="121" />
        <line x1="174" y1="101" x2="188" y2="101" />
      </g>
    </g>

    <path d="M220 100 H245" fill="none" stroke="#241C15" strokeWidth="2.5" strokeDasharray="5 4" />
    <path d="M245 100 L236 95 V105 Z" fill="#241C15" />

    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      {["模", "型", "回", "答"].map((token, i) => (
        <g key={token} transform={`translate(${250 + (i % 2) * 28},${70 + Math.floor(i / 2) * 34})`}>
          <rect width="23" height="25" rx="6" fill={i === 3 ? "#E07A5F" : "#FFFFFF"} stroke="#241C15" strokeWidth="2" />
          <text x="11.5" y="17" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="700" fill="#241C15">
            {token}
          </text>
        </g>
      ))}
    </g>
  </CoverShell>
);

export default ModelInferenceCover;
