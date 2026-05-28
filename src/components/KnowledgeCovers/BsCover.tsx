/**
 * Batch Size 封面
 *
 * 隐喻：N 个样本方块 → 各算各的梯度（小箭头）→ 漏斗求平均 → 一个大箭头 → θ 球往下挪一格。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 左：3×2 = 6 个 batch 样本方块（每个里画一个小斜线箭头表示该样本的梯度方向）
 *   - 中：6 条收束线汇到一个"平均"圆点，再射出一个大 coral 箭头
 *   - 右：θ 球（butter 色 + ink 描边），加一个虚线箭头表示"更新后位置"
 *   - 右上：「N=6」stamp
 *   - 左下：「∇̄ = ⅙ Σ ∇」mono 公式装饰
 *
 * hover：6 个样本盒微浮动、收束线流动 dash 加速、θ 球轻微落下。
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 6 个样本盒的位置（3 列 × 2 行） */
const SAMPLE_BOXES = [
  { x: 38, y: 60, grad: [3, -2] },
  { x: 68, y: 60, grad: [2, -3] },
  { x: 98, y: 60, grad: [4, -1] },
  { x: 38, y: 92, grad: [1, -3] },
  { x: 68, y: 92, grad: [3, -2] },
  { x: 98, y: 92, grad: [2, -3] },
];

const FUNNEL = { x: 152, y: 76 };

const BsCover: React.FC = () => {
  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 右上：N=6 stamp */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-26"
          y="-11"
          width="52"
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
          N=6
        </text>
      </g>

      {/* 左上小标签：batch */}
      <g transform="translate(67,32)">
        <rect
          x="-30"
          y="-9"
          width="60"
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
          fontSize="9"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#F4D35E"
        >
          1 batch
        </text>
      </g>

      {/* 左下：公式装饰 */}
      <g transform="translate(28,178) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="90"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="42"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          ∇̄ = (1/N) Σ ∇
        </text>
      </g>

      {/* 6 个样本盒 + 各自的小梯度箭头 */}
      {SAMPLE_BOXES.map((s, i) => (
        <g
          key={`s-${i}`}
          transform={`translate(${s.x},${s.y})`}
          className="origin-center transition-transform duration-500 group-hover:translate-y-[1px]"
        >
          <rect
            x="-10"
            y="-10"
            width="20"
            height="20"
            rx="3"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.6"
          />
          {/* 样本编号 */}
          <text
            y="-4"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="6.5"
            fill="#88837C"
          >
            x{i + 1}
          </text>
          {/* 小梯度箭头 */}
          <line
            x1="0"
            y1="1"
            x2={s.grad[0]}
            y2={s.grad[1] + 3}
            stroke="#E07A5F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx={s.grad[0]} cy={s.grad[1] + 3} r="1.3" fill="#E07A5F" />
        </g>
      ))}

      {/* 6 条收束线 -> 漏斗中心 */}
      <g
        stroke="#241C15"
        strokeWidth="0.9"
        strokeDasharray="2 3"
        opacity="0.45"
        className="transition-opacity duration-400 group-hover:opacity-80"
      >
        {SAMPLE_BOXES.map((s, i) => (
          <line key={`l-${i}`} x1={s.x + 10} y1={s.y} x2={FUNNEL.x - 8} y2={FUNNEL.y} />
        ))}
      </g>

      {/* 漏斗中心：平均圆点 */}
      <g transform={`translate(${FUNNEL.x},${FUNNEL.y})`}>
        <circle r="9" fill="#1B4B5A" stroke="#241C15" strokeWidth="1.8" />
        <text
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          fill="#FBEFE3"
        >
          ∇̄
        </text>
      </g>

      {/* 大梯度箭头：漏斗 -> θ 球 */}
      <g>
        <line
          x1={FUNNEL.x + 9}
          y1={FUNNEL.y}
          x2="240"
          y2="105"
          stroke="#241C15"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <polygon points="240,100 248,105 240,110" fill="#241C15" />
      </g>

      {/* θ 球（参数）+ 更新前后两个位置 */}
      <g>
        {/* 原 θ（淡色 ring） */}
        <circle
          cx="262"
          cy="105"
          r="10"
          fill="#FBEFE3"
          stroke="#241C15"
          strokeWidth="1.8"
          opacity="0.65"
        />
        <text
          x="262"
          y="108"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fill="#241C15"
          opacity="0.7"
        >
          θ
        </text>
        {/* 新 θ（实心 butter）—— 沿 ∇̄ 方向往下挪 */}
        <line
          x1="262"
          y1="115"
          x2="272"
          y2="138"
          stroke="#241C15"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity="0.5"
        />
        <g
          transform="translate(272,138)"
          className="origin-center transition-transform duration-500 group-hover:translate-y-1"
        >
          <circle r="11" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
          <text
            y="3.5"
            textAnchor="middle"
            fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
            fontSize="11"
            fontWeight="800"
            fill="#241C15"
          >
            θ′
          </text>
        </g>
      </g>

      {/* 底部小流水标签 */}
      <text
        x="160"
        y="166"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        N samples → ∇̄ → one step
      </text>
    </CoverShell>
  );
};

export default BsCover;
