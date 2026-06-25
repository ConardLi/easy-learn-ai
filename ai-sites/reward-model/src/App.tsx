import React from "react";
import {
  SectionHero,
  SectionHumanLabels,
  SectionScoreGap,
  SectionTrainingLoop,
  SectionScoreMeaning,
  SectionBiasLab,
  SectionWhereUsed,
} from "./components/RewardModelSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionHero />
    <SectionHumanLabels />
    <SectionScoreGap />
    <SectionTrainingLoop />
    <SectionScoreMeaning />
    <SectionBiasLab />
    <SectionWhereUsed />
  </div>
);

export default App;
