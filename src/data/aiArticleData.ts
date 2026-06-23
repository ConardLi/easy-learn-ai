/**
 * AI 文章 · 编辑专栏数据
 *
 * 所有文章都是用 beautiful-article skill 生成的单文件 HTML，
 * 放在 `public/article/` 目录下：
 *   - 单文件型：public/article/<id>.html         → htmlUrl: "/article/<id>.html"
 *   - 多资源型：public/article/<id>/index.html   → htmlUrl: "/article/<id>/index.html"
 *
 * 列表页按 publishDate 倒序展示，按年份自动分组。
 * 新增 category 直接写新值即可，UI 会按"出现顺序"自动收集成 chip。
 */

import { AIArticleItem } from "../types";

export const aiArticleData: AIArticleItem[] = [
  {
    id: "agent-framework",
    title: "Agent Framework 的设计与思考",
    lead: "问题不在于某个系统算不算 Agent，而在于框架是否让你掌控每一步进入 LLM 的上下文。",
    category: "长文",
    publishDate: "2025-04-20",
    readingMinutes: 23,
    theme: "Freddie",
    tags: ["Agent", "Framework", "Langchain"],
    htmlUrl: "/article/agent-framework.html",
  },
  {
    id: "codex-sandbox",
    title: "Codex Sandbox 的设计与实践",
    lead: "Agent 要像开发者一样在本机读文件、跑测试、改代码，但它不能因此获得无限制的本地权限。",
    category: "长文",
    publishDate: "2026-05-13",
    readingMinutes: 23,
    theme: "Press",
    tags: ["Agent", "Sandbox", "Codex"],
    htmlUrl: "/article/codex-sandbox.html",
  },
  {
    id: "long-task-harness",
    title: "面向长任务场景的 Harness 设计",
    lead: "当模型会写代码以后，外部编排决定它能不能把复杂应用做完、做对、做得有品味。",
    category: "长文",
    publishDate: "2026-03-24",
    readingMinutes: 19,
    theme: "Press",
    tags: ["Agent", "Harness", "Claude"],
    htmlUrl: "/article/long-task-harness.html",
  },
  {
    id: "code-agent",
    title: "设计对 Agent 友好的代码仓库",
    lead: "OpenAI 团队用 Codex 构建了一个没有人工手写代码的内部产品。",
    category: "长文",
    publishDate: "2026-02-11",
    readingMinutes: 20,
    theme: "Press",
    tags: ["Agent", "Code", "OpenAI"],
    htmlUrl: "/article/code-agent.html",
  },
  {
    id: "research",
    title: "用多 Agent 进行深度研究",
    lead: "Claude Research 背后的架构、提示词、评估与工程教训。",
    category: "报告",
    publishDate: "2025-06-31",
    readingMinutes: 18,
    theme: "Tufte",
    tags: ["Agent", "Research", "Claude"],
    htmlUrl: "/article/research.html",
  },
  {
    id: "tools",
    title: "Agent Tools 设计的最佳实践",
    lead: "Anthropic 工程团队关于 Tools 的五条原则，与一套评测驱动的方法。",
    category: "长文",
    publishDate: "2025-09-11",
    readingMinutes: 21,
    theme: "Freddie",
    tags: ["Agent", "Tools", "Anthropic"],
    htmlUrl: "/article/tools.html",
  },
  {
    id: "skill",
    title: "Agent Skill 是如何进化的？",
    lead: "把 Skill 文档当成被训练的对象，而不是被复制粘贴的 prompt。",
    category: "解释文",
    publishDate: "2026-05-28",
    readingMinutes: 8,
    theme: "Freddie",
    tags: ["Agent", "Skill", "Microsoft"],
    htmlUrl: "/article/skill.html",
  },
  {
    id: "harness",
    title: "Agent Harness 的解剖图",
    lead: "智能在模型里；让智能变得有用的，是它周围的那套系统。",
    category: "长文",
    publishDate: "2026-03-10",
    readingMinutes: 12,
    theme: "Vignelli",
    tags: ["Agent", "Harness", "Langchain"],
    htmlUrl: "/article/harness.html",
  },
  {
    id: "prompt-cache",
    title: "提示词缓存对 Agent 有多重要？",
    lead: "缓存命中率是 Agent 的 SLO，Claude Code 团队的反直觉经验。",
    category: "长文",
    publishDate: "2026-04-30",
    readingMinutes: 15,
    theme: "Bayer",
    tags: ["Agent", "Prompt Cache", "Anthropic"],
    htmlUrl: "/article/prompt-cache.html",
  },
  {
    id: "context",
    title: "面向 Agent 的高效上下文工程",
    lead: "本文探讨如何高效地筛选与管理驱动 AI Agent 运转的上下文。",
    category: "长文",
    publishDate: "2025-09-29",
    readingMinutes: 16,
    theme: "Tufte",
    tags: ["Agent", "Context", "Anthropic"],
    htmlUrl: "/article/context.html",
  },
  {
    id: "transformer",
    title: "Attention Is All You Need",
    lead: "一篇重塑现代 AI 的论文，逐层拆给你看。",
    category: "长文",
    publishDate: "2017-06-12",
    readingMinutes: 30,
    theme: "Tufte",
    tags: ["Transformer", "Attention", "AI", "论文"],
    htmlUrl: "/article/tansformer.html",
  },
  {
    id: "agent-eval",
    title: "把 AI Agent 的评测讲清楚",
    lead: "让 Agent 有用的那些能力，恰恰让它难以评测 — 这是一份来自 Anthropic 的指南。",
    category: "长文",
    publishDate: "2026-01-09",
    readingMinutes: 25,
    theme: "Tufte",
    tags: ["Agent", "评测", "Anthropic", "Claude"],
    htmlUrl: "/article/agent-eval.html",
  },
  {
    id: "agent-loop-codex",
    title: "Codex 的 Agent Loop 是怎么做的？",
    lead: "Open AI 官方分享：在 Responses API 之上，一条对话是如何被反复 “展开” 的。",
    category: "长文",
    publishDate: "2026-01-23",
    readingMinutes: 18,
    theme: "Sottsass",
    tags: ["Agent", "Codex", "OpenAI", "Agent Loop"],
    htmlUrl: "/article/agent-loop-codex.html",
  },
];

/** 列表页过滤 chip：按数据出现顺序收集 + "全部" 哨兵在最前 */
export const articleCategories = (() => {
  const seen: string[] = [];
  for (const item of aiArticleData) {
    if (!seen.includes(item.category)) seen.push(item.category);
  }
  return ["全部", ...seen];
})();

/** 类型 → 角标配色（与全站 stamp 调色板一致；未命中走 cream/ink 兜底） */
export const articleCategoryColor: Record<string, string> = {
  解释: "#F4D35E",   // butter
  复盘: "#E07A5F",     // coral
  长文: "#1B4B5A",     // teal
  教程: "#FBE891",     // butter-soft
  评论: "#241C15",     // ink
  访谈: "#FBEFE3",     // cream
  报告: "#FF4D74",   // pop
};

/** 按 id 查文章（详情页 404 兜底用） */
export const findArticleById = (id: string): AIArticleItem | undefined =>
  aiArticleData.find((a) => a.id === id);
