/**
 * 导航组件 - 提供页面间的导航功能
 * 包含固定导航栏和当前页面高亮显示
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Clock, Cpu, GitBranch, Play, BarChart3 } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: '首页', icon: Brain },
    { path: '/timeline', label: '发展历程', icon: Clock },
    { path: '/tech', label: '核心技术', icon: Cpu },
    { path: '/algorithm', label: '算法对比', icon: GitBranch },
    { path: '/training', label: '训练流程', icon: Play },
    { path: '/results', label: '成果展示', icon: BarChart3 }
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DeepSeek R1 学习平台</span>
            </motion.div>
          </div>
          
          <div className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className={isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
