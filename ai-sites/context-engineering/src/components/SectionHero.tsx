/**
 * SectionHero · Context Engineering 是什么？
 *
 * Hero 六段骨架。一句话定义只用日常词（「眼前能看到的信息」），不甩 context window 术语。
 * 视觉锚：一个容量有限的「桌面托盘」，几张信息卡被精心摆进去 / 有的被压缩 / 有的没放进来。
 *        coral + butter 主色，跟相邻 prompt（紫）、context-window 都不同。
 */
import React from "react";
import { ArrowDown } from "lucide-react";

const SLOTS = [
  { label: "你的问题", kind: "in", fill: "#E07A5F" },
  { label: "相关资料（挑过）", kind: "in", fill: "#1B4B5A" },
  { label: "聊天记录（压缩过）", kind: "in", fill: "#F4D35E" },
  { label: "一堆没用的旧消息", kind: "out", fill: "#FBEFE3" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="absolute top-20 left-[6%] hidden md:grid grid-cols-3 gap-2 pointer-events-none opacity-50">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* 文字 */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Context Engineering · 上下文工程
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            上下文工程
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.35rem,2.3vw,1.95rem)] leading-[1.42] mt-9 max-w-[720px] text-ink">
            上下文工程是精心安排{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">AI 每次干活时眼前能看到的那批信息</span>
            </span>
            ，让它既不缺料、也不被一堆没用的内容塞晕。
          </p>

          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你每次给 AI 发消息，它能「看到」的不只是你这句话 ——
              还有之前的聊天记录、你给的资料、背后预设的规矩。
              <span className="font-bold text-ink">这一整包，就是它这次的「眼前信息」。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              问题是：这个「眼前」装不下太多东西。塞少了它没料、瞎编；
              塞多了它抓不住重点、开始走神。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              所以得有人精心安排：该放什么、不放什么、怎么放进去。
              <span className="font-bold text-ink">这门安排的手艺，就叫上下文工程。</span>
            </p>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先弄明白这个「眼前」为啥装不下太多，再看塞多塞少各会怎样、有哪些安排的招式。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* 视觉锚：有限托盘 */}
        <div className="lg:col-span-5">
          <div className="relative">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                  AI 这次的「眼前」
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-coral font-bold">
                  容量有限
                </span>
              </div>

              {/* 托盘容量条 */}
              <div className="h-3 bg-cream border-2 border-ink rounded-full overflow-hidden mb-5">
                <div className="h-full bg-coral rounded-full" style={{ width: "76%" }} />
              </div>

              <div className="space-y-3">
                {SLOTS.map((s) => (
                  <div
                    key={s.label}
                    className={[
                      "flex items-center gap-3 border-2 border-ink rounded-2xl px-4 py-3 transition-all",
                      s.kind === "out" ? "opacity-45 border-dashed" : "shadow-stamp",
                    ].join(" ")}
                    style={{ backgroundColor: s.kind === "out" ? "transparent" : s.fill }}
                  >
                    <span
                      className={[
                        "font-display font-bold text-[14px]",
                        s.kind === "out"
                          ? "text-ink/60 line-through"
                          : s.fill === "#F4D35E" || s.fill === "#FBEFE3"
                            ? "text-ink"
                            : "text-cream",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                    <span className="ml-auto font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                      {s.kind === "out" ? "没放进来" : "放进来"}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-5 font-mono text-[10.5px] text-ink/45 leading-relaxed">
                ↑ 安排谁进、谁不进、谁先压缩 —— 这就是上下文工程在干的事。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
