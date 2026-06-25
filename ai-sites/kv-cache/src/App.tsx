import React from "react";
import SectionWhatIsCache from "./components/SectionWhatIsCache";
import SectionWhereKVComesFrom from "./components/SectionWhereKVComesFrom";
import SectionRepeatWork from "./components/SectionRepeatWork";
import SectionCacheGrows from "./components/SectionCacheGrows";
import SectionComputeSaved from "./components/SectionComputeSaved";
import SectionMemoryPressure from "./components/SectionMemoryPressure";
import SectionTradeoffs from "./components/SectionTradeoffs";
import SectionCacheFamily from "./components/SectionCacheFamily";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionWhatIsCache />
    <SectionWhereKVComesFrom />
    <SectionRepeatWork />
    <SectionCacheGrows />
    <SectionComputeSaved />
    <SectionMemoryPressure />
    <SectionTradeoffs />
    <SectionCacheFamily />
  </div>
);

export default App;
