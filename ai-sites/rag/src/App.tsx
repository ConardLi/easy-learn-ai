/**
 * RAG 手册 · 入口
 *
 * 设计原则：
 *   ─ 不分 TAB，一长页向下滚
 *   ─ 不要 Header
 *   ─ 7 个 section，从「为什么需要 RAG」到「陷阱与争议」，按认知路径递进
 *   ─ section 间用 cream / white 交替形成天然节奏
 */
import React from "react";
import SectionOpening from "./components/SectionOpening";
import SectionContrast from "./components/SectionContrast";
import SectionThreeStep from "./components/SectionThreeStep";
import SectionBuildingBlocks from "./components/SectionBuildingBlocks";
import SectionPatterns from "./components/SectionPatterns";
import SectionEcosystem from "./components/SectionEcosystem";
import SectionChallenges from "./components/SectionChallenges";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionContrast />
      <SectionThreeStep />
      <SectionBuildingBlocks />
      <SectionPatterns />
      <SectionEcosystem />
      <SectionChallenges />
    </div>
  );
};

export default App;
