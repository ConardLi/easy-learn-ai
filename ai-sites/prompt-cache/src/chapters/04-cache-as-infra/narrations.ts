import type { Narration } from "../../registry/types";

/**
 * Chapter 04 · cache-as-infra — 缓存即基建（10 steps · ~95s）
 *
 * Source: script.md beats — from "Anthropic 内部，把缓存命中率当基础设施级别的指标"
 * to "最重要的那条经验，就从这个原理长出来".
 *
 * Length === number of steps in CacheAsInfra.tsx switch (must equal 10).
 */
export const narrations: Narration[] = [
  // step 0 (~8s) — 监控 dashboard：基建级指标
  "Anthropic 内部，把缓存命中率，当基础设施级别的指标在看。",
  // step 1 (~10s) — 命中率掉 → 值班告警
  "地位跟服务器在线率差不多。命中率一掉，触发值班告警，工程师得当线上事故处理。",
  // step 2 (~10s) — 术语：declare SEVs
  '原文用的词是"宣布分级事故"。意思是走完整的事故响应流程，比普通告警严重多了。',
  // step 3 (~13s) — 福利链：命中率 → 省钱 → 更宽松额度
  "更关键的是。命中率高，不光省钱，还直接影响用户体验——它让 Anthropic 能给付费用户更宽松的使用额度。",
  // step 4 (~6s) — 副标语 hero
  "缓存命中率越高，你在同样的价格下，能用得越多。",
  // step 5 (~15s) — 论断 hero：没有缓存，就没有 Claude Code
  "所以缓存对 Claude Code 来说，不是锦上添花的优化。是整个系统能跑起来的前提。没有缓存，就没有 Claude Code。",
  // step 6 (~8s) — 长对话场景：几十轮
  "为什么？因为 Claude Code 这种 AI 编程助手，是长对话的。一个会话几十轮。",
  // step 7 (~10s) — 痛苦场景：从头算 → 延迟 + 成本爆炸
  "每一轮都要把上文全带上重新发。每次都从头算，延迟和成本会爆炸。",
  // step 8 (~10s) — 概念锚 hero：前缀匹配
  "而缓存的核心原理——前缀匹配。下一次请求的前缀跟上次一样，就能复用之前的计算。",
  // step 9 (~5s) — 章节出口
  "最重要的那条经验，就从这个原理长出来。",
];
