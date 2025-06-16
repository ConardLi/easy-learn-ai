import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ConceptPage from './pages/ConceptPage';
import FeaturesPage from './pages/FeaturesPage';
import StructurePage from './pages/StructurePage';
import QuantizationPage from './pages/QuantizationPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ComparisonPage from './pages/ComparisonPage';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concept" element={<ConceptPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/structure" element={<StructurePage />} />
          <Route path="/quantization" element={<QuantizationPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/comparison" element={<ComparisonPage />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
