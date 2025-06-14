import React from 'react';
import { Grid, List } from 'lucide-react';
import { AITool, SearchResult } from '../../types/navigation';
import ToolCard from './ToolCard';
import Pagination from './Pagination';
import { usePagination } from '../../hooks/useNavigationData';

interface ToolListProps {
  tools: AITool[] | SearchResult[];
  title: string;
  showCategory?: boolean;
  emptyMessage?: string;
}

const ToolList: React.FC<ToolListProps> = ({ 
  tools, 
  title, 
  showCategory = false,
  emptyMessage = "暂无工具"
}) => {
  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination(tools, 30);

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  if (tools.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Grid className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-600 mb-2">{emptyMessage}</h3>
        <p className="text-sm text-gray-400">尝试其他搜索关键词或浏览不同分类</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 工具列表头部 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-1">
              共找到 <span className="font-semibold text-orange-600">{tools.length}</span> 个工具
              {totalPages > 1 && (
                <span className="ml-2">
                  第 {currentPage} / {totalPages} 页
                </span>
              )}
            </p>
          </div>
          
          {/* 视图切换 */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200
                         ${viewMode === 'grid' 
                           ? 'bg-white text-orange-600 shadow-sm' 
                           : 'text-gray-500 hover:text-gray-700'
                         }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200
                         ${viewMode === 'list' 
                           ? 'bg-white text-orange-600 shadow-sm' 
                           : 'text-gray-500 hover:text-gray-700'
                         }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 工具网格 */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
          : 'space-y-4'
        }
      `}>
        {currentItems.map((tool, index) => (
          <ToolCard
            key={`${tool.title}-${index}`}
            tool={tool}
            category={showCategory && 'category' in tool ? (tool as SearchResult).category : undefined}
            showCategory={showCategory}
          />
        ))}
      </div>

      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

export default ToolList;
