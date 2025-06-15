/**
 * 效果展示组件
 * 使用动态图表展示MGA方法的实验效果和性能提升
 */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';

const ResultsSection: React.FC = () => {
  const [activeChart, setActiveChart] = useState('performance');
  const [animationKey, setAnimationKey] = useState(0);

  // 性能提升数据
  const performanceData = [
    { task: 'TriviaQA', baseline: 45.2, mga: 52.8, improvement: 16.8 },
    { task: 'GSM8K', baseline: 7.8, mga: 13.9, improvement: 78.2 },
    { task: 'MMLU-Pro', baseline: 38.5, mga: 42.1, improvement: 9.4 },
    { task: 'ARC Science', baseline: 41.2, mga: 47.5, improvement: 15.3 }
  ];

  // 模型规模对比数据
  const scaleData = [
    { model: '377M', baseline: 32.1, mga: 37.3, cosmopedia: 35.6 },
    { model: '1.3B', baseline: 41.8, mga: 46.2, cosmopedia: 43.1 },
    { model: '7B', baseline: 52.3, mga: 58.9, cosmopedia: 54.7 },
    { model: '13B', baseline: 58.1, mga: 65.4, cosmopedia: 61.2 }
  ];

  // 数据重复对比
  const repetitionData = [
    { repetitions: 1, baseline: 2.34, mga: 2.34 },
    { repetitions: 3, baseline: 2.41, mga: 2.36 },
    { repetitions: 5, baseline: 2.48, mga: 2.38 },
    { repetitions: 10, baseline: 2.59, mga: 2.42 }
  ];

  const chartConfigs = {
    performance: {
      title: '任务性能提升',
      description: 'MGA方法在各项推理任务上的准确率提升',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500'
    },
    scale: {
      title: '跨模型规模对比',
      description: '不同参数规模模型的性能对比',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    },
    expansion: {
      title: 'Token数据扩展',
      description: 'MGA方法实现的数据规模扩展效果',
      icon: Zap,
      color: 'from-green-500 to-emerald-500'
    },
    repetition: {
      title: '抗重复能力',
      description: '数据重复训练时的验证损失对比',
      icon: Award,
      color: 'from-orange-500 to-red-500'
    }
  };

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [activeChart]);

  const currentConfig = chartConfigs[activeChart as keyof typeof chartConfigs];
  const IconComponent = currentConfig.icon;

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            MGA 实验效果展示
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            通过动态图表展示 MGA 方法在各项任务中的显著性能提升
          </p>
        </motion.div>

        {/* 图表选择器 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {Object.entries(chartConfigs).map(([key, config]) => {
            const ConfigIcon = config.icon;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveChart(key)}
                className={`p-6 rounded-2xl text-center transition-all ${
                  activeChart === key
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                whileHover={{ scale: activeChart === key ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <ConfigIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-sm text-gray-900 mb-1">{config.title}</h3>
                <p className="text-xs text-gray-600">{config.description}</p>
              </motion.button>
            );
          })}
        </div>

        {/* 图表展示区域 */}
        <motion.div
          key={animationKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-lg"
        >
          <div className="flex items-center space-x-4 mb-8">
            <div className={`w-16 h-16 bg-gradient-to-br ${currentConfig.color} rounded-2xl flex items-center justify-center`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                {currentConfig.title}
              </h2>
              <p className="text-lg text-gray-600">
                {currentConfig.description}
              </p>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'performance' && (
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="task" />
                  <YAxis />
                  <Tooltip formatter={(value: any, name: string) => [
                    `${value}%`, 
                    name === 'baseline' ? '基线模型' : name === 'mga' ? 'MGA模型' : '提升幅度'
                  ]} />
                  <Legend formatter={(value: string) => 
                    value === 'baseline' ? '基线模型' : value === 'mga' ? 'MGA模型' : '提升幅度'
                  } />
                  <Bar dataKey="baseline" fill="#94A3B8" name="baseline" />
                  <Bar dataKey="mga" fill="#3B82F6" name="mga" />
                </BarChart>
              )}

              {activeChart === 'scale' && (
                <LineChart data={scaleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="model" />
                  <YAxis />
                  <Tooltip formatter={(value: any, name: string) => [
                    `${value}%`, 
                    name === 'baseline' ? '基线模型' : name === 'mga' ? 'MGA模型' : 'Cosmopedia'
                  ]} />
                  <Legend formatter={(value: string) => 
                    value === 'baseline' ? '基线模型' : value === 'mga' ? 'MGA模型' : 'Cosmopedia'
                  } />
                  <Line type="monotone" dataKey="baseline" stroke="#94A3B8" strokeWidth={3} dot={{ r: 6 }} name="baseline" />
                  <Line type="monotone" dataKey="mga" stroke="#3B82F6" strokeWidth={3} dot={{ r: 6 }} name="mga" />
                  <Line type="monotone" dataKey="cosmopedia" stroke="#F59E0B" strokeWidth={3} dot={{ r: 6 }} name="cosmopedia" />
                </LineChart>
              )}

              {activeChart === 'expansion' && (
                <BarChart data={[
                  { name: '原始数据', tokens: 1950 },
                  { name: 'MGA扩展', tokens: 7700 }
                ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value}B Tokens`, 'Token数量']} />
                  <Bar dataKey="tokens" fill="#10B981" />
                </BarChart>
              )}

              {activeChart === 'repetition' && (
                <LineChart data={repetitionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="repetitions" />
                  <YAxis />
                  <Tooltip formatter={(value: any, name: string) => [
                    value.toFixed(2), 
                    name === 'baseline' ? '基线模型验证损失' : 'MGA模型验证损失'
                  ]} />
                  <Legend formatter={(value: string) => 
                    value === 'baseline' ? '基线模型' : 'MGA模型'
                  } />
                  <Line type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={3} dot={{ r: 6 }} name="baseline" />
                  <Line type="monotone" dataKey="mga" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} name="mga" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* 关键指标 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {activeChart === 'performance' && performanceData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold text-blue-600">+{item.improvement.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">{item.task} 提升</div>
              </motion.div>
            ))}
            
            {activeChart === 'expansion' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center"
              >
                <div className="text-3xl font-bold text-green-600">3.9x</div>
                <div className="text-sm text-gray-600">Token数扩展倍数</div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsSection;