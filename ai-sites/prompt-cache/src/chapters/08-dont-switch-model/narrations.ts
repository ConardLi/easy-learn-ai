import type { Narration } from "../../registry/types";

/**
 * Chapter 08 · dont-switch-model — 别换模型（5 steps · ~37s）
 *
 * Source: script.md beats from "下一条，对很多人来说有点反直觉"
 * to "主对话自始至终用同一个模型".
 *
 * Length === number of steps in DontSwitchModel.tsx (must equal 5).
 */
export const narrations: Narration[] = [
  // step 0 (~4s) — 反直觉钩子
  "下一条，对很多人来说有点反直觉。",
  // step 1 (~8s) — 朴素直觉
  "你可能会想。简单问题切到小模型省点钱。难题再切回大模型。多合理啊。",
  // step 2 (~10s) — 真相反转
  "但现实是。缓存是跟模型绑定的。换模型，等于之前积攒的所有缓存全部作废，从头重建。",
  // step 3 (~7s) — 重建代价
  "重建的成本，往往比让大模型直接回答那个简单问题还要高。",
  // step 4 (~8s) — 策略 hero
  "所以 Claude Code 的策略是——主对话自始至终用同一个模型。",
];
