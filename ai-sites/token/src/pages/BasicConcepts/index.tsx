/**
 * 基础概念页面组件
 * 介绍Token和Tokenization的基本概念，包含动画演示
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const BasicConcepts: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tokenizationSteps = [
    { text: 'Hello, world!', tokens: ['Hello', ',', ' ', 'world', '!'] },
    { text: 'Tokenization', tokens: ['Token', 'ization'] },
    { text: 'Machine Learning', tokens: ['Machine', ' ', 'Learning'] },
  ];

  const handleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= tokenizationSteps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Token 基础概念
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          理解Token和Tokenization的核心概念，它们是大语言模型处理文本的基础
        </p>
      </motion.div>

      {/* Concept Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white font-bold text-2xl">T</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">什么是Token？</h2>
          <p className="text-gray-600 mb-4">
            Token是语言处理的基本单元，类似于构成文本的"原子"。它可以是：
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              一个字符（如 "a"）
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              一个子词（如 "ing"）
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              一个完整单词（如 "apple"）
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              一个短语或符号
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-white font-bold text-xl">分</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">什么是Tokenization？</h2>
          <p className="text-gray-600 mb-4">
            Tokenization（分词）是将文本字符串转换为Token序列的过程：
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              文本 → Token序列
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              Token → 整数ID
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              可逆转换过程
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              模型输入预处理
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Interactive Demo */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">分词演示</h2>
          <div className="flex space-x-2">
            <motion.button
              onClick={handleAnimation}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium ${
                isAnimating
                  ? 'bg-red-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnimating ? <Pause size={16} /> : <Play size={16} />}
              <span>{isAnimating ? '暂停' : '播放'}</span>
            </motion.button>
            <motion.button
              onClick={resetAnimation}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-gray-500 text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RotateCcw size={16} />
              <span>重置</span>
            </motion.button>
          </div>
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">原始文本</h3>
                <div className="text-2xl font-mono bg-gray-100 rounded-lg p-4 inline-block">
                  "{tokenizationSteps[currentStep].text}"
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-8 h-1 bg-blue-500 rounded"></div>
                  <span className="text-blue-600 font-semibold">Tokenization</span>
                  <div className="w-8 h-1 bg-blue-500 rounded"></div>
                </motion.div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-600 mb-4">Token序列</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {tokenizationSteps[currentStep].tokens.map((token, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg font-mono text-sm"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      "{token}"
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Key Points */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">关键要点</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Token的作用</h3>
            <p className="text-gray-600">
              Token是大语言模型理解和处理文本的基础单位。模型通过学习Token之间的关系来理解语言规律。
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">分词器的独立性</h3>
            <p className="text-gray-600">
              Tokenizer是独立于LLM的模块，有自己的训练数据集。不同的分词器会产生不同的Token序列。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BasicConcepts;
