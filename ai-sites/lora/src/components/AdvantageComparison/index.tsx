/**
 * LoRA 优势对比组件
 * 通过图表和动画对比展示 LoRA 与传统微调方法的优势
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Zap, Clock, HardDrive, DollarSign, CheckCircle, XCircle } from 'lucide-react';

const AdvantageComparison: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<'lora' | 'full' | null>(null);

  const comparisonData = [
    {
      metric: '可训练参数量',
      lora: 0.1,
      full: 100,
      unit: '%',
      color: '#3B82F6'
    },
    {
      metric: 'GPU内存占用',
      lora: 33,
      full: 100,
      unit: '%',
      color: '#10B981'
    },
    {
      metric: '训练时间',
      lora: 25,
      full: 100,
      unit: '%',
      color: '#F59E0B'
    },
    {
      metric: '存储空间',
      lora: 2,
      full: 100,
      unit: '%',
      color: '#EF4444'
    }
  ];

  const pieData = [
    { name: 'LoRA 参数', value: 0.1, color: '#3B82F6' },
    { name: '冻结参数', value: 99.9, color: '#E5E7EB' }
  ];

  const features = [
    {
      category: 'LoRA 微调',
      items: [
        { feature: '参数量少', supported: true, description: '只训练 0.1-1% 的参数' },
        { feature: '内存友好', supported: true, description: 'GPU 内存需求降低 3 倍' },
        { feature: '训练速度快', supported: true, description: '训练时间大幅缩短' },
        { feature: '存储空间小', supported: true, description: '模型文件仅几 MB' },
        { feature: '可组合性', supported: true, description: '可以组合多个 LoRA 适配器' },
        { feature: '部署灵活', supported: true, description: '可以快速切换不同任务' }
      ]
    },
    {
      category: '全量微调',
      items: [
        { feature: '参数量少', supported: false, description: '需要训练所有参数' },
        { feature: '内存友好', supported: false, description: '需要大量 GPU 内存' },
        { feature: '训练速度快', supported: false, description: '训练时间长' },
        { feature: '存储空间小', supported: false, description: '需要存储完整模型' },
        { feature: '可组合性', supported: false, description: '难以组合多个模型' },
        { feature: '部署灵活', supported: false, description: '切换任务需要加载不同模型' }
      ]
    }
  ];

  const costAnalysis = [
    { scenario: '小型任务', lora: 50, full: 500 },
    { scenario: '中型任务', lora: 200, full: 2000 },
    { scenario: '大型任务', lora: 500, full: 8000 },
    { scenario: '超大型任务', lora: 1000, full: 20000 }
  ];

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          LoRA vs 传统全量微调对比
        </h3>
        <p className="text-gray-600">
          全面对比 LoRA 微调与传统全量微调的各项指标
        </p>
      </motion.div>

      {/* 核心指标对比 */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-6">核心指标对比</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-lg font-medium text-gray-700 mb-4">性能指标</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`${value}%`, name === 'lora' ? 'LoRA' : '全量微调']} />
                <Bar dataKey="lora" fill="#3B82F6" name="lora" />
                <Bar dataKey="full" fill="#EF4444" name="full" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div>
            <h5 className="text-lg font-medium text-gray-700 mb-4">参数分布</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {pieData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 特性对比表 */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-6">功能特性对比</h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="bg-white rounded-xl p-6 shadow-sm"
              initial={{ opacity: 0, x: categoryIndex === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + categoryIndex * 0.1 }}
            >
              <h5 className={`text-lg font-semibold mb-4 ${
                categoryIndex === 0 ? 'text-blue-600' : 'text-red-600'
              }`}>
                {category.category}
              </h5>
              
              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {item.supported ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <div className="font-medium text-gray-800">{item.feature}</div>
                      <div className="text-sm text-gray-600">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 成本分析 */}
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-6">训练成本对比</h4>
        
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costAnalysis}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, '']} />
              <Bar dataKey="lora" fill="#10B981" name="LoRA 微调" />
              <Bar dataKey="full" fill="#EF4444" name="全量微调" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Zap, title: '效率提升', value: '10-50×', desc: '训练效率提升' },
            { icon: Clock, title: '时间节省', value: '60-80%', desc: '训练时间缩短' },
            { icon: HardDrive, title: '存储节省', value: '95%+', desc: '模型存储空间' },
            { icon: DollarSign, title: '成本降低', value: '70-90%', desc: '总体训练成本' }
          ].map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                <div className="text-sm font-medium text-gray-700">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 总结 */}
      <motion.div
        className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0 }}
      >
        <h4 className="text-xl font-semibold mb-4">为什么选择 LoRA？</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-xl p-4">
            <h5 className="font-semibold mb-2">资源效率</h5>
            <p className="text-sm text-green-100">
              大幅降低计算和存储需求，让普通研发团队也能进行大模型微调
            </p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h5 className="font-semibold mb-2">灵活部署</h5>
            <p className="text-sm text-green-100">
              轻量级适配器易于管理和部署，支持快速任务切换
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvantageComparison;
