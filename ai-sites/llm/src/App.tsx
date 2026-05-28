import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import DefinitionPage from "./components/ConceptPages/DefinitionPage";
import AbilitiesPage from "./components/ConceptPages/AbilitiesPage";
import FeaturesPage from "./components/ConceptPages/FeaturesPage";
import TimelinePage from "./components/ConceptPages/TimelinePage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-cream text-ink">
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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#FFFFFF",
              color: "#241C15",
              border: "2px solid #241C15",
              borderRadius: "12px",
              boxShadow: "4px 4px 0 0 #241C15",
              fontWeight: 600,
              fontSize: "13px",
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;
