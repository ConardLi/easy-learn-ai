/**
 * 网站头部介绍区域
 * 展示 Function Calling 的核心定义和重要性
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, ArrowRight } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 text-center">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <div className="flex justify-center items-center gap-4 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-blue-600 rounded-full"
          >
            <Brain className="w-8 h-8 text-white" />
          </motion.div>
          <ArrowRight className="w-6 h-6 text-blue-600" />
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-4 bg-green-600 rounded-full"
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Function Calling
        </h1>
        <p className="text-2xl text-gray-600 mb-4">
          为大语言模型赋予<span className="text-blue-600 font-semibold">"行动能力"</span>
        </p>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
          如果说 RAG 是为 LLM 补充"知识储备"，那么 Function Calling 则是为其赋予"行动能力"。
          通过预设的函数接口，让 AI 能够主动调用外部工具，实现与真实世界的交互。
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          核心价值
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          Function Calling 是给 AI 打通和人类世界的第二条通道，让 LLM 不再是简单的对话机器人，
          而是具备实际执行能力的智能助手。几乎所有互联网时代的产品，都有望借助这项技术实现重构和升级。
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
