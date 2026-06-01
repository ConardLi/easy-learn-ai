/**
 * Section 02 · 70 年做法换代
 *
 * 反模板：llm 站也有时间线，但只覆盖 6 年模型迭代。
 * 这里是 1954–2026 共 5 段方法（每段跨数十年），焦点是"方法换了 4 次"。
 *
 * 交互：横排 5 个节点 pill，点选切换右侧详情卡。
 *   节点之间有一条连线 + 时间刻度。
 */
import React, { useState } from "react";

type Paradigm = {
  id: string;
  era: string;
  year: string;
  name: string;
  /** 一句话总结这段方法干啥 */
  oneLine: string;
  /** 代表系统 */
  systems: string[];
  /** 主方法（一两个关键词） */
  methods: string[];
  /** 撞墙在哪 */
  wall: string;
  /** 视觉口味色（butter / coral / teal / pop / ink） */
  tone: "butter" | "coral" | "teal" | "pop" | "ink";
};

const PARADIGMS: Paradigm[] = [
  {
    id: "rule",
    era: "Rule-based",
    year: "1954–1989",
    name: "手写规则",
    oneLine:
      "语言学家把语法写成 if/else，让程序按规则解析句子，能跑但写不动。",
    systems: ["Georgetown-IBM 1954（俄→英 60 句）", "ELIZA 1966（伪心理医生）", "SHRDLU 1970"],
    methods: ["上下文无关文法", "正则 / 模式匹配", "词典查表"],
    wall: "Georgetown-IBM 用 250 词 + 6 条规则起步，30 年后规则写到上万条还盖不住语言的特例。",
    tone: "butter",
  },
  {
    id: "stat",
    era: "Statistical",
    year: "1990–2012",
    name: "统计概率",
    oneLine:
      "改成数概率 —— 从大量文本里学「下个词最可能是什么」，比硬写规则灵活。",
    systems: ["IBM Model 1–5（1990 统计机翻）", "Brown Corpus", "Hidden Markov POS tagger"],
    methods: ["n-gram 语言模型", "IBM 翻译模型", "最大熵 / HMM / CRF"],
    wall: "n-gram 看不远（一般 ≤ 5），长依赖死掉。手工特征工程仍占 70% 工程量。",
    tone: "coral",
  },
  {
    id: "neural",
    era: "Neural / Word Embed",
    year: "2013–2016",
    name: "神经网络 + 词向量",
    oneLine:
      "把每个词改成一串实数，让神经网络自动学语义；king − man + woman ≈ queen 第一次成立。",
    systems: ["Word2Vec 2013 (Mikolov)", "GloVe 2014", "seq2seq + LSTM 2014（机翻）", "Attention 2014 (Bahdanau)"],
    methods: ["分布式表示", "RNN / LSTM", "Encoder–Decoder"],
    wall: "RNN 一个 token 一个 token 走，没法并行，训练慢；长句梯度还是会断。",
    tone: "teal",
  },
  {
    id: "transformer",
    era: "Transformer + Pre-train",
    year: "2017–2019",
    name: "Transformer 预训练",
    oneLine:
      "self-attention 让所有词同时互看；先在海量文本预训练，再为具体任务微调。",
    systems: ["Attention Is All You Need 2017", "BERT 2018（110M，11 项任务 SOTA）", "GPT-1 2018 / GPT-2 2019"],
    methods: [
      "多头自注意力（让模型同时看句子各处，判断哪些词跟哪些词相关）",
      "encoder-only（BERT）vs decoder-only（GPT）（一种像阅读理解、一种像续写）",
      "fine-tune 套路（再用领域数据微调一遍）",
    ],
    wall: "每个下游任务还得自己造标注数据 + fine-tune 一个版本；上百个模型分散维护。",
    tone: "pop",
  },
  {
    id: "llm",
    era: "LLM era",
    year: "2020–2026",
    name: "大模型一锅端",
    oneLine:
      "模型大到不用例子就能干所有任务；写一句 prompt 替代了从头训练；现在做 NLP 大多就是调 LLM。",
    systems: ["GPT-3 2020（175B）", "ChatGPT 2022", "GPT-4 2023 / Claude / Gemini", "GPT-5 / Opus 4.7 · 2025–2026"],
    methods: ["指令微调 + RLHF（教模型按要求答而不是续写）", "上下文学习（in-context learning · 在对话里塞几个例子就会）", "思维链 / 推理模型（先写步骤再答）"],
    wall: "贵、慢、幻觉、上下文长度仍是天花板；分类小任务上 fine-tuned BERT 还能赢。",
    tone: "ink",
  },
];

const TONE_BG: Record<Paradigm["tone"], string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  pop: "bg-pop",
  ink: "bg-ink",
};
const TONE_TEXT: Record<Paradigm["tone"], string> = {
  butter: "text-ink",
  coral: "text-cream",
  teal: "text-cream",
  pop: "text-cream",
  ink: "text-cream",
};

const SectionParadigms: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(PARADIGMS[3].id);
  const active = PARADIGMS.find((p) => p.id === activeId)!;
  const activeIdx = PARADIGMS.findIndex((p) => p.id === activeId);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="section-anchor">
          <span className="section-anchor-num">§ 02</span>
          <span className="section-anchor-label">70 years · 4 method jumps</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          1954 到现在，做法换了 4 轮。<br className="hidden md:block" />
          每一轮都是因为上一套搞不定才换的。
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-12">
          点节点看每个时代的代表系统、主方法、和把它推下台的那堵墙。 时间不是均匀的 —— 后两段 12 年走完了前 60 年没走完的路。
        </p>

        {/* 时间线节点条 */}
        <div className="relative mb-10">
          {/* 横线 */}
          <div
            className="absolute left-0 right-0 top-[26px] h-[3px] bg-ink hidden md:block"
            aria-hidden
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 relative">
            {PARADIGMS.map((p, i) => {
              const on = p.id === activeId;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveId(p.id)}
                  className="group flex flex-col items-center text-center focus:outline-none"
                  aria-pressed={on}
                >
                  {/* 节点圆 */}
                  <div
                    className={[
                      "relative z-10 w-[54px] h-[54px] rounded-full border-2 border-ink flex items-center justify-center transition-all duration-300 ease-spring mb-3",
                      on
                        ? `${TONE_BG[p.tone]} ${TONE_TEXT[p.tone]} shadow-stamp-lg -translate-y-1`
                        : "bg-white text-ink hover:bg-cream shadow-stamp",
                    ].join(" ")}
                  >
                    <span className="font-display font-extrabold text-[16px] leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.16em] mb-1 transition-colors",
                      on ? "text-ink" : "text-ink/45",
                    ].join(" ")}
                  >
                    {p.year}
                  </div>
                  <div
                    className={[
                      "font-display font-extrabold text-[14px] leading-tight transition-colors",
                      on ? "text-ink" : "text-ink/55 group-hover:text-ink",
                    ].join(" ")}
                  >
                    {p.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 详情卡 */}
        <div
          key={active.id}
          className="grid lg:grid-cols-12 gap-6 bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 animate-enter-up"
        >
          <div className="lg:col-span-5">
            <div
              className={[
                "inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-ink mb-4 font-mono text-[10px] uppercase tracking-[0.16em] font-bold",
                TONE_BG[active.tone],
                TONE_TEXT[active.tone],
              ].join(" ")}
            >
              <span>
                era {String(activeIdx + 1).padStart(2, "0")} / 05
              </span>
              <span className="opacity-60">·</span>
              <span>{active.era}</span>
            </div>
            <h3 className="font-display text-[28px] lg:text-[34px] font-extrabold text-ink leading-tight mb-3">
              {active.name}
            </h3>
            <p className="font-sans text-[15px] text-ink/75 leading-relaxed mb-5">
              {active.oneLine}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-ink rounded-md font-mono text-[10px] tracking-wider text-ink">
              <span className="opacity-50">when</span>
              <span className="font-bold">{active.year}</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <div className="bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2">
                代表系统
              </div>
              <ul className="space-y-1.5">
                {active.systems.map((s) => (
                  <li
                    key={s}
                    className="font-sans text-[13.5px] text-ink leading-snug flex gap-2"
                  >
                    <span className="text-coral font-bold mt-0.5">›</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2">
                主方法
              </div>
              <ul className="space-y-1.5">
                {active.methods.map((m) => (
                  <li
                    key={m}
                    className="font-sans text-[13.5px] text-ink leading-snug flex gap-2"
                  >
                    <span className="text-teal font-bold mt-0.5">›</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 bg-ink border-2 border-ink rounded-2xl p-5 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter/80 mb-2">
                撞到的墙 · 它为什么会被替掉
              </div>
              <p className="font-sans text-[13.5px] text-cream leading-relaxed">
                {active.wall}
              </p>
            </div>
          </div>
        </div>

        {/* 底部小注 */}
        <p className="mt-6 font-mono text-[11px] text-ink/45 max-w-2xl">
          来源：ACM《NLP Evolution》2024；arXiv 1706.03762（Transformer）； Llama 3 Herd of Models arXiv 2407.21783。
        </p>
      </div>
    </section>
  );
};

export default SectionParadigms;
