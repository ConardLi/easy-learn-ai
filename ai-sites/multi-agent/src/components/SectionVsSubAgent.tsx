/**
 * SectionVsSubAgent · 跟 SubAgent / 单 Agent 分锅
 *
 * 交互：pill 切换三者对比（单 Agent / SubAgent / Multi Agent），避免搞混
 * 邮戳卡互链 sub-agent / agent / agent-loop
 */
import React, { useState } from "react";
import StampLink from "./StampLink";

const TABS = [
  {
    key: "single",
    name: "单 Agent",
    color: "#88837C",
    one: "一个 AI 自己调工具、分步骤，把整件事从头干到尾。",
    who: "就它一个在干活。",
    when: "任务不大、一个 AI 顾得过来时。",
  },
  {
    key: "sub",
    name: "SubAgent",
    color: "#E07A5F",
    one: "主 Agent 临时派出去一个帮手，干完脏活只带回一句摘要。",
    who: "有主次：主 Agent 是老板，子 Agent 是临时工，干完就散。",
    when: "主 Agent 想把「翻箱倒柜」这种会弄脏对话的活外包出去时。",
  },
  {
    key: "multi",
    name: "Multi Agent",
    color: "#1B4B5A",
    one: "几个各有分工的 AI 长期协作，互相传话，一起完成大任务。",
    who: "多个角色并存：规划、执行、审查、总结，各管一摊。",
    when: "任务大到需要稳定分工、来回协调时。",
  },
];

const SectionVsSubAgent: React.FC = () => {
  const [active, setActive] = useState("multi");
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Don't Mix Up</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          别跟「SubAgent」「单 Agent」搞混
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          这三个名字常被混着说，其实分得很清。点一个对比看看。
        </p>

        {/* pill */}
        <div className="mt-9 flex flex-wrap gap-3">
          {TABS.map((t) => {
            const on = t.key === active;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "shadow-stamp -translate-y-0.5 text-cream" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
                style={on ? { backgroundColor: t.color } : undefined}
              >
                {t.name}
              </button>
            );
          })}
        </div>

        <div className="mt-7 card-stamp p-7">
          <div className="font-display font-extrabold text-[24px] text-ink mb-4">{tab.name}</div>
          <p className="font-sans text-[17px] leading-[1.7] text-ink/85 mb-6">{tab.one}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cream border-2 border-ink rounded-2xl px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                谁在干
              </div>
              <p className="font-sans text-[15px] leading-[1.65] text-ink/80">{tab.who}</p>
            </div>
            <div className="bg-cream border-2 border-ink rounded-2xl px-5 py-4">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
                什么时候用
              </div>
              <p className="font-sans text-[15px] leading-[1.65] text-ink/80">{tab.when}</p>
            </div>
          </div>
        </div>

        {/* 一句话分锅 */}
        <div className="mt-6 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[760px]">
          <p className="font-sans text-[15.5px] leading-[1.75]">
            一句话记法：<span className="font-bold text-butter">单 Agent</span> 是一个人干；
            <span className="font-bold text-coral"> SubAgent</span> 是一个人忙不过来、临时叫个帮手干完就走；
            <span className="font-bold text-butter"> Multi Agent</span> 是一个长期分工的团队。
          </p>
        </div>

        {/* 互链 */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[820px]">
          <StampLink
            href="../sub-agent/index.html"
            title="想细看「临时帮手」？"
            desc="去《轻松理解 SubAgent》，专讲主 Agent 怎么外包脏活、只收摘要。"
            compact
          />
          <StampLink
            href="../agent/index.html"
            title="先补「单个 Agent」？"
            desc="去《轻松理解 Agent》，看一个 AI 怎么自己调工具干活。"
            compact
          />
          <StampLink
            href="../agent-loop/index.html"
            title="一个 Agent 内部怎么转？"
            desc="去《轻松理解 Agent Loop》，看思考-行动-观察的循环。"
            compact
          />
        </div>
      </div>
    </section>
  );
};

export default SectionVsSubAgent;
