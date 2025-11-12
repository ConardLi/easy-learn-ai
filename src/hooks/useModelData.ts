/**
 * 模型数据管理的自定义 Hook
 * 封装模型列表数据获取、搜索、筛选、排序和分组逻辑
 */

import { useState, useEffect, useMemo } from 'react';
import { AIModel, SortOption, GroupByOption, ModelFilters } from '../types/model';
import { modelApiUtils } from '../utils/modelApi';
import toast from 'react-hot-toast';

/**
 * Hook: 获取模型列表
 */
export const useModelList = () => {
  const [modelList, setModelList] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModelList = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('开始获取模型列表...');
        
        const data = await modelApiUtils.fetchModelList();
        console.log('获取到模型数据:', data.length, '个模型');
        
        setModelList(data);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error('Failed to load model list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModelList();
  }, []);

  return { modelList, loading, error };
};

/**
 * Hook: 模型搜索和筛选
 */
export const useModelFilters = (modelList: AIModel[]) => {
  const [filters, setFilters] = useState<ModelFilters>({
    searchQuery: '',
    selectedCompanies: [],
    selectedTags: [],
    selectedOpenSourceStatus: [],
  });

  // 获取所有公司列表
  const allCompanies = useMemo(() => {
    const companies = new Set<string>();
    modelList.forEach(model => companies.add(model.company));
    return Array.from(companies).sort();
  }, [modelList]);

  // 获取所有标签列表
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    modelList.forEach(model => {
      model.modelTags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [modelList]);

  // 获取所有开源状态
  const allOpenSourceStatuses = useMemo(() => {
    return ['开源', '闭源'];
  }, []);

  // 应用筛选
  const filteredModels = useMemo(() => {
    let result = [...modelList];

    // 搜索过滤
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(model =>
        model.modelName.toLowerCase().includes(query) ||
        model.company.toLowerCase().includes(query) ||
        model.description.toLowerCase().includes(query) ||
        model.modelTags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // 公司过滤
    if (filters.selectedCompanies.length > 0) {
      result = result.filter(model => 
        filters.selectedCompanies.includes(model.company)
      );
    }

    // 标签过滤
    if (filters.selectedTags.length > 0) {
      result = result.filter(model =>
        filters.selectedTags.some(tag => model.modelTags.includes(tag))
      );
    }

    // 开源状态过滤
    if (filters.selectedOpenSourceStatus.length > 0) {
      result = result.filter(model =>
        filters.selectedOpenSourceStatus.includes(model.openSourceStatus)
      );
    }

    // 上下文窗口过滤
    if (filters.minContextWindow !== undefined) {
      result = result.filter(model => model.contextWindow >= filters.minContextWindow!);
    }
    if (filters.maxContextWindow !== undefined) {
      result = result.filter(model => model.contextWindow <= filters.maxContextWindow!);
    }

    return result;
  }, [modelList, filters]);

  const updateFilters = (updates: Partial<ModelFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCompanies: [],
      selectedTags: [],
      selectedOpenSourceStatus: [],
    });
  };

  const hasActiveFilters = 
    filters.searchQuery.trim() !== '' ||
    filters.selectedCompanies.length > 0 ||
    filters.selectedTags.length > 0 ||
    filters.selectedOpenSourceStatus.length > 0 ||
    filters.minContextWindow !== undefined ||
    filters.maxContextWindow !== undefined;

  return {
    filters,
    filteredModels,
    allCompanies,
    allTags,
    allOpenSourceStatuses,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
};

/**
 * Hook: 模型排序
 */
export const useModelSort = (models: AIModel[]) => {
  const [sortOption, setSortOption] = useState<SortOption>('releaseDate-desc');

  const sortedModels = useMemo(() => {
    const result = [...models];

    switch (sortOption) {
      case 'releaseDate-desc':
        return result.sort((a, b) => 
          new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
        );
      case 'releaseDate-asc':
        return result.sort((a, b) => 
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
        );
      case 'contextWindow-desc':
        return result.sort((a, b) => b.contextWindow - a.contextWindow);
      case 'contextWindow-asc':
        return result.sort((a, b) => a.contextWindow - b.contextWindow);
      case 'modelName-asc':
        return result.sort((a, b) => a.modelName.localeCompare(b.modelName));
      case 'modelName-desc':
        return result.sort((a, b) => b.modelName.localeCompare(a.modelName));
      default:
        return result;
    }
  }, [models, sortOption]);

  return {
    sortOption,
    setSortOption,
    sortedModels,
  };
};

/**
 * Hook: 模型分组
 */
export const useModelGroup = (models: AIModel[], groupBy: GroupByOption) => {
  const groupedModels = useMemo(() => {
    if (groupBy === 'none') {
      return { '所有模型': models };
    }

    const groups: Record<string, AIModel[]> = {};

    models.forEach(model => {
      let groupKey: string;

      switch (groupBy) {
        case 'company':
          groupKey = model.company;
          break;
        case 'openSourceStatus':
          groupKey = model.openSourceStatus;
          break;
        case 'tag':
          // 对于标签分组，一个模型可能属于多个组
          model.modelTags.forEach(tag => {
            if (!groups[tag]) {
              groups[tag] = [];
            }
            groups[tag].push(model);
          });
          return;
        default:
          groupKey = '未分类';
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(model);
    });

    return groups;
  }, [models, groupBy]);

  return groupedModels;
};
