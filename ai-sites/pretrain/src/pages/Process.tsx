/**
 * 训练过程页面
 * 动画展示预训练的具体实施步骤
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 'data-collection',
      title: '数据收集与清洗',
      description: '从互联网收集大规模文本数据，进行质量过滤和去重',
      icon: '📚',
      color: 'from-blue-500 to-blue-600',
      details: [
        'CommonCrawl网页数据',
        '维基百科文章',
        '学术论文和书籍',
        '代码仓库数据'
      ]
    },
    {
      id: 'tokenization',
      title: '文本分词处理',
      description: '将原始文本转换为模型可以理解的token序列',
      icon: '✂️',
      color: 'from-green-500 to-green-600',
      details: [
        'BPE/WordPiece分词',
        '特殊token添加',
        '序列长度截断',
        '批次数据组织'
      ]
    },
    {
      id: 'model-init',
      title: '模型初始化',
      description: '构建Transformer架构，随机初始化模型参数',
      icon: '🏗️',
      color: 'from-purple-500 to-purple-600',
      details: [
        '多层Transformer结构',
        '注意力头配置',
        '参数随机初始化',
        '位置编码设置'
      ]
    },
    {
      id: 'training',
      title: '大规模训练',
      description: '在分布式GPU集群上进行数月的密集训练',
      icon: '🚀',
      color: 'from-red-500 to-red-600',
      details: [
        '语言建模任务',
        '梯度累积优化',
        '学习率调度',
        '检查点保存'
      ]
    },
    {
      id: 'evaluation',
      title: '模型评估',
      description: '在多个基准测试上评估模型性能和能力',
      icon: '📊',
      color: 'from-yellow-500 to-orange-600',
      details: [
        'GLUE/SuperGLUE基准',
        '常识推理测试',
        '数学推理能力',
        '代码生成评估'
      ]
    },
    {
      id: 'deployment',
      title: '模型部署',
      description: '优化模型推理效率，部署到生产环境',
      icon: '🌐',
      color: 'from-indigo-500 to-indigo-600',
      details: [
        '模型量化压缩',
        '推理优化',
        'API接口开发',
        '监控系统部署'
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps.length]);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setProgress(0);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          训练过程
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          跟随动画了解大语言模型从数据到部署的完整训练流程
        </p>
      </motion.div>

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                isPlaying 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="font-medium">{isPlaying ? '暂停' : '播放'}</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gray-500 text-white hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">重置</span>
            </motion.button>

            <div className="text-gray-600 font-medium">
              步骤 {currentStep + 1} / {steps.length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Process Timeline */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-8 bottom-8 w-1 bg-gray-200 rounded-full">
          <motion.div
            className="w-full bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full origin-top"
            style={{
              height: `${((currentStep / (steps.length - 1)) * 100) + (progress / steps.length)}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center cursor-pointer ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              onClick={() => handleStepClick(index)}
            >
              {/* Step Indicator */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className={`absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full shadow-lg z-10 flex items-center justify-center ${
                  index <= currentStep 
                    ? `bg-gradient-to-r ${step.color}` 
                    : 'bg-gray-300'
                } transition-all duration-300`}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : index === currentStep ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Circle className="w-5 h-5 text-white" />
                  </motion.div>
                ) : (
                  <Circle className="w-5 h-5 text-white" />
                )}
              </motion.div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`ml-12 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className={`rounded-2xl p-6 shadow-xl border transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-white/90 backdrop-blur-sm border-indigo-200 shadow-2xl' 
                    : 'bg-white/60 backdrop-blur-sm border-white/30'
                }`}>
                  {/* Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {step.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar for Current Step */}
                  {index === currentStep && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4"
                    >
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                          style={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1 text-right">
                        {progress.toFixed(0)}%
                      </div>
                    </motion.div>
                  )}

                  {/* Details */}
                  <AnimatePresence>
                    {index === currentStep && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2"
                      >
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <ArrowRight className="w-4 h-4 mr-2 text-indigo-500" />
                          关键步骤
                        </h4>
                        <ul className="space-y-1">
                          {step.details.map((detail, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mr-2`}></div>
                              {detail}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white text-center"
      >
        <div className="text-6xl mb-4">🎓</div>
        <h2 className="text-2xl font-bold mb-4">训练完成！</h2>
        <p className="text-lg opacity-90 max-w-3xl mx-auto">
          经过数月的大规模分布式训练，一个强大的大语言模型诞生了。
          它不仅掌握了人类语言的规律，更具备了推理、创作和解决问题的能力。
        </p>
      </motion.div>
    </div>
  );
};

export default Process;
