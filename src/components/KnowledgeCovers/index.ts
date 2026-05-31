/**
 * KnowledgeCovers · 封面组件总线
 *
 * 新增封面时，只需要：
 *   1. 在本目录新建 <Topic>Cover.tsx
 *   2. 在 COVER_MAP 里按 item.id 注册
 *
 * `KnowCard` 会按 item.id 命中后渲染组件，否则 fall back 到原有的 imageUrl 截图。
 */
import React from "react";
import LlmCover from "./LlmCover";
import AgentCover from "./AgentCover";
import RagCover from "./RagCover";
import QuantizationCover from "./QuantizationCover";
import DistillCover from "./DistillCover";
import FunctionCallingCover from "./FunctionCallingCover";
import MoeCover from "./MoeCover";
import BsCover from "./BsCover";
import NlpCover from "./NlpCover";
import RlhfCover from "./RlhfCover";
import BertCover from "./BertCover";
import DeepseekR1Cover from "./DeepseekR1Cover";
import DeepspeedCover from "./DeepspeedCover";
import LossCover from "./LossCover";
import McpCover from "./McpCover";
import MultimodalityCover from "./MultimodalityCover";
import TransformerCover from "./TransformerCover";
import IllusionCover from "./IllusionCover";
import TokenCover from "./TokenCover";
import WhyfinetuneCover from "./WhyfinetuneCover";
import PretrainCover from "./PretrainCover";
import SftCover from "./SftCover";
import FinetuneCover from "./FinetuneCover";
import EpochsCover from "./EpochsCover";
import DeploymentCover from "./DeploymentCover";
import GgufCover from "./GgufCover";
import GptCover from "./GptCover";
import LlamaCover from "./LlamaCover";
import T5Cover from "./T5Cover";
import LrCover from "./LrCover";
import LoraCover from "./LoraCover";
import LoraRankCover from "./LoraRankCover";
import MgaCover from "./MgaCover";
import AgentLoopCover from "./AgentLoopCover";

export type CoverComponent = React.FC;

export const COVER_MAP: Record<string, CoverComponent> = {
  llm: LlmCover,
  agent: AgentCover,
  rag: RagCover,
  quantization: QuantizationCover,
  distill: DistillCover,
  "function-calling": FunctionCallingCover,
  moe: MoeCover,
  bs: BsCover,
  nlp: NlpCover,
  rlhf: RlhfCover,
  bert: BertCover,
  "deepseek-r1": DeepseekR1Cover,
  deepspeed: DeepspeedCover,
  loss: LossCover,
  mcp: McpCover,
  multimodality: MultimodalityCover,
  transformer: TransformerCover,
  illusion: IllusionCover,
  token: TokenCover,
  whyfinetune: WhyfinetuneCover,
  pretrain: PretrainCover,
  sft: SftCover,
  finetune: FinetuneCover,
  epochs: EpochsCover,
  deployment: DeploymentCover,
  gguf: GgufCover,
  gpt: GptCover,
  llama: LlamaCover,
  t5: T5Cover,
  lr: LrCover,
  lora: LoraCover,
  "lora-rank": LoraRankCover,
  mga: MgaCover,
  "agent-loop": AgentLoopCover,
};

export {
  LlmCover,
  AgentCover,
  RagCover,
  QuantizationCover,
  DistillCover,
  FunctionCallingCover,
  MoeCover,
  BsCover,
  NlpCover,
  RlhfCover,
  BertCover,
  DeepseekR1Cover,
  DeepspeedCover,
  LossCover,
  McpCover,
  MultimodalityCover,
  TransformerCover,
  IllusionCover,
  TokenCover,
  WhyfinetuneCover,
  PretrainCover,
  SftCover,
  FinetuneCover,
  EpochsCover,
  DeploymentCover,
  GgufCover,
  GptCover,
  LlamaCover,
  T5Cover,
  LrCover,
  LoraCover,
  LoraRankCover,
  MgaCover,
  AgentLoopCover,
};
