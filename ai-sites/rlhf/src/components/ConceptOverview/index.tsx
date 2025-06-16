/**
 * RLHF概念概览组件
 * 介绍RLHF的基本定义、重要性和整体框架
 * 包含动画效果和关键要点展示
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Lightbulb, Target, Users, ArrowRight, BookOpen } from 'lucide-react';

const ConceptOverview: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const keyPoints = [
    {
      icon: Brain,
      title: "什么是RLHF？",
      description: "Reinforcement Learning from Human Feedback - 人类反馈强化学习",
      details: "利用强化学习技术，结合人类反馈来训练大语言模型，使其更好地对齐人类价值观"
    },
    {
      icon: Target,
      title: "核心目标",
      description: "让AI模型与人类价值观对齐",
      details: "通过人类偏好学习，使模型输出更安全、有用、无害的内容"
    },
    {
      icon: Lightbulb,
      title: "技术突破",
      description: "从GPT-3到ChatGPT的关键技术",
      details: "RLHF被认为是ChatGPT相较于GPT-3的最核心突破点"
    },
    {
      icon: Users,
      title: "人机协同",
      description: "人类智慧与机器学习的完美结合",
      details: "将主观的人类反馈转化为客观的训练信号，实现智能对齐"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl"
        >
          <Brain className="w-12 h-12 text-white" />
        </motion.div>
        
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          基于人类反馈的强化学习
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          RLHF是让AI真正理解人类意图的革命性技术，通过强化学习将人类的主观偏好转化为模型的客观优化目标
        </p>
      </motion.div>

      {/* Analogy Section */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100 shadow-xl"
      >
        <div className="flex items-start gap-6">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">形象比喻：AI学生的成长之路</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl mb-3">📚</div>
                <h4 className="font-bold text-blue-800 mb-2">预训练阶段</h4>
                <p className="text-gray-600 text-sm">就像学生学习基础知识，掌握语言理解和生成能力</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl mb-3">✏️</div>
                <h4 className="font-bold text-purple-800 mb-2">SFT训练</h4>
                <p className="text-gray-600 text-sm">教学生如何读题和解题，具备指令遵循能力</p>
              </motion.div>
              
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-green-100"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-2xl mb-3">🎯</div>
                <h4 className="font-bold text-green-800 mb-2">RLHF训练</h4>
                <p className="text-gray-600 text-sm">老师批改作业，学生根据反馈不断改进解题方式</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Points Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {keyPoints.map((point, index) => {
          const Icon = point.icon;
          const isHovered = hoveredCard === index;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <motion.div
                animate={{ 
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0
                }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
              >
                <Icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{point.title}</h3>
              <p className="text-blue-600 font-medium mb-4">{point.description}</p>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isHovered ? 'auto' : 0,
                  opacity: isHovered ? 1 : 0
                }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 text-sm leading-relaxed border-t border-blue-100 pt-4">
                  {point.details}
                </p>
              </motion.div>
              
              <motion.div
                className="flex items-center gap-2 mt-4 text-blue-500"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                <span className="text-sm font-medium">了解更多</span>
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">RLHF的重要意义</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">3H原则</div>
            <div className="text-indigo-100">Helpful, Harmless, Honest</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">175B→1.3B</div>
            <div className="text-indigo-100">RLHF让小模型超越大模型</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">3阶段</div>
            <div className="text-indigo-100">SFT → RM → PPO完整流程</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptOverview;
