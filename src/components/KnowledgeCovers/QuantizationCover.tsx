/**
 * Quantization 封面
 *
 * 隐喻：数轴被切成 N 段，连续权重值"塌缩"到段中心。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 上方：4 个漂浮的 FP32 数字（0.847 / -0.123 / 0.345 / -0.901）
 *   - 中央：数轴 + 5 个 dashed bin 边界 + 6 个 bin 中心 marker
 *   - 数轴上：8 个散点，原始位置（淡色 ring）+ 量化位置（实心 coral）+ 连线
 *   - 右上："↓4×" 压缩 stamp
 *   - 左下："01 11 00" 二进制装饰
 *
 * hover 行为：散点"吸附"动画（位移变化），bin 边界变实，数字微微落下。
 */
import React from "react";
import CoverShell from "./CoverShell";

const BIN_EDGES = [60, 105, 150, 195, 240]; // 5 个分隔线 → 6 个 bin
const BIN_CENTERS = [40, 82, 127, 172, 217, 262]; // 各 bin 的中心 x

/** 8 个原始权重值 + 它们的 bin index */
const POINTS = [
  { x: 48, bin: 0, label: "0.847" },
  { x: 76, bin: 1, label: "−0.12" },
  { x: 115, bin: 2, label: "0.000" },
  { x: 134, bin: 2, label: "−0.57" },
  { x: 168, bin: 3, label: "1.23" },
  { x: 195, bin: 4, label: "−0.79" },
  { x: 228, bin: 4, label: "0.346" },
  { x: 270, bin: 5, label: "−0.90" },
];

const QuantizationCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 上方装饰：漂浮的 FP32 数字 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#241C15"
        opacity="0.45"
        className="transition-transform duration-500 ease-out group-hover:translate-y-1"
      >
        <text x="38" y="34">0.847291</text>
        <text x="115" y="28">−0.123456</text>
        <text x="195" y="34">0.345678</text>
        <text x="262" y="28">−0.901234</text>
      </g>

      {/* 上方装饰：3 个箭头从数字指向数轴 */}
      <g stroke="#241C15" strokeWidth="0.8" opacity="0.25" fill="none">
        <path d="M 60 40 Q 60 65 60 115" strokeDasharray="2 3" />
        <path d="M 140 36 Q 140 70 140 115" strokeDasharray="2 3" />
        <path d="M 220 40 Q 220 65 220 115" strokeDasharray="2 3" />
      </g>

      {/* 右上：压缩 stamp */}
      <g
        transform="translate(285,28) rotate(-8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-11"
          width="44"
          height="22"
          rx="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#FBEFE3"
        >
          ↓4×
        </text>
      </g>

      {/* 左下：二进制装饰 */}
      <g transform="translate(28,178) rotate(-4)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="58"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="26"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#FBEFE3"
        >
          01 11 00
        </text>
      </g>

      {/* 数轴主线 */}
      <line
        x1="30"
        y1="135"
        x2="290"
        y2="135"
        stroke="#241C15"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* 数轴端点刻度 */}
      <g stroke="#241C15" strokeWidth="1.6" strokeLinecap="round">
        <line x1="30" y1="130" x2="30" y2="140" />
        <line x1="290" y1="130" x2="290" y2="140" />
      </g>

      {/* bin 边界（dashed → 实线 on hover） */}
      <g
        stroke="#241C15"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        opacity="0.4"
        className="transition-opacity duration-400 group-hover:opacity-80"
      >
        {BIN_EDGES.map((x, i) => (
          <line key={`edge-${i}`} x1={x} y1="115" x2={x} y2="155" />
        ))}
      </g>

      {/* bin 中心 marker（数轴下方小三角） */}
      {BIN_CENTERS.map((x, i) => (
        <g key={`center-${i}`} transform={`translate(${x},135)`}>
          <line x1="0" y1="0" x2="0" y2="10" stroke="#241C15" strokeWidth="2" />
          <polygon points="-3,12 3,12 0,17" fill="#241C15" />
        </g>
      ))}

      {/* 散点：原始位置 → 量化位置（hover 时收紧吸附） */}
      {POINTS.map((p, i) => {
        const targetX = BIN_CENTERS[p.bin];
        const y = 80 + (i % 4) * 8;
        const moved = Math.abs(p.x - targetX) > 1;
        return (
          <g key={`pt-${i}`} className="transition-transform duration-500 ease-out">
            {/* 连线 */}
            {moved && (
              <line
                x1={p.x}
                y1={y + 30}
                x2={targetX}
                y2="135"
                stroke="#E07A5F"
                strokeWidth="0.8"
                strokeDasharray="2 2"
                opacity="0.5"
              />
            )}
            {/* 原始位置 · 淡 ring */}
            <circle
              cx={p.x}
              cy={y + 30}
              r="3.2"
              fill="#FBEFE3"
              stroke="#241C15"
              strokeWidth="1.2"
              opacity="0.7"
              className="transition-opacity duration-300 group-hover:opacity-30"
            />
            {/* 量化后位置 · 实心 coral，hover 后从 (px,y+30) "落"到 (targetX, 135) */}
            <circle
              cx={p.x}
              cy={y + 30}
              r="3.6"
              fill="#E07A5F"
              stroke="#241C15"
              strokeWidth="1.4"
              className="transition-all duration-500 ease-out"
              style={{
                transform: "translate(0,0)",
                transformOrigin: `${p.x}px ${y + 30}px`,
              }}
              transform={`translate(${targetX - p.x}, ${125 - (y + 30)})`}
            />
          </g>
        );
      })}

      {/* bin 标签 4-bit */}
      <g transform="translate(160,178)">
        <rect
          x="-26"
          y="-9"
          width="52"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.2"
          fill="#F4D35E"
        >
          4-bit
        </text>
      </g>
    </CoverShell>
  );
};

export default QuantizationCover;
