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
          {/* ━━ 左：定义层 ━━ */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                AI Agent · 智能体
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              AI Agent 是什么？
            </h1>

            <p className="max-w-2xl font-display text-[22px] lg:text-[26px] font-bold text-ink leading-snug mb-6 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3.5 lg:h-5 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  一个能自己决定下一步做什么、并真的去做的大模型程序。
                </span>
              </span>
            </p>

            <div className="max-w-xl space-y-3 text-[15.5px] lg:text-[16.5px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                普通的聊天模型只会回答你的问题。Agent 在它外面多套了两层能力：
              </p>
              <p>
                <strong className="text-ink">① 能调外部工具</strong> ——
                搜索、读写文件、跑代码、点网页按钮、调任意 API。
              </p>
              <p>
                <strong className="text-ink">② 能多轮自我循环</strong> ——
                看到工具返回的结果，再决定下一步怎么走，直到任务完成或卡住。
              </p>
            </div>

            <p className="mt-6 max-w-xl font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              2024 年底 Claude 第一次直接操作屏幕，2026 年这种"会动手的 AI"已经在帮人处理订机票、写代码、跑数据分析。
            </p>

            <div className="mt-10 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
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
