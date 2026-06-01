/**
 * SectionHero · Agent 记忆系统是什么？
 *
 * Hero 开场纪律：
 *   1. eyebrow tag
 *   2. H1「Agent 记忆系统是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：关掉终端就忘 → 这就是它要解决的事
 *   5. 视觉锚：一叠带标签的索引卡（情景/语义/程序），跟相邻 agent-loop 旋转环拉开
 *   6. 过渡句 + 滚动提示
 */
import React from "react";
import { ArrowDown, FolderOpen, ExternalLink } from "lucide-react";

const CARDS = [
  { key: "episodic", label: "情景", caption: "上次那个 bug 是连接池", tone: "bg-butter" },
  { key: "semantic", label: "语义", caption: "项目用 PostgreSQL", tone: "bg-coral text-white" },
  { key: "procedural", label: "程序", caption: "处理密码重置的那套动作", tone: "bg-teal text-white" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落几个小圆点 */}
      <div className="absolute top-16 right-[8%] hidden md:grid grid-cols-4 gap-2.5 pointer-events-none opacity-60">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/30" />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Agent Memory · 智能体记忆系统
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Agent 记忆系统
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[640px] text-ink">
            一句话：把重要的事{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">存到聊天窗口外面</span>
            </span>
            ，下次对话再捞回来用。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你跟 AI 编程助手聊了半小时，告诉它项目用 TypeScript、测试是 Vitest、
              部署走 Cloudflare Workers。它干活干得不错。
              <span className="font-bold text-ink">然后你关了终端。</span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              下次打开 —— 它忘了一切。你得重新介绍一遍。
              这是因为：
              <span className="font-bold text-ink">聊天窗口（context window）就是 AI 这次能看到的全部文字</span>
              ，关了这个窗口，前面说过的东西就都没了。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              记忆系统就是来解决这件事的：把值得长期保存的事，挪到聊天窗口外面存起来；
              下次需要时再取回来塞进对话里。
            </p>
          </div>

          {/* 互链提示：先看 Context Window 站 */}
          <a
            href="../context-window/index.html"
            className="mt-7 inline-flex items-start gap-3 max-w-[580px] px-4 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-butter border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">先看《Context Window》会更顺</span>
              <span className="text-ink/55"> · 那站把「AI 一次能看多少字、为什么会撑爆」讲透了，看完再回来读这站，整张图会更连贯。</span>
            </span>
          </a>

          {/* 过渡句 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看一个具体的失忆现场，再聊该记什么、存哪儿、怎么转起来。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚 · ~12 分钟</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 一叠索引卡 + 抽屉 ─── */}
        <div className="lg:col-span-5">
          <div className="relative h-[440px] flex items-center justify-center">
            {/* 底层「context window」标签 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 px-3 py-1 bg-ink text-cream font-mono text-[10px] tracking-[0.22em] uppercase rounded-full">
              CONTEXT WINDOW
            </div>
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[88%] h-[120px] border-2 border-dashed border-ink/40 rounded-2xl flex items-center justify-center">
              <span className="font-mono text-[11px] text-ink/45 tracking-[0.16em] uppercase">
                临时 · 会话清空就没
              </span>
            </div>

            {/* 一叠 3 张索引卡（错落） */}
            <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-[78%]">
              {CARDS.map((card, i) => (
                <div
                  key={card.key}
                  className={`relative ${card.tone} border-2 border-ink rounded-2xl shadow-stamp px-5 py-4 mb-[-14px] transition-transform duration-400 ease-spring hover:translate-y-[-6px]`}
                  style={{ transform: `translateX(${(i - 1) * 18}px) rotate(${(i - 1) * 1.6}deg)`, zIndex: 10 - i }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-[20px] tracking-tight">
                      {card.label}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-70">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="font-mono text-[12px] mt-1 opacity-85">
                    {card.caption}
                  </div>
                </div>
              ))}
            </div>

            {/* 底部抽屉 */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%]">
              <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg px-5 py-3.5 flex items-center gap-3">
                <FolderOpen className="w-5 h-5 text-ink" strokeWidth={2.2} />
                <div className="flex-1">
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink/55">
                    LONG-TERM STORE
                  </div>
                  <div className="font-display font-bold text-[14px] text-ink">
                    长期记忆 · 跨对话取回
                  </div>
                </div>
                <span className="font-mono text-[11px] text-ink/55">∞</span>
              </div>
            </div>

            {/* 上下连接虚线 + 箭头 */}
            <svg
              className="absolute left-1/2 -translate-x-1/2 top-[140px] w-6 h-7 pointer-events-none"
              viewBox="0 0 20 28"
              fill="none"
            >
              <line
                x1="10"
                y1="0"
                x2="10"
                y2="22"
                stroke="#241C15"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <path d="M 4 20 L 10 28 L 16 20" stroke="#241C15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
