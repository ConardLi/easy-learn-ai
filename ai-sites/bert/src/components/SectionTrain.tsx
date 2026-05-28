/**
 * Section 03 · 「BERT 是怎么练出来的」
 *
 * 两个并列子交互（避免跟 Section 02 用同一种 pill）：
 *   ─ 左：MLM 单步 trace（6 步走完一次 forward + loss）
 *   ─ 右：NSP 你来判断 —— 选「相连/不相连」，看 BERT 的答案 + RoBERTa 后来去掉它的原因
 *
 * NSP（Next Sentence Prediction）：BERT 原版的第二个训练任务，后来 RoBERTa 实验证明 NSP 对下游
 * 效果几乎没贡献，于是 RoBERTa / ALBERT / DeBERTa 都把它去掉。来源：arXiv:1907.11692 § 4.4。
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

/* ─── MLM trace 6 步 ─── */
type StepKey =
  | "raw"
  | "tokenize"
  | "specials"
  | "mask"
  | "predict"
  | "loss";

type Step = {
  key: StepKey;
  title: string;
  caption: string;
  /** 渲染句子的方式 —— 每一步换一种 token 列表 */
  tokens: { text: string; tone: "ink" | "butter" | "coral" | "teal" | "mask" }[];
  /** 步骤右下的小注释 */
  note: string;
};

const STEPS: Step[] = [
  {
    key: "raw",
    title: "① 原句",
    caption: "从语料库随机抽一句话。",
    tokens: [
      { text: "今天", tone: "ink" },
      { text: "天气", tone: "ink" },
      { text: "真", tone: "ink" },
      { text: "好", tone: "ink" },
      { text: "，", tone: "ink" },
      { text: "我", tone: "ink" },
      { text: "想", tone: "ink" },
      { text: "去", tone: "ink" },
      { text: "游泳", tone: "ink" },
    ],
    note: "BERT 原版语料：BookCorpus + 英文维基百科，共 33 亿词。",
  },
  {
    key: "tokenize",
    title: "② 切 subword",
    caption: "WordPiece 把句子拆成 30,522 词表里的小块。",
    tokens: [
      { text: "今天", tone: "butter" },
      { text: "天气", tone: "butter" },
      { text: "真", tone: "butter" },
      { text: "好", tone: "butter" },
      { text: "，", tone: "butter" },
      { text: "我", tone: "butter" },
      { text: "想", tone: "butter" },
      { text: "去", tone: "butter" },
      { text: "游泳", tone: "butter" },
    ],
    note: "WordPiece · 30,522 vocab · max seq length 512。",
  },
  {
    key: "specials",
    title: "③ 加 [CLS] / [SEP]",
    caption: "[CLS] 在最前、[SEP] 在最后。[CLS] 的向量后面用来做整句分类。",
    tokens: [
      { text: "[CLS]", tone: "coral" },
      { text: "今天", tone: "butter" },
      { text: "天气", tone: "butter" },
      { text: "真", tone: "butter" },
      { text: "好", tone: "butter" },
      { text: "，", tone: "butter" },
      { text: "我", tone: "butter" },
      { text: "想", tone: "butter" },
      { text: "去", tone: "butter" },
      { text: "游泳", tone: "butter" },
      { text: "[SEP]", tone: "coral" },
    ],
    note: "[CLS] = classification 占位；[SEP] = 分句符。",
  },
  {
    key: "mask",
    title: "④ 随机盖住 15%",
    caption:
      "在所有真实 token 里随机选 15%。其中 80% 替成 [MASK]、10% 替成随机词、10% 保留原词。",
    tokens: [
      { text: "[CLS]", tone: "coral" },
      { text: "今天", tone: "butter" },
      { text: "天气", tone: "butter" },
      { text: "真", tone: "butter" },
      { text: "[MASK]", tone: "mask" },
      { text: "，", tone: "butter" },
      { text: "我", tone: "butter" },
      { text: "想", tone: "butter" },
      { text: "去", tone: "butter" },
      { text: "[MASK]", tone: "mask" },
      { text: "[SEP]", tone: "coral" },
    ],
    note: "原句被盖 2 个词（这里：「好」、「游泳」）。模型不知道原词。",
  },
  {
    key: "predict",
    title: "⑤ 双向 encoder 猜",
    caption:
      "12/24 层 Transformer encoder 同时看左右上下文，每个 [MASK] 位置输出一个 30,522 维的概率分布。",
    tokens: [
      { text: "[CLS]", tone: "coral" },
      { text: "今天", tone: "butter" },
      { text: "天气", tone: "butter" },
      { text: "真", tone: "butter" },
      { text: "好→0.74", tone: "teal" },
      { text: "，", tone: "butter" },
      { text: "我", tone: "butter" },
      { text: "想", tone: "butter" },
      { text: "去", tone: "butter" },
      { text: "游泳→0.71", tone: "teal" },
      { text: "[SEP]", tone: "coral" },
    ],
    note: "每个 [MASK] 上输出一个 vocab 概率分布，取 argmax 即猜词。",
  },
  {
    key: "loss",
    title: "⑥ 算 loss 反向传播",
    caption:
      "对每个 [MASK] 位置算 cross-entropy（原词 vs 预测分布），求和得 MLM loss，反向传播更新参数。",
    tokens: [
      { text: "loss", tone: "ink" },
      { text: "=", tone: "ink" },
      { text: "−log(0.74)", tone: "coral" },
      { text: "−log(0.71)", tone: "coral" },
      { text: "=", tone: "ink" },
      { text: "0.65", tone: "ink" },
    ],
    note: "1 步只更新一次。BERT-base 总共训练 100 万步、batch 256、序列长 512。",
  },
];

/* ─── NSP demo 数据 ─── */
type NspCase = {
  sentA: string;
  sentB: string;
  /** 真实标签：true = IsNext（相连），false = NotNext */
  isNext: boolean;
  /** BERT [CLS] 输出 IsNext 的概率（手调示意） */
  bertScore: number;
};

const NSP_CASES: NspCase[] = [
  {
    sentA: "今天天气真好，我想出去走走。",
    sentB: "于是我打开门，外面阳光刺眼。",
    isNext: true,
    bertScore: 0.92,
  },
  {
    sentA: "今天天气真好，我想出去走走。",
    sentB: "BitTorrent 协议使用分布式哈希表。",
    isNext: false,
    bertScore: 0.06,
  },
  {
    sentA: "他把钱存进了银行。",
    sentB: "下午经理打电话来确认了存款。",
    isNext: true,
    bertScore: 0.86,
  },
];

const STEP_TONE_BG: Record<Step["tokens"][number]["tone"], string> = {
  ink: "bg-white text-ink",
  butter: "bg-butter text-ink",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  mask: "bg-ink text-cream",
};

const SectionTrain: React.FC = () => {
  /* MLM trace 步骤指针 */
  const [step, setStep] = useState(0);

  /* NSP demo 状态 */
  const [nspIdx, setNspIdx] = useState(0);
  const [userPick, setUserPick] = useState<null | boolean>(null);

  const cur = STEPS[step];
  const nsp = NSP_CASES[nspIdx];
  const userCorrect = userPick !== null && userPick === nsp.isNext;

  const goNext = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));
  const goPrev = () => setStep((s) => Math.max(0, s - 1));
  const reset = () => setStep(0);

  const cycleNsp = () => {
    setNspIdx((i) => (i + 1) % NSP_CASES.length);
    setUserPick(null);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-butter/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">How BERT trains</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-4">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              训练就两件事：
              <br />
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">猜被盖的词</span>
              </span>
              ，
              <span className="text-ink/45">和判断两句相不相连。</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              第一件事叫 MLM（Masked Language Modeling），是 BERT 学语言的主力。第二件叫 NSP（Next Sentence Prediction），后来被发现「没啥用」，RoBERTa 把它砍了 —— 但当年是 BERT 原论文的两大任务之一。
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mt-8">
          {/* 左：MLM 6 步 trace */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-baseline justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  MLM · 一步一步走
                </div>
                <div className="font-mono text-[10px] text-ink/55 tabular-nums">
                  {step + 1} / {STEPS.length}
                </div>
              </div>

              {/* step pill 列表 */}
              <div className="grid grid-cols-6 gap-1 mb-5">
                {STEPS.map((s, i) => {
                  const isCur = i === step;
                  const isPast = i < step;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setStep(i)}
                      className={[
                        "py-1.5 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-250 ease-spring",
                        isCur
                          ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                          : isPast
                            ? "bg-butter text-ink"
                            : "bg-white text-ink/45 hover:bg-cream",
                      ].join(" ")}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>

              {/* 当前 step 内容 */}
              <div
                key={cur.key}
                className="animate-enter-up min-h-[260px] flex flex-col"
              >
                <div className="font-display text-[22px] font-bold text-ink mb-2">
                  {cur.title}
                </div>
                <p className="text-[14.5px] text-ink/75 leading-relaxed mb-4">
                  {cur.caption}
                </p>

                {/* token 行 */}
                <div className="flex-1 flex items-center">
                  <div className="flex flex-wrap gap-1.5 p-4 bg-cream border-2 border-ink/15 rounded-xl w-full">
                    {cur.tokens.map((t, i) => (
                      <span
                        key={`${cur.key}-${i}`}
                        className={[
                          "inline-flex items-center px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[12.5px] font-semibold shadow-[2px_2px_0_0_#241C15]",
                          STEP_TONE_BG[t.tone],
                        ].join(" ")}
                      >
                        {t.text}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-4 font-mono text-[10.5px] text-ink/50 leading-relaxed">
                  {cur.note}
                </p>
              </div>

              {/* prev / next 按钮 */}
              <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between">
                <button
                  onClick={goPrev}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-ink font-mono text-[11px] font-bold disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:bg-cream transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  prev
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-ink/20 text-ink/55 font-mono text-[11px] font-bold hover:border-ink hover:text-ink hover:bg-cream transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  reset
                </button>
                <button
                  onClick={goNext}
                  disabled={step === STEPS.length - 1}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-ink bg-ink text-cream font-mono text-[11px] font-bold disabled:opacity-30 disabled:cursor-not-allowed enabled:hover:-translate-x-[1px] enabled:hover:-translate-y-[1px] enabled:hover:shadow-[3px_3px_0_0_#E07A5F] transition-all"
                >
                  next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 右：NSP 你来判断 */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7 h-full flex flex-col">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  NSP · 你来判断
                </div>
                <button
                  onClick={cycleNsp}
                  className="font-mono text-[10px] text-ink/55 hover:text-ink transition-colors"
                >
                  换一组 →
                </button>
              </div>

              <div className="space-y-2 mb-5">
                <div className="px-4 py-3 bg-cream border-2 border-ink/20 rounded-xl">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-1">
                    sentence A
                  </div>
                  <p className="text-[14px] text-ink leading-snug">
                    {nsp.sentA}
                  </p>
                </div>
                <div className="px-4 py-3 bg-cream border-2 border-ink/20 rounded-xl">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 mb-1">
                    sentence B
                  </div>
                  <p className="text-[14px] text-ink leading-snug">
                    {nsp.sentB}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setUserPick(true)}
                  className={[
                    "py-2.5 rounded-xl border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-250 ease-spring",
                    userPick === true
                      ? "bg-teal text-cream shadow-[2px_2px_0_0_#241C15]"
                      : "bg-white text-ink/75 hover:bg-cream",
                  ].join(" ")}
                >
                  IsNext · 相连
                </button>
                <button
                  onClick={() => setUserPick(false)}
                  className={[
                    "py-2.5 rounded-xl border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-250 ease-spring",
                    userPick === false
                      ? "bg-coral text-cream shadow-[2px_2px_0_0_#241C15]"
                      : "bg-white text-ink/75 hover:bg-cream",
                  ].join(" ")}
                >
                  NotNext · 不相连
                </button>
              </div>

              {/* 揭晓 */}
              {userPick !== null && (
                <div className="mt-1 pt-4 border-t border-ink/10 animate-enter-up">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={[
                        "px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border-2 border-ink",
                        userCorrect ? "bg-teal text-cream" : "bg-coral text-cream",
                      ].join(" ")}
                    >
                      {userCorrect ? "你猜对了" : "你猜错了"}
                    </span>
                    <span className="font-mono text-[11px] text-ink/65">
                      真实标签 · {nsp.isNext ? "IsNext" : "NotNext"}
                    </span>
                  </div>

                  <div className="px-4 py-3 bg-butter/30 border-2 border-ink/20 rounded-xl">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 mb-1">
                      BERT 给出的 P(IsNext)
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-display text-[26px] font-bold text-ink tabular-nums">
                        {(nsp.bertScore * 100).toFixed(0)}%
                      </span>
                      <span className="font-mono text-[10px] text-ink/55">
                        来自 [CLS] 上的 2 分类 head
                      </span>
                    </div>
                    <div className="h-2 bg-ink/8 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-ink transition-all duration-400 ease-spring"
                        style={{ width: `${nsp.bertScore * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 收尾 callout：RoBERTa 砍了 NSP */}
              <div className="mt-5 pt-4 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                  顺带一提
                </div>
                <p className="text-[13px] text-ink/75 leading-relaxed">
                  一年后，<strong>RoBERTa（2019）</strong>用消融实验证明：去掉 NSP 不掉点，反而省训练时间。从此 RoBERTa / ALBERT / DeBERTa-v3 / ModernBERT 都没有 NSP。
                </p>
                <p className="mt-1.5 font-mono text-[10px] text-ink/40">
                  来源：arXiv:1907.11692 § 4.4 Liu et al. 2019。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTrain;
