/**
 * T5简介组件
 * 展示T5的基本概念和特点
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Layers, ArrowRight } from 'lucide-react';

const Introduction: React.FC = () => {
  const features = [
    {
      icon: Layers,
      title: 'Encoder-Decoder架构',
      description: '结合编码器和解码器，实现强大的序列到序列学习能力'
    },
    {
      icon: Target,
      title: '大一统思想',
      description: '将所有NLP任务统一为文本到文本的转换问题'
    },
    {
      icon: Zap,
      title: '预训练+微调',
      description: '通过大规模预训练获得通用语言理解能力'
    }
  ];

  return (
    <section id="introduction" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* 主标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            T5 模型
          </h1>
          <p className="text-2xl md:text-3xl text-gray-600 mb-4">
            Text-To-Text Transfer Transformer
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Google提出的革命性预训练语言模型，通过统一的文本到文本框架解决所有NLP任务
          </p>
        </motion.div>

        {/* 核心特点展示 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* T5工作原理简介 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">为什么T5如此重要？</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">统一框架</h4>
                    <p className="text-gray-600">将分类、翻译、摘要等任务统一为相同格式</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">强大性能</h4>
                    <p className="text-gray-600">在多个NLP基准测试中取得SOTA结果</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">简化开发</h4>
                    <p className="text-gray-600">统一的接口大大简化了模型部署和应用</p>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: [0, 1, 0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-center"
            >
              <div className="relative">
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-full opacity-20 absolute"></div>
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center relative z-10">
                  <span className="text-4xl font-bold text-white">T5</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
