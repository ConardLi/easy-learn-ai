/**
 * MCP 交互流程动画组件
 * 展示从初始化到最终输出的完整交互流程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

const InteractionFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    {
      id: 'init',
      title: '初始化阶段',
      description: '客户端启动并获取工具列表',
      details: [
        '用户启动 MCP Client',
        '向 MCP Server 发送 GET /tools/list 请求',
        'MCP Server 返回可用工具的元数据',
        '客户端缓存工具列表信息'
      ],
      color: 'from-blue-500 to-blue-600',
      icon: '🚀'
    },
    {
      id: 'input',
      title: '用户输入',
      description: '用户提出需求，系统构建提示词',
      details: [
        '用户输入自然语言请求',
        'MCP Client 分析用户需求',
        '结合工具列表生成提示词',
        '准备调用 LLM 服务'
      ],
      color: 'from-green-500 to-green-600',
      icon: '💬'
    },
    {
      id: 'llm',
      title: 'LLM 处理',
      description: '大语言模型分析并做出决策',
      details: [
        'LLM 服务接收提示词',
        '模型分析是否需要工具',
        '生成工具调用决策',
        '返回处理结果给客户端'
      ],
      color: 'from-purple-500 to-purple-600',
      icon: '🧠'
    },
    {
      id: 'tool',
      title: '工具执行',
      description: '执行具体工具并获取结果',
      details: [
        '获取对应工具的命令模板',
        '生成完整可执行命令',
        '通过 Tool Service 执行命令',
        '本地系统返回执行结果'
      ],
      color: 'from-orange-500 to-orange-600',
      icon: '⚙️'
    },
    {
      id: 'result',
      title: '结果处理',
      description: '将技术结果转换为自然语言',
      details: [
        'Tool Service 格式化结果',
        '再次调用 LLM 进行结果解释',
        '生成用户友好的回复',
        '向用户展示最终结果'
      ],
      color: 'from-pink-500 to-pink-600',
      icon: '✨'
    }
  ];

  const startAnimation = () => {
    setIsPlaying(true);
    setIsComplete(false);
    setCurrentStep(0);
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          setIsComplete(true);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsComplete(false);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      {/* 标题和控制 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">MCP 交互流程</h2>
        <p className="text-gray-600 mb-6">观察从用户请求到结果输出的完整处理流程</p>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={startAnimation}
            disabled={isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>开始演示</span>
          </button>
          
          <button
            onClick={pauseAnimation}
            disabled={!isPlaying}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Pause className="w-5 h-5" />
            <span>暂停</span>
          </button>
          
          <button
            onClick={resetAnimation}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <RotateCcw className="w-5 h-5" />
            <span>重置</span>
          </button>
        </div>
      </motion.div>

      {/* 流程图 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="relative">
          {/* 步骤卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0.3, scale: 0.95 }}
                animate={{
                  opacity: currentStep >= index ? 1 : 0.3,
                  scale: currentStep === index ? 1.05 : 0.95,
                  y: currentStep === index ? -10 : 0
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${step.color} rounded-2xl p-6 text-white shadow-lg ${
                  currentStep === index ? 'ring-4 ring-white shadow-2xl' : ''
                }`}>
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <h3 className="font-bold text-lg">{step.title}</h3>
                    <p className="text-sm opacity-90 mt-2">{step.description}</p>
                  </div>
                  
                  {/* 步骤编号 */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-gray-800 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  
                  {/* 活动指示器 */}
                  {currentStep === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-full h-full bg-white rounded-full opacity-50"
                      />
                    </motion.div>
                  )}
                </div>
                
                {/* 连接箭头 */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <motion.div
                      animate={{
                        opacity: currentStep > index ? 1 : 0.3,
                        x: currentStep > index ? [0, 5, 0] : 0
                      }}
                      transition={{ duration: 0.5, repeat: currentStep > index ? Infinity : 0, repeatDelay: 1 }}
                    >
                      <ChevronRight className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 详细步骤说明 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-200"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {steps[currentStep]?.title} 详解
            </h3>
            <p className="text-gray-600">{steps[currentStep]?.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps[currentStep]?.details.map((detail, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 完成状态 */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 text-white text-center shadow-xl"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold mb-2">流程演示完成！</h3>
            <p className="text-green-100">
              您已了解了 MCP 从用户请求到结果输出的完整交互流程
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractionFlow;
