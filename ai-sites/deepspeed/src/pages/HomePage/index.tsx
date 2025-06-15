/**
 * 首页组件 - 网站入口页面
 * 提供概览和导航入口
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Cpu, BarChart3, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: '基础概念',
    description: '了解多卡分布式训练的基本原理和常见误解',
    link: '/concept',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'DeepSpeed 简介',
    description: '深入了解微软开发的深度学习优化库',
    link: '/deepspeed',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Stage 对比',
    description: '通过"包饺子"类比理解不同 Stage 的分工模式',
    link: '/stages',
    color: 'from-green-500 to-teal-500'
  },
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: '实际案例',
    description: '查看真实的显存消耗数据和性能对比',
    link: '/case',
    color: 'from-orange-500 to-red-500'
  }
];

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8">
          <Zap className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            DeepSpeed
          </span>
          <br />
          <span className="text-gray-800">学习平台</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          通过直观的动画和交互式图表，轻松理解 DeepSpeed 分布式训练的核心概念。
          从基础原理到实际应用，让复杂的技术变得简单易懂。
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/concept"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            开始学习
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            to="/stages"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-700 font-medium rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Stage 对比演示
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
          >
            <Link
              to={feature.link}
              className="block p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 text-white group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center mt-4 text-blue-500 group-hover:text-blue-600">
                <span className="text-sm font-medium">了解更多</span>
                <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200/50"
      >
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">4</div>
            <div className="text-gray-600">个 Stage 模式</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">50%+</div>
            <div className="text-gray-600">显存节省</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-600 mb-2">∞</div>
            <div className="text-gray-600">模型扩展性</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
