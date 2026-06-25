import React from "react";
import { ArrowDown, Boxes, FileText, Hash, LocateFixed } from "lucide-react";
import StampLink from "./StampLink";

const SectionOpening: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
      <div aria-hidden className="absolute right-[9%] top-28 hidden lg:block animate-float-y">
        <div className="h-12 w-12 rotate-12 rounded-2xl border-2 border-ink bg-teal shadow-stamp" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="h-10 w-10 -rotate-6 rounded-full border-2 border-ink bg-coral shadow-stamp" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 shadow-stamp animate-enter-pop">
              <span className="h-2 w-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink">
                Embedding · 嵌入向量
              </span>
            </div>

            <h1 className="mb-6 font-display text-display-xl text-ink animate-enter-up">
              Embedding 是什么？
            </h1>

            <p className="mb-6 max-w-2xl font-display text-[22px] font-bold leading-snug text-ink lg:text-[26px] animate-enter-up">
              <span className="relative inline-block">
                <span className="absolute bottom-0.5 left-0 right-0 h-3.5 bg-butter lg:h-5" aria-hidden />
                <span className="relative z-10">
                  Embedding 是把内容变成一串数字，让机器能比较意思像不像。
                </span>
              </span>
            </p>

            <div className="max-w-xl space-y-3 text-[15.5px] leading-relaxed text-ink/75 lg:text-[16.5px] animate-enter-fade">
              <p>
                内容可以是一句话、一段文档、一张图片。变成数字后，它就有了一个位置。
              </p>
              <p>
                意思接近的内容，位置会靠近。意思差得远的内容，位置会拉开。
              </p>
              <p>
                这样一来，电脑就能做一件以前很难做的事：不只按字面找，还能按意思找。
              </p>
              <p>
                这站只讲会被保存下来、用于搜索的那组数字。模型内部每一步的位置怎样变化，放在《表示空间》里讲。
              </p>
            </div>

            <div className="mt-7">
              <StampLink
                href="../rag/index.html"
                title="Embedding 经常和 RAG 一起出现。"
                desc="RAG 负责先翻资料再回答，Embedding 负责把“按意思翻资料”这件事算出来。"
              />
            </div>

            <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/70 animate-enter-fade">
              先用一张能动的“意思地图”看它怎么工作 ↓
            </p>

            <div className="mt-8 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream animate-float-y-sm">
                <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroVectorBoard />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroVectorBoard: React.FC = () => {
  return (
    <div className="mx-auto max-w-md">
      <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-ink bg-white shadow-stamp-lg">
        <div className="absolute inset-0 bg-butter/25" />
        <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full" aria-hidden>
          <g stroke="#241C15" strokeWidth="0.5" opacity="0.08">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="220" y2={i * 20} />
            ))}
          </g>
          <path d="M55 154 C88 98 122 86 170 48" fill="none" stroke="#1B4B5A" strokeWidth="2" strokeDasharray="5 6" opacity="0.7" />
          <path d="M44 68 C88 128 126 146 176 162" fill="none" stroke="#E07A5F" strokeWidth="2" strokeDasharray="4 7" opacity="0.7" />
        </svg>

        <div className="absolute left-8 top-8 flex h-16 w-16 -rotate-6 items-center justify-center rounded-2xl border-2 border-ink bg-cream shadow-stamp animate-float-y">
          <FileText className="h-7 w-7 text-ink" strokeWidth={2.4} />
        </div>
        <div className="absolute right-10 top-12 flex h-14 w-14 rotate-6 items-center justify-center rounded-full border-2 border-ink bg-coral text-cream shadow-stamp animate-float-y-sm">
          <Hash className="h-7 w-7" strokeWidth={2.6} />
        </div>
        <div className="absolute bottom-16 left-14 flex h-14 w-14 rotate-3 items-center justify-center rounded-xl border-2 border-ink bg-teal text-cream shadow-stamp">
          <Boxes className="h-7 w-7" strokeWidth={2.4} />
        </div>
        <div className="absolute bottom-10 right-12 flex h-16 w-16 -rotate-3 items-center justify-center rounded-2xl border-2 border-ink bg-butter shadow-stamp-lg animate-wiggle">
          <LocateFixed className="h-8 w-8 text-ink" strokeWidth={2.5} />
        </div>

        <div className="absolute left-8 right-8 top-[92px] rounded-2xl border-2 border-ink bg-white px-4 py-3 shadow-stamp">
          <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
            text → numbers
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[0.12, -0.44, 0.87, 0.03, -0.19, 0.61].map((n) => (
              <span key={n} className="rounded-md border border-ink/20 bg-cream px-2 py-1 font-mono text-[12px] text-ink/75">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOpening;
