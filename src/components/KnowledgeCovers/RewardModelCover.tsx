import React from "react";
import CoverShell from "./CoverShell";

const RewardModelCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.08}>
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      <rect x="28" y="48" width="82" height="52" rx="9" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
      <text x="42" y="69" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">ANSWER A</text>
      <line x1="42" y1="79" x2="93" y2="79" stroke="#241C15" strokeWidth="2" />
      <line x1="42" y1="88" x2="81" y2="88" stroke="#241C15" strokeWidth="2" opacity="0.6" />
    </g>
    <g className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
      <rect x="28" y="116" width="82" height="45" rx="9" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
      <text x="42" y="136" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#88837C">ANSWER B</text>
      <line x1="42" y1="146" x2="91" y2="146" stroke="#88837C" strokeWidth="2" />
    </g>
    <path d="M122 104 C143 104 148 77 169 77" fill="none" stroke="#E07A5F" strokeWidth="3" strokeDasharray="5 4" className="animate-dash-flow" />
    <path d="M122 126 C143 126 148 139 169 139" fill="none" stroke="#E07A5F" strokeWidth="3" strokeDasharray="5 4" className="animate-dash-flow" />
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105">
      <rect x="170" y="48" width="118" height="113" rx="18" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
      <text x="229" y="71" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="12" fontWeight="800" fill="#FBEFE3">奖励模型</text>
      <line x1="191" y1="89" x2="267" y2="89" stroke="#FBEFE3" strokeWidth="2" opacity="0.5" />
      <rect x="193" y="101" width="72" height="18" rx="9" fill="#F4D35E" stroke="#241C15" strokeWidth="1.5" />
      <text x="229" y="114" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" fill="#241C15">A  +1.7</text>
      <rect x="202" y="130" width="54" height="17" rx="8.5" fill="#E07A5F" stroke="#241C15" strokeWidth="1.5" />
      <text x="229" y="142" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill="#FBEFE3">B  -0.4</text>
    </g>
    <g transform="translate(72 31) rotate(-5)" className="origin-center transition-transform duration-500 group-hover:rotate-3">
      <rect x="-34" y="-10" width="68" height="20" rx="4" fill="#FF4D74" stroke="#241C15" strokeWidth="2" />
      <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill="#FBEFE3">HUMAN PICK</text>
    </g>
  </CoverShell>
);

export default RewardModelCover;
