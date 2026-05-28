/**
 * Section 03 · 回归族 · 一个离群点把 MSE 拖到爆
 *
 * 反相邻：上一节是 chip 阵列 + 静态大图。这里换 SVG 拖拽（L3 × 2）：
 *   ① 用户拖红色离群点上下，3 种 loss 总和同步变
 *   ② 用户拖模型预测线上下，看 loss 怎么逼近最优
 *
 * 教育核心：MSE 对离群点是平方放大，MAE 几乎不在乎，Huber 在中间。
 *   这就是「数据脏的时候不用 MSE」的根本原因。
 */
import React, { useMemo, useRef, useState } from "react";

const VB = { w: 600, h: 320 };
const PADL = 50;
const PADR = 24;
const PADT = 24;
const PADB = 44;
const Y_MAX = 5;

const xScale = (i: number, n: number) => PADL + (i / (n - 1)) * (VB.w - PADL - PADR);
const yScale = (y: number) => PADT + (1 - y / Y_MAX) * (VB.h - PADT - PADB);
const yScaleInv = (py: number) => Y_MAX * (1 - (py - PADT) / (VB.h - PADT - PADB));

/* 7 个干净样本 + 1 个红色"待拖"离群点 */
const CLEAN_POINTS = [1.1, 0.9, 1.3, 1.0, 1.2, 0.8, 1.4];

function huber(r: number, delta = 1.0): number {
  const a = Math.abs(r);
  return a <= delta ? 0.5 * r * r : delta * (a - 0.5 * delta);
}

const SectionRegression: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  /* 离群点的 y 值（用户拖） */
  const [outlier, setOutlier] = useState(4.2);
  /* 模型预测的水平线（用户拖） */
  const [model, setModel] = useState(1.0);
  const [drag, setDrag] = useState<null | "outlier" | "model">(null);

  const ys = [...CLEAN_POINTS, outlier];
  const N = ys.length;

  const { mse, mae, hb } = useMemo(() => {
    const residuals = ys.map((y) => y - model);
    return {
      mse: residuals.reduce((s, r) => s + r * r, 0) / N,
      mae: residuals.reduce((s, r) => s + Math.abs(r), 0) / N,
      hb: residuals.reduce((s, r) => s + huber(r, 1.0), 0) / N,
    };
  }, [outlier, model]);

  /* 没离群点的版本（清洁基线） · 同时把模型挪到样本均值 1.10 才公平 */
  const cleanMean = CLEAN_POINTS.reduce((s, y) => s + y, 0) / CLEAN_POINTS.length;
  const cleanMSE = CLEAN_POINTS.reduce((s, y) => s + (y - cleanMean) ** 2, 0) / CLEAN_POINTS.length;
  const cleanMAE =
    CLEAN_POINTS.reduce((s, y) => s + Math.abs(y - cleanMean), 0) / CLEAN_POINTS.length;
  const cleanHB = CLEAN_POINTS.reduce((s, y) => s + huber(y - cleanMean, 1.0), 0) / CLEAN_POINTS.length;

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const py = ((e.clientY - rect.top) / rect.height) * VB.h;
    const y = Math.max(0.05, Math.min(Y_MAX - 0.05, yScaleInv(py)));
    if (drag === "outlier") setOutlier(Number(y.toFixed(2)));
    else setModel(Number(y.toFixed(2)));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (drag && svgRef.current) {
      try {
        (e.target as Element).releasePointerCapture?.(e.pointerId);
      } catch {
        /* noop */
      }
    }
    setDrag(null);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">regression family</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个标错的样本，
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">能把 MSE 拖大 5 倍</span>
          </span>
          ——
          <br />
          但 MAE 几乎没感觉。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          回归任务最常用的 3 个 loss：
          <strong className="text-ink">MSE</strong> 平方放大，
          <strong className="text-ink">MAE</strong> 等比例，
          <strong className="text-ink">Huber</strong> 小误差像 MSE 大误差像 MAE。
          数据干不干净，决定你该挑哪个。
        </p>

        {/* 主体：左 SVG / 右数字 */}
        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左图 */}
          <div className="lg:col-span-7 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-4 select-none">
            <div className="flex items-baseline justify-between mb-1">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                ① 拖红点改离群幅度 · ② 拖灰线改模型预测
              </div>
              <div className="font-mono text-[10px] text-ink/45">8 samples · y=true value</div>
            </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VB.w} ${VB.h}`}
              className="w-full h-auto touch-none"
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
            >
              {/* y 网格 */}
              {[1, 2, 3, 4, 5].map((y) => (
                <g key={`gy-${y}`}>
                  <line
                    x1={PADL}
                    y1={yScale(y)}
                    x2={VB.w - PADR}
                    y2={yScale(y)}
                    stroke="#241C15"
                    strokeWidth="0.5"
                    strokeDasharray="2 4"
                    opacity="0.18"
                  />
                  <text
                    x={PADL - 8}
                    y={yScale(y) + 3}
                    textAnchor="end"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fill="#88837C"
                  >
                    {y}
                  </text>
                </g>
              ))}

              {/* x 轴 */}
              <line
                x1={PADL}
                y1={VB.h - PADB}
                x2={VB.w - PADR}
                y2={VB.h - PADB}
                stroke="#241C15"
                strokeWidth="1.5"
              />
              <text
                x={(PADL + VB.w - PADR) / 2}
                y={VB.h - PADB + 26}
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fill="#88837C"
              >
                样本 i = 1..8
              </text>

              {/* 模型预测水平线（可拖） */}
              <line
                x1={PADL}
                y1={yScale(model)}
                x2={VB.w - PADR}
                y2={yScale(model)}
                stroke="#241C15"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.85"
              />
              {/* 模型线右端拖柄 */}
              <g
                style={{ cursor: "ns-resize" }}
                onPointerDown={(e) => {
                  setDrag("model");
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                }}
              >
                <rect
                  x={VB.w - PADR - 30}
                  y={yScale(model) - 12}
                  width="30"
                  height="24"
                  fill="#241C15"
                  rx="4"
                />
                <text
                  x={VB.w - PADR - 15}
                  y={yScale(model) + 3}
                  textAnchor="middle"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9"
                  fontWeight="700"
                  fill="#FBEFE3"
                >
                  ŷ
                </text>
              </g>
              <text
                x={PADL + 4}
                y={yScale(model) - 6}
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#241C15"
              >
                模型预测 ŷ = {model.toFixed(2)}
              </text>

              {/* residual 竖线（每个样本 -> 模型线） */}
              {ys.map((y, i) => {
                const x = xScale(i, N);
                const isOutlier = i === N - 1;
                const ry1 = yScale(y);
                const ry2 = yScale(model);
                return (
                  <line
                    key={`r-${i}`}
                    x1={x}
                    y1={ry1}
                    x2={x}
                    y2={ry2}
                    stroke={isOutlier ? "#E07A5F" : "#241C15"}
                    strokeWidth={isOutlier ? "2" : "1.2"}
                    opacity={isOutlier ? 0.85 : 0.4}
                    strokeDasharray={isOutlier ? undefined : "2 3"}
                  />
                );
              })}

              {/* 真值散点 */}
              {ys.map((y, i) => {
                const x = xScale(i, N);
                const isOutlier = i === N - 1;
                return (
                  <g key={`pt-${i}`}>
                    {isOutlier ? (
                      <g
                        style={{ cursor: "ns-resize" }}
                        onPointerDown={(e) => {
                          setDrag("outlier");
                          (e.target as Element).setPointerCapture?.(e.pointerId);
                        }}
                      >
                        <circle cx={x} cy={yScale(y)} r="14" fill="#E07A5F" fillOpacity="0.18" />
                        <circle
                          cx={x}
                          cy={yScale(y)}
                          r="7"
                          fill="#E07A5F"
                          stroke="#241C15"
                          strokeWidth="2"
                        />
                      </g>
                    ) : (
                      <circle
                        cx={x}
                        cy={yScale(y)}
                        r="5.5"
                        fill="#1B4B5A"
                        stroke="#241C15"
                        strokeWidth="1.5"
                      />
                    )}
                    <text
                      x={x}
                      y={VB.h - PADB + 14}
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="9"
                      fill="#88837C"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}

              {/* 注释 */}
              <text
                x={xScale(N - 1, N)}
                y={yScale(outlier) - 18}
                textAnchor="middle"
                fontFamily="Geist Mono, monospace"
                fontSize="10"
                fontWeight="700"
                fill="#E07A5F"
              >
                drag · y = {outlier.toFixed(2)}
              </text>
            </svg>
          </div>

          {/* 右数字 */}
          <div className="lg:col-span-5 space-y-3">
            <LossCard
              name="MSE"
              formula="mean((y − ŷ)²)"
              value={mse}
              clean={cleanMSE}
              tone="ink"
              hint="平方放大 · 一个离群点能拖爆整个总和"
            />
            <LossCard
              name="MAE"
              formula="mean(|y − ŷ|)"
              value={mae}
              clean={cleanMAE}
              tone="coral"
              hint="等比例 · 对脏数据天然鲁棒"
            />
            <LossCard
              name="Huber"
              formula="δ = 1.0"
              value={hb}
              clean={cleanHB}
              tone="teal"
              hint="小误差走 MSE 大误差走 MAE · 折中"
            />

            <p className="font-mono text-[10px] text-ink/40 leading-relaxed pt-1">
              来源：PyTorch `nn.HuberLoss` / `nn.SmoothL1Loss` 文档 2026/05 ·
              工程默认 δ ∈ [0.5, 1.0]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const LossCard: React.FC<{
  name: string;
  formula: string;
  value: number;
  clean: number;
  tone: "ink" | "coral" | "teal";
  hint: string;
}> = ({ name, formula, value, clean, tone, hint }) => {
  const ratio = clean > 0 ? value / clean : 1;
  const bar = Math.min(100, ratio * 20);
  const toneRing =
    tone === "ink"
      ? "border-ink"
      : tone === "coral"
        ? "border-coral"
        : "border-teal";
  const dotColor =
    tone === "ink" ? "#241C15" : tone === "coral" ? "#E07A5F" : "#1B4B5A";
  return (
    <div className={`p-4 border-2 ${toneRing} bg-white rounded-2xl shadow-stamp`}>
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: dotColor }} />
          <span className="font-display text-[16px] font-bold text-ink">{name}</span>
          <span className="font-mono text-[10px] text-ink/45">{formula}</span>
        </div>
        <div className="font-mono text-[10px] text-ink/50">
          清洁基线 {clean.toFixed(3)}
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-[32px] font-bold text-ink tabular-nums leading-none">
          {value.toFixed(3)}
        </span>
        <span
          className={[
            "font-mono text-[11px] font-bold tabular-nums",
            ratio > 3 ? "text-coral" : ratio > 1.5 ? "text-ink" : "text-teal",
          ].join(" ")}
        >
          ×{ratio.toFixed(2)}
        </span>
      </div>
      <div className="h-1.5 bg-ink/8 rounded-full overflow-hidden border border-ink/15 mb-2">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${bar}%`,
            background: ratio > 3 ? "#E07A5F" : ratio > 1.5 ? "#241C15" : "#1B4B5A",
          }}
        />
      </div>
      <div className="font-mono text-[10px] text-ink/55 leading-snug">{hint}</div>
    </div>
  );
};

export default SectionRegression;
