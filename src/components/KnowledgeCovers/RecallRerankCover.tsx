import React from "react";
import CoverShell from "./CoverShell";

const RecallRerankCover: React.FC = () => {
  const incoming = [
    { y: 44, fill: "#FFFFFF", label: "A", score: "72" },
    { y: 70, fill: "#F4D35E", label: "B", score: "91" },
    { y: 96, fill: "#FFFFFF", label: "C", score: "66" },
    { y: 122, fill: "#E07A5F", label: "D", score: "84" },
  ];

  const ranked = [
    { y: 48, fill: "#F4D35E", label: "#1" },
    { y: 86, fill: "#1B4B5A", label: "#2" },
    { y: 124, fill: "#FFFFFF", label: "#3" },
  ];

  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      <path
        d="M 124 70 C 146 70 150 90 172 90"
        stroke="#241C15"
        strokeWidth="2.2"
        fill="none"
        strokeDasharray="5 6"
        opacity="0.6"
      />
      <path
        d="M 124 134 C 146 134 150 108 172 108"
        stroke="#241C15"
        strokeWidth="2.2"
        fill="none"
        strokeDasharray="5 6"
        opacity="0.6"
      />

      <g className="transition-transform duration-500 ease-spring group-hover:-translate-x-1">
        <rect x="28" y="28" width="100" height="140" rx="18" fill="#FFFFFF" stroke="#241C15" strokeWidth="2.5" />
        <text x="78" y="25" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill="#241C15" opacity="0.58">
          RECALL
        </text>
        {incoming.map((item) => (
          <g key={item.label} transform={`translate(42 ${item.y})`}>
            <rect width="72" height="20" rx="6" fill={item.fill} stroke="#241C15" strokeWidth="1.8" />
            <text x="10" y="14" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="900" fill={item.fill === "#E07A5F" ? "#FBEFE3" : "#241C15"}>
              {item.label}
            </text>
            <text x="58" y="14" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill={item.fill === "#E07A5F" ? "#FBEFE3" : "#241C15"} opacity="0.72">
              {item.score}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(162 74)" className="transition-transform duration-500 ease-spring group-hover:rotate-3">
        <rect x="-8" y="-12" width="54" height="58" rx="14" fill="#E07A5F" stroke="#241C15" strokeWidth="2.5" />
        <path d="M7 6h24M7 18h20M7 30h14" stroke="#FBEFE3" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M38 39 L50 48" stroke="#241C15" strokeWidth="5" strokeLinecap="round" />
        <circle cx="28" cy="26" r="17" fill="#FBEFE3" stroke="#241C15" strokeWidth="2.4" opacity="0.96" />
        <path d="M19 26h18M28 17v18" stroke="#1B4B5A" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      <g className="transition-transform duration-500 ease-spring group-hover:translate-x-1">
        <rect x="218" y="28" width="74" height="140" rx="18" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
        <text x="255" y="25" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fontWeight="800" fill="#241C15" opacity="0.58">
          RERANK
        </text>
        {ranked.map((item, index) => (
          <g
            key={item.label}
            transform={`translate(231 ${item.y})`}
            className="transition-transform duration-500 ease-spring group-hover:-translate-y-1"
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <rect width="48" height="28" rx="8" fill={item.fill} stroke="#241C15" strokeWidth="2" />
            <text x="24" y="18" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="900" fill={item.fill === "#1B4B5A" ? "#FBEFE3" : "#241C15"}>
              {item.label}
            </text>
          </g>
        ))}
      </g>

      <text x="160" y="188" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="8" fontWeight="800" letterSpacing="2" fill="#241C15" opacity="0.45">
        CANDIDATES  →  BEST EVIDENCE
      </text>
    </CoverShell>
  );
};

export default RecallRerankCover;
