/**
 * Section 03 · 第一步：把字切成 token（速览，详见 Token 站）
 *
 * 大瘦身版：本节跟邻居 token 站撞车 60-70%。
 * 这里只交代「管线第一步是切；三家切法不同；细节去 Token 站」。
 *
 * 反模板：原来是三家并排实时切分演示。本版只放三张静态名片 + 一条 takeaway。
 */
import React from "react";
import { ExternalLink } from "lucide-react";

type TokenizerCard = {
  key: string;
  label: string;
  vocab: string;
  oneLine: string;
  tone: string;
  textTone: string;
};

const CARDS: TokenizerCard[] = [
  {
    key: "gpt4",
    label: "GPT-4（老）",
    vocab: "cl100k_base · ~10 万种块",
    oneLine: "中文切得最碎 —— 一个汉字常常算一个 token。",
    tone: "bg-butter",
    textTone: "text-ink",
  },
  {
    key: "gpt4o",
    label: "GPT-4o / o-series",
    vocab: "o200k_base · ~20 万种块",
    oneLine: "中文压缩最猛 —— 同样一段中文 token 数比 cl100k 少约 30%。",
    tone: "bg-coral",
    textTone: "text-cream",
  },
  {
    key: "llama3",
    label: "Llama 3 / 4",
    vocab: "tiktoken 风 · ~12.8 万",
    oneLine: "Meta 自家扩了 2.8 万个非英语 token，多语言比 OpenAI 老版好。",
    tone: "bg-teal",
    textTone: "text-cream",
  },
];

const SectionTokenizer: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 03</span>
          <span className="section-anchor-label">step 1 · text → tokens</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          第一步：把字切成 token<br className="hidden md:block" />
          （速览，详见 Token 站）
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          NLP 管线的第一步：先把你打的字切成一块一块（每块就叫 token）。
          切法每家厂商都自己搞一套，切得不一样，模型读到的就不是同一句话。
          下面三家最常见 —— 一张卡一句话。
        </p>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {CARDS.map((c) => (
            <div
              key={c.key}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 flex flex-col"
            >
              <div
                className={[
                  "inline-flex items-center self-start px-2.5 py-0.5 rounded-md border-2 border-ink font-mono text-[10px] font-bold mb-3",
                  c.tone,
                  c.textTone,
                ].join(" ")}
              >
                {c.vocab}
              </div>
              <div className="font-display font-extrabold text-[19px] text-ink leading-tight mb-2">
                {c.label}
              </div>
              <p className="font-sans text-[13.5px] text-ink/75 leading-relaxed">
                {c.oneLine}
              </p>
            </div>
          ))}
        </div>

        {/* takeaway 行 */}
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 mb-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
            一句话拿走
          </div>
          <p className="font-sans text-[14.5px] text-ink leading-relaxed">
            <strong className="text-ink">切法变了，token 数就变了，账单也跟着变。</strong>
            {" "}
            同一段中文，cl100k_base 切出来比 o200k_base 多约 30%；同样 1 美元，o200k 能多读三成内容。
            Anthropic 的 Claude 切法不公开，想精确数它的 token 只能调它自家的 count_tokens 接口。
          </p>
        </div>

        {/* 链 Token 站 */}
        <a
          href="../token/index.html"
          className="inline-flex items-start gap-3 max-w-2xl px-5 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
        >
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
            <ExternalLink className="w-4 h-4 text-ink" strokeWidth={2.4} />
          </span>
          <span className="font-sans text-[14px] leading-[1.6] text-ink/85">
            <span className="font-bold text-ink font-display text-[15px]">完整切分演示 + BPE 怎么学出来 + 按 token 计费</span>
            <span className="block mt-1 text-ink/70 font-serif italic">
              去《Token》那一站，有 live 切分器 + 7 个边缘案例 + 价格计算器。
            </span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default SectionTokenizer;
