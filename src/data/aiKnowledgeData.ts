/**
 * AI 知视模块的模拟数据
 * 包含各种 AI 概念的学习资源信息
 */

import { AIKnowledgeItem } from "../types";

export const aiKnowledgeData: AIKnowledgeItem[] = [
  {
    id: "1",
    title: "微调参数：学习率",
    description: "学习率决定了模型在每次更新时参数调整的幅度。",
    category: "模型微调",
    imageUrl: "../../public/imgs/lr.png",
    htmlUrl: "../../public/learning-rate/index.html",
  },
  {
    id: "1",
    title: "微调参数：训练轮数",
    description: "一个 Epoch 表示模型完整地遍历一次整个训练数据集。",
    category: "模型微调",
    imageUrl: "../../public/imgs/epochs.png",
    htmlUrl: "../../public/epochs/index.html",
  },
  {
    id: "1",
    title: "微调参数：批量大小",
    description:
      "批量大小是指在训练过程中，每次更新模型参数时所使用的样本数量。",
    category: "模型微调",
    imageUrl: "../../public/imgs/bs.png",
    htmlUrl: "../../public/batch-size/index.html",
  },
  {
    id: "1",
    title: "微调参数：Lora秩",
    description: "LoRA Rank 决定了模型微调时的表达能力",
    category: "模型微调",
    imageUrl: "../../public/imgs/lora.png",
    htmlUrl: "../../public/lora-rank/index.html",
  },
  // {
  //   id: "1",
  //   title: "RAG 检索增强生成",
  //   description: "学习如何结合检索和生成技术，构建更智能的 AI 系统",
  //   category: "核心技术",
  //   imageUrl: "https://picsum.photos/400/240?random=1",
  //   htmlUrl: "../../public/learning-rate/index.html",
  // },
  // {
  //   id: "2",
  //   title: "AI Agent 智能代理",
  //   description: "深入理解 AI Agent 的工作原理和实现方法",
  //   category: "核心技术",
  //   imageUrl: "https://picsum.photos/400/240?random=2",
  // },
  // {
  //   id: "3",
  //   title: "大模型微调技术",
  //   description: "掌握大语言模型的微调方法和最佳实践",
  //   category: "模型训练",
  //   imageUrl: "https://picsum.photos/400/240?random=3",
  // },
  // {
  //   id: "4",
  //   title: "Prompt Engineering",
  //   description: "学习如何设计高效的提示词，提升 AI 输出质量",
  //   category: "应用技巧",
  //   imageUrl: "https://picsum.photos/400/240?random=4",
  // },
  // {
  //   id: "5",
  //   title: "向量数据库",
  //   description: "了解向量数据库的原理和在 AI 应用中的作用",
  //   category: "基础设施",
  //   imageUrl: "https://picsum.photos/400/240?random=5",
  // },
  // {
  //   id: "6",
  //   title: "多模态 AI",
  //   description: "探索文本、图像、音频等多模态 AI 技术",
  //   category: "前沿技术",
  //   imageUrl: "https://picsum.photos/400/240?random=6",
  // },
];

export const categoryColors: Record<string, string> = {
  核心技术: "bg-gradient-to-r from-blue-500 to-purple-600",
  模型训练: "bg-gradient-to-r from-green-500 to-teal-600",
  应用技巧: "bg-gradient-to-r from-orange-500 to-red-600",
  基础设施: "bg-gradient-to-r from-indigo-500 to-blue-600",
  前沿技术: "bg-gradient-to-r from-purple-500 to-pink-600",
};
