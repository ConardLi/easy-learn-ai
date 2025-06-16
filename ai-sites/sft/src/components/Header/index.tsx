/**
 * 页面头部组件
 * 提供导航功能和网站标题
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Zap, Target } from 'lucide-react';

export function Header() {
  const navItems = [
    { name: '概念介绍', href: '#concept', icon: Brain },
    { name: '学习模块', href: '#modules', icon: BookOpen },
    { name: '深度要点', href: '#key-points', icon: Target },
    { name: '交互演示', href: '#demo', icon: Zap }
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-white">SFT 学习平台</h1>
          </motion.div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}