/**
 * SectionWhenToUse · 什么时候该上 Multi Agent、什么时候别
 *
 * 交互：两栏对照（该用 / 别硬上）+ accordion 展开代价
 * 收尾节，回扣全站
 */
import React, { useState } from "react";
import { Check, X, ChevronDown } from "lucide-react";

const USE = [
  "任务能清楚拆成几摊，每摊需要不同的专长",
  "环节多、单个 AI 做着做着就跑偏",
  "需要有人专门审查、把关，而不是自己改自己",
];

const DONT = [
  "任务两三步就能搞定，拆开纯属添乱",
  "对响应速度敏感 —— 多个 AI 来回传话会更慢",
  "预算紧 —— 每个 Agent 都在花钱，团队越大账单越高",
];

const COSTS = [
  {
    q: "更慢",
    a: "活在几个 Agent 之间来回传，每一次交接都要等一轮模型响应。单个 AI 一口气做完往往更快。",
  },
  {
    q: "更贵",
    a: "每个 Agent 干活都要请模型回一次话，每一次都要花钱。团队从 1 个变 4 个，账单大致也跟着翻几倍。",
  },
  {
    q: "更难查问题",
    a: "出了错，得顺着「哪个 Agent、哪一步、传话有没有丢」一层层倒查，比单个 AI 难定位。",
  },
];

const SectionWhenToUse: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">When To Use</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          什么时候该上 Multi Agent？什么时候别？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          分工厉害，不代表什么活都该拆。多一个 Agent 就多一份开销，先看值不值。
        </p>

        {/* 两栏对照 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal/8 border-2 border-teal rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal border-2 border-ink">
                <Check className="w-4 h-4 text-cream" strokeWidth={3} />
              </span>
              <span className="font-display font-extrabold text-[20px] text-ink">值得拆</span>
            </div>
            <ul className="space-y-3.5">
              {USE.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-teal mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-sans text-[15px] leading-[1.65] text-ink/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pop/8 border-2 border-pop rounded-3xl p-7">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pop border-2 border-ink">
                <X className="w-4 h-4 text-cream" strokeWidth={3} />
              </span>
              <span className="font-display font-extrabold text-[20px] text-ink">别硬上</span>
            </div>
            <ul className="space-y-3.5">
              {DONT.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <X className="w-5 h-5 text-pop mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-sans text-[15px] leading-[1.65] text-ink/80">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 代价 accordion */}
        <div className="mt-10">
          <div className="font-display font-bold text-[20px] text-ink mb-4">拆开的三个代价</div>
          <div className="space-y-3">
            {COSTS.map((c, i) => {
              const on = open === i;
              return (
                <div
                  key={i}
                  className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(on ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-display font-bold text-[17px] text-ink">{c.q}</span>
                    <ChevronDown
                      className={[
                        "w-5 h-5 text-ink transition-transform duration-300",
                        on ? "rotate-180" : "",
                      ].join(" ")}
                      strokeWidth={2.5}
                    />
                  </button>
                  {on && (
                    <div className="px-5 pb-4 -mt-1">
                      <p className="font-sans text-[15px] leading-[1.7] text-ink/75">{c.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 收尾金句（陈述句，不用「不是…而是」） */}
        <div className="mt-12 bg-ink text-cream rounded-3xl px-7 py-8 lg:px-10 lg:py-9">
          <p className="font-display font-bold text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.5]">
            一个 AI 顾得过来的活，就让它一个人干完；
            <br className="hidden sm:block" />
            大到一个人手忙脚乱，再请几个分工搭档，分摊压力、互相把关。
          </p>
          <p className="mt-5 font-sans text-[15px] text-cream/70">
            这就是 Multi Agent ——{" "}
            <a href="#top" className="underline decoration-butter/60 hover:decoration-butter">
              回到开头再看一遍定义
            </a>
            。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionWhenToUse;
