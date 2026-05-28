/**
 * 首页 · Mailchimp-Freddie 风
 *
 * 结构：
 *   ─ HERO：display 标题 + butter 圆形装饰浮动卡 + 双 stamp CTA
 *   ─ MODULES：4 个学习模块 stamp 卡（每个不同 accent color）
 *   ─ STATS：cream 段 + 3 个 stamp 数字徽章
 *   ─ TIMELINE PEEK：从 GPT-3 到 2026 的 6 个里程碑横向滚动
 */
import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Zap,
  Settings,
  Clock,
  Sparkles,
} from "lucide-react";

/* 学习模块（与导航项对应） */
const MODULES = [
  {
    title: "LLM 定义",
    subtitle: "What is LLM",
    description: "了解大语言模型的基本概念、参数规模与预训练范式",
    icon: BookOpen,
    path: "/definition",
    accent: "butter",
  },
  {
    title: "核心能力",
    subtitle: "Core Abilities",
    description: "涌现能力、上下文学习、指令遵循、逐步推理 —— 四大能力可视化",
    icon: Zap,
    path: "/abilities",
    accent: "coral",
  },
  {
    title: "特点分析",
    subtitle: "Key Features",
    description: "多语言、长上下文、多模态、推理模型 —— 2026 年最新能力图景",
    icon: Settings,
    path: "/features",
    accent: "teal",
  },
  {
    title: "发展历程",
    subtitle: "Timeline 2020-2026",
    description: "从 GPT-3 到 Claude Opus 4.7、Gemini 3.5 Flash 的完整脉络",
    icon: Clock,
    path: "/timeline",
    accent: "cream",
  },
] as const;

/* accent → tailwind 颜色 token */
const accentBg: Record<string, string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  cream: "bg-cream",
};
const accentText: Record<string, string> = {
  butter: "text-ink",
  coral: "text-white",
  teal: "text-white",
  cream: "text-ink",
};

/* 时间轴一瞥（从最早到最新） */
const PEEK = [
  { year: "2020", label: "GPT-3", note: "1750 亿参数，LLM 时代开端" },
  { year: "2022", label: "ChatGPT", note: "RLHF 让对齐成为可能" },
  { year: "2024", label: "o1 / R1", note: "推理模型登场，思维链原生化" },
  { year: "2025", label: "Llama 4 · DeepSeek-V3", note: "开源追平闭源" },
  { year: "2026·Q1", label: "Gemini 3.1 Pro", note: "100 万 token 上下文成为标配" },
  { year: "2026·Q2", label: "Opus 4.7 · GPT-5.5", note: "Agentic 与超长 horizon" },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* ━━━━━━━━━━ HERO ━━━━━━━━━━ */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* 装饰浮动元素 */}
        <div className="absolute top-20 right-[8%] hidden lg:block animate-float-y" aria-hidden>
          <div className="w-20 h-20 bg-butter border-2 border-ink rounded-full shadow-stamp-lg flex items-center justify-center rotate-6">
            <Sparkles className="w-8 h-8 text-ink" strokeWidth={2.2} />
          </div>
        </div>
        <div className="absolute bottom-12 left-[6%] hidden lg:block animate-float-y-sm" aria-hidden>
          <div className="w-14 h-14 bg-coral border-2 border-ink rounded-2xl shadow-stamp -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-[10%] hidden xl:block animate-wiggle" aria-hidden>
          <div className="w-10 h-10 bg-white border-2 border-ink rounded-full shadow-stamp" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
              Large Language Model · 大语言模型
            </span>
          </div>

          {/* H1 · 直问 */}
          <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
            大语言模型是什么？
          </h1>

          {/* 一句话定义 · 加粗大字 + 高亮底 */}
          <p className="font-display text-[22px] lg:text-[28px] font-bold text-ink leading-snug mb-7 animate-enter-up">
            <span className="relative inline-block px-1">
              <span
                className="absolute left-0 right-0 bottom-0.5 h-3.5 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">
                一种通过不断「预测下一个词」来理解和生成语言的神经网络。
              </span>
            </span>
          </p>

          {/* 白话补充 */}
          <div className="max-w-2xl mx-auto space-y-3 text-[15.5px] lg:text-[16.5px] text-ink/75 leading-relaxed mb-10 animate-enter-fade text-left sm:text-center">
            <p>
              训练时它读完互联网上几乎所有的文本，学到「在这种上下文下，下一个最可能出现的词是什么」。
            </p>
            <p>
              用的时候你给它一段开头，它就一个词一个词地往下写。这样写出来的东西看起来像在跟你对话、在回答问题、在写代码。
            </p>
            <p>
              <strong className="text-ink">ChatGPT、Claude、Gemini，本质上都是这种模型。</strong>
            </p>
          </div>

          {/* CTA 双按钮 */}
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center animate-enter-fade">
            <Link
              to="/definition"
              className="btn-stamp bg-ink text-cream hover:bg-ink"
            >
              再往细里看
              <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </Link>
            <Link
              to="/abilities"
              className="btn-stamp bg-white text-ink hover:bg-butter"
            >
              直接玩交互
              <Sparkles className="w-4 h-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ MODULES ━━━━━━━━━━ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-white border-y-2 border-ink">
        <div className="max-w-7xl mx-auto">
          {/* 段头 */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <div className="eyebrow mb-3">§ 学习地图</div>
              <h2 className="font-display text-display-lg text-ink mb-3">
                四张地图，看懂 LLM
              </h2>
              <p className="font-sans text-[15px] text-ink/65 max-w-2xl">
                每个模块都包含可交互的动画演示，先看概念，再亲手玩，最后对照 2026 年最新数据。
              </p>
            </div>
            <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
              <span>04</span>
              <span className="w-12 h-px bg-ink/30" />
              <span>模块</span>
            </div>
          </div>

          {/* 4 个模块卡 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MODULES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.path}
                  to={m.path}
                  className="group block bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:10px_10px_0_0_#241C15]"
                >
                  {/* 顶部色块 */}
                  <div
                    className={`relative h-32 ${accentBg[m.accent]} border-b-2 border-ink flex items-center justify-center`}
                  >
                    {/* 序号水印 */}
                    <span className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40">
                      № {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* 图标 */}
                    <div
                      className={`w-14 h-14 rounded-2xl border-2 border-ink flex items-center justify-center transition-transform duration-300 ease-spring group-hover:rotate-[-6deg] group-hover:scale-110 ${
                        m.accent === "butter" || m.accent === "cream"
                          ? "bg-white"
                          : "bg-white"
                      }`}
                    >
                      <Icon className={`w-7 h-7 text-ink`} strokeWidth={2.2} />
                    </div>
                    {/* 右上角小副标 */}
                    <span className={`absolute top-3 right-3 font-mono text-[10px] uppercase tracking-[0.18em] ${accentText[m.accent]}/60`}>
                      {m.subtitle}
                    </span>
                  </div>

                  {/* 文字区 */}
                  <div className="p-6">
                    <h3 className="font-display font-extrabold text-[20px] text-ink mb-2">
                      {m.title}
                    </h3>
                    <p className="font-sans text-[13px] text-ink/65 leading-relaxed mb-5 min-h-[60px]">
                      {m.description}
                    </p>
                    <div className="inline-flex items-center gap-1.5 font-sans font-bold text-[12px] text-ink group-hover:text-coral transition-colors">
                      开始学习
                      <ArrowRight
                        className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-[3px]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ STATS ━━━━━━━━━━ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-cream">
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow mb-3">§ 为什么是现在</div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            2026 年的 LLM，已经不一样了
          </h2>
          <p className="font-sans text-[15px] text-ink/65 max-w-2xl mx-auto mb-14">
            两年前 ChatGPT 还是「会说话的搜索」，今天 Gemini Spark 已经 24 小时帮你处理事务。
            概念跟着模型在变，这份手册随时更新。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "1.5M", label: "顶级模型上下文（GPT-5.6 内测）", note: "vs 2022 的 4K" },
              { num: "87.6%", label: "SWE-bench（Claude Opus 4.7）", note: "代码生成达到工程师水平" },
              { num: "19+", label: "30 天内顶尖模型发布", note: "2026 年 4–5 月单月" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white border-2 border-ink rounded-3xl shadow-stamp p-6 transition-transform duration-250 ease-spring hover:-translate-y-1"
              >
                <div className="font-display font-extrabold text-[44px] lg:text-[52px] text-ink leading-none mb-3">
                  {s.num}
                </div>
                <div className="font-sans font-bold text-[13px] text-ink mb-1.5">
                  {s.label}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━ TIMELINE PEEK ━━━━━━━━━━ */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 bg-white border-t-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
            <div>
              <div className="eyebrow mb-3">§ 6 年一瞥</div>
              <h2 className="font-display text-display-lg text-ink mb-2">
                从 2020 到 2026
              </h2>
              <p className="font-sans text-[14px] text-ink/65">
                完整的时间线在「发展历程」章节，这里先看 6 个关键节点。
              </p>
            </div>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-ink hover:text-coral transition-colors"
            >
              查看完整时间线
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </Link>
          </div>

          {/* 横向滚动节点条 */}
          <div className="relative">
            <div className="absolute left-0 right-0 top-[28px] h-[3px] bg-ink hidden sm:block" aria-hidden />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {PEEK.map((p, i) => (
                <div key={i} className="relative flex flex-col items-center">
                  {/* 节点圆 */}
                  <div className="relative z-10 w-14 h-14 bg-butter border-2 border-ink rounded-full flex items-center justify-center shadow-stamp mb-3">
                    <span className="font-mono text-[10px] font-bold text-ink leading-tight text-center">
                      {p.year}
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-display font-extrabold text-[14px] text-ink mb-1">
                      {p.label}
                    </div>
                    <div className="font-sans text-[11px] text-ink/55 leading-snug">
                      {p.note}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
