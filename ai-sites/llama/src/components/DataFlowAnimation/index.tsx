/**
 * 数据流动画组件
 * 动态展示数据在 LLaMA 模型中的处理流程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  input: string;
  output: string;
  position: { x: number; y: number };
  color: string;
}

const DataFlowAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [dataToken, setDataToken] = useState<{ x: number; y: number; visible: boolean }>({
    x: 50, y: 50, visible: false
  });

  const steps: ProcessStep[] = [
    {
      id: 'input',
      name: '文本输入',
      description: '用户输入的原始文本',
      input: '"今天天气很好"',
      output: '原始文本字符串',
      position: { x: 50, y: 100 },
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'tokenize',
      name: '分词处理',
      description: '将文本分解为 token 序列',
      input: '"今天天气很好"',
      output: '[今天, 天气, 很, 好]',
      position: { x: 250, y: 100 },
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'embed',
      name: '向量化',
      description: '转换为高维向量表示',
      input: '[今天, 天气, 很, 好]',
      output: '[[0.1, 0.3, ...], [0.2, 0.8, ...], ...]',
      position: { x: 450, y: 100 },
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'attention',
      name: '自注意力',
      description: '计算词间关联度',
      input: '词向量矩阵',
      output: '加权后的表示',
      position: { x: 150, y: 250 },
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'mlp',
      name: '前馈网络',
      description: '非线性特征变换',
      input: '注意力输出',
      output: '精炼的特征',
      position: { x: 350, y: 250 },
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'output',
      name: '生成输出',
      description: '预测下一个词',
      input: '最终特征',
      output: '下一个词的概率分布',
      position: { x: 250, y: 400 },
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev + 1) % steps.length;
          setDataToken({
            x: steps[next].position.x,
            y: steps[next].position.y,
            visible: true
          });
          return next;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDataToken({ x: 50, y: 50, visible: false });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            数据流处理动画
          </h1>
          <p className="text-gray-600 text-lg">观看数据在 LLaMA 模型中的处理过程</p>
        </motion.div>

        {/* Control Panel */}
        <div className="flex justify-center space-x-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            <span>{isPlaying ? '暂停' : '播放'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gray-500 hover:bg-gray-600 text-white font-medium transition-all duration-300"
          >
            <RotateCcw className="h-5 w-5" />
            <span>重置</span>
          </motion.button>
        </div>

        {/* Animation Canvas */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-8">
          <div className="relative bg-gray-50 rounded-2xl p-8" style={{ height: '500px' }}>
            <svg width="100%" height="100%" className="absolute inset-0">
              {/* Connection Lines */}
              {connections.map((conn, index) => {
                const fromStep = steps[conn.from];
                const toStep = steps[conn.to];
                return (
                  <motion.line
                    key={index}
                    x1={fromStep.position.x + 75}
                    y1={fromStep.position.y + 40}
                    x2={toStep.position.x + 75}
                    y2={toStep.position.y + 40}
                    stroke="#D1D5DB"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: currentStep > conn.from ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Processing Steps */}
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`absolute w-32 h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  index === currentStep 
                    ? 'bg-gradient-to-r ' + step.color + ' text-white shadow-lg scale-110' 
                    : index < currentStep 
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-600'
                }`}
                style={{ 
                  left: step.position.x, 
                  top: step.position.y 
                }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: index === currentStep ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center">
                  <div className="text-sm font-medium">{step.name}</div>
                  {index === currentStep && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                    >
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Animated Data Token */}
            <AnimatePresence>
              {dataToken.visible && (
                <motion.div
                  className="absolute w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                  style={{ left: dataToken.x + 60, top: dataToken.y + 30 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Current Step Details */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${steps[currentStep].color} mr-3`}></div>
              当前步骤: {steps[currentStep].name}
            </h3>
            <div className="text-sm text-gray-500">步骤 {currentStep + 1} / {steps.length}</div>
          </div>
          
          <p className="text-gray-600 text-lg mb-6">{steps[currentStep].description}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                输入数据
              </h4>
              <code className="bg-white px-3 py-2 rounded-lg text-sm text-blue-700 block">
                {steps[currentStep].input}
              </code>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-6">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                输出结果
              </h4>
              <code className="bg-white px-3 py-2 rounded-lg text-sm text-green-700 block">
                {steps[currentStep].output}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataFlowAnimation;
