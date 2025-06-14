import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import FineTuningDemo from './index';
import { FullParameterPage } from './pages/FullParameterPage';
import { FreezePage } from './pages/FreezePage';
import { LoRAPage } from './pages/LoRAPage';
import { Navigation } from './components/Navigation';
import EnhancedVisualizationPage from './pages/EnhancedVisualizationPage';

/**
 * 应用入口组件，设置路由和页面布局
 */
const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<FineTuningDemo />} />
          <Route path="/full-parameter" element={<FullParameterPage />} />
          <Route path="/freeze" element={<FreezePage />} />
          <Route path="/lora" element={<LoRAPage />} />
          <Route path="/enhanced-visualization" element={<EnhancedVisualizationPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;