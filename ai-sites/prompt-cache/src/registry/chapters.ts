import type { ChapterDef } from "./types";
import OpeningChapter from "../chapters/01-opening/Opening";
import { narrations as openingNarrations } from "../chapters/01-opening/narrations";
import WhatIsCachingChapter from "../chapters/02-what-is-caching/WhatIsCaching";
import { narrations as whatIsCachingNarrations } from "../chapters/02-what-is-caching/narrations";
import CostNumbersChapter from "../chapters/03-cost-numbers/CostNumbers";
import { narrations as costNumbersNarrations } from "../chapters/03-cost-numbers/narrations";
import CacheAsInfraChapter from "../chapters/04-cache-as-infra/CacheAsInfra";
import { narrations as cacheAsInfraNarrations } from "../chapters/04-cache-as-infra/narrations";
import OrderChapter from "../chapters/05-order/Order";
import { narrations as orderNarrations } from "../chapters/05-order/narrations";
import PitfallsChapter from "../chapters/06-pitfalls/Pitfalls";
import { narrations as pitfallsNarrations } from "../chapters/06-pitfalls/narrations";
import DontEditPromptChapter from "../chapters/07-dont-edit-prompt/DontEditPrompt";
import { narrations as dontEditPromptNarrations } from "../chapters/07-dont-edit-prompt/narrations";
import DontSwitchModelChapter from "../chapters/08-dont-switch-model/DontSwitchModel";
import { narrations as dontSwitchModelNarrations } from "../chapters/08-dont-switch-model/narrations";
import SubAgentChapter from "../chapters/09-sub-agent/SubAgent";
import { narrations as subAgentNarrations } from "../chapters/09-sub-agent/narrations";
import DontTouchToolsChapter from "../chapters/10-dont-touch-tools/DontTouchTools";
import { narrations as dontTouchToolsNarrations } from "../chapters/10-dont-touch-tools/narrations";
import PlanModeChapter from "../chapters/11-plan-mode/PlanMode";
import { narrations as planModeNarrations } from "../chapters/11-plan-mode/narrations";
import LazyLoadingChapter from "../chapters/12-lazy-loading/LazyLoading";
import { narrations as lazyLoadingNarrations } from "../chapters/12-lazy-loading/narrations";
import CompactionProblemChapter from "../chapters/13-compaction-problem/CompactionProblem";
import { narrations as compactionProblemNarrations } from "../chapters/13-compaction-problem/narrations";
import CacheSafeForkingChapter from "../chapters/14-cache-safe-forking/CacheSafeForking";
import { narrations as cacheSafeForkingNarrations } from "../chapters/14-cache-safe-forking/narrations";
import SummaryChapter from "../chapters/15-summary/Summary";
import { narrations as summaryNarrations } from "../chapters/15-summary/narrations";

/**
 * Order = order of presentation.
 *
 * Each chapter MUST provide a `narrations: Narration[]` array. Its length
 * is the chapter's step count — there is no `totalSteps` to maintain
 * separately. This guarantees the audio synthesis pipeline, the runtime
 * stepper, and the chapter `.tsx` switch on `step` cannot drift apart.
 *
 * Visual styling (color, fonts) comes entirely from the active theme —
 * chapters never hard-code palette / font names. See THEMES.md.
 */
export const CHAPTERS: ChapterDef[] = [
  {
    id: "opening",
    title: "引子 / 钩子",
    narrations: openingNarrations,
    Component: OpeningChapter,
  },
  {
    id: "what-is-caching",
    title: "什么是提示词缓存",
    narrations: whatIsCachingNarrations,
    Component: WhatIsCachingChapter,
  },
  {
    id: "cost-numbers",
    title: "关键数字 + 真实账",
    narrations: costNumbersNarrations,
    Component: CostNumbersChapter,
  },
  {
    id: "cache-as-infra",
    title: "缓存即基建",
    narrations: cacheAsInfraNarrations,
    Component: CacheAsInfraChapter,
  },
  {
    id: "order",
    title: "排好队形",
    narrations: orderNarrations,
    Component: OrderChapter,
  },
  {
    id: "pitfalls",
    title: "三个坑",
    narrations: pitfallsNarrations,
    Component: PitfallsChapter,
  },
  {
    id: "dont-edit-prompt",
    title: "别动指令",
    narrations: dontEditPromptNarrations,
    Component: DontEditPromptChapter,
  },
  {
    id: "dont-switch-model",
    title: "别换模型",
    narrations: dontSwitchModelNarrations,
    Component: DontSwitchModelChapter,
  },
  {
    id: "sub-agent",
    title: "子任务 + 账号警告",
    narrations: subAgentNarrations,
    Component: SubAgentChapter,
  },
  {
    id: "dont-touch-tools",
    title: "别碰工具",
    narrations: dontTouchToolsNarrations,
    Component: DontTouchToolsChapter,
  },
  {
    id: "plan-mode",
    title: "规划模式",
    narrations: planModeNarrations,
    Component: PlanModeChapter,
  },
  {
    id: "lazy-loading",
    title: "延迟加载",
    narrations: lazyLoadingNarrations,
    Component: LazyLoadingChapter,
  },
  {
    id: "compaction-problem",
    title: "压缩的麻烦",
    narrations: compactionProblemNarrations,
    Component: CompactionProblemChapter,
  },
  {
    id: "cache-safe-forking",
    title: "缓存安全分叉",
    narrations: cacheSafeForkingNarrations,
    Component: CacheSafeForkingChapter,
  },
  {
    id: "summary",
    title: "总结：前缀匹配",
    narrations: summaryNarrations,
    Component: SummaryChapter,
  },
];
