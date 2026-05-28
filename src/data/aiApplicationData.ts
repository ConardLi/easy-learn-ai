/**
 * 作品集数据 · Works
 *
 * ─────────────────────────────────────────────────────────────
 * 字段速查（详细类型见 src/types/index.ts）
 * ─────────────────────────────────────────────────────────────
 * id          稳定 ID（URL 和锚点用）
 * title       作品名
 * description 一句话定位（grid 卡片显示 2 行）
 * category    分类（按出现顺序自动循环 butter / coral / teal / cream 四色）
 * imageUrl    封面截图（建议 16:9）
 * tags        标签数组（grid 卡片显示）
 * actions     ⭐ 推荐：自定义按钮组
 *
 * ─────────────────────────────────────────────────────────────
 * actions 写法示例
 * ─────────────────────────────────────────────────────────────
 *
 *   actions: [
 *     // 1. 内嵌站内打开
 *     { label: "在线体验", type: "embed",    url: "/translate/index.html" },
 *
 *     // 2. 跳外部文档
 *     { label: "读文档",   type: "external", url: "https://example.com/docs" },
 *
 *     // 3. 跳 GitHub
 *     { label: "源码",     type: "external", url: "https://github.com/..." },
 *   ]
 *
 *   ❶ 不写 actions 时，会自动从下面的 demoUrl / githubUrl 派生（向后兼容）
 *   ❷ 第一个按钮默认 coral 主按钮，后续按钮白底次按钮
 *   ❸ 想手动控制可加 variant: "primary" | "secondary"
 *   ❹ 每张卡建议 1~3 个按钮，多了视觉会乱
 */

import { AIApplicationItem } from "../types";

export const aiApplicationData: AIApplicationItem[] = [
  {
    id: "easy-dataset",
    title: "Easy Dataset",
    description: "数据集生产和管理工具，提供文档解析、智能分割、数据清洗、合成、增强等能力",
    category: "数据合成",
    imageUrl: "/imgs/easy-dataset.png",
    tags: ["LLM", "数据合成", "模型微调", "RAG"],
    actions: [
      {
        label: "查看文档",
        type: "external",
        url: "https://docs.easy-dataset.com/",
      },
      {
        label: "视频教程",
        type: "external",
        url: "https://space.bilibili.com/474921808/search?keyword=Easy+Dataset",
      },
      {
        label: "源码",
        type: "external",
        url: "https://github.com/ConardLi/easy-learn-ai/tree/main/ai-app/translate",
      },
    ],
  },
  {
    id: "web-video-presentation",
    title: "Web Video Presentation Skill",
    description: "可以帮助你把文章、口播稿、课程、产品演示和 talk 等做成视频（网页模拟）",
    category: "Skills",
    imageUrl: "/imgs/web-video-presentation.webp",
    tags: ["Agent", "Skill", "视频制作"],
    actions: [
      {
        label: "查看主题效果",
        type: "embed",
        url: "/web-video-presentation/index.html",
      },
      {
        label: "下载 Skill",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills#web-video-presentation",
      },
      {
        label: "源码",
        type: "external",
        url: "https://github.com/ConardLi/garden-skills",
      },
    ],
  },
  {
    id: "easy-llm-cli",
    title: "Easy LLM CLI",
    description: "Gemini CLI 的多 LLM 模型适配版本（已停止维护，请迁移至 Easy Agent）",
    category: "Agent",
    imageUrl: "/imgs/easy-llm-cli.png",
    tags: ["LLM", "Agent", "CLI"],
    actions: [
      {
        label: "查看仓库",
        type: "external",
        url: "https://github.com/ConardLi/easy-llm-cli",
      },
    ],
  },
  {
    id: "translate-agent",
    title: "专业翻译 Agent",
    description: "专业的翻译 Agent，支持多语言、多种风格智能翻译",
    category: "Agent",
    imageUrl: "/imgs/translate.png",
    tags: ["LLM", "翻译", "Agent"],
    actions: [
      {
        label: "在线体验",
        type: "embed",
        url: "/translate/index.html",
      },
      {
        label: "源码",
        type: "external",
        url: "https://github.com/ConardLi/easy-learn-ai/tree/main/ai-app/translate",
      },
    ],
  },
  
];

/**
 * @deprecated SaaS 蓝紫渐变调色盘，已被新组件中的 Mailchimp-Freddie
 * 调色循环（butter / coral / teal / cream）取代，保留只为防止其他历史
 * 代码 import 失败。下次清理时可安全删除。
 */
export const applicationCategoryColors: Record<string, string> = {};
