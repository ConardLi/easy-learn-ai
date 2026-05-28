/**
 * Section 01 · Opening
 *
 * 命题：LLM 有两个固有缺陷 —— 知识截止 + 幻觉。RAG 就是来填这个洞的。
 *
 * 开场插画：
 *   Hand-drawn flat vector illustration in Mailchimp Freddie style.
 *   A friendly chubby cartoon character (small owl-librarian or round robot)
 *   standing in front of a giant card catalog / filing cabinet, pulling out
 *   a card with a "fact found!" expression. Around them: a stamp marked "?",
 *   floating cards, a magnifying glass, a stack of books.
 *   Heavy black outline (2px), no gradients.
 *   Butter yellow (#F4D35E) as primary, coral (#E07A5F) accents,
 *   cream (#FBEFE3) background. Playful, knowledgeable, curious. 1:1.
 *
 *   放置路径：/imgs/knowledge/rag-opening.png
 */
import React from "react";
import { ArrowDown } from "lucide-react";

const SectionOpening: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
      {/* 浮动小色块装饰 */}
      <div aria-hidden className="absolute top-32 right-[8%] hidden lg:block animate-float-y">
        <div className="w-12 h-12 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>
      <div aria-hidden className="absolute top-1/2 left-[42%] hidden xl:block animate-wiggle">
        <div className="w-8 h-8 bg-butter border-2 border-ink rounded-md shadow-[2px_2px_0_0_#241C15]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* 左：文字 */}
          <div className="lg:col-span-7">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-8 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                a hands-on handbook · 2026
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-display-xl text-ink mb-7 animate-enter-up">
              它知道很多，
              <br />
              但只知道{" "}
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1" aria-hidden />
                <span className="relative z-10">昨天</span>
              </span>
              {" "}的事 ——
              <br />
              而且，它还会{" "}
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-coral/55 -z-0 rotate-1" aria-hidden />
                <span className="relative z-10">编</span>
              </span>
              。
            </h1>

            {/* 副标 */}
            <p className="max-w-xl font-sans text-[17px] lg:text-[19px] text-ink/70 leading-relaxed mb-3 animate-enter-fade">
              大语言模型有两个绕不开的缺陷：<strong className="text-ink">知识停留在训练截止那天</strong>
              ，并且<strong className="text-ink">不会承认自己不知道</strong> —— 它会一本正经地编一个看起来很合理的答案。
            </p>
            <p className="max-w-xl font-sans text-[15px] text-ink/55 leading-relaxed animate-enter-fade">
              <strong className="text-ink/75">RAG</strong>（Retrieval-Augmented Generation，检索增强生成）就是
              用一个最朴素的方式补这两个洞：<strong className="text-ink/75">回答之前，先查资料</strong>。
            </p>

            {/* 引导滚动 */}
            <div className="mt-12 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 个章节 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：开场插画 */}
          <div className="lg:col-span-5">
            <IllustrationSlot />
          </div>
        </div>
      </div>
    </section>
  );
};

/* 开场插画 */
const IllustrationSlot: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-md">
      <div className="relative aspect-square bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
        {/* butter 底 + 网格 */}
        <div className="absolute inset-0 bg-butter/25" aria-hidden />
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden>
          <g stroke="#241C15" strokeWidth="0.4" opacity="0.07">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
            ))}
          </g>
        </svg>

        <img
          src="/imgs/knowledge/rag-opening.png"
          alt="RAG 检索增强生成开场插画"
          className="relative z-10 h-full w-full object-contain p-4"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default SectionOpening;
