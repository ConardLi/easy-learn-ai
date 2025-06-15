/**
 * 基础概念页面 - 介绍多卡分布式训练的基本概念
 * 包含常见误解的澄清和可视化演示
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Zap } from 'lucide-react';
import { MemoryVisualization } from './MemoryVisualization';

export const ConceptPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'misconception' | 'reality'>('misconception');

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          多卡分布式训练基础概念
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          理解多卡训练的真实工作原理，澄清常见误解
        </p>
      </motion.div>

      {/* Misconception vs Reality */}
      <div className="mb-12">
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-xl shadow-lg">
            <button
              onClick={() => setActiveTab('misconception')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'misconception'
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <XCircle className="inline-block w-5 h-5 mr-2" />
              常见误解
            </button>
            <button
              onClick={() => setActiveTab('reality')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'reality'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-green-500'
              }`}
            >
              <CheckCircle className="inline-block w-5 h-5 mr-2" />
              实际情况
            </button>
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {activeTab === 'misconception' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">误解：显存平摊</h3>
              <p className="text-gray-600 mb-6 text-lg">
                "多张卡训练时，显存会自动平摊分配，每张卡只需要承担 1/N 的显存压力"
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <p className="text-red-700 font-medium">
                  ❌ 错误想法：2张24G卡 = 48G总显存，可以训练需要30G显存的模型
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-4">现实：各自独立</h3>
              <p className="text-gray-600 mb-6 text-lg">
                "每张卡都需要存储完整的模型参数和优化器状态，显存并不会自动平摊"
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <p className="text-green-700 font-medium">
                  ✅ 实际情况：每张卡都要承担最大的显存消耗，多卡主要用于提升训练速度
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Memory Visualization */}
      <MemoryVisualization />

      {/* Key Points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">关键要点</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">传统多卡训练</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• 每张卡存储完整模型参数</li>
              <li>• 各卡独立计算，互不干扰</li>
              <li>• 主要优势是提升训练速度</li>
              <li>• 显存消耗不会减少</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-800">DeepSpeed 解决方案</h3>
            </div>
            <ul className="space-y-2 text-gray-600">
              <li>• ZeRO 技术分片存储</li>
              <li>• 真正实现显存平摊</li>
              <li>• 支持更大规模模型</li>
              <li>• 消除显存冗余</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};