import React from "react";
import { ArrowUpRight, Boxes, Database, ListFilter, Network, Search, Scissors, TextCursorInput } from "lucide-react";
import StampLink from "./StampLink";

const neighbors = [
  {
    href: "../chunk/index.html",
    title: "Chunk",
    desc: "负责先把长资料切成小片段。Embedding 通常是一块一块去算。",
    icon: Scissors,
  },
  {
    href: "../vector-database/index.html",
    title: "向量数据库",
    desc: "负责把很多向量存起来，并按相似度快速找回原文。",
    icon: Database,
  },
  {
    href: "../rag/index.html",
    title: "RAG",
    desc: "负责把检索到的资料拼回问题里，再交给 AI 回答。",
    icon: Search,
  },
  {
    href: "../recall-rerank/index.html",
    title: "召回与重排",
    desc: "Embedding 常负责先找候选；那站讲候选太多时怎么重新排序。",
    icon: ListFilter,
  },
  {
    href: "../token/index.html",
    title: "Token",
    desc: "负责把文字切成模型能读的小单位。Embedding 会先读这些小单位。",
    icon: TextCursorInput,
  },
  {
    href: "../context-window/index.html",
    title: "Context Window",
    desc: "决定一次对话能塞多少内容。Embedding 常用来先筛资料，少塞无关内容。",
    icon: Boxes,
  },
  {
    href: "../llm/index.html",
    title: "LLM",
    desc: "负责理解问题、组织答案。Embedding 负责在回答前先把相关材料找出来。",
    icon: Network,
  },
];

const SectionNeighborLinks: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-cream px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">nearby ideas</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <h2 className="mb-5 max-w-3xl font-display text-display-lg text-ink">
              最后看它和几个
              <br />
              常见 AI 词怎么分工。
            </h2>
            <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
              <p>
                Embedding 管“内容之间有多像”。它本身不负责写答案，也不负责保存完整对话。
              </p>
              <p>
                真正的 AI 应用通常还会配合几件事：先把文字切小，把向量存起来，控制能塞进对话的内容量，再让 AI 写答案。右边几张卡可以接着看。
              </p>
            </div>

            <div className="mt-7">
              <StampLink
                href="../vector-database/index.html"
                title="下一站建议看向量数据库。"
                desc="你会看到这些向量存进库里以后，怎么被快速找回来。"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border-2 border-ink bg-butter p-5 shadow-stamp-lg">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="font-display text-[24px] font-bold leading-tight text-ink">
                Embedding 周围的六个概念
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    pick one to continue
                  </div>
                </div>
                <ArrowUpRight className="h-6 w-6 text-ink" strokeWidth={2.5} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {neighbors.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="group rounded-xl border-2 border-ink bg-white p-4 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-cream transition-transform duration-250 ease-spring group-hover:-rotate-6">
                          <Icon className="h-4 w-4 text-ink" strokeWidth={2.4} />
                        </span>
                        <span className="font-display text-[19px] font-bold text-ink">{item.title}</span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-ink/65">{item.desc}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionNeighborLinks;
