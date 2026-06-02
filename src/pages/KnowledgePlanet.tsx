/**
 * 知识星球 · Mailchimp-Freddie 风
 *
 * 信息架构：
 *   1. HERO（butter 黄·"邀请条带"）—— 全宽居中：大标题 + stats 横排 + 双 CTA
 *   2. FEATURES（cream·双栏）     —— 左 PLANET-A 插画 + 右 section head + 下方 4 卡 perks
 *   3. CURRICULUM（butter-tint）  —— 12 大版块 Bento + 176 篇总览（取自海报 1）
 *   4. TRACKS（cream）            —— 5 条学习主线大卡（取自海报 2-6）
 *   5. TEACHER（白底）            —— PLANET-B 头像插画 + 老师介绍 + 角色 chips
 *   6. JOIN（ink 深色）           —— 优惠图 + 二维码 (白卡 stamp 风对比深底)
 *
 * 视觉语言（区别于首页 / AI 知视 Hero）：
 *   首页 Hero    = 双栏 + 大动画插画
 *   AI 知视 Hero = 全宽居中 + 大搜索为主（工具）
 *   星球 Hero    = 全宽居中 + 大 stats + CTA 为主（邀请）
 */

import React from "react";
import {
  BookOpen,
  FileText,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  ArrowDown,
  Rocket,
  Wrench,
  Bot,
  Workflow,
  Database,
  Sparkles,
  Brain,
  Package,
  Layers,
  Compass,
  BarChart3,
  PenTool,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import {
  Sparkle4,
  Star,
  DotGrid,
  CircleScribble,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";

/**
 * 平滑滚到指定 id 的 section。
 * 项目用 HashRouter，URL hash 已被路由占用，
 * 不能用 <a href="#id"> 的浏览器原生锚点跳转，必须程序化滚动。
 */
const scrollToSection = (id: string): void => {
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
};

/* ════════════════════════════════════════════════════════════════════
 * DATA · 4 大模块 / 12 版块 / 5 大主线
 * ──────────────────────────────────────────────────────────────────── */

interface PerkItem {
  num: string;
  Icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  accent: "butter" | "coral" | "teal" | "cream";
}

const perks: PerkItem[] = [
  {
    num: "i.",
    Icon: BookOpen,
    title: "AI 教程完整版",
    description:
      "视频里出现过的原始课件，加上非公开的代码、数据和实操过程。",
    detail: "176 章节 · 持续更新",
    accent: "butter",
  },
  {
    num: "ii.",
    Icon: FileText,
    title: "最新学习资料",
    description: "从一手渠道整理的论文、技术博客和实战指南，避免你重复踩坑。",
    detail: "持续整理 · 周更",
    accent: "coral",
  },
  {
    num: "iii.",
    Icon: TrendingUp,
    title: "行业报告",
    description: "权威机构的 AI 行业报告与最佳实践，提前看到行业怎么走。",
    detail: "各行业 AI 案例",
    accent: "teal",
  },
  {
    num: "iv.",
    Icon: MessageSquare,
    title: "专业答疑",
    description: "由花园老师亲自整理 + 解答，更多一对一深度交流的机会。",
    detail: "群内答疑 · 私信问询",
    accent: "cream",
  },
];

/* ── 海报 1 · 12 大版块（CURRICULUM Bento grid） ───────────────────── */
interface CurriculumTile {
  name: string;
  desc: string;
  Icon: LucideIcon;
}

const curriculum: CurriculumTile[] = [
  { name: "AI 演进与生态", desc: "Transformer → Agent 主线", Icon: Compass },
  { name: "AI 基础理论", desc: "注意力机制 · 涌现能力", Icon: BookOpen },
  { name: "模型部署", desc: "Ollama / vLLM · 量化精度", Icon: Package },
  { name: "模型微调", desc: "LoRA · LLaMA Factory", Icon: Wrench },
  { name: "模型评估", desc: "MMLU · SWE-bench · LM Arena", Icon: BarChart3 },
  { name: "AI 智能体", desc: "Agent Loop · MCP · Skills", Icon: Bot },
  { name: "企业级 Agent", desc: "从 0 到生产 · 6 阶段实战", Icon: Workflow },
  { name: "OpenClaw 专题", desc: "你自己的智能体花园", Icon: Sparkles },
  { name: "AI 知识库", desc: "RAG · 检索增强 · 向量库", Icon: Database },
  { name: "提示词工程", desc: "提示词 → 上下文 → Harness", Icon: PenTool },
  { name: "AI 多模态", desc: "图像 · 语音 · 视频生成", Icon: Layers },
  { name: "趋势洞察", desc: "前沿动态 · 论文速递", Icon: Lightbulb },
];

/* ── 海报 2-6 · 5 条学习主线 ───────────────────────────────────────── */

type AccentKey =
  | "butter"
  | "coral"
  | "teal"
  | "pop"
  | "butter-deep";

interface TrackStage {
  /** 阶段编号或代号（"01" / "❶" / "Ch.0-4" 等显示纯字符串） */
  badge: string;
  title: string;
  /** 一行简述（可选） */
  caption?: string;
  /** 关键词 chips */
  topics: string[];
}

interface Track {
  id: string;
  /** 占位 placeholder 中央用的小 icon，也作为图未补齐时的视觉锚 */
  Icon: LucideIcon;
  /** 海报上的"篇数总览"数字 */
  count: number;
  /** "20 篇" 后面那个名词 */
  countSuffix: string;
  /** eyebrow 小标签 */
  eyebrow: string;
  title: string;
  /** 标题里高亮的那个词（butter 下划线效果） */
  titleAccent?: string;
  /** 一句话副述 */
  description: string;
  /** 5-7 行的阶段列表 */
  stages: TrackStage[];
  accent: AccentKey;
  /** 是否"独家"标 */
  exclusive?: boolean;
  /** 插画占位 ID —— 待补图的命名约定：/imgs/site/Illustration-TRACK-XX.png */
  illustrationId: string;
  /** placeholder 上显示的一句话主题（替图后仍可作为 alt） */
  illustrationCaption: string;
}

const tracks: Track[] = [
  /* ── 海报 2：AI 理论篇 ───────────────────── */
  {
    id: "theory",
    Icon: Brain,
    count: 20,
    countSuffix: "篇 · 理论篇全收录",
    eyebrow: "Track 01 · 一条认知主线",
    title: "AI 理论篇",
    titleAccent: "一网打尽",
    description: "从行业到原理，从机制到应用，一条线读完。",
    accent: "butter",
    illustrationId: "TRACK-01",
    illustrationCaption: "翻开的书 + Transformer 草图 + 索引卡",
    stages: [
      {
        badge: "01",
        title: "时代脉络",
        caption: "理清 AI 的来龙去脉",
        topics: [
          "AI 演进主线",
          "Transformer → Agent",
          "DeepSeek",
          "OpenAI",
          "Anthropic",
          "Google",
          "xAI",
          "Kimi",
        ],
      },
      {
        badge: "02",
        title: "模型本体",
        caption: "看懂模型本身是什么",
        topics: [
          "Transformer 注意力",
          "LLM 涌现能力",
          "Token & BPE 分词",
          "LLM API 调用范式",
        ],
      },
      {
        badge: "03",
        title: "进化机制",
        caption: "理解能力是怎么\"长\"出来的",
        topics: [
          "模型微调",
          "RLHF 与对齐",
          "MoE 稀疏激活",
          "Flash Attention",
          "CoT 推理",
        ],
      },
      {
        badge: "04",
        title: "应用范式",
        caption: "知道模型怎么变成产品",
        topics: [
          "提示词 / 系统提示词",
          "行为约束设计",
          "RAG 检索增强",
          "Agent 智能体四大支柱",
        ],
      },
    ],
  },

  /* ── 海报 3：模型部署 / 微调 / 评估 ───────── */
  {
    id: "engineering",
    Icon: Wrench,
    count: 47,
    countSuffix: "篇工程实战",
    eyebrow: "Track 02 · 企业真实案例实操",
    title: "模型部署 · 微调 · 评估",
    titleAccent: "全链路打通",
    description: "从训练到部署到评估，把工程链路里的每一步走通。",
    accent: "coral",
    illustrationId: "TRACK-02",
    illustrationCaption: "打开的工具箱 + 量化精度尺 + 试管",
    stages: [
      {
        badge: "6 篇",
        title: "模型部署",
        topics: [
          "满血版 vs 蒸馏版",
          "硬件需求",
          "Ollama 轻量开箱",
          "vLLM 高吞吐",
          "FP32 / FP16 / INT8 / INT4 量化",
          "本地部署 DeepSeek",
        ],
      },
      {
        badge: "28 篇",
        title: "模型微调",
        topics: [
          "Unsloth",
          "Colab 微调 R1 蒸馏",
          "LLaMA Factory 零代码 Web UI",
          "Easy Dataset 数据合成",
          "LoRA / 全参 / 量化 / GGUF",
          "显存估算 · 拟合判断",
          "SwanLab 监控",
        ],
      },
      {
        badge: "13 篇",
        title: "模型评估",
        topics: [
          "MMLU",
          "GPQA",
          "HLE",
          "ARC-AGI",
          "SWE-bench",
          "τ²-bench",
          "MCP-Atlas",
          "LM Arena 人类偏好",
          "垂直领域评估",
          "盲测",
        ],
      },
    ],
  },

  /* ── 海报 4：AI Agent 完全指南 ─────────────── */
  {
    id: "agent-guide",
    Icon: Bot,
    count: 27,
    countSuffix: "篇 Agent 深度内容",
    eyebrow: "Track 03 · 全网最完整的学习路径",
    title: "AI Agent 完全指南",
    titleAccent: "全面掌握",
    description: "从基础概念到框架实战，一次性吃透智能体的应用与开发。",
    accent: "teal",
    illustrationId: "TRACK-03",
    illustrationCaption: "7 个智能体模块组成的知识星图",
    stages: [
      {
        badge: "[基础概念]",
        title: "基础概念",
        topics: [
          "Function Calling",
          "Agent Loop",
          "记忆系统",
          "上下文管理",
        ],
      },
      {
        badge: "[运行机制]",
        title: "运行机制",
        topics: [
          "Plan / Default / Auto 模式",
          "TodoWrite",
          "沙箱机制",
        ],
      },
      {
        badge: "[协作架构]",
        title: "协作架构",
        topics: ["SubAgent", "Agent Teams", "Worktree 隔离"],
      },
      {
        badge: "[MCP 生态]",
        title: "MCP 生态",
        topics: [
          "协议解析",
          "Server 开发",
          "抓包分析",
          "安全风险",
        ],
      },
      {
        badge: "[Skills]",
        title: "Skills 系统",
        topics: [
          "渐进式披露",
          "Skill Creator",
          "知识检索 Skill",
        ],
      },
      {
        badge: "[框架实战]",
        title: "框架实战",
        topics: [
          "LangChain v1",
          "LangGraph Multi-Agent",
          "MCP Scanner",
        ],
      },
      {
        badge: "[Harness]",
        title: "Harness 三阶段工程",
        topics: ["提示词 → 上下文 → Harness"],
      },
    ],
  },

  /* ── 海报 5：从零构建企业级 Agent ─────────── */
  {
    id: "enterprise-agent",
    Icon: Rocket,
    count: 31,
    countSuffix: "篇 · 6 阶段全打通",
    eyebrow: "Track 04 · 手把手实战 · 6 阶段工程演进",
    title: "从零构建企业级 Agent",
    description:
      "从项目初始化到打包发布，每一章都有可运行的代码与设计权衡。",
    accent: "pop",
    exclusive: true,
    illustrationId: "TRACK-04",
    illustrationCaption: "console.log 长成 6 级台阶 + 小火箭升空",
    stages: [
      {
        badge: "Ch. 0-4 · 5 篇",
        title: "跑通最小闭环",
        caption: "从项目初始化到单轮 Agent 闭环",
        topics: [
          "脚手架",
          "LLM 流式通信",
          "终端交互",
          "Tool 接口",
          "Agentic Loop",
        ],
      },
      {
        badge: "Ch. 5-8 · 4 篇",
        title: "成为可用的 CLI Agent",
        caption: "补齐本地执行能力与多轮会话基础",
        topics: [
          "核心工具集",
          "System Prompt",
          "三级权限模型",
          "QueryEngine",
        ],
      },
      {
        badge: "Ch. 9-13 · 5 篇",
        title: "解决长期对话问题",
        caption: "让系统能持续工作并进行规划",
        topics: [
          "会话持久化",
          "项目记忆",
          "上下文压缩",
          "Token 预算",
          "Plan Mode",
        ],
      },
      {
        badge: "Ch. 14-21 · 8 篇",
        title: "扩展复杂任务能力",
        caption: "管理任务、接入生态、进行协作",
        topics: [
          "TodoWrite",
          "Task 任务图",
          "MCP",
          "Skills",
          "沙箱",
          "SubAgent",
          "Worktree",
          "Agent Teams",
        ],
      },
      {
        badge: "Ch. 22-26 · 5 篇",
        title: "补齐产品化能力",
        caption: "提升可扩展性、交互体验与系统韧性",
        topics: [
          "Hooks",
          "UI 升级",
          "配置系统",
          "文件历史",
          "错误处理",
        ],
      },
      {
        badge: "Ch. 27-30 · 4 篇",
        title: "走向交付与自动化",
        caption: "支持自动化、多模型与发布分发",
        topics: [
          "管道模式",
          "Auto Mode",
          "多 Provider",
          "打包发布",
        ],
      },
    ],
  },

  /* ── 海报 6：OpenClaw 专题 ──────────────────── */
  {
    id: "openclaw",
    Icon: Sparkles,
    count: 25,
    countSuffix: "篇 OpenClaw 专属",
    eyebrow: "Track 05 · 别处看不到的内容",
    title: "OpenClaw 专题",
    titleAccent: "你自己的 AI 智能体花园",
    description: "动手搭一套属于自己的智能体系统，从零开始。",
    accent: "butter-deep",
    exclusive: true,
    illustrationId: "TRACK-05",
    illustrationCaption: "迷你花园 + 7 个分工小机器人盆栽",
    stages: [
      {
        badge: "嫩芽",
        title: "入门",
        topics: ["环境搭建", "配置向导", "飞书接入"],
      },
      {
        badge: "面具",
        title: "人格",
        topics: ["四层身份", "SOUL 安全", "人设调优"],
      },
      {
        badge: "记忆",
        title: "记忆系统",
        topics: ["双层存储", "写入检索", "排查实践"],
      },
      {
        badge: "技能",
        title: "技能系统",
        topics: ["ClawHub", "四阶段进化"],
      },
      {
        badge: "调度",
        title: "调度引擎",
        topics: ["定时任务", "链式执行", "Cron 玩法"],
      },
      {
        badge: "插件",
        title: "插件扩展",
        topics: ["五类扩展", "开发规范"],
      },
      {
        badge: "阵列",
        title: "多智能体阵列",
        topics: [
          "生图助手",
          "投资助手",
          "写作助手",
          "社区助手",
          "资讯助手",
          "开发助手",
          "协作助手",
        ],
      },
      {
        badge: "附录",
        title: "速查与指南",
        topics: ["命令速查", "配置速查", "安全指南"],
      },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════
 * 颜色映射 · 给 Track 的品牌色用
 * ──────────────────────────────────────────────────────────────────── */

const accentStripBg: Record<AccentKey, string> = {
  butter: "bg-butter",
  coral: "bg-coral",
  teal: "bg-teal",
  pop: "bg-pop",
  "butter-deep": "bg-butter-deep",
};

const accentTextOnSurface: Record<AccentKey, string> = {
  butter: "text-ink",
  coral: "text-coral",
  teal: "text-teal",
  pop: "text-pop",
  "butter-deep": "text-ink",
};

const accentBadgeBg: Record<AccentKey, string> = {
  butter: "bg-butter text-ink",
  coral: "bg-coral text-white",
  teal: "bg-teal text-white",
  pop: "bg-pop text-white",
  "butter-deep": "bg-butter-deep text-ink",
};

/* ════════════════════════════════════════════════════════════════════
 * 主页面
 * ──────────────────────────────────────────────────────────────────── */

const KnowledgePlanet: React.FC = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · 全宽居中邀请条带 ═══════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        <DotGrid
          className="absolute bottom-10 left-[10%] w-20 h-12 text-ink opacity-40 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />
        <Sparkle4
          className="absolute top-16 left-[8%] w-7 h-7 text-ink hidden md:block"
          color="#241C15"
        />
        <Star
          className="absolute top-20 right-[7%] w-8 h-8 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[860px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-16 lg:pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ 知识星球</span>
          </div>

          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">把好奇心，</span>{" "}
            <span className="whitespace-nowrap">
              变成
              <span className="relative inline-block mx-[0.1em]">
                <span className="relative z-10">长期</span>
                <CircleScribble
                  className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] z-0"
                  color="#E07A5F"
                />
              </span>
              的学习路径。
            </span>
          </h1>

          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[600px] mx-auto mt-7">
            付费深度社群，由花园老师独立维护。
            教程、资料、行业报告、专业答疑——
            <span className="font-bold">一站读完</span>。
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <button
              type="button"
              onClick={() => scrollToSection("join")}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-ink text-butter border-2 border-ink rounded-full font-sans font-extrabold text-[16px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
            >
              <span>扫码加入</span>
              <ArrowDown
                className="w-5 h-5 transition-transform duration-250 group-hover:translate-y-1"
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("curriculum")}
              className="group inline-flex items-center gap-2 px-6 py-4 text-ink font-sans font-semibold text-[15px] hover:underline underline-offset-4 transition-colors"
            >
              <span>先看课程地图</span>
              <ArrowDown
                className="w-4 h-4 transition-transform duration-250 group-hover:translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Stats —— 数字来自海报 1 与 6 海报合计 */}
          <div className="mt-14 pt-10 border-t-2 border-ink/15">
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
              <StatItem value="176" label="深度文档" />
              <span className="w-px h-10 bg-ink/20 hidden md:inline-block" />
              <StatItem value="5" label="学习主线" />
              <span className="w-px h-10 bg-ink/20 hidden md:inline-block" />
              <StatItem value="10 年" label="持续更新" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURES · 含金量 4 卡 ═══════════════════ */}
      <section
        id="perks"
        className="relative bg-cream border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
            <div className="lg:col-span-5 flex items-center justify-center lg:justify-start">
              <IllustrationImage
                src="/imgs/site/Illustration-PLANET-A.png"
                alt="角色坐在书桌前专注学习，周围浮着小星，象征社群陪伴"
                animation="up"
                className="max-w-[400px]"
              />
            </div>

            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ 含金量</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">在星球里，</span>{" "}
                <span className="whitespace-nowrap">
                  你能
                  <span className="relative inline-block mx-[0.1em]">
                    <span className="relative z-10">真正拿到</span>
                    <HandUnderline
                      className="absolute -bottom-2 left-0 right-0 w-full h-3"
                      color="#F4D35E"
                    />
                  </span>
                  的东西
                </span>
              </h2>
              <p className="font-sans text-[17px] text-ink-secondary leading-[1.7] mt-6 max-w-xl">
                教程的完整版、第一手资料、各行业 AI
                报告、和老师本人答疑——四件事都打包给你，单独买都不止这个价。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {perks.map((p) => (
              <PerkCard key={p.num} perk={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CURRICULUM · 12 大版块 Bento ═══════════════════ */}
      <section
        id="curriculum"
        className="relative bg-butter-tint border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <Sparkle4
          className="absolute top-14 right-[6%] w-6 h-6 text-coral hidden md:block"
          color="#E07A5F"
        />
        <DotGrid
          className="absolute bottom-14 left-[4%] w-20 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          {/* Section head —— 双栏：左标题 + 右总量 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
                <span className="inline-block w-6 h-px bg-ink/45" />
                <span>§ 课程地图</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1]">
                一份{" "}
                <span className="relative inline-block mx-[0.05em]">
                  <span className="relative z-10">AI 全景教程</span>
                  <HandUnderline
                    className="absolute -bottom-2 left-0 right-0 w-full h-3"
                    color="#E07A5F"
                  />
                </span>
                ，13 大版块·一站读完。
              </h2>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <div className="inline-flex items-baseline gap-2">
                <span className="font-display font-extrabold text-[64px] lg:text-[80px] text-ink leading-none">
                  176
                </span>
                <span className="font-display font-extrabold text-[20px] text-ink leading-tight">
                  篇深度文档
                </span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1">
                Theory · Engineering · Agent · Exclusive
              </div>
            </div>
          </div>

          {/* 12 版块 Bento grid —— 4 色色条循环（butter/coral/teal/pop），编号档案式 */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-3.5">
            {curriculum.map((tile, i) => (
              <CurriculumTileCard key={tile.name} tile={tile} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRACKS · 5 大主线大卡 ═══════════════════ */}
      <section
        id="tracks"
        className="relative bg-cream border-b-2 border-ink overflow-hidden scroll-mt-20"
      >
        <Star
          className="absolute top-16 right-[8%] w-8 h-8 rotate-12 text-butter hidden md:block"
          color="#F4D35E"
          filled
        />
        <div
          className="absolute bottom-20 left-[3%] w-32 h-32 rounded-full bg-coral/15 hidden md:block"
          aria-hidden
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          {/* Section head */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
              <span className="inline-block w-6 h-px bg-ink/45" />
              <span>§ 5 条学习主线</span>
            </div>
            <h2 className="font-display font-extrabold text-display-lg text-ink leading-[1.1]">
              从{" "}
              <span className="text-coral">理论</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="text-teal">工程</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="text-pop">Agent</span>
              <ArrowRight className="inline w-7 h-7 mx-1 -mt-1 text-ink/60" strokeWidth={2.5} />{" "}
              <span className="bg-butter px-2 py-0.5 border-2 border-ink rounded-md">
                独家专题
              </span>
              。
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.7] mt-5">
              每条主线都有可运行的代码、可下载的资料和实操步骤。按学习顺序展开，从「看懂」到「能做」。
            </p>
          </div>

          {/* 5 卡垂直堆叠 */}
          <div className="space-y-8 lg:space-y-10">
            {tracks.map((track, i) => (
              <TrackCard key={track.id} track={track} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TEACHER ═══════════════════════ */}
      <section className="relative bg-white border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-4 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-PLANET-B.png"
                alt="花园老师卡通头像 · ConardLi"
                animation="pop"
                className="max-w-[320px]"
              />
            </div>

            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cream border-2 border-ink rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-ink mb-5">
                <span>§ 关于作者</span>
              </div>
              <h2 className="font-display font-extrabold text-display-lg text-ink">
                <span className="whitespace-nowrap">
                  一位坚持更新
                  <span className="relative inline-block mx-[0.1em]">
                    <span className="relative z-10">10 年</span>
                    <HandUnderline
                      className="absolute -bottom-2 left-0 right-0 w-full h-3"
                      color="#E07A5F"
                    />
                  </span>
                </span>{" "}
                <span className="whitespace-nowrap">的内容作者。</span>
              </h2>
              <p className="font-sans text-[17px] text-ink-secondary leading-[1.75] mt-6 max-w-2xl">
                <span className="font-bold text-ink">
                  花园老师 · ConardLi
                </span>{" "}
                ，专注 AI 技术分享，致力于把复杂的概念
                讲到「真的看得懂」。所有内容都自己编、自己画、自己写——
                慢，但是诚意每一篇都看得见。
              </p>

              <div className="flex flex-wrap gap-2.5 mt-8">
                <RoleChip label="AI 技术专家" />
                <RoleChip label="B 站 UP 主" />
                <RoleChip label="内容创作者" />
                <RoleChip label="独立维护" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ JOIN (CTA) ═══════════════════════ */}
      <section
        id="join"
        className="relative bg-ink overflow-hidden scroll-mt-20"
      >
        <Sparkle4
          className="absolute top-12 left-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute top-16 right-[10%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border-2 border-white/30 rounded-full font-sans font-semibold text-[11px] uppercase tracking-wider text-white mb-5">
              <span>§ 准备好了</span>
            </div>
            <h2 className="font-display font-extrabold text-display-lg text-white">
              <span className="whitespace-nowrap">先领优惠券，</span>{" "}
              <span className="whitespace-nowrap">
                再加入{" "}
                <span className="text-butter">AI 秘密花园</span>。
              </span>
            </h2>
            <p className="font-serif italic text-[17px] text-white/65 mt-6">
              知识星球付费社群 · 一次加入，长期更新；新成员可领 ¥20 立减券。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <JoinCard title="限时优惠" caption="新成员专享，先到先得">
              <img
                src="/imgs/yh.jpg"
                alt="知识星球限时优惠券"
                className="w-full h-auto max-w-[360px] mx-auto"
                loading="lazy"
              />
            </JoinCard>
            <JoinCard title="入会二维码" caption="扫码即可申请加入">
              <img
                src="/imgs/qr.png"
                alt="知识星球加入二维码"
                className="w-full h-auto max-w-[360px] mx-auto"
                loading="lazy"
              />
            </JoinCard>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * 子组件
 * ──────────────────────────────────────────────────────────────────── */

const StatItem: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => (
  <div>
    <div className="font-display font-extrabold text-[28px] text-ink leading-none">
      {value}
    </div>
    <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-1.5">
      {label}
    </div>
  </div>
);

const PerkCard: React.FC<{ perk: PerkItem }> = ({ perk }) => {
  const { num, Icon, title, description, detail, accent } = perk;
  const accentBg = {
    butter: "bg-butter",
    coral: "bg-coral",
    teal: "bg-teal",
    cream: "bg-cream",
  }[accent];
  const accentText =
    accent === "coral" || accent === "teal" ? "text-white" : "text-ink";

  return (
    <article className="group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp-lg transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15] overflow-hidden">
      <div
        className={`${accentBg} ${accentText} border-b-2 border-ink px-6 py-5 flex items-center justify-between`}
      >
        <span className="font-serif italic text-[20px]">{num}</span>
        <Icon className="w-7 h-7" strokeWidth={2} />
      </div>
      <div className="flex flex-col flex-1 p-6 lg:p-7">
        <h3 className="font-display font-extrabold text-[20px] text-ink leading-snug mb-3">
          {title}
        </h3>
        <p className="font-sans text-[15px] text-ink-secondary leading-[1.7] mb-5 flex-1">
          {description}
        </p>
        <div className="inline-flex items-center self-start gap-1.5 px-3 py-1 bg-cream border border-ink/15 rounded-full font-sans font-semibold text-[12px] text-ink">
          <Sparkle4 className="w-2.5 h-2.5" color="#E07A5F" />
          <span>{detail}</span>
        </div>
      </div>
    </article>
  );
};

const RoleChip: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center px-3 py-1.5 bg-cream border-2 border-ink/15 rounded-full font-sans font-semibold text-[13px] text-ink-secondary">
    {label}
  </span>
);

const JoinCard: React.FC<{
  title: string;
  caption: string;
  children: React.ReactNode;
}> = ({ title, caption, children }) => (
  <div className="bg-white border-2 border-ink rounded-3xl shadow-[8px_8px_0_0_#F4D35E] p-8 lg:p-10">
    <div className="text-center mb-6">
      <h3 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
        {title}
      </h3>
      <p className="font-serif italic text-[14px] text-ink/55">{caption}</p>
    </div>
    <div className="flex items-center justify-center">{children}</div>
  </div>
);

/* ── 12 大版块小卡（CURRICULUM） ─────────────────────────────────── */
/* 4 色循环色条 —— 按 grid 顺序给 12 张卡分组节奏，避免满屏黄色块 */
const TILE_COLOR_BARS = [
  "bg-butter",
  "bg-coral",
  "bg-teal",
  "bg-pop",
] as const;

const CurriculumTileCard: React.FC<{
  tile: CurriculumTile;
  index: number;
}> = ({ tile, index }) => {
  const { name, desc, Icon } = tile;
  const colorBar = TILE_COLOR_BARS[index % TILE_COLOR_BARS.length];

  return (
    <article className="group flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]">
      {/* 左竖色条 —— 唯一的颜色锚点 */}
      <div
        className={`flex-shrink-0 w-1.5 ${colorBar} border-r-2 border-ink`}
        aria-hidden
      />
      {/* 主体 */}
      <div className="flex-1 min-w-0 px-4 py-4 lg:px-5 lg:py-[18px]">
        {/* 顶：编号 + 右上小 icon */}
        <div className="flex items-start justify-between mb-2.5">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45 leading-none mt-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <Icon
            className="w-[18px] h-[18px] text-ink/40 flex-shrink-0"
            strokeWidth={2}
          />
        </div>
        <h3 className="font-display font-extrabold text-[15px] text-ink leading-tight mb-1">
          {name}
        </h3>
        <p className="font-sans text-[11.5px] text-ink-tertiary leading-[1.5]">
          {desc}
        </p>
      </div>
    </article>
  );
};

/* ── TrackCard · 5 大主线大卡 ───────────────────────────────────── */
const TrackCard: React.FC<{ track: Track; index: number }> = ({
  track,
  index,
}) => {
  const {
    count,
    countSuffix,
    eyebrow,
    title,
    titleAccent,
    stages,
    accent,
    illustrationId,
    illustrationCaption,
  } = track;

  return (
    <article className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:10px_10px_0_0_#241C15]">
      {/* 顶 strip —— 品牌色 */}
      <div className={`h-2.5 ${accentStripBg[accent]} border-b-2 border-ink`} />

      {/* 主体：左 5 / 右 7 双栏 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* ── 左：极简封面 —— 居中排版 ──
             去掉描述与独家 chip，只保留：插画 + 标题 + 副标 + 篇数大字
             所有文字 text-center 居中，封面组在剩余空间内 vertically center */}
        <div className="lg:col-span-5 px-6 lg:px-8 py-7 lg:py-8 border-b-2 lg:border-b-0 lg:border-r-2 border-ink/10 bg-cream/35 flex flex-col text-center">
          {/* eyebrow + 编号 —— 左右对齐保留档案感，不参与居中 */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55">
              {eyebrow}
            </span>
            <span className="font-display font-extrabold text-[22px] text-ink/25 leading-none">
              0{index + 1}
            </span>
          </div>

          {/* 封面组 —— 紧凑、居中 */}
          <div className="flex-1 flex flex-col items-center justify-center gap-5">
            {/* 插画 */}
            <IllustrationImage
              src={`/imgs/site/Illustration-${illustrationId}.png`}
              alt={illustrationCaption}
              animation="up"
              className="!w-auto"
              imgClassName="!w-auto max-h-[200px] max-w-[260px] object-contain"
            />

            {/* 标题 + 副标 紧贴成一组 */}
            <div>
              <h3 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-[1.1]">
                {title}
              </h3>
              {titleAccent && (
                <p
                  className={`font-display font-extrabold text-[14px] lg:text-[15px] leading-tight mt-1.5 ${accentTextOnSurface[accent]}`}
                >
                  「{titleAccent}」
                </p>
              )}
            </div>

            {/* 篇数 —— 大数字 + 下一行小标签 */}
            <div>
              <div className="font-display font-extrabold text-[44px] lg:text-[52px] text-ink leading-none">
                {count}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mt-2">
                {countSuffix}
              </div>
            </div>
          </div>
        </div>

        {/* ── 右：阶段/模块列表 ─────────────────────── */}
        <div className="lg:col-span-7 px-6 lg:px-8 py-7 lg:py-9">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 mb-5">
            § 内容详情
          </div>
          <ul className="space-y-4 lg:space-y-5">
            {stages.map((stage) => (
              <li key={stage.badge + stage.title} className="flex gap-3">
                {/* badge */}
                <span
                  className={`flex-shrink-0 inline-flex items-center justify-center self-start min-w-[58px] h-6 px-2 ${accentBadgeBg[accent]} border-2 border-ink rounded-full font-mono text-[10px] font-bold whitespace-nowrap`}
                >
                  {stage.badge}
                </span>
                {/* content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h4 className="font-display font-extrabold text-[15px] text-ink leading-snug">
                      {stage.title}
                    </h4>
                    {stage.caption && (
                      <span className="font-serif italic text-[12px] text-ink-tertiary">
                        — {stage.caption}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stage.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
};

export default KnowledgePlanet;
