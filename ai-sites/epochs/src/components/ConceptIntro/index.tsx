/**
 * 概念介绍组件
 * 负责展示训练轮数的基本概念和通俗解释
 */
import React from 'react';
import { BookOpen, Brain, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ConceptIntro() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-3xl shadow-lg mb-8">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Brain className="inline mr-3 text-blue-600" size={40} />
        训练轮数（Epochs）学习
      </motion.h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <BookOpen className="mr-2 text-green-600" />
            核心概念
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>训练轮数（Epochs）</strong>是机器学习中描述模型训练过程的重要术语。
            一个Epoch表示模型完整地遍历一次整个训练数据集。
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 font-medium">
              💡 通俗理解：训练轮数就像从头到尾复习教材的次数
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
            <TrendingUp className="mr-2 text-orange-600" />
            关键要点
          </h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-400 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-700"><strong>轮数过少：</strong>欠拟合，学习不充分</p>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-green-400 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-700"><strong>轮数适中：</strong>学习效果最佳</p>
            </div>
            <div className="flex items-start">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 mr-3"></div>
              <p className="text-gray-700"><strong>轮数过多：</strong>过拟合，"学傻了"</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-xl flex items-start">
            <AlertTriangle className="text-yellow-600 mr-2 mt-1" size={20} />
            <p className="text-yellow-800 font-medium">
              建议：一般3轮即可，根据LOSS值调整，控制在0.5-1.5之间
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
