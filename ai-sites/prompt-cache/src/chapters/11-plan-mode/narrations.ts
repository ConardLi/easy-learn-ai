import type { Narration } from "../../registry/types";

/**
 * Chapter 11 · plan-mode — 规划模式（9 steps · ~85s）
 *
 * Source: script.md beats 51-59 (the nine "---"-separated paragraphs from
 *   "Claude Code 有个'规划模式'..." through "...自己先想清楚再动手，不用你
 *   手动切换。")
 *
 * Length === number of steps in PlanMode.tsx switch (must equal 9).
 */
export const narrations: Narration[] = [
  // step 0 (~10s) — concept card
  'Claude Code 有个"规划模式"。进入后模型只思考、只规划，不执行操作。',
  // step 1 (~11s) — naive approach (tools removed / added back)
  "按直觉的做法。进规划模式就把执行类工具移走，退出来再加回来。但 Anthropic 没这么干。",
  // step 2 (~10s) — Anthropic's actual way (keep + add two)
  '他们的做法是保留所有工具不动。另外加了两个特殊工具——"进入规划"和"退出规划"。',
  // step 3 (~8s) — call flow
  '模型调用"进入规划"就切到思考模式。调用"退出规划"就回来。',
  // step 4 (~12s) — system message injection
  '那"规划模式下不能执行"这个约束怎么传达？通过在对话中插入一条系统消息，告诉模型你现在在规划。',
  // step 5 (~8s) — hero callout
  "注意——是在对话流里插一条消息，不是去改系统指令。这两个东西要分清。",
  // step 6 (~8s) — System Prompt vs System Message
  "系统指令是固定的，在缓存前缀里。对话消息是流动的，不影响前缀。",
  // step 7 (~4s) — result card
  "这样工具集始终不变，缓存始终有效。",
  // step 8 (~14s) — bonus: model self-detects
  "而且还带来一个额外好处。模型可以自己判断什么时候进规划模式——遇到复杂任务，它自己先想清楚再动手，不用你手动切换。",
];
