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
import { ArrowDown, ExternalLink } from "lucide-react";

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
          {/* 左：定义层 */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Retrieval-Augmented Generation · 检索增强生成
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              RAG 是什么？
            </h1>

            <p className="max-w-2xl font-display text-[22px] lg:text-[26px] font-bold text-ink leading-snug mb-6 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3.5 lg:h-5 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  回答问题之前，先去你的资料库里翻一下相关内容，再带着这些内容回答。
                </span>
              </span>
            </p>

            <div className="max-w-xl space-y-3 text-[15.5px] lg:text-[16.5px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                大模型脑子里的知识是训练那一刻定下来的，对你公司的内部文档、最新新闻、个人笔记一概不知道。
              </p>
              <p>
                RAG 在中间插一步：你提问 → 系统先去你的资料库里按意思搜出几段相关内容（后面讲怎么搜）→ 把这几段和问题一起喂给模型 → 模型据此作答。
              </p>
              <p>
                这样模型既能用上它本身的语言能力，又能基于你的私有或最新数据来答题，不用重新训练。
              </p>
            </div>

            {/* 互链卡：该用 RAG 还是微调还是塞长 prompt */}
            <a
              href="../whyfinetune/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-xl px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">该用 RAG，还是微调，还是直接把资料塞进 prompt？</span>
                <span className="text-ink/70">
                  {" "}
                  这三条路怎么选 —— 去《为什么要微调》那一站看「三岔口」。
                </span>
              </span>
            </a>

            <p className="mt-7 max-w-xl text-[15px] text-ink/70 leading-relaxed animate-enter-fade">
              先看一眼：同一个问题，配资料库和不配，答案能差多少 ↓
            </p>

            <div className="mt-8 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
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
