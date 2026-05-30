import React, { useState } from "react";
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
        r 不孤单 —— α 决定 BA 加回主路径的力度。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        scale = α / r 是经典；α/√r 是 rsLoRA 的修正。五种策略 chip 看哪种适合你。
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
    </SectionFrame>
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
