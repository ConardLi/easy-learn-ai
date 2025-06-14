/**
 * 指令遵循动画组件
 * 展示模型如何理解和执行自然语言指令
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowDown, CheckCircle, Target } from 'lucide-react';

const InstructionFollowingAnimation: React.FC = () => {
  const [currentInstruction, setCurrentInstruction] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const instructions = [
    {
      instruction: '请将以下句子翻译成英文：你好，世界！',
      thinking: '识别任务：翻译任务\n源语言：中文\n目标语言：英文',
      result: 'Hello, World!'
    },
    {
      instruction: '用简单的话解释什么是人工智能',
      thinking: '识别任务：解释概念\n目标：简化表达\n受众：普通用户',
      result: '人工智能是让计算机模拟人类思维和行为的技术，帮助机器像人一样思考和学习。'
    },
    {
      instruction: '写一首关于春天的四行诗',
      thinking: '识别任务：创作诗歌\n主题：春天\n要求：四行',
      result: '春风轻抚绿柳枝，\n花开满径鸟归时。\n万物复苏生机现，\n诗意盎然满心怡。'
    }
  ];

  useEffect(() => {
    const cycle = async () => {
      setIsProcessing(true);
      setShowResult(false);
      
      // 模拟思考过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setShowResult(true);
      
      // 显示结果
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 切换到下一个指令
      setCurrentInstruction(prev => (prev + 1) % instructions.length);
    };

    cycle();
    const interval = setInterval(cycle, 7000);
    
    return () => clearInterval(interval);
  }, [instructions.length]);

  const current = instructions[currentInstruction];

  return (
    <div className="flex flex-col items-center space-y-6 p-6 max-w-lg">
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
        指令遵循演示
      </h3>
      
      {/* Instruction Input */}
      <motion.div
        key={`instruction-${currentInstruction}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4"
      >
        <div className="flex items-start space-x-3">
          <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <div className="text-sm font-medium text-blue-800 mb-2">
              用户指令
            </div>
            <div className="text-gray-800">
              {current.instruction}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Processing Arrow */}
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          opacity: isProcessing ? [1, 0.5, 1] : 1
        }}
        transition={{ 
          duration: 1, 
          repeat: isProcessing ? Infinity : 0 
        }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.div>

      {/* Thinking Process */}
      <motion.div
        className="w-full bg-yellow-50 border border-yellow-200 rounded-xl p-4"
        animate={{
          opacity: isProcessing ? 1 : 0.5,
          scale: isProcessing ? 1 : 0.95
        }}
      >
        <div className="flex items-start space-x-3">
          <Target className="w-5 h-5 text-yellow-600 mt-1" />
          <div>
            <div className="text-sm font-medium text-yellow-800 mb-2">
              {isProcessing ? '正在思考...' : '思考过程'}
            </div>
            <div className="text-gray-700 text-sm whitespace-pre-line">
              {isProcessing ? (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  分析指令内容...
                </motion.div>
              ) : (
                current.thinking
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Processing Arrow */}
      <motion.div
        animate={{ 
          y: [0, 10, 0],
          opacity: isProcessing ? [1, 0.5, 1] : 1
        }}
        transition={{ 
          duration: 1, 
          repeat: isProcessing ? Infinity : 0 
        }}
      >
        <ArrowDown className="w-6 h-6 text-gray-400" />
      </motion.div>

      {/* Result Output */}
      <motion.div
        className="w-full bg-green-50 border border-green-200 rounded-xl p-4"
        animate={{
          opacity: showResult ? 1 : 0.3,
          scale: showResult ? 1 : 0.95
        }}
      >
        <div className="flex items-start space-x-3">
          <CheckCircle className={`w-5 h-5 mt-1 ${showResult ? 'text-green-600' : 'text-gray-400'}`} />
          <div>
            <div className="text-sm font-medium text-green-800 mb-2">
              {showResult ? '执行结果' : '等待执行...'}
            </div>
            <div className="text-gray-800">
              {showResult ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {current.result}
                </motion.div>
              ) : (
                <div className="text-gray-400">...</div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex space-x-2 mt-4">
        {instructions.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentInstruction ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            animate={{
              scale: index === currentInstruction ? 1.2 : 1
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InstructionFollowingAnimation;
