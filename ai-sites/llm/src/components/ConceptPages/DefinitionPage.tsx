/**
 * LLM 定义页 · Mailchimp-Freddie 风
 *
 * 结构：
 *   ─ HERO：display 标题 + 副标
 *   ─ DEFINITION：左文字 + 右交互动画（ModelSizeAnimation）
 *   ─ TRAITS：4 个核心特征 stamp 卡
 *   ─ MILESTONE：6 个关键里程碑（2020-2026）
 */
import React from "react";
import { TrendingUp, Database, Cpu, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ModelSizeAnimation from "../Animations/ModelSizeAnimation";

const TRAITS = [
  {
    icon: TrendingUp,
    title: "规模效应",
    text: "参数量从亿级跨越到千亿、万亿级，能力随规模指数增长。",
    accent: "butter",
  },
  {
    icon: Database,
    title: "海量预训练",
    text: "在数 T~15T token 的混合语料上学习，包含网页、代码、书籍、对话。",
    accent: "coral",
  },
  {
    icon: Cpu,
    title: "分布式集群",
    text: "千卡到万卡 GPU/TPU 集群并行训练，单次训练耗资数百万美元。",
    accent: "teal",
  },
  {
    icon: Sparkles,
    title: "涌现能力",
    text: "推理、代码、多语言能力在某个规模附近「突然」出现，不是渐进。",
    accent: "cream",
  },
] as const;

const MILESTONES = [
  {
    year: "2020.05",
    name: "GPT-3",
    by: "OpenAI",
    note: "175B 参数，少样本能力震惊业界，LLM 时代正式开启",
  },
  {
    year: "2022.11",
    name: "ChatGPT",
    by: "OpenAI",
    note: "RLHF 让对话对齐成为可能，5 天破百万用户",
  },
  {
    year: "2023.03",
    name: "GPT-4",
    by: "OpenAI",
    note: "多模态支持，专业考试达到人类前 10% 水平",
  },
  {
    year: "2024.09",
    name: "OpenAI o1",
    by: "OpenAI",
    note: "推理模型原型，思维链内化为训练目标",
  },
  {
    year: "2025.01",
    name: "DeepSeek-R1",
    by: "DeepSeek",
    note: "开源推理模型，性能比肩 o1，成本降至 1/10",
  },
  {
    year: "2026.04",
    name: "Claude Opus 4.7",
    by: "Anthropic",
    note: "SWE-bench 87.6%，agentic 长 horizon 任务领先",
  },
];

const accentBg: Record<string, string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  cream: "bg-cream",
};

const DefinitionPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">§ 01 · 定义</div>
          <h1 className="font-display text-display-xl text-ink mb-5 animate-enter-up">
            什么是{" "}
            <span className="relative inline-block">
              <span className="relative z-10">大语言模型</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
            ？
          </h1>
          <p className="font-sans text-[16px] lg:text-[18px] text-ink/70 max-w-2xl mx-auto leading-relaxed">
            一个能在万亿 token 上预训练、拥有数千亿到万亿参数、可以同时处理对话、代码、推理、多模态的神经网络系统。
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━ 核心定义 + 交互 ━━━━━━━━━━ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* 左：文字定义 */}
            <div className="lg:col-span-2 lg:sticky lg:top-24">
              <div className="eyebrow mb-3">§ 核心定义</div>
              <h2 className="font-display text-display-lg text-ink mb-5">
                参数 × 数据 × 算力 = 能力
              </h2>
              <div className="space-y-4 font-sans text-[14px] lg:text-[15px] text-ink/75 leading-relaxed">
                <p>
                  <strong className="text-ink font-bold">大语言模型（LLM）</strong>
                  是一种相较传统模型参数量更多、训练数据更海量的语言模型。架构上多采用 decoder-only Transformer。
                </p>
                <p>
                  典型的 LLM 拥有<span className="font-mono font-bold text-coral">数百亿到万亿参数</span>，
                  在<span className="font-mono font-bold text-coral">数 T~15 T token</span>的混合语料上预训练，
                  通过<span className="font-mono font-bold text-coral">千卡到万卡集群</span>并行完成。
                </p>
                <p>
                  规模带来质变 —— 推理、代码、跨语言、多模态等能力，在某个临界规模附近"涌现"出来，
                  而不是缓慢线性增长。这也是 LLM 区别于"普通 NLP 模型"的根本特征。
                </p>
              </div>

              <Link
                to="/abilities"
                className="inline-flex items-center gap-1.5 mt-6 font-sans font-bold text-[13px] text-ink hover:text-coral transition-colors"
              >
                看四大核心能力
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </Link>
            </div>

            {/* 右：交互动画 */}
            <div className="lg:col-span-3">
              <ModelSizeAnimation />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ 核心特征 4 卡 ━━━━━━━━━━ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 bg-white border-y-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="eyebrow mb-3">§ 核心特征</div>
            <h2 className="font-display text-display-lg text-ink mb-3">
              四个一定要知道的关键词
            </h2>
            <p className="font-sans text-[15px] text-ink/65 max-w-2xl">
              理解这四个特征，你就能解释为什么 LLM 跟之前的 NLP 模型完全不是一个物种。
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAITS.map((t, i) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="group bg-white border-2 border-ink rounded-3xl p-6 shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:10px_10px_0_0_#241C15]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className={`w-12 h-12 ${accentBg[t.accent]} border-2 border-ink rounded-xl flex items-center justify-center transition-transform duration-300 ease-spring group-hover:rotate-[-6deg]`}
                    >
                      <Icon className="w-5 h-5 text-ink" strokeWidth={2.2} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/40">
                      № 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-[17px] text-ink mb-2">
                    {t.title}
                  </h3>
                  <p className="font-sans text-[13px] text-ink/65 leading-relaxed">
                    {t.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ 6 个里程碑 ━━━━━━━━━━ */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 gap-4">
            <div>
              <div className="eyebrow mb-3">§ 6 个里程碑</div>
              <h2 className="font-display text-display-lg text-ink mb-2">
                LLM 进化的 6 个节点
              </h2>
              <p className="font-sans text-[14px] text-ink/65">
                从 2020 到 2026，每个节点都改变了行业方向。
              </p>
            </div>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-ink hover:text-coral transition-colors"
            >
              完整时间线
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className="relative bg-cream border-2 border-ink rounded-2xl p-5 shadow-stamp transition-transform duration-250 ease-spring hover:-translate-y-1"
              >
                <div className="absolute -top-3 left-5 px-2.5 py-0.5 bg-ink text-cream rounded-md font-mono text-[10px] font-bold tracking-wide">
                  № 0{i + 1}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-2">
                  {m.year} · {m.by}
                </div>
                <h3 className="font-display font-extrabold text-[20px] text-ink mb-2">
                  {m.name}
                </h3>
                <p className="font-sans text-[13px] text-ink/65 leading-relaxed">
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DefinitionPage;
