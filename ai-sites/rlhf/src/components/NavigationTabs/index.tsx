/**
 * 导航标签组件
 * 提供各个学习模块之间的快速切换功能
 * 支持图标展示和激活状态指示
 */
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Section {
  id: number;
  title: string;
  icon: LucideIcon;
  component: React.ComponentType;
}

interface NavigationTabsProps {
  sections: Section[];
  activeSection: number;
  onSectionChange: (section: number) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({
  sections,
  activeSection,
  onSectionChange
}) => {
  return (
    <nav className="bg-white/70 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex gap-1 overflow-x-auto">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  relative flex items-center gap-3 px-6 py-4 text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-500'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                {section.title}
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationTabs;
