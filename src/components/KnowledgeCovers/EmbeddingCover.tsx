/**
 * Embedding 封面
 *
 * 隐喻：内容被放进一张语义地图，意思相近的点靠近；中间显示一小段向量数字。
 *
 * hover 行为：
 *   - 黄色 query 点向年假簇靠近
 *   - 最近邻连线稍微变短
 *   - 数字条上浮
 */
import React from "react";
import CoverShell from "./CoverShell";

const EmbeddingCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      <g stroke="#241C15" strokeWidth="0.45" opacity="0.06">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`v-${i}`} x1={36 + i * 25} y1="28" x2={36 + i * 25} y2="170" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h-${i}`} x1="34" y1={36 + i * 22} x2="286" y2={36 + i * 22} />
        ))}
      </g>

      <g transform="translate(48,34) rotate(-8)" className="origin-center transition-transform duration-500 group-hover:rotate-3">
        <rect x="-18" y="-10" width="72" height="24" rx="6" fill="#241C15" />
        <text
          x="18"
          y="5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="800"
          letterSpacing="1.4"
          fill="#F4D35E"
        >
          SEMANTIC MAP
        </text>
      </g>

      <Cluster cx={88} cy={86} fill="#F4D35E" />
      <Cluster cx={238} cy={92} fill="#E07A5F" />
      <Cluster cx={224} cy={142} fill="#1B4B5A" dark />

      <g className="transition-transform duration-500 ease-spring group-hover:translate-x-[-18px] group-hover:translate-y-[-8px]">
        <line x1="168" y1="124" x2="108" y2="92" stroke="#241C15" strokeWidth="1.7" strokeDasharray="4 5" opacity="0.45" />
        <line x1="168" y1="124" x2="82" y2="84" stroke="#241C15" strokeWidth="1.7" strokeDasharray="4 5" opacity="0.3" />
        <circle cx="168" cy="124" r="16" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
        <text
          x="168"
          y="128"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="800"
          fill="#241C15"
        >
          Q
        </text>
      </g>

      <g transform="translate(70,158)" className="transition-transform duration-500 ease-spring group-hover:-translate-y-2">
        <rect x="0" y="-19" width="180" height="38" rx="8" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        {["0.12", "-0.44", "0.87", "0.03"].map((value, index) => (
          <g key={value} transform={`translate(${14 + index * 42},0)`}>
            <rect x="0" y="-10" width="34" height="20" rx="4" fill={index === 2 ? "#E07A5F" : "#FBEFE3"} stroke="#241C15" strokeWidth="1.2" />
            <text
              x="17"
              y="4"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8"
              fontWeight="800"
              fill={index === 2 ? "#FBEFE3" : "#241C15"}
            >
              {value}
            </text>
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

const Cluster: React.FC<{ cx: number; cy: number; fill: string; dark?: boolean }> = ({ cx, cy, fill, dark }) => (
  <g>
    {[
      [0, 0],
      [18, 8],
      [-14, 10],
      [8, -16],
    ].map(([dx, dy], index) => (
      <circle
        key={index}
        cx={cx + dx}
        cy={cy + dy}
        r={index === 0 ? 8 : 6}
        fill={fill}
        stroke="#241C15"
        strokeWidth="1.8"
        opacity={dark ? 0.95 : 1}
      />
    ))}
  </g>
);

export default EmbeddingCover;
