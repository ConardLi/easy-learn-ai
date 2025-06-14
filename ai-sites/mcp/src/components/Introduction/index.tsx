/**
 * MCP 概念介绍组件
 * 展示 MCP 的基本概念、作用和核心特点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Globe, Puzzle } from 'lucide-react';

const Introduction: React.FC = () => {
  const features = [
    {
      icon: Puzzle,
      title: '统一标准',
      description: '像 USB 接口一样，提供统一的连接标准，简化 AI 与外部资源的集成'
    },
    {
      icon: Globe,
      title: '广泛兼容',
      description: '支持数据库、API、文件系统等各种外部资源的无缝连接'
    },
    {
      icon: Zap,
      title: '高效交互',
      description: '优化的协议设计，确保 AI 模型与外部工具的高效通信'
    },
    {
      icon: Shield,
      title: '安全可靠',
      description: '内置安全机制，保障数据传输和访问的安全性'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 主要概念卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">什么是 MCP？</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="text-lg text-gray-700 leading-relaxed">
              <p className="mb-4">
                <span className="font-semibold text-blue-600">MCP (Model Context Protocol)</span> 
                是由 Anthropic 公司推出的开放标准协议，专为解决 AI 模型与外部数据源、工具交互而设计。
              </p>
              <p className="mb-4">
                就像 <span className="font-semibold">USB 接口</span> 让不同设备能够标准化连接一样，
                MCP 为 AI 模型提供了一个统一的"插头"，无论是连接数据库、第三方 API，还是本地文件。
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-2">核心价值</h3>
              <p className="text-gray-600">
                统一标准化接口 + 简化集成复杂度 + 提升开发效率
              </p>
            </div>
          </div>

          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"
            />
            <div className="relative bg-white rounded-2xl p-8 shadow-lg border">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Puzzle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">MCP 协议</h3>
                <p className="text-gray-600 text-sm">连接 AI 与世界的桥梁</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 特性网格 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:scale-105"
          >
            <div className="mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 text-lg">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 应用场景 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">实际应用场景</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🗄️</span>
            </div>
            <h4 className="font-semibold mb-2">数据库查询</h4>
            <p className="text-indigo-100 text-sm">AI 直接查询企业数据库，获取实时业务数据</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <h4 className="font-semibold mb-2">API 集成</h4>
            <p className="text-indigo-100 text-sm">连接第三方服务，如天气、股票、社交媒体 API</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📁</span>
            </div>
            <h4 className="font-semibold mb-2">文件操作</h4>
            <p className="text-indigo-100 text-sm">读取、编辑本地文件，处理文档和媒体内容</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Introduction;
