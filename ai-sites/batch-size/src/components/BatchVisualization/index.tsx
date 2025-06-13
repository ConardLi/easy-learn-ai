/**
 * 批量处理可视化组件
 * 动态展示不同批量大小下的数据处理过程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BatchVisualizationProps {
  perDeviceBatchSize: number;
  gradientAccumulationSteps: number;
}

const BatchVisualization: React.FC<BatchVisualizationProps> = ({
  perDeviceBatchSize,
  gradientAccumulationSteps
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const totalSamples = 32; // 总样本数
  const effectiveBatchSize = perDeviceBatchSize * gradientAccumulationSteps;

  // 生成样本数据
  const samples = Array.from({ length: totalSamples }, (_, i) => ({
    id: i,
    processed: false,
    inCurrentBatch: false
  }));

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isAnimating) return;

    const timer = setInterval(() => {
      setCurrentStep(prev => {
        const next = prev + perDeviceBatchSize;
        if (next >= totalSamples) {
          setIsAnimating(false);
          return 0;
        }
        return next;
      });
    }, 1500);

    return () => clearInterval(timer);
  }, [isAnimating, perDeviceBatchSize]);

  const getCurrentBatchSamples = () => {
    const start = currentStep;
    const end = Math.min(start + perDeviceBatchSize, totalSamples);
    return Array.from({ length: end - start }, (_, i) => start + i);
  };

  const getProcessedSamples = () => {
    return Math.floor(currentStep / effectiveBatchSize) * effectiveBatchSize;
  };

  return (
    <div className="space-y-8">
      {/* 控制面板 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            📊 批量处理可视化
          </h2>
          <div className="flex gap-4">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isAnimating 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isAnimating ? '运行中...' : '开始演示'}
            </button>
            <button
              onClick={stopAnimation}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              停止
            </button>
          </div>
        </div>

        {/* 参数显示 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 font-semibold">单设备批量</div>
            <div className="text-2xl font-bold text-blue-800">{perDeviceBatchSize}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 font-semibold">梯度累积</div>
            <div className="text-2xl font-bold text-purple-800">{gradientAccumulationSteps}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">有效批量</div>
            <div className="text-2xl font-bold text-green-800">{effectiveBatchSize}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-orange-600 font-semibold">当前进度</div>
            <div className="text-2xl font-bold text-orange-800">{currentStep}/{totalSamples}</div>
          </div>
        </div>
      </motion.div>

      {/* 样本可视化 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">样本处理流程</h3>
        
        {/* 样本网格 */}
        <div className="grid grid-cols-8 gap-3 mb-8">
          {samples.map((sample, index) => {
            const isInCurrentBatch = getCurrentBatchSamples().includes(index);
            const isProcessed = index < getProcessedSamples();
            const isInAccumulation = index >= getProcessedSamples() && index < currentStep;
            
            return (
              <motion.div
                key={sample.id}
                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                  isInCurrentBatch
                    ? 'bg-yellow-400 text-yellow-800 shadow-lg scale-110'
                    : isProcessed
                    ? 'bg-green-400 text-green-800'
                    : isInAccumulation
                    ? 'bg-blue-400 text-blue-800'
                    : 'bg-gray-200 text-gray-600'
                }`}
                animate={{
                  scale: isInCurrentBatch ? 1.1 : 1,
                  rotateY: isInCurrentBatch ? 180 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
            );
          })}
        </div>

        {/* 图例 */}
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
            <span className="text-gray-600">待处理</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span className="text-gray-600">当前批次</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span className="text-gray-600">梯度累积中</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-400 rounded"></div>
            <span className="text-gray-600">已完成更新</span>
          </div>
        </div>
      </motion.div>

      {/* 处理步骤说明 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h3 className="text-xl font-bold mb-6">处理步骤说明</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">1️⃣</div>
            <h4 className="font-semibold mb-2">批次处理</h4>
            <p className="text-indigo-100">
              每次处理 {perDeviceBatchSize} 个样本，计算梯度但不更新参数
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">2️⃣</div>
            <h4 className="font-semibold mb-2">梯度累积</h4>
            <p className="text-indigo-100">
              重复 {gradientAccumulationSteps} 次，累积所有梯度
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">3️⃣</div>
            <h4 className="font-semibold mb-2">参数更新</h4>
            <p className="text-indigo-100">
              基于 {effectiveBatchSize} 个样本的累积梯度更新模型参数
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BatchVisualization;
