/**
 * 交互式演示组件
 * 让用户通过调整参数来观察LOSS的计算过程和变化
 */
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Sliders, Target, Activity } from 'lucide-react';

const InteractiveDemo: React.FC = () => {
  const [prediction, setPrediction] = useState(0.5);
  const [trueValue, setTrueValue] = useState(0.8);
  const [lossType, setLossType] = useState('mse');

  const calculateLoss = useCallback(() => {
    switch (lossType) {
      case 'mse':
        return Math.pow(prediction - trueValue, 2);
      case 'mae':
        return Math.abs(prediction - trueValue);
      case 'huber':
        const delta = 0.1;
        const diff = Math.abs(prediction - trueValue);
        return diff <= delta ? 0.5 * diff * diff : delta * (diff - 0.5 * delta);
      default:
        return 0;
    }
  }, [prediction, trueValue, lossType]);

  const loss = calculateLoss();

  const lossTypes = {
    mse: { name: 'MSE (均方误差)', formula: '(预测值 - 真实值)²' },
    mae: { name: 'MAE (平均绝对误差)', formula: '|预测值 - 真实值|' },
    huber: { name: 'Huber Loss', formula: '平滑的绝对误差' }
  };

  // 生成可视化数据
  const generateVisualizationData = () => {
    const points = [];
    for (let x = 0; x <= 1; x += 0.01) {
      let y;
      switch (lossType) {
        case 'mse':
          y = Math.pow(x - trueValue, 2);
          break;
        case 'mae':
          y = Math.abs(x - trueValue);
          break;
        case 'huber':
          const delta = 0.1;
          const diff = Math.abs(x - trueValue);
          y = diff <= delta ? 0.5 * diff * diff : delta * (diff - 0.5 * delta);
          break;
        default:
          y = 0;
      }
      points.push({ x, y });
    }
    return points;
  };

  const visualizationData = generateVisualizationData();
  const maxLoss = Math.max(...visualizationData.map(p => p.y));

  const getErrorLevel = (loss: number) => {
    if (loss < 0.01) return { level: '优秀', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (loss < 0.05) return { level: '良好', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (loss < 0.1) return { level: '一般', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: '较差', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const errorLevel = getErrorLevel(loss);

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          交互式 LOSS 计算
        </h2>
        <p className="text-gray-600">调整参数，实时观察LOSS的计算过程</p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 控制面板 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Sliders className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">参数调整</h3>
          </div>

          {/* LOSS类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              选择LOSS函数类型
            </label>
            <div className="space-y-2">
              {Object.entries(lossTypes).map(([key, config]) => (
                <label key={key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="lossType"
                    value={key}
                    checked={lossType === key}
                    onChange={(e) => setLossType(e.target.value)}
                    className="text-blue-600"
                  />
                  <div>
                    <div className="font-medium">{config.name}</div>
                    <div className="text-sm text-gray-500">{config.formula}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 预测值调整 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              模型预测值: {prediction.toFixed(3)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={prediction}
              onChange={(e) => setPrediction(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>0.5</span>
              <span>1</span>
            </div>
          </div>

          {/* 真实值调整 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              真实值: {trueValue.toFixed(3)}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={trueValue}
              onChange={(e) => setTrueValue(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0</span>
              <span>0.5</span>
              <span>1</span>
            </div>
          </div>

          {/* 计算结果 */}
          <motion.div
            key={loss}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Calculator className="w-5 h-5 text-purple-500" />
              <span className="font-medium">计算结果</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              LOSS = {loss.toFixed(6)}
            </div>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${errorLevel.bgColor} ${errorLevel.color}`}>
              <Target className="w-4 h-4 mr-1" />
              {errorLevel.level}
            </div>
          </motion.div>
        </motion.div>

        {/* 可视化区域 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Activity className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-semibold">LOSS函数可视化</h3>
          </div>

          {/* SVG图表 */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <svg width="100%" height="300" viewBox="0 0 400 300">
              {/* 坐标轴 */}
              <line x1="50" y1="250" x2="350" y2="250" stroke="#ccc" strokeWidth="2" />
              <line x1="50" y1="250" x2="50" y2="50" stroke="#ccc" strokeWidth="2" />
              
              {/* 坐标轴标签 */}
              <text x="200" y="280" textAnchor="middle" className="text-xs fill-gray-600">
                预测值
              </text>
              <text x="20" y="150" textAnchor="middle" className="text-xs fill-gray-600">
                LOSS
              </text>
              
              {/* 刻度 */}
              {[0, 0.25, 0.5, 0.75, 1].map((val, i) => (
                <g key={i}>
                  <line 
                    x1={50 + i * 75} 
                    y1="250" 
                    x2={50 + i * 75} 
                    y2="255" 
                    stroke="#ccc" 
                  />
                  <text 
                    x={50 + i * 75} 
                    y="270" 
                    textAnchor="middle" 
                    className="text-xs fill-gray-600"
                  >
                    {val}
                  </text>
                </g>
              ))}
              
              {/* LOSS曲线 */}
              <path
                d={`M ${visualizationData.map((point, index) => 
                  `${50 + point.x * 300},${250 - (point.y / maxLoss) * 200}`
                ).join(' L ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />
              
              {/* 真实值垂直线 */}
              <line
                x1={50 + trueValue * 300}
                y1="50"
                x2={50 + trueValue * 300}
                y2="250"
                stroke="#10B981"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              
              {/* 预测值点 */}
              <circle
                cx={50 + prediction * 300}
                cy={250 - (loss / maxLoss) * 200}
                r="6"
                fill="#EF4444"
                stroke="white"
                strokeWidth="2"
              />
              
              {/* 图例 */}
              <g transform="translate(250, 70)">
                <rect x="0" y="0" width="120" height="60" fill="white" stroke="#ccc" rx="5" />
                <line x1="10" y1="15" x2="25" y2="15" stroke="#3B82F6" strokeWidth="3" />
                <text x="30" y="19" className="text-xs fill-gray-700">LOSS曲线</text>
                <line x1="10" y1="30" x2="25" y2="30" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3" />
                <text x="30" y="34" className="text-xs fill-gray-700">真实值</text>
                <circle cx="17" cy="45" r="4" fill="#EF4444" />
                <text x="30" y="49" className="text-xs fill-gray-700">预测值</text>
              </g>
            </svg>
          </div>

          {/* 解释文本 */}
          <div className="space-y-3 text-sm">
            <div className="bg-blue-50 rounded-lg p-3">
              <h4 className="font-medium text-blue-800 mb-1">理解图表</h4>
              <p className="text-blue-600">
                曲线显示了不同预测值对应的LOSS大小。当预测值接近真实值时，LOSS最小。
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="text-center">
                <div className="font-medium text-gray-700">误差大小</div>
                <div className="text-lg font-bold text-red-500">
                  {Math.abs(prediction - trueValue).toFixed(3)}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-700">LOSS值</div>
                <div className="text-lg font-bold text-purple-500">
                  {loss.toFixed(6)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
