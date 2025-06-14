/**
 * RAG系统架构展示组件
 * 使用简化的流程图布局，确保连接关系清晰可见
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Search, Brain, Settings, Zap, Users, ArrowDown, ArrowRight } from 'lucide-react';

const Architecture: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'user-interface',
      title: '用户界面',
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      description: '用户交互界面，接收问题并展示结果',
      technologies: ['Web界面', 'API接口', '实时反馈', '用户体验优化']
    },
    {
      id: 'orchestrator',
      title: '编排器',
      icon: Settings,
      color: 'from-yellow-400 to-orange-500',
      description: '协调各模块工作，管理整体流程',
      technologies: ['流程控制', '负载均衡', '错误处理', '性能监控']
    },
    {
      id: 'retrieval',
      title: '检索模块',
      icon: Search,
      color: 'from-green-400 to-green-600',
      description: '根据用户查询检索相关文档片段',
      technologies: ['语义检索', 'BM25算法', '向量相似度', '重排序模型']
    },
    {
      id: 'knowledge-base',
      title: '知识库',
      icon: Database,
      color: 'from-blue-400 to-blue-600',
      description: '存储和管理外部知识源，如文档、网页、专业资料等',
      technologies: ['向量数据库', 'Elasticsearch', 'FAISS', '文档预处理']
    },
    {
      id: 'context-builder',
      title: '上下文构建器',
      icon: Zap,
      color: 'from-indigo-400 to-indigo-600',
      description: '将检索结果与用户问题组合成完整上下文',
      technologies: ['文本融合', '上下文压缩', '提示模板', '长度控制']
    },
    {
      id: 'llm',
      title: '大语言模型',
      icon: Brain,
      color: 'from-red-400 to-pink-600',
      description: '基于增强后的上下文生成最终答案',
      technologies: ['GPT系列', 'Claude', 'LLaMA', '提示工程']
    }
  ];

  const ModuleCard: React.FC<{ module: typeof modules[0], isSelected: boolean }> = ({ module, isSelected }) => {
    const Icon = module.icon;
    
    return (
      <motion.div
        className={`bg-white rounded-xl p-4 shadow-lg cursor-pointer transition-all border-2 ${
          isSelected ? 'border-blue-400 ring-4 ring-blue-100' : 'border-gray-200 hover:border-gray-300'
        }`}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className={`w-10 h-10 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center`}>
            <Icon className="text-white" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{module.description}</p>
      </motion.div>
    );
  };

  const Arrow: React.FC<{ direction: 'down' | 'right', label?: string }> = ({ direction, label }) => (
    <div className="flex items-center justify-center py-2">
      <div className="flex flex-col items-center space-y-1">
        {direction === 'down' ? (
          <ArrowDown className="text-blue-500" size={24} />
        ) : (
          <ArrowRight className="text-blue-500" size={24} />
        )}
        {label && (
          <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
            {label}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">RAG 系统架构</h2>
        <p className="text-lg text-gray-600">点击各个模块了解详细信息和技术实现</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* 流程图区域 */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
            
            {/* 第一行：用户界面 */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ModuleCard 
                  module={modules.find(m => m.id === 'user-interface')!} 
                  isSelected={selectedModule === 'user-interface'}
                />
              </motion.div>
            </div>

            <Arrow direction="down" label="用户查询" />

            {/* 第二行：编排器 */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ModuleCard 
                  module={modules.find(m => m.id === 'orchestrator')!} 
                  isSelected={selectedModule === 'orchestrator'}
                />
              </motion.div>
            </div>

            <Arrow direction="down" label="协调处理" />

            {/* 第三行：并行处理 - 检索模块和知识库 */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ModuleCard 
                    module={modules.find(m => m.id === 'retrieval')!} 
                    isSelected={selectedModule === 'retrieval'}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <ModuleCard 
                    module={modules.find(m => m.id === 'knowledge-base')!} 
                    isSelected={selectedModule === 'knowledge-base'}
                  />
                </motion.div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="text-center">
                  <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                    语义搜索
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded">
                    文档存储
                  </span>
                </div>
              </div>
            </div>

            <Arrow direction="down" label="检索结果" />

            {/* 第四行：上下文构建器 */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <ModuleCard 
                  module={modules.find(m => m.id === 'context-builder')!} 
                  isSelected={selectedModule === 'context-builder'}
                />
              </motion.div>
            </div>

            <Arrow direction="down" label="增强上下文" />

            {/* 第五行：大语言模型 */}
            <div className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <ModuleCard 
                  module={modules.find(m => m.id === 'llm')!} 
                  isSelected={selectedModule === 'llm'}
                />
              </motion.div>
            </div>

            <Arrow direction="down" label="生成答案" />

            {/* 流程完成指示 */}
            <div className="text-center">
              <motion.div
                className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>✅ RAG处理完成</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* 模块详情面板 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
            {selectedModule ? (
              (() => {
                const module = modules.find(m => m.id === selectedModule);
                if (!module) return null;
                const Icon = module.icon;
                
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${module.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                      {module.description}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">核心技术：</h4>
                      <div className="space-y-2">
                        {module.technologies.map((tech, index) => (
                          <motion.div
                            key={tech}
                            className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span>{tech}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            ) : (
              <div className="text-center text-gray-500">
                <Database size={48} className="mx-auto mb-4 opacity-50" />
                <p className="font-medium">选择模块查看详情</p>
                <p className="text-sm mt-1">点击左侧的模块卡片</p>
                <p className="text-sm">了解技术实现细节</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 技术特性说明 */}
      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">RAG 技术特性</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
              <Search className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-green-800 mb-2">智能检索</h4>
            <p className="text-green-700 text-sm">基于语义相似度的精确文档检索，支持多种检索策略和重排序算法。</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-blue-800 mb-2">动态增强</h4>
            <p className="text-blue-700 text-sm">实时将检索到的相关信息与用户查询结合，构建富含上下文的提示。</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-white" size={24} />
            </div>
            <h4 className="text-lg font-semibold text-purple-800 mb-2">精准生成</h4>
            <p className="text-purple-700 text-sm">基于增强后的上下文生成准确、相关且可追溯的回答内容。</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Architecture;