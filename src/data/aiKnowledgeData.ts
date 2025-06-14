/**
 * AI 知视模块的模拟数据
 * 包含各种 AI 概念的学习资源信息
 */

import { AIKnowledgeItem } from "../types";

export const aiKnowledgeData: AIKnowledgeItem[] = [
  {
    id: "agent",
    title: "轻松理解Agent",
    description: "让 AI 不只是答题机器，而是会做事的智能体",
    category: "Agent",
    imageUrl: "/imgs/agent.png",
    htmlUrl: "/agent/index.html",
  },
  {
    id: "rag",
    title: "轻松理解RAG",
    description:
      "RAG 即检索增强生成技术，是大语言模型领域解决事实性问题的重要方案。",
    category: "RAG",
    imageUrl: "/imgs/rag.png",
    htmlUrl: "/rag/index.html",
  },
  {
    id: "llm",
    title: "轻松理解LLM",
    description:
      "LLM 是一种革命性的人工智能技术， 正在重新定义机器理解和生成自然语言的能力。",
    category: "模型基础",
    imageUrl: "/imgs/llm.png",
    htmlUrl: "/llm/index.html",
  },
  {
    id: "distill",
    title: "轻松理解模型蒸馏",
    description: "模型蒸馏是将复杂大模型知识压缩到轻量小模型的技术。",
    category: "模型基础",
    imageUrl: "/imgs/distill.png",
    htmlUrl: "/distill/index.html",
  },
  {
    id: "quantization",
    title: "轻松理解模型量化",
    description: "模型量化是将模型权重转换为较低精度表示的技术。",
    category: "模型基础",
    imageUrl: "/imgs/quantization.png",
    htmlUrl: "/quantization/index.html",
  },
  {
    id: "mcp",
    title: "轻松理解MCP",
    description:
      "一个开放标准协议，目的就是为了解决 AI 模型与外部数据源、工具交互的难题。",
    category: "Agent",
    imageUrl: "/imgs/mcp.png",
    htmlUrl: "/mcp/index.html",
  },
  {
    id: "whyfinetune",
    title: "轻松理解为什么要微调",
    description: "长文本、知识库、微调的对比",
    category: "模型微调",
    imageUrl: "/imgs/whyfinetune.png",
    htmlUrl: "/whyfinetune/index.html",
  },
  {
    id: "finetune",
    title: "轻松理解模型微调方法",
    description: "不同微调方法：全参数微调、LoRA微调、冻结微调的对比",
    category: "模型微调",
    imageUrl: "/imgs/finetune.png",
    htmlUrl: "/finetune/index.html",
  },
  {
    id: "lr",
    title: "轻松理解微调参数：学习率",
    description: "学习率决定了模型在每次更新时参数调整的幅度。",
    category: "模型微调",
    imageUrl: "/imgs/lr.png",
    htmlUrl: "/learning-rate/index.html",
  },
  {
    id: "epochs",
    title: "轻松理解微调参数：训练轮数",
    description: "一个 Epoch 表示模型完整地遍历一次整个训练数据集。",
    category: "模型微调",
    imageUrl: "/imgs/epochs.png",
    htmlUrl: "/epochs/index.html",
  },
  {
    id: "bs",
    title: "轻松理解微调参数：批量大小",
    description:
      "批量大小是指在训练过程中，每次更新模型参数时所使用的样本数量。",
    category: "模型微调",
    imageUrl: "/imgs/bs.png",
    htmlUrl: "/batch-size/index.html",
  },
  {
    id: "lora",
    title: "轻松理解微调参数：Lora秩",
    description: "LoRA Rank 决定了模型微调时的表达能力",
    category: "模型微调",
    imageUrl: "/imgs/lora.png",
    htmlUrl: "/lora-rank/index.html",
  },
  // {
  //   id: "4",
  //   title: "Prompt Engineering",
  //   description: "学习如何设计高效的提示词，提升 AI 输出质量",
  //   category: "应用技巧",
  //   imageUrl: "https://picsum.photos/400/240?random=4",
  // },
];

export const categoryColors: Record<string, string> = {
  核心技术: "bg-gradient-to-r from-blue-500 to-purple-600",
  模型训练: "bg-gradient-to-r from-green-500 to-teal-600",
  应用技巧: "bg-gradient-to-r from-orange-500 to-red-600",
  基础设施: "bg-gradient-to-r from-indigo-500 to-blue-600",
  前沿技术: "bg-gradient-to-r from-purple-500 to-pink-600",
};
