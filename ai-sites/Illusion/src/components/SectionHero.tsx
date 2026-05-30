/**
 * Section 01 · Hero
 *
 * 反模板：核心交互直接放 hero（让用户当 fact-checker）。
 * 区别 rag 的 chunk hover / deepseek-r1 的 think 流式 / bert 的 mask 候选柱。
 *
 * 左 = 定义 + 白话补充；右 = 5 个 LLM 采样答案，用户点哪个"是真"，
 * 立刻揭示 5 个里哪几个是模型自己编的。
 */
import React, { useState } from "react";
import { ArrowDown, Check, X } from "lucide-react";

type Sample = {
  id: string;
  text: string;
  truth: "real" | "fake";
  why: string;
};

const QUESTION = "谁获得了 2024 年诺贝尔物理学奖？";

/* 5 个采样：2 真 3 假。真值来自 nobelprize.org */
const SAMPLES: Sample[] = [
  {
    id: "s1",
    text: "John J. Hopfield 和 Geoffrey E. Hinton，因为对人工神经网络的奠基性发现。",
    truth: "real",
    why: "诺贝尔奖官网 2024-10-08 公布的获奖者。",
  },
  {
    id: "s2",
    text: "Demis Hassabis 和 John Jumper，因 AlphaFold 解蛋白质结构。",
    truth: "fake",
    why: "他们获得的是 2024 年化学奖，不是物理。模型把两个奖混了。",
  },
  {
    id: "s3",
    text: "John Hopfield 和 Geoffrey Hinton，奖励他们在机器学习神经网络方面的基础贡献。",
    truth: "real",
    why: "同上，措辞不同但内容一致。这是模型答对时该有的「自我一致」。",
  },
  {
    id: "s4",
    text: "Yann LeCun、Yoshua Bengio 和 Geoffrey Hinton，因深度学习三巨头被联合表彰。",
    truth: "fake",
    why: "三人共同获得的是 2018 年图灵奖，没人因此拿过诺贝尔。",
  },
  {
    id: "s5",
    text: "Anton Zeilinger 和 Alain Aspect，因量子纠缠的实验验证。",
    truth: "fake",
    why: "他们获得的是 2022 年物理奖，模型把年份串了。",
  },
];

const SectionHero: React.FC = () => {
  const [picked, setPicked] = useState<Record<string, "real" | "fake" | undefined>>({});

  const total = Object.keys(picked).length;
  const correct = SAMPLES.filter((s) => picked[s.id] === s.truth).length;
  const wrong = total - correct;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-pop border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                LLM Hallucination · 模型幻觉
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              模型幻觉
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
                  LLM 写出来通顺、自信、却跟事实对不上的那一段文字。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                LLM 本质上是一个预测下一个字的概率机器，被训得「碰到问题必须答」。
              </p>
              <p>
                它没有一个「我不知道」开关。不会就猜，且猜得跟会一样自信、一样顺。
              </p>
              <p>
                结果就是 —— 编出来的内容长得跟真知识一模一样，但去查就查不到出处。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，你来当一回 fact-checker。
              同一个问题模型给了 5 个回答，点一下你认为是真的，立刻看它是不是编的。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 章 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：Fact-Checker 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              {/* 题目栏 */}
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  Q · 同一问题 · 同一模型 · 5 次采样
                </div>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-teal">
                    <Check className="w-3 h-3 inline" strokeWidth={3} /> {correct}
                  </span>
                  <span className="text-pop">
                    <X className="w-3 h-3 inline" strokeWidth={3} /> {wrong}
                  </span>
                </div>
              </div>

              <div className="mb-4 px-4 py-3 bg-butter-tint border-2 border-ink rounded-xl">
                <div className="font-display text-[17px] lg:text-[18px] font-bold text-ink leading-snug">
                  {QUESTION}
                </div>
              </div>

              {/* 5 个 sample */}
              <div className="space-y-2.5">
                {SAMPLES.map((s, i) => {
                  const state = picked[s.id];
                  const revealed = !!state;
                  const isReal = s.truth === "real";
                  return (
                    <div
                      key={s.id}
                      className={[
                        "border-2 border-ink rounded-xl transition-all duration-300 ease-spring overflow-hidden",
                        revealed
                          ? isReal
                            ? "bg-teal/8"
                            : "bg-pop/8"
                          : "bg-cream hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      <div className="flex items-stretch">
                        {/* 序号 */}
                        <div
                          className={[
                            "shrink-0 w-9 flex flex-col items-center justify-center border-r-2 border-ink font-mono font-bold",
                            revealed
                              ? isReal
                                ? "bg-teal text-cream"
                                : "bg-pop text-cream"
                              : "bg-white text-ink/70",
                          ].join(" ")}
                        >
                          <span className="text-[11px] opacity-70">#</span>
                          <span className="text-[14px]">{i + 1}</span>
                        </div>

                        {/* 主内容 */}
                        <div className="flex-1 px-3.5 py-2.5">
                          <p className="text-[13.5px] lg:text-[14px] text-ink leading-relaxed">
                            {s.text}
                          </p>

                          {revealed && (
                            <div
                              className={[
                                "mt-2 pt-2 border-t border-ink/10 flex items-start gap-1.5 text-[11.5px] leading-relaxed",
                                isReal ? "text-teal" : "text-pop",
                              ].join(" ")}
                            >
                              {isReal ? (
                                <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={3} />
                              ) : (
                                <X className="w-3.5 h-3.5 mt-0.5 shrink-0" strokeWidth={3} />
                              )}
                              <span>{s.why}</span>
                            </div>
                          )}
                        </div>

                        {/* 按钮 */}
                        <div className="shrink-0 flex flex-col gap-1.5 p-2 border-l-2 border-ink/10">
                          <button
                            onClick={() => setPicked((p) => ({ ...p, [s.id]: "real" }))}
                            className={[
                              "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-200",
                              state === "real"
                                ? "bg-teal text-cream"
                                : "bg-white text-ink/70 hover:bg-teal/15",
                            ].join(" ")}
                          >
                            真
                          </button>
                          <button
                            onClick={() => setPicked((p) => ({ ...p, [s.id]: "fake" }))}
                            className={[
                              "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[10px] font-bold transition-all duration-200",
                              state === "fake"
                                ? "bg-pop text-cream"
                                : "bg-white text-ink/70 hover:bg-pop/15",
                            ].join(" ")}
                          >
                            编
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 底部小提示 */}
              <div className="mt-4 pt-3 border-t border-ink/10 flex items-center justify-between gap-3">
                <p className="font-mono text-[10.5px] text-ink/50 leading-relaxed">
                  5 个回答里 2 真 3 编 · 真答案：Hopfield + Hinton（nobelprize.org 2024-10-08）
                </p>
                {total > 0 && (
                  <button
                    onClick={() => setPicked({})}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 hover:text-ink transition-colors px-2 py-1 border border-ink/15 rounded-md"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
