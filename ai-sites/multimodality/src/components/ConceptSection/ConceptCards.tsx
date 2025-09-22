/**
 * 概念卡片组件
 * 展示多模态AI的核心特点和优势
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Layers } from 'lucide-react';

interface ConceptCardsProps {
  inView: boolean;
}

const ConceptCards: React.FC<ConceptCardsProps> = ({ inView }) => {
  const concepts = [
    {
      icon: Layers,
      title: '多模态融合',
      description: '同时处理文本、图像、音频、视频等多种数据类型，形成更全面的理解',
      example: '看图说话：分析图片内容并生成相应文字描述',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: '跨模态理解',
      description: '能够理解不同模态间的关联关系，实现更精准的语义理解',
      example: '文生图：根据文字描述生成对应的图像内容',
      color: 'bg-green-500'
    },
    {
      icon: Zap,
      title: '智能交互',
      description: '支持更自然的人机交互方式，用户可通过多种方式与AI沟通',
      example: '多模态对话：通过语音+图片同时与AI进行交流',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {concepts.map((concept, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
          className="bg-white rounded-2xl p-8 shadow-lg card-hover border border-gray-100"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${concept.color} text-white mb-6`}>
            <concept.icon className="w-6 h-6" />
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">{concept.title}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{concept.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">应用示例</h4>
            <p className="text-sm text-gray-600">{concept.example}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ConceptCards;
