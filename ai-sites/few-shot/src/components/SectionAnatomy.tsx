/**
 * SectionAnatomy · 一个例子长什么样？
 *
 * 先拆开一个例子：一段「输入」+ 它对应的「理想输出」，两边都写清楚。
 * 交互（L4 拼装 + live preview）：用户自己改任务、加 / 删例子、改新问题，
 * 下方实时拼出「真正发给模型的那段 prompt」。
 */
import React, { useState } from "react";
import { Plus, Trash2, CornerDownRight } from "lucide-react";

type Pair = { in: string; out: string };

const DEFAULT_PAIRS: Pair[] = [
  { in: "这家店太慢了", out: "负面" },
  { in: "包装很用心", out: "正面" },
];

const SectionAnatomy: React.FC = () => {
  const [task, setTask] = useState("把下面的评论分成 正面 / 负面");
  const [pairs, setPairs] = useState<Pair[]>(DEFAULT_PAIRS);
  const [query, setQuery] = useState("价格有点贵但质量好");

  const update = (i: number, key: keyof Pair, v: string) => {
    setPairs((p) => p.map((x, j) => (j === i ? { ...x, [key]: v } : x)));
  };
  const add = () => {
    if (pairs.length >= 4) return;
    setPairs((p) => [...p, { in: "", out: "" }]);
  };
  const remove = (i: number) => setPairs((p) => p.filter((_, j) => j !== i));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 bg-butter-tint/40 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">一个例子的样子</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[700px] leading-[1.1]">
          一个例子长什么样？自己拼一个看看
        </h2>
        <p className="mt-5 font-sans text-[16.5px] leading-[1.75] text-ink/80 max-w-[660px]">
          一个例子 = 一段「输入」+ 你想要的那个「输出」，两边都写清楚。
          下面这块你能直接改：换任务、加例子、改最后那道新题，
          右边会实时拼出你真正会发给模型的那段话。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* 左：编辑区 */}
          <div className="card-stamp p-5">
            {/* 任务 */}
            <label className="block font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55 mb-2">
              要让模型做的事
            </label>
            <input
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full bg-cream border-2 border-ink rounded-xl px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:shadow-stamp transition-shadow"
            />

            {/* 例子列表 */}
            <div className="flex items-center justify-between mt-6 mb-2">
              <label className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55">
                给它看的例子（输入 → 输出）
              </label>
              <span className="font-mono text-[10.5px] text-ink/45">{pairs.length} / 4</span>
            </div>

            <div className="space-y-2.5">
              {pairs.map((p, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={p.in}
                    onChange={(e) => update(i, "in", e.target.value)}
                    placeholder="一句输入"
                    className="flex-1 min-w-0 bg-white border-2 border-ink rounded-lg px-2.5 py-2 font-sans text-[13px] text-ink focus:outline-none focus:shadow-stamp transition-shadow"
                  />
                  <CornerDownRight className="w-4 h-4 text-ink/40 flex-shrink-0" strokeWidth={2.4} />
                  <input
                    value={p.out}
                    onChange={(e) => update(i, "out", e.target.value)}
                    placeholder="理想输出"
                    className="w-24 flex-shrink-0 bg-butter border-2 border-ink rounded-lg px-2.5 py-2 font-mono font-bold text-[13px] text-ink focus:outline-none focus:shadow-stamp transition-shadow"
                  />
                  <button
                    onClick={() => remove(i)}
                    className="flex-shrink-0 w-8 h-8 grid place-items-center border-2 border-ink rounded-lg bg-white text-ink hover:bg-coral hover:text-cream transition-colors"
                    aria-label="删掉这个例子"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={2.2} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={add}
              disabled={pairs.length >= 4}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 border-2 border-ink rounded-full font-mono text-[12px] font-bold text-ink bg-white shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-stamp"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2.6} /> 再加一个例子
            </button>

            {/* 新题 */}
            <label className="block font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55 mt-6 mb-2">
              一道没给答案的新题
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-cream border-2 border-ink rounded-xl px-3.5 py-2.5 font-sans text-[14px] text-ink focus:outline-none focus:shadow-stamp transition-shadow"
            />
          </div>

          {/* 右：实时拼出的 prompt */}
          <div className="lg:sticky lg:top-6">
            <div className="border-[3px] border-ink rounded-2xl bg-ink text-cream shadow-stamp-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b-2 border-cream/20">
                <span className="w-2.5 h-2.5 rounded-full bg-coral" />
                <span className="w-2.5 h-2.5 rounded-full bg-butter" />
                <span className="w-2.5 h-2.5 rounded-full bg-teal" />
                <span className="ml-2 font-mono text-[11px] tracking-[0.14em] uppercase text-cream/70">
                  真正发给模型的 prompt
                </span>
              </div>

              <div className="p-4 font-mono text-[12.5px] leading-[1.7] space-y-3">
                <div>
                  <span className="text-butter">{task || "（先写一句任务）"}</span>
                </div>

                <div>
                  <span className="text-cream/45">例子：</span>
                  {pairs.filter((p) => p.in || p.out).length === 0 ? (
                    <div className="text-cream/40 italic">（还没加例子 —— 现在等于 zero-shot）</div>
                  ) : (
                    pairs
                      .filter((p) => p.in || p.out)
                      .map((p, i) => (
                        <div key={i} className="pl-2">
                          <span className="text-cream/80">{p.in || "…"}</span>
                          <span className="text-cream/40"> → </span>
                          <span className="text-butter font-bold">{p.out || "…"}</span>
                        </div>
                      ))
                  )}
                </div>

                <div className="pt-1 border-t border-cream/15">
                  <span className="text-cream/45">现在轮到你：</span>
                  <div className="pl-2">
                    <span className="text-cream/90">{query || "…"}</span>
                    <span className="text-cream/40"> → </span>
                    <span className="text-coral font-bold">?</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 font-sans text-[14px] leading-[1.7] text-ink/70">
              模型读到最后那个 <span className="font-mono font-bold text-ink">?</span>，
              就会照着上面例子的格式，把答案接在后面。例子写得越规整，它接得越稳。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionAnatomy;
