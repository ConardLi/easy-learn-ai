/**
 * 指令遵循动画 · 交互式（对齐前 vs 对齐后对比）
 *
 * 设计：
 *   ─ 用户切换任务类型，对比 Base 模型 vs Instruct 模型的输出
 *   ─ Base 模型（未对齐，GPT-3 风格）：倾向于续写指令本身
 *   ─ Instruct 模型（RLHF/SFT 对齐后，ChatGPT 风格）：理解任务并答题
 *   ─ 同时展示 Instruct 模型的拆解步骤
 *
 * 教学点：
 *   ─ 指令遵循不是"魔法"，而是 instruction tuning + RLHF 的产物
 *   ─ 没有对齐的 base 模型默认会续写，对齐后才会"答题"
 *   ─ 这是 GPT-3 → ChatGPT 跨越的关键
 */
import React, { useMemo, useState } from "react";
import { X, Check, MessageSquare } from "lucide-react";

interface Task {
  id: string;
  name: string;
  instruction: string;
  baseOutput: string[];
  baseNote: string;
  instructSteps: string[];
  instructOutput: string;
}

const TASKS: Task[] = [
  {
    id: "translate",
    name: "翻译",
    instruction: "请将以下句子翻译成英文：你好，世界！",
    baseOutput: [
      "请将以下句子翻译成英文：你好，世界！",
      "请将以下句子翻译成日文：こんにちは、世界！",
      "请将以下句子翻译成法语：Bonjour, le monde !",
      "请将以下句子翻译成德语：Hallo, …",
    ],
    baseNote: "续写更多类似指令，模型把指令当成「题库」在抄",
    instructSteps: [
      "识别任务类型 = 翻译",
      "源语言：中文 / 目标：英文",
      "执行翻译",
    ],
    instructOutput: "Hello, World!",
  },
  {
    id: "summarize",
    name: "总结",
    instruction:
      "用一句话总结：大语言模型是一种参数巨大、训练数据海量的神经网络，展现出强大的语言理解和生成能力。",
    baseOutput: [
      "用一句话总结：大语言模型是一种参数巨大、训练数据海量的神经网络，展现出强大的语言理解和生成能力。",
      "答案应该简洁明了，抓住核心要点。",
      "总结的关键在于压缩信息、保留主旨。",
      "下面再来一个例子：用一句话总结：…",
    ],
    baseNote: "重复指令 + 凑教科书式的废话",
    instructSteps: [
      "识别任务类型 = 单句摘要",
      "提取核心：参数大 / 数据多 / 能力强",
      "压缩到一句话",
    ],
    instructOutput: "大语言模型是规模巨大的神经网络，擅长理解和生成自然语言。",
  },
  {
    id: "rewrite",
    name: "改写",
    instruction: "把这句话改得更正式：今天天气真不错呀！",
    baseOutput: [
      "把这句话改得更正式：今天天气真不错呀！",
      "把这句话改得更口语化：今日天气甚佳。",
      "把这句话改得更幽默：今天老天爷给面子！",
      "更多例子：…",
    ],
    baseNote: "续写题目的「姐妹题」，但没有真正答题",
    instructSteps: [
      "识别任务 = 风格改写",
      "方向：口语化 → 正式",
      "去除语气词、用书面表达",
    ],
    instructOutput: "今日天气宜人。",
  },
  {
    id: "code",
    name: "代码",
    instruction: "写一个 Python 函数：判断一个数是否为质数",
    baseOutput: [
      "写一个 Python 函数：判断一个数是否为质数",
      "要求：",
      "1. 函数应该接受一个整数作为输入",
      "2. 返回布尔值",
      "3. 高效处理大数…",
    ],
    baseNote: "继续写需求文档，不写代码",
    instructSteps: [
      "识别任务 = 写 Python 函数",
      "需求：质数判断",
      "实现：处理 n<2 边界 + 试除到 √n",
    ],
    instructOutput: `def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    return True`,
  },
];

const InstructionFollowingAnimation: React.FC = () => {
  const [taskId, setTaskId] = useState(TASKS[0].id);
  const task = useMemo(() => TASKS.find((t) => t.id === taskId)!, [taskId]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 对齐前 vs 对齐后
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            指令遵循 · Instruction Following
          </h3>
        </div>
      </div>

      {/* 任务切换 */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TASKS.map((t) => {
          const active = t.id === taskId;
          return (
            <button
              key={t.id}
              onClick={() => setTaskId(t.id)}
              className={`px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[11px] transition-all duration-200 ease-spring ${
                active
                  ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                  : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* 用户指令 */}
      <div className="mb-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] mt-0.5">
            <MessageSquare className="w-4 h-4 text-ink" strokeWidth={2.2} />
          </div>
          <div className="flex-1 bg-white border-2 border-ink rounded-xl p-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
              用户指令
            </div>
            <div className="font-sans text-[13px] text-ink leading-relaxed">
              {task.instruction}
            </div>
          </div>
        </div>
      </div>

      {/* 两列对比 */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Base 输出 */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-extrabold text-[14px] text-ink leading-tight">
                Base 模型
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                GPT-3 风 · 未对齐
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 bg-white border-2 border-ink rounded-full flex items-center justify-center">
              <X className="w-3.5 h-3.5 text-coral" strokeWidth={3} />
            </div>
          </div>
          <div className="bg-white border border-ink/20 rounded-lg p-3 mb-3 min-h-[140px]">
            <div className="font-mono text-[11px] text-ink/70 leading-relaxed whitespace-pre-wrap">
              {task.baseOutput.map((line, i) => (
                <div
                  key={i}
                  className={i > 0 ? "text-ink/45" : "text-ink/75"}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
          <div className="font-sans text-[11px] text-coral italic">
            ✗ {task.baseNote}
          </div>
        </div>

        {/* Instruct 输出 */}
        <div className="bg-cream border-2 border-ink rounded-2xl p-4 relative">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-display font-extrabold text-[14px] text-ink leading-tight">
                Instruct 模型
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/55">
                ChatGPT 风 · RLHF / SFT 对齐
              </div>
            </div>
            <div className="flex-shrink-0 w-7 h-7 bg-ink rounded-full flex items-center justify-center">
              <Check className="w-3.5 h-3.5 text-butter" strokeWidth={3} />
            </div>
          </div>

          {/* 拆解步骤 */}
          <div className="mb-3 space-y-1.5">
            {task.instructSteps.map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-2 font-mono text-[10px] text-ink/65"
              >
                <span className="flex-shrink-0 w-4 h-4 bg-butter border border-ink rounded-full flex items-center justify-center text-[9px] font-bold text-ink">
                  {i + 1}
                </span>
                <span className="leading-tight pt-0.5">{step}</span>
              </div>
            ))}
          </div>

          {/* 最终输出 */}
          <div className="bg-white border-2 border-ink rounded-lg p-3 min-h-[80px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-teal mb-1.5">
              ✓ 最终输出
            </div>
            <pre className="font-mono text-[11px] text-ink leading-relaxed whitespace-pre-wrap break-words">
              {task.instructOutput}
            </pre>
          </div>
        </div>
      </div>

      {/* 教学提示 */}
      <div className="mt-5 px-4 py-3 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/55 mb-1">
          § 关键差异
        </div>
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          Base 模型只学了"预测下一个 token"，自然倾向于<strong>续写</strong>。
          Instruct 模型经过 <span className="font-mono font-bold text-coral">SFT + RLHF</span>
          后学会了"识别任务 → 执行 → 给答案"。
          这就是 GPT-3 (2020) → ChatGPT (2022) 跨越的核心 ——
          模型能力没变多少，但<strong>对齐方式变了</strong>。
        </div>
      </div>
    </div>
  );
};

export default InstructionFollowingAnimation;
