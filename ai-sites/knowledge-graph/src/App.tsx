import React from "react";
import {
  SectionAnswerPaths,
  SectionBuildFacts,
  SectionEntityCleanup,
  SectionGraphHero,
  SectionGraphUses,
  SectionKnowledgeChanges,
  SectionWhyRelations,
} from "./components/KnowledgeGraphSections";

const App: React.FC = () => (
  <div className="min-h-screen bg-cream text-ink">
    <SectionGraphHero />
    <SectionBuildFacts />
    <SectionWhyRelations />
    <SectionAnswerPaths />
    <SectionEntityCleanup />
    <SectionKnowledgeChanges />
    <SectionGraphUses />
  </div>
);

export default App;
