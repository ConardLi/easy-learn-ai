import type { Narration } from "../../registry/types";

/**
 * Chapter 09 · sub-agent — 子任务 + 账号警告（8 steps · ~75s）
 *
 * Source: script.md beats from "派子任务" through "别聊两句就来回切"
 */
export const narrations: Narration[] = [
  // step 0 (~5s) — 桥梁问题
  "那需要小模型干活的时候怎么办？派子任务。",
  // step 1 (~7s) — 子任务独立缓存
  "子任务有自己独立的上下文和缓存，不会污染主对话的缓存链。",
  // step 2 (~13s) — hand-off message 流程
  "具体做法是。让主模型先写个任务交接说明，把上下文浓缩好。然后传给子任务去执行，做完只把结果传回主对话。",
  // step 3 (~12s) — Explore agents 案例
  "Claude Code 里的探索模式就是这样工作的。它用小模型，在独立的上下文里执行探索任务。",
  // step 4 (~16s) — 实习生比喻
  "打个比方。你不会为了省事让实习生坐到你工位上用你的电脑。而是给他分配一台独立的机器，把任务说明写清楚发过去，做完把结果发回来。",
  // step 5 (~6s) — 警告 hero
  "这里要给搞中转的朋友提个醒——缓存是按账号隔离的。",
  // step 6 (~10s) — 账号池反例
  "我看到有人想用账号池搞中转。账号池一混，命中率过低，钱没赚到反而把号搞没了。",
  // step 7 (~6s) — cc switch 提醒
  "还有教你咔咔切账号的，也要留意。别聊两句就来回切。",
];
