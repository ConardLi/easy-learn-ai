/**
 * 应用的类型定义
 * 包含日报数据结构和API响应类型
 */

export interface DailyReport {
  date: string;
  title: string;
  tags: string[];
}

export interface DailyListResponse extends Array<DailyReport> {}
