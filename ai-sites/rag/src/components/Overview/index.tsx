/**
 * RAG概述组件
 * 提供RAG的基本概念介绍和核心优势展示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, Zap, Shield, TrendingUp, AlertTriangle } from 'lucide-react';

const Overview: React.FC = () => {
  const advantages = [
    { icon: Shield, title: '提升事实准确性', desc: '通过检索真实数据减少模型"幻觉"' },
    { icon: TrendingUp, title: '动态知识更新', desc: '无需重新训练即可更新知识库' },
    { icon: Zap, title: '领域适应性强', desc: '通过替换知识库快速适配不同专业领域' },
    { icon: Brain, title: '可解释性增强', desc: '可追溯答案的参考来源' }
  ];

  const challenges = [
    { icon: AlertTriangle, title: '检索质量依赖', desc: '检索结果的质量直接影响最终生成效果' },
    { icon: AlertTriangle, title: '延迟增加', desc: '检索步骤会引入额外的计算和IO开销' },
    { icon: AlertTriangle, title: '知识更新成本', desc: '需要维护高质量且及时更新的知识库' },
    { icon: AlertTriangle, title: '上下文长度限制', desc: '检索内容可能超出模型上下文窗口' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* RAG定义部分 */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <Database className="text-blue-600 mr-4" size={40} />
            <h2 className="text-3xl font-bold text-gray-800">什么是 RAG？</h2>
          </div>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>RAG (Retrieval-Augmented Generation)</strong> 即检索增强生成技术，是大语言模型领域解决事实性问题的重要方案。
            </p>
            <p>
              通过动态检索外部知识库，使模型在推理时能获取最新信息，形成 
              <span className="bg-blue-100 px-2 py-1 rounded text-blue-800 font-semibold mx-2">
                "预训练模型 + 动态知识库"
              </span>
              的混合架构。
            </p>
            <p>
              从根本上解决传统语言模型的<span className="text-red-600 font-semibold">"知识截止"</span>与
              <span className="text-red-600 font-semibold">"事实幻觉"</span>问题。
            </p>
          </div>
        </div>
      </motion.section>

      {/* 核心概念可视化 */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">RAG 核心概念</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { 
              title: '检索 (Retrieval)', 
              icon: Database, 
              color: 'from-green-400 to-green-600',
              desc: '从外部知识库中检索相关文档片段'
            },
            { 
              title: '增强 (Augmented)', 
              icon: Zap, 
              color: 'from-yellow-400 to-orange-500',
              desc: '将检索到的信息与原始问题结合'
            },
            { 
              title: '生成 (Generation)', 
              icon: Brain, 
              color: 'from-purple-400 to-purple-600',
              desc: '基于增强后的上下文生成准确回答'
            }
          ].map((concept, index) => (
            <motion.div
              key={concept.title}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${concept.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <concept.icon className="text-white" size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">{concept.title}</h4>
              <p className="text-gray-600 text-center">{concept.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 优势与挑战对比 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 优势 */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
              <Shield className="mr-3" size={28} />
              RAG 的优势
            </h3>
            <div className="space-y-4">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={advantage.title}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <advantage.icon className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-green-800">{advantage.title}</h4>
                    <p className="text-green-700 text-sm">{advantage.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* 挑战 */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center">
              <AlertTriangle className="mr-3" size={28} />
              面临的挑战
            </h3>
            <div className="space-y-4">
              {challenges.map((challenge, index) => (
                <motion.div
                  key={challenge.title}
                  className="flex items-start space-x-3 bg-white/50 rounded-lg p-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <challenge.icon className="text-red-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-red-800">{challenge.title}</h4>
                    <p className="text-red-700 text-sm">{challenge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Overview;
