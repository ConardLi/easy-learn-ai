/**
 * SectionFourMoves · 管理上下文的四类策略
 *
 * 交互：chip 阵列，点每类看它解决什么问题 + 一句大白话 + 小图示
 * 四分类来自 LangChain（Lance Martin）对 context engineering 的归纳：Write / Select / Compress / Isolate
 */
import React, { useState } from "react";
import { PenLine, Filter, Minimize2, Split } from "lucide-react";

const MOVES = [
  {
    key: "write",
    cn: "写出去",
    en: "Write",
    icon: PenLine,
    color: "#1B4B5A",
    plain: "把暂时用不上的内容先记到窗口外面，需要时再捞回来。",
    solves: "窗口装不下那么多，但又怕丢 —— 那就先存到外面。",
    eg: "AI 把中间算出的结论写进一个「便签」文件，后面要用再读。",
  },
  {
    key: "select",
    cn: "挑着放",
    en: "Select",
    icon: Filter,
    color: "#E07A5F",
    plain: "不把所有资料都塞进去，用到哪条才挑哪条放进窗口。",
    solves: "资料一大堆，全塞会稀释重点 —— 那就只放当前相关的。",
    eg: "用户问报销政策，就只捞「报销」那一页，不把整本手册搬进来。",
  },
  {
    key: "compress",
    cn: "压一压",
    en: "Compress",
    icon: Minimize2,
    color: "#F4D35E",
    plain: "把又长又啰嗦的内容缩成短摘要，省出窗口空间。",
    solves: "聊天记录越积越长，快占满窗口 —— 那就把旧的总结成几句。",
    eg: "前面 50 轮对话压成一段「目前进展摘要」，细节丢掉。",
  },
  {
    key: "isolate",
    cn: "分开放",
    en: "Isolate",
    icon: Split,
    color: "#FF4D74",
    plain: "把任务拆开，让不同的 AI 各自只看自己那一摊，互不干扰。",
    solves: "一个窗口塞不下所有事 —— 那就分给几个 AI，各管各的。",
    eg: "查资料的 AI 只看资料，写代码的 AI 只看代码，各有各的窗口。",
  },
];

const SectionFourMoves: React.FC = () => {
  const [active, setActive] = useState("write");
  const move = MOVES.find((m) => m.key === active)!;
  const Icon = move.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Four Moves</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          安排上下文，无非这四类动作
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          所有具体招式，往上一归类都逃不出这四种（这是业界常用的一套划分）。
          先把这四个动作记住，下一节再看它们落到实际怎么做。点一个看看。
        </p>

        {/* chip 阵列 */}
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOVES.map((m) => {
            const MIcon = m.icon;
            const on = m.key === active;
            return (
              <button
                key={m.key}
                onClick={() => setActive(m.key)}
                className={[
                  "flex flex-col items-center gap-2 px-4 py-5 rounded-2xl border-2 border-ink transition-all duration-250 ease-spring",
                  on ? "shadow-stamp -translate-y-1" : "bg-cream hover:-translate-y-0.5",
                ].join(" ")}
                style={on ? { backgroundColor: m.color } : undefined}
              >
                <MIcon
                  className={on && m.color !== "#F4D35E" ? "w-7 h-7 text-cream" : "w-7 h-7 text-ink"}
                  strokeWidth={2.2}
                />
                <span
                  className={[
                    "font-display font-extrabold text-[16px]",
                    on && m.color !== "#F4D35E" ? "text-cream" : "text-ink",
                  ].join(" ")}
                >
                  {m.cn}
                </span>
                <span
                  className={[
                    "font-mono text-[10px] tracking-[0.15em] uppercase",
                    on && m.color !== "#F4D35E" ? "text-cream/75" : "text-ink/45",
                  ].join(" ")}
                >
                  {m.en}
                </span>
              </button>
            );
          })}
        </div>

        {/* 详情 */}
        <div className="mt-8 card-stamp p-7">
          <div className="flex items-center gap-4 mb-5">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-ink shadow-stamp"
              style={{ backgroundColor: move.color }}
            >
              <Icon
                className={move.color === "#F4D35E" ? "w-7 h-7 text-ink" : "w-7 h-7 text-cream"}
                strokeWidth={2.2}
              />
            </span>
            <div>
              <div className="font-display font-extrabold text-[26px] text-ink leading-none">
                {move.cn}
              </div>
              <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-ink/50 mt-1.5">
                {move.en}
              </div>
            </div>
          </div>
          <p className="font-sans text-[17px] leading-[1.7] text-ink/85 mb-5">{move.plain}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cream border-2 border-ink rounded-2xl px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                解决什么问题
              </div>
              <p className="font-sans text-[14.5px] leading-[1.65] text-ink/80">{move.solves}</p>
            </div>
            <div className="bg-cream border-2 border-ink rounded-2xl px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                举个例子
              </div>
              <p className="font-sans text-[14.5px] leading-[1.65] text-ink/80">{move.eg}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFourMoves;
