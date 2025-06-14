/**
 * 逐步推理动画组件
 * 展示模型如何进行思维链推理
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowRight, CheckCircle, Calculator } from 'lucide-react';

const ReasoningAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showFinalAnswer, setShowFinalAnswer] = useState(false);

  const problem = {
    question: '小明有15个苹果，给了小红5个，又买了8个，现在小明有多少个苹果？',
    steps: [
      {
        description: '识别初始状态',
        calculation: '小明最初有 15 个苹果',
        result: '15'
      },
      {
        description: '第一次变化',
        calculation: '给了小红 5 个苹果',
        result: '15 - 5 = 10'
      },
      {
        description: '第二次变化',
        calculation: '又买了 8 个苹果',
        result: '10 + 8 = 18'
      },
      {
        description: '得出最终答案',
        calculation: '小明现在有 18 个苹果',
        result: '18'
      }
    ]
  };

  useEffect(() => {
    const sequence = async () => {
      setShowFinalAnswer(false);
      setCurrentStep(0);
      
      for (let i = 0; i <= problem.steps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        if (i < problem.steps.length) {
          setCurrentStep(i);
        } else {
          setShowFinalAnswer(true);
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    };

    sequence();
    const interval = setInterval(sequence, 12000);
    
    return () => clearInterval(interval);
  }, [problem.steps.length]);

  return (
    <div className="flex flex-col items-center space-y-6 p-6 max-w-2xl">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
        思维链推理演示
      </h3>
      
      {/* Problem Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
      >
        <div className="flex items-start space-x-3">
          <Calculator className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <div className="text-sm font-medium text-blue-800 mb-2">
              数学问题
            </div>
            <div className="text-gray-800">
              {problem.question}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reasoning Steps */}
      <div className="w-full space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-semibold text-gray-800">
            逐步分析过程
          </h4>
        </div>
        
        {problem.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0.3, x: -20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              x: index <= currentStep ? 0 : -20,
              scale: index === currentStep ? 1.02 : 1
            }}
            transition={{ duration: 0.5 }}
            className={`relative p-4 rounded-xl border ${
              index <= currentStep 
                ? 'bg-white border-purple-200 shadow-md' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {/* Step Number */}
            <div className="flex items-start space-x-4">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index <= currentStep 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}
                animate={{
                  scale: index === currentStep ? 1.1 : 1
                }}
              >
                {index + 1}
              </motion.div>
              
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-600 mb-1">
                  {step.description}
                </div>
                <div className="text-gray-800 mb-2">
                  {step.calculation}
                </div>
                {index <= currentStep && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    <span>结果: {step.result}</span>
                    {index === currentStep && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Arrow to next step */}
            {index < problem.steps.length - 1 && index <= currentStep && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-center mt-4"
              >
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Final Answer */}
      {showFinalAnswer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
          >
            <CheckCircle className="w-6 h-6" />
          </motion.div>
          <h4 className="text-xl font-bold mb-2">
            最终答案
          </h4>
          <div className="text-lg">
            小明现在有 <span className="text-2xl font-bold">18</span> 个苹果
          </div>
        </motion.div>
      )}

      {/* Benefits Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6"
      >
        <div className="text-sm text-yellow-800">
          <strong>思维链推理的优势：</strong> 通过明确的步骤分解，提高复杂问题的解决准确性
        </div>
      </motion.div>
    </div>
  );
};

export default ReasoningAnimation;
