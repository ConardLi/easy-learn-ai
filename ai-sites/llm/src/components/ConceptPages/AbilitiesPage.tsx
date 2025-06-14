/**
 * LLM 核心能力页面
 * 详细介绍 LLM 的四大核心能力：涌现能力、上下文学习、指令遵循、逐步推理
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Target, Brain, ChevronRight } from 'lucide-react';
import EmergentAbilitiesAnimation from '../Animations/EmergentAbilitiesAnimation';
import ContextLearningAnimation from '../Animations/ContextLearningAnimation';
import InstructionFollowingAnimation from '../Animations/InstructionFollowingAnimation';
import ReasoningAnimation from '../Animations/ReasoningAnimation';

const AbilitiesPage: React.FC = () => {
  const [activeAbility, setActiveAbility] = useState(0);

  const abilities = [
    {
      title: '涌现能力',
      subtitle: 'Emergent Abilities',
      icon: Sparkles,
      color: 'from-purple-500 to-pink-500',
      description: '模型规模增大时突然出现的能力，类似物理学中的相变现象',
      details: [
        '在小型模型中不明显，但在大型模型中特别突出',
        '与复杂任务相关的通用能力',
        '量变引起质变的典型表现',
        '是 LLM 区别于传统模型的关键特征'
      ],
      animation: EmergentAbilitiesAnimation,
    },
    {
      title: '上下文学习',
      subtitle: 'In-context Learning',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      description: '无需额外训练，通过理解上下文和示例来执行新任务',
      details: [
        '提供自然语言指令或任务示例',
        '无需参数更新即可学习新任务',
        '大大节省算力和数据成本',
        '引发 NLP 研究范式变革'
      ],
      animation: ContextLearningAnimation,
    },
    {
      title: '指令遵循',
      subtitle: 'Instruction Following',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      description: '理解并执行未见过的自然语言指令，展现强大的泛化能力',
      details: [
        '理解自然语言描述的任务指令',
        '在未见过的任务上表现良好',
        '不需要事先见过具体示例',
        '可以灵活解决用户遇到的问题'
      ],
      animation: InstructionFollowingAnimation,
    },
    {
      title: '逐步推理',
      subtitle: 'Step by Step Reasoning',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      description: '通过思维链推理解决复杂的多步骤逻辑问题',
      details: [
        '采用思维链（CoT）推理策略',
        '包含中间推理步骤的提示机制',
        '可以处理复杂的数学和逻辑问题',
        '向"可靠的"智能助理迈出坚实步伐'
      ],
      animation: ReasoningAnimation,
    },
  ];

  const currentAbility = abilities[activeAbility];
  const CurrentAnimation = currentAbility.animation;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LLM 核心能力
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            探索大语言模型的四大核心能力，了解这些能力如何让 LLM 成为通向 AGI 的重要途径
          </p>
        </motion.div>

        {/* Ability Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-4 mb-16"
        >
          {abilities.map((ability, index) => {
            const Icon = ability.icon;
            return (
              <motion.button
                key={ability.title}
                onClick={() => setActiveAbility(index)}
                className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                  activeAbility === index
                    ? 'bg-white shadow-xl scale-105'
                    : 'bg-white/50 hover:bg-white/80 shadow-lg'
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${ability.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {ability.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {ability.subtitle}
                </p>
                {activeAbility === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2 flex items-center text-blue-600 text-sm font-medium"
                  >
                    查看详情
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Ability Detail */}
        <motion.div
          key={activeAbility}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Content */}
            <div className="p-8 md:p-12">
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentAbility.color} flex items-center justify-center mr-4`}>
                  <currentAbility.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">
                    {currentAbility.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {currentAbility.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {currentAbility.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  核心特点
                </h3>
                {currentAbility.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentAbility.color} mt-2 flex-shrink-0`} />
                    <span className="text-gray-700 leading-relaxed">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animation */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 flex items-center justify-center">
              <CurrentAnimation />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AbilitiesPage;
