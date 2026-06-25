import React from "react";
import {
  SectionAttentionHero,
  SectionSameWord,
  SectionQkvNames,
  SectionWeightMixer,
  SectionTwoSources,
  SectionLimits,
  SectionAttentionNext,
} from "./components/AttentionSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionAttentionHero />
    <SectionSameWord />
    <SectionQkvNames />
    <SectionWeightMixer />
    <SectionTwoSources />
    <SectionLimits />
    <SectionAttentionNext />
  </div>
);

export default App;
