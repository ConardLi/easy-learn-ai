/**
 * 预测机制章节
 * 解释 Transformer 如何预测下一个词
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Progress } from '@nextui-org/react';
import { 
  ArrowRight, 
  Target, 
  BarChart3, 
  Brain,
  Play,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PredictionAnimation from './PredictionAnimation';
import SoftmaxVisualization from './SoftmaxVisualization';

const ChapterPrediction: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const predictionSteps = [
    {
      title: '输入文本分析',
      description: '模型接收输入文本"今天天气"，开始分析每个词之间的关系',
      example: '输入：今天天气',
      detail: '将文本分割为词元，每个词转换为数字向量'
    },
    {
      title: '注意力计算',
      description: '计算"今天"与"天气"的关联度，理解上下文语义',
      example: '关联度分析：今天 ↔ 天气',
      detail: '注意力机制评估词语间的相关性强度'
    },
    {
      title: '概率分布生成',
      description: '基于上下文分析，为可能的下一个词生成概率分布',
      example: '候选词：晴朗(0.4), 寒冷(0.3), 不错(0.2)...',
      detail: '使用 softmax 函数将得分转换为概率'
    },
    {
      title: '选择最佳答案',
      description: '选择概率最高的词作为预测结果',
      example: '输出：晴朗 (概率最高)',
      detail: '可以使用贪心搜索或采样方法选择结果'
    }
  ];

  const analogySteps = [
    {
      title: '古诗猜测类比',
      description: '就像根据"床前明月光"预测下句是"疑是地上霜"',
      icon: '🌙'
    },
    {
      title: '规律学习',
      description: 'Transformer 通过学习海量文本的词语关联规律',
      icon: '📚'
    },
    {
      title: '概率猜词',
      description: '实现更精准的"猜词"游戏',
      icon: '🎯'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          "预测下一个词"的底层逻辑
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Transformer 的文本生成本质是一场精巧的"概率游戏"
        </p>
      </motion.div>

      {/* Core Concept */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Card className="shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardBody className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-purple-600" />
                  核心原理
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  给定文本序列，Transformer 会分析词语之间的关联关系，
                  计算每个可能的下一个词的概率，选择概率最高的词作为预测结果。
                  这个过程就像一个<span className="font-semibold text-purple-600">高度智能的"接龙游戏"</span>。
                </p>
                <div className="flex space-x-4">
                  <Button
                    color="primary"
                    startContent={<Play className="w-4 h-4" />}
                    onPress={() => setShowAnimation(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    观看动画演示
                  </Button>
                </div>
              </div>
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-16 h-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">📊</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.section>

      {/* Step by Step Process */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          预测过程详解
        </h2>
        
        <div className="space-y-6">
          <div className="mb-8">
            <Progress 
              value={(currentStep + 1) / predictionSteps.length * 100} 
              color="secondary"
              className="mb-4"
            />
            <div className="flex justify-center space-x-4">
              {predictionSteps.map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={currentStep === index ? "solid" : "bordered"}
                  color={currentStep === index ? "secondary" : "default"}
                  onPress={() => setCurrentStep(index)}
                  className="min-w-12"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-lg border-0">
                <CardBody className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {currentStep + 1}
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {predictionSteps[currentStep].title}
                      </h3>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {predictionSteps[currentStep].description}
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        示例：
                      </div>
                      <div className="text-purple-600 font-mono">
                        {predictionSteps[currentStep].example}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm font-medium text-blue-700 mb-2">
                        技术细节：
                      </div>
                      <div className="text-blue-600 text-sm">
                        {predictionSteps[currentStep].detail}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-4">
            <Button
              variant="bordered"
              startContent={<RotateCcw className="w-4 h-4" />}
              onPress={() => setCurrentStep(0)}
            >
              重新开始
            </Button>
            {currentStep < predictionSteps.length - 1 && (
              <Button
                color="primary"
                endContent={<ChevronRight className="w-4 h-4" />}
                onPress={() => setCurrentStep(currentStep + 1)}
              >
                下一步
              </Button>
            )}
          </div>
        </div>
      </motion.section>

      {/* Analogy Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          类比理解
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {analogySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all border-0">
                <CardBody className="p-6 text-center space-y-4">
                  <div className="text-4xl">{step.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {step.description}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Softmax Visualization */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <SoftmaxVisualization />
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="flex justify-between items-center"
      >
        <Link to="/introduction">
          <Button
            variant="bordered"
            startContent={<ArrowRight className="w-5 h-5 rotate-180" />}
          >
            上一章：Transformer 诞生
          </Button>
        </Link>
        <Link to="/components">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            下一章：核心组件
          </Button>
        </Link>
      </motion.div>

      {/* Animation Modal */}
      <AnimatePresence>
        {showAnimation && (
          <PredictionAnimation onClose={() => setShowAnimation(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChapterPrediction;
