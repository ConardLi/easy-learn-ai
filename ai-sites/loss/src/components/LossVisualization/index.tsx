/**
 * LOSS可视化组件
 * 展示动态的LOSS变化曲线图，支持不同训练场景的模拟
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Play, Pause, RotateCcw, TrendingDown } from 'lucide-react';

const LossVisualization: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [scenario, setScenario] = useState('normal');
  const [data, setData] = useState<Array<{epoch: number, loss: number, validation?: number}>>([]);

  const scenarios = {
    normal: {
      name: '正常训练',
      description: 'LOSS稳定下降，训练效果良好',
      color: '#10B981',
      generateLoss: (epoch: number) => Math.max(0.1, 2.5 * Math.exp(-epoch * 0.1) + Math.random() * 0.1)
    },
    overfitting: {
      name: '过拟合',
      description: '训练LOSS下降但验证LOSS上升',
      color: '#F59E0B',
      generateLoss: (epoch: number) => Math.max(0.1, 2.5 * Math.exp(-epoch * 0.15) + Math.random() * 0.05),
      generateValidation: (epoch: number) => {
        if (epoch < 20) return Math.max(0.2, 2.5 * Math.exp(-epoch * 0.08) + Math.random() * 0.1);
        return Math.min(2.0, 0.5 + epoch * 0.02 + Math.random() * 0.1);
      }
    },
    unstable: {
      name: '不稳定训练',
      description: 'LOSS剧烈波动，学习率可能过大',
      color: '#EF4444',
      generateLoss: (epoch: number) => Math.max(0.1, 1.5 + Math.sin(epoch * 0.3) * 0.8 + Math.random() * 0.3)
    },
    plateauing: {
      name: '学习停滞',
      description: 'LOSS下降后趋于平缓',
      color: '#8B5CF6',
      generateLoss: (epoch: number) => {
        if (epoch < 15) return Math.max(0.3, 2.5 * Math.exp(-epoch * 0.2) + Math.random() * 0.1);
        return 0.3 + Math.random() * 0.05;
      }
    }
  };

  useEffect(() => {
    if (isPlaying && currentEpoch < 50) {
      const timer = setTimeout(() => {
        const newEpoch = currentEpoch + 1;
        const scenarioConfig = scenarios[scenario as keyof typeof scenarios];
        const newPoint = {
          epoch: newEpoch,
          loss: scenarioConfig.generateLoss(newEpoch),
          ...(scenarioConfig.generateValidation && {
            validation: scenarioConfig.generateValidation(newEpoch)
          })
        };
        
        setData(prev => [...prev, newPoint]);
        setCurrentEpoch(newEpoch);
        
        if (newEpoch >= 50) {
          setIsPlaying(false);
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentEpoch, scenario]);

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentEpoch(0);
    setData([]);
  };

  const togglePlay = () => {
    if (currentEpoch >= 50) {
      resetAnimation();
    }
    setIsPlaying(!isPlaying);
  };

  const handleScenarioChange = (newScenario: string) => {
    setScenario(newScenario);
    resetAnimation();
  };

  const currentScenario = scenarios[scenario as keyof typeof scenarios];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          LOSS 变化可视化
        </h2>
        <p className="text-gray-600">观察不同训练场景下的LOSS变化趋势</p>
      </motion.div>

      {/* 控制面板 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? '暂停' : currentEpoch >= 50 ? '重新开始' : '开始训练'}</span>
            </button>
            
            <button
              onClick={resetAnimation}
              className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重置</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">训练轮数:</span>
            <span className="font-bold text-lg">{currentEpoch}/50</span>
          </div>
        </div>

        {/* 场景选择 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(scenarios).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleScenarioChange(key)}
              className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                scenario === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: config.color }}
                ></div>
                <span className="font-medium text-sm">{config.name}</span>
              </div>
              <p className="text-xs text-gray-500 text-left">{config.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* 图表区域 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center space-x-2 mb-4">
          <TrendingDown className="w-5 h-5 text-blue-500" />
          <h3 className="text-xl font-semibold">LOSS 变化曲线</h3>
          <div className="ml-auto text-sm text-gray-500">
            当前场景: <span style={{ color: currentScenario.color }} className="font-medium">
              {currentScenario.name}
            </span>
          </div>
        </div>
        
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="epoch" 
                label={{ value: '训练轮数 (Epoch)', position: 'insideBottom', offset: -10 }}
                stroke="#666"
              />
              <YAxis 
                label={{ value: 'LOSS 值', angle: -90, position: 'insideLeft' }}
                stroke="#666"
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [value.toFixed(3), 'LOSS']}
              />
              <Line 
                type="monotone" 
                dataKey="loss" 
                stroke={currentScenario.color}
                strokeWidth={3}
                dot={{ fill: currentScenario.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: currentScenario.color, strokeWidth: 2 }}
                name="训练 LOSS"
              />
              {data.some(d => d.validation !== undefined) && (
                <Line 
                  type="monotone" 
                  dataKey="validation" 
                  stroke="#F59E0B"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                  name="验证 LOSS"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 图表说明 */}
        <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-800 mb-2">图表解读</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• X轴表示训练轮数（Epoch）</li>
              <li>• Y轴表示LOSS数值大小</li>
              <li>• 曲线向下表示模型在改进</li>
              <li>• 平缓区域表示收敛</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-800 mb-2">理想状态</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• LOSS稳定下降</li>
              <li>• 无剧烈波动</li>
              <li>• 最终趋于平缓</li>
              <li>• 训练验证LOSS同步</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LossVisualization;
