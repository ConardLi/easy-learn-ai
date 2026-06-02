/**
 * Section 02 · 同一个问题，两种回答
 *
 * 让初学者直观感受：同样的问题，光问 LLM vs 给 LLM 配上 RAG，差距有多大。
 * 三个真实场景：时效性、企业私域、长文档。
 */
import React, { useState } from "react";
import { CalendarClock, Building2, FileSearch, AlertTriangle, CheckCircle2, FileText } from "lucide-react";

type Scene = {
  id: string;
  icon: React.ReactNode;
  tag: string;
  question: string;
  llmOnly: { answer: string; problem: string; problemTag: string };
  llmWithRag: { answer: string; sources: string[] };
};

const SCENES: Scene[] = [
  {
    id: "time",
    icon: <CalendarClock className="w-4 h-4" strokeWidth={2.5} />,
    tag: "时效性",
    question: "今天 1 美元换多少人民币？",
    llmOnly: {
      answer:
        "根据我的数据，1 美元大约在 7.2 元人民币左右。但请注意，汇率每天都会变化，具体请以银行实时报价为准。",
      problem: "训练数据截止在过去，没有今天的汇率",
      problemTag: "知识过期",
    },
    llmWithRag: {
      answer: "今天 1 美元 = 7.18 元人民币（中间价）。今日波动区间 7.16 ～ 7.19。",
      sources: ["xe.com · 2026-05-28 实时报价", "中国外汇交易中心 · 中间价公告"],
    },
  },
  {
    id: "private",
    icon: <Building2 className="w-4 h-4" strokeWidth={2.5} />,
    tag: "企业私域",
    question: "我们公司 2025 Q4 的营收是多少？",
    llmOnly: {
      answer:
        "我无法访问贵公司的内部财务数据。如果是上市公司，可以查询其季度财报；如果是非上市公司，可能需要咨询财务部门。",
      problem: "训练数据里完全不存在你公司的内部材料",
      problemTag: "未见过的私有数据",
    },
    llmWithRag: {
      answer:
        "2025 Q4 营收 ¥2.41 亿元，同比 +18%。主要由 SaaS 订阅业务驱动（占比 64%）。",
      sources: ["内部财报 Q4-2025.pdf · 第 3 页", "财务月报 2025-12.xlsx · Sheet「合并」"],
    },
  },
  {
    id: "longdoc",
    icon: <FileSearch className="w-4 h-4" strokeWidth={2.5} />,
    tag: "长文档定位",
    question: "我们的 API 文档里，速率限制是多少？",
    llmOnly: {
      answer:
        "API 速率限制通常根据计费方案不同有所不同，常见的方案是免费版 60 req/min、付费版 1000 req/min。具体数值请查看你们的 API 文档。",
      problem: "只能给通用经验，无法给「你们」的具体数字",
      problemTag: "缺少特定上下文",
    },
    llmWithRag: {
      answer:
        "你们的速率限制：免费版 30 req/min、专业版 600 req/min、企业版可协商上限。超出会返回 429，并在 Header 里附带 Retry-After。",
      sources: ["docs/api/rate-limit.md · 第 12-24 行"],
    },
  },
];

const SectionContrast: React.FC = () => {
  const [activeId, setActiveId] = useState(SCENES[0].id);
  const active = SCENES.find((s) => s.id === activeId)!;

  return (
    <section className="relative bg-white border-y-2 border-ink px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">side by side</span>
        </div>

        {/* H2 */}
        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 LLM，配不配资料库，
          <br />
          答案可以{" "}
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-coral/50 -z-0 rotate-1" aria-hidden />
            <span className="relative z-10">差很多</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-4">
          切换下面三个问题，看看「只问模型」和「先查再答」的差别 ——
          这就是 RAG 想解决的问题。
        </p>
        <p className="max-w-2xl text-ink/65 text-[15px] mb-12">
          没有资料时，模型答不上又不想空着，就容易一本正经地编一个 ——
          这叫<strong className="text-ink/85">幻觉（hallucination）</strong>。下面左边那些「看着像对、其实没依据」的回答就是它。
          {" "}
          <a
            href="../illusion/index.html"
            className="font-semibold text-ink underline decoration-coral/40 underline-offset-2 hover:decoration-coral transition-colors"
          >
            它为什么会编、怎么检测 →《模型幻觉》
          </a>
        </p>

        {/* 场景切换 */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {SCENES.map((s) => {
            const on = s.id === activeId;
            return (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={[
                  "inline-flex items-center gap-2 px-4 py-2.5 rounded-full border-2 border-ink font-mono text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter/40",
                ].join(" ")}
              >
                {s.icon}
                <span>{s.tag}</span>
              </button>
            );
          })}
        </div>

        {/* 问题 */}
        <div className="mb-6 px-5 py-4 bg-butter/40 border-2 border-ink rounded-2xl shadow-stamp">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
            提问 · question
          </div>
          <p className="font-display text-[20px] lg:text-[24px] font-bold text-ink leading-snug">
            {active.question}
          </p>
        </div>

        {/* 两个回答并排 */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* 左：LLM-only */}
          <AnswerCard
            kind="bad"
            title="只问 LLM"
            subtitle="LLM ONLY · 模型独自作答"
            body={active.llmOnly.answer}
          >
            <div className="mt-5 pt-4 border-t border-ink/12">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-coral mt-0.5 shrink-0" strokeWidth={2.5} />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral font-semibold mb-1">
                    {active.llmOnly.problemTag}
                  </div>
                  <p className="text-[13px] text-ink/65 leading-relaxed">
                    {active.llmOnly.problem}
                  </p>
                </div>
              </div>
            </div>
          </AnswerCard>

          {/* 右：LLM + RAG */}
          <AnswerCard
            kind="good"
            title="LLM + RAG"
            subtitle="RAG · 先查资料再作答"
            body={active.llmWithRag.answer}
          >
            <div className="mt-5 pt-4 border-t border-ink/12">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal mt-0.5 shrink-0" strokeWidth={2.5} />
                <div className="flex-1">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-teal font-semibold mb-2">
                    引用来源 · sources
                  </div>
                  <ul className="space-y-1.5">
                    {active.llmWithRag.sources.map((src, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[12.5px] text-ink/70 leading-relaxed"
                      >
                        <FileText className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ink/40" />
                        <span className="font-mono">{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnswerCard>
        </div>

        {/* footnote */}
        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
          RAG 没有让模型变聪明 · 只是让它有了可查的资料柜
        </p>
      </div>
    </section>
  );
};

/* 回答卡片：bad = 红边框、good = teal 边框 */
const AnswerCard: React.FC<{
  kind: "good" | "bad";
  title: string;
  subtitle: string;
  body: string;
  children?: React.ReactNode;
}> = ({ kind, title, subtitle, body, children }) => {
  const accent = kind === "good" ? "bg-teal" : "bg-coral";
  return (
    <div className="relative bg-white border-2 border-ink rounded-2xl shadow-stamp-lg overflow-hidden">
      {/* 顶部彩条 */}
      <div className={`${accent} h-2 border-b-2 border-ink`} />
      <div className="p-6">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-display text-[18px] font-bold text-ink">{title}</h3>
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/45">
            {subtitle}
          </span>
        </div>
        <p className="text-[14.5px] text-ink/80 leading-relaxed mt-3">{body}</p>
        {children}
      </div>
    </div>
  );
};

export default SectionContrast;
