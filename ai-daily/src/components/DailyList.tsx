/**
 * 日报列表页面组件
 * 展示所有日报的网格布局，包含加载状态和错误状态处理
 * 新增分页功能、搜索功能和 iframe 同步功能
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Newspaper, Loader2, AlertCircle, RefreshCw, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useDailyList } from '../hooks/useDailyData';
import { useSearch } from '../hooks/useSearch';
import { useIframeSync } from '../hooks/useIframeSync';
import { DailyCard } from './DailyCard';
import { SearchBar } from './SearchBar';

const ITEMS_PER_PAGE = 12; // 每页显示12个日报

export const DailyList: React.FC = () => {
  const { dailyList, loading, error } = useDailyList();
  const { searchTerm, setSearchTerm, filteredList, hasSearch } = useSearch(dailyList);
  const { isInIframe, syncToParent } = useIframeSync();
  const [currentPage, setCurrentPage] = useState(1);

  // 计算分页数据
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredList.slice(startIndex, endIndex);
  }, [filteredList, currentPage]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 在 iframe 环境下同步分页状态到父页面
    if (isInIframe) {
      const params = { 
        page: 'list',
        currentPage: page.toString(),
        ...(hasSearch && { search: searchTerm })
      };
      syncToParent(`/?page=${page}${hasSearch ? `&search=${encodeURIComponent(searchTerm)}` : ''}`, params);
    }
  };

  // 搜索时重置到第一页
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);

    // 在 iframe 环境下同步搜索状态到父页面
    if (isInIframe) {
      const params = { 
        page: 'list',
        currentPage: '1',
        ...(value && { search: value })
      };
      const searchQuery = value ? `search=${encodeURIComponent(value)}` : '';
      syncToParent(`/?${searchQuery}`, params);
    }
  };

  // 初始状态同步到父页面
  useEffect(() => {
    if (isInIframe && !loading && dailyList.length > 0) {
      const params = { 
        page: 'list',
        total: dailyList.length.toString(),
        currentPage: currentPage.toString(),
        ...(hasSearch && { search: searchTerm })
      };
      const query = new URLSearchParams();
      if (currentPage > 1) query.set('page', currentPage.toString());
      if (hasSearch) query.set('search', searchTerm);
      
      const queryString = query.toString();
      syncToParent(`/${queryString ? `?${queryString}` : ''}`, params);
    }
  }, [isInIframe, loading, dailyList.length, currentPage, hasSearch, searchTerm, syncToParent]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-gray-600">正在加载日报列表...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-500" size={32} />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">加载失败</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 mx-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={16} />
            重新加载
          </button>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <p><strong>调试信息：</strong></p>
            <p>请检查浏览器控制台(F12)查看详细错误信息</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Newspaper className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 日报
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            探索人工智能的最新动态，获取行业前沿资讯和深度分析
          </p>
        </div>

        {/* 搜索栏 */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        {/* 统计信息 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
            {hasSearch ? (
              <>
                <Search size={16} className="text-blue-600" />
                <span className="text-sm text-gray-600">
                  找到 <strong className="text-blue-600">{filteredList.length}</strong> 篇相关日报
                  <span className="text-gray-400 ml-2">
                    (共 {dailyList.length} 篇)
                  </span>
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-600">
                共 <strong className="text-blue-600">{dailyList.length}</strong> 篇日报
              </span>
            )}
          </div>
        </div>

        {/* 日报列表 */}
        {filteredList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedData.map((report) => (
                <DailyCard key={report.date} report={report} />
              ))}
            </div>

            {/* 分页组件 */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  上一页
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // 显示策略：当前页前后各2页
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      (page === currentPage - 3 && currentPage > 4) ||
                      (page === currentPage + 3 && currentPage < totalPages - 3)
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-400">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  下一页
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          // 搜索无结果状态
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {hasSearch ? '未找到相关日报' : '暂无日报'}
            </h3>
            <p className="text-gray-500 mb-4">
              {hasSearch 
                ? `没有找到包含 "${searchTerm}" 的日报，请尝试其他关键词`
                : '请稍后再来查看最新的 AI 日报内容'
              }
            </p>
            {hasSearch && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                清除搜索条件
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};