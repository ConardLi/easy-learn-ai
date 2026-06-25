import React from "react";
import {
  SectionHero,
  SectionThreeWords,
  SectionTwoRoutes,
  SectionProbabilityLab,
  SectionBetaDial,
  SectionTrainingDeck,
  SectionPitfalls,
  SectionChooseMethod,
} from "./components/DpoSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionHero />
    <SectionThreeWords />
    <SectionTwoRoutes />
    <SectionProbabilityLab />
    <SectionBetaDial />
    <SectionTrainingDeck />
    <SectionPitfalls />
    <SectionChooseMethod />
  </div>
);

export default App;
