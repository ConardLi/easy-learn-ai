/**
 * BERT学习平台主入口组件
 * 提供完整的BERT概念学习体验，包括模型架构、预训练任务等可视化演示
 */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import BertOverview from './components/BertOverview';
import ModelArchitecture from './components/ModelArchitecture';
import MLMDemo from './components/MLMDemo';
import NSPDemo from './components/NSPDemo';
import TrainingProcess from './components/TrainingProcess';
import ModelComparison from './components/ModelComparison';
import Navigation from './components/Navigation';

const BertLearningPlatform: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 'overview', title: 'BERT概述', component: BertOverview },
    { id: 'architecture', title: '模型架构', component: ModelArchitecture },
    { id: 'mlm', title: 'MLM任务', component: MLMDemo },
    { id: 'nsp', title: 'NSP任务', component: NSPDemo },
    { id: 'training', title: '训练过程', component: TrainingProcess },
    { id: 'comparison', title: '模型对比', component: ModelComparison },
  ];

  const CurrentComponent = sections[currentSection].component;

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Toaster position="top-right" />
        
        {/* 顶部导航 */}
        <Navigation 
          sections={sections}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />

        {/* 主内容区域 */}
        <main className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <CurrentComponent />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 底部导航按钮 */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-4 bg-white/80 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg">
            <button
              onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
              disabled={currentSection === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all"
            >
              上一步
            </button>
            <span className="px-4 py-2 text-gray-600">
              {currentSection + 1} / {sections.length}
            </span>
            <button
              onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
              disabled={currentSection === sections.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-full disabled:bg-gray-300 hover:bg-blue-600 transition-all"
            >
              下一步
            </button>
          </div>
        </div>
      </div>
    </NextUIProvider>
  );
};

export default BertLearningPlatform;
