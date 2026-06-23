import React from "react";
import { Boxes, Database, ListFilter, Network, Search, Sparkles, TextCursorInput } from "lucide-react";
import { SectionShell, StampLink } from "./common";

const links = [
  {
    href: "../rag/index.html",
    title: "RAG",
    desc: "负责把检索到的 chunk 拼回问题里，再交给 AI 回答。",
    icon: Search,
  },
  {
    href: "../embedding/index.html",
    title: "Embedding",
    desc: "负责把每个 chunk 变成方便比较的编号，用来判断哪块资料更像问题。",
    icon: Sparkles,
  },
  {
    href: "../vector-database/index.html",
    title: "向量数据库",
    desc: "负责保存这些编号、原文和来源，用户提问时再快速找回。",
    icon: Database,
  },
  {
    href: "../recall-rerank/index.html",
    title: "召回与重排",
    desc: "负责把找回来的候选片段重新排序，让最能回答问题的内容排前面。",
    icon: ListFilter,
  },
  {
    href: "../context-window/index.html",
    title: "Context Window",
    desc: "决定最后能把多少个 chunk 塞给 AI 看。",
    icon: Boxes,
  },
  {
    href: "../token/index.html",
    title: "Token",
    desc: "真实系统常按 token 估算 chunk 长度。",
    icon: TextCursorInput,
  },
];

const SectionNeighborLinks: React.FC = () => {
  return (
    <SectionShell num="07" label="nearby ideas" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">最后看看：资料切好以后，AI 怎么拿来回答问题。</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>Chunk 只管“资料怎么切”。切完以后，系统会把每块文字换成一串方便比较的数字，再把数字和原文一起存起来。</p>
            <p>用户提问时，系统按这些数字找回几块，塞给 AI 看。后面的概念都在接这几步。</p>
          </div>

          <div className="mt-7">
            <StampLink
              href="../embedding/index.html"
              title="下一站建议看《Embedding》"
              desc="下一站会讲：系统怎么把一块文字变成可比较的编号，用来判断哪块资料更像用户的问题。"
            />
          </div>
        </div>

        <div className="rounded-3xl border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-[24px] font-bold text-ink">资料切完后会去哪</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">切块 → 编号 → 找回 → 回答</div>
            </div>
            <Network className="h-6 w-6 text-ink" strokeWidth={2.5} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {links.map((item) => {
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
    </SectionShell>
  );
};

export default SectionNeighborLinks;
