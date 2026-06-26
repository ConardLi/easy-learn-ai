/**
 * SectionVsNeighbors · 跟「提示词 / 记忆 / 检索」啥关系
 *
 * 交互：pill 切换三组对比，分清各自管什么
 * 邮戳卡互链 prompt / agent-memory / kv-cache
 */
import React, { useState } from "react";
import StampLink from "./StampLink";

const PAIRS = [
  {
    key: "prompt",
    other: "提示词（Prompt）",
    otherDo: "你写给 AI 的那句话 / 那段指令。",
    ceDo: "管的是 AI 眼前的「一整包」信息 —— 提示词只是其中一块。",
    line: "提示词是包里的一张纸；上下文工程管整个包怎么装。",
  },
  {
    key: "memory",
    other: "记忆（Memory）",
    otherDo: "负责把重要的事「存起来」，下次还能找到。",
    ceDo: "负责这次该从记忆里捞哪几条、怎么放进有限的窗口。",
    line: "记忆管存；上下文工程管这次取哪些、怎么摆。",
  },
  {
    key: "retrieval",
    other: "检索（RAG）",
    otherDo: "负责从一大堆资料里「捞出」相关的几段。",
    ceDo: "检索是上下文工程「挑着放」这一步的常用手段之一。",
    line: "检索是一种捞资料的工具；上下文工程决定捞回来怎么用。",
  },
];

const SectionVsNeighbors: React.FC = () => {
  const [active, setActive] = useState("prompt");
  const p = PAIRS.find((x) => x.key === active)!;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">Not The Same</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          跟「提示词」「记忆」「检索」分清楚
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          这几个词常被放一块说，容易糊。一句话先记住：上下文工程管的是
          <span className="font-bold text-ink">「AI 这次眼前的一整包信息怎么装」</span>，
          其他几个各管一摊小事。点开看对比。
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          {PAIRS.map((x) => {
            const on = x.key === active;
            return (
              <button
                key={x.key}
                onClick={() => setActive(x.key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "bg-coral text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
              >
                vs {x.other}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
              {p.other} 管什么
            </div>
            <p className="font-sans text-[16px] leading-[1.7] text-ink/80">{p.otherDo}</p>
          </div>
          <div className="bg-coral/10 border-2 border-coral rounded-2xl p-6">
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-coral mb-2">
              上下文工程 管什么
            </div>
            <p className="font-sans text-[16px] leading-[1.7] text-ink/80">{p.ceDo}</p>
          </div>
        </div>

        <div className="mt-5 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[760px]">
          <p className="font-display font-bold text-[17px] leading-[1.6]">{p.line}</p>
        </div>

        {/* 互链 */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[820px]">
          <StampLink
            href="../prompt/index.html"
            title="提示词怎么写？"
            desc="去《轻松理解 Prompt》，看那句指令本身该怎么说清楚。"
            compact
          />
          <StampLink
            href="../agent-memory/index.html"
            title="记忆怎么存？"
            desc="去《轻松理解 Agent 记忆》，看 AI 怎么把事记到窗口外。"
            compact
          />
          <StampLink
            href="../kv-cache/index.html"
            title="开头稳定为啥省钱？"
            desc="去《轻松理解 KV Cache》，看复用算过的内容是怎么回事。"
            compact
          />
          <StampLink
            href="../multi-agent/index.html"
            title="拆给多个 AI 各看各的？"
            desc="去《轻松理解 Multi Agent》，看「分开放」在多 Agent 里怎么落地。"
            compact
          />
        </div>
      </div>
    </section>
  );
};

export default SectionVsNeighbors;
