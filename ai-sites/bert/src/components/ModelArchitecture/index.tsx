/**
 * BERT模型架构可视化组件
 * 动态展示BERT的Encoder-Only架构，包括Embedding、Encoder层和分类头
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ModelArchitecture: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentLayer, setCurrentLayer] = useState(-1);

  const layers = [
    { name: "Input Embedding", color: "from-green-400 to-green-600", description: "词嵌入 + 位置编码 + 段编码" },
    { name: "Encoder Layer 1", color: "from-blue-400 to-blue-600", description: "多头注意力 + 前馈网络" },
    { name: "Encoder Layer 2", color: "from-blue-400 to-blue-600", description: "多头注意力 + 前馈网络" },
    { name: "...", color: "from-gray-400 to-gray-600", description: "堆叠的Encoder层" },
    { name: "Encoder Layer 12", color: "from-blue-400 to-blue-600", description: "多头注意力 + 前馈网络" },
    { name: "Prediction Head", color: "from-purple-400 to-purple-600", description: "分类层输出" }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentLayer(0);
    
    const timer = setInterval(() => {
      setCurrentLayer(prev => {
        if (prev >= layers.length - 1) {
          setIsAnimating(false);
          clearInterval(timer);
          return -1;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentLayer(-1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          BERT 模型架构
        </h1>
        <p className="text-lg text-gray-600">
          Encoder-Only 架构：12层编码器的堆叠
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 架构可视化 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">架构演示</h2>
            <div className="flex gap-2">
              <button
                onClick={startAnimation}
                disabled={isAnimating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-all"
              >
                <Play size={16} />
                开始
              </button>
              <button
                onClick={resetAnimation}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                <RotateCcw size={16} />
                重置
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {layers.map((layer, index) => (
              <motion.div
                key={index}
                className={`relative p-4 rounded-lg bg-gradient-to-r ${layer.color} text-white`}
                initial={{ opacity: 0.3, scale: 0.95 }}
                animate={{
                  opacity: currentLayer >= index ? 1 : 0.3,
                  scale: currentLayer === index ? 1.05 : 0.95,
                  y: currentLayer === index ? -5 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{layer.name}</span>
                  {currentLayer === index && (
                    <motion.div
                      className="w-3 h-3 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    />
                  )}
                </div>
                <p className="text-sm opacity-90 mt-1">{layer.description}</p>
                
                {/* 数据流动画 */}
                {currentLayer === index && index < layers.length - 1 && (
                  <motion.div
                    className="absolute -bottom-2 left-1/2 w-2 h-4 bg-yellow-400 rounded-full"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 详细说明 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">架构特点</h3>
            <ul className="space-y-3">
              {[
                "仅使用Transformer的Encoder部分",
                "12层（Base）或24层（Large）编码器堆叠",
                "多头自注意力机制捕捉双向上下文",
                "残差连接和层归一化稳定训练",
                "最终通过分类头适配下游任务"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">关键创新</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800">双向编码</h4>
                <p className="text-blue-600 text-sm mt-1">
                  通过掩码语言模型，同时利用上文和下文信息
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800">预训练范式</h4>
                <p className="text-purple-600 text-sm mt-1">
                  大规模无监督预训练 + 任务特定微调
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800">通用架构</h4>
                <p className="text-green-600 text-sm mt-1">
                  同一模型架构适配多种NLP任务
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelArchitecture;
