/**
 * 统计信息栏组件
 * 显示基准测试总数、筛选结果等统计信息
 */

import React from "react";
import { Database, Filter as FilterIcon, Sparkles } from "lucide-react";

interface StatsBarProps {
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalCount,
  filteredCount,
  hasActiveFilters,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-blue-100 rounded-xl p-4">
      <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          <span className="text-gray-700">
            共收录 <span className="font-bold text-blue-600">{totalCount}</span>{" "}
            个基准测试
          </span>
        </div>

        {hasActiveFilters && (
          <>
            <div className="w-px h-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <FilterIcon className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">
                筛选结果{" "}
                <span className="font-bold text-purple-600">
                  {filteredCount}
                </span>{" "}
                个
              </span>
            </div>
          </>
        )}

        <div className="w-px h-6 bg-gray-300" />
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-600" />
          <span className="text-gray-700 font-medium">持续更新中...</span>
        </div>
      </div>
    </div>
  );
};
