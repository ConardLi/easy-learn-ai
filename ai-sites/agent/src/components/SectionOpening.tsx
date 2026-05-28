/**
 * Section 01 · Opening
 *
 * 设计：
 *   ─ 大字 hero，主题句拆成两行制造节奏
 *   ─ 关键词 "做事" 用 butter 高亮 underlay + 微旋转
 *   ─ 右侧主插画：/imgs/knowledge/insert-opening.png.png
 *   ─ 底部 "↓ scroll" 提示而非 CTA 按钮（保持低压力）
 */
import React from "react";
import { ArrowDown } from "lucide-react";

const SectionOpening: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32 pb-20 lg:pb-32 overflow-hidden">
      {/* 背景装饰：少量浮动 stamp 小色块 —— 不抢眼 */}
      <div
        aria-hidden
        className="absolute top-32 right-[8%] hidden lg:block animate-float-y"
      >
        <div className="w-12 h-12 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-32 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>
      <div
        aria-hidden
        className="absolute top-1/2 left-[42%] hidden xl:block animate-wiggle"
      >
        <div className="w-8 h-8 bg-butter border-2 border-ink rounded-md shadow-[2px_2px_0_0_#241C15]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ━━ 左：文字主舞台 ━━ */}
          <div className="lg:col-span-7">
            {/* eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-8 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                a hands-on handbook · 2026
              </span>
            </div>

            {/* H1 大字 */}
            <h1 className="font-display text-display-xl text-ink mb-7 animate-enter-up">
              AI 现在不光{" "}
              <span className="text-ink/55 font-normal italic">回答问题</span>
              <span className="text-ink/55">，</span>
              <br />
              它能{" "}
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-1 h-5 lg:h-7 bg-butter -z-0 -rotate-1"
                  aria-hidden
                />
                <span className="relative z-10">做事</span>
              </span>{" "}
              了。
            </h1>

            {/* 副标 */}
            <p className="max-w-xl font-sans text-[17px] lg:text-[19px] text-ink/70 leading-relaxed mb-3 animate-enter-fade">
              从 2024 年底 Claude Computer Use 第一次直接操作屏幕，到 2026 年 Gemini Spark
              24 小时帮你处理日常事务 ——
              <span className="font-bold text-ink"> Agent 已经从论文走进生活。</span>
            </p>
            <p className="max-w-xl font-sans text-[15px] text-ink/55 leading-relaxed animate-enter-fade">
              这份手册不讲它是什么的「包装话」，只讲它<strong className="text-ink/75">怎么运作</strong>
              、<strong className="text-ink/75">为什么 work</strong>、
              <strong className="text-ink/75">现在能做到什么</strong>。
            </p>

            {/* 引导滚动（克制，不是 CTA） */}
            <div className="mt-12 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 个章节 · ~10 分钟
              </div>
            </div>
          </div>

          {/* ━━ 右：插画占位 ━━ */}
          <div className="lg:col-span-5">
            <IllustrationSlot />
          </div>
        </div>
      </div>
    </section>
  );
};

/* ──────────────────────────────────────────
 * 主插画
 * 加少量"舞台装饰"避免大白底显得寡淡
 * ────────────────────────────────────────── */
const IllustrationSlot: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-md">
      {/* 主画框 */}
      <div className="relative aspect-square bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
        {/* 背景：butter tint + 网格 */}
        <div className="absolute inset-0 bg-butter/25" aria-hidden />
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          aria-hidden
        >
          <g stroke="#241C15" strokeWidth="0.4" opacity="0.07">
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`v-${i}`} x1={i * 20} y1="0" x2={i * 20} y2="200" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={i * 20} x2="200" y2={i * 20} />
            ))}
          </g>
        </svg>

        {/* 真实插画 —— 浮动微动 */}
        <img
          src="/imgs/knowledge/insert-opening.png.png"
          alt="一个友好的小机器人，手持清单与扳手，周围浮着咖啡杯、放大镜、纸飞机、齿轮"
          className="relative z-10 w-full h-full object-contain p-2 animate-float-y"
          loading="eager"
          decoding="async"
        />

        {/* 角落装饰小贴纸 */}
        <div
          aria-hidden
          className="absolute top-3 left-3 px-2 py-0.5 bg-ink text-cream rounded-md font-mono text-[9px] uppercase tracking-[0.2em] z-20"
        >
          fig · 01
        </div>
        <div
          aria-hidden
          className="absolute bottom-3 right-3 flex items-center gap-1.5 z-20"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse-dot" />
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
            doing things
          </span>
        </div>
      </div>
    </div>
  );
};

export default SectionOpening;
