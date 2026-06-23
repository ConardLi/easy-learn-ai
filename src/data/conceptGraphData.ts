/**
 * AI 知视 · 概念关联图谱（边 + 派生节点）
 *
 * 节点不在这里重复定义 —— 直接从单一数据源 aiKnowledgeConceptData 派生
 * （分类 = line、短名 = short/title 派生）。这里只维护「关联边」这种图谱独有的语义信息。
 *
 * 新增概念时：先在 aiKnowledgeConceptData 加条目（含 line），再来这里补它的关联边。
 * 开发模式下会校验：① 有概念漏填 line ② 边引用了不存在的概念 id —— 都会 console.warn。
 */

import {
  aiKnowledgeConceptData,
  conceptShortLabel,
  LEARNING_LINES,
  lineById,
} from "./aiKnowledgeConceptData";

/** 学习线元信息在数据源里定义，这里转出方便图谱侧统一引用 */
export { LEARNING_LINES, lineById };

/** 6 种关系，用于边的配色与图例 */
export type RelationType =
  | "prereq" // 前置：先懂 A 才好懂 B
  | "mechanism" // 机制/组成：A 是 B 内部的一环
  | "sibling" // 平行：同层可横向对比
  | "solution" // 方案：A 用来解决 B 的问题
  | "vs" // 对照：互为替代 / 易混
  | "bridge"; // 跨类桥：连接两个大主题

export interface RelationMeta {
  label: string;
  color: string;
  dashed?: boolean;
}

export const RELATION_META: Record<RelationType, RelationMeta> = {
  prereq: { label: "前置 · 先学这个", color: "#2A9D8F" },
  mechanism: { label: "机制 · 它的内部一环", color: "#E07A5F" },
  sibling: { label: "平行 · 同层可对比", color: "#6D597A", dashed: true },
  solution: { label: "方案 · 用来解决它", color: "#3D8B40" },
  vs: { label: "对照 · 易混 / 可替代", color: "#C98A1C", dashed: true },
  bridge: { label: "跨主题 · 连接另一片", color: "#2A6F97", dashed: true },
};

export interface GraphNode {
  id: string;
  /** 地铁图上显示的短名 */
  label: string;
  /** 原始分类（保留作历史信息） */
  category: string;
  /** 一句话描述（关联自数据源，全景面板用） */
  desc: string;
  /** 所属学习线 id */
  line: string;
  /** 枢纽节点：核心入口 / 多线交汇，画得更大 */
  hub?: boolean;
}

export interface GraphEdge {
  a: string;
  b: string;
  type: RelationType;
}

/** 全局推荐起点（地图上发光提示「从这里开始」） */
export const RECOMMENDED_START = "llm";

/**
 * 枢纽节点（可选 · 仅影响视觉大小）：核心入口 / 多线交汇。
 * 漏标只是不放大，无功能影响。
 */
const HUB_IDS = new Set([
  "llm",
  "transformer",
  "agent",
  "agent-loop",
  "lora",
  "quantization",
]);

/* ────────────────────────────────────────────────
 * 节点表 —— 从单一数据源派生，按数据源顺序（即线内学习顺序）
 * ──────────────────────────────────────────────── */
export const GRAPH_NODES: GraphNode[] = aiKnowledgeConceptData.map((c) => ({
  id: c.id,
  label: conceptShortLabel(c),
  category: c.category,
  desc: c.description,
  line: c.line,
  hub: HUB_IDS.has(c.id) || undefined,
}));

/** 按学习线分组的节点（顺序：LEARNING_LINES → 线内数据源顺序） */
export const NODES_BY_LINE: Record<string, GraphNode[]> = (() => {
  const map: Record<string, GraphNode[]> = {};
  LEARNING_LINES.forEach((l) => (map[l.id] = []));
  GRAPH_NODES.forEach((n) => {
    (map[n.line] ??= []).push(n);
  });
  return map;
})();

/* ────────────────────────────────────────────────
 * 关联边（无向唯一，含关系类型）
 * ──────────────────────────────────────────────── */
export const GRAPH_EDGES: GraphEdge[] = [
  // —— 提示词工程族内部 ——
  { a: "prompt", b: "system-prompt", type: "mechanism" },
  { a: "prompt", b: "few-shot", type: "mechanism" },
  { a: "prompt", b: "chain-of-thought", type: "mechanism" },
  { a: "few-shot", b: "chain-of-thought", type: "sibling" },
  { a: "system-prompt", b: "few-shot", type: "sibling" },
  // —— 提示词工程 → 基础 / 其它族 桥 ——
  { a: "prompt", b: "llm", type: "bridge" },
  { a: "prompt", b: "token", type: "bridge" },
  { a: "system-prompt", b: "context-window", type: "mechanism" },
  { a: "few-shot", b: "context-window", type: "bridge" },
  { a: "few-shot", b: "whyfinetune", type: "vs" },
  { a: "chain-of-thought", b: "deepseek-r1", type: "bridge" },
  { a: "chain-of-thought", b: "token", type: "bridge" },
  // —— Agent 族内部 ——
  { a: "agent", b: "agent-loop", type: "mechanism" },
  { a: "agent", b: "function-calling", type: "mechanism" },
  { a: "agent", b: "context-window", type: "mechanism" },
  { a: "agent", b: "agent-memory", type: "mechanism" },
  { a: "agent", b: "sub-agent", type: "mechanism" },
  { a: "agent", b: "agent-todo", type: "mechanism" },
  { a: "agent", b: "agent-modes", type: "mechanism" },
  { a: "agent", b: "agent-sandbox", type: "mechanism" },
  { a: "agent-loop", b: "function-calling", type: "mechanism" },
  { a: "agent-loop", b: "context-window", type: "mechanism" },
  { a: "agent-loop", b: "sub-agent", type: "vs" },
  { a: "agent-loop", b: "agent-todo", type: "mechanism" },
  { a: "agent-loop", b: "mcp", type: "mechanism" },
  { a: "function-calling", b: "mcp", type: "vs" },
  { a: "sub-agent", b: "agent-todo", type: "vs" },
  { a: "sub-agent", b: "context-window", type: "mechanism" },
  { a: "agent-modes", b: "agent-sandbox", type: "vs" },
  { a: "agent-memory", b: "context-window", type: "mechanism" },
  // —— Agent 族 → 模型基础 桥 ——
  { a: "agent", b: "llm", type: "bridge" },
  { a: "context-window", b: "llm", type: "bridge" },
  { a: "context-window", b: "token", type: "bridge" },
  { a: "function-calling", b: "llm", type: "bridge" },
  { a: "agent-loop", b: "token", type: "bridge" },
  { a: "agent-memory", b: "token", type: "bridge" },
  // —— 模型基础 / 架构 ——
  { a: "llm", b: "token", type: "prereq" },
  { a: "llm", b: "nlp", type: "prereq" },
  { a: "nlp", b: "token", type: "prereq" },
  { a: "transformer", b: "bert", type: "prereq" },
  { a: "transformer", b: "gpt", type: "prereq" },
  { a: "transformer", b: "t5", type: "prereq" },
  { a: "transformer", b: "llama", type: "prereq" },
  { a: "gpt", b: "llm", type: "prereq" },
  { a: "llama", b: "llm", type: "prereq" },
  { a: "llama", b: "gpt", type: "sibling" },
  { a: "bert", b: "gpt", type: "sibling" },
  { a: "gpt", b: "t5", type: "sibling" },
  { a: "moe", b: "transformer", type: "prereq" },
  { a: "moe", b: "llm", type: "bridge" },
  { a: "moe", b: "deepseek-r1", type: "sibling" },
  { a: "multimodality", b: "token", type: "prereq" },
  { a: "multimodality", b: "transformer", type: "prereq" },
  { a: "multimodality", b: "llm", type: "sibling" },
  // —— 推理 / 压缩 ——
  { a: "deepseek-r1", b: "distill", type: "mechanism" },
  { a: "deepseek-r1", b: "rlhf", type: "mechanism" },
  { a: "deepseek-r1", b: "llm", type: "bridge" },
  { a: "distill", b: "quantization", type: "vs" },
  // —— 幻觉 / 检索 ——
  { a: "illusion", b: "rag", type: "solution" },
  { a: "illusion", b: "agent-memory", type: "bridge" },
  { a: "rag", b: "embedding", type: "mechanism" },
  { a: "rag", b: "chunk", type: "mechanism" },
  { a: "chunk", b: "embedding", type: "mechanism" },
  { a: "chunk", b: "vector-database", type: "mechanism" },
  { a: "chunk", b: "context-window", type: "bridge" },
  { a: "chunk", b: "token", type: "bridge" },
  { a: "embedding", b: "vector-database", type: "mechanism" },
  { a: "vector-database", b: "rag", type: "mechanism" },
  { a: "vector-database", b: "recall-rerank", type: "mechanism" },
  { a: "rag", b: "recall-rerank", type: "mechanism" },
  { a: "chunk", b: "recall-rerank", type: "mechanism" },
  { a: "embedding", b: "recall-rerank", type: "mechanism" },
  { a: "vector-database", b: "context-window", type: "bridge" },
  { a: "embedding", b: "token", type: "mechanism" },
  { a: "embedding", b: "context-window", type: "bridge" },
  { a: "embedding", b: "llm", type: "bridge" },
  { a: "rag", b: "context-window", type: "mechanism" },
  { a: "rag", b: "agent", type: "solution" },
  { a: "rag", b: "whyfinetune", type: "vs" },
  // —— 训练 / 对齐 ——
  { a: "pretrain", b: "sft", type: "prereq" },
  { a: "sft", b: "rlhf", type: "prereq" },
  { a: "rlhf", b: "pretrain", type: "mechanism" },
  { a: "mga", b: "pretrain", type: "solution" },
  { a: "mga", b: "distill", type: "vs" },
  { a: "loss", b: "pretrain", type: "mechanism" },
  { a: "loss", b: "sft", type: "mechanism" },
  // —— 微调 / 参数 ——
  { a: "whyfinetune", b: "finetune", type: "prereq" },
  { a: "finetune", b: "lora", type: "mechanism" },
  { a: "finetune", b: "sft", type: "sibling" },
  { a: "lora", b: "quantization", type: "bridge" },
  { a: "lora", b: "lora-rank", type: "mechanism" },
  { a: "lora-rank", b: "lr", type: "sibling" },
  { a: "lora-rank", b: "bs", type: "sibling" },
  { a: "lora-rank", b: "epochs", type: "sibling" },
  { a: "lr", b: "bs", type: "sibling" },
  { a: "lr", b: "epochs", type: "sibling" },
  { a: "lr", b: "loss", type: "mechanism" },
  { a: "epochs", b: "bs", type: "sibling" },
  { a: "epochs", b: "whyfinetune", type: "bridge" },
  { a: "deepspeed", b: "bs", type: "mechanism" },
  { a: "deepspeed", b: "lora", type: "mechanism" },
  { a: "deepspeed", b: "quantization", type: "bridge" },
  // —— 部署 ——
  { a: "quantization", b: "gguf", type: "mechanism" },
  { a: "quantization", b: "deployment", type: "mechanism" },
  { a: "gguf", b: "deployment", type: "mechanism" },
  { a: "deployment", b: "deepspeed", type: "mechanism" },
  { a: "deployment", b: "bs", type: "bridge" },
];

/** 邻接索引：id → 相连的 { id, type }[]（无向） */
export const ADJACENCY: Record<string, { id: string; type: RelationType }[]> =
  (() => {
    const map: Record<string, { id: string; type: RelationType }[]> = {};
    for (const n of GRAPH_NODES) map[n.id] = [];
    for (const e of GRAPH_EDGES) {
      map[e.a]?.push({ id: e.b, type: e.type });
      map[e.b]?.push({ id: e.a, type: e.type });
    }
    return map;
  })();

/* ────────────────────────────────────────────────
 * 开发模式校验：漏挂线 / 边 typo 早暴露
 * ──────────────────────────────────────────────── */
declare const process: { env: { NODE_ENV?: string } };

if (typeof process !== "undefined" && process.env.NODE_ENV !== "production") {
  const ids = new Set(GRAPH_NODES.map((n) => n.id));

  aiKnowledgeConceptData.forEach((c) => {
    if (!c.line) {
      console.warn(`[知视图谱] 概念「${c.id}」缺少 line 字段，全景视图不会收录它`);
    } else if (!lineById[c.line]) {
      console.warn(
        `[知视图谱] 概念「${c.id}」的 line="${c.line}" 不在 LEARNING_LINES 中`,
      );
    }
  });

  GRAPH_EDGES.forEach((e, i) => {
    if (!ids.has(e.a) || !ids.has(e.b)) {
      console.warn(
        `[知视图谱] 第 ${i + 1} 条边引用了不存在的概念 id：${e.a} ↔ ${e.b}`,
      );
    }
  });
}
