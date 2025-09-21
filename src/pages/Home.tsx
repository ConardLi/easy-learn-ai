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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-3xl mx-4"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-cyan-500 rounded-3xl shadow-2xl mb-8 mx-auto animate-bounce">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-8 animate-pulse">
            Easy AI
          </h1>

          <div className="relative mb-12">
            <p className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              让 AI 学习更简单
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent blur-sm rounded-lg transform -skew-x-12"></div>
          </div>

          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed">
            聚合最优质的 AI 学习资源，由{" "}
            <span className="font-bold text-purple-600 bg-purple-100 px-3 py-2 rounded-xl">
              code秘密花园 - 花园老师（ConardLi）
            </span>{" "}
            精心打造
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              探索学习模块
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              每个模块都经过精心设计，为你提供最佳的 AI 学习体验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <Link
                key={module.title}
                to={module.path}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 ${
                  module.comingSoon ? "pointer-events-none opacity-75" : ""
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                {module.comingSoon && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    即将上线
                  </div>
                )}

                <div
                  className={`inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r ${module.gradient} rounded-2xl shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                >
                  <div className="text-white">{module.icon}</div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                  {module.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {module.description}
                </p>

                <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                  开始探索
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                </div>

                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${module.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-16 px-4 mt-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-purple-600 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">Easy AI</span>
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            让 AI 学习变得简单有趣，一起探索人工智能的无限可能
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </footer>

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

export default Home;
