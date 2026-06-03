/**
 * AI 知视 · 概念讲解数据（单一数据源 / Single Source of Truth）
 *
 * 这里是「一个概念」的全部信息：基础字段 + 所属学习线（line）+ 短名（short）。
 * 目录视图按 line 分组，全景视图（知视图谱）也按 line 排地铁线 —— 分类口径完全统一。
 * 概念之间的「关联边」单独维护在 conceptGraphData.ts。
 *
 * ⚠️ 新增一个概念，只需在本文件加一条（含 line），再去 conceptGraphData.ts 补它的关联边即可：
 *    - 分类 / 短名 / 全景坐标 / 枢纽大小 全部自动派生
 *    - 漏填 line 或边引用了不存在的 id，开发模式会在控制台告警
 *
 * 数组顺序 = 同一条线内的学习顺序（已按 LEARNING_LINES 的顺序分块排好）。
 */

import { AIKnowledgeConceptItem, LearningLine } from "../types";

/* ════════════════════════════════════════════════════════════════════
 * 学习线（统一分类体系）· 顺序即推荐学习顺序
 * ════════════════════════════════════════════════════════════════════ */
export const LEARNING_LINES: LearningLine[] = [
  {
    id: "foundation",
    name: "入门基础线",
    tag: "入门基础",
    blurb: "看懂大模型到底是什么、怎么读文字、底层架构长什么样",
    color: "#2A9D8F",
    startHint: "所有人从这里起步",
  },
  {
    id: "prompt",
    name: "提示词工程线",
    tag: "提示词",
    blurb: "学会怎么把话说清楚，让模型听懂你到底要什么",
    color: "#7A28CB",
    startHint: "会用 ChatGPT 就能学",
  },
  {
    id: "arch",
    name: "架构家族线",
    tag: "架构家族",
    blurb: "Transformer 衍生出的几大模型流派，挑一个深入",
    color: "#6D597A",
    startHint: "懂了 Transformer 再来",
  },
  {
    id: "train",
    name: "训练对齐线",
    tag: "训练对齐",
    blurb: "一个模型从喂数据到学会听话、学会推理的全过程",
    color: "#3D8B40",
    startHint: "想知道模型怎么练出来",
  },
  {
    id: "finetune",
    name: "微调调参线",
    tag: "微调调参",
    blurb: "拿现成模型改造成你要的样子，以及那几个关键旋钮",
    color: "#E8A33D",
    startHint: "已有模型，想改造它",
  },
  {
    id: "deploy",
    name: "压缩部署线",
    tag: "压缩部署",
    blurb: "把大模型压小、打包、真正跑起来",
    color: "#C44536",
    startHint: "模型练好了，怎么用起来",
  },
  {
    id: "agent",
    name: "Agent 应用线",
    tag: "Agent",
    blurb: "让模型不只答题，而是会调工具、分步骤把事做完",
    color: "#E07A5F",
    startHint: "想让 AI 真正干活",
  },
  {
    id: "rag",
    name: "检索增强线",
    tag: "检索增强",
    blurb: "给模型外挂资料库，治它不懂装懂的毛病",
    color: "#2A6F97",
    startHint: "嫌模型瞎编 / 知识过时",
  },
];

/** 学习线快查表：id → 元信息 */
export const lineById: Record<string, LearningLine> = LEARNING_LINES.reduce(
  (acc, l) => {
    acc[l.id] = l;
    return acc;
  },
  {} as Record<string, LearningLine>,
);

/** 概念短名：优先用 short，否则自动去掉「轻松理解」前缀 */
export const conceptShortLabel = (item: {
  title: string;
  short?: string;
}): string => item.short ?? item.title.replace(/^轻松理解\s*/, "").trim();

/* ════════════════════════════════════════════════════════════════════
 * 概念清单（按学习线分块；数组顺序 = 线内学习顺序）
 * ════════════════════════════════════════════════════════════════════ */
export const aiKnowledgeConceptData: AIKnowledgeConceptItem[] = [
  /* ── 入门基础线 ── */
  {
    id: "nlp",
    title: "轻松理解 NLP",
    description: "NLP 是自然语言处理的缩写，是人工智能领域的一个重要分支",
    category: "模型微调",
    line: "foundation",
    imageUrl: "/imgs/nlp.png",
    htmlUrl: "/nlp/index.html",
  },
  {
    id: "token",
    title: "轻松理解 Token",
    description:
      "Token 是模型在生成文本时的最小单位，每个 Token 代表一个词或词的一部分。",
    category: "模型基础",
    line: "foundation",
    imageUrl: "/imgs/token.png",
    htmlUrl: "/token/index.html",
  },
  {
    id: "llm",
    title: "轻松理解LLM",
    description:
      "LLM 是一种革命性的人工智能技术， 正在重新定义机器理解和生成自然语言的能力。",
    category: "模型基础",
    line: "foundation",
    imageUrl: "/imgs/llm.png",
    htmlUrl: "/llm/index.html",
  },
  {
    id: "transformer",
    title: "轻松理解 Transformer",
    description:
      "Transformer 是一种革命性的人工智能技术，正在重新定义机器理解和生成自然语言的能力。",
    category: "模型基础",
    line: "foundation",
    imageUrl: "/imgs/transformer.png",
    htmlUrl: "/transformer/index.html",
  },

  /* ── 提示词工程线 ── */
  {
    id: "prompt",
    title: "轻松理解 Prompt",
    description:
      "Prompt 是你发给模型的那段指令文本，告诉它你要它干什么，是用大模型的第一入口。",
    category: "提示词",
    line: "prompt",
    imageUrl: "/imgs/prompt.png",
    htmlUrl: "/prompt/index.html",
  },
  {
    id: "system-prompt",
    title: "轻松理解 System Prompt",
    description:
      "System Prompt 是预设在对话最前面的指令，用来定模型的角色、边界、语气和输出格式。",
    category: "提示词",
    line: "prompt",
    short: "System Prompt",
    imageUrl: "/imgs/system-prompt.png",
    htmlUrl: "/system-prompt/index.html",
  },
  {
    id: "few-shot",
    title: "轻松理解 Few-shot",
    description:
      "Few-shot 是在 prompt 里给模型几个示例，让它照着格式和思路完成新任务，不用重新训练。",
    category: "提示词",
    line: "prompt",
    short: "Few-shot",
    imageUrl: "/imgs/few-shot.png",
    htmlUrl: "/few-shot/index.html",
  },
  {
    id: "chain-of-thought",
    title: "轻松理解 Chain of Thought",
    description:
      "Chain of Thought 让模型先一步步写出推理过程再给答案，复杂问题做对的比例明显更高。",
    category: "提示词",
    line: "prompt",
    short: "CoT",
    imageUrl: "/imgs/chain-of-thought.png",
    htmlUrl: "/chain-of-thought/index.html",
  },

  /* ── 架构家族线 ── */
  {
    id: "bert",
    title: "轻松理解 BERT",
    description:
      "BERT（基于 Encoder-Only 架构） 是 Google 在 2018 年发布的预训练语言模型。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/bert.png",
    htmlUrl: "/bert/index.html",
  },
  {
    id: "gpt",
    title: "轻松理解 GPT",
    description:
      "GPT（基于 Decoder-Only PLM 架构） 是 OpenAI 在 2022 年发布的预训练语言模型。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/gpt.png",
    htmlUrl: "/gpt/index.html",
  },
  {
    id: "llama",
    title: "轻松理解 Llama",
    description:
      "LLama（基于 Decoder-Only 架构） 是 Meta 在 2023 年发布的预训练语言模型。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/llama.png",
    htmlUrl: "/llama/index.html",
  },
  {
    id: "t5",
    title: "轻松理解 T5",
    description:
      "T5（基于 Encoder-Decoder 架构） 是由 Google 提出的一种预训练语言模型。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/t5.png",
    htmlUrl: "/t5/index.html",
  },
  {
    id: "moe",
    title: "轻松理解 MoE",
    description: "一种基于专家路由的模型架构，能够并行处理不同任务。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/moe.png",
    htmlUrl: "/moe/index.html",
  },
  {
    id: "multimodality",
    title: "轻松理解多模态",
    description: "让AI理解和生成图片、视频、音频等多种模态数据",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/multimodality.png",
    htmlUrl: "/multimodality/index.html",
  },
  {
    id: "deepseek-r1",
    title: "轻松理解 DeepSeek R1",
    description: "DeepSeek R1 通过创新算法让大语言模型获得强大推理能力。",
    category: "模型基础",
    line: "arch",
    imageUrl: "/imgs/deepseek-r1.png",
    htmlUrl: "/deepseek-r1/index.html",
  },

  /* ── 训练对齐线 ── */
  {
    id: "mga",
    title: "轻松理解 MGA",
    description:
      "MGA 是一种创新的数据增强方法，通过轻量级框架将现有语料系统重构为多样化变体。",
    category: "数据合成",
    line: "train",
    imageUrl: "/imgs/mga.png",
    htmlUrl: "/mga/index.html",
  },
  {
    id: "pretrain",
    title: "轻松理解预训练",
    description: "预训练是大语言模型训练的第一阶段",
    category: "模型训练",
    line: "train",
    imageUrl: "/imgs/pretrain.png",
    htmlUrl: "/pretrain/index.html",
  },
  {
    id: "sft",
    title: "轻松理解 SFT",
    description: "SFT 是将预训练模型转化为实用AI助手的关键步骤",
    category: "模型微调",
    line: "train",
    imageUrl: "/imgs/sft.png",
    htmlUrl: "/sft/index.html",
  },
  {
    id: "rlhf",
    title: "轻松理解 RLHF",
    description: "通过强化学习将人类的主观偏好转化为模型的客观优化目标。",
    category: "模型微调",
    line: "train",
    imageUrl: "/imgs/rlhf.png",
    htmlUrl: "/rlhf/index.html",
  },
  /* ── 微调调参线 ── */
  {
    id: "whyfinetune",
    title: "轻松理解为什么要微调",
    description: "长文本、知识库、微调的对比",
    category: "模型微调",
    line: "finetune",
    short: "为何微调",
    imageUrl: "/imgs/whyfinetune.png",
    htmlUrl: "/whyfinetune/index.html",
  },
  {
    id: "finetune",
    title: "轻松理解模型微调方法",
    description: "不同微调方法：全参数微调、LoRA微调、冻结微调的对比",
    category: "模型微调",
    line: "finetune",
    short: "微调方法",
    imageUrl: "/imgs/finetune.png",
    htmlUrl: "/finetune/index.html",
  },
  {
    id: "lora",
    title: "轻松理解 LoRA",
    description: "LoRA 是当前最受欢迎的大模型高效微调方法之一",
    category: "模型微调",
    line: "finetune",
    imageUrl: "/imgs/lora.png",
    htmlUrl: "/lora/index.html",
  },
  {
    id: "lora-rank",
    title: "轻松理解微调参数：Lora秩",
    description: "LoRA Rank 决定了模型微调时的表达能力",
    category: "模型微调",
    line: "finetune",
    short: "LoRA 秩",
    imageUrl: "/imgs/lora-rank.png",
    htmlUrl: "/lora-rank/index.html",
  },
  {
    id: "lr",
    title: "轻松理解微调参数：学习率",
    description: "学习率决定了模型在每次更新时参数调整的幅度。",
    category: "模型微调",
    line: "finetune",
    short: "学习率",
    imageUrl: "/imgs/lr.png",
    htmlUrl: "/learning-rate/index.html",
  },
  {
    id: "epochs",
    title: "轻松理解微调参数：训练轮数",
    description: "一个 Epoch 表示模型完整地遍历一次整个训练数据集。",
    category: "模型微调",
    line: "finetune",
    short: "训练轮数",
    imageUrl: "/imgs/epochs.png",
    htmlUrl: "/epochs/index.html",
  },
  {
    id: "bs",
    title: "轻松理解微调参数：批量大小",
    description:
      "批量大小是指在训练过程中，每次更新模型参数时所使用的样本数量。",
    category: "模型微调",
    line: "finetune",
    short: "批量大小",
    imageUrl: "/imgs/bs.png",
    htmlUrl: "/batch-size/index.html",
  },
  {
    id: "loss",
    title: "轻松理解 Loss",
    description: "Loss 是模型在训练过程中用于衡量预测值与真实值之间差异的指标",
    category: "模型微调",
    line: "finetune",
    imageUrl: "/imgs/loss.png",
    htmlUrl: "/loss/index.html",
  },
  {
    id: "deepspeed",
    title: "轻松理解 DeepSpeed",
    description: "一款深度学习优化库，目标就是为了简化分布式训练与推理过程",
    category: "模型微调",
    line: "finetune",
    imageUrl: "/imgs/deepspeed.png",
    htmlUrl: "/deepspeed/index.html",
  },

  /* ── 压缩部署线 ── */
  {
    id: "distill",
    title: "轻松理解模型蒸馏",
    description: "模型蒸馏是将复杂大模型知识压缩到轻量小模型的技术。",
    category: "模型基础",
    line: "deploy",
    imageUrl: "/imgs/distill.png",
    htmlUrl: "/distill/index.html",
  },
  {
    id: "quantization",
    title: "轻松理解模型量化",
    description: "模型量化是将模型权重转换为较低精度表示的技术。",
    category: "模型基础",
    line: "deploy",
    imageUrl: "/imgs/quantization.png",
    htmlUrl: "/quantization/index.html",
  },
  {
    id: "gguf",
    title: "轻松理解 GGUF",
    description: "GGUF 是一种实现更高效模型存储、加载和部署的格式",
    category: "模型部署",
    line: "deploy",
    imageUrl: "/imgs/gguf.png",
    htmlUrl: "/gguf/index.html",
  },
  {
    id: "deployment",
    title: "轻松理解 模型部署",
    description: "对比 Ollama 和 VLLM 两大主流本地部署方案",
    category: "模型部署",
    line: "deploy",
    imageUrl: "/imgs/deployment.png",
    htmlUrl: "/deploy/index.html",
  },

  /* ── Agent 应用线 ── */
  {
    id: "agent",
    title: "轻松理解Agent",
    description: "让 AI 不只是答题机器，而是会做事的智能体",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent.png",
    htmlUrl: "/agent/index.html",
  },
  {
    id: "agent-loop",
    title: "轻松理解 Agent Loop",
    description:
      "Agent 的迭代执行循环：LLM 在循环里反复推理、调工具、看结果，直到任务做完。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent-loop.png",
    htmlUrl: "/agent-loop/index.html",
  },
  {
    id: "function-calling",
    title: "轻松理解Function Calling",
    description:
      "Function Calling 是大语言模型与外部数据源、工具交互的重要方式。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/function-calling.png",
    htmlUrl: "/function-calling/index.html",
  },
  {
    id: "mcp",
    title: "轻松理解MCP",
    description:
      "一个开放标准协议，目的就是为了解决 AI 模型与外部数据源、工具交互的难题。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/mcp.png",
    htmlUrl: "/mcp/index.html",
  },
  {
    id: "sub-agent",
    title: "轻松理解 SubAgent",
    description:
      "把会污染主上下文的探索性工作扔到独立空间，只把精华带回主对话。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/sub-agent.png",
    htmlUrl: "/sub-agent/index.html",
  },
  {
    id: "agent-todo",
    title: "轻松理解 Agent TodoList",
    description:
      "Agent 的 Checklist 机制：防遗忘、给用户看进度、支撑复杂编排。",
    category: "Agent",
    line: "agent",
    short: "TodoList",
    imageUrl: "/imgs/agent-todo.png",
    htmlUrl: "/agent-todo/index.html",
  },
  {
    id: "agent-modes",
    title: "轻松理解 Agent 运行模式",
    description: "Plan / Default / Auto 三档：在自主性和安全性之间找平衡点。",
    category: "Agent",
    line: "agent",
    short: "运行模式",
    imageUrl: "/imgs/agent-modes.png",
    htmlUrl: "/agent-modes/index.html",
  },
  {
    id: "agent-sandbox",
    title: "轻松理解 Agent 沙箱",
    description:
      "给 Agent 划一块安全围栏：文件系统 + 网络两条隔离线，OS 层强制。",
    category: "Agent",
    line: "agent",
    short: "沙箱",
    imageUrl: "/imgs/agent-sandbox.png",
    htmlUrl: "/agent-sandbox/index.html",
  },
  {
    id: "agent-memory",
    title: "轻松理解 Agent 记忆",
    description:
      "Agent 在 context window 之外持有信息：跨对话记住偏好、配置、踩过的坑。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/agent-memory.png",
    htmlUrl: "/agent-memory/index.html",
  },
  {
    id: "context-window",
    title: "轻松理解 Context Window",
    description:
      "LLM 的全部「工作内存」：每次请求时塞给它的那段文本，临时且有限。",
    category: "Agent",
    line: "agent",
    imageUrl: "/imgs/context-window.png",
    htmlUrl: "/context-window/index.html",
  },

  /* ── 检索增强线 ── */
  {
    id: "rag",
    title: "轻松理解RAG",
    description:
      "RAG 即检索增强生成技术，是大语言模型领域解决事实性问题的重要方案。",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/rag.png",
    htmlUrl: "/rag/index.html",
  },
  {
    id: "embedding",
    title: "轻松理解 Embedding",
    description:
      "Embedding 把文字、图片等内容变成向量，让机器能按语义相似度查找和比较。",
    category: "RAG",
    line: "rag",
    imageUrl: "/imgs/embedding.png",
    htmlUrl: "/embedding/index.html",
  },
  {
    id: "illusion",
    title: "轻松理解模型幻觉",
    description: "模型幻觉是模型在生成文本时出现的不真实、不合理的现象。",
    category: "模型基础",
    line: "rag",
    imageUrl: "/imgs/illusion.png",
    htmlUrl: "/illusion/index.html",
  },
];

/**
 * 概念讲解分类色板 (Mailchimp-Freddie 主题色)
 *
 * 概念视图分组已统一到学习线（颜色取 LEARNING_LINES.color），此表保留给视频精讲视图复用。
 */
export const categoryColors: Record<string, string> = {
  模型基础: "bg-butter text-ink",
  模型微调: "bg-butter-soft text-ink",
  模型部署: "bg-butter-tint text-ink",
  模型训练: "bg-cream text-ink",
  模型评估: "bg-cream text-ink",
  数据增强: "bg-cream text-ink",
  数据合成: "bg-cream text-ink",
  Agent: "bg-coral text-white",
  RAG: "bg-teal text-white",
  提示词: "bg-pop text-white",
};
