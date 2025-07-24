// 提示词类型定义
export interface Prompt {
  id: string;
  name: string;
  ai_description: string; // 只保留AI生成的简介
  content: string;
  translations?: Record<string, string>; // 多语言翻译，格式: {"en": "英文翻译", "ja": "日文翻译"}
  interpretation?: string;
  source: string;
  tags: string[];
  category?: string;
  views?: number;
  likes?: number;
  shares?: number;
  created_at: string;
  updated_at: string;
  is_active?: boolean;
}

// 管理员类型定义
export interface Admin {
  id: string;
  username: string;
  email: string;
  role?: string;
  created_at: string;
  updated_at: string;
  last_login_at?: string;
}

// 模型配置类型定义
export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  model: string;
  apiKey: string;
  baseUrl: string;
  temperature: number;
  maxTokens: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// 分页响应类型
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// 搜索筛选参数
export interface SearchFilters {
  search?: string;
  keyword?: string;
  tags?: string[];
  source?: string;
  category?: string;
  page: number;
  pageSize: number;
  limit?: number;
}

// 登录请求
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应
export interface LoginResponse {
  token: string;
  admin: Admin;
}

// AI生成请求
export interface GenerateRequest {
  type: 'description' | 'tags' | 'translation' | 'analysis' | 'all' | 'structured';
  content: string;
  targetLanguage?: string;
}

// AI生成响应
export interface GenerateResponse {
  result: string | string[] | { description: string; tags: string[] } | { description: string; tags: string[]; translation: string; analysis: string };
}