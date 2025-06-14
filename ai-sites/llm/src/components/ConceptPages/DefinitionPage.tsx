/**
 * LLM 定义页面
 * 详细介绍大语言模型的定义、发展背景和基本概念
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Users, Database, Cpu } from 'lucide-react';
import ModelSizeAnimation from '../Animations/ModelSizeAnimation';

const DefinitionPage: React.FC = () => {
  const keyPoints = [
    {
      icon: Brain,
      title: '智能突破',
      description: 'LLM 展现出与传统模型截然不同的智能水平',
    },
    {
      icon: TrendingUp,
      title: '规模效应',
      description: '数百亿参数规模带来质的飞跃',
    },
    {
      icon: Database,
      title: '海量数据',
      description: '在数 T token 语料上进行预训练',
    },
    {
      icon: Cpu,
      title: '分布式训练',
      description: '通过多卡分布式集群实现大规模训练',
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              什么是 LLM？
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            大语言模型（Large Language Model）是一种革命性的人工智能技术，
            正在重新定义机器理解和生成自然语言的能力
          </p>
        </motion.div>

        {/* Definition Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                核心定义
              </h2>
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-blue-600">大语言模型（LLM）</strong> 是一种相较传统语言模型参数量更多、
                  在更大规模语料上进行预训练的语言模型。
                </p>
                <p>
                  LLM 使用与传统预训练语言模型相似的架构与预训练任务，但拥有更庞大的参数、
                  在更海量的语料上进行预训练，也从而展现出与传统预训练语言模型截然不同的能力。
                </p>
                <p>
                  一般来说，LLM 指包含 <strong className="text-purple-600">数百亿（或更多）参数</strong> 的语言模型，
                  它们往往在数 T token 语料上通过多卡分布式集群进行预训练。
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <ModelSizeAnimation />
            </div>
          </div>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            核心特征
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {keyPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            LLM 发展里程碑
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: '2020',
                model: 'GPT-3',
                params: '1750 亿参数',
                description: 'LLM 时代的开端，首次展现强大的生成能力',
              },
              {
                year: '2022',
                model: 'ChatGPT',
                params: '基于 GPT-3.5',
                description: '通过 RLHF 技术实现人类偏好对齐',
              },
              {
                year: '2023',
                model: 'GPT-4',
                params: '多模态能力',
                description: '支持文本和图像的多模态理解',
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl font-bold mb-2">{milestone.year}</div>
                <div className="text-2xl font-semibold mb-2">{milestone.model}</div>
                <div className="text-lg opacity-90 mb-3">{milestone.params}</div>
                <div className="text-sm opacity-80 leading-relaxed">
                  {milestone.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DefinitionPage;
