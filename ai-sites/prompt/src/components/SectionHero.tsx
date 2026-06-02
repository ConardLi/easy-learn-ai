/**
 * SectionHero · Prompt 是什么？
 *
 * 开场纪律：
 *   1. eyebrow：Prompt · 提示词
 *   2. H1：Prompt 是什么？ 直白发问
 *   3. 一句话定义：你打字发给 AI 的那段话，就是 prompt（陈述句，零比喻）
 *   4. 白话 3 段：解释「那段话」「发给谁」「写法影响结果」，第一次提到模型/token 挂出站链
 *   5. 视觉锚：右侧「输入框里打着一句指令 → 箭头 → 模型 → 冒出回答」，teal 主调
 *   6. 过渡句 + 滚动提示（无数字）
 */
import React from "react";
import { ArrowDown, ExternalLink, ArrowUpRight } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落小方块（像打字光标） */}
      <div className="absolute top-16 right-[7%] hidden md:flex gap-1.5 pointer-events-none opacity-60">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-2.5 h-2.5 rounded-[3px] border-2 border-ink"
            style={{ backgroundColor: i === 1 ? "#1B4B5A" : "transparent" }}
          />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Prompt · 提示词
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Prompt
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[660px] text-ink">
            一句话：你打字发给 AI 的{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">那段话</span>
            </span>
            ，就是 prompt。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你在 ChatGPT 输入框里敲下「帮我写一封请假邮件」，按回车 —— 那句话就是一个 prompt。
              <span className="font-bold text-ink">它告诉 AI 你要它干什么。</span>
              问得越清楚，它给的东西越对得上你的需求。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              ChatGPT 背后那个会读字、写字的程序，叫
              <a
                href="../llm/index.html"
                className="font-bold text-ink underline decoration-teal decoration-2 underline-offset-2 hover:text-teal"
              >
                大语言模型（LLM）
              </a>
              。它读完你打的 prompt，再一个字一个字往下写，拼出回答。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              同一件事，换一种问法，拿到的结果可能差很远。
              <span className="font-bold text-ink">prompt 写得好不好，直接决定 AI 回得好不好。</span>
              下面就来拆，一个好用的 prompt 长什么样、怎么写。
            </p>
          </div>

          {/* 互链聚合卡 → 模型基础族（LLM / Token）*/}
          <div className="mt-9 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp max-w-[600px] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring">
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">prompt 发给谁、AI 怎么读它？</span>
                <span className="text-ink/65">
                  {" "}
                  收下这段话的是那个大语言模型；它读的时候会先把你的字切成一小块一小块（叫 token）再处理。
                </span>
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 pl-10">
              <a
                href="../llm/index.html"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                背后的模型 · LLM <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
              <a
                href="../token/index.html"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                它怎么数你的字 · Token <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
            </div>
          </div>

          {/* 过渡句 + 滚动提示 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看同一个需求换两种问法，AI 回出来差多少。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 输入框 → 模型 → 回答 ─── */}
        <div className="lg:col-span-5">
          <div className="relative group">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                你打字 → 模型 → 回答
              </span>
            </div>

            <div className="relative border-[3px] border-ink rounded-2xl bg-white shadow-stamp-lg p-4 space-y-4">
              {/* 1 · 你打的那段话（prompt） */}
              <div className="relative">
                <span className="absolute -top-2 left-3 px-1.5 bg-white font-mono text-[9px] tracking-[0.18em] uppercase text-teal font-bold">
                  你打的话 · PROMPT
                </span>
                <div className="border-2 border-ink rounded-xl bg-cream px-3.5 py-3 mt-1">
                  <p className="font-sans text-[14px] leading-relaxed text-ink">
                    帮我写一封请假邮件
                    <span className="inline-block w-[2px] h-[15px] bg-ink ml-0.5 align-middle animate-pulse-dot" />
                  </p>
                </div>
              </div>

              {/* 箭头 */}
              <div className="flex justify-center">
                <ArrowDown
                  className="w-5 h-5 text-ink transition-transform duration-500 ease-spring group-hover:translate-y-1"
                  strokeWidth={2.5}
                />
              </div>

              {/* 2 · 模型 */}
              <div className="flex items-center gap-3 border-2 border-ink rounded-xl bg-teal px-3.5 py-3">
                <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-butter border-2 border-ink flex items-center justify-center font-display font-extrabold text-[13px] text-ink">
                  AI
                </span>
                <span className="font-sans text-[12.5px] leading-snug text-cream">
                  大语言模型读完你这段话，开始一个字一个字往下写
                </span>
              </div>

              {/* 箭头 */}
              <div className="flex justify-center">
                <ArrowDown
                  className="w-5 h-5 text-ink transition-transform duration-500 ease-spring group-hover:translate-y-1"
                  strokeWidth={2.5}
                />
              </div>

              {/* 3 · 回答 */}
              <div className="relative">
                <span className="absolute -top-2 left-3 px-1.5 bg-white font-mono text-[9px] tracking-[0.18em] uppercase text-coral font-bold">
                  它回的话 · 示意
                </span>
                <div className="border-2 border-ink rounded-xl bg-butter-tint px-3.5 py-3 mt-1">
                  <p className="font-sans text-[13px] leading-relaxed text-ink/85">
                    主题：请假申请<br />
                    尊敬的领导，我计划于 X 月 X 日请假一天……
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 font-sans text-[12.5px] text-ink/55 text-center leading-relaxed">
              这段「请假邮件」是示意，帮你看清流程，不是真实输出。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
