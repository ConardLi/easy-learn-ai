/**
 * Section 01 · Hero
 *
 * 反模板：核心动作直接放 hero —— 一根 slider 调"预测误差 e = 预测 - 真值"，
 *   5 条不同 loss 曲线在同一坐标系上画出，5 个数同步刷新。
 *
 * 区别于：
 *   ─ batch-size 的 1D loss landscape ball drop（那是参数轴 / 优化轨迹）
 *   ─ distill 的 T slider + 5 类概率柱（那是 softmax 的 entropy）
 *   ─ quantization 的 7-pill 离散选择器（那是数值精度）
 *
 * 这里 x 轴 = 预测误差；y 轴 = loss；5 条线 = 5 个 loss 函数。完全不同的语义。
 */
import React, { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";

/* viewBox 坐标系（loss 曲线图） */
const VB = { w: 600, h: 320 };
const X_MIN = -2.5;
const X_MAX = 2.5;
const Y_MAX = 4;
const xScale = (x: number) => 40 + ((x - X_MIN) / (X_MAX - X_MIN)) * 520;
const yScale = (y: number) => 270 - (Math.min(y, Y_MAX) / Y_MAX) * 240;

type LossDef = {
  id: string;
  label: string;
  formula: string;
  color: string;
  note: string;
  fn: (e: number) => number;
};

const LOSSES: LossDef[] = [
  {
    id: "mse",
    label: "MSE",
    formula: "e²",
    color: "#241C15",
    note: "误差越大惩罚平方涨",
    fn: (e) => e * e,
  },
  {
    id: "mae",
    label: "MAE",
    formula: "|e|",
    color: "#E07A5F",
    note: "等比例增 · 抗离群点",
    fn: (e) => Math.abs(e),
  },
  {
    id: "huber",
    label: "Huber",
    formula: "δ=1",
    color: "#1B4B5A",
    note: "小误差像 MSE 大误差像 MAE",
    fn: (e) => {
      const a = Math.abs(e);
      return a <= 1 ? 0.5 * e * e : a - 0.5;
    },
  },
  {
    id: "logcosh",
    label: "Log-cosh",
    formula: "log cosh e",
    color: "#E5BD3A",
    note: "全程光滑 · 二阶可导",
    fn: (e) => Math.log(Math.cosh(e)),
  },
  {
    id: "quantile",
    label: "Quantile",
    formula: "q=0.7",
    color: "#FF4D74",
    note: "低估比高估贵 · 用于预测",
    fn: (e) => (e >= 0 ? 0.3 * e : 0.7 * -e),
  },
];

/** 给一个 loss 函数生成 SVG path，y 自动 clamp 到 Y_MAX 防止冲出画框 */
function pathFor(fn: (x: number) => number): string {
  const N = 120;
  const pts: string[] = [];
  for (let i = 0; i <= N; i++) {
    const x = X_MIN + (i / N) * (X_MAX - X_MIN);
    const y = fn(x);
    pts.push(`${xScale(x).toFixed(1)} ${yScale(y).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const SectionHero: React.FC = () => {
  const [err, setErr] = useState(1.2);

  const paths = useMemo(() => LOSSES.map((L) => pathFor(L.fn)), []);
  const values = useMemo(() => LOSSES.map((L) => L.fn(err)), [err]);

  /* loss 值最低 / 最高的两个，用来给数字带 tone */
  const minV = Math.min(...values);
  const maxV = Math.max(...values);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Loss Functions · 损失函数
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Loss
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  Loss 是一个数字，衡量预测和真值的差距，训练就是让它降下来。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                模型每跑一遍数据会输出一个预测，loss 拿这个预测跟真值比，算出「错了多少」。
              </p>
              <p>
                这个数交给优化器，它沿 loss 下降的方向把参数挪一小步。一遍一遍地挪，就是训练。
              </p>
              <p>
                任务不同，loss 也不同。回归用 MSE，分类用 cross-entropy，选错就训不出来。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡 = 同一个预测误差，5 种 loss 给的惩罚差多少。拖滑块试试。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：可视化卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* slider header */}
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 预测误差 · e = 预测 − 真值
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[32px] lg:text-[38px] font-bold text-ink leading-none tabular-nums">
                    {err >= 0 ? "+" : ""}
                    {err.toFixed(2)}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={-2.4}
                max={2.4}
                step={0.05}
                value={err}
                onChange={(e) => setErr(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer mb-1"
                aria-label="预测误差"
              />
              <div className="flex justify-between font-mono text-[10px] text-ink/40 mb-5">
                <span>−2.4 · 低估</span>
                <span>0 · 完美</span>
                <span>+2.4 · 高估</span>
              </div>

              {/* 主曲线图 */}
              <div className="bg-cream border-2 border-ink rounded-2xl p-3 mb-4 overflow-hidden">
                <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="w-full h-auto">
                  {/* 网格 */}
                  {[1, 2, 3, 4].map((y) => (
                    <line
                      key={`gy-${y}`}
                      x1={40}
                      y1={yScale(y)}
                      x2={560}
                      y2={yScale(y)}
                      stroke="#241C15"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                      opacity="0.18"
                    />
                  ))}
                  {[-2, -1, 1, 2].map((x) => (
                    <line
                      key={`gx-${x}`}
                      x1={xScale(x)}
                      y1={30}
                      x2={xScale(x)}
                      y2={270}
                      stroke="#241C15"
                      strokeWidth="0.5"
                      strokeDasharray="2 4"
                      opacity="0.12"
                    />
                  ))}

                  {/* x 轴 */}
                  <line x1={40} y1={270} x2={560} y2={270} stroke="#241C15" strokeWidth="1.5" />
                  {/* y 轴 */}
                  <line x1={xScale(0)} y1={30} x2={xScale(0)} y2={270} stroke="#241C15" strokeWidth="1" opacity="0.45" />

                  {/* 刻度 */}
                  {[-2, -1, 0, 1, 2].map((x) => (
                    <g key={`tx-${x}`}>
                      <line x1={xScale(x)} y1={270} x2={xScale(x)} y2={275} stroke="#241C15" strokeWidth="1.2" />
                      <text
                        x={xScale(x)}
                        y={290}
                        textAnchor="middle"
                        fontFamily="Geist Mono, monospace"
                        fontSize="10"
                        fill="#88837C"
                      >
                        {x}
                      </text>
                    </g>
                  ))}
                  {[1, 2, 3, 4].map((y) => (
                    <text
                      key={`ty-${y}`}
                      x={32}
                      y={yScale(y) + 3}
                      textAnchor="end"
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fill="#88837C"
                    >
                      {y}
                    </text>
                  ))}
                  <text
                    x={560}
                    y={264}
                    textAnchor="end"
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fill="#88837C"
                    opacity="0.7"
                  >
                    误差 e →
                  </text>
                  <text
                    x={xScale(0) + 6}
                    y={42}
                    fontFamily="Geist Mono, monospace"
                    fontSize="9"
                    fill="#88837C"
                    opacity="0.7"
                  >
                    ↑ loss
                  </text>

                  {/* 当前误差竖线 */}
                  <line
                    x1={xScale(err)}
                    y1={30}
                    x2={xScale(err)}
                    y2={270}
                    stroke="#241C15"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    opacity="0.6"
                  />
                  <text
                    x={xScale(err)}
                    y={22}
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="700"
                    fill="#241C15"
                  >
                    e = {err.toFixed(2)}
                  </text>

                  {/* 5 条 loss 曲线 */}
                  {LOSSES.map((L, i) => (
                    <path
                      key={L.id}
                      d={paths[i]}
                      fill="none"
                      stroke={L.color}
                      strokeWidth={L.id === "mse" ? "2.5" : "2"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      opacity={0.92}
                    />
                  ))}

                  {/* 5 个当前值 dot */}
                  {LOSSES.map((L, i) => (
                    <g key={`dot-${L.id}`}>
                      <circle
                        cx={xScale(err)}
                        cy={yScale(values[i])}
                        r="4.5"
                        fill={L.color}
                        stroke="#FBEFE3"
                        strokeWidth="2"
                      />
                    </g>
                  ))}
                </svg>
              </div>

              {/* 5 个数字 chip */}
              <div className="grid grid-cols-5 gap-2">
                {LOSSES.map((L, i) => {
                  const v = values[i];
                  const isMax = v === maxV && maxV > minV;
                  return (
                    <div
                      key={L.id}
                      className={[
                        "px-2 py-2 rounded-md border-2 border-ink",
                        isMax ? "bg-ink text-cream" : "bg-cream",
                      ].join(" ")}
                      style={isMax ? undefined : { borderColor: L.color }}
                    >
                      <div className="flex items-center gap-1 mb-0.5">
                        <span
                          className="inline-block w-2 h-2 rounded-full"
                          style={{ background: L.color }}
                        />
                        <span
                          className={[
                            "font-mono text-[9px] font-bold uppercase tracking-wider",
                            isMax ? "text-cream" : "text-ink",
                          ].join(" ")}
                        >
                          {L.label}
                        </span>
                      </div>
                      <div
                        className={[
                          "font-display text-[18px] font-bold leading-none tabular-nums",
                          isMax ? "text-cream" : "text-ink",
                        ].join(" ")}
                      >
                        {v.toFixed(2)}
                      </div>
                      <div
                        className={[
                          "mt-0.5 font-mono text-[9px]",
                          isMax ? "text-cream/65" : "text-ink/45",
                        ].join(" ")}
                      >
                        {L.formula}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 注脚 */}
              <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                当 e = ±2，MSE 给 4，MAE 给 2，Quantile 高估只给 0.6。
                惩罚口径不一样，训出来的模型也不一样。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
