import type { Narration } from "../../registry/types";

/**
 * Chapter 01 · opening — 引子 / 钩子（4 steps · ~27s）
 *
 * Source: script.md beats 1-4 (---separated)
 *
 * Length === number of steps in Opening.tsx switch (must equal 4).
 */
export const narrations: Narration[] = [
  // step 0 (~5s) — 工程界老话 hero
  '工程界有句老话，叫"缓存统治一切"。',
  // step 1 (~5s) — 时代锚定
  "到了 AI Agent 时代，这话还是对的。",
  // step 2 (~10s) — 题源 hero
  "Anthropic 的工程师最近给出了 Claude Code 提示词缓存设计的最佳实践。",
  // step 3 (~7s) — 钩子收口
  '但聊具体经验之前，先用一分钟搞懂"提示词缓存"到底是什么。',
];
