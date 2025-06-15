import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ConceptIntroduction from './components/ConceptIntroduction';
import LossVisualization from './components/LossVisualization';
import InteractiveDemo from './components/InteractiveDemo';
import GradientDescentAnimation from './components/GradientDescentAnimation';
import MistakesSection from './components/MistakesSection';

const LossLearningPlatform: React.FC = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'LOSS是什么', icon: '🎯' },
    { id: 'visualization', title: '动态图表', icon: '📊' },
    { id: 'interactive', title: '交互演示', icon: '🎮' },
    { id: 'animation', title: '梯度下降', icon: '⬇️' },
    { id: 'mistakes', title: '常见误区', icon: '⚠️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LOSS 学习平台
              </h1>
            </motion.div>
            
            <div className="flex space-x-1">
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="hidden sm:inline">{section.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeSection === 'intro' && <ConceptIntroduction />}
          {activeSection === 'visualization' && <LossVisualization />}
          {activeSection === 'interactive' && <InteractiveDemo />}
          {activeSection === 'animation' && <GradientDescentAnimation />}
          {activeSection === 'mistakes' && <MistakesSection />}
        </motion.div>
      </main>
    </div>
  );
};

export default LossLearningPlatform;
