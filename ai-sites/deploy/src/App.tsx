import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import HomePage from './pages/HomePage';
import OllamaPage from './pages/OllamaPage';
import VLLMPage from './pages/VLLMPage';
import ComparisonPage from './pages/ComparisonPage';
import RecommendationPage from './pages/RecommendationPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ollama" element={<OllamaPage />} />
            <Route path="/vllm" element={<VLLMPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/recommendation" element={<RecommendationPage />} />
          </Routes>
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
