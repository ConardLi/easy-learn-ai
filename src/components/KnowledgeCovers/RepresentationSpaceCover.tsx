import React from "react";
import CoverShell from "./CoverShell";

const RepresentationSpaceCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-soft" dotOpacity={0.1}>
    <g stroke="#241C15" strokeWidth="1" opacity="0.15">
      {[0, 1, 2, 3, 4].map((i) => <line key={`v${i}`} x1={58 + i * 48} y1="28" x2={58 + i * 48} y2="172" />)}
      {[0, 1, 2, 3].map((i) => <line key={`h${i}`} x1="40" y1={42 + i * 40} x2="286" y2={42 + i * 40} />)}
    </g>
    <path d="M62 150 Q135 82 226 62" fill="none" stroke="#1B4B5A" strokeWidth="2.5" strokeDasharray="6 6" />
    <polygon points="226,62 215,59 220,70" fill="#1B4B5A" />
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-x-2 group-hover:-translate-y-1">
      <Point x={84} y={122} color="#E07A5F" label="DOG" />
      <Point x={116} y={101} color="#E07A5F" label="CAT" />
      <Point x={98} y={146} color="#F4D35E" label="PET" />
    </g>
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-2 group-hover:translate-y-1">
      <Point x={232} y={74} color="#1B4B5A" label="BUS" dark />
      <Point x={260} y={104} color="#1B4B5A" label="CAR" dark />
    </g>
    <g transform="translate(160,28) rotate(-4)" className="transition-transform duration-500 group-hover:rotate-3">
      <rect x="-59" y="-13" width="118" height="26" rx="7" fill="#241C15" />
      <text x="0" y="4" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" letterSpacing="1.5" fill="#F4D35E">MEANING AS POSITION</text>
    </g>
  </CoverShell>
);

const Point: React.FC<{ x: number; y: number; color: string; label: string; dark?: boolean }> = ({ x, y, color, label, dark }) => (
  <g>
    <circle cx={x} cy={y} r="12" fill={color} stroke="#241C15" strokeWidth="2.2" />
    <text x={x} y={y + 3} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="6.5" fontWeight="800" fill={dark ? "#FBEFE3" : "#241C15"}>{label}</text>
  </g>
);

export default RepresentationSpaceCover;
