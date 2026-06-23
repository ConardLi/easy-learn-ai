import React from "react";
import { ArrowUpRight, Database } from "lucide-react";
import { SectionShell, StampLink } from "./common";

const links = [
  {
    href: "../chunk/index.html",
    title: "Chunk",
    desc: "长资料进库前先切小块。那站讲切多大、要不要留重复。",
  },
  {
    href: "../embedding/index.html",
    title: "Embedding",
    desc: "先把文字、图片变成向量。那站讲数字从哪来。",
  },
  {
    href: "../rag/index.html",
    title: "RAG",
    desc: "把检索结果拼进问题里，再让 AI 回答。那站讲完整问答流程。",
  },
  {
    href: "../recall-rerank/index.html",
    title: "召回与重排",
    desc: "向量库先找候选；那站讲候选太多时怎么挑出最有用的几条。",
  },
  {
    href: "../context-window/index.html",
    title: "Context Window",
    desc: "检索回来的片段最后会塞进上下文。那站讲窗口为什么有限。",
  },
];

const SectionNeighborLinks: React.FC = () => {
  return (
    <SectionShell num="08" label="where next" tone="butter">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <div className="mb-4 inline-flex rounded-full border-2 border-ink bg-white p-2 shadow-stamp">
            <Database className="h-5 w-5" />
          </div>
          <h2 className="font-display text-display-lg">把它放回 AI 问答里</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">
            向量数据库只负责“找”。它找到的原文会被交给 RAG，再塞进 AI 当前能看的那段文本里。
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink/70">
            你可以按这个顺序看：Chunk 负责切小块，Embedding 负责变成向量，向量数据库负责存和搜，RAG 负责把搜到的资料拿去回答。
          </p>
        </div>

        <div className="border-2 border-ink bg-cream p-5 shadow-stamp-xl">
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {["Embedding", "Vector DB", "RAG", "Answer"].map((item, index) => (
              <React.Fragment key={item}>
                <span
                  className={`rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.12em] ${
                    item === "Vector DB" ? "bg-ink text-cream" : "bg-white text-ink"
                  }`}
                >
                  {item}
                </span>
                {index < 3 && <ArrowUpRight className="h-4 w-4 rotate-45" />}
              </React.Fragment>
            ))}
          </div>
          <div className="grid gap-4">
            {links.map((link) => (
              <StampLink key={link.title} href={link.href} title={link.title} desc={link.desc} />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

export default SectionNeighborLinks;
