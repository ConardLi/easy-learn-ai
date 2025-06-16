/**
 * NLP任务展示组件
 * 包含各种NLP任务的交互式演示
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SegmentationDemo from './SegmentationDemo';
import ClassificationDemo from './ClassificationDemo';
import NERDemo from './NERDemo';
import TranslationDemo from './TranslationDemo';

const Tasks: React.FC = () => {
  const [activeTask, setActiveTask] = useState('segmentation');

  const tasks = [
    { id: 'segmentation', label: '中文分词', component: SegmentationDemo },
    { id: 'classification', label: '文本分类', component: ClassificationDemo },
    { id: 'ner', label: '实体识别', component: NERDemo },
    { id: 'translation', label: '机器翻译', component: TranslationDemo }
  ];

  const ActiveComponent = tasks.find(task => task.id === activeTask)?.component || SegmentationDemo;

  return (
    <div className="space-y-8">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          NLP 核心任务
        </h2>
        <p className="text-xl text-gray-600">
          体验不同的自然语言处理任务
        </p>
      </motion.div>

      {/* 任务选择器 */}
      <div className="flex flex-wrap justify-center gap-4">
        {tasks.map((task, index) => (
          <motion.button
            key={task.id}
            onClick={() => setActiveTask(task.id)}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTask === task.id
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-white/70 text-gray-600 hover:bg-white shadow-md'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {task.label}
          </motion.button>
        ))}
      </div>

      {/* 任务演示区域 */}
      <motion.div
        key={activeTask}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ActiveComponent />
      </motion.div>
    </div>
  );
};

export default Tasks;
