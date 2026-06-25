import React from "react";
import CoverShell from "./CoverShell";

const GraphRagCover: React.FC = () => (
  <CoverShell bgClassName="bg-teal" dotColor="#FBEFE3" dotOpacity={0.09}>
    <g className="transition-transform duration-500 ease-spring group-hover:-translate-x-1">
      <line x1="50" y1="55" x2="115" y2="92" stroke="#FBEFE3" strokeWidth="2" />
      <line x1="48" y1="145" x2="115" y2="92" stroke="#FBEFE3" strokeWidth="2" />
      <line x1="115" y1="92" x2="172" y2="54" stroke="#FBEFE3" strokeWidth="2" />
      <line x1="115" y1="92" x2="174" y2="145" stroke="#FBEFE3" strokeWidth="2" />
      {[[50,55,"#F4D35E"],[48,145,"#E07A5F"],[115,92,"#F4D35E"],[172,54,"#E07A5F"],[174,145,"#F4D35E"]].map(([x,y,fill], index) => (
        <circle key={index} cx={Number(x)} cy={Number(y)} r={index === 2 ? 22 : 16} fill={String(fill)} stroke="#241C15" strokeWidth="2.5" />
      ))}
    </g>
    <path d="M 194 100 L 225 100" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" />
    <path d="M 221 94 L 231 100 L 221 106" fill="none" stroke="#FBEFE3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <g className="transition-transform duration-500 ease-spring group-hover:translate-x-1">
      <rect x="230" y="55" width="70" height="88" rx="18" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
      <line x1="244" y1="76" x2="286" y2="76" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="244" y1="89" x2="278" y2="89" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="265" cy="116" r="11" fill="#241C15" />
      <path d="M 260 116 L 264 120 L 271 111" fill="none" stroke="#F4D35E" strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <text x="160" y="190" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" letterSpacing="3" fontWeight="700" fill="#FBEFE3" opacity="0.6">GRAPH → RETRIEVE → ANSWER</text>
  </CoverShell>
);

export default GraphRagCover;
