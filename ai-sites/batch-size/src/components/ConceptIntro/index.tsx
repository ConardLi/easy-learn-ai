/**
 * 概念介绍组件
 * 提供批量大小的基础概念说明和通俗解释
 */
import React from 'react';
import { motion } from 'framer-motion';

const ConceptIntro: React.FC = () => {
  const concepts = [
    {
      title: '什么是批量大小？',
      content: '批量大小（Batch Size）是指在模型训练过程中，每次更新模型参数时所使用的样本数量。',
      icon: '🎯',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: '通俗理解',
      content: '就像复习功课一样：批量大=一次做很多题（快但粗糙），批量小=一次做一道题（慢但精细）。',
      icon: '📝',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: '两个关键参数',
      content: '实际批量大小 = 单设备批量大小 × 梯度累积步数，通过这两个参数灵活控制。',
      icon: '⚙️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: '显存影响',
      content: '批量大小越大，显存消耗越多。梯度累积可以用小显存实现大批量的效果。',
      icon: '💾',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const advantages = {
    large: [
      { text: '训练更稳定', icon: '🎯' },
      { text: '易收敛到全局最优', icon: '🏆' },
      { text: '计算效率高', icon: '⚡' }
    ],
    small: [
      { text: '省显存', icon: '💾' },
      { text: '捕捉数据细节', icon: '🔍' },
      { text: '泛化能力强', icon: '🌟' }
    ]
  };

  return (
    <div className="space-y-8">
      {/* 核心概念卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${concept.color} flex items-center justify-center mb-4`}>
              <span className="text-2xl">{concept.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">{concept.title}</h3>
            <p className="text-gray-600 leading-relaxed">{concept.content}</p>
          </motion.div>
        ))}
      </div>

      {/* 优缺点对比 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          批量大小优缺点对比
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 大批量 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              大批量的优势
            </h3>
            {advantages.large.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* 小批量 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              小批量的优势
            </h3>
            {advantages.small.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-green-50 rounded-xl"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 实际应用建议 */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="text-3xl">💡</span>
          实际应用建议
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">参数设置建议</h3>
            <ul className="space-y-2 text-purple-100">
              <li>• 小模型/小数据集：从batch_size=1或2开始</li>
              <li>• 通过梯度累积增加有效批量大小</li>
              <li>• 大batch_size搭配大学习率</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">显存优化技巧</h3>
            <ul className="space-y-2 text-purple-100">
              <li>• 梯度累积实现"分期付款"效果</li>
              <li>• 平衡显存使用和训练效果</li>
              <li>• 根据硬件条件灵活调整</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptIntro;
