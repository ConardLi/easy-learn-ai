import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TimelinePage from './pages/TimelinePage';
import TechPage from './pages/TechPage';
import AlgorithmPage from './pages/AlgorithmPage';
import TrainingPage from './pages/TrainingPage';
import ResultsPage from './pages/ResultsPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/tech" element={<TechPage />} />
          <Route path="/algorithm" element={<AlgorithmPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
