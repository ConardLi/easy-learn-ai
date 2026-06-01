/**
 * Section 04 · 「微调时只换头」
 *
 * BERT 干完预训练，下游做任务时：12/24 层 encoder 一动不动，
 * 顶上接一个小 head（几百到几千参数级别），用任务标注数据微调几个 epoch。
 *
 * 交互：
 *   ─ 4 个任务 chip：情感分类 / 抽实体 NER / 句对相似度 / 抽取式 QA
 *   ─ 选中后中央展示：BERT body + 该任务的 head 形状 + 训练样例 + 跑分
 *   ─ 跟 Section 03 的 step trace 不同种类，避免 trace→trace
 */
import React, { useState } from "react";

type TaskId = "sentiment" | "ner" | "stsb" | "qa";

type Task = {
  id: TaskId;
  label: string;
  /** head 接在哪 */
  headAt: "cls" | "everyToken" | "twoSentCls" | "startEnd";
  headDesc: string;
  /** 样例 */
  sample: {
    input: string;
    /** label / output 文本 */
    output: { text: string; tone: "teal" | "coral" | "butter" }[];
  };
  /** 2026 SOTA 跑分参考（手调） */
  score: { name: string; v: number; unit: string; source: string };
  /** 头部图：用一行小方块表示 head 输出维度示意 */
  headDots: { color: "ink" | "coral" | "teal" | "butter"; w?: number }[];
};

const TASKS: Task[] = [
  {
    id: "sentiment",
    label: "情感分类",
    headAt: "cls",
    headDesc:
      "在 [CLS] 向量上接一个 2 分类 linear head：768 → 2（正面 / 负面）。",
    sample: {
      input: "这家店的拌面 80 块一碗，还煮糊了。",
      output: [{ text: "负面 · 0.94", tone: "coral" }],
    },
    score: {
      name: "SST-2 acc",
      v: 96.4,
      unit: "%",
      source: "DeBERTa-v3-large · 2024",
    },
    headDots: [{ color: "coral" }, { color: "teal" }],
  },
  {
    id: "ner",
    label: "抽实体 NER",
    headAt: "everyToken",
    headDesc:
      "每个 token 上接一个分类 head：768 → 9（B-PER / I-PER / B-ORG / ... / O）。",
    sample: {
      input: "马斯克 / 在 / 旧金山 / 见了 / OpenAI / 的 / 高管",
      output: [
        { text: "马斯克 · PER", tone: "coral" },
        { text: "旧金山 · LOC", tone: "teal" },
        { text: "OpenAI · ORG", tone: "butter" },
      ],
    },
    score: {
      name: "CoNLL-03 F1",
      v: 94.6,
      unit: "%",
      source: "RoBERTa-large · 2019, 至今仍是工业默认",
    },
    headDots: [
      { color: "coral" },
      { color: "coral" },
      { color: "teal" },
      { color: "butter" },
      { color: "butter" },
      { color: "ink" },
      { color: "coral" },
    ],
  },
  {
    id: "stsb",
    label: "句对相似度",
    headAt: "twoSentCls",
    headDesc:
      "两句话拼成 [CLS] A [SEP] B [SEP]，[CLS] 上接 1 维回归 head：输出 0~5 的相似度分。",
    sample: {
      input: "「猫在沙发上睡觉」 vs 「沙发上有只猫在打盹」",
      output: [{ text: "相似度 · 4.62 / 5", tone: "teal" }],
    },
    score: {
      name: "STS-B Pearson",
      v: 92.9,
      unit: "%",
      source: "DeBERTa-v3-large · 2024",
    },
    headDots: [{ color: "ink" }],
  },
  {
    id: "qa",
    label: "抽取式问答",
    headAt: "startEnd",
    headDesc:
      "每个 token 上输出 2 个 logit：start 位置 / end 位置。两个 softmax 找出答案在原文中的 span。",
    sample: {
      input:
        "「BERT 是 Google 2018 年发布的预训练语言模型」 ← 问：BERT 是谁发布的？",
    output: [{ text: "答 · Google", tone: "butter" }],
    },
    score: {
      name: "SQuAD 2.0 F1",
      v: 89.3,
      unit: "%",
      source: "DeBERTa-v3-large · 2024 leaderboard",
    },
    headDots: [
      { color: "ink", w: 3 },
      { color: "teal", w: 5 },
      { color: "teal", w: 5 },
      { color: "ink", w: 3 },
      { color: "ink", w: 3 },
      { color: "coral", w: 7 },
      { color: "ink", w: 3 },
    ],
  },
];

const DOT_TONE: Record<"ink" | "coral" | "teal" | "butter", string> = {
  ink: "bg-ink",
  coral: "bg-coral",
  teal: "bg-teal",
  butter: "bg-butter",
};

const OUTPUT_TONE: Record<"teal" | "coral" | "butter", string> = {
  teal: "bg-teal text-cream",
  coral: "bg-coral text-cream",
  butter: "bg-butter text-ink",
};

const SectionHeads: React.FC = () => {
  const [active, setActive] = useState<TaskId>("sentiment");
  const task = TASKS.find((t) => t.id === active)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Body frozen, head swappable</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              下游做不同任务，
              <br />
              只换最上面一层。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              这一招让 NLP 从「每个任务从头训一个模型」变成「拿一个 BERT 微调几个 epoch」。一台单卡 GPU、几千条标注，几小时出活。换任务时 12 层 encoder 一动不动，换的是顶上那个几百到几千参数的 head。
            </p>
          </div>
        </div>

        {/* 任务 chip */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TASKS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={[
                  "px-4 py-2.5 rounded-full border-2 border-ink font-display text-[14px] font-bold transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                    : "bg-white text-ink/75 hover:bg-butter hover:-translate-y-[1px] hover:shadow-[2px_2px_0_0_#241C15]",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 主视图：BERT 架构 SVG + head + 样例 + 跑分 */}
        <div
          key={task.id}
          className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-8 animate-enter-up"
        >
          <div className="grid lg:grid-cols-12 gap-8">
            {/* 左：架构示意 SVG */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                架构
              </div>
              <svg
                viewBox="0 0 320 360"
                className="w-full h-auto"
                aria-hidden
              >
                {/* head 区（顶部） */}
                <g>
                  <rect
                    x="20"
                    y="20"
                    width="280"
                    height="68"
                    rx="14"
                    fill="#FBE891"
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <text
                    x="40"
                    y="42"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="700"
                    fill="#241C15"
                    letterSpacing="1.2"
                  >
                    HEAD · {task.headAt}
                  </text>
                  {/* head dots */}
                  <g transform="translate(40,58)">
                    {task.headDots.map((d, i) => {
                      const w = d.w ?? 4;
                      const x = i * 28;
                      return (
                        <g key={`hd-${i}`}>
                          <rect
                            x={x}
                            y={-w}
                            width={w * 2}
                            height={w * 2}
                            rx={1.5}
                            fill={
                              d.color === "ink"
                                ? "#241C15"
                                : d.color === "coral"
                                  ? "#E07A5F"
                                  : d.color === "teal"
                                    ? "#1B4B5A"
                                    : "#F4D35E"
                            }
                            stroke="#241C15"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}
                  </g>
                </g>

                {/* 连接线：head → encoder 顶层 */}
                <line
                  x1="160"
                  y1="88"
                  x2="160"
                  y2="100"
                  stroke="#241C15"
                  strokeWidth="2"
                />

                {/* BERT body：12 层堆叠 */}
                <g>
                  {Array.from({ length: 12 }).map((_, i) => {
                    const y = 100 + i * 18;
                    return (
                      <g key={`layer-${i}`}>
                        <rect
                          x="40"
                          y={y}
                          width="240"
                          height="14"
                          rx="3"
                          fill={i % 2 === 0 ? "#FFFFFF" : "#FBEFE3"}
                          stroke="#241C15"
                          strokeWidth="1.5"
                        />
                        {i === 0 && (
                          <text
                            x="50"
                            y={y + 10}
                            fontFamily="Geist Mono, monospace"
                            fontSize="8.5"
                            fill="#88837C"
                          >
                            layer 12 · top
                          </text>
                        )}
                        {i === 11 && (
                          <text
                            x="50"
                            y={y + 10}
                            fontFamily="Geist Mono, monospace"
                            fontSize="8.5"
                            fill="#88837C"
                          >
                            layer 1 · bottom
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {/* body 标签 */}
                  <rect
                    x="220"
                    y="184"
                    width="60"
                    height="22"
                    rx="5"
                    fill="#241C15"
                  />
                  <text
                    x="250"
                    y="199"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="800"
                    fill="#F4D35E"
                    letterSpacing="1.2"
                  >
                    FROZEN
                  </text>
                </g>

                {/* 输入 token */}
                <g>
                  <line
                    x1="160"
                    y1="316"
                    x2="160"
                    y2="328"
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <rect
                    x="40"
                    y="328"
                    width="240"
                    height="22"
                    rx="11"
                    fill="#E07A5F"
                    stroke="#241C15"
                    strokeWidth="2"
                  />
                  <text
                    x="160"
                    y="343"
                    textAnchor="middle"
                    fontFamily="Geist Mono, monospace"
                    fontSize="10"
                    fontWeight="800"
                    fill="#FBEFE3"
                    letterSpacing="1.5"
                  >
                    INPUT TOKENS
                  </text>
                </g>
              </svg>

              <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                FROZEN = 微调时也常被部分冻结。head 是新加的小网络。
              </p>
            </div>

            {/* 右：任务详情 */}
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                {task.label} · 怎么干
              </div>

              <p className="text-[15px] text-ink leading-relaxed mb-5">
                {task.headDesc}
              </p>

              {/* 样例 */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                  输入样例
                </div>
                <div className="px-4 py-3 bg-cream border-2 border-ink/20 rounded-xl text-[14px] text-ink leading-relaxed">
                  {task.sample.input}
                </div>
              </div>

              {/* head 输出 */}
              <div className="mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                  head 输出
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.sample.output.map((o, i) => (
                    <span
                      key={i}
                      className={[
                        "inline-flex items-center px-3 py-1.5 rounded-md border-2 border-ink font-mono text-[12.5px] font-bold shadow-[2px_2px_0_0_#241C15] animate-enter-pop",
                        OUTPUT_TONE[o.tone],
                      ].join(" ")}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      {o.text}
                    </span>
                  ))}
                </div>
              </div>

              {/* 跑分 */}
              <div className="pt-5 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                  2024 BERT 家族 SOTA · {task.score.name}
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-[40px] font-bold text-ink tabular-nums leading-none">
                    {task.score.v}
                  </span>
                  <span className="font-mono text-[14px] text-ink/55">
                    {task.score.unit}
                  </span>
                </div>
                <div className="h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                  <div
                    className="h-full bg-teal transition-all duration-400 ease-spring"
                    style={{ width: `${Math.min(task.score.v, 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-0 mt-1 text-[9px] font-mono text-ink/40 tabular-nums">
                  <span>0</span>
                  <span className="text-center">25</span>
                  <span className="text-center">50</span>
                  <span className="text-right">100</span>
                </div>
                <p className="mt-3 font-mono text-[10px] text-ink/40">
                  来源：{task.score.source}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeads;
