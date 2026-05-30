import React from "react";
import CoverShell from "./CoverShell";

const PAIRS = [
  { g: "学术", a: "研究者", x: 192, y: 64, color: "#1B4B5A" },
  { g: "故事", a: "小学生", x: 248, y: 92, color: "#E07A5F" },
  { g: "新闻", a: "白领", x: 256, y: 132, color: "#88837C" },
  { g: "口播", a: "听众", x: 224, y: 168, color: "#1B4B5A" },
  { g: "政策", a: "决策者", x: 168, y: 184, color: "#FF4D74" },
];

export default function MgaCover() {
  return (
    <CoverShell>
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <rect width="320" height="200" fill="#FBEFE3" />

        <g opacity="0.5">
          <circle cx="60" cy="40" r="2" fill="#241C15" opacity="0.3" />
          <circle cx="280" cy="30" r="2" fill="#241C15" opacity="0.2" />
          <circle cx="40" cy="180" r="2" fill="#241C15" opacity="0.25" />
        </g>

        <g transform="translate(40,76)">
          <rect
            x="0"
            y="0"
            width="80"
            height="48"
            rx="6"
            fill="#FFFFFF"
            stroke="#241C15"
            strokeWidth="2.5"
          />
          <rect x="0" y="0" width="80" height="14" rx="6" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
          <line x1="10" y1="22" x2="68" y2="22" stroke="#241C15" strokeWidth="1.5" opacity="0.55" />
          <line x1="10" y1="30" x2="60" y2="30" stroke="#241C15" strokeWidth="1.5" opacity="0.55" />
          <line x1="10" y1="38" x2="70" y2="38" stroke="#241C15" strokeWidth="1.5" opacity="0.55" />
          <text
            x="40"
            y="11"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fill="#241C15"
            fontWeight="700"
            letterSpacing="0.1em"
          >
            原文
          </text>
        </g>

        {PAIRS.map((p, i) => (
          <g key={i}>
            <path
              d={`M120,100 Q${(120 + p.x) / 2 + 10},${(100 + p.y) / 2 - 10} ${p.x - 8},${p.y}`}
              fill="none"
              stroke="#241C15"
              strokeWidth="1.5"
              strokeOpacity="0.45"
              strokeDasharray="3 3"
            />
            <g transform={`translate(${p.x},${p.y})`}>
              <rect
                x="0"
                y="-12"
                width="56"
                height="24"
                rx="12"
                fill="#FFFFFF"
                stroke="#241C15"
                strokeWidth="2"
              />
              <circle cx="10" cy="0" r="5" fill={p.color} stroke="#241C15" strokeWidth="1.5" />
              <text
                x="20"
                y="-1.5"
                fontFamily="Geist Mono, monospace"
                fontSize="6"
                fill="#241C15"
                fontWeight="700"
              >
                {p.g}
              </text>
              <text
                x="20"
                y="6"
                fontFamily="Geist Mono, monospace"
                fontSize="5"
                fill="#88837C"
              >
                → {p.a}
              </text>
            </g>
          </g>
        ))}

        <g transform="translate(124,180)">
          <rect
            x="0"
            y="0"
            width="72"
            height="14"
            rx="7"
            fill="#241C15"
          />
          <text
            x="36"
            y="10"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8"
            fill="#F4D35E"
            fontWeight="700"
            letterSpacing="0.15em"
          >
            ×3.9 TOKENS
          </text>
        </g>

        <text
          x="40"
          y="34"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fill="#241C15"
          fontWeight="700"
          letterSpacing="0.18em"
        >
          MGA
        </text>
        <text
          x="40"
          y="48"
          fontFamily="Geist Mono, monospace"
          fontSize="6.5"
          fill="#88837C"
          letterSpacing="0.12em"
        >
          GENRE × AUDIENCE
        </text>
      </svg>
    </CoverShell>
  );
}
