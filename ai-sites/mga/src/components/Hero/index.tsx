/**
 * 首页展示组件
 * 介绍MGA概念的背景和核心问题
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Database, TrendingDown, AlertTriangle, Lightbulb } from 'lucide-react';

const Hero: React.FC = () => {
  const problems = [
    {
      icon: Database,
      title: '数据稀缺性',
      description: '高质量语料总量有限，公开数据集经严格过滤后仅保留不到10%的原始内容',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingDown,
      title: '重复退化问题',
      description: '过度重复训练导致模型泛化能力下降、优化稳定性变差',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              MGA 方法
            </span>
            <br />
            数据增强新突破
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Massive Genre-Audience 是一种创新的数据增强方法，
            通过轻量级框架将现有语料系统重构为多样化变体，
            解决大模型训练中的数据稀缺和重复退化问题。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center mb-8">
            <AlertTriangle className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">当前面临的挑战</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                  <problem.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white"
        >
          <div className="flex items-center justify-center mb-6">
            <Lightbulb className="w-10 h-10 mr-4" />
            <h2 className="text-3xl font-bold">MGA 解决方案</h2>
          </div>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            通过基于不同<strong>"体裁（Genre）"</strong>和<strong>"受众（Audience）"</strong>生成内容变体，
            在保留核心知识的同时创造语义丰富的新数据，实现<strong>3.9倍</strong>的Token数扩展，
            显著提升模型性能。
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
