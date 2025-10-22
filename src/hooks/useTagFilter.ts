/**
 * 标签筛选功能的自定义 Hook
 * 提供标签筛选功能，支持多标签选择
 */

import { useState, useMemo } from 'react';
import { DailyReport } from '../types/daily';

export const useTagFilter = (dailyList: DailyReport[]) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 获取所有可用标签（去重并排序）
  const allTags = useMemo(() => {
    const tagMap = new Map<string, string>();
    dailyList.forEach(item => {
      item.tags.forEach(tag => {
        const trimmedTag = tag.trim();
        if (trimmedTag !== '') {
          // 使用标准化的key进行去重（去除空格、转小写）
          const normalizedKey = trimmedTag.replace(/\s+/g, '').toLowerCase();
          // 如果还没有这个标签，或者当前标签更规范（没有多余空格），则使用当前标签
          if (!tagMap.has(normalizedKey) || trimmedTag.length < tagMap.get(normalizedKey)!.length) {
            tagMap.set(normalizedKey, trimmedTag);
          }
        }
      });
    });
    return Array.from(tagMap.values()).sort();
  }, [dailyList]);

  // 根据选中的标签筛选日报
  const filteredByTags = useMemo(() => {
    if (selectedTags.length === 0) {
      return dailyList;
    }

    return dailyList.filter(item => 
      selectedTags.some(selectedTag => 
        item.tags.includes(selectedTag)
      )
    );
  }, [dailyList, selectedTags]);

  // 添加标签到筛选列表
  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  // 从筛选列表中移除标签
  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // 切换标签选择状态
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      removeTag(tag);
    } else {
      addTag(tag);
    }
  };

  // 清除所有选中的标签
  const clearTags = () => {
    setSelectedTags([]);
  };

  const hasTagFilter = selectedTags.length > 0;

  return {
    selectedTags,
    allTags,
    filteredByTags,
    hasTagFilter,
    addTag,
    removeTag,
    toggleTag,
    clearTags,
    setSelectedTags
  };
};