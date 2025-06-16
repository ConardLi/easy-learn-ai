/**
 * NLP发展历程时间线组件
 * 展示NLP技术从1940年代至今的发展过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';

const Timeline: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0);

  const periods = [
    {
      title: '早期探索',
      years: '1940-1960年代',
      description: '图灵测试提出，机器翻译初探',
      details: [
        '1950年：艾伦·图灵提出图灵测试',
        '基于字典查找的简单翻译系统',
        '乔姆斯基生成语法理论的影响',
        '主要依赖基本的词序规则'
      ],
      color: 'from-red-400 to-pink-500'
    },
    {
      title: '符号主义时代',
      years: '1970-1990年代',
      description: '规则驱动与统计方法并行发展',
      details: [
        '基于逻辑和形式语言的方法',
        '手写规则系统的兴起',
        '统计模型开始引入',
        '计算能力提升推动技术发展'
      ],
      color: 'from-blue-400 to-cyan-500'
    },
    {
      title: '机器学习革命',
      years: '2000年代至今',
      details: [
        '2013年：Word2Vec开创词向量时代',
        '2018年：BERT引领预训练模型浪潮',
        'Transformer架构的突破',
        'GPT系列：生成式AI的里程碑'
      ],
      color: 'from-purple-400 to-indigo-500'
    }
  ];

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          NLP 发展历程
        </h2>
        <p className="text-xl text-gray-600">
          从简单规则到深度学习的技术演进
        </p>
      </motion.div>

      {/* 时间线可视化 */}
      <div className="relative">
        {/* 时间线主轴 */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-400 via-blue-400 to-purple-400 rounded-full"></div>
        
        <div className="space-y-12">
          {periods.map((period, index) => (
            <motion.div
              key={index}
              className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
            >
              {/* 内容卡片 */}
              <div className="w-5/12">
                <motion.div
                  className={`bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer`}
                  whileHover={{ scale: 1.05, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  onClick={() => setSelectedPeriod(index)}
                >
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${period.color} mb-4`}></div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{period.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{period.years}</p>
                  <p className="text-gray-600">{period.description}</p>
                  <motion.div 
                    className="flex items-center mt-4 text-blue-600"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm">查看详情</span>
                    <ChevronRight size={16} className="ml-1" />
                  </motion.div>
                </motion.div>
              </div>

              {/* 时间线节点 */}
              <div className="w-2/12 flex justify-center">
                <motion.div
                  className={`w-8 h-8 rounded-full bg-gradient-to-r ${period.color} shadow-lg z-10 flex items-center justify-center`}
                  whileHover={{ scale: 1.2 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.3 + 0.3 }}
                >
                  <Calendar size={16} className="text-white" />
                </motion.div>
              </div>

              {/* 占位空间 */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 详情展示模态 */}
      <AnimatePresence>
        {selectedPeriod !== null && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPeriod(null)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-2 rounded-full bg-gradient-to-r ${periods[selectedPeriod].color} mb-6`}></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{periods[selectedPeriod].title}</h3>
              <p className="text-lg text-gray-500 mb-6">{periods[selectedPeriod].years}</p>
              
              <div className="space-y-3">
                {periods[selectedPeriod].details.map((detail, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${periods[selectedPeriod].color} mt-2 flex-shrink-0`}></div>
                    <p className="text-gray-600">{detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.button
                className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPeriod(null)}
              >
                关闭
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
