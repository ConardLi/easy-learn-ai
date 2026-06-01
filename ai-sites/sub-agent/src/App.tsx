/**
 * SubAgent · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero               SubAgent = 主 Agent 派出的临时子 Agent，独立空间干完只带摘要回来
 *   02 ContextRot         没有 SubAgent 的「上下文腐化」现场（slider 调对话轮数 → 噪声占比）
 *   03 ThreeProperties    三个核心属性（pill 切换：独立上下文 / 受限工具 / 摘要返回）
 *   04 FourScenarios      4 个使用场景（chip 阵列筛选 + 详情卡）
 *   05 VsTeams            SubAgent vs Agent Teams（pill 切换横向对比）
 *   06 InClaudeCode       Claude Code 里的内置 + 自定义（拼装 YAML，L3）
 *   07 Pitfalls           5 个常见误区（accordion 展开）
 *   08 WhenToUse          何时该用 + Fork 进阶 + 收尾硬规则
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionContextRot from "./components/SectionContextRot";
import SectionThreeProperties from "./components/SectionThreeProperties";
import SectionFourScenarios from "./components/SectionFourScenarios";
import SectionVsTeams from "./components/SectionVsTeams";
import SectionInClaudeCode from "./components/SectionInClaudeCode";
import SectionPitfalls from "./components/SectionPitfalls";
import SectionWhenToUse from "./components/SectionWhenToUse";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionContextRot />
      <SectionThreeProperties />
      <SectionFourScenarios />
      <SectionVsTeams />
      <SectionInClaudeCode />
      <SectionPitfalls />
      <SectionWhenToUse />
    </div>
  );
};

export default App;
