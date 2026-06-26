/**
 * SectionHero · Multi Agent 是什么？
 *
 * Hero 六段骨架：eyebrow / H1 / 一句话定义 / 白话铺垫 / 过渡句 / 滚动提示
 * 视觉锚：几个分工小角色围成一排 + 一个总任务从上方落下被拆开（teal 主色，
 *        跟 agent 的循环轨道、sub-agent 的 coral 大方块都不同）
 * Hero 1-4 段只用日常词；「Agent = 会自己调工具分步骤干活的 AI」用一句话铺垫 + 挂互链
 */
import React from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const ROLES = [
  { tag: "规划", color: "#1B4B5A", note: "拆任务" },
  { tag: "执行", color: "#E07A5F", note: "动手干" },
  { tag: "审查", color: "#F4D35E", note: "挑错" },
  { tag: "总结", color: "#FBEFE3", note: "汇报" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落小点 */}
      <div className="absolute top-16 right-[7%] hidden md:grid grid-cols-4 gap-2 pointer-events-none opacity-50">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Multi Agent · 多个 AI 分工干活
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Multi Agent
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-teal">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[700px] text-ink">
            Multi Agent 是把一个大任务交给{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">几个各管一摊的 AI</span>
            </span>
            ，它们分工协作、互相传话，一起把事做完。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              这里的「一个 AI」，指的是能{" "}
              <a
                href="../agent/index.html"
                className="font-semibold underline decoration-teal/40 underline-offset-2 hover:decoration-teal"
              >
                自己调工具、分步骤把事做完的 Agent
              </a>
              （不是只会一问一答的聊天框）。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              一个人能干所有活吗？能，但又查资料、又写、又自己检查，
              <span className="font-bold text-ink">越忙越容易顾此失彼。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              换个法子：找几个 AI，一个专门拆任务、一个专门动手、一个专门挑错、一个专门汇报。
              <span className="font-bold text-ink">各管一摊，再把结果拼起来。</span>这就是 Multi Agent。
            </p>
          </div>

          {/* 过渡句 + 滚动提示 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一个 AI 单挑大任务怎么累垮自己，再聊该怎么分工、怎么搭台子、谁来指挥。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 一个任务被拆给几个分工角色 ─── */}
        <div className="lg:col-span-5">
          <div className="relative h-[460px]">
            {/* 顶部：总任务 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[210px]">
              <div className="bg-ink text-cream rounded-2xl shadow-stamp-lg px-5 py-3.5 text-center">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-1">
                  一个大任务
                </div>
                <div className="font-display font-extrabold text-[17px]">
                  「写一份竞品调研报告」
                </div>
              </div>
            </div>

            {/* 分发线 */}
            <svg className="absolute top-[64px] left-0 w-full h-[80px] pointer-events-none" viewBox="0 0 360 80" fill="none">
              {[70, 160, 250, 320].map((x) => (
                <path
                  key={x}
                  d={`M 180 4 C 180 40, ${x} 28, ${x} 74`}
                  stroke="#241C15"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                  opacity="0.5"
                  fill="none"
                />
              ))}
            </svg>

            {/* 四个分工角色 */}
            <div className="absolute top-[150px] left-0 w-full grid grid-cols-2 gap-3 px-1">
              {ROLES.map((r, i) => (
                <div
                  key={r.tag}
                  className="border-2 border-ink rounded-2xl shadow-stamp px-4 py-3"
                  style={{ backgroundColor: r.color }}
                >
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/60 mb-1">
                    AGENT {i + 1}
                  </div>
                  <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                    {r.tag}
                  </div>
                  <div className="font-mono text-[11px] text-ink/70 mt-1">{r.note}</div>
                </div>
              ))}
            </div>

            {/* 底部：拼回结果 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[78%]">
              <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp px-5 py-3 text-center">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-0.5">
                  拼起来 · 交付
                </div>
                <div className="font-display font-bold text-[15px] text-ink">一份完整报告</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 互链：先看 Agent 更顺 —— 醒目邮戳卡 */}
      <div className="relative max-w-[1140px] mx-auto mt-14">
        <a
          href="../agent/index.html"
          className="inline-flex items-start gap-3 border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring max-w-xl rounded-2xl bg-butter px-4 py-3"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
            <ExternalLink className="h-3.5 w-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="text-[13.5px] leading-[1.55] text-ink/75">
            <span className="font-bold text-ink">没听过「单个 Agent」？</span>
            <span> 先看《轻松理解 Agent》，知道一个 AI 怎么自己调工具干活，这一站会顺很多。</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionHero;
