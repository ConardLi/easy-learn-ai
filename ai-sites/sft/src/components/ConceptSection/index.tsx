/**
 * 概念介绍区域组件
 * 通过动画展示从预训练到SFT的转换过程
 */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen, MessageSquare, Target } from 'lucide-react';

export function ConceptSection() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "预训练阶段",
      description: "模型像博览群书但不求甚解的书生，只会死板背书",
      icon: BookOpen,
      color: "bg-red-500",
      content: "预测下一个token，海量知识但无法与用户指令适配"
    },
    {
      title: "SFT转换",
      description: "通过有监督微调，教会模型如何使用知识",
      icon: ArrowRight,
      color: "bg-yellow-500",
      content: "指令微调训练模型的通用指令遵循能力"
    },
    {
      title: "指令理解",
      description: "模型获得理解并回复用户指令的能力",
      icon: MessageSquare,
      color: "bg-green-500",
      content: "能够根据用户意图提供准确、有用的回复"
    },
    {
      title: "目标达成",
      description: "成为真正实用的AI助手",
      icon: Target,
      color: "bg-blue-500",
      content: "在多种任务上表现优秀的智能助手"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="concept" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            什么是 SFT？
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SFT（Supervised Fine-Tuning）是将预训练模型转化为实用AI助手的关键步骤
          </p>
        </motion.div>

        <div className="flex justify-center items-center mb-12">
          <div className="flex items-center space-x-4 md:space-x-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${
                    index <= currentStep ? step.color : 'bg-gray-300'
                  }`}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1,
                    boxShadow: index === currentStep ? '0 0 20px rgba(0,0,0,0.3)' : '0 0 0px rgba(0,0,0,0)'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="w-8 h-8" />
                </motion.div>
                {index < steps.length - 1 && (
                  <motion.div
                    className="w-8 h-1 bg-gray-300 mx-2"
                    animate={{
                      backgroundColor: index < currentStep ? '#10B981' : '#D1D5DB'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {steps[currentStep].title}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                {steps[currentStep].description}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {steps[currentStep].content}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
