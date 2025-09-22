/**
 * 时间线页面组件 - 展示大语言模型发展历程
 * 从预训练时代到强化学习后训练的演进过程
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, Brain, Zap, Globe, Star } from 'lucide-react';

const TimelinePage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const timelineEvents = [
    {
      date: '2017-2023',
      title: '预训练时代',
      subtitle: '性能提升但增长放缓',
      description: '大语言模型主要通过预训练提升性能，但面临增长瓶颈，GPT-5迟迟未能实现跨越式突破。',
      icon: Brain,
      color: 'bg-gray-100 border-gray-300',
      details: [
        '模型主要依靠规模扩展提升性能',
        '计算成本不断攀升',
        '性能提升边际效应递减',
        '缺乏推理能力的质的飞跃'
      ]
    },
    {
      date: '2024年9月',
      title: 'OpenAI o1 发布',
      subtitle: '强化学习后训练新范式',
      description: 'OpenAI 发布 o1 模型，首次证明强化学习后训练可以显著提升模型推理能力，在数学和编程任务上表现优异。',
      icon: Zap,
      color: 'bg-yellow-100 border-yellow-300',
      details: [
        '引入思维链推理机制',
        '在数学、编程任务上屠榜',
        '证明强化学习后训练的有效性',
        '但技术细节保密，价格昂贵'
      ]
    },
    {
      date: '2024年12月',
      title: 'o1 正式推出',
      subtitle: '高价格限制普及',
      description: 'o1 正式版发布，但200美元/月的高价格让普通用户难以接触，技术细节依然神秘。',
      icon: Globe,
      color: 'bg-orange-100 border-orange-300',
      details: [
        'o1 正式版上线',
        '月费200美元，普通用户难以承受',
        '技术实现细节不公开',
        '应用场景受限于成本'
      ]
    },
    {
      date: '2025年1月',
      title: 'DeepSeek R1 横空出世',
      subtitle: '开源免费的强推理模型',
      description: 'DeepSeek 发布 R1 模型，性能逼近 o1，完全免费开放使用，并公开技术路线，引发全球AI界震动。',
      icon: Star,
      color: 'bg-blue-100 border-blue-300',
      details: [
        '性能媲美 OpenAI o1',
        '完全免费向全民开放',
        '公开完整技术路线',
        '中文语境下表现更优',
        '显著降低推理成本'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          大语言模型发展历程
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          从预训练时代的缓慢发展，到强化学习后训练的革命性突破
        </p>
      </motion.div>

      <div className="relative">
        {/* 时间线主轴 */}
        <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-gray-300 via-blue-400 to-blue-600"></div>

        {/* 时间线事件 */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const Icon = event.icon;
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
                className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}
              >
                {/* 时间线节点 */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* 事件卡片 */}
                <motion.div
                  className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className={`${event.color} rounded-xl p-6 shadow-lg cursor-pointer border-2 transition-all hover:shadow-xl`}
                    onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-white rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm font-medium text-blue-600 mb-3">
                      {event.subtitle}
                    </p>
                    <p className="text-gray-700 mb-4">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <span>点击查看详情</span>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 详情弹窗 */}
      <AnimatePresence>
        {selectedEvent !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {timelineEvents[selectedEvent].title}
              </h3>
              <ul className="space-y-2">
                {timelineEvents[selectedEvent].details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedEvent(null)}
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                关闭
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelinePage;
