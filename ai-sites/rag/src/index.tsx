/**
 * RAG学习网站主组件
 * 整合所有学习模块，提供完整的RAG概念学习体验
 */
import React from 'react';
import { useAtom } from 'jotai';
import { currentStageAtom } from './store/ragStore';
import Header from './components/Header';
import Overview from './components/Overview';
import WorkflowDemo from './components/WorkflowDemo';
import Architecture from './components/Architecture';
import InteractiveSimulation from './components/InteractiveSimulation';
import Summary from './components/Summary';
import { Toaster } from 'react-hot-toast';

const RAGLearningPlatform: React.FC = () => {
  const [currentStage] = useAtom(currentStageAtom);

  const renderCurrentStage = () => {
    switch (currentStage) {
      case 'overview':
        return <Overview />;
      case 'workflow':
        return <WorkflowDemo />;
      case 'architecture':
        return <Architecture />;
      case 'simulation':
        return <InteractiveSimulation />;
      case 'summary':
        return <Summary />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="pb-8">
        {renderCurrentStage()}
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

export default RAGLearningPlatform;
