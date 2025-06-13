/**
 * 网站头部组件
 * 展示网站标题和简短描述
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
        >
          <BookOpen className="mr-4 h-12 w-12" />
          <TrendingUp className="h-12 w-12" />
        </motion.div>
        
        <motion.h1 
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          学习率学习中心
        </motion.h1>
        
        <motion.p 
          className="text-xl text-blue-100 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          通过交互式动画和图表，深入理解机器学习中最重要的超参数之一
        </motion.p>
      </div>
    </motion.header>
  );
};

export default Header;
