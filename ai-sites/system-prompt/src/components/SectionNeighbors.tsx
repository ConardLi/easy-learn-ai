/**
 * SectionNeighbors · 收尾 + 邮戳卡互链
 *
 * 互链（统一邮戳卡：border-2 border-ink + shadow-stamp + 圆徽章含 ExternalLink）：
 *   - 醒目卡（butter）：context-window（system prompt 占 context 最前面那段）
 *   - 醒目卡（butter）：prompt（分锅 —— 那站讲怎么写好你打的字，这站讲开发者预设的那段）
 *   - 紧凑卡：few-shot / chain-of-thought（兄弟站，写 prompt 的两种招）/ llm（背后的模型）
 * 收尾 callout：可执行操作建议（不是鸡汤）。
 */
import React from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";

const COMPACT = [
  {
    href: "../few-shot/index.html",
    title: "Few-shot 举例子",
    desc: "给模型几个示范，让它照着答",
  },
  {
    href: "../chain-of-thought/index.html",
    title: "Chain of Thought",
    desc: "让模型先想步骤再给答案",
  },
  {
    href: "../llm/index.html",
    title: "LLM 大语言模型",
    desc: "收下这段话、给你回话的那个模型",
  },
];

const SectionNeighbors: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">它跟谁挨着</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[780px] leading-[1.1]">
          它坐在哪、跟「写提示词」是啥关系
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/80 max-w-[660px]">
          system prompt 不是孤立的东西。两件事顺手说清：它在模型那段「能看见的文字」里坐哪、
          它跟你自己写提示词怎么分工。
        </p>

        {/* 收尾 callout · 可执行建议 */}
        <div className="mt-9 bg-coral border-2 border-ink rounded-3xl px-5 py-5 shadow-stamp-lg max-w-[820px]">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-cream/85 block mb-2">
            下次用 ChatGPT 记得
          </span>
          <p className="font-sans text-[15.5px] leading-[1.75] text-cream">
            觉得它语气、格式、能聊的范围不对劲，多半是背后那段 system 定的，不一定是你问得不好。
            想换风格：要么去设置里写两句（ChatGPT 在「设置 → 自定义指令」），要么换一个为那个场景专门调过的应用，或别人在 ChatGPT 里搭好的 GPTs（已经替你配好 system 的小应用）。
          </p>
        </div>

        {/* 醒目邮戳卡 ×2 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* context-window */}
          <a
            href="../context-window/index.html"
            className="block bg-butter border-2 border-ink rounded-2xl px-5 py-4 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span>
                <span className="font-display font-bold text-[16px] text-ink block leading-tight">
                  它坐在 Context Window 最前面
                </span>
                <span className="font-sans text-[13px] leading-relaxed text-ink/75 block mt-1.5">
                  模型每轮能看见的全部文字叫 context window。system prompt 就是钉在那段最前头的一截。
                  想知道那段一共能装多少、装满了会怎样 → 看这站。
                </span>
              </span>
            </div>
          </a>

          {/* prompt（分锅） */}
          <a
            href="../prompt/index.html"
            className="block bg-butter border-2 border-ink rounded-2xl px-5 py-4 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span>
                <span className="font-display font-bold text-[16px] text-ink block leading-tight">
                  跟「写提示词」怎么分工
                </span>
                <span className="font-sans text-[13px] leading-relaxed text-ink/75 block mt-1.5">
                  Prompt 那站讲「你打的字怎么写更好使」；这站讲「开发者预先定的那段」。
                  两段都是给模型的话，一段你写、一段产品定。
                </span>
              </span>
            </div>
          </a>
        </div>

        {/* 紧凑邮戳卡 ×3 */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {COMPACT.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="block bg-white border-2 border-ink rounded-xl px-4 py-3.5 shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cream border-2 border-ink flex items-center justify-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-ink" strokeWidth={2.6} />
                </span>
                <span className="font-display font-bold text-[14px] text-ink leading-tight">
                  {c.title}
                </span>
              </div>
              <span className="font-sans text-[12px] leading-snug text-ink/70 block">{c.desc}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionNeighbors;
