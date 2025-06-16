/**
 * 发展历程组件
 * 展示 LLaMA 从 1 到 3 的演进时间线
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Zap, Database, Cpu, ArrowRight } from 'lucide-react';

interface Version {
  id: string;
  name: string;
  date: string;
  parameters: string[];
  highlights: string[];
  trainingData: string;
  contextLength: string;
  innovations: string[];
  color: string;
  icon: React.ElementType;
}

const EvolutionTimeline: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>('llama1');

  const versions: Version[] = [
    {
      id: 'llama1',
      name: 'LLaMA-1',
      date: '2023年2月',
      parameters: ['7B', '13B', '30B', '65B'],
      highlights: [
        '首个开源大规模语言模型',
        '在1T token语料上预训练',
        '迅速成为开源社区热门'
      ],
      trainingData: '1T tokens',
      contextLength: '2,048',
      innovations: [
        'Transformer Decoder-Only架构',
        'RMSNorm标准化',
        'SwiGLU激活函数',
        'Rotary位置编码'
      ],
      color: 'from-blue-500 to-cyan-500',
      icon: Zap
    },
    {
      id: 'llama2',
      name: 'LLaMA-2',
      date: '2023年7月',
      parameters: ['7B', '13B', '34B', '70B'],
      highlights: [
        '预训练语料扩充到2T tokens',
        '上下文长度翻倍到4,096',
        '引入分组查询注意力（GQA）'
      ],
      trainingData: '2T tokens',
      contextLength: '4,096',
      innovations: [
        '分组查询注意力机制（GQA）',
        '改进的预训练数据',
        '更强的安全性对齐',
        '商业友好的开源许可'
      ],
      color: 'from-purple-500 to-pink-500',
      icon: Users
    },
    {
      id: 'llama3',
      name: 'LLaMA-3',
      date: '2024年4月',
      parameters: ['8B', '70B', '400B*'],
      highlights: [
        '支持8K长文本处理',
        '采用128K词表大小的tokenizer',
        '使用超过15T token训练数据'
      ],
      trainingData: '15T tokens',
      contextLength: '8,192',
      innovations: [
        '高效的128K词表tokenizer',
        '大幅增加的训练数据规模',
        '增强的多语言能力',
        '更优的指令跟随能力'
      ],
      color: 'from-green-500 to-teal-500',
      icon: Database
    }
  ];

  const currentVersion = versions.find(v => v.id === selectedVersion) || versions[0];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
            LLaMA 发展历程
          </h1>
          <p className="text-gray-600 text-lg">从 LLaMA-1 到 LLaMA-3 的技术演进</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-12">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full"></div>
          
          <div className="space-y-12">
            {versions.map((version, index) => {
              const Icon = version.icon;
              const isSelected = selectedVersion === version.id;
              
              return (
                <motion.div
                  key={version.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`relative cursor-pointer ${index % 2 === 0 ? 'mr-8' : 'ml-8'} max-w-md`}
                    onClick={() => setSelectedVersion(version.id)}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute ${index % 2 === 0 ? '-right-12' : '-left-12'} top-8 w-8 h-8 bg-gradient-to-r ${version.color} rounded-full flex items-center justify-center shadow-lg ${isSelected ? 'scale-125' : ''} transition-transform duration-300`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 ${
                        isSelected ? 'border-blue-300 shadow-xl' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-xl font-bold bg-gradient-to-r ${version.color} bg-clip-text text-transparent`}>
                          {version.name}
                        </h3>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {version.date}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {version.parameters.map((param) => (
                            <span key={param} className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${version.color} bg-opacity-10 text-gray-700`}>
                              {param}
                            </span>
                          ))}
                        </div>
                        
                        <ul className="space-y-1">
                          {version.highlights.map((highlight, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-start">
                              <ArrowRight className="h-4 w-4 mr-2 mt-0.5 text-gray-400 flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detailed View */}
        <motion.div
          key={selectedVersion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-bold bg-gradient-to-r ${currentVersion.color} bg-clip-text text-transparent`}>
              {currentVersion.name} 详细信息
            </h2>
            <div className="text-gray-500 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {currentVersion.date}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <Cpu className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-blue-800 mb-2">参数规模</h4>
              <div className="space-y-1">
                {currentVersion.parameters.map((param) => (
                  <div key={param} className="text-blue-700 font-medium">{param}</div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-green-800 mb-2">训练数据</h4>
              <div className="text-green-700 font-medium text-lg">{currentVersion.trainingData}</div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-purple-800 mb-2">上下文长度</h4>
              <div className="text-purple-700 font-medium text-lg">{currentVersion.contextLength}</div>
            </div>

            <div className="bg-orange-50 rounded-2xl p-6 text-center">
              <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-orange-800 mb-2">主要亮点</h4>
              <div className="text-orange-700 font-medium">{currentVersion.highlights.length} 项</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">核心创新</h4>
              <div className="space-y-3">
                {currentVersion.innovations.map((innovation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentVersion.color}`}></div>
                    <span className="text-gray-700">{innovation}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">主要特性</h4>
              <div className="space-y-3">
                {currentVersion.highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{highlight}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EvolutionTimeline;
