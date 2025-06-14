import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  useNavigationData,
  useNavigationSearch,
} from "../hooks/useNavigationData";
import CategoryNav from "../components/navigation/CategoryNav";
import SearchBar from "../components/navigation/SearchBar";
import ToolList from "../components/navigation/ToolList";

const AINavigation: React.FC = () => {
  const { data, loading, error } = useNavigationData();
  const navigate = useNavigate();
  const location = useLocation();
  
  // 从URL参数中获取初始状态
  const getInitialStateFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return {
      category: params.get("category"),
      query: params.get("query") || ""
    };
  };
  
  const initialState = getInitialStateFromUrl();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialState.category);
  const { searchQuery, setSearchQuery, searchResults, hasResults } =
    useNavigationSearch(data, initialState.query);

  // 更新URL参数
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.set("category", selectedCategory);
    }
    if (searchQuery) {
      params.set("query", searchQuery);
    }
    
    const newSearch = params.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    
    // 使用replace而不是push，避免创建过多历史记录
    navigate(newUrl, { replace: true });
  }, [selectedCategory, searchQuery, navigate, location.pathname]);

  // 获取当前显示的工具列表
  const getCurrentTools = () => {
    if (hasResults) {
      return searchResults;
    }

    if (selectedCategory) {
      return data[selectedCategory] || [];
    }

    // 返回所有工具
    return Object.values(data).reduce((acc, tools) => acc.concat(tools), []);
  };

  // 获取当前显示的标题
  const getCurrentTitle = () => {
    if (hasResults) {
      return `搜索结果 "${searchQuery}"`;
    }

    if (selectedCategory) {
      return selectedCategory;
    }

    return "全部 AI 工具";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">正在加载 AI 工具...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">加载失败</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white 
                     rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  const currentTools = getCurrentTools();
  const currentTitle = getCurrentTitle();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧分类导航 */}
          <div className="lg:w-80 flex-shrink-0">
            <CategoryNav
              data={data}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 space-y-6">
            {/* 搜索栏 */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="搜索 AI 工具名称或描述..."
            />

            {/* 工具列表 */}
            <ToolList
              tools={currentTools}
              title={currentTitle}
              showCategory={hasResults}
              emptyMessage={
                hasResults
                  ? `没有找到包含 "${searchQuery}" 的工具`
                  : selectedCategory
                  ? `${selectedCategory} 分类下暂无工具`
                  : "暂无工具数据"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINavigation;
