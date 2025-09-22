/**
 * Function Calling 学习平台主组件
 * 整合所有学习模块，提供完整的学习体验
 */
import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import ConceptComparison from './ConceptComparison';
import WorkflowDemo from './WorkflowDemo';
import ApplicationScenarios from './ApplicationScenarios';
import KeyPoints from './KeyPoints';

const FunctionCallingLearner: React.FC = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <HeroSection />
        <ConceptComparison />
        <WorkflowDemo />
        <ApplicationScenarios />
        <KeyPoints />
      </motion.div>
    </div>
  );
};

export default FunctionCallingLearner;
