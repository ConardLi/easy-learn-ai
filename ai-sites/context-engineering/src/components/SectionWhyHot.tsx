/**
 * SectionWhyHot · 为什么 2026 它这么火（收尾节）
 *
 * 内容：Agent 任务越做越长、喂的信息越来越多 → 管好上下文成了关键
 * 标来源：Anthropic 2025-09 定义、Prompt Engineering 的自然延续
 */
import React from "react";

const REASONS = [
  {
    n: "01",
    t: "AI 的任务越做越长",
    d: "现在的 AI 已经能自己连着干活、调工具、跑很多步（这种会自己干活的 AI 常被叫做 Agent）。步骤一长，要记的东西暴涨，窗口很快不够用。",
  },
  {
    n: "02",
    t: "喂进去的信息越来越杂",
    d: "工具输出、查到的资料、历史对话全往窗口里挤。不管理，AI 很快就被无关内容淹没、开始走神。",
  },
  {
    n: "03",
    t: "模型再大，窗口也有上限",
    d: "就算窗口做得很大，内容一多照样会「腐化」、看漏重点。所以管好放什么，比单纯扩容更管用。",
  },
];

const SectionWhyHot: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10 bg-white/40">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">08</span>
          <span className="section-anchor-label">Why Now</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[760px]">
          为什么 2026 年，大家突然都在聊它？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[700px]">
          几年前大家忙着研究「提示词怎么写」。现在重心移到了「整个眼前信息包怎么配」 ——
          Anthropic 把上下文工程称作提示词工程的自然延续。原因有三个。
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {REASONS.map((r) => (
            <div key={r.n} className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-6">
              <div className="font-mono text-[13px] font-bold tracking-[0.2em] text-coral mb-3">
                {r.n}
              </div>
              <div className="font-display font-extrabold text-[19px] text-ink mb-3 leading-tight">
                {r.t}
              </div>
              <p className="font-sans text-[14.5px] leading-[1.7] text-ink/75">{r.d}</p>
            </div>
          ))}
        </div>

        {/* 收尾金句 */}
        <div className="mt-12 bg-ink text-cream rounded-3xl px-7 py-8 lg:px-10 lg:py-9">
          <p className="font-display font-bold text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1.5]">
            模型决定了 AI 能多聪明；
            <br className="hidden sm:block" />
            上下文工程决定了它每次干活，眼前到底有没有对的料。
          </p>
          <p className="mt-5 font-sans text-[15px] text-cream/70">
            把这件事做好，普通模型也能稳定干成事。
            <a href="#top" className="ml-1 underline decoration-coral/60 hover:decoration-coral">
              回到开头再看一遍定义
            </a>
            。
          </p>
        </div>

        {/* 来源 */}
        <div className="mt-8 bg-cream border-2 border-dashed border-ink/30 rounded-2xl px-5 py-4 max-w-[760px]">
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-2">
            资料来源
          </div>
          <ul className="font-sans text-[13.5px] leading-[1.8] text-ink/70 space-y-1">
            <li>
              · Anthropic《Effective Context Engineering for AI Agents》（2025-09-29）—— 定义、注意力预算、压缩 / 笔记 / 多 Agent 等手法
            </li>
            <li>· LangChain · 上下文工程四类划分：Write / Select / Compress / Isolate</li>
            <li>· context rot（上下文腐化）：Chroma Research 关于长上下文召回下降的研究</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SectionWhyHot;
