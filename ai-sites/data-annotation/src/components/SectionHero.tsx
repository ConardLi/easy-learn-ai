/**
 * SectionHero · 数据标注是什么？
 *
 * Hero 六段骨架。一句话定义只用日常词（「给原始数据贴上正确答案/标签」）。
 * 视觉锚：一张原始数据卡 + 一张被贴上标签的卡（before/after），pop + coral 主色。
 */
import React from "react";
import { ArrowDown, Tag } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="absolute top-28 left-[7%] hidden md:block pointer-events-none opacity-40">
        <Tag className="w-16 h-16 text-ink/20 -rotate-12" strokeWidth={1.5} />
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Data Annotation · 数据标注
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            数据标注
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-pop">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.42] mt-9 max-w-[720px] text-ink">
            数据标注是{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">给原始数据贴上「正确答案」或「标签」</span>
            </span>
            ，模型才知道该照着什么方向去学。
          </p>

          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              一段光秃秃的文字，模型并不知道你希望它拿来干嘛。
              得有人在旁边告诉它：这句话是「好评」还是「差评」、这个问题的「理想回答」长这样。
              <span className="font-bold text-ink">加上这些说明的过程，就是数据标注。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              就像老师批改作业时写上对错和评语。模型靠这些「批改」，
              才慢慢学会什么是对的、人更喜欢哪一种。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              这活儿可以全靠人手工做，也可以让一个现成的模型先做个初稿、再由人来审。
              <span className="font-bold text-ink">怎么标、标得准不准，直接影响模型学得好不好。</span>
            </p>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一条没标注的数据为啥没法学，再看标注分哪几种、亲手标一条试试。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* 视觉锚：before / after */}
        <div className="lg:col-span-5">
          <div className="space-y-4">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/45 mb-2">
                标注前 · 一条原始数据
              </div>
              <p className="font-sans text-[15px] text-ink/80 leading-[1.7]">
                「这家店等了一个小时菜还没上。」
              </p>
              <div className="mt-2 font-mono text-[11px] text-ink/35">？模型不知道拿它干嘛</div>
            </div>

            <div className="flex justify-center">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-pop">
                <ArrowDown className="h-4 w-4 text-cream" strokeWidth={2.6} />
              </span>
            </div>

            <div className="bg-butter border-2 border-ink rounded-3xl shadow-stamp-lg p-5">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-2">
                标注后 · 贴上了标签
              </div>
              <p className="font-sans text-[15px] text-ink leading-[1.7]">
                「这家店等了一个小时菜还没上。」
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-coral px-3 py-1 font-bold text-[13px] text-cream">
                  <Tag className="h-3 w-3" strokeWidth={2.6} /> 情绪：差评
                </span>
                <span className="rounded-full border-2 border-ink bg-white px-3 py-1 font-bold text-[13px] text-ink">
                  话题：服务速度
                </span>
              </div>
              <div className="mt-3 font-mono text-[11px] text-ink/55">✓ 模型知道这是「差评」可以学了</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
