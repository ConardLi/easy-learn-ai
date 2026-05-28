/**
 * Section 07 · 陷阱 + RAG vs Long-Context
 *
 * 两部分：
 *   A. 4 个常见陷阱（初学者一上手就容易踩）
 *   B. 2026 业界最热的争论 —— 1M 上下文窗口了，还需要 RAG 吗？
 *
 * 给入门者一个清晰的现实视角作为收尾。
 */
import React, { useState } from "react";
import {
  Scissors,
  Languages,
  Filter,
  CheckCircle,
  AlertTriangle,
  Coins,
  Clock,
  Target,
  Layers,
  Lock,
} from "lucide-react";

const SectionChallenges: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">pitfalls &amp; debates</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          看起来不复杂，
          <br />
          但每个零件都有{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/55 -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">能翻车的地方</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-12">
          下面这 4 个是新手最常掉的坑，知道它们存在，至少能少走半年弯路。
        </p>

        {/* A. 陷阱卡 2x2 */}
        <div className="grid sm:grid-cols-2 gap-5 mb-20">
          <PitfallCard
            num="01"
            icon={<Scissors className="w-4 h-4" strokeWidth={2.5} />}
            title="切块切坏"
            problem="按固定字数切片，把一句话、一张表格、一段代码生生切两半。"
            fix="按段落 / 标题 / 句子结构切；切片间留 10～20% overlap；表格、代码块单独成块。"
          />
          <PitfallCard
            num="02"
            icon={<Languages className="w-4 h-4" strokeWidth={2.5} />}
            title="嵌入模型用错"
            problem="拿英文为主的 embedding（如旧版 OpenAI ada）跑中文 / 多语言语料，召回质量直接崩。"
            fix="多语场景用 BGE-M3、Qwen3-Embedding、Cohere Embed v4；专业领域用 Voyage code/finance/legal。"
          />
          <PitfallCard
            num="03"
            icon={<Filter className="w-4 h-4" strokeWidth={2.5} />}
            title="没接 reranker"
            problem="只靠向量 top-K 就给模型，召回里混着无关文档，模型很容易被带偏。"
            fix="召回 50-100 篇粗排，cross-encoder reranker 选出 top 3-5 再给 LLM。延迟可控、质量飞跃。"
          />
          <PitfallCard
            num="04"
            icon={<Target className="w-4 h-4" strokeWidth={2.5} />}
            title="没有评估"
            problem="改了 chunk size、换了 embedding、加了 reranker —— 全凭感觉，看不出效果是变好还是变差。"
            fix="搭一套小型评测集（30-50 个真实问题 + 黄金答案）。用 Ragas、TruLens 这类工具自动跑，每次改动跑一遍。"
          />
        </div>

        {/* B. RAG vs Long-Context 争论 */}
        <RagVsLongContext />

        {/* 收尾 */}
        <div className="mt-20 text-center">
          <p className="font-display text-[22px] lg:text-[28px] font-bold text-ink leading-snug max-w-2xl mx-auto mb-3">
            不是 RAG 死了，
            <br />
            是 RAG 慢慢{" "}
            <span className="relative inline-block">
              <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-6 bg-butter -z-0 rotate-1" aria-hidden />
              <span className="relative z-10">变成了基础设施</span>
            </span>
            。
          </p>
          <p className="text-[14px] text-ink/55 max-w-xl mx-auto leading-relaxed">
            当一切产品开始默认带「联网搜索」「读你的文档」「引用来源」——
            那就是 RAG 早已嵌进了它们的骨头里。
          </p>
        </div>
      </div>
    </section>
  );
};

/* ============ Pitfall Card ============ */

const PitfallCard: React.FC<{
  num: string;
  icon: React.ReactNode;
  title: string;
  problem: string;
  fix: string;
}> = ({ num, icon, title, problem, fix }) => (
  <article className="p-6 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg hover:shadow-stamp-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
    <div className="flex items-start gap-3 mb-4">
      <div className="flex items-center justify-center w-10 h-10 bg-coral text-cream border-2 border-ink rounded-full shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] font-bold text-ink/35">{num}</div>
        <h3 className="font-display text-[18px] font-bold text-ink leading-tight">{title}</h3>
      </div>
    </div>

    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-3.5 h-3.5 text-coral mt-1 shrink-0" strokeWidth={2.5} />
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-coral font-semibold mb-0.5">
            problem
          </div>
          <p className="text-[12.5px] text-ink/70 leading-relaxed">{problem}</p>
        </div>
      </div>
      <div className="flex items-start gap-2 pt-2 border-t border-ink/10">
        <CheckCircle className="w-3.5 h-3.5 text-teal mt-1 shrink-0" strokeWidth={2.5} />
        <div>
          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-teal font-semibold mb-0.5">
            fix
          </div>
          <p className="text-[12.5px] text-ink/70 leading-relaxed">{fix}</p>
        </div>
      </div>
    </div>
  </article>
);

/* ============ RAG vs Long-Context ============ */

type Dim = {
  icon: React.ReactNode;
  label: string;
  rag: string;
  lc: string;
  winner: "rag" | "lc" | "tie";
};

const DIMS: Dim[] = [
  {
    icon: <Coins className="w-3.5 h-3.5" strokeWidth={2.5} />,
    label: "成本",
    rag: "$0.0001 / query",
    lc: "$0.10～$6 / query",
    winner: "rag",
  },
  {
    icon: <Clock className="w-3.5 h-3.5" strokeWidth={2.5} />,
    label: "延迟",
    rag: "1～2 s",
    lc: "30～60 s（1M token）",
    winner: "rag",
  },
  {
    icon: <Target className="w-3.5 h-3.5" strokeWidth={2.5} />,
    label: "多事实召回",
    rag: "80～90%（+rerank）",
    lc: "50～60%（lost-in-middle）",
    winner: "rag",
  },
  {
    icon: <Layers className="w-3.5 h-3.5" strokeWidth={2.5} />,
    label: "跨文档综合推理",
    rag: "受 top-K 限制，需多跳",
    lc: "天然适合 · 一次看全",
    winner: "lc",
  },
  {
    icon: <Lock className="w-3.5 h-3.5" strokeWidth={2.5} />,
    label: "权限与审计",
    rag: "检索层天然支持",
    lc: "整库进 prompt，难以隔离",
    winner: "rag",
  },
];

const RagVsLongContext: React.FC = () => {
  const [view, setView] = useState<"split" | "verdict">("split");
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-1">
            the great 2026 debate
          </div>
          <h3 className="font-display text-[24px] lg:text-[28px] font-bold text-ink leading-tight">
            上下文窗口都 1M 了，
            <br />
            为什么还要 RAG？
          </h3>
        </div>
        <div className="flex gap-1.5 p-1 bg-cream border-2 border-ink rounded-full">
          {(
            [
              { id: "split", label: "逐维度看" },
              { id: "verdict", label: "结论" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.id}
              onClick={() => setView(opt.id)}
              className={[
                "px-3.5 py-1.5 rounded-full font-mono text-[10.5px] uppercase tracking-[0.14em] font-semibold transition-all",
                view === opt.id ? "bg-ink text-cream" : "text-ink/55 hover:text-ink",
              ].join(" ")}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {view === "split" && (
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg overflow-hidden">
          {/* 表头 */}
          <div className="grid grid-cols-12 bg-ink text-cream">
            <div className="col-span-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold">
              维度
            </div>
            <div className="col-span-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold border-l border-cream/15">
              RAG
            </div>
            <div className="col-span-4 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] font-semibold border-l border-cream/15">
              Long Context
            </div>
          </div>
          {DIMS.map((d, i) => (
            <div
              key={d.label}
              className={[
                "grid grid-cols-12 border-t border-ink/12",
                i % 2 === 0 ? "bg-cream/40" : "bg-white",
              ].join(" ")}
            >
              <div className="col-span-4 px-4 py-3.5 flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-butter border border-ink shrink-0">
                  {d.icon}
                </div>
                <span className="font-display text-[13px] font-bold text-ink">{d.label}</span>
              </div>
              <div
                className={[
                  "col-span-4 px-4 py-3.5 border-l border-ink/12 text-[12.5px] flex items-center gap-2",
                  d.winner === "rag" ? "bg-teal/12" : "",
                ].join(" ")}
              >
                {d.winner === "rag" && (
                  <span className="font-mono text-[10px] font-bold text-teal">✓</span>
                )}
                <span className="text-ink/80">{d.rag}</span>
              </div>
              <div
                className={[
                  "col-span-4 px-4 py-3.5 border-l border-ink/12 text-[12.5px] flex items-center gap-2",
                  d.winner === "lc" ? "bg-teal/12" : "",
                ].join(" ")}
              >
                {d.winner === "lc" && (
                  <span className="font-mono text-[10px] font-bold text-teal">✓</span>
                )}
                <span className="text-ink/80">{d.lc}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "verdict" && (
        <div className="bg-ink text-cream p-7 lg:p-9 rounded-2xl shadow-stamp-lg border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-4">
            the consensus · 2026
          </div>
          <p className="font-display text-[24px] lg:text-[30px] font-bold leading-tight mb-5">
            <span className="text-butter">RAG does the finding,</span>
            <br />
            <span className="text-coral">long context does the reasoning.</span>
          </p>
          <p className="text-[14.5px] text-cream/75 leading-relaxed mb-3 max-w-2xl">
            两者不是竞争，是分工 ——
            用 RAG 从千万级文档里圈出最相关的 20-50 篇，
            然后把它们一并送进长上下文窗口让模型做综合推理。
          </p>
          <p className="text-[13px] text-cream/55 leading-relaxed max-w-2xl">
            纯 long-context 只在数据 ≤ 500K tokens、查询低频、能接受高延迟的场景占优。
            一旦数据上到企业级（20M+ tokens）或要支撑高并发，<strong className="text-cream/85">RAG 是唯一可行解</strong>。
          </p>

          <div className="mt-6 pt-5 border-t border-cream/15 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Metric value="1,250×" label="RAG 比 LC 便宜" />
            <Metric value="~2 s" label="RAG 典型延迟" />
            <Metric value="64%" label="生产 RAG 接 reranker" />
            <Metric value="20M+" label="企业 KB 常见量级" />
          </div>
        </div>
      )}
    </div>
  );
};

const Metric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div>
    <div className="font-display text-[22px] font-bold text-butter leading-none mb-1">{value}</div>
    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream/55">{label}</div>
  </div>
);

export default SectionChallenges;
