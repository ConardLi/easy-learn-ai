/**
 * Section 06 · 训练流水线四阶段单步 trace
 *
 * R1（不是 R1-Zero）的完整训练 = cold-start SFT → reasoning RL → rejection-sampling SFT → all-domain RL。
 * 每步换主角数据 + 换损失 + 换目标。
 *
 * 与 rlhf 站的 SFT→RM→PPO 三步是不同的拓扑（这里没有 RM、有两次 SFT 两次 RL）。
 *
 * 数据来源：arXiv:2501.12948 §2.3 The Pipeline
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw, ArrowUpRight } from "lucide-react";

type Stage = {
  num: string;
  short: string;
  full: string;
  baseModel: string;
  outModel: string;
  data: string;
  dataNote: string;
  loss: string;
  whatHappens: string;
  pain: string;
  tone: "butter" | "coral" | "teal" | "pop";
};

const STAGES: Stage[] = [
  {
    num: "01",
    short: "Cold-start SFT",
    full: "Cold-start Supervised Fine-Tuning",
    baseModel: "DeepSeek-V3-Base",
    outModel: "V3-Base + 思考语风",
    data: "数千条长 CoT 示范（人挑 + R1-Zero 重写）",
    dataNote: "~k 量级，远小于 InstructGPT 的 13k SFT",
    loss: "cross-entropy（监督）",
    whatHappens:
      "把 R1-Zero 跑出来的样本里挑好看的，让真人重写成「先思考再回答」的固定格式。再喂给 V3-Base 微调，给它一个会写 <think>...</think> 的起手势。",
    pain: "解决 R1-Zero 的可读性差、语言混乱问题",
    tone: "butter",
  },
  {
    num: "02",
    short: "Reasoning RL",
    full: "Reasoning-oriented Reinforcement Learning",
    baseModel: "上一步热好身的模型",
    outModel: "推理强但偏窄的中间体",
    data: "数学 / 代码 / 科学 / 逻辑等可验证题目",
    dataNote: "全用规则奖励，避免打分器被骗",
    loss: "GRPO + 规则奖励（答对 + 格式 + 语言一致）",
    whatHappens:
      "跟 R1-Zero 一样大规模做 RL，只不过起点已经是上一步热过身的模型。这一步再加一条「语言一致性奖励」—— 中文题别夹英文。",
    pain: "把推理能力捅到顶，可读性也保住了",
    tone: "coral",
  },
  {
    num: "03",
    short: "Rejection-sampling SFT",
    full: "Rejection-sampling SFT",
    baseModel: "上一步的 reasoning RL 模型",
    outModel: "全能 SFT 候选",
    data: "60 万推理 trace + 20 万通用任务",
    dataNote: "推理 trace 用上一步模型采样 → 用 V3 当裁判过滤",
    loss: "cross-entropy（监督）",
    whatHappens:
      "把推理强的中间模型在大批 prompt 上采样，用 DeepSeek-V3 当裁判扔掉答错的、错乱语言的、写得啰嗦的。剩下的 ~80 万条混上通用任务，再一次 SFT。",
    pain: "解决只擅长数学 / 代码的窄能力，补回写作 / 角色扮演",
    tone: "teal",
  },
  {
    num: "04",
    short: "All-domain RL",
    full: "RL for All Scenarios",
    baseModel: "上一步的全能 SFT",
    outModel: "DeepSeek-R1（正式版）",
    data: "推理题（规则打分）+ 通用问题（人类喜好打分）",
    dataNote: "两套打分并行：硬题看对错，开放题看人喜不喜欢",
    loss: "GRPO + 规则 / 偏好混合奖励 + KL(π‖SFT)",
    whatHappens:
      "再来一轮 RL，这次目标是「无害 + 有用 + 推理还得强」。硬题继续用规则打分；开放题（写作、闲聊）改用人类喜好来打分，跟 RLHF 那套一样。一根 KL 绳子拴着，防止跑飞。",
    pain: "拿到既会推理又能聊天的 R1 正式版",
    tone: "pop",
  },
];

const TONE_BG: Record<Stage["tone"], string> = {
  butter: "bg-butter",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  pop: "bg-pop text-cream",
};
const TONE_SHADOW: Record<Stage["tone"], string> = {
  butter: "shadow-[5px_5px_0_0_#241C15]",
  coral: "shadow-[5px_5px_0_0_#241C15]",
  teal: "shadow-[5px_5px_0_0_#241C15]",
  pop: "shadow-[5px_5px_0_0_#241C15]",
};

const SectionPipeline: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  const s = STAGES[cursor];

  const next = () => setCursor((c) => Math.min(c + 1, STAGES.length - 1));
  const prev = () => setCursor((c) => Math.max(c - 1, 0));
  const reset = () => setCursor(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">R1 Pipeline · Two SFT · Two RL</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4">
              R1 正式版要跑四段：
              <br className="hidden sm:block" />
              <span className="bg-pop/18 px-1.5">两次 SFT 夹两次 RL。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              R1-Zero 教给我们：纯 RL 能涌现推理，但产物可读性差、会语言混杂。
              所以发到外面的 R1 正式版加了一对「热身 SFT + 收尾 RL」夹住中间的核心推理 RL，让模型既能想清楚也能说人话。
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end items-end gap-2">
            <button
              onClick={prev}
              disabled={cursor === 0}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink bg-white hover:bg-butter disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250 ease-spring shadow-stamp"
              aria-label="prev"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={next}
              disabled={cursor === STAGES.length - 1}
              className="inline-flex items-center gap-2 px-5 h-11 rounded-full border-2 border-ink bg-ink text-cream font-mono text-[12px] uppercase tracking-[0.15em] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-250 ease-spring shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5"
            >
              下一步
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink bg-white hover:bg-cream transition-all duration-250 ease-spring shadow-stamp"
              aria-label="reset"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* trace 标号条 */}
        <div className="relative mb-7">
          <div className="grid grid-cols-4 gap-2">
            {STAGES.map((stage, i) => {
              const active = i === cursor;
              const reached = i <= cursor;
              return (
                <button
                  key={stage.num}
                  onClick={() => setCursor(i)}
                  className={[
                    "p-3 border-2 border-ink rounded-2xl text-left transition-all duration-300 ease-spring",
                    active
                      ? `${TONE_BG[stage.tone]} ${TONE_SHADOW[stage.tone]} -translate-y-1`
                      : reached
                      ? "bg-butter/45 text-ink shadow-stamp"
                      : "bg-white text-ink/55 shadow-stamp",
                  ].join(" ")}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] mb-0.5 opacity-70">
                    step {stage.num}
                  </div>
                  <div className="font-display text-[15px] lg:text-[18px] font-bold leading-tight">
                    {stage.short}
                  </div>
                </button>
              );
            })}
          </div>
          {/* 连线 */}
          <div className="hidden sm:flex absolute top-1/2 left-0 right-0 -z-10 px-[12.5%] -translate-y-1/2">
            <div className="flex-1 border-t-2 border-dashed border-ink/30" />
          </div>
        </div>

        {/* 主卡 */}
        <div key={cursor} className="grid lg:grid-cols-12 gap-5 animate-enter-fade">
          {/* 左：内容描述 */}
          <div className="lg:col-span-7 card-stamp p-6 lg:p-7">
            <div className="flex items-baseline gap-2 mb-4">
              <div className="font-display text-[40px] lg:text-[48px] font-bold text-ink leading-none">
                {s.short}
              </div>
            </div>
            <div className="font-mono text-[11px] text-ink/55 mb-5">
              {s.full}
            </div>

            <p className="text-[15px] text-ink/85 leading-relaxed mb-5">
              {s.whatHappens}
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-3.5 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                  ↓ 起点模型
                </div>
                <div className="font-mono text-[12px] text-ink leading-tight">
                  {s.baseModel}
                </div>
              </div>
              <div className="p-3.5 bg-butter/40 border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                  ↑ 产出
                </div>
                <div className="font-mono text-[12px] text-ink leading-tight">
                  {s.outModel}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-pop/8 border-2 border-ink rounded-xl">
              <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                这一步在解决的痛
              </div>
              <div className="font-sans text-[13.5px] text-ink leading-relaxed">
                {s.pain}
              </div>
            </div>

            {cursor === 3 && (
              <a
                href="../rlhf/index.html"
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                开放题用人类喜好打分 · 看《RLHF》
                <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
              </a>
            )}
          </div>

          {/* 右：数据 + loss */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1.5">
                数据
              </div>
              <div className="font-display text-[19px] font-bold text-ink leading-tight">
                {s.data}
              </div>
              <p className="mt-2 font-mono text-[10.5px] text-ink/55 leading-relaxed">
                {s.dataNote}
              </p>
            </div>
            <div className="card-stamp p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1.5">
                损失 / 奖励
              </div>
              <div className="font-mono text-[14px] text-ink leading-tight">
                {s.loss}
              </div>
            </div>
            <div className="p-4 bg-ink rounded-2xl border-2 border-ink">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-1.5">
                跳到全局
              </div>
              <div className="font-mono text-[10.5px] text-cream/75 leading-relaxed">
                01 SFT → 02 RL → 03 SFT → 04 RL
                <br />
                每步换一个目标，最后落到能聊能算的 R1。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPipeline;
