/**
 * 搜索功能的自定义 Hook
 * 提供搜索状态管理和过滤逻辑
 */

import { useState, useMemo } from 'react';
import { DailyReport } from '../types';

export const useSearch = (dailyList: DailyReport[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 搜索过滤逻辑
  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) {
      return dailyList;
    }

    const searchLower = searchTerm.toLowerCase().trim();

    return dailyList.filter((report) => {
      // 按标题搜索
      const titleMatch = report.title.toLowerCase().includes(searchLower);
      
      // 按日期搜索
      const dateMatch = report.date.includes(searchLower);
      
      // 按标签搜索
      const tagMatch = report.tags.some(tag => 
        tag.toLowerCase().includes(searchLower)
      );

      return titleMatch || dateMatch || tagMatch;
    });
  }, [dailyList, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredList,
    hasSearch: searchTerm.trim().length > 0
  };
};
