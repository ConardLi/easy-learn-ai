/**
 * Encoder-Decoder架构可视化组件
 * 展示T5的双塔结构和数据流动过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, Database, Cpu } from 'lucide-react';

const EncoderDecoder: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const inputTokens = ['How', 'are', 'you', '?'];
  const outputTokens = ['你', '好', '吗', '？'];
  const steps = [
    '输入分词',
    'Encoder处理',
    'Encoder-Decoder交互',
    'Decoder生成',
    '输出结果'
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    
    const stepDuration = 1500;
    steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, stepDuration * (index + 1));
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, stepDuration * (steps.length + 1));
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Encoder-Decoder架构
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            T5采用经典的Encoder-Decoder结构，让我们看看数据是如何在模型中流动的
          </p>
        </motion.div>

        {/* 控制面板 */}
        <div className="flex justify-center space-x-4 mb-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startAnimation}
            disabled={isAnimating}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg disabled:opacity-50"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isAnimating ? '演示中...' : '开始演示'}</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetAnimation}
            className="inline-flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            <span>重置</span>
          </motion.button>
        </div>

        {/* 架构图 */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {/* 步骤指示器 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                animate={{
                  backgroundColor: currentStep > index ? '#3B82F6' : '#E5E7EB',
                  color: currentStep > index ? '#FFFFFF' : '#6B7280'
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                {index + 1}. {step}
              </motion.div>
            ))}
          </div>

          {/* 主体架构 */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* 输入 */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">输入文本</h3>
              <div className="space-y-2">
                {inputTokens.map((token, index) => (
                  <motion.div
                    key={token}
                    initial={{ scale: 1, backgroundColor: '#F3F4F6' }}
                    animate={{
                      scale: currentStep >= 1 ? [1, 1.1, 1] : 1,
                      backgroundColor: currentStep >= 1 ? '#DBEAFE' : '#F3F4F6'
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 rounded-lg border font-mono"
                  >
                    {token}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 箭头1 */}
            <div className="text-center">
              <motion.div
                animate={{
                  opacity: currentStep >= 1 ? 1 : 0.3,
                  x: currentStep >= 1 ? [0, 10, 0] : 0
                }}
                transition={{ duration: 0.6, repeat: isAnimating ? Infinity : 0 }}
              >
                <ArrowRight className="w-8 h-8 text-blue-600 mx-auto" />
              </motion.div>
            </div>

            {/* Encoder */}
            <div className="text-center">
              <motion.div
                animate={{
                  backgroundColor: currentStep >= 2 ? '#3B82F6' : '#F3F4F6',
                  scale: currentStep >= 2 ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.8 }}
                className="w-24 h-32 mx-auto rounded-2xl flex flex-col items-center justify-center mb-4"
              >
                <Cpu className={`w-8 h-8 ${currentStep >= 2 ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium mt-2 ${currentStep >= 2 ? 'text-white' : 'text-gray-600'}`}>
                  Encoder
                </span>
              </motion.div>
              
              <motion.div
                animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
                className="text-xs text-gray-500"
              >
                理解输入语义
              </motion.div>
            </div>

            {/* Decoder */}
            <div className="text-center">
              <motion.div
                animate={{
                  backgroundColor: currentStep >= 4 ? '#10B981' : '#F3F4F6',
                  scale: currentStep >= 4 ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.8 }}
                className="w-24 h-32 mx-auto rounded-2xl flex flex-col items-center justify-center mb-4"
              >
                <Database className={`w-8 h-8 ${currentStep >= 4 ? 'text-white' : 'text-gray-600'}`} />
                <span className={`text-sm font-medium mt-2 ${currentStep >= 4 ? 'text-white' : 'text-gray-600'}`}>
                  Decoder
                </span>
              </motion.div>
              
              <motion.div
                animate={{ opacity: currentStep >= 4 ? 1 : 0 }}
                className="text-xs text-gray-500"
              >
                生成目标文本
              </motion.div>

              {/* Cross Attention */}
              <motion.div
                animate={{
                  opacity: currentStep === 3 ? 1 : 0,
                  scale: currentStep === 3 ? [1, 1.2, 1] : 1
                }}
                transition={{ duration: 0.6, repeat: currentStep === 3 ? Infinity : 0 }}
                className="absolute lg:relative mt-4"
              >
                <div className="w-20 h-1 bg-purple-500 rounded-full mx-auto"></div>
                <span className="text-xs text-purple-600 font-medium">Cross Attention</span>
              </motion.div>
            </div>

            {/* 输出 */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-4">输出文本</h3>
              <div className="space-y-2">
                <AnimatePresence>
                  {currentStep >= 5 && outputTokens.map((token, index) => (
                    <motion.div
                      key={token}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="px-4 py-2 rounded-lg border bg-green-50 border-green-200 font-mono"
                    >
                      {token}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 处理步骤说明 */}
          <motion.div
            animate={{ opacity: currentStep > 0 ? 1 : 0 }}
            className="mt-8 p-6 bg-gray-50 rounded-2xl"
          >
            <h4 className="font-bold text-gray-800 mb-3">当前步骤说明：</h4>
            <div className="text-gray-600">
              {currentStep === 1 && "输入文本被分词处理，转换为模型可理解的token序列"}
              {currentStep === 2 && "Encoder通过Self-Attention机制理解输入文本的语义表示"}
              {currentStep === 3 && "Decoder通过Cross-Attention机制关注Encoder的输出信息"}
              {currentStep === 4 && "Decoder逐个生成目标语言的token"}
              {currentStep === 5 && "输出完整的翻译结果"}
              {currentStep === 0 && "点击开始演示按钮查看T5架构的工作流程"}
            </div>
          </motion.div>
        </div>

        {/* 架构特点说明 */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Encoder优势</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>双向注意力机制，全面理解输入语义</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>并行处理，训练效率高</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>强大的特征提取能力</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Decoder优势</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>自回归生成，保证输出连贯性</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>Cross-Attention机制有效利用输入信息</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                <span>适合各种生成任务</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EncoderDecoder;
