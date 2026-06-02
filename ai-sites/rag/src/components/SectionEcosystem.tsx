/**
 * Section 06 · 2026 真实生态
 *
 * 把上一节那 4 个零件，对应到 2026 年市面上真正在用的产品。
 * 三个赛道：
 *   ① Embedding 模型（MTEB 排行参考）
 *   ② Reranker 重排模型
 *   ③ Vector DB 向量库
 *
 * 所有数据基于公开来源（MTEB leaderboard / Awesome Agents 2026 / vendor benchmark）。
 * 详细分数取近一个月口径，写给入门者作选型参考。
 */
import React, { useState } from "react";
import { Crown, Tag, Globe, Database } from "lucide-react";

const SectionEcosystem: React.FC = () => {
  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">the 2026 stack</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink text-cream border-2 border-ink rounded-full shadow-stamp mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-butter" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
            进阶 · 自己要搭系统再看
          </span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          要真自己搭一套，
          <br />
          2026 年用{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">这些工具</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-10">
          下面是当下三个赛道里热度最高的选手。数据来自 MTEB 排行榜与厂商基准（截至 2026 年 5 月），
          供入门者按场景选型参考。
        </p>

        <div className="space-y-12">
          <EmbeddingTrack />
          <RerankerTrack />
          <VectorDBTrack />
        </div>

        {/* 通用建议 */}
        <div className="mt-14 p-6 bg-butter/30 border-2 border-ink rounded-2xl shadow-stamp">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
            beginner&apos;s pick · 新手最省心组合
          </div>
          <p className="font-display text-[18px] font-bold text-ink leading-snug mb-2">
            Voyage-3-large（embed） + Cohere Rerank 4（rerank） + pgvector（store）
          </p>
          <p className="text-[13px] text-ink/65 leading-relaxed">
            三者都有现成 API/插件，1 天能跑通完整链路。等数据涨到 5000 万向量再换 Qdrant，
            等想省钱再换 BGE-M3 + BGE-Reranker-v2-m3 自托管。<strong className="text-ink/85">先跑起来，再优化。</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============ ① Embedding 模型 ============ */

type EmbModel = {
  rank: number;
  name: string;
  vendor: string;
  type: "api" | "open";
  mteb: number;
  dims: number;
  maxTokens: number;
  price: string; // per 1M tokens
  note?: string;
};

const EMB_DATA: EmbModel[] = [
  { rank: 1, name: "Gemini Embedding 001", vendor: "Google", type: "api", mteb: 68.3, dims: 3072, maxTokens: 8192, price: "$0.008", note: "商业 API 性价比之王" },
  { rank: 2, name: "Qwen3-Embedding-8B", vendor: "Alibaba", type: "open", mteb: 70.6, dims: 4096, maxTokens: 32768, price: "Free", note: "开源 multilingual 最强" },
  { rank: 3, name: "NV-Embed-v2", vendor: "NVIDIA", type: "open", mteb: 72.3, dims: 4096, maxTokens: 32768, price: "Free", note: "Llama-3.1 蒸馏" },
  { rank: 4, name: "Voyage-3.1-large", vendor: "Voyage AI", type: "api", mteb: 67.4, dims: 2048, maxTokens: 32768, price: "$0.05", note: "code / finance / legal 专精" },
  { rank: 5, name: "Cohere Embed v4", vendor: "Cohere", type: "api", mteb: 65.2, dims: 1024, maxTokens: 128000, price: "$0.12", note: "唯一原生多模态商业 API" },
  { rank: 6, name: "OpenAI text-embedding-3-large", vendor: "OpenAI", type: "api", mteb: 64.6, dims: 3072, maxTokens: 8191, price: "$0.13", note: "2024 以来无更新" },
  { rank: 7, name: "BGE-M3", vendor: "BAAI", type: "open", mteb: 63.0, dims: 1024, maxTokens: 8192, price: "Free", note: "自托管轻量首选" },
];

const EmbeddingTrack: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "api" | "open">("all");
  const filtered = EMB_DATA.filter((m) => filter === "all" || m.type === filter);

  return (
    <div>
      <TrackHeader
        num="①"
        title="Embedding 模型"
        english="text → vector"
        desc="把文字变向量的模型。MTEB 是当下事实标准 leaderboard，覆盖 56 个任务。"
      />

      <div className="flex flex-wrap gap-2 mb-4">
        {(
          [
            { id: "all", label: "全部" },
            { id: "api", label: "商业 API" },
            { id: "open", label: "开源权重" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            onClick={() => setFilter(opt.id)}
            className={[
              "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[10.5px] uppercase tracking-[0.14em] font-semibold transition-all duration-250 ease-spring",
              filter === opt.id ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-cream",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink text-cream">
              <tr>
                <Th className="w-12">#</Th>
                <Th>模型</Th>
                <Th className="hidden md:table-cell">类型</Th>
                <Th>MTEB</Th>
                <Th className="hidden lg:table-cell">维度</Th>
                <Th className="hidden lg:table-cell">最大 tokens</Th>
                <Th>价格 /1M</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr
                  key={m.name}
                  className={[
                    "border-t border-ink/12",
                    i === 0 ? "bg-butter/30" : "bg-white",
                  ].join(" ")}
                >
                  <Td className="font-mono text-[11.5px] font-bold text-ink/55">{m.rank}</Td>
                  <Td>
                    <div className="flex items-start gap-2">
                      {i === 0 && (
                        <Crown className="w-3.5 h-3.5 mt-0.5 text-coral shrink-0" strokeWidth={2.5} />
                      )}
                      <div className="min-w-0">
                        <div className="font-display text-[13px] font-bold text-ink leading-tight">
                          {m.name}
                        </div>
                        <div className="font-mono text-[10px] text-ink/45 mt-0.5">
                          {m.vendor}
                        </div>
                        {m.note && (
                          <div className="text-[11px] text-ink/55 mt-1 hidden md:block">
                            {m.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </Td>
                  <Td className="hidden md:table-cell">
                    <TypeBadge type={m.type} />
                  </Td>
                  <Td className="font-mono text-[12.5px] font-semibold text-ink">{m.mteb.toFixed(1)}</Td>
                  <Td className="hidden lg:table-cell font-mono text-[11.5px] text-ink/60">{m.dims}</Td>
                  <Td className="hidden lg:table-cell font-mono text-[11.5px] text-ink/60">
                    {m.maxTokens.toLocaleString()}
                  </Td>
                  <Td className="font-mono text-[11.5px] text-ink/70">{m.price}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] text-ink/45">
        数据来源：MTEB official leaderboard · Awesome Agents 2026/05 快照（含 retrieval 子任务）
      </p>
    </div>
  );
};

/* ============ ② Reranker 模型 ============ */

type Reranker = {
  name: string;
  vendor: string;
  kind: "api" | "open";
  scoreLabel: string; // BEIR 或 MTEB-Rerank
  highlight: string;
};

const RERANK_DATA: Reranker[] = [
  {
    name: "Cohere Rerank 4",
    vendor: "Cohere",
    kind: "api",
    scoreLabel: "★ 商业 #1",
    highlight: "100+ 语言、低门槛、生产标杆",
  },
  {
    name: "BGE-Reranker-v2-m3",
    vendor: "BAAI",
    kind: "open",
    scoreLabel: "MIT · 0.6B",
    highlight: "自托管默认选择，社区最常见",
  },
  {
    name: "Jina Reranker v3",
    vendor: "Jina AI",
    kind: "open",
    scoreLabel: "BEIR 61.85",
    highlight: "0.6B 但精度逼近 1.5B，长列表 listwise 重排",
  },
  {
    name: "Voyage rerank-2.5",
    vendor: "Voyage AI",
    kind: "api",
    scoreLabel: "API",
    highlight: "和 Voyage embedding 同源，链路最顺",
  },
  {
    name: "Qwen3-Reranker-4B",
    vendor: "Alibaba",
    kind: "open",
    scoreLabel: "Apache 2.0",
    highlight: "中英双语场景实测靠前，开源可控",
  },
  {
    name: "BGE-Reranker-v2-Gemma",
    vendor: "BAAI",
    kind: "open",
    scoreLabel: "9B · 高质量",
    highlight: "舍得上 9B 模型时的精度天花板",
  },
];

const RerankerTrack: React.FC = () => {
  return (
    <div>
      <TrackHeader
        num="②"
        title="Reranker"
        english="rerank candidates"
        desc="从向量召回的几十/几百个候选里，挑出真正最相关的几个。cross-encoder 架构吃算力，但准。"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RERANK_DATA.map((r) => (
          <article
            key={r.name}
            className="p-4 bg-cream border-2 border-ink rounded-xl shadow-stamp hover:shadow-stamp-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <TypeBadge type={r.kind} />
              <span className="font-mono text-[10px] text-ink/45">{r.scoreLabel}</span>
            </div>
            <div className="font-display text-[14px] font-bold text-ink mb-0.5 leading-tight">
              {r.name}
            </div>
            <div className="font-mono text-[10px] text-ink/45 mb-2">{r.vendor}</div>
            <p className="text-[12px] text-ink/65 leading-snug">{r.highlight}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 px-4 py-3 bg-cream border border-ink/15 rounded-xl flex items-start gap-2">
        <span className="font-mono text-[11px] font-bold text-coral mt-0.5">i</span>
        <p className="text-[11.5px] text-ink/55 leading-relaxed">
          一项 2026 行业调研显示，<strong className="text-ink/75">约 64% 的生产 RAG 系统</strong>都接了 reranker。
          排第一的开源选择是 BGE-Reranker-v2 系列，商业 API 第一是 Cohere Rerank 4。
        </p>
      </div>
    </div>
  );
};

/* ============ ③ Vector DB ============ */

type VDB = {
  name: string;
  vendor: string;
  deploy: string;
  scaleLimit: string;
  p99Latency: string; // ms at 10M vectors
  hybrid: boolean;
  bestFor: string;
};

const VDB_DATA: VDB[] = [
  {
    name: "pgvector",
    vendor: "PostgreSQL",
    deploy: "self-host / RDS / Supabase",
    scaleLimit: "≤ 50M 向量",
    p99Latency: "25-40 ms",
    hybrid: false,
    bestFor: "已经在用 Postgres、向量量级中小",
  },
  {
    name: "Pinecone",
    vendor: "Pinecone",
    deploy: "Serverless 托管",
    scaleLimit: "Billions",
    p99Latency: "10-15 ms",
    hybrid: true,
    bestFor: "完全不想运维、预算够",
  },
  {
    name: "Qdrant",
    vendor: "Qdrant",
    deploy: "self-host / cloud",
    scaleLimit: "Hundreds of M",
    p99Latency: "~12 ms",
    hybrid: true,
    bestFor: "开源里跑得最快、metadata 筛选灵活",
  },
  {
    name: "Weaviate",
    vendor: "Weaviate",
    deploy: "self-host / cloud",
    scaleLimit: "Hundreds of M",
    p99Latency: "~16 ms",
    hybrid: true,
    bestFor: "原生 BM25 + 向量混合检索",
  },
  {
    name: "Milvus / Zilliz",
    vendor: "Zilliz",
    deploy: "self-host / Zilliz Cloud",
    scaleLimit: "Billion+",
    p99Latency: "~18 ms",
    hybrid: true,
    bestFor: "亿级以上 + 分布式部署需求",
  },
  {
    name: "Chroma",
    vendor: "Chroma",
    deploy: "embedded / self-host",
    scaleLimit: "≤ 数百万",
    p99Latency: "~30 ms",
    hybrid: false,
    bestFor: "原型阶段、本地开发体验最好",
  },
];

const VectorDBTrack: React.FC = () => {
  return (
    <div>
      <TrackHeader
        num="③"
        title="Vector Database"
        english="store & search vectors"
        desc="存向量、毫秒级查最近邻、附带 metadata 筛选与权限。和传统数据库选型逻辑一样：先看规模再看运维。"
      />

      <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink text-cream">
              <tr>
                <Th>产品</Th>
                <Th className="hidden md:table-cell">部署模式</Th>
                <Th>规模上限</Th>
                <Th className="hidden lg:table-cell">p99 @ 10M</Th>
                <Th className="hidden md:table-cell">混合检索</Th>
                <Th className="hidden lg:table-cell">最适合</Th>
              </tr>
            </thead>
            <tbody>
              {VDB_DATA.map((db) => (
                <tr key={db.name} className="border-t border-ink/12 bg-white">
                  <Td>
                    <div className="flex items-start gap-2">
                      <Database className="w-3.5 h-3.5 mt-0.5 text-ink/55 shrink-0" />
                      <div>
                        <div className="font-display text-[13px] font-bold text-ink leading-tight">
                          {db.name}
                        </div>
                        <div className="font-mono text-[10px] text-ink/45 mt-0.5">{db.vendor}</div>
                      </div>
                    </div>
                  </Td>
                  <Td className="hidden md:table-cell font-mono text-[11px] text-ink/65">
                    {db.deploy}
                  </Td>
                  <Td className="text-[12px] text-ink/75">{db.scaleLimit}</Td>
                  <Td className="hidden lg:table-cell font-mono text-[11.5px] text-ink/65">
                    {db.p99Latency}
                  </Td>
                  <Td className="hidden md:table-cell">
                    <span
                      className={[
                        "inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-ink text-[10px] font-bold",
                        db.hybrid ? "bg-teal text-cream" : "bg-cream text-ink/35",
                      ].join(" ")}
                    >
                      {db.hybrid ? "✓" : "·"}
                    </span>
                  </Td>
                  <Td className="hidden lg:table-cell text-[12px] text-ink/65">{db.bestFor}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] text-ink/45">
        p99 数据为厂商公开 benchmark 与 2026 第三方对比综合，仅作量级参考
      </p>
    </div>
  );
};

/* ============ 公共小组件 ============ */

const TrackHeader: React.FC<{
  num: string;
  title: string;
  english: string;
  desc: string;
}> = ({ num, title, english, desc }) => (
  <div className="mb-5">
    <div className="flex items-baseline gap-3 mb-2">
      <span className="font-display text-[24px] font-bold text-coral">{num}</span>
      <h3 className="font-display text-[22px] font-bold text-ink">{title}</h3>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
        {english}
      </span>
    </div>
    <p className="max-w-2xl text-[13.5px] text-ink/65 leading-relaxed">{desc}</p>
  </div>
);

const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <th className={`px-3 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.16em] font-semibold ${className}`}>
    {children}
  </th>
);

const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <td className={`px-3 py-3 align-top ${className}`}>{children}</td>
);

const TypeBadge: React.FC<{ type: "api" | "open" }> = ({ type }) => (
  <span
    className={[
      "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-ink/30 font-mono text-[9.5px] uppercase tracking-[0.12em] font-semibold",
      type === "api" ? "bg-coral/15 text-coral" : "bg-teal/15 text-teal",
    ].join(" ")}
  >
    {type === "api" ? <Globe className="w-2.5 h-2.5" /> : <Tag className="w-2.5 h-2.5" />}
    {type === "api" ? "API" : "Open"}
  </span>
);

export default SectionEcosystem;
