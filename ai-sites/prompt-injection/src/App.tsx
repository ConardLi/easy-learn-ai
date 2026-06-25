import React from "react";
import {
  SectionAttackChain,
  SectionDefenseBuilder,
  SectionInjectionEntrances,
  SectionInjectionHero,
  SectionInjectionLab,
  SectionInjectionLimits,
  SectionTrustSort,
} from "./components/PromptInjectionSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionInjectionHero />
    <SectionInjectionLab />
    <SectionInjectionEntrances />
    <SectionAttackChain />
    <SectionTrustSort />
    <SectionDefenseBuilder />
    <SectionInjectionLimits />
  </div>
);

export default App;
