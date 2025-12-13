/**
 * 基准测试筛选面板组件
 * 风格参考 Model FilterPanel
 */

import React, { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import { BenchmarkFilters } from "../../types/benchmark";

interface FilterPanelProps {
  filters: BenchmarkFilters;
  allTypes: string[];
  allYears: string[];
  allLicenses: string[];
  onFilterChange: (filters: Partial<BenchmarkFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
  filteredCount: number;
}

const FilterSection = ({
  title,
  items,
  selectedItems,
  onToggle,
  isExpanded,
  onExpandToggle,
  defaultLimit = 20,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  defaultLimit?: number;
}) => {
  const [showAll, setShowAll] = useState(false);
  const hasMore = items.length > defaultLimit;
  const displayItems = showAll ? items : items.slice(0, defaultLimit);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onExpandToggle}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-800 text-sm">
          {title}{" "}
          {selectedItems.length > 0 && (
            <span className="text-blue-600">({selectedItems.length})</span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {displayItems.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggle(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-50 border-blue-200 text-blue-700"
                      : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {item}
                  {isSelected && <Check className="w-3 h-3" />}
                </button>
              );
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {showAll ? (
                <>
                  收起 <ChevronUp className="w-3 h-3" />
                </>
              ) : (
                <>
                  查看更多 ({items.length - defaultLimit}){" "}
                  <ChevronDown className="w-3 h-3" />
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  allTypes,
  allYears,
  allLicenses,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  totalCount,
  filteredCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    year: true,
    license: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter((t) => t !== type)
      : [...filters.selectedTypes, type];
    onFilterChange({ selectedTypes: newTypes });
  };

  const handleYearToggle = (year: string) => {
    const newYears = filters.selectedYears.includes(year)
      ? filters.selectedYears.filter((y) => y !== year)
      : [...filters.selectedYears, year];
    onFilterChange({ selectedYears: newYears });
  };

  const handleLicenseToggle = (license: string) => {
    const newLicenses = filters.selectedLicenses.includes(license)
      ? filters.selectedLicenses.filter((l) => l !== license)
      : [...filters.selectedLicenses, license];
    onFilterChange({ selectedLicenses: newLicenses });
  };

  return (
    <div className="relative">
      {/* 筛选按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
          hasActiveFilters
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
            : "bg-white border border-gray-200 text-gray-700 hover:border-blue-300"
        }`}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm">筛选</span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
            {filters.selectedTypes.length +
              filters.selectedYears.length +
              filters.selectedLicenses.length}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* 筛选面板 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[320px] md:w-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden flex flex-col">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h3 className="font-bold text-gray-800">筛选条件</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {filteredCount} / {totalCount} 个基准测试
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                清除
              </button>
            )}
          </div>

          {/* 筛选内容 */}
          <div className="overflow-y-auto flex-1">
            <FilterSection
              title="类型"
              items={allTypes}
              selectedItems={filters.selectedTypes}
              onToggle={handleTypeToggle}
              isExpanded={expandedSections.type}
              onExpandToggle={() => toggleSection("type")}
            />

            <FilterSection
              title="年份"
              items={allYears}
              selectedItems={filters.selectedYears}
              onToggle={handleYearToggle}
              isExpanded={expandedSections.year}
              onExpandToggle={() => toggleSection("year")}
            />

            <FilterSection
              title="许可证"
              items={allLicenses}
              selectedItems={filters.selectedLicenses}
              onToggle={handleLicenseToggle}
              isExpanded={expandedSections.license}
              onExpandToggle={() => toggleSection("license")}
            />
          </div>

          {/* 底部按钮 */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              确定
            </button>
          </div>
        </div>
      )}

      {/* 点击外部关闭 */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};
