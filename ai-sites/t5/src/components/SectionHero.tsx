/**
 * Section 01 · Hero「T5 是什么？」
 *
 * Hero 开场纪律：H1「XXX 是什么？」+ 一句话定义（陈述句，零比喻零否定式）。
 *
 * 右边核心交互：「text-to-text 万能格式器」
 *   ─ 6 个任务前缀 chip
 *   ─ 一个输入框（用户可改）
 *   ─ 实时拼装 T5 的输入字符串（带高亮 prefix）+ 期望输出字符串
 *
 * 跟 bert SectionWhat（点单词 mask + top-4 候选）的区别：
 *   ─ bert 是「mask 一个 token，看 top-4 候选」预测式交互
 *   ─ 这里是「切任务，看 T5 怎么把任务包装成字符串」格式化式交互
 */
import React, { useMemo, useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

type Task = {
  id: string;
  label: string;
  /** T5 输入前缀（来自原 paper Table 1 / Appendix D） */
  prefix: string;
  /** 用户输入框的默认值 */
  defaultInput: string;
  /** 这个任务的期望输出（手挑示例，跟原 paper / FLAN-T5 demo 一致量级） */
  expectedOut: string;
  /** 这个任务的人类一句话解释 */
  hint: string;
};

const TASKS: Task[] = [
  {
    id: "translate",
    label: "翻译",
    prefix: "translate English to German:",
    defaultInput: "That is good.",
    expectedOut: "Das ist gut.",
    hint: "WMT 翻译任务 · 前缀里写明源语言和目标语言。",
  },
  {
    id: "summarize",
    label: "摘要",
    prefix: "summarize:",
    defaultInput:
      "Researchers at Google released a paper called T5 in 2019 proposing that every NLP task can be cast as text-to-text. The model is an encoder-decoder transformer pretrained on a 750GB English corpus called C4.",
    expectedOut: "Google's 2019 T5 paper unifies all NLP tasks as text-to-text using an encoder-decoder pretrained on C4.",
    hint: "CNN/DailyMail 风格摘要 · 输入文章 · 输出短摘要。",
  },
  {
    id: "cola",
    label: "判断合不合语法",
    prefix: "cola sentence:",
    defaultInput: "The course is jumping well.",
    expectedOut: "not_acceptable",
    hint: "CoLA 句子可接受性 · 输出 acceptable / not_acceptable 这两个字符串。",
  },
  {
    id: "stsb",
    label: "句对相似度",
    prefix: "stsb sentence1: A man is playing a guitar. sentence2:",
    defaultInput: "Someone is strumming a guitar.",
    expectedOut: "4.2",
    hint: "STS-B 相似度（0~5 浮点）· 输出连小数都是字符串。",
  },
  {
    id: "mnli",
    label: "蕴含判断",
    prefix: "mnli hypothesis: The man is sleeping. premise:",
    defaultInput: "A man stands at the door, eyes wide open.",
    expectedOut: "contradiction",
    hint: "MNLI · 三选一字符串：entailment / neutral / contradiction。",
  },
  {
    id: "qa",
    label: "阅读理解",
    prefix:
      "question: What did Google release in 2019? context:",
    defaultInput:
      "In 2019, Google released the T5 paper proposing text-to-text transfer learning.",
    expectedOut: "the T5 paper",
    hint: "SQuAD 风格 · 给问题和原文，输出原文里的答案 span。",
  },
];

const SectionHero: React.FC = () => {
  const [taskId, setTaskId] = useState<string>("translate");
  const [userInput, setUserInput] = useState<string>(TASKS[0].defaultInput);

  const task = useMemo(() => TASKS.find((t) => t.id === taskId)!, [taskId]);

  /* 切任务时重置输入 */
  const handleTaskChange = (id: string) => {
    setTaskId(id);
    const t = TASKS.find((x) => x.id === id);
    if (t) setUserInput(t.defaultInput);
  };

  /* T5 完整输入字符串 = prefix + " " + input */
  const fullInput = `${task.prefix} ${userInput}`.trim();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[6%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                T5 · text-to-text · 文字进文字出
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              T5
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
                  左边读整句、右边一个字一个字写出答案的模型，把所有任务都变成「文字进、文字出」。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                原来翻译有翻译的模型、分类有分类的模型，每种任务输出格式都不同。
              </p>
              <p>
                T5 一刀切：每个任务前面加个英文前缀（`translate ...` `summarize:` `cola sentence:`），输入和输出都是普通字符串。
              </p>
              <p>
                它不聊天，专门做格式转换 —— 把翻译、摘要、判断这些任务全写成「文字进、文字出」。
              </p>
              <p>
                论文 arXiv:1910.10683 · 5 个尺寸 Small/Base/Large/3B/11B · 在 750 GB 的 C4 语料上预训练。
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
                  这站讲的「编码器 / 解码器」这些零件，都是 Transformer 这套结构拆出来的。先看《Transformer》搞懂底座，再回来看 T5 怎么用它。
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，就是「把任务变成字符串」这个动作本身。换任务前缀、改输入，看 T5 的入参出参实时怎么变。
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

          {/* 右：text-to-text 万能格式器 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  text-to-text formatter
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                  ① 切任务 · ② 改输入
                </div>
              </div>

              {/* 6 个任务 chip */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {TASKS.map((t) => {
                  const on = t.id === taskId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTaskChange(t.id)}
                      className={[
                        "px-3 py-1.5 rounded-full border-2 border-ink font-display text-[12.5px] font-bold transition-all duration-250 ease-spring",
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

              {/* hint 提示行 */}
              <p
                key={`hint-${task.id}`}
                className="font-mono text-[11px] text-ink/50 leading-relaxed mb-3 animate-enter-fade"
              >
                {task.hint}
              </p>

              {/* 用户可改输入 */}
              <div className="mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                  ② 你的原始输入
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  rows={task.id === "summarize" || task.id === "qa" ? 3 : 2}
                  className="w-full px-3 py-2.5 bg-cream border-2 border-ink rounded-md font-mono text-[12.5px] text-ink leading-relaxed resize-none focus:outline-none focus:bg-butter/30 transition-colors"
                />
              </div>

              {/* T5 输入字符串（带 prefix 高亮） */}
              <div className="mb-4">
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    T5 的实际输入 · 一整串字符串
                  </div>
                  <div className="font-mono text-[9.5px] text-coral">
                    ↓ 前缀就这么塞前面
                  </div>
                </div>
                <div className="px-3 py-2.5 bg-ink rounded-md font-mono text-[12.5px] leading-relaxed break-words">
                  <span className="text-coral font-bold">{task.prefix}</span>{" "}
                  <span className="text-cream">{userInput}</span>
                </div>
              </div>

              {/* T5 期望输出 */}
              <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
                <div className="flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-full font-display text-[15px] font-extrabold text-ink shadow-stamp">
                  T5
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    期望输出 · 同样是字符串
                  </div>
                  <div
                    key={`out-${task.id}`}
                    className="px-3 py-2 bg-butter/45 border-2 border-ink rounded-md font-mono text-[13.5px] text-ink font-semibold animate-enter-pop"
                  >
                    {task.expectedOut}
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                前缀格式来自 T5 原论文 · Raffel et al. arXiv:1910.10683 · Appendix D
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
