/**
 * 首页组件
 * 展示网站介绍和各模块的快捷跳转入口
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Newspaper,
  GraduationCap,
  Compass,
  Users,
  Sparkles,
  ArrowRight,
  Zap,
  MessageSquare,
} from "lucide-react";

interface ModuleCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  gradient: string;
  comingSoon?: boolean;
}

const modules: ModuleCard[] = [
  {
    title: "AI 知视",
    description: "精选 AI 学习资源集合，深入学习各种 AI 概念和技术",
    icon: <Brain className="w-8 h-8" />,
    path: "/ai-knowledge",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI 应用",
    description: "展示各种实用的 AI 应用项目，从概念到实现的完整展示",
    icon: <Zap className="w-8 h-8" />,
    path: "/ai-application",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "AI 发展",
    description: "AI 发展关键节点，掌握最新技术趋势",
    icon: <Compass className="w-8 h-8" />,
    path: "/ai-timeline",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI 日报",
    description: "每日精选 AI 行业动态，掌握最新技术趋势",
    icon: <Newspaper className="w-8 h-8" />,
    path: "/ai-daily",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "AI 教程",
    description: "系统化 AI 学习教程，从入门到精通",
    icon: <GraduationCap className="w-8 h-8" />,
    path: "/ai-tutorial",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    title: "AI 导航",
    description: "精选 AI 工具和资源导航",
    icon: <Compass className="w-8 h-8" />,
    path: "/ai-navigation",
    gradient: "from-orange-500 to-red-500",
  },
  {
    title: "AI 提示词",
    description: "精选各种优质的 AI 提示词",
    icon: <MessageSquare className="w-8 h-8" />,
    path: "/ai-prompts",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    title: "知识星球",
    description: "加入我们的付费社群，获得更深入的学习指导",
    icon: <Users className="w-8 h-8" />,
    path: "/knowledge-planet",
    gradient: "from-pink-500 to-rose-500",
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* 现代渐变背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      
      {/* 动态光效 */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Logo 徽章 */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl shadow-purple-500/30 mb-8 relative">
              <Sparkles className="w-10 h-10 text-white" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-3xl blur-xl opacity-50 -z-10"></div>
            </div>

            {/* 主标题 */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Easy AI
              </span>
            </h1>

            {/* 副标题 */}
            <div className="relative inline-block mb-8">
              <p className="text-3xl md:text-4xl font-bold text-gray-800 relative z-10">
                让 AI 学习更简单
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200/40 via-purple-200/40 to-pink-200/40 blur-2xl -z-10 scale-110"></div>
            </div>

            {/* 描述 */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              聚合最优质的 AI 学习资源，由{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                code秘密花园 - 花园老师（ConardLi）
              </span>{" "}
              精心打造
            </p>

            {/* 装饰元素 */}
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              探索学习模块
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              每个模块都经过精心设计，为你提供最佳的 AI 学习体验
            </p>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <Link
                key={module.title}
                to={module.path}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 ${
                  module.comingSoon ? "pointer-events-none opacity-60" : ""
                }`}
              >
                {module.comingSoon && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                    即将上线
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${module.gradient} rounded-2xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-500`}
                  >
                    <div className="text-white">{module.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    {module.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {module.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-purple-600 font-semibold pt-2 group-hover:gap-2 transition-all duration-300">
                    <span className="text-sm">开始探索</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>

                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gray-950 text-white py-20 px-4 mt-32 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Easy AI
            </span>
          </div>
          
          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
            让 AI 学习变得简单有趣，一起探索人工智能的无限可能
          </p>
          
          {/* Divider */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>
          
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © 2025 Easy AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
