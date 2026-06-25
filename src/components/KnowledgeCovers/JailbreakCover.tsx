import React from "react";
import CoverShell from "./CoverShell";

const JailbreakCover: React.FC = () => (
  <CoverShell bgClassName="bg-ink" dotColor="#FBEFE3" dotOpacity={0.08}>
    <g transform="translate(160 100)">
      <rect x="-68" y="-48" width="136" height="96" rx="30" fill="#1B4B5A" stroke="#FBEFE3" strokeWidth="2.5" strokeDasharray="8 5" />
      <g className="transition-transform duration-600 ease-spring group-hover:translate-x-2 group-hover:-rotate-6" style={{ transformOrigin: "0px 0px" }}>
        <path d="M-40 -12 Q-20 -34 0 -12 Q20 -34 40 -12 L34 18 Q16 34 0 20 Q-16 34 -34 18 Z" fill="#E07A5F" stroke="#FBEFE3" strokeWidth="2.2" />
        <ellipse cx="-18" cy="0" rx="8" ry="5" fill="#241C15" />
        <ellipse cx="18" cy="0" rx="8" ry="5" fill="#241C15" />
      </g>
      <path d="M58 -36 L82 -55 M65 -20 L92 -24 M60 0 L88 12" stroke="#F4D35E" strokeWidth="3" strokeLinecap="round" />
    </g>
    <text x="160" y="176" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" letterSpacing="2" fill="#FBEFE3">SAFETY BOUNDARY</text>
  </CoverShell>
);

export default JailbreakCover;
