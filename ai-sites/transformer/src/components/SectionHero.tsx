/**
 * Section 01 · Hero
 *
 * 反模板：Hero 内嵌「RNN vs Transformer 时序播放器」，是整站视觉锚。
 *
 * 用户做什么：
 *   ─ 拖时间 slider（step 0~6），看 5 个 token 的句子在两个模型里同时演化
 *   ─ RNN 列：信息沿 t=0→1→2→3→4 串行流动，hidden state 一个柱子越走越长
 *   ─ Transformer 列：t=1 一次性所有 token 互连，attention 扇出连线点亮
 *   ─ 同步两个 footer：耗时（5 步 vs 1 步）+ 长依赖距离衰减条
 *
 * 跟 bert / llm 的明确区隔：
 *   ─ bert 是「点 token 看 attention 矩阵热力」（8×8 heatmap）
 *   ─ llm 是「token 流式生成 8 步」（一个 token 一个出）
 *   ─ 这里是「整句 token 同时被处理」，没有矩阵、没有逐字流式
 */
import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, Play, Pause } from "lucide-react";

const SENTENCE = ["猫", "坐", "在", "沙发", "上"];
const N = SENTENCE.length;

/* RNN 在 step t 处理到第 t 个 token；Transformer 在 step ≥ 1 全部一次性处理 */
const MAX_STEP = 5; // 0=未开始，1~5 RNN 走 5 步，Transformer 已经完成

const SectionHero: React.FC = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<number | null>(null);

  /* 自动播放 */
  useEffect(() => {
    if (!playing) return;
    timer.current = window.setInterval(() => {
      setStep((s) => {
        if (s >= MAX_STEP) {
          setPlaying(false);
          return MAX_STEP;
        }
        return s + 1;
      });
    }, 700);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [playing]);

  const onPlay = () => {
    if (step >= MAX_STEP) setStep(0);
    setPlaying((p) => !p);
  };

  /* RNN 的 hidden state 长度衰减：距离当前位置越远，信号越弱 */
  const rnnSignal = (i: number) => {
    if (step === 0) return 0;
    const cursor = Math.min(step, N) - 1;
    if (i > cursor) return 0;
    const d = cursor - i;
    return Math.max(0.1, 1 - d * 0.22);
  };

  /* Transformer 一旦 step≥1 就全部到位，所有 token 信号都是 1.0 */
  const trSignal = (_i: number) => (step >= 1 ? 1 : 0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动小装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Transformer · 神经网络架构
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Transformer
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
                  2017 年提出的神经网络架构，靠让每个词跟所有词算关系分，一次性看完整段输入。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                以前的 RNN 像读小说，从左往右一个字一个字看，第 100 个词读到时，第 1 个词的信号已经衰减得快没了。
              </p>
              <p>
                Transformer 把整段话同时摊开，每个词跟所有其他词算一遍关系分（attention），决定谁要重点看。
              </p>
              <p>
                这套架构后来撑起了 ChatGPT、Claude、Gemini、Llama 几乎所有主流大模型。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边按 play，看同一句话「猫坐在沙发上」分别被 RNN（串行 5 步）和 Transformer（并行 1 步）处理的差别。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看 · 先拆开 attention 到底怎么算 ↓
              </div>
            </div>
          </div>

          {/* 右：RNN vs Transformer 时序播放器 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 顶部：控制条 */}
              <div className="flex items-center justify-between mb-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  时序播放器 · step {step} / {MAX_STEP}
                </div>
                <button
                  onClick={onPlay}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-cream border-2 border-ink rounded-full font-mono text-[11px] font-bold tracking-wide shadow-[3px_3px_0_0_#E07A5F] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0_0_#E07A5F] transition-all duration-250 ease-spring"
                >
                  {playing ? (
                    <>
                      <Pause className="w-3 h-3" strokeWidth={3} /> 暂停
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" strokeWidth={3} />
                      {step >= MAX_STEP ? "重放" : "播放"}
                    </>
                  )}
                </button>
              </div>

              {/* slider 拖拽 */}
              <input
                type="range"
                min={0}
                max={MAX_STEP}
                value={step}
                onChange={(e) => {
                  setPlaying(false);
                  setStep(Number(e.target.value));
                }}
                className="w-full accent-coral mb-6"
              />

              <div className="grid grid-cols-2 gap-5">
                {/* RNN 列 */}
                <div className="px-3 py-3 bg-cream border-2 border-ink rounded-xl">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="font-display text-[14px] font-bold text-ink">RNN</div>
                    <div className="font-mono text-[9.5px] tracking-[0.16em] text-ink/55">
                      串行 · 5 步
                    </div>
                  </div>

                  {/* 5 个 token + hidden state 信号 */}
                  <div className="space-y-2">
                    {SENTENCE.map((tok, i) => {
                      const sig = rnnSignal(i);
                      const isCursor = step > 0 && i === Math.min(step, N) - 1;
                      return (
                        <div
                          key={`rnn-${i}`}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={[
                              "inline-flex items-center justify-center w-10 h-8 rounded-md border-2 font-display text-[13px] font-bold transition-all duration-300 ease-spring",
                              isCursor
                                ? "bg-coral text-cream border-ink shadow-[2px_2px_0_0_#241C15] scale-105"
                                : sig > 0
                                  ? "bg-white text-ink border-ink/70"
                                  : "bg-white text-ink/35 border-ink/15",
                            ].join(" ")}
                          >
                            {tok}
                          </span>
                          <div className="flex-1 h-3 bg-ink/8 rounded-sm overflow-hidden border border-ink/15">
                            <div
                              className="h-full bg-ink transition-all duration-500 ease-spring"
                              style={{
                                width: `${sig * 100}%`,
                                opacity: sig === 0 ? 0 : 0.85,
                              }}
                            />
                          </div>
                          <span className="font-mono text-[9px] text-ink/45 w-7 tabular-nums text-right">
                            {(sig * 100).toFixed(0)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* footer */}
                  <div className="mt-4 pt-3 border-t border-ink/10 grid grid-cols-2 gap-1.5">
                    <div>
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/55">
                        当前耗时
                      </div>
                      <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                        {Math.min(step, N)}
                        <span className="font-mono text-[10px] text-ink/55 ml-0.5">步</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/55">
                        第 1 词信号
                      </div>
                      <div className="font-display text-[20px] font-bold text-coral tabular-nums">
                        {(rnnSignal(0) * 100).toFixed(0)}
                        <span className="font-mono text-[10px] text-ink/55 ml-0.5">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transformer 列 */}
                <div className="px-3 py-3 bg-butter/35 border-2 border-ink rounded-xl">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="font-display text-[14px] font-bold text-ink">Transformer</div>
                    <div className="font-mono text-[9.5px] tracking-[0.16em] text-ink/55">
                      并行 · 1 步
                    </div>
                  </div>

                  <div className="space-y-2">
                    {SENTENCE.map((tok, i) => {
                      const sig = trSignal(i);
                      return (
                        <div
                          key={`tr-${i}`}
                          className="flex items-center gap-2"
                        >
                          <span
                            className={[
                              "inline-flex items-center justify-center w-10 h-8 rounded-md border-2 font-display text-[13px] font-bold transition-all duration-300 ease-spring",
                              sig > 0
                                ? "bg-ink text-cream border-ink shadow-[2px_2px_0_0_#241C15]"
                                : "bg-white text-ink/35 border-ink/15",
                            ].join(" ")}
                            style={{
                              transitionDelay: `${i * 35}ms`,
                            }}
                          >
                            {tok}
                          </span>
                          <div className="flex-1 h-3 bg-ink/8 rounded-sm overflow-hidden border border-ink/15">
                            <div
                              className="h-full bg-coral transition-all duration-500 ease-spring"
                              style={{
                                width: `${sig * 100}%`,
                                transitionDelay: `${i * 35}ms`,
                              }}
                            />
                          </div>
                          <span className="font-mono text-[9px] text-ink/45 w-7 tabular-nums text-right">
                            {(sig * 100).toFixed(0)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/10 grid grid-cols-2 gap-1.5">
                    <div>
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/55">
                        当前耗时
                      </div>
                      <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                        {step >= 1 ? 1 : 0}
                        <span className="font-mono text-[10px] text-ink/55 ml-0.5">步</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/55">
                        第 1 词信号
                      </div>
                      <div className="font-display text-[20px] font-bold text-teal tabular-nums">
                        {(trSignal(0) * 100).toFixed(0)}
                        <span className="font-mono text-[10px] text-ink/55 ml-0.5">%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/45 leading-relaxed">
                信号衰减按 1 − 0.22·d 估算（d = 当前位置到目标距离）；Transformer 任一位置都能在单步内拿到所有位置原信号。架构源头：arXiv:1706.03762 §3。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
