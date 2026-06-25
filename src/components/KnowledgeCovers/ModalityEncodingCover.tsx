import React from "react";
import CoverShell from "./CoverShell";

const ModalityEncodingCover: React.FC = () => (
  <CoverShell bgClassName="bg-teal" dotColor="#FBEFE3" dotOpacity={0.14}>
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      <rect x="28" y="46" width="86" height="86" rx="10" fill="#FBE891" stroke="#241C15" strokeWidth="2.5" />
      <circle cx="92" cy="68" r="12" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
      <path d="M30 126 L57 91 L79 113 L99 82 L114 103 L114 132 L30 132 Z" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
      <g stroke="#241C15" strokeWidth="0.9" opacity="0.7">
        {[1, 2, 3].map((i) => <line key={`v${i}`} x1={28 + i * 21.5} y1="46" x2={28 + i * 21.5} y2="132" />)}
        {[1, 2, 3].map((i) => <line key={`h${i}`} x1="28" y1={46 + i * 21.5} x2="114" y2={46 + i * 21.5} />)}
      </g>
    </g>
    <path d="M126 88 L158 88" stroke="#FBEFE3" strokeWidth="2.5" strokeDasharray="5 5" />
    <polygon points="158,88 149,83 149,93" fill="#FBEFE3" />
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-2">
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((__, col) => (
          <rect key={`${row}-${col}`} x={172 + col * 24} y={44 + row * 24} width="17" height="17" rx="3" fill={(row + col) % 3 === 0 ? "#F4D35E" : (row + col) % 3 === 1 ? "#E07A5F" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.5" />
        )),
      )}
    </g>
    <g transform="translate(42,160)">
      <path d="M0 0 C10 -25 20 25 30 0 S50 -25 60 0 S80 25 90 0" fill="none" stroke="#FBEFE3" strokeWidth="3" />
      <text x="108" y="4" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill="#FBEFE3">IMAGE / AUDIO → NUMBERS</text>
    </g>
  </CoverShell>
);

export default ModalityEncodingCover;
