/**
 * 逐步推理动画 · 交互式（直接回答 vs CoT vs 推理模型）
 *
 * 设计：
 *   ─ 用户切换不同问题类型，对比三种模型的准确率
 *   ─ Direct：直接回答（base 模型，无 CoT prompt）—— 多步任务上常错
 *   ─ CoT：Chain-of-Thought 提示后，强制写出步骤 —— 准确率大幅提升
 *   ─ Reasoning Model：o1 / R1 / Gemini Thinking 等原生推理模型 —— 接近上限
 *
 * 教学点：
 *   ─ CoT 不只是为了"看起来清晰"，是给模型"草稿纸"
 *   ─ 多步推理 = 把中间状态显式化，避免直觉跳跃
 *   ─ 简单任务 CoT 无必要，最新推理模型会自动判断要不要 think
 *
 * 数据来源（准确率）：
 *   ─ Wei et al. 2022 "Chain-of-Thought" GSM8K 数据
 *   ─ OpenAI o1 system card 2024 / DeepSeek-R1 paper 2025
 */
import React, { useMemo, useState } from "react";
import { Calculator, Brain, Zap, X, Check } from "lucide-react";

interface Problem {
  id: string;
  type: string;
  question: string;
  directAnswer: string;
  directWrong: boolean;
  cotSteps: { thought: string; calc: string }[];
  cotAnswer: string;
  benchmark: string;
  directAcc: number;
  cotAcc: number;
  reasoningAcc: number;
  insight: string;
}

const PROBLEMS: Problem[] = [
  {
    id: "apple",
    type: "数学应用题",
    question:
      "小明有 15 个苹果，给了小红 5 个，又买了 8 个，现在小明有多少个苹果？",
    directAnswer: "27",
    directWrong: true,
    cotSteps: [
      { thought: "初始苹果数", calc: "15" },
      { thought: "给了小红 5 个", calc: "15 − 5 = 10" },
      { thought: "又买 8 个", calc: "10 + 8 = 18" },
    ],
    cotAnswer: "18",
    benchmark: "GSM8K",
    directAcc: 0.17,
    cotAcc: 0.57,
    reasoningAcc: 0.95,
    insight:
      "多步运算需要「草稿纸」。CoT 让模型显式写出中间状态，准确率立刻翻 3 倍。最新推理模型（o3 / R1）可以接近 95%。",
  },
  {
    id: "cups",
    type: "逻辑推理",
    question:
      "桌上有 3 个杯子。第 1 杯有 5 个球；第 2 杯的球比第 1 杯多 3 个；第 3 杯的球数是第 2 杯的一半。三个杯子总共多少球？",
    directAnswer: "16",
    directWrong: true,
    cotSteps: [
      { thought: "杯 1", calc: "5" },
      { thought: "杯 2 = 杯 1 + 3", calc: "5 + 3 = 8" },
      { thought: "杯 3 = 杯 2 ÷ 2", calc: "8 ÷ 2 = 4" },
      { thought: "三杯总和", calc: "5 + 8 + 4 = 17" },
    ],
    cotAnswer: "17",
    benchmark: "MultiArith",
    directAcc: 0.22,
    cotAcc: 0.68,
    reasoningAcc: 0.96,
    insight:
      "嵌套依赖（杯 3 依赖杯 2，杯 2 依赖杯 1）下，CoT 强制按顺序分解，避免「凭直觉跳过中间步骤」。",
  },
  {
    id: "date",
    type: "日期推断",
    question: "如果今天是星期三，从今天起再过 10 天是星期几？",
    directAnswer: "星期日",
    directWrong: true,
    cotSteps: [
      { thought: "今天 = 周三 (= 3)", calc: "3" },
      { thought: "再过 10 天", calc: "3 + 10 = 13" },
      { thought: "13 mod 7", calc: "13 − 7 = 6" },
      { thought: "6 对应", calc: "周六" },
    ],
    cotAnswer: "星期六",
    benchmark: "Date Understanding",
    directAcc: 0.3,
    cotAcc: 0.78,
    reasoningAcc: 0.94,
    insight:
      "周几加减经常「错一格」。CoT 把模运算写出来，从直觉转为查表式推理。",
  },
  {
    id: "simple",
    type: "简单算术",
    question: "2 + 2 = ?",
    directAnswer: "4",
    directWrong: false,
    cotSteps: [{ thought: "直接加", calc: "2 + 2 = 4" }],
    cotAnswer: "4",
    benchmark: "Easy Arithmetic",
    directAcc: 0.99,
    cotAcc: 0.99,
    reasoningAcc: 0.99,
    insight:
      "简单问题不需要 CoT，强行让模型「思考」反而是浪费 token。最新推理模型（o3 / Gemini Thinking）会自动判断要不要 think。",
  },
];

const ReasoningAnimation: React.FC = () => {
  const [problemId, setProblemId] = useState(PROBLEMS[0].id);
  const problem = useMemo(
    () => PROBLEMS.find((p) => p.id === problemId)!,
    [problemId],
  );

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 三方对比
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            逐步推理 · Chain-of-Thought
          </h3>
        </div>
      </div>

      {/* 问题切换 */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PROBLEMS.map((p) => {
          const active = p.id === problemId;
          return (
            <button
              key={p.id}
              onClick={() => setProblemId(p.id)}
              className={`px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[11px] transition-all duration-200 ease-spring ${
                active
                  ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                  : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]"
              }`}
            >
              {p.type}
            </button>
          );
        })}
      </div>

      {/* 问题展示 */}
      <div className="mb-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] mt-0.5">
            <Calculator className="w-4 h-4 text-ink" strokeWidth={2.2} />
          </div>
          <div className="flex-1 bg-white border-2 border-ink rounded-xl p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              问题 · {problem.benchmark}
            </div>
            <div className="font-sans text-[13px] text-ink leading-relaxed">
              {problem.question}
            </div>
          </div>
        </div>
      </div>

      {/* 双方法对比 */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        {/* Direct */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-extrabold text-[14px] text-ink leading-tight">
                直接回答
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                Base · 无 CoT
              </div>
            </div>
            <div
              className={`flex-shrink-0 w-7 h-7 border-2 border-ink rounded-full flex items-center justify-center ${
                problem.directWrong ? "bg-white" : "bg-ink"
              }`}
            >
              {problem.directWrong ? (
                <X className="w-3.5 h-3.5 text-coral" strokeWidth={3} />
              ) : (
                <Check className="w-3.5 h-3.5 text-butter" strokeWidth={3} />
              )}
            </div>
          </div>
          <div className="bg-white border border-ink/20 rounded-lg p-4 mb-3 min-h-[140px] flex items-center justify-center">
            <div className="text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 mb-2">
                输出
              </div>
              <div
                className={`font-display font-extrabold text-[32px] leading-none ${
                  problem.directWrong ? "text-coral line-through" : "text-ink"
                }`}
              >
                {problem.directAnswer}
              </div>
              {problem.directWrong && (
                <div className="font-sans text-[10px] text-coral italic mt-2">
                  ✗ 凭直觉跳过中间步骤
                </div>
              )}
            </div>
          </div>
          <BenchBar label="GSM8K 准确率" value={problem.directAcc} tone="coral" />
        </div>

        {/* CoT */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-extrabold text-[14px] text-ink leading-tight">
                思维链推理
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                Chain-of-Thought
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 bg-ink rounded-full flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-butter" strokeWidth={3} />
            </div>
          </div>

          {/* 推理步骤 */}
          <div className="bg-white border border-ink/20 rounded-lg p-3 mb-2 min-h-[140px]">
            <div className="space-y-1.5 mb-2">
              {problem.cotSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 font-mono text-[10.5px]"
                >
                  <span className="flex-shrink-0 w-4 h-4 bg-butter border border-ink rounded-full flex items-center justify-center text-[9px] font-bold text-ink">
                    {i + 1}
                  </span>
                  <div className="leading-tight pt-0.5">
                    <span className="text-ink/55">{step.thought}：</span>
                    <span className="text-ink font-bold">{step.calc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-ink/15">
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-teal mb-1">
                ✓ 答案
              </div>
              <div className="font-display font-extrabold text-[22px] text-ink leading-none">
                {problem.cotAnswer}
              </div>
            </div>
          </div>
          <BenchBar label="GSM8K 准确率" value={problem.cotAcc} tone="ink" />
        </div>
      </div>

      {/* 推理模型 bonus */}
      <div className="bg-ink text-cream border-2 border-ink rounded-2xl p-4 mb-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-2 border-cream rounded-lg">
            <Brain className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="font-display font-extrabold text-[14px] text-butter leading-tight">
                推理模型（2024+）
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <Zap className="w-3 h-3 text-butter" strokeWidth={2.5} />
                <span className="text-butter font-bold">
                  {Math.round(problem.reasoningAcc * 100)}%
                </span>
              </div>
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-cream/60 mb-2">
              o3 · DeepSeek-R1 · Gemini Thinking · Claude Extended
            </div>
            <div className="font-sans text-[11px] text-cream/85 leading-relaxed">
              原生推理模型把 CoT 内化到训练里 —— 不用 prompt 提示，模型自己会先「想」再「答」。
              在数学、代码、逻辑上达到甚至超越人类专家水平。
            </div>
            <div className="mt-3">
              <BenchBar
                label="同任务 · 推理模型准确率"
                value={problem.reasoningAcc}
                tone="butter"
                inverted
              />
            </div>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="px-4 py-3 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-1">
          § 这道题的关键
        </div>
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          {problem.insight}
        </div>
      </div>
    </div>
  );
};

const BenchBar: React.FC<{
  label: string;
  value: number;
  tone: "coral" | "ink" | "butter";
  inverted?: boolean;
}> = ({ label, value, tone, inverted }) => {
  const fillColor = {
    coral: "bg-coral",
    ink: "bg-ink",
    butter: "bg-butter",
  }[tone];
  const trackColor = inverted ? "bg-cream/20 border-cream/30" : "bg-cream border-ink/30";
  const textColor = inverted ? "text-cream/70" : "text-ink/55";
  const valColor = inverted ? "text-butter" : tone === "coral" ? "text-coral" : "text-ink";

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className={`font-mono text-[9px] uppercase tracking-[0.15em] ${textColor}`}>
          {label}
        </span>
        <span className={`font-mono text-[11px] font-bold ${valColor}`}>
          {Math.round(value * 100)}%
        </span>
      </div>
      <div className={`h-2 border rounded-full overflow-hidden ${trackColor}`}>
        <div
          className={`h-full ${fillColor} transition-all duration-500 ease-spring`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ReasoningAnimation;
