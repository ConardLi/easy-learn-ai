import React from "react";
import CoverShell from "./CoverShell";

const ChunkCover: React.FC = () => {
  const chunks = [
    { x: 56, y: 55, w: 78, fill: "#F4D35E", label: "01" },
    { x: 122, y: 92, w: 86, fill: "#E07A5F", label: "02" },
    { x: 192, y: 129, w: 76, fill: "#1B4B5A", label: "03" },
  ];

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
        <rect x="32" y="38" width="110" height="126" rx="16" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        {[0, 1, 2, 3, 4].map((line) => (
          <line
            key={line}
            x1="52"
            y1={68 + line * 18}
            x2={line % 2 ? 116 : 104}
            y2={68 + line * 18}
            stroke="#241C15"
            strokeWidth="2"
            opacity="0.45"
          />
        ))}
      </g>

      <g stroke="#241C15" strokeWidth="1.8" strokeDasharray="5 7" fill="none" opacity="0.75">
        <path d="M150 80 C166 80 168 76 184 76" />
        <path d="M150 104 C166 104 172 112 188 112" />
        <path d="M150 128 C166 128 170 148 190 148" />
      </g>

      {chunks.map((chunk, index) => (
        <g
          key={chunk.label}
          className="transition-transform duration-500 ease-spring group-hover:translate-x-2"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <rect x={chunk.x} y={chunk.y} width={chunk.w} height="36" rx="9" fill={chunk.fill} stroke="#241C15" strokeWidth="2.3" />
          <text
            x={chunk.x + 14}
            y={chunk.y + 23}
            fontFamily="Geist Mono, monospace"
            fontSize="11"
            fontWeight="800"
            fill={chunk.fill === "#1B4B5A" ? "#FBEFE3" : "#241C15"}
          >
            CHUNK {chunk.label}
          </text>
        </g>
      ))}

      <g className="transition-transform duration-500 ease-spring group-hover:-rotate-6">
        <circle cx="235" cy="54" r="20" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        <path d="M225 54h20M235 44v20" stroke="#241C15" strokeWidth="2.3" strokeLinecap="round" />
      </g>

      <g transform="translate(88,170)" className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
        <rect x="0" y="-18" width="144" height="30" rx="10" fill="#241C15" />
        <text
          x="72"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          letterSpacing="1.1"
          fill="#F4D35E"
        >
          SIZE + OVERLAP
        </text>
      </g>
    </CoverShell>
  );
};

export default ChunkCover;
