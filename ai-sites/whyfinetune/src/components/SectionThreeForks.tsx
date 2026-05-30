/**
 * Section 02 · Three Forks
 *
 * 三档解法的"同一题三种解"。上方任务 pill 阵列切任务，中部 3 列卡片
 * 同步显示三档分别怎么处理；底部 5 个维度切换对比 bar。
 *
 * 反 rag 站红线：不复制它的"检索拼接 demo + chunk hover"。
 * 这里走「并排 pipeline 流程图 + 维度切换」路线，不是 chunk 操作。
 *
 * 数据来源：RAG vs FT 决策框架 2026（futureagi.com）/ NovaKit 2026 /
 * Anthropic Contextual Retrieval 2024-09 / Lost in the Middle arXiv:2307.03172
 */
import React, { useState } from "react";

type ForkKey = "context" | "rag" | "finetune";
type DimKey = "dev" | "flex" | "accuracy" | "cheap" | "fast";

const TASKS = [
  {
    id: "hr",
    name: "答员工：我休几天年假？",
    note: "知识答 · 50 万字员工手册 · 半年一改",
  },
  {
    id: "review",
    name: "review 这份 80 页合同",
    note: "单文档 · 一次性 · 不复用",
  },
  {
    id: "json",
    name: "所有响应转固定 JSON schema",
    note: "教格式 · 行为类 · 长期跑",
  },
  {
    id: "news",
    name: "实时财报问答",
    note: "动态知识 · 高频更新 · 要溯源",
  },
];

const FORKS: Record<
  ForkKey,
  {
    name: string;
    sub: string;
    color: string;
    accent: string;
    steps: string[];
    dims: Record<DimKey, number>;
  }
> = {
  context: {
    name: "长 context",
    sub: "Stuff the prompt",
    color: "bg-butter",
    accent: "text-ink",
    steps: ["把全部资料贴 prompt", "模型读 N 万 token", "答 + 偶尔丢中段"],
    dims: { dev: 5, flex: 4, accuracy: 2, cheap: 1, fast: 1 },
  },
  rag: {
    name: "RAG",
    sub: "Retrieve then answer",
    color: "bg-coral",
    accent: "text-white",
    steps: ["query → embed", "向量库取 top-K", "拼 chunk + LLM 答"],
    dims: { dev: 3, flex: 5, accuracy: 4, cheap: 5, fast: 3 },
  },
  finetune: {
    name: "微调",
    sub: "Bake into weights",
    color: "bg-teal",
    accent: "text-cream",
    steps: ["收 1000+ 样本", "训一次拿权重", "直接推理 · 短 prompt"],
    dims: { dev: 1, flex: 1, accuracy: 4, cheap: 3, fast: 5 },
  },
};

const DIMS: { key: DimKey; label: string; sub: string }[] = [
  { key: "dev", label: "开发简单", sub: "几天还是几周" },
  { key: "flex", label: "灵活更新", sub: "改资料多麻烦" },
  { key: "accuracy", label: "准确度上限", sub: "答对的天花板" },
  { key: "cheap", label: "请求便宜", sub: "每千次调用花多少" },
  { key: "fast", label: "推理快", sub: "p95 延迟" },
];

/** 任务 → 三档评语（一句） */
const TASK_VERDICT: Record<string, Record<ForkKey, { tag: string; line: string }>> = {
  hr: {
    context: { tag: "勉强", line: "塞 50 万字 = 月费上千刀，且中段易丢" },
    rag: { tag: "推荐", line: "切块、嵌入、热更，新政策当天生效" },
    finetune: { tag: "别用", line: "事实灌权重，模型容易答错且不告知" },
  },
  review: {
    context: { tag: "推荐", line: "80 页 ~20 万 token，一次塞完不查不训" },
    rag: { tag: "勉强", line: "切片有损，单文档没必要走索引" },
    finetune: { tag: "别用", line: "一次性任务，训了没第二次用" },
  },
  json: {
    context: { tag: "勉强", line: "few-shot 顶 70 分，长会话开始漂" },
    rag: { tag: "别用", line: "格式不是文档，检索解决不了" },
    finetune: { tag: "推荐", line: "1000 条数据，把 schema 锁进权重" },
  },
  news: {
    context: { tag: "别用", line: "数据每小时变，prompt 永远过期" },
    rag: { tag: "推荐", line: "改一行索引就生效，能贴原文出处" },
    finetune: { tag: "别用", line: "每来新数据都重训一遍，不现实" },
  },
};

const VERDICT_STYLE: Record<
  "推荐" | "勉强" | "别用",
  { dot: string; text: string; label: string }
> = {
  推荐: { dot: "bg-teal", text: "text-teal", label: "选这档" },
  勉强: { dot: "bg-butter-deep", text: "text-ink/70", label: "凑合" },
  别用: { dot: "bg-coral", text: "text-coral", label: "别用" },
};

const SectionThreeForks: React.FC = () => {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const [dim, setDim] = useState<DimKey>("flex");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* 段标 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">three forks</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          一道题，三种解法
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-9">
          上面切任务，下面切维度。三档的流程不一样，强项不一样，掉的坑也不一样。先看清，再选。
        </p>

        {/* 顶部：任务切换 */}
        <div className="mb-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-3">
            ① 选一个任务
          </div>
          <div className="flex flex-wrap gap-2">
            {TASKS.map((t) => {
              const on = t.id === taskId;
              return (
                <button
                  key={t.id}
                  onClick={() => setTaskId(t.id)}
                  className={[
                    "px-4 py-2.5 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-stamp -translate-y-0.5"
                      : "bg-white text-ink hover:bg-butter-tint",
                  ].join(" ")}
                >
                  <div className="font-semibold text-[14px] leading-tight">
                    {t.name}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-1 uppercase tracking-[0.12em]",
                      on ? "text-butter" : "text-ink/40",
                    ].join(" ")}
                  >
                    {t.note}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 中部：三档并排卡片 */}
        <div className="grid md:grid-cols-3 gap-5 mb-10" key={taskId}>
          {(["context", "rag", "finetune"] as ForkKey[]).map((k, i) => {
            const fork = FORKS[k];
            const verdict = TASK_VERDICT[taskId][k];
            const sty = VERDICT_STYLE[verdict.tag as "推荐" | "勉强" | "别用"];
            return (
              <div
                key={k}
                className="card-stamp p-5 animate-enter-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* 标题条 */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-ink ${fork.color}`}
                    >
                      <span className={`font-display font-bold text-[14px] ${fork.accent}`}>
                        {fork.name}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-ink/40 mt-1.5 uppercase tracking-[0.12em]">
                      {fork.sub}
                    </div>
                  </div>
                  {/* 评语徽章 */}
                  <div className="flex flex-col items-end gap-1">
                    <span className={`w-3 h-3 rounded-full border-2 border-ink ${sty.dot}`} />
                    <span className={`font-mono text-[9px] uppercase tracking-[0.18em] ${sty.text}`}>
                      {sty.label}
                    </span>
                  </div>
                </div>

                {/* 流程：3 步 SVG-ish 列表 */}
                <div className="space-y-2 mb-4">
                  {fork.steps.map((s, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 px-3 py-2 bg-cream/70 border border-ink/15 rounded-lg"
                    >
                      <span className="font-mono text-[10px] text-ink/45 mt-0.5">
                        s{idx + 1}
                      </span>
                      <span className="text-[12.5px] text-ink leading-snug flex-1">
                        {s}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 任务评语 */}
                <div className="mb-4 px-3 py-2.5 border-l-4 border-ink bg-butter-tint/40 rounded-r-md">
                  <div className="text-[12.5px] text-ink/85 leading-snug">
                    {verdict.line}
                  </div>
                </div>

                {/* 高亮维度 bar */}
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45">
                      {DIMS.find((d) => d.key === dim)?.label}
                    </span>
                    <span className="font-mono text-[10px] text-ink/55">
                      {fork.dims[dim]}/5
                    </span>
                  </div>
                  <div className="h-2.5 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className={`h-full ${fork.color} transition-all duration-500 ease-spring`}
                      style={{ width: `${(fork.dims[dim] / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 底部：维度切换 */}
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 mb-3">
            ② 切维度 · 上面 3 张卡的最后一行 bar 跟着变
          </div>
          <div className="flex flex-wrap gap-2">
            {DIMS.map((d) => {
              const on = d.key === dim;
              return (
                <button
                  key={d.key}
                  onClick={() => setDim(d.key)}
                  className={[
                    "px-3.5 py-2 rounded-full border-2 border-ink transition-all duration-250 ease-spring",
                    on
                      ? "bg-pop text-white shadow-stamp -translate-y-0.5"
                      : "bg-white text-ink hover:bg-cream",
                  ].join(" ")}
                >
                  <span className="font-semibold text-[13px]">{d.label}</span>
                  <span
                    className={[
                      "ml-2 font-mono text-[10px]",
                      on ? "text-white/70" : "text-ink/40",
                    ].join(" ")}
                  >
                    {d.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 底部注脚 */}
        <p className="mt-7 font-mono text-[10px] text-ink/40">
          5 维评分基线来自 RAG vs Fine-Tuning Decision Framework（futureagi.com 2026/04）+
          NovaKit when-to-use 2026 · 维度只看相对强弱，非绝对分
        </p>
      </div>
    </section>
  );
};

export default SectionThreeForks;
