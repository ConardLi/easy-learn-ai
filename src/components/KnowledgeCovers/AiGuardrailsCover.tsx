import React from "react";
import CoverShell from "./CoverShell";

const AiGuardrailsCover: React.FC = () => (
  <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
    <g className="transition-transform duration-500 ease-spring group-hover:scale-105" style={{ transformOrigin: "160px 100px" }}>
      <circle cx="160" cy="100" r="38" fill="#1B4B5A" stroke="#241C15" strokeWidth="2.5" />
      <text x="160" y="108" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="22" fontWeight="900" fill="#FBEFE3">AI</text>
    </g>
    {[
      [160, 34, "INPUT"],
      [254, 100, "TOOLS"],
      [160, 166, "OUTPUT"],
      [66, 100, "ACCESS"],
    ].map(([x, y, label], i) => (
      <g key={String(label)} className={`transition-transform duration-500 ease-spring ${i % 2 ? "group-hover:translate-y-1" : "group-hover:-translate-y-1"}`}>
        <rect x={Number(x) - 34} y={Number(y) - 13} width="68" height="26" rx="13" fill={i === 0 ? "#F4D35E" : i === 1 ? "#E07A5F" : i === 2 ? "#7A28CB" : "#FBE891"} stroke="#241C15" strokeWidth="2" />
        <text x={Number(x)} y={Number(y) + 3} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" fill={i === 1 || i === 2 ? "#FBEFE3" : "#241C15"}>{label}</text>
      </g>
    ))}
    <circle cx="160" cy="100" r="67" fill="none" stroke="#241C15" strokeWidth="2" strokeDasharray="6 5" />
  </CoverShell>
);

export default AiGuardrailsCover;
