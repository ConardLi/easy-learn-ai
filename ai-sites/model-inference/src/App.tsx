import React from "react";
import SectionWhatIsInference from "./components/SectionWhatIsInference";
import SectionWordsBecomePieces from "./components/SectionWordsBecomePieces";
import SectionFirstPiece from "./components/SectionFirstPiece";
import SectionGenerationLoop from "./components/SectionGenerationLoop";
import SectionTemperature from "./components/SectionTemperature";
import SectionTwoPhases from "./components/SectionTwoPhases";
import SectionCostConsole from "./components/SectionCostConsole";
import SectionSystemChoices from "./components/SectionSystemChoices";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionWhatIsInference />
    <SectionWordsBecomePieces />
    <SectionFirstPiece />
    <SectionGenerationLoop />
    <SectionTemperature />
    <SectionTwoPhases />
    <SectionCostConsole />
    <SectionSystemChoices />
  </div>
);

export default App;
