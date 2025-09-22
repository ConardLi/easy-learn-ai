/**
 * 核心技术页面组件 - 展示 DeepSeek R1 的三大技术突破
 * R1-Zero、R1 训练范式、模型蒸馏的详细介绍
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Layers, ChevronRight, Check, X } from 'lucide-react';

const TechPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const technologies = [
    {
      id: 'r1-zero',
      title: 'R1-Zero：纯强化学习突破',
      icon: Zap,
      color: 'text-yellow-600 bg-yellow-100',
      summary: '首次证明无需监督学习，仅通过强化学习就能让模型涌现推理能力',
      keyPoints: [
        '完全跳过监督式微调(SFT)阶段',
        '使用简单规则奖励模型指导训练', 
        '模型自发学会思维链推理',
        '出现"顿悟时刻"的反思能力'
      ],
      beforeAfter: {
        before: '传统方法：预训练 → 监督微调 → 强化学习',
        after: 'R1-Zero：预训练 → 直接强化学习'
      },
      phenomena: [
        {
          title: '输出长度逐渐增加',
          description: '随着训练进行，模型输出越来越长，推理能力同步提升'
        },
        {
          title: '"Aha Moment"现象',
          description: '模型学会停下来重新评估，用拟人口气进行反思'
        }
      ]
    },
    {
      id: 'r1-training',
      title: 'R1：新型训练范式',
      icon: Target,
      color: 'text-blue-600 bg-blue-100',
      summary: '结合监督学习和强化学习，打造推理能力强且对人类友好的模型',
      keyPoints: [
        '两阶段训练流程设计',
        '平衡推理能力与人类友好性',
        '使用高质量数据进行优化',
        '可持续的能力提升路径'
      ],
      stages: [
        {
          stage: '第一阶段',
          steps: [
            '少量高质量思维链数据 SFT',
            '推理密集任务强化学习训练',
            '添加语言一致性奖励'
          ]
        },
        {
          stage: '第二阶段', 
          steps: [
            '60万推理数据 + 20万通用数据 SFT',
            '安全性和通用能力强化学习',
            '最终模型优化完成'
          ]
        }
      ]
    },
    {
      id: 'distillation',
      title: '模型蒸馏：小模型的逆袭',
      icon: Layers,
      color: 'text-green-600 bg-green-100',
      summary: '将大模型的推理能力有效转移到小模型，让智能触达更多场景',
      keyPoints: [
        '大模型生成高质量训练数据',
        '小模型学习推理模式',
        '显著提升小模型推理能力',
        '降低部署和运行成本'
      ],
      comparison: [
        { model: '1.5B', math: '显著提升', coding: '显著提升', cost: '极低' },
        { model: '7B', math: '大幅提升', coding: '大幅提升', cost: '低' },
        { model: '14B', math: '媲美大模型', coding: '媲美大模型', cost: '中等' }
      ]
    }
  ];

  const activetech = technologies[activeTab];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          DeepSeek R1 核心技术
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          三大技术创新构成完整的强化学习后训练体系
        </p>
      </motion.div>

      {/* 技术选项卡 */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <motion.button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-5 w-5" />
              <span>{tech.title.split('：')[0]}</span>
            </motion.button>
          );
        })}
      </div>

      {/* 技术详情 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* 头部 */}
          <div className={`${activetech.color} p-6`}>
            <div className="flex items-center space-x-3 mb-4">
              <activetech.icon className="h-8 w-8" />
              <h2 className="text-2xl font-bold text-gray-900">
                {activetech.title}
              </h2>
            </div>
            <p className="text-gray-700 text-lg">
              {activetech.summary}
            </p>
          </div>

          {/* 内容区域 */}
          <div className="p-6">
            {/* 关键要点 */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">关键特点</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {activetech.keyPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 特殊内容区域 */}
            {activeTab === 0 && (
              <>
                {/* 方法对比 */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">方法对比</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
                      <X className="h-5 w-5 text-red-600" />
                      <span className="text-gray-700">{activetech.beforeAfter.before}</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{activetech.beforeAfter.after}</span>
                    </div>
                  </div>
                </div>

                {/* 训练现象 */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">观察到的现象</h3>
                  <div className="space-y-4">
                    {activetech.phenomena.map((phenomenon, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{phenomenon.title}</h4>
                        <p className="text-gray-700">{phenomenon.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 1 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">训练阶段</h3>
                <div className="space-y-6">
                  {activetech.stages.map((stage, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">{stage.stage}</h4>
                      <div className="space-y-3">
                        {stage.steps.map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                              {stepIndex + 1}
                            </div>
                            <span className="text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">蒸馏效果对比</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">模型规模</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">数学能力</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">编程能力</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">部署成本</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activetech.comparison.map((row, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-3 font-medium text-gray-900">{row.model}</td>
                          <td className="px-4 py-3 text-gray-700">{row.math}</td>
                          <td className="px-4 py-3 text-gray-700">{row.coding}</td>
                          <td className="px-4 py-3 text-gray-700">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TechPage;
