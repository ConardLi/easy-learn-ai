/**
 * Learning Rate 封面
 *
 * 隐喻：参数空间的步长 ── 同一坡上 3 个 θ 球往最低点跳，箭头长度 = lr。
 *   小 lr 球：步小，离最低点很远还在挣扎
 *   适中 lr 球：刚好踩到谷底
 *   大 lr 球：步大到弹出对面墙，loss 反弹
 *
 * 视觉构图（viewBox 320×200）：
 *   ─ 中间一条 bowl 抛物线（teal 实线），代表 loss 山坡
 *   ─ 左：小 lr 链（短箭头 ×3，停在半山腰）
 *   ─ 中：适中 lr 链（中箭头 ×2，停在谷底）
 *   ─ 右：大 lr 链（长箭头 ×1，弹到对面更高处 + NaN 警示 stamp）
 *   ─ 右上：「lr」butter stamp
 *   ─ 左下：「θ ← θ − lr·∇L」公式装饰条
 *   ─ 顶部：3 行小标签 small / ok / big
 */
import React from "react";
import CoverShell from "./CoverShell";

/* bowl 抛物线 L(θ) = (θ−2)² 缩放到 SVG 坐标 */
function lossY(theta: number): number {
  /* loss ∈ [0..18] → y ∈ [148..40]（loss 越大 y 越小） */
  const l = Math.min(18, (theta - 2) * (theta - 2));
  return 148 - (l / 18) * 108;
}
function thetaX(theta: number): number {
  /* theta ∈ [-4..8] → x ∈ [42..278] */
  return 42 + ((theta + 4) / 12) * 236;
}

function bowlPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 80; i++) {
    const t = -4 + (i / 80) * 12;
    pts.push(`${thetaX(t).toFixed(1)} ${lossY(t).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const LrCover: React.FC = () => {
  /* 三组小球轨迹 */
  /* small lr=0.05：从 -3 出发 4 步还远 */
  const smallTrail = simulate(-3, 0.05, 4);
  /* ok lr=0.4：从 -3 出发 4 步到 2 附近 */
  const okTrail = simulate(-3, 0.4, 4);
  /* big lr=1.05：从 -3 出发 2 步弹到对面 */
  const bigTrail = simulate(-3, 1.05, 2);

  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 右上：lr stamp */}
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
          lr
        </text>
      </g>

      {/* 左上：标题条 */}
      <g transform="translate(70,30)">
        <rect
          x="-3"
          y="-9"
          width="118"
          height="16"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="56"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          fill="#F4D35E"
        >
          step size matters
        </text>
      </g>

      {/* 左下：公式装饰 */}
      <g transform="translate(28,182) rotate(-3)" className="origin-left">
        <rect
          x="-3"
          y="-9"
          width="100"
          height="14"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="47"
          y="1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="8.5"
          fontWeight="700"
          letterSpacing="0.5"
          fill="#FBEFE3"
        >
          θ ← θ − lr · ∇L
        </text>
      </g>

      {/* 主 loss 山坡 */}
      <path
        d={bowlPath()}
        fill="none"
        stroke="#1B4B5A"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 谷底 marker */}
      <line x1={thetaX(2)} y1={lossY(2) - 5} x2={thetaX(2)} y2="156" stroke="#241C15" strokeWidth="0.9" strokeDasharray="2 2" opacity="0.5" />
      <text
        x={thetaX(2)}
        y="166"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8"
        fill="#88837C"
      >
        θ*
      </text>

      {/* small lr 轨迹（深灰 短箭头） */}
      <BallTrail trail={smallTrail} color="#88837C" tagColor="#88837C" tag="lr 小" tagY={32} groupClass="" />

      {/* ok lr 轨迹（butter 实色） */}
      <BallTrail trail={okTrail} color="#241C15" tagColor="#241C15" tag="lr 刚好" tagY={48} groupClass="origin-center transition-transform duration-500 group-hover:scale-110" />

      {/* big lr 轨迹（coral · 弹到对面） */}
      <BallTrail trail={bigTrail} color="#E07A5F" tagColor="#E07A5F" tag="lr 大" tagY={64} groupClass="" />

      {/* big 末尾 NaN 警示 */}
      {bigTrail.length > 0 && (() => {
        const last = bigTrail[bigTrail.length - 1];
        return (
          <g
            transform={`translate(${thetaX(last).toFixed(1)},${(lossY(last) - 14).toFixed(1)}) rotate(8)`}
            className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
          >
            <rect
              x="-16"
              y="-7"
              width="32"
              height="14"
              rx="3"
              fill="#FF4D74"
              stroke="#241C15"
              strokeWidth="1.4"
            />
            <text
              x="0"
              y="3"
              textAnchor="middle"
              fontFamily="Geist Mono, monospace"
              fontSize="8.5"
              fontWeight="800"
              fill="#FBEFE3"
            >
              NaN
            </text>
          </g>
        );
      })()}
    </CoverShell>
  );
};

/* ── 模拟梯度下降 · L(θ) = (θ−2)² · 返回 θ 序列 ──────────────────────────── */
function simulate(theta0: number, lr: number, steps: number): number[] {
  const arr: number[] = [theta0];
  let t = theta0;
  for (let i = 0; i < steps; i++) {
    const g = 2 * (t - 2);
    t = t - lr * g;
    arr.push(t);
  }
  return arr;
}

/* ── 轨迹 + 球 ───────────────────────────────────────────────────────────── */
const BallTrail: React.FC<{
  trail: number[];
  color: string;
  tag: string;
  tagY: number;
  tagColor: string;
  groupClass: string;
}> = ({ trail, color, tag, tagY, tagColor, groupClass }) => {
  return (
    <g className={groupClass}>
      {/* 步与步之间的箭头线 */}
      {trail.slice(1).map((t, i) => {
        const prev = trail[i];
        return (
          <line
            key={`arrow-${i}`}
            x1={thetaX(prev)}
            y1={lossY(prev)}
            x2={thetaX(t)}
            y2={lossY(t)}
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity={0.55}
            strokeDasharray="2 2"
          />
        );
      })}

      {/* 中间步小点 */}
      {trail.slice(0, -1).map((t, i) => (
        <circle
          key={`mid-${i}`}
          cx={thetaX(t)}
          cy={lossY(t)}
          r="2.2"
          fill="#FBEFE3"
          stroke={color}
          strokeWidth="1.2"
        />
      ))}

      {/* 终点大球 */}
      {trail.length > 0 && (
        <circle
          cx={thetaX(trail[trail.length - 1])}
          cy={lossY(trail[trail.length - 1])}
          r="5.5"
          fill={color}
          stroke="#241C15"
          strokeWidth="1.5"
        />
      )}

      {/* 起点小标签 */}
      <text
        x={thetaX(trail[0]) - 6}
        y={tagY}
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill={tagColor}
        fontWeight="700"
      >
        {tag}
      </text>
    </g>
  );
};

export default LrCover;
