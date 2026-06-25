import React from "react";
import SectionHero from "./components/SectionHero";
import SectionCoordinates from "./components/SectionCoordinates";
import SectionTrainingMap from "./components/SectionTrainingMap";
import SectionDirections from "./components/SectionDirections";
import SectionLayerJourney from "./components/SectionLayerJourney";
import SectionSharedSpace from "./components/SectionSharedSpace";
import SectionProjection from "./components/SectionProjection";
import SectionNeighborLinks from "./components/SectionNeighborLinks";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionHero />
    <SectionCoordinates />
    <SectionTrainingMap />
    <SectionDirections />
    <SectionLayerJourney />
    <SectionSharedSpace />
    <SectionProjection />
    <SectionNeighborLinks />
  </div>
);

export default App;
