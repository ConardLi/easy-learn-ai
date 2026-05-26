/**
 * AI 应用页面组件
 * 展示 AI 应用项目卡片列表，支持查看演示和源码
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Tag } from 'lucide-react';
import { aiApplicationData, applicationCategoryColors } from '../data/aiApplicationData';
import { AIApplicationItem } from '../types';

const AIApplication: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [selectedDemo, setSelectedDemo] = useState<AIApplicationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 根据URL参数初始化selectedDemo
  useEffect(() => {
    if (id) {
      const app = aiApplicationData.find(item => item.id === id);
      if (app && app.demoUrl) {
        setSelectedDemo(app);
        setIsLoading(true);
      } else {
        // 如果找不到应用或应用没有demoUrl，重定向到应用列表
        navigate('/ai-application', { replace: true });
      }
    } else {
       setSelectedDemo(null);
       setIsLoading(false);
     }
  }, [id, navigate]);

  const categories = ['全部', ...Array.from(new Set(aiApplicationData.map(item => item.category)))];

  const filteredData = selectedCategory === '全部' 
    ? aiApplicationData 
    : aiApplicationData.filter(item => item.category === selectedCategory);

  const handleDemoClick = (item: AIApplicationItem) => {
    navigate(`/ai-application/${item.id}`);
  };

  const handleCloseDemoClick = () => {
    navigate('/ai-application');
  };

  // 添加ESC键监听，用于返回应用列表
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedDemo) {
        handleCloseDemoClick();
      }
    };

    if (selectedDemo) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedDemo, navigate]);

  const handleGithubClick = (url: string) => {
    window.open(url, '_blank');
  };

  // 如果选中了演示，显示iframe嵌入页面
  if (selectedDemo) {
    return (
      <div className="h-[calc(100vh-4rem)] relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#060607] bg-opacity-80 z-10">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
              <div className="text-lg font-medium text-gray-700">正在加载演示...</div>
              <p className="text-sm text-gray-500 mt-2">{selectedDemo.title}</p>
            </div>
          </div>
        )}
        <iframe
          src={selectedDemo.demoUrl}
          className="w-full h-full border-0"
          title={selectedDemo.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-8">
            AI 应用展示
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            探索各种实用的 AI 应用项目，从概念到实现的完整展示
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((item) => (
            <div
              key={item.id}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Image with Category Tag */}
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Category Tag */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-sm font-medium ${
                  applicationCategoryColors[item.category] || 'bg-gray-500'
                }`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {item.demoUrl && (
                    <button
                      onClick={() => handleDemoClick(item)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      在线演示
                    </button>
                  )}
                  {item.githubUrl && (
                    <button
                      onClick={() => handleGithubClick(item.githubUrl!)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      源码
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">没有找到相关应用</h3>
            <p className="text-gray-500">请尝试选择其他分类</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIApplication;