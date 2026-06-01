/**
 * Section 01 · Hero · LLM 是什么
 *
 * 左：6 段定义层（eyebrow / H1 / 一句话定义 / 三段白话 / 互链卡 / 继续往下看）
 * 右：L3 视觉锚 —— 逐字预测演示
 *   ─ 用户从 3 个开头里挑一个，模型一个字一个字往后接
 *   ─ 每一步展示 top-3 候选 + 概率条，选 top-1 加到正文
 *   ─ ▶ / ⏸ / ↻ 控制，纯前端预定义剧本（不连真实 LLM）
 */
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

interface Candidate {
  ch: string;
  p: number; // 0-1
}

interface Step {
  /** 已经写完的正文（不含本步即将选的字） */
  prefix: string;
  /** top-3 候选（按概率从高到低）；top-1 = 模型本步会选的字 */
  cands: [Candidate, Candidate, Candidate];
}

interface Story {
  id: string;
  label: string;
  start: string;
  steps: Step[];
}

const STORIES: Story[] = [
  {
    id: "weather",
    label: "明天北京会",
    start: "明天北京会",
    steps: [
      {
        prefix: "明天北京会",
        cands: [
          { ch: "下", p: 0.62 },
          { ch: "比", p: 0.18 },
          { ch: "有", p: 0.09 },
        ],
      },
      {
        prefix: "明天北京会下",
        cands: [
          { ch: "雨", p: 0.58 },
          { ch: "雪", p: 0.21 },
          { ch: "起", p: 0.07 },
        ],
      },
      {
        prefix: "明天北京会下雨",
        cands: [
          { ch: "吗", p: 0.4 },
          { ch: "。", p: 0.28 },
          { ch: "，", p: 0.16 },
        ],
      },
      {
        prefix: "明天北京会下雨吗",
        cands: [
          { ch: "？", p: 0.72 },
          { ch: "。", p: 0.18 },
          { ch: "我", p: 0.04 },
        ],
      },
    ],
  },
  {
    id: "translate",
    label: "翻译：你好",
    start: "把「你好」翻译成英文：",
    steps: [
      {
        prefix: "把「你好」翻译成英文：",
        cands: [
          { ch: "H", p: 0.78 },
          { ch: "h", p: 0.13 },
          { ch: "你", p: 0.04 },
        ],
      },
      {
        prefix: "把「你好」翻译成英文：H",
        cands: [
          { ch: "e", p: 0.93 },
          { ch: "i", p: 0.04 },
          { ch: "a", p: 0.01 },
        ],
      },
      {
        prefix: "把「你好」翻译成英文：He",
        cands: [
          { ch: "l", p: 0.88 },
          { ch: "y", p: 0.07 },
          { ch: "r", p: 0.02 },
        ],
      },
      {
        prefix: "把「你好」翻译成英文：Hel",
        cands: [
          { ch: "l", p: 0.94 },
          { ch: "p", p: 0.03 },
          { ch: "i", p: 0.02 },
        ],
      },
      {
        prefix: "把「你好」翻译成英文：Hell",
        cands: [
          { ch: "o", p: 0.95 },
          { ch: "！", p: 0.02 },
          { ch: " ", p: 0.01 },
        ],
      },
      {
        prefix: "把「你好」翻译成英文：Hello",
        cands: [
          { ch: "。", p: 0.42 },
          { ch: "！", p: 0.31 },
          { ch: ".", p: 0.16 },
        ],
      },
    ],
  },
  {
    id: "novel",
    label: "从前有座山",
    start: "从前有座山，",
    steps: [
      {
        prefix: "从前有座山，",
        cands: [
          { ch: "山", p: 0.62 },
          { ch: "里", p: 0.21 },
          { ch: "上", p: 0.1 },
        ],
      },
      {
        prefix: "从前有座山，山",
        cands: [
          { ch: "里", p: 0.71 },
          { ch: "上", p: 0.18 },
          { ch: "下", p: 0.06 },
        ],
      },
      {
        prefix: "从前有座山，山里",
        cands: [
          { ch: "有", p: 0.83 },
          { ch: "住", p: 0.09 },
          { ch: "是", p: 0.03 },
        ],
      },
      {
        prefix: "从前有座山，山里有",
        cands: [
          { ch: "座", p: 0.42 },
          { ch: "个", p: 0.29 },
          { ch: "间", p: 0.16 },
        ],
      },
      {
        prefix: "从前有座山，山里有座",
        cands: [
          { ch: "庙", p: 0.74 },
          { ch: "屋", p: 0.13 },
          { ch: "山", p: 0.06 },
        ],
      },
    ],
  },
];

const TICK_MS = 1600;

const SectionHero: React.FC = () => {
  const [storyId, setStoryId] = useState(STORIES[0].id);
  const [cursor, setCursor] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const story = STORIES.find((s) => s.id === storyId)!;
  const totalSteps = story.steps.length;
  const finished = cursor >= totalSteps;

  useEffect(() => {
    if (!playing || finished) return;
    timer.current = setTimeout(() => {
      setCursor((c) => Math.min(totalSteps, c + 1));
    }, TICK_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [playing, cursor, totalSteps, finished]);

  /* 当前正文 = story.start + 已选过的 top-1 字 */
  const completedText = (() => {
    let t = story.start;
    for (let i = 0; i < cursor; i++) {
      t += story.steps[i].cands[0].ch;
    }
    return t;
  })();

  /* 当前展示的候选 = 第 cursor 步的；若已结束则停在最后一步 */
  const showStep =
    cursor < totalSteps ? story.steps[cursor] : story.steps[totalSteps - 1];

  const switchStory = (id: string) => {
    setStoryId(id);
    setCursor(0);
    setPlaying(true);
  };

  const togglePlay = () => {
    if (finished) {
      setCursor(0);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const reset = () => {
    setPlaying(false);
    setCursor(0);
  };

  const stepNext = () => {
    setPlaying(false);
    setCursor((c) => Math.min(totalSteps, c + 1));
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[6%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-butter border-2 border-ink rounded-2xl shadow-stamp -rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-28 left-[5%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-9 h-9 bg-coral border-2 border-ink rounded-full shadow-stamp rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ── 左：定义层 ── */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Large Language Model · 大语言模型
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              LLM 是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  一个特别会接话的程序：根据你输入的上文，一个字一个字往下猜，猜出来像在跟你聊天。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                ChatGPT、Claude、Gemini 都是它。你打一句「明天北京会」，它从这几个字开始，
                <strong className="text-ink">一个字一个字算下去</strong> ——
                每个位置都猜「下一个最可能是什么字」，接到能结束就停。
              </p>
              <p>
                它不"知道"任何事 —— 但因为读过的文字够多（万亿级别的网页 + 书 + 对话 +
                代码），统计上接出来的话听着就像懂。
              </p>
              <p>
                右边这张卡就是在玩接龙 —— 看每一步它怎么选下一个字。
                往下滚先看：ChatGPT 那种「能听懂人话办事」的版本，是怎么在「只会接龙」上加出来的。
              </p>
            </div>

            {/* 互链卡：分锅 LLM 字 / Token */}
            <a
              href="../token/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">想知道「字」怎么切？</span>
                <span className="text-ink/70">
                  {" "}
                  这站讲<strong className="text-ink">模型怎么接话 + 它强在哪儿</strong>。
                  「输入文字会被切成什么 token、怎么按 token 计费」—— 去《Token》那一站。
                </span>
              </span>
            </a>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
              </div>
            </div>
          </div>

          {/* ── 右：逐字预测演示 ── */}
          <div className="lg:col-span-7">
            <div className="relative bg-cream border-2 border-ink rounded-3xl shadow-stamp-xl overflow-hidden">
              {/* 卡顶 */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-b-2 border-ink bg-white">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-[15px] font-bold text-ink">
                    下一字预测
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink/45">
                    · live demo
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink/45 tabular-nums">
                  {Math.min(cursor, totalSteps)} / {totalSteps}
                </span>
              </div>

              {/* 开头选择 */}
              <div className="flex flex-wrap items-center gap-2 px-5 lg:px-6 pt-4 pb-3 border-b border-ink/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mr-1">
                  开头
                </span>
                {STORIES.map((s) => {
                  const active = s.id === storyId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => switchStory(s.id)}
                      className={[
                        "px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200 ease-spring",
                        active
                          ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                          : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* 正文显示区 */}
              <div className="px-5 lg:px-6 pt-5 pb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1.5">
                  正文（已生成）
                </div>
                <div className="bg-white border-2 border-ink rounded-xl px-4 py-3 min-h-[64px] flex items-center">
                  <p className="font-display text-[18px] lg:text-[20px] font-bold text-ink leading-relaxed break-all">
                    {completedText}
                    {!finished && (
                      <span
                        className="inline-block w-2 h-6 align-middle bg-coral ml-0.5 animate-pulse-dot"
                        aria-hidden
                      />
                    )}
                    {finished && (
                      <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-butter border-2 border-ink rounded-md font-mono text-[10px] uppercase tracking-wide">
                        ✓ 接完
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* 候选区 */}
              <div className="px-5 lg:px-6 pb-4">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                    {finished
                      ? "停在最后一步 · 点 ↻ 重看"
                      : `下一个字 · top-3 候选`}
                  </div>
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.15em] text-ink/35">
                    示意概率
                  </div>
                </div>
                <div className="space-y-1.5">
                  {showStep.cands.map((c, i) => {
                    const isPick = i === 0;
                    return (
                      <div
                        key={`${c.ch}-${i}`}
                        className={[
                          "relative flex items-center gap-3 px-3 py-2 border-2 border-ink rounded-lg transition-all duration-300",
                          isPick
                            ? "bg-butter shadow-[2px_2px_0_0_#241C15]"
                            : "bg-white",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md border-2 border-ink font-display font-extrabold text-[18px]",
                            isPick ? "bg-white text-ink" : "bg-cream text-ink/80",
                          ].join(" ")}
                        >
                          {c.ch}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="h-1.5 bg-cream border border-ink/20 rounded-full overflow-hidden">
                            <div
                              className={[
                                "h-full transition-all duration-500 ease-spring",
                                isPick ? "bg-ink" : "bg-ink/40",
                              ].join(" ")}
                              style={{ width: `${Math.round(c.p * 100)}%` }}
                            />
                          </div>
                        </div>
                        <span
                          className={[
                            "font-mono tabular-nums text-[12px] font-bold w-14 text-right",
                            isPick ? "text-ink" : "text-ink/45",
                          ].join(" ")}
                        >
                          {Math.round(c.p * 100)}%
                        </span>
                        {isPick && !finished && (
                          <span className="absolute -right-2 -top-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-coral text-white border-2 border-ink rounded-md font-mono text-[9px] font-bold uppercase tracking-wide">
                            选它
                            <ChevronRight className="w-2.5 h-2.5" strokeWidth={3} />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 控制条 */}
              <div className="flex items-center justify-between px-5 lg:px-6 py-3.5 border-t-2 border-ink bg-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={reset}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                    aria-label="重置"
                  >
                    <RotateCcw className="w-4 h-4 text-ink" strokeWidth={2.4} />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="px-4 h-9 flex items-center gap-1.5 rounded-full bg-ink text-cream border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                  >
                    {playing && !finished ? (
                      <>
                        <Pause className="w-3.5 h-3.5" strokeWidth={2.6} />
                        PAUSE
                      </>
                    ) : finished ? (
                      <>
                        <Play className="w-3.5 h-3.5" strokeWidth={2.6} />
                        REPLAY
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" strokeWidth={2.6} />
                        PLAY
                      </>
                    )}
                  </button>
                  <button
                    onClick={stepNext}
                    disabled={finished}
                    className="px-3 h-9 flex items-center rounded-full bg-white border-2 border-ink shadow-stamp font-mono text-[11px] font-bold tracking-wider disabled:opacity-30 disabled:shadow-none transition-all duration-250 ease-spring hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg"
                  >
                    NEXT
                  </button>
                </div>
                <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45">
                  接龙就是 LLM 全部
                </span>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10.5px] text-ink/45 px-1">
              概率是示意 —— 真模型每步会算几万个候选，这里只显示 top-3 帮你看清"接龙"长啥样。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
