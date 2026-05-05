import type { Narration } from "../../registry/types";

/**
 * Chapter 07 · dont-edit-prompt — 别动指令（4 steps · ~41s）
 *
 * Source: script.md beats from "那信息确实过时了怎么办" to "这样一分，缓存就稳了"
 */
export const narrations: Narration[] = [
  // step 0 (~5s) — 问题场景：信息过时
  "那信息确实过时了怎么办？比如时间、文件状态这些。",
  // step 1 (~7s) — 解法 hero
  "Anthropic 的做法是——别去改系统指令，把更新塞进下一轮的消息里。",
  // step 2 (~14s) — 实现示意：用 system-reminder 夹带
  "具体怎么做？在下一条用户消息里附上一段「系统提醒」，把要更新的信息夹带进去。这样系统指令纹丝不动，缓存完好无损。",
  // step 3 (~12s) — 分层双卡
  "这个分法挺值得记一下。系统指令当地基，钉死不动；消息当流水，想怎么改怎么改。这样一分，缓存就稳了。",
];
