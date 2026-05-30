/**
 * Section 07 · 怎么减 · 缓解手段 × 4 维优劣矩阵 + 用户偏好推荐
 *
 * 5 种主流缓解：RAG / Tool / CoVe / 拒答训练 / 低温度 + guided decoding
 * 4 维：成本（推理 token）、效果（事实保真）、延迟、通用性
 *
 * 用户给 4 维各拉权重（0 / 1 / 2 / 3），算每种手段的加权分，推荐 top-1。
 */
import React, { useMemo, useState } from "react";

type Dim = "cost" | "effect" | "latency" | "general";

type Method = {
  id: string;
  name: string;
  en: string;
  tagline: string;
  /* 4 个维度各打 0~3 分 · 越高越好 */
  scores: Record<Dim, number>;
  detail: string;
  src: string;
};

const METHODS: Method[] = [
  {
    id: "rag",
    name: "RAG 检索增强",
    en: "Retrieval-Augmented Generation",
    tagline: "先翻资料再答",
    scores: { cost: 1, effect: 3, latency: 1, general: 3 },
    detail:
      "在生成前把相关文档拉进 prompt。最稳定、最通用，业内 ground truth 方案。",
    src: "Lewis et al. arXiv:2005.11401",
  },
  {
    id: "tool",
    name: "Tool / 函数调用",
    en: "Tool-augmented inference",
    tagline: "算数学叫计算器、查实时叫搜索",
    scores: { cost: 2, effect: 3, latency: 1, general: 2 },
    detail:
      "对算术、实时数据、API 查询尤其有效。Anthropic / OpenAI 都把它作为 frontier 模型默认能力。",
    src: "Schick et al. Toolformer 2023",
  },
  {
    id: "cove",
    name: "Chain-of-Verification",
    en: "CoVe · Meta 2023",
    tagline: "让模型给自己出题、自己抓错",
    scores: { cost: 1, effect: 2, latency: 1, general: 3 },
    detail:
      "Dhuliawala 2023 论文：4 步流程让模型质疑自己的回答。在 Wiki-QA 上幻觉降 30-40%，不要外部依赖。",
    src: "arXiv:2309.11495",
  },
  {
    id: "refuse",
    name: "拒答训练",
    en: "Refusal / honesty training",
    tagline: "训出来一个会说「不知道」的模型",
    scores: { cost: 3, effect: 2, latency: 3, general: 2 },
    detail:
      "Claude 系列的核心策略。用 RLHF/DPO 把「不会要说不会」奖励出来。代价 = 在 SimpleQA 这种考记忆的榜上分会掉。",
    src: "Anthropic Constitutional AI · 2022/2024",
  },
  {
    id: "decode",
    name: "低温度 + guided decoding",
    en: "constrained decoding",
    tagline: "把生成钉死在合法形状里",
    scores: { cost: 3, effect: 1, latency: 3, general: 1 },
    detail:
      "temperature 调到 0、用 grammar / JSON schema 锁输出形状。对结构化输出有效，对开放问答几乎无效 —— 编得有自信不代表编得乱。",
    src: "Llama Guard / Outlines / OpenAI structured output",
  },
];

const DIM_LABEL: Record<Dim, { name: string; gist: string }> = {
  cost: { name: "省钱", gist: "推理 token 越少分越高" },
  effect: { name: "效果", gist: "事实保真提升幅度" },
  latency: { name: "快", gist: "新增延迟越少分越高" },
  general: { name: "通用", gist: "跨任务都能用" },
};

const SectionMitigate: React.FC = () => {
  /* 用户权重 · 默认全部 2（中等关心） */
  const [weights, setWeights] = useState<Record<Dim, number>>({
    cost: 2,
    effect: 3,
    latency: 1,
    general: 2,
  });

  const scored = useMemo(() => {
    return METHODS.map((m) => {
      const total =
        m.scores.cost * weights.cost +
        m.scores.effect * weights.effect +
        m.scores.latency * weights.latency +
        m.scores.general * weights.general;
      return { ...m, total };
    }).sort((a, b) => b.total - a.total);
  }, [weights]);

  const top = scored[0];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">mitigate · 减幻觉</span>
        </div>

        <h2 className="font-display text-display-lg text-ink leading-tight mb-3 max-w-3xl">
          没有银弹。<br />
          告诉我你最在意什么，给你挑一把对的尺子。
        </h2>
        <p className="max-w-2xl text-[15px] text-ink/70 leading-relaxed mb-9">
          5 种主流缓解手段，4 个维度都打分了。下面 4 个滑块调你最关心的维度，
          矩阵会实时重排，最上面那一行就是给你的推荐。
        </p>

        {/* 权重滑块 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 mb-7">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 mb-4">
            你最在意哪些维度？· 0 = 不重要 · 3 = 至关重要
          </div>
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
            {(Object.keys(DIM_LABEL) as Dim[]).map((d) => (
              <div key={d}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <div>
                    <span className="font-display font-bold text-[15px] text-ink mr-2">
                      {DIM_LABEL[d].name}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">
                      {DIM_LABEL[d].gist}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-[14px] tabular-nums text-pop">
                    ×{weights[d]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3}
                  step={1}
                  value={weights[d]}
                  onChange={(e) =>
                    setWeights((w) => ({ ...w, [d]: parseInt(e.target.value) }))
                  }
                  className="w-full accent-coral"
                />
                <div className="flex justify-between font-mono text-[10px] text-ink/40 mt-0.5">
                  <span>0</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 矩阵 */}
        <div className="overflow-x-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg">
          <table className="w-full text-left min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-ink bg-cream">
                <th className="px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 w-2/5">
                  手段
                </th>
                {(Object.keys(DIM_LABEL) as Dim[]).map((d) => (
                  <th
                    key={d}
                    className="px-3 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 text-center"
                  >
                    {DIM_LABEL[d].name}
                  </th>
                ))}
                <th className="px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/55 text-right">
                  总分
                </th>
              </tr>
            </thead>
            <tbody>
              {scored.map((m, idx) => {
                const isTop = idx === 0;
                return (
                  <tr
                    key={m.id}
                    className={[
                      "border-b border-ink/8 last:border-b-0 transition-colors duration-300",
                      isTop ? "bg-teal/8" : "hover:bg-butter-tint/40",
                    ].join(" ")}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 mb-0.5">
                        {isTop && (
                          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] bg-teal text-cream px-1.5 py-0.5 rounded">
                            top
                          </span>
                        )}
                        <span className="font-display font-bold text-[14.5px] text-ink">
                          {m.name}
                        </span>
                      </div>
                      <div className="font-mono text-[10px] text-ink/55 mb-1 uppercase tracking-[0.14em]">
                        {m.en}
                      </div>
                      <div className="text-[12px] text-ink/70">{m.tagline}</div>
                    </td>
                    {(Object.keys(DIM_LABEL) as Dim[]).map((d) => {
                      const s = m.scores[d];
                      return (
                        <td key={d} className="px-3 py-3.5 text-center">
                          <div className="inline-flex gap-0.5">
                            {[0, 1, 2].map((i) => (
                              <span
                                key={i}
                                className={[
                                  "w-2 h-4 rounded-sm border border-ink",
                                  i < s ? "bg-ink" : "bg-ink/8",
                                ].join(" ")}
                              />
                            ))}
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3.5 text-right">
                      <span
                        className={[
                          "font-display font-bold tabular-nums",
                          isTop ? "text-teal text-[22px]" : "text-ink text-[18px]",
                        ].join(" ")}
                      >
                        {m.total}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 推荐解释 */}
        <div className="mt-5 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-pop">
              给你的推荐
            </div>
            <div className="font-mono text-[10.5px] text-cream/55 uppercase tracking-[0.18em]">
              加权总分 {top.total}
            </div>
          </div>
          <h3 className="font-display text-[26px] lg:text-[30px] font-bold leading-tight mb-2">
            {top.name}
          </h3>
          <p className="text-[14.5px] text-cream/85 leading-relaxed mb-3">{top.detail}</p>
          <div className="pt-3 border-t border-cream/15 font-mono text-[10.5px] text-cream/45">
            src · {top.src}
          </div>
        </div>

        {/* 收尾硬规则 */}
        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          <div className="bg-butter border-2 border-ink rounded-2xl p-5 shadow-stamp">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink font-bold mb-2">
              一条用得着的硬规则
            </div>
            <p className="text-[14.5px] text-ink leading-relaxed">
              问 LLM「这个东西是真的吗？」不算 fact-check。
              它会再幻觉一次告诉你「是真的」。
              真验证要它跑到自己之外去 —— 调工具、查 KB、看 N 次采样。
            </p>
          </div>
          <div className="bg-pop/10 border-2 border-ink rounded-2xl p-5 shadow-stamp">
            <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-pop font-bold mb-2">
              一个反直觉的事实
            </div>
            <p className="text-[14.5px] text-ink leading-relaxed">
              幻觉这事，<span className="font-bold">原理上无法清零</span>。
              Xu et al. 2024 证明：只要 LLM 是「按概率生成」的，
              对没见过 / 边界外的输入总会编。能做的是降低、检测、限制后果。
            </p>
            <p className="mt-2 font-mono text-[10px] text-ink/55">
              src · arXiv:2401.11817 「Hallucination is Inevitable」
            </p>
          </div>
        </div>

        {/* 来源汇总 */}
        <div className="mt-10 pt-6 border-t-2 border-ink/10">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45 mb-2">
            2026 数据来源 · 全程没有臆测
          </div>
          <ul className="space-y-1 font-mono text-[11px] text-ink/55 leading-relaxed">
            <li>· Vectara HHEM leaderboard 2026-04-20 · vectara.com</li>
            <li>· Presenc AI Hallucination Benchmarks 2026 · presenc.ai/research</li>
            <li>· CometAPI · GPT-5.5 vs Claude Opus 4.7 · 2026-04</li>
            <li>· Artificial Analysis · AA-Omniscience · 2026-04</li>
            <li>· DeepMind FACTS Grounding 2025-12 · facts-grounding.ai</li>
            <li>· Huang et al. 2023 · arXiv:2311.05232 · A Survey on Hallucination in LLMs</li>
            <li>· Manakul et al. 2023 · SelfCheckGPT · arXiv:2303.08896</li>
            <li>· Dhuliawala et al. 2023 · CoVe · arXiv:2309.11495</li>
            <li>· Mata v. Avianca · 1:22-cv-01461 SDNY · 2023-06-22</li>
            <li>· Moffatt v. Air Canada · BC 民事仲裁庭 · 2024-02</li>
            <li>· JAMA Internal Medicine 2024 · doi:10.1001/jamainternmed.2024.0838</li>
            <li>· Lasso Security · slopsquatting · arXiv:2406.10279</li>
            <li>· Liu et al. 2023 · Lost in the Middle · arXiv:2307.03172</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SectionMitigate;
