/**
 * 页面底部组件
 * 展示网站信息和更新状态
 * 保持与整体设计风格的一致性
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-12 h-12 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4"
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">持续更新中</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              本时间线将持续记录人工智能领域的最新突破和重要事件，
              帮助大家更好地了解 AI 技术的发展脉络。
            </p>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">
              数据来源：公开资料整理 | 最后更新：2024年
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
