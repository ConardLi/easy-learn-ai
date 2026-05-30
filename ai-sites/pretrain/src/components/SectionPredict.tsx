/**
 * Section 02 · 训练做的唯一一件事
 *
 * 核心动作可视化：next-token prediction。
 *
 * 反相邻：Hero 用 chip + slider，这里换 step trace + tab。
 *
 * 交互：① tab 切 3 种文本类型（事实 / 诗句 / 算术） ② step trace 推 3 个训练阶段
 * 每个阶段下：top-5 候选 + 概率 bar + 是否命中 target + 交叉熵 loss 数字。
 * 强调：这件事，重复几万亿次。
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Repeat } from "lucide-react";

type Stage = {
  step: string;
  tokensSeen: string;
  vibe: string;
};

const STAGES: Stage[] = [
  {
    step: "第 1 万 步",
    tokensSeen: "≈ 1B tokens · 训练初期",
    vibe: "几乎在乱猜",
  },
  {
    step: "第 50 万 步",
    tokensSeen: "≈ 500B tokens · 训练中期",
    vibe: "学会了语法 / 高频词",
  },
  {
    step: "第 200 万 步",
    tokensSeen: "≈ 2T tokens · 训练后期",
    vibe: "靠谱了",
  },
];

type Candidate = { w: string; p: number };

type Sentence = {
  id: string;
  label: string;
  context: string[];
  target: string;
  /** 3 个阶段对应的 top-5 候选 */
  candsByStage: Candidate[][];
};

const SENTENCES: Sentence[] = [
  {
    id: "geo",
    label: "事实",
    context: ["巴黎", "是", "法国", "的"],
    target: "首都",
    candsByStage: [
      [
        { w: "人", p: 0.14 },
        { w: "中", p: 0.12 },
        { w: "了", p: 0.10 },
        { w: "国", p: 0.09 },
        { w: "在", p: 0.08 },
      ],
      [
        { w: "国家", p: 0.21 },
        { w: "城市", p: 0.16 },
        { w: "首都", p: 0.14 },
        { w: "土地", p: 0.08 },
        { w: "中心", p: 0.07 },
      ],
      [
        { w: "首都", p: 0.71 },
        { w: "巴黎", p: 0.09 },
        { w: "国都", p: 0.06 },
        { w: "心脏", p: 0.03 },
        { w: "中心", p: 0.02 },
      ],
    ],
  },
  {
    id: "poem",
    label: "诗句",
    context: ["床", "前", "明", "月"],
    target: "光",
    candsByStage: [
      [
        { w: "了", p: 0.13 },
        { w: "天", p: 0.11 },
        { w: "里", p: 0.10 },
        { w: "中", p: 0.09 },
        { w: "上", p: 0.08 },
      ],
      [
        { w: "亮", p: 0.18 },
        { w: "光", p: 0.16 },
        { w: "色", p: 0.12 },
        { w: "夜", p: 0.10 },
        { w: "白", p: 0.08 },
      ],
      [
        { w: "光", p: 0.78 },
        { w: "亮", p: 0.07 },
        { w: "色", p: 0.04 },
        { w: "影", p: 0.03 },
        { w: "之", p: 0.02 },
      ],
    ],
  },
  {
    id: "math",
    label: "算术",
    context: ["2", "+", "3", "="],
    target: "5",
    candsByStage: [
      [
        { w: "2", p: 0.14 },
        { w: "1", p: 0.12 },
        { w: "0", p: 0.10 },
        { w: "3", p: 0.09 },
        { w: "5", p: 0.07 },
      ],
      [
        { w: "6", p: 0.18 },
        { w: "5", p: 0.16 },
        { w: "4", p: 0.13 },
        { w: "10", p: 0.09 },
        { w: "3", p: 0.07 },
      ],
      [
        { w: "5", p: 0.64 },
        { w: "6", p: 0.08 },
        { w: "4", p: 0.06 },
        { w: "10", p: 0.04 },
        { w: "8", p: 0.03 },
      ],
    ],
  },
];

const SectionPredict: React.FC = () => {
  const [sentId, setSentId] = useState("geo");
  const [stage, setStage] = useState(0);

  const sent = SENTENCES.find((s) => s.id === sentId)!;
  const cands = sent.candsByStage[stage];
  const targetCand = cands.find((c) => c.w === sent.target);
  const targetProb = targetCand?.p ?? 0.001;
  const targetRank =
    cands.findIndex((c) => c.w === sent.target) === -1
      ? "未进 top-5"
      : `#${cands.findIndex((c) => c.w === sent.target) + 1}`;
  const ceLoss = -Math.log(Math.max(targetProb, 0.0005));

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">predict-the-next</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* 左：说明 */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5 leading-[1.08]">
              整个训练，
              <br />
              只在做一件事。
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                掐掉一句话的最后一个字，让模型猜。猜对了，权重就往「这次也这样猜」推一下；猜错了，往反方向推一下。
              </p>
              <p>
                这个动作叫{" "}
                <span className="font-mono text-[13.5px] bg-butter-tint px-1.5 py-0.5 rounded border border-ink/15">
                  next-token prediction
                </span>{" "}
                。GPT-4、Llama 4、DeepSeek V3 全是一个套路。
              </p>
              <p>
                右边这块卡，挑一个文本，再拖训练阶段。看模型从「乱猜」一路猜到「知道答案」。
              </p>
            </div>

            <div className="mt-7 inline-flex items-center gap-2.5 bg-ink text-cream px-4 py-2.5 rounded-full border-2 border-ink shadow-stamp">
              <Repeat className="w-4 h-4" strokeWidth={2.5} />
              <span className="font-mono text-[11.5px] uppercase tracking-[0.18em] font-semibold">
                重复 几万亿 次
              </span>
            </div>
          </div>

          {/* 右：交互 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 文本 tab */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 选一段文本
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                {SENTENCES.map((s) => {
                  const on = s.id === sentId;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSentId(s.id)}
                      className={[
                        "px-4 py-2 rounded-full border-2 border-ink font-sans text-[13px] font-semibold transition-all duration-250 ease-spring",
                        on
                          ? "bg-coral text-white shadow-stamp"
                          : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* 句子 + blank */}
              <div
                key={`${sent.id}-${stage}`}
                className="bg-cream border-2 border-ink rounded-2xl p-5 mb-6 animate-enter-fade"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  {sent.context.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white border-2 border-ink rounded-lg font-mono text-[14px] font-semibold text-ink/80"
                    >
                      {t}
                    </span>
                  ))}
                  <span className="font-mono text-[20px] text-ink/40">→</span>
                  <span
                    className="px-3 py-1.5 bg-butter border-2 border-dashed border-ink rounded-lg font-mono text-[14px] font-bold text-ink"
                    style={{ minWidth: "44px", textAlign: "center" }}
                  >
                    ?
                  </span>
                </div>
                <div className="mt-3 font-mono text-[11px] text-ink/55">
                  真实下一个字 ·{" "}
                  <span className="font-bold text-ink">{sent.target}</span>
                </div>
              </div>

              {/* stage 单步 trace */}
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 拖训练阶段
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setStage((s) => Math.max(0, s - 1))}
                    disabled={stage === 0}
                    className="w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:bg-cream transition-colors"
                    aria-label="prev"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() =>
                      setStage((s) => Math.min(STAGES.length - 1, s + 1))
                    }
                    disabled={stage === STAGES.length - 1}
                    className="w-7 h-7 rounded-full bg-ink text-cream border-2 border-ink flex items-center justify-center disabled:opacity-30 hover:translate-x-0.5 transition-transform"
                    aria-label="next"
                  >
                    <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {STAGES.map((st, i) => {
                  const on = i === stage;
                  return (
                    <button
                      key={i}
                      onClick={() => setStage(i)}
                      className={[
                        "px-3 py-2 rounded-xl border-2 border-ink text-left transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#F4D35E]"
                          : "bg-white text-ink/75 hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className="font-mono text-[10px] font-bold leading-tight">
                        {st.step}
                      </div>
                      <div className="font-mono text-[9px] opacity-70 mt-0.5">
                        {st.tokensSeen}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* top-5 candidates bar */}
              <div
                key={`bars-${sent.id}-${stage}`}
                className="bg-cream border-2 border-ink rounded-2xl p-4 animate-enter-fade"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ③ 模型猜的 top-5
                  </div>
                  <div className="font-mono text-[10px] text-ink/50">
                    {STAGES[stage].vibe}
                  </div>
                </div>
                <div className="space-y-2">
                  {cands.map((c, i) => {
                    const hit = c.w === sent.target;
                    return (
                      <div key={i} className="flex items-center gap-2.5">
                        <span
                          className={[
                            "inline-flex items-center justify-center w-8 h-7 rounded-md border-2 border-ink font-mono text-[12px] font-bold",
                            hit ? "bg-butter text-ink" : "bg-white text-ink/75",
                          ].join(" ")}
                        >
                          {c.w}
                        </span>
                        <div className="flex-1 h-5 bg-white border-2 border-ink rounded-md overflow-hidden">
                          <div
                            className={[
                              "h-full transition-all duration-500 ease-spring",
                              hit ? "bg-coral" : "bg-ink/30",
                            ].join(" ")}
                            style={{ width: `${c.p * 100}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] tabular-nums text-ink/70 w-12 text-right">
                          {(c.p * 100).toFixed(1)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* loss + reward 账本 */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="bg-white border-2 border-ink rounded-xl px-4 py-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    target 排名
                  </div>
                  <div className="font-display text-[22px] font-bold text-ink tabular-nums leading-none">
                    {targetRank}
                  </div>
                  <div className="font-mono text-[10px] text-ink/50 mt-1.5">
                    真值 {sent.target} · p ={" "}
                    {(targetProb * 100).toFixed(targetProb < 0.01 ? 2 : 1)}%
                  </div>
                </div>
                <div
                  className={[
                    "border-2 border-ink rounded-xl px-4 py-3 transition-colors duration-400",
                    ceLoss < 1
                      ? "bg-teal text-cream"
                      : ceLoss < 3
                        ? "bg-butter text-ink"
                        : "bg-coral text-cream",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "font-mono text-[10px] uppercase tracking-[0.2em] mb-1",
                      ceLoss < 1 ? "text-cream/70" : "text-ink/65",
                    ].join(" ")}
                  >
                    cross-entropy loss
                  </div>
                  <div className="font-display text-[22px] font-bold tabular-nums leading-none">
                    {ceLoss.toFixed(2)}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-1.5",
                      ceLoss < 1 ? "text-cream/65" : "text-ink/55",
                    ].join(" ")}
                  >
                    {ceLoss < 1 ? "猜得很准" : ceLoss < 3 ? "勉强能" : "差远了"}
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                loss = −log p(真实下一个字)。loss 是这一步要往反方向推权重的力度 · 来源：Cross-Entropy Loss 教科书定义
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPredict;
