import type { Narration } from "../../registry/types";

/**
 * Chapter 12 · lazy-loading — 延迟加载（8 steps · ~66s）
 *
 * Source: script.md beats 1-8 of "lazy loading" section
 *   (从「Claude Code 可能要接入几十个外部工具」到
 *    「开发者可以直接用，简化自己的工具管理」)
 *
 * narrations.length === 8 — must equal the max `step === N` + 1
 * inside LazyLoading.tsx.
 */
export const narrations: Narration[] = [
  // step 0 (~6s) — 场景图：几十个外部工具
  "Claude Code 可能要接入几十个外部工具。",
  // step 1 (~6s) — 困境双面卡
  "全部完整定义塞进去？太占空间。按需加减？又破坏缓存。",
  // step 2 (~6s) — 解法 hero：延迟加载
  "Anthropic 找到的折中方案，叫延迟加载。",
  // step 3 (~9s) — 实现示意：stub + defer_loading
  "一开始只放一个轻量的占位符。模型看到的只是工具名字，不含完整的参数定义。",
  // step 4 (~8s) — 触发机制：Tool Search 拉取完整定义
  '等模型真要用某个工具了，再通过"工具搜索"功能去拉取完整定义。',
  // step 5 (~10s) — 福利说明：前缀只含占位符 → 缓存稳
  "好处是。前缀始终只包含那些轻量占位符，不会因为加载了某个工具就变化。缓存稳稳的。",
  // step 6 (~10s) — 图书馆书目比喻
  "相当于图书馆的书目索引。你先翻目录，找到想看的书再去书架取，不用把所有书都搬到桌上。",
  // step 7 (~11s) — 福利尾标：Tool Search 已通过 API 对外开放
  "值得一提，这个工具搜索功能已经通过接口对外开放了。开发者可以直接用，简化自己的工具管理。",
];
