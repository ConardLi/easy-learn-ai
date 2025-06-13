/**
 * 梯度累积演示组件
 * 动态展示梯度累积的"分期付款"过程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GradientAccumulationProps {
  perDeviceBatchSize: number;
  gradientAccumulationSteps: number;
}

interface GradientStep {
  step: number;
  samples: number[];
  gradient: number;
  accumulated: number;
  isComplete: boolean;
}

const GradientAccumulation: React.FC<GradientAccumulationProps> = ({
  perDeviceBatchSize,
  gradientAccumulationSteps
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gradientSteps, setGradientSteps] = useState<GradientStep[]>([]);
  const [accumulatedGradient, setAccumulatedGradient] = useState(0);

  // 初始化梯度步骤
  useEffect(() => {
    const steps: GradientStep[] = [];
    for (let i = 0; i < gradientAccumulationSteps; i++) {
      const samples = Array.from({ length: perDeviceBatchSize }, (_, j) => i * perDeviceBatchSize + j + 1);
      const gradient = Math.random() * 0.8 + 0.2; // 随机梯度值
      steps.push({
        step: i + 1,
        samples,
        gradient,
        accumulated: 0,
        isComplete: false
      });
    }
    setGradientSteps(steps);
    setCurrentStep(0);
    setAccumulatedGradient(0);
  }, [perDeviceBatchSize, gradientAccumulationSteps]);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setAccumulatedGradient(0);
    
    // 重置所有步骤
    setGradientSteps(prev => prev.map(step => ({
      ...step,
      accumulated: 0,
      isComplete: false
    })));
  };

  const stopAnimation = () => {
    setIsAnimating(false);
  };

  useEffect(() => {
    if (!isAnimating || currentStep >= gradientAccumulationSteps) return;

    const timer = setTimeout(() => {
      setGradientSteps(prev => {
        const newSteps = [...prev];
        const currentGradient = newSteps[currentStep].gradient;
        const newAccumulated = accumulatedGradient + currentGradient;
        
        newSteps[currentStep] = {
          ...newSteps[currentStep],
          accumulated: newAccumulated,
          isComplete: true
        };
        
        return newSteps;
      });
      
      setAccumulatedGradient(prev => prev + gradientSteps[currentStep]?.gradient || 0);
      setCurrentStep(prev => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAnimating, currentStep, gradientAccumulationSteps, accumulatedGradient, gradientSteps]);

  const isUpdateStep = currentStep === gradientAccumulationSteps && isAnimating;

  return (
    <div className="space-y-8">
      {/* 控制面板 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            ⚡ 梯度累积演示
          </h2>
          <div className="flex gap-4">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isAnimating 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl'
              }`}
            >
              {isAnimating ? '演示中...' : '开始演示'}
            </button>
            <button
              onClick={stopAnimation}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
            >
              重置
            </button>
          </div>
        </div>

        {/* 当前状态 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 font-semibold">当前步骤</div>
            <div className="text-2xl font-bold text-blue-800">
              {isUpdateStep ? '更新参数' : `${currentStep}/${gradientAccumulationSteps}`}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-purple-600 font-semibold">累积梯度</div>
            <div className="text-2xl font-bold text-purple-800">
              {accumulatedGradient.toFixed(2)}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 font-semibold">有效批量</div>
            <div className="text-2xl font-bold text-green-800">
              {perDeviceBatchSize * gradientAccumulationSteps}
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="text-orange-600 font-semibold">显存节省</div>
            <div className="text-2xl font-bold text-orange-800">
              {Math.round((1 - 1/gradientAccumulationSteps) * 100)}%
            </div>
          </div>
        </div>
      </motion.div>

      {/* 梯度累积流程 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">梯度累积流程</h3>
        
        <div className="space-y-6">
          {gradientSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className={`border-2 rounded-xl p-6 transition-all duration-500 ${
                index === currentStep && isAnimating
                  ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                  : step.isComplete
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              animate={{
                scale: index === currentStep && isAnimating ? 1.02 : 1,
                y: index === currentStep && isAnimating ? -5 : 0
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  步骤 {step.step} - 处理 {perDeviceBatchSize} 个样本
                </h4>
                <div className="flex items-center gap-2">
                  {step.isComplete && <span className="text-green-600 text-xl">✅</span>}
                  {index === currentStep && isAnimating && (
                    <div className="animate-spin w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full"></div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 样本展示 */}
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">处理样本</h5>
                  <div className="flex flex-wrap gap-2">
                    {step.samples.map((sample, i) => (
                      <motion.div
                        key={sample}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          index === currentStep && isAnimating
                            ? 'bg-yellow-400 text-yellow-800'
                            : step.isComplete
                            ? 'bg-green-400 text-green-800'
                            : 'bg-gray-300 text-gray-600'
                        }`}
                        animate={{
                          rotateY: index === currentStep && isAnimating ? 180 : 0,
                          scale: index === currentStep && isAnimating ? 1.1 : 1
                        }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        {sample}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* 梯度计算 */}
                <div className="text-center">
                  <h5 className="font-medium text-gray-700 mb-3">计算梯度</h5>
                  <motion.div
                    className={`text-2xl font-bold ${
                      index === currentStep && isAnimating
                        ? 'text-yellow-600'
                        : step.isComplete
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                    animate={{
                      scale: index === currentStep && isAnimating ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 1, repeat: index === currentStep && isAnimating ? Infinity : 0 }}
                  >
                    {step.gradient.toFixed(2)}
                  </motion.div>
                  <p className="text-sm text-gray-500 mt-1">梯度值</p>
                </div>

                {/* 累积状态 */}
                <div className="text-center">
                  <h5 className="font-medium text-gray-700 mb-3">累积梯度</h5>
                  <div className={`text-2xl font-bold ${
                    step.isComplete ? 'text-purple-600' : 'text-gray-400'
                  }`}>
                    {step.accumulated.toFixed(2)}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">累积到当前</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 参数更新 */}
        <AnimatePresence>
          {isUpdateStep && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              className="mt-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-6xl mb-4 inline-block"
              >
                ⚡
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">参数更新中...</h3>
              <p className="text-lg mb-4">
                基于累积梯度 {accumulatedGradient.toFixed(2)} 更新模型参数
              </p>
              <div className="text-sm bg-white/20 rounded-lg p-3 inline-block">
                等效批量大小: {perDeviceBatchSize * gradientAccumulationSteps} 个样本
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 类比说明 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          "分期付款"类比理解
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">传统方式 (直接大批量)</h4>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="mb-2">💰 一次性支付 {perDeviceBatchSize * gradientAccumulationSteps} 元</p>
              <p className="mb-2">💾 需要大量现金 (显存)</p>
              <p>❌ 可能支付不起</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">梯度累积 (分期付款)</h4>
            <div className="bg-white/20 rounded-lg p-4">
              <p className="mb-2">💸 分 {gradientAccumulationSteps} 期，每期 {perDeviceBatchSize} 元</p>
              <p className="mb-2">💾 只需少量现金 (显存)</p>
              <p>✅ 最终支付相同总额</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <p className="text-center text-lg">
            <strong>核心思想：</strong> 用时间换空间，用多次小计算实现一次大计算的效果！
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default GradientAccumulation;
