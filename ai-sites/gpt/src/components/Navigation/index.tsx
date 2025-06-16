/**
 * 导航组件
 * 提供网站主要模块的导航功能，展示学习进度
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, BarChart3, Clock, Settings } from 'lucide-react';
import { useAtom } from 'jotai';
import { learningProgressAtom } from '../../state/gptLearningState';

const navigationItems = [
  { id: 'overview', title: '概览', icon: BookOpen, color: 'bg-blue-500' },
  { id: 'architecture', title: 'GPT 架构', icon: Brain, color: 'bg-purple-500' },
  { id: 'training', title: '预训练过程', icon: Settings, color: 'bg-green-500' },
  { id: 'evolution', title: '发展历程', icon: Clock, color: 'bg-orange-500' },
  { id: 'analysis', title: '深度分析', icon: BarChart3, color: 'bg-red-500' }
];

interface NavigationProps {
  onSectionChange: (section: string) => void;
}

export default function Navigation({ onSectionChange }: NavigationProps) {
  const [progress] = useAtom(learningProgressAtom);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          GPT 概念学习平台
        </h1>
        <div className="flex items-center space-x-2">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(progress.completedConcepts.length / progress.totalConcepts) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {progress.completedConcepts.length}/{progress.totalConcepts}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {navigationItems.map((item, index) => {
          const IconComponent = item.icon;
          const isActive = progress.currentSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`relative p-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 ${item.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-sm font-medium text-gray-800 text-center">{item.title}</h3>
              
              {isActive && (
                <motion.div
                  className="absolute inset-0 border-2 border-blue-400 rounded-xl"
                  layoutId="activeSection"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}