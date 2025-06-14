/**
 * 搜索功能的自定义 Hook
 * 提供日报搜索功能，支持标题和标签搜索
 */

import { useState, useMemo } from 'react';
import { DailyReport } from '../types/daily';

export const useSearch = (dailyList: DailyReport[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) {
      return dailyList;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    return dailyList.filter(item => 
      item.title.toLowerCase().includes(lowerSearchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }, [dailyList, searchTerm]);

  const hasSearch = Boolean(searchTerm.trim());

  return {
    searchTerm,
    setSearchTerm,
    filteredList,
    hasSearch
  };
};
