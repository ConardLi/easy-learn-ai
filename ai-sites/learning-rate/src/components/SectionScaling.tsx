/**
 * Section 05 · LR 跟 Batch Size 的关系（linear scaling 计算器）
 *
 * 反模板：双 slider 计算器范式 + 一根可视化条对比新旧 lr。
 *   - 不抢 batch-size 的"4 数轴联动"（这里只调比例 + 看输出）
 *   - 跟 hero 的连续 slider 也不同 —— 这里 2 个 slider 联动，给一个公式输出
 *
 * 反直觉：
 *   ─ 论文加 batch 256 → 4096 时 lr 跟着 ×16，不然训不动
 *   ─ Goyal 2017: ResNet-50 ImageNet 1 hour，linear scaling rule + warmup
 *   ─ AdamW 上规则没那么严格（√k 也有人用），但 SGD 是必须
 *
 * 可动元素：
 *   - baseline batch slider（L3）
 *   - new batch slider（L3）
 *   - rule pill（linear / sqrt）（L2）
 */
import React, { useState, useMemo } from "react";
import { ExternalLink } from "lucide-react";

const RULE_OPTIONS = [
  { id: "linear", label: "Linear（SGD 默认）", multiplier: (k: number) => k, formula: "lr_new = lr_base · k" },
  { id: "sqrt", label: "Sqrt（AdamW 折中）", multiplier: (k: number) => Math.sqrt(k), formula: "lr_new = lr_base · √k" },
];

const SectionScaling: React.FC = () => {
  const [baseBatch, setBaseBatch] = useState(256);
  const [newBatch, setNewBatch] = useState(2048);
  const [ruleId, setRuleId] = useState("linear");
  const [baseLR, setBaseLR] = useState(0.0001); // 1e-4

  const rule = RULE_OPTIONS.find((r) => r.id === ruleId)!;

  const k = newBatch / baseBatch;
  const newLR = useMemo(() => baseLR * rule.multiplier(k), [baseLR, rule, k]);

  /* warmup 必要性提示 */
  const warmupNeeded = k > 4;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-butter-tint border-y-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">scaling rule</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3">
          batch 涨 k 倍，lr 也得跟着涨 k 倍
        </h2>
        <p className="max-w-2xl text-[16px] text-ink/75 leading-relaxed mb-6">
          换一台机器，把 batch 从 256 加到 2048（×8），原来的 lr 直接跑会让训练慢 8 倍。
          Goyal 2017 给了一行 rule：<span className="font-mono">batch ↑ k，lr ↑ k</span>，再配 5 epoch warmup。
        </p>

        {/* 分锅 + 互链：batch 怎么拆、effective batch 怎么乘，去批大小站 */}
        <a
          href="../batch-size/index.html"
          className="mb-10 inline-flex items-start gap-3 max-w-2xl px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">这里的 k 是哪个 batch？</span>
            <span className="text-ink/70">
              {" "}
              这站讲换 batch 时 lr 该乘多少；batch 本身怎么拆成 micro × 累积 × 多卡、effective batch 怎么乘出来 —— 去《批大小》那一站。
            </span>
          </span>
        </a>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 左：双 slider + 规则切换 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① baseline 配置
              </div>

              <div className="mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                    base batch
                  </span>
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {baseBatch.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={64}
                  max={2048}
                  step={64}
                  value={baseBatch}
                  onChange={(e) => setBaseBatch(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer mt-1"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                    base lr
                  </span>
                  <span className="font-display text-[22px] font-bold text-ink tabular-nums">
                    {baseLR.toExponential(1)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={Math.log10(baseLR / 1e-6) * 8.33}
                  onChange={(e) => {
                    const exp = -6 + (Number(e.target.value) / 50) * 6;
                    setBaseLR(Math.pow(10, exp));
                  }}
                  className="w-full accent-coral cursor-pointer mt-1"
                />
                <div className="flex justify-between mt-0.5 font-mono text-[10px] text-ink/40">
                  <span>1e-6</span>
                  <span>1e-3</span>
                  <span>1</span>
                </div>
              </div>
            </div>

            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② 新 batch
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55">
                    new batch
                  </span>
                  <span className="font-display text-[28px] font-bold text-coral tabular-nums">
                    {newBatch.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={64}
                  max={32768}
                  step={64}
                  value={newBatch}
                  onChange={(e) => setNewBatch(Number(e.target.value))}
                  className="w-full accent-coral cursor-pointer mt-1"
                />
                <div className="flex justify-between mt-0.5 font-mono text-[10px] text-ink/40">
                  <span>64</span>
                  <span>4k</span>
                  <span>32k</span>
                </div>
              </div>

              <div className="mt-3 font-mono text-[11px] text-ink/55">
                k = new / base = <span className="text-ink font-bold">{k.toFixed(2)}×</span>
              </div>
            </div>

            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ③ scaling rule
              </div>
              <div className="space-y-1.5">
                {RULE_OPTIONS.map((r) => {
                  const on = r.id === ruleId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setRuleId(r.id)}
                      className={[
                        "w-full text-left px-3 py-2 border-2 border-ink rounded-xl transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-cream text-ink hover:bg-white",
                      ].join(" ")}
                    >
                      <div className="font-display text-[14px] font-bold leading-tight">{r.label}</div>
                      <div className={`font-mono text-[10.5px] mt-0.5 ${on ? "text-cream/70" : "text-ink/55"}`}>
                        {r.formula}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：结果 + 对比条 + warmup 提示 */}
          <div className="lg:col-span-7 space-y-4">
            {/* 结果大卡 */}
            <div className="card-stamp p-5 lg:p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                ④ 计算输出
              </div>

              <div className="font-mono text-[14px] text-ink/65 mt-2">
                lr_new = <span className="text-ink font-bold tabular-nums">{baseLR.toExponential(2)}</span> ·{" "}
                {ruleId === "linear" ? (
                  <>
                    <span className="text-coral font-bold tabular-nums">{k.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    √<span className="text-coral font-bold tabular-nums">{k.toFixed(2)}</span> ={" "}
                    <span className="text-coral font-bold tabular-nums">{Math.sqrt(k).toFixed(2)}</span>
                  </>
                )}
              </div>

              <div className="font-display text-[44px] lg:text-[56px] font-bold text-ink mt-4 tabular-nums leading-none">
                {newLR.toExponential(2)}
              </div>
              <div className="font-mono text-[11px] text-ink/55 mt-1">
                lr_new （AdamW 单位）
              </div>

              {/* 对比条 */}
              <div className="mt-6 grid grid-cols-[80px_1fr] items-center gap-3">
                <div className="font-mono text-[10px] text-ink/55 text-right">base</div>
                <BarRow value={baseLR} max={Math.max(baseLR, newLR)} color="ink" />
                <div className="font-mono text-[10px] text-coral text-right font-bold">new</div>
                <BarRow value={newLR} max={Math.max(baseLR, newLR)} color="coral" />
              </div>
            </div>

            {/* warmup 必要性提示 */}
            <div
              className={[
                "card-stamp p-5",
                warmupNeeded ? "bg-butter-soft" : "bg-white",
              ].join(" ")}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                {warmupNeeded ? "⚠ 还得加 warmup" : "✓ k 不大，不强制 warmup"}
              </div>
              <p className="text-[13.5px] text-ink/85 leading-relaxed">
                {warmupNeeded
                  ? "k > 4 时大 lr 会让头几步炸。从 base lr 线性升到 new lr，5 epoch 内升完。"
                  : "k 小于 4 时跳过 warmup 一般 OK。如果 base lr 已经接近上限，加上 warmup 更保险。"}
              </p>
              <p className="mt-2 font-mono text-[10px] text-ink/45">
                来源：Goyal 2017 arXiv:1706.02677 · ImageNet in 1 hour
              </p>
            </div>

            {/* 真实 LLM 案例 */}
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                Llama 3.1 405B 的做法（参考）
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <Step n="1" body="batch 4M" sub="head 252M tokens" />
                <Step n="2" body="batch 8M" sub="到 2.87T tokens" />
                <Step n="3" body="batch 16M" sub="剩下全程" />
              </div>
              <p className="mt-3 text-[12.5px] text-ink/75 leading-snug">
                lr 全程 8e-5 不变 —— Meta 的做法是「先小 batch 稳住，再大 batch 提速」：lr 不缩，batch 阶梯式涨。
              </p>
              <p className="mt-2 font-mono text-[10px] text-ink/45">
                来源：Llama 3 herd arXiv:2407.21783 · §3.4.1 Initial Pre-Training
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BarRow: React.FC<{ value: number; max: number; color: "ink" | "coral" }> = ({ value, max, color }) => {
  const pct = max <= 0 ? 0 : Math.min(100, (value / max) * 100);
  return (
    <div className="h-7 bg-cream border-2 border-ink rounded-md overflow-hidden relative">
      <div
        className={[
          "h-full transition-all duration-400 ease-spring",
          color === "coral" ? "bg-coral" : "bg-ink",
        ].join(" ")}
        style={{ width: `${pct}%` }}
      />
      <div className="absolute inset-0 flex items-center px-2">
        <span className="font-mono text-[10.5px] font-bold text-ink/85 tabular-nums">
          {value.toExponential(2)}
        </span>
      </div>
    </div>
  );
};

const Step: React.FC<{ n: string; body: string; sub: string }> = ({ n, body, sub }) => (
  <div className="bg-cream border-2 border-ink rounded-xl px-3 py-2.5">
    <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">stage {n}</div>
    <div className="font-display text-[16px] font-bold text-ink mt-0.5 tabular-nums">{body}</div>
    <div className="font-mono text-[10px] text-ink/55 mt-0.5">{sub}</div>
  </div>
);

export default SectionScaling;
