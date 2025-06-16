/**
 * BERT概述组件
 * 展示BERT的核心特点和重要性，使用动画效果增强视觉体验
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, TrendingUp, Layers } from 'lucide-react';

const BertOverview: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: "双向编码",
      description: "利用上下文信息进行深度理解",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "预训练+微调",
      description: "一次预训练，多任务应用",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "性能突破",
      description: "11个NLP任务达到SOTA",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Sparkles,
      title: "里程碑意义",
      description: "开启预训练模型时代",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* 标题区域 */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
          BERT
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Bidirectional Encoder Representations from Transformers
        </p>
        <motion.p
          className="text-lg text-gray-500 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Google在2018年发布的预训练语言模型，通过双向编码和掩码语言模型，
          在自然语言理解任务上取得了突破性进展
        </motion.p>
      </motion.div>

      {/* 特性卡片 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
              <feature.icon className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* 时间线 */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">BERT的发展历程</h2>
        <div className="space-y-6">
          {[
            { year: "2017", event: "Transformer架构发布", detail: "Attention is All You Need" },
            { year: "2018", event: "BERT模型发布", detail: "在11个NLP任务上达到SOTA" },
            { year: "2019", event: "RoBERTa优化发布", detail: "去除NSP，增加训练数据" },
            { year: "2019", event: "ALBERT发布", detail: "参数共享，减少模型体积" }
          ].map((item, index) => (
            <motion.div
              key={item.year}
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.2, duration: 0.6 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {item.year}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{item.event}</h3>
                <p className="text-gray-600">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BertOverview;
