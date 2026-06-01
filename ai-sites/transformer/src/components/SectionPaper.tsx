/**
 * Section 02 · 「8 页论文 · 8 个作者 · 接住了整个 AI 产业」
 *
 * 反直觉钩子在这里放（不是 Hero）：
 *   ─ 2017-06-12 一篇 8 页论文，8 个 Google Brain 研究员，没人觉得是大事
 *   ─ 2026 年 ChatGPT / Claude / Gemini / Llama 全是它的后代
 *   ─ 8 个作者全都离开 Google，2026 年分散到几乎所有第一梯队 AI 公司
 *
 * 交互：8 个 chip 可点，看每个作者现在在哪 + 那家公司在做什么。
 * 跟 bert Section 05 时间线 / llm 6 年时间线区别：这里看的是「人」而不是「模型版本」。
 */
import React, { useState } from "react";

type Author = {
  id: string;
  /** 论文里的署名顺序，paper 里说是随机的 */
  name: string;
  /** 中文显示 */
  cn: string;
  /** 2026 年所在公司 */
  org: string;
  /** 当前职务 */
  role: string;
  /** 那家公司做啥 / 一句话 */
  what: string;
  /** 来源 */
  ref: string;
  tone: "ink" | "coral" | "teal" | "butter";
};

const AUTHORS: Author[] = [
  {
    id: "vaswani",
    name: "Ashish Vaswani",
    cn: "瓦斯瓦尼",
    org: "Essential AI",
    role: "Co-founder / CEO",
    what: "做企业 agent 模型，2024 年 Series A 拿了 $64.5M。",
    ref: "C&C Prize 2024 / Wikipedia",
    tone: "coral",
  },
  {
    id: "shazeer",
    name: "Noam Shazeer",
    cn: "沙泽尔",
    org: "Google DeepMind",
    role: "VP · Gemini 技术 co-lead",
    what: "2021 离职创立 Character.AI，2024 年 8 月被 Google 用 $27 亿 license 接回去带 Gemini。",
    ref: "CNBC 2024-08-02 / Wikipedia",
    tone: "ink",
  },
  {
    id: "parmar",
    name: "Niki Parmar",
    cn: "帕尔玛",
    org: "Essential AI",
    role: "Co-founder · Research",
    what: "和 Vaswani 一起跑 Essential AI，做企业级 transformer 的后训练。",
    ref: "C&C Prize 2024 / NEC official PDF",
    tone: "butter",
  },
  {
    id: "uszkoreit",
    name: "Jakob Uszkoreit",
    cn: "乌兹科赖特",
    org: "Inceptive",
    role: "Co-founder / CEO",
    what: "把 transformer 用在 mRNA 序列设计上，2024 年 Series A $120M。",
    ref: "Inceptive blog 2024 / NEC PDF 2024",
    tone: "teal",
  },
  {
    id: "jones",
    name: "Llion Jones",
    cn: "琼斯",
    org: "Sakana AI",
    role: "Co-founder / CTO",
    what: "东京小巧 AI lab，搞「自然演化」式模型自我进化。",
    ref: "Sakana AI blog 2024 / NEC PDF",
    tone: "coral",
  },
  {
    id: "gomez",
    name: "Aidan Gomez",
    cn: "戈麦斯",
    org: "Cohere",
    role: "Co-founder / CEO",
    what: "企业 RAG / embedding 第一梯队。2017 论文时还是多伦多大学本科实习生。",
    ref: "Cohere About 2026 / Wikipedia",
    tone: "ink",
  },
  {
    id: "kaiser",
    name: "Łukasz Kaiser",
    cn: "凯泽",
    org: "OpenAI",
    role: "Member of Technical Staff",
    what: "GPT-4 / GPT-5 训练组核心。8 个作者里少数留在大厂做研究的。",
    ref: "OpenAI staff page / NEC PDF 2024",
    tone: "butter",
  },
  {
    id: "polosukhin",
    name: "Illia Polosukhin",
    cn: "波洛苏欣",
    org: "NEAR Protocol",
    role: "Co-founder",
    what: "唯一转向 web3 的那个，做 AI agent + 区块链结算。",
    ref: "NEAR docs / Wikipedia",
    tone: "teal",
  },
];

const TONE_BG: Record<Author["tone"], string> = {
  ink: "bg-ink text-cream",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  butter: "bg-butter text-ink",
};

const SectionPaper: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("vaswani");
  const active = AUTHORS.find((a) => a.id === activeId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">One paper · Eight authors</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-5">
              一篇 8 页论文，
              <br />
              撑起了 9 年后的整个产业。
            </h2>
            <p className="text-[15px] text-ink/75 leading-relaxed mb-3">
              2017 年 6 月 12 日，8 个 Google Brain 研究员把《Attention Is All You Need》挂上 arXiv，只有 8 页正文。当时 Google 内部都没把它当大新闻 —— 论文本来是想优化机器翻译。
            </p>
            <p className="text-[15px] text-ink/75 leading-relaxed">
              2026 年，ChatGPT / Claude / Gemini / Llama / Grok / Qwen / DeepSeek 全是这套架构的后代。8 个作者全部离开 Google，分散到 7 家公司，几乎填满了今天 AI 第一梯队的名单。
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="px-5 py-4 border-2 border-ink rounded-2xl bg-butter/35">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 mb-1">
                反直觉
              </div>
              <p className="font-display text-[18px] font-bold text-ink leading-snug">
                attention 比 RNN 算得更多、更耗内存。
              </p>
              <p className="mt-2 text-[13.5px] text-ink/70 leading-relaxed">
                attention 是 O(n²)，n 个 token 要算 n² 次关系；RNN 是 O(n) 串行。但 transformer 能塞满 GPU 一次性算完，RNN 不能 —— 算法上更贵，工程上更快。
              </p>
              <p className="mt-2 font-mono text-[9.5px] text-ink/45">
                来源：arXiv:1706.03762 § 3.5 表 1
              </p>
            </div>
          </div>
        </div>

        {/* 作者 chip 阵列 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          <div className="flex items-baseline justify-between mb-5">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
              点一个作者 · 看 2026 年他在哪
            </div>
            <div className="font-mono text-[10px] text-ink/45">
              8 / 8 已离开 Google
            </div>
          </div>

          {/* chip 阵列 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
            {AUTHORS.map((a) => {
              const on = a.id === activeId;
              return (
                <button
                  key={a.id}
                  onClick={() => setActiveId(a.id)}
                  className={[
                    "px-3 py-2.5 rounded-xl border-2 border-ink font-display text-[13px] font-bold text-left transition-all duration-250 ease-spring",
                    on
                      ? `${TONE_BG[a.tone]} shadow-[3px_3px_0_0_#241C15]`
                      : "bg-white text-ink/75 hover:bg-cream hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                  ].join(" ")}
                >
                  <span className="block">{a.name}</span>
                  <span
                    className={[
                      "block font-mono text-[10px] mt-0.5",
                      on ? "opacity-75" : "text-ink/50",
                    ].join(" ")}
                  >
                    {a.cn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 当前选中详情 */}
          <div
            key={active.id}
            className="pt-6 border-t-2 border-ink/10 animate-enter-up grid lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-4">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                现在在哪
              </div>
              <div className="font-display text-[28px] font-bold text-ink leading-tight mb-1">
                {active.org}
              </div>
              <div className="font-mono text-[12px] text-ink/65">
                {active.role}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                这家公司在干啥
              </div>
              <p className="text-[15px] text-ink leading-relaxed mb-3">
                {active.what}
              </p>
              <p className="font-mono text-[10px] text-ink/45">
                来源：{active.ref}
              </p>
            </div>
          </div>

          {/* 论文小档案 */}
          <div className="mt-7 pt-5 border-t border-ink/10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="发布日期" value="2017-06-12" />
            <Stat label="正文页数" value="8 页" />
            <Stat label="arXiv id" value="1706.03762" />
            <Stat label="被引用数" value="180k+" sub="Google Scholar 2026/05" />
          </div>
        </div>
      </div>
    </section>
  );
};

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="px-3 py-3 bg-cream border-2 border-ink/15 rounded-lg">
      <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
        {label}
      </div>
      <div className="font-display text-[18px] font-bold text-ink tabular-nums leading-tight">
        {value}
      </div>
      {sub && (
        <div className="font-mono text-[9px] text-ink/40 mt-0.5">{sub}</div>
      )}
    </div>
  );
}

export default SectionPaper;
