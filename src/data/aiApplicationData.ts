/**
 * AI 应用模块的数据
 * 包含各种 AI 应用项目的信息
 */

import { AIApplicationItem } from "../types";

export const aiApplicationData: AIApplicationItem[] = [
  // 示例数据，可以根据实际需要添加更多应用
  {
    id: "translate-agent",
    title: "专业翻译 Agent",
    description: "专业的翻译 Agent，支持多语言、多种风格智能翻译",
    category: "Agent",
    imageUrl: "/imgs/translate.png",
    demoUrl: "/translate/index.html",
    githubUrl:
      "https://github.com/ConardLi/easy-learn-ai/tree/main/ai-app/translate",
    tags: ["LLM", "翻译", "Agent"],
  },
];

export const applicationCategoryColors: Record<string, string> = {
  对话应用: "bg-gradient-to-r from-blue-500 to-cyan-600",
  图像生成: "bg-gradient-to-r from-purple-500 to-pink-600",
  开发工具: "bg-gradient-to-r from-green-500 to-teal-600",
  数据分析: "bg-gradient-to-r from-orange-500 to-red-600",
  音频处理: "bg-gradient-to-r from-indigo-500 to-purple-600",
  其他应用: "bg-gradient-to-r from-gray-500 to-slate-600",
};
