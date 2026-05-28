/**
 * 全局类型定义
 * 定义网站中使用的所有数据类型
 */

export interface AIKnowledgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  htmlUrl?: string;
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
