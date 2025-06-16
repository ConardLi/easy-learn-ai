/**
 * 预训练任务展示组件
 * 可视化MLM（掩码语言模型）的工作过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Eye, EyeOff, Zap } from 'lucide-react';

const PretrainTask: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [maskedIndices, setMaskedIndices] = useState<number[]>([]);
  const [predictedIndices, setPredictedIndices] = useState<number[]>([]);

  const originalText = ["研究", "者", "提出", "了", "T5", "模型", "来", "解决", "自然", "语言", "处理", "任务"];
  const maskedText = ["研究", "者", "[MASK]", "了", "[MASK]", "模型", "来", "[MASK]", "自然", "语言", "处理", "任务"];
  const targetText = ["提出", "T5", "解决"];

  const startMLMAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setMaskedIndices([]);
    setPredictedIndices([]);

    setTimeout(() => setCurrentStep(1), 500);
    setTimeout(() => {
      setCurrentStep(2);
      setMaskedIndices([2, 4, 7]);
    }, 1500);
    setTimeout(() => setCurrentStep(3), 3000);
    setTimeout(() => {
      setCurrentStep(4);
      setPredictedIndices([2, 4, 7]);
    }, 4500);
    setTimeout(() => setIsAnimating(false), 6000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setMaskedIndices([]);
    setPredictedIndices([]);
  };

  const renderToken = (token: string, index: number, isMasked: boolean, isPredicted: boolean) => {
    return (
      <motion.div
        key={`${token}-${index}`}
        initial={{ scale: 1 }}
        animate={{
          scale: isMasked && currentStep === 2 ? [1, 1.2, 1] : 1,
          backgroundColor: isMasked ? '#FEE2E2' : isPredicted ? '#DCFCE7' : '#F3F4F6',
          borderColor: isMasked ? '#EF4444' : isPredicted ? '#22C55E' : '#D1D5DB'
        }}
        transition={{ duration: 0.5 }}
        className="inline-block px-3 py-2 rounded-lg border-2 font-mono text-sm font-medium mx-1 my-1"
      >
        {token}
      </motion.div>
    );
  };

  return (
    <section id="pretrain" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            预训练任务：MLM
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            T5使用掩码语言模型（MLM）进行预训练，通过预测被遮蔽的词汇学习语言表示
          </p>
        </motion.div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex justify-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startMLMAnimation}
              disabled={isAnimating}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg disabled:opacity-50"
            >
              <Play className="w-5 h-5" />
              <span>{isAnimating ? 'MLM演示中...' : '开始MLM演示'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetAnimation}
              className="inline-flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
            >
              <RotateCcw className="w-5 h-5" />
              <span>重置</span>
            </motion.button>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center items-center space-x-4">
              {[
                { step: 1, label: "原始文本", icon: Eye },
                { step: 2, label: "添加掩码", icon: EyeOff },
                { step: 3, label: "模型预测", icon: Zap },
                { step: 4, label: "输出结果", icon: Eye }
              ].map(({ step, label, icon: Icon }) => (
                <motion.div
                  key={step}
                  animate={{
                    backgroundColor: currentStep >= step ? '#8B5CF6' : '#E5E7EB',
                    color: currentStep >= step ? '#FFFFFF' : '#6B7280'
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>

            <div className="min-h-32 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-gray-400"
                  >
                    点击"开始MLM演示"查看掩码语言模型的工作过程
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <h3 className="text-lg font-medium text-gray-700 mb-4">原始文本</h3>
                    <div className="flex flex-wrap justify-center">
                      {originalText.map((token, index) => 
                        renderToken(token, index, false, false)
                      )}
                    </div>
                  </motion.div>
                )}

                {(currentStep === 2 || currentStep === 3) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                      {currentStep === 2 ? "添加掩码 (15%的词被随机遮蔽)" : "模型预测被遮蔽的词汇"}
                    </h3>
                    <div className="flex flex-wrap justify-center mb-4">
                      {maskedText.map((token, index) => 
                        renderToken(token, index, maskedIndices.includes(index), false)
                      )}
                    </div>
                    {currentStep === 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                      >
                        <div className="inline-block bg-blue-100 rounded-xl p-4">
                          <div className="text-sm text-blue-800 mb-2">T5模型正在处理...</div>
                          <div className="flex space-x-1 justify-center">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                className="w-2 h-2 bg-blue-500 rounded-full"
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center"
                  >
                    <h3 className="text-lg font-medium text-gray-700 mb-4">预测结果</h3>
                    <div className="flex flex-wrap justify-center mb-6">
                      {originalText.map((token, index) => 
                        renderToken(token, index, false, predictedIndices.includes(index))
                      )}
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-4 inline-block">
                      <h4 className="font-medium text-green-800 mb-2">预测对比</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">位置2:</span>
                          <span className="bg-red-100 px-2 py-1 rounded">[MASK]</span>
                          <span className="text-gray-400">→</span>
                          <span className="bg-green-100 px-2 py-1 rounded">提出</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">位置4:</span>
                          <span className="bg-red-100 px-2 py-1 rounded">[MASK]</span>
                          <span className="text-gray-400">→</span>
                          <span className="bg-green-100 px-2 py-1 rounded">T5</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600">位置7:</span>
                          <span className="bg-red-100 px-2 py-1 rounded">[MASK]</span>
                          <span className="text-gray-400">→</span>
                          <span className="bg-green-100 px-2 py-1 rounded">解决</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <EyeOff className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">随机掩码</h3>
            <p className="text-gray-600">
              随机选择15%的词汇进行遮蔽，让模型学习上下文关系
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">双向学习</h3>
            <p className="text-gray-600">
              利用前后文信息预测被遮蔽的词汇，学习深层语义
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">无监督学习</h3>
            <p className="text-gray-600">
              不需要人工标注，可以在大规模语料上进行预训练
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PretrainTask;
