import React, { useState } from "react";
import { ArrowRight, Database, FileText, ListRestart, Search, Sparkles } from "lucide-react";

const STEPS = [
  {
    title: "先把资料切成几段",
    icon: FileText,
    text: "一份员工手册太长，系统会先切成小段。每段最好只讲一件事。",
  },
  {
    title: "每段都变成向量",
    icon: Sparkles,
    text: "负责做 Embedding 的程序会把每段文字变成一串数字。数字会跟原文一起保存。",
  },
  {
    title: "存进能按距离搜索的地方",
    icon: Database,
    text: "这个专门保存数字位置的地方，叫向量库。用户来问问题时，它能快速找最近的几段。",
  },
  {
    title: "问题也变成向量",
    icon: Search,
    text: "用户问“年假能不能结转”，系统把这个问题也变成数字，拿去找离它最近的资料段。",
  },
  {
    title: "把命中的资料交给 AI",
    icon: ArrowRight,
    text: "AI 拿到问题和资料，再组织成一句能读懂的回答。",
  },
];

const chunks = [
  { id: "c1", text: "入职 1 年内享有 5 天年假。", score: 0.74 },
  { id: "c2", text: "年假可结转至次年 3 月底。", score: 0.93 },
  { id: "c3", text: "请假需提前 3 个工作日申请。", score: 0.51 },
  { id: "c4", text: "差旅报销需要提交电子发票。", score: 0.18 },
];

const SectionRagWalkthrough: React.FC = () => {
  const [step, setStep] = useState(0);
  const ActiveIcon = STEPS[step].icon;

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">in a rag system</span>
        </div>

        <div className="mb-10 max-w-3xl">
          <h2 className="mb-5 font-display text-display-lg text-ink">
            在 RAG 里，
            <br />
            Embedding 管“找资料”。
          </h2>
          <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
            <p>
              RAG 是让 AI 回答前先翻资料的做法。Embedding 出现在翻资料这一步。
            </p>
            <p>
              它把“用户问题”和“资料片段”放到同一张意思地图里，再挑离问题最近的几段。
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-butter shadow-stamp">
                <ActiveIcon className="h-6 w-6 text-ink" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[12px] font-bold text-ink/45">
                {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </div>
            </div>
            <h3 className="mb-3 font-display text-[25px] font-bold leading-tight text-ink">
              {STEPS[step].title}
            </h3>
            <p className="min-h-[76px] text-[15px] leading-relaxed text-ink/70">
              {STEPS[step].text}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setStep((value) => Math.max(0, value - 1))}
                className="rounded-full border-2 border-ink bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-butter/35 disabled:opacity-40"
                disabled={step === 0}
              >
                prev
              </button>
              <button
                onClick={() => setStep((value) => Math.min(STEPS.length - 1, value + 1))}
                className="rounded-full border-2 border-ink bg-ink px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cream shadow-stamp transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg disabled:opacity-40"
                disabled={step === STEPS.length - 1}
              >
                next
              </button>
              <button
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-butter/35"
              >
                <ListRestart className="h-3.5 w-3.5" strokeWidth={2.4} />
                reset
              </button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-lg">
            <div className="mb-4 rounded-2xl border-2 border-ink bg-butter/35 p-4">
              <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                user question
              </div>
              <p className="font-display text-[20px] font-bold text-ink">年假可以留到明年用吗？</p>
            </div>

            <div className="space-y-3">
              {chunks.map((chunk, index) => {
                const active = step >= 3 && index < 3;
                const strongest = step >= 3 && chunk.id === "c2";
                return (
                  <div
                    key={chunk.id}
                    className={[
                      "rounded-2xl border-2 border-ink p-4 transition-all duration-250 ease-spring",
                      strongest ? "bg-butter shadow-stamp" : active ? "bg-cream" : "bg-white opacity-75",
                    ].join(" ")}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                        片段 {index + 1}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-ink/60">
                        {step >= 3 ? chunk.score.toFixed(2) : "待计算"}
                      </span>
                    </div>
                    <p className="text-[14px] leading-relaxed text-ink/75">{chunk.text}</p>
                    <div className="mt-3 h-2 overflow-hidden rounded-full border border-ink/20 bg-white">
                      <div
                        className={strongest ? "h-full bg-teal" : "h-full bg-ink/25"}
                        style={{ width: `${step >= 3 ? chunk.score * 100 : 8}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border-2 border-ink bg-teal px-4 py-3 text-cream">
              <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/60">
                answer after retrieval
              </div>
              <p className="text-[14px] leading-relaxed">
                可以。员工手册里写着，年假可结转至次年 3 月底。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRagWalkthrough;
