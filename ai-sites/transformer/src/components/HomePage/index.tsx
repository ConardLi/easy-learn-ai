/**
 * 主页组件
 * 展示 Transformer 学习平台的概览和导航
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  TrendingUp, 
  Play,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Card, CardBody, Button } from '@nextui-org/react';

const HomePage: React.FC = () => {
  const learningPath = [
    {
      id: 1,
      title: 'Transformer 的诞生',
      description: '了解 2017 年这个改变 NLP 领域的重大突破',
      icon: BookOpen,
      path: '/introduction',
      color: 'from-blue-500 to-cyan-500',
      highlights: ['注意力机制的革命', '告别 RNN 时代', '并行处理的优势']
    },
    {
      id: 2,
      title: '预测下一个词',
      description: '深入理解 Transformer 的核心工作原理',
      icon: Target,
      path: '/prediction',
      color: 'from-purple-500 to-pink-500',
      highlights: ['概率计算过程', 'Softmax 函数', '文本生成机制']
    },
    {
      id: 3,
      title: '三大核心组件',
      description: '拆解 Transformer 的内部构造',
      icon: Brain,
      path: '/components',
      color: 'from-green-500 to-teal-500',
      highlights: ['嵌入层原理', '注意力机制', 'MLP 处理层']
    },
    {
      id: 4,
      title: '优势与挑战',
      description: '全面分析 Transformer 的特点',
      icon: Zap,
      path: '/advantages',
      color: 'from-orange-500 to-red-500',
      highlights: ['并行计算优势', '长距离依赖', '计算复杂度挑战']
    },
    {
      id: 5,
      title: '演进到大语言模型',
      description: '从 Transformer 到 GPT、BERT 的发展历程',
      icon: TrendingUp,
      path: '/to-llm',
      color: 'from-indigo-500 to-purple-500',
      highlights: ['参数规模扩展', '训练方法优化', '多模态能力']
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 text-yellow-400"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Transformer 学习平台
          </h1>
        </div>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          通过动态可视化和交互式体验，深入理解改变 AI 世界的 Transformer 架构。
          从基础概念到实际应用，让复杂的技术变得简单易懂。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/introduction">
            <Button
              size="lg"
              color="primary"
              endContent={<ArrowRight className="w-5 h-5" />}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
            >
              开始学习
            </Button>
          </Link>
          <Link to="/demo">
            <Button
              size="lg"
              variant="bordered"
              startContent={<Play className="w-5 h-5" />}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              互动演示
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Learning Path */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          学习路径
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learningPath.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="h-full"
              >
                <Link to={item.path} className="block h-full">
                  <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                    <CardBody className="p-6 space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {item.title}
                          </h3>
                          <div className="text-sm text-gray-500">
                            第 {item.id} 章
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-700">
                          重点内容：
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center text-purple-600 text-sm font-medium pt-2">
                        开始学习
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Interactive Demo Preview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          交互式演示
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          通过可视化动画和互动体验，亲自感受 Transformer 的工作过程。
          看看注意力机制如何工作，词语如何被预测。
        </p>
        <Link to="/demo">
          <Button
            size="lg"
            color="secondary"
            startContent={<Play className="w-5 h-5" />}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            体验演示
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};

export default HomePage;
