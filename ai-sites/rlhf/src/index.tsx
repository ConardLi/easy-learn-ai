import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Brain, Users, Zap, Target, CheckCircle, AlertCircle } from 'lucide-react';
import ConceptOverview from './components/ConceptOverview';
import RLHFStages from './components/RLHFStages';
import PPOAnimation from './components/PPOAnimation';
import AdvantagesChallenges from './components/AdvantagesChallenges';
import NavigationTabs from './components/NavigationTabs';

const RLHFLearningPlatform: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);

  const sections = [
    { id: 0, title: '概念概览', icon: Brain, component: ConceptOverview },
    { id: 1, title: 'RLHF三阶段', icon: Target, component: RLHFStages },
    { id: 2, title: 'PPO训练详解', icon: Zap, component: PPOAnimation },
    { id: 3, title: '优势与挑战', icon: Users, component: AdvantagesChallenges },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm shadow-xl border-b border-blue-100"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.div 
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                RLHF 学习平台
              </h1>
              <p className="text-gray-600 mt-1">人类反馈强化学习 - 互动式学习体验</p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      {/* Navigation */}
      <NavigationTabs 
        sections={sections}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {React.createElement(sections[activeSection].component)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <motion.div 
          className="flex justify-between mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
            disabled={activeSection === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-gray-200 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            上一节
          </motion.button>

          <motion.button
            onClick={() => setActiveSection(Math.min(sections.length - 1, activeSection + 1))}
            disabled={activeSection === sections.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            下一节
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white/50 backdrop-blur-sm border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600">
          <p>🎓 通过互动式学习，深入理解RLHF技术原理</p>
        </div>
      </footer>
    </div>
  );
};

export default RLHFLearningPlatform;
