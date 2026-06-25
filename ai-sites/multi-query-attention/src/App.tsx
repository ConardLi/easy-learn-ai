import React from "react";
import {
  SectionMqaHero,
  SectionStructureSwitch,
  SectionDecodeWalk,
  SectionCacheCalculator,
  SectionTradeoff,
  SectionMqaNext,
} from "./components/MqaSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionMqaHero />
    <SectionStructureSwitch />
    <SectionDecodeWalk />
    <SectionCacheCalculator />
    <SectionTradeoff />
    <SectionMqaNext />
  </div>
);
export default App;
