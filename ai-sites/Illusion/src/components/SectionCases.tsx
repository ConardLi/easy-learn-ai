/**
 * Section 04 · 真实灾难案例画廊
 *
 * 6 张卡，点击翻面看「为什么会编」。
 * 区别于上一节 quiz 选择题，这里是「卡片翻面」交互。
 *
 * 案例都是 2023-2025 真有的、被报道过的事故。每条都标了来源。
 */
import React, { useState } from "react";

type Case = {
  id: string;
  badge: string;
  who: string;
  what: string;
  why: string;
  source: string;
  tone: "pop" | "coral" | "teal" | "ink";
};

const CASES: Case[] = [
  {
    id: "mata",
    badge: "2023 · 法律",
    who: "Mata v. Avianca · 纽约州联邦法院",
    what: "律师 Schwartz 用 ChatGPT 帮写抗辩状，引了 6 个案例当判例。法官查了下 —— 6 个全是 ChatGPT 编的，连案件号、法官名都是假的。",
    why: "Schwartz 怕 ChatGPT 在编，特地问了一句「这些案例是真的吗？」ChatGPT 答「是真的，LexisNexis 上能查到」—— 这又是一次幻觉。法官最后判罚 5000 美元。",
    source: "1:22-cv-01461 (SDNY) · 2023-06-22",
    tone: "pop",
  },
  {
    id: "arxiv-id",
    badge: "学术 · 高频",
    who: "编 arXiv ID + DOI",
    what: "让模型推荐 5 篇相关论文，它会自信地给你 5 个长得像真的标题、作者、arXiv 编号、年份 —— 全套齐全，去查没一个能查到。",
    why: "模型从训练数据里学到了 arXiv ID 长什么样（2410.xxxxx）、APA 引用长什么样。「写一个看着像 arXiv ID 的字符串」对它来说不难，「确认这个 ID 真存在」却没办法做。",
    source: "GAIR-NLP Survey 2024 / 多次复现",
    tone: "coral",
  },
  {
    id: "npm-pkg",
    badge: "代码 · slopsquatting",
    who: "编 npm / pip 包名",
    what: "让 Copilot 帮写代码，它 import 了一个根本不存在的包。安全研究员发现：同一个 prompt 反复跑，模型经常编出同一个假包名。",
    why: "黑客把这种「经常被编」的包名注册成真包、塞进恶意代码 —— 叫 slopsquatting。Lasso Security 2024 实测：商用 LLM 平均 1/5 的代码引用了不存在或可被劫持的包名。",
    source: "Lasso Security 2024 · arXiv:2406.10279",
    tone: "teal",
  },
  {
    id: "air-canada",
    badge: "2024 · 商业",
    who: "Air Canada chatbot",
    what: "客户问退票政策，机器人自信地告诉他「亲属去世后 90 天内可申请退款」。客户买票后申请退款，航司拒绝 —— 因为这条政策从未存在。",
    why: "客户告上法庭，加拿大民事仲裁庭判航司败诉，必须按 chatbot 编的政策赔付。法庭原话：「公司不能用『那是 AI 说的、不算我说的』来逃责。」",
    source: "Moffatt v. Air Canada 2024-02 · CRT 仲裁",
    tone: "ink",
  },
  {
    id: "medical",
    badge: "2024 · 医疗",
    who: "编医学剂量",
    what: "JAMA Internal Medicine 2024 发表的研究：让 GPT-4 回答 39 个常见用药剂量问题，41% 的回答包含明显错误剂量、给药频率或药物相互作用。",
    why: "模型见过大量医学文本，学到了「药 + 剂量 + 单位」的语法模式，但具体哪个药该多少 mg 它没有可靠数据库，于是按「语感」编一个。患者照着用很危险。",
    source: "JAMA Intern Med 2024 · doi:10.1001/jamainternmed.2024.0838",
    tone: "pop",
  },
  {
    id: "people-quote",
    badge: "新闻 · 永恒经典",
    who: "编名人语录 + 出处",
    what: "「正如爱因斯坦所说：复利是世界第八大奇迹」—— 爱因斯坦从没说过这句话，没有任何一篇他的著作、信件、采访能找到原话。",
    why: "网上流传的语录混入了训练数据，模型记住了「名人名言 + 智慧短语」这个搭配模式，会主动给一句话配上权威出处来增加可信度。这一类幻觉的特征：句子很顺，出处很具体，去 fact-check 全是空气。",
    source: "Quote Investigator · 多次溯源未果",
    tone: "coral",
  },
];

const toneBg: Record<Case["tone"], string> = {
  pop: "bg-pop text-cream",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  ink: "bg-ink text-cream",
};

const SectionCases: React.FC = () => {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-butter-tint/30">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">cases · 真实灾难</span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-9">
          <h2 className="font-display text-display-lg text-ink leading-tight max-w-3xl">
            六个 2023-2025 真发生过的事故。<br />
            点卡片翻到背面，看它为啥编。
          </h2>
          <button
            onClick={() => setFlipped(new Set(CASES.map((c) => c.id)))}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/65 hover:text-ink px-3 py-2 border-2 border-ink rounded-full bg-white shadow-stamp hover:shadow-stamp-hover transition-all"
          >
            一键全翻
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {CASES.map((c) => {
            const isFlipped = flipped.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(c.id)}
                className="text-left bg-white border-2 border-ink rounded-3xl shadow-stamp hover:shadow-stamp-hover hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ease-spring overflow-hidden flex flex-col min-h-[280px]"
              >
                {/* 头部 badge */}
                <div className={["px-4 py-2.5 border-b-2 border-ink flex items-center justify-between", toneBg[c.tone]].join(" ")}>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] font-bold">
                    {c.badge}
                  </span>
                  <span className="font-mono text-[10px] opacity-70">
                    {isFlipped ? "↻ 翻回去" : "↻ 看为什么"}
                  </span>
                </div>

                {/* 主体 */}
                <div className="flex-1 p-4 lg:p-5">
                  <div className="font-display text-[16px] lg:text-[17px] font-bold text-ink mb-2.5 leading-tight">
                    {c.who}
                  </div>

                  {!isFlipped ? (
                    <p className="text-[13.5px] text-ink/80 leading-relaxed">
                      {c.what}
                    </p>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="px-3 py-2 bg-butter-tint border-2 border-ink rounded-lg">
                        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                          为什么会编
                        </div>
                        <p className="text-[13px] text-ink leading-relaxed">{c.why}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 来源 */}
                <div className="px-4 py-2.5 border-t-2 border-ink/10 bg-cream/60">
                  <span className="font-mono text-[10px] text-ink/55">
                    src · {c.source}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionCases;
