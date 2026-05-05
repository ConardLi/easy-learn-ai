import type { Narration } from "../../registry/types";

/**
 * Chapter 10 · dont-touch-tools — 别碰工具（5 steps · ~34s）
 *
 * Source: script.md beats — "下一条核心一样——对话过程中，工具集不要动" 起
 * 到 "看着像优化，结果是添乱" 止。
 */
export const narrations: Narration[] = [
  // step 0 (~6s) — 章节钩子
  "下一条核心一样——对话过程中，工具集不要动。",
  // step 1 (~8s) — 直觉做法
  "直觉上你可能觉得，当前任务就需要 3 个工具，把另外 30 个移走，不更干净吗？",
  // step 2 (~7s) — 真相事实卡
  "但工具定义是缓存前缀的一部分。加一个，减一个，缓存就断了。",
  // step 3 (~9s) — 链断后果
  "一断，就是整个对话的缓存全部重建。代价远远超过多放几个工具定义占的那点空间。",
  // step 4 (~3s) — 收束金句
  "看着像优化，结果是添乱。",
];
