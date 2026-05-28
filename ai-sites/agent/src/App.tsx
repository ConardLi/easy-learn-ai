/**
 * Agent 手册 · 入口
 *
 * 设计原则：
 *   ─ 不分 TAB，一长页向下滚
 *   ─ 不要 Header
 *   ─ 8 个 section，从概念引入到现实评测，循序渐进
 *   ─ section 间使用 cream / white / butter-tint 交替，形成天然节奏
 */
import React from "react";
import SectionOpening from "./components/SectionOpening";
import SectionContrast from "./components/SectionContrast";
import SectionReActLoop from "./components/SectionReActLoop";
import SectionBuildingBlocks from "./components/SectionBuildingBlocks";
import SectionPatterns from "./components/SectionPatterns";
import SectionEvaluations from "./components/SectionEvaluations";
import SectionChallenges from "./components/SectionChallenges";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionOpening />
      <SectionContrast />
      <SectionReActLoop />
      <SectionBuildingBlocks />
      <SectionPatterns />
      <SectionEvaluations />
      <SectionChallenges />
    </div>
  );
};

export default App;
