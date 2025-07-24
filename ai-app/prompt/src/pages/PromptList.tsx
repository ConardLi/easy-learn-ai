import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  Tag,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { promptsApi } from "../services/api";
import { Prompt, SearchFilters } from "../types";

const PromptList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    page: 1,
    pageSize: 12,
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    totalPages: 0,
  });
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allSources, setAllSources] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isInIframe, setIsInIframe] = useState(false);

  // 检查是否在iframe中
  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // 从URL参数初始化筛选状态
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const source = searchParams.get('source') || undefined;
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const page = parseInt(searchParams.get('page') || '1', 10);
    
    // 批量更新状态，避免多次触发数据加载
    const newFilters = {
      search: search || undefined,
      source,
      page,
      pageSize: 12,
    };
    
    setFilters(newFilters);
    setSelectedTags(tags);
  }, [searchParams]);

  // 监听父页面的参数变化（iframe模式）
  useEffect(() => {
    if (!isInIframe) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'URL_PARAMS_CHANGED') {
        const params = event.data.params;
        const search = params.search || '';
        const source = params.source || undefined;
        const tags = params.tags?.split(',').filter(Boolean) || [];
        const page = parseInt(params.page || '1', 10);
        
        setFilters({
          search: search || undefined,
          source,
          page,
          pageSize: 12,
        });
        setSelectedTags(tags);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [isInIframe]);

  // 更新URL参数
  const updateUrlParams = (newFilters: SearchFilters, newTags: string[]) => {
    const params = new URLSearchParams();
    
    if (newFilters.search) params.set('search', newFilters.search);
    if (newFilters.source) params.set('source', newFilters.source);
    if (newTags.length > 0) params.set('tags', newTags.join(','));
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page.toString());
    
    setSearchParams(params);
    
    // 如果在iframe中，通知父页面更新URL
    if (isInIframe) {
      try {
        window.parent.postMessage({
          type: 'UPDATE_URL_PARAMS',
          params: Object.fromEntries(params.entries())
        }, '*');
      } catch (error) {
        console.warn('无法与父页面通信:', error);
      }
    }
  };

  // 加载提示词列表
  const loadPrompts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await promptsApi.getPrompts({
        ...filters,
        tags: selectedTags,
      });
      setPrompts(response.data);
      setPagination({
        total: response.total,
        page: response.page,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  // 加载筛选选项
  const loadFilterOptions = async () => {
    try {
      const [tags, sources] = await Promise.all([
        promptsApi.getTags(),
        promptsApi.getSources(),
      ]);
      setAllTags(tags);
      setAllSources(sources);
    } catch (err) {
      console.error("加载筛选选项失败:", err);
    }
  };

  useEffect(() => {
    loadFilterOptions();
  }, []);

  // 使用ref来跟踪是否是初始化阶段
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    // 确保在初始化完成后才开始监听状态变化
    if (isInitialized) {
      loadPrompts();
    }
  }, [filters, selectedTags, isInitialized]);
  
  // 初始化完成后设置标志
  useEffect(() => {
    if (!isInitialized && (filters.search !== undefined || filters.source !== undefined || selectedTags.length > 0 || searchParams.toString() === '')) {
      setIsInitialized(true);
      loadPrompts();
    }
  }, [filters, selectedTags, isInitialized, searchParams]);

  // 搜索处理
  const handleSearch = (search: string) => {
    const newFilters = { ...filters, search, page: 1 };
    setFilters(newFilters);
    updateUrlParams(newFilters, selectedTags);
  };

  // 来源筛选
  const handleSourceFilter = (source: string) => {
    const newFilters = {
      ...filters,
      source: source === filters.source ? undefined : source,
      page: 1,
    };
    setFilters(newFilters);
    updateUrlParams(newFilters, selectedTags);
  };

  // 标签筛选
  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    const newFilters = { ...filters, page: 1 };
    setFilters(newFilters);
    updateUrlParams(newFilters, newTags);
  };

  // 分页处理
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    updateUrlParams(newFilters, selectedTags);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 清除所有筛选
  const clearFilters = () => {
    const newFilters = { page: 1, pageSize: 12 };
    setFilters(newFilters);
    setSelectedTags([]);
    updateUrlParams(newFilters, []);
  };

  return (
    <div className="">
      {/* Hero区域 - 全屏无边距设计 */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              🚀 AI提示词库
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto animate-fade-in-delay leading-relaxed">
              发现、分享和使用最优质的AI提示词，让你的AI创作更加高效和精准
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delay-2 mb-12">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 text-white/90 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                ✨ 精选提示词
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 text-white/90 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                🎯 分类齐全
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-8 py-4 text-white/90 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                🔄 持续更新
              </div>
            </div>
            
            {/* 快速搜索 */}
            <div className="max-w-2xl mx-auto animate-fade-in-delay-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索你需要的提示词..."
                  value={filters.search || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch((e.target as HTMLInputElement).value);
                    }
                  }}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl bg-white/90 backdrop-blur-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 搜索和筛选区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-200/50">
          {/* 筛选选项 */}
          <div className="space-y-8">
            {/* 来源筛选 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-600" />
                📂 来源筛选
              </h3>
              <div className="flex flex-wrap gap-3">
                {allSources.map((source) => (
                  <button
                    key={source}
                    onClick={() => handleSourceFilter(source)}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      filters.source === source
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    {source}
                  </button>
                ))}
              </div>
            </div>

            {/* 标签筛选 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-green-600" />
                🏷️ 标签筛选
              </h3>
              <div className="flex flex-wrap gap-3">
                {allTags.slice(0, 20).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                      selectedTags.includes(tag)
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* 清除筛选 */}
            {(filters.search || filters.source || selectedTags.length > 0) && (
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                >
                  🗑️ 清除所有筛选
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 结果统计 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <p className="text-gray-700 text-lg">
            📊 共找到{" "}
            <span className="font-bold text-blue-600 text-xl">
              {pagination.total}
            </span>{" "}
            个精选提示词
          </p>
        </div>
      </div>

      {/* 提示词卡片列表 */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-sm p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadPrompts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        </div>
      ) : prompts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">没有找到匹配的提示词</p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            清除筛选条件
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {prompts.map((prompt) => (
              <Link
                key={prompt.id}
                to={`/prompts/${prompt.id}`}
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group border border-gray-200/50 hover:border-blue-300/50 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    ✨ {prompt.name}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {prompt.ai_description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {prompt.tags.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                      +{prompt.tags.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <span className="flex items-center">
                    📁 {prompt.source}
                  </span>
                  <span className="flex items-center">
                    📅 {new Date(prompt.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 分页 */}
      {pagination.totalPages > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex justify-center items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-3 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => {
              const page = i + 1;
              const isCurrentPage = page === pagination.page;
              const shouldShow =
                page === 1 ||
                page === pagination.totalPages ||
                (page >= pagination.page - 2 && page <= pagination.page + 2);

              if (!shouldShow) {
                if (
                  page === pagination.page - 3 ||
                  page === pagination.page + 3
                ) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-5 py-3 rounded-xl border transition-all duration-200 font-medium ${
                    isCurrentPage
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                      : "border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="p-3 rounded-xl border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptList;
