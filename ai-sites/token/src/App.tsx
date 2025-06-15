import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Home from './pages/Home';
import BasicConcepts from './pages/BasicConcepts';
import Importance from './pages/Importance';
import CoreProcess from './pages/CoreProcess';
import BPEAlgorithm from './pages/BPEAlgorithm';
import PracticalDemo from './pages/PracticalDemo';
import Comparison from './pages/Comparison';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/basic-concepts" element={<BasicConcepts />} />
            <Route path="/importance" element={<Importance />} />
            <Route path="/core-process" element={<CoreProcess />} />
            <Route path="/bpe-algorithm" element={<BPEAlgorithm />} />
            <Route path="/practical-demo" element={<PracticalDemo />} />
            <Route path="/comparison" element={<Comparison />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
};

export default App;
