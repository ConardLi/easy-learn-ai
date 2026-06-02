/**
 * SectionZeroVsFew · 同一道题，给几个例子差在哪？
 *
 * 交互（L3 slider）：拖一个 0→3 的滑杆，控制「给模型看几个例子」。
 * 左边是给出的例子卡（按数量出现），右边是模型对两句新评论的回答 ——
 * 0 个例子时格式飘忽、啰嗦；给到 3 个，输出整齐统一。
 * 模拟输出标「示意」。
 */
import React, { useState } from "react";
import { Sparkles } from "lucide-react";

const SHOT_EXAMPLES = [
  { in: "这家店太慢了", out: "负面" },
  { in: "包装很用心", out: "正面" },
  { in: "还行吧不好不坏", out: "中性" },
];

// 两句要分类的新评论 + 不同示例数下模型的「示意」回答
const TESTS = [
  {
    text: "等了半小时才上菜",
    answers: [
      "这条评论像是在抱怨上菜太慢，应该偏负面吧。",
      "负面评价",
      "负面",
    ],
  },
  {
    text: "服务员特别周到",
    answers: [
      "好评！顾客挺满意的~",
      "正面",
      "正面",
    ],
  },
];

const QUALITY = [
  { label: "格式乱、还啰嗦", color: "#E07A5F" },
  { label: "开始照着学", color: "#88837C" },
  { label: "整齐又统一", color: "#1B4B5A" },
];

const SectionZeroVsFew: React.FC = () => {
  const [shots, setShots] = useState(0);
  const idx = Math.min(shots === 0 ? 0 : shots === 1 ? 1 : 2, 2);
  const quality = QUALITY[idx];

  const label =
    shots === 0 ? "zero-shot · 0 个例子" : shots === 1 ? "one-shot · 1 个例子" : `few-shot · ${shots} 个例子`;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        {/* 段标 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">0 → 3 个例子</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[680px] leading-[1.1]">
          同一道题，给几个例子差在哪？
        </h2>
        <p className="mt-5 font-sans text-[16.5px] leading-[1.75] text-ink/80 max-w-[640px]">
          任务很简单：把一句话标成「正面 / 负面 / 中性」。先一个例子都不给，看模型怎么答；
          再慢慢加例子。拖动下面的滑杆试试。
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 左：滑杆 + 给出的例子 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55">
                  你给模型看的例子
                </span>
                <span
                  className="font-mono font-bold text-[11px] px-2.5 py-1 rounded-full border-2 border-ink text-cream"
                  style={{ backgroundColor: quality.color }}
                >
                  {shots} 个
                </span>
              </div>

              {/* slider */}
              <input
                type="range"
                min={0}
                max={3}
                step={1}
                value={shots}
                onChange={(e) => setShots(Number(e.target.value))}
                className="w-full accent-coral cursor-pointer"
                aria-label="示例数量"
              />
              <div className="flex justify-between font-mono text-[10.5px] text-ink/50 mt-1.5 px-0.5">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-ink text-cream rounded-full font-mono text-[11px] font-bold tracking-[0.1em]">
                {label}
              </div>

              {/* 例子卡 */}
              <div className="mt-4 space-y-2 min-h-[140px]">
                {shots === 0 ? (
                  <div className="border-2 border-dashed border-ink/30 rounded-xl px-3 py-6 text-center">
                    <span className="font-sans text-[13.5px] text-ink/55 leading-relaxed">
                      一个例子都没给，
                      <br />
                      模型只能凭自己的理解猜你想要啥。
                    </span>
                  </div>
                ) : (
                  SHOT_EXAMPLES.slice(0, shots).map((ex, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-butter-tint border-2 border-ink rounded-xl px-3 py-2 animate-enter-up"
                    >
                      <span className="font-mono text-[10px] text-ink/45 w-4">{i + 1}</span>
                      <span className="font-sans text-[13px] text-ink flex-1">{ex.in}</span>
                      <span className="font-mono text-ink/40">→</span>
                      <span className="font-mono font-bold text-[12px] px-2 py-0.5 rounded-md border-2 border-ink bg-white text-ink">
                        {ex.out}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 右：模型回答 */}
          <div className="lg:col-span-7">
            <div className="relative border-[3px] border-ink rounded-2xl bg-white shadow-stamp-lg p-5">
              {/* 示意 badge */}
              <span className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-1 bg-butter border-2 border-ink rounded-full font-mono text-[10px] font-bold tracking-[0.14em] uppercase text-ink shadow-stamp">
                <Sparkles className="w-3 h-3" strokeWidth={2.4} />
                示意
              </span>

              <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55 mb-4">
                模型对两句新评论的回答
              </div>

              <div className="space-y-4" key={shots}>
                {TESTS.map((t, i) => (
                  <div key={i} className="animate-enter-fade">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[10px] text-ink/45">新问题</span>
                      <span className="font-sans text-[13.5px] font-bold text-ink">
                        「{t.text}」
                      </span>
                    </div>
                    <div
                      className="rounded-xl px-3.5 py-3 border-2 border-ink font-sans text-[14px] leading-relaxed"
                      style={{
                        backgroundColor: idx === 2 ? "#FEF6D3" : "#FBEFE3",
                      }}
                    >
                      <span className="font-mono text-[10px] text-ink/45 block mb-0.5">模型：</span>
                      <span className="text-ink">{t.answers[idx]}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t-2 border-dashed border-ink/20 flex items-center gap-2.5">
                <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/55">
                  这次的输出
                </span>
                <span
                  className="font-display font-bold text-[15px]"
                  style={{ color: quality.color }}
                >
                  {quality.label}
                </span>
              </div>
            </div>

            <p className="mt-4 font-sans text-[14px] leading-[1.7] text-ink/70">
              0 个例子时模型不一定答错，但它不知道你要的格式 —— 有时啰嗦，有时跑偏。
              给几个例子之后，它照着例子的样子答，标签和格式都稳了。
              <span className="text-ink/50">（输出为示意，帮你感受趋势，不是真实测量）</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionZeroVsFew;
