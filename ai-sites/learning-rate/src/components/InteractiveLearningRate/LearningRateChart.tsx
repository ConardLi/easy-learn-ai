/**
 * 学习率训练过程图表组件
 * 使用 recharts 展示损失函数和准确率的变化
 */
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

interface ChartData {
  epoch: number;
  loss: number;
  accuracy: number;
}

interface LearningRateChartProps {
  data: ChartData[];
}

const LearningRateChart: React.FC<LearningRateChartProps> = ({ data }) => {
  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 h-96"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">训练过程监控</h3>
      
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">📊</span>
            </div>
            <p className="text-gray-500 text-lg">点击"开始训练"查看训练过程</p>
          </div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="epoch" 
              stroke="#6b7280"
              label={{ value: '训练轮次 (Epoch)', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              yAxisId="loss"
              orientation="left"
              stroke="#ef4444"
              label={{ value: '损失值', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="accuracy"
              orientation="right"
              stroke="#10b981"
              label={{ value: '准确率 (%)', angle: 90, position: 'insideRight' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            <Line
              yAxisId="loss"
              type="monotone"
              dataKey="loss"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="损失值"
              animationDuration={300}
            />
            <Line
              yAxisId="accuracy"
              type="monotone"
              dataKey="accuracy"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              name="准确率 (%)"
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  );
};

export default LearningRateChart;
