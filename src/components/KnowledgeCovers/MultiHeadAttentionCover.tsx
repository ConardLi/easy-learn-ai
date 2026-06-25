import React from "react";
import CoverShell from "./CoverShell";

const MultiHeadAttentionCover: React.FC = () => (
  <CoverShell bgClassName="bg-coral/20" dotOpacity={0.08}>
    <text x="160" y="28" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="800" fill="#241C15">SAME SENTENCE · FOUR VIEWS</text>
    <g className="origin-center transition-transform duration-500 ease-spring group-hover:-translate-y-1" style={{ transformBox: "fill-box" }}>
      {[
        { x: 35, y: 55, fill: "#E07A5F", label: "H1", line: "指代" },
        { x: 170, y: 55, fill: "#1B4B5A", label: "H2", line: "动作" },
        { x: 35, y: 118, fill: "#F4D35E", label: "H3", line: "位置" },
        { x: 170, y: 118, fill: "#FF4D74", label: "H4", line: "边界" },
      ].map((item) => (
        <g key={item.label} transform={`translate(${item.x},${item.y})`}>
          <rect width="115" height="46" rx="12" fill={item.fill} stroke="#241C15" strokeWidth="2.2" />
          <text x="16" y="20" fontFamily="Geist Mono, monospace" fontSize="11" fontWeight="900" fill={item.label === "H3" ? "#241C15" : "#FBEFE3"}>{item.label}</text>
          <text x="16" y="36" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="800" fill={item.label === "H3" ? "#241C15" : "#FBEFE3"}>{item.line}</text>
          {[0,1,2,3].map((bar) => <rect key={bar} x={62 + bar * 11} y={30 - bar * 5} width="7" height={8 + bar * 5} rx="2" fill={item.label === "H3" ? "#241C15" : "#FBEFE3"} opacity={0.8} />)}
        </g>
      ))}
    </g>
  </CoverShell>
);

export default MultiHeadAttentionCover;
