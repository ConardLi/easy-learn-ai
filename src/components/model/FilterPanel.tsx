/**
 * 模型筛选面板组件
 * 支持多维度筛选：公司、标签、开源状态
 */

import React, { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ModelFilters } from '../../types/model';

interface FilterPanelProps {
  filters: ModelFilters;
  allCompanies: string[];
  allTags: string[];
  allOpenSourceStatuses: string[];
  onFiltersChange: (filters: Partial<ModelFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  totalCount: number;
  filteredCount: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  allCompanies,
  allTags,
  allOpenSourceStatuses,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  totalCount,
  filteredCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    company: true,
    tag: true,
    openSource: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCompany = (company: string) => {
    const newCompanies = filters.selectedCompanies.includes(company)
      ? filters.selectedCompanies.filter(c => c !== company)
      : [...filters.selectedCompanies, company];
    onFiltersChange({ selectedCompanies: newCompanies });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.selectedTags.includes(tag)
      ? filters.selectedTags.filter(t => t !== tag)
      : [...filters.selectedTags, tag];
    onFiltersChange({ selectedTags: newTags });
  };

  const toggleOpenSourceStatus = (status: string) => {
    const newStatuses = filters.selectedOpenSourceStatus.includes(status)
      ? filters.selectedOpenSourceStatus.filter(s => s !== status)
      : [...filters.selectedOpenSourceStatus, status];
    onFiltersChange({ selectedOpenSourceStatus: newStatuses });
  };

  return (
    <div className="relative">
      {/* 筛选按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
          hasActiveFilters
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
            : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
        }`}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm">筛选</span>
        {hasActiveFilters && (
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">
            {filters.selectedCompanies.length + filters.selectedTags.length + filters.selectedOpenSourceStatus.length}
          </span>
        )}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* 筛选面板 */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[600px] overflow-hidden flex flex-col">
          {/* 头部 */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
            <div>
              <h3 className="font-bold text-gray-800">筛选条件</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {filteredCount} / {totalCount} 个模型
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
            {/* 开源状态筛选 */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('openSource')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800 text-sm">开源状态</span>
                {expandedSections.openSource ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {expandedSections.openSource && (
                <div className="px-4 pb-3 space-y-2">
                  {allOpenSourceStatuses.map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.selectedOpenSourceStatus.includes(status)}
                        onChange={() => toggleOpenSourceStatus(status)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 公司筛选 */}
            <div className="border-b border-gray-100">
              <button
                onClick={() => toggleSection('company')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800 text-sm">
                  公司 {filters.selectedCompanies.length > 0 && `(${filters.selectedCompanies.length})`}
                </span>
                {expandedSections.company ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {expandedSections.company && (
                <div className="px-4 pb-3 space-y-2 max-h-60 overflow-y-auto">
                  {allCompanies.map((company) => (
                    <label
                      key={company}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.selectedCompanies.includes(company)}
                        onChange={() => toggleCompany(company)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {company}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* 标签筛选 */}
            <div>
              <button
                onClick={() => toggleSection('tag')}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-800 text-sm">
                  标签 {filters.selectedTags.length > 0 && `(${filters.selectedTags.length})`}
                </span>
                {expandedSections.tag ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              {expandedSections.tag && (
                <div className="px-4 pb-3 space-y-2 max-h-60 overflow-y-auto">
                  {allTags.map((tag) => (
                    <label
                      key={tag}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
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
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
