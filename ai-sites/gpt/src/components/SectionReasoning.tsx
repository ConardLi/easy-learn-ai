/**
 * Section 06 · 直接答 vs 先 think · GPT-4o vs o3
 *
 * 主交互（L3 单步 trace）：右边 o3 思考链用户点 next 一步步展开
 * 次视觉：同一道概率题，左边 GPT-4o 一行答出（错），右边 o3 5 步推导出对的
 *
 * benchmark 数据（AIME 2024 pass@1）：
 *   ─ GPT-4o：13.4% · OpenAI o1 blog 2024-09-12
 *   ─ o1：74.3% · OpenAI o1 blog
 *   ─ o3：93.4% · TechTarget 2025 综述 / OpenAI o3 system card
 *   ─ o4-mini：93.4% 同档
 *
 * 反 deepseek-r1 站 GRPO「评分员」叙事：这里我们不讲怎么训出来的，
 * 只让用户亲眼看「同一题、同一道、答案天差地别」。
 */
import React, { useState } from "react";
import { ArrowRight, Check, X, RotateCcw } from "lucide-react";

const PROBLEM = "袋子里 3 红 2 蓝。不放回连摸 2 次，都是红的概率？";

const O3_TRACE: { tag: string; body: string }[] = [
  {
    tag: "think 1",
    body: "第一次摸到红的概率 = 3 / 5。",
  },
  {
    tag: "think 2",
    body: "重要：不放回。第一次拿走 1 红，袋里剩 2 红 + 2 蓝 = 4 张。",
  },
  {
    tag: "think 3",
    body: "第二次摸到红的概率 = 2 / 4 = 1 / 2。",
  },
  {
    tag: "think 4",
    body: "连摸都红 = 3/5 × 1/2 = 3/10。",
  },
  {
    tag: "Wait.",
    body: "用组合数验一下：C(3,2) / C(5,2) = 3 / 10。对得上。",
  },
  {
    tag: "answer",
    body: "3 / 10 = 0.30",
  },
];

const AIME_24 = [
  { name: "GPT-4o", v: 13.4, tone: "#88837C" },
  { name: "o1", v: 74.3, tone: "#1B4B5A" },
  { name: "o1-pro", v: 89.0, tone: "#1B4B5A" },
  { name: "o3", v: 93.4, tone: "#E07A5F" },
  { name: "o4-mini", v: 93.4, tone: "#E07A5F" },
  { name: "GPT-5", v: 99.6, tone: "#FF4D74" },
];

const SectionReasoning: React.FC = () => {
  const [cursor, setCursor] = useState(0); /* o3 trace cursor */
  const last = cursor === O3_TRACE.length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">direct vs think · o-series</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              同一道题，
              <br />
              <span className="bg-butter/55 px-1.5">先 think 一会儿 vs 张嘴就答。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              2024 年 9 月 OpenAI 出了第一支 reasoning 模型 o1，给了 LLM 一个新动作 —— 答之前在
              <code className="font-mono text-[12.5px] px-1 mx-0.5 bg-cream border border-ink/15 rounded">&lt;think&gt;</code>
              里先推一遍。
              你点右边的 next，看 o3 一步步推到正确答案；左边 GPT-4o 凭直觉答，错了。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                同一道题
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug">
                {PROBLEM}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* 左：GPT-4o 直接答 */}
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 直接答
                </span>
                <span className="font-display text-[16px] font-bold text-ink">GPT-4o</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-ink/55">2024-05</span>
            </div>

            <div className="p-4 bg-cream/60 border-2 border-ink rounded-xl min-h-[280px] flex flex-col">
              <div className="font-mono text-[10.5px] text-ink/55 mb-2">
                user → {PROBLEM}
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-[10.5px] text-ink/55 mb-2">model → ...</div>
                  <div className="font-display text-[44px] font-bold text-ink/85 tabular-nums leading-none">
                    9/25
                  </div>
                  <div className="font-mono text-[11px] text-ink/55 mt-2">
                    （按 3/5 × 3/5 算的，忘了不放回）
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 px-3 py-2 bg-pop/10 border-2 border-pop rounded-lg">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-pop">
                  <X className="w-3 h-3 text-cream" strokeWidth={3.5} />
                </span>
                <span className="font-mono text-[12px] font-bold text-ink">
                  正确答案是 3/10。错了。
                </span>
              </div>
            </div>
          </div>

          {/* 右：o3 先 think */}
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 先 think
                </span>
                <span className="font-display text-[16px] font-bold text-ink">o3</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-ink/55">2025-04</span>
            </div>

            <div className="p-4 bg-cream/60 border-2 border-ink rounded-xl min-h-[280px]">
              <div className="font-mono text-[10.5px] text-ink/55 mb-2">
                user → {PROBLEM}
              </div>

              {/* trace steps slice */}
              <div className="space-y-1.5 mb-3">
                {O3_TRACE.slice(0, cursor).map((s, i) => {
                  const isAnswer = s.tag === "answer";
                  const isWait = s.tag === "Wait.";
                  return (
                    <div
                      key={i}
                      className={[
                        "px-3 py-2 border-2 rounded-lg animate-enter-up",
                        isAnswer
                          ? "bg-teal text-cream border-ink"
                          : isWait
                          ? "bg-butter/60 border-ink"
                          : "bg-white border-ink/85",
                      ].join(" ")}
                    >
                      <div
                        className={[
                          "font-mono text-[9.5px] uppercase tracking-[0.15em] font-bold mb-0.5",
                          isAnswer ? "text-cream/75" : "text-ink/55",
                        ].join(" ")}
                      >
                        [{s.tag}]
                      </div>
                      <div
                        className={[
                          "text-[13px] leading-relaxed",
                          isAnswer ? "font-display font-bold text-[20px] text-butter" : "text-ink/85",
                        ].join(" ")}
                      >
                        {s.body}
                      </div>
                    </div>
                  );
                })}

                {cursor === 0 && (
                  <div className="p-4 bg-white border-2 border-dashed border-ink/30 rounded-lg text-center">
                    <div className="font-mono text-[11px] text-ink/55">
                      ↓ 点 next 看 o3 怎么想
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3">
                {!last ? (
                  <button
                    onClick={() => setCursor((c) => Math.min(c + 1, O3_TRACE.length))}
                    className="flex-1 btn-stamp bg-ink text-cream hover:bg-ink"
                  >
                    next ({cursor}/{O3_TRACE.length})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-teal/10 border-2 border-teal rounded-lg">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-teal">
                      <Check className="w-3 h-3 text-cream" strokeWidth={3.5} />
                    </span>
                    <span className="font-mono text-[12px] font-bold text-ink">
                      6 步推到 3/10。对了。
                    </span>
                  </div>
                )}
                <button
                  onClick={() => setCursor(0)}
                  className="px-3 py-2.5 border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink/65 hover:bg-cream transition-all"
                  aria-label="重来"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* AIME 24 bar */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-display text-[20px] font-bold text-ink">
              AIME 2024 · 全美数学邀请赛 30 题 · pass@1
            </h3>
            <span className="font-mono text-[10px] text-ink/55">
              数据：openai.com/index/learning-to-reason-with-llms + o3 system card
            </span>
          </div>
          <p className="font-mono text-[11px] text-ink/55 mb-5">
            一道题做不对 vs 30 道题做对 28 道，差的不是知识，是「肯不肯先想一会儿」。
          </p>

          <div className="space-y-2">
            {AIME_24.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="w-28 font-mono text-[11.5px] font-bold text-ink shrink-0">
                  {m.name}
                </div>
                <div className="flex-1 h-7 bg-cream border-2 border-ink rounded-full overflow-hidden relative">
                  <div
                    className="h-full transition-all duration-500 ease-spring"
                    style={{ width: `${m.v}%`, backgroundColor: m.tone }}
                  />
                  <span className="absolute inset-0 flex items-center justify-end pr-3 font-mono text-[11px] font-bold text-ink tabular-nums">
                    {m.v.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionReasoning;
