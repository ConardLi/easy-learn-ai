/**
 * Section 02 · ChatGPT Moment · 为啥它会按要求做事
 *
 * 反模板（vs §01）：
 *   §01 = 右侧逐字接龙（input 驱动 + 概率条）
 *   §02 = 左右双栏静态对比 + 顶部 2-task 切换
 *
 * 教学路径：
 *   - 上节看到：模型只会「接龙」
 *   - 这节看到：同样一句指令，"光会接龙的模型"和"被人调教过的模型"答得完全不一样
 *   - 这就是 ChatGPT 出圈那一刻发生的事 —— 训练方式变了
 */
import React, { useState } from "react";
import { Check, X, MessageSquare } from "lucide-react";

interface Task {
  id: string;
  label: string;
  /** 用户输入的一句话 */
  prompt: string;
  /** Base（只会接龙的）模型怎么"续写" */
  baseLines: string[];
  baseTrap: string;
  /** Instruct（被调教过的）模型怎么"答题" */
  instructAnswer: string;
}

const TASKS: Task[] = [
  {
    id: "translate",
    label: "翻译",
    prompt: "把下面这句翻成英文：明天会下雨。",
    baseLines: [
      "把下面这句翻成英文：明天会下雨。",
      "把下面这句翻成日文：明日は雨が降ります。",
      "把下面这句翻成法文：Il va pleuvoir demain.",
      "把下面这句翻成德文：Morgen …",
    ],
    baseTrap: "把指令本身当成了「题目接龙」，又造了几道姐妹题",
    instructAnswer: "It will rain tomorrow.",
  },
  {
    id: "summarize",
    label: "总结",
    prompt: "用一句话告诉我量子计算是什么。",
    baseLines: [
      "用一句话告诉我量子计算是什么。",
      "请用通俗的话解释量子纠缠。",
      "请举一个量子计算的应用例子。",
      "请说说量子计算和经典计算的差别。",
    ],
    baseTrap: "把这道题往下接成了「题库」—— 续写更多类似的题面",
    instructAnswer:
      "量子计算用「能同时处于多种状态」的比特做运算，处理某些问题比传统电脑快得多。",
  },
];

const SectionChatGPTMoment: React.FC = () => {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const task = TASKS.find((t) => t.id === taskId)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="mb-12 max-w-3xl">
          <div className="section-anchor">
            <span className="section-anchor-num">02</span>
            <span className="section-anchor-label">CHATGPT MOMENT</span>
          </div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            既然只会接话，
            <br />
            为啥它
            <span className="relative inline-block">
              <span className="relative z-10">听得懂你的要求</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-3.5 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
            ？
          </h2>
          <div className="space-y-3 font-sans text-[15px] text-ink/75 leading-relaxed">
            <p>
              上一节看到：模型骨子里只会接龙。可你打开 ChatGPT
              说「翻译这句」，它真的就翻译了 —— 没有续写更多翻译题。
            </p>
            <p>
              因为 ChatGPT 是<strong className="text-ink">在接龙模型基础上，又被人「调教」过一轮</strong>：
              告诉它"我让你做事，你就直接做，不要把指令当题目接下去"。
              下面这两栏就是同一道题、两种模型的答案。
            </p>
          </div>
        </div>

        {/* 任务切换 */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mr-1">
            换一道题
          </span>
          {TASKS.map((t) => {
            const active = t.id === taskId;
            return (
              <button
                key={t.id}
                onClick={() => setTaskId(t.id)}
                className={[
                  "px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[12px] transition-all duration-200 ease-spring",
                  active
                    ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                    : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* 用户提问 */}
        <div className="mb-5 max-w-2xl">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-lg shadow-stamp mt-0.5">
              <MessageSquare className="w-4 h-4 text-ink" strokeWidth={2.2} />
            </div>
            <div className="flex-1 bg-cream border-2 border-ink rounded-xl p-3 shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                你说
              </div>
              <div
                key={task.id}
                className="font-sans text-[14px] text-ink leading-relaxed animate-enter-fade"
              >
                {task.prompt}
              </div>
            </div>
          </div>
        </div>

        {/* 双栏对比 */}
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {/* Base */}
          <div
            key={`base-${task.id}`}
            className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 animate-enter-fade"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display font-extrabold text-[16px] text-ink leading-tight">
                  原始接龙模型
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mt-0.5">
                  Base · 没被调教过
                </div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-white border-2 border-ink rounded-full flex items-center justify-center shadow-[2px_2px_0_0_#241C15]">
                <X className="w-4 h-4 text-coral" strokeWidth={3} />
              </div>
            </div>

            <div className="bg-cream border-2 border-ink rounded-xl p-4 mb-3 min-h-[160px]">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 mb-2">
                它接出来的
              </div>
              <div className="space-y-1">
                {task.baseLines.map((line, i) => (
                  <div
                    key={i}
                    className={[
                      "font-mono text-[12px] leading-relaxed",
                      i === 0 ? "text-ink/75" : "text-ink/40",
                    ].join(" ")}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>

            <div className="font-sans text-[12.5px] text-coral leading-relaxed flex items-start gap-1.5">
              <span className="font-bold flex-shrink-0">问题：</span>
              <span>{task.baseTrap}。</span>
            </div>
          </div>

          {/* Instruct */}
          <div
            key={`inst-${task.id}`}
            className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 animate-enter-fade"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display font-extrabold text-[16px] text-butter leading-tight">
                  调教过的对话模型
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/60 mt-0.5">
                  ChatGPT / Claude / Gemini 那种
                </div>
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-butter border-2 border-cream rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-ink" strokeWidth={3} />
              </div>
            </div>

            <div className="bg-cream/10 border-2 border-cream/40 rounded-xl p-4 mb-3 min-h-[160px] flex items-center">
              <div className="w-full">
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-butter mb-2">
                  ↩ 它直接答
                </div>
                <div className="font-display font-bold text-[18px] lg:text-[19px] text-cream leading-relaxed">
                  {task.instructAnswer}
                </div>
              </div>
            </div>

            <div className="font-sans text-[12.5px] text-cream/85 leading-relaxed flex items-start gap-1.5">
              <span className="font-bold text-butter flex-shrink-0">变化：</span>
              <span>识别出"这是一道题"，直接给答案，不再续写题面。</span>
            </div>
          </div>
        </div>

        {/* 收尾解释 */}
        <div className="mt-8 max-w-3xl bg-cream border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-2">
            § 行话注脚（看一眼就行）
          </div>
          <div className="font-sans text-[13.5px] text-ink/80 leading-relaxed">
            "调教"这一步在行话里叫
            <span className="font-mono font-bold text-ink"> SFT + RLHF </span>
            —— 先给模型看一堆"问→答"的范例（SFT），再让人类给不同答案打分让模型学怎么答更像人想要的（RLHF）。
            细节这里不展开，你只要记住一件事：
            <strong className="text-ink">
              {" "}
              GPT-3 → ChatGPT 不是模型变聪明了，是被教会"听话办事"了。
            </strong>
          </div>
        </div>

        {/* 过渡到 §03 */}
        <p className="mt-8 max-w-3xl font-serif italic text-[14px] text-ink/55 leading-relaxed">
          —— 但「调教」这步是建立在足够大的接龙模型上的。下面看：模型怎么"足够大"的。
        </p>
      </div>
    </section>
  );
};

export default SectionChatGPTMoment;
