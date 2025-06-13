import React, { useState } from 'react';
import ConceptIntro from './components/ConceptIntro';
import InteractiveDemo from './components/InteractiveDemo';
import BatchVisualization from './components/BatchVisualization';
import MemoryUsage from './components/MemoryUsage';
import GradientAccumulation from './components/GradientAccumulation';

const BatchSizeLearning: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [perDeviceBatchSize, setPerDeviceBatchSize] = useState<number>(2);
  const [gradientAccumulationSteps, setGradientAccumulationSteps] = useState<number>(4);

  const tabs = [
    { id: 'intro', name: '概念介绍', icon: '📚' },
    { id: 'demo', name: '交互演示', icon: '🎮' },
    { id: 'visualization', name: '批量可视化', icon: '📊' },
    { id: 'memory', name: '显存分析', icon: '💾' },
    { id: 'gradient', name: '梯度累积', icon: '⚡' }
  ];

  const effectiveBatchSize = perDeviceBatchSize * gradientAccumulationSteps;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              批量大小学习平台
            </h1>
            <p className="text-gray-600 text-lg">
              深入理解机器学习中的Batch Size概念
            </p>
            <div className="mt-4 bg-blue-100 rounded-lg p-3 inline-block">
              <span className="text-blue-800 font-semibold">
                当前有效批量大小: {effectiveBatchSize} = {perDeviceBatchSize} × {gradientAccumulationSteps}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-white shadow-lg text-blue-600 scale-105 transform'
                  : 'bg-white/60 text-gray-600 hover:bg-white/80 hover:shadow-md'
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {activeTab === 'intro' && <ConceptIntro />}
        
        {activeTab === 'demo' && (
          <InteractiveDemo
            perDeviceBatchSize={perDeviceBatchSize}
            setPerDeviceBatchSize={setPerDeviceBatchSize}
            gradientAccumulationSteps={gradientAccumulationSteps}
            setGradientAccumulationSteps={setGradientAccumulationSteps}
          />
        )}
        
        {activeTab === 'visualization' && (
          <BatchVisualization
            perDeviceBatchSize={perDeviceBatchSize}
            gradientAccumulationSteps={gradientAccumulationSteps}
          />
        )}
        
        {activeTab === 'memory' && (
          <MemoryUsage
            perDeviceBatchSize={perDeviceBatchSize}
            gradientAccumulationSteps={gradientAccumulationSteps}
          />
        )}
        
        {activeTab === 'gradient' && (
          <GradientAccumulation
            perDeviceBatchSize={perDeviceBatchSize}
            gradientAccumulationSteps={gradientAccumulationSteps}
          />
        )}
      </div>
    </div>
  );
};

export default BatchSizeLearning;
