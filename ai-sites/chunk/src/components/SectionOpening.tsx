import React from "react";
import { ArrowDown, Boxes, FileText, Scissors, Search } from "lucide-react";
import { StampLink } from "./common";

const SectionOpening: React.FC = () => {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-20 md:px-8 lg:pb-28 lg:pt-28">
      <div className="absolute right-[7%] top-20 hidden h-12 w-12 rotate-12 rounded-2xl border-2 border-ink bg-coral shadow-stamp lg:block" />
      <div className="absolute bottom-24 left-[5%] hidden h-10 w-10 -rotate-6 rounded-full border-2 border-ink bg-teal shadow-stamp lg:block" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow mb-5">Chunking · 分块</p>
          <h1 className="font-display text-display-xl text-ink">Chunk 是什么？</h1>

          <p className="mt-6 max-w-2xl font-display text-[23px] font-bold leading-snug text-ink lg:text-[28px]">
            <span className="relative inline-block">
              <span className="absolute bottom-1 left-0 right-0 h-4 bg-butter" />
              <span className="relative">Chunk = 把长资料切成能单独保存、搜索和引用的小片段。</span>
            </span>
          </p>

          <div className="mt-6 max-w-2xl space-y-3 text-[16px] leading-relaxed text-ink/75">
            <p>
              当你把公司手册丢给 AI，它通常不会每次读整本。系统会先把手册切成很多块，之后只挑和问题最相关的几块给 AI 看。
            </p>
            <p>
              这件事常出现在让 AI 先翻资料再回答的系统里。Chunk 做的是第一步：先把长资料切好，后面才方便按问题找回相关几段。
            </p>
            <p>先看文档切开以后，系统要找的内容为什么会变少。</p>
          </div>

          <div className="mt-7 grid max-w-2xl gap-3 sm:grid-cols-2">
            <StampLink
              compact
              href="../rag/index.html"
              title="看完这里，再看《RAG》会更顺"
              desc="那一站讲完整问答流程；这里先单独拆资料怎么切。"
            />
            <StampLink
              compact
              href="../context-window/index.html"
              title="它也受聊天窗口限制"
              desc="窗口装得下多少内容，会影响最后能塞几块。"
            />
          </div>

          <div className="mt-9 inline-flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-cream">
              <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
              继续往下看
            </span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroDiagram />
        </div>
      </div>
    </section>
  );
};

const HeroDiagram: React.FC = () => (
  <div className="mx-auto max-w-md rounded-3xl border-2 border-ink bg-white p-5 shadow-stamp-xl">
    <div className="mb-4 flex items-center justify-between">
      <div>
        <div className="font-display text-[24px] font-bold text-ink">长文档进来</div>
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
          split before search
        </div>
      </div>
      <Scissors className="h-7 w-7 text-ink" strokeWidth={2.4} />
    </div>

    <svg viewBox="0 0 360 300" className="h-auto w-full" aria-label="长文档切成 chunk 的示意图">
      <rect x="20" y="24" width="104" height="210" rx="10" fill="#FBEFE3" stroke="#241C15" strokeWidth="2" />
      {[0, 1, 2, 3, 4, 5].map((line) => (
        <line
          key={line}
          x1="38"
          y1={58 + line * 25}
          x2={line % 2 ? 102 : 92}
          y2={58 + line * 25}
          stroke="#241C15"
          strokeWidth="2"
          opacity="0.45"
        />
      ))}
      <FileText x="57" y="246" width="30" height="30" stroke="#241C15" strokeWidth="2.2" />
      <path d="M136 124 C160 124 164 88 188 88" fill="none" stroke="#241C15" strokeWidth="2" strokeDasharray="6 7" />
      <path d="M136 124 C166 124 166 145 190 145" fill="none" stroke="#241C15" strokeWidth="2" strokeDasharray="6 7" />
      <path d="M136 124 C162 124 166 201 190 201" fill="none" stroke="#241C15" strokeWidth="2" strokeDasharray="6 7" />

      {[
        { y: 52, fill: "#F4D35E", label: "chunk 1" },
        { y: 109, fill: "#E07A5F", label: "chunk 2" },
        { y: 166, fill: "#1B4B5A", label: "chunk 3" },
      ].map((chunk) => (
        <g key={chunk.label} className="transition-transform duration-250 ease-spring hover:-translate-y-1">
          <rect x="198" y={chunk.y} width="124" height="42" rx="8" fill={chunk.fill} stroke="#241C15" strokeWidth="2" />
          <text
            x="215"
            y={chunk.y + 26}
            fontFamily="Geist Mono, monospace"
            fontSize="12"
            fontWeight="700"
            fill={chunk.fill === "#1B4B5A" ? "#FBEFE3" : "#241C15"}
          >
            {chunk.label}
          </text>
        </g>
      ))}

      <g transform="translate(222 236)">
        <rect x="0" y="0" width="82" height="38" rx="19" fill="#FFFFFF" stroke="#241C15" strokeWidth="2" />
        <Search x="12" y="9" width="20" height="20" stroke="#241C15" strokeWidth="2.4" />
        <Boxes x="46" y="9" width="20" height="20" stroke="#241C15" strokeWidth="2.4" />
      </g>
    </svg>

    <p className="mt-4 text-sm leading-relaxed text-ink/65">
      后面的搜索不再翻整本书，而是在这些小块里找。切得好，AI 更容易拿到刚好有用的那几段。
    </p>
  </div>
);

export default SectionOpening;
