import React from "react";
import CoverShell from "./CoverShell";

const DpoCover: React.FC = () => (
  <CoverShell bgClassName="bg-teal" dotColor="#FBEFE3" dotOpacity={0.1}>
    <g transform="translate(160 105)" className="origin-center transition-transform duration-500 ease-spring group-hover:scale-105">
      <line x1="-105" y1="0" x2="105" y2="0" stroke="#FBEFE3" strokeWidth="4" />
      <circle cx="0" cy="0" r="10" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
      <path d="M -18 0 L 0 42 L 18 0 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
      <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-2">
        <rect x="-126" y="-58" width="91" height="53" rx="10" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
        <text x="-81" y="-36" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="800" fill="#241C15">CHOSEN</text>
        <text x="-81" y="-19" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#241C15">π ↑</text>
        <line x1="-105" y1="-5" x2="-105" y2="0" stroke="#FBEFE3" strokeWidth="3" />
      </g>
      <g className="transition-transform duration-500 ease-spring group-hover:translate-y-2">
        <rect x="35" y="-42" width="91" height="53" rx="10" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
        <text x="81" y="-20" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="800" fill="#FBEFE3">REJECTED</text>
        <text x="81" y="-3" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#FBEFE3">π ↓</text>
        <line x1="105" y1="11" x2="105" y2="0" stroke="#FBEFE3" strokeWidth="3" />
      </g>
    </g>
    <g transform="translate(160 31)" className="origin-center transition-transform duration-500 group-hover:rotate-2">
      <rect x="-42" y="-13" width="84" height="26" rx="13" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
      <text x="0" y="5" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="13" fontWeight="900" fill="#241C15">DPO LOSS</text>
    </g>
    <text x="160" y="181" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#FBEFE3">
      preference · reference · update
    </text>
  </CoverShell>
);

export default DpoCover;
