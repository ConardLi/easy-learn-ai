import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DailyList } from './components/DailyList';
import { DailyDetail } from './components/DailyDetail';

const AppContent: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DailyList />} />
        <Route path="/daily/:date" element={<DailyDetail />} />
      </Routes>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;