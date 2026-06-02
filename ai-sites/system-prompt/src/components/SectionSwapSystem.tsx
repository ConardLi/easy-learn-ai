/**
 * SectionSwapSystem · 同一个问题，换个 system，回答就变样
 *
 * 交互（L2 · chip 切换，用 key 强制重渲染）：
 *   user 问题固定不变（推荐一部电影），切换四张不同的 system 卡，
 *   下面的「模型回答」实时换成对应风格 —— 全部标注「示意」。
 *   交互形态跟 §02 的输入框、§03 的勾选都不同（这里是选一张卡看效果）。
 */
import React, { useState } from "react";

const USER_Q = "推荐一部电影";

const SYSTEMS = [
  {
    id: "critic",
    tab: "毒舌影评人",
    sys: "你是个挑剔的影评人，回答最多两句，犀利、不寒暄。",
    reply: "《一一》。慢，但每一帧都比大多数院线片诚实。受不了节奏慢就别看。",
  },
  {
    id: "clerk",
    tab: "热情店员",
    sys: "你是音像店店员，超级热情，会主动问对方喜好，多给点理由。",
    reply:
      "哇这个我超会推！先问一句你想哭还是想笑？想轻松点的话《天使爱美丽》绝了，色彩好看、看完一整天心情都亮，你肯定喜欢～",
  },
  {
    id: "json",
    tab: "只给数据 JSON",
    sys: "你只输出 JSON（一种给程序读的格式，用字段名配值），字段：title、year、reason，不写多余文字。",
    reply: '{ "title": "盗梦空间", "year": 2010, "reason": "结构精巧，适合喜欢烧脑的人" }',
  },
  {
    id: "kid",
    tab: "儿童频道",
    sys: "面向 6 岁小朋友，用词简单、温和，只推适合小孩看的。",
    reply: "推荐《龙猫》呀！里面有一只胖胖的大龙猫，很温柔，还会带小朋友坐会飞的猫巴士，看了会很开心。",
  },
];

const SectionSwapSystem: React.FC = () => {
  const [active, setActive] = useState(SYSTEMS[0]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">换张 system 卡试试</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[780px] leading-[1.1]">
          问的话一字没变，换段 system，回答就变了个人
        </h2>
        <p className="mt-5 font-sans text-[16px] leading-[1.75] text-ink/80 max-w-[660px]">
          下面这句 user 问题锁死不动，你来切上面那段预设。看回答的口气、长短、格式怎么跟着翻盘。
        </p>

        {/* chip 切换 */}
        <div className="mt-9 flex flex-wrap gap-2.5">
          {SYSTEMS.map((s) => {
            const on = s.id === active.id;
            return (
              <button
                key={s.id}
                onClick={() => setActive(s)}
                className={`px-4 py-2 rounded-full border-2 border-ink font-sans font-bold text-[13.5px] transition-all duration-250 ease-spring ${
                  on
                    ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                    : "bg-white text-ink shadow-stamp hover:-translate-y-0.5"
                }`}
              >
                {s.tab}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* system 卡（随 chip 变） */}
          <div className="lg:col-span-5">
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mb-2">
              SYSTEM · 这次的预设
            </div>
            <div
              key={active.id}
              className="bg-coral border-2 border-ink rounded-2xl px-4 py-4 shadow-stamp animate-enter-pop"
            >
              <span className="font-sans text-[14px] leading-relaxed text-cream">{active.sys}</span>
            </div>

            {/* 固定的 user 问题 */}
            <div className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55 mt-5 mb-2">
              USER · 锁死不动
            </div>
            <div className="bg-white border-2 border-ink rounded-2xl px-4 py-3 shadow-stamp flex items-center gap-2">
              <span className="font-sans text-[14px] text-ink">{USER_Q}</span>
            </div>
          </div>

          {/* 模型回答（随 chip 变 + 示意 badge） */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink/55">
                模型回答
              </span>
              <span className="px-2 py-0.5 rounded-full bg-butter border-2 border-ink font-mono text-[9px] font-bold tracking-[0.1em] text-ink uppercase">
                示意
              </span>
            </div>
            <div
              key={active.id}
              className="border-[3px] border-ink rounded-2xl bg-butter-tint shadow-stamp-lg p-5 min-h-[150px] animate-enter-pop"
            >
              <p className="font-sans text-[15px] leading-[1.75] text-ink whitespace-pre-wrap break-words">
                {active.reply}
              </p>
            </div>
            <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-ink/55">
              示意输出，帮你感受风格差别，不是真实模型回答。同一句问题，预设变了，模型的「人设」就跟着变。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSwapSystem;
