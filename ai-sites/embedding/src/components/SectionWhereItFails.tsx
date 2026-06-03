import React, { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, SlidersHorizontal } from "lucide-react";

type Problem = "short" | "split" | "keyword";

const PROBLEMS: Record<Problem, { label: string; text: string; fix: string }> = {
  short: {
    label: "问题太短",
    text: "只搜“制度”这种词，信息太少，系统很容易找偏。",
    fix: "把问题补完整：我想查年假制度、报销制度，还是绩效制度？",
  },
  split: {
    label: "文档切太碎",
    text: "“年假可结转”被切到上一段，“3 月底失效”被切到下一段，检索会漏掉条件。",
    fix: "切段时前后多带一句，或者保证一条规则别被拆到两段里。",
  },
  keyword: {
    label: "精确词丢了",
    text: "合同编号、订单号、金额、日期靠语义相似度不稳。",
    fix: "把关键词搜索、筛选条件和 Embedding 一起用。",
  },
};

const SectionWhereItFails: React.FC = () => {
  const [enabled, setEnabled] = useState<Record<Problem, boolean>>({
    short: true,
    split: false,
    keyword: false,
  });

  const selected = useMemo(
    () => (Object.keys(enabled) as Problem[]).filter((key) => enabled[key]),
    [enabled],
  );

  const health = Math.max(22, 100 - selected.length * 24);

  return (
    <section className="relative overflow-hidden bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">where it breaks</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="mb-5 max-w-3xl font-display text-display-lg text-ink">
              它会找错，
              <br />
              通常错在这三处。
            </h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>
                Embedding 很适合按意思找资料，但它不能保证每次都找对。
              </p>
              <p>
                搜索问题太短、文档切得别扭、精确词很重要时，都容易出错。
              </p>
              <p>
                勾选右侧问题，看系统状态怎么变。这里的分数是示意，只用来感受风险。
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-lg">
              <div className="mb-5 flex items-center justify-between gap-4 rounded-2xl border-2 border-ink bg-butter/30 p-4">
                <div>
                  <div className="mb-1 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                    <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2.4} />
                    retrieval health
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink/70">
                    勾得越多，越需要补救手段。
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[28px] font-bold text-ink">{health}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">示意分</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {(Object.keys(PROBLEMS) as Problem[]).map((key) => {
                  const item = PROBLEMS[key];
                  return (
                    <label
                      key={key}
                      className={[
                        "cursor-pointer rounded-2xl border-2 border-ink p-4 transition-all duration-250 ease-spring",
                        enabled[key] ? "bg-coral/20 shadow-stamp" : "bg-cream hover:-translate-y-0.5",
                      ].join(" ")}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-display text-[17px] font-bold text-ink">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={enabled[key]}
                          onChange={(event) => setEnabled((old) => ({ ...old, [key]: event.target.checked }))}
                          className="h-4 w-4 accent-[#241C15]"
                        />
                      </div>
                      <p className="text-[13px] leading-relaxed text-ink/65">{item.text}</p>
                    </label>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border-2 border-ink bg-cream p-4">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                  {selected.length > 0 ? (
                    <AlertTriangle className="h-3.5 w-3.5 text-coral" strokeWidth={2.5} />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal" strokeWidth={2.5} />
                  )}
                  how to fix
                </div>
                <div className="space-y-2">
                  {(selected.length ? selected : (["short"] as Problem[])).map((key) => (
                    <div key={key} className="rounded-xl border-2 border-ink bg-white px-3 py-2 text-[13.5px] leading-relaxed text-ink/75">
                      <span className="font-bold text-ink">{PROBLEMS[key].label}：</span>
                      {PROBLEMS[key].fix}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhereItFails;
