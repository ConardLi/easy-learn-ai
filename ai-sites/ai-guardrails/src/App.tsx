import React from "react";
import {
  SectionFourStops,
  SectionGuardrailBuilder,
  SectionGuardrailHero,
  SectionMeasure,
  SectionPolicyTuner,
  SectionRequestRun,
  SectionTradeoff,
} from "./components/GuardrailSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionGuardrailHero />
    <SectionFourStops />
    <SectionGuardrailBuilder />
    <SectionPolicyTuner />
    <SectionRequestRun />
    <SectionTradeoff />
    <SectionMeasure />
  </div>
);

export default App;
