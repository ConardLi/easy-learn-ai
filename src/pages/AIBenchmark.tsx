/**
 * AI 基准测试页面
 * 展示和检索 AI 基准测试数据
 */

import React from "react";
import { Award } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useBenchmarkData } from "../hooks/useBenchmarkData";
import { SearchBar } from "../components/benchmark/SearchBar";
import { FilterPanel } from "../components/benchmark/FilterPanel";
import { BenchmarkList } from "../components/benchmark/BenchmarkList";
import { StatsBar } from "../components/benchmark/StatsBar";
import { SortSelector } from "../components/benchmark/SortSelector";

const AIBenchmark: React.FC = () => {
  const {
    benchmarks,
    totalCount,
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
  } = useBenchmarkData();

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <Award className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            AI 基准测试正在加载
          </div>
          <div className="text-gray-500">正在获取最新的基准测试数据...</div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">加载失败</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* 统计信息栏 */}
        <div className="mb-8">
          <StatsBar
            totalCount={totalCount}
            filteredCount={benchmarks.length}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* 工具栏 */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* 搜索栏 */}
            <SearchBar
              value={filters.searchQuery}
              onChange={(value) => updateFilters({ searchQuery: value })}
            />

            {/* 筛选器 */}
            <FilterPanel
              filters={filters}
              allTypes={allTypes}
              allYears={allYears}
              allLicenses={allLicenses}
              onFilterChange={updateFilters}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              totalCount={totalCount}
              filteredCount={benchmarks.length}
            />

            {/* 排序选择器 */}
            <SortSelector value={sortOption} onChange={setSortOption} />
          </div>

          {/* 已选筛选条件显示 */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  已选条件：
                </span>
                {filters.selectedTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {type}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedTypes: filters.selectedTypes.filter(
                            (t) => t !== type
                          ),
                        })
                      }
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.selectedYears.map((year) => (
                  <span
                    key={year}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {year}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedYears: filters.selectedYears.filter(
                            (y) => y !== year
                          ),
                        })
                      }
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.selectedLicenses.map((license) => (
                  <span
                    key={license}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {license}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedLicenses: filters.selectedLicenses.filter(
                            (l) => l !== license
                          ),
                        })
                      }
                      className="hover:bg-green-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  清除所有
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <BenchmarkList
          benchmarks={benchmarks}
          loading={loading}
          error={error}
        />
      </div>

      {/* Toast 通知 */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default AIBenchmark;
