import { useState, useEffect } from 'react';
import { NavigationData, AITool, SearchResult } from '../types/navigation';
import { navigationApiUtils } from '../utils/navigationApi';

export const useNavigationData = () => {
  const [data, setData] = useState<NavigationData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const navigationData = await navigationApiUtils.fetchNavigationData();
        setData(navigationData);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载失败');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};

export const useNavigationSearch = (data: NavigationData, initialQuery: string = '') => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    Object.entries(data).forEach(([category, tools]) => {
      tools.forEach((tool) => {
        if (
          tool.title.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query)
        ) {
          results.push({
            ...tool,
            category,
          });
        }
      });
    });

    setSearchResults(results);
  }, [searchQuery, data]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    hasResults: searchResults.length > 0,
  };
};

export const usePagination = <T>(items: T[], itemsPerPage: number = 30) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    goToPage(currentPage - 1);
  };

  // 重置页码（当items改变时）
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    goToNextPage,
    goToPrevPage,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};
