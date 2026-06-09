/**
 * 全局类型定义
 * 定义网站中使用的所有数据类型
 */

/**
 * AI 知视的两种形态（列表浏览模式，非数据字段）：
 *   - concept   从零讲透 AI 概念的交互式网站
 *   - video     B 站视频配套的 PPT 网站
 */
export type KnowledgeType = "concept" | "video";

/** 概念讲解 · 见 aiKnowledgeConceptData.ts */
export interface AIKnowledgeConceptItem {
  id: string;
  title: string;
  description: string;
  /**
   * 原始分类（模型基础 / Agent / …）。
   * 概念视图的分组口径已统一到 `line`（学习线），此字段保留作历史信息 + 视频视图复用配色。
   */
  category: string;
  /**
   * 所属学习线 id（统一分类口径，对应 LEARNING_LINES）。
   * 目录视图按它分组，全景视图按它排地铁线。新增概念必填。
   */
  line: string;
  /**
   * 地铁图 / 卡片角标用的短名。不填则自动从 title 去掉「轻松理解」前缀派生。
   */
  short?: string;
  imageUrl: string;
  htmlUrl?: string;
}

/** 学习线元信息（统一分类体系，目录与全景共用） */
export interface LearningLine {
  id: string;
  /** 完整线名，用于目录分组标题 / 全景行标题，如「入门基础线」 */
  name: string;
  /** 短角标名，用于卡片角标 / 筛选 chip，如「入门基础」 */
  tag: string;
  /** 一句话：这条线学完能干嘛 */
  blurb: string;
  /** 线主色（hex） */
  color: string;
  /** 起点提示：这条线从哪开始 */
  startHint: string;
}

/** 视频精讲 · 见 aiKnowledgeVideoData.ts */
export interface AIKnowledgeVideoItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  htmlUrl?: string;
  /** B 站视频地址 */
  bilibiliUrl?: string;
  /** 视频封面图，留空则列表页显示占位 */
  videoCoverUrl?: string;
  /** 时长徽章文案，如 "23:45" */
  duration?: string;
}

/** 详情页 / 路由共用的联合类型 */
export type AIKnowledgeItem = AIKnowledgeConceptItem | AIKnowledgeVideoItem;

/**
 * AI 文章（编辑专栏）· 单条
 *
 * 数据源是用 beautiful-article skill 生成的单文件 HTML，放在
 * `public/article/<id>.html` 或 `public/article/<id>/index.html`，
 * 详情页用 iframe 装载，列表页走时间线（不出封面图）。
 */
export interface AIArticleItem {
  /** slug，例如 "beautiful-article-intro" — 同时作为路由参数 */
  id: string;
  /** 文章标题（列表页 + 详情页 chrome 标签都用它） */
  title: string;
  /** 一句 Lead 摘要，列表页副文案 */
  lead: string;
  /**
   * 类型（决定列表页 chip 角标与色徽）。新增类型直接在数据里写新值，
   * 页面会按出现顺序自动收集成 chip。
   */
  category: string;
  /** 发布日期 YYYY-MM-DD，用于时间线排序与年份分组 */
  publishDate: string;
  /** 预估阅读时长（分钟），用于元信息行 "12 min" */
  readingMinutes?: number;
  /** beautiful-article 主题（tufte / press / 其它），可选小角标 */
  theme?: string;
  /** 文章标签，列表页元信息行用 #tag 形式 */
  tags?: string[];
  /**
   * iframe 的目标地址。约定放在 `/article/<id>.html`，多资源型
   * 也可用 `/article/<id>/index.html`。
   */
  htmlUrl: string;
}

/**
 * 作品按钮动作类型
 *   - embed    内嵌 iframe 在站内打开（保留原 demoUrl 行为）
 *   - external 新窗口跳转到外部页面（文档 / 仓库 / 视频 / 文章…）
 */
export type WorkActionType = "embed" | "external";

/**
 * 作品自定义按钮配置
 *
 * @example
 *   { label: "在线体验", type: "embed",    url: "/translate/index.html" }
 *   { label: "读文档",   type: "external", url: "https://example.com/docs" }
 *   { label: "源码",     type: "external", url: "https://github.com/..." }
 */
export interface WorkAction {
  /** 按钮文案 */
  label: string;
  /** 动作类型决定 icon 与行为：embed 触发 iframe / external 跳新窗 */
  type: WorkActionType;
  /** 目标 URL */
  url: string;
  /**
   * 可选视觉优先级。不填时按数组顺序自动决定：
   * 第 0 个 primary（coral 实底），其余 secondary（白底 ink 边）。
   */
  variant?: "primary" | "secondary";
}

export interface AIApplicationItem {
  id: string;
  title: string;
  description: string;
  /** 作品分类。可自由命名，UI 会按出现顺序自动循环 butter / coral / teal / cream 四色 */
  category: string;
  /** 作品截图。建议 16:10 比例 */
  imageUrl: string;
  tags: string[];

  /**
   * 推荐字段：自定义按钮组。
   * 支持任意数量、任意文案、任意动作类型。
   * 不写时自动从 demoUrl / githubUrl 派生（向后兼容）。
   */
  actions?: WorkAction[];

  /** @deprecated 老字段，仅保留作为向后兼容；新作品请用 actions */
  demoUrl?: string;
  /** @deprecated 老字段，仅保留作为向后兼容；新作品请用 actions */
  githubUrl?: string;
}

export interface NavigationItem {
  name: string;
  path: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}
