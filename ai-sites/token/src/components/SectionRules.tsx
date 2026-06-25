/**
 * Section 07 · 给开发者的 5 条硬规则
 *
 * 收尾 callout 三选一：反直觉数字事实 / 可执行操作建议 / 不容妥协硬规则。
 * 这里 5 条全是「可执行 + 反直觉数字」混合 —— 不写鸡汤、不写"掌握 token 是未来必备能力"。
 *
 * 反相邻：§06 是 pill + bar，这里改用 accordion 折叠展开。
 *
 * 数据来源：
 *   ─ Claude 4.7 tokenizer 涨 35%：maxbit.cc / Decrypt 2026/05
 *   ─ GPT-4o 中文 1.4× 便宜：machinelearningplus.com / 微软 techcommunity
 *   ─ 数字超过 3 位被切：lucven.com Tokenization Math 2024
 *   ─ Anthropic 不公开本地 tokenizer：futureagi.com 2026
 *   ─ tiktoken Rust 实现：openai/tiktoken
 */
import React, { useState } from "react";
import { Plus, Minus, ExternalLink } from "lucide-react";

type Rule = {
  key: string;
  num: string;
  short: string;
  detail: string;
  evidence: string;
  source: string;
};

const RULES: Rule[] = [
  {
    key: "claude-4-7",
    num: "01",
    short: "Claude 4.7 改了 tokenizer，账单可能默默涨 35%。",
    detail:
      "Anthropic 2026/05 出 Claude Opus 4.7 时配了新 tokenizer。$/M token 价格表没变，但同一段文字切出来的 token 数比 4.6 多最高 35%。如果你按上个月的预算续费，发票会教你重新读一遍。",
    evidence:
      "迁移前先用 count_tokens API 拿真实 token 数对账。不要拿 tiktoken cl100k_base 估 Claude —— 词表完全不同。",
    source: "maxbit.cc / Decrypt 2026/05 · Anthropic docs build-with-claude/token-counting",
  },
  {
    key: "gpt4o-chinese",
    num: "02",
    short: "中文用 GPT-4o 比 GPT-4 便宜 1.4×。",
    detail:
      "o200k_base 词表里塞了大量中日韩多字组合。同样 1000 字中文，cl100k_base 切出 ~1100 token，o200k_base 只切 ~800。换模型即省 30%，比任何 prompt 优化都管用。",
    evidence:
      "中文为主的产品：默认用 o200k 系列（GPT-4o / GPT-5 / o3）。不要在 GPT-3.5 上做中文重业务。",
    source: "machinelearningplus.com tiktoken benchmark · Microsoft techcommunity o200k_base",
  },
  {
    key: "numbers",
    num: "03",
    short: "超过 3 位的数字会被切碎 —— 让 LLM 自己算就是赌博。",
    detail:
      "1234 切成「1 + 234」，12345 切成「12 + 345」，几乎随机。「9.11 > 9.9」是因为「.11」「.9」是两个不同 token，模型只见过它们在版本号里出现，没见过当小数比较。",
    evidence:
      "金融 / 报表 / 数学场景必须接 code interpreter 或 function calling。提示词里要它「按字符拆分再算」能救一部分。",
    source: "lucven.com Tokenization Math 2024 · OpenAI o1 release notes 2024/09",
  },
  {
    key: "output-expensive",
    num: "04",
    short: "输出 token 是输入的 4-6 倍贵 —— 让它「简短回答」是真省钱。",
    detail:
      "GPT-5.5 输入 $5/M，输出 $30/M（6×）。Claude Opus 4.7 输入 $5/M，输出 $25/M（5×）。一次 token 限制 1500 vs 5000，账单差 3 倍多。",
    evidence:
      "system prompt 里写「不超过 3 句话 / 不超过 200 字」比写「请简洁」管用。需要长输出就上 DeepSeek V4 Pro（输出 $0.87/M）。",
    source: "ofox.ai 2026/05 · stochasticsandbox.com 2026-05-23",
  },
  {
    key: "anthropic-no-local",
    num: "05",
    short: "Anthropic 不公开本地 tokenizer · 想精确算账只能调 API。",
    detail:
      "OpenAI 的 tiktoken 开源，Llama 的 SentencePiece 跟权重一起发，连 DeepSeek 都开源。Anthropic 是唯一不发本地 tokenizer 的 —— 想精确数 Claude 的 token，只能调 messages.count_tokens 接口。",
    evidence:
      "成本看板把 count_tokens 调用包成 middleware。不要用 character / 4 估，会差到 15%。",
    source: "Anthropic docs 2026 · futureagi.com What is Tokenization in LLMs 2026",
  },
];

const SectionRules: React.FC = () => {
  const [open, setOpen] = useState<string | null>("claude-4-7");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 07</span>
          <span className="section-anchor-label">rules · 五条不容妥协</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          做产品之前，先把这 5 条钉墙上。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-3">
          每条都是真账单或真事故里来的。点开看具体做法。
        </p>
        <p className="font-sans text-[13.5px] text-ink/55 max-w-2xl mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] bg-cream border-2 border-ink rounded px-2 py-0.5 text-ink mr-2">进阶</span>
          这一节面向打算用 API 做产品的人。只用 ChatGPT 网页版的话，看个大概就行。
        </p>

        {/* accordion */}
        <div className="space-y-3">
          {RULES.map((r) => {
            const isOpen = open === r.key;
            return (
              <div
                key={r.key}
                className={[
                  "border-2 border-ink rounded-3xl transition-all duration-300 ease-spring overflow-hidden",
                  isOpen
                    ? "bg-white shadow-stamp-lg"
                    : "bg-white shadow-stamp hover:shadow-stamp-lg",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : r.key)}
                  className="w-full text-left p-5 lg:p-6 flex items-start gap-4"
                >
                  <span
                    className={[
                      "flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-ink font-mono text-[12px] font-bold transition-colors",
                      isOpen ? "bg-ink text-cream" : "bg-butter text-ink",
                    ].join(" ")}
                  >
                    {r.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[17px] lg:text-[19px] font-bold text-ink leading-snug">
                      {r.short}
                    </div>
                  </div>
                  <span
                    className={[
                      "flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-ink transition-colors",
                      isOpen ? "bg-coral text-cream" : "bg-cream text-ink",
                    ].join(" ")}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2.5} />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 lg:px-6 pb-6 pl-[68px] lg:pl-[76px]">
                    <p className="font-sans text-[14.5px] text-ink/80 leading-relaxed mb-4">
                      {r.detail}
                    </p>
                    <div className="p-3.5 bg-cream border-2 border-ink/15 rounded-xl">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                        怎么做
                      </div>
                      <p className="font-sans text-[13.5px] text-ink leading-relaxed">
                        {r.evidence}
                      </p>
                    </div>
                    <p className="mt-3 font-mono text-[10px] text-ink/40">
                      {r.source}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 落款 */}
        <div className="mt-16 pt-10 border-t border-ink/15 max-w-3xl">
          <p className="font-display text-[18px] font-bold text-ink leading-snug mb-3">
            模型从头到尾只看 token id。
          </p>
          <p className="font-sans text-[14.5px] text-ink/70 leading-relaxed">
            你写的字它看不见，你的标点它看不见，连「strawberry 里有三个 r」它都看不见。
            它能聊得这么像人，是几百亿个 token id 在脑子里一起转的结果。
            搞懂切分器，你就知道账单为啥涨、为啥模型数不对字母 —— 这两件事都跟切法有关。
          </p>
        </div>

        <a
          href="../model-inference/index.html"
          className="mt-7 flex items-start gap-3 max-w-3xl px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink">Token 切好以后，模型怎么把回答写出来？</span>
            <span className="text-ink/70"> 去《模型推理》亲手推进一次生成循环。</span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionRules;
