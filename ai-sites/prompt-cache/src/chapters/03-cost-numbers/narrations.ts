import type { Narration } from "../../registry/types";

/**
 * Chapter 03 · cost-numbers — 关键数字 + 真实账（9 steps · ~80s）
 *
 * Source: script.md beats 9-17 (the cost-numbers段落).
 * Length === number of steps in CostNumbers.tsx switch (must equal 9).
 */
export const narrations: Narration[] = [
  // step 0 (~10s) — 三组关键比例 hero：读 10% / 写 125% / 后续省 90%
  "几个关键数字。命中缓存的部分，价格打一折。首次写入要 1.25 倍——多花 25%，但后面每次省 90%。",
  // step 1 (~9s) — TTL 时钟：5 分钟默认 / 自动续期 / 1 小时付费档
  "默认存 5 分钟。5 分钟内有请求就自动续期，不额外收钱。也可以选 1 小时的付费版本。",
  // step 2 (~13s) — 门槛卡：Sonnet 4 / Opus 4 = 1024；Opus 4.5+ = 4096
  "不过有个门槛——内容太短缓存不上。一般至少要 1024 个 token，新一点的模型要 4096 个。短 prompt 没缓存的份。",
  // step 3 (~4s) — 案例 hero：10 万字的长对话
  "举个实在的例子。10 万字的长对话。",
  // step 4 (~5s) — 不开缓存账单：每轮 0.30 美金
  "不开缓存，Claude Sonnet 每轮要花 0.30 美金。",
  // step 5 (~6s) — 开缓存账单：首次 0.375，之后 0.03
  "开了缓存，首次 0.375。之后每轮只要 0.03。",
  // step 6 (~5s) — 节省 hero：10 轮，省约 90%
  "聊 10 轮，省下大约 90% 的输入成本。",
  // step 7 (~9s) — 延迟收益：TTFT 显著下降
  "而且不光省钱。延迟也降下来了——不用重算的部分越多，第一个字出来得越快。",
  // step 8 (~10s) — 桥梁 hero：7 条经验都在讲前缀命中
  "理解了这个，下面 7 条经验就好懂了。它们都在讲一件事——怎么让前缀尽可能多地命中缓存。",
];
