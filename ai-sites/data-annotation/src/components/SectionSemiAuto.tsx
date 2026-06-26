/**
 * SectionSemiAuto · 半自动：模型先标，人来审（L3 单步 trace）
 *
 * 交互：单步走「模型预标 → 人工检查 → 修正/通过」，每步看一条数据怎么被处理，
 *   底部累计「省了多少人力」示意条。
 */
import React, { useState } from "react";
import { Bot, UserCheck, ArrowRight, RotateCcw, Check, Pencil } from "lucide-react";

type StepState = {
  title: string;
  icon: React.ElementType;
  color: string;
  body: string;
  card: React.ReactNode;
};

const STEPS: StepState[] = [
  {
    title: "模型先打初稿",
    icon: Bot,
    color: "#1B4B5A",
    body: "先让一个现成的模型把所有数据快速标一遍。它又快又便宜，几秒钟标几百条。",
    card: (
      <div className="font-mono text-[13px] leading-[1.7] text-ink/85">
        「这道菜咸得没法吃。」
        <br />
        <span className="text-teal font-bold">模型标：</span>情绪 = 负面
      </div>
    ),
  },
  {
    title: "人工逐条检查",
    icon: UserCheck,
    color: "#E07A5F",
    body: "人不用从零开始标，只要看模型标得对不对。大部分对的直接放过，速度快很多。",
    card: (
      <div className="font-mono text-[13px] leading-[1.7] text-ink/85">
        「这道菜咸得没法吃。」 模型标：负面
        <br />
        <span className="text-coral font-bold">人审：</span>✓ 对，放过
      </div>
    ),
  },
  {
    title: "只改模型标错的",
    icon: Pencil,
    color: "#FF4D74",
    body: "碰到模型标错的（比如反话、双关），人再动手改。最后留下的，是机器速度 + 人工把关的结果。",
    card: (
      <div className="font-mono text-[13px] leading-[1.7] text-ink/85">
        「咸得没法吃，但我居然还想再来一口。」
        <br />
        <span className="text-ink/40 line-through">模型标：负面</span>{" "}
        <span className="text-pop font-bold">→ 人改：正面</span>
      </div>
    ),
  },
];

const SectionSemiAuto: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  const Icon = cur.icon;
  const saved = [30, 60, 70][step];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">Human + Machine</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          全靠人手标太慢，让模型搭把手
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          几十万条数据全靠人手工标，又慢又贵。现在常见的做法是
          <span className="font-bold text-ink">「机器先标、人来审」</span>。
          点「下一步」走一遍这个流程。
        </p>

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="card-stamp p-7">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink"
                  style={{ backgroundColor: cur.color }}
                >
                  <Icon className="h-5 w-5 text-cream" strokeWidth={2.3} />
                </span>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">
                    第 {step + 1} 步 / 3
                  </div>
                  <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight">
                    {cur.title}
                  </h3>
                </div>
              </div>
              <p className="font-sans text-[16px] leading-[1.8] text-ink/85">{cur.body}</p>
              <div key={step} className="mt-5 bg-cream border-2 border-ink rounded-2xl p-5 animate-enter-fade">
                {cur.card}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button
                  onClick={() => setStep((s) => Math.min(s + 1, STEPS.length - 1))}
                  disabled={step === STEPS.length - 1}
                  className="btn-stamp bg-ink text-cream disabled:opacity-30 disabled:pointer-events-none"
                >
                  下一步
                  <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
                </button>
                <button onClick={() => setStep(0)} className="btn-stamp bg-cream text-ink">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                  重来
                </button>
              </div>
            </div>
          </div>

          {/* 省力示意 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                比纯人工省下的力气（示意）
              </div>
              <div className="font-display font-extrabold text-[52px] leading-none text-pop">
                {saved}
                <span className="font-mono text-[16px] text-ink/45 ml-1">%</span>
              </div>
              <div className="mt-4 h-4 bg-cream border-2 border-ink rounded-full overflow-hidden">
                <div
                  className="h-full bg-pop rounded-full transition-all duration-400 ease-spring"
                  style={{ width: `${saved}%` }}
                />
              </div>
              <div className="mt-5 bg-ink text-cream rounded-2xl px-5 py-4 flex-1 flex items-center">
                <p className="font-sans text-[14px] leading-[1.65]">
                  机器干掉重复劳动，人只在关键处把关。又快又不丢质量，这是现在标注的主流做法。
                </p>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/40">示意数值，帮你感受趋势，不是精确统计。</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSemiAuto;
