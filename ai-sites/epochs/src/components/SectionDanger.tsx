/**
 * Section 03 · 训太多会把模型练傻 · 灾难模拟器
 *
 * 反相邻：Hero（timeline cursor + 双曲线）→ Math（stepper + chip）→ 这里换 L4 任务模拟器。
 * 反同邻居：loss 的 SectionCurveDoctor 是「chip 选场景 + 静态曲线 + 诊断卡」。
 *   这里换「用户当 SFT 工程师，按按钮选 ship 第几个 epoch，看双 benchmark 同时跑」。
 *
 * 用户操作：
 *   1) chip 选「你的训练目标」（客服 / 代码 / 数学），决定 domain ↑ 曲线
 *   2) 拖 slider 决定「你打算 ship 第几个 epoch 的 checkpoint」
 *   3) 屏幕上跑两条 bar：
 *      - domain · 任务 accuracy（你的目标 KPI）
 *      - MMLU · 通用智商
 *      domain 一直升，MMLU 从 epoch 2-3 开始崩
 *
 * 数据点（arXiv:2601.18699 + arXiv:2507.05386）：
 *   - epoch 1-2 几乎不掉
 *   - epoch 3-5 急速下降
 *   - epoch 6+ 跌进 -10% 区
 */
import React, { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

type Task = {
  id: string;
  label: string;
  sub: string;
  /** epoch e → domain task accuracy（%） · 增长但有饱和 */
  domainFn: (e: number) => number;
  /** epoch e → MMLU 保留 accuracy（%） · 先稳定，3 epoch 后崩 */
  mmluFn: (e: number) => number;
};

const TASKS: Task[] = [
  {
    id: "support",
    label: "客服问答",
    sub: "10K 条单轮对话",
    domainFn: (e) => clamp(38 + 42 * (1 - Math.exp(-0.7 * e)), 38, 86),
    mmluFn: (e) => clamp(65 - decayMMLU(e, 1.0), 30, 65),
  },
  {
    id: "code",
    label: "Python 代码",
    sub: "5K 条 issue→patch",
    domainFn: (e) => clamp(45 + 36 * (1 - Math.exp(-0.6 * e)), 45, 84),
    mmluFn: (e) => clamp(65 - decayMMLU(e, 0.7), 36, 65),
  },
  {
    id: "math",
    label: "数学推理",
    sub: "3K 条 MATH 题",
    domainFn: (e) => clamp(28 + 40 * (1 - Math.exp(-0.5 * e)), 28, 72),
    mmluFn: (e) => clamp(65 - decayMMLU(e, 1.3), 28, 65),
  },
];

function decayMMLU(e: number, severity: number): number {
  if (e <= 2) return 0.5 * e * severity;
  return 1 + 2.4 * Math.pow(e - 2, 1.45) * severity;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

const EPOCHS_MAX = 10;

const SectionDanger: React.FC = () => {
  const [taskId, setTaskId] = useState("support");
  const [shipEpoch, setShipEpoch] = useState(2);

  const task = TASKS.find((t) => t.id === taskId)!;

  const domain = task.domainFn(shipEpoch);
  const mmlu = task.mmluFn(shipEpoch);
  const mmluDelta = mmlu - 65; // 基线 65 是 Llama 3.1 8B Instruct 公开成绩附近
  const safe = mmluDelta > -5;
  const danger = mmluDelta <= -10;

  /* 给一个推荐 ship epoch（domain 与 mmlu 的"乘积"最大处） */
  const recommended = useMemo(() => {
    let best = 1;
    let bestScore = -Infinity;
    for (let e = 1; e <= EPOCHS_MAX; e++) {
      const d = task.domainFn(e);
      const m = task.mmluFn(e);
      const score = d * 0.55 + m * 0.45;
      if (score > bestScore) {
        bestScore = score;
        best = e;
      }
    }
    return best;
  }, [task]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">灾难模拟器 · catastrophic forgetting</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          训到第 8 个 epoch，你的客服模型可能不会算数了。
        </h2>
        <p className="max-w-3xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          这是 SFT 最阴的地方：你的目标任务一直涨，模型看起来在进步；但通用智商 MMLU
          已经在掉。等 ship 出去用户问个数学题，傻了。
        </p>

        <div className="grid lg:grid-cols-5 gap-5 lg:gap-6">
          {/* 左：操作区 */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① 你在 fine-tune 啥
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {TASKS.map((t) => {
                  const on = t.id === taskId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTaskId(t.id)}
                      className={[
                        "text-left p-2 rounded-md border-2 border-ink transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className="font-display text-[12.5px] font-bold leading-tight">
                        {t.label}
                      </div>
                      <div
                        className={[
                          "font-mono text-[9px] mt-0.5 leading-tight",
                          on ? "text-cream/70" : "text-ink/55",
                        ].join(" ")}
                      >
                        {t.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 你打算 ship 第几个 epoch
                </span>
                <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                  e = {shipEpoch}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={EPOCHS_MAX}
                step={1}
                value={shipEpoch}
                onChange={(ev) => setShipEpoch(parseInt(ev.target.value, 10))}
                className="w-full accent-coral"
              />
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-ink/45">
                <span>1</span>
                <span className="flex items-center gap-1 text-teal">
                  <CheckCircle2 className="w-3 h-3" strokeWidth={2.6} />
                  推荐 = {recommended}
                </span>
                <span>10</span>
              </div>
            </div>

            {/* 评语条 */}
            <div
              className={[
                "border-2 border-ink rounded-2xl shadow-stamp p-4",
                danger
                  ? "bg-coral text-cream"
                  : safe
                  ? "bg-butter text-ink"
                  : "bg-white text-ink",
              ].join(" ")}
            >
              <div className="flex items-start gap-2">
                {danger ? (
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                ) : safe ? (
                  <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                ) : (
                  <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" strokeWidth={2.4} />
                )}
                <div>
                  <div className="font-display text-[16px] font-bold leading-tight">
                    {danger
                      ? "灾难发布 · 用户会发现的"
                      : safe
                      ? "可发 · 通用能力仍在线"
                      : "边缘 · 上线前再跑一轮 MMLU 监控"}
                  </div>
                  <div
                    className={[
                      "text-[12.5px] mt-1 leading-relaxed",
                      danger ? "text-cream/85" : safe ? "text-ink/70" : "text-ink/65",
                    ].join(" ")}
                  >
                    {danger
                      ? "MMLU 跌了 " +
                        Math.abs(mmluDelta).toFixed(1) +
                        " 个点。模型只会做你训的那种题，通用问答崩了。"
                      : safe
                      ? "MMLU 还在 " +
                        mmlu.toFixed(1) +
                        "（基线 65），通用能力没大问题。"
                      : "MMLU 跌了 " +
                        Math.abs(mmluDelta).toFixed(1) +
                        " 个点。上限边缘，再训就过头。"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右：双 bar 可视化 */}
          <div className="lg:col-span-3 bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              ③ ship epoch={shipEpoch} 的双 benchmark
            </div>

            <BarRow
              label={task.label + " · accuracy"}
              sub="你的 KPI"
              value={domain}
              max={100}
              tone="butter"
              delta={domain - task.domainFn(1)}
              deltaSuffix="vs e=1"
            />
            <BarRow
              label="MMLU · 通用智商"
              sub="基线 65"
              value={mmlu}
              max={100}
              tone={danger ? "coral" : safe ? "teal" : "butter-deep"}
              delta={mmluDelta}
              deltaSuffix="vs 基线"
            />

            {/* mini timeline · 让用户感知整段轨迹 */}
            <div className="mt-6 pt-5 border-t border-ink/10">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                整段训练 · 每个 epoch 的两条 bar
              </div>
              <div className="grid grid-cols-10 gap-1.5">
                {Array.from({ length: EPOCHS_MAX }, (_, i) => i + 1).map((e) => {
                  const d = task.domainFn(e);
                  const m = task.mmluFn(e);
                  const cur = e === shipEpoch;
                  return (
                    <button
                      key={e}
                      onClick={() => setShipEpoch(e)}
                      className={[
                        "relative h-24 p-1 rounded-md border-2 border-ink transition-all duration-200",
                        cur
                          ? "bg-cream shadow-[3px_3px_0_0_#241C15]"
                          : "bg-white hover:bg-cream",
                      ].join(" ")}
                      title={`epoch ${e} · ${task.label}=${d.toFixed(0)} · MMLU=${m.toFixed(0)}`}
                    >
                      <div className="absolute inset-x-1 bottom-1 flex items-end gap-0.5 h-[72px]">
                        <div
                          className="flex-1 bg-butter border border-ink rounded-sm"
                          style={{ height: `${(d / 100) * 100}%` }}
                        />
                        <div
                          className={[
                            "flex-1 border border-ink rounded-sm",
                            m < 55 ? "bg-coral" : m < 60 ? "bg-butter-deep" : "bg-teal",
                          ].join(" ")}
                          style={{ height: `${(m / 100) * 100}%` }}
                        />
                      </div>
                      <div className="absolute top-1 left-0 right-0 text-center font-mono text-[9px] text-ink/65 font-bold">
                        e{e}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center gap-4 font-mono text-[10px] text-ink/55">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 bg-butter border border-ink" />
                  {task.label}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 bg-teal border border-ink" />
                  MMLU
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/45 leading-relaxed max-w-3xl">
          基础数据：arXiv:2601.18699（连续 SFT 后 1-2 epoch 几乎不掉，3-5 epoch 急速下降，
          ScienceQA 95.2% → 76.1%）；arXiv:2507.05386（SFT 平均 forgetting -10.4%）。
          MMLU 基线取 Llama 3.1 8B Instruct ≈ 65（lmsys 2026/03 综合）。
        </p>
      </div>
    </section>
  );
};

/* ─── 双 bar 子组件 ─── */

const BarRow: React.FC<{
  label: string;
  sub: string;
  value: number;
  max: number;
  tone: "butter" | "coral" | "teal" | "butter-deep";
  delta?: number;
  deltaSuffix?: string;
}> = ({ label, sub, value, max, tone, delta, deltaSuffix }) => {
  const bg =
    tone === "butter"
      ? "bg-butter"
      : tone === "coral"
      ? "bg-coral"
      : tone === "teal"
      ? "bg-teal"
      : "bg-butter-deep";

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <div>
          <span className="font-display text-[15px] font-bold text-ink">{label}</span>
          <span className="font-mono text-[10px] text-ink/55 ml-2">{sub}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[24px] font-bold text-ink leading-none tabular-nums">
            {value.toFixed(1)}
          </span>
          {delta !== undefined && (
            <span
              className={[
                "font-mono text-[11px] tabular-nums",
                delta >= 0 ? "text-teal" : "text-coral",
              ].join(" ")}
            >
              {delta >= 0 ? "+" : ""}
              {delta.toFixed(1)} {deltaSuffix}
            </span>
          )}
        </div>
      </div>
      <div className="relative h-7 bg-ink/8 border-2 border-ink rounded-md overflow-hidden">
        <div
          className={[bg, "h-full transition-all duration-300 ease-spring"].join(" ")}
          style={{ width: `${(value / max) * 100}%` }}
        />
        {/* 50% / 65% 基线参考线 */}
        <div
          className="absolute top-0 bottom-0 border-l-2 border-dashed border-ink/40"
          style={{ left: "65%" }}
        />
      </div>
    </div>
  );
};

export default SectionDanger;
