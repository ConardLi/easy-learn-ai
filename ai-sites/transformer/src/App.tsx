import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import ChapterIntroduction from './components/ChapterPages/ChapterIntroduction';
import ChapterPrediction from './components/ChapterPages/ChapterPrediction';
import ChapterComponents from './components/ChapterPages/ChapterComponents';
import ChapterAdvantages from './components/ChapterPages/ChapterAdvantages';
import ChapterToLLM from './components/ChapterPages/ChapterToLLM';
import InteractiveDemo from './components/InteractiveDemo';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/introduction" element={<ChapterIntroduction />} />
              <Route path="/prediction" element={<ChapterPrediction />} />
              <Route path="/components" element={<ChapterComponents />} />
              <Route path="/advantages" element={<ChapterAdvantages />} />
              <Route path="/to-llm" element={<ChapterToLLM />} />
              <Route path="/demo" element={<InteractiveDemo />} />
            </Routes>
          </Layout>
          <Toaster position="top-center" />
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
