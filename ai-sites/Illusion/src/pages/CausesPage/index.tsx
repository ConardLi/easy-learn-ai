/**
 * 成因分析页面
 * 使用动态图表深入分析AI幻觉产生的根本原因
 * 包含多维度的可视化展示和交互式探索
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Tabs, Tab, Button } from '@nextui-org/react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { 
  Database, 
  Brain, 
  AlertTriangle, 
  Users, 
  Settings,
  TrendingUp,
  Zap,
  Target
} from 'lucide-react';

const CausesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  // Data for different visualizations
  const overviewData = [
    { name: '训练数据缺陷', value: 35, color: '#ef4444' },
    { name: '模型架构限制', value: 25, color: '#f97316' },
    { name: '现实验证缺失', value: 20, color: '#eab308' },
    { name: '用户提示偏差', value: 15, color: '#22c55e' },
    { name: '其他因素', value: 5, color: '#6366f1' }
  ];

  const severityData = [
    { factor: '虚构事实生成', frequency: 85, severity: 90 },
    { factor: '逻辑推理错误', frequency: 70, severity: 75 },
    { factor: '引用信息错误', frequency: 60, severity: 95 },
    { factor: '数据过时', frequency: 45, severity: 60 },
    { factor: '偏见放大', frequency: 55, severity: 80 }
  ];

  const modelComparisonData = [
    { model: 'GPT-3.5', accuracy: 75, hallucination: 25 },
    { model: 'GPT-4', accuracy: 85, hallucination: 15 },
    { model: 'Claude-3', accuracy: 82, hallucination: 18 },
    { model: 'Gemini', accuracy: 80, hallucination: 20 },
    { model: 'LLaMA-2', accuracy: 78, hallucination: 22 }
  ];

  const radarData = [
    { subject: '事实准确性', A: 65, B: 80, fullMark: 100 },
    { subject: '逻辑一致性', A: 70, B: 85, fullMark: 100 },
    { subject: '引用可靠性', A: 45, B: 75, fullMark: 100 },
    { subject: '时效性', A: 55, B: 70, fullMark: 100 },
    { subject: '偏见控制', A: 60, B: 78, fullMark: 100 },
    { subject: '透明度', A: 40, B: 65, fullMark: 100 }
  ];

  const causes = [
    {
      id: 'data',
      title: '训练数据问题',
      icon: Database,
      description: '训练数据中的噪声、错误和偏见是幻觉的主要来源',
      details: [
        '互联网数据质量参差不齐',
        '历史信息可能过时或错误',
        '虚构内容被误认为事实',
        '数据标注存在主观偏差'
      ],
      impact: '高',
      solutions: [
        '严格的数据质量控制',
        '多源信息交叉验证',
        '定期数据更新维护',
        '改进数据清洗算法'
      ]
    },
    {
      id: 'architecture',
      title: '模型架构局限',
      icon: Brain,
      description: '当前AI架构缺乏有效的事实验证和逻辑校验机制',
      details: [
        '基于统计模式而非逻辑推理',
        '缺乏外部知识库接入',
        '无法区分虚构与现实',
        '上下文理解能力有限'
      ],
      impact: '高',
      solutions: [
        '引入外部知识图谱',
        '增强逻辑推理模块',
        '实时事实核查系统',
        '多模态信息融合'
      ]
    },
    {
      id: 'grounding',
      title: '现实锚定缺失',
      icon: Target,
      description: 'AI缺乏与现实世界的直接连接和验证能力',
      details: [
        '无法访问实时信息',
        '缺乏感官体验数据',
        '物理常识理解不足',
        '时间概念模糊'
      ],
      impact: '中',
      solutions: [
        '接入实时数据源',
        '增强物理常识库',
        '时间敏感信息标记',
        '多模态感知能力'
      ]
    },
    {
      id: 'prompt',
      title: '提示偏差影响',
      icon: Users,
      description: '用户的提问方式和上下文可能诱导AI产生幻觉',
      details: [
        '引导性问题设计',
        '模糊不清的指令',
        '假设性前提错误',
        '上下文信息不足'
      ],
      impact: '中',
      solutions: [
        '提示工程最佳实践',
        '用户教育培训',
        '智能提示优化',
        '上下文补全机制'
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
          <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI幻觉成因分析
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            通过数据可视化深入理解AI幻觉产生的根本原因，掌握各种成因的影响机制和应对策略
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Tabs 
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key as string)}
            className="w-full"
            classNames={{
              tabList: "grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-xl",
              cursor: "w-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg",
              tab: "w-full h-12",
              tabContent: "group-data-[selected=true]:text-white font-medium"
            }}
          >
            <Tab key="overview" title="总体概览" />
            <Tab key="severity" title="严重程度" />
            <Tab key="comparison" title="模型对比" />
            <Tab key="detailed" title="详细分析" />
          </Tabs>
        </motion.div>

        {/* Content based on selected tab */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {selectedCategory === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">幻觉成因分布</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={overviewData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {overviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
                <CardBody className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-800">AI能力雷达图</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis />
                      <Radar name="当前水平" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                      <Radar name="理想水平" dataKey="B" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            </div>
          )}

          {selectedCategory === 'severity' && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">幻觉类型严重程度分析</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={severityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="factor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="frequency" fill="#8884d8" name="出现频率%" />
                    <Bar dataKey="severity" fill="#82ca9d" name="严重程度%" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          )}

          {selectedCategory === 'comparison' && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
              <CardBody className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">不同模型幻觉率对比</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={modelComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#22c55e" name="准确率%" />
                    <Bar dataKey="hallucination" fill="#ef4444" name="幻觉率%" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          )}

          {selectedCategory === 'detailed' && (
            <div className="grid md:grid-cols-2 gap-6">
              {causes.map((cause, index) => {
                const Icon = cause.icon;
                return (
                  <motion.div
                    key={cause.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                      <CardBody className="p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{cause.title}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              cause.impact === '高' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              影响程度: {cause.impact}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{cause.description}</p>

                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">具体表现：</h4>
                          <div className="space-y-1">
                            {cause.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">应对策略：</h4>
                          <div className="space-y-1">
                            {cause.solutions.map((solution, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm text-gray-700">{solution}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CausesPage;
