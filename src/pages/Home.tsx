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
  TrendingUp,
  Award,
  BookOpen,
  Github,
  Star,
  Clock,
  Cpu,
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
    title: "AI 模型",
    description: "汇聚全球主流 AI 大模型，多维度对比分析",
    icon: <Cpu className="w-8 h-8" />,
    path: "/ai-model",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "AI 基准",
    description: "全球主流 AI 基准测试，评估大模型各项能力",
    icon: <Award className="w-8 h-8" />,
    path: "/ai-benchmark",
    gradient: "from-amber-500 to-orange-500",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* 顶部渐变装饰 */}
      <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50/40 via-purple-50/30 to-transparent pointer-events-none"></div>

      {/* 动态光效 */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-400/15 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute top-40 right-[15%] w-[400px] h-[400px] bg-gradient-to-br from-purple-400/15 to-pink-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* 徽章标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-200/50 rounded-full backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">
                专业 AI 学习平台
              </span>
            </div>

            {/* 主标题 */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
                <span className="block bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Easy Learn AI
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  让 AI 学习更简单
                </span>
              </h1>
            </div>

            {/* 描述 */}
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {/* 聚合最优质的 AI
              学习资源，提供互动式学习体验、每日精选资讯、系统化教程和实用工具导航
              <br /> */}
              <span className="inline-flex items-center gap-2 mt-2 text-purple-600 font-semibold">
                <span>由 code秘密花园 - ConardLi 精心打造</span>
              </span>
            </p>

            {/* CTA 按钮 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/ai-knowledge"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
              >
                <span>开始学习</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://github.com/ConardLi/easy-learn-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:border-gray-300 hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>

            {/* 数据展示 */}
            {/* <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
              <div className="flex items-center gap-2 text-gray-600">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium">8+ 学习模块</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium">每日更新</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-pink-600" />
                <span className="text-sm font-medium">精选优质内容</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                核心功能
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              探索学习模块
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              每个模块都经过精心设计，为你提供最佳的 AI 学习体验
            </p>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module, index) => (
              <Link
                key={module.title}
                to={module.path}
                className={`group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${
                  module.comingSoon ? "pointer-events-none opacity-60" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 顶部渐变线 */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                ></div>

                {module.comingSoon && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-10">
                    即将上线
                  </div>
                )}

                {/* Icon */}
                <div className="mb-5">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${module.gradient} rounded-xl shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <div className="text-white">{module.icon}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {module.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                    {module.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-gray-400 group-hover:text-purple-600 font-medium pt-2 transition-colors duration-300">
                    <span className="text-sm">了解更多</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>

                {/* Hover Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300 pointer-events-none`}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择 Easy AI？
            </h2>
            <p className="text-lg text-gray-600">
              我们致力于打造最优质的 AI 学习体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">互动式学习</h3>
              <p className="text-gray-600 leading-relaxed">
                通过可视化和互动演示，让复杂的 AI 概念变得简单易懂
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl">
                <Newspaper className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">每日更新</h3>
              <p className="text-gray-600 leading-relaxed">
                精选最新的 AI 行业动态和技术趋势，保持你的知识领先
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl">
                <Award className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">精选内容</h3>
              <p className="text-gray-600 leading-relaxed">
                由经验丰富的技术专家精心策划，确保内容质量和实用性
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 px-4 mt-20 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                  <img src="/imgs/icon.png" alt="Easy AI" className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold">Easy AI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                让 AI 学习变得简单有趣，一起探索人工智能的无限可能
              </p>
              <a
                href="https://github.com/ConardLi/easy-learn-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Star on GitHub</span>
                <Star className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">快速导航</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/ai-knowledge"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    AI 知视
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-daily"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    AI 日报
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-tutorial"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    AI 教程
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai-navigation"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    AI 导航
                  </Link>
                </li>
              </ul>
            </div>

            {/* About */}
            <div className="md:col-span-1">
              <h3 className="text-white font-semibold mb-4">关于我们</h3>
              <ul className="space-y-2.5">
                <li className="text-gray-400 text-sm">
                  由 code秘密花园 精心打造
                </li>
                <li className="text-gray-400 text-sm">作者：ConardLi</li>
                <li>
                  <Link
                    to="/knowledge-planet"
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    加入知识星球
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Easy AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <span className="text-gray-500 text-xs">
                  Made with ❤️ for AI learners
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
