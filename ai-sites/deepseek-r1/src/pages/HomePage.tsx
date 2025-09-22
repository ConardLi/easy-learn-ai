/**
 * 首页组件 - 展示 DeepSeek R1 的概述和核心价值
 * 包含动画介绍、关键特性展示和导航引导
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Target, Layers } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'R1-Zero突破',
      description: '首次证明纯强化学习即可涌现推理能力，无需监督学习',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: Target,
      title: '新型训练范式',
      description: '基于GRPO算法的强化学习后训练，显著提升推理能力',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: Layers,
      title: '模型蒸馏创新',
      description: '大模型能力蒸馏到小模型，让推理能力触达更多场景',
      color: 'text-green-600 bg-green-100'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.h1
          className="text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          探索 <span className="text-blue-600">DeepSeek R1</span> 的创新之路
        </motion.h1>
        
        <motion.p
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          从预训练到强化学习后训练的范式转变，揭秘如何通过创新算法让大语言模型获得强大推理能力，
          成就媲美 OpenAI o1 的开源智能模型
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <Link
            to="/timeline"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            开始学习之旅
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            to="/tech"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            直接了解技术
          </Link>
        </motion.div>
      </motion.div>

      {/* 核心特性 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 核心成就展示 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
      >
        <h2 className="text-3xl font-bold mb-4">突破性成就</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <div className="text-4xl font-bold mb-2">≈ o1</div>
            <div className="text-blue-100">推理能力达到 OpenAI o1 水平</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">免费</div>
            <div className="text-blue-100">全民可用的强推理模型</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">开源</div>
            <div className="text-blue-100">公开技术路线和方法</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
