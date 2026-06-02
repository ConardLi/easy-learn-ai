/**
 * Section 03 · 三阶段 pipeline 单步 trace
 *
 * SFT → RM → PPO
 * prev / next / reset 三键单步，每步换主角模型 + 数据画像 + 输出
 * 附加 L3：每个阶段可调"数据规模" stepper（×0.5 / ×1 / ×4），左下展示训出来质量画像（粗略示意）
 *
 * 数据来源：Ouyang et al. 2022 (InstructGPT) Table 6 + 文中 KL β 描述
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

type Stage = {
  id: string;
  num: string;
  full: string;
  short: string;
  who: { name: string; sub: string }[];
  whatHappens: string;
  inputLabel: string;
  inputExample: string;
  outputLabel: string;
  outputExample: string;
  realScale: string;
  scaleNote: string;
  /* base prompts(InstructGPT): 13k / 33k / 31k */
  baseSize: number;
};

const STAGES: Stage[] = [
  {
    id: "sft",
    num: "01",
    full: "Supervised Fine-Tuning",
    short: "SFT",
    who: [
      { name: "GPT-3", sub: "base 模型" },
      { name: "SFT 模型", sub: "学完示范" },
    ],
    whatHappens:
      "40 个真人标注员对一批 prompt 亲手写「理想回答」，模型用经典监督学习去模仿这些示范。出来的模型已经会「像人一样答」，但还不知道哪种「像人」更受欢迎。",
    inputLabel: "prompt + 人写的理想回答",
    inputExample:
      "Q: 一句话解释递归。\nA: 函数自己调自己，要有终止条件，否则栈炸。",
    outputLabel: "SFT 模型 π_SFT",
    outputExample:
      "已经懂指令，回答风格贴近示范者，但还是会跑题、过度啰嗦、偶尔编。",
    realScale: "13 k prompts",
    scaleNote: "InstructGPT 真实 SFT 训练集（Ouyang 2022, Table 6）",
    baseSize: 13,
  },
  {
    id: "rm",
    num: "02",
    full: "Reward Model",
    short: "RM",
    who: [
      { name: "SFT 模型", sub: "生成多个候选" },
      { name: "RM", sub: "打分器" },
    ],
    whatHappens:
      "拿 SFT 模型对同一 prompt 生成 4-9 个回答，让标注员排序谁好谁差。这堆排序训出一个 reward model：吃任意（prompt, 回答），吐一个标量 ——「人有多喜欢」。",
    inputLabel: "(prompt, 回答 A, 回答 B, 人选了 A)",
    inputExample:
      "Q: 我妈住院了怎么办？\nA(chosen): 先说一句希望她好起来。然后...\nB(rejected): 住院常见原因包括...",
    outputLabel: "reward model r_θ",
    outputExample:
      "输入任意回答，输出一个数。「贴心 + 可操作」的回答得分高，「百科腔」的得分低。",
    realScale: "33 k prompts · 约 64 k 偏好对",
    scaleNote: "Ouyang 2022 + Skywork 2024（顶尖 8B RM 用 80 k 对即可登顶）",
    baseSize: 33,
  },
  {
    id: "ppo",
    num: "03",
    full: "Proximal Policy Optimization",
    short: "PPO",
    who: [
      { name: "SFT 模型", sub: "拷一份当初始 policy" },
      { name: "RM", sub: "在线打分" },
      { name: "ref 模型", sub: "KL 系绳的锚" },
    ],
    whatHappens:
      "先说两个词：policy = 模型现在怎么答题，KL = 跟 SFT 原版差多远（差太大就忘本）。新模型每生成一句话，RM 立刻打分，PPO 用这个分做梯度更新。同时跟一份冻结的 SFT 模型对比，每 token 加 KL 惩罚 —— 不准跑太远，否则会忘 SFT 学的语言能力。",
    inputLabel: "prompt（无人写答案，模型自己生）",
    inputExample:
      "Q: 帮我写句生日祝福。\n[新 policy 生成回答 → RM 打分 → 反向更新]",
    outputLabel: "对齐后的 policy π_RL",
    outputExample:
      "RM 喜欢的回答出现频率↑。完整的 InstructGPT 训练目标有三项：reward（往高分调）- β·KL（别跑太远）- γ·pretrain_loss（顺便复习老课文，别把基础语言能力练丢）。",
    realScale: "31 k prompts · KL β ≈ 0.02 / token",
    scaleNote: "Ouyang 2022 §3.5 + 公开 PPO 实现常用 β 区间 0.01-0.2",
    baseSize: 31,
  },
];

const SectionPipeline: React.FC = () => {
  const [cursor, setCursor] = useState(0);
  /* 数据规模倍数 0.5 / 1 / 4 */
  const [scaleMul, setScaleMul] = useState(1);

  const s = STAGES[cursor];
  const next = () => setCursor((c) => Math.min(c + 1, STAGES.length - 1));
  const prev = () => setCursor((c) => Math.max(c - 1, 0));

  /* 质量画像（极度简化的示意）: 三条 bar，分别是「指令跟随 / 偏好对齐 / 多样性」*/
  const quality = (() => {
    const log = Math.log(scaleMul * s.baseSize + 1);
    if (s.id === "sft") {
      return {
        instruct: Math.min(45 + log * 18, 90),
        prefer: Math.min(20 + log * 6, 50),
        diversity: Math.max(70 - log * 4, 55),
      };
    }
    if (s.id === "rm") {
      return {
        instruct: 70,
        prefer: Math.min(38 + log * 14, 88),
        diversity: 65,
      };
    }
    return {
      instruct: 80,
      prefer: Math.min(60 + log * 9, 96),
      diversity: Math.max(60 - log * 5, 38),
    };
  })();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">Three Stage Pipeline</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink mb-4">
              整套 RLHF 是三步接力，
              <br className="hidden sm:block" />
              每一步都换一个"主角模型"。
            </h2>
            <p className="text-[15.5px] text-ink/70 leading-relaxed max-w-[60ch]">
              下面这条单步 trace 走一遍 Ouyang 2022 InstructGPT 的原始流水线。
              点 next 看接下来怎么走，调下面的滑块看数据多少会怎么影响这一步训出的模型。
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-end gap-2">
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
              aria-label="next"
            >
              下一步
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => {
                setCursor(0);
                setScaleMul(1);
              }}
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink bg-white hover:bg-cream transition-all duration-250 ease-spring shadow-stamp"
              aria-label="reset"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* trace 标号条 */}
        <div className="relative mb-8">
          <div className="flex items-center gap-0">
            {STAGES.map((stage, i) => {
              const active = i === cursor;
              const reached = i <= cursor;
              return (
                <React.Fragment key={stage.id}>
                  <button
                    onClick={() => setCursor(i)}
                    className={[
                      "flex-1 px-3 py-3.5 border-2 border-ink rounded-2xl text-left transition-all duration-300 ease-spring",
                      active
                        ? "bg-ink text-cream shadow-[6px_6px_0_0_#E07A5F] -translate-y-1"
                        : reached
                          ? "bg-butter text-ink shadow-stamp"
                          : "bg-white text-ink/55 shadow-stamp",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "font-mono text-[10px] uppercase tracking-[0.2em] mb-0.5",
                        active ? "text-cream/70" : "text-ink/55",
                      ].join(" ")}
                    >
                      step {stage.num}
                    </div>
                    <div className="font-display text-[18px] lg:text-[22px] font-bold leading-tight">
                      {stage.short}
                    </div>
                    <div
                      className={[
                        "font-mono text-[10px] mt-0.5",
                        active ? "text-cream/55" : "text-ink/50",
                      ].join(" ")}
                    >
                      {stage.full}
                    </div>
                  </button>
                  {i < STAGES.length - 1 && (
                    <div className="w-6 lg:w-10 h-px border-t-2 border-dashed border-ink/40 mx-1" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* 主卡 */}
        <div key={cursor} className="grid lg:grid-cols-12 gap-5 lg:gap-6 animate-enter-fade">
          {/* 左：who + what */}
          <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7">
            <div className="flex items-baseline gap-2 mb-4">
              <div className="font-display text-[40px] lg:text-[48px] font-bold text-ink leading-none">
                {s.short}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                {s.full}
              </div>
            </div>

            <p className="text-[15px] text-ink/80 leading-relaxed mb-5">
              {s.whatHappens}
            </p>

            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
              台上的模型
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {s.who.map((w, i) => (
                <div
                  key={i}
                  className="px-3 py-2 bg-cream border-2 border-ink rounded-xl"
                >
                  <div className="font-display text-[14px] font-bold text-ink leading-tight">
                    {w.name}
                  </div>
                  <div className="font-mono text-[9.5px] text-ink/55 mt-0.5">
                    {w.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                  ↓ 喂进去
                </div>
                <div className="font-mono text-[11px] text-ink/70 mb-1.5">
                  {s.inputLabel}
                </div>
                <pre className="font-mono text-[11px] text-ink/85 whitespace-pre-wrap leading-relaxed">
                  {s.inputExample}
                </pre>
              </div>
              <div className="p-3.5 bg-butter/40 border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
                  ↑ 产出
                </div>
                <div className="font-mono text-[11px] text-ink/70 mb-1.5">
                  {s.outputLabel}
                </div>
                <p className="font-sans text-[12.5px] text-ink/80 leading-relaxed">
                  {s.outputExample}
                </p>
              </div>
            </div>
          </div>

          {/* 右：数据规模 stepper + 质量画像 */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                这一步的真实数据规模
              </div>
              <div className="font-display text-[24px] lg:text-[28px] font-bold text-ink leading-tight">
                {s.realScale}
              </div>
              <p className="mt-2 font-mono text-[10px] text-ink/45 leading-relaxed">
                {s.scaleNote}
              </p>

              <div className="mt-5 pt-5 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  如果数据 × ?
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { mul: 0.5, label: "×0.5" },
                    { mul: 1, label: "×1 · 原始" },
                    { mul: 4, label: "×4" },
                  ].map((opt) => {
                    const on = opt.mul === scaleMul;
                    return (
                      <button
                        key={opt.mul}
                        onClick={() => setScaleMul(opt.mul)}
                        className={[
                          "py-2.5 rounded-xl border-2 border-ink font-mono text-[10.5px] font-bold transition-all duration-250 ease-spring",
                          on
                            ? "bg-ink text-cream shadow-[3px_3px_0_0_#1B4B5A]"
                            : "bg-white text-ink/65 hover:bg-cream",
                        ].join(" ")}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 font-mono text-[10.5px] text-ink/55 tabular-nums">
                  约 <span className="text-ink font-bold">{Math.round(scaleMul * s.baseSize * 1000).toLocaleString()}</span> 条
                </div>
              </div>
            </div>

            <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-4">
                训出的模型质量画像（示意）
              </div>
              <div className="space-y-3">
                {[
                  { name: "指令跟随", val: quality.instruct, color: "bg-teal" },
                  { name: "偏好对齐", val: quality.prefer, color: "bg-pop" },
                  { name: "多样性", val: quality.diversity, color: "bg-coral" },
                ].map((b) => (
                  <div key={b.name}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-mono text-[11px] text-ink/70">
                        {b.name}
                      </div>
                      <div className="font-mono text-[11px] text-ink tabular-nums">
                        {Math.round(b.val)}
                      </div>
                    </div>
                    <div className="h-2.5 bg-white border-2 border-ink rounded-full overflow-hidden">
                      <div
                        className={`h-full ${b.color} transition-all duration-500 ease-editorial`}
                        style={{ width: `${b.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] text-ink/45 leading-relaxed">
                PPO 阶段越拉数据，多样性掉得越凶 —— 这就是模式坍缩，下一节「KL 皮带」会接着讲。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPipeline;
