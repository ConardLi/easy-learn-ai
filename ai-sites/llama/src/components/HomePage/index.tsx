/**
 * 首页组件
 * 提供 LLaMA 概念的简介和各个学习模块的入口
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Network, Play, Clock, BarChart3, ChevronRight, Sparkles } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Network,
      title: '架构可视化',
      description: '交互式探索 LLaMA 的 Decoder-Only 架构',
      path: '/architecture',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Play,
      title: '数据流动画',
      description: '观看数据在模型中的处理流程',
      path: '/dataflow',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Clock,
      title: '发展历程',
      description: '了解从 LLaMA-1 到 LLaMA-3 的演进',
      path: '/evolution',
      color: 'from-green-500 to-teal-500',
    },
    {
      icon: BarChart3,
      title: '参数对比',
      description: '直观对比不同版本的模型参数',
      path: '/comparison',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-yellow-500" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                LLaMA 模型学习
              </h1>
              <Sparkles className="h-8 w-8 text-yellow-500" />
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              通过交互式可视化深入理解 Meta 的大型语言模型 LLaMA
            </p>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">什么是 LLaMA？</h3>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">Decoder-Only 架构</h4>
                  <p className="text-gray-600 text-sm">基于 Transformer 的纯解码器架构，专注于文本生成任务</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">大规模预训练</h4>
                  <p className="text-gray-600 text-sm">在海量文本数据上训练，具备强大的语言理解和生成能力</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-gray-800">开源优势</h4>
                  <p className="text-gray-600 text-sm">开源模型促进了整个 AI 社区的发展和创新</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">开始你的学习之旅</h2>
            <p className="text-gray-600">选择一个模块深入了解 LLaMA 模型</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link to={feature.path}>
                    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300">
                        <span>开始学习</span>
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8">LLaMA 发展概览</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-white/80">主要版本</div>
                <div className="text-sm text-white/60 mt-2">LLaMA-1, 2, 3</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">400B+</div>
                <div className="text-white/80">最大参数量</div>
                <div className="text-sm text-white/60 mt-2">LLaMA-3 系列</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl font-bold mb-2">15T</div>
                <div className="text-white/80">训练数据</div>
                <div className="text-sm text-white/60 mt-2">LLaMA-3 tokens</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;