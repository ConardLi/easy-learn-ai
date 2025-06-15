/**
 * 常见误区组件
 * 展示LOSS使用中的常见误区和注意事项
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MistakesSection: React.FC = () => {
  const [selectedMistake, setSelectedMistake] = useState(0);

  const mistakes = [
    {
      title: 'LOSS曲线漂亮 ≠ 模型效果好',
      description: 'LOSS稳定下降只能说明训练过程正常，不代表模型在真实数据上表现好',
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      examples: [
        '训练LOSS很小，但验证LOSS很大（过拟合）',
        '模型在训练集上表现完美，在测试集上表现糟糕',
        'LOSS曲线平滑下降，但模型无法泛化到新数据'
      ],
      chartData: [
        { epoch: 0, trainLoss: 2.5, validLoss: 2.4 },
        { epoch: 10, trainLoss: 1.8, validLoss: 1.9 },
        { epoch: 20, trainLoss: 1.2, validLoss: 1.3 },
        { epoch: 30, trainLoss: 0.8, validLoss: 0.9 },
        { epoch: 40, trainLoss: 0.5, validLoss: 1.1 },
        { epoch: 50, trainLoss: 0.3, validLoss: 1.4 },
        { epoch: 60, trainLoss: 0.2, validLoss: 1.8 },
        { epoch: 70, trainLoss: 0.1, validLoss: 2.1 }
      ]
    },
    {
      title: '只关注LOSS数值大小',
      description: '不同任务的LOSS数值范围差异很大，应该关注变化趋势而不是绝对值',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      examples: [
        '分类任务LOSS通常在0-10之间',
        '回归任务LOSS可能在0-1000之间',
        '不同的LOSS函数数值范围不同'
      ],
      chartData: [
        { epoch: 0, classification: 2.3, regression: 450 },
        { epoch: 10, classification: 1.8, regression: 380 },
        { epoch: 20, classification: 1.4, regression: 320 },
        { epoch: 30, classification: 1.1, regression: 270 },
        { epoch: 40, classification: 0.9, regression: 230 },
        { epoch: 50, classification: 0.7, regression: 200 }
      ]
    },
    {
      title: 'LOSS波动就是训练失败',
      description: '适度的LOSS波动是正常的，特别是在训练初期，关键是整体趋势',
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      examples: [
        '批次间的随机性会导致正常波动',
        '学习率调整会引起短期波动',
        '数据增强可能增加LOSS波动'
      ],
      chartData: [
        { epoch: 0, normal: 2.5, fluctuating: 2.4 },
        { epoch: 5, normal: 2.1, fluctuating: 2.3 },
        { epoch: 10, normal: 1.8, fluctuating: 1.6 },
        { epoch: 15, normal: 1.5, fluctuating: 1.8 },
        { epoch: 20, normal: 1.3, fluctuating: 1.2 },
        { epoch: 25, normal: 1.1, fluctuating: 1.4 },
        { epoch: 30, normal: 0.9, fluctuating: 1.0 },
        { epoch: 35, normal: 0.8, fluctuating: 0.9 },
        { epoch: 40, normal: 0.7, fluctuating: 0.8 }
      ]
    },
    {
      title: '追求LOSS越小越好',
      description: '过度追求小的LOSS可能导致过拟合，需要在训练和泛化之间找平衡',
      icon: AlertTriangle,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      examples: [
        '训练时间过长可能导致过拟合',
        '模型复杂度过高会记住噪声',
        '需要使用早停、正则化等技术'
      ],
      chartData: [
        { epoch: 0, loss: 2.5, accuracy: 0.3 },
        { epoch: 10, loss: 1.8, accuracy: 0.6 },
        { epoch: 20, loss: 1.2, accuracy: 0.75 },
        { epoch: 30, loss: 0.8, accuracy: 0.85 },
        { epoch: 40, loss: 0.5, accuracy: 0.88 },
        { epoch: 50, loss: 0.3, accuracy: 0.87 },
        { epoch: 60, loss: 0.2, accuracy: 0.85 },
        { epoch: 70, loss: 0.1, accuracy: 0.82 }
      ]
    }
  ];

  const currentMistake = mistakes[selectedMistake];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          常见误区与注意事项
        </h2>
        <p className="text-gray-600">避免这些误区，正确理解和使用LOSS函数</p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* 误区选择面板 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>选择误区</span>
          </h3>
          
          <div className="space-y-3">
            {mistakes.map((mistake, index) => {
              const IconComponent = mistake.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedMistake(index)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-all duration-300 ${
                    selectedMistake === index
                      ? `${mistake.borderColor} ${mistake.bgColor}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className={`w-5 h-5 ${mistake.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <div className="font-medium text-sm text-gray-800 mb-1">
                        误区 {index + 1}
                      </div>
                      <div className="text-xs text-gray-600 leading-relaxed">
                        {mistake.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 详细内容 */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMistake}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className={`w-12 h-12 ${currentMistake.bgColor} rounded-xl flex items-center justify-center`}>
                  <currentMistake.icon className={`w-6 h-6 ${currentMistake.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {currentMistake.title}
                  </h3>
                  <p className="text-gray-600">
                    {currentMistake.description}
                  </p>
                </div>
              </div>

              {/* 示例说明 */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>典型表现</span>
                </h4>
                <div className="grid gap-2">
                  {currentMistake.examples.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-red-700">{example}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 图表展示 */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-3">示例图表</h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentMistake.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="epoch" 
                        stroke="#666"
                        label={{ value: '训练轮数', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis stroke="#666" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #ccc', 
                          borderRadius: '8px' 
                        }}
                      />
                      {Object.keys(currentMistake.chartData[0] || {}).filter(key => key !== 'epoch').map((key, index) => {
                        const colors = ['#EF4444', '#3B82F6', '#10B981', '#F59E0B'];
                        return (
                          <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={colors[index % colors.length]}
                            strokeWidth={2}
                            dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 3 }}
                            name={key === 'trainLoss' ? '训练LOSS' : 
                                 key === 'validLoss' ? '验证LOSS' :
                                 key === 'classification' ? '分类LOSS' :
                                 key === 'regression' ? '回归LOSS' :
                                 key === 'normal' ? '正常训练' :
                                 key === 'fluctuating' ? '波动训练' :
                                 key === 'loss' ? 'LOSS' :
                                 key === 'accuracy' ? '准确率' : key}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* 正确做法 */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>正确做法</span>
                </h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedMistake === 0 && (
                    <>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">监控验证LOSS</h5>
                        <p className="text-sm text-green-600">
                          同时观察训练和验证LOSS，确保两者趋势一致
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">使用早停机制</h5>
                        <p className="text-sm text-green-600">
                          当验证LOSS开始上升时及时停止训练
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedMistake === 1 && (
                    <>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">关注相对变化</h5>
                        <p className="text-sm text-green-600">
                          观察LOSS的变化趋势和相对减少幅度
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">标准化LOSS</h5>
                        <p className="text-sm text-green-600">
                          使用相对LOSS或归一化指标进行比较
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedMistake === 2 && (
                    <>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">观察整体趋势</h5>
                        <p className="text-sm text-green-600">
                          使用移动平均或平滑曲线观察整体趋势
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">合理设置学习率</h5>
                        <p className="text-sm text-green-600">
                          使用学习率调度减少后期波动
                        </p>
                      </div>
                    </>
                  )}
                  
                  {selectedMistake === 3 && (
                    <>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">平衡性能指标</h5>
                        <p className="text-sm text-green-600">
                          同时监控LOSS和准确率等业务指标
                        </p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h5 className="font-medium text-green-800 mb-2">使用正则化</h5>
                        <p className="text-sm text-green-600">
                          添加L1/L2正则化或Dropout防止过拟合
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 总结卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4">核心要点总结</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-medium mb-1">关注趋势</h4>
                <p className="text-sm opacity-90">LOSS的变化方向比绝对值更重要</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚖️</div>
                <h4 className="font-medium mb-1">平衡发展</h4>
                <p className="text-sm opacity-90">在训练效果和泛化能力间找平衡</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-medium mb-1">多指标监控</h4>
                <p className="text-sm opacity-90">结合多个指标全面评估模型</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MistakesSection;
