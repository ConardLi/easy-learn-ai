/**
 * SectionHero · Few-shot 是什么？
 *
 * 开场纪律：
 *   1. eyebrow：Few-shot Learning · 少样本 / 给示例
 *   2. H1「Few-shot 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：zero/one/few 的区别 + 「learning」不是训练（关键防误解）+ prompt 一句话说清
 *   5. 视觉锚：右侧「几张输入→输出例子卡 叠着，喂给下面一个空白新任务」
 *      —— 跟兄弟站（prompt / system-prompt / CoT）的主图都不撞，用 amber/butter
 *   6. 过渡句 + 滚动提示（不带数字）
 */
import React from "react";
import { ArrowDown, CornerDownRight } from "lucide-react";

const EXAMPLES = [
  { in: "这家店太慢了", out: "负面", tone: "#E07A5F" },
  { in: "包装很用心", out: "正面", tone: "#1B4B5A" },
  { in: "还行吧不好不坏", out: "中性", tone: "#88837C" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落的小例子点 */}
      <div className="absolute top-14 right-[7%] hidden md:flex gap-2 pointer-events-none opacity-60">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2.5 h-2.5 rounded-sm border-2 border-ink"
            style={{ backgroundColor: ["#F4D35E", "#FBE891", "#FEF6D3"][i] }}
          />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Few-shot Learning · 给模型几个示例
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Few-shot
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[660px] text-ink">
            在你的问题前面，先给模型几个{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">「输入 → 输出」的例子</span>
            </span>
            ，让它照着完成新的同类任务。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              一句话都不给例子、直接下命令，叫{" "}
              <span className="font-bold text-ink">zero-shot</span>（零示例）；给 1 个例子叫{" "}
              <span className="font-bold text-ink">one-shot</span>；给几个例子让它照着做，就是{" "}
              <span className="font-bold text-ink">few-shot</span>（几个示例）。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              名字里的 <span className="font-bold text-ink">learning（学习）</span> 容易让人误会。
              <span className="font-bold text-ink">这里没有训练模型，模型本身一点没变</span> ——
              它内部那套定型的本事（程序员管它叫参数）一个都没动。
              模型只是在这一次对话里，照着你给的几个样板临场模仿。关掉窗口重开，这几个例子就不算数了，得重新给。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              这些例子就写在 <span className="font-bold text-ink">prompt</span> 里 —— prompt
              就是你每次发给模型的那整段文字，包含你的要求，也包含你顺手附上的这几个例子。
            </p>
          </div>

          {/* 过渡句 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先拿同一道题试一下：例子从 0 个加到 3 个，看模型的回答怎么从乱变齐。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 几张例子卡 → 喂给一个空白新任务 ─── */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                给它看几个样板
              </span>
              <span className="font-mono text-[10.5px] text-ink/45">3 个示例</span>
            </div>

            {/* 示例卡堆 */}
            <div className="relative border-[3px] border-ink rounded-2xl bg-butter-tint shadow-stamp-lg p-4 space-y-2.5">
              {EXAMPLES.map((ex, i) => (
                <div
                  key={i}
                  className="group/ex flex items-center gap-2 bg-white border-2 border-ink rounded-xl px-3 py-2.5 shadow-stamp transition-transform duration-400 ease-spring hover:-translate-y-0.5"
                >
                  <span className="font-sans text-[13px] text-ink flex-1 leading-tight">
                    {ex.in}
                  </span>
                  <CornerDownRight className="w-3.5 h-3.5 text-ink/45 flex-shrink-0" strokeWidth={2.4} />
                  <span
                    className="font-mono font-bold text-[12px] px-2 py-0.5 rounded-md border-2 border-ink text-cream flex-shrink-0"
                    style={{ backgroundColor: ex.tone }}
                  >
                    {ex.out}
                  </span>
                </div>
              ))}

              {/* 箭头：照着上面做 */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <ArrowDown className="w-4 h-4 text-ink" strokeWidth={2.6} />
                <span className="font-mono text-[10.5px] tracking-[0.15em] uppercase text-ink/60">
                  照着做
                </span>
                <ArrowDown className="w-4 h-4 text-ink" strokeWidth={2.6} />
              </div>

              {/* 新任务卡（空白等填） */}
              <div className="flex items-center gap-2 bg-ink text-cream border-2 border-ink rounded-xl px-3 py-3">
                <span className="font-sans text-[13px] flex-1 leading-tight">
                  价格有点贵但质量好
                </span>
                <CornerDownRight className="w-3.5 h-3.5 text-cream/50 flex-shrink-0" strokeWidth={2.4} />
                <span className="font-mono font-bold text-[12px] px-2 py-0.5 rounded-md border-2 border-butter text-butter flex-shrink-0">
                  ?
                </span>
              </div>
            </div>

            {/* 下方两块说明 */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-white border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55 mb-0.5">
                  你做的事
                </div>
                <div className="font-display font-bold text-[13.5px] text-ink leading-tight">
                  附上几个样板
                </div>
              </div>
              <div className="bg-butter border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55 mb-0.5">
                  模型做的事
                </div>
                <div className="font-display font-bold text-[13.5px] text-ink leading-tight">
                  照着补出答案
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
