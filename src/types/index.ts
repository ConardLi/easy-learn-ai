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

export interface AIApplicationItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
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
