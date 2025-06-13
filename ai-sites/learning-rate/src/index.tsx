import React from 'react';
import Header from './components/Header';
import ConceptIntro from './components/ConceptIntro';
import InteractiveLearningRate from './components/InteractiveLearningRate';
import AnalogySections from './components/AnalogySections';
import RecommendationSection from './components/RecommendationSection';

const LearningRateDemo: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <ConceptIntro />
        <InteractiveLearningRate />
        <AnalogySections />
        <RecommendationSection />
      </main>
    </div>
  );
};

export default LearningRateDemo;
