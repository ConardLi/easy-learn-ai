/**
 * 概念介绍组件
 * 介绍学习率的基本概念和重要性
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Gauge } from 'lucide-react';

const ConceptIntro: React.FC = () => {
  return (
    <motion.section 
      className="bg-white rounded-3xl shadow-2xl p-8 mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lightbulb className="h-8 w-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">什么是学习率？</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">控制参数调整</h3>
          <p className="text-gray-600">
            学习率决定了模型在每次更新时参数调整的幅度，通常在 (0, 1) 之间
          </p>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Gauge className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">影响学习速度</h3>
          <p className="text-gray-600">
            告诉模型在训练过程中"学习"的速度有多快，平衡进步速度与稳定性
          </p>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">关键超参数</h3>
          <p className="text-gray-600">
            是机器学习中最重要的超参数之一，直接影响模型训练效果
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ConceptIntro;
