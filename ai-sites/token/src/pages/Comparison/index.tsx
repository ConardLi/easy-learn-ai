/**
 * 概念对比页面组件
 * 对比Tokenization和Embeddings的区别和联系
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Hash, Brain, Zap, Target } from 'lucide-react';

const Comparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const comparisonData = [
    {
      dimension: '目的',
      tokenization: '将文本转为Token序列（离散ID）',
      embeddings: '将Token ID转为语义向量（连续表示）',
      icon: Target
    },
    {
      dimension: '阶段',
      tokenization: '预处理（模型输入前）',
      embeddings: '模型内部处理（输入层）',
      icon: Zap
    },
    {
      dimension: '作用',
      tokenization: '结构化文本，降低计算复杂度',
      embeddings: '捕获语义关系（如"国王"与"王后"的向量距离近）',
      icon: Brain
    },
    {
      dimension: '输出示例',
      tokenization: '"hello" → ID 123',
      embeddings: 'ID 123 → [0.1, 0.3, -0.2, ...] (128维向量)',
      icon: Hash
    }
  ];

  const examples = [
    {
      title: 'Tokenization 示例',
      subtitle: '文本预处理阶段',
      steps: [
        { text: 'Hello, world!', type: 'input' },
        { text: '["Hello", ",", " ", "world", "!"]', type: 'tokens' },
        { text: '[123, 124, 125, 456, 789]', type: 'ids' }
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Embeddings 示例',
      subtitle: '模型内部处理',
      steps: [
        { text: 'Token ID: 123', type: 'input' },
        { text: 'Embedding Layer', type: 'process' },
        { text: '[0.1, 0.3, -0.2, 0.5, ...]', type: 'vector' }
      ],
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Tokenization vs Embeddings
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          理解这两个核心概念的区别和联系，避免混淆它们的作用和阶段
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
            <Hash size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tokenization</h2>
          <p className="text-gray-600 mb-4">
            文本预处理步骤，将原始文本转换为模型可处理的Token序列和ID。
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              输入：原始文本字符串
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              输出：Token ID序列
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              特点：离散、可逆、无语义
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <Brain size={28} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Embeddings</h2>
          <p className="text-gray-600 mb-4">
            模型内部处理，将Token ID转换为包含语义信息的高维向量。
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              输入：Token ID
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              输出：语义向量
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              特点：连续、语义化、可训练
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Detailed Comparison */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">详细对比</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-700">维度</th>
                <th className="text-left py-4 px-4 font-semibold text-blue-600">Tokenization</th>
                <th className="text-left py-4 px-4 font-semibold text-purple-600">Embeddings</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => {
                const Icon = row.icon;
                return (
                  <motion.tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Icon size={16} className="text-gray-500" />
                        <span className="font-medium text-gray-700">{row.dimension}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-blue-700">{row.tokenization}</td>
                    <td className="py-4 px-4 text-purple-700">{row.embeddings}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Process Flow */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">完整处理流程</h2>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Input Text */}
          <motion.div
            className="bg-gray-100 rounded-xl p-6 text-center min-w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-gray-700 mb-2">输入文本</h3>
            <div className="font-mono text-lg">"Hello world"</div>
          </motion.div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />

          {/* Tokenization */}
          <motion.div
            className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center min-w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-blue-700 mb-2">Tokenization</h3>
            <div className="font-mono text-sm text-blue-600">[123, 456]</div>
          </motion.div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />

          {/* Embeddings */}
          <motion.div
            className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center min-w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-purple-700 mb-2">Embeddings</h3>
            <div className="font-mono text-xs text-purple-600">
              [[0.1, 0.3, -0.2...],<br/>
              [0.4, -0.1, 0.7...]]
            </div>
          </motion.div>

          <ArrowRight className="text-gray-400 hidden md:block" size={24} />

          {/* Model Processing */}
          <motion.div
            className="bg-green-50 border border-green-200 rounded-xl p-6 text-center min-w-48"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="font-semibold text-green-700 mb-2">模型处理</h3>
            <div className="text-green-600">Transformer</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Examples */}
      <motion.div
        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">交互示例</h2>
        <div className="flex justify-center mb-6">
          <div className="bg-gray-100 rounded-xl p-1">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === index
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {example.title}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`bg-gradient-to-r ${examples[activeTab].color} rounded-xl p-6 text-white text-center`}>
            <h3 className="text-xl font-bold mb-2">{examples[activeTab].title}</h3>
            <p className="opacity-90">{examples[activeTab].subtitle}</p>
          </div>

          <div className="flex flex-col space-y-4">
            {examples[activeTab].steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className={`p-4 rounded-lg font-mono ${
                    step.type === 'input' ? 'bg-gray-100' :
                    step.type === 'tokens' ? 'bg-blue-100' :
                    step.type === 'ids' ? 'bg-blue-200' :
                    step.type === 'process' ? 'bg-purple-100' :
                    'bg-purple-200'
                  }`}>
                    {step.text}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Key Takeaways */}
      <motion.div
        className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">关键要点</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-indigo-600 mb-3">互补关系</h3>
            <p className="text-gray-600">
              Tokenization和Embeddings是连续的两个步骤，缺一不可。Tokenization为Embeddings提供输入，Embeddings为模型提供语义表示。
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-semibold text-purple-600 mb-3">优化重点</h3>
            <p className="text-gray-600">
              优化Tokenization可以提高效率和降低成本，优化Embeddings可以提高模型的理解能力和表现力。
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Comparison;
