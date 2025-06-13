/**
 * 损失函数图表组件
 * 使用recharts展示训练和验证损失的变化趋势
 */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrainingData } from '../../hooks/useTrainingSimulation';

interface LossChartProps {
  data: TrainingData[];
  trainingStatus: string;
}

export function LossChart({ data, trainingStatus }: LossChartProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'underfitting': return 'text-red-600';
      case 'optimal': return 'text-green-600';
      case 'overfitting': return 'text-purple-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'underfitting': return '欠拟合 - 学习不充分';
      case 'optimal': return '最佳状态 - 学习效果良好';
      case 'overfitting': return '过拟合 - 学傻了';
      case 'ready': return '准备开始训练';
      default: return '训练中...';
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">训练损失曲线</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trainingStatus)} bg-opacity-10`}>
          {getStatusText(trainingStatus)}
        </div>
      </div>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="epoch" 
              label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              label={{ value: 'Loss', angle: -90, position: 'insideLeft' }}
              domain={[0, 'dataMax + 0.5']}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [
                value.toFixed(3), 
                name === 'trainLoss' ? '训练损失' : '验证损失'
              ]}
              labelFormatter={(label) => `第 ${label} 轮`}
            />
            <Legend 
              formatter={(value) => value === 'trainLoss' ? '训练损失' : '验证损失'}
            />
            <Line 
              type="monotone" 
              dataKey="trainLoss" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="validationLoss" 
              stroke="#EF4444" 
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">开始训练以查看损失曲线</p>
        </div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-xl">
          <p className="text-sm text-blue-600 font-medium">训练损失</p>
          <p className="text-xs text-blue-500 mt-1">模型在训练数据上的损失</p>
        </div>
        <div className="bg-red-50 p-3 rounded-xl">
          <p className="text-sm text-red-600 font-medium">验证损失</p>
          <p className="text-xs text-red-500 mt-1">模型在验证数据上的损失</p>
        </div>
      </div>
    </div>
  );
}
