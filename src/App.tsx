/**
 * 应用主组件
 * 配置路由和全局布局
 */

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AIKnowledge from './pages/AIKnowledge';
import AIKnowledgeDetail from './pages/AIKnowledgeDetail';
import AIApplication from './pages/AIApplication';
import AIDaily from './pages/AIDaily';
import AITutorial from './pages/AITutorial';
import AINavigation from './pages/AINavigation';
import AIPrompts from './pages/AIPrompts';
import KnowledgePlanet from './pages/KnowledgePlanet';
import { DailyDetail } from './components/daily/DailyDetail';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-knowledge" element={<AIKnowledge />} />
            <Route path="/ai-knowledge/:id" element={<AIKnowledgeDetail />} />
            <Route path="/ai-application" element={<AIApplication />} />
            <Route path="/ai-application/:id" element={<AIApplication />} />
            <Route path="/ai-daily" element={<AIDaily />} />
            <Route path="/ai-daily/:date" element={<DailyDetail />} />
            <Route path="/ai-tutorial" element={<AITutorial />} />
            <Route path="/ai-navigation" element={<AINavigation />} />
            <Route path="/ai-prompts" element={<AIPrompts />} />
            <Route path="/knowledge-planet" element={<KnowledgePlanet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
