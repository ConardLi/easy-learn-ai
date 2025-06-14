/**
 * Agent类型展示组件
 * 展示吴恩达分类的四种Agent类型：反思型、工具调用型、任务规划型、多智能体协作
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button, Progress } from '@nextui-org/react';
import { RefreshCw, Wrench, MapPin, Users, Eye, Code, CheckCircle, MessageCircle } from 'lucide-react';

interface AgentType {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  description: string;
  characteristics: string[];
  scenario: string;
  workflow: { step: string; description: string; icon: React.ReactNode }[];
}

export default function AgentTypes() {
  const [selectedType, setSelectedType] = useState<string>('reflection');
  const [workflowStep, setWorkflowStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const agentTypes: AgentType[] = [
    {
      id: 'reflection',
      title: '自我反思型',
      subtitle: 'Reflection Agent',
      icon: <RefreshCw size={32} />,
      color: 'text-blue-500',
      bgGradient: 'from-blue-500 to-blue-600',
      description: '像"程序员+审查员"的组合，具备自我检查和迭代改进能力',
      characteristics: [
        '双角色机制：生成者+审查者',
        '迭代优化：持续自我改进',
        '质量保证：多轮检查验证',
        '适用场景：高质量内容生成'
      ],
      scenario: '代码开发与优化',
      workflow: [
        {
          step: '初始生成',
          description: '编写第一版代码实现',
          icon: <Code size={20} />
        },
        {
          step: '自我审查',
          description: '切换到审查员角色，检查代码漏洞',
          icon: <Eye size={20} />
        },
        {
          step: '反馈改进',
          description: '根据审查结果修改代码',
          icon: <RefreshCw size={20} />
        },
        {
          step: '迭代优化',
          description: '重复审查-改进直至满足标准',
          icon: <CheckCircle size={20} />
        }
      ]
    },
    {
      id: 'tool',
      title: '工具调用型',
      subtitle: 'Tool Use Agent',
      icon: <Wrench size={32} />,
      color: 'text-green-500',
      bgGradient: 'from-green-500 to-green-600',
      description: '拥有丰富的外挂工具包，突破纯语言模型的能力边界',
      characteristics: [
        '工具集成：调用各种外部工具',
        '能力扩展：突破语言模型局限',
        '实时数据：获取最新信息',
        '多功能性：支持复杂计算分析'
      ],
      scenario: '智能购物助手',
      workflow: [
        {
          step: '需求识别',
          description: '理解用户购物需求',
          icon: <MessageCircle size={20} />
        },
        {
          step: '工具调用',
          description: '调用优惠券查找工具',
          icon: <Wrench size={20} />
        },
        {
          step: '数据获取',
          description: '获取商品价格和优惠信息',
          icon: <RefreshCw size={20} />
        },
        {
          step: '结果整合',
          description: '为用户提供最优购物方案',
          icon: <CheckCircle size={20} />
        }
      ]
    },
    {
      id: 'planning',
      title: '任务规划型',
      subtitle: 'Planning Agent',
      icon: <MapPin size={32} />,
      color: 'text-purple-500',
      bgGradient: 'from-purple-500 to-purple-600',
      description: '擅长处理需要多步协作的复杂任务，自动串联工具和模型',
      characteristics: [
        '复杂分解：多步骤任务规划',
        '模型协作：串联不同AI模型',
        '流程自动化：无缝工具切换',
        '端到端：完整解决方案'
      ],
      scenario: '舞蹈教程生成',
      workflow: [
        {
          step: '动作提取',
          description: '使用Openpose模型分析动作',
          icon: <Eye size={20} />
        },
        {
          step: '图像转换',
          description: '使用Vision模型生成图片',
          icon: <RefreshCw size={20} />
        },
        {
          step: '文字说明',
          description: '使用GPT生成动作描述',
          icon: <MessageCircle size={20} />
        },
        {
          step: '语音合成',
          description: '使用FastSpeech转换为语音',
          icon: <CheckCircle size={20} />
        }
      ]
    },
    {
      id: 'collaboration',
      title: '多智能体协作',
      subtitle: 'Multi-Agent Collaboration',
      icon: <Users size={32} />,
      color: 'text-orange-500',
      bgGradient: 'from-orange-500 to-orange-600',
      description: '模拟人类团队分工，多个Agent各司其职协作完成复杂项目',
      characteristics: [
        '角色分工：专业化智能体团队',
        '协作对话：智能体间沟通',
        '项目管理：完整开发流程',
        '团队效应：1+1>2的协作效果'
      ],
      scenario: '软件开发项目',
      workflow: [
        {
          step: 'CEO决策',
          description: 'CEO智能体制定项目目标',
          icon: <Users size={20} />
        },
        {
          step: 'CTO设计',
          description: 'CTO智能体设计技术架构',
          icon: <MapPin size={20} />
        },
        {
          step: '程序员编码',
          description: '程序员智能体实现功能',
          icon: <Code size={20} />
        },
        {
          step: '测试员验证',
          description: '测试员智能体质量检查',
          icon: <CheckCircle size={20} />
        }
      ]
    }
  ];

  const selectedAgent = agentTypes.find(type => type.id === selectedType);

  const startWorkflowDemo = () => {
    setWorkflowStep(0);
    setIsPlaying(true);
    
    const timer = setInterval(() => {
      setWorkflowStep(prev => {
        if (prev >= (selectedAgent?.workflow.length || 0) - 1) {
          setIsPlaying(false);
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Agent 的四种典型形态
          </h2>
          <p className="text-xl text-gray-600">
            基于吴恩达分类，探索不同场景下的Agent实现模式
          </p>
        </motion.div>

        {/* 类型选择卡片 */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {agentTypes.map((type, index) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedType === type.id 
                    ? 'ring-2 ring-offset-2 ring-blue-500 shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                isPressable
                onPress={() => setSelectedType(type.id)}
              >
                <CardBody className="text-center p-4">
                  <div className={`${type.color} mb-3 flex justify-center`}>
                    {type.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {type.subtitle}
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 详细展示区域 */}
        <AnimatePresence mode="wait">
          {selectedAgent && (
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {/* 左侧：基本信息 */}
              <Card className="bg-white shadow-lg">
                <CardHeader className={`bg-gradient-to-r ${selectedAgent.bgGradient} text-white`}>
                  <div className="flex items-center gap-3">
                    {selectedAgent.icon}
                    <div>
                      <h3 className="text-xl font-bold">{selectedAgent.title}</h3>
                      <p className="text-sm opacity-90">{selectedAgent.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {selectedAgent.description}
                  </p>
                  <h4 className="font-semibold text-gray-800 mb-3">核心特征：</h4>
                  <ul className="space-y-2">
                    {selectedAgent.characteristics.map((char, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{char}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardBody>
              </Card>

              {/* 右侧：工作流演示 */}
              <div className="md:col-span-2">
                <Card className="bg-white shadow-lg h-full">
                  <CardHeader className="border-b border-gray-200">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800">
                          工作流演示：{selectedAgent.scenario}
                        </h3>
                        <Button
                          color="primary"
                          variant="solid"
                          size="sm"
                          onPress={startWorkflowDemo}
                          isDisabled={isPlaying}
                        >
                          开始演示
                        </Button>
                      </div>
                      <Progress 
                        value={(workflowStep + 1) / selectedAgent.workflow.length * 100} 
                        className="w-full"
                        color="primary"
                      />
                    </div>
                  </CardHeader>
                  <CardBody className="p-6">
                    <div className="space-y-4">
                      {selectedAgent.workflow.map((step, index) => (
                        <motion.div
                          key={index}
                          className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-500 ${
                            index <= workflowStep 
                              ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' 
                              : 'bg-gray-50 border-l-4 border-gray-300'
                          }`}
                          initial={{ opacity: 0.5 }}
                          animate={{ 
                            opacity: index <= workflowStep ? 1 : 0.5,
                            scale: index === workflowStep ? 1.02 : 1,
                            x: index <= workflowStep ? 0 : 10
                          }}
                        >
                          <div className={`p-2 rounded-lg ${
                            index <= workflowStep 
                              ? 'bg-blue-100 text-blue-600' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            {step.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold mb-1 ${
                              index <= workflowStep ? 'text-gray-800' : 'text-gray-500'
                            }`}>
                              步骤 {index + 1}: {step.step}
                            </h4>
                            <p className={`text-sm ${
                              index <= workflowStep ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {step.description}
                            </p>
                          </div>
                          {index === workflowStep && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-blue-500 rounded-full"
                            />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
