/**
 * Section 04 · 真实 LLM 的 lr 配方表
 *
 * 反模板：8 个真实 LLM 的 LR 配方，左 chip 选模型 / 右一张「卡片仪表盘」+ 横向条对比图。
 *   - 范式是 chip 阵列 + matrix detail，不抢前面的 schedule chip
 *   - 跟 epochs 的"6 模型横切" / loss 的"chip 选场景"形式不同 —— 这里强调具体数字
 *
 * 反直觉点：
 *   ─ Llama 3.1 405B 的 peak LR 是 8e-5，比 8B 的 3e-4 还小 4 倍
 *   ─ GPT-3 175B 是 0.6e-4，越大模型 LR 越小（rough 1/√N 经验律）
 *   ─ DeepSeek V3 用的是 WSD-like 多段，不是 cosine
 *   ─ LoRA / RLHF 比预训练 LR 差三个数量级
 *
 * 可动元素：
 *   - 8 chip 切换（L2）
 *   - 数据范围 toggle（peak / min / warmup）—— 切换右下条对比维度（L2）
 */
import React, { useState } from "react";

type Recipe = {
  id: string;
  name: string;
  size: string;
  peakLR: number;
  minLR: number;
  warmupSteps: number;
  totalSteps: number; // 训练总 step（M）
  scheduler: string;
  optimizer: string;
  source: string;
  highlight: string;
};

/* 单位：peakLR / minLR 都是绝对值 · warmupSteps 是绝对步数 · totalSteps 单位 step */
const RECIPES: Recipe[] = [
  {
    id: "llama-31-405b",
    name: "Llama 3.1 405B",
    size: "405B 全参预训",
    peakLR: 8e-5,
    minLR: 8e-7,
    warmupSteps: 8000,
    totalSteps: 1_200_000,
    scheduler: "Warmup + Cosine",
    optimizer: "AdamW",
    source: "Meta arXiv:2407.21783 · Table 4",
    highlight: "迄今最大开源模型 LR · 比 8B 还小 4 倍",
  },
  {
    id: "llama-31-70b",
    name: "Llama 3.1 70B",
    size: "70B 全参预训",
    peakLR: 1.5e-4,
    minLR: 1.5e-6,
    warmupSteps: 8000,
    totalSteps: 1_200_000,
    scheduler: "Warmup + Cosine",
    optimizer: "AdamW",
    source: "Meta arXiv:2407.21783 · Table 3",
    highlight: "中等档 · peak 1.5e-4 是大多数 70B 起点",
  },
  {
    id: "llama-31-8b",
    name: "Llama 3.1 8B",
    size: "8B 全参预训",
    peakLR: 3e-4,
    minLR: 3e-6,
    warmupSteps: 8000,
    totalSteps: 1_200_000,
    scheduler: "Warmup + Cosine",
    optimizer: "AdamW",
    source: "Meta arXiv:2407.21783 · Table 3",
    highlight: "小模型可以用更大 lr · 跟 GPT-3 1.3B 一致",
  },
  {
    id: "gpt-3",
    name: "GPT-3 175B",
    size: "175B 全参预训",
    peakLR: 0.6e-4,
    minLR: 0.6e-5,
    warmupSteps: 30_000, // 约 375M tokens / 12.5K tokens per step (B=3.2M tokens)
    totalSteps: 93_750,
    scheduler: "Warmup + Cosine to 10%",
    optimizer: "Adam",
    source: "Brown 2020 arXiv:2005.14165 · Table 2.1",
    highlight: "0.6e-4 是史上最低 peak · 模型越大 lr 越小",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    size: "671B (37B 激活) MoE 预训",
    peakLR: 2.2e-4,
    minLR: 7.3e-6,
    warmupSteps: 2000,
    totalSteps: 1_900_000,
    scheduler: "WSD 多段（warmup + 长 const + 两段 decay）",
    optimizer: "AdamW",
    source: "DeepSeek arXiv:2412.19437 · §4",
    highlight: "不用 cosine · 14.8T tokens 多段不连续 decay",
  },
  {
    id: "llama-4-maverick",
    name: "Llama 4 Maverick",
    size: "400B (17B 激活) MoE 预训",
    peakLR: 0,
    minLR: 0,
    warmupSteps: 0,
    totalSteps: 0,
    scheduler: "MetaP (per-layer 自动)",
    optimizer: "AdamW",
    source: "Meta blog 2025-04 · MetaP Medium 解读",
    highlight: "Meta 改用 MetaP 给每层各调 lr · 不再公布单一全局值",
  },
  {
    id: "lora-default",
    name: "LoRA / QLoRA 默认",
    size: "PEFT · 7B-70B 微调",
    peakLR: 2e-4,
    minLR: 0,
    warmupSteps: 0,
    totalSteps: 1500,
    scheduler: "Cosine + 3-5% warmup",
    optimizer: "paged AdamW 8bit",
    source: "Unsloth / HF / machinelearningplus 2026",
    highlight: "LoRA 比全参 ×10 · ≥5e-4 易 NaN",
  },
  {
    id: "rlhf-ppo",
    name: "RLHF · PPO 阶段",
    size: "对齐",
    peakLR: 1.41e-5,
    minLR: 0,
    warmupSteps: 0,
    totalSteps: 5000,
    scheduler: "Constant",
    optimizer: "AdamW",
    source: "TRL 默认 · Anthropic Constitutional AI",
    highlight: "再小 10× · 防对齐时把基模知识打飞",
  },
];

const SectionRecipes: React.FC = () => {
  const [activeId, setActiveId] = useState("llama-31-405b");
  const active = RECIPES.find((r) => r.id === activeId)!;

  /* 横向 bar 对比维度 */
  const [metric, setMetric] = useState<"peak" | "warmupSteps">("peak");

  /* 计算 bar 数据（log 归一化） */
  const barData = RECIPES
    .filter((r) => r.peakLR > 0) // Llama 4 没公开数值，跳过
    .map((r) => {
      const v = metric === "peak" ? r.peakLR : r.warmupSteps;
      return { id: r.id, name: r.name, v };
    });

  const maxV = Math.max(...barData.map((d) => d.v));
  const minV = Math.max(1e-9, Math.min(...barData.map((d) => d.v)));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">real LLM recipes</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3">
          越大的模型，反而 lr 越小
        </h2>
        <p className="max-w-2xl text-[16px] text-ink/75 leading-relaxed mb-10">
          GPT-3 175B 用 6e-5，Llama 3.1 405B 用 8e-5，但 8B 反而是 3e-4。
          经验律：peak lr 大约按 1/√(模型宽度) 缩。RLHF 比预训练再小三个数量级。
        </p>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* 左：8 chip 列表 */}
          <div className="lg:col-span-4">
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                选一个模型 / 阶段
              </div>
              <div className="space-y-1.5 max-h-[460px] overflow-y-auto">
                {RECIPES.map((r) => {
                  const on = r.id === activeId;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveId(r.id)}
                      className={[
                        "w-full text-left px-3 py-2.5 border-2 border-ink rounded-xl transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-cream text-ink hover:bg-white",
                      ].join(" ")}
                    >
                      <div className="font-display text-[14px] font-bold leading-tight">{r.name}</div>
                      <div className={`font-mono text-[10.5px] mt-0.5 ${on ? "text-cream/70" : "text-ink/55"}`}>
                        {r.size}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：详情大卡 + 横向对比 bar */}
          <div className="lg:col-span-8 space-y-4">
            {/* 详情大卡 */}
            <div className="card-stamp p-5 lg:p-6" key={active.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    模型 / 阶段
                  </div>
                  <h3 className="font-display text-display-lg text-ink leading-tight">{active.name}</h3>
                  <div className="font-mono text-[11px] text-ink/55 mt-1">{active.size}</div>
                </div>
                <span className="px-3 py-1 bg-butter border-2 border-ink rounded-full font-mono text-[10px] font-bold text-ink">
                  {active.scheduler}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Metric
                  label="peak lr"
                  value={active.peakLR > 0 ? formatLR(active.peakLR) : "未公开"}
                  tone={active.peakLR > 0 ? "coral" : "muted"}
                />
                <Metric
                  label="min lr"
                  value={active.minLR > 0 ? formatLR(active.minLR) : active.peakLR === 0 ? "未公开" : "0"}
                  tone="ink"
                />
                <Metric
                  label="warmup steps"
                  value={active.warmupSteps > 0 ? active.warmupSteps.toLocaleString() : active.id === "llama-4-maverick" ? "—" : "0"}
                  tone="teal"
                />
                <Metric
                  label="optimizer"
                  value={active.optimizer}
                  tone="ink"
                />
              </div>

              {/* highlight + source */}
              <div className="mt-5 pt-4 border-t border-ink/10 grid md:grid-cols-2 gap-3">
                <div className="bg-butter-tint border-2 border-ink rounded-xl px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    一句话事实
                  </div>
                  <div className="text-[13.5px] text-ink leading-snug">{active.highlight}</div>
                </div>
                <div className="bg-cream border-2 border-ink rounded-xl px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                    来源
                  </div>
                  <div className="font-mono text-[11px] text-ink/85 leading-snug">{active.source}</div>
                </div>
              </div>
            </div>

            {/* 横向 bar 对比 */}
            <div className="card-stamp p-5 lg:p-6">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  横向对比 · log scale
                </div>
                <div className="flex gap-1">
                  {(["peak", "warmupSteps"] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetric(m)}
                      className={[
                        "px-3 py-1 border-2 border-ink rounded-full font-mono text-[10px] font-bold transition-all duration-250",
                        metric === m
                          ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      {m === "peak" ? "peak lr" : "warmup steps"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {barData.map((d) => {
                  const ratio = d.v <= 0 ? 0 :
                    /* log 归一化：(log(v) - log(min)) / (log(max) - log(min)) */
                    (Math.log10(d.v) - Math.log10(minV)) / Math.max(0.001, Math.log10(maxV) - Math.log10(minV));
                  const pct = Math.max(2, Math.min(100, ratio * 100));
                  const isActive = d.id === activeId;
                  return (
                    <div key={d.id} className="grid grid-cols-12 items-center gap-2">
                      <div className={`col-span-4 font-mono text-[11px] truncate ${isActive ? "text-coral font-bold" : "text-ink/85"}`}>
                        {d.name}
                      </div>
                      <div className="col-span-6 h-5 bg-cream border-2 border-ink rounded-md overflow-hidden relative">
                        <div
                          className={`h-full transition-all duration-400 ease-spring ${isActive ? "bg-coral" : "bg-ink/85"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className={`col-span-2 text-right font-mono text-[11px] tabular-nums ${isActive ? "text-coral font-bold" : "text-ink/85"}`}>
                        {metric === "peak" ? formatLR(d.v) : (d.v >= 1000 ? (d.v / 1000).toFixed(1) + "k" : d.v)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/45">
                Llama 4 用 MetaP 给每一层不同 lr · 全局 peak 已不再适用，故未在条形图中。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function formatLR(lr: number): string {
  if (lr === 0) return "0";
  return lr.toExponential(1).replace("e+0", "e").replace("e-0", "e-");
}

const Metric: React.FC<{ label: string; value: string; tone: "coral" | "ink" | "teal" | "muted" }> = ({
  label,
  value,
  tone,
}) => {
  const colorCls =
    tone === "coral" ? "text-coral" :
      tone === "teal" ? "text-teal" :
        tone === "muted" ? "text-ink/40" : "text-ink";
  return (
    <div className="bg-cream border-2 border-ink rounded-xl px-3 py-2.5">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
        {label}
      </div>
      <div className={`font-display text-[18px] font-bold tabular-nums leading-tight ${colorCls}`}>
        {value}
      </div>
    </div>
  );
};

export default SectionRecipes;
