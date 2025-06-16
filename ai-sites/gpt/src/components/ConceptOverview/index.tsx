/**
 * 概念概览组件
 * 提供 GPT 核心概念的整体介绍和导航
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Layers, Zap, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const concepts = [
  {
    id: 'decoder-only',
    title: 'Decoder-Only 架构',
    description: '仅使用解码器层堆叠的模型架构，是现代大语言模型的基础',
    icon: Layers,
    color: 'from-blue-400 to-blue-600',
    details: 'GPT 采用 Decoder-Only 架构，只保留了掩码自注意力层，更适合文本生成任务'
  },
  {
    id: 'causal-lm',
    title: '因果语言模型',
    description: '基于前文预测下一个词的训练方式，天然适合文本生成',
    icon: Zap,
    color: 'from-green-400 to-green-600',
    details: 'CLM 通过掩码机制确保模型只能看到当前位置之前的内容，保持自回归特性'
  },
  {
    id: 'scaling',
    title: '规模扩展',
    description: '通过增加参数量、数据量和计算量来提升模型能力',
    icon: TrendingUp,
    color: 'from-purple-400 to-purple-600',
    details: 'GPT 系列证明了"规模即正义"的理念，更大的模型展现出涌现能力'
  },
  {
    id: 'emergent',
    title: '涌现能力',
    description: '大模型在达到一定规模时展现出的超越预期的能力',
    icon: Brain,
    color: 'from-orange-400 to-orange-600',
    details: '包括 few-shot 学习、推理能力、代码生成等在小模型中不明显的能力'
  }
];

const keyFeatures = [
  '预训练-微调范式',
  'Zero-shot & Few-shot 学习',
  '上下文学习 (In-context Learning)',
  '自回归文本生成',
  '大规模无监督预训练'
];

interface ConceptOverviewProps {
  onConceptSelect: (conceptId: string) => void;
}

export default function ConceptOverview({ onConceptSelect }: ConceptOverviewProps) {
  return (
    <div className="space-y-8">
      {/* 头部介绍 */}
      <motion.div
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GPT 核心概念学习
            </h1>
            <p className="text-gray-600 text-lg">深入理解 Generative Pre-trained Transformer</p>
          </div>
        </div>
        
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          GPT（生成式预训练 Transformer）是一种基于 Decoder-Only 架构的大语言模型，
          通过在海量文本数据上进行因果语言建模训练，学会了强大的文本理解和生成能力。
          从 GPT-1 到 GPT-3，模型规模不断扩大，展现出了令人惊叹的涌现能力。
        </p>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">核心特征</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-gray-700"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 核心概念卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => {
          const IconComponent = concept.icon;
          
          return (
            <motion.div
              key={concept.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onConceptSelect(concept.id)}
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${concept.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{concept.title}</h3>
                  <p className="text-gray-600">{concept.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{concept.details}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 学习路径指引 */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">建议学习路径</h2>
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
          {['概念理解', 'GPT架构', '训练过程', '发展历程', '深度分析'].map((step, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
                <span className="font-semibold text-gray-700">{step}</span>
              </div>
              {index < 4 && (
                <ArrowRight className="w-5 h-5 text-gray-400 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
