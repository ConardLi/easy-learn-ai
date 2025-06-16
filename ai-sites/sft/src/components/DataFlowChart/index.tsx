/**
 * 数据流程图组件
 * 展示SFT训练数据的流转过程
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DataFlowChart() {
  const [activeChart, setActiveChart] = useState('distribution');

  const taskDistribution = [
    { name: '文本生成', value: 45.6, color: '#3B82F6' },
    { name: '开放域问答', value: 12.4, color: '#10B981' },
    { name: '头脑风暴', value: 11.2, color: '#F59E0B' },
    { name: '聊天', value: 8.4, color: '#8B5CF6' },
    { name: '文本转写', value: 6.6, color: '#EF4444' },
    { name: '文本总结', value: 4.2, color: '#06B6D4' },
    { name: '其他', value: 11.6, color: '#6B7280' }
  ];

  const trainingProgress = [
    { epoch: 1, loss: 2.8, accuracy: 65 },
    { epoch: 2, loss: 2.1, accuracy: 72 },
    { epoch: 3, loss: 1.6, accuracy: 78 },
    { epoch: 4, loss: 1.2, accuracy: 83 },
    { epoch: 5, loss: 0.9, accuracy: 87 },
    { epoch: 6, loss: 0.7, accuracy: 90 }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            SFT 数据分析
          </h2>
          <p className="text-xl text-gray-600">
            深入了解训练数据的分布和效果
          </p>
        </motion.div>

        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveChart('distribution')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeChart === 'distribution'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            任务分布
          </button>
          <button
            onClick={() => setActiveChart('progress')}
            className={`px-6 py-3 rounded-full transition-all ${
              activeChart === 'progress'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            训练进展
          </button>
        </div>

        <motion.div
          key={activeChart}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-gray-50 rounded-2xl p-8"
        >
          {activeChart === 'distribution' ? (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  ChatGPT 指令类型分布
                </h3>
                <div className="space-y-3">
                  {taskDistribution.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-800">
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                SFT 训练进展曲线
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trainingProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="loss" fill="#EF4444" name="损失值" />
                    <Bar dataKey="accuracy" fill="#10B981" name="准确率%" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 text-center text-gray-600">
                随着训练轮次增加，模型损失降低，准确率提升
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
