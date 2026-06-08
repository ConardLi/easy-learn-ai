import React from "react";
import CoverShell from "./CoverShell";

const VectorDatabaseCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.08}>
      <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
        <rect x="42" y="42" width="236" height="116" rx="18" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        <rect x="58" y="58" width="204" height="24" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
        <rect x="58" y="92" width="204" height="24" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
        <rect x="58" y="126" width="204" height="24" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.8" />
      </g>

      <g className="transition-transform duration-500 ease-spring group-hover:translate-x-2">
        {[
          [78, 70, "#F4D35E"],
          [112, 70, "#E07A5F"],
          [146, 70, "#1B4B5A"],
          [180, 70, "#F4D35E"],
          [214, 70, "#FFFFFF"],
          [86, 104, "#1B4B5A"],
          [122, 104, "#FFFFFF"],
          [158, 104, "#F4D35E"],
          [194, 104, "#E07A5F"],
          [230, 104, "#FFFFFF"],
          [96, 138, "#FFFFFF"],
          [132, 138, "#F4D35E"],
          [168, 138, "#1B4B5A"],
          [204, 138, "#E07A5F"],
        ].map(([cx, cy, fill], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="6.5"
            fill={fill}
            stroke="#241C15"
            strokeWidth="1.6"
          />
        ))}
      </g>

      <g stroke="#241C15" strokeWidth="1.7" strokeLinecap="round" opacity="0.42">
        <line x1="78" y1="70" x2="112" y2="70" />
        <line x1="112" y1="70" x2="158" y2="104" />
        <line x1="158" y1="104" x2="132" y2="138" />
        <line x1="158" y1="104" x2="194" y2="104" />
        <line x1="194" y1="104" x2="204" y2="138" />
      </g>

      <g className="transition-transform duration-500 ease-spring group-hover:-translate-x-2 group-hover:-translate-y-2">
        <circle cx="252" cy="44" r="22" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
        <path d="M242 44h20M252 34v20" stroke="#FBEFE3" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <g transform="translate(88,164)" className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
        <rect x="0" y="-16" width="144" height="28" rx="8" fill="#241C15" />
        <text
          x="72"
          y="2"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          letterSpacing="1.2"
          fill="#F4D35E"
        >
          TOP-K + FILTER
        </text>
      </g>
    </CoverShell>
  );
};

export default VectorDatabaseCover;
