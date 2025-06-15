/**
 * 核心组件章节
 * 详细解释 Transformer 的三大核心组件
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Tabs, Tab } from '@nextui-org/react';
import { 
  ArrowRight, 
  Brain, 
  Target, 
  Zap,
  Layers,
  GitBranch,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ChapterComponents: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState(0);

  const components = [
    {
      title: '嵌入层（Embedding）',
      subtitle: '文字变数字的魔法工厂',
      icon: Layers,
      color: 'from-blue-500 to-cyan-500',
      description: '将文本转换为机器可理解的数字向量',
      features: [
        {
          name: '词元分割',
          detail: '把"我爱北京"拆成["我", "爱", "北京"]，类似把句子拆成乐高积木',
          example: '输入: "我爱北京" → 词元: ["我", "爱", "北京"]'
        },
        {
          name: '向量转换', 
          detail: '每个词元转为100-1024维的数字向量，捕捉语义信息',
          example: '"苹果"向量在"水果"维度值高，"红色"维度值低'
        },
        {
          name: '语义捕捉',
          detail: '相似词的向量距离近，体现语义关系',
          example: '"爸爸"和"父亲"的向量在空间中接近'
        }
      ]
    },
    {
      title: 'Transformer 块',
      subtitle: '信息处理的智能工厂',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      description: '模型的核心处理单元，包含注意力机制和MLP层',
      features: [
        {
          name: '注意力机制',
          detail: '让每个词"听"到其他所有词的信息，实现全局感知',
          example: '处理"猫追老鼠"时，"追"会同时关注"猫"和"老鼠"'
        },
        {
          name: 'MLP层',
          detail: '对注意力输出进行非线性变换和特征提取',
          example: '把"猫追老鼠"加工成"一只黑猫快速追逐小老鼠"'
        },
        {
          name: '残差连接',
          detail: '帮助梯度传播，使深层网络训练更稳定',
          example: '输出 = 输入 + 处理结果，保持信息流畅'
        }
      ]
    },
    {
      title: '输出概率层',
      subtitle: '答案揭晓的"投票站"',
      icon: BarChart3,
      color: 'from-green-500 to-teal-500',
      description: '将处理后的向量转换为最终的词汇概率分布',
      features: [
        {
          name: '线性层',
          detail: '将向量转换为词表长度的维度',
          example: '512维向量 → 50000维（对应5万个词的词汇表）'
        },
        {
          name: 'Softmax函数',
          detail: '将数值转为0-1的概率，所有概率和为1',
          example: '[3.2, 1.8, 0.5] → [0.7, 0.2, 0.1]'
        },
        {
          name: '概率选择',
          detail: '根据概率分布选择最可能的下一个词',
          example: '选择概率最高的"晴朗"作为"今天天气"的下一个词'
        }
      ]
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
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
          三大核心组件
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          深入了解 Transformer 内部的三个关键构建模块
        </p>
      </motion.div>

      {/* Component Selection */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Tabs 
          selectedKey={activeComponent.toString()}
          onSelectionChange={(key) => setActiveComponent(Number(key))}
          className="w-full"
          color="primary"
        >
          {components.map((component, index) => (
            <Tab key={index.toString()} title={component.title} />
          ))}
        </Tabs>
      </motion.section>

      {/* Component Detail */}
      <AnimatePresence mode="wait">
        <motion.section
          key={activeComponent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-0">
            <CardBody className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    {React.createElement(components[activeComponent].icon, {
                      className: "w-8 h-8 text-gray-700"
                    })}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {components[activeComponent].title}
                      </h2>
                      <p className="text-gray-600">
                        {components[activeComponent].subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {components[activeComponent].description}
                  </p>
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex justify-center"
                >
                  <div className={`w-32 h-32 bg-gradient-to-r ${components[activeComponent].color} rounded-2xl flex items-center justify-center`}>
                    {React.createElement(components[activeComponent].icon, {
                      className: "w-16 h-16 text-white"
                    })}
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  详细功能
                </h3>
                <div className="grid gap-4">
                  {components[activeComponent].features.map((feature, index) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="shadow-sm border border-gray-200">
                        <CardBody className="p-6">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {feature.name}
                          </h4>
                          <p className="text-gray-600 mb-3">
                            {feature.detail}
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm font-medium text-gray-700 mb-1">
                              示例：
                            </div>
                            <div className="text-sm text-blue-600 font-mono">
                              {feature.example}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>
      </AnimatePresence>

      {/* Information Flow */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          信息流转过程
        </h2>
        <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardBody className="p-8">
            <div className="flex items-center justify-between">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                  <Layers className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium">嵌入层</div>
                <div className="text-xs text-gray-600">文本→向量</div>
              </div>
              
              <ChevronRight className="w-6 h-6 text-gray-400" />
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium">Transformer块</div>
                <div className="text-xs text-gray-600">特征提取</div>
              </div>
              
              <ChevronRight className="w-6 h-6 text-gray-400" />
              
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-medium">输出层</div>
                <div className="text-xs text-gray-600">概率分布</div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.section>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex justify-between items-center"
      >
        <Link to="/prediction">
          <Button
            variant="bordered"
            startContent={<ArrowRight className="w-5 h-5 rotate-180" />}
          >
            上一章：预测机制
          </Button>
        </Link>
        <Link to="/advantages">
          <Button
            size="lg"
            color="primary"
            endContent={<ArrowRight className="w-5 h-5" />}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white"
          >
            下一章：优缺点
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ChapterComponents;
