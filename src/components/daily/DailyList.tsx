/**
 * 日报列表组件
 * 显示日报列表，包含搜索和分页功能
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Loader2, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { useDailyList } from '../../hooks/useDailyData';
import { useSearch } from '../../hooks/useSearch';
import { SearchBar } from './SearchBar';
import { DailyCard } from './DailyCard';

const ITEMS_PER_PAGE = 10;

export const DailyList: React.FC = () => {
  const navigate = useNavigate();
  const { dailyList, loading, error } = useDailyList();
  const { searchTerm, setSearchTerm, filteredList, hasSearch } = useSearch(dailyList);
  const [currentPage, setCurrentPage] = useState(1);

  // 分页逻辑
  const totalItems = filteredList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(startIndex, endIndex);

  // 处理页面切换
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理搜索
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // 搜索时重置到第一页
  };

  // 处理点击日报卡片
  const handleDailyClick = (date: string) => {
    navigate(`/ai-daily/${date}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600 mx-auto"></div>
            <Sparkles className="w-8 h-8 text-blue-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">AI 日报正在为你准备</div>
          <div className="text-gray-500">正在获取最新的 AI 资讯...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">⚠️</span>
          </div>
          <div className="text-xl font-semibold text-gray-700 mb-2">加载失败</div>
          <div className="text-gray-500 mb-6">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* 顶部背景装饰 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-8">
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed mb-4">
            每日为你精选最新的 AI 行业动态、技术突破和应用案例
          </p>
          
          {/* 统计信息 */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{dailyList.length}</span>
              <span>篇日报</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="font-medium">每日更新</span>
            </div>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </div>

        {/* 搜索结果统计 */}
        {hasSearch && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 backdrop-blur-sm border border-white/50 rounded-full shadow-sm">
              <span className="text-gray-600">
                找到 <span className="font-semibold text-blue-600">{filteredList.length}</span> 篇相关日报
              </span>
            </div>
          </div>
        )}

        {/* 日报列表 */}
        {currentItems.length > 0 ? (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {currentItems.map((daily, index) => (
              <div
                key={daily.date}
                className="transform transition-all duration-300"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <DailyCard
                  daily={daily}
                  onClick={handleDailyClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-6xl">📰</span>
            </div>
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {hasSearch ? '没有找到相关日报' : '暂无日报内容'}
            </div>
            <div className="text-gray-500 max-w-md mx-auto leading-relaxed">
              {hasSearch ? '请尝试其他关键词，或者查看所有日报内容' : '内容正在准备中，敬请期待最新的 AI 行业资讯'}
            </div>
            {hasSearch && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                查看所有日报
              </button>
            )}
          </div>
        )}

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-3">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              上一页
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === pageNum
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-gray-700 bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white hover:shadow-md'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              下一页
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        )}
      </div>

      {/* 底部装饰 */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/50 to-transparent -z-10"></div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
