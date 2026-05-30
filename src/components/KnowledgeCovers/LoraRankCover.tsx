import React from "react";
import CoverShell from "./CoverShell";

const RANKS = [
  { r: 1, h: 14, color: "#FBE891", label: "1" },
  { r: 4, h: 28, color: "#F4D35E", label: "4" },
  { r: 8, h: 44, color: "#E5BD3A", label: "8" },
  { r: 16, h: 64, color: "#E07A5F", label: "16" },
  { r: 32, h: 84, color: "#1B4B5A", label: "32" },
  { r: 64, h: 96, color: "#241C15", label: "64" },
];

export default function LoraRankCover() {
  return (
    <CoverShell>
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <rect width="320" height="200" fill="#FBEFE3" />

        <text x="40" y="30" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" letterSpacing="0.18em" fontWeight="700">
          LoRA · r =
        </text>

        <g transform="translate(36,158)">
          <line x1="0" y1="0" x2="252" y2="0" stroke="#241C15" strokeWidth="2" />
          {RANKS.map((rank, i) => {
            const x = i * 42 + 8;
            return (
              <g key={rank.r}>
                <rect
                  x={x}
                  y={-rank.h}
                  width="28"
                  height={rank.h}
                  fill={rank.color}
                  stroke="#241C15"
                  strokeWidth="2"
                  rx="4"
                />
                <text
                  x={x + 14}
                  y={14}
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="11"
                  fill="#241C15"
                  fontWeight="700"
                >
                  {rank.label}
                </text>
              </g>
            );
          })}
        </g>

        <g transform="translate(140,68)">
          <rect x="0" y="-8" width="76" height="22" rx="11" fill="#241C15" />
          <text
            x="38"
            y="7"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="10"
            fill="#F4D35E"
            fontWeight="700"
            letterSpacing="0.1em"
          >
            sweet · 16
          </text>
        </g>

        <path
          d="M 178 66 L 196 90"
          stroke="#241C15"
          strokeWidth="1.5"
          strokeDasharray="3 3"
          fill="none"
        />

        <text x="284" y="172" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C" textAnchor="end">
          rank →
        </text>
        <text x="36" y="60" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
          表达力
        </text>
      </svg>
    </CoverShell>
  );
}
