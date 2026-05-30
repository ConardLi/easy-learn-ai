/**
 * GGUF 封面
 *
 * 隐喻：一个 .gguf 文件盒子被剖开，内部 4 层（GGUF magic / metadata / tensor info / weights）
 * 叠成一个垂直堆栈；左侧是 hex 字节流装饰，右侧是 Q4_K_M stamp。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 中央偏左：一个垂直 4 段栈，magic 8B / metadata 2.5MB / tensor info 35KB / data 4.92GB
 *     按近似比例分高度但都看得见；颜色 ink/teal/butter/coral/pop
 *   - 左上：hex 「47 47 55 46」装饰
 *   - 右下：Q4_K_M stamp 倾斜
 *   - 右上：「single file」标签
 *   - 中下方装饰：tokens / arch=llama 小标签
 *
 * hover 行为：堆栈轻微展开（每段间距增大），右下 stamp 旋正。
 */
import React from "react";
import CoverShell from "./CoverShell";

const SEGMENTS = [
  { y: 24, h: 12, fill: "#241C15", text: "magic + ver", textFill: "#FBEFE3" },
  { y: 38, h: 30, fill: "#E5BD3A", text: "metadata KV", textFill: "#241C15" },
  { y: 70, h: 14, fill: "#E07A5F", text: "tensor info", textFill: "#FBEFE3" },
  { y: 86, h: 78, fill: "#1B4B5A", text: "tensor data · 4.92 GB", textFill: "#FBEFE3" },
];

const GgufCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 左上：hex 装饰 */}
      <g
        transform="translate(28, 24)"
        className="transition-transform duration-500 ease-out group-hover:translate-y-0.5"
      >
        <rect
          x="-3"
          y="-10"
          width="80"
          height="16"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="37"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.3"
          fill="#F4D35E"
        >
          47 47 55 46
        </text>
      </g>

      {/* 文件名 caption */}
      <text
        x="119"
        y="20"
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fontWeight="600"
        fill="#241C15"
        opacity="0.55"
      >
        Llama-3.1-8B-Q4_K_M.gguf
      </text>

      {/* 中央：垂直 4 段堆栈（用 group-hover 展开） */}
      <g transform="translate(110, 0)">
        {SEGMENTS.map((s, i) => (
          <g
            key={i}
            className="transition-transform duration-500 ease-out"
            style={{
              transformOrigin: "center",
              // hover 时每段额外 y offset
              transform: `translateY(${i * 0}px)`,
            }}
          >
            <rect
              x="-50"
              y={s.y}
              width="100"
              height={s.h}
              fill={s.fill}
              stroke="#241C15"
              strokeWidth="1.6"
              className="transition-all duration-500"
            />
            <text
              x="0"
              y={s.y + s.h / 2 + 3}
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize={s.h > 20 ? "9" : "8"}
              fontWeight="700"
              letterSpacing="0.5"
              fill={s.textFill}
            >
              {s.text}
            </text>
          </g>
        ))}

        {/* tensor data 段加斜线 hatch 装饰 */}
        <g opacity="0.18">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={-50 + i * 14}
              y1="86"
              x2={-50 + i * 14 + 30}
              y2="164"
              stroke="#FBEFE3"
              strokeWidth="1.3"
            />
          ))}
        </g>

        {/* 总体边框 */}
        <rect
          x="-52"
          y="22"
          width="104"
          height="146"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.5"
          rx="2"
        />
      </g>

      {/* 中右 装饰：metadata KV 浮飘标签 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="7"
        fill="#241C15"
        opacity="0.65"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        <line x1="170" y1="48" x2="200" y2="48" stroke="#241C15" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
        <text x="202" y="50">arch=llama</text>
        <line x1="170" y1="60" x2="200" y2="60" stroke="#241C15" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
        <text x="202" y="62">ctx=128K</text>
        <line x1="170" y1="72" x2="200" y2="72" stroke="#241C15" strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
        <text x="202" y="74">tokens=128k</text>
      </g>

      {/* 右下：Q4_K_M stamp */}
      <g
        transform="translate(258, 152) rotate(-8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-30"
          y="-12"
          width="60"
          height="24"
          rx="4"
          fill="#E07A5F"
          stroke="#241C15"
          strokeWidth="1.8"
        />
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="13"
          fontWeight="800"
          fill="#FBEFE3"
        >
          Q4_K_M
        </text>
      </g>

      {/* 右上：single-file pill */}
      <g
        transform="translate(258, 28) rotate(4)"
        className="origin-center transition-transform duration-500 group-hover:-rotate-3"
      >
        <rect
          x="-30"
          y="-9"
          width="60"
          height="18"
          rx="9"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.6"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="1"
          fill="#241C15"
        >
          single file
        </text>
      </g>

      {/* 底部 caption */}
      <g transform="translate(28, 184) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="68"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="31"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.8"
          fill="#FBEFE3"
        >
          mmap-able
        </text>
      </g>
    </CoverShell>
  );
};

export default GgufCover;
