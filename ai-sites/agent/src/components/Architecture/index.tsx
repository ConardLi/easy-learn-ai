/**
 * Agent架构组成图组件
 * 可视化展示Agent的系统架构，包括大语言模型、调度系统、工具调用等组成部分
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardBody, Button, Chip } from '@nextui-org/react';
import { Brain, Cpu, Wrench, Database, Eye, Ear, Zap, ArrowDown, ArrowRight, MessageSquare } from 'lucide-react';

interface ArchitectureComponent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  details: string[];
  position: { x: number; y: number };
}

export default function Architecture() {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [showConnections, setShowConnections] = useState(false);

  const components: ArchitectureComponent[] = [
    {
      id: 'llm',
      name: '大语言模型',
      role: '大脑',
      icon: <Brain size={32} />,
      color: 'text-purple-500',
      description: '核心思维引擎，负责理解、推理和生成',
      details: [
        '自然语言理解与生成',
        '逻辑推理与决策',
        '知识检索与应用',
        '上下文理解与记忆'
      ],
      position: { x: 50, y: 20 }
    },
    {
      id: 'orchestration',
      name: '调度编排系统',
      role: '触发器和决策中心',
      icon: <Cpu size={32} />,
      color: 'text-blue-500',
      description: '协调各组件工作，决定何时调用哪些工具',
      details: [
        '任务解析与分发',
        '工作流程管理',
        '组件间通信协调',
        '异常处理与恢复'
      ],
      position: { x: 50, y: 40 }
    },
    {
      id: 'tools',
      name: '工具调用',
      role: '手脚',
      icon: <Wrench size={32} />,
      color: 'text-green-500',
      description: '执行具体操作，如计算、搜索、API调用',
      details: [
        '外部API接口调用',
        '计算器与数据处理',
        '文件操作与生成',
        '网络搜索与爬虫'
      ],
      position: { x: 20, y: 60 }
    },
    {
      id: 'memory',
      name: '记忆与学习',
      role: '经验',
      icon: <Database size={32} />,
      color: 'text-orange-500',
      description: '存储历史对话、学习经验和知识图谱',
      details: [
        '对话历史存储',
        '知识图谱构建',
        '经验模式学习',
        '个性化偏好记录'
      ],
      position: { x: 80, y: 60 }
    },
    {
      id: 'perception',
      name: '多模态感知',
      role: '眼睛和耳朵',
      icon: <Eye size={32} />,
      color: 'text-teal-500',
      description: '处理图像、音频等多种输入模态',
      details: [
        '图像识别与分析',
        '语音识别与合成',
        '视频内容理解',
        '传感器数据处理'
      ],
      position: { x: 20, y: 80 }
    },
    {
      id: 'execution',
      name: '执行引擎',
      role: '行动力',
      icon: <Zap size={32} />,
      color: 'text-red-500',
      description: '将决策转化为具体的执行动作',
      details: [
        '任务执行调度',
        '结果反馈收集',
        '性能监控优化',
        '错误重试机制'
      ],
      position: { x: 80, y: 80 }
    }
  ];

  const connections = [
    { from: 'llm', to: 'orchestration', type: 'bidirectional' },
    { from: 'orchestration', to: 'tools', type: 'unidirectional' },
    { from: 'orchestration', to: 'memory', type: 'bidirectional' },
    { from: 'orchestration', to: 'perception', type: 'unidirectional' },
    { from: 'orchestration', to: 'execution', type: 'unidirectional' },
    { from: 'memory', to: 'llm', type: 'unidirectional' },
    { from: 'perception', to: 'llm', type: 'unidirectional' }
  ];

  const selectedComp = components.find(comp => comp.id === selectedComponent);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent">
            Agent 系统架构
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            探索构成智能Agent的核心组件与它们的协作机制
          </p>
          <Button
            color="primary"
            variant={showConnections ? "solid" : "bordered"}
            onPress={() => setShowConnections(!showConnections)}
            className="mb-4"
          >
            {showConnections ? '隐藏连接线' : '显示组件连接'}
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* 架构图 */}
          <div className="md:col-span-2">
            <Card className="bg-white shadow-lg p-6 h-96 relative overflow-hidden">
              <div className="relative w-full h-full">
                {/* 连接线 */}
                <AnimatePresence>
                  {showConnections && (
                    <svg className="absolute inset-0 w-full h-full z-0">
                      {connections.map((conn, index) => {
                        const fromComp = components.find(c => c.id === conn.from);
                        const toComp = components.find(c => c.id === conn.to);
                        if (!fromComp || !toComp) return null;
                        
                        const x1 = (fromComp.position.x / 100) * 100;
                        const y1 = (fromComp.position.y / 100) * 100;
                        const x2 = (toComp.position.x / 100) * 100;
                        const y2 = (toComp.position.y / 100) * 100;
                        
                        return (
                          <motion.line
                            key={index}
                            x1={`${x1}%`}
                            y1={`${y1}%`}
                            x2={`${x2}%`}
                            y2={`${y2}%`}
                            stroke="rgb(99 102 241)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            exit={{ pathLength: 0, opacity: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                          />
                        );
                      })}
                    </svg>
                  )}
                </AnimatePresence>

                {/* 组件节点 */}
                {components.map((component, index) => (
                  <motion.div
                    key={component.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      left: `${component.position.x}%`,
                      top: `${component.position.y}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      isIconOnly
                      variant={selectedComponent === component.id ? "solid" : "bordered"}
                      color={selectedComponent === component.id ? "primary" : "default"}
                      size="lg"
                      className={`w-16 h-16 ${
                        selectedComponent === component.id 
                          ? 'bg-blue-500 text-white shadow-lg' 
                          : 'bg-white hover:bg-gray-50'
                      }`}
                      onPress={() => setSelectedComponent(
                        selectedComponent === component.id ? '' : component.id
                      )}
                    >
                      <div className={selectedComponent === component.id ? 'text-white' : component.color}>
                        {component.icon}
                      </div>
                    </Button>
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center">
                      <p className="text-xs font-medium text-gray-700 whitespace-nowrap">
                        {component.name}
                      </p>
                      <Chip 
                        size="sm" 
                        color="primary" 
                        variant="flat"
                        className="text-xs mt-1"
                      >
                        {component.role}
                      </Chip>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* 组件详情 */}
          <div>
            <Card className="bg-white shadow-lg h-96">
              <CardBody className="p-6">
                <AnimatePresence mode="wait">
                  {selectedComp ? (
                    <motion.div
                      key={selectedComp.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={selectedComp.color}>
                          {selectedComp.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {selectedComp.name}
                          </h3>
                          <Chip size="sm" color="primary" variant="flat">
                            {selectedComp.role}
                          </Chip>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {selectedComp.description}
                      </p>

                      <h4 className="font-semibold text-gray-800 mb-3">核心功能：</h4>
                      <ul className="space-y-2">
                        {selectedComp.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center"
                    >
                      <Brain size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        点击组件了解详情
                      </h3>
                      <p className="text-gray-400 text-sm">
                        选择架构图中的任意组件
                        查看其功能和作用
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* 简单Agent示例 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
                最简单的 Agent 实现
              </h3>
              <div className="grid md:grid-cols-3 gap-6 items-center">
                <Card className="bg-white shadow-md">
                  <CardBody className="text-center p-4">
                    <MessageSquare size={32} className="mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold mb-2">Prompt 模板</h4>
                    <p className="text-sm text-gray-600">
                      "请帮我把下面的文本翻译为英文: {`{text}`}"
                    </p>
                  </CardBody>
                </Card>
                
                <div className="flex justify-center">
                  <ArrowRight size={24} className="text-gray-400" />
                </div>
                
                <Card className="bg-white shadow-md">
                  <CardBody className="text-center p-4">
                    <Brain size={32} className="mx-auto mb-2 text-purple-500" />
                    <h4 className="font-semibold mb-2">LLM + 触发器</h4>
                    <p className="text-sm text-gray-600">
                      用户输入自动拼接，一键翻译
                    </p>
                  </CardBody>
                </Card>
              </div>
              <div className="text-center mt-6">
                <p className="text-gray-600">
                  即使是这样简单的组合，也构成了一个完整的 AI Agent！
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// ... 保留组件的其余部分代码 ...