/**
 * 模型演进历程页面
 * 展示从传统词向量到现代大语言模型的发展时间线
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Zap, Brain } from 'lucide-react';

const Evolution: React.FC = () => {
  const timelineData = [
    {
      year: '2003',
      title: 'NNLM',
      subtitle: '神经网络语言模型',
      description: '首次将神经网络应用于语言建模，为词向量技术奠定基础',
      icon: '🌱',
      color: 'from-green-400 to-green-600',
      achievements: ['首个神经网络语言模型', '词向量概念雏形', '为后续发展铺路']
    },
    {
      year: '2013',
      title: 'Word2Vec',
      subtitle: '词向量革命',
      description: '提出CBOW和Skip-gram模型，让词向量技术真正普及',
      icon: '📝',
      color: 'from-blue-400 to-blue-600',
      achievements: ['CBOW和Skip-gram架构', '高效训练算法', '词语相似度计算突破']
    },
    {
      year: '2018',
      title: 'ELMo',
      subtitle: '上下文感知',
      description: '首次实现动态词向量，解决了一词多义问题',
      icon: '🎯',
      color: 'from-purple-400 to-purple-600',
      achievements: ['动态词向量', '双向LSTM架构', '上下文理解能力']
    },
    {
      year: '2018',
      title: 'BERT',
      subtitle: 'Transformer时代',
      description: '双向编码器，在多项NLP任务上获得突破性成果',
      icon: '🔄',
      color: 'from-indigo-400 to-indigo-600',
      achievements: ['双向上下文建模', 'MLM+NSP训练任务', '多任务性能突破']
    },
    {
      year: '2018-2019',
      title: 'GPT系列',
      subtitle: '生成式预训练',
      description: '自回归语言模型，开启了大规模生成式AI的时代',
      icon: '🚀',
      color: 'from-red-400 to-red-600',
      achievements: ['自回归生成', 'Transformer Decoder', 'In-context Learning']
    },
    {
      year: '2020-2023',
      title: '大语言模型',
      subtitle: '规模化突破',
      description: 'GPT-3/4、LLaMA等超大规模模型，实现了人工智能的重大突破',
      icon: '🌟',
      color: 'from-yellow-400 to-orange-600',
      achievements: ['千亿参数规模', '涌现能力出现', '通用人工智能雏形']
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          模型演进历程
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          从简单的词向量到强大的大语言模型，见证AI技术的跨越式发展
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-8 bottom-8 w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 rounded-full"></div>

        {/* Timeline Items */}
        <div className="space-y-12">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full shadow-lg z-10 flex items-center justify-center`}
              >
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </motion.div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-500">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      关键突破
                    </h4>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mr-2"></div>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center"
      >
        <Brain className="w-16 h-16 mx-auto mb-4 opacity-90" />
        <h2 className="text-2xl font-bold mb-4">发展趋势</h2>
        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          从静态词向量到动态上下文建模，从小规模模型到千亿参数大模型，
          预训练技术正在推动人工智能迈向通用智能的新时代。
        </p>
      </motion.div>
    </div>
  );
};

export default Evolution;
