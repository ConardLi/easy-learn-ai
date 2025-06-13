/**
 * 显存使用分析组件
 * 展示不同批量大小对显存的影响
 */
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MemoryUsageProps {
  perDeviceBatchSize: number;
  gradientAccumulationSteps: number;
}

const MemoryUsage: React.FC<MemoryUsageProps> = ({
  perDeviceBatchSize,
  gradientAccumulationSteps
}) => {
  // 生成不同批量大小下的显存使用数据
  const memoryData = Array.from({ length: 16 }, (_, i) => {
    const batchSize = i + 1;
    const memoryUsage = batchSize * 100 + Math.pow(batchSize, 1.5) * 50; // 非线性增长
    const efficiency = Math.log(batchSize + 1) * 30; // 效率增长
    
    return {
      batchSize,
      memoryUsage: Math.round(memoryUsage),
      efficiency: Math.round(efficiency),
      isCurrentSetting: batchSize === perDeviceBatchSize
    };
  });

  // 梯度累积对比数据
  const gradientData = [
    {
      method: '直接大批量',
      batchSize: perDeviceBatchSize * gradientAccumulationSteps,
      memoryUsage: (perDeviceBatchSize * gradientAccumulationSteps) * 100,
      feasible: (perDeviceBatchSize * gradientAccumulationSteps) <= 8
    },
    {
      method: '梯度累积',
      batchSize: perDeviceBatchSize * gradientAccumulationSteps,
      memoryUsage: perDeviceBatchSize * 100,
      feasible: true
    }
  ];

  const currentMemoryUsage = perDeviceBatchSize * 100;
  const maxMemory = 1600; // 假设显存上限

  return (
    <div className="space-y-8">
      {/* 当前显存状态 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💾 显存使用分析
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 当前显存使用 */}
          <div className="text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">当前显存使用</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">{currentMemoryUsage}MB</div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  currentMemoryUsage / maxMemory > 0.8 ? 'bg-red-500' :
                  currentMemoryUsage / maxMemory > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(currentMemoryUsage / maxMemory * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {Math.round(currentMemoryUsage / maxMemory * 100)}% 使用率
            </p>
          </div>

          {/* 有效批量大小 */}
          <div className="text-center">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">有效批量大小</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {perDeviceBatchSize * gradientAccumulationSteps}
            </div>
            <p className="text-sm text-gray-500">
              {perDeviceBatchSize} × {gradientAccumulationSteps}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              等效于直接使用大批量
            </p>
          </div>

          {/* 优化效果 */}
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">显存节省</h3>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Math.round((1 - perDeviceBatchSize / (perDeviceBatchSize * gradientAccumulationSteps)) * 100)}%
            </div>
            <p className="text-sm text-gray-500">
              相比直接大批量
            </p>
            <p className="text-sm text-gray-500 mt-2">
              梯度累积的优势
            </p>
          </div>
        </div>
      </motion.div>

      {/* 显存使用趋势图 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">显存使用趋势</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={memoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="batchSize" 
                label={{ value: '批量大小', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                label={{ value: '显存使用 (MB)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value}${name === 'memoryUsage' ? 'MB' : ''}`, 
                  name === 'memoryUsage' ? '显存使用' : '训练效率'
                ]}
                labelFormatter={(value) => `批量大小: ${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="memoryUsage" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={(props: any) => (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={props.payload.isCurrentSetting ? 8 : 4}
                    fill={props.payload.isCurrentSetting ? "#EF4444" : "#3B82F6"}
                    stroke={props.payload.isCurrentSetting ? "#DC2626" : "#3B82F6"}
                    strokeWidth={2}
                  />
                )}
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#10B981" 
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 梯度累积对比 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-6">梯度累积 vs 直接大批量</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 对比表格 */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-800 mb-4">方法对比</h4>
              <div className="space-y-3">
                {gradientData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="font-medium">{item.method}</span>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">显存: {item.memoryUsage}MB</div>
                      <div className={`text-sm font-medium ${item.feasible ? 'text-green-600' : 'text-red-600'}`}>
                        {item.feasible ? '✅ 可行' : '❌ 显存不足'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 可视化对比 */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradientData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis label={{ value: '显存 (MB)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar 
                  dataKey="memoryUsage" 
                  fill={(data: any) => data.feasible ? "#10B981" : "#EF4444"}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* 优化建议 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl"
      >
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          显存优化建议
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold">当前状态评估</h4>
            <ul className="space-y-2 text-blue-100">
              {currentMemoryUsage > maxMemory * 0.8 && (
                <li>⚠️ 显存使用率过高，建议降低批量大小</li>
              )}
              {currentMemoryUsage < maxMemory * 0.3 && (
                <li>📈 显存利用率较低，可以适当增加批量大小</li>
              )}
              <li>🎯 梯度累积可节省 {Math.round((1 - 1/gradientAccumulationSteps) * 100)}% 显存</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold">优化策略</h4>
            <ul className="space-y-2 text-blue-100">
              <li>🔧 使用梯度累积实现大批量训练</li>
              <li>⚖️ 平衡显存使用和训练稳定性</li>
              <li>📊 监控显存使用率保持在80%以下</li>
              <li>🎛️ 根据硬件条件动态调整参数</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryUsage;
