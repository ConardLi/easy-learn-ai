import React from "react";
import SectionChooseStack from "./components/SectionChooseStack";
import SectionFilterRules from "./components/SectionFilterRules";
import SectionHybridSearch from "./components/SectionHybridSearch";
import SectionIndexGraph from "./components/SectionIndexGraph";
import SectionNeighborLinks from "./components/SectionNeighborLinks";
import SectionOpening from "./components/SectionOpening";
import SectionQueryWalk from "./components/SectionQueryWalk";
import SectionStoreOneDoc from "./components/SectionStoreOneDoc";
import SectionWhenItBreaks from "./components/SectionWhenItBreaks";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionStoreOneDoc />
      <SectionQueryWalk />
      <SectionIndexGraph />
      <SectionFilterRules />
      <SectionWhenItBreaks />
      <SectionHybridSearch />
      <SectionChooseStack />
      <SectionNeighborLinks />
    </div>
  );
};

export default App;
