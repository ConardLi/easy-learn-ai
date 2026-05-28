/**
 * Section 06 · 「2026 谁还在用 BERT」
 *
 * 6 张真实生产场景卡 —— 每张正面写「在哪用」「在干啥」「数字（带来源）」。
 * 点卡片翻面，看「为什么不用 GPT-4」具体到延迟 / 成本 / 隐私 / 任务匹配。
 *
 * 跟 Section 05 时间线分开种类：这里是 grid + flip card，不同 paradigm。
 */
import React, { useState } from "react";

type LiveCard = {
  id: string;
  scene: string;
  who: string;
  what: string;
  stat: { num: string; label: string };
  source: string;
  /** 翻面：为什么不用 GPT-4 */
  whyNotGpt4: string[];
  tone: "ink" | "coral" | "teal" | "butter";
};

const CARDS: LiveCard[] = [
  {
    id: "search",
    scene: "Google Search",
    who: "Alphabet · 2019 至今",
    what: "用 BERT 理解搜索 query 中的语序和介词，特别是长尾会话式查询。featured snippet 和正常搜索排序里都跑。",
    stat: { num: "10%", label: "英文 query 受影响（首发口径）" },
    source: "blog.google 2019-10-25",
    whyNotGpt4: [
      "Google 一天处理 80 亿次查询，调 GPT-4 API 一年成本 > 100 亿美元。",
      "搜索要求 p99 < 200 ms，GPT-4 走云端不可能。",
      "排序问题不需要生成，只要打分。BERT [CLS] 输出一个 score 就够。",
    ],
    tone: "ink",
  },
  {
    id: "minilm",
    scene: "向量召回",
    who: "all-MiniLM-L6-v2 · HF 下载榜 #1",
    what: "用 BERT 蒸馏 + sentence-transformers 损失微调出的 384 维句向量模型。任何 RAG 项目里写「from sentence_transformers」基本都跑它。",
    stat: { num: "2.59 亿", label: "HuggingFace 月下载量（2026-05）" },
    source: "presenc.ai HF 榜单 2026/05",
    whyNotGpt4: [
      "OpenAI text-embedding-3-small：1536 维，价 $0.02 / 1M tokens。",
      "MiniLM 本地跑：384 维，每条 < 1 ms CPU，永久免费。",
      "1M 条文档 + 1M 次查询，MiniLM 总成本 = 一台 c7g.large 月费 ≈ $50。",
    ],
    tone: "coral",
  },
  {
    id: "bert-base",
    scene: "研究 / 教学基线",
    who: "google-bert/bert-base-uncased",
    what: "至今 NLP 论文的默认 baseline，所有 fine-tune 教程的「入门级模型」。8 年前的论文，2026 仍在新增引用。",
    stat: { num: "6394 万", label: "HuggingFace 月下载量（HF #3）" },
    source: "huggingface.co 2026-05-14",
    whyNotGpt4: [
      "学校 GPU 实验室不会让本科生调 OpenAI API 跑作业。",
      "可复现：bert-base 权重 12 GB，下载即跑，论文实验闭环。",
      "做语言学探针（probing）实验：你要 12 层 attention 矩阵，GPT-4 不给。",
    ],
    tone: "butter",
  },
  {
    id: "rerank",
    scene: "搜索重排",
    who: "ms-marco-MiniLM-L6-v2",
    what: "向量召回 top-100 后，用 cross-encoder 把 (query, doc) 一起扔进 BERT 算精确相关度。RAG 工程默认 stack。",
    stat: { num: "5088 万", label: "HuggingFace 月下载量（HF #5）" },
    source: "presenc.ai HF 榜单 2026/05",
    whyNotGpt4: [
      "100 个候选 doc 让 GPT-4 排序 = 100 次 API 调用 / 一次查询。",
      "cross-encoder BERT GPU 上一批 100 doc < 50 ms。",
      "排序质量在 BEIR 上跟 GPT-4 评分接近，便宜 1000 倍。",
    ],
    tone: "teal",
  },
  {
    id: "modern",
    scene: "长文档 retriever",
    who: "ModernBERT (Answer.AI 2024-12)",
    what: "8,192 上下文 + RoPE + Flash Attention + 2T tokens 训练。把 6 年没人碰的 encoder 路线重新打通。",
    stat: { num: "8K", label: "上下文长度 vs 旧 BERT 的 512" },
    source: "arXiv:2412.13663 Warner et al. 2024",
    whyNotGpt4: [
      "GPT-4 调用 1K input tokens ≈ $0.03，retriever 一天跑几亿次扛不住。",
      "ModernBERT 在 ColBERT 长文档检索上 SOTA，比 GPT-4 embed API 强。",
      "可以塞进本地 8 GB GPU 跑离线索引，数据不出公司。",
    ],
    tone: "ink",
  },
  {
    id: "moderation",
    scene: "内容审核 / spam",
    who: "Discord / Gmail / 抖音内审流水线",
    what: "每条用户发言扔进微调过的 bert-base，输出有毒 / 垃圾 / 正常三分类。亿级 QPS 都跑得动。",
    stat: { num: "<10 ms", label: "BERT-base GPU 推理 p99（单条）" },
    source: "Markaicode 生产实测 / ONNX Runtime BERT 2025",
    whyNotGpt4: [
      "1 秒钟几万条新消息，GPT-4 API 排队都排不过来。",
      "审核标准要透明可审计，BERT logit 可以追溯，GPT-4 黑箱。",
      "拒绝率 / 假阳率要 A/B test，BERT 一次微调就能改决策边界。",
    ],
    tone: "coral",
  },
];

const TONE_FRONT: Record<LiveCard["tone"], string> = {
  ink: "bg-white",
  coral: "bg-white",
  teal: "bg-white",
  butter: "bg-white",
};

const TONE_ACCENT: Record<LiveCard["tone"], string> = {
  ink: "bg-ink text-cream",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  butter: "bg-butter text-ink",
};

const TONE_NUM: Record<LiveCard["tone"], string> = {
  ink: "text-ink",
  coral: "text-coral",
  teal: "text-teal",
  butter: "text-ink",
};

const SectionLiveIn2026: React.FC = () => {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-butter/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Still alive in 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              GPT-4 出来后，
              <br />
              BERT 退休了吗？
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              没有。生产环境里跑得最多的 NLP 模型还是 BERT 系：搜索、向量召回、重排、审核、长文档检索 —— GPT-4 在这些位置上一调用就破产，也太慢。点卡片翻面，看「为什么不用 GPT-4」具体到延迟与成本。
            </p>
          </div>
        </div>

        {/* 6 卡网格 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map((c) => {
            const isFlipped = flipped.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className={[
                  "relative text-left p-5 border-2 border-ink rounded-2xl transition-all duration-400 ease-spring min-h-[260px] flex flex-col",
                  isFlipped
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : `${TONE_FRONT[c.tone]} shadow-stamp hover:-translate-y-[2px] hover:shadow-stamp-hover`,
                ].join(" ")}
              >
                {/* 翻面提示 */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={[
                      "inline-flex items-center px-2 py-0.5 rounded-md border-2 font-mono text-[9.5px] font-bold tracking-wider",
                      isFlipped
                        ? "border-cream/50 text-cream/70"
                        : `border-ink/15 ${TONE_NUM[c.tone]}`,
                    ].join(" ")}
                  >
                    {isFlipped ? "WHY NOT GPT-4" : c.scene}
                  </span>
                  <span
                    className={[
                      "font-mono text-[10px] tracking-wide",
                      isFlipped ? "text-cream/55" : "text-ink/45",
                    ].join(" ")}
                  >
                    {isFlipped ? "← 翻回" : "翻面 →"}
                  </span>
                </div>

                {!isFlipped ? (
                  <>
                    <div className="font-display text-[17px] font-bold text-ink leading-tight mb-1.5">
                      {c.who}
                    </div>
                    <p className="text-[13.5px] text-ink/75 leading-relaxed mb-4 flex-1">
                      {c.what}
                    </p>
                    <div className="pt-3 border-t border-ink/10">
                      <div
                        className={[
                          "font-display text-[28px] font-bold tabular-nums leading-none mb-1",
                          TONE_NUM[c.tone],
                        ].join(" ")}
                      >
                        {c.stat.num}
                      </div>
                      <div className="font-mono text-[10.5px] text-ink/55">
                        {c.stat.label}
                      </div>
                      <div className="mt-1.5 font-mono text-[9.5px] text-ink/40">
                        来源：{c.source}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-display text-[17px] font-bold text-cream leading-tight mb-3 animate-enter-fade">
                      {c.who}
                    </div>
                    <ul className="space-y-2.5 flex-1">
                      {c.whyNotGpt4.map((r, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 animate-enter-fade"
                          style={{ animationDelay: `${i * 80}ms` }}
                        >
                          <span className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full bg-coral flex-shrink-0" />
                          <span className="text-[13px] text-cream leading-relaxed">
                            {r}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* 收尾硬规则 callout（不是鸡汤，是可执行规则） */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 lg:col-start-3">
            <div className="px-6 py-5 bg-white border-2 border-ink rounded-2xl shadow-stamp-lg">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                选 BERT 还是 GPT 的硬规则
              </div>
              <p className="font-display text-[18px] font-bold text-ink leading-snug">
                <span className="bg-butter px-1 rounded">不需要生成</span>，<span className="bg-butter px-1 rounded">QPS &gt; 100</span>，<span className="bg-butter px-1 rounded">数据要本地</span> —— 三选二就别用 GPT。
              </p>
              <p className="mt-3 text-[14px] text-ink/65 leading-relaxed">
                打分 / 分类 / 抽取 / 召回 / 排序，全是 BERT 主场。要写文章、要 chain-of-thought、要工具调用，再去找 GPT 类。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLiveIn2026;
