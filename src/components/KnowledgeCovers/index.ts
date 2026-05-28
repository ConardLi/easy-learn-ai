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

export type CoverComponent = React.FC;

export const COVER_MAP: Record<string, CoverComponent> = {
  llm: LlmCover,
  agent: AgentCover,
  rag: RagCover,
};

export { LlmCover, AgentCover, RagCover };
