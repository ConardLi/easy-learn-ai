import React, { useMemo, useState } from "react";
import { AlertTriangle, Search } from "lucide-react";
import { candidates, cx, recallScore, ScoreBar, SectionShell } from "./common";

const questions = [
  {
    id: "vacation",
    label: "离职年假怎么算",
    query: "我离职时没休完的年假会折成工资吗？",
    keywordWeight: 50,
  },
  {
    id: "code",
    label: "按编号找制度",
    query: "POL-HR-2047 说的离职结算是什么？",
    keywordWeight: 82,
  },
  {
    id: "where",
    label: "找入口",
    query: "我在哪里查剩余年假？",
    keywordWeight: 42,
  },
];

const SectionRecallMess: React.FC = () => {
  const [activeId, setActiveId] = useState("vacation");
  const active = questions.find((q) => q.id === activeId) ?? questions[0];

  const ranked = useMemo(
    () =>
      candidates
        .map((item) => ({ ...item, score: recallScore(item, active.keywordWeight) }))
        .sort((a, b) => b.score - a.score),
    [active],
  );

  const top = ranked.slice(0, 4);

  return (
    <SectionShell num="02" label="why recall alone" tone="white">
      <div id="recall-mess" className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-coral p-2 text-cream shadow-stamp">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg text-ink">只做召回，常会把“看起来相关”的资料排太高。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>召回会先按问题去资料库里找候选。候选是“可能有用”的意思，还没经过细看。</p>
            <p>问题来了：有些资料关键词很多，意思却偏了；有些资料字面不太像，内容刚好能回答。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 shadow-stamp">
            <div className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">换一个用户问题</div>
            <div className="flex flex-wrap gap-2">
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setActiveId(q.id)}
                  className={cx(
                    "rounded-full border-2 border-ink px-3 py-1.5 text-sm font-bold transition-all duration-250 ease-spring",
                    activeId === q.id ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-butter",
                  )}
                >
                  {q.label}
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-xl border-2 border-ink bg-white p-4">
              <div className="mb-2 flex items-center gap-2 font-bold">
                <Search className="h-4 w-4" />
                用户问
              </div>
              <p className="text-[15px] leading-relaxed text-ink/72">{active.query}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-[23px] font-bold text-ink">召回出来的前 4 条</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">示意排序，不是精确统计</div>
            </div>
            <span className="rounded-full border-2 border-ink bg-white px-3 py-1 font-mono text-xs font-bold">top 4</span>
          </div>

          <div className="space-y-3">
            {top.map((item, index) => (
              <div key={`${active.id}-${item.id}`} className="rounded-2xl border-2 border-ink bg-white p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-ink">
                      #{index + 1} {item.title}
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">{item.text}</p>
                  </div>
                  <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-mono text-xs font-bold">{item.score}</span>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <ScoreBar label="关键词像" value={item.keyword} color="bg-coral" />
                  <ScoreBar label="意思像" value={item.meaning} color="bg-teal" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionRecallMess;
