/**
 * 概念介绍页面 - 详细介绍GGUF的基本概念和发展历程
 * 包含时间线动画和概念可视化
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, FileText, Code, Cpu } from 'lucide-react';

const ConceptPage: React.FC = () => {
  const [selectedTimeline, setSelectedTimeline] = useState(0);

  const timeline = [
    {
      year: '2022年10月',
      title: 'GGML诞生',
      description: '专门为机器学习设计的张量库，提供单文件共享格式',
      icon: Code,
      color: 'from-blue-400 to-blue-600'
    },
    {
      year: '2023年初',
      title: 'GGML问题显现',
      description: '遇到灵活性不足、兼容性差等问题，衍生出GGMF、GGJT等格式',
      icon: FileText,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      year: '2023年8月',
      title: 'GGUF发布',
      description: '基于GGJT格式优化，解决了GGML的诸多问题，成为新标准',
      icon: Cpu,
      color: 'from-green-400 to-green-600'
    }
  ];

  const keyFeatures = [
    {
      title: 'GPT-Generated Unified Format',
      description: 'GGUF是专为大型语言模型设计的统一二进制文件格式',
      emoji: '🏗️'
    },
    {
      title: '单文件部署',
      description: '所有模型信息包含在一个文件中，无需外部依赖',
      emoji: '📦'
    },
    {
      title: '高效二进制编码',
      description: '采用紧凑的二进制编码格式，优化存储效率',
      emoji: '💾'
    },
    {
      title: '丰富元数据支持',
      description: '可存储模型架构、版本、超参数等详细信息',
      emoji: '📊'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            什么是 GGUF？
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            GGUF（GGML Universal File）是专为大型语言模型设计的新一代文件格式，
            旨在解决模型存储、加载和部署中的核心问题。
          </p>
        </motion.div>

        {/* Definition Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 mb-16 text-white shadow-2xl"
        >
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold">核心定义</h2>
          </div>
          <p className="text-xl leading-relaxed mb-6">
            <strong>GGUF</strong>（GPT-Generated Unified Format）是由开发者 Georgi Gerganov 提出的
            专为大型语言模型设计的二进制文件格式。它通过统一的标准解决了当前大模型在
            <span className="font-bold text-yellow-200"> 存储效率、加载速度、兼容性和扩展性 </span>
            等方面的核心挑战。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-2">设计目标</h3>
              <p>提供高效、兼容、可扩展的大模型文件格式标准</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-2">核心优势</h3>
              <p>单文件部署、快速加载、跨平台兼容</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">发展历程</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-400 via-yellow-400 to-green-400 rounded-full"></div>
            
            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className={`relative flex items-center mb-16 ${isLeft ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedTimeline(index)}
                      className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                        selectedTimeline === index ? 'border-indigo-300 shadow-xl' : 'border-gray-100'
                      }`}
                    >
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mr-4`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-indigo-600 font-semibold">{item.year}</div>
                          <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-indigo-400 rounded-full shadow-lg"></div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">核心特征</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{feature.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Step */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">准备好深入了解了吗？</h3>
            <p className="text-gray-600 mb-6">让我们探索GGUF的独特优势和技术特性</p>
            <motion.a
              href="#/features"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-300"
            >
              <span>探索特点优势</span>
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConceptPage;
