/**
 * 主页面组件
 * 整合所有功能模块，提供完整的SFT学习体验
 */
import React from 'react';
import { Header } from './components/Header';
import { ConceptSection } from './components/ConceptSection';
import { LearningModules } from './components/LearningModules';
import { KeyLearningPoints } from './components/KeyLearningPoints';
import { InteractiveDemo } from './components/InteractiveDemo';
import { DataFlowChart } from './components/DataFlowChart';
import { Footer } from './components/Footer';

export default function SFTLearningPlatform() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ConceptSection />
      <LearningModules />
      <KeyLearningPoints />
      <InteractiveDemo />
      <DataFlowChart />
      <Footer />
    </div>
  );
}

export { SFTLearningPlatform };