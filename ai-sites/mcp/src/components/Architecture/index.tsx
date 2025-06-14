/**
 * MCP 系统架构图组件
 * 展示 MCP Host、Client、Server 之间的关系和数据流向
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu, Server, ArrowRight, ArrowLeft, Database, Globe, FileText } from 'lucide-react';

const Architecture: React.FC = () => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  const [animateFlow, setAnimateFlow] = useState(false);

  const components = [
    {
      id: 'host',
      title: 'MCP Host',
      subtitle: '应用程序',
      icon: Monitor,
      description: 'Claude Desktop、Cursor 等支持 MCP 的应用程序',
      examples: ['Claude Desktop', 'Cursor IDE', 'VS Code'],
      color: 'from-blue-500 to-blue-600',
      position: 'left'
    },
    {
      id: 'client',
      title: 'MCP Client',
      subtitle: '协议客户端',
      icon: Cpu,
      description: '实现 MCP 协议的客户端，负责与服务器通信',
      examples: ['协议解析', '请求管理', '响应处理'],
      color: 'from-purple-500 to-purple-600',
      position: 'center'
    },
    {
      id: 'server',
      title: 'MCP Server',
      subtitle: '资源服务器',
      icon: Server,
      description: '提供具体功能的服务器，连接各种外部资源',
      examples: ['数据库连接器', 'API 代理', '文件系统'],
      color: 'from-green-500 to-green-600',
      position: 'right'
    }
  ];

  const resources = [
    { icon: Database, name: '数据库', color: 'text-blue-500' },
    { icon: Globe, name: '外部 API', color: 'text-green-500' },
    { icon: FileText, name: '本地文件', color: 'text-orange-500' }
  ];

  const startAnimation = () => {
    setAnimateFlow(true);
    setTimeout(() => setAnimateFlow(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">MCP 系统架构</h2>
        <p className="text-gray-600 mb-6">了解 MCP 各组件如何协同工作</p>
        <button
          onClick={startAnimation}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          🎬 播放数据流动画
        </button>
      </motion.div>

      {/* 架构图 */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="relative">
          {/* 主要组件 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setHoveredComponent(component.id)}
                onMouseLeave={() => setHoveredComponent(null)}
                className="relative"
              >
                <div className={`bg-gradient-to-br ${component.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer`}>
                  <div className="flex items-center mb-4">
                    <component.icon className="w-8 h-8 mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">{component.title}</h3>
                      <p className="text-sm opacity-90">{component.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-4">{component.description}</p>
                  
                  <AnimatePresence>
                    {hoveredComponent === component.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                      >
                        <div className="border-t border-white/20 pt-3">
                          <p className="text-xs font-semibold mb-2">示例：</p>
                          {component.examples.map((example, i) => (
                            <div key={i} className="text-xs opacity-80 mb-1">• {example}</div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 连接线和动画 */}
          <div className="absolute top-24 left-0 right-0 flex items-center justify-center">
            <div className="hidden md:flex items-center justify-between w-full max-w-4xl">
              {/* Host to Client */}
              <motion.div
                className="flex items-center"
                animate={animateFlow ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: 2 }}
              >
                <ArrowRight className="w-8 h-8 text-blue-500" />
                <div className="mx-2 text-xs text-gray-600">请求</div>
                {animateFlow && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 100, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: 2 }}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full"
                  />
                )}
              </motion.div>

              {/* Client to Server */}
              <motion.div
                className="flex items-center"
                animate={animateFlow ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, delay: 0.5, repeat: 2 }}
              >
                <ArrowRight className="w-8 h-8 text-purple-500" />
                <div className="mx-2 text-xs text-gray-600">调用</div>
                {animateFlow && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 100, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: 0.5, repeat: 2 }}
                    className="absolute w-2 h-2 bg-purple-500 rounded-full"
                  />
                )}
              </motion.div>
            </div>
          </div>

          {/* 返回路径 */}
          <div className="absolute top-32 left-0 right-0 flex items-center justify-center">
            <div className="hidden md:flex items-center justify-between w-full max-w-4xl">
              <motion.div
                className="flex items-center"
                animate={animateFlow ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, delay: 1, repeat: 2 }}
              >
                <ArrowLeft className="w-8 h-8 text-blue-400" />
                <div className="mx-2 text-xs text-gray-600">响应</div>
                {animateFlow && (
                  <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: -20, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: 1, repeat: 2 }}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  />
                )}
              </motion.div>

              <motion.div
                className="flex items-center"
                animate={animateFlow ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, delay: 1.5, repeat: 2 }}
              >
                <ArrowLeft className="w-8 h-8 text-green-400" />
                <div className="mx-2 text-xs text-gray-600">数据</div>
                {animateFlow && (
                  <motion.div
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: -20, opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, delay: 1.5, repeat: 2 }}
                    className="absolute w-2 h-2 bg-green-400 rounded-full"
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* 外部资源 */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">连接的外部资源</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors duration-300"
              >
                <resource.icon className={`w-12 h-12 mx-auto mb-3 ${resource.color}`} />
                <p className="font-medium text-gray-800">{resource.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Architecture;
