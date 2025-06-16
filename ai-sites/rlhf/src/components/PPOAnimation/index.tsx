/**
 * PPO训练过程动画组件
 * 展示四个模型（Actor、Ref、Reward、Critic）的交互过程
 * 包含详细的数据流和计算步骤演示
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, Cpu, Calculator, Target } from 'lucide-react';

interface ModelState {
  name: string;
  type: 'actor' | 'ref' | 'reward' | 'critic';
  color: string;
  position: { x: number; y: number };
  isActive: boolean;
  output?: string;
}

const PPOAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [animationData, setAnimationData] = useState<any>({});

  const models: ModelState[] = [
    {
      name: 'Actor Model',
      type: 'actor',
      color: 'from-blue-500 to-blue-600',
      position: { x: 20, y: 30 },
      isActive: false
    },
    {
      name: 'Ref Model',
      type: 'ref',
      color: 'from-green-500 to-green-600',
      position: { x: 80, y: 30 },
      isActive: false
    },
    {
      name: 'Reward Model',
      type: 'reward',
      color: 'from-purple-500 to-purple-600',
      position: { x: 20, y: 70 },
      isActive: false
    },
    {
      name: 'Critic Model',
      type: 'critic',
      color: 'from-orange-500 to-orange-600',
      position: { x: 80, y: 70 },
      isActive: false
    }
  ];

  const steps = [
    {
      id: 0,
      title: "输入提示词（Prompt）",
      description: "向Actor和Ref模型输入相同的提示词",
      activeModels: [],
      explanation: "开始PPO训练流程，准备输入数据"
    },
    {
      id: 1,
      title: "生成响应",
      description: "Actor和Ref模型分别生成回复",
      activeModels: ['actor', 'ref'],
      explanation: "两个模型基于相同输入生成不同的响应"
    },
    {
      id: 2,
      title: "计算KL散度",
      description: "比较Actor和Ref的输出分布差异",
      activeModels: ['actor', 'ref'],
      explanation: "确保Actor模型不会偏离原模型太远"
    },
    {
      id: 3,
      title: "奖励评分",
      description: "Reward和Critic模型对Actor响应打分",
      activeModels: ['actor', 'reward', 'critic'],
      explanation: "评估响应质量，提供优化信号"
    },
    {
      id: 4,
      title: "计算损失",
      description: "综合KL散度和模型评分计算最终损失",
      activeModels: ['actor', 'ref', 'reward', 'critic'],
      explanation: "准备更新Actor和Critic模型参数"
    },
    {
      id: 5,
      title: "参数更新",
      description: "更新Actor和Critic模型参数",
      activeModels: ['actor', 'critic'],
      explanation: "完成一轮PPO训练，模型得到优化"
    }
  ];

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsAnimating(false);
            return prev;
          }
        });
      }, 2500);

      return () => clearInterval(interval);
    }
  }, [isAnimating, steps.length]);

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
    setAnimationData({});
  };

  const getModelState = (modelType: string): ModelState => {
    const model = models.find(m => m.type === modelType);
    if (!model) throw new Error(`Model ${modelType} not found`);
    
    return {
      ...model,
      isActive: steps[currentStep]?.activeModels.includes(modelType) || false
    };
  };

  // 修复：正确提取颜色值的函数
  const getGradientStyle = (colorString: string) => {
    const colorParts = colorString.split(' ');
    const fromColor = colorParts[0]?.replace('from-', '') || 'blue-500';
    const toColor = colorParts[1]?.replace('to-', '') || 'blue-600';
    
    // 将Tailwind颜色名转换为CSS颜色
    const colorMap: { [key: string]: string } = {
      'blue-500': '#3b82f6',
      'blue-600': '#2563eb',
      'green-500': '#10b981',
      'green-600': '#059669',
      'purple-500': '#8b5cf6',
      'purple-600': '#7c3aed',
      'orange-500': '#f97316',
      'orange-600': '#ea580c'
    };
    
    return `linear-gradient(to right, ${colorMap[fromColor] || '#3b82f6'}, ${colorMap[toColor] || '#2563eb'})`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PPO 训练过程详解
        </h2>
        <p className="text-gray-600 mb-6">
          四个模型协同工作的强化学习训练流程
        </p>

        {/* Animation Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={isAnimating ? () => setIsAnimating(false) : startAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isAnimating ? '暂停动画' : '开始演示'}
          </motion.button>
          
          <motion.button
            onClick={resetAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            重置
          </motion.button>
        </div>
      </motion.div>

      {/* Main Animation Area */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Models Visualization */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">四模型交互图</h3>
          
          <div className="relative h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
            {/* Input Prompt */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: currentStep >= 0 ? 1 : 0, y: currentStep >= 0 ? 0 : -20 }}
              className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-2 border-yellow-300 rounded-xl px-4 py-2 text-sm font-medium shadow-lg"
            >
              📝 Prompt: "如何提高学习效率？"
            </motion.div>

            {/* Models */}
            {models.map((model) => {
              const state = getModelState(model.type);
              return (
                <motion.div
                  key={model.type}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-xl border-4 ${
                    state.isActive ? 'border-yellow-400' : 'border-transparent'
                  }`}
                  style={{
                    left: `${model.position.x}%`,
                    top: `${model.position.y}%`,
                    background: getGradientStyle(model.color)
                  }}
                  animate={{
                    scale: state.isActive ? 1.1 : 1,
                    boxShadow: state.isActive ? '0 0 20px rgba(255, 215, 0, 0.5)' : '0 10px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Cpu className="w-8 h-8 mb-1" />
                  <div className="text-xs text-center leading-tight">
                    {model.name.split(' ')[0]}
                  </div>
                </motion.div>
              );
            })}

            {/* Data Flow Arrows */}
            <AnimatePresence>
              {currentStep >= 1 && (
                <>
                  {/* Prompt to models */}
                  <motion.div
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ pathLength: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute top-16 left-1/2 w-px h-8 bg-blue-500"
                    style={{ transformOrigin: 'top' }}
                  />
                </>
              )}

              {currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-100 border-2 border-red-300 rounded-xl px-3 py-1 text-xs font-medium"
                >
                  KL散度: 0.23
                </motion.div>
              )}

              {currentStep >= 3 && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute bottom-4 left-4 bg-purple-100 border-2 border-purple-300 rounded-xl px-3 py-1 text-xs font-medium"
                  >
                    奖励分数: 8.5
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute bottom-4 right-4 bg-orange-100 border-2 border-orange-300 rounded-xl px-3 py-1 text-xs font-medium"
                  >
                    价值评估: 7.2
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Step Information */}
        <div className="space-y-6">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="font-bold">{currentStep + 1}</span>
              </div>
              <h3 className="text-lg font-bold">{steps[currentStep]?.title}</h3>
            </div>
            <p className="text-indigo-100 mb-4">{steps[currentStep]?.description}</p>
            <p className="text-white/90 text-sm">{steps[currentStep]?.explanation}</p>
          </motion.div>

          {/* Mathematical Formula */}
          {currentStep >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-xl"
            >
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-500" />
                损失函数
              </h4>
              <div className="bg-gray-100 rounded-xl p-4 font-mono text-sm">
                <div className="text-blue-600 mb-2">loss = -(kl_ctl × r_KL + γ × V_{`{t+1}`} - V_t) × logP(A_t|V_t)</div>
                <div className="text-gray-600 text-xs">
                  <div>• r_KL: KL散度惩罚项</div>
                  <div>• V_t: Critic模型输出</div>
                  <div>• A_t: Reward模型评分</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Resource Usage */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-xl">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-500" />
              资源需求
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">显存占用：</span>
                <span className="font-medium text-red-600">240GB (4×A100)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">模型数量：</span>
                <span className="font-medium text-blue-600">4个模型</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">训练复杂度：</span>
                <span className="font-medium text-orange-600">极高</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center gap-2 flex-wrap">
        {steps.map((step, index) => (
          <motion.button
            key={step.id}
            onClick={() => setCurrentStep(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              index === currentStep
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-white border border-gray-200'
            }`}
          >
            步骤 {index + 1}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PPOAnimation;