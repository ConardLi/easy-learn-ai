/**
 * 网站导航组件
 * 提供各个章节之间的切换功能
 */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Settings, BarChart3, PlayCircle } from 'lucide-react';

interface NavigationProps {
  sections: Array<{ id: string; title: string; component: React.ComponentType }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ sections, activeSection, onSectionChange }) => {
  const getIcon = (id: string) => {
    const iconMap = {
      hero: BookOpen,
      concept: Brain,
      process: Settings,
      results: BarChart3,
      demo: PlayCircle,
    };
    const IconComponent = iconMap[id as keyof typeof iconMap] || BookOpen;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MGA</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Massive Genre-Audience 学习平台
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getIcon(section.id)}
                <span>{section.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;