/**
 * AI 知视 · 统一查找入口
 *
 * 概念讲解与视频精讲分文件维护，详情页路由仍共用 /ai-knowledge/:id，
 * 通过此 helper 在两个数据源中查找。
 */

import { aiKnowledgeConceptData } from "./aiKnowledgeConceptData";
import { aiKnowledgeVideoData } from "./aiKnowledgeVideoData";
import {
  AIKnowledgeItem,
  AIKnowledgeConceptItem,
  AIKnowledgeVideoItem,
  KnowledgeType,
} from "../types";

export function findKnowledgeItemById(
  id: string,
): AIKnowledgeItem | undefined {
  return (
    aiKnowledgeConceptData.find((item) => item.id === id) ??
    aiKnowledgeVideoData.find((item) => item.id === id)
  );
}

export function getKnowledgeType(id: string): KnowledgeType | undefined {
  if (aiKnowledgeConceptData.some((item) => item.id === id)) return "concept";
  if (aiKnowledgeVideoData.some((item) => item.id === id)) return "video";
  return undefined;
}

export function isConceptItem(
  item: AIKnowledgeItem,
): item is AIKnowledgeConceptItem {
  return getKnowledgeType(item.id) === "concept";
}

export function isVideoItem(
  item: AIKnowledgeItem,
): item is AIKnowledgeVideoItem {
  return getKnowledgeType(item.id) === "video";
}
