/**
 * AI 基准测试数据管理 Hook
 * 负责数据加载、筛选、排序和搜索
 */

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Benchmark,
  BenchmarkFilters,
  BenchmarkSortOption,
} from "../types/benchmark";
import { benchmarkApiUtils } from "../utils/benchmarkApi";

export const useBenchmarkData = () => {
  const [benchmarks, setBenchmarks] = useState<Benchmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<BenchmarkFilters>({
    searchQuery: "",
    selectedTypes: [],
    selectedYears: [],
    selectedLicenses: [],
  });
  const [sortOption, setSortOption] =
    useState<BenchmarkSortOption>("year-desc");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await benchmarkApiUtils.fetchBenchmarkList();
        setBenchmarks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const allTypes = useMemo(
    () => benchmarkApiUtils.getAllTypes(benchmarks),
    [benchmarks]
  );
  const allYears = useMemo(
    () => benchmarkApiUtils.getAllYears(benchmarks),
    [benchmarks]
  );
  const allLicenses = useMemo(
    () => benchmarkApiUtils.getAllLicenses(benchmarks),
    [benchmarks]
  );

  const filteredBenchmarks = useMemo(() => {
    let result = [...benchmarks];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.description.toLowerCase().includes(query) ||
          b.type.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (filters.selectedTypes.length > 0) {
      result = result.filter((b) =>
        filters.selectedTypes.some((type) => b.type.includes(type))
      );
    }

    if (filters.selectedYears.length > 0) {
      result = result.filter((b) =>
        filters.selectedYears.includes(String(b.year))
      );
    }

    if (filters.selectedLicenses.length > 0) {
      result = result.filter((b) =>
        filters.selectedLicenses.includes(b.license)
      );
    }

    result.sort((a, b) => {
      switch (sortOption) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "year-desc":
          return (Number(b.year) || 0) - (Number(a.year) || 0);
        case "year-asc":
          return (Number(a.year) || 0) - (Number(b.year) || 0);
        case "examples-desc":
          return (
            (Number(b.numberOfExamples) || 0) -
            (Number(a.numberOfExamples) || 0)
          );
        case "examples-asc":
          return (
            (Number(a.numberOfExamples) || 0) -
            (Number(b.numberOfExamples) || 0)
          );
        default:
          return 0;
      }
    });

    return result;
  }, [benchmarks, filters, sortOption]);

  const updateFilters = useCallback((newFilters: Partial<BenchmarkFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      selectedTypes: [],
      selectedYears: [],
      selectedLicenses: [],
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.searchQuery !== "" ||
      filters.selectedTypes.length > 0 ||
      filters.selectedYears.length > 0 ||
      filters.selectedLicenses.length > 0
    );
  }, [filters]);

  return {
    benchmarks: filteredBenchmarks,
    totalCount: benchmarks.length,
    loading,
    error,
    filters,
    sortOption,
    allTypes,
    allYears,
    allLicenses,
    updateFilters,
    clearFilters,
    setSortOption,
    hasActiveFilters,
  };
};
