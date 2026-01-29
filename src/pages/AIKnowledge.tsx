/**
 * AI 知视页面组件
 * 展示 AI 学习资源卡片列表，支持点击查看详情
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Search, X } from "lucide-react";
import { aiKnowledgeData, categoryColors } from "../data/aiKnowledgeData";
import { AIKnowledgeItem } from "../types";

const AIKnowledge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    "全部",
    ...Array.from(new Set(aiKnowledgeData.map((item) => item.category))),
  ];

  const filteredData = aiKnowledgeData.filter((item) => {
    const matchesCategory =
      selectedCategory === "全部" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (item: AIKnowledgeItem) => {
    navigate(`/ai-knowledge/${item.id}`, { state: { item } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Simplified Header - 去掉图标 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-8">
            让你更简单的理解 AI
          </h1>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-10 relative group z-10">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索 AI 概念、技术..."
                className="w-full px-6 py-4 pl-14 rounded-full bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all text-gray-700 placeholder-gray-400 text-lg"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Knowledge Cards Grid - 优化为4列布局，卡片更小 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 overflow-hidden"
            >
              {/* Image with Category Tag */}
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-36 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Category Tag - 移到右上角 */}
                <div
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-xs font-medium ${
                    categoryColors[item.category] || "bg-gray-500"
                  }`}
                >
                  {item.category}
                </div>

                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Play className="w-3 h-3 text-purple-600" />
                </div>
              </div>

              {/* Content - 简化版本 */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2 flex items-center flex-wrap">
                  {item.title.startsWith("轻松理解") ? (
                    <>
                      <span className="inline-flex items-center mr-1.5 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-md">
                        轻松理解
                      </span>
                      <span className="inline-flex items-center">
                        {item.title.substring(4)}
                      </span>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>

                {/* Description */}
                <p className="text-gray-600 line-clamp-2 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">
              没有找到相关资源
            </h3>
            <p className="text-gray-500">请尝试搜索其他关键词或选择其他分类</p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-6 px-6 py-2 bg-purple-100 text-purple-600 rounded-full font-medium hover:bg-purple-200 transition-colors"
              >
                清除搜索
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIKnowledge;
