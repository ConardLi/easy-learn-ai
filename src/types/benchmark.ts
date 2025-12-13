/**
 * AI 基准测试相关类型定义
 */

export interface Benchmark {
  name: string;
  type: string[];
  description: string;
  benchmarkPaper: string;
  codeRepository: string;
  dataset: string;
  numberOfExamples: number | string;
  license: string;
  year: number | string;
}

export interface BenchmarkFilters {
  searchQuery: string;
  selectedTypes: string[];
  selectedYears: string[];
  selectedLicenses: string[];
}

export type BenchmarkSortOption =
  | "name-asc"
  | "name-desc"
  | "year-desc"
  | "year-asc"
  | "examples-desc"
  | "examples-asc";
