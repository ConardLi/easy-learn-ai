/**
 * 特点分析页 · 2026 版
 *
 * 设计：
 *   ─ 4 大特点 + 2 个新增（推理 / Agentic）= 共 6 张 feature card
 *   ─ 每张卡：图标 + 标题 + 描述 + 关键数字徽章 + 2026 关键事实列表
 *   ─ 顶部加一个交互式上下文长度演化图（log 轴）
 */
import React, { useMemo, useState } from "react";
import {
  Globe,
  FileText,
  Camera,
  AlertTriangle,
  Brain,
  Bot,
  ChevronRight,
} from "lucide-react";

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
  accent: "butter" | "coral" | "teal" | "cream";
  badge: string;
  badgeLabel: string;
  description: string;
  facts: string[];
  isChallenge?: boolean;
}

const FEATURES: Feature[] = [
  {
    id: "multilingual",
    icon: Globe,
    title: "多语言能力",
    subtitle: "Multilingual",
    accent: "butter",
    badge: "100+",
    badgeLabel: "可处理语言",
    description:
      "训练语料天然多语言，2026 年顶级模型对英中日法德等主流语言能力差距已收窄到 5% 以内。",
    facts: [
      "Qwen3 / DeepSeek-V3 等中文厂商在中文任务上反超英美模型",
      "低资源语言（如斯瓦希里语）仍有 10-20% 差距",
      "跨语言迁移：英文学到的知识能 zero-shot 迁移到其他语言",
      "翻译质量在 WMT 2025 测试集上接近专业人类译员水平",
    ],
  },
  {
    id: "context",
    icon: FileText,
    title: "超长上下文",
    subtitle: "Long Context",
    accent: "coral",
    badge: "2 M",
    badgeLabel: "Token 标配（2026）",
    description:
      "从 GPT-3 的 4 K 到 Gemini 3.5 的 2 M，6 年增长 500 倍。整本《红楼梦》、整个代码仓库都能塞进 prompt。",
    facts: [
      "GPT-3 (2020): 4 K token",
      "Claude 3 (2024): 200 K token，能读完整本小说",
      "Gemini 1.5 / 3.1 Pro: 1 M token，整套代码仓库",
      "Gemini 3.5 Flash (2026.05): 1 M+ 原生 + 多模态长视频",
      "GPT-5.6 内测: 1.5 M token，UI 生成大幅增强",
    ],
  },
  {
    id: "multimodal",
    icon: Camera,
    title: "多模态融合",
    subtitle: "Multimodal",
    accent: "teal",
    badge: "5 种",
    badgeLabel: "模态（文字/图/音/视/3D）",
    description:
      "从单一文本到全模态融合。2026 年顶级模型可同时处理文字、图像、音频、视频，部分支持 3D 场景生成。",
    facts: [
      "GPT-4o (2024.05): 原生多模态，端到端音频/图像",
      "Gemini 1.5+: 长视频理解（小时级电影一次性输入）",
      "Sora / Veo / Kling: 视频生成已达分钟级 1080p",
      "Gemini 3.1 Pro: 原生 SVG / 3D 代码渲染",
      "2026 年「文本-音频-视频-3D」端到端任务成为标配",
    ],
  },
  {
    id: "reasoning",
    icon: Brain,
    title: "原生推理",
    subtitle: "Reasoning Models",
    accent: "cream",
    badge: "+58%",
    badgeLabel: "数学准确率（vs 普通模型）",
    description:
      "2024 年起 o1 / DeepSeek-R1 / Gemini Thinking 等推理模型登场，把「思考过程」内化到训练里。",
    facts: [
      "OpenAI o1 (2024.09): 推理模型原型，AIME 数学突破 80%",
      "DeepSeek-R1 (2025.01): 开源比肩 o1，成本降至 1/10",
      "Gemini 2.5 Pro 引入「thinking budget」可控参数",
      "Claude Extended Thinking: 长 horizon 任务可「思考」数分钟",
      "2026 年顶级 reasoning model 在数学竞赛、代码竞赛超越人类金牌选手",
    ],
  },
  {
    id: "agentic",
    icon: Bot,
    title: "Agentic 能力",
    subtitle: "Agent / Tool Use",
    accent: "butter",
    badge: "76%",
    badgeLabel: "Terminal-Bench 2.1（Gemini 3.5）",
    description:
      "2026 年 LLM 不只是「回答问题」，而是能自主调用工具、规划多步任务、执行复杂操作。Agent 时代正式到来。",
    facts: [
      "Anthropic Claude Code: 自主完成多文件代码重构",
      "Google Gemini Spark: 24/7 个人 AI 代理（消费级）",
      "OpenAI ChatGPT Agent / Operator: 浏览器自动化",
      "MCP（Model Context Protocol）成为业界标准协议",
      "GDPval-AA（任务完成 Elo 评测）GPT-5.5 领先",
    ],
  },
  {
    id: "hallucination",
    icon: AlertTriangle,
    title: "幻觉问题",
    subtitle: "Hallucination",
    accent: "coral",
    badge: "↓ 70%",
    badgeLabel: "vs 2023（推理模型）",
    description:
      "仍是 LLM 最核心的挑战之一 —— 模型会「自信地胡说」。2026 年通过 RAG / grounding / 推理模型大幅缓解，但无法根除。",
    facts: [
      "在医疗、法律、金融等高风险场景仍需人工复核",
      "RAG（检索增强生成）让模型「先查再答」",
      "Grounding：标注答案来源，让用户可验证",
      "推理模型自我验证步骤，幻觉率下降 60-70%",
      "Constitutional AI / RLAIF：让模型学会「我不知道」",
    ],
    isChallenge: true,
  },
];

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

/* ──────────────────────────────────────────
 * 上下文长度演化交互图
 * ────────────────────────────────────────── */
interface CtxPoint {
  year: string;
  model: string;
  tokens: number; // K
  note: string;
}

const CTX_HISTORY: CtxPoint[] = [
  { year: "2020", model: "GPT-3", tokens: 2, note: "2 K" },
  { year: "2022", model: "ChatGPT", tokens: 4, note: "4 K" },
  { year: "2023.03", model: "GPT-4", tokens: 8, note: "8 K" },
  { year: "2023.11", model: "GPT-4 Turbo", tokens: 128, note: "128 K" },
  { year: "2024.03", model: "Claude 3 Opus", tokens: 200, note: "200 K" },
  { year: "2024.06", model: "Gemini 1.5 Pro", tokens: 1000, note: "1 M" },
  { year: "2025", model: "Gemini 2.5 Pro", tokens: 2000, note: "2 M" },
  { year: "2026.05", model: "Gemini 3.5 Flash", tokens: 1000, note: "1 M（默认）" },
  { year: "2026.Q2", model: "GPT-5.6（内测）", tokens: 1500, note: "1.5 M" },
];

const ContextEvolutionChart: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const points = useMemo(() => {
    const maxLog = Math.log10(2000);
    const minLog = Math.log10(2);
    return CTX_HISTORY.map((p, i) => {
      const x = (i / (CTX_HISTORY.length - 1)) * 100;
      const y = 100 - ((Math.log10(p.tokens) - minLog) / (maxLog - minLog)) * 95;
      return { ...p, x, y, i };
    });
  }, []);
  const pathD = useMemo(
    () => points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" "),
    [points],
  );
  const active = hoverIdx !== null ? points[hoverIdx] : points[points.length - 1];

  return (
    <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1.5">
            INTERACTIVE · 悬停查看
          </div>
          <h3 className="font-display font-extrabold text-[20px] text-ink">
            上下文长度的 6 年跃迁
          </h3>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
            {active.year}
          </div>
          <div className="font-display font-extrabold text-[15px] text-ink mt-0.5">
            {active.model}
          </div>
          <div className="font-mono text-[12px] font-bold text-coral mt-0.5">
            {active.note}
          </div>
        </div>
      </div>

      <div className="relative bg-cream border-2 border-ink rounded-2xl p-4">
        <svg viewBox="0 0 100 100" className="w-full h-[180px]" preserveAspectRatio="none">
          {/* 水平参考线 */}
          {[
            { tokens: 4, label: "4K" },
            { tokens: 128, label: "128K" },
            { tokens: 1000, label: "1M" },
          ].map(({ tokens, label }) => {
            const y =
              100 -
              ((Math.log10(tokens) - Math.log10(2)) /
                (Math.log10(2000) - Math.log10(2))) *
                95;
            return (
              <g key={label}>
                <line
                  x1="0"
                  x2="100"
                  y1={y}
                  y2={y}
                  stroke="#241C15"
                  strokeOpacity="0.1"
                  strokeDasharray="2 2"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

          {/* 曲线 */}
          <path
            d={pathD}
            fill="none"
            stroke="#241C15"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 节点 */}
          {points.map((p) => (
            <g
              key={p.i}
              onMouseEnter={() => setHoverIdx(p.i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoverIdx === p.i ? 4 : 2.5}
                fill={hoverIdx === p.i ? "#E07A5F" : "#F4D35E"}
                stroke="#241C15"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              {/* 透明 hit area */}
              <circle
                cx={p.x}
                cy={p.y}
                r="8"
                fill="transparent"
              />
            </g>
          ))}
        </svg>
        <div className="flex justify-between mt-2 font-mono text-[9px] uppercase tracking-wide text-ink/55">
          <span>2020</span>
          <span>2022</span>
          <span>2024</span>
          <span>2026</span>
        </div>
      </div>

      <div className="mt-4 px-4 py-2.5 bg-butter/40 border border-ink/15 rounded-lg">
        <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
          <strong>6 年增长 1000 倍</strong>。2020 年只能塞下半页论文，2026 年能塞下整套代码仓库 + 长视频。
          这彻底改变了 prompt engineering 的玩法 —— many-shot ICL 成为新范式。
        </div>
      </div>
    </div>
  );
};

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">§ 03 · 特点</div>
          <h1 className="font-display text-display-xl text-ink mb-5 animate-enter-up">
            2026 年的 LLM，到底{" "}
            <span className="relative inline-block">
              <span className="relative z-10">强在哪</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
          </h1>
          <p className="font-sans text-[16px] lg:text-[18px] text-ink/70 max-w-2xl mx-auto leading-relaxed">
            从「多语言 / 长上下文 / 多模态」三件套，到 2026 年新增的「原生推理 / Agentic」，
            再到永恒话题「幻觉」—— 6 个维度看完整图景。
          </p>
        </div>
      </section>

      {/* 上下文长度演化交互图 */}
      <section className="px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto">
          <ContextEvolutionChart />
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 bg-white border-y-2 border-ink">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="eyebrow mb-3">§ 6 大特点</div>
            <h2 className="font-display text-display-lg text-ink">
              6 张能力切片
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  className={`group relative bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:10px_10px_0_0_#241C15] ${
                    f.isChallenge ? "" : ""
                  }`}
                >
                  {/* 顶部色条 */}
                  <div
                    className={`relative h-28 ${accentBg[f.accent]} border-b-2 border-ink flex items-end p-5`}
                  >
                    <span className="absolute top-3 left-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                      № 0{i + 1}
                    </span>
                    <span className={`absolute top-3 right-5 font-mono text-[10px] uppercase tracking-[0.18em] ${accentText[f.accent]}/60`}>
                      {f.subtitle}
                    </span>
                    <div className="flex items-end gap-3 w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-ink rounded-xl flex items-center justify-center -mb-3">
                        <Icon className="w-5 h-5 text-ink" strokeWidth={2.2} />
                      </div>
                      {f.isChallenge && (
                        <span className="ml-auto inline-flex items-center gap-1 px-2 py-1 bg-white/90 border border-ink rounded-md font-mono text-[9px] uppercase tracking-wide text-coral font-bold">
                          挑战
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 pt-6">
                    {/* 标题 + 数字徽章 */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-display font-extrabold text-[18px] text-ink">
                        {f.title}
                      </h3>
                      <div className="text-right">
                        <div className="font-display font-extrabold text-[20px] text-coral leading-none">
                          {f.badge}
                        </div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink/45 mt-0.5">
                          {f.badgeLabel}
                        </div>
                      </div>
                    </div>

                    <p className="font-sans text-[13px] text-ink/70 leading-relaxed mb-4">
                      {f.description}
                    </p>

                    <div className="border-t border-ink/10 pt-3">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
                        2026 关键事实
                      </div>
                      <ul className="space-y-1.5">
                        {f.facts.map((fact, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-2 font-sans text-[12px] text-ink/70 leading-snug"
                          >
                            <ChevronRight
                              className="flex-shrink-0 mt-0.5 w-3 h-3 text-coral"
                              strokeWidth={2.5}
                            />
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
