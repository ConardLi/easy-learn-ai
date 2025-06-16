import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Evolution from './pages/Evolution';
import Principles from './pages/Principles';
import Scale from './pages/Scale';
import Process from './pages/Process';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evolution" element={<Evolution />} />
            <Route path="/principles" element={<Principles />} />
            <Route path="/scale" element={<Scale />} />
            <Route path="/process" element={<Process />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
