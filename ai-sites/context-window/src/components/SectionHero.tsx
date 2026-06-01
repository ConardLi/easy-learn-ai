/**
 * SectionHero · Context Window 是什么？
 *
 * 开场纪律：
 *   1. eyebrow tag
 *   2. H1「Context Window 是什么？」直白发问
 *   3. 一句话定义（display 字 + butter 高亮）
 *   4. 白话铺垫：LLM 没硬盘 / 每次请求拼一段文本就是全部记忆 / 关掉就归零
 *   5. 视觉锚：右侧是一只横向的「玻璃窗口」长条，里面按 [system / tools / history / now / 空] 切五段
 *      —— 跟 agent-memory 站的「3 张叠卡 + 抽屉」完全不撞
 *   6. 过渡句 + 滚动提示
 */
import React from "react";
import { ArrowDown } from "lucide-react";

const SEGMENTS = [
  { key: "system", label: "SYSTEM", caption: "人设 / 规则", w: 8, fill: "#1B4B5A", text: "#FBEFE3" },
  { key: "tools", label: "TOOLS", caption: "工具定义", w: 12, fill: "#E07A5F", text: "#FBEFE3" },
  { key: "history", label: "HISTORY", caption: "前面来回", w: 35, fill: "#F4D35E", text: "#241C15" },
  { key: "now", label: "NOW", caption: "当前提问", w: 5, fill: "#FF4D74", text: "#FBEFE3" },
];

const SectionHero: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰：右上散落 token 小圆 */}
      <div className="absolute top-16 right-[8%] hidden md:flex flex-col gap-2 pointer-events-none opacity-65">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="block h-1.5 rounded-full bg-ink/30"
            style={{ width: `${24 + i * 10}px` }}
          />
        ))}
      </div>

      <div className="relative max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* ─── 左侧：文字主体 ─── */}
        <div className="lg:col-span-7">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cream border-2 border-ink rounded-full shadow-stamp">
            <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
            <span className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase text-ink">
              Context Window · 上下文窗口
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-display-2xl text-ink mt-7 leading-[1.02]">
            Context Window
            <br />
            <span className="inline-flex items-baseline gap-2">
              是什么<span className="text-coral">？</span>
            </span>
          </h1>

          {/* 一句话定义 */}
          <p className="font-display font-bold text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.4] mt-9 max-w-[660px] text-ink">
            一句话：模型每次推理能{" "}
            <span className="relative inline-block">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
              <span className="relative z-10">「看见」的全部文本</span>
            </span>
            ，就是这一段。
          </p>

          {/* 白话铺垫 */}
          <div className="mt-9 space-y-4 max-w-[600px]">
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              LLM 没有硬盘。每次你发请求过去，服务端把
              <span className="font-bold text-ink">system prompt + 工具定义 + 历史消息 + 你这次的问题</span>
              拼成一大段文本，整段塞给模型。这一段就是它这一秒的全部「工作内存」。
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              它有大小上限（GPT-4o 是 128K tokens，2026 年主流 Claude / GPT / Gemini 普遍到 1M），
              <span className="font-bold text-ink">塞满了就装不下新东西</span>，要么截断，要么压缩。
              <span className="block mt-1.5 text-ink/65 text-[14.5px]">
                token 可以粗算成：英文约 4 个字母 1 个，中文约 1 个字 1 个；128K ≈ 一本中等篇幅的书。
              </span>
            </p>
            <p className="font-sans text-[16px] leading-[1.75] text-ink/80">
              它每次都是临时拼出来的：
              <span className="font-bold text-ink">新开一个聊天会话，history 从零开始</span>；
              同一个会话里，前面的消息会一直带着，直到撑满或被截断。
            </p>
          </div>

          {/* 过渡句 */}
          <div className="mt-12 pt-6 border-t-2 border-dashed border-ink/25 flex flex-wrap items-center justify-between gap-4">
            <p className="font-serif italic text-[15px] text-ink/70 max-w-[520px]">
              先看 context 里到底拼了哪几块，再看各家有多大、撑爆会咋样。
            </p>
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              <span>往下滚 · ~12 分钟</span>
              <ArrowDown className="w-3.5 h-3.5 animate-float-y-sm" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* ─── 右侧：视觉锚 横向玻璃窗口 ─── */}
        <div className="lg:col-span-5">
          <div className="relative">
            {/* 顶部 caption */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink/55">
                CONTEXT WINDOW · 模型这一秒看到的
              </span>
              <span className="font-mono text-[10.5px] text-ink/45">128K tokens</span>
            </div>

            {/* 玻璃窗框 */}
            <div className="relative border-[3px] border-ink rounded-2xl bg-cream shadow-stamp-lg p-3.5">
              {/* 长条主体 */}
              <div className="relative h-[68px] rounded-xl overflow-hidden border-2 border-ink flex">
                {SEGMENTS.map((seg) => (
                  <div
                    key={seg.key}
                    className="relative flex flex-col justify-center items-start px-2.5 border-r-2 border-ink last:border-r-0 transition-transform duration-400 ease-spring hover:translate-y-[-2px]"
                    style={{ width: `${seg.w}%`, backgroundColor: seg.fill, color: seg.text }}
                  >
                    <span
                      className="font-mono font-extrabold text-[9px] tracking-[0.15em]"
                      style={{ opacity: 0.95 }}
                    >
                      {seg.label}
                    </span>
                    {seg.w >= 10 && (
                      <span className="font-sans text-[10.5px] mt-0.5 leading-tight">
                        {seg.caption}
                      </span>
                    )}
                  </div>
                ))}
                {/* 空闲 */}
                <div className="flex-1 bg-cream relative">
                  <div
                    className="absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 6px, #241C15 6px, #241C15 7px)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-[10.5px] text-ink/70 tracking-[0.15em] uppercase">
                      FREE · 40%
                    </span>
                  </div>
                </div>
              </div>

              {/* 标尺 */}
              <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-ink/45 px-1">
                <span>0</span>
                <span>32K</span>
                <span>64K</span>
                <span>96K</span>
                <span>128K</span>
              </div>
            </div>

            {/* 下方 caption */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="bg-white border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/55 mb-0.5">
                  本质
                </div>
                <div className="font-display font-bold text-[13.5px] text-ink leading-tight">
                  一段拼接好的文本
                </div>
              </div>
              <div className="bg-ink text-cream border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp">
                <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-butter mb-0.5">
                  寿命
                </div>
                <div className="font-display font-bold text-[13.5px] leading-tight">
                  请求一结束就没
                </div>
              </div>
            </div>

            {/* 提示箭头：指向第一段 */}
            <div className="hidden lg:block absolute -bottom-8 left-[6%]">
              <svg width="120" height="50" viewBox="0 0 120 50" fill="none">
                <path
                  d="M 8 8 Q 28 38 90 38"
                  stroke="#241C15"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path d="M 84 32 L 92 38 L 84 44" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                <text
                  x="100"
                  y="20"
                  fontFamily="Geist Mono, monospace"
                  fontSize="9.5"
                  fill="#241C15"
                  opacity="0.7"
                >
                  hover 看每段
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
