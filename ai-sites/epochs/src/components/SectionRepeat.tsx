/**
 * Section 04 · 数据重复的代价 · Muennighoff 2023 半衰期
 *
 * 反相邻：Danger 是「chip 选任务 + slider ship epoch + 双 bar」。
 *   这里换 1 个连续 slider（R = 重复次数 0..50）+ 一根 effective tokens 曲线。
 *   不抢 batch-size SectionSharpFlat 的 1D loss landscape ball drop（那是 step scrub）。
 *
 * 数据：arXiv:2305.16264 + JMLR 2025 论文（Muennighoff et al.）
 *   D' = U_D + U_D · R_D* · (1 - exp(-R_D / R_D*))，R_D* ≈ 15
 *   ─ R=0（1 epoch）：D' = 1.0× unique
 *   ─ R=3（4 epoch）：D' ≈ 3.6× unique  ←「4 epoch 几乎等于 fresh data」
 *   ─ R=15（16 epoch）：D' ≈ 10.5× unique  ← 半衰点
 *   ─ R=50（51 epoch）：D' ≈ 15.5× unique  ← 接近上限 U_D · (1 + R_D*) = 16×
 *
 * 视觉：左半 = slider + 5 个 stop marker；右半 = 一根曲线 + 三段染色（"几乎免费" /
 *   "递减区" / "饱和区"），加 5 个对照柱表示净增量。
 *
 * 可动元素：
 *   - 主 slider（L3 连续 R = 0..50）
 *   - 4 个 quick stop chip（R=0 / 3 / 15 / 50）—— L2
 *   - hover：曲线点位 hover 看 ΔD'（基础礼貌）
 */
import React, { useMemo, useState } from "react";

const R_HALF = 15; // arXiv:2305.16264 拟合常数 R_D* ≈ 15
const R_MAX = 50;
const VB_W = 560;
const VB_H = 240;
const PAD_L = 44;
const PAD_R = 22;
const PAD_T = 22;
const PAD_B = 38;
const PLOT_W = VB_W - PAD_L - PAD_R;
const PLOT_H = VB_H - PAD_T - PAD_B;
const D_MAX = 17; // D' / U_D 上限略大于 16

/** 数据重复的等效 token 倍数（D' / U_D） */
function effective(r: number): number {
  return 1 + R_HALF * (1 - Math.exp(-r / R_HALF));
}

function xAt(r: number) {
  return PAD_L + (r / R_MAX) * PLOT_W;
}
function yAt(d: number) {
  return PAD_T + PLOT_H - (Math.min(d, D_MAX) / D_MAX) * PLOT_H;
}

const STOPS = [
  { r: 0, epoch: 1, label: "1 epoch", note: "fresh" },
  { r: 3, epoch: 4, label: "4 epoch", note: "≈ fresh" },
  { r: 15, epoch: 16, label: "16 epoch", note: "半衰" },
  { r: 49, epoch: 50, label: "50 epoch", note: "饱和" },
];

const SectionRepeat: React.FC = () => {
  const [r, setR] = useState(3);

  const d = effective(r);
  const epoch = r + 1; // 业内常把 epoch 数 = R + 1
  const marginalPer = useMemo(() => {
    /* dD'/dR */
    return Math.exp(-r / R_HALF);
  }, [r]);

  /* 区间 */
  const zone =
    r <= 3
      ? { name: "几乎免费", color: "teal", note: "再多走一遍跟看新数据差不多。" }
      : r <= 20
      ? { name: "递减区", color: "butter-deep", note: "每多一遍，得到的有效 token 越来越少。" }
      : { name: "饱和区", color: "coral", note: "再循环也吸不出多少新东西，浪费算力。" };

  /* 曲线 */
  const curvePath = useMemo(() => {
    const N = 80;
    const pts: string[] = [];
    for (let i = 0; i <= N; i++) {
      const rr = (i / N) * R_MAX;
      pts.push(`${i === 0 ? "M" : "L"} ${xAt(rr).toFixed(1)} ${yAt(effective(rr)).toFixed(1)}`);
    }
    return pts.join(" ");
  }, []);

  /* 渐近线 */
  const asymptoteY = yAt(1 + R_HALF);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">数据重复 · 半衰期</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          多走一遍数据，模型并不会多学一倍。
        </h2>
        <p className="max-w-3xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          Muennighoff 2023 跑了 400 个训练，拟合出一条衰减曲线：4 epoch 几乎等于 fresh data，
          16 epoch 见到半衰点，50 epoch 之后再加都吸不出东西了。这是 LLM 时代「1 epoch
          预训练」的理论依据。
        </p>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6">
          {/* 左：控制 + 数 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① 拖动重复次数
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-display text-[34px] font-bold text-ink leading-none tabular-nums">
                  {epoch}
                </span>
                <span className="font-mono text-[12px] text-ink/55">epoch</span>
                <span className="font-mono text-[10.5px] text-ink/45 ml-auto">
                  R = {r}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={R_MAX}
                step={1}
                value={r}
                onChange={(e) => setR(parseInt(e.target.value, 10))}
                className="w-full accent-coral"
              />
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {STOPS.map((s) => {
                  const on = s.r === r;
                  return (
                    <button
                      key={s.r}
                      onClick={() => setR(s.r)}
                      className={[
                        "py-1.5 px-1.5 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-200 leading-tight",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      <div>{s.label}</div>
                      <div
                        className={[
                          "text-[8.5px] mt-0.5",
                          on ? "text-cream/70" : "text-ink/45",
                        ].join(" ")}
                      >
                        {s.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3 个数 */}
            <div className="grid grid-cols-3 gap-2">
              <Stat
                label="effective"
                value={d.toFixed(2) + "×"}
                hint="等效新 token 倍数"
                tone="butter"
              />
              <Stat
                label="新增 / 上一步"
                value={marginalPer.toFixed(2) + "×"}
                hint={r === 0 ? "起点" : "再走一遍能多吸收"}
                tone="ink"
              />
              <Stat
                label="距离上限"
                value={(1 + R_HALF - d).toFixed(1)}
                hint={"上限 " + (1 + R_HALF).toFixed(0) + "×"}
                tone="coral"
              />
            </div>

            {/* zone 评语 */}
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className={[
                    "inline-block w-2.5 h-2.5 rounded-full",
                    zone.color === "teal"
                      ? "bg-teal"
                      : zone.color === "butter-deep"
                      ? "bg-butter-deep"
                      : "bg-coral",
                  ].join(" ")}
                />
                <span className="font-display text-[16px] font-bold text-ink">
                  {zone.name}
                </span>
              </div>
              <p className="text-[13px] text-ink/70 leading-relaxed">{zone.note}</p>
            </div>
          </div>

          {/* 右：曲线 */}
          <div className="lg:col-span-3 bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                ② effective tokens 曲线（D' / U_D）
              </span>
              <span className="font-mono text-[10px] text-ink/45">
                D' = U + U · 15 · (1 - e^-R/15)
              </span>
            </div>

            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-auto" aria-hidden>
              {/* 三段区间背景染色 */}
              <rect
                x={PAD_L}
                y={PAD_T}
                width={xAt(3) - PAD_L}
                height={PLOT_H}
                fill="#1B4B5A"
                fillOpacity="0.07"
              />
              <rect
                x={xAt(3)}
                y={PAD_T}
                width={xAt(20) - xAt(3)}
                height={PLOT_H}
                fill="#E5BD3A"
                fillOpacity="0.1"
              />
              <rect
                x={xAt(20)}
                y={PAD_T}
                width={xAt(R_MAX) - xAt(20)}
                height={PLOT_H}
                fill="#E07A5F"
                fillOpacity="0.09"
              />

              {/* 网格 */}
              {[0, 4, 8, 12, 16].map((dv) => (
                <line
                  key={`hg-${dv}`}
                  x1={PAD_L}
                  x2={VB_W - PAD_R}
                  y1={yAt(dv)}
                  y2={yAt(dv)}
                  stroke="#241C15"
                  strokeOpacity={dv === 0 ? 0.4 : 0.07}
                  strokeWidth={dv === 0 ? 1.4 : 1}
                />
              ))}
              {[0, 1, 4, 16, 50].map((rv) => (
                <text
                  key={`xl-${rv}`}
                  x={xAt(rv)}
                  y={VB_H - PAD_B + 16}
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="10"
                  fill="#88837C"
                >
                  e={rv + 1}
                </text>
              ))}
              {[0, 4, 8, 12, 16].map((dv) => (
                <text
                  key={`yl-${dv}`}
                  x={PAD_L - 8}
                  y={yAt(dv) + 4}
                  textAnchor="end"
                  fontFamily="Geist Mono, monospace"
                  fontSize="10"
                  fill="#88837C"
                >
                  {dv}×
                </text>
              ))}
              <text
                x={VB_W - PAD_R - 4}
                y={VB_H - PAD_B + 16}
                textAnchor="end"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#241C15"
                fontWeight="600"
              >
                epoch →
              </text>

              {/* 渐近线 D' = 16× */}
              <line
                x1={PAD_L}
                x2={VB_W - PAD_R}
                y1={asymptoteY}
                y2={asymptoteY}
                stroke="#241C15"
                strokeWidth="1.4"
                strokeDasharray="4 4"
                opacity="0.4"
              />
              <text
                x={VB_W - PAD_R - 4}
                y={asymptoteY - 4}
                textAnchor="end"
                fontFamily="Geist Mono, monospace"
                fontSize="9.5"
                fill="#241C15"
                opacity="0.55"
              >
                上限 16×
              </text>

              {/* 主曲线 */}
              <path
                d={curvePath}
                fill="none"
                stroke="#241C15"
                strokeWidth="2.2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* 半衰 marker (R=15) */}
              <line
                x1={xAt(R_HALF)}
                x2={xAt(R_HALF)}
                y1={PAD_T}
                y2={VB_H - PAD_B}
                stroke="#241C15"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                opacity="0.45"
              />

              {/* 当前 cursor */}
              <line
                x1={xAt(r)}
                x2={xAt(r)}
                y1={PAD_T}
                y2={VB_H - PAD_B}
                stroke="#E07A5F"
                strokeWidth="2"
              />
              <circle
                cx={xAt(r)}
                cy={yAt(d)}
                r="6"
                fill="#FBEFE3"
                stroke="#241C15"
                strokeWidth="2"
              />

              {/* 当前点标签 */}
              <g transform={`translate(${xAt(r)},${yAt(d) - 14})`}>
                <rect
                  x="-32"
                  y="-12"
                  width="64"
                  height="14"
                  rx="3"
                  fill="#241C15"
                  stroke="#241C15"
                  strokeWidth="1.4"
                />
                <text
                  x="0"
                  y="-2"
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#FBEFE3"
                >
                  {d.toFixed(2)}×
                </text>
              </g>
            </svg>

            {/* 图例 */}
            <div className="mt-3 flex items-center gap-3 flex-wrap font-mono text-[10px] text-ink/65">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 bg-teal/15 border border-teal" />
                几乎免费 · ≤ 4 epoch
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 bg-butter-deep/20 border border-butter-deep" />
                递减区 · 5-20 epoch
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 bg-coral/15 border border-coral" />
                饱和区 · 20+ epoch
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/45 leading-relaxed max-w-3xl">
          原文：Muennighoff et al.「Scaling Data-Constrained Language Models」NeurIPS 2023 /
          JMLR 2025 (arXiv:2305.16264)。 拟合常数 R_D* ≈ 15.0、R_N* ≈ 5.3，跑了 10M 到 9B
          参数共 400 个模型。Llama 3 / DeepSeek V3 预训练都遵循"1 epoch 优先"原则。
        </p>
      </div>
    </section>
  );
};

const Stat: React.FC<{
  label: string;
  value: string;
  hint: string;
  tone: "butter" | "ink" | "coral";
}> = ({ label, value, hint, tone }) => {
  const bg =
    tone === "butter"
      ? "bg-butter text-ink"
      : tone === "ink"
      ? "bg-ink text-cream"
      : "bg-coral text-cream";
  return (
    <div className={["border-2 border-ink rounded-lg p-2.5 shadow-stamp", bg].join(" ")}>
      <div
        className={[
          "font-mono text-[9px] uppercase tracking-[0.18em] font-semibold",
          tone === "butter" ? "text-ink/60" : "text-cream/75",
        ].join(" ")}
      >
        {label}
      </div>
      <div className="font-display text-[20px] font-bold leading-none mt-0.5 tabular-nums">
        {value}
      </div>
      <div
        className={[
          "font-mono text-[9.5px] mt-0.5 leading-tight",
          tone === "butter" ? "text-ink/55" : "text-cream/65",
        ].join(" ")}
      >
        {hint}
      </div>
    </div>
  );
};

export default SectionRepeat;
