/**
 * Section 05 · 让 router 学会平衡
 *
 * 反模板形式：
 *   ─ 不是 before/after 二元 toggle（quantization 没用，但 RAG 用过）
 *   ─ 是 3 策略 + 训练步数 slider 模拟训练，看 8 个 expert 利用率怎么演化
 *
 * 故事：
 *   strategy A · 不管 → 经典 routing collapse，1 个累死 7 个躺平
 *   strategy B · aux loss（Switch Transformer 2021）→ 平衡但 loss 被污染
 *   strategy C · bias only（DeepSeek V3 2024）→ 平衡而且 main loss 更低
 *
 * 可动元素：
 *   ① 3 个 strategy 切换 · pill（L2）
 *   ② 训练步数 slider 0 → 10000（L3）
 */
import React, { useState, useMemo } from "react";

type Strategy = "none" | "aux" | "bias";

const STRAT: { id: Strategy; label: string; sub: string; tone: string }[] = [
  { id: "none", label: "啥都不管", sub: "naive · 典型反例", tone: "#E07A5F" },
  { id: "aux", label: "aux loss", sub: "Switch Transformer · 2021", tone: "#E5BD3A" },
  { id: "bias", label: "bias only", sub: "DeepSeek V3 · 2024", tone: "#1B4B5A" },
];

const EXPERT_COUNT = 8;
const MAX_STEP = 10000;

/** 模拟 strategy 在 step 时刻 8 个 expert 的利用率（和为 1） */
function simulate(strategy: Strategy, step: number): number[] {
  const t = step / MAX_STEP;
  const base = 1 / EXPERT_COUNT;

  if (strategy === "none") {
    /* 不平衡放大：expert 0 越来越胖，1-3 中等，4-7 几乎归 0 */
    const k = Math.min(1, t * 1.4);
    const out: number[] = [];
    /* 用 power 曲线产生"赢者通吃"分布 */
    for (let i = 0; i < EXPERT_COUNT; i++) {
      /* expert 0 拿最多，1 次之，按 1/(i+1)^k 衰减 */
      const w = 1 / Math.pow(i + 1, 1 + k * 4);
      out.push(w);
    }
    /* 与初始均匀加权混合，t=0 时完全均匀，t=1 时完全赢者通吃 */
    return out.map((w, i) => {
      const sum = out.reduce((a, b) => a + b, 0);
      return (1 - t) * base + t * (w / sum);
    });
  }

  if (strategy === "aux") {
    /* 初始有一点偏，随时间收敛到接近均匀但仍有 ±5% 抖 */
    const out: number[] = [];
    for (let i = 0; i < EXPERT_COUNT; i++) {
      const phase = Math.sin((step * 0.001 + i) * 1.5) * 0.04 * Math.exp(-t * 1.5);
      const earlyBias = (i === 0 ? 0.04 : i === 1 ? 0.02 : -0.01) * Math.exp(-t * 2.5);
      out.push(base + phase + earlyBias);
    }
    return normalize(out);
  }

  /* bias only · 收敛更快更稳 */
  const out: number[] = [];
  for (let i = 0; i < EXPERT_COUNT; i++) {
    const phase = Math.sin((step * 0.0008 + i * 0.7) * 1.2) * 0.022 * Math.exp(-t * 3);
    const earlyBias = (i === 0 ? 0.05 : i === 7 ? -0.025 : 0) * Math.exp(-t * 4);
    out.push(base + phase + earlyBias);
  }
  return normalize(out);
}

function normalize(arr: number[]): number[] {
  const s = arr.reduce((a, b) => a + b, 0);
  return arr.map((v) => Math.max(0.005, v / s));
}

/** 模拟 main task loss 随训练步数下降 */
function mainLoss(strategy: Strategy, step: number): number {
  const t = step / MAX_STEP;
  const base = 4.5 * Math.exp(-t * 0.8) + 2.0;
  if (strategy === "none") return base + 0.05; // 看似 loss 低但模型只学一招
  if (strategy === "aux") return base + 0.08; // aux loss 干扰主任务
  return base; // bias-only 最低
}

const SectionBalance: React.FC = () => {
  const [strategy, setStrategy] = useState<Strategy>("none");
  const [step, setStep] = useState(7500);

  const utilization = useMemo(() => simulate(strategy, step), [strategy, step]);
  const loss = useMemo(() => mainLoss(strategy, step), [strategy, step]);

  const maxU = Math.max(...utilization);
  const minU = Math.min(...utilization);
  const stddevU = stddev(utilization);
  const collapseRatio = maxU / (1 / EXPERT_COUNT);

  /* 三策略在当前 step 的小对比图（用于侧面板） */
  const compareAtStep = useMemo(() => {
    return STRAT.map((s) => ({
      ...s,
      util: simulate(s.id, step),
      loss: mainLoss(s.id, step),
    }));
  }, [step]);

  return (
    <section className="relative bg-butter/30 border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">load balancing 101</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          MoE 训练最贵的一节课：
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-cream -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">怎么让 router 不偏心</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          router 是个小打分网络，自己会学。
          如果不监督，它会陷入&ldquo;明星专家&rdquo;反馈循环 —— 越被选越会，越会越被选，最后退化成几乎每次都走同一套参数，跟普通稠密（dense，每次所有参数都参与计算）模型没区别。
          下面拖训练步数，看三种策略各自怎么走。
        </p>

        <div className="grid lg:grid-cols-12 gap-5">
          {/* 左：strategy + slider + 8 expert bars */}
          <div className="lg:col-span-7 space-y-4">
            {/* strategy 3-pick */}
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                ① 选 router 平衡策略
              </div>
              <div className="grid grid-cols-3 gap-2">
                {STRAT.map((s) => {
                  const on = s.id === strategy;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStrategy(s.id)}
                      className={[
                        "p-3 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-stamp-lg"
                          : "bg-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                      ].join(" ")}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div className="w-2 h-2 rounded-full border border-ink" style={{ backgroundColor: s.tone }} />
                        <span className="font-display text-[13.5px] font-bold leading-none">{s.label}</span>
                      </div>
                      <div className={["font-mono text-[9.5px]", on ? "text-cream/60" : "text-ink/55"].join(" ")}>
                        {s.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* training step slider */}
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 训练步数 · drag
                </div>
                <div className="font-display text-[22px] font-bold text-ink tabular-nums leading-none">
                  {(step / 1000).toFixed(1)}
                  <span className="font-mono text-[11px] text-ink/55 ml-1">k step</span>
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={MAX_STEP}
                step={100}
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
              />
              <div className="flex justify-between mt-1 font-mono text-[10px] text-ink/40">
                <span>0</span>
                <span>5k</span>
                <span>10k</span>
              </div>
            </div>

            {/* 8 expert utilization bars */}
            <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp p-5">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  当前 step · 8 个 expert 工作量
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  期望 = 12.5%
                </div>
              </div>
              <div className="space-y-1.5">
                {utilization.map((u, i) => {
                  const pct = u * 100;
                  const dead = pct < 2;
                  const overload = pct > 25;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-14 shrink-0 font-mono text-[10.5px] text-ink/65 tabular-nums">
                        expert {i}
                      </div>
                      <div className="flex-1 h-3 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
                        <div
                          className={[
                            "h-full transition-all duration-300 ease-spring",
                            overload ? "bg-coral" : dead ? "bg-ink/15" : "bg-ink",
                          ].join(" ")}
                          style={{ width: `${Math.max(2, pct * 3)}%` }}
                        />
                      </div>
                      <div className={[
                        "w-14 text-right shrink-0 font-mono text-[11px] tabular-nums",
                        overload ? "text-coral font-bold" : dead ? "text-ink/35" : "text-ink",
                      ].join(" ")}>
                        {pct.toFixed(1)}%
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-ink/10 grid grid-cols-3 gap-2">
                <Stat label="塌缩指数" value={`${collapseRatio.toFixed(2)}×`} tone={collapseRatio >= 2 ? "coral" : collapseRatio >= 1.3 ? "butter" : "teal"} />
                <Stat label="标准差" value={(stddevU * 100).toFixed(2)} tone={stddevU > 0.05 ? "coral" : "ink"} />
                <Stat label="最大占比" value={`${(maxU * 100).toFixed(1)}%`} tone={maxU > 0.25 ? "coral" : "ink"} />
              </div>
            </div>
          </div>

          {/* 右：当前 step 下三策略的横向对比 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-ink text-cream rounded-2xl border-2 border-ink p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-3">
                同一 step · 三策略并排
              </div>
              <div className="space-y-3">
                {compareAtStep.map((s) => {
                  const stratMax = Math.max(...s.util);
                  return (
                    <div key={s.id}>
                      <div className="flex items-baseline justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full border border-cream/30" style={{ backgroundColor: s.tone }} />
                          <span className="font-display text-[12.5px] font-bold text-cream leading-none">
                            {s.label}
                          </span>
                        </div>
                        <div className="font-mono text-[10.5px] text-cream/65 tabular-nums">
                          loss {s.loss.toFixed(3)}
                        </div>
                      </div>
                      {/* 8 个 mini bar */}
                      <div className="flex items-end gap-[2px] h-8 bg-cream/8 rounded p-1 border border-cream/15">
                        {s.util.map((u, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm transition-all duration-300"
                            style={{
                              height: `${Math.max(8, (u / Math.max(stratMax, 0.125)) * 100)}%`,
                              backgroundColor: u > 1 / EXPERT_COUNT * 2 ? "#E07A5F" : s.tone,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 font-mono text-[10px] text-cream/55 leading-relaxed">
                bias-only 的 loss 之所以最低，是因为 aux loss 项本质是个 regularization，
                它在&ldquo;鼓励平衡&rdquo;的同时也<strong className="text-butter">干扰了主任务</strong>。
                把这事拆出来用 bias 偏置纠偏，loss 通道就干净了。
              </p>
            </div>

            {/* 文末 callout */}
            <div className="px-4 py-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                一句话
              </div>
              <p className="font-display text-[16px] font-bold text-ink leading-snug">
                router 平衡是 MoE 的灵魂。
                没监督就塌缩，监督过头又拖累主任务，DeepSeek V3 找到的是中间那条窄路。
              </p>
              <p className="mt-2 font-mono text-[10px] text-ink/40">
                来源 · DeepSeek V3 Tech Report § 2.1.2 · Wang et al. 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{ label: string; value: string; tone: "ink" | "coral" | "butter" | "teal" }> = ({ label, value, tone }) => {
  const c = {
    ink: "text-ink",
    coral: "text-coral",
    butter: "text-butter-deep",
    teal: "text-teal",
  }[tone];
  return (
    <div className="px-2 py-1.5 bg-white border-2 border-ink/20 rounded-lg">
      <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink/55 mb-0.5">{label}</div>
      <div className={`font-display text-[15px] font-bold tabular-nums ${c}`}>{value}</div>
    </div>
  );
};

function stddev(arr: number[]): number {
  const m = arr.reduce((a, b) => a + b, 0) / arr.length;
  return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length);
}

export default SectionBalance;
