/**
 * 解决策略页面
 * 提供实用的AI幻觉防范技巧和最佳实践
 * 包含交互式策略展示和案例对比
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Tabs, Tab, Chip } from '@nextui-org/react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  MessageSquare,
  Search,
  AlertTriangle,
  Target,
  BookOpen,
  Users,
  Settings,
  TrendingUp
} from 'lucide-react';

const SolutionsPage: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  const strategies = [
    {
      id: 'prompt-engineering',
      title: '提示工程优化',
      icon: MessageSquare,
      description: '通过精心设计的提示词减少幻觉的产生',
      level: '基础',
      effectiveness: 85,
      techniques: [
        {
          name: '明确指令',
          bad: '告诉我关于AI的事情',
          good: '请列举3个AI在医疗领域的具体应用案例，包括技术原理和实际效果',
          explanation: '具体的指令能帮助AI提供更准确、更有针对性的回答'
        },
        {
          name: '要求引用',
          bad: '气候变化的最新研究发现了什么？',
          good: '请提供2023年发表的3篇关于气候变化的权威研究论文，包括作者、期刊名称和主要发现',
          explanation: '要求具体引用可以促使AI更谨慎地处理信息'
        },
        {
          name: '分步推理',
          bad: '解决这个复杂的数学问题',
          good: '请逐步解决这个问题：1) 列出已知条件 2) 确定解题思路 3) 分步计算 4) 验证答案',
          explanation: '分步推理有助于发现逻辑错误和计算失误'
        }
      ]
    },
    {
      id: 'verification',
      title: '信息验证方法',
      icon: Search,
      description: '学会识别和验证AI生成内容的准确性',
      level: '进阶',
      effectiveness: 90,
      techniques: [
        {
          name: '交叉验证',
          bad: '仅依赖单一AI回答',
          good: '对比多个AI的回答，查证权威资料源',
          explanation: '多源验证可以有效发现不一致的信息'
        },
        {
          name: '时效性检查',
          bad: '接受所有历史信息',
          good: '明确询问信息的时间范围，核实最新发展',
          explanation: '确保获取的信息是最新且相关的'
        },
        {
          name: '专业核实',
          bad: '在专业领域完全信任AI',
          good: '将AI建议作为起点，咨询领域专家确认',
          explanation: '专业知识需要专业人士的最终确认'
        }
      ]
    },
    {
      id: 'context-management',
      title: '上下文管理',
      icon: BookOpen,
      description: '合理管理对话上下文，避免信息累积错误',
      level: '中级',
      effectiveness: 75,
      techniques: [
        {
          name: '清晰边界',
          bad: '在长对话中不断改变话题',
          good: '明确标示新话题的开始，重置相关上下文',
          explanation: '避免上下文混乱导致的错误累积'
        },
        {
          name: '定期重置',
          bad: '无限延续同一对话',
          good: '在重要决策前开始新对话，确保信息准确',
          explanation: '新对话可以避免历史错误的传播'
        },
        {
          name: '关键信息确认',
          bad: '假设AI记住了所有细节',
          good: '重要信息需要重新提供和确认',
          explanation: 'AI可能遗忘或误解之前的关键信息'
        }
      ]
    },
    {
      id: 'collaboration',
      title: '人机协作模式',
      icon: Users,
      description: '建立有效的人机协作流程，发挥各自优势',
      level: '高级',
      effectiveness: 95,
      techniques: [
        {
          name: '分工明确',
          bad: '完全依赖AI做决策',
          good: 'AI负责信息收集，人类负责判断和决策',
          explanation: '合理分工能最大化准确性和效率'
        },
        {
          name: '渐进验证',
          bad: '等到最后再验证结果',
          good: '在过程中持续验证关键步骤',
          explanation: '及时发现问题可以避免错误累积'
        },
        {
          name: '反馈循环',
          bad: '发现错误后直接放弃',
          good: '分析错误原因，调整协作策略',
          explanation: '持续改进协作模式提高长期效果'
        }
      ]
    }
  ];

  const bestPractices = [
    {
      category: '提问技巧',
      icon: MessageSquare,
      tips: [
        '使用具体而非模糊的问题',
        '避免引导性或偏见性提问',
        '明确指定所需信息的格式',
        '请求提供信息来源和依据'
      ]
    },
    {
      category: '结果验证',
      icon: CheckCircle,
      tips: [
        '交叉对比多个信息源',
        '检查逻辑一致性',
        '验证数字和统计数据',
        '确认引用的真实性'
      ]
    },
    {
      category: '风险管理',
      icon: Shield,
      tips: [
        '对关键决策保持谨慎',
        '识别高风险应用场景',
        '建立人工审核机制',
        '持续监控和改进'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            AI幻觉防范策略
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            掌握实用的防范技巧和最佳实践，学会与AI安全有效地协作，最大化AI的价值同时最小化风险
          </p>
        </motion.div>

        {/* Strategy Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {strategies.map((strategy, index) => {
              const Icon = strategy.icon;
              return (
                <motion.div
                  key={strategy.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStrategy(index)}
                >
                  <Card className={`cursor-pointer transition-all duration-300 ${
                    selectedStrategy === index 
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl' 
                      : 'bg-white hover:shadow-lg'
                  }`}>
                    <CardBody className="p-4 text-center">
                      <Icon className={`w-8 h-8 mx-auto mb-2 ${
                        selectedStrategy === index ? 'text-white' : 'text-green-600'
                      }`} />
                      <h3 className="font-semibold text-sm mb-1">{strategy.title}</h3>
                      <p className={`text-xs ${
                        selectedStrategy === index ? 'text-green-100' : 'text-gray-600'
                      }`}>
                        {strategy.description}
                      </p>
                      <div className="flex justify-center mt-2">
                        <Chip 
                          size="sm"
                          className={selectedStrategy === index ? 'bg-white/20 text-white' : 'bg-green-100 text-green-600'}
                        >
                          {strategy.level}
                        </Chip>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Strategy Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStrategy}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardBody className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full">
                      {React.createElement(strategies[selectedStrategy].icon, { 
                        className: "w-6 h-6 text-white" 
                      })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {strategies[selectedStrategy].title}
                      </h2>
                      <p className="text-gray-600">{strategies[selectedStrategy].description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {strategies[selectedStrategy].effectiveness}%
                    </div>
                    <div className="text-sm text-gray-500">有效性</div>
                  </div>
                </div>

                <div className="space-y-6">
                  {strategies[selectedStrategy].techniques.map((technique, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-l-4 border-green-400 pl-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {technique.name}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                          <div className="flex items-center space-x-2 mb-2">
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="font-medium text-red-700">不推荐做法</span>
                          </div>
                          <p className="text-sm text-red-800">{technique.bad}</p>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                          <div className="flex items-center space-x-2 mb-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="font-medium text-green-700">推荐做法</span>
                          </div>
                          <p className="text-sm text-green-800">{technique.good}</p>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5" />
                          <p className="text-sm text-blue-800">{technique.explanation}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            最佳实践指南
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {bestPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardBody className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">{practice.category}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {practice.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start space-x-3">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 shadow-2xl">
            <CardBody className="p-12">
              <Target className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">
                准备实践所学技能了吗？
              </h2>
              <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                通过我们的知识测试验证您掌握的防范策略，在实际应用中提升AI协作效果
              </p>
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-50"
                endContent={<TrendingUp className="w-5 h-5" />}
              >
                开始知识测试
              </Button>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SolutionsPage;
