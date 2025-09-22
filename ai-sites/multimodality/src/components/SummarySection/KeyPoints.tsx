/**
 * 关键要点组件
 * 展示多模态AI学习的核心知识点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lightbulb, TrendingUp, Zap } from 'lucide-react';

interface KeyPointsProps {
  inView: boolean;
}

const KeyPoints: React.FC<KeyPointsProps> = ({ inView }) => {
  const keyPoints = [
    {
      icon: Lightbulb,
      category: '核心概念',
      title: '多模态AI的本质',
      points: [
        '能够同时处理多种数据类型（文本、图像、音频、视频）',
        '实现跨模态的语义理解和信息融合',
        '模拟人类的多感官认知能力'
      ],
      color: 'bg-blue-500'
    },
    {
      icon: TrendingUp,
      category: '发展历程',
      title: '技术演进路径',
      points: [
        '2020年：ViT开启视觉Transformer时代',
        '2021年：CLIP实现大规模图文对比学习',
        '2022年：文生图三巨头引爆AIGC浪潮',
        '2023-2025年：多模态能力全面整合'
      ],
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      category: '核心技术',
      title: '关键技术原理',
      points: [
        'Transformer统一架构处理多模态数据',
        'CLIP对比学习建立图文语义关联',
        '扩散模型实现高质量内容生成',
        '多模态融合机制协同处理信息'
      ],
      color: 'bg-purple-500'
    },
    {
      icon: CheckCircle,
      category: '实际应用',
      title: '应用场景广泛',
      points: [
        '创意设计：AI绘画、风格转换、图像编辑',
        '内容创作：视频生成、特效合成、虚拟主播',
        '教育学习：智能辅导、个性化教学',
        '商业应用：电商推荐、医疗诊断、客服助手'
      ],
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {keyPoints.map((point, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 card-hover"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-3 rounded-xl ${point.color} text-white`}>
              <point.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-sm text-gray-500 font-medium">{point.category}</span>
              <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
            </div>
          </div>

          <div className="space-y-3">
            {point.points.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 + itemIndex * 0.1 }}
                className="flex items-start space-x-3"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default KeyPoints;
