/**
 * GPT 系列发展历程图表组件
 * 使用交互式图表展示 GPT-1 到 GPT-3 的发展对比
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useAtom } from 'jotai';
import { gptModelsDataAtom } from '../../state/gptLearningState';

type ChartType = 'params' | 'architecture' | 'data' | 'comparison';

export default function EvolutionChart() {
  const [gptModels] = useAtom(gptModelsDataAtom);
  const [activeChart, setActiveChart] = useState<ChartType>('params');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const chartTypes = [
    { id: 'params' as ChartType, title: '参数规模', color: 'bg-blue-500' },
    { id: 'architecture' as ChartType, title: '架构对比', color: 'bg-purple-500' },
    { id: 'data' as ChartType, title: '数据规模', color: 'bg-green-500' },
    { id: 'comparison' as ChartType, title: '综合对比', color: 'bg-orange-500' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-semibold">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${
                activeChart === 'params' ? 'B' : 
                activeChart === 'data' ? 'GB' : ''
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'params':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gptModels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="params" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'architecture':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={gptModels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="layers" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', r: 6 }} />
              <Line type="monotone" dataKey="heads" stroke="#EC4899" strokeWidth={3} dot={{ fill: '#EC4899', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'data':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gptModels}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="dataSize" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'comparison':
        const radarData = gptModels.map(model => ({
          model: model.name,
          参数规模: (model.params / 175) * 100,
          层数: (model.layers / 96) * 100,
          注意力头: (model.heads / 96) * 100,
          数据规模: (model.dataSize / 570) * 100,
        }));
        
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="model" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {gptModels.map((model, index) => (
                <Radar
                  key={model.name}
                  dataKey={model.name}
                  stroke={['#3B82F6', '#8B5CF6', '#F59E0B'][index]}
                  fill={['#3B82F6', '#8B5CF6', '#F59E0B'][index]}
                  fillOpacity={0.1}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">GPT 系列发展历程</h2>
      
      {/* 图表类型选择 */}
      <div className="flex space-x-4 mb-8">
        {chartTypes.map((type) => (
          <motion.button
            key={type.id}
            onClick={() => setActiveChart(type.id)}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeChart === type.id
                ? `${type.color} text-white shadow-lg`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {type.title}
          </motion.button>
        ))}
      </div>

      {/* 图表容器 */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        {renderChart()}
      </motion.div>

      {/* 模型详细信息 */}
      <div className="grid grid-cols-3 gap-6">
        {gptModels.map((model, index) => (
          <motion.div
            key={model.name}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              selectedModel === model.name
                ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 shadow-lg'
                : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
            }`}
            onClick={() => setSelectedModel(selectedModel === model.name ? null : model.name)}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">{model.name}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">参数量:</span>
                <span className="font-semibold">{model.params}B</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">层数:</span>
                <span className="font-semibold">{model.layers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">注意力头:</span>
                <span className="font-semibold">{model.heads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">数据规模:</span>
                <span className="font-semibold">{model.dataSize}GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">发布年份:</span>
                <span className="font-semibold">{model.year}</span>
              </div>
            </div>
            
            {selectedModel === model.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <p className="text-sm text-gray-600">
                  {model.name === 'GPT-1' && '首个使用 Decoder-Only 架构的预训练模型，开创了预训练-微调的范式。'}
                  {model.name === 'GPT-2' && '显著扩大了模型规模和数据量，引入了 zero-shot 学习的概念。'}
                  {model.name === 'GPT-3' && 'LLM 时代的开创之作，展现了大规模模型的涌现能力和 few-shot 学习能力。'}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
