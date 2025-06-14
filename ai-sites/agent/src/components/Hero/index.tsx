/**
 * 首页英雄区域组件
 * 展示 Agent 概念的核心介绍，包含动画效果和视觉吸引力
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@nextui-org/react';
import { Brain, Sparkles, ArrowRight, Cpu } from 'lucide-react';

interface HeroProps {
  onStartLearning: () => void;
}

export default function Hero({ onStartLearning }: HeroProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <Brain size={80} className="text-blue-500" />
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-2 -right-2"
              >
                <Sparkles size={24} className="text-purple-500" />
              </motion.div>
            </motion.div>
          </div>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            AI Agent
          </motion.h1>

          <motion.h2 
            className="text-2xl md:text-3xl text-gray-700 mb-8 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            不只是"答题机器"，而是"会做事的智能体"
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            从传统AI的一次性输出，到Agent的"规划-执行-反思"闭环，
            探索人工智能如何模拟人类思维过程，自主完成复杂任务
          </motion.p>

          <motion.div 
            className="grid md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { 
                icon: <Brain size={32} />, 
                title: "智能规划", 
                desc: "自动拆解复杂任务" 
              },
              { 
                icon: <Cpu size={32} />, 
                title: "工具调用", 
                desc: "突破语言模型局限" 
              },
              { 
                icon: <Sparkles size={32} />, 
                title: "自我反思", 
                desc: "持续优化执行效果" 
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                  <CardBody className="text-center p-6">
                    <div className="text-blue-500 mb-4 flex justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              endContent={<ArrowRight size={20} />}
              onPress={onStartLearning}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 text-lg"
            >
              开始探索 Agent 世界
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
