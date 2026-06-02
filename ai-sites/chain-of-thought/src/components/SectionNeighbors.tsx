/**
 * SectionNeighbors · CoT 的邻居 + 收尾
 *
 * - 3 张紧凑邮戳卡讲清关系 + 出站互链：
 *     · 它是一种 prompt 写法 → prompt 站（分锅：prompt 讲通用写法，这站专讲让它先想再答）
 *     · 跟「给例子」组合 = few-shot CoT → few-shot 站
 *     · 2026 推理模型默认就会先想再答 → deepseek-r1 站
 * - hub 聚合卡：butter 底 + 一排 pill 链向提示词工程线兄弟 + 相关站
 * - 收尾 callout：可执行操作建议（不灌鸡汤）
 */
import React from "react";
import { ExternalLink, ArrowUpRight, Lightbulb } from "lucide-react";

type Rel = {
  en: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
};

const RELS: Rel[] = [
  {
    en: "提示词里的一招",
    title: "它是写 prompt 的一招",
    body: "怎么把要求跟模型讲清楚，那一套叫提示词（prompt）。先想再答只是其中一招，专门对付要绕弯的题。",
    href: "../prompt/index.html",
    linkLabel: "提示词 · Prompt",
  },
  {
    en: "配上给例子",
    title: "配上「给例子」更稳",
    body: "给几个带推理过程的例子，再让它照着做，就是原论文里的 few-shot CoT。例子越像你的题，它学得越准。",
    href: "../few-shot/index.html",
    linkLabel: "给例子 · Few-shot",
  },
  {
    en: "会自己想的模型",
    title: "2026 的模型自己会先想",
    body: "现在的推理模型默认就会先想再答。你不提它也会先推一长串再回答，这句「一步步想」常常都省了。",
    href: "../deepseek-r1/index.html",
    linkLabel: "推理模型 · DeepSeek-R1",
  },
];

const HUB_LINKS = [
  { href: "../prompt/index.html", label: "Prompt 提示词" },
  { href: "../system-prompt/index.html", label: "System Prompt 系统提示" },
  { href: "../few-shot/index.html", label: "Few-shot 给例子" },
  { href: "../deepseek-r1/index.html", label: "DeepSeek-R1 推理模型" },
  { href: "../llm/index.html", label: "LLM 大语言模型" },
];

const SectionNeighbors: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-24 lg:pb-28 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Neighbors · 邻居 + 收尾</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          它跟哪些概念
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">挨在一起</span>
          </span>
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          先想再答这一招，左邻右舍有这么几个。想往深里看，顺着卡片跳过去。
        </p>

        {/* 3 张关系卡 */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {RELS.map((r) => (
            <div
              key={r.en}
              className="rounded-2xl border-2 border-ink bg-white shadow-stamp p-5 flex flex-col hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-ink/45 px-2 py-0.5 rounded-full border-2 border-ink/15 self-start">
                {r.en}
              </span>
              <h3 className="font-display font-extrabold text-[19px] text-ink mt-3 leading-tight">
                {r.title}
              </h3>
              <p className="font-sans text-[13.5px] leading-[1.65] text-ink/75 mt-2 flex-1">
                {r.body}
              </p>
              <a
                href={r.href}
                className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring self-start"
              >
                <ExternalLink className="w-3 h-3 text-ink" strokeWidth={2.6} />
                {r.linkLabel}
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
            </div>
          ))}
        </div>

        {/* hub 聚合卡 */}
        <div className="mt-8 rounded-2xl border-2 border-ink bg-butter shadow-stamp-lg p-6">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <div>
              <div className="font-display font-extrabold text-[17px] text-ink">
                同一条「怎么问模型」的线上，还有这几站
              </div>
              <p className="font-sans text-[13.5px] text-ink/75 leading-[1.6] mt-1">
                先想再答是把题问好的一招；这条线上的其它招，挑一个跳过去看。
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 mt-4 pl-10">
            {HUB_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                {l.label}
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
            ))}
          </div>
        </div>

        {/* 收尾 callout —— 可执行建议 */}
        <div className="mt-8 rounded-2xl border-2 border-ink bg-ink text-cream shadow-stamp p-6 flex items-start gap-4">
          <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-butter border-2 border-cream/30 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-ink" strokeWidth={2.4} />
          </span>
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-butter mb-1.5">
              下次就这么用
            </div>
            <p className="font-sans text-[15.5px] leading-[1.7] text-cream/90">
              碰到一道要算 / 要推的题，模型张口给的答案不对 ——
              <span className="font-bold text-cream"> 别急着换问法，先补一句「我们一步一步来想」再发一遍</span>，
              很多时候它就自己把对的推出来了。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNeighbors;
