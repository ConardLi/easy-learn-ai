import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { Repeat, Sparkles, Layers3 } from "lucide-react";

type Dim = "cost" | "diversity" | "fidelity" | "scale";

const METHODS = [
  {
    id: "repeat",
    icon: Repeat,
    name: "直接重复训练",
    sub: "Upsampling / Multi-Epoch",
    desc: "原始语料反复 sweep 2-10 次，模型多看几遍。",
    color: "border-coral/40 bg-coral/5",
    badge: "bg-coral text-white",
    stats: { cost: 4.5, diversity: 1, fidelity: 5, scale: 1.5 },
    notes: [
      "成本最低 — 没有任何额外算力",
      "信息真实度天花板",
      "≥ 3 epoch 后 val loss 明显抬头",
      "13B 模型上崩塌最快",
    ],
  },
  {
    id: "cosmopedia",
    icon: Sparkles,
    name: "无锚合成数据",
    sub: "Cosmopedia / Phi-style",
    desc: "用大模型基于 seed prompts 直接『现编』新文档。",
    color: "border-pop/40 bg-pop/5",
    badge: "bg-pop text-white",
    stats: { cost: 1.5, diversity: 4.5, fidelity: 2.5, scale: 4 },
    notes: [
      "算力非常贵 — 用 70B+ 模型生成",
      "事实容易飘",
      "依赖大量人工 seed 设计",
      "多样性高但可能跑题",
    ],
  },
  {
    id: "mga",
    icon: Layers3,
    name: "MGA · 原文重写",
    sub: "Massive Genre-Audience",
    desc: "原文不动，用 3.3B MoE 按 (体裁, 受众) 配对各重写一遍。",
    color: "border-teal bg-teal/5",
    badge: "bg-teal text-white",
    stats: { cost: 4, diversity: 4, fidelity: 4.5, scale: 5 },
    notes: [
      "算力可控 — 改写工只 3.3B MoE",
      "信息锚定原文",
      "13B scaling 上仍优于 baseline",
      "自适应 pairing，省外部 seed 库",
    ],
  },
];

const DIMS: { id: Dim; label: string; hint: string }[] = [
  { id: "cost", label: "算力性价比", hint: "越高表示越省钱" },
  { id: "diversity", label: "多样性", hint: "字面、风格、视角差异" },
  { id: "fidelity", label: "事实真实度", hint: "可追溯回真实世界" },
  { id: "scale", label: "Scaling 上限", hint: "扩到 13B+ 模型仍能涨" },
];

export default function SectionAlternatives() {
  const [dim, setDim] = useState<Dim>("scale");

  const sorted = [...METHODS].sort(
    (a, b) => b.stats[dim] - a.stats[dim],
  );

  return (
    <SectionFrame num="04" label="vs Other Approaches" background="bg-butter/20">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        别的扩数据方法呢？为什么 MGA 赢了？
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-8 max-w-3xl">
        切换右边的维度按钮，三种方法的排名会实时换位。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {DIMS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDim(d.id)}
            className={`px-4 py-2 rounded-full text-sm font-mono border-2 transition-all ${
              dim === d.id
                ? "bg-ink text-butter border-ink shadow-stamp -translate-y-[2px]"
                : "bg-white text-ink border-ink/30 hover:border-ink"
            }`}
          >
            按「{d.label}」排
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {sorted.map((m, idx) => {
          const Icon = m.icon;
          const score = m.stats[dim];
          return (
            <div
              key={m.id}
              className={`relative card-stamp p-6 border-2 ${m.color} transition-all duration-400 ease-editorial`}
              style={{ order: idx }}
            >
              <div className="absolute -top-3 -left-3 px-3 py-1 bg-ink text-butter font-mono text-xs rounded-full border-2 border-ink shadow-stamp">
                #{idx + 1}
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border-2 border-ink ${m.badge}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-ink-tertiary">{m.sub}</div>
                  <h3 className="font-display text-lg text-ink leading-tight">
                    {m.name}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                {m.desc}
              </p>

              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs font-mono text-ink-tertiary">
                    {DIMS.find((d) => d.id === dim)!.label}
                  </span>
                  <span className="font-display text-2xl text-ink font-bold">
                    {score.toFixed(1)}
                    <span className="text-sm text-ink-tertiary">/5</span>
                  </span>
                </div>
                <div className="h-3 bg-white rounded-full border-2 border-ink overflow-hidden">
                  <div
                    className="h-full bg-ink transition-all duration-600 ease-editorial"
                    style={{ width: `${(score / 5) * 100}%` }}
                  />
                </div>
              </div>

              <ul className="space-y-1.5 text-xs text-ink-secondary">
                {m.notes.map((n, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full bg-ink/40" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-ink-tertiary font-mono leading-relaxed">
        分数为简化对比，源自论文 Table 1 + Figure 4 + Cosmopedia 公开报告（HuggingFaceTB 2024）综合人工标定。
      </p>
    </SectionFrame>
  );
}
