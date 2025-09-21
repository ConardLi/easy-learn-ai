/**
 * 空状态组件
 * 展示没有匹配结果时的提示信息
 * 提供清除筛选条件的快捷操作
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { domainFilterAtom, yearFilterAtom, searchQueryAtom } from '../../store/timelineStore';

export const EmptyState: React.FC = () => {
  const setDomainFilter = useSetAtom(domainFilterAtom);
  const setYearFilter = useSetAtom(yearFilterAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);

  const clearFilters = () => {
    setDomainFilter('');
    setYearFilter('');
    setSearchQuery('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-32"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6"
      >
        <Search className="w-12 h-12 text-purple-400" />
      </motion.div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">未找到匹配的事件</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">
        尝试调整搜索关键词或筛选条件，或者清除所有筛选来查看全部事件
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={clearFilters}
        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
      >
        <Filter className="w-4 h-4" />
        <span>清除筛选条件</span>
      </motion.button>
    </motion.div>
  );
};
