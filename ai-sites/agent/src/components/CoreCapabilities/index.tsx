/**
 * Agent核心能力展示组件
 * 交互式展示Agent的四大核心能力：规划、记忆、工具、行动
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { Map, Brain, Wrench, Zap, ChevronRight, Target, Database, Calculator, Send } from 'lucide-react';

interface Capability {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  example: string;
  features: string[];
  demoSteps: { step: string; detail: string }[];
}

export default function CoreCapabilities() {
  const [activeCapability, setActiveCapability] = useState<string>('planning');
  const [demoStep, setDemoStep] = useState(0);

  const capabilities: Capability[] = [
    {
      id: 'planning',
      title: '规划 (Planning)',
      icon: <Map size={32} />,
      color: 'text-blue-500',
      description: '把复杂任务拆分成可执行的子步骤，制定执行计划',
      example: '制作季度营销方案',
      features: ['任务分解', '优先级排序', '依赖关系分析', '时间规划'],
      demoSteps: [
        { step: '接收任务', detail: '用户要求：制作Q4营销方案' },
        { step: '任务分解', detail: '拆分为：市场调研→目标设定→策略设计→预算规划' },
        { step: '制定时间线', detail: '为每个子任务分配时间和资源' },
        { step: '识别依赖', detail: '确定各步骤间的前置条件' }
      ]
    },
    {
      id: 'memory',
      title: '记忆 (Memory)',
      icon: <Brain size={32} />,
      color: 'text-purple-500',
      description: '存储和管理历史对话、数据和经验，支持上下文理解',
      example: '客户邮箱整理项目',
      features: ['对话历史', '知识图谱', '经验积累', '上下文管理'],
      demoSteps: [
        { step: '存储交互', detail: '记录所有用户对话和操作历史' },
        { step: '数据管理', detail: '保存客户邮箱分类规则和结果' },
        { step: '经验学习', detail: '从历史操作中学习用户偏好' },
        { step: '智能调用', detail: '下次直接使用已有数据，无需重复工作' }
      ]
    },
    {
      id: 'tools',
      title: '工具 (Tools)',
      icon: <Wrench size={32} />,
      color: 'text-green-500',
      description: '调用外部工具和API，突破语言模型的能力边界',
      example: '复杂数据分析',
      features: ['计算器', '搜索引擎', 'API接口', '代码执行'],
      demoSteps: [
        { step: '识别需求', detail: '检测到需要计算 12345×67890' },
        { step: '选择工具', detail: '自动调用计算器工具' },
        { step: '执行计算', detail: '获得精确结果：837405300' },
        { step: '整合结果', detail: '将计算结果融入回答中' }
      ]
    },
    {
      id: 'action',
      title: '行动 (Action)',
      icon: <Zap size={32} />,
      color: 'text-orange-500',
      description: '执行具体操作，如发送邮件、生成文档、控制设备',
      example: '自动化办公流程',
      features: ['邮件发送', '文档生成', '设备控制', '流程自动化'],
      demoSteps: [
        { step: '准备执行', detail: '根据规划准备执行具体操作' },
        { step: '发送邮件', detail: '自动撰写并发送会议邀请邮件' },
        { step: '生成PPT', detail: '创建包含数据图表的演示文稿' },
        { step: '完成反馈', detail: '向用户报告任务完成状态' }
      ]
    }
  ];

  const activeCapabilityData = capabilities.find(cap => cap.id === activeCapability);

  const nextStep = () => {
    if (activeCapabilityData && demoStep < activeCapabilityData.demoSteps.length - 1) {
      setDemoStep(demoStep + 1);
    }
  };

  const resetDemo = () => {
    setDemoStep(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Agent 的四大核心能力
          </h2>
          <p className="text-xl text-gray-600">
            探索让Agent具备类人智能的关键支柱
          </p>
        </motion.div>

        {/* 能力选择按钮 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {capabilities.map((capability) => (
            <motion.div
              key={capability.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeCapability === capability.id ? "solid" : "bordered"}
                className={`w-full h-20 flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  activeCapability === capability.id 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                    : 'bg-white hover:bg-gray-50'
                }`}
                onPress={() => {
                  setActiveCapability(capability.id);
                  setDemoStep(0);
                }}
              >
                <div className={activeCapability === capability.id ? 'text-white' : capability.color}>
                  {capability.icon}
                </div>
                <span className="text-sm font-medium">
                  {capability.title.split(' ')[0]}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* 详细展示区域 */}
        <AnimatePresence mode="wait">
          {activeCapabilityData && (
            <motion.div
              key={activeCapability}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* 左侧：能力介绍 */}
              <Card className="bg-white shadow-lg">
                <CardBody className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={activeCapabilityData.color}>
                      {activeCapabilityData.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {activeCapabilityData.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {activeCapabilityData.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">应用场景示例：</h4>
                    <Chip 
                      color="primary" 
                      variant="flat"
                      startContent={<Target size={16} />}
                    >
                      {activeCapabilityData.example}
                    </Chip>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3">核心特性：</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {activeCapabilityData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* 右侧：交互演示 */}
              <Card className="bg-white shadow-lg">
                <CardBody className="p-6">
                  <h4 className="text-xl font-bold text-gray-800 mb-4">
                    实际运行演示
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    {activeCapabilityData.demoSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${
                          index <= demoStep 
                            ? 'bg-purple-50 border-purple-500 shadow-sm' 
                            : 'bg-gray-50 border-gray-300'
                        }`}
                        initial={{ opacity: 0.5 }}
                        animate={{ 
                          opacity: index <= demoStep ? 1 : 0.5,
                          scale: index === demoStep ? 1.02 : 1
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-sm font-medium px-2 py-1 rounded ${
                            index <= demoStep 
                              ? 'bg-purple-200 text-purple-800' 
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            步骤 {index + 1}
                          </span>
                          <span className="font-medium text-gray-800">
                            {step.step}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm ml-2">
                          {step.detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      color="primary"
                      variant="solid"
                      onPress={nextStep}
                      isDisabled={demoStep >= activeCapabilityData.demoSteps.length - 1}
                      endContent={<ChevronRight size={16} />}
                      className="flex-1"
                    >
                      下一步
                    </Button>
                    <Button
                      variant="bordered"
                      onPress={resetDemo}
                      className="px-6"
                    >
                      重置
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
