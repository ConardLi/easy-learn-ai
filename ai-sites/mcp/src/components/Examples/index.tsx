/**
 * MCP 应用示例组件
 * 展示 MCP 在不同场景下的实际应用案例
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Cloud, FileText, Code, BarChart3, MessageSquare } from 'lucide-react';

const Examples: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState(0);

  const examples = [
    {
      id: 'database',
      title: '智能数据查询助手',
      icon: Database,
      color: 'from-blue-500 to-blue-600',
      scenario: '企业数据分析',
      description: 'AI 助手直接查询企业数据库，提供实时业务洞察',
      workflow: [
        { step: '用户询问', content: '"本季度销售额比上季度增长了多少？"' },
        { step: 'MCP 处理', content: 'MCP Server 连接销售数据库，执行 SQL 查询' },
        { step: '数据获取', content: '获取本季度和上季度的销售数据' },
        { step: '智能分析', content: 'AI 计算增长率并生成分析报告' },
        { step: '结果展示', content: '"本季度销售额为 500 万，比上季度增长 15%"' }
      ],
      benefits: [
        '实时数据访问',
        '自然语言查询',
        '智能数据分析',
        '自动报告生成'
      ]
    },
    {
      id: 'api',
      title: '实时信息聚合器',
      icon: Cloud,
      color: 'from-green-500 to-green-600',
      scenario: '信息整合服务',
      description: '整合多个外部 API，为用户提供综合信息服务',
      workflow: [
        { step: '用户请求', content: '"帮我查看今天的天气、股票和新闻"' },
        { step: '并行调用', content: 'MCP 同时调用天气、股票、新闻 API' },
        { step: '数据整合', content: '收集并整理来自不同源的数据' },
        { step: '内容生成', content: 'AI 生成个性化的信息摘要' },
        { step: '统一展示', content: '以用户友好的格式展示所有信息' }
      ],
      benefits: [
        '多源数据整合',
        '实时信息更新',
        '个性化内容',
        '统一用户体验'
      ]
    },
    {
      id: 'files',
      title: '智能文档处理器',
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      scenario: '文档管理自动化',
      description: '自动处理、分析和整理各种类型的文档文件',
      workflow: [
        { step: '文档上传', content: '用户上传 PDF、Word、Excel 等文档' },
        { step: '内容提取', content: 'MCP Server 解析文档内容和结构' },
        { step: '智能分析', content: 'AI 分析文档主题、关键信息和数据' },
        { step: '自动整理', content: '按类别自动分类和标签文档' },
        { step: '搜索优化', content: '生成搜索索引，支持语义搜索' }
      ],
      benefits: [
        '多格式支持',
        '智能内容分析',
        '自动分类整理',
        '语义搜索功能'
      ]
    },
    {
      id: 'code',
      title: '代码智能助手',
      icon: Code,
      color: 'from-orange-500 to-orange-600',
      scenario: '开发效率提升',
      description: '连接代码仓库和开发工具，提供智能编程辅助',
      workflow: [
        { step: '代码分析', content: 'MCP 连接 Git 仓库，分析代码结构' },
        { step: '问题识别', content: '自动发现潜在的 Bug 和性能问题' },
        { step: '优化建议', content: 'AI 提供代码优化和重构建议' },
        { step: '文档生成', content: '自动生成代码注释和技术文档' },
        { step: '测试辅助', content: '生成单元测试和集成测试代码' }
      ],
      benefits: [
        '代码质量提升',
        '自动文档生成',
        '智能 Bug 检测',
        '开发效率优化'
      ]
    }
  ];

  const currentExample = examples[selectedExample];

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">实际应用示例</h2>
        <p className="text-gray-600">探索 MCP 在不同场景下的实际应用案例</p>
      </motion.div>

      {/* 示例选择器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {examples.map((example, index) => (
          <motion.button
            key={example.id}
            onClick={() => setSelectedExample(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              selectedExample === index
                ? 'border-blue-500 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-r ${example.color}`}>
              <example.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{example.title}</h3>
            <p className="text-sm text-gray-600">{example.scenario}</p>
          </motion.button>
        ))}
      </div>

      {/* 详细示例展示 */}
      <motion.div
        key={selectedExample}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* 头部 */}
        <div className={`bg-gradient-to-r ${currentExample.color} p-8 text-white`}>
          <div className="flex items-center mb-4">
            <currentExample.icon className="w-12 h-12 mr-4" />
            <div>
              <h3 className="text-2xl font-bold">{currentExample.title}</h3>
              <p className="text-lg opacity-90">{currentExample.scenario}</p>
            </div>
          </div>
          <p className="text-lg opacity-95">{currentExample.description}</p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 工作流程 */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6">工作流程</h4>
              <div className="space-y-4">
                {currentExample.workflow.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-800 mb-1">{item.step}</h5>
                      <p className="text-gray-600 text-sm">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 核心优势 */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6">核心优势</h4>
              <div className="grid grid-cols-1 gap-4">
                {currentExample.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-gray-800">{benefit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 技术栈 */}
              <div className="mt-8">
                <h5 className="font-semibold text-gray-800 mb-4">相关技术</h5>
                <div className="flex flex-wrap gap-2">
                  {['MCP Protocol', 'REST API', 'WebSocket', 'JSON-RPC', 'OAuth 2.0'].map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 实施建议 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">实施建议</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">评估需求</h4>
            <p className="text-indigo-100 text-sm">
              分析具体业务场景，确定 MCP 集成的优先级和范围
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Code className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">原型开发</h4>
            <p className="text-indigo-100 text-sm">
              先从简单场景开始，逐步扩展 MCP Server 的功能
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-2">用户反馈</h4>
            <p className="text-indigo-100 text-sm">
              收集用户体验反馈，持续优化交互流程和功能
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Examples;
