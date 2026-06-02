/**
 * SectionHero · SubAgent 是什么？
 *
 * Hero 开场纪律：
 *   1. eyebrow tag
 *   2. H1「SubAgent 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：先说「上下文腐化」痛点 → 再说 SubAgent 干啥
 *   5. 视觉锚：主 Agent（中央大方块）→ 派出 SubAgent（右侧小方块）→ 摘要回流箭头
 *      跟相邻 agent（循环+工具触手）/ agent-loop（旋转环）/ memory（索引卡）都不同
 *   6. 过渡句 + 滚动提示
 */
import React from "react";
import { ArrowDown, Send, ExternalLink } from "lucide-react";

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：左下散落小圆点 */}
      <div className="absolute bottom-10 left-[6%] hidden md:grid grid-cols-5 gap-2 pointer-events-none opacity-60">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              SubAgent · 主 Agent 派的临时工
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            SubAgent
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[680px] text-ink">
            SubAgent 是
            <a
              href="../agent/index.html"
              className="font-semibold underline decoration-coral/40 underline-offset-2 hover:decoration-coral"
            >
              主 Agent
            </a>
            派出去的{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">临时跑腿子 Agent</span>
            </span>
            ，在独立空间里干完活，只把精炼摘要带回来。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你随口问 AI「这项目用的啥测试框架？」
              它开始翻 pyproject、看 requirements、搜目录、跑命令 ——
              <span className="font-bold text-ink">真正有用的回答就一句「pytest」。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              但中间那一堆翻箱倒柜全留在对话里了。下一题、再下一题
              ⋯⋯ 主对话越塞越满，AI 开始走神、答非所问。
              <span className="font-bold text-ink">这事有个名字：上下文腐化。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              SubAgent 干的活就一件：把这种翻箱倒柜扔到隔壁的独立空间，
              最后只把一句「pytest」交回来。主对话干干净净。
            </p>
          </div>

          {/* 跨站导读：跟 Agent Todo 是两件事 */}
          <div className="mt-8 max-w-[600px] bg-cream/70 border-2 border-dashed border-ink/30 rounded-2xl px-4 py-3">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-1.5">
              别跟 Agent Todo 搞混
            </div>
            <p className="font-sans text-[13.5px] leading-[1.65] text-ink/75">
              这两件事不一样：AI{" "}
              <span className="font-bold text-ink">跳步骤、忘前面要干啥</span>{" "}
              是清单管的事；聊久了对话{" "}
              <span className="font-bold text-ink">被工具输出塞满、开始走神</span>{" "}
              → 接着往下看 SubAgent。
            </p>

            {/* 跨站入口·紧凑邮戳卡 → Agent TodoList */}
            <a
              href="../agent-todo/index.html"
              className="mt-3 flex items-start gap-2.5 px-4 py-3 bg-white border-2 border-ink rounded-xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <ExternalLink className="w-3.5 h-3.5 text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-[13px] text-ink/75 leading-relaxed">
                SubAgent 管外包脏活、TodoList 管多步清单
                <span className="font-semibold text-ink"> → 去《Agent TodoList》</span>。
              </span>
            </a>
          </div>

          {/* 过渡句 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一段聊久了变脏的现场，再聊该怎么外包、跟 Agent Teams 又有啥不同。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚 · ~12 分钟</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 主 Agent + SubAgent 外包流程 ─── */}
        <div className="lg:col-span-5">
          <div className="relative h-[460px] flex items-center justify-center">
            {/* 顶部场景标 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-ink text-cream font-mono text-[10px] tracking-[0.22em] uppercase rounded-full">
              MAIN CONVERSATION
            </div>

            {/* 主 Agent 大方块（左上） */}
            <div className="absolute top-[40px] left-[6%] w-[180px] bg-coral border-2 border-ink rounded-3xl shadow-stamp-lg px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-cream/85 mb-1.5">
                MAIN AGENT
              </div>
              <div className="font-display font-extrabold text-[20px] text-cream leading-tight">
                主 Agent
              </div>
              <div className="font-mono text-[11px] text-cream/90 mt-2 leading-relaxed">
                持有完整对话<br />做关键决策
              </div>
            </div>

            {/* 派出动作：箭头 + 标签 */}
            <div className="absolute top-[140px] left-[40%] flex items-center gap-1.5">
              <Send className="w-4 h-4 text-ink" strokeWidth={2.4} />
              <span className="font-mono text-[10.5px] font-bold tracking-[0.18em] uppercase text-ink/75">
                外包
              </span>
            </div>

            {/* SubAgent 小方块（右） */}
            <div className="absolute top-[110px] right-[8%] w-[150px] bg-butter border-2 border-ink rounded-2xl shadow-stamp px-4 py-3">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/70 mb-1">
                SUB AGENT
              </div>
              <div className="font-display font-extrabold text-[17px] text-ink leading-tight">
                子 Agent
              </div>
              <div className="font-mono text-[10.5px] text-ink/75 mt-1.5 leading-snug">
                独立上下文<br />受限工具
              </div>
            </div>

            {/* 独立空间标签 */}
            <div className="absolute top-[88px] right-[6%] w-[160px] h-[160px] border-2 border-dashed border-ink/35 rounded-3xl pointer-events-none" />
            <div className="absolute top-[78px] right-[18%] px-2 py-0.5 bg-cream border border-ink/50 font-mono text-[9px] tracking-[0.18em] uppercase text-ink/60 rounded">
              独立空间
            </div>

            {/* 子 Agent 内部噪音（堆叠的小条） */}
            <div className="absolute top-[200px] right-[10%] w-[150px] space-y-1 opacity-60">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 bg-ink/30 rounded-full"
                  style={{ width: `${85 - i * 10}%` }}
                />
              ))}
              <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-ink/50 mt-1">
                中间过程 · 全留在这
              </div>
            </div>

            {/* 摘要回流箭头（从子 Agent 回主 Agent） */}
            <svg
              className="absolute top-[250px] left-[18%] w-[60%] h-[60px] pointer-events-none"
              viewBox="0 0 220 60"
              fill="none"
            >
              <path
                d="M 200 14 Q 100 60 18 24"
                stroke="#241C15"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 30 16 L 12 24 L 24 36"
                stroke="#241C15"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>

            {/* 摘要小卡片（最下方） */}
            <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[78%]">
              <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp px-5 py-3.5">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55 mb-1">
                  RETURN · 摘要
                </div>
                <div className="font-display font-bold text-[15px] text-ink">
                  「pytest。」
                </div>
                <div className="font-mono text-[10.5px] text-ink/55 mt-0.5">
                  ↑ 主 Agent 只看到这一句
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
