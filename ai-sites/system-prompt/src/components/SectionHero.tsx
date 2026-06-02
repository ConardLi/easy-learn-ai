/**
 * SectionHero · System Prompt 是什么？
 *
 * 开场纪律：
 *   1. eyebrow：System Prompt · 系统提示词
 *   2. H1「System Prompt 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮，完整陈述句）
 *   4. 白话铺垫：你打的字 = user 消息；system prompt 由 app 预先塞在最前面，你看不到
 *   5. 视觉锚：右侧一个对话面板 —— 顶上钉着一张 coral「规则卡」(SYSTEM)，
 *      下面才是用户气泡 + 回复。体现「system 先于 user、钉在最前面定规矩」。
 *      跟 context-window 的横向长条 / agent 的循环轨道都不撞。
 *   6. 过渡句 + 滚动提示（不带数字）
 */
import React from "react";
import { ArrowDown, Pin } from "lucide-react";

const RULE_LINES = [
  "你是一个简洁的邮件助手",
  "语气：礼貌、正式",
  "不回答跟邮件无关的问题",
  "输出：直接给邮件正文，别解释",
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：左上一枚图钉小符号 */}
      <div className="absolute top-16 left-[6%] hidden md:block pointer-events-none opacity-30">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="14" r="9" fill="none" stroke="#241C15" strokeWidth="2" />
          <line x1="20" y1="23" x2="20" y2="38" stroke="#241C15" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              System Prompt · 系统提示词
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            System Prompt
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[680px] text-ink">
            System Prompt ＝ 开发者预先写好、塞在对话{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">最前面</span>
            </span>
            、用来给模型定规矩的一段话。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[610px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              你在 ChatGPT 输入框里打的每一句话，叫
              <span className="font-bold text-ink"> user 消息</span>
              （就是「你这次说的话」）。ChatGPT 背后那个 AI 模型收到的其实不只这一句 —— 在它前面，应用早就先塞了一段你看不到的话，这段就是 system prompt。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              这段话由
              <span className="font-bold text-ink">做这个 app 的人预先写好</span>
              ，你没参与：告诉模型扮什么角色、用什么语气、什么不能答、答案排成什么样。它每轮对话都默默生效，界面上不显示。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              所以同样问一句「帮我写封邮件」，
              <span className="font-bold text-ink">背后那段 system prompt 不同，给你的回答就长得很不一样</span>
              。
            </p>
          </div>

          {/* 过渡句 + 滚动提示 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看你打的字和这段预设到底差在哪，再动手拼一段试试。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>继续往下看</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 对话面板 + 钉在顶上的规则卡 ─── */}
        <div className="lg:col-span-5">
          <div className="relative group">
            {/* 顶部 caption */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                一轮对话 · 模型实际收到的
              </span>
            </div>

            {/* 对话面板 */}
            <div className="relative border-[3px] border-ink rounded-2xl bg-cream shadow-stamp-lg p-3.5 space-y-3">
              {/* 钉在最顶上的规则卡（system，coral，你看不到） */}
              <div className="relative bg-coral border-2 border-ink rounded-xl px-3.5 pt-3 pb-3 shadow-stamp transition-transform duration-400 ease-spring group-hover:-translate-y-0.5">
                {/* 图钉 */}
                <span className="absolute -top-3 left-4 w-7 h-7 rounded-full bg-cream border-2 border-ink flex items-center justify-center shadow-stamp">
                  <Pin className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <div className="flex items-center justify-between mb-2 pl-8">
                  <span className="font-mono text-[10px] font-extrabold tracking-[0.15em] text-cream">
                    SYSTEM
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.12em] text-cream/85 uppercase">
                    app 预设 · 你看不到
                  </span>
                </div>
                <div className="space-y-1.5">
                  {RULE_LINES.map((line) => (
                    <div key={line} className="flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-cream flex-shrink-0" />
                      <span className="font-sans text-[12px] leading-snug text-cream">{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 分隔提示 */}
              <div className="flex items-center gap-2 px-1">
                <span className="flex-1 h-px bg-ink/15" />
                <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-ink/45">
                  下面才是聊天界面里看得到的
                </span>
                <span className="flex-1 h-px bg-ink/15" />
              </div>

              {/* 用户气泡（user，你打的） */}
              <div className="flex justify-end">
                <div className="max-w-[78%] bg-white border-2 border-ink rounded-xl rounded-tr-sm px-3 py-2 shadow-stamp">
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink/45 block mb-0.5">
                    USER · 你打的
                  </span>
                  <span className="font-sans text-[12.5px] text-ink leading-snug">
                    帮我写封请假邮件
                  </span>
                </div>
              </div>

              {/* 模型回复气泡 */}
              <div className="flex justify-start">
                <div className="max-w-[82%] bg-butter-tint border-2 border-ink rounded-xl rounded-tl-sm px-3 py-2 shadow-stamp">
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase text-ink/45 block mb-0.5">
                    模型回复
                  </span>
                  <span className="font-sans text-[12.5px] text-ink leading-snug">
                    主题：请假申请
                    <br />
                    尊敬的领导，您好……
                  </span>
                  <span className="block mt-1 font-mono text-[9px] text-ink/45">
                    （礼貌、正式、只给正文 —— 听了上面那段的话）
                  </span>
                </div>
              </div>
            </div>

            {/* 提示箭头：指向规则卡 */}
            <div className="hidden lg:block absolute -left-6 top-[18%]">
              <svg width="60" height="64" viewBox="0 0 60 64" fill="none">
                <path
                  d="M 6 56 Q 2 20 44 12"
                  stroke="#241C15"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M 38 6 L 46 11 L 38 17" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text x="0" y="64" fontFamily="Geist Mono, monospace" fontSize="9" fill="#241C15" opacity="0.7">
                  它在最前面
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
