import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import SectionFrame from "../components/SectionFrame";

type Strategy = {
  id: string;
  label: string;
  formula: string;
  semantics: string;
  good: string;
  bad: string;
  use: string;
};

const STRATEGIES: Strategy[] = [
  {
    id: "alpha-eq-r",
    label: "α = r",
    formula: "scale = α / r = 1",
    semantics: "BA 旁路 1:1 加回主路径，不放大不缩小。",
    good: "训练最稳，无意外的 magnitude 漂移。",
    bad: "在小 r 下吸收新数据较慢。",
    use: "稳健派默认。Hu 原论文写「α 不调时设 α = r」。",
  },
  {
    id: "alpha-eq-2r",
    label: "α = 2r",
    formula: "scale = 2 (Magpie / Unsloth 推荐)",
    semantics: "BA 输出 ×2 — 给小 r 时一个 boost。",
    good: "中小 r 收敛更快，效果略好。",
    bad: "在 r ≥ 64 时容易过拟合数据集。",
    use: "Magpie、Unsloth 推荐：r=16 时 α=32 是甜点。",
  },
  {
    id: "alpha-eq-16",
    label: "α = 16 固定",
    formula: "scale = 16 / r",
    semantics: "r 越大，scale 越小 — 学的越保守。",
    good: "调 r 时无需重新搜 α，便于 sweep。",
    bad: "r=64 时 scale=0.25 太小，BA 效果削弱。",
    use: "Alpaca-LoRA、HF 早期默认。今天已不推荐。",
  },
  {
    id: "alpha-eq-32",
    label: "α = 32 固定",
    formula: "scale = 32 / r",
    semantics: "比 α=16 给的 boost 大一倍，仍随 r 变弱。",
    good: "Tulu 系列、QLoRA Guanaco r=64 时配。",
    bad: "r 极小时（4-8）会过冲。",
    use: "经验值。许多 7B-13B 配方默认 α=32。",
  },
  {
    id: "rslora",
    label: "rsLoRA · α/√r",
    formula: "scale = α / √r",
    semantics: "scale 随 √r 衰减，比 α/r 衰减慢。",
    good: "高 r (≥ 64) 训练不退化，能继续涨。",
    bad: "小 r 时差异不明显，多一个公式心智成本。",
    use: "想跑 r=128/256 的复杂任务必开。arXiv:2312.03732",
  },
];

export default function SectionAlpha() {
  const [pick, setPick] = useState("alpha-eq-2r");
  const s = STRATEGIES.find((x) => x.id === pick)!;

  return (
    <SectionFrame num="05" label="α 怎么搭配" background="bg-cream">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        r 定好了，还要配 α：它控制补丁加回主路径时放大多少。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        补丁练完要加回原模型，加回去放大多少倍由 scale 决定，而 scale = α / r。经典就是这条公式；
        α/√r 是 rsLoRA 的修正。五种配法点 chip 看哪种适合你。
      </p>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-8 items-start">
        <div className="space-y-2">
          {STRATEGIES.map((x) => {
            const a = x.id === pick;
            return (
              <button
                key={x.id}
                onClick={() => setPick(x.id)}
                className={`w-full text-left px-4 py-4 rounded-2xl border-2 transition-all duration-250 ease-spring ${
                  a ? "bg-coral text-white border-ink shadow-stamp" : "bg-white border-ink/30 hover:border-ink text-ink"
                }`}
              >
                <div className="font-display text-xl font-bold leading-tight">{x.label}</div>
                <div className={`font-mono text-[11px] mt-1 ${a ? "text-white/80" : "text-ink-tertiary"}`}>
                  {x.formula}
                </div>
              </button>
            );
          })}
        </div>

        <div className="card-stamp p-7 bg-white" key={pick}>
          <div className="animate-enter-fade">
            <div className="mb-5">
              <div className="eyebrow text-ink-tertiary mb-2">策略</div>
              <h3 className="font-display text-3xl text-ink leading-tight">{s.label}</h3>
              <code className="mt-2 inline-block px-3 py-1 bg-cream border-2 border-ink rounded-lg font-mono text-sm">
                {s.formula}
              </code>
            </div>

            <div className="space-y-4">
              <Block title="它在做什么" body={s.semantics} bg="bg-cream" />
              <div className="grid md:grid-cols-2 gap-3">
                <Block title="好处" body={s.good} bg="bg-teal/10 border-teal/40" />
                <Block title="代价" body={s.bad} bg="bg-coral/10 border-coral/40" />
              </div>
              <Block title="谁在用" body={s.use} bg="bg-butter/40" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 card-stamp p-6 bg-ink text-cream">
        <div className="eyebrow text-butter mb-3">10 秒决策</div>
        <div className="grid md:grid-cols-3 gap-5 text-sm">
          <div>
            <div className="font-display text-lg text-butter mb-1">r ≤ 16</div>
            <div className="leading-relaxed text-cream/90">用 <span className="text-butter font-semibold">α = 2r</span>，给小 r 一点 boost。</div>
          </div>
          <div>
            <div className="font-display text-lg text-butter mb-1">r = 32 ~ 64</div>
            <div className="leading-relaxed text-cream/90">用 <span className="text-butter font-semibold">α = r</span> 或 α = 16/32 固定，稳为主。</div>
          </div>
          <div>
            <div className="font-display text-lg text-butter mb-1">r ≥ 128</div>
            <div className="leading-relaxed text-cream/90">开 <span className="text-butter font-semibold">rsLoRA</span>，否则训练容易退化。</div>
          </div>
        </div>
      </div>

      <FourSetCard />

      <div className="mt-10 border-t border-ink/15 pt-6 text-ink-tertiary text-xs leading-relaxed max-w-5xl">
        资料锚点 · LoRA 原论文 arXiv:2106.09685 · QLoRA r=64 配方 arXiv:2305.14314 ·
        Tulu 3 LoRA r 配方 AI2 2024 · Alpaca-LoRA 默认 r=8 · rsLoRA arXiv:2312.03732 ·
        Unsloth Docs 2026 · HuggingFace PEFT 0.13 默认 lora_r=8 · Hu et al. § 7.2
        effective rank · Sebastian Raschka「Practical Tips for LoRA」2024。
      </div>
    </SectionFrame>
  );
}

/* ─── 微调四件套互链卡 ─── */
/* r 是开训前要一起设的四个超参之一，另外三个各有一站。 */
function FourSetCard() {
  const links = [
    { href: "../learning-rate/index.html", name: "学习率 lr", desc: "每步往前迈多大" },
    { href: "../batch-size/index.html", name: "batch size", desc: "每步一起看多少条" },
    { href: "../epochs/index.html", name: "训练轮数 epoch", desc: "整份数据看几遍" },
  ];
  return (
    <div className="mt-12 card-stamp p-6 bg-white">
      <div className="flex items-baseline gap-2.5 mb-1.5">
        <span className="font-display text-xl font-bold text-ink">微调四件套</span>
        <span className="font-mono text-[11px] text-ink-tertiary">开训前一起填的超参</span>
      </div>
      <p className="text-sm text-ink-secondary leading-relaxed mb-4 max-w-2xl">
        微调一个模型，要一起设的超参就这四个：学习率、batch size、epoch、LoRA 的秩 r。
        你正在看 r（补丁多宽）这一件，另外三件各有一站。
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="px-4 py-3 rounded-2xl border-2 border-ink bg-coral text-white">
          <div className="font-display text-base font-bold leading-tight">LoRA 的秩 r</div>
          <div className="font-mono text-[10.5px] text-white/80 mt-1">你在这一站 · 补丁多宽</div>
        </div>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group px-4 py-3 rounded-2xl border-2 border-ink bg-cream hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp transition-all duration-250 ease-spring"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-base font-bold text-ink leading-tight">{l.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-ink-tertiary group-hover:text-ink" strokeWidth={2.4} />
            </div>
            <div className="font-mono text-[10.5px] text-ink-tertiary mt-1">{l.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

function Block({ title, body, bg }: { title: string; body: string; bg: string }) {
  return (
    <div className={`p-4 rounded-xl border-2 border-ink/20 ${bg}`}>
      <div className="eyebrow text-ink-tertiary mb-1">{title}</div>
      <div className="text-sm text-ink leading-relaxed">{body}</div>
    </div>
  );
}
