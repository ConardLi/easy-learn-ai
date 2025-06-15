/**
 * 首页动画概念演示组件
 * 通过动画效果展示AI幻觉的形成过程
 * 包含用户输入、AI处理和输出的可视化流程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody } from '@nextui-org/react';
import { MessageCircle, Brain, AlertTriangle, CheckCircle } from 'lucide-react';

const AnimatedConcept: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHallucination, setShowHallucination] = useState(false);

  const steps = [
    {
      title: "用户提问",
      content: "请告诉我关于瓦坎达的地理位置",
      icon: MessageCircle,
      color: "blue"
    },
    {
      title: "AI处理",
      content: "模型基于训练数据进行模式匹配...",
      icon: Brain,
      color: "purple"
    },
    {
      title: "生成回答",
      content: showHallucination 
        ? "瓦坎达位于非洲东部，首都是比拉基亚..." 
        : "瓦坎达是漫威电影中的虚构国家，现实中并不存在",
      icon: showHallucination ? AlertTriangle : CheckCircle,
      color: showHallucination ? "red" : "green"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === 2) {
          setShowHallucination(!showHallucination);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(timer);
  }, [showHallucination]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          观察AI幻觉是如何产生的
        </h3>
        <p className="text-gray-600">
          下面的动画演示了AI在处理问题时可能产生幻觉的过程
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= currentStep;
          const isHallucination = index === 2 && showHallucination;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: isActive ? 1 : 0.3,
                y: isActive ? 0 : 20,
                scale: isActive ? 1 : 0.95
              }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className={`h-full transition-all duration-300 ${
                isActive 
                  ? `shadow-lg border-2 ${isHallucination ? 'border-red-300 bg-red-50' : step.color === 'blue' ? 'border-blue-300 bg-blue-50' : step.color === 'purple' ? 'border-purple-300 bg-purple-50' : 'border-green-300 bg-green-50'}`
                  : 'shadow-md border-gray-200 bg-gray-50'
              }`}>
                <CardBody className="p-6 text-center">
                  <motion.div
                    animate={{ 
                      rotate: isActive && index === 1 ? 360 : 0,
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{ 
                      rotate: { duration: 1, repeat: index === 1 && isActive ? Infinity : 0 },
                      scale: { duration: 0.3 }
                    }}
                    className={`mb-4 mx-auto w-12 h-12 rounded-full flex items-center justify-center ${
                      isHallucination 
                        ? 'bg-red-500' 
                        : step.color === 'blue' 
                          ? 'bg-blue-500' 
                          : step.color === 'purple' 
                            ? 'bg-purple-500' 
                            : 'bg-green-500'
                    }`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">
                    {step.title}
                  </h4>
                  
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${index}-${showHallucination}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`text-sm ${
                        isHallucination ? 'text-red-700' : 'text-gray-600'
                      }`}
                    >
                      {step.content}
                    </motion.p>
                  </AnimatePresence>
                  
                  {index === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className={`mt-3 text-xs font-medium ${
                        showHallucination ? 'text-red-600' : 'text-green-600'
                      }`}
                    >
                      {showHallucination ? '⚠️ 这是幻觉！' : '✅ 正确回答'}
                    </motion.div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center mt-8"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="flex space-x-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                animate={{
                  scale: currentStep === dot ? 1.2 : 1,
                  backgroundColor: currentStep === dot ? '#6366f1' : '#d1d5db'
                }}
                className="w-2 h-2 rounded-full"
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          观察AI如何在相同问题上产生不同质量的回答
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedConcept;
