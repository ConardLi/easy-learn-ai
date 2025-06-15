/**
 * BPE算法页面组件
 * 可视化演示Byte Pair Encoding算法的工作原理
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, Zap } from 'lucide-react';

const BPEAlgorithm: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [vocabulary, setVocabulary] = useState<string[]>([]);
  const [mergeHistory, setMergeHistory] = useState<string[]>([]);

  const initialCorpus = ['hug', 'pug', 'hugs', 'pugs', 'huge', 'hugging'];
  const bpeSteps = [
    {
      title: '初始化字符词汇表',
      description: '从基础字符开始构建词汇表',
      vocabulary: ['h', 'u', 'g', 'p', 's', 'e', 'i', 'n'],
      tokens: [['h', 'u', 'g'], ['p', 'u', 'g'], ['h', 'u', 'g', 's'], ['p', 'u', 'g', 's'], ['h', 'u', 'g', 'e'], ['h', 'u', 'g', 'g', 'i', 'n', 'g']],
      merge: '',
      count: {}
    },
    {
      title: '统计字符对频率',
      description: '找到最频繁出现的字符对',
      vocabulary: ['h', 'u', 'g', 'p', 's', 'e', 'i', 'n'],
      tokens: [['h', 'u', 'g'], ['p', 'u', 'g'], ['h', 'u', 'g', 's'], ['p', 'u', 'g', 's'], ['h', 'u', 'g', 'e'], ['h', 'u', 'g', 'g', 'i', 'n', 'g']],
      merge: '',
      count: { 'u+g': 6, 'h+u': 4, 'p+u': 2, 'g+s': 2, 'g+e': 1, 'g+g': 1 }
    },
    {
      title: '合并最频繁对: u+g',
      description: '将"u"和"g"合并为"ug"',
      vocabulary: ['h', 'u', 'g', 'p', 's', 'e', 'i', 'n', 'ug'],
      tokens: [['h', 'ug'], ['p', 'ug'], ['h', 'ug', 's'], ['p', 'ug', 's'], ['h', 'ug', 'e'], ['h', 'ug', 'g', 'i', 'n', 'g']],
      merge: 'u + g → ug',
      count: { 'h+ug': 4, 'p+ug': 2, 'ug+s': 2, 'ug+e': 1, 'ug+g': 1 }
    },
    {
      title: '继续合并: h+ug',
      description: '将"h"和"ug"合并为"hug"',
      vocabulary: ['h', 'u', 'g', 'p', 's', 'e', 'i', 'n', 'ug', 'hug'],
      tokens: [['hug'], ['p', 'ug'], ['hug', 's'], ['p', 'ug', 's'], ['hug', 'e'], ['hug', 'g', 'i', 'n', 'g']],
      merge: 'h + ug → hug',
      count: { 'p+ug': 2, 'hug+s': 1, 'hug+e': 1, 'hug+g': 1 }
    },
    {
      title: '最终结果',
      description: '形成更高效的子词词汇表',
      vocabulary: ['h', 'u', 'g', 'p', 's', 'e', 'i', 'n', 'ug', 'hug', 'pug'],
      tokens: [['hug'], ['pug'], ['hug', 's'], ['pug', 's'], ['hug', 'e'], ['hug', 'g', 'i', 'n', 'g']],
      merge: 'p + ug → pug',
      count: {}
    }
  ];

  const handleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    setCurrentStep(0);
    setVocabulary([]);
    setMergeHistory([]);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= bpeSteps.length - 1) {
          clearInterval(interval);
          setIsAnimating(false);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setVocabulary([]);
    setMergeHistory([]);
  };

  useEffect(() => {
    if (currentStep < bpeSteps.length) {
      setVocabulary(bpeSteps[currentStep].vocabulary);
      if (bpeSteps[currentStep].merge && !mergeHistory.includes(bpeSteps[currentStep].merge)) {
        setMergeHistory(prev => [...prev, bpeSteps[currentStep].merge]);
      }
    }
  }, [currentStep]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          BPE 算法可视化
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          深入理解Byte Pair Encoding算法如何通过迭代合并构建高效的子词词汇表
        </p>
      </motion.div>

      {/* Algorithm Overview */}
      <motion.div
        className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">BPE 算法原理</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">1</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">初始字符表</h3>
            <p className="text-gray-600">从基础字符开始，建立初始词汇表</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">迭代合并</h3>
            <p className="text-gray-600">统计字符对频率，合并最常见的对</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">3</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">优化压缩</h3>
            <p className="text-gray-600">平衡词汇表大小与文本压缩效果</p>
          </div>
        </div>
      </motion.div>

      {/* Animation Controls */}
      <motion.div
        className="flex justify-center space-x-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.button
          onClick={handleAnimation}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium ${
            isAnimating
              ? 'bg-red-500 text-white'
              : 'bg-orange-500 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAnimating ? <Pause size={20} /> : <Play size={20} />}
          <span>{isAnimating ? '暂停演示' : '开始演示'}</span>
        </motion.button>
        <motion.button
          onClick={resetAnimation}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium bg-gray-500 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
          <span>重置</span>
        </motion.button>
      </motion.div>

      {/* Sample Corpus */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">示例语料库</h3>
        <div className="flex flex-wrap gap-2">
          {initialCorpus.map((word, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg font-mono">
              {word}
            </span>
          ))}
        </div>
      </motion.div>

      {/* BPE Process Visualization */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{currentStep + 1}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{bpeSteps[currentStep]?.title}</h3>
            </div>
            <p className="text-gray-600">{bpeSteps[currentStep]?.description}</p>
          </div>

          {/* Current Merge */}
          {bpeSteps[currentStep]?.merge && (
            <motion.div
              className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Zap size={20} className="text-orange-600" />
                <span className="font-semibold text-orange-800">当前合并: </span>
                <span className="font-mono text-orange-700">{bpeSteps[currentStep].merge}</span>
              </div>
            </motion.div>
          )}

          {/* Token Visualization */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-800 mb-3">当前分词结果</h4>
            <div className="space-y-2">
              {bpeSteps[currentStep]?.tokens.map((tokenSeq, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-gray-500 font-mono w-16">{initialCorpus[index]}:</span>
                  <div className="flex space-x-1">
                    {tokenSeq.map((token, tokenIndex) => (
                      <motion.span
                        key={tokenIndex}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-mono border"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tokenIndex * 0.1 }}
                      >
                        {token}
                      </motion.span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frequency Count */}
          {Object.keys(bpeSteps[currentStep]?.count || {}).length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">字符对频率统计</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(bpeSteps[currentStep].count).map(([pair, count]) => (
                  <span
                    key={pair}
                    className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg text-sm font-mono"
                  >
                    {pair}: {count}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Current Vocabulary */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4">当前词汇表</h3>
        <div className="flex flex-wrap gap-2">
          {vocabulary.map((token, index) => (
            <motion.span
              key={index}
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-3 py-1 rounded-lg font-mono border"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {token}
            </motion.span>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">词汇表大小: {vocabulary.length}</p>
      </motion.div>

      {/* BPE Advantages */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">BPE 算法优势</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-green-600 mb-3">可逆无损</h3>
            <p className="text-gray-600">
              可以完整地将Token序列还原为原始文本，保证信息不丢失。
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">泛化性强</h3>
            <p className="text-gray-600">
              能处理未登录词（OOV），如"unhug"会被拆分为已知子词"un"+"hug"。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BPEAlgorithm;
