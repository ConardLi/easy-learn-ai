/**
 * 筛选区域组件
 * 包含搜索框、领域筛选、年份筛选、时间排序和重置功能
 * 使用 jotai 管理筛选状态，实现响应式筛选
 */
import React from 'react';
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

export const FilterSection: React.FC = () => {
  const [domainFilter, setDomainFilter] = useAtom(domainFilterAtom);
  const [yearFilter, setYearFilter] = useAtom(yearFilterAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  
  const uniqueDomains = useAtomValue(uniqueDomainsAtom);
  const uniqueYears = useAtomValue(uniqueYearsAtom);

  const resetFilters = () => {
    setDomainFilter('');
    setYearFilter('');
    setSearchQuery('');
    setSortOrder('desc'); // 重置为默认倒序
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc');
  };

  const getSortIcon = () => {
    if (sortOrder === 'desc') {
      return <ArrowDown className="w-4 h-4" />;
    } else {
      return <ArrowUp className="w-4 h-4" />;
    }
  };

  const getSortText = () => {
    return sortOrder === 'desc' ? '时间倒序' : '时间正序';
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Filter Icon & Title */}
          <div className="flex items-center space-x-3 mr-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-700">智能筛选</span>
          </div>
          
          {/* Search Box */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索 AI 事件、技术或公司..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm border-2 border-transparent rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center space-x-3">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
            >
              <option value="">全部领域</option>
              {uniqueDomains.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
            
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-all duration-300"
            >
              <option value="">全部年份</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>{year} 年</option>
              ))}
            </select>

            {/* 排序控件 */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSortOrder}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
            >
              {getSortIcon()}
              <span>{getSortText()}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetFilters}
              className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-700 hover:text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>重置</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};