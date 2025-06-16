/**
 * LoRA 参数调整组件
 * 提供交互式的参数调整界面，实时展示参数变化对模型的影响
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Info, TrendingUp, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ParameterAdjustment: React.FC = () => {
  const [rank, setRank] = useState(8);
  const [alpha, setAlpha] = useState(32);
  const [learningRate, setLearningRate] = useState(0.0003);
  const [batchSize, setBatchSize] = useState(16);

  // 计算参数量（模拟）
  const calculateParams = (r: number) => {
    const dModel = 768; // 假设模型维度
    const lLora = 4; // 应用LoRA的层数
    return 2 * lLora * dModel * r;
  };

  // 计算性能指标（模拟）
  const calculatePerformance = () => {
    const baseAccuracy = 85;
    const rankBonus = Math.min(rank * 0.5, 4);
    const alphaBonus = Math.min(alpha / 16, 3);
    const lrPenalty = learningRate > 0.001 ? -2 : 0;
    
    return Math.min(baseAccuracy + rankBonus + alphaBonus + lrPenalty, 95);
  };

  // 计算训练时间（模拟）
  const calculateTrainingTime = () => {
    const baseTime = 100;
    const rankPenalty = rank * 2;
    const batchBonus = Math.max(0, (batchSize - 8) * 0.5);
    
    return Math.max(baseTime + rankPenalty - batchBonus, 50);
  };

  const paramData = [
    { name: '参数量', value: calculateParams(rank) / 1000, unit: 'K' },
    { name: '性能', value: calculatePerformance(), unit: '%' },
    { name: '训练时间', value: calculateTrainingTime(), unit: 'min' },
    { name: 'GPU内存', value: Math.max(100 - rank * 3, 40), unit: '%' }
  ];

  const trendData = [
    { rank: 1, params: calculateParams(1) / 1000, performance: 82 },
    { rank: 2, params: calculateParams(2) / 1000, performance: 84 },
    { rank: 4, params: calculateParams(4) / 1000, performance: 87 },
    { rank: 8, params: calculateParams(8) / 1000, performance: 90 },
    { rank: 16, params: calculateParams(16) / 1000, performance: 92 },
    { rank: 32, params: calculateParams(32) / 1000, performance: 93 },
    { rank: 64, params: calculateParams(64) / 1000, performance: 93.5 }
  ];

  const ParameterSlider = ({ 
    label, 
    value, 
    min, 
    max, 
    step, 
    onChange, 
    unit = '',
    description 
  }: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
    unit?: string;
    description: string;
  }) => (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h4 className="text-lg font-semibold text-gray-800">{label}</h4>
          <motion.div
            className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center cursor-help"
            whileHover={{ scale: 1.1 }}
            title={description}
          >
            <Info className="w-3 h-3 text-blue-600" />
          </motion.div>
        </div>
        <div className="text-xl font-bold text-blue-600">
          {value}{unit}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
        />
        <div 
          className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg pointer-events-none"
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          LoRA 参数调整实验
        </h3>
        <p className="text-gray-600">
          调整下方参数，实时观察对模型性能和资源消耗的影响
        </p>
      </motion.div>

      {/* 参数调整区域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ParameterSlider
          label="秩 (Rank)"
          value={rank}
          min={1}
          max={64}
          step={1}
          onChange={setRank}
          description="低秩矩阵的秩，决定了微调参数的数量。秩越大，表达能力越强，但参数量也越多。"
        />
        
        <ParameterSlider
          label="Alpha (α)"
          value={alpha}
          min={8}
          max={128}
          step={8}
          onChange={setAlpha}
          description="缩放因子，控制低秩矩阵对模型的影响程度。通常设置为秩的2-4倍。"
        />
        
        <ParameterSlider
          label="学习率"
          value={learningRate}
          min={0.0001}
          max={0.001}
          step={0.0001}
          onChange={setLearningRate}
          description="控制模型参数更新的速度。LoRA微调通常使用较小的学习率。"
        />
        
        <ParameterSlider
          label="批次大小"
          value={batchSize}
          min={4}
          max={64}
          step={4}
          onChange={setBatchSize}
          description="每次训练时输入模型的数据量。影响训练稳定性和GPU内存使用。"
        />
      </div>

      {/* 实时指标显示 */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6"
        layout
      >
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h4 className="text-xl font-semibold text-gray-800">实时性能指标</h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {paramData.map((item, index) => (
            <motion.div
              key={item.name}
              className="bg-white rounded-xl p-4 text-center shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl font-bold text-blue-600">
                {item.value.toFixed(item.name === '参数量' ? 0 : 1)}{item.unit}
              </div>
              <div className="text-sm text-gray-600">{item.name}</div>
            </motion.div>
          ))}
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value}${paramData.find(d => d.name === name)?.unit || ''}`, name]} />
              <Bar dataKey="value" fill="url(#colorGradient)" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 参数趋势分析 */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <Zap className="w-6 h-6 text-purple-600" />
          <h4 className="text-xl font-semibold text-gray-800">秩值对性能的影响趋势</h4>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rank" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="performance" 
                stroke="#10B981" 
                strokeWidth={3}
                name="性能 (%)"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="params" 
                stroke="#F59E0B" 
                strokeWidth={3}
                name="参数量 (K)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 参数选择建议 */}
      <motion.div
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-xl font-semibold mb-4">参数选择建议</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <h5 className="font-semibold mb-2">资源受限场景</h5>
            <p className="text-sm text-blue-100">
              rank=4-8, alpha=16-32, 适合GPU内存较小的情况
            </p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h5 className="font-semibold mb-2">性能优先场景</h5>
            <p className="text-sm text-blue-100">
              rank=16-32, alpha=64-128, 适合追求最佳效果的情况
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParameterAdjustment;
