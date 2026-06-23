import React, { useMemo, useState } from "react";
import { ArrowDownUp, RotateCcw } from "lucide-react";
import { candidates, cx, MiniBadge, recallScore, rerankScore, ScoreBar, SectionShell } from "./common";

const steps = [
  {
    title: "先拿召回候选",
    text: "系统先拿回 5 条候选。这里还只是粗排，顺序主要看关键词和意思像不像。",
  },
  {
    title: "逐条贴着问题看",
    text: "重排器会把“用户问题 + 候选片段”放在一起打分。它看得更细，所以速度会慢一点。",
  },
  {
    title: "把能回答问题的往前放",
    text: "能直接支撑答案的片段会上去，只有字面相似的片段会下去。",
  },
];

const SectionRerankDesk: React.FC = () => {
  const [step, setStep] = useState(0);

  const rows = useMemo(() => {
    const recalled = candidates
      .map((item) => ({ ...item, recall: recallScore(item, 45), rerank: rerankScore(item) }))
      .sort((a, b) => b.recall - a.recall)
      .slice(0, 5);

    if (step < 2) return recalled;
    return [...recalled].sort((a, b) => b.rerank - a.rerank);
  }, [step]);

  return (
    <SectionShell num="04" label="rerank desk" tone="teal">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-butter p-2 text-ink shadow-stamp">
            <ArrowDownUp className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">重排会贴着问题重新打分。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-cream/78">
            <p>重排器是专门给候选资料重新排序的模型。它通常只处理召回回来的几十条，不会扫完整个资料库。</p>
            <p>它慢一点，也更会判断“这段资料能不能回答这个问题”。这就是两段式能跑得动的原因。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 text-ink shadow-stamp">
            <div className="mb-4 flex items-center justify-between gap-3">
              <MiniBadge>单步看</MiniBadge>
              <button
                className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-white px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-250 ease-spring hover:bg-butter"
                onClick={() => setStep(0)}
              >
                <RotateCcw className="h-3.5 w-3.5" />
                reset
              </button>
            </div>
            <div className="space-y-3">
              {steps.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setStep(index)}
                  className={cx(
                    "block w-full rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ease-spring",
                    step === index ? "bg-butter shadow-stamp" : "bg-white hover:bg-cream",
                  )}
                >
                  <div className="font-display text-[19px] font-bold text-ink">
                    {index + 1}. {item.title}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink/66">{item.text}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-white p-5 text-ink shadow-stamp-xl">
          <div className="mb-5 rounded-2xl border-2 border-ink bg-butter p-4">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink/55">用户问题</div>
            <p className="mt-2 font-bold">我离职时没休完的年假会折成工资吗？</p>
          </div>

          <div className="space-y-3">
            {rows.map((item, index) => (
              <div key={`${item.id}-${step}`} className="rounded-2xl border-2 border-ink bg-cream p-4">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-bold">
                      #{index + 1} {item.title}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/62">{item.text}</p>
                  </div>
                  <span className={cx("rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold", step < 2 ? "bg-white" : "bg-butter")}>
                    {step < 2 ? item.recall : item.rerank}
                  </span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <ScoreBar label="召回分" value={item.recall} color="bg-teal" />
                  <ScoreBar label="重排分" value={step === 0 ? 12 : item.rerank} color="bg-coral" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/45">示意分数，帮你看顺序变化。</p>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionRerankDesk;
