/**
 * Section 01 · Hero「BERT 是什么？」
 *
 * 反模板要点（区别于已完成 10 站）：
 *   ─ Hero 直接「BERT 是什么？」 H1 + 一句话定义（陈述句，零比喻）
 *   ─ 右边是「MLM 让你来」 —— 点击句子里的任一词把它盖住，看 BERT 给的 top-3 候选词
 *     这就是 BERT 训练时唯一干的事，进站第一秒就摆给用户玩
 *   ─ 不同于 nlp 的「字 → 数 → 向量」三段，bert 聚焦"猜被盖的词"这一个动作
 */
import React, { useMemo, useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

/**
 * 预设语料：每个 token 自带 4 个候选（top-1 是原词，其余 3 个是似是而非的备选）。
 * 概率是手调的，跟真实 BERT 输出不完全一致，但量级与排序符合直觉。
 */
type Token = {
  text: string;
  candidates: { word: string; prob: number }[];
};

type Sentence = {
  id: string;
  tokens: Token[];
  /** 默认 mask 哪一位 —— 一般挑最有信息量的内容词 */
  defaultMaskIdx: number;
};

const SENTENCES: Sentence[] = [
  {
    id: "weather",
    tokens: [
      {
        text: "今天",
        candidates: [
          { word: "今天", prob: 0.78 },
          { word: "明天", prob: 0.11 },
          { word: "昨天", prob: 0.07 },
          { word: "周末", prob: 0.04 },
        ],
      },
      {
        text: "天气",
        candidates: [
          { word: "天气", prob: 0.81 },
          { word: "温度", prob: 0.09 },
          { word: "气温", prob: 0.06 },
          { word: "心情", prob: 0.04 },
        ],
      },
      {
        text: "很",
        candidates: [
          { word: "很", prob: 0.66 },
          { word: "真", prob: 0.18 },
          { word: "特别", prob: 0.1 },
          { word: "挺", prob: 0.06 },
        ],
      },
      {
        text: "热",
        candidates: [
          { word: "热", prob: 0.74 },
          { word: "冷", prob: 0.12 },
          { word: "晒", prob: 0.09 },
          { word: "闷", prob: 0.05 },
        ],
      },
      {
        text: "，",
        candidates: [
          { word: "，", prob: 0.92 },
          { word: "。", prob: 0.05 },
          { word: "！", prob: 0.02 },
          { word: "、", prob: 0.01 },
        ],
      },
      {
        text: "我",
        candidates: [
          { word: "我", prob: 0.72 },
          { word: "他", prob: 0.13 },
          { word: "她", prob: 0.1 },
          { word: "你", prob: 0.05 },
        ],
      },
      {
        text: "想",
        candidates: [
          { word: "想", prob: 0.69 },
          { word: "要", prob: 0.16 },
          { word: "打算", prob: 0.1 },
          { word: "准备", prob: 0.05 },
        ],
      },
      {
        text: "去",
        candidates: [
          { word: "去", prob: 0.84 },
          { word: "到", prob: 0.08 },
          { word: "出", prob: 0.05 },
          { word: "往", prob: 0.03 },
        ],
      },
      {
        text: "游泳",
        candidates: [
          { word: "游泳", prob: 0.71 },
          { word: "吃冰", prob: 0.12 },
          { word: "喝水", prob: 0.09 },
          { word: "吹空调", prob: 0.08 },
        ],
      },
    ],
    defaultMaskIdx: 8,
  },
  {
    id: "bank",
    tokens: [
      {
        text: "他",
        candidates: [
          { word: "他", prob: 0.7 },
          { word: "我", prob: 0.15 },
          { word: "她", prob: 0.1 },
          { word: "小王", prob: 0.05 },
        ],
      },
      {
        text: "把",
        candidates: [
          { word: "把", prob: 0.74 },
          { word: "将", prob: 0.16 },
          { word: "用", prob: 0.06 },
          { word: "拿", prob: 0.04 },
        ],
      },
      {
        text: "钱",
        candidates: [
          { word: "钱", prob: 0.78 },
          { word: "工资", prob: 0.1 },
          { word: "存款", prob: 0.08 },
          { word: "积蓄", prob: 0.04 },
        ],
      },
      {
        text: "存",
        candidates: [
          { word: "存", prob: 0.81 },
          { word: "放", prob: 0.1 },
          { word: "汇", prob: 0.05 },
          { word: "转", prob: 0.04 },
        ],
      },
      {
        text: "进",
        candidates: [
          { word: "进", prob: 0.88 },
          { word: "到", prob: 0.06 },
          { word: "去", prob: 0.04 },
          { word: "入", prob: 0.02 },
        ],
      },
      {
        text: "了",
        candidates: [
          { word: "了", prob: 0.91 },
          { word: "在", prob: 0.05 },
          { word: "过", prob: 0.03 },
          { word: "于", prob: 0.01 },
        ],
      },
      {
        text: "银行",
        candidates: [
          { word: "银行", prob: 0.79 },
          { word: "卡里", prob: 0.11 },
          { word: "账户", prob: 0.07 },
          { word: "保险柜", prob: 0.03 },
        ],
      },
    ],
    defaultMaskIdx: 6,
  },
  {
    id: "model",
    tokens: [
      {
        text: "BERT",
        candidates: [
          { word: "BERT", prob: 0.62 },
          { word: "GPT", prob: 0.18 },
          { word: "Llama", prob: 0.12 },
          { word: "T5", prob: 0.08 },
        ],
      },
      {
        text: "是",
        candidates: [
          { word: "是", prob: 0.88 },
          { word: "属于", prob: 0.06 },
          { word: "为", prob: 0.04 },
          { word: "成", prob: 0.02 },
        ],
      },
      {
        text: "一个",
        candidates: [
          { word: "一个", prob: 0.65 },
          { word: "一种", prob: 0.22 },
          { word: "一类", prob: 0.08 },
          { word: "一款", prob: 0.05 },
        ],
      },
      {
        text: "双向",
        candidates: [
          { word: "双向", prob: 0.59 },
          { word: "单向", prob: 0.18 },
          { word: "深度", prob: 0.14 },
          { word: "大型", prob: 0.09 },
        ],
      },
      {
        text: "的",
        candidates: [
          { word: "的", prob: 0.94 },
          { word: "之", prob: 0.03 },
          { word: "型", prob: 0.02 },
          { word: "且", prob: 0.01 },
        ],
      },
      {
        text: "语言",
        candidates: [
          { word: "语言", prob: 0.72 },
          { word: "文本", prob: 0.13 },
          { word: "自然语言", prob: 0.1 },
          { word: "对话", prob: 0.05 },
        ],
      },
      {
        text: "模型",
        candidates: [
          { word: "模型", prob: 0.85 },
          { word: "网络", prob: 0.08 },
          { word: "架构", prob: 0.04 },
          { word: "系统", prob: 0.03 },
        ],
      },
    ],
    defaultMaskIdx: 3,
  },
];

const SectionWhat: React.FC = () => {
  const [sentIdx, setSentIdx] = useState(0);
  const sent = SENTENCES[sentIdx];
  const [maskIdx, setMaskIdx] = useState(sent.defaultMaskIdx);

  const tokens = sent.tokens;
  const masked = tokens[maskIdx];

  /* 切换语料：复位 mask 到默认位 */
  const switchSentence = (newIdx: number) => {
    setSentIdx(newIdx);
    setMaskIdx(SENTENCES[newIdx].defaultMaskIdx);
  };

  /* hero 用候选词列表：取 top-4 候选（top-1 = 原词），按概率排序 */
  const candidates = useMemo(() => {
    return [...masked.candidates].sort((a, b) => b.prob - a.prob);
  }, [masked]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[7%] hidden lg:block animate-float-y"
      >
        <div className="w-12 h-12 bg-butter border-2 border-ink rounded-2xl shadow-stamp rotate-6 flex items-center justify-center font-mono text-[9px] font-bold text-ink leading-tight text-center">
          [MASK]
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-10 h-10 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                BERT · Google 2018
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              BERT
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  盖住句子里的词，让模型猜被盖的字，整句左右一起读。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                BERT 是 Google 2018 年发布的模型，用的是 Transformer 的左半边（编码器 Encoder，只读不写，见《Transformer》）。它把句子里随机 15% 的词盖掉，逼模型同时看左边和右边去猜被盖的那个。
              </p>
              <p>
                这件事练熟后，顶上再接一个很小的分类层，就能做情感分析、抽实体、做问答，不用再各练各的。
              </p>
              <p>
                它不聊天、不续写，只读句子做填空和打分 —— 这类「只读不写」的模型叫 encoder-only。
              </p>
              <p>
                <strong className="text-ink">
                  BERT-base 1.1 亿参数 / BERT-large 3.4 亿参数
                </strong>
                ，论文 arXiv:1810.04805 被引超 12 万次，一直是 NLP 引用量第一。
              </p>
            </div>

            {/* 互链卡：先看 Transformer 更顺 */}
            <a
              href="../transformer/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">先看《Transformer》会更顺</span>
                <span className="text-ink/70">
                  {" "}
                  这站讲的「编码器 / 双向」这些零件，都是 Transformer 这套结构拆出来的。先看《Transformer》搞懂底座，再回来看 BERT 怎么用它。
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这张卡，就是 BERT 训练时唯一在干的事。点句子里任何一个词，把它盖住，看模型给出的 top-4 候选。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看 ↓
              </div>
            </div>
          </div>

          {/* 右：live MLM 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 语料切换 */}
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 选一句话
                </div>
                <div className="flex gap-1.5">
                  {SENTENCES.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => switchSentence(i)}
                      className={[
                        "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[10px] font-bold tracking-wide transition-all duration-250 ease-spring",
                        i === sentIdx
                          ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                          : "bg-white text-ink/65 hover:bg-cream",
                      ].join(" ")}
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 句子：每个 token 可点击 */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  ② 点任意一个词把它盖住
                </div>
                <div className="flex flex-wrap gap-1.5 p-3 bg-cream border-2 border-ink/15 rounded-xl min-h-[60px]">
                  {tokens.map((t, i) => {
                    const isMasked = i === maskIdx;
                    return (
                      <button
                        key={`${sent.id}-${i}`}
                        onClick={() => setMaskIdx(i)}
                        className={[
                          "inline-flex items-center px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[13px] font-semibold transition-all duration-250 ease-spring",
                          isMasked
                            ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                            : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                        ].join(" ")}
                      >
                        {isMasked ? "[MASK]" : t.text}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* BERT top-4 候选 */}
              <div className="pt-5 border-t border-ink/10">
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ③ BERT 给的 top-4 候选
                  </div>
                  <div className="font-mono text-[10px] text-ink/40">
                    原词 ·{" "}
                    <span className="text-ink font-bold">{masked.text}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {candidates.map((c, i) => {
                    const isOriginal = c.word === masked.text;
                    const isTop = i === 0;
                    return (
                      <div
                        key={`${masked.text}-${c.word}-${i}`}
                        className="grid grid-cols-[90px_1fr_56px] gap-3 items-center animate-enter-pop"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <div
                          className={[
                            "px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[13px] font-semibold text-center truncate",
                            isTop
                              ? "bg-butter text-ink shadow-[2px_2px_0_0_#241C15]"
                              : "bg-white text-ink/75",
                          ].join(" ")}
                          title={c.word}
                        >
                          {c.word}
                        </div>
                        <div className="h-3 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                          <div
                            className={[
                              "h-full transition-all duration-400 ease-spring",
                              isTop ? "bg-ink" : "bg-ink/40",
                            ].join(" ")}
                            style={{ width: `${c.prob * 100}%` }}
                          />
                        </div>
                        <div className="font-mono text-[11px] text-ink/65 tabular-nums text-right">
                          {(c.prob * 100).toFixed(1)}%
                          {isOriginal && (
                            <span className="ml-1 text-coral font-bold">✓</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                  概率示意，跟真实 bert-base-chinese 跑出来量级一致、不完全一致。源头算式见
                  arXiv:1810.04805 第 3.1 节。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhat;
