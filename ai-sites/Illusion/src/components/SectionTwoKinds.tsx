/**
 * Section 03 · 两类幻觉 · 用户分类小测
 *
 * 反模板：不照搬 pill 对比（之前 section 已 accordion，这个 section 用「拖样例归类」交互）。
 *
 * 上 = pill 切 Factuality / Faithfulness 看定义
 * 下 = 6 个样例，用户给每个选属于哪一类，看错觉
 *
 * 分类来源：Huang et al. 2023「A Survey on Hallucination in LLMs」(arXiv:2311.05232)
 */
import React, { useState } from "react";
import { Check, X } from "lucide-react";

type Kind = "fact" | "faith";

const DEF: Record<Kind, { name: string; en: string; gist: string; sub: string[] }> = {
  fact: {
    name: "事实型幻觉",
    en: "Factuality Hallucination",
    gist: "生成的内容跟真实世界对不上。可能跟它学过的知识矛盾，也可能凭空编一个查不到的事实。",
    sub: ["Factual contradiction · 跟已知事实矛盾", "Factual fabrication · 编造一个无法验证的事实"],
  },
  faith: {
    name: "忠实型幻觉",
    en: "Faithfulness Hallucination",
    gist: "生成的内容跟你给它的输入对不上。可能没按指令做、改了原文、或前后自相矛盾。",
    sub: [
      "Instruction inconsistency · 跑题，没按你说的做",
      "Context inconsistency · 给的文档里没这话，它给加上了",
      "Logical inconsistency · 同一段话前后矛盾",
    ],
  },
};

type Sample = {
  id: string;
  text: string;
  truth: Kind;
  why: string;
};

const SAMPLES: Sample[] = [
  {
    id: "ex1",
    text: "「请总结这份合同」→ 模型回复中加了一条原文里根本没有的违约金条款。",
    truth: "faith",
    why: "用户给了原文，模型加了不存在的内容 · context inconsistency。",
  },
  {
    id: "ex2",
    text: "「莎士比亚是哪一年出生的？」→ 答 1654 年。",
    truth: "fact",
    why: "真实答案 1564 年（剑桥大学档案）· factual contradiction。",
  },
  {
    id: "ex3",
    text: "「用 Python 写排序算法」→ 模型回复了一段 Rust 代码。",
    truth: "faith",
    why: "指令明确要 Python，模型答了别的 · instruction inconsistency。",
  },
  {
    id: "ex4",
    text: "「介绍论文《SegFormer-X》by Chen et al. 2024」→ 答得头头是道，期刊页码作者一应俱全。",
    truth: "fact",
    why: "这篇论文根本不存在 · factual fabrication。这是律师案例那种灾难的原型。",
  },
  {
    id: "ex5",
    text: "「翻译这段法语」→ 译文前半段语义正确，后半段突然冒出原文没说的人名。",
    truth: "faith",
    why: "翻译过程中加料 · context inconsistency。",
  },
  {
    id: "ex6",
    text: "「这家公司 CEO 是谁？」→ 答 A 是 CEO，紧接着说 A 三年前已经离职、B 才是现任 CEO。",
    truth: "faith",
    why: "同一段话前后矛盾 · logical inconsistency。",
  },
];

const SectionTwoKinds: React.FC = () => {
  const [active, setActive] = useState<Kind>("fact");
  const [picks, setPicks] = useState<Record<string, Kind | undefined>>({});

  const done = Object.keys(picks).length;
  const correct = SAMPLES.filter((s) => picks[s.id] === s.truth).length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">taxonomy · 两类</span>
        </div>

        <h2 className="font-display text-display-lg text-ink leading-tight mb-3 max-w-3xl">
          编的也分两种。<br />
          一种跟世界对不上，一种跟你的输入对不上。
        </h2>
        <p className="max-w-2xl text-[15px] text-ink/70 leading-relaxed mb-9">
          Huang et al. 2023 survey 重新分类：事实型 vs 忠实型。
          做评测的时候得分开看，因为修法不一样。
        </p>

        {/* 顶部定义切换 */}
        <div className="grid lg:grid-cols-2 gap-3 lg:gap-4 mb-10">
          {(Object.keys(DEF) as Kind[]).map((k) => {
            const on = active === k;
            const d = DEF[k];
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={[
                  "text-left border-2 border-ink rounded-2xl p-5 transition-all duration-300 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg -translate-x-0.5 -translate-y-0.5"
                    : "bg-white text-ink shadow-stamp hover:bg-butter-tint",
                ].join(" ")}
              >
                <div
                  className={[
                    "font-mono text-[10px] uppercase tracking-[0.22em] mb-1.5",
                    on ? "text-pop" : "text-ink/50",
                  ].join(" ")}
                >
                  {d.en}
                </div>
                <div className="font-display text-[22px] font-bold leading-tight mb-2">
                  {d.name}
                </div>
                <p className={["text-[13.5px] leading-relaxed mb-3", on ? "text-cream/85" : "text-ink/70"].join(" ")}>
                  {d.gist}
                </p>
                <ul className={["space-y-1 text-[12px] font-mono leading-relaxed", on ? "text-cream/70" : "text-ink/55"].join(" ")}>
                  {d.sub.map((s) => (
                    <li key={s}>· {s}</li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* 分类小测 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1">
                Mini quiz · 6 个样例
              </div>
              <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-tight">
                你来分 —— 这是事实型还是忠实型？
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-butter-tint border-2 border-ink rounded-full font-mono text-[11px] tabular-nums">
                {done}/6 · 对 {correct}
              </div>
              {done > 0 && (
                <button
                  onClick={() => setPicks({})}
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink px-2.5 py-1.5 border-2 border-ink/15 rounded-full hover:border-ink transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 lg:gap-4">
            {SAMPLES.map((s, i) => {
              const pick = picks[s.id];
              const revealed = !!pick;
              const right = pick === s.truth;
              return (
                <div
                  key={s.id}
                  className={[
                    "border-2 border-ink rounded-2xl p-4 transition-all duration-300",
                    revealed
                      ? right
                        ? "bg-teal/8"
                        : "bg-pop/8"
                      : "bg-cream",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold text-ink/60 tabular-nums">
                      EX0{i + 1}
                    </span>
                    {revealed && (
                      <span
                        className={[
                          "font-mono text-[10px] font-bold inline-flex items-center gap-1",
                          right ? "text-teal" : "text-pop",
                        ].join(" ")}
                      >
                        {right ? <Check className="w-3 h-3" strokeWidth={3} /> : <X className="w-3 h-3" strokeWidth={3} />}
                        {right ? "对" : `正解 = ${s.truth === "fact" ? "事实型" : "忠实型"}`}
                      </span>
                    )}
                  </div>

                  <p className="text-[13.5px] text-ink leading-relaxed mb-3 min-h-[3.5em]">
                    {s.text}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {(["fact", "faith"] as Kind[]).map((k) => {
                      const on = pick === k;
                      return (
                        <button
                          key={k}
                          onClick={() => setPicks((p) => ({ ...p, [s.id]: k }))}
                          className={[
                            "py-1.5 rounded-lg border-2 border-ink font-mono text-[11px] font-bold transition-all",
                            on
                              ? "bg-ink text-cream"
                              : "bg-white text-ink/70 hover:bg-butter-tint",
                          ].join(" ")}
                        >
                          {k === "fact" ? "事实型" : "忠实型"}
                        </button>
                      );
                    })}
                  </div>

                  {revealed && (
                    <p className="font-mono text-[11px] text-ink/60 leading-snug border-t border-ink/10 pt-2">
                      {s.why}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {done === 6 && (
            <div className="mt-5 px-4 py-3 bg-butter border-2 border-ink rounded-xl flex items-center gap-3 animate-enter-up">
              <div className="font-display text-[24px] font-bold tabular-nums text-ink">
                {correct}/6
              </div>
              <p className="text-[13.5px] text-ink leading-snug">
                {correct >= 5
                  ? "稳。两种边界你拎得清，下一节直接看真实灾难案例。"
                  : "容易混的两个：「合同加条款」和「翻译加料」其实都是忠实型 —— 这类错不在真实世界，在你给它的原文或指令。"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionTwoKinds;
