import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Recipe = {
  id: string;
  name: string;
  who: string;
  base: string;
  data: string;
  r: number;
  alpha: number;
  layers: string;
  note: string;
  src: string;
};

const RECIPES: Recipe[] = [
  {
    id: "alpaca",
    name: "Alpaca-LoRA",
    who: "Stanford / tloen 2023",
    base: "LLaMA-7B",
    data: "Alpaca 52K self-instruct",
    r: 8,
    alpha: 16,
    layers: "q + v",
    note: "教学经典，全球第一个被广为复现的 LoRA 配方。r=8 是它定下的「默认值」。",
    src: "github.com/tloen/alpaca-lora",
  },
  {
    id: "qlora",
    name: "QLoRA · Guanaco",
    who: "Dettmers et al. 2023",
    base: "LLaMA-65B (4bit)",
    data: "OASST1 9K + Alpaca",
    r: 64,
    alpha: 16,
    layers: "all-linear",
    note: "QLoRA 论文同时定义了「r=64 + all-linear + 4bit base」组合。后续社区作 default。",
    src: "arXiv:2305.14314",
  },
  {
    id: "tulu",
    name: "Tulu 3 LoRA",
    who: "AI2 2024",
    base: "Llama-3.1-8B",
    data: "Tulu 3 SFT mix · 939K",
    r: 32,
    alpha: 16,
    layers: "all-linear",
    note: "Tulu 系列对 LoRA vs Full FT 做了完整对照。r=32 是它认为「指令任务的合理上限」。",
    src: "AI2 Tulu 3 release notes",
  },
  {
    id: "magpie",
    name: "Magpie-Pro LoRA",
    who: "Magpie align team 2024",
    base: "Llama-3-70B",
    data: "Magpie 300K self-synth",
    r: 16,
    alpha: 32,
    layers: "all-linear",
    note: "α/r = 2 是它的特色 — 给 LoRA 旁路一点点 boost，效果对比 α=r 略涨。",
    src: "arXiv:2406.08464",
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek-Coder LoRA",
    who: "DeepSeek 2024",
    base: "DeepSeek-Coder 7B",
    data: "GitHub Python 10K",
    r: 128,
    alpha: 64,
    layers: "all-linear + MLP",
    note: "为了代码任务把 r 拉到 128。配 rsLoRA 缩放，避免 high-r 训练发散。",
    src: "DeepSeek 微调 cookbook 2024-Q4",
  },
  {
    id: "unsloth-default",
    name: "Unsloth Llama-3 默认",
    who: "Unsloth 2026 templates",
    base: "Llama-3-8B",
    data: "—",
    r: 16,
    alpha: 16,
    layers: "all-linear",
    note: "Unsloth 调优后的开箱默认值。社区里把 r=16 当成 2026「新 8」用。",
    src: "docs.unsloth.ai notebooks 2026",
  },
];

export default function SectionRecipes() {
  const [pick, setPick] = useState(RECIPES[0].id);
  const r = RECIPES.find((x) => x.id === pick)!;

  return (
    <SectionFrame num="04" label="真实配方对比">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        别人都用什么 r？六份真实配方。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        从 2023 Alpaca-LoRA 到 2026 Unsloth 默认，r 的「众数」是 8 和 16。32 和 64 是为难任务留的。
      </p>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
        <div className="space-y-2">
          {RECIPES.map((rec) => {
            const a = rec.id === pick;
            return (
              <button
                key={rec.id}
                onClick={() => setPick(rec.id)}
                className={`w-full text-left px-4 py-3 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                  a ? "bg-ink text-cream border-ink shadow-stamp" : "bg-white border-ink/30 hover:border-ink text-ink"
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <div className="font-display text-sm font-bold leading-tight">{rec.name}</div>
                  <div className={`font-display text-base font-bold flex-shrink-0 ${a ? "text-butter" : "text-coral"}`}>
                    r={rec.r}
                  </div>
                </div>
                <div className={`font-mono text-[10px] mt-1 ${a ? "text-butter/70" : "text-ink-tertiary"}`}>
                  {rec.who}
                </div>
              </button>
            );
          })}
        </div>

        <div className="card-stamp p-7 bg-white" key={pick}>
          <div className="animate-enter-fade">
            <div className="flex items-baseline justify-between mb-2">
              <div>
                <div className="font-mono text-xs text-ink-tertiary">{r.who}</div>
                <h3 className="font-display text-2xl text-ink leading-tight">{r.name}</h3>
              </div>
              <div className="text-right">
                <div className="eyebrow text-ink-tertiary">α / r</div>
                <div className="font-display text-3xl font-bold text-coral">
                  {r.alpha}/{r.r}
                </div>
                <div className="font-mono text-[10px] text-ink-tertiary mt-0.5">
                  scale = {(r.alpha / r.r).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="my-5 grid grid-cols-2 gap-3">
              <KV k="base" v={r.base} />
              <KV k="数据" v={r.data} />
              <KV k="挂层" v={r.layers} />
              <KV k="r" v={r.r.toString()} />
            </div>

            <p className="text-base text-ink leading-relaxed mb-4 p-4 bg-cream border-2 border-ink rounded-xl">
              {r.note}
            </p>

            <div className="font-mono text-[10px] text-ink-tertiary">来源 · {r.src}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 p-5 card-stamp bg-butter/40 text-sm text-ink leading-relaxed">
        <span className="font-mono text-xs text-ink-tertiary mr-2 uppercase tracking-widest">观察</span>
        2026 社区共识：从 r=16 起步，最多翻到 r=64。再大几乎不涨。 这跟上面 rank-deficient 谱图直接对得上。
      </div>
    </SectionFrame>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-2 border-ink rounded-xl p-3 bg-butter/15">
      <div className="font-mono text-[10px] text-ink-tertiary uppercase tracking-wider mb-1">{k}</div>
      <div className="font-mono text-sm text-ink font-semibold leading-tight">{v}</div>
    </div>
  );
}
