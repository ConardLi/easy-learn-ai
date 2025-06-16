/**
 * LoRA 原理可视化组件
 * 通过动画演示 LoRA 的低秩分解原理和工作流程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

const PrincipleVisualization: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);

  const steps = [
    {
      title: '原始大型权重矩阵',
      description: '传统微调需要更新整个权重矩阵 W₀，参数量巨大',
      highlight: 'original'
    },
    {
      title: '低秩分解',
      description: 'LoRA 将更新矩阵 ΔW 分解为两个小矩阵 A 和 B',
      highlight: 'decomposition'
    },
    {
      title: '参数冻结',
      description: '冻结原始权重 W₀，只训练低秩矩阵 A 和 B',
      highlight: 'freeze'
    },
    {
      title: '最终输出',
      description: '最终结果 = W₀x + BAx，大幅减少训练参数',
      highlight: 'result'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const MatrixBlock = ({ 
    width, 
    height, 
    color, 
    label, 
    animated = false,
    delay = 0 
  }: {
    width: number;
    height: number;
    color: string;
    label: string;
    animated?: boolean;
    delay?: number;
  }) => (
    <motion.div
      className={`${color} rounded-lg flex items-center justify-center text-white font-semibold shadow-lg`}
      style={{ width: `${width}px`, height: `${height}px` }}
      initial={animated ? { opacity: 0, scale: 0.8 } : {}}
      animate={animated ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      {label}
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* 控制面板 */}
      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? '暂停' : '播放'}</span>
          </motion.button>
          
          <motion.button
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(false);
            }}
            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>重置</span>
          </motion.button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-600">步骤：</span>
          {steps.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index === currentStep
                  ? 'bg-blue-500 text-white'
                  : index < currentStep
                    ? 'bg-green-400 text-white'
                    : 'bg-gray-200 text-gray-600'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>
      </div>

      {/* 当前步骤说明 */}
      <motion.div
        className="bg-white rounded-xl p-6 border-l-4 border-blue-500 shadow-lg"
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          {steps[currentStep].title}
        </h4>
        <p className="text-gray-600">
          {steps[currentStep].description}
        </p>
      </motion.div>

      {/* 矩阵可视化 */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <div className="flex items-center justify-center space-x-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step0"
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MatrixBlock
                  width={200}
                  height={120}
                  color="bg-red-500"
                  label="W₀ (大矩阵)"
                  animated
                />
                <p className="text-sm text-gray-600">传统微调：更新整个矩阵</p>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="step1"
                className="flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <MatrixBlock
                    width={200}
                    height={120}
                    color="bg-gray-400"
                    label="W₀ (冻结)"
                  />
                  <p className="text-sm text-gray-600">原始矩阵</p>
                </div>

                <motion.div
                  className="text-3xl text-gray-600"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  +
                </motion.div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center space-y-4">
                    <MatrixBlock
                      width={80}
                      height={120}
                      color="bg-blue-500"
                      label="B"
                      animated
                      delay={0.2}
                    />
                    <p className="text-sm text-gray-600">d×r</p>
                  </div>

                  <motion.div
                    className="text-2xl text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    ×
                  </motion.div>

                  <div className="flex flex-col items-center space-y-4">
                    <MatrixBlock
                      width={120}
                      height={60}
                      color="bg-green-500"
                      label="A"
                      animated
                      delay={0.4}
                    />
                    <p className="text-sm text-gray-600">r×k</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                className="flex items-center space-x-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <MatrixBlock
                      width={200}
                      height={120}
                      color="bg-gray-400"
                      label="W₀"
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-red-500 rounded-lg"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      冻结
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">不更新</p>
                </div>

                <div className="text-3xl text-gray-600">+</div>

                <div className="flex items-center space-x-2">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <MatrixBlock
                        width={80}
                        height={120}
                        color="bg-blue-500"
                        label="B"
                      />
                      <motion.div
                        className="absolute inset-0 border-4 border-green-400 rounded-lg"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        可训练
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">训练</p>
                  </div>

                  <div className="text-2xl text-gray-600">×</div>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <MatrixBlock
                        width={120}
                        height={60}
                        color="bg-green-500"
                        label="A"
                      />
                      <motion.div
                        className="absolute inset-0 border-4 border-green-400 rounded-lg"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                        可训练
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">训练</p>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                className="flex flex-col items-center space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-lg font-medium">
                    输出 = W₀x + BAx
                  </div>
                </div>
                
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-4 rounded-xl shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-center">
                    <div className="text-lg font-semibold">参数量对比</div>
                    <div className="text-sm mt-1">原始：100% → LoRA：1-10%</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 关键优势 */}
      <motion.div
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h4 className="text-xl font-semibold mb-4">LoRA 的关键优势</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold">10000×</div>
            <div className="text-sm">参数量减少</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold">3×</div>
            <div className="text-sm">内存需求降低</div>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <div className="text-2xl font-bold">快速</div>
            <div className="text-sm">训练和推理</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrincipleVisualization;
