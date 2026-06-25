import React from "react";
import SectionHero from "./components/SectionHero";
import SectionRawSignals from "./components/SectionRawSignals";
import SectionImagePatches from "./components/SectionImagePatches";
import SectionAudioFrames from "./components/SectionAudioFrames";
import SectionFeatureLayers from "./components/SectionFeatureLayers";
import SectionModelHandoff from "./components/SectionModelHandoff";
import SectionNeighborLinks from "./components/SectionNeighborLinks";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionHero />
    <SectionRawSignals />
    <SectionImagePatches />
    <SectionAudioFrames />
    <SectionFeatureLayers />
    <SectionModelHandoff />
    <SectionNeighborLinks />
  </div>
);

export default App;
