/**
 * LOSS概念介绍组件
 * 使用卡片式布局和动画效果逐步介绍LOSS的基本概念
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, TrendingDown, Settings } from 'lucide-react';

const ConceptIntroduction: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState(0);

  const concepts = [
    {
      title: 'LOSS 是什么？',
      description: '简单说，LOSS 就是模型在微调过程中犯错误的"程度"的评分，它是一个数字。',
      icon: Target,
      color: 'from-red-500 to-pink-500',
      details: [
        'LOSS 是一个可微的数学函数',
        '量化模型预测与真实值的误差',
        '输出为标量数值',
        '值越大表示错误越大'
      ]
    },
    {
      title: '怎么算出来的？',
      description: '模型对数据做预测，然后把预测结果和正确答案进行对比计算。',
      icon: Calculator,
      color: 'from-blue-500 to-cyan-500',
      details: [
        '模型输出预测结果',
        '与真实标签对比',
        '使用数学公式计算差异',
        '常见公式：MSE、交叉熵等'
      ]
    },
    {
      title: '微调时用它干什么？',
      description: '微调的核心目标就是让模型少犯错，所以要想办法让 LOSS 变得越来越小。',
      icon: TrendingDown,
      color: 'from-green-500 to-emerald-500',
      details: [
        '作为优化目标',
        '指导参数更新方向',
        '评估训练效果',
        '决定何时停止训练'
      ]
    },
    {
      title: '怎么变小？',
      description: '通过梯度下降算法调整模型参数，根据 LOSS 计算出参数更新方向。',
      icon: Settings,
      color: 'from-purple-500 to-violet-500',
      details: [
        '计算LOSS对参数的梯度',
        '沿梯度反方向更新参数',
        '使用学习率控制更新幅度',
        '重复迭代直到收敛'
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards(prev => {
        if (prev < concepts.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* 标题区域 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          理解 LOSS 函数
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          LOSS（损失函数）是机器学习中的核心概念，它衡量模型预测与真实值的差距
        </p>
      </motion.div>

      {/* 概念卡片 */}
      <div className="grid md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => {
          const IconComponent = concept.icon;
          const isVisible = index < visibleCards;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${concept.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {concept.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {concept.description}
                  </p>
                  <div className="space-y-2">
                    {concept.details.map((detail, detailIndex) => (
                      <motion.div
                        key={detailIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + detailIndex * 0.1 }}
                        className="flex items-center space-x-2 text-sm text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        <span>{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 关键要点总结 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
      >
        <h3 className="text-2xl font-bold mb-4">关键要点</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">📉</div>
            <p className="font-medium">LOSS 下降 = 模型改进</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">🔄</div>
            <p className="font-medium">持续迭代优化参数</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">🎯</div>
            <p className="font-medium">最终目标是最小化误差</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptIntroduction;
