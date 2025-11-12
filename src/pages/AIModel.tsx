/**
 * AI 模型页面组件
 * 展示 AI 模型列表，支持搜索、筛选、排序和分组
 */

import React, { useState } from "react";
import { Loader2, Cpu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import {
  useModelList,
  useModelFilters,
  useModelSort,
  useModelGroup,
} from "../hooks/useModelData";
import { SearchBar } from "../components/model/SearchBar";
import { FilterPanel } from "../components/model/FilterPanel";
import { SortSelector } from "../components/model/SortSelector";
import { GroupSelector } from "../components/model/GroupSelector";
import { ModelList } from "../components/model/ModelList";
import { ModelTreeView } from "../components/model/ModelTreeView";
import { ViewToggle, ViewMode } from "../components/model/ViewToggle";
import { StatsBar } from "../components/model/StatsBar";
import { GroupByOption } from "../types/model";

const AIModel: React.FC = () => {
  const { modelList, loading, error } = useModelList();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");

  const {
    filters,
    filteredModels,
    allCompanies,
    allTags,
    allOpenSourceStatuses,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  } = useModelFilters(modelList);

  const { sortOption, setSortOption, sortedModels } =
    useModelSort(filteredModels);
  const groupedModels = useModelGroup(sortedModels, groupBy);

  // 加载状态
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <Cpu className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">
            AI 模型库正在加载
          </div>
          <div className="text-gray-500">正在获取最新的模型信息...</div>
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
        {/* 页面头部 */}
        {/* <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI 模型库
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            汇聚全球主流 AI 大模型，多维度对比分析，助你找到最适合的模型
          </p>
        </div> */}

        {/* 统计信息栏 */}
        <div className="mb-8">
          <StatsBar
            totalCount={modelList.length}
            filteredCount={filteredModels.length}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* 工具栏 */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* 视图切换 */}
            <ViewToggle mode={viewMode} onChange={setViewMode} />

            {/* 搜索栏 */}
            <SearchBar
              value={filters.searchQuery}
              onChange={(value) => updateFilters({ searchQuery: value })}
            />

            {/* 筛选器 */}
            <FilterPanel
              filters={filters}
              allCompanies={allCompanies}
              allTags={allTags}
              allOpenSourceStatuses={allOpenSourceStatuses}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
              totalCount={modelList.length}
              filteredCount={filteredModels.length}
            />

            {/* 卡片视图专属控件 */}
            {viewMode === "card" && (
              <>
                {/* 排序选择器 */}
                <SortSelector value={sortOption} onChange={setSortOption} />

                {/* 分组选择器 */}
                <GroupSelector value={groupBy} onChange={setGroupBy} />
              </>
            )}
          </div>

          {/* 已选筛选条件显示 */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  已选条件：
                </span>
                {filters.selectedCompanies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {company}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedCompanies: filters.selectedCompanies.filter(
                            (c) => c !== company
                          ),
                        })
                      }
                      className="hover:bg-blue-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedTags: filters.selectedTags.filter(
                            (t) => t !== tag
                          ),
                        })
                      }
                      className="hover:bg-purple-200 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.selectedOpenSourceStatus.map((status) => (
                  <span
                    key={status}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                  >
                    {status}
                    <button
                      onClick={() =>
                        updateFilters({
                          selectedOpenSourceStatus:
                            filters.selectedOpenSourceStatus.filter(
                              (s) => s !== status
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
        {viewMode === "card" ? (
          /* 卡片视图 */
          <ModelList
            models={groupedModels}
            showGroupHeaders={groupBy !== "none"}
          />
        ) : (
          /* 树形视图 */
          <ModelTreeView models={sortedModels} />
        )}
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

export default AIModel;
