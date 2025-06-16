/**
 * GPT 架构可视化组件
 * 展示 Decoder-Only 架构的详细结构，包含动画演示
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight } from 'lucide-react';
import { useAtom } from 'jotai';
import { animationPlayingAtom } from '../../state/gptLearningState';

const decoderLayers = [
  { name: 'Input Embeddings', description: '输入词嵌入层', color: 'bg-blue-400' },
  { name: 'Positional Encoding', description: '位置编码层', color: 'bg-green-400' },
  { name: 'Masked Self-Attention', description: '掩码自注意力层', color: 'bg-purple-400' },
  { name: 'Layer Normalization', description: '层归一化', color: 'bg-yellow-400' },
  { name: 'Feed Forward', description: '前馈神经网络', color: 'bg-red-400' },
  { name: 'Output Layer', description: '输出层', color: 'bg-indigo-400' }
];

const inputTokens = ['今天', '天气', '很', '好'];
const outputTokens = ['今天', '天气', '很', '好', '，'];

export default function ArchitectureVisualization() {
  const [isPlaying, setIsPlaying] = useAtom(animationPlayingAtom);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setCurrentStep(0);
    }
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  React.useEffect(() => {
    if (isPlaying && currentStep < decoderLayers.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (currentStep >= decoderLayers.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">GPT Decoder-Only 架构</h2>
        <div className="flex space-x-3">
          <motion.button
            onClick={handlePlayPause}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? '暂停' : '播放'}</span>
          </motion.button>
          <motion.button
            onClick={resetAnimation}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-96">
        {/* 输入部分 */}
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-4 text-center">输入序列</h3>
          <div className="space-y-3">
            {inputTokens.map((token, index) => (
              <motion.div
                key={index}
                className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="font-medium text-blue-800">{token}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 模型架构部分 */}
        <div className="col-span-8 relative">
          <h3 className="text-lg font-semibold mb-4 text-center">Decoder 层处理</h3>
          <div className="flex flex-col space-y-4 h-full justify-center">
            {decoderLayers.map((layer, index) => (
              <motion.div
                key={index}
                className={`relative p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                  selectedLayer === index 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300'
                } ${
                  currentStep > index ? layer.color : 'bg-gray-100'
                }`}
                onClick={() => setSelectedLayer(selectedLayer === index ? null : index)}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0.3 }}
                animate={{ 
                  opacity: currentStep > index ? 1 : 0.3,
                  scale: currentStep === index + 1 ? 1.05 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white">{layer.name}</h4>
                    <p className="text-sm text-white opacity-90">{layer.description}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>

                {/* 动画效果 */}
                <AnimatePresence>
                  {currentStep === index + 1 && (
                    <motion.div
                      className="absolute inset-0 border-2 border-yellow-400 rounded-xl"
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 输出部分 */}
        <div className="col-span-2 flex flex-col justify-center">
          <h3 className="text-lg font-semibold mb-4 text-center">输出序列</h3>
          <div className="space-y-3">
            {outputTokens.map((token, index) => (
              <motion.div
                key={index}
                className={`border-2 rounded-lg p-3 text-center ${
                  index === outputTokens.length - 1 
                    ? 'bg-green-100 border-green-300' 
                    : 'bg-gray-100 border-gray-300'
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: currentStep >= decoderLayers.length ? 1 : 0.3, x: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <span className={`font-medium ${
                  index === outputTokens.length - 1 ? 'text-green-800' : 'text-gray-600'
                }`}>
                  {token}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 层详细信息 */}
      <AnimatePresence>
        {selectedLayer !== null && (
          <motion.div
            className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4 className="text-xl font-bold mb-3 text-gray-800">
              {decoderLayers[selectedLayer].name}
            </h4>
            <p className="text-gray-600 mb-4">{decoderLayers[selectedLayer].description}</p>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold mb-2">功能说明：</h5>
              <p className="text-sm text-gray-700">
                {selectedLayer === 0 && "将输入的词汇转换为高维向量表示，为后续处理提供数值化输入。"}
                {selectedLayer === 1 && "为每个位置添加位置信息，让模型理解序列中词汇的相对位置关系。"}
                {selectedLayer === 2 && "核心注意力机制，但使用掩码确保每个词只能关注到它之前的词，保持自回归特性。"}
                {selectedLayer === 3 && "标准化处理，稳定训练过程，提高模型收敛速度。"}
                {selectedLayer === 4 && "非线性变换层，增强模型的表达能力和特征提取能力。"}
                {selectedLayer === 5 && "将隐藏状态映射到词汇表维度，产生下一个词的概率分布。"}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
