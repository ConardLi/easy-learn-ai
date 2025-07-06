/**
 * Agent架构组成图组件
 * 可视化展示Agent的系统架构，包括大语言模型、调度系统、工具调用等组成部分
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardBody, Button, Chip } from '@nextui-org/react';
import { Brain, Cpu, Wrench, Database, Eye, Zap, ArrowDown, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';

interface ArchitectureComponent {
  id: string;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description: string;
  details: string[];
  layer: 'input' | 'core' | 'execution';
}

export default function Architecture() {
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [showFlow, setShowFlow] = useState(true);

  const components: ArchitectureComponent[] = [
    // 输入层
    {
      id: 'perception',
      name: '多模态感知',
      role: '眼睛和耳朵',
      icon: <Eye size={24} />,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 border-teal-200',
      description: '处理图像、音频等多种输入模态',
      details: [
        '图像识别与分析',
        '语音识别与合成',
        '视频内容理解',
        '传感器数据处理'
      ],
      layer: 'input'
    },
    
    // 核心层
    {
      id: 'llm',
      name: '大语言模型',
      role: '大脑',
      icon: <Brain size={24} />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      description: '核心思维引擎，负责理解、推理和生成',
      details: [
        '自然语言理解与生成',
        '逻辑推理与决策',
        '知识检索与应用',
        '上下文理解与记忆'
      ],
      layer: 'core'
    },
    {
      id: 'orchestration',
      name: '调度编排系统',
      role: '触发器和决策中心',
      icon: <Cpu size={24} />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      description: '协调各组件工作，决定何时调用哪些工具',
      details: [
        '任务解析与分发',
        '工作流程管理',
        '组件间通信协调',
        '异常处理与恢复'
      ],
      layer: 'core'
    },
    {
      id: 'memory',
      name: '记忆与学习',
      role: '经验',
      icon: <Database size={24} />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      description: '存储历史对话、学习经验和知识图谱',
      details: [
        '对话历史存储',
        '知识图谱构建',
        '经验模式学习',
        '个性化偏好记录'
      ],
      layer: 'core'
    },
    
    // 执行层
    {
      id: 'tools',
      name: '工具调用',
      role: '手脚',
      icon: <Wrench size={24} />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      description: '执行具体操作，如计算、搜索、API调用',
      details: [
        '外部API接口调用',
        '计算器与数据处理',
        '文件操作与生成',
        '网络搜索与爬虫'
      ],
      layer: 'execution'
    },
    {
      id: 'execution',
      name: '执行引擎',
      role: '行动力',
      icon: <Zap size={24} />,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      description: '将决策转化为具体的执行动作',
      details: [
        '任务执行调度',
        '结果反馈收集',
        '性能监控优化',
        '错误重试机制'
      ],
      layer: 'execution'
    }
  ];

  const layerInfo = {
    input: { title: '输入感知层', description: '获取和处理外部信息' },
    core: { title: '核心处理层', description: '思考、决策和记忆管理' },
    execution: { title: '执行输出层', description: '执行操作和输出结果' }
  };

  const selectedComp = components.find(comp => comp.id === selectedComponent);

  const getComponentsByLayer = (layer: string) => {
    return components.filter(comp => comp.layer === layer);
  };

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
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 分层架构图 */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {(['input', 'core', 'execution'] as const).map((layer, layerIndex) => (
                <motion.div
                  key={layer}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: layerIndex * 0.2 }}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {layerInfo[layer].title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {layerInfo[layer].description}
                    </p>
                  </div>
                  
                  <div className={`grid ${
                    layer === 'core' ? 'md:grid-cols-3' : 
                    layer === 'input' ? 'md:grid-cols-1' : 'md:grid-cols-2'
                  } gap-4`}>
                    {getComponentsByLayer(layer).map((component, index) => (
                      <motion.div
                        key={component.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className={`cursor-pointer transition-all duration-300 border-2 ${
                            selectedComponent === component.id 
                              ? 'ring-2 ring-blue-500 shadow-lg scale-105' 
                              : `${component.bgColor} hover:shadow-md`
                          }`}
                          isPressable
                          onPress={() => setSelectedComponent(
                            selectedComponent === component.id ? '' : component.id
                          )}
                        >
                          <CardBody className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg bg-white ${component.color}`}>
                                {component.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-800 text-sm">
                                  {component.name}
                                </h4>
                                <Chip 
                                  size="sm" 
                                  variant="flat"
                                  className="text-xs"
                                >
                                  {component.role}
                                </Chip>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600">
                              {component.description}
                            </p>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* 层级之间的箭头 */}
                  {layerIndex < 2 && (
                    <div className="flex justify-center my-4">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ChevronDown size={24} className="text-gray-400" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 组件详情面板 */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg sticky top-4">
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
                        <div className={`p-2 rounded-lg bg-gray-100 ${selectedComp.color}`}>
                          {selectedComp.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm">
                            {selectedComp.name}
                          </h3>
                          <Chip size="sm" color="primary" variant="flat">
                            {selectedComp.role}
                          </Chip>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {selectedComp.description}
                      </p>

                      <h4 className="font-semibold text-gray-800 mb-3 text-sm">核心功能：</h4>
                      <ul className="space-y-2">
                        {selectedComp.details.map((detail, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-xs text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center h-full text-center py-8"
                    >
                      <Brain size={32} className="text-gray-300 mb-3" />
                      <h3 className="font-semibold text-gray-500 mb-2 text-sm">
                        点击组件了解详情
                      </h3>
                      <p className="text-gray-400 text-xs">
                        选择左侧的任意组件
                        查看其功能和作用
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* 信息流向说明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">
            <CardHeader className="text-center pb-4">
              <h3 className="text-xl font-bold text-gray-800">
                Agent 工作流程
              </h3>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="grid md:grid-cols-5 gap-4 items-center">
                <Card className="bg-white shadow-sm">
                  <CardBody className="text-center p-3">
                    <Eye size={20} className="mx-auto mb-2 text-teal-500" />
                    <p className="text-xs font-medium">接收输入</p>
                  </CardBody>
                </Card>
                
                <div className="flex justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
                
                <Card className="bg-white shadow-sm">
                  <CardBody className="text-center p-3">
                    <Brain size={20} className="mx-auto mb-2 text-purple-500" />
                    <p className="text-xs font-medium">理解思考</p>
                  </CardBody>
                </Card>
                
                <div className="flex justify-center">
                  <ArrowRight size={16} className="text-gray-400" />
                </div>
                
                <Card className="bg-white shadow-sm">
                  <CardBody className="text-center p-3">
                    <Zap size={20} className="mx-auto mb-2 text-red-500" />
                    <p className="text-xs font-medium">执行输出</p>
                  </CardBody>
                </Card>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
                  从感知输入到执行输出，每个层级都发挥着重要作用
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* 简单Agent示例 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg">
            <CardBody className="p-6">
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
                最简单的 Agent 实现
              </h3>
              <div className="grid md:grid-cols-3 gap-4 items-center">
                <Card className="bg-white shadow-sm">
                  <CardBody className="text-center p-4">
                    <MessageSquare size={24} className="mx-auto mb-2 text-blue-500" />
                    <h4 className="font-semibold mb-2 text-sm">Prompt 模板</h4>
                    <p className="text-xs text-gray-600">
                      "请帮我把下面的文本翻译为英文: {`{text}`}"
                    </p>
                  </CardBody>
                </Card>
                
                <div className="flex justify-center">
                  <ArrowRight size={20} className="text-gray-400" />
                </div>
                
                <Card className="bg-white shadow-sm">
                  <CardBody className="text-center p-4">
                    <Brain size={24} className="mx-auto mb-2 text-purple-500" />
                    <h4 className="font-semibold mb-2 text-sm">LLM + 触发器</h4>
                    <p className="text-xs text-gray-600">
                      用户输入自动拼接，一键翻译
                    </p>
                  </CardBody>
                </Card>
              </div>
              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm">
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