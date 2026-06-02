/**
 * SectionHero · Agent TodoList 是什么？
 *
 * Hero 开场纪律：
 *   1. eyebrow tag
 *   2. H1「Agent TodoList 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：第 8 步跳了第 5 步的现场（基础理解，反直觉钩子留给 Section 02）
 *   5. 视觉锚：钉在墙上的便利贴 + 折角 Checklist，跟 agent-memory（档案柜）/ agent-loop（旋转环）拉开
 *   6. 过渡句 + 滚动提示
 */
import React from "react";
import { ArrowDown, Check, X, ExternalLink } from "lucide-react";

const STICKY_ITEMS: { text: string; done: boolean; tone: "ink" | "muted" }[] = [
  { text: "查日历未来 3 天", done: true, tone: "ink" },
  { text: "汇总未读邮件", done: true, tone: "ink" },
  { text: "扫 Git 昨日活动", done: false, tone: "muted" },
  { text: "生成趋势分析", done: false, tone: "muted" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div className="absolute top-14 right-[6%] hidden md:grid grid-cols-5 gap-2 pointer-events-none opacity-55">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左：文字主体 ─── */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Agent TodoList · 待办清单
            </span>
          </div>

          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Agent TodoList
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[660px] text-ink">
            一句话：给 AI Agent 的{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">Checklist —— 别忘事 + 给你看进度</span>
            </span>
            。
          </p>

          <div className="mt-9 space-y-4 max-w-[610px]">
            <p className="font-sans text-[14.5px] leading-[1.7] text-ink/75 px-3 py-2.5 bg-cream border border-dashed border-ink/30 rounded-xl">
              <span className="font-bold text-ink">先把一个名词说清：Coding Agent</span>{" "}
              = 能在你电脑上读 / 改代码、跑命令的 AI（比 ChatGPT 多一双手 —— Claude Code、Cursor 都算）。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              AI 在帮你写代码时，
              <span className="font-bold text-ink">聊久了会忘前面的步骤</span>
              ：你让它跑一套 18 步的任务，前 4 步都顺，
              第 8 步却跳过了第 5 步 —— 没报错、没卡住，就是忘了。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              步骤一多，人也靠清单；让 AI 写代码也一样。
              Claude Code 用两张清单来防忘：
              <span className="font-mono text-[14px] text-ink"> TodoWrite </span>
              是本次聊天里的便利贴（关了聊天就没了），
              <span className="font-mono text-[14px] text-ink"> Task </span>
              是写在硬盘里的任务单（明天还能接着看）。
              <span className="font-bold text-ink"> 下面分开讲</span>。
            </p>
          </div>

          {/* 跨站导读：跟 SubAgent 是两件事 */}
          <div className="mt-6 max-w-[610px] bg-butter-tint border-2 border-dashed border-ink/30 rounded-2xl px-4 py-3">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
              别跟 SubAgent 搞混
            </div>
            <p className="font-sans text-[13.5px] leading-[1.65] text-ink/75">
              这两件事不一样：AI{" "}
              <span className="font-bold text-ink">跳步骤、忘前面要干啥</span>{" "}
              → 接着往下看 Todo；聊久了对话{" "}
              <span className="font-bold text-ink">被工具输出塞满、开始走神</span>{" "}
              是分身管的事。
            </p>

            {/* 跨站入口·紧凑邮戳卡 → SubAgent（与 SubAgent 站导读框镜像呼应） */}
            <a
              href="../sub-agent/index.html"
              className="mt-3 flex items-start gap-2.5 px-4 py-3 bg-white border-2 border-ink rounded-xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <ExternalLink className="w-3.5 h-3.5 text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-[13px] text-ink/75 leading-relaxed">
                多步靠清单、脏活靠分身
                <span className="font-semibold text-ink"> → 去《SubAgent》</span>。
              </span>
            </a>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一段真实翻车现场，再分别看两张清单怎么用、怎么搭着用。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚 · ~12 分钟</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右：视觉锚 钉在墙上的便利贴 ─── */}
        <div className="lg:col-span-5">
          <div className="relative h-[440px] flex items-center justify-center">
            {/* 墙面阴影底 */}
            <div className="absolute inset-x-4 top-6 bottom-6 bg-ink/[0.04] rounded-3xl border border-dashed border-ink/15" />

            {/* 折角便利贴 主图 */}
            <div className="absolute top-[40px] left-1/2 -translate-x-1/2 w-[78%] max-w-[340px]">
              {/* 顶部图钉 */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <div className="w-6 h-6 rounded-full bg-pop border-2 border-ink shadow-stamp flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-ink" />
                </div>
              </div>

              {/* 便利贴本体 */}
              <div className="relative bg-butter border-2 border-ink rounded-2xl shadow-stamp-xl px-6 pt-7 pb-5 rotate-[-2deg]">
                {/* 折角 */}
                <div
                  className="absolute bottom-0 right-0 w-10 h-10 bg-cream border-l-2 border-t-2 border-ink rounded-br-2xl"
                  style={{
                    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                  }}
                />

                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/65 mb-3">
                  /daily-brief · STEP 0
                </div>
                <div className="font-display font-extrabold text-[20px] text-ink leading-tight mb-4">
                  今天要跑的 18 步
                </div>

                <ul className="space-y-2.5">
                  {STICKY_ITEMS.map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <span
                        className={`flex-shrink-0 w-5 h-5 rounded border-2 border-ink flex items-center justify-center ${
                          item.done ? "bg-ink" : "bg-cream"
                        }`}
                      >
                        {item.done ? (
                          <Check className="w-3 h-3 text-cream" strokeWidth={3.5} />
                        ) : null}
                      </span>
                      <span
                        className={`font-sans text-[13.5px] ${
                          item.done ? "text-ink/55 line-through decoration-2" : "text-ink"
                        }`}
                      >
                        {item.text}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 opacity-60">
                    <span className="font-mono text-[12px] text-ink/55">…还有 14 项</span>
                  </li>
                </ul>

                {/* 底部小印章 */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-ink/25 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55">
                    Checklist · 0/18
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-ink/55">
                    in_progress
                  </span>
                </div>
              </div>
            </div>

            {/* 旁边的小贴 · X */}
            <div className="absolute bottom-[40px] right-[6%] rotate-[6deg]">
              <div className="bg-coral text-white border-2 border-ink rounded-xl shadow-stamp-lg px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <X className="w-3.5 h-3.5" strokeWidth={3} />
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold">
                    跳了 Step 5
                  </span>
                </div>
              </div>
            </div>

            {/* 旁边小贴 · ✓ */}
            <div className="absolute top-[80px] left-[4%] rotate-[-8deg]">
              <div className="bg-teal text-white border-2 border-ink rounded-xl shadow-stamp px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase font-bold">
                    18/18 全过
                  </span>
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
