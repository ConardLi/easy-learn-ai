import type { Narration } from "../../registry/types";

/**
 * Chapter 14 · cache-safe-forking — 缓存安全分叉（7 steps · ~59s）
 *
 * Source: script.md beats for chapter 14（从 "Anthropic 的解决方案" 到
 * "几乎不多花钱"）. 7 个节拍，与 .tsx 中 `step === 0..6` 严格对应。
 */
export const narrations: Narration[] = [
  // step 0 (~6s) — 解法名 hero
  'Anthropic 的解决方案叫"缓存安全分叉"。',
  // step 1 (~12s) — 做法卡：完全相同的 system_prompt / user_context / tool_definitions + 主对话历史
  "压缩请求必须用跟主对话完全一样的系统指令、用户上下文、工具定义，把主对话的消息作为历史带上。",
  // step 2 (~6s) — 末尾追加：在末尾加一条压缩指令，作为新的用户消息
  "然后在末尾追加一条压缩指令，作为新的用户消息。",
  // step 3 (~13s) — API 视角对照：上次请求 vs 这次请求几乎一模一样
  "从后台视角看，这个请求和上一次几乎一模一样。相同的前缀，相同的工具，相同的历史，所以前缀缓存可以直接复用。",
  // step 4 (~4s) — 增量成本卡
  "新增成本，只有最后那条压缩指令本身。",
  // step 5 (~11s) — 缓冲区警告
  "同时还要预留一个压缩缓冲区，给摘要输出留够空间。不能等窗口填满才开始压缩，要提前留余量。",
  // step 6 (~7s) — 收束 hero
  "一个压缩操作，能复用主对话积攒的全部缓存。几乎不多花钱。",
];
