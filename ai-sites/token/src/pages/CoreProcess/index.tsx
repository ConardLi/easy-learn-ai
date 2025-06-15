/**
 * 核心流程页面组件
 * 展示Tokenization的完整处理流程，包括预训练阶段和实时分词过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, Database, Cpu, Hash } from 'lucide-react';

const CoreProcess: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const phases = [
    {
      title: '预训练阶段：构建词汇表',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      steps: [
        { title: '收集语料库', description: '获取大量文本数据（网页、书籍等）', data: ['网页文本', '书籍内容', '新闻文章'] },
        { title: '初始分词', description: '用基础方法分割文本', data: ['Hello', 'world', '!'] },
        { title: '选择算法', description: '选择分词算法（BPE、WordPiece等）', data: ['BPE', 'WordPiece', 'SentencePiece'] },
        { title: '生成词汇表', description: '合并高频Token对', data: ['un+der→under', 'Token+ize→Tokenize'] },
        { title: '分配ID', description: '为每个Token分配唯一ID', data: ['hello→123', 'world→456', '!→789'] }
      ]
    },
    {
      title: '实时分词过程',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      steps: [
        { title: '文本输入', description: '接收用户输入的文本', data: ['Hello, world!'] },
        { title: '文本转换', description: '将文本拆分为词汇表中的Token', data: ['Hello', ',', ' ', 'world', '!'] },
        { title: 'ID映射', description: 'Token转为对应的整数ID', data: ['123', '124', '125', '456', '789'] },
        { title: '添加特殊Token', description: '添加控制Token', data: ['<|start|>', '123', '124', '125', '456', '789', '<|end|>'] }
      ]
    }
  ];

  const handleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
      return;
    }
    
    setIsAnimating(true);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        const maxSteps = phases[currentPhase].steps.length;
        if (prev >= maxSteps - 1) {
          clearInterval(interval);
          setIsAnimating(false);
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

  // 获取当前阶段的图标组件
  const CurrentPhaseIcon = phases[currentPhase].icon;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Tokenization 核心流程
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          深入了解从词汇表构建到实时分词的完整处理流程
        </p>
      </motion.div>

      {/* Phase Selector */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentPhase(index);
                  setCurrentStep(0);
                  setIsAnimating(false);
                }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  currentPhase === index
                    ? `bg-gradient-to-r ${phase.color} text-white`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span>{phase.title}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Animation Controls */}
      <motion.div
        className="flex justify-center space-x-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.button
          onClick={handleAnimation}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium ${
            isAnimating
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isAnimating ? <Pause size={20} /> : <Play size={20} />}
          <span>{isAnimating ? '暂停演示' : '开始演示'}</span>
        </motion.button>
        <motion.button
          onClick={resetAnimation}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-medium bg-gray-500 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={20} />
          <span>重置</span>
        </motion.button>
      </motion.div>

      {/* Process Visualization */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="mb-8">
          <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${phases[currentPhase].color} text-white px-4 py-2 rounded-lg font-semibold mb-4`}>
            <CurrentPhaseIcon size={20} />
            <span>{phases[currentPhase].title}</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {phases[currentPhase].steps.map((step, index) => (
            <motion.div
              key={index}
              className={`border-2 rounded-xl p-6 transition-all duration-500 ${
                index <= currentStep
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ 
                opacity: index <= currentStep ? 1 : 0.5,
                scale: index === currentStep ? 1.02 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  index <= currentStep
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  
                  {index <= currentStep && (
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {step.data.map((item, dataIndex) => (
                        <motion.span
                          key={dataIndex}
                          className="bg-white border border-blue-200 text-blue-800 px-3 py-1 rounded-lg text-sm font-mono"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.3 + dataIndex * 0.1 }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Insights */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">关键洞察</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <Database size={20} className="text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-600">预训练的重要性</h3>
            </div>
            <p className="text-gray-600">
              词汇表的质量直接影响模型性能。高质量的语料库和合适的分词算法是构建有效词汇表的关键。
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <Hash size={20} className="text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-600">实时处理效率</h3>
            </div>
            <p className="text-gray-600">
              分词器的效率直接影响模型的推理速度。优化的分词算法能显著提升实际应用中的响应时间。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CoreProcess;