/**
 * Agent学习网站主组件
 * 整合所有学习模块，提供完整的Agent概念学习体验
 */
import React, { useRef } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import CoreCapabilities from './components/CoreCapabilities';
import AgentTypes from './components/AgentTypes';
import Architecture from './components/Architecture';

export default function AgentLearningCenter() {
  const heroRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      hero: heroRef,
      comparison: comparisonRef,
      capabilities: capabilitiesRef,
      types: typesRef,
      architecture: architectureRef
    };

    const targetRef = refs[section];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleStartLearning = () => {
    scrollToSection('comparison');
  };

  return (
    <NextUIProvider>
      <div className="min-h-screen bg-gray-50">
        <Header onNavigate={scrollToSection} />
        
        <main>
          <div ref={heroRef}>
            <Hero onStartLearning={handleStartLearning} />
          </div>
          
          <div ref={comparisonRef}>
            <Comparison />
          </div>
          
          <div ref={capabilitiesRef}>
            <CoreCapabilities />
          </div>
          
          <div ref={typesRef}>
            <AgentTypes />
          </div>
          
          <div ref={architectureRef}>
            <Architecture />
          </div>
        </main>

        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-2xl font-bold mb-4">开始你的 Agent 开发之旅</h3>
            <p className="text-gray-300 mb-6">
              掌握了这些核心概念，你就可以开始构建属于自己的智能Agent了！
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                查看更多资源
              </button>
              <button className="border border-gray-400 hover:border-white text-gray-300 hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                实战教程
              </button>
            </div>
          </div>
        </footer>
      </div>
    </NextUIProvider>
  );
}

export { AgentLearningCenter };
