/**
 * RAG工作流程演示组件
 * 通过动画展示RAG的完整工作流程：检索→增强→生成
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { ragDemoStateAtom } from '../../store/ragStore';
import { Play, Pause, RotateCcw, Search, FileText, Sparkles, MessageSquare } from 'lucide-react';

const WorkflowDemo: React.FC = () => {
  const [demoState, setDemoState] = useAtom(ragDemoStateAtom);
  const [animationProgress, setAnimationProgress] = useState(0);

  const sampleQuery = "什么是机器学习中的梯度下降算法？";
  const sampleDocs = [
    "梯度下降是一种优化算法，用于找到函数的最小值点...",
    "在机器学习中，梯度下降用于训练模型参数...",
    "随机梯度下降(SGD)是梯度下降的一种变体..."
  ];
  const sampleAnswer = "梯度下降算法是机器学习中的核心优化方法，通过计算损失函数的梯度来迭代更新模型参数，从而找到最优解。根据检索到的资料，梯度下降有多种变体，包括批量梯度下降、随机梯度下降(SGD)等，各有其适用场景和优势。";

  const steps = [
    { 
      id: 0, 
      title: "用户输入问题", 
      icon: MessageSquare, 
      color: "blue",
      description: "用户提出需要回答的问题"
    },
    { 
      id: 1, 
      title: "检索相关文档", 
      icon: Search, 
      color: "green",
      description: "从知识库中检索相关文档片段"
    },
    { 
      id: 2, 
      title: "增强上下文", 
      icon: FileText, 
      color: "yellow",
      description: "将检索到的文档与原问题组合"
    },
    { 
      id: 3, 
      title: "生成最终答案", 
      icon: Sparkles, 
      color: "purple",
      description: "基于增强后的上下文生成准确回答"
    }
  ];

  const playDemo = () => {
    setDemoState(prev => ({ ...prev, isPlaying: true, currentStep: 0 }));
    animateSteps();
  };

  const pauseDemo = () => {
    setDemoState(prev => ({ ...prev, isPlaying: false }));
  };

  const resetDemo = () => {
    setDemoState(prev => ({ 
      ...prev, 
      isPlaying: false, 
      currentStep: 0,
      userQuery: '',
      retrievedDocs: [],
      generatedAnswer: ''
    }));
    setAnimationProgress(0);
  };

  const animateSteps = async () => {
    // Step 0: 显示用户问题
    setDemoState(prev => ({ ...prev, currentStep: 0, userQuery: sampleQuery }));
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 1: 检索文档
    setDemoState(prev => ({ ...prev, currentStep: 1 }));
    for (let i = 0; i < sampleDocs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setDemoState(prev => ({ 
        ...prev, 
        retrievedDocs: [...prev.retrievedDocs, sampleDocs[i]]
      }));
    }
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 2: 增强阶段
    setDemoState(prev => ({ ...prev, currentStep: 2 }));
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 3: 生成答案
    setDemoState(prev => ({ ...prev, currentStep: 3 }));
    
    // 模拟逐字生成效果
    const words = sampleAnswer.split('');
    for (let i = 0; i <= words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setDemoState(prev => ({ 
        ...prev, 
        generatedAnswer: words.slice(0, i).join('')
      }));
    }

    setDemoState(prev => ({ ...prev, isPlaying: false }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">RAG 工作流程演示</h2>
        <p className="text-lg text-gray-600 mb-6">观察RAG系统如何处理用户问题的完整过程</p>
        
        <div className="flex justify-center space-x-4">
          <motion.button
            onClick={demoState.isPlaying ? pauseDemo : playDemo}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold ${
              demoState.isPlaying 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {demoState.isPlaying ? <Pause size={20} /> : <Play size={20} />}
            <span>{demoState.isPlaying ? '暂停演示' : '开始演示'}</span>
          </motion.button>
          
          <motion.button
            onClick={resetDemo}
            className="flex items-center space-x-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw size={20} />
            <span>重置演示</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 步骤指示器 */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  demoState.currentStep === step.id 
                    ? `bg-${step.color}-500 text-white` 
                    : demoState.currentStep > step.id
                    ? `bg-${step.color}-200 text-${step.color}-800`
                    : 'bg-gray-200 text-gray-500'
                }`}
                animate={{
                  scale: demoState.currentStep === step.id ? 1.1 : 1,
                  backgroundColor: demoState.currentStep === step.id ? 
                    step.color === 'blue' ? '#3B82F6' :
                    step.color === 'green' ? '#10B981' :
                    step.color === 'yellow' ? '#F59E0B' :
                    '#8B5CF6' : undefined
                }}
              >
                <step.icon size={20} />
                <span className="font-medium">{step.title}</span>
              </motion.div>
              {index < steps.length - 1 && (
                <motion.div
                  className="w-8 h-1 bg-gray-300 rounded"
                  animate={{
                    backgroundColor: demoState.currentStep > step.id ? '#10B981' : '#D1D5DB'
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 演示内容区域 */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 左侧：输入和检索 */}
        <div className="space-y-6">
          {/* 用户问题 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: demoState.currentStep >= 0 ? 1 : 0.3,
              scale: demoState.currentStep >= 0 ? 1 : 0.9,
              borderColor: demoState.currentStep === 0 ? '#3B82F6' : '#BFDBFE'
            }}
          >
            <div className="flex items-center mb-4">
              <MessageSquare className="text-blue-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">用户问题</h3>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <AnimatePresence>
                {demoState.userQuery && (
                  <motion.p
                    className="text-gray-700"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {demoState.userQuery}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 检索到的文档 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200"
            animate={{ 
              opacity: demoState.currentStep >= 1 ? 1 : 0.3,
              borderColor: demoState.currentStep === 1 ? '#10B981' : '#BBF7D0'
            }}
          >
            <div className="flex items-center mb-4">
              <Search className="text-green-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">检索到的文档</h3>
            </div>
            <div className="space-y-3">
              <AnimatePresence>
                {demoState.retrievedDocs.map((doc, index) => (
                  <motion.div
                    key={index}
                    className="bg-green-50 rounded-lg p-3 border-l-4 border-green-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                  >
                    <p className="text-gray-700 text-sm">{doc}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* 右侧：增强和生成 */}
        <div className="space-y-6">
          {/* 增强阶段 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-yellow-200"
            animate={{ 
              opacity: demoState.currentStep >= 2 ? 1 : 0.3,
              borderColor: demoState.currentStep === 2 ? '#F59E0B' : '#FEF3C7'
            }}
          >
            <div className="flex items-center mb-4">
              <FileText className="text-yellow-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">上下文增强</h3>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              {demoState.currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-700"
                >
                  <p className="font-medium mb-2">组合后的提示：</p>
                  <p className="text-xs bg-white p-2 rounded border">
                    "基于以下文档回答问题：<br/>
                    文档1: {sampleDocs[0]}<br/>
                    文档2: {sampleDocs[1]}<br/>
                    文档3: {sampleDocs[2]}<br/>
                    问题: {sampleQuery}"
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 生成的答案 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200"
            animate={{ 
              opacity: demoState.currentStep >= 3 ? 1 : 0.3,
              borderColor: demoState.currentStep === 3 ? '#8B5CF6' : '#DDD6FE'
            }}
          >
            <div className="flex items-center mb-4">
              <Sparkles className="text-purple-600 mr-3" size={24} />
              <h3 className="text-lg font-semibold text-gray-800">生成的答案</h3>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 min-h-[120px]">
              <AnimatePresence>
                {demoState.generatedAnswer && (
                  <motion.p
                    className="text-gray-700 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {demoState.generatedAnswer}
                    {demoState.currentStep === 3 && demoState.isPlaying && (
                      <motion.span
                        className="inline-block w-2 h-5 bg-purple-600 ml-1"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowDemo;
