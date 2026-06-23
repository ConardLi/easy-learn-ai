import React from "react";
import SectionOpening from "./components/SectionOpening";
import SectionRecallMess from "./components/SectionRecallMess";
import SectionRecallLab from "./components/SectionRecallLab";
import SectionRerankDesk from "./components/SectionRerankDesk";
import SectionPipeline from "./components/SectionPipeline";
import SectionTuning from "./components/SectionTuning";
import SectionPitfalls from "./components/SectionPitfalls";
import SectionNeighborLinks from "./components/SectionNeighborLinks";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionRecallMess />
      <SectionRecallLab />
      <SectionRerankDesk />
      <SectionPipeline />
      <SectionTuning />
      <SectionPitfalls />
      <SectionNeighborLinks />
    </div>
  );
};

export default App;
