import type { Narration } from "../../registry/types";

/**
 * Chapter 05 · order — 排好队形（8 steps · ~57s）
 *
 * Source: script.md beats from "既然缓存靠前缀匹配，那提示词里东西的排列顺序
 * 就至关重要了" through "就好比收拾书桌……不用把整张桌子翻一遍。"
 *
 * Length === number of `if (step === N)` branches in Order.tsx (must equal 8).
 */
export const narrations: Narration[] = [
  // step 0 (~7s) — 章节标题 hero
  "既然缓存靠前缀匹配，那提示词里东西的排列顺序就至关重要了。",
  // step 1 (~5s) — Anthropic 实践牌引入
  "Anthropic 的最佳实践是这样排的。",
  // step 2 (~7s) — 第 1 层：系统指令 + 工具定义
  "最前面，放系统指令和工具定义。这些是固定的，所有会话共享。",
  // step 3 (~5s) — 第 2 层：CLAUDE.md
  "第二层，放项目文档。同一个项目内共享。",
  // step 4 (~6s) — 第 3 层：会话上下文
  "第三层，放当前会话的上下文。只在这一次对话里有效。",
  // step 5 (~6s) — 第 4 层：对话消息
  "最后才是聊天消息。逐轮增长，每轮只新增最后一条。",
  // step 6 (~5s) — 一句话原则 hero
  "一句话——越不容易变的东西，越往前放。",
  // step 7 (~16s) — 书桌比喻
  "就好比收拾书桌。常年不动的参考书放最底层。这周要看的资料放中间。今天写的草稿放最上面。这样你每天坐下来才不用把整张桌子翻一遍。",
];
