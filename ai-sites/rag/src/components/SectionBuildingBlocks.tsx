/**
 * Section 04 · 四个零件
 *
 * 把 RAG 拆成 4 块最常见的零件，每块配一个轻量交互：
 *   ① Chunking 分块    — 切片大小切换
 *   ② Embedding 嵌入   — 短语相似度对照
 *   ③ Vector DB 向量库  — HNSW 邻居图示
 *   ④ Retriever 检索器  — dense / sparse / hybrid 切换
 *
 * 写给初学者：每块都先讲「干嘛的、一句话」，再给一个能动手的可视化。
 */
import React, { useState, useMemo } from "react";
import { Scissors, Sparkles, Database, Filter, ExternalLink } from "lucide-react";

const SectionBuildingBlocks: React.FC = () => {
  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">the building blocks</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 RAG 系统，
          <br />
          拆开看就是{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">四个零件</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-12">
          下面四个零件各管一段。它们简单到让人怀疑「就这？」——
          但 90% 的 RAG 系统都是这四件套搭出来的。
        </p>

        {/* 2x2 网格 */}
        <div className="grid md:grid-cols-2 gap-6">
          <ChunkingCard />
          <EmbeddingCard />
          <VectorDBCard />
          <RetrieverCard />
        </div>
      </div>
    </section>
  );
};

/* ========== 卡片骨架 ========== */

const BlockCard: React.FC<{
  num: string;
  icon: React.ReactNode;
  title: string;
  english: string;
  oneLiner: string;
  children: React.ReactNode;
}> = ({ num, icon, title, english, oneLiner, children }) => (
  <div className="p-6 bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg">
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-full">
          {icon}
        </div>
        <div>
          <div className="font-display text-[17px] font-bold text-ink leading-tight">{title}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
            {english}
          </div>
        </div>
      </div>
      <span className="font-mono text-[11px] font-bold text-ink/35">{num}</span>
    </div>
    <p className="text-[13.5px] text-ink/65 leading-relaxed mb-5">{oneLiner}</p>
    <div className="bg-white border-2 border-ink rounded-xl p-4">{children}</div>
  </div>
);

/* ========== ① Chunking ========== */

const SAMPLE_TEXT =
  "公司年假政策按工龄分档：入职 1 年内 5 天，1-5 年 10 天，5 年以上 15 天。请假需提前 3 个工作日在系统提交申请，由直接主管审批。法定节假日不占年假额度。年假可结转至次年 3 月底失效。";

const CHUNK_SIZES = [
  { id: "small", label: "小（20 字）", size: 20, color: "bg-coral/25" },
  { id: "medium", label: "中（50 字）", size: 50, color: "bg-butter/45" },
  { id: "large", label: "大（120 字）", size: 120, color: "bg-teal/20" },
];

const ChunkingCard: React.FC = () => {
  const [sizeId, setSizeId] = useState("medium");
  const cfg = CHUNK_SIZES.find((c) => c.id === sizeId)!;

  const chunks = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i < SAMPLE_TEXT.length; i += cfg.size) {
      out.push(SAMPLE_TEXT.slice(i, i + cfg.size));
    }
    return out;
  }, [cfg.size]);

  return (
    <BlockCard
      num="01"
      icon={<Scissors className="w-4 h-4" strokeWidth={2.5} />}
      title="分块"
      english="chunking"
      oneLiner="长文档塞不进上下文，得切碎了存。切太碎丢上下文，切太大检索精度差 —— 平衡是门艺术。"
    >
      <div className="flex gap-1.5 mb-3">
        {CHUNK_SIZES.map((c) => (
          <button
            key={c.id}
            onClick={() => setSizeId(c.id)}
            className={[
              "flex-1 px-2 py-1.5 rounded-md border-2 border-ink font-mono text-[10px] uppercase tracking-[0.1em] font-semibold transition-all",
              sizeId === c.id ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream",
            ].join(" ")}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="font-sans text-[12.5px] leading-relaxed text-ink/85 break-all">
        {chunks.map((ch, i) => (
          <span
            key={i}
            className={`inline ${cfg.color} px-0.5 mx-px rounded-sm border-b border-ink/15`}
          >
            {ch}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-ink/45">
        <span>共 {chunks.length} 块</span>
        <span>切片之间通常会留 10～20% overlap 防止断句</span>
      </div>
    </BlockCard>
  );
};

/* ========== ② Embedding ========== */

const QUERY = "员工年假怎么算？";
const PHRASES = [
  { text: "新人入职多少天年假", sim: 0.89 },
  { text: "假期制度按工龄分档", sim: 0.81 },
  { text: "差旅报销流程", sim: 0.21 },
  { text: "周末适合做什么", sim: 0.06 },
];

const EmbeddingCard: React.FC = () => {
  return (
    <BlockCard
      num="02"
      icon={<Sparkles className="w-4 h-4" strokeWidth={2.5} />}
      title="嵌入"
      english="embedding"
      oneLiner="把一段文字变成一串数字（向量），让「意思相近」可以被算出来。这是 RAG 能「按语义」找资料的根本。"
    >
      <div className="mb-3 px-3 py-2 bg-butter/40 border border-ink/20 rounded-md">
        <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
          query
        </div>
        <div className="font-display text-[13px] font-bold text-ink">«&nbsp;{QUERY}&nbsp;»</div>
      </div>

      <ul className="space-y-1.5">
        {PHRASES.map((p, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className="text-[12.5px] text-ink/80 flex-1 truncate">{p.text}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/10">
                <div
                  className={`h-full ${
                    p.sim > 0.7 ? "bg-teal" : p.sim > 0.4 ? "bg-butter" : "bg-ink/25"
                  }`}
                  style={{ width: `${p.sim * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10.5px] font-semibold text-ink/65 w-9 text-right">
                {p.sim.toFixed(2)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 font-mono text-[10px] text-ink/45">
        相似度 = cosine(query, phrase)，越接近 1 越相关
      </div>
      <a
        href="../embedding/index.html"
        className="mt-4 inline-flex w-full items-start gap-3 rounded-xl border-2 border-ink bg-white px-3 py-3 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-butter">
          <ExternalLink className="h-3.5 w-3.5 text-ink" strokeWidth={2.4} />
        </span>
        <span className="text-[12.5px] leading-relaxed text-ink/70">
          <span className="font-bold text-ink">想把“意思相近”看明白，去《Embedding》。</span>
          {" "}
          那一站专门拆这串数字怎么用来找近邻。
        </span>
      </a>
    </BlockCard>
  );
};

/* ========== ③ Vector DB ========== */

const VectorDBCard: React.FC = () => {
  /* HNSW 简单可视化：query 从入口节点跳到最近邻 */
  return (
    <BlockCard
      num="03"
      icon={<Database className="w-4 h-4" strokeWidth={2.5} />}
      title="向量库"
      english="vector database"
      oneLiner="存放百万、千万、上亿条向量，并在毫秒级找出最相似的几条。靠的是 HNSW、IVF 这类近似最近邻索引。"
    >
      <svg viewBox="0 0 320 160" className="w-full h-auto">
        {/* 网格背景 */}
        <g stroke="#241C15" strokeWidth="0.3" opacity="0.05">
          {Array.from({ length: 17 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="160" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 20} x2="320" y2={i * 20} />
          ))}
        </g>

        {/* 节点（数据库里的向量） */}
        {[
          { x: 60, y: 50 },
          { x: 100, y: 90 },
          { x: 150, y: 60 },
          { x: 180, y: 110 },
          { x: 220, y: 70 },
          { x: 260, y: 105 },
          { x: 290, y: 50 },
          { x: 50, y: 120 },
          { x: 130, y: 130 },
          { x: 210, y: 30 },
        ].map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="4"
            fill="#FBEFE3"
            stroke="#241C15"
            strokeWidth="1.5"
          />
        ))}

        {/* HNSW 边（少量） */}
        <g stroke="#241C15" strokeWidth="0.8" opacity="0.25" fill="none">
          <line x1="60" y1="50" x2="100" y2="90" />
          <line x1="100" y1="90" x2="150" y2="60" />
          <line x1="150" y1="60" x2="180" y2="110" />
          <line x1="180" y1="110" x2="220" y2="70" />
          <line x1="220" y1="70" x2="260" y2="105" />
          <line x1="220" y1="70" x2="290" y2="50" />
          <line x1="150" y1="60" x2="210" y2="30" />
        </g>

        {/* search path */}
        <g
          stroke="#E07A5F"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,3"
          className="animate-[dashFlow_2s_linear_infinite]"
        >
          <line x1="20" y1="80" x2="60" y2="50" />
          <line x1="60" y1="50" x2="150" y2="60" />
          <line x1="150" y1="60" x2="180" y2="110" />
        </g>

        {/* query 起点 */}
        <g transform="translate(20,80)">
          <circle cx="0" cy="0" r="8" fill="#E07A5F" stroke="#241C15" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#FBEFE3" />
        </g>

        {/* 命中节点 */}
        <g transform="translate(180,110)">
          <circle cx="0" cy="0" r="9" fill="#F4D35E" stroke="#241C15" strokeWidth="2.5" />
          <text x="0" y="3.5" textAnchor="middle" fontFamily="Plus Jakarta Sans" fontSize="9" fontWeight="800" fill="#241C15">
            ★
          </text>
        </g>

        {/* 标注 */}
        <text x="20" y="100" fontFamily="Geist Mono" fontSize="8.5" fill="#88837C">
          query
        </text>
        <text x="187" y="130" fontFamily="Geist Mono" fontSize="8.5" fill="#88837C">
          nearest neighbor
        </text>
      </svg>

      <div className="mt-2 flex items-center justify-between font-mono text-[10px] text-ink/45">
        <span>HNSW 索引 · 跳跃图结构</span>
        <span>主流选手：pgvector · Qdrant · Pinecone · Milvus</span>
      </div>
    </BlockCard>
  );
};

/* ========== ④ Retriever ========== */

type RetrieverKind = "dense" | "sparse" | "hybrid";

const RETRIEVER_RESULTS: Record<
  RetrieverKind,
  { docs: { title: string; reason: string }[]; pros: string }
> = {
  dense: {
    pros: "懂同义词、懂改写，对意图友好",
    docs: [
      { title: "假期制度概览", reason: "向量距离 0.91" },
      { title: "新员工福利说明", reason: "向量距离 0.83" },
      { title: "请假申请流程", reason: "向量距离 0.76" },
    ],
  },
  sparse: {
    pros: "精确命中关键词、缩写、数字、人名",
    docs: [
      { title: "请假申请流程", reason: "关键词「请假/年假」命中" },
      { title: "年假统计报表 2025", reason: "关键词「年假」命中" },
      { title: "新员工入职 checklist", reason: "关键词「年假」命中" },
    ],
  },
  hybrid: {
    pros: "两者结果加权融合，召回与精确兼顾",
    docs: [
      { title: "假期制度概览", reason: "dense 0.91 × sparse 0.7" },
      { title: "请假申请流程", reason: "dense 0.76 × sparse 1.0" },
      { title: "新员工福利说明", reason: "dense 0.83 × sparse 0.3" },
    ],
  },
};

const RetrieverCard: React.FC = () => {
  const [kind, setKind] = useState<RetrieverKind>("hybrid");
  const r = RETRIEVER_RESULTS[kind];

  return (
    <BlockCard
      num="04"
      icon={<Filter className="w-4 h-4" strokeWidth={2.5} />}
      title="检索器"
      english="retriever"
      oneLiner="从向量库里取回相关文档。看似只是一句 SQL，实际选什么检索策略决定了上限。"
    >
      <div className="flex gap-1.5 mb-3">
        {(
          [
            { id: "dense", label: "向量" },
            { id: "sparse", label: "关键词" },
            { id: "hybrid", label: "混合" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            onClick={() => setKind(opt.id)}
            className={[
              "flex-1 px-2 py-1.5 rounded-md border-2 border-ink font-mono text-[10px] uppercase tracking-[0.1em] font-semibold transition-all",
              kind === opt.id ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <ul className="space-y-1.5 mb-3">
        {r.docs.map((d, i) => (
          <li
            key={i}
            className="flex items-center gap-2.5 px-2.5 py-1.5 bg-cream/60 border border-ink/15 rounded-md"
          >
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-butter border border-ink text-[9px] font-bold font-mono">
              {i + 1}
            </span>
            <span className="flex-1 text-[12.5px] text-ink font-medium truncate">{d.title}</span>
            <span className="font-mono text-[9.5px] text-ink/45">{d.reason}</span>
          </li>
        ))}
      </ul>

      <div className="font-mono text-[10px] text-ink/55">
        <span className="text-teal font-semibold">优势：</span>
        {r.pros}
      </div>
    </BlockCard>
  );
};

export default SectionBuildingBlocks;
