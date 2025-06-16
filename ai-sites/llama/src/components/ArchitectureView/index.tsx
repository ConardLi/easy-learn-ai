/**
 * 架构可视化组件
 * 展示 LLaMA 模型的 Decoder-Only 架构图
 * 支持交互式点击查看各个组件的详细信息
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, Layers, Zap, Brain } from 'lucide-react';

interface ComponentInfo {
  name: string;
  description: string;
  details: string[];
  color: string;
}

const ArchitectureView: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);

  const components: Record<string, ComponentInfo> = {
    tokenizer: {
      name: 'Tokenizer 分词器',
      description: '将输入文本转换为模型可以理解的 token 序列',
      details: [
        '使用高效的编码算法将文本分解为子词单元',
        'LLaMA-3 采用 128K 词表大小的 tokenizer',
        '支持多语言文本处理',
        '提高编码效率，减少序列长度'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    embedding: {
      name: 'Embedding 嵌入层',
      description: '将 token ID 映射到高维向量空间',
      details: [
        '每个 token 被映射为一个高维向量',
        '包含位置编码信息',
        '为后续处理提供语义表示',
        '支持上下文理解'
      ],
      color: 'from-green-500 to-teal-500'
    },
    decoder: {
      name: 'Decoder 解码器',
      description: 'LLaMA 的核心组件，由多个 Decoder Block 堆叠而成',
      details: [
        '采用 Decoder-Only 架构',
        '包含多头自注意力机制',
        '使用 masked attention 确保因果性',
        '包含前馈神经网络层'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    attention: {
      name: 'Self-Attention 自注意力',
      description: '计算序列中不同位置间的关联性',
      details: [
        '分别计算 Query、Key、Value 向量',
        '使用 softmax 计算注意力权重',
        'LLaMA-2/3 引入分组查询注意力（GQA）',
        '支持长序列建模'
      ],
      color: 'from-orange-500 to-red-500'
    },
    mlp: {
      name: 'MLP 前馈网络',
      description: '多层感知机，进行非线性特征变换',
      details: [
        '两个全连接层组成',
        '使用激活函数增加非线性',
        '扩展模型的表达能力',
        '包含残差连接'
      ],
      color: 'from-indigo-500 to-purple-500'
    },
    output: {
      name: 'Output 输出层',
      description: '生成下一个 token 的概率分布',
      details: [
        '线性层映射到词表维度',
        '输出每个 token 的概率',
        '支持多种解码策略',
        '生成最终的文本序列'
      ],
      color: 'from-pink-500 to-rose-500'
    }
  };

  const architectureSteps = [
    { id: 'tokenizer', x: 10, y: 20, width: 120, height: 60 },
    { id: 'embedding', x: 10, y: 100, width: 120, height: 60 },
    { id: 'decoder', x: 180, y: 80, width: 200, height: 300 },
    { id: 'attention', x: 200, y: 120, width: 160, height: 80 },
    { id: 'mlp', x: 200, y: 220, width: 160, height: 80 },
    { id: 'output', x: 180, y: 400, width: 200, height: 60 }
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            LLaMA 架构可视化
          </h1>
          <p className="text-gray-600 text-lg">点击各个组件了解详细信息</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Architecture Diagram */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Layers className="h-6 w-6 mr-2 text-blue-600" />
                模型架构图
              </h3>
              
              <div className="relative bg-gray-50 rounded-2xl p-4" style={{ height: '500px' }}>
                <svg width="100%" height="100%" viewBox="0 0 400 500">
                  {/* Data Flow Arrows */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                            refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                    </marker>
                  </defs>
                  
                  <line x1="70" y1="80" x2="70" y2="100" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="130" y1="130" x2="180" y2="130" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="280" y1="200" x2="280" y2="220" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="280" y1="300" x2="280" y2="400" stroke="#6B7280" strokeWidth="2" markerEnd="url(#arrowhead)" />

                  {/* Architecture Components */}
                  {architectureSteps.map((step) => {
                    const component = components[step.id];
                    return (
                      <motion.g
                        key={step.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedComponent(component)}
                        style={{ cursor: 'pointer' }}
                      >
                        <rect
                          x={step.x}
                          y={step.y}
                          width={step.width}
                          height={step.height}
                          rx="12"
                          fill="url(#gradient-bg)"
                          className="drop-shadow-lg"
                        />
                        <text
                          x={step.x + step.width / 2}
                          y={step.y + step.height / 2}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-sm font-medium fill-gray-700"
                        >
                          {component.name.split(' ')[0]}
                        </text>
                      </motion.g>
                    );
                  })}

                  {/* Gradient Definition */}
                  <defs>
                    <linearGradient id="gradient-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EBF8FF" />
                      <stop offset="100%" stopColor="#BEE3F8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Component List */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Brain className="h-6 w-6 mr-2 text-purple-600" />
              架构组件
            </h3>
            
            {Object.entries(components).map(([key, component]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedComponent(component)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 bg-gradient-to-r ${component.color} bg-opacity-10 hover:bg-opacity-20 border border-gray-200`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{component.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                  </div>
                  <Info className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Component Detail Modal */}
        <AnimatePresence>
          {selectedComponent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedComponent(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${selectedComponent.color} bg-clip-text text-transparent`}>
                    {selectedComponent.name}
                  </h3>
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedComponent.description}
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    详细特性
                  </h4>
                  <ul className="space-y-2">
                    {selectedComponent.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ArchitectureView;
