/**
 * Epochs 封面
 *
 * 隐喻：train / val 两条 loss 曲线 + 早停最佳点 marker。
 *   train 一直降，val 先降后升 —— U 形过拟合就是「训练轮数」的标志意象。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 背景：butter，配深色网格点
 *   - 4 条竖向 epoch 刻度（e=1/4/8/12）
 *   - 一条 train 实线（ink）从左高到右低
 *   - 一条 val 虚线（coral）从左高到中低，又抬头
 *   - 中部 best epoch 竖线 + teal stamp 「best · e=4」
 *   - 右上：「N epochs」butter stamp
 *   - 左下：mono 「train · val」legend
 *
 * hover 行为：cursor 圆点轻微右移，best stamp 微跳。
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 把 [0..1] 的 epoch 进度映射到 SVG x 坐标 */
function toX(p: number): number {
  return 38 + p * 248;
}
/* loss ∈ [0..1] → SVG y ∈ [50..160]，loss 越小，y 越大（在图底） */
function yFromLoss(loss: number): number {
  return 160 - loss * 110;
}

/* 生成 train 曲线（单调下降 + 抖动） */
function trainPath(): string {
  const N = 32;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const loss = Math.exp(-2.4 * p) * 0.85 + 0.12;
    pts.push(`${toX(p).toFixed(1)} ${yFromLoss(loss).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

/* val 曲线（先降后升） · best 在 p≈0.32 */
function valPath(): string {
  const N = 32;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const p = i / N;
    const base = Math.exp(-2.0 * p) * 0.78 + 0.22;
    const overfit = p > 0.32 ? 0.55 * Math.pow(p - 0.32, 1.4) : 0;
    const loss = base + overfit;
    pts.push(`${toX(p).toFixed(1)} ${yFromLoss(loss).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const BEST_P = 0.32;

const EpochsCover: React.FC = () => {
  const trainD = trainPath();
  const valD = valPath();

  /* best 点的 val loss = base(0.32) */
  const bestValLoss = Math.exp(-2.0 * BEST_P) * 0.78 + 0.22;
  const bestX = toX(BEST_P);
  const bestY = yFromLoss(bestValLoss);

  /* train 在 best 点的 loss */
  const bestTrainLoss = Math.exp(-2.4 * BEST_P) * 0.85 + 0.12;
  const bestTrainY = yFromLoss(bestTrainLoss);

  return (
    <CoverShell bgClassName="bg-butter" dotOpacity={0.07}>
      {/* 右上：epochs stamp */}
      <g
        transform="translate(286,28) rotate(-7)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-30"
          y="-11"
          width="60"
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
          N epochs
        </text>
      </g>

      {/* 左上：标签 train / val */}
      <g transform="translate(40,30)">
        <rect
          x="-3"
          y="-9"
          width="106"
          height="16"
          rx="3"
          fill="#241C15"
          stroke="#241C15"
          strokeWidth="1.5"
        />
        <text
          x="50"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="1"
          fill="#F4D35E"
        >
          train · val loss
        </text>
      </g>

      {/* 坐标轴 */}
      <line x1="38" y1="160" x2="288" y2="160" stroke="#241C15" strokeWidth="1.6" />
      <line x1="38" y1="50" x2="38" y2="160" stroke="#241C15" strokeWidth="1.6" />

      {/* epoch 刻度 */}
      {[0.07, 0.32, 0.6, 0.88].map((p, i) => (
        <g key={`tick-${i}`}>
          <line
            x1={toX(p)}
            x2={toX(p)}
            y1="160"
            y2="164"
            stroke="#241C15"
            strokeWidth="1.4"
          />
          <text
            x={toX(p)}
            y="174"
            textAnchor="middle"
            fontFamily="Geist Mono, monospace"
            fontSize="8.5"
            fill="#88837C"
          >
            e{[1, 4, 8, 12][i]}
          </text>
        </g>
      ))}

      {/* 过拟合区底色（best 之后到右边的淡红） */}
      <rect x={bestX} y="50" width={288 - bestX} height="110" fill="#E07A5F" fillOpacity="0.1" />

      {/* train 曲线（实线 ink） */}
      <path
        d={trainD}
        fill="none"
        stroke="#241C15"
        strokeWidth="2.2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* val 曲线（虚线 coral） */}
      <path
        d={valD}
        fill="none"
        stroke="#1B4B5A"
        strokeWidth="2.4"
        strokeDasharray="5 3"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* best 竖虚线 */}
      <line
        x1={bestX}
        x2={bestX}
        y1="50"
        y2="160"
        stroke="#241C15"
        strokeWidth="1.4"
        strokeDasharray="3 3"
        opacity="0.55"
      />

      {/* best 点上的两个圆点 */}
      <circle
        cx={bestX}
        cy={bestTrainY}
        r="4.5"
        fill="#FBEFE3"
        stroke="#241C15"
        strokeWidth="1.8"
      />
      <circle
        cx={bestX}
        cy={bestY}
        r="4.8"
        fill="#1B4B5A"
        stroke="#241C15"
        strokeWidth="1.8"
      />

      {/* best stamp */}
      <g
        transform={`translate(${bestX},42) rotate(-3)`}
        className="origin-center transition-transform duration-500 group-hover:-translate-y-1"
      >
        <rect
          x="-32"
          y="-10"
          width="64"
          height="18"
          rx="3"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="1.6"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.6"
          fill="#FBEFE3"
        >
          best · e=4
        </text>
      </g>

      {/* 底部小字 · 轴说明 */}
      <text
        x="163"
        y="190"
        textAnchor="middle"
        fontFamily="Geist Mono, monospace"
        fontSize="8.5"
        fill="#88837C"
      >
        epoch → · train ↓ val ↘↗
      </text>

      {/* y 轴 loss 字样 */}
      <text
        x="30"
        y="52"
        textAnchor="end"
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#241C15"
        fontWeight="600"
      >
        loss
      </text>

      {/* legend 小点 · train */}
      <g transform="translate(208,184)">
        <line x1="0" x2="14" y1="0" y2="0" stroke="#241C15" strokeWidth="2" />
        <text
          x="18"
          y="3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
        >
          train
        </text>
      </g>
      <g transform="translate(252,184)">
        <line
          x1="0"
          x2="14"
          y1="0"
          y2="0"
          stroke="#1B4B5A"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <text
          x="18"
          y="3"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          fill="#241C15"
        >
          val
        </text>
      </g>
    </CoverShell>
  );
};

export default EpochsCover;
