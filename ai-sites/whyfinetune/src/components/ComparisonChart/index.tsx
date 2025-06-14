/**
 * 对比图表组件
 * 使用雷达图和柱状图展示三种技术的对比分析
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Zap, Clock, DollarSign } from 'lucide-react';

const ComparisonChart: React.FC = () => {
  const [activeChart, setActiveChart] = useState<'radar' | 'bar'>('radar');

  const radarData = [
    {
      subject: '性能',
      longtext: 70,
      knowledge: 85,
      finetune: 95,
    },
    {
      subject: '灵活性',
      longtext: 60,
      knowledge: 95,
      finetune: 40,
    },
    {
      subject: '实时性',
      longtext: 50,
      knowledge: 90,
      finetune: 30,
    },
    {
      subject: '成本效益',
      longtext: 40,
      knowledge: 80,
      finetune: 60,
    },
    {
      subject: '易用性',
      longtext: 80,
      knowledge: 70,
      finetune: 50,
    },
    {
      subject: '扩展性',
      longtext: 60,
      knowledge: 90,
      finetune: 70,
    },
  ];

  const barData = [
    {
      name: '资源消耗',
      长文本: 85,
      知识库: 60,
      微调: 90,
    },
    {
      name: '开发时间',
      长文本: 30,
      知识库: 50,
      微调: 80,
    },
    {
      name: '维护成本',
      长文本: 40,
      知识库: 70,
      微调: 50,
    },
    {
      name: '准确性',
      长文本: 70,
      知识库: 80,
      微调: 95,
    },
  ];

  const metrics = [
    {
      title: '性能提升',
      icon: TrendingUp,
      value: '95%',
      subtitle: '微调效果最佳',
      color: 'text-green-600'
    },
    {
      title: '响应速度',
      icon: Zap,
      value: '< 100ms',
      subtitle: '知识库最快',
      color: 'text-blue-600'
    },
    {
      title: '开发周期',
      icon: Clock,
      value: '2-8周',
      subtitle: '因方法而异',
      color: 'text-orange-600'
    },
    {
      title: '成本投入',
      icon: DollarSign,
      value: '中-高',
      subtitle: '微调成本最高',
      color: 'text-purple-600'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            全面对比分析
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            通过可视化图表深入了解三种方法的优劣势
          </p>
        </motion.div>

        {/* 关键指标 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mb-4`}>
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{metric.title}</h3>
                <p className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.subtitle}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 图表切换按钮 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveChart('radar')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeChart === 'radar'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              能力雷达图
            </button>
            <button
              onClick={() => setActiveChart('bar')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeChart === 'bar'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              成本对比图
            </button>
          </div>
        </motion.div>

        {/* 图表区域 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="h-96">
            {activeChart === 'radar' ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                  <PolarRadiusAxis 
                    angle={0} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10 }}
                    tickCount={5}
                  />
                  <Radar
                    name="长文本"
                    dataKey="longtext"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="知识库"
                    dataKey="knowledge"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="微调"
                    dataKey="finetune"
                    stroke="#8B5CF6"
                    fill="#8B5CF6"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="长文本" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="知识库" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="微调" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* 图表说明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600 max-w-2xl mx-auto">
            {activeChart === 'radar' 
              ? '雷达图展示了三种方法在不同维度的综合能力，数值越高表示该维度表现越好'
              : '柱状图对比了三种方法在实际应用中的成本投入，包括资源消耗、开发时间等关键指标'
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonChart;
