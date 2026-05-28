/**
 * Section 05 · LLM 训练的 loss 全家桶
 *
 * 反相邻：上一节是 slider + 公式逐项展开。这里换 4 个 tab + 2 视图 toggle（公式 / 工业实测）。
 *
 * 内容：现代 LLM 流水线上的 4 个 loss
 *   ─ Pretrain CE · 下一 token NLL
 *   ─ SFT · 仅在 assistant 回复部分算 CE
 *   ─ DPO · 偏好对的 log-sigmoid
 *   ─ GRPO · PPO 砍掉 critic + KL 进 loss
 *
 * 数据来源：
 *   ─ DeepSeek-V3 Technical Report (arXiv:2412.19437)
 *   ─ Llama 3 Herd of Models (arXiv:2407.21783)
 *   ─ DPO 原论文 + Tinker Cookbook 默认值
 *   ─ DeepSeekMath GRPO (arXiv:2402.03300)
 */
import React, { useState } from "react";

type LossKey = "pretrain" | "sft" | "dpo" | "grpo";

type LossRow = {
  key: LossKey;
  label: string;
  cn: string;
  formula: string;
  formulaPlain: string;
  oneLine: string;
  realModel: {
    name: string;
    config: { label: string; value: string }[];
    source: string;
  };
  insight: string;
};

const LOSSES: LossRow[] = [
  {
    key: "pretrain",
    label: "Pretrain",
    cn: "next-token CE",
    formula: "L = −(1/T) Σₜ log pθ(xₜ | x<ₜ)",
    formulaPlain: "把每个 token 的 -log(模型给它的概率) 加起来取平均",
    oneLine: "让模型把训练语料里每个下一 token 的概率算得越大越好。最朴素的 LLM loss。",
    realModel: {
      name: "DeepSeek-V3 · 671 B MoE",
      config: [
        { label: "训练 tokens", value: "14.8 T" },
        { label: "学习率", value: "2.2e-4 → 7.3e-6 cosine" },
        { label: "batch ramp", value: "3072 → 15360 seqs" },
        { label: "MTP 辅助 loss λ", value: "0.3 → 0.1" },
        { label: "balance loss α", value: "0.0001" },
      ],
      source: "arXiv:2412.19437 · 2024-12",
    },
    insight:
      "DeepSeek V3 在主 CE 之外加了 MTP（multi-token prediction）副 loss，并用「auxiliary-loss-free」做 MoE 负载均衡 —— 这是 2024-2026 间最有影响的 pretrain loss 改动。",
  },
  {
    key: "sft",
    label: "SFT",
    cn: "supervised fine-tuning",
    formula: "L = −(1/N) Σᵢ mask(i)·log pθ(yᵢ | x, y<ᵢ)",
    formulaPlain: "还是 CE，但只在 assistant 回复部分算，prompt 全 mask 掉",
    oneLine: "拿几千到几万条人类示例，教模型「应该这么回答」的格式和风格。",
    realModel: {
      name: "工业常用配置 · 7-70 B base",
      config: [
        { label: "数据量", value: "5 K – 200 K 条" },
        { label: "epoch", value: "1 – 3" },
        { label: "LR", value: "1e-5 – 5e-5" },
        { label: "loss mask", value: "prompt 区域全 0" },
        { label: "warmup", value: "首 3% steps" },
      ],
      source: "Axolotl / Unsloth / Tinker Cookbook 2026/05",
    },
    insight:
      "SFT loss 跟 pretrain 是同一个 CE 公式，差别只在 mask —— 但这一个 mask 决定了「学风格」还是「学知识」。1-3 epoch 收，再训就开始背训练集。",
  },
  {
    key: "dpo",
    label: "DPO",
    cn: "direct preference optimization",
    formula:
      "L = −E log σ( β·log[πθ(yw|x)/πref(yw|x)] − β·log[πθ(yl|x)/πref(yl|x)] )",
    formulaPlain:
      "二分类的 log-sigmoid · 让「赢家 yw」的 log-prob 比「输家 yl」涨得更多",
    oneLine:
      "拿 (prompt, chosen, rejected) 三元组直接做二分类，不用训 reward model。",
    realModel: {
      name: "Tinker Cookbook 默认 / Llama 3 Instruct",
      config: [
        { label: "β（KL 强度）", value: "0.1 · 默认" },
        { label: "数据形式", value: "(prompt, yw, yl) 对" },
        { label: "需要 reward 模型", value: "不需要" },
        { label: "参考模型 πref", value: "SFT checkpoint · 冻结" },
        { label: "训练阶段", value: "SFT 之后 · RL 之前 / 替代" },
      ],
      source: "Rafailov et al. 2023 · Tinker Cookbook 2026",
    },
    insight:
      "DPO 把 RLHF 那套 reward model + PPO 整个砍掉，loss 就是一个 logistic regression。β 越大模型越贴 πref，越小越激进 —— 默认 0.1 是「保守但起效」的甜点。",
  },
  {
    key: "grpo",
    label: "GRPO",
    cn: "group-relative policy optimization",
    formula:
      "L = −(1/G) Σᵢ [ min(rᵢAᵢ, clip(rᵢ, 1−ε, 1+ε)·Aᵢ) − β·DKL(πθ ‖ πref) ]",
    formulaPlain:
      "PPO 的 clipped surrogate，但 advantage A 用 group 内部 reward 归一化算，省掉 critic",
    oneLine:
      "对一个 prompt 采 G 个回答，组内 reward 算 (R − mean)/std 当 advantage，再做 PPO 风格的策略更新。",
    realModel: {
      name: "DeepSeek-Math / R1 / V3 推理后训练",
      config: [
        { label: "group size G", value: "8 – 16" },
        { label: "clip ε", value: "0.2" },
        { label: "KL β", value: "0.04 · KL 进 loss 不进 reward" },
        { label: "advantage", value: "(R − mean(R)) / std(R)" },
        { label: "省掉的网络", value: "critic / value head" },
      ],
      source: "DeepSeekMath arXiv:2402.03300 · DeepSeek-V3 报告",
    },
    insight:
      "PPO 同时要训 actor + critic + reward + ref 四张网络，GRPO 砍掉 critic，显存省一半。代价是 advantage 偏差更大，但在「答案能直接打分」的任务（数学 / 代码）上 anyways 够用。",
  },
];

const SectionLLMLosses: React.FC = () => {
  const [picked, setPicked] = useState<LossKey>("dpo");
  const [view, setView] = useState<"formula" | "real">("real");

  const cur = LOSSES.find((L) => L.key === picked)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">llm training stack</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 LLM 从 pretrain 走到 alignment，
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">至少要换 3 个 loss</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          每个 loss 解决一段流水线上「我们到底要模型做什么」的问题：
          先学语言、再学回答、再学偏好。下面是 2026 实际用的 4 个 loss，
          带 DeepSeek V3 / Llama 3.1 的真实超参。
        </p>

        {/* tab + view 切换 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LOSSES.map((L, i) => {
              const on = L.key === picked;
              return (
                <button
                  key={L.key}
                  onClick={() => setPicked(L.key)}
                  className={[
                    "p-3 rounded-2xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-stamp-lg"
                      : "bg-white text-ink hover:bg-cream shadow-[2px_2px_0_0_#241C15]",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-mono text-[9px] uppercase tracking-[0.18em] mb-1",
                      on ? "text-butter" : "text-ink/55",
                    ].join(" ")}
                  >
                    stage 0{i + 1}
                  </div>
                  <div className="font-display text-[15px] font-bold leading-tight">
                    {L.label}
                  </div>
                  <div
                    className={[
                      "mt-0.5 font-mono text-[10px]",
                      on ? "text-cream/60" : "text-ink/50",
                    ].join(" ")}
                  >
                    {L.cn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* view toggle */}
          <div className="sm:w-44 p-1 border-2 border-ink rounded-2xl bg-white flex gap-1">
            {(["formula", "real"] as const).map((v) => {
              const on = v === view;
              return (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={[
                    "flex-1 py-2 rounded-xl font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-250 ease-spring",
                    on ? "bg-ink text-cream" : "text-ink/55 hover:bg-cream",
                  ].join(" ")}
                >
                  {v === "formula" ? "公式" : "实测"}
                </button>
              );
            })}
          </div>
        </div>

        {/* 内容卡 */}
        <div
          className="grid lg:grid-cols-12 gap-5"
          key={`${cur.key}-${view}`}
        >
          {/* 左主卡 */}
          <div className="lg:col-span-7 p-5 lg:p-6 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg animate-enter-fade">
            <div className="flex items-baseline justify-between mb-3">
              <div className="font-display text-[24px] font-bold text-ink">
                {cur.label} <span className="font-mono text-[12px] text-ink/55">· {cur.cn}</span>
              </div>
            </div>

            {view === "formula" ? (
              <>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  公式
                </div>
                <div className="p-4 bg-ink text-cream rounded-xl font-mono text-[13.5px] leading-relaxed mb-4 overflow-x-auto">
                  {cur.formula}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                  人话版
                </div>
                <p className="text-[15px] text-ink/85 leading-relaxed">
                  {cur.formulaPlain}
                </p>
              </>
            ) : (
              <>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  谁在用 · 怎么用
                </div>
                <div className="font-display text-[17px] font-bold text-ink mb-3">
                  {cur.realModel.name}
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {cur.realModel.config.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-baseline justify-between gap-3 py-1.5 border-b border-ink/10 last:border-0"
                    >
                      <span className="font-mono text-[12px] text-ink/65">
                        {c.label}
                      </span>
                      <span className="font-mono text-[12.5px] font-bold text-ink text-right">
                        {c.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 font-mono text-[10px] text-ink/40">
                  来源 · {cur.realModel.source}
                </div>
              </>
            )}
          </div>

          {/* 右卡 · 这一阶段干啥 + 内幕 */}
          <div className="lg:col-span-5 space-y-3 animate-enter-fade">
            <div className="p-5 bg-butter/40 border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                一句话总结
              </div>
              <p className="text-[15px] text-ink leading-relaxed">{cur.oneLine}</p>
            </div>
            <div className="p-5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                内幕
              </div>
              <p className="text-[14.5px] text-ink/85 leading-relaxed">
                {cur.insight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLLMLosses;
