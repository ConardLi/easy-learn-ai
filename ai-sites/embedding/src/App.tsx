import React from "react";
import SectionMeaningMap from "./components/SectionMeaningMap";
import SectionNeighborLinks from "./components/SectionNeighborLinks";
import SectionOpening from "./components/SectionOpening";
import SectionRagWalkthrough from "./components/SectionRagWalkthrough";
import SectionSimilarity from "./components/SectionSimilarity";
import SectionUseCases from "./components/SectionUseCases";
import SectionWhereItFails from "./components/SectionWhereItFails";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionMeaningMap />
      <SectionSimilarity />
      <SectionRagWalkthrough />
      <SectionWhereItFails />
      <SectionUseCases />
      <SectionNeighborLinks />
    </div>
  );
};

export default App;
