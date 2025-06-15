/**
 * MGA学习网站主组件
 * 负责整体布局和页面路由管理
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ConceptSection from './components/ConceptSection';
import ProcessSection from './components/ProcessSection';
import ResultsSection from './components/ResultsSection';
import InteractiveDemo from './components/InteractiveDemo';
import Navigation from './components/Navigation';

const MGALearningWebsite: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', title: '首页', component: Hero },
    { id: 'concept', title: '核心概念', component: ConceptSection },
    { id: 'process', title: '技术实现', component: ProcessSection },
    { id: 'results', title: '效果展示', component: ResultsSection },
    { id: 'demo', title: '交互演示', component: InteractiveDemo },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || Hero;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navigation 
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className="pt-20">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveComponent />
        </motion.div>
      </main>
    </div>
  );
};

export default MGALearningWebsite;
