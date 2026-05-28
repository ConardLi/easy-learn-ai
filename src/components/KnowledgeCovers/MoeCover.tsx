/**
 * MoE 封面
 *
 * 隐喻：一个 token 进来 → router 决定路由 → N 个 expert 方块（2 个被点亮，其余暗）→ 输出
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：tok 圆，coral 描边，标签 "tok"
 *   - 中：router 长方块（butter），上下写 "router"
 *   - 右：4×4 expert 网格 16 块；2 块亮（coral），14 块暗
 *   - 连线：router → 2 个 active expert 用实线 + 流动 dash；其它用极淡虚线
 *   - 右上："top-2" 印章
 *   - 左下：DeepSeek 公式碎片装饰
 *
 * hover 行为：active expert 微缩放 + 颜色加深，连接线流动 dash 加速，token 微晃。
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 16 个 expert 的网格坐标（4×4） · 第 2 行第 1 个、第 3 行第 3 个 是 active */
const EXPERT_CELLS = (() => {
  const cells: { x: number; y: number; active: boolean }[] = [];
  const X0 = 192;
  const Y0 = 56;
  const STEP = 22;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const active = (r === 1 && c === 0) || (r === 2 && c === 3);
      cells.push({ x: X0 + c * STEP, y: Y0 + r * STEP, active });
    }
  }
  return cells;
})();

const ACTIVE_CELLS = EXPERT_CELLS.filter((c) => c.active);

const MoeCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-cream" dotOpacity={0.08}>
      {/* 左上装饰：activation 比例 stamp */}
      <g
        transform="translate(38,30) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-3"
      >
        <rect
          x="-26"
          y="-10"
          width="52"
          height="20"
          rx="4"
          fill="#FF4D74"
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
          5.5% 激活
        </text>
      </g>

      {/* 右上：top-2 印章 */}
      <g
        transform="translate(290,32) rotate(8)"
        className="origin-center transition-transform duration-500 group-hover:rotate-[-4deg] group-hover:scale-110"
      >
        <rect
          x="-22"
          y="-10"
          width="44"
          height="20"
          rx="10"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          top-2
        </text>
      </g>

      {/* 左下：公式碎片装饰 */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="76"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="35"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          y=Σ topK · E
        </text>
      </g>

      {/* 入口 token */}
      <g
        transform="translate(38,108)"
        className="origin-center transition-transform duration-500 group-hover:translate-x-1"
      >
        <circle r="16" fill="#241C15" opacity="0.12" />
        <circle r="11" fill="#241C15" stroke="#F4D35E" strokeWidth="2" />
        <text
          y="4"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="10"
          fontWeight="700"
          fill="#F4D35E"
        >
          tok
        </text>
      </g>

      {/* token → router 箭头 */}
      <g>
        <line
          x1="54"
          y1="108"
          x2="106"
          y2="108"
          stroke="#241C15"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <polygon points="106,104 114,108 106,112" fill="#241C15" />
      </g>

      {/* router 主体 */}
      <g transform="translate(140,108)">
        <rect
          x="-26"
          y="-22"
          width="52"
          height="44"
          rx="8"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          y="-4"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="10.5"
          fontWeight="800"
          fill="#241C15"
        >
          router
        </text>
        <text
          y="10"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
          opacity="0.65"
        >
          W·x
        </text>
        {/* 三个小通道线（视觉装饰：路由器内部 N 路输出） */}
        {[-9, 0, 9].map((yOff, i) => (
          <line
            key={i}
            x1="-18"
            y1={yOff}
            x2="18"
            y2={yOff}
            stroke="#241C15"
            strokeWidth="0.7"
            opacity="0.25"
            strokeDasharray="1.5 2"
          />
        ))}
      </g>

      {/* router → 所有 expert 的淡虚连线（背景） */}
      <g stroke="#241C15" strokeWidth="0.7" opacity="0.18" strokeDasharray="2 3">
        {EXPERT_CELLS.filter((c) => !c.active).map((c, i) => (
          <line key={`bg-${i}`} x1="166" y1="108" x2={c.x} y2={c.y} />
        ))}
      </g>

      {/* router → active expert 的实线 + 流动 dash */}
      <g
        stroke="#E07A5F"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="4 3"
        className="animate-dash-flow"
      >
        {ACTIVE_CELLS.map((c, i) => (
          <line key={`act-${i}`} x1="166" y1="108" x2={c.x} y2={c.y} />
        ))}
      </g>

      {/* 16 个 expert 方块 */}
      {EXPERT_CELLS.map((c, i) => (
        <g
          key={`exp-${i}`}
          transform={`translate(${c.x},${c.y})`}
          className={
            c.active
              ? "origin-center transition-transform duration-500 group-hover:scale-110"
              : ""
          }
        >
          <rect
            x="-8"
            y="-8"
            width="16"
            height="16"
            rx="3"
            fill={c.active ? "#E07A5F" : "#FBEFE3"}
            stroke="#241C15"
            strokeWidth={c.active ? 1.8 : 1.2}
            opacity={c.active ? 1 : 0.55}
          />
          {c.active && (
            <circle r="2.2" fill="#FBEFE3">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="1.6s"
                repeatCount="indefinite"
              />
            </circle>
          )}
        </g>
      ))}

      {/* 网格右下角小标签 */}
      <text
        x="278"
        y="142"
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        16 experts
      </text>

      {/* expert 网格 → tok-out 合并箭头 */}
      <g>
        <line
          x1="262"
          y1="108"
          x2="290"
          y2="108"
          stroke="#241C15"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <polygon points="288,104 296,108 288,112" fill="#241C15" />
      </g>

      {/* 出口 small dot · 表示 y 输出 */}
      <g transform="translate(304,108)">
        <circle r="5.5" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.5" />
      </g>

      {/* 左下：路由进度提示 */}
      <text
        x="160"
        y="180"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        token → router → top-K experts
      </text>
    </CoverShell>
  );
};

export default MoeCover;
