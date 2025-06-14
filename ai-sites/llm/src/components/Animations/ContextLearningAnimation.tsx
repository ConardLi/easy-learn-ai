/**
 * 上下文学习动画组件
 * 展示模型如何通过示例学习新任务
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, CheckCircle } from 'lucide-react';

const ContextLearningAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: '提供示例',
      description: '给模型展示几个任务示例',
      examples: [
        { input: '苹果', output: '水果' },
        { input: '玫瑰', output: '花朵' },
      ]
    },
    {
      title: '模型学习',
      description: '模型理解任务模式',
      examples: [
        { input: '苹果', output: '水果' },
        { input: '玫瑰', output: '花朵' },
      ]
    },
    {
      title: '应用新例',
      description: '模型处理新的输入',
      examples: [
        { input: '苹果', output: '水果' },
        { input: '玫瑰', output: '花朵' },
        { input: '香蕉', output: '?' }
      ]
    },
    {
      title: '生成答案',
      description: '模型给出正确分类',
      examples: [
        { input: '苹果', output: '水果' },
        { input: '玫瑰', output: '花朵' },
        { input: '香蕉', output: '水果' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
        上下文学习过程
      </h3>
      
      {/* Progress Indicator */}
      <div className="flex items-center space-x-4 mb-6">
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <motion.div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index <= currentStep 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-400'
              }`}
              animate={{
                scale: index === currentStep ? 1.2 : 1
              }}
            >
              {index + 1}
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className="w-8 h-1 bg-gray-200 rounded"
                initial={{ backgroundColor: '#e5e7eb' }}
                animate={{
                  backgroundColor: index < currentStep ? '#3b82f6' : '#e5e7eb'
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current Step Info */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-white rounded-xl p-4 shadow-lg mb-6"
      >
        <h4 className="text-lg font-bold text-gray-800 mb-2">
          {steps[currentStep].title}
        </h4>
        <p className="text-gray-600">
          {steps[currentStep].description}
        </p>
      </motion.div>

      {/* Examples Display */}
      <div className="w-full max-w-md space-y-3">
        {steps[currentStep].examples.map((example, index) => (
          <motion.div
            key={`${currentStep}-${index}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow border"
          >
            <div className="flex-1 text-center">
              <BookOpen className="w-5 h-5 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium text-gray-800">
                {example.input}
              </div>
            </div>
            
            <ArrowRight className="w-5 h-5 text-gray-400" />
            
            <div className="flex-1 text-center">
              <div className="text-sm font-medium text-gray-800">
                {example.output === '?' ? (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-blue-600"
                  >
                    思考中...
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center space-x-1">
                    <span>{example.output}</span>
                    {currentStep === 3 && index === 2 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Points */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6"
      >
        <div className="text-sm text-blue-800">
          <strong>核心优势：</strong> 无需重新训练，仅通过示例即可学习新任务
        </div>
      </motion.div>
    </div>
  );
};

export default ContextLearningAnimation;
