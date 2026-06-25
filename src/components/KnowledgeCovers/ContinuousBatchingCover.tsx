import React from "react";
import CoverShell from "./CoverShell";

const ContinuousBatchingCover: React.FC = () => (
  <CoverShell bgClassName="bg-coral/20" dotOpacity={0.08}>
    <text x="28" y="31" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">LIVE REQUEST SLOTS</text>
    {[0, 1, 2].map((row) => (
      <g key={row} transform={`translate(28,${52 + row * 43})`}>
        <rect width="264" height="31" rx="10" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        {[0, 1, 2, 3, 4].map((col) => {
          const widths = [[5, 5, 5, 5, 5], [3, 3, 4, 4, 4], [4, 4, 4, 0, 0]][row];
          const active = col < widths[row];
          return active ? (
            <rect
              key={col}
              x={7 + col * 51}
              y="6"
              width="43"
              height="19"
              rx="6"
              fill={row === 0 ? "#E07A5F" : row === 1 && col > 1 ? "#FF4D74" : row === 2 ? "#1B4B5A" : "#F4D35E"}
              stroke="#241C15"
              strokeWidth="1.5"
              className={row === 1 && col === 2 ? "transition-transform duration-500 ease-spring group-hover:-translate-y-1" : ""}
            />
          ) : null;
        })}
      </g>
    ))}
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-2">
      <path d="M229 176 H281" stroke="#241C15" strokeWidth="2.5" />
      <path d="M281 176 L272 170 V182 Z" fill="#241C15" />
      <text x="175" y="180" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill="#241C15">REFILL</text>
    </g>
  </CoverShell>
);

export default ContinuousBatchingCover;
