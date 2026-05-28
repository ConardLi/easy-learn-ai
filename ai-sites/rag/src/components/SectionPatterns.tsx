/**
 * Section 05 · 5 种检索套路
 *
 * RAG 不只是「embed + search + answer」这一种。本节列 5 个从入门到进阶最常见的套路，
 * 每个配一张横向流程图，让初学者一眼看出区别。
 *
 *   ① Naive          基本款
 *   ② Query Rewrite  让 LLM 先把问题改写得更适合检索
 *   ③ HyDE           让 LLM 先编一个答案，用假答案去搜
 *   ④ Rerank         粗排召回多 → cross-encoder 精排
 *   ⑤ Multi-hop      复杂问题分多步检索
 */
import React from "react";
import { Sparkles } from "lucide-react";

type Block = { label: string; sub?: string; tone?: "ink" | "butter" | "coral" | "teal" | "cream" };

type Pattern = {
  id: string;
  num: string;
  name: string;
  english: string;
  oneLiner: string;
  blocks: Block[];
  whenToUse: string;
  tradeoff: string;
};

const PATTERNS: Pattern[] = [
  {
    id: "naive",
    num: "01",
    name: "基本款",
    english: "Naive RAG",
    oneLiner: "最朴素的一条直线：问题进来，检索，作答。所有教程的起点。",
    blocks: [
      { label: "问题", tone: "cream" },
      { label: "Embed", tone: "butter" },
      { label: "向量检索", tone: "butter" },
      { label: "LLM", tone: "ink" },
      { label: "回答", tone: "teal" },
    ],
    whenToUse: "原型期 · 文档不超过 1 万段 · 问题清晰直接",
    tradeoff: "问题表述差一点就检索不到 · 召回质量上限不高",
  },
  {
    id: "rewrite",
    num: "02",
    name: "改写问题",
    english: "Query Rewriting",
    oneLiner:
      "用户经常问得很口语化（「那个谁的电话」），先让 LLM 把问题改写成检索友好的版本。",
    blocks: [
      { label: "口语问题", tone: "cream" },
      { label: "LLM 改写", tone: "coral" },
      { label: "更清晰的 query", tone: "butter" },
      { label: "向量检索", tone: "butter" },
      { label: "LLM 答", tone: "ink" },
      { label: "回答", tone: "teal" },
    ],
    whenToUse: "用户输入参差不齐 · 多轮对话需要补省略 · 跨语言场景",
    tradeoff: "多一次 LLM 调用 · 改写错了反而召回更差",
  },
  {
    id: "hyde",
    num: "03",
    name: "假答案当钥匙",
    english: "HyDE",
    oneLiner:
      "反直觉但有效：先让 LLM 凭空编一个看起来合理的答案，然后拿这个「假答案」去检索 —— 因为答案和真文档语义更接近。",
    blocks: [
      { label: "问题", tone: "cream" },
      { label: "LLM 编一个假答案", tone: "coral" },
      { label: "用假答案做向量", tone: "butter" },
      { label: "向量检索", tone: "butter" },
      { label: "LLM 重新答", tone: "ink" },
      { label: "回答", tone: "teal" },
    ],
    whenToUse: "问答风格差距大（短问题 → 长文档）· 学术、医疗这类专业语料",
    tradeoff: "多一次 LLM 调用 · 假答案瞎编得离谱会带偏检索",
  },
  {
    id: "rerank",
    num: "04",
    name: "粗排 + 精排",
    english: "Rerank",
    oneLiner:
      "先用便宜的向量检索捞 100 篇候选，再用更精准（也更慢）的 cross-encoder 重排出真正的 top 5。",
    blocks: [
      { label: "问题", tone: "cream" },
      { label: "向量检索", tone: "butter" },
      { label: "粗排 top 100", tone: "butter" },
      { label: "Reranker 精排", tone: "coral" },
      { label: "top 5", tone: "butter" },
      { label: "LLM", tone: "ink" },
      { label: "回答", tone: "teal" },
    ],
    whenToUse: "对精度要求高 · 召回有余但 LLM 上下文紧张 · 接近生产环境",
    tradeoff: "多一次模型调用 · 延迟 +100~300ms · Reranker 服务要钱",
  },
  {
    id: "multihop",
    num: "05",
    name: "分步检索",
    english: "Multi-hop / Agentic",
    oneLiner:
      "复杂问题（「2024 年增长最快的 SaaS 公司的 CEO 是谁？」）一次检索答不上，让 LLM 自己分步：先找谁，再问什么。",
    blocks: [
      { label: "复杂问题", tone: "cream" },
      { label: "LLM 拆子问", tone: "coral" },
      { label: "检索 #1", tone: "butter" },
      { label: "LLM 续追问", tone: "coral" },
      { label: "检索 #2", tone: "butter" },
      { label: "LLM 汇总", tone: "ink" },
      { label: "回答", tone: "teal" },
    ],
    whenToUse: "多跳推理 · 跨文档综合 · 调研类任务 · 已经接近 Agent 的领域",
    tradeoff: "调用链长、延迟与成本高 · 中途任何一步偏了都会跑题",
  },
];

const SectionPatterns: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">retrieval patterns</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 RAG 不止一种长法，
          <br />
          至少有{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/50 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">5 种常见套路</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-12">
          从最朴素的「直线一条」，到给 LLM 一定自主权的「分步检索」——
          越往下越像 Agent，能解决的问题也越复杂、成本和延迟也越高。
        </p>

        <div className="space-y-6">
          {PATTERNS.map((p) => (
            <PatternRow key={p.id} pattern={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PatternRow: React.FC<{ pattern: Pattern }> = ({ pattern }) => {
  return (
    <article className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-6 lg:p-7">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* 左：标题/说明 */}
        <div className="lg:col-span-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono text-[11px] font-bold text-ink/35">{pattern.num}</span>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
              {pattern.english}
            </div>
          </div>
          <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-tight mb-3">
            {pattern.name}
          </h3>
          <p className="text-[13.5px] text-ink/70 leading-relaxed">{pattern.oneLiner}</p>
        </div>

        {/* 右：流程图 + 元信息 */}
        <div className="lg:col-span-8 space-y-4">
          <FlowDiagram blocks={pattern.blocks} />

          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <MetaPill kind="when" text={pattern.whenToUse} />
            <MetaPill kind="tradeoff" text={pattern.tradeoff} />
          </div>
        </div>
      </div>
    </article>
  );
};

/* 横向流程图：方块 + 箭头 */
const FlowDiagram: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  return (
    <div className="overflow-x-auto -mx-2 px-2 pb-1">
      <div className="flex items-center gap-1.5 min-w-fit">
        {blocks.map((b, i) => (
          <React.Fragment key={i}>
            <FlowBlock block={b} />
            {i < blocks.length - 1 && <Arrow />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const FlowBlock: React.FC<{ block: Block }> = ({ block }) => {
  const toneClass: Record<NonNullable<Block["tone"]>, string> = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-cream",
    teal: "bg-teal text-cream",
    ink: "bg-ink text-cream",
    cream: "bg-cream text-ink",
  };
  return (
    <div
      className={[
        "shrink-0 px-3 py-2 rounded-lg border-2 border-ink shadow-[3px_3px_0_0_#241C15] whitespace-nowrap",
        toneClass[block.tone ?? "cream"],
      ].join(" ")}
    >
      <span className="font-display text-[12.5px] font-bold">{block.label}</span>
    </div>
  );
};

const Arrow: React.FC = () => (
  <svg viewBox="0 0 24 12" className="shrink-0 w-5 h-3" aria-hidden>
    <path d="M0 6 L18 6" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M14 2 L20 6 L14 10" stroke="#241C15" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MetaPill: React.FC<{ kind: "when" | "tradeoff"; text: string }> = ({ kind, text }) => {
  const isWhen = kind === "when";
  return (
    <div
      className={[
        "px-3 py-2.5 rounded-xl border-2 border-ink",
        isWhen ? "bg-butter/30" : "bg-cream/60",
      ].join(" ")}
    >
      <div className="flex items-center gap-1.5 mb-1">
        {isWhen ? (
          <Sparkles className="w-3 h-3 text-ink" strokeWidth={2.5} />
        ) : (
          <span className="font-mono text-[10px] font-bold text-coral">⚠</span>
        )}
        <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 font-semibold">
          {isWhen ? "when" : "tradeoff"}
        </span>
      </div>
      <div className="text-[12px] text-ink/75 leading-snug">{text}</div>
    </div>
  );
};

export default SectionPatterns;
