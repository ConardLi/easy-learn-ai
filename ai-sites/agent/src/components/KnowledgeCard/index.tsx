/**
 * Agent知识卡片组件
 * 展示Agent核心概念的总结性文字介绍
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Divider, Chip } from '@nextui-org/react';
import { Brain, Zap, Users, Target, Database, Wrench, RefreshCw, MapPin, BookOpen } from 'lucide-react';

interface KnowledgeCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KnowledgeCard({ isOpen, onClose }: KnowledgeCardProps) {
  const knowledgeData = {
    definition: {
      title: "什么是 AI Agent？",
      content: "AI Agent（智能体）是基于大语言模型构建的可执行程序，能独立拆解任务、调用工具、存储记忆，并通过「规划-行动-反馈」的循环自主完成复杂目标，无需人类持续干预。"
    },
    differences: {
      title: "与传统AI的区别",
      traditional: "传统AI像「一次性写手」，接收提示后直接生成结果，中间无法调整思路",
      agent: "Agent具备人类思维模式，能规划任务、调用工具、自我反思，通过闭环循环不断优化"
    },
    coreCapabilities: {
      title: "四大核心能力",
      items: [
        {
          name: "规划 (Planning)",
          icon: <MapPin size={16} />,
          desc: "把复杂任务拆分成可执行的子步骤"
        },
        {
          name: "记忆 (Memory)",
          icon: <Database size={16} />,
          desc: "存储历史对话和数据，避免重复工作"
        },
        {
          name: "工具 (Tools)",
          icon: <Wrench size={16} />,
          desc: "调用外部API和计算器，突破语言模型局限"
        },
        {
          name: "行动 (Action)",
          icon: <Zap size={16} />,
          desc: "执行具体操作，如发送邮件、生成文档"
        }
      ]
    },
    agentTypes: {
      title: "四种典型形态",
      types: [
        {
          name: "自我反思型",
          icon: <RefreshCw size={16} />,
          desc: "程序员+审查员组合，持续自我优化"
        },
        {
          name: "工具调用型",
          icon: <Wrench size={16} />,
          desc: "拥有丰富工具包，突破能力边界"
        },
        {
          name: "任务规划型",
          icon: <Target size={16} />,
          desc: "处理多步协作，自动串联工具模型"
        },
        {
          name: "多智能体协作",
          icon: <Users size={16} />,
          desc: "团队分工，多Agent协作完成项目"
        }
      ]
    },
    architecture: {
      title: "系统架构",
      layers: [
        "输入感知层：多模态感知（眼睛和耳朵）",
        "核心处理层：大语言模型（大脑）+ 调度系统（决策中心）+ 记忆系统（经验）",
        "执行输出层：工具调用（手脚）+ 执行引擎（行动力）"
      ]
    },
    keyInsights: {
      title: "核心洞察",
      insights: [
        "Agent = LLM + 规划能力 + 工具调用 + 记忆存储 + 反馈循环",
        "从「回答问题」进化到「解决问题」的智能体",
        "具备接近人类的任务处理逻辑和工作流程",
        "最简单的Agent：Prompt模板 + LLM + 触发器"
      ]
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        base: "bg-gradient-to-br from-blue-50 to-purple-50",
        header: "border-b border-gray-200",
        footer: "border-t border-gray-200"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center gap-3 px-6 py-4">
          <BookOpen className="text-blue-600" size={24} />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Agent 知识卡片
            </h2>
            <p className="text-sm text-gray-600">核心概念速查手册</p>
          </div>
        </ModalHeader>
        
        <ModalBody className="px-6 py-4">
          <div className="space-y-6">
            {/* 定义 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Brain className="text-purple-600" size={20} />
                    {knowledgeData.definition.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {knowledgeData.definition.content}
                  </p>
                </CardBody>
              </Card>
            </motion.div>

            {/* 与传统AI的区别 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {knowledgeData.differences.title}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 mb-2">传统 AI</h4>
                      <p className="text-sm text-gray-700">{knowledgeData.differences.traditional}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 mb-2">AI Agent</h4>
                      <p className="text-sm text-gray-700">{knowledgeData.differences.agent}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 四大核心能力 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {knowledgeData.coreCapabilities.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {knowledgeData.coreCapabilities.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-blue-600 mt-0.5">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 四种典型形态 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {knowledgeData.agentTypes.title}
                    <span className="text-sm font-normal text-gray-500 ml-2">（基于吴恩达分类）</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {knowledgeData.agentTypes.types.map((type, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-green-600 mt-0.5">
                          {type.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">{type.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{type.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 系统架构 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="bg-white shadow-sm">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {knowledgeData.architecture.title}
                  </h3>
                  <div className="space-y-2">
                    {knowledgeData.architecture.layers.map((layer, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
                        {layer}
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* 核心洞察 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm border-2 border-blue-200">
                <CardBody className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Zap className="text-orange-500" size={20} />
                    {knowledgeData.keyInsights.title}
                  </h3>
                  <div className="space-y-3">
                    {knowledgeData.keyInsights.insights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Chip 
                          size="sm" 
                          color="primary" 
                          variant="flat"
                          className="flex-shrink-0 mt-0.5"
                        >
                          {index + 1}
                        </Chip>
                        <p className="text-sm text-gray-700 leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </ModalBody>
        
        <ModalFooter className="px-6 py-4">
          <Button 
            color="primary" 
            variant="solid"
            onPress={onClose}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            确定
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}