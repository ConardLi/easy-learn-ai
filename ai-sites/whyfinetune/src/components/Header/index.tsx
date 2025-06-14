/**
 * 网站头部导航组件
 * 提供主要的导航功能和网站标题
 */
import React from 'react';
import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { activeNavigationAtom, NavigationSection } from '../../stores/navigationState';
import { Brain, BookOpen, Database, Zap } from 'lucide-react';

const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useAtom(activeNavigationAtom);

  const navigationItems = [
    { id: 'home' as NavigationSection, label: '首页', icon: Brain },
    { id: 'concepts' as NavigationSection, label: '三大概念', icon: BookOpen },
    { id: 'comparison' as NavigationSection, label: '对比分析', icon: Database },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI学习助手</h1>
              <p className="text-blue-100 text-sm">为什么要微调？</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-white text-blue-600 shadow-lg'
                      : 'text-white hover:bg-white/20'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
