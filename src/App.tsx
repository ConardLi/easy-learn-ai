/**
 * 应用主组件
 * 配置路由和全局布局
 */

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AIKnowledge from "./pages/AIKnowledge";
import AIKnowledgeDetail from "./pages/AIKnowledgeDetail";
import AIApplication from "./pages/AIApplication";
import AIDaily from "./pages/AIDaily";
import AITutorial from "./pages/AITutorial";
import AIModel from "./pages/AIModel";
import KnowledgePlanet from "./pages/KnowledgePlanet";
import AIBenchmark from "./pages/AIBenchmark";
import AIPrompts from "./pages/AIPrompts";
import PromptMethodology from "./pages/PromptMethodology";
import AIPromptDetail from "./pages/AIPromptDetail";
import { DailyDetail } from "./components/daily/DailyDetail";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white text-ink">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-knowledge" element={<AIKnowledge />} />
            <Route path="/ai-knowledge/:id" element={<AIKnowledgeDetail />} />
            <Route path="/ai-prompts" element={<AIPrompts />} />
            <Route path="/ai-prompts/methodology" element={<PromptMethodology />} />
            <Route path="/ai-prompts/:id" element={<AIPromptDetail />} />
            <Route path="/ai-application" element={<AIApplication />} />
            <Route path="/ai-application/:id" element={<AIApplication />} />
            <Route path="/ai-daily" element={<AIDaily />} />
            <Route path="/ai-daily/:date" element={<DailyDetail />} />
            <Route path="/ai-model" element={<AIModel />} />
            <Route path="/ai-tutorial" element={<AITutorial />} />
            <Route path="/ai-benchmark" element={<AIBenchmark />} />
            <Route path="/knowledge-planet" element={<KnowledgePlanet />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
