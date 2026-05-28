/**
 * 基准测试筛选面板 · Mailchimp-Freddie 风
 * 与 model/FilterPanel 同构（只是数据维度不同）
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

const FilterSection: React.FC<{
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string) => void;
  isExpanded: boolean;
  onExpandToggle: () => void;
  defaultLimit?: number;
}> = ({
  title,
  items,
  selectedItems,
  onToggle,
  isExpanded,
  onExpandToggle,
  defaultLimit = 20,
}) => {
  const [showAll, setShowAll] = useState(false);
  const hasMore = items.length > defaultLimit;
  const displayItems = showAll ? items : items.slice(0, defaultLimit);

  return (
    <div className="border-b-2 border-ink/8 last:border-0">
      <button
        onClick={onExpandToggle}
        className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-cream/60 transition-colors"
      >
        <span className="font-display font-extrabold text-[14px] text-ink">
          {title}
          {selectedItems.length > 0 && (
            <span className="ml-2 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-coral text-white border border-ink rounded-full font-mono text-[10px] font-bold align-middle">
              {selectedItems.length}
            </span>
          )}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        ) : (
          <ChevronDown className="w-4 h-4 text-ink/65" strokeWidth={2.5} />
        )}
      </button>

      {isExpanded && (
        <div className="px-5 pb-4">
          <div className="flex flex-wrap gap-1.5">
            {displayItems.map((item) => {
              const isSelected = selectedItems.includes(item);
              return (
                <button
                  key={item}
                  onClick={() => onToggle(item)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-sans font-semibold text-[12px] transition-all duration-200 border-2 ${
                    isSelected
                      ? "bg-coral text-white border-ink"
                      : "bg-white text-ink-secondary border-ink/15 hover:border-ink hover:bg-cream"
                  }`}
                >
                  {item}
                  {isSelected && (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  )}
                </button>
              );
            })}
          </div>

          {hasMore && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 inline-flex items-center gap-1 font-sans font-semibold text-[12px] text-ink-tertiary hover:text-ink underline underline-offset-2"
            >
              {showAll ? (
                <>
                  收起 <ChevronUp className="w-3 h-3" strokeWidth={2.5} />
                </>
              ) : (
                <>
                  查看更多 ({items.length - defaultLimit})
                  <ChevronDown className="w-3 h-3" strokeWidth={2.5} />
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

  const activeCount =
    filters.selectedTypes.length +
    filters.selectedYears.length +
    filters.selectedLicenses.length;

  return (
    <div className="relative">
      {/* 触发按钮 —— stamp 风 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 pl-4 pr-3 py-2.5 rounded-full border-2 border-ink shadow-stamp font-sans font-semibold text-[13px] transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] ${
          hasActiveFilters
            ? "bg-ink text-cream"
            : "bg-white text-ink"
        }`}
      >
        <Filter className="w-4 h-4" strokeWidth={2.5} />
        <span>筛选</span>
        {hasActiveFilters && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-butter text-ink rounded-full font-mono text-[10px] font-bold">
            {activeCount}
          </span>
        )}
        {isOpen ? (
          <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
        ) : (
          <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
        )}
      </button>

      {/* 面板 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-[320px] md:w-[620px] bg-white border-2 border-ink rounded-2xl shadow-stamp-xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
          {/* 头部 */}
          <div className="px-5 py-4 border-b-2 border-ink/10 bg-cream flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-[16px] text-ink leading-none mb-1">
                筛选条件
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                {filteredCount} / {totalCount} 个基准
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 font-sans font-semibold text-[12px] text-ink-tertiary hover:text-ink underline underline-offset-2"
              >
                <X className="w-3 h-3" strokeWidth={2.5} />
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
          <div className="px-5 py-4 border-t-2 border-ink/10 bg-cream">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-ink text-cream rounded-full font-sans font-bold text-[14px] border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              确定
            </button>
          </div>
        </div>
      )}

      {/* 点击外部关闭 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
