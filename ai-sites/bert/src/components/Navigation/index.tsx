/**
 * 导航组件
 * 提供各个学习模块的快速切换功能
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Target, MessageSquare, Zap, BarChart3 } from 'lucide-react';

interface NavigationProps {
  sections: Array<{ id: string; title: string; component: React.ComponentType }>;
  currentSection: number;
  onSectionChange: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ sections, currentSection, onSectionChange }) => {
  const icons = [BookOpen, Brain, Target, MessageSquare, Zap, BarChart3];

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            BERT 学习平台
          </h1>
          
          <div className="flex space-x-2">
            {sections.map((section, index) => {
              const Icon = icons[index];
              const isActive = index === currentSection;
              
              return (
                <motion.button
                  key={section.id}
                  onClick={() => onSectionChange(index)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} />
                  <span className="hidden md:block">{section.title}</span>
                  
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-blue-500 rounded-lg -z-10"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
