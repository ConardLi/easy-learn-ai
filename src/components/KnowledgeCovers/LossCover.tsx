/**
 * Loss 封面
 *
 * 隐喻：一条不断下降的训练 loss 曲线 + 当前 step 的小球 + 「→ 0」靶心。
 *
 * 视觉构图（viewBox 320×200）：
 *   - 背景：coral，配深色网格点
 *   - 主图：3 条 loss 衰减曲线（2 条历史轨迹淡，1 条主线粗 + 球）
 *   - 主线尾巴 → 0 标签（teal stamp）
 *   - 右上：当前 loss 数字 stamp（butter）
 *   - 左下：mono "training step →"
 *
 * hover 行为：球继续滑向 0（向右下方位移），历史轨迹微微消散。
 */
import React from "react";
import CoverShell from "./CoverShell";

/* 给一条 loss-decay 曲线生成 SVG path · 公式 y = y0 * exp(-k * (x - x0)/L) + asymp + noise */
function decayPath(
  x0: number,
  y0: number,
  asymp: number,
  k: number,
  xEnd: number,
  L: number,
  seed: number,
  amp: number,
): string {
  const N = 28;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = x0 + (i / N) * (xEnd - x0);
    const t = (x - x0) / L;
    const noise = Math.sin(i * (7.3 + seed * 0.3) + seed * 11.7) * amp;
    const y = y0 * Math.exp(-k * t) + asymp + noise;
    pts.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const LossCover: React.FC = () => {
  /* 主曲线：从 (45, 50) 衰减到 (280, ~160) */
  const main = decayPath(45, 110, 50, 2.6, 280, 235, 1, 1.4);
  const past1 = decayPath(45, 100, 70, 2.2, 280, 235, 3, 1.8);
  const past2 = decayPath(45, 95, 85, 1.8, 280, 235, 5, 2.4);

  /* 球的位置 = 主曲线尾部 */
  const ballX = 268;
  const ballY = 155;

  return (
    <CoverShell bgClassName="bg-coral" dotColor="#241C15" dotOpacity={0.1}>
      {/* 左上 eyebrow 装饰 · 一组下降数字 */}
      <g
        fontFamily="Geist Mono, monospace"
        fontSize="9"
        fill="#241C15"
        opacity="0.5"
        className="transition-opacity duration-500 group-hover:opacity-25"
      >
        <text x="38" y="34">3.21</text>
        <text x="76" y="42">2.08</text>
        <text x="118" y="50">1.34</text>
        <text x="160" y="58">0.81</text>
      </g>

      {/* 右上：当前 loss stamp（butter） */}
      <g
        transform="translate(282,30) rotate(-6)"
        className="origin-center transition-transform duration-500 group-hover:rotate-2 group-hover:scale-110"
      >
        <rect
          x="-28"
          y="-12"
          width="56"
          height="24"
          rx="5"
          fill="#F4D35E"
          stroke="#241C15"
          strokeWidth="2"
        />
        <text
          x="0"
          y="-1"
          textAnchor="middle"
          fontFamily="Geist Mono, monospace"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="1.5"
          fill="#241C15"
          opacity="0.7"
        >
          LOSS
        </text>
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="11"
          fontWeight="800"
          fill="#241C15"
        >
          0.32
        </text>
      </g>

      {/* 坐标轴 */}
      <g stroke="#241C15" strokeWidth="1.5" strokeLinecap="round" opacity="0.85">
        {/* x 轴 */}
        <line x1="36" y1="175" x2="295" y2="175" />
        {/* y 轴 */}
        <line x1="36" y1="40" x2="36" y2="175" />
      </g>

      {/* y 轴刻度 */}
      <g
        stroke="#241C15"
        strokeWidth="1"
        opacity="0.4"
        strokeDasharray="2 4"
      >
        <line x1="36" y1="80" x2="295" y2="80" />
        <line x1="36" y1="120" x2="295" y2="120" />
        <line x1="36" y1="160" x2="295" y2="160" />
      </g>

      {/* 历史轨迹（淡） */}
      <g
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="transition-opacity duration-500 group-hover:opacity-25"
      >
        <path d={past2} stroke="#241C15" strokeWidth="1.2" opacity="0.35" strokeDasharray="3 3" />
        <path d={past1} stroke="#241C15" strokeWidth="1.4" opacity="0.5" strokeDasharray="4 3" />
      </g>

      {/* 主 loss 曲线 */}
      <path
        d={main}
        fill="none"
        stroke="#241C15"
        strokeWidth="2.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 球当前位置 · hover 时往 0 滑 */}
      <g
        className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:translate-y-1"
        style={{ transformOrigin: `${ballX}px ${ballY}px` }}
      >
        <circle cx={ballX} cy={ballY} r="9" fill="#1B4B5A" fillOpacity="0.15" />
        <circle
          cx={ballX}
          cy={ballY}
          r="5.5"
          fill="#1B4B5A"
          stroke="#241C15"
          strokeWidth="2"
        />
      </g>

      {/* 终点 → 0 靶心（右下） */}
      <g
        transform="translate(298,168)"
        className="transition-transform duration-500 group-hover:translate-x-1"
      >
        <text
          x="-2"
          y="3"
          textAnchor="end"
          fontFamily="Geist Mono, monospace"
          fontSize="9"
          fill="#241C15"
          opacity="0.6"
        >
          →
        </text>
        <text
          x="9"
          y="3"
          textAnchor="middle"
          fontFamily="Smiley Sans, Plus Jakarta Sans, sans-serif"
          fontSize="14"
          fontWeight="800"
          fill="#241C15"
        >
          0
        </text>
      </g>

      {/* 左下：step 标签 */}
      <g transform="translate(36,190)">
        <text
          x="0"
          y="0"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          letterSpacing="1.4"
          fill="#241C15"
          opacity="0.65"
        >
          training step →
        </text>
      </g>

      {/* y 轴 label */}
      <g transform="translate(24,40)">
        <text
          x="0"
          y="0"
          fontFamily="Geist Mono, monospace"
          fontSize="8"
          letterSpacing="1.4"
          fill="#241C15"
          opacity="0.65"
        >
          ↑ loss
        </text>
      </g>

      {/* 中段竖虚线 + 当前 step 标 */}
      <g opacity="0.6">
        <line
          x1={ballX}
          y1={ballY}
          x2={ballX}
          y2="175"
          stroke="#241C15"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
      </g>
    </CoverShell>
  );
};

export default LossCover;
