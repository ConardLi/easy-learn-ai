/**
 * LoRA 简介组件
 * 提供 LoRA 的基本概念介绍和核心要点展示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, Layers } from 'lucide-react';

const IntroSection: React.FC = () => {
  const keyPoints = [
    {
      icon: Target,
      title: '什么是 LoRA？',
      content: 'Low-Rank Adaptation (低秩适应) 是一种高效的大模型微调技术，通过低秩矩阵分解大幅减少训练参数。',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: '核心优势',
      content: '相比全量微调，LoRA 可减少可训练参数高达 10000 倍，GPU 内存需求降低约 3 倍。',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Layers,
      title: '工作原理',
      content: '冻结预训练模型权重，在 Transformer 层中注入可训练的低秩矩阵，通过 A 和 B 两个小矩阵的乘积实现微调。',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lightbulb,
      title: '应用场景',
      content: '广泛应用于自然语言处理、计算机视觉、语音识别等领域，特别适合资源受限的微调任务。',
      color: 'from-orange-500 to-yellow-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* 欢迎标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-bold text-gray-800 mb-4">
          欢迎学习 LoRA 微调技术
        </h3>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          LoRA 是当前最受欢迎的大模型高效微调方法之一，让我们一起探索它的奥秘
        </p>
      </motion.div>

      {/* 核心概念卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {keyPoints.map((point, index) => {
          const Icon = point.icon;
          return (
            <motion.div
              key={point.title}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${point.color} flex items-center justify-center flex-shrink-0`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {point.content}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 学习路径提示 */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">学习路径建议</h4>
            <p className="text-blue-100">
              建议按顺序学习：概念理解 → 原理可视化 → 参数调整 → 优势对比 → 应用场景。
              每个部分都有互动演示帮助你更好地理解。
            </p>
          </div>
        </div>
      </motion.div>

      {/* 数学公式简介 */}
      <motion.div
        className="bg-gray-50 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4">核心数学概念</h4>
        <div className="bg-white rounded-xl p-4 border-l-4 border-blue-500">
          <p className="text-gray-700 mb-2">
            <strong>原始权重更新：</strong> W₀ + ΔW = W₀ + BA
          </p>
          <p className="text-gray-600 text-sm">
            其中 W₀ 是原始权重矩阵（冻结），B ∈ ℝᵈˣʳ，A ∈ ℝʳˣᵏ，r 是低秩维度
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroSection;
