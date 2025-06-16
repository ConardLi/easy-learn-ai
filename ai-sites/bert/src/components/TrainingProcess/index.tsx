/**
 * BERT训练过程可视化组件
 * 展示预训练和微调两个阶段的详细流程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Database, Target, Zap } from 'lucide-react';

const TrainingProcess: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const phases = [
    {
      name: "预训练阶段",
      color: "from-blue-500 to-purple-500",
      icon: Database,
      description: "大规模无监督语料训练",
      steps: [
        "收集大规模文本语料（3.3B tokens）",
        "数据预处理和分词",
        "MLM任务：随机掩码15%的tokens",
        "NSP任务：判断句子连续性",
        "多GPU并行训练40个epochs"
      ]
    },
    {
      name: "微调阶段", 
      color: "from-green-500 to-teal-500",
      icon: Target,
      description: "任务特定的监督学习",
      steps: [
        "准备下游任务标注数据",
        "添加任务特定的分类头",
        "使用较小学习率微调",
        "在验证集上调优超参数",
        "评估最终模型性能"
      ]
    }
  ];

  const trainingData = {
    pretraining: {
      data: "BookCorpus (800M) + Wikipedia (2500M)",
      size: "13GB",
      tokens: "3.3B",
      hardware: "16/64 TPUs",
      time: "4天"
    },
    finetuning: {
      data: "任务特定标注数据",
      size: "几MB到几GB",
      epochs: "2-4",
      hardware: "单GPU",
      time: "几小时"
    }
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= phases[currentPhase].steps.length - 1) {
          setIsAnimating(false);
          clearInterval(timer);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          BERT 训练过程
        </h1>
        <p className="text-lg text-gray-600">
          预训练 + 微调的两阶段训练范式
        </p>
      </motion.div>

      {/* 阶段选择器 */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-white rounded-xl p-2 shadow-lg">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  setCurrentPhase(index);
                  setCurrentStep(0);
                  setIsAnimating(false);
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  currentPhase === index
                    ? 'bg-gradient-to-r ' + phase.color + ' text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {phase.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* 训练流程可视化 */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{phases[currentPhase].name}</h2>
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

          <p className="text-gray-600 mb-6">{phases[currentPhase].description}</p>

          <div className="space-y-4">
            {phases[currentPhase].steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  currentStep >= index
                    ? 'bg-gradient-to-r ' + phases[currentPhase].color + ' text-white'
                    : 'bg-gray-50'
                }`}
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{
                  opacity: currentStep >= index ? 1 : 0.5,
                  scale: currentStep === index ? 1.05 : 0.95,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= index 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="flex-1">{step}</span>
                {currentStep === index && isAnimating && (
                  <motion.div
                    className="w-3 h-3 bg-white rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* 训练数据和配置 */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">训练配置对比</h3>
            
            <div className="space-y-4">
              <div className={`p-4 rounded-lg bg-gradient-to-r ${phases[0].color} text-white`}>
                <h4 className="font-semibold mb-3">预训练配置</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>数据来源:</span>
                    <span>{trainingData.pretraining.data}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>数据大小:</span>
                    <span>{trainingData.pretraining.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Token数量:</span>
                    <span>{trainingData.pretraining.tokens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>硬件需求:</span>
                    <span>{trainingData.pretraining.hardware}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>训练时间:</span>
                    <span>{trainingData.pretraining.time}</span>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg bg-gradient-to-r ${phases[1].color} text-white`}>
                <h4 className="font-semibold mb-3">微调配置</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>数据来源:</span>
                    <span>{trainingData.finetuning.data}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>数据大小:</span>
                    <span>{trainingData.finetuning.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>训练轮数:</span>
                    <span>{trainingData.finetuning.epochs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>硬件需求:</span>
                    <span>{trainingData.finetuning.hardware}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>训练时间:</span>
                    <span>{trainingData.finetuning.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">关键优势</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Zap className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-blue-800">一次预训练，多次复用</h4>
                  <p className="text-blue-600 text-sm">
                    预训练模型可以在多个下游任务上微调，大大减少了训练成本
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Target className="text-green-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-green-800">通用语言理解</h4>
                  <p className="text-green-600 text-sm">
                    通过大规模无监督预训练获得深层语言表示能力
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                <Database className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="font-medium text-purple-800">数据高效利用</h4>
                  <p className="text-purple-600 text-sm">
                    少量标注数据即可在特定任务上取得优异性能
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingProcess;
