/**
 * AI 基准测试 API 工具模块
 * 负责加载和处理基准测试数据
 */

import { Benchmark } from "../types/benchmark";
import benchmarkData from "./bench/bentch.json";

export const benchmarkApiUtils = {
  /**
   * 获取基准测试列表
   */
  async fetchBenchmarkList(): Promise<Benchmark[]> {
    try {
      return benchmarkData as Benchmark[];
    } catch (error) {
      console.error("Error fetching benchmark list:", error);
      throw new Error("获取基准测试列表失败，请稍后重试");
    }
  },

  /**
   * 获取所有类型标签
   */
  getAllTypes(benchmarks: Benchmark[]): string[] {
    const types = new Set<string>();
    benchmarks.forEach((b) => {
      b.type.forEach((t) => types.add(t));
    });
    return Array.from(types).sort();
  },

  /**
   * 获取所有年份
   */
  getAllYears(benchmarks: Benchmark[]): string[] {
    const years = new Set<string>();
    benchmarks.forEach((b) => {
      if (b.year && b.year !== "n/a") {
        years.add(String(b.year));
      }
    });
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  },

  /**
   * 获取所有许可证
   */
  getAllLicenses(benchmarks: Benchmark[]): string[] {
    const licenses = new Set<string>();
    benchmarks.forEach((b) => {
      if (b.license && b.license !== "see dataset page") {
        licenses.add(b.license);
      }
    });
    return Array.from(licenses).sort();
  },
};
