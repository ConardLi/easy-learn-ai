/**
 * 首页英雄区域组件
 * 展示网站主要介绍和吸引用户注意的动画效果
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { activeNavigationAtom } from '../../stores/navigationState';
import { ChevronDown, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const [, setActiveSection] = useAtom(activeNavigationAtom);

  const floatingElements = [
    { text: '长文本', x: '10%', y: '20%', delay: 0 },
    { text: '知识库', x: '80%', y: '30%', delay: 0.5 },
    { text: '微调', x: '60%', y: '70%', delay: 1 },
    { text: 'AI', x: '20%', y: '80%', delay: 1.5 },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* 背景动画元素 */}
      <div className="absolute inset-0">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 text-blue-600 font-semibold shadow-lg"
            style={{ left: element.x, top: element.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -20, 0],
            }}
            transition={{ 
              delay: element.delay,
              duration: 2,
              y: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            {element.text}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              为什么要微调？
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              探索AI模型优化的三种核心方法：长文本处理、知识库和微调
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">学习目标</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                通过生动的比喻和交互式图表，理解三种AI技术方法的原理、优缺点和适用场景，
                帮助你在实际项目中做出最佳选择。
              </p>
            </div>
          </motion.div>

          <motion.button
            onClick={() => setActiveSection('concepts')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            开始学习
            <ChevronDown className="ml-2 w-6 h-6 animate-bounce" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
