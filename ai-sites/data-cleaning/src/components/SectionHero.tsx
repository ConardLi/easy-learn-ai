/**
 * SectionHero · 数据清洗是什么？
 *
 * Hero 六段骨架。一句话定义只用日常词（「把又脏又乱的原始数据，挑掉没用的、留下能用的」）。
 * 视觉锚：一个漏斗 —— 上面进一堆乱七八糟的料，下面流出干净的料。coral + teal 主色。
 */
import React from "react";
import { ArrowDown, Filter } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Data Cleaning · 数据清洗
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            数据清洗
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.42] mt-9 max-w-[720px] text-ink">
            数据清洗是{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">把又脏又乱的原始数据，挑掉没用的、留下能用的</span>
            </span>
            ，让模型读到的都是干净料。
          </p>

          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              从网上扒来的原始数据是一团乱麻：有重复的、有乱码、有广告、有骂人的、格式还五花八门。
              <span className="font-bold text-ink">把这些垃圾挑出去扔掉的过程，就是数据清洗。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              就像做饭前要洗菜、择菜、把烂叶子摘掉。菜没洗干净，再好的厨子也炒不出好菜。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              模型也一样：脏数据喂进去，它会跟着学坏。
              <span className="font-bold text-ink">清洗这一步，直接决定后面训练出来靠不靠谱。</span>
            </p>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一眼原始数据有多脏，再跟着走一遍清洗的流水线，看它怎么一步步变干净。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* 视觉锚：漏斗 */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/45 mb-3">
              脏数据进 → 干净数据出
            </div>
            <div className="space-y-1.5">
              {["重复 ×3", "乱码 ###%@", "广告：点击领红包", "正常的好句子"].map((t, i) => (
                <div
                  key={t}
                  className={[
                    "rounded-xl border-2 border-ink px-3 py-2 font-mono text-[12.5px]",
                    i === 3 ? "bg-teal text-cream" : "bg-cream/60 text-ink/50 line-through",
                  ].join(" ")}
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="my-3 flex justify-center">
              <Filter className="w-7 h-7 text-coral" strokeWidth={2.2} />
            </div>

            <div className="bg-butter border-2 border-ink rounded-2xl px-4 py-3 text-center">
              <div className="font-display font-extrabold text-[16px] text-ink">只留下干净的好句子</div>
              <p className="mt-1 font-mono text-[10.5px] text-ink/55">↑ 量少了，但每条都能用</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
