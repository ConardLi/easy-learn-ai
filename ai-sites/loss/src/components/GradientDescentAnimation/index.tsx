/**
 * 梯度下降动画组件
 * 可视化展示梯度下降算法如何通过迭代降低LOSS值
 */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Settings, TrendingDown } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

const GradientDescentAnimation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPoint, setCurrentPoint] = useState<Point>({ x: 0.8, y: 0 });
  const [path, setPath] = useState<Point[]>([]);
  const [learningRate, setLearningRate] = useState(0.1);
  const [iteration, setIteration] = useState(0);
  const [converged, setConverged] = useState(false);
  const animationRef = useRef<number>();

  // 简单的二次函数作为LOSS函数：(x - 0.3)^2 + 0.1
  const lossFunction = (x: number): number => {
    return Math.pow(x - 0.3, 2) + 0.1;
  };

  // 计算梯度（导数）
  const gradient = (x: number): number => {
    return 2 * (x - 0.3);
  };

  // 生成LOSS函数曲线数据
  const generateCurveData = (): Point[] => {
    const points: Point[] = [];
    for (let x = 0; x <= 1; x += 0.01) {
      points.push({ x, y: lossFunction(x) });
    }
    return points;
  };

  const curveData = generateCurveData();
  const maxY = Math.max(...curveData.map(p => p.y));
  const minY = Math.min(...curveData.map(p => p.y));

  useEffect(() => {
    if (isPlaying && !converged) {
      const animate = () => {
        setCurrentPoint(prev => {
          const grad = gradient(prev.x);
          const newX = prev.x - learningRate * grad;
          
          // 边界检查
          const clampedX = Math.max(0, Math.min(1, newX));
          const newY = lossFunction(clampedX);
          
          const newPoint = { x: clampedX, y: newY };
          
          setPath(prevPath => [...prevPath, newPoint]);
          setIteration(prev => prev + 1);
          
          // 检查收敛
          if (Math.abs(grad) < 0.001 || iteration > 100) {
            setConverged(true);
            setIsPlaying(false);
          }
          
          return newPoint;
        });
        
        if (!converged) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      const timer = setTimeout(animate, 200);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [isPlaying, converged, learningRate, iteration]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentPoint({ x: 0.8, y: lossFunction(0.8) });
    setPath([{ x: 0.8, y: lossFunction(0.8) }]);
    setIteration(0);
    setConverged(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleLearningRateChange = (newRate: number) => {
    setLearningRate(newRate);
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const currentLoss = currentPoint.y;
  const currentGradient = gradient(currentPoint.x);

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          梯度下降可视化
        </h2>
        <p className="text-gray-600">观察算法如何逐步找到LOSS函数的最小值</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* 控制面板 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-semibold">控制面板</h3>
          </div>

          {/* 播放控制 */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={converged}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isPlaying ? '暂停' : '开始'}</span>
            </button>
            
            <button
              onClick={reset}
              className="w-full flex items-center justify-center space-x-2 bg-gray-500 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>重置</span>
            </button>
          </div>

          {/* 学习率调整 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              学习率: {learningRate.toFixed(3)}
            </label>
            <input
              type="range"
              min="0.01"
              max="0.5"
              step="0.01"
              value={learningRate}
              onChange={(e) => handleLearningRateChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>慢 (0.01)</span>
              <span>快 (0.5)</span>
            </div>
          </div>

          {/* 状态信息 */}
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">迭代次数</div>
              <div className="text-lg font-bold text-blue-600">{iteration}</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">当前位置</div>
              <div className="text-lg font-bold text-green-600">{currentPoint.x.toFixed(4)}</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">当前LOSS</div>
              <div className="text-lg font-bold text-red-600">{currentLoss.toFixed(6)}</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-sm text-gray-600">当前梯度</div>
              <div className={`text-lg font-bold ${currentGradient > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {currentGradient.toFixed(4)}
              </div>
            </div>
          </div>

          {converged && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2 text-green-700">
                <TrendingDown className="w-4 h-4" />
                <span className="font-medium">收敛完成！</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                算法已找到最优解
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* 可视化区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">LOSS函数与优化路径</h3>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <svg width="100%" height="400" viewBox="0 0 600 400">
              {/* 坐标轴 */}
              <line x1="60" y1="350" x2="540" y2="350" stroke="#ccc" strokeWidth="2" />
              <line x1="60" y1="350" x2="60" y2="50" stroke="#ccc" strokeWidth="2" />
              
              {/* 坐标轴标签 */}
              <text x="300" y="380" textAnchor="middle" className="text-sm fill-gray-600">
                参数值 (x)
              </text>
              <text x="20" y="200" textAnchor="middle" className="text-sm fill-gray-600" transform="rotate(-90, 20, 200)">
                LOSS值
              </text>
              
              {/* 刻度 */}
              {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((val, i) => (
                <g key={i}>
                  <line 
                    x1={60 + i * 96} 
                    y1="350" 
                    x2={60 + i * 96} 
                    y2="355" 
                    stroke="#ccc" 
                  />
                  <text 
                    x={60 + i * 96} 
                    y="370" 
                    textAnchor="middle" 
                    className="text-xs fill-gray-600"
                  >
                    {val.toFixed(1)}
                  </text>
                </g>
              ))}
              
              {/* LOSS函数曲线 */}
              <path
                d={`M ${curveData.map((point, index) => 
                  `${60 + point.x * 480},${350 - ((point.y - minY) / (maxY - minY)) * 300}`
                ).join(' L ')}`}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
              />
              
              {/* 优化路径 */}
              {path.length > 1 && (
                <path
                  d={`M ${path.map((point, index) => 
                    `${60 + point.x * 480},${350 - ((point.y - minY) / (maxY - minY)) * 300}`
                  ).join(' L ')}`}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  opacity="0.8"
                />
              )}
              
              {/* 路径点 */}
              {path.slice(0, -1).map((point, index) => (
                <circle
                  key={index}
                  cx={60 + point.x * 480}
                  cy={350 - ((point.y - minY) / (maxY - minY)) * 300}
                  r="3"
                  fill="#FFA500"
                  opacity="0.7"
                />
              ))}
              
              {/* 当前位置 */}
              <motion.circle
                cx={60 + currentPoint.x * 480}
                cy={350 - ((currentPoint.y - minY) / (maxY - minY)) * 300}
                r="8"
                fill="#EF4444"
                stroke="white"
                strokeWidth="3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
              />
              
              {/* 梯度箭头 */}
              {!converged && Math.abs(currentGradient) > 0.001 && (
                <g>
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#10B981"
                      />
                    </marker>
                  </defs>
                  <line
                    x1={60 + currentPoint.x * 480}
                    y1={350 - ((currentPoint.y - minY) / (maxY - minY)) * 300 - 20}
                    x2={60 + currentPoint.x * 480 - currentGradient * 50}
                    y2={350 - ((currentPoint.y - minY) / (maxY - minY)) * 300 - 20}
                    stroke="#10B981"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <text
                    x={60 + currentPoint.x * 480}
                    y={350 - ((currentPoint.y - minY) / (maxY - minY)) * 300 - 30}
                    textAnchor="middle"
                    className="text-xs fill-green-600 font-medium"
                  >
                    梯度方向
                  </text>
                </g>
              )}
              
              {/* 最优点标记 */}
              <circle
                cx={60 + 0.3 * 480}
                cy={350 - ((lossFunction(0.3) - minY) / (maxY - minY)) * 300}
                r="6"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="3,3"
              />
              <text
                x={60 + 0.3 * 480}
                y={350 - ((lossFunction(0.3) - minY) / (maxY - minY)) * 300 - 15}
                textAnchor="middle"
                className="text-xs fill-green-600 font-medium"
              >
                最优解
              </text>
              
              {/* 图例 */}
              <g transform="translate(400, 70)">
                <rect x="0" y="0" width="140" height="90" fill="white" stroke="#ccc" rx="5" />
                <line x1="10" y1="15" x2="25" y2="15" stroke="#3B82F6" strokeWidth="3" />
                <text x="30" y="19" className="text-xs fill-gray-700">LOSS函数</text>
                <line x1="10" y1="30" x2="25" y2="30" stroke="#EF4444" strokeWidth="2" strokeDasharray="3,3" />
                <text x="30" y="34" className="text-xs fill-gray-700">优化路径</text>
                <circle cx="17" cy="45" r="4" fill="#EF4444" />
                <text x="30" y="49" className="text-xs fill-gray-700">当前位置</text>
                <circle cx="17" cy="60" r="4" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="2,2" />
                <text x="30" y="64" className="text-xs fill-gray-700">最优解</text>
                <line x1="10" y1="75" x2="25" y2="75" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="30" y="79" className="text-xs fill-gray-700">梯度方向</text>
              </g>
            </svg>
          </div>

          {/* 算法解释 */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">梯度下降原理</h4>
              <ul className="space-y-1 text-blue-600">
                <li>• 计算当前位置的梯度（斜率）</li>
                <li>• 沿梯度反方向移动</li>
                <li>• 移动距离由学习率控制</li>
                <li>• 重复直到收敛到最小值</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">学习率影响</h4>
              <ul className="space-y-1 text-green-600">
                <li>• 学习率过大：可能跳过最优解</li>
                <li>• 学习率过小：收敛速度慢</li>
                <li>• 合适的学习率：稳定快速收敛</li>
                <li>• 需要根据问题调整参数</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GradientDescentAnimation;
