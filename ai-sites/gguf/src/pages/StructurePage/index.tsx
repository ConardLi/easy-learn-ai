/**
 * 文件结构页面 - 可视化展示GGUF文件的内部结构
 * 包含交互式文件结构图和各部分详细说明
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Database, 
  Info, 
  Layers, 
  Code,
  HardDrive,
  Key,
  Hash
} from 'lucide-react';

const StructurePage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const fileStructure = [
    {
      id: 'header',
      name: 'Header',
      color: 'from-blue-400 to-blue-600',
      icon: FileText,
      size: '32 bytes',
      description: '文件头部信息，包含魔数和版本号',
      details: [
        'Magic Number: "GGUF"',
        'Version: 当前为 3',
        'Tensor Count: 张量数量',
        'Metadata Count: 元数据项数量'
      ],
      bytes: [0, 32]
    },
    {
      id: 'metadata',
      name: 'Metadata',
      color: 'from-green-400 to-green-600',
      icon: Info,
      size: '可变长度',
      description: '存储模型的详细信息和配置参数',
      details: [
        'Model Name: 模型名称',
        'Architecture: 架构信息',
        'Tokenizer: 分词器配置',
        'Parameters: 模型参数配置'
      ],
      bytes: [32, 200]
    },
    {
      id: 'tensor_info',
      name: 'Tensor Info',
      color: 'from-purple-400 to-purple-600',
      icon: Layers,
      size: '可变长度',
      description: '张量索引信息，描述每个张量的属性',
      details: [
        'Tensor Names: 张量名称列表',
        'Dimensions: 维度信息',
        'Data Types: 数据类型',
        'Offsets: 数据偏移量'
      ],
      bytes: [200, 400]
    },
    {
      id: 'alignment',
      name: 'Alignment',
      color: 'from-yellow-400 to-orange-500',
      icon: Hash,
      size: '填充字节',
      description: '内存对齐填充，确保高效访问',
      details: [
        '32-byte 对齐',
        '提升访问效率',
        '优化内存布局',
        '支持 mmap 映射'
      ],
      bytes: [400, 432]
    },
    {
      id: 'tensor_data',
      name: 'Tensor Data',
      color: 'from-red-400 to-red-600',
      icon: Database,
      size: '主要数据',
      description: '实际的模型权重和参数数据',
      details: [
        'Model Weights: 模型权重',
        'Bias Values: 偏置值',
        'Quantized Data: 量化数据',
        'Compressed Format: 压缩格式'
      ],
      bytes: [432, 1000]
    }
  ];

  const metadataExamples = [
    { key: 'general.name', value: 'llama-2-7b-chat', type: 'string' },
    { key: 'general.architecture', value: 'llama', type: 'string' },
    { key: 'llama.context_length', value: '4096', type: 'uint32' },
    { key: 'llama.embedding_length', value: '4096', type: 'uint32' },
    { key: 'llama.block_count', value: '32', type: 'uint32' },
    { key: 'tokenizer.ggml.model', value: 'llama', type: 'string' }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
            GGUF 文件结构
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            深入了解 GGUF 文件的内部组织结构和数据布局
          </p>
        </motion.div>

        {/* File Structure Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* File Layout */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <HardDrive className="h-6 w-6 mr-2 text-indigo-600" />
              文件布局结构
            </h2>
            
            <div className="space-y-2">
              {fileStructure.map((section, index) => {
                const IconComponent = section.icon;
                const height = section.id === 'tensor_data' ? 120 : 
                              section.id === 'metadata' ? 80 : 
                              section.id === 'tensor_info' ? 60 : 40;
                
                return (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedSection(section.id)}
                    className={`relative cursor-pointer rounded-lg p-4 transition-all duration-300 ${
                      selectedSection === section.id 
                        ? 'ring-2 ring-indigo-400 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                    style={{ 
                      height: `${height}px`,
                      background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                      '--tw-gradient-from': section.color.split(' ')[1],
                      '--tw-gradient-to': section.color.split(' ')[3]
                    } as any}
                  >
                    <div className="flex items-center justify-between text-white h-full">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{section.name}</h3>
                          <p className="text-sm text-white/80">{section.size}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/60">字节偏移</div>
                        <div className="text-sm font-mono">
                          {section.bytes[0]}-{section.bytes[1]}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Section Details */}
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {selectedSection ? (
                <motion.div
                  key={selectedSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                  {(() => {
                    const section = fileStructure.find(s => s.id === selectedSection);
                    if (!section) return null;
                    const IconComponent = section.icon;
                    
                    return (
                      <>
                        <div className="flex items-center mb-6">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center mr-4`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-800">{section.name}</h3>
                            <p className="text-gray-600">{section.size}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {section.description}
                        </p>
                        
                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-gray-800">详细内容</h4>
                          {section.details.map((detail, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                            >
                              <Code className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                              <span className="text-gray-700">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">选择一个部分</h3>
                  <p className="text-gray-600">点击左侧文件结构中的任意部分查看详细信息</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Metadata Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Key className="h-6 w-6 mr-2 text-green-600" />
            元数据示例
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metadataExamples.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="font-mono text-sm text-indigo-600 mb-1">
                  {item.key}
                </div>
                <div className="font-semibold text-gray-800 mb-1">
                  {item.value}
                </div>
                <div className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded inline-block">
                  {item.type}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            结构化设计的优势
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '⚡',
                title: '快速访问',
                desc: '明确的结构布局支持高效的随机访问'
              },
              {
                emoji: '🗂️',
                title: '清晰组织',
                desc: '逻辑分层让数据管理更加直观'
              },
              {
                emoji: '🔄',
                title: '易于扩展',
                desc: '模块化设计支持未来功能扩展'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white rounded-xl shadow-md"
              >
                <div className="text-4xl mb-4">{benefit.emoji}</div>
                <h4 className="font-bold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StructurePage;
