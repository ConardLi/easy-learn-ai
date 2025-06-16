/**
 * 技术原理页面
 * 可视化展示Transformer架构和注意力机制
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Layers, Zap, Settings } from 'lucide-react';

const Principles: React.FC = () => {
  const [activeSection, setActiveSection] = useState('attention');
  const [highlightedWord, setHighlightedWord] = useState<number | null>(null);

  const sections = [
    { id: 'attention', title: '注意力机制', icon: <Eye className="w-5 h-5" /> },
    { id: 'transformer', title: 'Transformer架构', icon: <Layers className="w-5 h-5" /> },
    { id: 'training', title: '训练任务', icon: <Settings className="w-5 h-5" /> }
  ];

  // 注意力可视化示例
  const sentence = ['我', '爱', '学习', '人工', '智能'];
  const attentionWeights = [
    [0.1, 0.2, 0.3, 0.2, 0.2], // 我
    [0.15, 0.4, 0.25, 0.1, 0.1], // 爱
    [0.1, 0.3, 0.4, 0.1, 0.1], // 学习
    [0.05, 0.1, 0.2, 0.4, 0.25], // 人工
    [0.05, 0.1, 0.15, 0.3, 0.4] // 智能
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          技术原理
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          深入理解Transformer架构和预训练的核心机制
        </p>
      </motion.div>

      {/* Section Tabs */}
      <div className="flex justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
          <div className="flex space-x-2">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'attention' && (
          <motion.div
            key="attention"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-3 text-indigo-600" />
                自注意力机制
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Attention Visualization */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">注意力权重可视化</h3>
                  <p className="text-gray-600 mb-4">点击词语查看它对其他词的注意力分布</p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-center space-x-4">
                      {sentence.map((word, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setHighlightedWord(index)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            highlightedWord === index
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {word}
                        </motion.button>
                      ))}
                    </div>

                    {/* Attention Weights Display */}
                    {highlightedWord !== null && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4"
                      >
                        <h4 className="font-semibold text-gray-700 mb-3">
                          "{sentence[highlightedWord]}" 的注意力分布:
                        </h4>
                        <div className="space-y-2">
                          {sentence.map((word, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <span className="w-12 text-sm text-gray-600">{word}</span>
                              <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${attentionWeights[highlightedWord][index] * 100}%` }}
                                  transition={{ duration: 0.8, delay: index * 0.1 }}
                                  className="h-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
                                />
                              </div>
                              <span className="w-12 text-sm text-gray-600 text-right">
                                {(attentionWeights[highlightedWord][index] * 100).toFixed(0)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Explanation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">工作原理</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        Q
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Query (查询)</h4>
                        <p className="text-sm text-gray-600">当前词想要关注什么信息</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        K
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Key (键)</h4>
                        <p className="text-sm text-gray-600">其他词能提供什么信息</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        V
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Value (值)</h4>
                        <p className="text-sm text-gray-600">实际传递的信息内容</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">💡 核心思想</h4>
                    <p className="text-sm text-yellow-700">
                      注意力机制让模型能够动态地关注输入序列中的不同部分，
                      就像人类阅读时会重点关注重要信息一样。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'transformer' && (
          <motion.div
            key="transformer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Layers className="w-6 h-6 mr-3 text-indigo-600" />
                Transformer架构
              </h2>

              {/* Architecture Diagram */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="bg-gradient-to-b from-blue-50 to-purple-50 rounded-2xl p-6 w-full max-w-2xl"
                >
                  <div className="space-y-4">
                    {/* Output */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl p-4 text-center font-medium"
                    >
                      输出概率分布
                    </motion.div>

                    {/* Decoder Layers */}
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 - i * 0.1 }}
                        className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl p-4 text-center font-medium"
                      >
                        Decoder Layer {3 - i}
                        <div className="text-xs opacity-80 mt-1">
                          Multi-Head Attention + FFN
                        </div>
                      </motion.div>
                    ))}

                    {/* Input Embeddings */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-indigo-400 to-indigo-600 text-white rounded-xl p-4 text-center font-medium"
                    >
                      Token Embeddings + Position Embeddings
                    </motion.div>

                    {/* Input */}
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0 }}
                      className="bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-xl p-4 text-center font-medium"
                    >
                      输入文本序列
                    </motion.div>
                  </div>

                  {/* Arrows */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 space-y-4 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + i * 0.2 }}
                        className="flex justify-center"
                      >
                        <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-indigo-400"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Key Components */}
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: '多头注意力',
                    description: '并行计算多个注意力头，捕获不同类型的关系',
                    icon: '🔍',
                    color: 'from-blue-400 to-blue-600'
                  },
                  {
                    title: '前馈网络',
                    description: '对每个位置独立应用的全连接层',
                    icon: '⚡',
                    color: 'from-green-400 to-green-600'
                  },
                  {
                    title: '残差连接',
                    description: '帮助梯度传播，使深层网络训练更稳定',
                    icon: '🔗',
                    color: 'from-purple-400 to-purple-600'
                  }
                ].map((component, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/70 rounded-xl p-6 text-center shadow-lg"
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${component.color} flex items-center justify-center text-2xl`}>
                      {component.icon}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{component.title}</h3>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'training' && (
          <motion.div
            key="training"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-indigo-600" />
                预训练任务
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* BERT Training */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">BERT 预训练任务</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                      <h4 className="font-medium text-indigo-800 mb-2">掩码语言模型 (MLM)</h4>
                      <div className="text-sm text-gray-700 mb-3">
                        随机掩盖15%的词，让模型预测被掩盖的词
                      </div>
                      <div className="bg-white rounded-lg p-3 font-mono text-sm">
                        <span className="text-gray-600">输入: </span>
                        <span>我爱学习 [MASK] 智能</span>
                        <br />
                        <span className="text-gray-600">预测: </span>
                        <span className="text-green-600">人工</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                      <h4 className="font-medium text-green-800 mb-2">下一句预测 (NSP)</h4>
                      <div className="text-sm text-gray-700 mb-3">
                        判断两个句子是否在原文中相邻
                      </div>
                      <div className="bg-white rounded-lg p-3 font-mono text-sm">
                        <span className="text-gray-600">句子A: </span>
                        <span>今天天气很好</span>
                        <br />
                        <span className="text-gray-600">句子B: </span>
                        <span>我决定去公园散步</span>
                        <br />
                        <span className="text-gray-600">标签: </span>
                        <span className="text-green-600">相邻</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GPT Training */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">GPT 预训练任务</h3>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <h4 className="font-medium text-purple-800 mb-2">因果语言模型 (CLM)</h4>
                    <div className="text-sm text-gray-700 mb-3">
                      根据前面的词预测下一个词
                    </div>
                    <div className="bg-white rounded-lg p-3 font-mono text-sm space-y-2">
                      <div>
                        <span className="text-gray-600">输入: </span>
                        <span>人工智能是</span>
                      </div>
                      <div>
                        <span className="text-gray-600">预测: </span>
                        <span className="text-purple-600">未来</span>
                      </div>
                      <div>
                        <span className="text-gray-600">输入: </span>
                        <span>人工智能是未来</span>
                      </div>
                      <div>
                        <span className="text-gray-600">预测: </span>
                        <span className="text-purple-600">的</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">🎯 训练目标</h4>
                    <p className="text-sm text-yellow-700">
                      通过大量文本的自回归训练，模型学会了语言的统计规律和语义知识，
                      为下游任务提供强大的基础能力。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Principles;
