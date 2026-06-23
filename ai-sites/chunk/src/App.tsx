import React from "react";
import SectionNeighborLinks from "./components/SectionNeighborLinks";
import SectionOpening from "./components/SectionOpening";
import SectionOverlap from "./components/SectionOverlap";
import SectionPlaybook from "./components/SectionPlaybook";
import SectionRetrieval from "./components/SectionRetrieval";
import SectionSliceLab from "./components/SectionSliceLab";
import SectionWhyCut from "./components/SectionWhyCut";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionWhyCut />
      <SectionSliceLab />
      <SectionOverlap />
      <SectionRetrieval />
      <SectionPlaybook />
      <SectionNeighborLinks />
    </div>
  );
};

export default App;
