/**
 * NLP概述组件
 * 展示NLP的基本概念和核心特点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, Zap, Target } from 'lucide-react';

const Overview: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: '智能理解',
      description: '让计算机理解人类语言的含义',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MessageSquare,
      title: '自然交流',
      description: '实现人机之间的自然语言交互',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: '高效处理',
      description: '快速处理大量文本数据',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Target,
      title: '多任务应用',
      description: '支持翻译、分类、问答等多种任务',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="space-y-12">
      {/* 主标题区域 */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          什么是 NLP？
        </h2>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          自然语言处理（Natural Language Processing）是一种让计算机理解、解释和生成人类语言的技术，
          它结合了计算机科学、人工智能和语言学的知识。
        </p>
      </motion.div>

      {/* 特性卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* NLP应用场景动画展示 */}
      <motion.div 
        className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
          NLP 在生活中的应用
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '智能助手',
              example: '"今天天气怎么样？"',
              response: '为您查询到今天晴朗，温度20-25°C',
              color: 'blue'
            },
            {
              title: '机器翻译',
              example: 'Hello, how are you?',
              response: '你好，你好吗？',
              color: 'purple'
            },
            {
              title: '情感分析',
              example: '这部电影真的太棒了！',
              response: '积极情感 😊 95%',
              color: 'green'
            }
          ].map((app, index) => (
            <motion.div
              key={index}
              className="space-y-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
            >
              <h4 className="text-lg font-semibold text-gray-800">{app.title}</h4>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">输入：</p>
                  <p className="font-medium">{app.example}</p>
                </div>
                <div className={`bg-gradient-to-r from-${app.color}-100 to-${app.color}-200 rounded-lg p-3`}>
                  <p className="text-sm text-gray-600">输出：</p>
                  <p className="font-medium">{app.response}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
