/**
 * SectionTrace · 单步看一条推理链
 *
 * L2 单步 trace（next / prev / reset）：
 *   - 一道图书馆藏书题，按「想法 + 当前数字」一步步揭开
 *   - 右侧有个跟着步骤变的「当前还剩」读数，让用户看见每步怎么把数推到答案
 *   - 用 slice(0, cursor) 渲染，避免布局抖
 */
import React, { useState } from "react";
import { ArrowRight, ArrowLeft, RotateCcw, Flag } from "lucide-react";

type Step = {
  think: string;
  calc: string;
  running: string;
};

const QUESTION = "图书馆周一有 240 本书。周二借出 1/4，周三还回来 18 本，周四又买进 30 本。现在有多少本？";

const STEPS: Step[] = [
  {
    think: "先把题目里的起点记下来：周一是 240 本。",
    calc: "起点 = 240 本",
    running: "240",
  },
  {
    think: "周二借出 1/4，先算借走多少：240 的四分之一是 60，剩下的是 240 减 60。",
    calc: "240 ÷ 4 = 60 借出 → 240 − 60 = 180",
    running: "180",
  },
  {
    think: "周三有人还回 18 本，加回去。",
    calc: "180 + 18 = 198",
    running: "198",
  },
  {
    think: "周四又买进 30 本，再加上。",
    calc: "198 + 30 = 228",
    running: "228",
  },
  {
    think: "四步走完，这就是现在的藏书数。",
    calc: "答案 = 228 本",
    running: "228",
  },
];

const SectionTrace: React.FC = () => {
  // cursor = 已揭开的步数（0 表示还没开始）
  const [cursor, setCursor] = useState(1);
  const done = cursor >= STEPS.length;
  const current = STEPS[cursor - 1];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24 pb-20 lg:pb-24 bg-cream border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Trace · 一条推理链</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1] max-w-[820px]">
          一步一步，
          <span className="relative inline-block">
            <span className="absolute inset-x-0 bottom-1 h-3 bg-butter -z-0" />
            <span className="relative z-10">把题推到答案</span>
          </span>
        </h2>
        <p className="font-sans text-[16px] leading-[1.75] text-ink/75 mt-5 max-w-[800px]">
          这就是模型「先想再答」时在做的事：把一道题拆成几小步，前一步的结果接着喂给下一步。
          <span className="font-bold text-ink"> 点「下一步」自己走一遍。</span>
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左：题目 + 已揭开的步骤 */}
          <div className="lg:col-span-8">
            <div className="bg-ink text-cream rounded-2xl border-2 border-ink px-5 py-4 shadow-stamp">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-butter mb-1.5">
                题目 · 示意
              </div>
              <p className="font-sans text-[15px] leading-[1.65]">{QUESTION}</p>
            </div>

            <div className="mt-5 space-y-3 min-h-[260px]">
              {STEPS.slice(0, cursor).map((s, i) => {
                const isLast = i === cursor - 1;
                const isAnswer = i === STEPS.length - 1;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border-2 border-ink px-5 py-4 transition-all duration-300 ease-spring ${
                      isLast ? "shadow-stamp-lg -translate-y-0.5" : "shadow-stamp"
                    } ${isAnswer ? "bg-butter" : "bg-white"} ${isLast ? "animate-enter-fade" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex-shrink-0 w-7 h-7 rounded-lg border-2 border-ink font-mono text-[12px] font-bold flex items-center justify-center ${
                          isAnswer ? "bg-ink text-cream" : "bg-[#7A28CB] text-cream"
                        }`}
                      >
                        {isAnswer ? <Flag className="w-3.5 h-3.5" strokeWidth={2.6} /> : i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-sans text-[14.5px] leading-[1.6] text-ink/85">{s.think}</p>
                        <div className="mt-2 inline-block font-mono text-[13px] font-bold text-ink bg-cream border-2 border-ink rounded-lg px-3 py-1.5">
                          {s.calc}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 控制 */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setCursor((c) => Math.max(1, c - 1))}
                disabled={cursor <= 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-ink bg-white font-sans font-bold text-[13.5px] text-ink shadow-stamp disabled:opacity-35 disabled:cursor-not-allowed enabled:hover:-translate-x-0.5 enabled:hover:-translate-y-0.5 enabled:hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.6} /> 上一步
              </button>
              <button
                type="button"
                onClick={() => setCursor((c) => Math.min(STEPS.length, c + 1))}
                disabled={done}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-ink bg-ink text-cream font-sans font-bold text-[13.5px] shadow-stamp disabled:opacity-35 disabled:cursor-not-allowed enabled:hover:-translate-x-0.5 enabled:hover:-translate-y-0.5 enabled:hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                {done ? "走完了" : "下一步"} <ArrowRight className="w-4 h-4" strokeWidth={2.6} />
              </button>
              <button
                type="button"
                onClick={() => setCursor(1)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 border-ink bg-cream font-sans font-bold text-[13.5px] text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.6} /> 重来
              </button>
            </div>
          </div>

          {/* 右：跟着步骤变的读数 */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border-2 border-ink bg-white shadow-stamp p-5 lg:sticky lg:top-8">
              <div className="font-mono text-[10.5px] tracking-[0.2em] uppercase text-ink/60 mb-2">
                当前算到
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[clamp(2.6rem,6vw,3.4rem)] leading-none text-[#7A28CB]">
                  {current.running}
                </span>
                <span className="font-mono text-[14px] text-ink/60">本</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-cream border-2 border-ink overflow-hidden">
                <div
                  className="h-full bg-[#7A28CB] transition-all duration-400 ease-spring"
                  style={{ width: `${(cursor / STEPS.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 font-mono text-[10.5px] text-ink/55">
                第 {cursor} / {STEPS.length} 步
              </div>

              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20">
                <p className="font-sans text-[13px] leading-[1.6] text-ink/70">
                  每一步只动一点点，中间结果都写下来。哪一步算错了，回头一眼就能找到。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionTrace;
