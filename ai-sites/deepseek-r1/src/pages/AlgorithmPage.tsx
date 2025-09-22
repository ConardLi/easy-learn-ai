/**
 * 算法对比页面组件 - 可视化展示 GRPO vs PPO 算法差异
 * 包含交互式动画演示和详细的技术对比
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Zap, Brain, TrendingUp } from 'lucide-react';

const AlgorithmPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<'ppo' | 'grpo'>('grpo');

  const algorithmSteps = {
    ppo: [
      { title: '输入问题', description: '大语言模型接收问题输入' },
      { title: '生成输出', description: '模型生成一个回答' },
      { title: '奖励评估', description: 'Reward Model 评估完整输出' },
      { title: '价值预测', description: 'Value Model 预测每一步的价值' },
      { title: '计算优势', description: '通过 GAE 计算每步动作的优势' },
      { title: '更新策略', description: '根据优势值更新模型参数' }
    ],
    grpo: [
      { title: '输入问题', description: '大语言模型接收问题输入' },
      { title: '并行生成', description: '模型并行生成多个候选回答' },
      { title: '奖励比较', description: 'Reward Model 对所有候选进行评分' },
      { title: '选择最优', description: '选出得分最高的回答作为目标' },
      { title: '直接优化', description: '让模型向最优回答的方向学习' }
    ]
  };

  const algorithmComparison = {
    complexity: { ppo: 85, grpo: 45 },
    efficiency: { ppo: 60, grpo: 90 },
    stability: { ppo: 75, grpo: 80 },
    performance: { ppo: 70, grpo: 85 }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const maxSteps = algorithmSteps[selectedAlgorithm].length;
          return prev >= maxSteps - 1 ? 0 : prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedAlgorithm]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const currentSteps = algorithmSteps[selectedAlgorithm];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          算法对比：GRPO vs PPO
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          理解 DeepSeek R1 如何通过 GRPO 算法实现更高效的强化学习训练
        </p>
      </motion.div>

      {/* 算法选择器 */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setSelectedAlgorithm('grpo')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              selectedAlgorithm === 'grpo'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            GRPO (R1算法)
          </button>
          <button
            onClick={() => setSelectedAlgorithm('ppo')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              selectedAlgorithm === 'ppo'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            PPO (传统算法)
          </button>
        </div>
      </div>

      {/* 算法流程可视化 */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedAlgorithm === 'grpo' ? 'GRPO' : 'PPO'} 算法流程
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePlayPause}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? '暂停' : '播放'}</span>
            </button>
            <button
              onClick={handleReset}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>重置</span>
            </button>
          </div>
        </div>

        {/* 流程步骤 */}
        <div className="relative">
          <div className="flex justify-between items-center">
            {currentSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-3 relative z-10">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {index + 1}
                </motion.div>
                <div className="text-center max-w-24">
                  <div className={`text-sm font-medium ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 连接线 */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: '0%' }}
              animate={{ 
                width: `${(currentStep / (currentSteps.length - 1)) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* 当前步骤详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              步骤 {currentStep + 1}: {currentSteps[currentStep].title}
            </h3>
            <p className="text-gray-700">
              {currentSteps[currentStep].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 性能对比图表 */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">性能指标对比</h3>
          <div className="space-y-6">
            {Object.entries(algorithmComparison).map(([metric, values]) => {
              const metricNames = {
                complexity: '算法复杂度',
                efficiency: '训练效率',
                stability: '训练稳定性',
                performance: '最终性能'
              };

              return (
                <div key={metric}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {metricNames[metric as keyof typeof metricNames]}
                    </span>
                    <div className="flex space-x-4 text-sm">
                      <span className="text-orange-600">PPO: {values.ppo}%</span>
                      <span className="text-blue-600">GRPO: {values.grpo}%</span>
                    </div>
                  </div>
                  <div className="relative h-4 bg-gray-200 rounded-full">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${values.ppo}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-blue-600 rounded-full opacity-70"
                      initial={{ width: 0 }}
                      animate={{ width: `${values.grpo}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">关键优势</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Zap className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">计算效率提升</div>
                <div className="text-sm text-gray-600">去掉 Value Model，大幅降低内存和计算开销</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">适应开放问题</div>
                <div className="text-sm text-gray-600">不依赖价值模型判断，更适合复杂推理任务</div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
              <div>
                <div className="font-medium text-gray-900">内卷式优化</div>
                <div className="text-sm text-gray-600">通过候选答案竞争，持续提升模型表现</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmPage;
