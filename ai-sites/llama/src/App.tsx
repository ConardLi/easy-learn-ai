import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './components/HomePage';
import ArchitectureView from './components/ArchitectureView';
import DataFlowAnimation from './components/DataFlowAnimation';
import EvolutionTimeline from './components/EvolutionTimeline';
import ParameterComparison from './components/ParameterComparison';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/architecture" element={<ArchitectureView />} />
            <Route path="/dataflow" element={<DataFlowAnimation />} />
            <Route path="/evolution" element={<EvolutionTimeline />} />
            <Route path="/comparison" element={<ParameterComparison />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
