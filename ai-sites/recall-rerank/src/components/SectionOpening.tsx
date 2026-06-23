import React from "react";
import { ArrowDown, Files, ListFilter, Search } from "lucide-react";
import { StampLink } from "./common";

const SectionOpening: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-cream px-5 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <div>
          <div className="eyebrow mb-4">Retrieval & Reranking · 召回与重排</div>
          <h1 className="font-display text-display-2xl text-ink">召回与重排是什么？</h1>

          <div className="mt-6 inline-block rotate-[-1deg] border-2 border-ink bg-butter px-4 py-3 shadow-stamp">
            <p className="rotate-[1deg] font-display text-[25px] font-bold leading-snug text-ink md:text-[32px]">
              召回与重排 = 先捞出候选资料，再把最值得看的排到前面。
            </p>
          </div>

          <div className="mt-7 max-w-2xl space-y-4 text-[17px] leading-relaxed text-ink/72">
            <p>召回是“先找一批可能有用的资料”。它追求别漏掉，所以会多捞一点。</p>
            <p>重排是“再仔细看这批资料的顺序”。它会把更贴近问题、更能支撑答案的片段放上来。</p>
            <p>很多知识库问答都靠这两步兜底。先看一个只做召回的现场，你会马上知道问题在哪。</p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <StampLink
              href="../rag/index.html"
              title="先看《RAG》会更顺"
              desc="RAG 讲完整问答流程；这站只拆“资料怎么找、怎么排序”。"
              compact
            />
            <a
              href="#recall-mess"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink bg-white px-5 py-3 font-bold text-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
            >
              继续往下看
              <ArrowDown className="h-4 w-4 transition-transform duration-250 ease-spring group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>

        <HeroMachine />
      </div>
    </section>
  );
};

const HeroMachine: React.FC = () => {
  return (
    <div className="rounded-[28px] border-2 border-ink bg-white p-5 shadow-stamp-xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <div className="font-display text-[24px] font-bold leading-tight text-ink">一批资料进来，少数几条出去</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">candidate list → ranked list</div>
        </div>
        <ListFilter className="h-6 w-6 text-ink" strokeWidth={2.5} />
      </div>

      <svg viewBox="0 0 620 390" className="h-auto w-full" aria-label="召回与重排示意">
        <defs>
          <marker id="hero-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
            <path d="M0,0 L9,3 L0,6 Z" fill="#241C15" />
          </marker>
        </defs>

        <g transform="translate(38 48)">
          <rect width="150" height="250" rx="18" fill="#FBEFE3" stroke="#241C15" strokeWidth="3" />
          <text x="75" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="13" fontWeight="800" fill="#241C15">
            documents
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i} transform={`translate(24 ${58 + i * 34})`} className="transition-transform duration-250 ease-spring hover:-translate-y-1">
              <rect width="102" height="24" rx="6" fill={i === 1 ? "#F4D35E" : "#FFFFFF"} stroke="#241C15" strokeWidth="2" />
              <line x1="13" y1="12" x2={i === 3 ? 62 : 86} y2="12" stroke="#241C15" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            </g>
          ))}
          <Files x={58} y={210} className="h-8 w-8 text-ink/60" strokeWidth={2.2} />
        </g>

        <path d="M205 174 H286" stroke="#241C15" strokeWidth="3" markerEnd="url(#hero-arrow)" />
        <g transform="translate(296 95)" className="transition-transform duration-300 ease-spring hover:scale-[1.03]">
          <rect width="118" height="158" rx="18" fill="#1B4B5A" stroke="#241C15" strokeWidth="3" />
          <circle cx="59" cy="51" r="28" fill="#FBEFE3" stroke="#241C15" strokeWidth="3" />
          <Search x={45} y={37} className="h-7 w-7 text-ink" strokeWidth={2.8} />
          <text x="59" y="105" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="18" fontWeight="800" fill="#FBEFE3">
            召回
          </text>
          <text x="59" y="127" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fontWeight="700" fill="#FBEFE3" opacity="0.72">
            top 50
          </text>
        </g>
        <path d="M430 174 H508" stroke="#241C15" strokeWidth="3" markerEnd="url(#hero-arrow)" />

        <g transform="translate(512 52)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(0 ${i * 70})`} className="transition-transform duration-300 ease-spring hover:-translate-x-1">
              <rect width="76" height="52" rx="12" fill={i === 0 ? "#F4D35E" : i === 1 ? "#E07A5F" : "#FFFFFF"} stroke="#241C15" strokeWidth="3" />
              <text x="14" y="32" fontFamily="Geist Mono, monospace" fontSize="20" fontWeight="900" fill={i === 1 ? "#FBEFE3" : "#241C15"}>
                #{i + 1}
              </text>
              <line x1="43" y1="22" x2="62" y2="22" stroke={i === 1 ? "#FBEFE3" : "#241C15"} strokeWidth="2" strokeLinecap="round" opacity="0.75" />
              <line x1="43" y1="32" x2="56" y2="32" stroke={i === 1 ? "#FBEFE3" : "#241C15"} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            </g>
          ))}
          <text x="38" y="246" textAnchor="middle" fontFamily="Plus Jakarta Sans, Noto Sans SC, sans-serif" fontSize="18" fontWeight="800" fill="#241C15">
            重排
          </text>
        </g>
      </svg>
    </div>
  );
};

export default SectionOpening;
