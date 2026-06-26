/**
 * ONNX 封面
 *
 * 隐喻：一张计算图（节点 + 连线），从一个框架导出，能在多个运行环境原样跑。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央：一条计算图 input → MatMul → Relu → output（圆节点 + 箭头连线）
 *   - 右上：.onnx stamp
 *   - 底部：三个运行环境徽章（CPU / GPU / NPU），表示「到处都能跑」
 */
import React from "react";
import CoverShell from "./CoverShell";

const NODES = [
  { x: 50, label: "in", fill: "#FBEFE3" },
  { x: 120, label: "×", fill: "#FF4D74" },
  { x: 190, label: "+", fill: "#FF4D74" },
  { x: 260, label: "out", fill: "#F4D35E" },
];

const OnnxCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-pop/10" dotOpacity={0.07}>
      {/* 计算图连线 */}
      <g stroke="#241C15" strokeWidth="2" fill="none" className="transition-opacity duration-500">
        <line x1="64" y1="80" x2="106" y2="80" />
        <line x1="134" y1="80" x2="176" y2="80" />
        <line x1="204" y1="80" x2="246" y2="80" />
      </g>
      {/* 箭头小三角 */}
      <g fill="#241C15">
        <polygon points="106,76 106,84 113,80" />
        <polygon points="176,76 176,84 183,80" />
        <polygon points="246,76 246,84 253,80" />
      </g>

      {/* 节点 */}
      {NODES.map((n, i) => (
        <g key={i} transform={`translate(${n.x},80)`} className="origin-center transition-transform duration-500 group-hover:scale-110">
          <circle r="14" fill={n.fill} stroke="#241C15" strokeWidth="2.4" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#241C15"
          >
            {n.label}
          </text>
        </g>
      ))}

      {/* 右上：.onnx stamp */}
      <g transform="translate(280,30) rotate(-8)" className="origin-center transition-transform duration-500 group-hover:rotate-0">
        <rect x="-26" y="-12" width="52" height="24" rx="5" fill="#FF4D74" stroke="#241C15" strokeWidth="1.8" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          fill="#FBEFE3"
        >
          .onnx
        </text>
      </g>

      {/* 底部：三个运行环境徽章 */}
      <g transform="translate(0,150)">
        {[
          { x: 80, label: "CPU" },
          { x: 160, label: "GPU" },
          { x: 240, label: "NPU" },
        ].map((b, i) => (
          <g key={i} transform={`translate(${b.x},0)`}>
            <rect x="-26" y="-12" width="52" height="24" rx="12" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
            <text
              x="0"
              y="4"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="9.5"
              fontWeight="700"
              fill="#241C15"
            >
              {b.label}
            </text>
            {/* 从 output 节点引到各环境的虚线 */}
            <line x1="0" y1="-12" x2={260 - b.x} y2="-58" stroke="#241C15" strokeWidth="1" strokeDasharray="2 3" opacity="0.3" />
          </g>
        ))}
      </g>
    </CoverShell>
  );
};

export default OnnxCover;
