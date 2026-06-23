import React, { useMemo, useState } from "react";
import { SearchCheck } from "lucide-react";
import { MiniBadge, SectionShell, splitText, cx } from "./common";

const DOC =
  "公司年假政策按工龄分档：入职满一年后每年可休五天；满三年后每年可休十天；满五年后每年可休十五天。请假需要提前三个工作日在系统提交申请，由直属主管审批。未休完的年假可以结转到下一年三月底，超过期限自动失效。法定节假日和调休不占用年假额度。";

const questions = [
  { id: "days", label: "满五年有几天年假？", keys: ["满五年", "十五天", "工龄"] },
  { id: "apply", label: "请假要提前多久？", keys: ["提前", "三个工作日", "主管"] },
  { id: "carry", label: "年假能结转到什么时候？", keys: ["结转", "三月底", "失效"] },
] as const;

const SectionRetrieval: React.FC = () => {
  const [size, setSize] = useState(46);
  const [questionId, setQuestionId] = useState<(typeof questions)[number]["id"]>("carry");
  const question = questions.find((item) => item.id === questionId)!;

  const ranked = useMemo(() => {
    return splitText(DOC, size, 8)
      .map((chunk) => {
        const score = question.keys.reduce((sum, key) => sum + (chunk.text.includes(key) ? 1 : 0), 0);
        return { ...chunk, score };
      })
      .sort((a, b) => b.score - a.score || a.id - b.id);
  }, [question, size]);

  return (
    <SectionShell num="05" label="retrieval effect" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">切法会影响搜索命中。</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>
              在“AI 先翻资料再回答”的系统里，用户一提问，系统会先去找相关 chunk。这个“先找资料”的动作，专业说法叫检索。
            </p>
            <p>切得太小，答案条件可能散在不同块里。</p>
            <p>切得太大，每块会混进更多无关内容。它可能只是沾到几个关键词，被排到前面；交给 AI 后，回答也更容易跑题。</p>
          </div>

          <div className="mt-7 rounded-2xl border-2 border-ink bg-cream p-5 shadow-stamp">
            <div className="mb-4">
              <MiniBadge>问题</MiniBadge>
            </div>
            <div className="grid gap-2">
              {questions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setQuestionId(item.id)}
                  className={cx(
                    "rounded-xl border-2 border-ink px-4 py-3 text-left text-sm font-bold transition-all duration-250 ease-spring",
                    item.id === questionId ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-butter-tint",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-ink/55">chunk size</span>
              <span className="font-mono text-sm font-bold text-ink">{size} 字</span>
            </div>
            <input
              type="range"
              min="30"
              max="86"
              step="2"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
              className="mt-2 w-full accent-coral"
              aria-label="调整检索示意里的 chunk size"
            />
          </div>
        </div>

        <div className="rounded-3xl border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-white">
              <SearchCheck className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <div>
              <div className="font-display text-[23px] font-bold text-ink">命中的前三块</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">关键词命中数 · 示意</div>
            </div>
          </div>

          <div className="space-y-3">
            {ranked.slice(0, 3).map((chunk, index) => (
              <div key={`${chunk.id}-${questionId}-${size}`} className="rounded-xl border-2 border-ink bg-white p-4 shadow-stamp">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink/50">
                    第 {index + 1} 名 · 第 {chunk.id} 块
                  </span>
                  <span
                    className={cx(
                      "rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[11px] font-bold",
                      chunk.score > 1 ? "bg-teal text-cream" : chunk.score === 1 ? "bg-butter text-ink" : "bg-cream text-ink/60",
                    )}
                  >
                    {chunk.score} / {question.keys.length}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-ink/78">{chunk.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink/60">
            这里先用关键词演示。真实系统不只看关键词，还会判断两段话意思是不是接近。怎么判断，下一站《Embedding》再讲；这里先记住：chunk 切好，后面才找得准。
          </p>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionRetrieval;
