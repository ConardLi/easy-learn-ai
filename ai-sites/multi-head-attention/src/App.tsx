import React from "react";
import {
  SectionHeadsHero,
  SectionRelationLenses,
  SectionParallelFlow,
  SectionHeadWidth,
  SectionHeadReality,
  SectionHeadsNext,
} from "./components/MultiHeadSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionHeadsHero />
    <SectionRelationLenses />
    <SectionParallelFlow />
    <SectionHeadWidth />
    <SectionHeadReality />
    <SectionHeadsNext />
  </div>
);
export default App;
