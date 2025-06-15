import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CasesPage from './pages/CasesPage';
import CausesPage from './pages/CausesPage';
import SolutionsPage from './pages/SolutionsPage';
import QuizPage from './pages/QuizPage';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
          <Navbar />
          <main className="pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/causes" element={<CausesPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/quiz" element={<QuizPage />} />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
