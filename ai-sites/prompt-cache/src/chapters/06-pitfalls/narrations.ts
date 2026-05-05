import type { Narration } from "../../registry/types";

/**
 * Chapter 06 · pitfalls — 三个坑（5 steps · ~31s）
 *
 * Source: script.md beats — 「这里有几个特别容易踩的坑」～
 *         「一个小细节没注意，整条缓存链就断了」
 */
export const narrations: Narration[] = [
  // step 0 (~3s) — 章节钩子
  "这里有几个特别容易踩的坑。",
  // step 1 (~7s) — 坑 1：固定指令嵌当前时间
  "第一个。在固定指令里嵌了当前时间。每秒都在变，缓存直接废掉。",
  // step 2 (~8s) — 坑 2：工具定义用无序容器装
  "第二个。工具定义用无序容器来装。每次发请求顺序都不一样，前缀对不上。",
  // step 3 (~8s) — 坑 3：工具参数改一字段
  "第三个。工具参数改了。哪怕只动一个字段，整条前缀的缓存全失效。",
  // step 4 (~5s) — 收束 hero
  "一个小细节没注意，整条缓存链就断了。",
];
