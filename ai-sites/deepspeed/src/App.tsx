import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ConceptPage } from './pages/ConceptPage';
import { DeepSpeedIntro } from './pages/DeepSpeedIntro';
import { StageComparison } from './pages/StageComparison';
import { CasePage } from './pages/CasePage';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/concept" element={<ConceptPage />} />
          <Route path="/deepspeed" element={<DeepSpeedIntro />} />
          <Route path="/stages" element={<StageComparison />} />
          <Route path="/case" element={<CasePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
