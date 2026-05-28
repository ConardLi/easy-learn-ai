/**
 * 核心能力页 · Mailchimp-Freddie 风
 *
 * 结构：
 *   ─ HERO：display 标题 + 副标
 *   ─ TAB BAR：4 个能力 stamp 按钮，点击切换
 *   ─ DETAIL：左文字 + 详细列表 / 右当前能力的交互动画
 */
import React, { useState } from "react";
import { Sparkles, BookOpen, Target, Brain } from "lucide-react";
import EmergentAbilitiesAnimation from "../Animations/EmergentAbilitiesAnimation";
import ContextLearningAnimation from "../Animations/ContextLearningAnimation";
import InstructionFollowingAnimation from "../Animations/InstructionFollowingAnimation";
import ReasoningAnimation from "../Animations/ReasoningAnimation";

interface Ability {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accent: "butter" | "coral" | "teal" | "cream";
  description: string;
  details: string[];
  Animation: React.ComponentType;
}

const ABILITIES: Ability[] = [
  {
    id: "emergent",
    title: "涌现能力",
    subtitle: "Emergent Abilities",
    icon: Sparkles,
    accent: "butter",
    description:
      "模型规模超过某个临界点时，新能力突然出现 —— 不是缓慢增长，而是相变。",
    details: [
      "小模型中近乎随机水平，大模型中突然达到高准确率",
      "典型任务：多位数加法、GSM8K 数学、Word-in-Context 语义判断",
      "并非所有任务都涌现 —— 简单任务不涌现，复杂推理才涌现",
      "Wei et al. 2022 论文首次系统描述，至 2026 已在数十个 benchmark 上验证",
    ],
    Animation: EmergentAbilitiesAnimation,
  },
  {
    id: "icl",
    title: "上下文学习",
    subtitle: "In-Context Learning",
    icon: BookOpen,
    accent: "coral",
    description:
      "不改模型参数，仅靠 prompt 里几个示例，就让模型学会新任务 —— GPT-3 论文核心发现。",
    details: [
      "Zero-shot → One-shot → Few-shot 准确率阶梯式上升",
      "提示词工程（prompt engineering）的理论基础",
      "节省微调成本：单次 API 调用即可适配新任务",
      "2026 年长上下文模型（1M-2M token）让 many-shot ICL 成为新范式",
    ],
    Animation: ContextLearningAnimation,
  },
  {
    id: "instruct",
    title: "指令遵循",
    subtitle: "Instruction Following",
    icon: Target,
    accent: "teal",
    description:
      "理解并执行未见过的自然语言指令。这是 base 模型→ChatGPT 跨越的关键。",
    details: [
      "SFT（监督微调）+ RLHF（人类反馈强化学习）训练得到",
      "Base 模型会「续写」指令；Instruct 模型会「执行」指令",
      "2025 后 RLAIF / Constitutional AI 等替代方案出现",
      "对齐质量决定模型实用性，比单纯规模更重要",
    ],
    Animation: InstructionFollowingAnimation,
  },
  {
    id: "reasoning",
    title: "逐步推理",
    subtitle: "Step-by-Step Reasoning",
    icon: Brain,
    accent: "cream",
    description:
      "通过思维链（Chain-of-Thought）显式写出中间步骤，复杂问题准确率大幅提升。",
    details: [
      "CoT 不只是「清晰」，更是给模型「草稿纸」",
      "在 GSM8K 上从 17% → 57%（CoT prompting）",
      "2024 起 o1 / DeepSeek-R1 等推理模型把 CoT 内化为训练目标",
      "2026 年顶级推理模型在数学、代码上接近人类专家水平（>90%）",
    ],
    Animation: ReasoningAnimation,
  },
];

const accentBg: Record<string, string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  cream: "bg-cream",
};
const accentBadge: Record<string, string> = {
  butter: "bg-butter text-ink",
  coral: "bg-coral text-white",
  teal: "bg-teal text-white",
  cream: "bg-cream text-ink",
};

const AbilitiesPage: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ABILITIES[0].id);
  const active = ABILITIES.find((a) => a.id === activeId)!;
  const Animation = active.Animation;

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">§ 02 · 核心能力</div>
          <h1 className="font-display text-display-xl text-ink mb-5 animate-enter-up">
            LLM 的{" "}
            <span className="relative inline-block">
              <span className="relative z-10">四大能力</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
          </h1>
          <p className="font-sans text-[16px] lg:text-[18px] text-ink/70 max-w-2xl mx-auto leading-relaxed">
            涌现、上下文学习、指令遵循、逐步推理 ——
            每一项都可以动手玩，看看它们到底是怎么 work 的。
          </p>
        </div>
      </section>

      {/* TAB BAR */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ABILITIES.map((ab, i) => {
              const Icon = ab.icon;
              const isActive = ab.id === activeId;
              return (
                <button
                  key={ab.id}
                  onClick={() => setActiveId(ab.id)}
                  className={`group relative overflow-hidden text-left p-5 border-2 border-ink rounded-2xl transition-all duration-300 ease-spring ${
                    isActive
                      ? "bg-white shadow-stamp-lg -translate-y-1"
                      : "bg-white/70 hover:bg-white hover:-translate-y-[2px] hover:shadow-stamp"
                  }`}
                >
                  {/* 左色条 */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${accentBg[ab.accent]} ${
                      isActive ? "" : "opacity-40 group-hover:opacity-100 transition-opacity"
                    }`}
                  />
                  <div className="flex items-start justify-between mb-3 pl-2">
                    <div
                      className={`w-10 h-10 ${accentBg[ab.accent]} border-2 border-ink rounded-lg flex items-center justify-center ${
                        isActive ? "" : "opacity-70"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          ab.accent === "coral" || ab.accent === "teal"
                            ? "text-white"
                            : "text-ink"
                        }`}
                        strokeWidth={2.2}
                      />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                      № 0{i + 1}
                    </span>
                  </div>
                  <div className="pl-2">
                    <div className="font-display font-extrabold text-[16px] text-ink mb-1">
                      {ab.title}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
                      {ab.subtitle}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute right-2 bottom-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* DETAIL */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* 左：文字描述 */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-[0.18em] mb-4 ${accentBadge[active.accent]}`}
              >
                {active.subtitle}
              </div>
              <h2 className="font-display text-display-lg text-ink mb-4">
                {active.title}
              </h2>
              <p className="font-sans text-[15px] lg:text-[16px] text-ink/75 leading-relaxed mb-6">
                {active.description}
              </p>

              <div className="bg-white border-2 border-ink rounded-2xl p-5 shadow-stamp">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-3">
                  § 关键事实
                </div>
                <ul className="space-y-2.5">
                  {active.details.map((d, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 font-sans text-[13px] text-ink/75 leading-relaxed"
                    >
                      <span
                        className={`flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${accentBg[active.accent]} border border-ink`}
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 右：交互动画 */}
            <div className="lg:col-span-3">
              <Animation />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AbilitiesPage;
