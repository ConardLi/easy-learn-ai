/**
 * 预训练过程可视化组件
 * 展示 CLM (Causal Language Model) 的训练过程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipForward } from 'lucide-react';

const sampleText = "今天天气很好，我们一起去公园散步吧。";
const tokens = sampleText.split('');

export default function TrainingVisualization() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [predictedChar, setPredictedChar] = useState('');

  useEffect(() => {
    if (isPlaying && currentStep < tokens.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        // 模拟预测下一个字符
        setPredictedChar(tokens[currentStep + 1]);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentStep >= tokens.length - 1) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, tokens]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setPredictedChar('');
  };

  const handleStepForward = () => {
    if (currentStep < tokens.length - 1) {
      setCurrentStep(prev => prev + 1);
      setPredictedChar(tokens[currentStep + 1]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">因果语言模型 (CLM) 训练演示</h2>
        <div className="flex space-x-3">
          <motion.button
            onClick={handlePlayPause}
            className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? '暂停' : '播放'}</span>
          </motion.button>
          <motion.button
            onClick={handleStepForward}
            disabled={currentStep >= tokens.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SkipForward className="w-4 h-4" />
            <span>单步</span>
          </motion.button>
          <motion.button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            重置
          </motion.button>
        </div>
      </div>

      <div className="space-y-8">
        {/* 当前输入序列 */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-blue-800">当前输入序列</h3>
          <div className="flex flex-wrap gap-2">
            {tokens.slice(0, currentStep + 1).map((char, index) => (
              <motion.span
                key={index}
                className={`px-3 py-2 rounded-lg font-mono text-lg ${
                  index === currentStep 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-white text-blue-700 border border-blue-200'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-blue-600 mt-3">
            模型基于当前所有字符预测下一个字符
          </p>
        </div>

        {/* 预测过程 */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">预测过程</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-purple-700">编码输入</h4>
              <p className="text-sm text-purple-600">将输入序列转为向量</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-purple-700">计算概率</h4>
              <p className="text-sm text-purple-600">生成下一字符概率分布</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-purple-700">选择输出</h4>
              <p className="text-sm text-purple-600">选择概率最高的字符</p>
            </div>
          </div>
        </div>

        {/* 预测结果 */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-green-800">预测结果</h3>
          <div className="flex items-center justify-center space-x-4">
            <span className="text-lg text-green-700">下一个字符预测：</span>
            <AnimatePresence mode="wait">
              {predictedChar && (
                <motion.div
                  key={predictedChar}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-mono text-2xl font-bold shadow-lg"
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {predictedChar}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {predictedChar && (
            <motion.p
              className="text-center text-sm text-green-600 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ✓ 预测正确！模型成功预测了下一个字符
            </motion.p>
          )}
        </div>

        {/* 训练统计 */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-orange-800">训练统计</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{currentStep + 1}</div>
              <div className="text-sm text-orange-500">当前步数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{tokens.length}</div>
              <div className="text-sm text-orange-500">总字符数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((currentStep / (tokens.length - 1)) * 100)}%
              </div>
              <div className="text-sm text-orange-500">完成进度</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
