import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import DefinitionPage from './components/ConceptPages/DefinitionPage';
import AbilitiesPage from './components/ConceptPages/AbilitiesPage';
import FeaturesPage from './components/ConceptPages/FeaturesPage';
import TimelinePage from './components/ConceptPages/TimelinePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navigation />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/definition" element={<DefinitionPage />} />
            <Route path="/abilities" element={<AbilitiesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
          </Routes>
        </main>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
