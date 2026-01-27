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
    id: "evaluation",
    title: "轻松理解模型评估",
    description: "模型评估是大模型最重要和不可或缺的流程之一。",
    category: "模型评估",
    imageUrl: "/imgs/evaluation.png",
    htmlUrl: "/evaluation/index.html",
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
    id: "multimodality",
    title: "轻松多模态",
    description: "让AI理解和生成图片、视频、音频等多种模态数据",
    category: "模型基础",
    imageUrl: "/imgs/multimodality.png",
    htmlUrl: "/multimodality/index.html",
  },

  {
    id: "function-calling",
    title: "轻松理解Function Calling",
    description:
      "Function Calling 是大语言模型与外部数据源、工具交互的重要方式。",
    category: "Agent",
    imageUrl: "/imgs/function-calling.png",
    htmlUrl: "/function-calling/index.html",
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
    id: "skills",
    title: "轻松理解Skills",
    description:
      "由指令、脚本与资源构成的模块化能力单元，具备可复用、可扩展、易维护的特性。",
    category: "Agent",
    imageUrl: "/imgs/skills.png",
    htmlUrl: "/skills/index.html",
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
    id: "lora-rank",
    title: "轻松理解微调参数：Lora秩",
    description: "LoRA Rank 决定了模型微调时的表达能力",
    category: "模型微调",
    imageUrl: "/imgs/lora-rank.png",
    htmlUrl: "/lora-rank/index.html",
  },
  {
    id: "deepspeed",
    title: "轻松理解 DeepSpeed",
    description: "一款深度学习优化库，目标就是为了简化分布式训练与推理过程",
    category: "模型微调",
    imageUrl: "/imgs/deepspeed.png",
    htmlUrl: "/deepspeed/index.html",
  },
  {
    id: "loss",
    title: "轻松理解 Loss",
    description: "Loss 是模型在训练过程中用于衡量预测值与真实值之间差异的指标",
    category: "模型微调",
    imageUrl: "/imgs/loss.png",
    htmlUrl: "/loss/index.html",
  },
  {
    id: "transformer",
    title: "轻松理解 Transformer",
    description:
      "Transformer 是一种革命性的人工智能技术，正在重新定义机器理解和生成自然语言的能力。",
    category: "模型基础",
    imageUrl: "/imgs/transformer.png",
    htmlUrl: "/transformer/index.html",
  },
  {
    id: "illusion",
    title: "轻松理解模型幻觉",
    description: "模型幻觉是模型在生成文本时出现的不真实、不合理的现象。",
    category: "模型基础",
    imageUrl: "/imgs/illusion.png",
    htmlUrl: "/illusion/index.html",
  },
  {
    id: "token",
    title: "轻松理解 Token",
    description:
      "Token 是模型在生成文本时的最小单位，每个 Token 代表一个词或词的一部分。",
    category: "模型基础",
    imageUrl: "/imgs/token.png",
    htmlUrl: "/token/index.html",
  },
  {
    id: "mga",
    title: "轻松理解 MGA",
    description:
      "MGA 是一种创新的数据增强方法，通过轻量级框架将现有语料系统重构为多样化变体。",
    category: "数据增强",
    imageUrl: "/imgs/mga.png",
    htmlUrl: "/mga/index.html",
  },
  {
    id: "rlhf",
    title: "轻松理解 RLHF",
    description: "通过强化学习将人类的主观偏好转化为模型的客观优化目标。",
    category: "模型微调",
    imageUrl: "/imgs/rlhf.png",
    htmlUrl: "/rlhf/index.html",
  },
  {
    id: "bert",
    title: "轻松理解 BERT",
    description:
      "BERT（基于 Encoder-Only 架构） 是 Google 在 2018 年发布的预训练语言模型。",
    category: "模型基础",
    imageUrl: "/imgs/bert.png",
    htmlUrl: "/bert/index.html",
  },
  {
    id: "gpt",
    title: "轻松理解 GPT",
    description:
      "GPT（基于 Decoder-Only PLM 架构） 是 OpenAI 在 2022 年发布的预训练语言模型。",
    category: "模型基础",
    imageUrl: "/imgs/gpt.png",
    htmlUrl: "/gpt/index.html",
  },
  {
    id: "llama",
    title: "轻松理解 Llama",
    description:
      "LLama（基于 Decoder-Only 架构） 是 Meta 在 2023 年发布的预训练语言模型。",
    category: "模型基础",
    imageUrl: "/imgs/llama.png",
    htmlUrl: "/llama/index.html",
  },
  {
    id: "t5",
    title: "轻松理解 T5",
    description:
      "T5（基于 Encoder-Decoder 架构） 是由 Google 提出的一种预训练语言模型。",
    category: "模型基础",
    imageUrl: "/imgs/t5.png",
    htmlUrl: "/t5/index.html",
  },
  {
    id: "deepseek-r1",
    title: "轻松理解 DeepSeek R1",
    description: "DeepSeek R1 通过创新算法让大语言模型获得强大推理能力。",
    category: "模型基础",
    imageUrl: "/imgs/deepseek-r1.png",
    htmlUrl: "/deepseek-r1/index.html",
  },
  {
    id: "deployment",
    title: "轻松理解 模型部署",
    description: "对比 Ollama 和 VLLM 两大主流本地部署方案",
    category: "模型部署",
    imageUrl: "/imgs/deployment.png",
    htmlUrl: "/deploy/index.html",
  },
  {
    id: "gguf",
    title: "轻松理解 GGUF",
    description: "GGUF 是一种实现更高效模型存储、加载和部署的格式",
    category: "模型部署",
    imageUrl: "/imgs/gguf.png",
    htmlUrl: "/gguf/index.html",
  },
  {
    id: "lora",
    title: "轻松理解 LoRA",
    description: "LoRA 是当前最受欢迎的大模型高效微调方法之一",
    category: "模型微调",
    imageUrl: "/imgs/lora.png",
    htmlUrl: "/lora/index.html",
  },
  {
    id: "nlp",
    title: "轻松理解 NLP",
    description: "NLP 是自然语言处理的缩写，是人工智能领域的一个重要分支",
    category: "模型微调",
    imageUrl: "/imgs/nlp.png",
    htmlUrl: "/nlp/index.html",
  },
  {
    id: "pretrain",
    title: "轻松理解预训练",
    description: "预训练是大语言模型训练的第一阶段",
    category: "模型训练",
    imageUrl: "/imgs/pretrain.png",
    htmlUrl: "/pretrain/index.html",
  },
  {
    id: "sft",
    title: "轻松理解 SFT",
    description: "SFT 是将预训练模型转化为实用AI助手的关键步骤",
    category: "模型微调",
    imageUrl: "/imgs/sft.png",
    htmlUrl: "/sft/index.html",
  },
];

export const categoryColors: Record<string, string> = {
  核心技术: "bg-gradient-to-r from-blue-500 to-purple-600",
  模型训练: "bg-gradient-to-r from-green-500 to-teal-600",
  应用技巧: "bg-gradient-to-r from-orange-500 to-red-600",
  基础设施: "bg-gradient-to-r from-indigo-500 to-blue-600",
  前沿技术: "bg-gradient-to-r from-purple-500 to-pink-600",
};
