import React from "react";
import {
  SectionBoundary,
  SectionInjectionVsJailbreak,
  SectionJailbreakHero,
  SectionRedTeam,
  SectionReviewerGame,
  SectionShapeShift,
  SectionThreshold,
} from "./components/JailbreakSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionJailbreakHero />
    <SectionBoundary />
    <SectionInjectionVsJailbreak />
    <SectionShapeShift />
    <SectionReviewerGame />
    <SectionThreshold />
    <SectionRedTeam />
  </div>
);

export default App;
