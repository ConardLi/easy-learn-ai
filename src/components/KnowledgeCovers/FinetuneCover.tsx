/**
 * Finetune 封面
 *
 * 隐喻：base 大方块「W」一动不动，旁边并联一对细矩阵「B」×「A」 —— 就是 LoRA 的几何核心。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央偏左：W 大方块（深 ink）+ 「冻」stamp
 *   - 中央偏右：+ 号 → B（细高方块 coral）× A（细扁方块 teal）→ butter outline 圈住整组
 *   - 上方装饰：三个浮动 chip「LoRA · QLoRA · DoRA」
 *   - 右上：「↓99.6%」参数减少 stamp
 *   - 底：rank=8 mono 注脚
 *
 * hover：B、A 微微向外推（说明可拆解），W 不动 + chip 顺序错位。
 */
import React from "react";
import CoverShell from "./CoverShell";

const FinetuneCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter-soft" dotOpacity={0.08}>
      {/* 上方装饰：3 个方法 chip 横排 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fontWeight="700"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        {[
          { x: 30, label: "LoRA", fill: "#241C15", textFill: "#F4D35E" },
          { x: 82, label: "QLoRA", fill: "#FBEFE3", textFill: "#241C15" },
          { x: 138, label: "DoRA", fill: "#E07A5F", textFill: "#FBEFE3" },
        ].map((c) => (
          <g key={c.label} transform={`translate(${c.x},22)`}>
            <rect
              x="-2"
              y="-9"
              width={c.label.length * 7 + 8}
              height="16"
              rx="8"
              fill={c.fill}
              stroke="#241C15"
              strokeWidth="1.5"
            />
            <text
              x={(c.label.length * 7) / 2 + 2}
              y="2"
              textAnchor="middle"
              fill={c.textFill}
            >
              {c.label}
            </text>
          </g>
        ))}
      </g>

      {/* 右上：参数压缩 stamp */}
      <g
        transform="translate(280,30) rotate(-10)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
          fill="#1B4B5A"
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
          ↓99.6%
        </text>
      </g>

      {/* === 中央主图：W + B × A === */}
      {/* W 大方块 · base 冻结 */}
      <g
        transform="translate(80,108)"
        className="transition-transform duration-500"
      >
        <rect
          x="-32"
          y="-32"
          width="64"
          height="64"
          rx="5"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        {/* 网格底纹 */}
        <g stroke="#FBEFE3" strokeWidth="0.6" opacity="0.25">
          {[-20, -8, 4, 16].map((v) => (
            <g key={`grid-${v}`}>
              <line x1="-32" y1={v} x2="32" y2={v} />
              <line x1={v} y1="-32" x2={v} y2="32" />
            </g>
          ))}
        </g>
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="24"
          fontWeight="800"
          fill="#FBEFE3"
        >
          W
        </text>
        {/* 冻 stamp */}
        <g transform="translate(28,-28) rotate(8)">
          <rect
            x="-10"
            y="-7"
            width="20"
            height="14"
            rx="3"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="9"
            fontWeight="800"
            fill="#241C15"
          >
            冻
          </text>
        </g>
      </g>

      {/* + 号 */}
      <text
        x="138"
        y="115"
        textAnchor="middle"
        fontFamily="Smiley Sans, sans-serif"
        fontSize="22"
        fontWeight="800"
        fill="#241C15"
        opacity="0.5"
      >
        +
      </text>

      {/* LoRA 旁路：butter outline 大圈住 B × A */}
      <g
        className="transition-transform duration-500 ease-out group-hover:translate-x-1"
      >
        {/* 外圈 */}
        <rect
          x="156"
          y="76"
          width="124"
          height="64"
          rx="14"
          fill="#FBE891"
          stroke="#241C15"
          strokeWidth="2"
          opacity="0.4"
        />
        <text
          x="218"
          y="74"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          fill="#241C15"
          letterSpacing="1.4"
        >
          LoRA · 训这里
        </text>

        {/* B 矩阵：细高 coral */}
        <g
          transform="translate(178,108)"
          className="transition-transform duration-500 ease-out group-hover:-translate-x-1"
        >
          <rect
            x="-9"
            y="-26"
            width="18"
            height="52"
            rx="3"
            fill="#E07A5F"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <g stroke="#FBEFE3" strokeWidth="0.5" opacity="0.5">
            {[-14, -2, 10].map((v) => (
              <line key={v} x1="-9" y1={v} x2="9" y2={v} />
            ))}
          </g>
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FBEFE3"
          >
            B
          </text>
          <text
            x="0"
            y="38"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fill="#241C15"
            opacity="0.7"
          >
            d×r
          </text>
        </g>

        {/* × 号 */}
        <text
          x="208"
          y="113"
          textAnchor="middle"
          fontFamily="Smiley Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#241C15"
          opacity="0.55"
        >
          ×
        </text>

        {/* A 矩阵：细扁 teal */}
        <g
          transform="translate(244,108)"
          className="transition-transform duration-500 ease-out group-hover:translate-x-1"
        >
          <rect
            x="-26"
            y="-9"
            width="52"
            height="18"
            rx="3"
            fill="#1B4B5A"
            stroke="#241C15"
            strokeWidth="1.8"
          />
          <g stroke="#FBEFE3" strokeWidth="0.5" opacity="0.5">
            {[-14, -2, 10].map((v) => (
              <line key={v} x1={v} y1="-9" x2={v} y2="9" />
            ))}
          </g>
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="Smiley Sans, sans-serif"
            fontSize="14"
            fontWeight="800"
            fill="#FBEFE3"
          >
            A
          </text>
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="7"
            fill="#241C15"
            opacity="0.7"
          >
            r×d
          </text>
        </g>
      </g>

      {/* 底部 mono 注脚 */}
      <g transform="translate(160,176)">
        <rect
          x="-58"
          y="-9"
          width="116"
          height="16"
          rx="8"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="2.5"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.4"
          fill="#F4D35E"
        >
          r = 8 · 训 0.4%
        </text>
      </g>
    </CoverShell>
  );
};

export default FinetuneCover;
