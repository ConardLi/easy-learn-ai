/**
 * MCP 通信模式组件
 * 对比展示 STDIO 和 SSE 两种通信方式
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Wifi, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const CommunicationModes: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'stdio' | 'sse'>('stdio');

  const modes = {
    stdio: {
      title: 'STDIO 模式',
      subtitle: '标准输入输出',
      icon: Terminal,
      color: 'from-green-500 to-green-600',
      description: '通过本地进程的标准输入输出进行直接通信',
      characteristics: [
        { text: '本地进程通信', positive: true },
        { text: '无需网络连接', positive: true },
        { text: '低延迟', positive: true },
        { text: '简单直接', positive: true },
        { text: '仅限本地使用', positive: false }
      ],
      useCases: [
        '本地开发环境',
        '命令行工具',
        '本地文件操作',
        '系统命令执行'
      ],
      example: {
        title: '示例场景',
        description: '开发者在本地使用 Cursor IDE，通过命令行启动 MCP 服务器处理本地文件'
      }
    },
    sse: {
      title: 'SSE 模式',
      subtitle: '服务器推送事件',
      icon: Wifi,
      color: 'from-blue-500 to-blue-600',
      description: '通过 HTTP 协议连接远程服务器，支持实时数据推送',
      characteristics: [
        { text: '远程网络通信', positive: true },
        { text: '实时数据推送', positive: true },
        { text: '跨网络访问', positive: true },
        { text: '支持持续连接', positive: true },
        { text: '需要网络连接', positive: false }
      ],
      useCases: [
        '远程API调用',
        '实时数据监控',
        '云服务集成',
        '实时通知推送'
      ],
      example: {
        title: '示例场景',
        description: 'AI 助手通过网页调用远程天气 API，获取实时天气信息并持续更新'
      }
    }
  };

  const currentMode = modes[selectedMode];

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">通信模式对比</h2>
        <p className="text-gray-600">了解 STDIO 和 SSE 两种通信方式的特点和应用场景</p>
      </motion.div>

      {/* 模式选择器 */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-2xl p-2 flex space-x-2">
          {Object.entries(modes).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setSelectedMode(key as 'stdio' | 'sse')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedMode === key
                  ? 'bg-white shadow-lg text-gray-800'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <mode.icon className="w-5 h-5" />
              <span>{mode.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 详细信息 */}
      <motion.div
        key={selectedMode}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        {/* 头部 */}
        <div className={`bg-gradient-to-r ${currentMode.color} p-8 text-white`}>
          <div className="flex items-center mb-4">
            <currentMode.icon className="w-12 h-12 mr-4" />
            <div>
              <h3 className="text-2xl font-bold">{currentMode.title}</h3>
              <p className="text-lg opacity-90">{currentMode.subtitle}</p>
            </div>
          </div>
          <p className="text-lg opacity-95">{currentMode.description}</p>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* 特性列表 */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6">特性分析</h4>
              <div className="space-y-3">
                {currentMode.characteristics.map((char, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    {char.positive ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                    )}
                    <span className={char.positive ? 'text-green-700' : 'text-orange-700'}>
                      {char.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 使用场景 */}
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-6">适用场景</h4>
              <div className="space-y-3">
                {currentMode.useCases.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3"
                  >
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700">{useCase}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* 示例场景 */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">{currentMode.example.title}</h4>
            <p className="text-gray-600 leading-relaxed">{currentMode.example.description}</p>
          </div>
        </div>
      </motion.div>

      {/* 对比表格 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">详细对比</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-800">对比维度</th>
                <th className="text-center py-4 px-6 font-semibold text-green-600">STDIO</th>
                <th className="text-center py-4 px-6 font-semibold text-blue-600">SSE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { dimension: '连接方式', stdio: '本地进程', sse: 'HTTP 网络' },
                { dimension: '延迟', stdio: '极低', sse: '网络延迟' },
                { dimension: '适用范围', stdio: '本地环境', sse: '远程访问' },
                { dimension: '实时性', stdio: '优秀', sse: '良好' },
                { dimension: '复杂度', stdio: '简单', sse: '中等' },
                { dimension: '网络依赖', stdio: '无', sse: '有' }
              ].map((row, index) => (
                <motion.tr
                  key={row.dimension}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="py-4 px-6 font-medium text-gray-800">{row.dimension}</td>
                  <td className="py-4 px-6 text-center text-green-600">{row.stdio}</td>
                  <td className="py-4 px-6 text-center text-blue-600">{row.sse}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default CommunicationModes;
