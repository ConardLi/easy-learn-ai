import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";
import { CircleDot, FileText, Hammer, Scale, CheckCircle2, XCircle } from "lucide-react";

const STEPS = [
  {
    n: "01",
    title: "采样 5 组 (体裁, 受众)",
    sub: "Adaptive Pair Sampling",
    icon: CircleDot,
    body: "把原文喂给一个 33 亿参数的小模型，让它读完之后自己决定『这篇适合写给谁、用什么文体』。",
    detail: [
      "不用人提前准备题库 — 每篇文章配的 5 组标签，是模型读完内容现配的。",
      "一次推理出齐 5 组，覆盖知识深度、表达风格、读者背景三个维度。",
      "省算力 — 这个小模型用的是 MoE 结构：每次推理只用上其中一部分参数，不用全员上阵。",
    ],
    output: [
      "学术综述 · 气候研究者",
      "亲子科普 · 8-10 岁学生",
      "新闻消息 · 城市白领",
      "电台口播 · 通勤听众",
      "政策简报 · 市级决策者",
    ],
  },
  {
    n: "02",
    title: "按配对各重写一遍",
    sub: "Conditional Reformulation",
    icon: Hammer,
    body: "同一个改写模型，根据每对标签把原文重写成对应风格的新文档。",
    detail: [
      "知识点保留 — 不允许新增原文里没有的事实。",
      "字面自由 — 句式、用词、结构可大改。",
      "受众视角约束 — 决定术语密度、举例方式、句子长度。",
    ],
    output: [
      "学术体：依据 IPCC AR6...",
      "故事体：地球的薄毛衣...",
      "新闻体：今日通报...",
      "口播体：您听过没？...",
      "政策体：建议本市...",
    ],
  },
  {
    n: "03",
    title: "另一个模型当裁判筛一遍",
    sub: "Bounded-Consistency Filtering",
    icon: Scale,
    body: "再起一个模型当「裁判」，给每个改写版本打 1-5 分，低于 3 分直接丢掉。",
    detail: [
      "打分时允许文风差很多 — 句式、用词、结构怎么改都行。",
      "但事实必须能对照回原文，不能瞎编原文里没有的内容。",
      "通过的进最终数据集（MGACorpus），被筛掉的改写就不再投入训练。",
    ],
    output: [
      "v01 学术 · 4.6 ✓",
      "v02 故事 · 4.2 ✓",
      "v03 新闻 · 3.8 ✓",
      "v04 口播 · 2.7 ✗",
      "v05 政策 · 4.1 ✓",
    ],
  },
];

export default function SectionPipeline() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  const Icon = current.icon;

  return (
    <SectionFrame num="03" label="Pipeline · 3 步走" background="bg-cream">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        改写工作怎么干？只有三步。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        每篇原文经过下面这条流水线，最多产出 5 份合格变体。点上面的圆点切换每一步看细节。
      </p>

      <div className="relative mb-8">
        <div className="absolute top-7 left-0 right-0 h-0.5 bg-ink/15" />
        <div
          className="absolute top-7 left-0 h-0.5 bg-ink transition-all duration-400 ease-editorial"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
        <div className="relative grid grid-cols-3 gap-4">
          {STEPS.map((s, i) => {
            const SI = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={i}
                onClick={() => setStep(i)}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className={`relative w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ease-spring ${
                    active
                      ? "bg-ink text-butter border-ink shadow-stamp-lg -translate-y-1"
                      : done
                      ? "bg-butter text-ink border-ink"
                      : "bg-white text-ink border-ink/30 group-hover:border-ink"
                  }`}
                >
                  <SI className="w-5 h-5" />
                </div>
                <div className="text-center">
                  <div className="font-mono text-xs text-ink-tertiary">{s.n}</div>
                  <div
                    className={`font-semibold text-sm transition-colors ${
                      active ? "text-ink" : "text-ink-secondary"
                    }`}
                  >
                    {s.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-8" key={step}>
        <div className="card-stamp p-7 animate-enter-fade">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-butter border-2 border-ink flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-ink" />
            </div>
            <div>
              <div className="font-mono text-xs text-ink-tertiary">
                STEP {current.n} · {current.sub}
              </div>
              <h3 className="font-display text-2xl text-ink leading-tight mt-1">
                {current.title}
              </h3>
            </div>
          </div>

          <p className="text-lg text-ink leading-relaxed mb-5">{current.body}</p>

          <ul className="space-y-3">
            {current.detail.map((d, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-coral" />
                <span className="text-ink-secondary leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-stamp p-6 bg-butter/20 animate-enter-fade">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-ink-tertiary" />
            <span className="eyebrow text-ink-tertiary">该步产物</span>
          </div>
          <div className="space-y-2">
            {current.output.map((o, i) => {
              const passed = !o.includes("✗");
              return (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-xl border-2 font-mono text-sm flex items-center justify-between ${
                    step === 2
                      ? passed
                        ? "bg-white border-teal/40 text-ink"
                        : "bg-coral/10 border-coral/40 text-ink-secondary line-through"
                      : "bg-white border-ink/20 text-ink"
                  }`}
                >
                  <span>{o.replace(" ✓", "").replace(" ✗", "")}</span>
                  {step === 2 &&
                    (passed ? (
                      <CheckCircle2 className="w-4 h-4 text-teal" />
                    ) : (
                      <XCircle className="w-4 h-4 text-coral" />
                    ))}
                </div>
              );
            })}
          </div>

          {step === 2 && (
            <div className="mt-5 pt-4 border-t border-ink/10 text-xs font-mono text-ink-tertiary leading-relaxed">
              筛掉 v04 后留下 4 份。 论文里整库筛通过率约 ~80%，最终 195B → 770B 等效  3.9× 扩展。
            </div>
          )}
        </div>
      </div>
    </SectionFrame>
  );
}
