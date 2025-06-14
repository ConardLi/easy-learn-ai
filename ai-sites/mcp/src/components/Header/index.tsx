/**
 * 网站头部组件
 * 展示网站标题、副标题和简要说明
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Cpu, Network } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center items-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex space-x-4"
            >
              <div className="p-3 bg-white/20 rounded-full">
                <Cpu className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <Network className="w-8 h-8" />
              </div>
              <div className="p-3 bg-white/20 rounded-full">
                <BookOpen className="w-8 h-8" />
              </div>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
          >
            MCP 学习平台
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl md:text-2xl mb-6 text-blue-100"
          >
            Model Context Protocol 完整学习指南
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-lg text-blue-50">
              通过交互式动画和图表，深入理解 AI 模型与外部资源交互的标准协议
            </p>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
