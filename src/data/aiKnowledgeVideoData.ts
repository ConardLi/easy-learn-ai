/**
 * AI 知视 · 视频精讲数据
 *
 * B 站视频配套的 PPT 网站。与概念讲解配置完全独立，见 aiKnowledgeConceptData.ts
 *
 * 待补充字段：
 *   - bilibiliUrl    B 站视频地址
 *   - videoCoverUrl  视频封面图（留空则列表页显示占位）
 *   - duration       时长徽章，如 "23:45"
 */

import { AIKnowledgeVideoItem } from "../types";

export const aiKnowledgeVideoData: AIKnowledgeVideoItem[] = [
  {
    id: "harness",
    title: "轻松理解Harness",
    description: "驱动你的 Agent 更持续稳定的工作。",
    category: "Agent",
    imageUrl: "/imgs/harness.png",
    htmlUrl: "/harness/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Zk9FBwELs",
    videoCoverUrl: "/imgs/harness.png",
    duration: "18:31",
  },
  {
    id: "evaluation",
    title: "轻松理解模型评估",
    description: "模型评估是大模型最重要和不可或缺的流程之一。",
    category: "模型评估",
    imageUrl: "/imgs/evaluation.png",
    htmlUrl: "/evaluation/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1HnB7BjEAN/",
    videoCoverUrl: "/imgs/evaluation.png",
    duration: "40:11",
  },
  {
    id: "skills",
    title: "轻松理解Skills",
    description:
      "Agent 的通用外部能力和流程拓展的标准。",
    category: "Agent",
    imageUrl: "/imgs/skill.png",
    htmlUrl: "/skills/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1GXzaByEEo/",
    videoCoverUrl: "/imgs/skill.png",
    duration: "13:31",
  },
  {
    id: "prompt-cache",
    title: "轻松理解Prompt Cache",
    description:
      "通过缓存提示词的中间计算结果，降低大模型推理成本与响应延迟。",
    category: "提示词",
    imageUrl: "/imgs/prompt-cache.png",
    htmlUrl: "/prompt-cache/index.html",
    bilibiliUrl: "https://www.bilibili.com/video/BV1dRRyBREPM/",
    videoCoverUrl: "/imgs/prompt-cache.png",
    duration: "12:18",
  },
];
