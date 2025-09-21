/**
 * 页面头部组件
 * 包含标题、统计信息和视觉效果
 * 展示 AI 紫调配色和科技感设计
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { timelineDataAtom } from '../../store/timelineStore';

export const Header: React.FC = () => {
  const timelineData = useAtomValue(timelineDataAtom);

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-violet-800 to-pink-600 text-white">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 360, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4"
            >
              <BrainCircuit className="w-10 h-10 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-4">
              AI <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">关键节点</span> 时间线
            </h1>
            
            <p className="text-xl text-purple-200 max-w-2xl mx-auto leading-relaxed">
              探索人工智能发展的重要里程碑，见证科技改变世界的历程
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex items-center justify-center space-x-8 text-sm"
          >
            <div className="flex items-center space-x-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-pink-400 rounded-full"
              ></motion.div>
              <span>{timelineData.length || 156} 个重要事件</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-3 h-3 bg-purple-400 rounded-full"
              ></motion.div>
              <span>实时更新</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};
