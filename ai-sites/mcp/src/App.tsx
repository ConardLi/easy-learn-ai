import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MCPLearningPlatform from './index';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MCPLearningPlatform />} />
      </Routes>
    </Router>
  );
};

export default App;
