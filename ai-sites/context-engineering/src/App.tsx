/**
 * Context Engineering · 一份手册（单页向下滚）
 *
 * 8 节循序渐进：
 *   01 Hero          Context Engineering = 安排 AI 每次干活时眼前能看到的信息，既不缺料也不被塞晕
 *   02 LimitedView   AI 的「眼前」是有限的（铺垫 context window + 互链）
 *   03 SweetSpot     塞太多/太少都不行（slider 调信息量 → 有用占比 + 质量甜点区）
 *   04 FourMoves     管理上下文的四类策略（chip 阵列 Write/Select/Compress/Isolate）
 *   05 Techniques    常见上下文优化手法（核心加厚节，卡片阵列）
 *   06 AssembleTrace 走一遍：一次请求的上下文怎么拼出来（单步 trace）
 *   07 VsNeighbors   跟提示词/记忆/检索分锅（pill + 邮戳卡互链）
 *   08 WhyHot        为什么 2026 它这么火（收尾 + 来源）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionLimitedView from "./components/SectionLimitedView";
import SectionSweetSpot from "./components/SectionSweetSpot";
import SectionFourMoves from "./components/SectionFourMoves";
import SectionTechniques from "./components/SectionTechniques";
import SectionAssembleTrace from "./components/SectionAssembleTrace";
import SectionVsNeighbors from "./components/SectionVsNeighbors";
import SectionWhyHot from "./components/SectionWhyHot";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionLimitedView />
      <SectionSweetSpot />
      <SectionFourMoves />
      <SectionTechniques />
      <SectionAssembleTrace />
      <SectionVsNeighbors />
      <SectionWhyHot />
    </div>
  );
};

export default App;
