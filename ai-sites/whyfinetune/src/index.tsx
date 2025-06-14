/**
 * 主组件 - 整合所有功能模块
 * 根据导航状态显示不同的页面内容
 */
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { activeNavigationAtom } from './stores/navigationState';
import Header from './components/Header';
import Hero from './components/Hero';
import ConceptCards from './components/ConceptCards';
import ComparisonChart from './components/ComparisonChart';
import DetailComparison from './components/DetailComparison';

const AILearningPlatform: React.FC = () => {
  const [activeSection] = useAtom(activeNavigationAtom);

  useEffect(() => {
    // 平滑滚动到对应部分
    const sectionElements = {
      home: document.getElementById('home-section'),
      concepts: document.getElementById('concepts-section'),
      comparison: document.getElementById('comparison-section'),
    };

    const targetElement = sectionElements[activeSection as keyof typeof sectionElements];
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [activeSection]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={activeSection}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {activeSection === 'home' && (
            <div id="home-section">
              <Hero />
              <ConceptCards />
            </div>
          )}
          
          {activeSection === 'concepts' && (
            <div id="concepts-section" className="pt-20">
              <ConceptCards />
            </div>
          )}
          
          {activeSection === 'comparison' && (
            <div id="comparison-section" className="pt-20">
              <ComparisonChart />
              <DetailComparison />
            </div>
          )}
        </motion.main>
      </AnimatePresence>

      {/* 回到顶部按钮 */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default AILearningPlatform;
