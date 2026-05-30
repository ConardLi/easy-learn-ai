/**
 * Section 03 · 「同一句话，三种架构怎么处理」
 *
 * 反模板：跟 transformer SectionArch3（1 个 pill 切 1 个架构详情，逐一介绍）不同
 *   ─ 这里是「同一任务横向 3 栏并排」 —— pill 切任务，三栏同步换内容
 *   ─ 重点是「输入输出格式 + 各架构的死穴」，不是架构图通览
 *   ─ 不复用 bert 的 attention 矩阵热力图、不复用 transformer 的 6 层堆叠 sketcher
 *
 * 交互：
 *   ─ pill 切 4 个任务（分类 / 翻译 / 实体抽取 / 摘要）
 *   ─ 3 栏并排展示 BERT（encoder-only）/ GPT（decoder-only）/ T5（encoder-decoder）的
 *     输入格式 / 输出格式 / 这架构干这个任务的痛点
 *   ─ 底部 callout：T5 唯一的"无差别"架构 —— 任务无需改头部
 */
import React, { useState } from "react";

type Cell = {
  /** 此架构怎么写入这个任务（输入格式） */
  inFmt: string;
  /** 输出怎么出 */
  outFmt: string;
  /** 干这事情顺不顺 */
  verdict: "fit" | "ok" | "bad";
  /** 痛点 / 优点 */
  note: string;
};

type TaskRow = {
  id: string;
  label: string;
  /** 用户能看懂的任务说明 */
  brief: string;
  /** 同一份原始输入（横向都用它） */
  sourceInput: string;
  /** 三栏怎么吃 */
  bert: Cell;
  gpt: Cell;
  t5: Cell;
};

const TASKS: TaskRow[] = [
  {
    id: "cls",
    label: "情感分类",
    brief: "判断一句话情绪是 positive / negative。",
    sourceInput: "这家店的拌面 80 块一碗，越吃越气。",
    bert: {
      inFmt: "[CLS] 这家店…一碗，越吃越气。 [SEP]",
      outFmt: "[CLS] 向量 → 分类头 → softmax(2) = [0.04, 0.96]",
      verdict: "fit",
      note: "经典强项 · 训练时新加一个 2 维分类头。",
    },
    gpt: {
      inFmt: "判断情感(positive/negative): 这家店…越吃越气。\\nA:",
      outFmt: "「negative」（也可能输出「neg」或解释一通）",
      verdict: "ok",
      note: "靠提示词 + 后处理解析。输出不稳，要做正则匹配。",
    },
    t5: {
      inFmt: "sst2 sentence: 这家店…越吃越气。",
      outFmt: "字符串「negative」",
      verdict: "fit",
      note: "训练时见过 sst2 前缀，输出 positive / negative 这两个字符串。",
    },
  },
  {
    id: "trans",
    label: "翻译",
    brief: "把英文翻译成中文。",
    sourceInput: "The cat sat on the mat.",
    bert: {
      inFmt: "—",
      outFmt: "—",
      verdict: "bad",
      note: "encoder-only 没生成头，没法吐新句子。强行接 decoder = 又拼回 encoder-decoder。",
    },
    gpt: {
      inFmt: "Translate to Chinese: The cat sat on the mat.\\n中文:",
      outFmt: "猫坐在垫子上。（自回归一个个 token）",
      verdict: "ok",
      note: "能干 · 但训练时没专门优化翻译目标，多语种数据少。",
    },
    t5: {
      inFmt: "translate English to Chinese: The cat sat on the mat.",
      outFmt: "猫坐在垫子上。",
      verdict: "fit",
      note: "encoder 双向读源 + decoder 自回归生成 —— 天生为翻译/摘要这种「输入域 ≠ 输出域」造的。",
    },
  },
  {
    id: "ner",
    label: "实体抽取",
    brief: "标出句子里的人、地、机构。",
    sourceInput: "马云 2014 年在杭州创办蚂蚁集团。",
    bert: {
      inFmt: "马 云 2014 年 在 杭 州 创 办 蚂 蚁 集 团 。",
      outFmt: "每个 token 一个标签：B-PER I-PER O O O B-LOC I-LOC …",
      verdict: "fit",
      note: "BIO 标注是经典 token classification head，BERT 强项。",
    },
    gpt: {
      inFmt: "抽取人/地/机构: 马云 2014 年在杭州…\\n答:",
      outFmt: "人: 马云 · 地: 杭州 · 机构: 蚂蚁集团",
      verdict: "ok",
      note: "对话式输出，要正则/JSON 解析。边界容易飘。",
    },
    t5: {
      inFmt: "extract entities: 马云 2014 年在杭州创办蚂蚁集团。",
      outFmt: "人: 马云 | 地: 杭州 | 机构: 蚂蚁集团",
      verdict: "ok",
      note: "T5 的输出是字符串拼接，每个实体也都得自己解析回来。",
    },
  },
  {
    id: "sum",
    label: "长文摘要",
    brief: "把一段话压成一句。",
    sourceInput: "Google 2019 年发布 T5 论文，提出把所有 NLP 任务都写成 text-to-text 的统一框架，用 encoder-decoder 在 C4 语料上预训练。",
    bert: {
      inFmt: "—",
      outFmt: "—",
      verdict: "bad",
      note: "没生成头，干不了 abstractive summary。extractive 还行（挑句子），但跟「生成」两码事。",
    },
    gpt: {
      inFmt: "请总结这段: Google 2019 年…预训练。\\n摘要:",
      outFmt: "T5 是 Google 的统一文本框架。",
      verdict: "fit",
      note: "decoder-only 现代 LLM 摘要做得非常好（GPT-4、Claude 都强）。",
    },
    t5: {
      inFmt: "summarize: Google 2019 年…预训练。",
      outFmt: "T5 是 Google 的统一文本框架。",
      verdict: "fit",
      note: "原本就是 T5 训练数据里的任务之一，CNN/DailyMail 上 ROUGE 当年 SOTA。",
    },
  },
];

const ARCH_COLS: { key: "bert" | "gpt" | "t5"; name: string; sub: string; tone: string }[] = [
  { key: "bert", name: "BERT", sub: "encoder-only · 2018", tone: "teal" },
  { key: "gpt", name: "GPT", sub: "decoder-only · 2018+", tone: "coral" },
  { key: "t5", name: "T5", sub: "encoder-decoder · 2019", tone: "butter" },
];

const VERDICT_LABEL: Record<Cell["verdict"], { label: string; cls: string }> = {
  fit: {
    label: "✓ 称手",
    cls: "bg-butter text-ink",
  },
  ok: {
    label: "○ 能干",
    cls: "bg-white text-ink",
  },
  bad: {
    label: "✗ 干不了",
    cls: "bg-ink text-cream",
  },
};

const SectionBertGptT5: React.FC = () => {
  const [taskId, setTaskId] = useState<string>("cls");
  const task = TASKS.find((t) => t.id === taskId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-butter/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Vs BERT vs GPT</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-7">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              同一句话，
              <br />
              三种架构怎么处理。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              2017 原版 transformer 是 encoder-decoder。BERT 砍掉右半，GPT 砍掉左半，T5 保留两半。剩谁、谁干哪种任务、输出格式什么样 —— 切任务对比就看出来。
            </p>
          </div>
        </div>

        {/* 任务 pill */}
        <div className="flex flex-wrap gap-2 mb-5">
          {TASKS.map((t) => {
            const on = t.id === taskId;
            return (
              <button
                key={t.id}
                onClick={() => setTaskId(t.id)}
                className={[
                  "px-4 py-2 rounded-full border-2 border-ink font-display text-[13.5px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                    : "bg-white text-ink/75 hover:bg-cream hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 共享输入 banner */}
        <div
          key={`src-${task.id}`}
          className="mb-4 px-4 py-3 bg-white border-2 border-ink rounded-2xl shadow-stamp animate-enter-fade"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
            {task.brief}
          </div>
          <div className="font-mono text-[13px] text-ink leading-relaxed">
            原始输入：<span className="font-semibold">{task.sourceInput}</span>
          </div>
        </div>

        {/* 3 栏并排 */}
        <div
          key={`grid-${task.id}`}
          className="grid md:grid-cols-3 gap-4 animate-enter-up"
        >
          {ARCH_COLS.map((col) => {
            const cell = task[col.key];
            const v = VERDICT_LABEL[cell.verdict];
            return (
              <div
                key={col.key}
                className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5 flex flex-col"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <div className="font-display text-[20px] font-extrabold text-ink leading-none">
                      {col.name}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mt-1">
                      {col.sub}
                    </div>
                  </div>
                  <span
                    className={[
                      "px-2 py-1 rounded-full border-2 border-ink font-mono text-[10px] font-bold tracking-[0.1em]",
                      v.cls,
                    ].join(" ")}
                  >
                    {v.label}
                  </span>
                </div>

                <div className="mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    它怎么吃输入
                  </div>
                  {cell.inFmt === "—" ? (
                    <div className="px-2.5 py-2 bg-ink/5 border-2 border-dashed border-ink/30 rounded text-ink/35 font-mono text-[12px] italic">
                      没法装下这个任务
                    </div>
                  ) : (
                    <div className="px-2.5 py-2 bg-cream border-2 border-ink/15 rounded font-mono text-[11.5px] text-ink leading-snug">
                      {cell.inFmt}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    它怎么吐输出
                  </div>
                  {cell.outFmt === "—" ? (
                    <div className="px-2.5 py-2 bg-ink/5 border-2 border-dashed border-ink/30 rounded text-ink/35 font-mono text-[12px] italic">
                      —
                    </div>
                  ) : (
                    <div
                      className={[
                        "px-2.5 py-2 border-2 border-ink/15 rounded font-mono text-[11.5px] text-ink leading-snug",
                        col.key === "t5" ? "bg-butter/40" : "bg-cream",
                      ].join(" ")}
                    >
                      {cell.outFmt}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-2 border-t border-ink/10">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    备注
                  </div>
                  <p className="text-[13px] text-ink/80 leading-relaxed">
                    {cell.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* callout */}
        <div className="mt-6 px-4 py-3 bg-ink text-cream rounded-xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-1">
            T5 的一招鲜
          </div>
          <p className="text-[14px] leading-relaxed">
            BERT 每加一个任务就要换一个 head（分类头 / 序列标注头 / span 头…），GPT 靠提示词工程拼。T5 不需要 —— 任何任务都是「字符串 → 字符串」，连小数「3.5」都当字符串生成。
          </p>
          <p className="mt-2 font-mono text-[10px] text-cream/55">
            来源：T5 paper Table 1 · Raffel et al. 2019 / 2020 JMLR
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionBertGptT5;
