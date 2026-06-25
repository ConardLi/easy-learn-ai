import React from "react";
import CoverShell from "./CoverShell";

const nodes = [
  { x: 62, y: 62, label: "人", fill: "#F4D35E" },
  { x: 162, y: 48, label: "公司", fill: "#E07A5F" },
  { x: 246, y: 91, label: "项目", fill: "#F4D35E" },
  { x: 110, y: 145, label: "城市", fill: "#1B4B5A" },
  { x: 222, y: 153, label: "产品", fill: "#7A28CB" },
];

const KnowledgeGraphCover: React.FC = () => (
  <CoverShell bgClassName="bg-butter-tint" dotOpacity={0.1}>
    <g className="transition-transform duration-500 ease-spring group-hover:scale-[1.04]" style={{ transformOrigin: "160px 100px" }}>
      {[[0, 1], [0, 3], [1, 2], [1, 3], [2, 4], [3, 4]].map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#241C15" strokeWidth="2.4" />
      ))}
      {nodes.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="25" fill={node.fill} stroke="#241C15" strokeWidth="2.5" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="11" fontWeight="800" fill={node.fill === "#1B4B5A" || node.fill === "#7A28CB" || node.fill === "#E07A5F" ? "#FBEFE3" : "#241C15"}>{node.label}</text>
        </g>
      ))}
    </g>
    <text x="160" y="190" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" letterSpacing="3" fontWeight="700" fill="#241C15" opacity="0.48">ENTITY · RELATION · FACT</text>
  </CoverShell>
);

export default KnowledgeGraphCover;
