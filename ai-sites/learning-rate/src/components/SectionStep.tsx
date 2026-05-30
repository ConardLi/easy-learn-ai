/**
 * Section 02 · 一步是怎么走的
 *
 * 反模板：用 1D 参数数轴 + step stepper（next / reset），让用户按 +1 step 看 θ 球被 lr×grad 推一格。
 *   - 这是 trace 范式，不是 slider 范式（跟 hero 错开）
 *   - 跟 batch-size 的"漏斗 + 大箭头"图也不同 —— 这里强调"步长 = lr"
 *
 * 视觉锚：
 *   - 一根 1D 数轴，θ 球初始在右上 loss 高的位置
 *   - 每按一次 next，θ ← θ − lr · ∇L(θ)，球往最低点（loss 山谷）跳
 *   - 用户可在三档 lr（小 / 中 / 大）切换看不同表现
 *
 * 可动元素：
 *   - 3 档 lr chip（L2）—— 切换看不同走法
 *   - step stepper next / prev / reset（L2 单步 trace）
 *   - hover：当前 step 圆点 hover 看 (θ, loss, grad)（基础礼貌）
 */
import React, { useMemo, useState } from "react";
import { Play, RotateCcw, ChevronRight, ChevronLeft } from "lucide-react";

/* loss 函数：抛物线 L(θ) = (θ−2)² 最低点 θ*=2 */
function loss(theta: number): number {
  return (theta - 2) * (theta - 2);
}
function grad(theta: number): number {
  return 2 * (theta - 2);
}

const LR_OPTIONS = [
  { id: "small", label: "lr 小 · 0.05", value: 0.05, note: "步小到看不出动" },
  { id: "ok", label: "lr 中 · 0.4", value: 0.4, note: "5 步内逼近最低点" },
  { id: "big", label: "lr 大 · 1.05", value: 1.05, note: "在最低点两侧反弹放大" },
];

const MAX_STEPS = 12;

const SectionStep: React.FC = () => {
  const [lrId, setLrId] = useState("ok");
  const [step, setStep] = useState(0);

  const lr = LR_OPTIONS.find((o) => o.id === lrId)!.value;

  /* 计算所有步的 θ 轨迹 */
  const trajectory = useMemo(() => {
    const arr: { theta: number; loss: number; grad: number }[] = [];
    let t = -3.6; // 起点
    arr.push({ theta: t, loss: loss(t), grad: grad(t) });
    for (let i = 1; i <= MAX_STEPS; i++) {
      const g = grad(t);
      t = t - lr * g;
      arr.push({ theta: t, loss: loss(t), grad: g });
    }
    return arr;
  }, [lr]);

  const cur = trajectory[step];

  function reset() {
    setStep(0);
  }
  function next() {
    setStep((s) => Math.min(MAX_STEPS, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">one step</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3">
          一步迈出去，是怎么走的
        </h2>
        <p className="max-w-2xl text-[16px] text-ink/75 leading-relaxed mb-10">
          公式只有一行：<span className="font-mono">θ ← θ − lr · ∇L(θ)</span>。
          按一次 step，看参数 θ 沿着 loss 山坡往最低点跳。lr 是步长，∇L 是当前坡度。
        </p>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 左：控制 + 公式拆解 */}
          <div className="lg:col-span-5 space-y-5">
            {/* lr 三档切换 */}
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 选 lr
              </div>
              <div className="space-y-2">
                {LR_OPTIONS.map((o) => {
                  const on = o.id === lrId;
                  return (
                    <button
                      key={o.id}
                      onClick={() => {
                        setLrId(o.id);
                        setStep(0);
                      }}
                      className={[
                        "w-full text-left px-4 py-3 border-2 border-ink rounded-xl transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-cream text-ink hover:translate-x-[-2px] hover:translate-y-[-2px]",
                      ].join(" ")}
                    >
                      <div className="font-display text-[16px] font-bold">{o.label}</div>
                      <div className={`mt-0.5 font-mono text-[11px] ${on ? "text-cream/70" : "text-ink/55"}`}>
                        {o.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* step 控制 */}
            <div className="card-stamp p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 一步步走
                </div>
                <div className="font-display text-[18px] font-bold text-ink tabular-nums">
                  step {step} / {MAX_STEPS}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={prev}
                  disabled={step === 0}
                  className="flex items-center justify-center gap-1 py-2.5 bg-white border-2 border-ink rounded-xl font-mono text-[11px] font-bold text-ink hover:bg-cream disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  prev
                </button>
                <button
                  onClick={next}
                  disabled={step === MAX_STEPS}
                  className="flex items-center justify-center gap-1 py-2.5 bg-ink text-cream border-2 border-ink rounded-xl font-mono text-[11px] font-bold shadow-[3px_3px_0_0_#E07A5F] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250"
                >
                  <Play className="w-3 h-3" fill="currentColor" />
                  step +1
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={reset}
                  className="flex items-center justify-center gap-1 py-2.5 bg-white border-2 border-ink rounded-xl font-mono text-[11px] font-bold text-ink hover:bg-cream transition-all duration-250"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  reset
                </button>
              </div>

              {/* 公式拆解 · 当前数字代入 */}
              <div className="mt-4 pt-4 border-t border-ink/10 font-mono text-[12.5px] leading-loose">
                <div className="text-ink/55 mb-1">θ_new = θ − lr · ∇L</div>
                <div className="text-ink">
                  <span className="text-coral font-bold">{cur.theta.toFixed(3)}</span>
                  <span className="text-ink/55"> = </span>
                  <span className="text-ink">{step === 0 ? "−3.600" : trajectory[step - 1].theta.toFixed(3)}</span>
                  <span className="text-ink/55"> − </span>
                  <span className="text-teal font-bold">{lr}</span>
                  <span className="text-ink/55"> · </span>
                  <span className="text-ink">{step === 0 ? grad(-3.6).toFixed(3) : trajectory[step - 1].grad.toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右：1D loss 抛物线 + θ 球轨迹 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  loss 山坡 · L(θ) = (θ−2)²
                </div>
                <div className="font-mono text-[11px] text-ink/55 tabular-nums">
                  当前 loss <span className="text-ink font-bold">{cur.loss.toFixed(3)}</span>
                </div>
              </div>

              {/* SVG */}
              <div className="bg-cream border-2 border-ink rounded-2xl p-3">
                <svg viewBox="0 0 480 280" className="w-full h-auto">
                  <BowlChart trajectory={trajectory} step={step} />
                </svg>
              </div>

              {/* 轨迹文字 */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Stat label="θ" value={cur.theta.toFixed(3)} tone="ink" />
                <Stat label="∇L" value={cur.grad.toFixed(3)} tone="teal" />
                <Stat
                  label="离最低点"
                  value={Math.abs(cur.theta - 2).toFixed(3)}
                  tone={Math.abs(cur.theta - 2) < 0.1 ? "teal" : Math.abs(cur.theta - 2) > 5 ? "coral" : "ink"}
                />
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/45">
                参考：抛物线只是真实 loss 的 1D 切片。十亿维 LLM 同理 —— 每步都是 lr × ∇ 推一下。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── 抛物线 + θ 球轨迹 ───────────────────────────────────────────────────── */
const BowlChart: React.FC<{
  trajectory: { theta: number; loss: number; grad: number }[];
  step: number;
}> = ({ trajectory, step }) => {
  /* θ 范围 [-5..5] → x [40..460]
     loss 范围 [0..30] → y [240..30] */
  const X = (t: number) => 40 + ((t + 5) / 10) * 420;
  const Y = (l: number) => 240 - Math.min(30, l) * 7;

  /* 抛物线 path：100 个采样点 */
  const bowlPts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = -5 + (i / 100) * 10;
    const l = (t - 2) * (t - 2);
    bowlPts.push(`${X(t).toFixed(1)} ${Y(l).toFixed(1)}`);
  }
  const bowlD = "M " + bowlPts.join(" L ");

  /* 走过的轨迹 step 0..step */
  const trail = trajectory.slice(0, step + 1);

  return (
    <g>
      {/* 网格 */}
      <defs>
        <pattern id="step-grid" x="0" y="0" width="42" height="24" patternUnits="userSpaceOnUse">
          <path d="M 42 0 L 0 0 0 24" fill="none" stroke="#241C15" strokeWidth="0.4" opacity="0.13" />
        </pattern>
      </defs>
      <rect x="40" y="20" width="420" height="220" fill="url(#step-grid)" />

      {/* 坐标轴 */}
      <line x1="40" y1="240" x2="460" y2="240" stroke="#241C15" strokeWidth="1.4" />
      <line x1="40" y1="20" x2="40" y2="240" stroke="#241C15" strokeWidth="1.4" />

      {/* 最低点 θ*=2 marker */}
      <line x1={X(2)} y1="20" x2={X(2)} y2="240" stroke="#241C15" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
      <text x={X(2)} y="262" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill="#241C15" fontWeight="700">
        θ*=2
      </text>

      {/* 抛物线 */}
      <path d={bowlD} fill="none" stroke="#1B4B5A" strokeWidth="2.4" strokeLinecap="round" />

      {/* 走过的轨迹连线（黄色背景） */}
      {trail.length > 1 && (
        <path
          d={"M " + trail.map((p) => `${X(p.theta).toFixed(1)} ${Y(p.loss).toFixed(1)}`).join(" L ")}
          fill="none"
          stroke="#F4D35E"
          strokeWidth="3"
          strokeLinejoin="round"
          opacity="0.85"
        />
      )}

      {/* 走过的圆点（小） */}
      {trail.slice(0, -1).map((p, i) => (
        <circle key={i} cx={X(p.theta)} cy={Y(p.loss)} r="3.5" fill="#FBEFE3" stroke="#241C15" strokeWidth="1.4" />
      ))}

      {/* 当前 θ 球（大 · 强调） */}
      <g
        transform={`translate(${X(trail[trail.length - 1].theta)},${Y(trail[trail.length - 1].loss)})`}
        className="origin-center"
      >
        <circle r="9" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
        <text y="3.5" textAnchor="middle" fontFamily="Smiley Sans, sans-serif" fontSize="11" fontWeight="800" fill="#FBEFE3">
          θ
        </text>
      </g>

      {/* x 轴标签 */}
      {[-4, -2, 0, 2, 4].map((t) => (
        <text key={t} x={X(t)} y="252" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
          {t}
        </text>
      ))}
      {/* y 轴标签 */}
      <text x="34" y="24" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" fontWeight="600">
        loss
      </text>
      <text x="34" y="244" textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" fill="#88837C">
        0
      </text>
    </g>
  );
};

const Stat: React.FC<{ label: string; value: string; tone: "ink" | "coral" | "teal" }> = ({ label, value, tone }) => {
  const cls = tone === "coral" ? "text-coral" : tone === "teal" ? "text-teal" : "text-ink";
  return (
    <div className="bg-cream border-2 border-ink rounded-xl px-3 py-2">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
        {label}
      </div>
      <div className={`font-display text-[20px] font-bold tabular-nums leading-tight ${cls}`}>{value}</div>
    </div>
  );
};

export default SectionStep;
