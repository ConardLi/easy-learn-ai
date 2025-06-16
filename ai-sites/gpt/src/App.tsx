import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'jotai';
import { useAtom } from 'jotai';
import Navigation from './components/Navigation';
import ConceptOverview from './components/ConceptOverview';
import ArchitectureVisualization from './components/ArchitectureVisualization';
import TrainingVisualization from './components/TrainingVisualization';
import EvolutionChart from './components/EvolutionChart';
import { learningProgressAtom } from './state/gptLearningState';

function GPTLearningPlatform() {
  const [progress, setProgress] = useAtom(learningProgressAtom);

  const handleSectionChange = (section: string) => {
    setProgress(prev => ({
      ...prev,
      currentSection: section
    }));
  };

  const handleConceptSelect = (conceptId: string) => {
    // 根据概念选择跳转到相应模块
    switch (conceptId) {
      case 'decoder-only':
        handleSectionChange('architecture');
        break;
      case 'causal-lm':
        handleSectionChange('training');
        break;
      case 'scaling':
        handleSectionChange('evolution');
        break;
      default:
        handleSectionChange('analysis');
    }
  };

  const renderCurrentSection = () => {
    switch (progress.currentSection) {
      case 'overview':
        return <ConceptOverview onConceptSelect={handleConceptSelect} />;
      case 'architecture':
        return <ArchitectureVisualization />;
      case 'training':
        return <TrainingVisualization />;
      case 'evolution':
        return <EvolutionChart />;
      case 'analysis':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">深度分析</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ArchitectureVisualization />
              <TrainingVisualization />
            </div>
          </div>
        );
      default:
        return <ConceptOverview onConceptSelect={handleConceptSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Navigation onSectionChange={handleSectionChange} />
        <main>
          {renderCurrentSection()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider>
      <Router>
        <GPTLearningPlatform />
      </Router>
    </Provider>
  );
}
