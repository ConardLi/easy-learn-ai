/**
 * DeepSpeed 介绍页面 - 详细介绍 DeepSpeed 的特点和优势
 * 包含技术架构图和关键特性展示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Cpu, BarChart3, Users, Layers } from 'lucide-react';

const features = [
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'ZeRO 技术',
    description: '模型状态分片存储，消除显存冗余',
    details: ['参数分片', '梯度分片', '优化器状态分片']
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: '混合精度训练',
    description: '自动管理 FP16/FP32 精度，提升性能',
    details: ['自动损失缩放', '动态精度管理', '数值稳定性保证']
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: '并行策略',
    description: '支持张量并行和流水线并行',
    details: ['张量并行', '流水线并行', '数据并行组合']
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: '内存优化',
    description: '激活检查点和内存碎片整理',
    details: ['激活重计算', '内存碎片整理', '动态内存管理']
  }
];

export const DeepSpeedIntro: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8">
          <Zap className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          什么是 DeepSpeed？
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          微软研发的深度学习优化库，通过 ZeRO 技术和多种并行策略，
          让大规模模型训练变得更加高效和易用。
        </p>
      </motion.div>

      {/* Key Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 mb-16"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">核心优势</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">显存节省</h3>
            <p className="text-gray-600">单卡显存占用随 GPU 数量显著降低</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">训练加速</h3>
            <p className="text-gray-600">高效的并行策略和内存管理</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">模型扩展</h3>
            <p className="text-gray-600">支持更大规模的模型训练</p>
          </div>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mr-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {feature.description}
            </p>
            
            <ul className="space-y-2">
              {feature.details.map((detail, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                  {detail}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Technical Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ZeRO 技术架构
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">参数分片</h4>
            <p className="text-sm text-gray-600">
              将模型参数分散存储在不同 GPU 上
            </p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">梯度分片</h4>
            <p className="text-sm text-gray-600">
              梯度计算和存储的分布式处理
            </p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-white font-bold">O</span>
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">优化器分片</h4>
            <p className="text-sm text-gray-600">
              优化器状态的分布式存储管理
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
