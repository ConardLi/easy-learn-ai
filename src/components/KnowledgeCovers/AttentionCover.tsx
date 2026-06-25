import React from "react";
import CoverShell from "./CoverShell";

const AttentionCover: React.FC = () => (
  <CoverShell bgClassName="bg-teal/15" dotOpacity={0.08}>
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-[1.03]" style={{ transformBox: "fill-box" }}>
      {["小","猫","趴","在","窗","边"].map((token, index) => {
        const weight = [15, 90, 20, 25, 65, 80][index];
        return (
          <g key={token} transform={`translate(${35 + index * 43},118)`}>
            <rect width="34" height="34" rx="8" fill={weight > 60 ? "#F4D35E" : "#FFFFFF"} stroke="#241C15" strokeWidth="2" />
            <text x="17" y="23" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="14" fontWeight="800" fill="#241C15">{token}</text>
            <rect x="4" y={-12 - weight / 3} width="26" height={weight / 3} rx="4" fill={weight > 60 ? "#E07A5F" : "#1B4B5A"} stroke="#241C15" strokeWidth="1.5" />
          </g>
        );
      })}
    </g>
    <text x="160" y="30" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" fill="#241C15">CURRENT TOKEN → PICK IMPORTANT CONTEXT</text>
    <path d="M160 42 V68" stroke="#241C15" strokeWidth="2" strokeDasharray="5 4" className="animate-dash-flow" />
    <circle cx="160" cy="78" r="15" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
    <text x="160" y="82" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="900" fill="#FBEFE3">Q</text>
  </CoverShell>
);

export default AttentionCover;
