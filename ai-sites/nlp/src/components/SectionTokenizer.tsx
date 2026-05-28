/**
 * Section 03 · 三家 tokenizer 实时对比
 *
 * NLP 第一步：把字切成 token。这是整个 pipeline 里"字 → 数"的入口。
 * 用户输一段话，并排显示 GPT-4 (cl100k_base) / GPT-4o (o200k_base) / Llama 3 (128k) 三家切法。
 *
 * 反模板：function-calling 也用 raw JSON / tab 切换，但那是协议层；这里是字符层 + 并排实时三栏。
 * 真实 tokenizer 太复杂，这里用启发式：
 *   - GPT-4 cl100k: 中文偏字级，英文按子词/词
 *   - GPT-4o o200k: 中文偏多字组合（vocab 大）
 *   - Llama 3: 跟 cl100k 接近但对非英语略好
 * 真实数字会有偏差但比例方向跟官方数据一致。
 */
import React, { useMemo, useState } from "react";

type TokenizerKey = "gpt4" | "gpt4o" | "llama3";

type TokenizerSpec = {
  key: TokenizerKey;
  label: string;
  vocab: string;
  vocabSize: string;
  /** 平均每 token 对应字符数（用于反推 token 数） · 真实近似值 */
  enChars: number;
  /** 中文每 token 对应字符数 */
  zhChars: number;
  tone: string;
  family: string;
  source: string;
};

const TOKENIZERS: TokenizerSpec[] = [
  {
    key: "gpt4",
    label: "GPT-4",
    vocab: "cl100k_base",
    vocabSize: "100,256",
    enChars: 4.0,
    zhChars: 1.05,
    tone: "bg-butter",
    family: "OpenAI · tiktoken",
    source: "tiktoken / cloudidr 2026",
  },
  {
    key: "gpt4o",
    label: "GPT-4o / o-series",
    vocab: "o200k_base",
    vocabSize: "~200,000",
    enChars: 4.8,
    zhChars: 1.6,
    tone: "bg-coral",
    family: "OpenAI · tiktoken",
    source: "OpenAI 2024 / GPT-5",
  },
  {
    key: "llama3",
    label: "Llama 3 / 4",
    vocab: "tiktoken-128k",
    vocabSize: "128,000",
    enChars: 3.94,
    zhChars: 1.3,
    tone: "bg-teal",
    family: "Meta · 100K from tiktoken + 28K 非英语",
    source: "Llama 3 paper arXiv 2407.21783",
  },
];

const TONE_TEXT: Record<string, string> = {
  "bg-butter": "text-ink",
  "bg-coral": "text-cream",
  "bg-teal": "text-cream",
};

const SAMPLES = [
  {
    label: "中文短句",
    text: "今天的天气真好，我们一起去公园散步吧。",
  },
  {
    label: "英文 + 数字",
    text: "Tokenization splits text into ~100k unique pieces.",
  },
  {
    label: "代码片段",
    text: "for i in range(10):\n  print(f'token {i}')",
  },
  {
    label: "混合多语言",
    text: "用 NLP 模型做 sentiment 分析时，accuracy 通常 ≥ 92%。",
  },
];

/* 简化 token 切分：按字符类型分组，按 tokenizer 的"字符/token 比"近似合并。
   这不是真 BPE，但比例方向跟官方文档一致；
   GPT-4o 切中文整段更长 → 同样 10 字中文 vocab 大的反而 token 少。 */
function approxTokenize(text: string, spec: TokenizerSpec): string[] {
  const tokens: string[] = [];
  let i = 0;
  const enLen = Math.max(1, Math.round(spec.enChars));
  // 中文按 spec.zhChars 字一组（1 / 1.6 / 1.3 → 取 round 1 / 2 / 1）
  const zhLen = Math.max(1, Math.round(spec.zhChars));
  while (i < text.length) {
    const ch = text[i];
    if (/\s/.test(ch)) {
      // 空格附在下一个 token 前缀（mimic Ġ）
      i++;
      continue;
    }
    if (/[\u4e00-\u9fff]/.test(ch)) {
      // 中文连串：按 zhLen 字一组
      let j = i;
      while (j < text.length && /[\u4e00-\u9fff]/.test(text[j])) j++;
      const chunk = text.slice(i, j);
      for (let k = 0; k < chunk.length; k += zhLen) {
        tokens.push(chunk.slice(k, k + zhLen));
      }
      i = j;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      // 英文字母串：取整体或按 enLen 切（模拟 subword）
      let j = i;
      while (j < text.length && /[a-zA-Z0-9]/.test(text[j])) j++;
      const word = text.slice(i, j);
      if (word.length <= enLen + 1) {
        tokens.push(word);
      } else {
        // 切成子串
        for (let k = 0; k < word.length; k += enLen) {
          const piece = word.slice(k, k + enLen);
          tokens.push(k === 0 ? piece : "▁" + piece);
        }
      }
      i = j;
      continue;
    }
    // 其它字符：单 token
    tokens.push(ch);
    i++;
  }
  return tokens;
}

const SectionTokenizer: React.FC = () => {
  const [text, setText] = useState(SAMPLES[0].text);
  const [activeSample, setActiveSample] = useState(0);

  const results = useMemo(
    () =>
      TOKENIZERS.map((spec) => ({
        spec,
        tokens: approxTokenize(text, spec),
      })),
    [text],
  );

  const charCount = [...text.replace(/\s/g, "")].length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 03</span>
          <span className="section-anchor-label">step 1 · text → tokens</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          第一道工序：把字切成 token。<br className="hidden md:block" />
          切得不一样，模型读到的根本就不是同一句话。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          输点东西看看 OpenAI 老的 cl100k、新的 o200k、和 Meta 的 Llama 3 三家切法。
          数字会跳得有点夸张 —— 越短意味着模型能在同样上下文里读更多内容、收你更少 token 费。
        </p>

        {/* 样例 chip */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SAMPLES.map((s, i) => {
            const on = i === activeSample;
            return (
              <button
                key={s.label}
                onClick={() => {
                  setActiveSample(i);
                  setText(s.text);
                }}
                className={[
                  "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp"
                    : "bg-white text-ink hover:bg-butter",
                ].join(" ")}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* 输入框 */}
        <div className="mb-6">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value.slice(0, 200));
              setActiveSample(-1);
            }}
            rows={2}
            spellCheck={false}
            className="w-full px-5 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp font-mono text-[14px] text-ink focus:outline-none resize-none leading-snug"
          />
          <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-ink/45">
            <span>≤ 200 字符 · 这是简化模拟，方向跟真实数据一致</span>
            <span className="tabular-nums">{charCount} chars</span>
          </div>
        </div>

        {/* 三栏 */}
        <div className="grid md:grid-cols-3 gap-5">
          {results.map(({ spec, tokens }) => {
            const ratio = charCount === 0 ? 0 : charCount / tokens.length;
            return (
              <div
                key={spec.key}
                className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-5"
              >
                {/* header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className={[
                        "inline-flex items-center px-2 py-0.5 rounded-md border-2 border-ink font-mono text-[10px] font-bold mb-2",
                        spec.tone,
                        TONE_TEXT[spec.tone],
                      ].join(" ")}
                    >
                      {spec.vocab}
                    </div>
                    <div className="font-display font-extrabold text-[18px] text-ink leading-tight">
                      {spec.label}
                    </div>
                    <div className="font-mono text-[10px] text-ink/50 mt-1">
                      vocab {spec.vocabSize}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-extrabold text-[28px] text-ink leading-none tabular-nums">
                      {tokens.length}
                    </div>
                    <div className="font-mono text-[10px] text-ink/50 mt-0.5">
                      tokens
                    </div>
                  </div>
                </div>

                {/* tokens */}
                <div className="min-h-[120px] flex flex-wrap gap-1.5 p-3 bg-cream border-2 border-ink/15 rounded-xl">
                  {tokens.length === 0 ? (
                    <span className="font-mono text-[11px] text-ink/35">
                      没东西可切
                    </span>
                  ) : (
                    tokens.map((t, i) => (
                      <span
                        key={`${i}-${t}`}
                        className="inline-flex items-center px-1.5 py-0.5 bg-white border border-ink/40 rounded font-mono text-[11.5px] text-ink"
                      >
                        {t === " " ? "·" : t}
                      </span>
                    ))
                  )}
                </div>

                {/* footer 指标 */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-cream border border-ink/15 rounded-lg py-2">
                    <div className="font-display font-extrabold text-[16px] text-ink tabular-nums">
                      {ratio.toFixed(2)}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mt-0.5">
                      chars / tok
                    </div>
                  </div>
                  <div className="bg-cream border border-ink/15 rounded-lg py-2">
                    <div className="font-display font-extrabold text-[16px] text-ink tabular-nums">
                      {tokens.length === 0
                        ? "—"
                        : ((tokens.length / Math.max(1, charCount)) * 100).toFixed(0) + "%"}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-wider text-ink/50 mt-0.5">
                      tok / char
                    </div>
                  </div>
                </div>

                <p className="mt-3 font-mono text-[10px] text-ink/40 leading-relaxed">
                  {spec.family}
                </p>
              </div>
            );
          })}
        </div>

        {/* 注解 */}
        <div className="mt-8 grid md:grid-cols-3 gap-4 font-sans text-[13px] text-ink/70 leading-relaxed">
          <p>
            <strong className="text-ink">vocab 越大，</strong>
            一个 token 通常能塞下越多字 —— GPT-4o 把同样的中文切短约 30%，上下文相当于变长 30%。
          </p>
          <p>
            <strong className="text-ink">Llama 3 加了 28K 非英语 token，</strong>
            英文压缩从 3.17 涨到 3.94 字/token；中文比 GPT-4o 略短但比老 cl100k 长。
          </p>
          <p>
            <strong className="text-ink">Claude 用自家 BPE 不公开本地分词器，</strong>
            想精确计数只能调 count_tokens 接口。不能拿 tiktoken 估它的账单。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionTokenizer;
