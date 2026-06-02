/**
 * Chain of Thought 封面
 *
 * 隐喻：思维链 = 一串相连的推理步骤（题 → 1 → 2 → 答），一块接一块推到答案；
 *       上方淡淡画一个「直接一跳到答案」的弧线做对比（带 ✕），衬出「拆步骤推理」更稳。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 上行：题点 → 大跨度虚线弧（一跳）→ 答块（✕），整体压暗
 *   - 主行：4 个 pop 紫圆角块用链接箭头串起来，末块 butter 底 + ✓
 *
 * hover 行为：主链各节点错峰轻轻上浮 + 末块的 ✓ 弹一下；上方「一跳」弧线整体下沉变淡。
 * 配色只用 token；描边统一 #241C15。
 */
import React from "react";
import CoverShell from "./CoverShell";

const ChainOfThoughtCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.07}>
      {/* ── 上行：直接一跳（对比，压暗）── */}
      <g opacity="0.4" className="transition-transform duration-500 ease-spring group-hover:translate-y-1">
        {/* 题点 */}
        <circle cx="46" cy="52" r="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="2" />
        {/* 一跳弧线 */}
        <path
          d="M 58 50 Q 165 6 262 48"
          fill="none"
          stroke="#241C15"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path d="M 254 42 L 264 49 L 253 53" fill="none" stroke="#241C15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* 答块 + ✕ */}
        <g transform="translate(284,52)">
          <rect x="-16" y="-13" width="32" height="26" rx="7" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
          <path d="M -5 -5 L 5 5 M 5 -5 L -5 5" stroke="#FF4D74" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        <text
          x="150"
          y="22"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
          fontSize="10"
          fontWeight="700"
          fill="#241C15"
        >
          直接答
        </text>
      </g>

      {/* ── 主行：推理链 ── */}
      {/* 链接箭头（先画，压在节点下） */}
      {[
        [70, 130],
        [148, 208],
        [226, 286],
      ].map(([x1, x2], i) => (
        <g key={i}>
          <line x1={x1} y1="128" x2={x2 - 4} y2="128" stroke="#241C15" strokeWidth="2.5" strokeLinecap="round" />
          <path
            d={`M ${x2 - 9} 123 L ${x2 - 1} 128 L ${x2 - 9} 133`}
            fill="none"
            stroke="#241C15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      ))}

      <ChainNode cx={44} label="题" tone="q" delay={0} />
      <ChainNode cx={122} label="1" tone="step" delay={90} />
      <ChainNode cx={200} label="2" tone="step" delay={180} />
      <ChainNode cx={278} label="答" tone="answer" delay={270} check />

      {/* 主行标签 */}
      <text
        x="160"
        y="178"
        textAnchor="middle"
        fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
        fontSize="11"
        fontWeight="800"
        fill="#241C15"
      >
        先想再答 · 一步步推
      </text>
    </CoverShell>
  );
};

const ChainNode: React.FC<{
  cx: number;
  label: string;
  tone: "q" | "step" | "answer";
  delay: number;
  check?: boolean;
}> = ({ cx, label, tone, delay, check }) => {
  const fill = tone === "q" ? "#1B4B5A" : tone === "answer" ? "#F4D35E" : "#7A28CB";
  const fg = tone === "answer" ? "#241C15" : "#FBEFE3";
  return (
    <g transform={`translate(${cx},128)`}>
      <g
        className="transition-transform duration-500 ease-spring group-hover:-translate-y-1.5"
        style={{ transitionDelay: `${delay}ms`, transformBox: "fill-box", transformOrigin: "center" }}
      >
        {/* 阴影 */}
        <rect x="-22" y="-19" width="44" height="38" rx="9" fill="#241C15" transform="translate(2.5,2.5)" opacity="0.9" />
        {/* 主体 */}
        <rect x="-22" y="-19" width="44" height="38" rx="9" fill={fill} stroke="#241C15" strokeWidth="2.5" />
        <text
          x="0"
          y={check ? -2 : 5}
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif"
          fontSize="15"
          fontWeight="800"
          fill={fg}
        >
          {label}
        </text>
        {check && (
          <g transform="translate(0,9)" className="origin-center transition-transform duration-300 ease-spring group-hover:scale-125" style={{ transformBox: "fill-box" }}>
            <path d="M -5 0 L -1.5 3.5 L 5 -4" fill="none" stroke="#241C15" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </g>
  );
};

export default ChainOfThoughtCover;
