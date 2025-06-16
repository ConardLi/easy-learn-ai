/**
 * 参数对比组件
 * 使用图表展示不同 LLaMA 版本的参数对比
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { BarChart3, TrendingUp, Cpu, Database, Zap } from 'lucide-react';

const ParameterComparison: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'parameters' | 'data' | 'context' | 'distribution'>('parameters');

  const parameterData = [
    { version: 'LLaMA-1', '7B': 7, '13B': 13, '30B': 30, '65B': 65, '70B': 0, '8B': 0, '400B': 0 },
    { version: 'LLaMA-2', '7B': 7, '13B': 13, '30B': 0, '65B': 0, '70B': 70, '8B': 0, '400B': 0 },
    { version: 'LLaMA-3', '7B': 0, '13B': 0, '30B': 0, '65B': 0, '70B': 70, '8B': 8, '400B': 400 }
  ];

  const trainingDataEvolution = [
    { version: 'LLaMA-1', tokens: 1, contextLength: 2048 },
    { version: 'LLaMA-2', tokens: 2, contextLength: 4096 },
    { version: 'LLaMA-3', tokens: 15, contextLength: 8192 }
  ];

  const modelDistribution = [
    { name: 'LLaMA-1', value: 4, color: '#3B82F6' },
    { name: 'LLaMA-2', value: 3, color: '#8B5CF6' },
    { name: 'LLaMA-3', value: 3, color: '#10B981' }
  ];

  const contextLengthData = [
    { version: 'LLaMA-1', length: 2048, efficiency: 85 },
    { version: 'LLaMA-2', length: 4096, efficiency: 90 },
    { version: 'LLaMA-3', length: 8192, efficiency: 95 }
  ];

  const chartOptions = [
    {
      id: 'parameters',
      name: '参数规模对比',
      icon: Cpu,
      description: '不同版本的模型参数数量'
    },
    {
      id: 'data',
      name: '训练数据演进',
      icon: Database,
      description: '训练数据规模的增长趋势'
    },
    {
      id: 'context',
      name: '上下文长度',
      icon: TrendingUp,
      description: '上下文处理能力的提升'
    },
    {
      id: 'distribution',
      name: '模型分布',
      icon: BarChart3,
      description: '各版本模型数量分布'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}{entry.dataKey.includes('tokens') ? 'T' : entry.dataKey.includes('length') ? '' : 'B'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'parameters':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={parameterData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="version" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="7B" fill="#3B82F6" name="7B参数" />
              <Bar dataKey="8B" fill="#06B6D4" name="8B参数" />
              <Bar dataKey="13B" fill="#8B5CF6" name="13B参数" />
              <Bar dataKey="30B" fill="#EC4899" name="30B参数" />
              <Bar dataKey="65B" fill="#F59E0B" name="65B参数" />
              <Bar dataKey="70B" fill="#10B981" name="70B参数" />
              <Bar dataKey="400B" fill="#EF4444" name="400B参数" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'data':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={trainingDataEvolution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="version" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="tokens" stroke="#8B5CF6" strokeWidth="3" name="训练数据(T tokens)" />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'context':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={contextLengthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="version" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="length" fill="#10B981" name="上下文长度" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={modelDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}个模型`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {modelDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            LLaMA 参数对比分析
          </h1>
          <p className="text-gray-600 text-lg">通过数据可视化了解 LLaMA 系列的技术演进</p>
        </motion.div>

        {/* Chart Selection */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {chartOptions.map((option) => {
            const Icon = option.icon;
            const isActive = activeChart === option.id;
            
            return (
              <motion.div
                key={option.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveChart(option.id as any)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-200'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                <h3 className="font-semibold text-center mb-2">{option.name}</h3>
                <p className={`text-sm text-center ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {option.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Chart Display */}
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {chartOptions.find(opt => opt.id === activeChart)?.name}
          </h2>
          {renderChart()}
        </motion.div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200"
          >
            <Cpu className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 mb-3">参数规模增长</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              从 LLaMA-1 的最大 65B 参数，到 LLaMA-3 的 400B 参数，模型规模实现了 6 倍增长，显著提升了模型能力。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
          >
            <Database className="h-8 w-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-purple-800 mb-3">训练数据激增</h3>
            <p className="text-purple-700 text-sm leading-relaxed">
              训练数据从 1T tokens 增长到 15T tokens，是 LLaMA-1 的 15 倍，为模型性能提升提供了坚实基础。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-200"
          >
            <Zap className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-green-800 mb-3">上下文扩展</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              上下文长度从 2K 扩展到 8K，4 倍的提升使模型能够处理更长的文档和复杂的对话场景。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ParameterComparison;
