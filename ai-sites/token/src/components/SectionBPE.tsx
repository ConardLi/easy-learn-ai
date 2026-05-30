/**
 * Section 03 · BPE 是怎么"学"出 token 表的
 *
 * 单步 trace（next / prev / reset），5 步：
 *   step 0：初始 corpus，全是单字符
 *   step 1：数所有相邻 pair 的频率，找最高频
 *   step 2：把最高频 pair 合并成新 token，加到 vocab
 *   step 3：用新 vocab 重切 corpus
 *   step 4：重复 N 次后的最终 vocab
 *
 * 反相邻：Hero 是 textarea input，§02 是 flip card grid，
 *        这里改成 单步 trace + 高亮当前 pair。完全不同。
 *
 * 真实 BPE：
 *   ─ 1994 Philip Gage 发明（数据压缩），arXiv 1508.07909 用在 NMT
 *   ─ GPT-2/3/4 都是 BPE，o200k_base 训练在 4T+ tokens 上做 ~200k 次合并
 *   ─ 这里用的是一个 toy corpus，方向跟真 BPE 完全一致，只是规模迷你
 *
 * 数据来源：
 *   ─ Sennrich et al. 2015 Neural Machine Translation of Rare Words (arXiv 1508.07909)
 *   ─ digitalocean.com/community LLM Tokenizers Simplified 2024
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

/* 一个 mini corpus：4 个常见英文词，BPE 在它们上面跑 */
type Step = {
  /* 当前 corpus 每个词的 token 序列 */
  corpus: { word: string; tokens: string[]; count: number }[];
  /* 当前 vocab：单字符 + 已合并的 */
  vocab: string[];
  /* 当前要合并的 pair（高亮），null 表示初始 */
  mergePair: [string, string] | null;
  /* pair 频率排行（前 3） */
  pairFreq: { pair: [string, string]; freq: number }[];
  /* 一句话总结 */
  caption: string;
  /* 这是第几步的 sub-title */
  title: string;
};

/* 手动算好的 5 步演化（让动画稳定） */
const INITIAL_CORPUS = [
  { word: "low", tokens: ["l", "o", "w"], count: 5 },
  { word: "lower", tokens: ["l", "o", "w", "e", "r"], count: 2 },
  { word: "newest", tokens: ["n", "e", "w", "e", "s", "t"], count: 6 },
  { word: "widest", tokens: ["w", "i", "d", "e", "s", "t"], count: 3 },
];

const STEPS: Step[] = [
  {
    title: "起点 · 全拆成单字符",
    corpus: INITIAL_CORPUS,
    vocab: ["l", "o", "w", "e", "r", "n", "s", "t", "i", "d"],
    mergePair: null,
    pairFreq: [],
    caption: "把训练语料里所有词拆成单字符，每个字符自动进 vocab。10 个字符 = 10 个起始 token。",
  },
  {
    title: "step 1 · 数 pair 频率",
    corpus: INITIAL_CORPUS,
    vocab: ["l", "o", "w", "e", "r", "n", "s", "t", "i", "d"],
    mergePair: ["e", "s"],
    pairFreq: [
      { pair: ["e", "s"], freq: 9 }, // newest 6 + widest 3
      { pair: ["s", "t"], freq: 9 }, // 同
      { pair: ["l", "o"], freq: 7 }, // low 5 + lower 2
    ],
    caption: "扫一遍每个词，数相邻 pair 出现多少次。「e·s」共 9 次（newest 6 + widest 3），并列第一。",
  },
  {
    title: "step 2 · 合并最高频 pair",
    corpus: [
      { word: "low", tokens: ["l", "o", "w"], count: 5 },
      { word: "lower", tokens: ["l", "o", "w", "e", "r"], count: 2 },
      { word: "newest", tokens: ["n", "e", "w", "es", "t"], count: 6 },
      { word: "widest", tokens: ["w", "i", "d", "es", "t"], count: 3 },
    ],
    vocab: ["l", "o", "w", "e", "r", "n", "s", "t", "i", "d", "es"],
    mergePair: ["es", null as any],
    pairFreq: [
      { pair: ["es", "t"], freq: 9 },
      { pair: ["l", "o"], freq: 7 },
      { pair: ["o", "w"], freq: 7 },
    ],
    caption: "把「e·s」合成新 token「es」加进 vocab，重切 corpus。newest → n · e · w · es · t。vocab 长 1。",
  },
  {
    title: "step 3 · 继续合并",
    corpus: [
      { word: "low", tokens: ["lo", "w"], count: 5 },
      { word: "lower", tokens: ["lo", "w", "e", "r"], count: 2 },
      { word: "newest", tokens: ["n", "e", "w", "est"], count: 6 },
      { word: "widest", tokens: ["w", "i", "d", "est"], count: 3 },
    ],
    vocab: [
      "l", "o", "w", "e", "r", "n", "s", "t", "i", "d", "es", "est", "lo",
    ],
    mergePair: ["est", null as any],
    pairFreq: [
      { pair: ["lo", "w"], freq: 7 },
      { pair: ["n", "e"], freq: 6 },
      { pair: ["e", "w"], freq: 6 },
    ],
    caption: "再合两次：「es+t → est」「l+o → lo」。注意 newest 现在只剩 4 个 token，比起点的 6 个短了。",
  },
  {
    title: "step 4 · vocab 变大，词变短",
    corpus: [
      { word: "low", tokens: ["low"], count: 5 },
      { word: "lower", tokens: ["low", "er"], count: 2 },
      { word: "newest", tokens: ["new", "est"], count: 6 },
      { word: "widest", tokens: ["wid", "est"], count: 3 },
    ],
    vocab: [
      "l", "o", "w", "e", "r", "n", "s", "t", "i", "d",
      "es", "est", "lo", "low", "er", "new", "wid",
    ],
    mergePair: null,
    pairFreq: [],
    caption: "再跑几轮 → 「low」「new」「est」「wid」「er」 全成单 token。原本 6 个字符的 newest 现在只用 2 个 token。",
  },
];

/* 真 BPE 跑 ~200k 步后就有 GPT-4o 的 o200k_base */
const SectionBPE: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const step = STEPS[cursor];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 03</span>
          <span className="section-anchor-label">algorithm · BPE in 5 steps</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          tokenizer 不是手写的。它是数出来的。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          BPE = Byte Pair Encoding。
          每一步都做一件事：找语料里出现最多的相邻字符对，把它们粘成一个新 token。
          下面 4 个词的迷你 corpus 跑 5 步，看 vocab 怎么从 10 个字符长出常用词的样子。
        </p>

        {/* 主卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8">
          {/* header · 进度 + step title */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                step {cursor} / {STEPS.length - 1}
              </div>
              <div className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-tight">
                {step.title}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCursor((c) => Math.max(0, c - 1))}
                disabled={cursor === 0}
                className="w-10 h-10 rounded-full bg-cream border-2 border-ink shadow-stamp text-ink flex items-center justify-center hover:bg-butter disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="prev"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setCursor((c) => Math.min(STEPS.length - 1, c + 1))}
                disabled={cursor === STEPS.length - 1}
                className="w-10 h-10 rounded-full bg-ink border-2 border-ink shadow-stamp text-cream flex items-center justify-center hover:translate-x-0.5 hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-transform"
                aria-label="next"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setCursor(0)}
                className="w-10 h-10 rounded-full bg-white border-2 border-ink shadow-stamp text-ink flex items-center justify-center hover:bg-coral hover:text-cream transition-colors"
                aria-label="reset"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* 进度小条 */}
          <div className="flex gap-1 mb-7">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={[
                  "h-1.5 flex-1 rounded-full border border-ink/15 transition-colors",
                  i <= cursor ? "bg-ink" : "bg-cream",
                ].join(" ")}
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* 左：corpus · token 序列 */}
            <div className="lg:col-span-7" key={`corpus-${cursor}`}>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① corpus · 4 个词每个被切成 token
              </div>
              <div className="space-y-2.5">
                {step.corpus.map((row) => (
                  <div
                    key={row.word}
                    className="flex items-center gap-3 bg-cream border-2 border-ink/15 rounded-xl px-3 py-2.5"
                  >
                    <div className="font-mono text-[10.5px] text-ink/55 tabular-nums w-12 flex-shrink-0">
                      ×{row.count}
                    </div>
                    <div className="font-display text-[14.5px] font-bold text-ink w-20 flex-shrink-0">
                      {row.word}
                    </div>
                    <div className="flex flex-wrap gap-1 flex-1">
                      {row.tokens.map((t, ti) => {
                        const isMerged = t.length > 1;
                        const isPairLeft =
                          step.mergePair &&
                          step.mergePair[0] === t &&
                          ti < row.tokens.length - 1 &&
                          row.tokens[ti + 1] === step.mergePair[1];
                        const isPairRight =
                          step.mergePair &&
                          ti > 0 &&
                          row.tokens[ti - 1] === step.mergePair[0] &&
                          step.mergePair[1] === t;
                        const highlight = isPairLeft || isPairRight;
                        return (
                          <span
                            key={ti}
                            className={[
                              "inline-flex items-center px-2 py-1 rounded-md border-2 border-ink font-mono text-[11.5px] font-bold leading-none transition-all",
                              isMerged
                                ? "bg-coral text-cream shadow-[2px_2px_0_0_#241c15]"
                                : "bg-white text-ink",
                              highlight ? "scale-110 -translate-y-0.5" : "",
                            ].join(" ")}
                          >
                            {t}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* 当前 step caption */}
              <p className="mt-5 font-sans text-[14px] text-ink/85 leading-relaxed">
                {step.caption}
              </p>
            </div>

            {/* 右：vocab + pair freq */}
            <div className="lg:col-span-5 space-y-5">
              {/* pair freq · 仅 step 1 / 2 / 3 有意义 */}
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  ② 当前最频繁 pair（top 3）
                </div>
                <div className="space-y-2">
                  {step.pairFreq.length === 0 ? (
                    <div className="bg-cream border border-ink/15 rounded-lg px-3 py-3 font-mono text-[11px] text-ink/45">
                      {cursor === 0
                        ? "还没数过 · 按下一步开始"
                        : "vocab 长大到一定程度后不再扫"}
                    </div>
                  ) : (
                    step.pairFreq.map((pf, i) => {
                      const isWinner = i === 0;
                      return (
                        <div
                          key={i}
                          className={[
                            "flex items-center justify-between px-3 py-2 rounded-lg border-2 transition-colors",
                            isWinner
                              ? "bg-butter border-ink shadow-[2px_2px_0_0_#241c15]"
                              : "bg-white border-ink/20",
                          ].join(" ")}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-ink/30 font-mono text-[11px] font-bold">
                              {pf.pair[0]}
                            </span>
                            <span className="font-mono text-[10px] text-ink/55">+</span>
                            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-white border border-ink/30 font-mono text-[11px] font-bold">
                              {pf.pair[1]}
                            </span>
                          </div>
                          <div className="font-mono text-[12px] font-bold text-ink tabular-nums">
                            {pf.freq}
                            {isWinner && (
                              <span className="ml-1.5 font-mono text-[9px] uppercase tracking-wider text-ink/55">
                                ← 合
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* vocab */}
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ③ vocab · 已学到的 token
                  </div>
                  <div className="font-mono text-[11px] text-ink/55 tabular-nums">
                    {step.vocab.length} 个
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 p-3 bg-cream border-2 border-ink/15 rounded-xl min-h-[80px]">
                  {step.vocab.map((v, i) => {
                    const isNew = v.length > 1;
                    return (
                      <span
                        key={`${cursor}-${i}-${v}`}
                        className={[
                          "inline-flex items-center px-1.5 py-0.5 rounded border-2 border-ink font-mono text-[11px] font-bold leading-none",
                          isNew ? "bg-teal text-cream" : "bg-white text-ink",
                        ].join(" ")}
                      >
                        {v}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 底部 takeaway */}
          {cursor === STEPS.length - 1 && (
            <div className="mt-7 pt-5 border-t border-ink/10 grid sm:grid-cols-3 gap-4 text-[13px] text-ink/75 leading-relaxed">
              <p>
                <strong className="text-ink">规模 ×40,000：</strong>
                真 BPE 不是合 7 次，是合 ~200,000 次。最后的 vocab 就是 GPT-4o 用的 o200k_base。
              </p>
              <p>
                <strong className="text-ink">合的顺序固定：</strong>
                vocab 跟「merges 表」一起出货。同样语料 + 同样表 = 同样切分，每次都一样。
              </p>
              <p>
                <strong className="text-ink">语料决定一切：</strong>
                训 BPE 时英文多，「the」就是 1 token；中文少，「今天」就要 2 token。后期想改？得重训。
              </p>
            </div>
          )}

          {/* 来源 */}
          <p className="mt-5 font-mono text-[10px] text-ink/40">
            来源：Sennrich et al. arXiv:1508.07909 · OpenAI tiktoken o200k_base · 200,000 次合并
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionBPE;
