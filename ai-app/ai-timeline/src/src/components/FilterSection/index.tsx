/**
 * 筛选区域组件
 * 包含搜索框、领域筛选、年份筛选、时间排序和重置功能
 * 使用 jotai 管理筛选状态，实现响应式筛选
 */
import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, RefreshCw, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { useAtom, useAtomValue } from 'jotai';
import {
  domainFilterAtom,
  yearFilterAtom,
  searchQueryAtom,
  sortOrderAtom,
  uniqueDomainsAtom,
  uniqueYearsAtom,
  SortOrder
} from '../../store/timelineStore';

export const FilterSection: React.FC = React.memo(() => {
  const [domainFilter, setDomainFilter] = useAtom(domainFilterAtom);
  const [yearFilter, setYearFilter] = useAtom(yearFilterAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  
  const uniqueDomains = useAtomValue(uniqueDomainsAtom);
  const uniqueYears = useAtomValue(uniqueYearsAtom);

  // 优化：使用 useCallback 缓存函数
  const resetFilters = useCallback(() => {
    setDomainFilter('');
    setYearFilter('');
    setSearchQuery('');
    setSortOrder('desc');
  }, [setDomainFilter, setYearFilter, setSearchQuery, setSortOrder]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  }, [setSortOrder]);

  // 优化：使用 useMemo 缓存计算结果
  const sortIcon = useMemo(() => {
    return sortOrder === 'desc' ? 
      <ArrowDown className="w-4 h-4" /> : 
      <ArrowUp className="w-4 h-4" />;
  }, [sortOrder]);

  const sortText = useMemo(() => {
    return sortOrder === 'desc' ? '时间倒序' : '时间正序';
  }, [sortOrder]);

  return (
    <section className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Icon & Title */}
          <div className="flex items-center space-x-2 mr-3">
            <div className="w-9 h-9 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Filter className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-gray-700">智能筛选</span>
          </div>
          
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索 AI 事件、技术或公司..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-purple-100 transition-colors duration-200"
            >
              <option value="">全部领域</option>
              {uniqueDomains.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-purple-100 transition-colors duration-200"
            >
              <option value="">全部年份</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>{year} 年</option>
              ))}
            </select>

            {/* 排序控件 - 优化：移除 motion，使用 CSS */}
            <button
              onClick={toggleSortOrder}
              className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-700 hover:bg-purple-600 hover:text-white transition-colors duration-200 flex items-center space-x-1.5"
            >
              {sortIcon}
              <span>{sortText}</span>
            </button>
            
            <button
              onClick={resetFilters}
              className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-xs font-medium text-purple-700 hover:bg-purple-600 hover:text-white transition-colors duration-200 flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>重置</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

FilterSection.displayName = 'FilterSection';