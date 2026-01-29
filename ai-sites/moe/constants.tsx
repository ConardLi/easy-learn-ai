import React from 'react';

export const MOE_CARD_CONTENT = {
  title: "核心概念速查手册: MoE (混合专家模型)",
  sections: [
    {
      heading: "一句话定义",
      content: "MoE 是一种让 AI 模型“参数总量巨大，但推理速度飞快”的架构技术。它实现了参数“总量”与“激活量”的解绑。"
    },
    {
      heading: "核心隐喻：综合医院",
      content: "旧模型 (Dense) 是全能医生，一人看所有病，累且慢。MoE 是专家团，有导诊台 (Router) 和专科医生 (Experts)，按需分配，快且准。"
    },
    {
      heading: "技术原理",
      content: "在 Transformer 中替换 FFN 层。\n核心组件：\n1. 专家网络 (Experts)：平行的神经网络层。\n2. 门控网络 (Router)：计算输入 Token 应该去哪几个专家 (Top-k)。"
    },
    {
      heading: "核心优势",
      content: "1. 训练成本低，模型容量大 (打破 Scaling Law 瓶颈)。\n2. 推理速度极快 (低延迟)。\n3. 支持长上下文处理。"
    },
    {
      heading: "主要挑战",
      content: "1. 显存需求大 (VRAM Hungry)：所有参数需加载到显存。\n2. 训练负载均衡 (Load Balancing)：需防止“坍塌问题” (Collapse)，即少数专家累死，其他人没事干。"
    },
    {
      heading: "代表模型",
      content: "GPT-4, Mixtral 8x7B, DeepSeek-V2/V3 (MLA架构), Grok-1。"
    }
  ]
};

export const MODEL_EXAMPLES = [
  {
    name: "GPT-4",
    creator: "OpenAI",
    description: "业界普遍认为 GPT-4 是一个巨大的 MoE 模型（传闻是 8个专家，每个约 220B 参数）。",
    tags: ["闭源", "多模态", "行业标杆"]
  },
  {
    name: "Mixtral 8x7B",
    creator: "Mistral AI",
    description: "开源界的里程碑。它有 8 个专家，每次激活 2 个。总参数 47B，但推理计算量相当于一个 13B 的模型，性能却超过了 LLaMA-2 70B。",
    tags: ["开源", "高效", "欧洲之光"]
  },
  {
    name: "DeepSeek-V2 / V3",
    creator: "DeepSeek (深度求索)",
    description: "采用了创新的 MLA（多头潜在注意力）配合 MoE 架构，极大地降低了显存占用和推理成本，是目前 MoE 架构优化的前沿代表。",
    tags: ["国产之光", "MLA架构", "极低成本"]
  },
  {
    name: "Grok-1",
    creator: "xAI",
    description: "马斯克的 xAI 开源的 3140 亿参数模型，也是典型的 MoE。",
    tags: ["314B参数", "开源", "xAI"]
  }
];