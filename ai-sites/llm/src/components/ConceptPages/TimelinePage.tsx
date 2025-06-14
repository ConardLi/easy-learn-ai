/**
 * LLM 发展历程页面
 * 展示大语言模型的发展时间线和重要里程碑
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Building, Globe, ArrowRight } from 'lucide-react';

const TimelinePage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2023');

  const timelineData = [
    {
      period: '2022.11',
      title: 'ChatGPT 时代开启',
      models: [
        { name: 'ChatGPT', company: 'OpenAI', type: 'closed', description: '基于 GPT-3.5，通过 RLHF 技术优化' }
      ]
    },
    {
      period: '2023.02',
      title: '开源模型涌现',
      models: [
        { name: 'LLaMA', company: 'Meta', type: 'open', description: '高效的基础大语言模型' },
        { name: 'MOSS', company: '复旦大学', type: 'open', description: '中文对话大语言模型' }
      ]
    },
    {
      period: '2023.03',
      title: '多模态突破',
      models: [
        { name: 'GPT-4', company: 'OpenAI', type: 'closed', description: '支持图像理解的多模态模型' },
        { name: 'Claude', company: 'Anthropic', type: 'closed', description: '注重安全性的对话模型' },
        { name: 'Alpaca', company: 'Stanford', type: 'open', description: '基于 LLaMA 的指令调优模型' },
        { name: 'ChatGLM', company: '智谱 AI', type: 'open', description: '支持中英双语的对话模型' }
      ]
    },
    {
      period: '2023.04-06',
      title: '产业化加速',
      models: [
        { name: '通义千问', company: '阿里巴巴', type: 'open', description: '多模态大语言模型' },
        { name: '文心一言', company: '百度', type: 'closed', description: '知识增强的大语言模型' },
        { name: '星火大模型', company: '科大讯飞', type: 'closed', description: '多模态认知智能大模型' }
      ]
    },
    {
      period: '2023.07-09',
      title: '技术深化',
      models: [
        { name: 'LLaMA 2', company: 'Meta', type: 'open', description: '更强大的开源基础模型' },
        { name: 'Claude 2', company: 'Anthropic', type: 'closed', description: '更长上下文的安全模型' },
        { name: '混元大模型', company: '腾讯', type: 'closed', description: '多领域应用的大语言模型' }
      ]
    },
    {
      period: '2023.11',
      title: '新兴力量',
      models: [
        { name: 'Grok', company: 'xAI', type: 'closed', description: '实时信息访问的大模型' },
        { name: 'Yi 系列', company: '零一万物', type: 'open', description: '高性能双语大语言模型' }
      ]
    }
  ];

  const stats = {
    total: 50,
    open: 28,
    closed: 22,
    chinese: 15
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              LLM 发展历程
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            回顾大语言模型从 ChatGPT 发布至今的快速发展历程和重要里程碑
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: '总计发布', value: `${stats.total}+`, icon: Globe, color: 'from-blue-500 to-cyan-500' },
            { label: '开源模型', value: `${stats.open}+`, icon: Users, color: 'from-green-500 to-emerald-500' },
            { label: '闭源模型', value: `${stats.closed}+`, icon: Building, color: 'from-purple-500 to-pink-500' },
            { label: '中文优化', value: `${stats.chinese}+`, icon: Calendar, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline */}
        <div className="space-y-12">
          {timelineData.map((period, periodIndex) => (
            <motion.div
              key={period.period}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: periodIndex * 0.1 }}
              className="relative"
            >
              {/* Timeline line */}
              {periodIndex < timelineData.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />
              )}
              
              {/* Period header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {period.period.split('.')[1] || period.period.slice(-2)}
                </div>
                <div className="ml-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {period.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {period.period}
                  </p>
                </div>
              </div>

              {/* Models grid */}
              <div className="ml-24 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {period.models.map((model, modelIndex) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: modelIndex * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">
                        {model.name}
                      </h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        model.type === 'open' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {model.type === 'open' ? '开源' : '闭源'}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">
                      {model.company}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {model.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">
            LLM 发展趋势
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '模型能力提升',
                description: '参数规模持续增长，多模态能力不断增强'
              },
              {
                title: '应用场景扩展',
                description: '从对话助手扩展到专业领域和垂直应用'
              },
              {
                title: '技术democratization',
                description: '开源模型和工具让更多人能够使用和研发 LLM'
              }
            ].map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-xl flex items-center justify-center">
                  <ArrowRight className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {trend.title}
                </h3>
                <p className="opacity-90 leading-relaxed">
                  {trend.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelinePage;
