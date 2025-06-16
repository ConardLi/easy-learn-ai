/**
 * LoRA 学习平台主组件
 * 提供完整的 LoRA 概念学习体验，包含理论介绍、可视化演示、参数调整等功能
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Brain, Settings, TrendingUp, ArrowRight, ArrowLeft } from 'lucide-react';
import IntroSection from './components/IntroSection';
import PrincipleVisualization from './components/PrincipleVisualization';
import ParameterAdjustment from './components/ParameterAdjustment';
import AdvantageComparison from './components/AdvantageComparison';
import ApplicationScenarios from './components/ApplicationScenarios';

const LoRALearningPlatform: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 'intro', title: 'LoRA 简介', icon: BookOpen, component: IntroSection },
    { id: 'principle', title: '原理可视化', icon: Brain, component: PrincipleVisualization },
    { id: 'parameters', title: '参数调整', icon: Settings, component: ParameterAdjustment },
    { id: 'advantages', title: '优势对比', icon: TrendingUp, component: AdvantageComparison },
    { id: 'applications', title: '应用场景', icon: BookOpen, component: ApplicationScenarios }
  ];

  const CurrentComponent = sections[currentSection].component;

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航 */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LoRA 学习平台
              </h1>
            </motion.div>
            
            {/* 进度指示器 */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSection 
                        ? 'bg-blue-500 scale-125' 
                        : index < currentSection 
                          ? 'bg-green-400' 
                          : 'bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {currentSection + 1} / {sections.length}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* 侧边栏导航 */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  index === currentSection
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title={section.title}
              >
                <Icon className="w-5 h-5" />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 主要内容区域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-3xl shadow-2xl min-h-[80vh] overflow-hidden"
          layout
        >
          {/* 章节标题 */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={currentSection}
            >
              {React.createElement(sections[currentSection].icon, { 
                className: "w-8 h-8" 
              })}
              <div>
                <h2 className="text-3xl font-bold">{sections[currentSection].title}</h2>
                <p className="text-blue-100 mt-1">
                  第 {currentSection + 1} 章 · 共 {sections.length} 章
                </p>
              </div>
            </motion.div>
          </div>

          {/* 内容区域 */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentComponent />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 底部导航 */}
          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <motion.button
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentSection === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
              whileHover={currentSection > 0 ? { scale: 1.05 } : {}}
              whileTap={currentSection > 0 ? { scale: 0.95 } : {}}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>上一章</span>
            </motion.button>

            <div className="text-center">
              <p className="text-sm text-gray-500">学习进度</p>
              <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <motion.button
              onClick={nextSection}
              disabled={currentSection === sections.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentSection === sections.length - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg'
              }`}
              whileHover={currentSection < sections.length - 1 ? { scale: 1.05 } : {}}
              whileTap={currentSection < sections.length - 1 ? { scale: 0.95 } : {}}
            >
              <span>下一章</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoRALearningPlatform;
