/**
 * 核心概念解释组件
 * 详细介绍MGA中的Massive、Genre、Audience概念
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Layers, ChevronRight } from 'lucide-react';

const ConceptSection: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState('massive');

  const concepts = {
    massive: {
      title: 'Massive（大规模）',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      description: '大规模的多样性生成',
      details: [
        '每次推理生成5对"类型-受众"组合',
        '使原始文档扩展为5个新文档',
        '实现3.9倍的Token数扩展',
        '覆盖广泛的应用场景',
        '支持数十亿参数模型的高效训练'
      ],
      examples: [
        '一篇科普文章 → 5种不同表达形式',
        '覆盖从初学者到专家的各种需求',
        '适用于大规模语料库扩展'
      ]
    },
    genre: {
      title: 'Genre（体裁）',
      icon: FileText,
      color: 'from-purple-500 to-pink-500',
      description: '内容的知识表达框架',
      details: [
        '沟通目的：教育、分析、叙事等',
        '内容结构：分步教程、学术论文、对话体',
        '语言风格：严谨学术风、通俗故事风',
        '知识深度：初学者入门、专业研究者深度分析'
      ],
      examples: [
        '学术论文 ↔ 儿童故事',
        '技术文档 ↔ 对话教程',
        '新闻报道 ↔ 分析报告'
      ]
    },
    audience: {
      title: 'Audience（受众）',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      description: '内容的目标读者群体',
      details: [
        '人口统计学因素：年龄、职业、教育背景',
        '知识背景与动机：专业程度、学习目标',
        '应用场景：工作需求、兴趣爱好、学术研究'
      ],
      examples: [
        '12-15岁中学生 vs 医学专业研究生',
        '办公室工作人员 vs 医学生',
        '编程初学者 vs 资深工程师'
      ]
    }
  };

  const currentConcept = concepts[selectedConcept as keyof typeof concepts];
  const IconComponent = currentConcept.icon;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MGA 核心概念解析
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            深入理解 Massive Genre-Audience 方法的三个关键组成部分
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 概念选择器 */}
          <div className="lg:col-span-1 space-y-4">
            {Object.entries(concepts).map(([key, concept]) => {
              const ConceptIcon = concept.icon;
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedConcept(key)}
                  className={`w-full p-6 rounded-2xl text-left transition-all ${
                    selectedConcept === key
                      ? 'bg-white shadow-lg scale-105'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  whileHover={{ scale: selectedConcept === key ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${concept.color} rounded-xl flex items-center justify-center`}>
                      <ConceptIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{concept.title}</h3>
                      <p className="text-sm text-gray-600">{concept.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedConcept === key ? 'rotate-90' : ''
                    }`} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* 详细内容 */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedConcept}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl p-8 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${currentConcept.color} rounded-2xl flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      {currentConcept.title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {currentConcept.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">核心特征</h3>
                    <ul className="space-y-3">
                      {currentConcept.details.map((detail, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">应用示例</h3>
                    <div className="space-y-4">
                      {currentConcept.examples.map((example, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-gray-50 rounded-xl"
                        >
                          <p className="text-gray-700 font-medium">{example}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptSection;