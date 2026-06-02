/**
 * SectionFamily · Prompt 的进阶亲戚（hub 聚合卡互链 + 收尾）
 *
 * 三个兄弟站各管什么，用一句话白话讲清，挂邮戳卡链过去：
 *   System Prompt / Few-shot / Chain of Thought
 * 收尾 callout 走「可执行操作建议」一类。
 */
import React from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

type Relative = {
  name: string;
  en: string;
  href: string;
  oneLine: string;
  detail: string;
  color: string;
};

const RELATIVES: Relative[] = [
  {
    name: "System Prompt",
    en: "系统提示词",
    href: "../system-prompt/index.html",
    oneLine: "你看不见的那段「设定」，提前规定好 AI 的身份和规矩。",
    detail:
      "你在输入框打的话是 prompt；System Prompt 是 ChatGPT 这类产品在你开口之前就写好的一段设定（你看不见），每次对话都默默生效，管 AI 的身份、语气和规矩。",
    color: "#1B4B5A",
  },
  {
    name: "Few-shot",
    en: "给几个例子",
    href: "../few-shot/index.html",
    oneLine: "在 prompt 里先塞几个示范，让 AI 照着样子答。",
    detail:
      "直接给 AI 两三个「输入长这样、输出该长这样」的例子，比干讲一堆要求更管用。它看着例子模仿，格式和风格会稳很多。",
    color: "#E07A5F",
  },
  {
    name: "Chain of Thought",
    en: "让它一步步想",
    href: "../chain-of-thought/index.html",
    oneLine: "让 AI 把思考过程一步步写出来，再给答案。",
    detail:
      "碰到要算、要推理的难题，加一句「请一步一步想」，让它先把过程写出来。中间多走几步，答案做对的比例会高不少。",
    color: "#7A28CB",
  },
];

const SectionFamily: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink/10">
      <div className="max-w-[1040px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">进阶亲戚</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px] leading-tight">
          写顺了单条 prompt，还有这几个跟它分工
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/75 max-w-[680px]">
          你现在会写的，是日常打字发过去的那条 prompt。再往深走一点，会碰到下面三个名字。
          它们都还是「怎么跟 AI 说话」这件事，只是各管一摊。点进去能各自细看。
        </p>

        {/* hub 聚合卡 */}
        <div className="mt-9 px-5 py-5 bg-butter border-2 border-ink rounded-3xl shadow-stamp">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
            </span>
            <div>
              <p className="font-display font-bold text-[17px] text-ink">想再进阶？下面三个各讲一块</p>
              <p className="mt-1 font-sans text-[13.5px] leading-[1.6] text-ink/70">
                它们都在讲怎么跟 AI 说话，让它更听得懂。先把这条 prompt 写顺，再挑一个点进去看。
              </p>
            </div>
          </div>

          {/* 三张兄弟卡 */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATIVES.map((r) => (
              <a
                key={r.name}
                href={r.href}
                className="group block border-2 border-ink rounded-2xl bg-white p-4 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full border-2 border-ink" style={{ backgroundColor: r.color }} />
                  <ArrowUpRight
                    className="w-4 h-4 text-ink transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.6}
                  />
                </div>
                <p className="mt-3 font-display font-bold text-[16px] text-ink leading-tight">{r.name}</p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/45 mt-0.5">{r.en}</p>
                <p className="mt-2.5 font-sans text-[13px] leading-[1.6] text-ink/75">{r.oneLine}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 三段细讲 */}
        <div className="mt-9 space-y-4">
          {RELATIVES.map((r) => (
            <div key={r.name} className="flex items-start gap-4 border-2 border-ink/15 rounded-2xl p-5">
              <span
                className="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-ink flex items-center justify-center font-display font-extrabold text-[12px]"
                style={{ backgroundColor: r.color, color: r.color === "#F4D35E" ? "#241C15" : "#FBEFE3" }}
              >
                {r.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="font-display font-bold text-[15px] text-ink">
                  {r.name} <span className="font-sans font-normal text-[13px] text-ink/50">· {r.en}</span>
                </p>
                <p className="mt-1 font-sans text-[14px] leading-[1.7] text-ink/75">{r.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 收尾 callout · 可执行操作建议 */}
        <div className="mt-10 border-2 border-ink rounded-3xl bg-ink text-cream p-6 lg:p-8 shadow-stamp-lg">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-butter">下次问 AI 前，花十秒</p>
          <p className="mt-3 font-display font-bold text-[clamp(1.2rem,2.2vw,1.6rem)] leading-[1.5]">
            补上三样：要它干啥、给点背景、想要什么格式。
          </p>
          <p className="mt-3 font-sans text-[14.5px] leading-[1.7] text-cream/75 max-w-[640px]">
            这三样补齐，AI 回来的东西大概率能直接用。剩下的，就是多写多调 —— 写得越多，越知道怎么开口。
          </p>
        </div>

        {/* 回到基础 */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          <a
            href="../llm/index.html"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            回看 · 背后的模型 LLM <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
          </a>
          <a
            href="../token/index.html"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-cream border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            回看 · 它怎么数字 Token <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SectionFamily;
