/**
 * SectionWhenWorth · 什么时候值得用
 *
 * L3 勾选组合 + 条件结论：
 *   - 用户勾自己这道题的特征（多步 / 涉及算数 / 要核对 / 一句话能答 / 在意快）
 *   - 实时给「值得 / 不值得 / 看情况」的结论 + 理由
 *   - 旁边常驻「代价」面板：先想再答会让模型多写很多字，这些字按 token 计费，所以慢一点、贵一点 → 链 token 站
 */
import React, { useState } from "react";
import { Check, ExternalLink, ArrowUpRight } from "lucide-react";

type Q = { id: string; label: string; kind: "pro" | "con" };

const QUESTIONS: Q[] = [
  { id: "multi", label: "这题要绕好几个弯才能算出 / 推出答案", kind: "pro" },
  { id: "math", label: "涉及算数、逻辑或一连串判断", kind: "pro" },
  { id: "check", label: "我想能逐步核对它的过程对不对", kind: "pro" },
  { id: "simple", label: "答案一句话就能说清（查事实 / 翻译 / 闲聊）", kind: "con" },
  { id: "fast", label: "我很在意它回得快、别让我等", kind: "con" },
];

const SectionWhenWorth: React.FC = () => {
  const [picked, setPicked] = useState<Record<string, boolean>>({ multi: true, math: true });

  const toggle = (id: string) =>
    setPicked((p) => ({ ...p, [id]: !p[id] }));

  const pros = QUESTIONS.filter((q) => q.kind === "pro" && picked[q.id]).length;
  const cons = QUESTIONS.filter((q) => q.kind === "con" && picked[q.id]).length;

  let verdict: { tag: string; tone: "yes" | "no" | "maybe"; line: string };
  if (pros === 0 && cons === 0) {
    verdict = {
      tag: "先勾几个",
      tone: "maybe",
      line: "勾上你这道题的特征，下面给个判断。",
    };
  } else if (pros > cons) {
    verdict = {
      tag: "值得用",
      tone: "yes",
      line: "这种题让它先想再答，多写点过程换更稳的答案，划算。错了也好顺着步骤找哪一步歪了。",
    };
  } else if (cons > 0 && pros === 0) {
    verdict = {
      tag: "不值得",
      tone: "no",
      line: "这种题它一句话就能答对。再加「一步步想」，只会让它多写一大段、回得更慢、还更费钱（多写的字都按 token 计费，右边有解释），白费。",
    };
  } else {
    verdict = {
      tag: "看情况",
      tone: "maybe",
      line: "有值得的理由，也有犯不上的理由。要是结果总出错，就开；要是只图快又够简单，就别开。",
    };
  }

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-[#FEF6D3] border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">When Worth · 什么时候用</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          不是每道题都该
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-white -z-0" />
            <span className="relative z-10">先想再答</span>
          </span>
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          先想再答能把绕弯的题答得更准，代价是模型要多写很多字。
          <span className="font-bold text-ink"> 勾一下你这道题的特征</span>，看看到底值不值。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：勾选 */}
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {QUESTIONS.map((q) => {
                const on = !!picked[q.id];
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => toggle(q.id)}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3.5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring ${
                      on
                        ? "bg-white shadow-stamp-lg -translate-x-0.5 -translate-y-0.5"
                        : "bg-white/40 shadow-stamp hover:bg-white"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-6 h-6 rounded-md border-2 border-ink flex items-center justify-center ${
                        on ? (q.kind === "pro" ? "bg-[#7A28CB]" : "bg-pop") : "bg-cream"
                      }`}
                    >
                      {on && <Check className="w-4 h-4 text-cream" strokeWidth={3} />}
                    </span>
                    <span className="font-sans text-[14.5px] text-ink/85 leading-[1.5]">{q.label}</span>
                    <span
                      className={`ml-auto font-mono text-[9.5px] tracking-[0.15em] px-2 py-0.5 rounded-full border-2 ${
                        q.kind === "pro"
                          ? "border-[#7A28CB]/40 text-[#7A28CB]"
                          : "border-pop/40 text-pop"
                      }`}
                    >
                      {q.kind === "pro" ? "+ 偏值得" : "− 偏不值"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 结论 */}
            <div
              key={verdict.tag}
              className="mt-6 rounded-2xl border-2 border-ink shadow-stamp-lg overflow-hidden animate-enter-fade"
            >
              <div
                className="px-5 py-3 flex items-center gap-2 border-b-2 border-ink/15"
                style={{
                  backgroundColor:
                    verdict.tone === "yes" ? "#7A28CB" : verdict.tone === "no" ? "#FF4D74" : "#241C15",
                }}
              >
                <span className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-cream/70">
                  判断
                </span>
                <span className="font-display font-extrabold text-[18px] text-cream">
                  {verdict.tag}
                </span>
              </div>
              <div className="px-5 py-4 bg-white">
                <p className="font-sans text-[15px] leading-[1.7] text-ink/85">{verdict.line}</p>
              </div>
            </div>
          </div>

          {/* 右：代价面板 + token 互链 */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-ink bg-ink text-cream shadow-stamp p-5">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-butter mb-3">
                先想再答的代价
              </div>
              <ul className="space-y-3">
                {[
                  ["多写很多字", "把每一步都写出来，输出可能是直接答的好几倍长。"],
                  ["回得更慢", "字越多，模型一个一个吐出来就越久，你要多等。"],
                  ["更费钱", "模型按 token 计费，多吐的这些过程也都算钱。"],
                ].map(([h, d]) => (
                  <li key={h} className="flex gap-3">
                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pop mt-2" />
                    <div>
                      <div className="font-sans font-bold text-[14px] text-cream">{h}</div>
                      <div className="font-sans text-[12.5px] text-cream/65 leading-[1.55]">{d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 px-4 py-3.5 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-cream border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[13px] leading-[1.6] text-ink/80">
                  <span className="font-bold text-ink">token 是模型计费和计数的小单位。</span>{" "}
                  一段文字会被切成很多 token，先想再答多写的过程，就是多出来的一堆 token。
                </span>
              </div>
              <a
                href="../token/index.html"
                className="inline-flex items-center gap-1.5 mt-3 ml-10 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                计量单位 · Token <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhenWorth;
