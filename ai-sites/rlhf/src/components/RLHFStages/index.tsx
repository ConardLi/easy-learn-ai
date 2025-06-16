/**
 * RLHF三阶段详细流程组件
 * 展示SFT、RM训练、PPO训练的完整流程
 * 包含交互式步骤演示和详细说明
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, ArrowRight, Database, Brain, Target, Zap } from 'lucide-react';

const RLHFStages: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const stages = [
    {
      id: 0,
      title: "阶段一：监督微调（SFT）",
      subtitle: "训练一个听话的基础模型",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      description: "使用指令-响应数据对，通过监督学习训练模型具备基本的指令遵循能力",
      details: [
        "数据：指令数据集（instruction-response pairs）",
        "方法：监督学习，交叉熵损失函数",
        "目标：让模型学会理解和执行基本指令",
        "输出：具备指令遵循能力的SFT模型"
      ],
      visualElements: [
        { type: "input", label: "指令数据", position: { x: 20, y: 40 } },
        { type: "model", label: "LLM", position: { x: 50, y: 40 } },
        { type: "output", label: "SFT模型", position: { x: 80, y: 40 } }
      ]
    },
    {
      id: 1,
      title: "阶段二：奖励模型（RM）训练",
      subtitle: "训练一个会评分的裁判",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
      description: "训练奖励模型学习人类偏好，为后续强化学习提供准确的奖励信号",
      details: [
        "数据：人类偏好数据（chosen vs rejected）",
        "方法：排序学习，最大化chosen和rejected的分数差",
        "目标：学会评估文本质量，理解人类偏好",
        "输出：能够给文本打分的奖励模型"
      ],
      visualElements: [
        { type: "input", label: "SFT模型", position: { x: 15, y: 30 } },
        { type: "data", label: "人类反馈", position: { x: 15, y: 60 } },
        { type: "model", label: "RM训练", position: { x: 50, y: 45 } },
        { type: "output", label: "奖励模型", position: { x: 85, y: 45 } }
      ]
    },
    {
      id: 2,
      title: "阶段三：PPO强化学习训练",
      subtitle: "让模型学会获得高分",
      icon: Target,
      color: "from-green-500 to-teal-500",
      description: "使用PPO算法，基于奖励模型的反馈，优化模型生成更符合人类偏好的内容",
      details: [
        "算法：PPO（Proximal Policy Optimization）",
        "模型：4个模型协同工作（Actor、Ref、Reward、Critic）",
        "目标：最大化奖励模型给出的分数",
        "输出：对齐人类偏好的最终模型"
      ],
      visualElements: [
        { type: "input", label: "SFT模型", position: { x: 10, y: 20 } },
        { type: "input", label: "奖励模型", position: { x: 10, y: 50 } },
        { type: "process", label: "PPO训练", position: { x: 40, y: 35 } },
        { type: "output", label: "RLHF模型", position: { x: 80, y: 35 } }
      ]
    }
  ];

  const startAnimation = () => {
    setIsAnimating(true);
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage < stages.length) {
        setCurrentStage(stage);
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 3000);
  };

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStage(0);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          RLHF 三阶段训练流程
        </h2>
        <p className="text-gray-600 mb-6">
          从基础模型到对齐人类偏好的完整训练过程
        </p>

        {/* Animation Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            onClick={isAnimating ? () => setIsAnimating(false) : startAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg"
          >
            {isAnimating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isAnimating ? '暂停动画' : '开始演示'}
          </motion.button>
          
          <motion.button
            onClick={resetAnimation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-500 text-white rounded-full shadow-lg"
          >
            <RotateCcw className="w-5 h-5" />
            重置
          </motion.button>
        </div>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {stages.map((stage, index) => (
            <div key={stage.id} className="flex items-center">
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                  index <= currentStage
                    ? `bg-gradient-to-r ${stage.color}`
                    : 'bg-gray-300'
                }`}
                animate={{
                  scale: index === currentStage ? 1.2 : 1,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {index + 1}
              </motion.div>
              {index < stages.length - 1 && (
                <motion.div
                  className={`w-16 h-1 mx-2 rounded ${
                    index < currentStage ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-300'
                  }`}
                  animate={{
                    scaleX: index < currentStage ? 1 : 0,
                  }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Stage Info */}
          <div className="space-y-6">
            <motion.div
              className={`bg-gradient-to-r ${stages[currentStage].color} rounded-3xl p-8 text-white shadow-2xl`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  {React.createElement(stages[currentStage].icon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{stages[currentStage].title}</h3>
                  <p className="text-white/80">{stages[currentStage].subtitle}</p>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                {stages[currentStage].description}
              </p>
            </motion.div>

            {/* Details List */}
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 border border-blue-100 shadow-xl">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                关键要点
              </h4>
              <ul className="space-y-3">
                {stages[currentStage].details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual Representation */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-blue-100 shadow-xl">
            <h4 className="font-bold text-gray-800 mb-6 text-center">流程可视化</h4>
            <div className="relative h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden">
              {stages[currentStage].visualElements.map((element, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.3 }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    element.type === 'input' ? 'bg-blue-100 border-blue-300' :
                    element.type === 'model' ? 'bg-purple-100 border-purple-300' :
                    element.type === 'process' ? 'bg-green-100 border-green-300' :
                    element.type === 'data' ? 'bg-orange-100 border-orange-300' :
                    'bg-indigo-100 border-indigo-300'
                  } border-2 rounded-xl px-4 py-2 text-sm font-medium shadow-lg`}
                  style={{
                    left: `${element.position.x}%`,
                    top: `${element.position.y}%`
                  }}
                >
                  {element.label}
                </motion.div>
              ))}

              {/* Arrows */}
              {stages[currentStage].visualElements.slice(0, -1).map((_, index) => (
                <motion.div
                  key={`arrow-${index}`}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: (index + 1) * 0.3 + 0.2 }}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{
                    left: `${stages[currentStage].visualElements[index].position.x + 8}%`,
                    width: `${stages[currentStage].visualElements[index + 1].position.x - stages[currentStage].visualElements[index].position.x - 16}%`
                  }}
                >
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Stage Navigation */}
      <div className="flex justify-center gap-4">
        {stages.map((stage, index) => (
          <motion.button
            key={stage.id}
            onClick={() => setCurrentStage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              index === currentStage
                ? `bg-gradient-to-r ${stage.color} text-white shadow-lg`
                : 'bg-white/70 text-gray-600 hover:bg-white border border-gray-200'
            }`}
          >
            {stage.title.split('：')[0]}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RLHFStages;
