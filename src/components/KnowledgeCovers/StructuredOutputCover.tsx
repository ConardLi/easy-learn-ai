import React from "react";
import CoverShell from "./CoverShell";

const StructuredOutputCover: React.FC = () => (
  <CoverShell bgClassName="bg-teal/15" dotOpacity={0.08}>
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:scale-[1.03]" style={{ transformBox: "fill-box" }}>
      <rect x="51" y="28" width="218" height="145" rx="20" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
      <text x="70" y="57" fontFamily="Geist Mono, monospace" fontSize="20" fontWeight="700" fill="#E07A5F">{"{"}</text>
      {[
        ["name", "string", "#F4D35E"],
        ["price", "number", "#E07A5F"],
        ["stock", "boolean", "#1B4B5A"],
      ].map(([name, type, color], i) => (
        <g key={name} transform={`translate(84,${47 + i * 36})`}>
          <rect width="150" height="27" rx="7" fill={color} stroke="#241C15" strokeWidth="1.8" />
          <text x="10" y="18" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="700" fill={type === "boolean" ? "#FBEFE3" : "#241C15"}>{name}</text>
          <text x="140" y="18" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="700" fill={type === "boolean" ? "#FBEFE3" : "#241C15"}>{type}</text>
        </g>
      ))}
      <text x="242" y="157" fontFamily="Geist Mono, monospace" fontSize="20" fontWeight="700" fill="#E07A5F">{"}"}</text>
    </g>
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-y-1">
      <circle cx="272" cy="35" r="17" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
      <path d="M264 35 L270 41 L281 29" fill="none" stroke="#241C15" strokeWidth="2.7" strokeLinecap="round" />
    </g>
  </CoverShell>
);

export default StructuredOutputCover;
