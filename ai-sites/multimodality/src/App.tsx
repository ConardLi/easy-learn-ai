import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ConceptSection from './components/ConceptSection';
import TimelineSection from './components/TimelineSection';
import TechPrincipleSection from './components/TechPrincipleSection';
import ApplicationSection from './components/ApplicationSection';
import SummarySection from './components/SummarySection';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
        <ConceptSection />
        <TimelineSection />
        <TechPrincipleSection />
        <ApplicationSection />
        <SummarySection />
      </motion.main>
    </div>
  );
};

export default App;
