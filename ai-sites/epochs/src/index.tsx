import React from 'react';
import { ConceptIntro } from './components/ConceptIntro';
import { TrainingSimulator } from './components/TrainingSimulator';

export default function EpochsLearning() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <ConceptIntro />
        <TrainingSimulator />
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2024 机器学习概念学习工具 - 帮助理解训练轮数</p>
        </footer>
      </div>
    </div>
  );
}

export { EpochsLearning };
