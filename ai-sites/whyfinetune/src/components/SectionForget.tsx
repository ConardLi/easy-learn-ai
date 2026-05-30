/**
 * Section 05 · Forget · 微调灌事实的灾难
 *
 * 不复制 rlhf 站的"reward hack 红框"。这里走「灾难案例 accordion + 三柱对比」。
 *
 * 数据来源：
 *   arXiv:2601.18699 Mechanistic Analysis of Catastrophic Forgetting (2026/01)
 *   arXiv:2501.13669 Mitigating Catastrophic Forgetting in LLM (2025/01)
 *   IBM Think · Catastrophic Forgetting 综述
 *
 * 三柱：注意力头被搅 / CKA 中间层下降 / Q/K 梯度冲突
 * accordion：3 个真实灾难案例
 */
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type Mode = "full" | "lora";

const STATS: { label: string; sub: string; values: Record<Mode, { num: string; unit: string; tone: string }> }[] = [
  {
    label: "下层注意力头被搅",
    sub: "Q/K projection 冲突最严重",
    values: {
      full: { num: "23", unit: "%", tone: "text-coral" },
      lora: { num: "5", unit: "%", tone: "text-teal" },
    },
  },
  {
    label: "中间层 CKA 下降",
    sub: "表征几何严重漂移",
    values: {
      full: { num: "0.47", unit: "↓", tone: "text-coral" },
      lora: { num: "0.12", unit: "↓", tone: "text-teal" },
    },
  },
  {
    label: "Hessian 主特征值",
    sub: "loss landscape 变平 = 知识不再被锚住",
    values: {
      full: { num: "147 → 34", unit: "λ", tone: "text-coral" },
      lora: { num: "147 → 121", unit: "λ", tone: "text-teal" },
    },
  },
];

interface DisasterCase {
  id: string;
  title: string;
  one: string;
  setup: string;
  what: string;
  why: string;
}

const CASES: DisasterCase[] = [
  {
    id: "policy",
    title: "灌 500 条公司新政策 → 编出根本不存在的条款",
    one: "想让模型记住公司 HR 政策细节，5 epoch 后开始编",
    setup: "500 条「员工手册」问答对，全参微调 7B 模型，5 epoch。",
    what: "训练 loss 一路降，但客服上线后开始虚构「连续工作 3 年自动晋升」这类不存在的条款，且自信满满地引用「员工手册第 17 条」。",
    why: "事实在模型里以「分布式」方式表示，灌新事实 ≈ 改了下一个 token 的概率分布，但缺乏「来源约束」。模型学到的是「这种问题应该有这种答案」，不是「这条规则在文档第几页」。RAG + 引用是这类任务的正解。",
  },
  {
    id: "json",
    title: "想教 JSON 格式 → 顺手把通用对话训没了",
    one: "1.2k 条 API 输出，全参微调 → MMLU 掉 8 个点",
    setup: "为了让模型稳定输出 API JSON schema，全参微调 Llama 3 8B，3 epoch。",
    what: "JSON 格式合规率从 78% → 99.4%，但 MMLU 从 68 → 60，闲聊变得机械，遇到非 schema 问题开始死板地塞 JSON 包裹。",
    why: "全参微调动了下层 attention，把通用语言能力一起改了。换成 LoRA（rank 8）只动 1% 参数，schema 合规率 99%，MMLU 只掉 0.5。同样目标，方法不同结果差 16 倍。",
  },
  {
    id: "medical",
    title: "灌 2k 条医疗问答 → 数学和代码全废",
    one: "全参微调专业医疗 → HumanEval 直降 11 点",
    setup: "2000 条临床诊断问答，全参 SFT 70B 模型，4 epoch。",
    what: "MedQA 提升 9 个点（好），但 HumanEval 从 81 → 70，GSM8K 从 89 → 78。模型变成「只懂医生说话」的版本，再问写代码就开始用医学术语。",
    why: "训练数据分布差异越大，遗忘越严重。最新研究（arXiv 2601.18699）发现下层注意力头会被「抢走」，原能力的 sharp minima 被磨平，无法靠后续训练恢复。",
  },
];

const SectionForget: React.FC = () => {
  const [mode, setMode] = useState<Mode>("full");
  const [openId, setOpenId] = useState<string>(CASES[0].id);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">finetune · pitfall</span>
        </div>

        <h2 className="font-display text-display-lg text-ink max-w-3xl mb-3">
          灌事实进权重，常常把模型搞坏
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-9">
          微调不是免费的。每往里塞一批新数据，模型的下层注意力会被「抢」走一部分，
          通用能力跟着掉。看具体掉多少。
        </p>

        {/* 顶部：mode 切换 */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50">
            微调方式
          </span>
          {(["full", "lora"] as Mode[]).map((m) => {
            const on = m === mode;
            const label = m === "full" ? "全参微调（Full FT）" : "LoRA · 只动 1% 参数";
            return (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={[
                  "px-4 py-2 rounded-full border-2 border-ink transition-all duration-250 ease-spring font-semibold text-[13px]",
                  on
                    ? m === "full"
                      ? "bg-coral text-white shadow-stamp -translate-y-0.5"
                      : "bg-teal text-cream shadow-stamp -translate-y-0.5"
                    : "bg-white text-ink hover:bg-cream",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* 三柱数字 */}
        <div className="grid sm:grid-cols-3 gap-4 mb-12">
          {STATS.map((s, i) => {
            const v = s.values[mode];
            return (
              <div
                key={i}
                className="card-stamp p-5"
                style={{ background: mode === "full" ? "#fff5f0" : "#f0f8f7" }}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                  metric · {i + 1}
                </div>
                <div className="flex items-baseline gap-1.5 mb-1.5" key={`${mode}-${i}`}>
                  <span className={`font-display text-[34px] font-bold leading-none tabular-nums animate-enter-pop ${v.tone}`}>
                    {v.num}
                  </span>
                  <span className="font-mono text-[12px] text-ink/55">{v.unit}</span>
                </div>
                <div className="font-semibold text-[13px] text-ink mb-1">{s.label}</div>
                <div className="text-[11.5px] text-ink/60 leading-snug">{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* accordion · 灾难案例 */}
        <div className="mb-6">
          <h3 className="font-display font-bold text-[20px] text-ink mb-1">
            三个真实灾难
          </h3>
          <p className="text-[14px] text-ink/65 mb-5">
            点开看完整经过、为啥会塌、应该怎么避。
          </p>
          <div className="space-y-2.5">
            {CASES.map((c) => {
              const open = c.id === openId;
              return (
                <div
                  key={c.id}
                  className={[
                    "border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300 ease-spring",
                    open ? "bg-white shadow-stamp" : "bg-cream/50",
                  ].join(" ")}
                >
                  <button
                    onClick={() => setOpenId(open ? "" : c.id)}
                    className="w-full px-5 py-4 flex items-start justify-between gap-4 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-[15.5px] text-ink leading-snug mb-1">
                        {c.title}
                      </div>
                      <div className="font-mono text-[11px] text-ink/55">{c.one}</div>
                    </div>
                    <ChevronDown
                      className={[
                        "w-5 h-5 shrink-0 mt-0.5 transition-transform duration-300 ease-spring",
                        open ? "rotate-180 text-coral" : "text-ink/50",
                      ].join(" ")}
                      strokeWidth={2.4}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 grid md:grid-cols-3 gap-4 animate-enter-fade">
                      <div className="bg-cream border border-ink/15 rounded-lg p-3">
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45 mb-1">
                          setup
                        </div>
                        <p className="text-[12.5px] text-ink/85 leading-snug">{c.setup}</p>
                      </div>
                      <div className="bg-cream border border-ink/15 rounded-lg p-3">
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-coral mb-1">
                          what happened
                        </div>
                        <p className="text-[12.5px] text-ink/85 leading-snug">{c.what}</p>
                      </div>
                      <div className="bg-butter-tint border border-ink/15 rounded-lg p-3">
                        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                          root cause
                        </div>
                        <p className="text-[12.5px] text-ink/85 leading-snug">{c.why}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-7 font-mono text-[10px] text-ink/40">
          数据来源：Mechanistic Analysis of Catastrophic Forgetting arXiv:2601.18699（2026/01，
          研究 109B~1.5T 模型）· Mitigating Catastrophic Forgetting arXiv:2501.13669 ·
          IBM Research Think 综述
        </p>
      </div>
    </section>
  );
};

export default SectionForget;
