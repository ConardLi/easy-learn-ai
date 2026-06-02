import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { Check, X } from "lucide-react";

const QUESTIONS = [
  {
    id: "scarce",
    q: "你的预训练语料快用完了 / 想训新模型但数据不够。",
    fit: 2,
    note: "MGA 的设计就是为了这种场景 — 直接把现有语料扩 3-4 倍。",
  },
  {
    id: "repeat",
    q: "你在反复训同一批数据，validation loss 已经在涨。",
    fit: 2,
    note: "重复退化是 MGA 论文最先解决的问题。可以直接对掉 baseline 重复。",
  },
  {
    id: "small",
    q: "你只有几万样本要做 SFT / 行业微调。",
    fit: 0,
    note: "MGA 是预训练数据增强。小样本 SFT 更适合 EDA / 同义替换 / LLM 改写式 evol-instruct。",
  },
  {
    id: "factual",
    q: "你的任务必须 100% 事实精度（医学、法律 final 文档）。",
    fit: -1,
    note: "改写有偏置风险。可以用 MGA 做预训练阶段扩量，但下游对齐阶段需另配人工校验。",
  },
  {
    id: "compute",
    q: "你算力非常紧 — 没有 GPU 跑改写。",
    fit: -1,
    note: "MGA 需要先跑 3.3B MoE 改写一遍。若实在没算力，直接复用 ByteDance 已开源的 770B MGACorpus。",
  },
  {
    id: "scaling",
    q: "你想训到 7B-13B 甚至更大，关心数据策略的 scaling 性。",
    fit: 2,
    note: "论文 Figure 4 显示 MGA 在 13B 上的领先比 1.3B 更明显，是少数模型越大越占优的合成数据策略。",
  },
];

const VERDICT = {
  fit: { label: "推荐用 MGA", color: "bg-teal text-white", icon: Check },
  ok: { label: "可以用，但要看场景", color: "bg-butter text-ink", icon: Check },
  no: { label: "不太推荐", color: "bg-coral text-white", icon: X },
};

function verdict(fit: number) {
  if (fit >= 2) return VERDICT.fit;
  if (fit >= 0) return VERDICT.ok;
  return VERDICT.no;
}

export default function SectionWhenToUse() {
  const [pick, setPick] = useState<string[]>([]);

  const total = pick.reduce((sum, id) => {
    const q = QUESTIONS.find((x) => x.id === id);
    return sum + (q?.fit ?? 0);
  }, 0);

  const overall =
    pick.length === 0
      ? null
      : total >= 3
      ? "强烈推荐尝试 MGA — 你的场景刚好命中论文目标。"
      : total >= 1
      ? "MGA 可能有用 — 建议在小规模 ablation 上验证。"
      : "你的场景不太适合用 MGA — 看看其他数据增强或合成方法。";

  return (
    <SectionFrame num="07" label="什么时候用 / 不用">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        我的场景该不该用 MGA？
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        勾选下面贴合你情况的描述，下面会给出综合建议。
      </p>

      <div className="grid md:grid-cols-[1.6fr_1fr] gap-8 items-start">
        <div className="space-y-3">
          {QUESTIONS.map((q) => {
            const checked = pick.includes(q.id);
            const v = verdict(q.fit);
            const VI = v.icon;
            return (
              <button
                key={q.id}
                onClick={() =>
                  setPick(
                    checked
                      ? pick.filter((x) => x !== q.id)
                      : [...pick, q.id],
                  )
                }
                className={`w-full text-left card-stamp p-5 transition-all duration-250 ease-spring ${
                  checked
                    ? "bg-butter/40"
                    : "bg-white hover:bg-butter/10"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-6 h-6 rounded-md border-2 border-ink flex-shrink-0 mt-1 flex items-center justify-center ${
                      checked ? "bg-ink" : "bg-white"
                    }`}
                  >
                    {checked && <Check className="w-4 h-4 text-butter" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-ink font-semibold leading-snug mb-2">
                      {q.q}
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono border border-ink ${v.color}`}
                      >
                        <VI className="w-3 h-3" />
                        {v.label}
                      </span>
                      <span className="text-xs text-ink-tertiary leading-snug">
                        {q.note}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:sticky md:top-8">
          <div className="card-stamp p-6 bg-ink text-cream">
            <div className="eyebrow text-butter mb-3">综合建议</div>
            <div className="font-display text-2xl leading-tight mb-5">
              {pick.length === 0 ? "勾几个看看 →" : overall}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <Stat label="勾选" value={pick.length.toString()} />
              <Stat label="加权分" value={total > 0 ? `+${total}` : total.toString()} />
              <Stat
                label="判定"
                value={total >= 3 ? "fit" : total >= 1 ? "ok" : pick.length === 0 ? "—" : "skip"}
              />
            </div>

            <div className="text-xs leading-relaxed text-cream/80 border-t border-cream/20 pt-4">
              这只是个粗略向导。 真正落地时建议先 sample 1% 数据走一遍 MGA pipeline，对比 baseline 看 1B 规模 ablation 再决定全量上。
            </div>
          </div>

          <p className="mt-4 text-xs text-ink-tertiary font-mono leading-relaxed">
            参考：arXiv:2502.04235 § 5 Discussion · 实际使用建议结合自己语料分布做小规模验证。
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-ink/15 pt-6 text-ink-tertiary text-xs leading-relaxed">
        资料锚点 · Hao et al. "Reformulation for Pretraining Data Augmentation"
        · arXiv:2502.04235 · ByteDance Seed & UCSC · ICLR 2026 Poster ·
        MGACorpus 数据集在 HuggingFace（ByteDance-Seed/mga-fineweb-edu）· 约 7700 亿字量级
        · 本页中的实验数字均取自论文 Figure 4 / Figure 5 / Table 1。
      </div>
    </SectionFrame>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-cream/10 border border-cream/30 rounded-lg p-2 text-center">
      <div className="text-xs text-cream/60 font-mono">{label}</div>
      <div className="font-display text-lg font-bold">{value}</div>
    </div>
  );
}
