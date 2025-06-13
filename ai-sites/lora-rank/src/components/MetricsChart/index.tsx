/**
 * 指标图表组件
 * 使用 recharts 展示 LoRA 秩值对各项指标的影响
 * 支持多种图表类型和动画效果
 */

import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { motion } from 'framer-motion';
import { RankMetrics } from '../../types';

interface MetricsChartProps {
  data: RankMetrics[];
  currentRank: number;
  chartType?: 'line' | 'area' | 'bar';
  className?: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ 
  data, 
  currentRank, 
  chartType = 'line',
  className = "" 
}) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2">秩值: {label}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-600">表达能力:</span>
              <span className="font-medium">{data.expressivePower}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-600">训练稳定性:</span>
              <span className="font-medium">{data.trainingStability}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">过拟合风险:</span>
              <span className="font-medium">{data.overfittingRisk}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-purple-600">显存使用:</span>
              <span className="font-medium">{data.memoryUsage}GB</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 }
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="expressiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="stabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="rank" stroke="#666" />
            <YAxis domain={[0, 100]} stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="expressivePower" 
              stroke="#3B82F6" 
              fillOpacity={1}
              fill="url(#expressiveGradient)"
              strokeWidth={2}
            />
            <Area 
              type="monotone" 
              dataKey="trainingStability" 
              stroke="#10B981" 
              fillOpacity={1}
              fill="url(#stabilityGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="rank" stroke="#666" />
            <YAxis domain={[0, 100]} stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="expressivePower" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="overfittingRisk" fill="#EF4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="rank" stroke="#666" />
            <YAxis domain={[0, 100]} stroke="#666" />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="expressivePower" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="trainingStability" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="overfittingRisk" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <motion.div 
      className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">性能指标变化</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>表达能力</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>训练稳定性</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>过拟合风险</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
      
      <motion.div 
        className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
        key={currentRank}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm text-gray-700">
          <span className="font-medium">当前秩值 {currentRank} 的特点：</span>
          {currentRank <= 8 && "保守稳定，适合小数据集和简单任务"}
          {currentRank > 8 && currentRank <= 32 && "平衡型选择，适用于大多数场景"}
          {currentRank > 32 && "高表达能力，适合复杂任务但需注意过拟合"}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MetricsChart;
