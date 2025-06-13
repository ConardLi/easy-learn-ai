/**
 * 性能对比组件
 * 显示不同秩值下的详细性能指标对比
 */

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { calculateMetrics } from '../../utils/loraCalculations';
import { Gauge, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PerformanceComparisonProps {
  currentRank: number;
  className?: string;
}

const PerformanceComparison: React.FC<PerformanceComparisonProps> = ({ currentRank, className = "" }) => {
  const compareRanks = [4, 8, 16, 32, 64];
  const comparisonData = compareRanks.map(rank => calculateMetrics(rank));
  const currentMetrics = calculateMetrics(currentRank);
  
  // 饼图数据
  const pieData = [
    { name: '表达能力', value: currentMetrics.expressivePower, color: '#3B82F6' },
    { name: '训练稳定性', value: currentMetrics.trainingStability, color: '#10B981' },
    { name: '过拟合风险', value: 100 - currentMetrics.overfittingRisk, color: '#EF4444' }
  ];
  
  const getTrendIcon = (current: number, baseline: number) => {
    if (current > baseline + 5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (current < baseline - 5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };
  
  const baseline = calculateMetrics(16); // 以 rank=16 作为基线

  return (
    <div className={`p-6 bg-white rounded-2xl shadow-lg border border-gray-100 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <Gauge className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800">性能对比分析</h3>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 柱状图对比 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">各秩值性能对比</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="rank" stroke="#666" />
                <YAxis domain={[0, 100]} stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar 
                  dataKey="expressivePower" 
                  fill="#3B82F6" 
                  radius={[2, 2, 0, 0]}
                  name="表达能力"
                />
                <Bar 
                  dataKey="trainingStability" 
                  fill="#10B981" 
                  radius={[2, 2, 0, 0]}
                  name="训练稳定性"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* 当前性能饼图 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700">当前秩值 ({currentRank}) 性能分布</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* 详细指标卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div 
          className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">表达能力</span>
            {getTrendIcon(currentMetrics.expressivePower, baseline.expressivePower)}
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {currentMetrics.expressivePower}%
          </div>
        </motion.div>
        
        <motion.div 
          className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">训练稳定性</span>
            {getTrendIcon(currentMetrics.trainingStability, baseline.trainingStability)}
          </div>
          <div className="text-2xl font-bold text-green-800">
            {currentMetrics.trainingStability}%
          </div>
        </motion.div>
        
        <motion.div 
          className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-red-700">过拟合风险</span>
            {getTrendIcon(100 - currentMetrics.overfittingRisk, 100 - baseline.overfittingRisk)}
          </div>
          <div className="text-2xl font-bold text-red-800">
            {currentMetrics.overfittingRisk}%
          </div>
        </motion.div>
        
        <motion.div 
          className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-purple-700">显存使用</span>
            {getTrendIcon(100 - currentMetrics.memoryUsage, 100 - baseline.memoryUsage)}
          </div>
          <div className="text-2xl font-bold text-purple-800">
            {currentMetrics.memoryUsage}GB
          </div>
        </motion.div>
      </div>
      
      {/* 总结建议 */}
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h5 className="font-semibold text-gray-800 mb-2">性能总结</h5>
        <p className="text-sm text-gray-700">
          {currentRank <= 8 && "当前设置偏向保守，训练稳定但表达能力有限，适合简单任务和小数据集。"}
          {currentRank > 8 && currentRank <= 32 && "当前设置较为均衡，在表达能力和稳定性之间取得了良好平衡，适用于大多数场景。"}
          {currentRank > 32 && "当前设置偏向激进，具有强大的表达能力但过拟合风险较高，需要足够的数据和经验。"}
        </p>
      </motion.div>
    </div>
  );
};

export default PerformanceComparison;
