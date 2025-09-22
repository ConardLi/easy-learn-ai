/**
 * Function Calling 工作流程动态演示组件
 * 通过步骤动画展示完整的调用流程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Brain, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  Play,
  Pause
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  detail: string;
}

const WorkflowDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps: Step[] = [
    {
      id: 1,
      title: "用户输入意图",
      description: "用户提出需要外部工具协助的请求",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "blue",
      detail: "例如：'查询今天北京的天气情况'"
    },
    {
      id: 2,
      title: "模型理解与判断",
      description: "LLM 分析用户意图，判断需要调用外部函数",
      icon: <Brain className="w-6 h-6" />,
      color: "purple",
      detail: "模型识别出这是一个天气查询任务，需要调用天气API"
    },
    {
      id: 3,
      title: "生成函数调用",
      description: "生成符合规范的函数调用参数",
      icon: <Settings className="w-6 h-6" />,
      color: "orange",
      detail: "生成调用参数：get_weather(city='北京', date='today')"
    },
    {
      id: 4,
      title: "执行并返回结果",
      description: "执行函数获取结果，生成最终回答",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "green",
      detail: "获取天气数据后，生成自然语言回答给用户"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const getStepColor = (color: string) => {
    const colors = {
      blue: "bg-blue-600",
      purple: "bg-purple-600", 
      orange: "bg-orange-600",
      green: "bg-green-600"
    };
    return colors[color as keyof typeof colors];
  };

  const getStepBorder = (color: string) => {
    const colors = {
      blue: "border-blue-200",
      purple: "border-purple-200",
      orange: "border-orange-200", 
      green: "border-green-200"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16">
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-900 mb-12"
      >
        工作流程演示
      </motion.h2>

      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl mx-auto">
        {/* 控制按钮 */}
        <div className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isPlaying ? '暂停演示' : '开始演示'}
          </motion.button>
        </div>

        {/* 步骤流程图 */}
        <div className="flex items-center justify-between mb-12 overflow-x-auto">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ 
                  scale: currentStep === index ? 1.1 : 1,
                  opacity: currentStep === index ? 1 : 0.6
                }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col items-center cursor-pointer min-w-[120px] ${
                  currentStep === index ? 'transform scale-110' : ''
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <motion.div
                  className={`p-4 rounded-full ${getStepColor(step.color)} mb-3`}
                  animate={{ 
                    boxShadow: currentStep === index 
                      ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                      : '0 0 0px rgba(0, 0, 0, 0)'
                  }}
                >
                  {React.cloneElement(step.icon as React.ReactElement, {
                    className: "w-6 h-6 text-white"
                  })}
                </motion.div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-500">步骤 {step.id}</p>
                </div>
              </motion.div>
              
              {index < steps.length - 1 && (
                <motion.div
                  animate={{ 
                    opacity: currentStep >= index ? 1 : 0.3,
                    scale: currentStep === index ? 1.2 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 当前步骤详情 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`border-2 ${getStepBorder(steps[currentStep].color)} rounded-xl p-6`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getStepColor(steps[currentStep].color)}`}>
                {React.cloneElement(steps[currentStep].icon as React.ReactElement, {
                  className: "w-6 h-6 text-white"
                })}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {steps[currentStep].title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {steps[currentStep].description}
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 font-medium">
                    示例：{steps[currentStep].detail}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 进度条 */}
        <div className="mt-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>进度</span>
            <span>{currentStep + 1} / {steps.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowDemo;
