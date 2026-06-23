import React from "react";
import { Boxes, Database, GitBranch, Search, Sparkles } from "lucide-react";
import { SectionShell, StampLink } from "./common";

const links = [
  {
    href: "../rag/index.html",
    title: "RAG",
    desc: "看完整问答流程：找资料、塞进问题、让 AI 带着资料回答。",
    icon: Search,
  },
  {
    href: "../chunk/index.html",
    title: "Chunk",
    desc: "先把长资料切成小片段，召回和重排才有对象可排。",
    icon: Boxes,
  },
  {
    href: "../embedding/index.html",
    title: "Embedding",
    desc: "把文字变成可比较的编号，召回阶段常靠它找语义相近的片段。",
    icon: Sparkles,
  },
  {
    href: "../vector-database/index.html",
    title: "向量数据库",
    desc: "保存片段、编号和来源字段，并在提问时快速找回候选。",
    icon: Database,
  },
];

const SectionNeighborLinks: React.FC = () => {
  return (
    <SectionShell num="08" label="nearby ideas" tone="cream">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">把它放回 RAG 族里看。</h2>
          <div className="mt-5 max-w-xl space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>这站只讲候选资料怎么排。往前看，资料要先切块、转成编号、存起来。</p>
            <p>往后看，还可以把关键词检索和向量检索混在一起。那一站会单独讲 Hybrid Search。</p>
          </div>

          <div className="mt-7">
            <StampLink
              href="../rag/index.html"
              title="回到《RAG》看全貌"
              desc="这里讲“找得准”；RAG 那站讲“找到后怎么变成回答”。"
            />
          </div>
        </div>

        <div className="rounded-[24px] border-2 border-ink bg-butter p-5 shadow-stamp-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-[24px] font-bold text-ink">相邻概念</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">chunk → store → recall → rerank</div>
            </div>
            <GitBranch className="h-6 w-6 text-ink" strokeWidth={2.5} />
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
