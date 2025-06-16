/**
 * 规模对比页面
 * 展示不同模型的参数量、性能等对比数据
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import { TrendingUp, Zap, Database, Cpu } from 'lucide-react';

const Scale: React.FC = () => {
  const [activeChart, setActiveChart] = useState('parameters');

  const modelData = [
    { name: 'BERT-base', parameters: 0.11, tokens: 3, layers: 12, performance: 82 },
    { name: 'BERT-large', parameters: 0.34, tokens: 3, layers: 24, performance: 85 },
    { name: 'GPT-1', parameters: 0.12, tokens: 5, layers: 12, performance: 80 },
    { name: 'GPT-2', parameters: 1.5, tokens: 40, layers: 48, performance: 87 },
    { name: 'GPT-3', parameters: 175, tokens: 300, layers: 96, performance: 92 },
    { name: 'LLaMA-7B', parameters: 7, tokens: 1000, layers: 32, performance: 90 },
    { name: 'LLaMA-65B', parameters: 65, tokens: 1400, layers: 80, performance: 94 },
    { name: 'GPT-4', parameters: 1800, tokens: 13000, layers: 120, performance: 96 }
  ];

  const scalingLawData = [
    { compute: 1, performance: 40 },
    { compute: 10, performance: 55 },
    { compute: 100, performance: 70 },
    { compute: 1000, performance: 80 },
    { compute: 10000, performance: 87 },
    { compute: 100000, performance: 92 },
    { compute: 1000000, performance: 96 }
  ];

  const chartOptions = [
    { id: 'parameters', title: '参数规模对比', icon: <Database className="w-5 h-5" /> },
    { id: 'performance', title: '性能提升趋势', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'scaling', title: '规模定律', icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          规模与性能
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          探索模型规模与性能之间的关系，理解"大力出奇迹"的AI发展规律
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {[
          { title: '最大参数量', value: '1.8万亿', subtitle: 'GPT-4估计', icon: '🧠', color: 'from-blue-500 to-blue-600' },
          { title: '训练数据量', value: '13万亿Token', subtitle: 'GPT-4训练数据', icon: '📚', color: 'from-green-500 to-green-600' },
          { title: '计算成本', value: '$100M+', subtitle: '大模型训练成本', icon: '💰', color: 'from-purple-500 to-purple-600' },
          { title: '性能提升', value: '96%', subtitle: '顶级模型准确率', icon: '🎯', color: 'from-orange-500 to-orange-600' }
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${metric.color} flex items-center justify-center text-2xl shadow-lg`}
            >
              {metric.icon}
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-800">{metric.value}</h3>
            <p className="text-lg font-semibold text-gray-700 mt-1">{metric.title}</p>
            <p className="text-sm text-gray-600 mt-2">{metric.subtitle}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart Selection */}
      <div className="flex justify-center">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
          <div className="flex space-x-2">
            {chartOptions.map((option) => (
              <motion.button
                key={option.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveChart(option.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeChart === option.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.icon}
                <span className="font-medium">{option.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      >
        {activeChart === 'parameters' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">模型参数规模对比</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={100}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    scale="log" 
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 12 }}
                    label={{ value: '参数量 (B)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`${value}B`, '参数量']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar 
                    dataKey="parameters" 
                    fill="url(#parametersGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="parametersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
              <p className="text-gray-700 text-center">
                💡 从BERT的1亿参数到GPT-4的万亿参数，模型规模呈指数级增长
              </p>
            </div>
          </div>
        )}

        {activeChart === 'performance' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">性能随规模提升趋势</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={modelData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="parameters" 
                    scale="log"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 12 }}
                    label={{ value: '参数量 (B)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    domain={[75, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ value: '性能评分', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    labelFormatter={(value: any) => `参数量: ${value}B`}
                    formatter={(value: any) => [`${value}%`, '性能评分']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    dot={{ r: 6, fill: '#8b5cf6' }}
                    activeDot={{ r: 8, fill: '#6366f1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
              <p className="text-gray-700 text-center">
                📈 模型性能与参数规模呈现明显的对数增长关系
              </p>
            </div>
          </div>
        )}

        {activeChart === 'scaling' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">规模定律 (Scaling Law)</h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={scalingLawData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                  <XAxis 
                    dataKey="compute" 
                    scale="log"
                    type="number"
                    domain={['dataMin', 'dataMax']}
                    tick={{ fontSize: 12 }}
                    label={{ value: '计算量 (相对单位)', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    domain={[30, 100]}
                    tick={{ fontSize: 12 }}
                    label={{ value: '模型能力', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    labelFormatter={(value: any) => `计算量: ${value}x`}
                    formatter={(value: any) => [`${value}%`, '模型能力']}
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Scatter dataKey="performance" fill="#8b5cf6" />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
                <h3 className="font-semibold text-orange-800 mb-2">🔥 核心发现</h3>
                <p className="text-sm text-orange-700">
                  计算量每增加10倍，模型能力提升约10-15%，
                  这种可预测的规模定律推动了大模型的发展。
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <h3 className="font-semibold text-purple-800 mb-2">💰 训练成本</h3>
                <p className="text-sm text-purple-700">
                  GPT-3训练成本约1200万美元，GPT-4估计超过1亿美元，
                  但性能提升显著。
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white"
      >
        <div className="text-center space-y-4">
          <Cpu className="w-16 h-16 mx-auto opacity-90" />
          <h2 className="text-2xl font-bold">规模化的启示</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            "大力出奇迹"不仅是口号，更是有科学依据的发展策略。
            随着计算资源和数据规模的不断增长，AI模型将持续展现出令人惊叹的能力。
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Scale;
