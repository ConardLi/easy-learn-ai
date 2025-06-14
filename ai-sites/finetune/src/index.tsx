import React from 'react';
import { ModelVisualization } from './components/ModelVisualization';
import { MethodFeatures } from './components/MethodFeatures';
import { ComparisonTable } from './components/ComparisonTable';
import { TechniqueDetails } from './components/TechniqueDetails';

/**
 * 主组件，用于展示三种微调方法的特点
 */
const FineTuningDemo: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">深度学习模型微调技术</h1>
        <p className="text-center mt-2 opacity-90">探索三种主流微调方法: Full Parameter Fine-tuning、Freeze 和 LoRA</p>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">三种微调方法概览</h2>
          <MethodFeatures />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">微调技术可视化演示</h2>
          <ModelVisualization />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">详细技术说明</h2>
          <TechniqueDetails />
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">微调方法比较</h2>
          <ComparisonTable />
        </section>
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2023 深度学习微调技术演示网站</p>
      </footer>
    </div>
  );
};

export default FineTuningDemo;
