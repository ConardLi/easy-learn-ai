/**
 * AI 日报相关类型定义
 */

export interface DailyReport {
  date: string;
  title: string;
  tags: string[];
}

export interface DailyListResponse extends Array<DailyReport> {}
