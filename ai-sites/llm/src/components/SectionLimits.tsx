/**
 * Section 07 · Limits · 不要期待清单 + 站尾互链
 *
 * 反模板：全站唯一以「收束」为主的节，无大控件。
 *   §06 = callout + 一张图（多个交互）
 *   §07 = L0 静态 checklist + 3 张外链卡
 *
 * 互链卡：token / nlp / context-window
 */
import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

interface Dont {
  title: string;
  body: React.ReactNode;
}

const DONTS: Dont[] = [
  {
    title: "别期待它真的「懂」",
    body: (
      <>
        它一直在玩
        <strong>"接下来最像的字是哪个"</strong>。听起来像懂 = 它做对的副产物，不等于它真有理解力。涉及关键判断的事仍要自己拍板。
      </>
    ),
  },
  {
    title: "别期待算账类一定算对",
    body: (
      <>
        简单算术常常翻车，多步运算更不稳。要么让它分步写出来（思维链），要么直接用计算器
        / Python 跑一遍 —— 别让它"心算"。
      </>
    ),
  },
  {
    title: "别期待它知道最新的事",
    body: (
      <>
        每个模型的训练数据有截止日期（行话叫 knowledge
        cutoff）。问它今天的新闻，要么承认不知道，要么瞎编一个。要最新事实，让它带搜索或自己查。
      </>
    ),
  },
  {
    title: "别期待没读过的东西",
    body: (
      <>
        训练数据里没的内容（你公司内部文档、不公开的论文、新出的 API 文档），
        它不可能"猜对"。需要这种知识，得把材料贴进去 / 接外部检索（RAG）。
      </>
    ),
  },
  {
    title: "别期待它两次答得一模一样",
    body: (
      <>
        默认情况下它每次回答都会有点随机。同一个问题问两次答案可能不一样 ——
        重要的事情多问几遍 / 让它自己核对，比一锤定音稳。
      </>
    ),
  },
];

interface NeighborLink {
  href: string;
  title: string;
  desc: string;
  bullet: string;
}

const NEIGHBORS: NeighborLink[] = [
  {
    href: "../token/index.html",
    title: "Token · 字怎么切",
    desc: "你输入的字进模型前会被切成 token。每条对话按 token 计费 —— 切得多 = 花钱多。",
    bullet: "钱怎么算清楚",
  },
  {
    href: "../nlp/index.html",
    title: "NLP · LLM 之前那一代",
    desc: "在大模型出现之前，让机器懂语言是怎么做的。看完这站会知道 LLM 替掉了哪些老办法。",
    bullet: "老路对照",
  },
  {
    href: "../context-window/index.html",
    title: "上下文窗口 · 它的「工作记忆」",
    desc: "模型一次能塞下多少字 / 塞太满会怎样 / 怎么管。§06 看到的 100 万 token 那张图，那站讲透。",
    bullet: "记忆有多大",
  },
];

const SectionLimits: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="mb-12 max-w-3xl">
          <div className="section-anchor">
            <span className="section-anchor-num">07</span>
            <span className="section-anchor-label">不要期待</span>
          </div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            知道<span className="font-mono text-coral">不该指望什么</span>，
            <br />
            才会用得稳
          </h2>
          <p className="font-sans text-[15px] text-ink/75 leading-relaxed">
            最后一节不教你新东西。把上面所有内容收束成一份"用 LLM
            的硬规矩"，避免你被"它太能聊了"骗到。
          </p>
        </div>

        {/* 不要期待清单 */}
        <ul className="space-y-3 mb-14 max-w-3xl">
          {DONTS.map((d, i) => (
            <li
              key={i}
              className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 transition-transform duration-200 ease-spring hover:-translate-y-0.5"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 bg-pop text-white rounded-full border-2 border-ink shadow-[2px_2px_0_0_#241C15] font-mono font-bold text-[12px]">
                  ×
                </span>
                <div>
                  <div className="font-display font-extrabold text-[16.5px] text-ink mb-1">
                    {d.title}
                  </div>
                  <p className="font-sans text-[14px] text-ink/75 leading-relaxed">
                    {d.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* 一句收束 */}
        <div className="mb-14 max-w-3xl bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-3">
            一句话带走
          </div>
          <p className="font-display font-bold text-[20px] lg:text-[22px] text-cream leading-snug">
            它是一个
            <span className="text-butter">特别会接话</span>
            的程序，不是一个
            <span className="text-butter">真的懂事</span>
            的助手。把它当聪明的实习生用 ——
            活儿照交，结果你来核。
          </p>
        </div>

        {/* 互链卡 */}
        <div className="mb-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-4">
            § 接下来看哪
          </div>
          <h3 className="font-display font-extrabold text-[22px] lg:text-[26px] text-ink mb-6 max-w-2xl leading-tight">
            往细里挖 · 三个方向
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {NEIGHBORS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden flex flex-col transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-stamp-hover"
            >
              <div className="bg-butter border-b-2 border-ink px-5 py-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 font-bold">
                  {n.bullet}
                </span>
                <ExternalLink
                  className="w-4 h-4 text-ink"
                  strokeWidth={2.4}
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="font-display font-extrabold text-[18px] text-ink mb-2 leading-tight">
                  {n.title}
                </h4>
                <p className="flex-1 font-sans text-[13px] text-ink/70 leading-relaxed mb-4">
                  {n.desc}
                </p>
                <span className="inline-flex items-center gap-1 font-sans font-bold text-[12.5px] text-ink group-hover:text-coral transition-colors">
                  去那一站
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* 站尾签 */}
        <div className="mt-16 pt-8 border-t-2 border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55">
            LLM 学习手册 · 一份手册
          </div>
          <div className="font-mono text-[10.5px] text-ink/45">
            数据更新到 2026 · 5
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLimits;
