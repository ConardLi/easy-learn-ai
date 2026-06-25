import React from "react";
import {
  SectionBuildIndex,
  SectionChooseSearch,
  SectionCommunityReports,
  SectionGraphRagHero,
  SectionLocalWalk,
  SectionRagBlindSpot,
  SectionTradeoffs,
} from "./components/GraphRagSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionGraphRagHero />
    <SectionRagBlindSpot />
    <SectionBuildIndex />
    <SectionCommunityReports />
    <SectionLocalWalk />
    <SectionChooseSearch />
    <SectionTradeoffs />
  </div>
);

export default App;
