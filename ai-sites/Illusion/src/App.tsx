/**
 * 模型幻觉 · 一份手册
 *
 * 反模板设计（区别于 rag / deepseek-r1 / bert 三站）：
 *   ─ Hero 直接把「同一问题 5 个采样」摊给用户当 fact-checker（rag 是 chunk hover / deepseek-r1 是 think 流式 / bert 是 mask 候选柱）
 *   ─ 没有 SectionOverview / SectionContrast / SectionCoreLoop 这套常驻
 *   ─ 7 个 section：定义 → 病因 → 两类分类小测 → 真实灾难画廊 → 检测器 → 2026 跑分 → 缓解矩阵
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionWhyMake from "./components/SectionWhyMake";
import SectionTwoKinds from "./components/SectionTwoKinds";
import SectionCases from "./components/SectionCases";
import SectionDetect from "./components/SectionDetect";
import SectionLeaderboard from "./components/SectionLeaderboard";
import SectionMitigate from "./components/SectionMitigate";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionWhyMake />
      <SectionTwoKinds />
      <SectionCases />
      <SectionDetect />
      <SectionLeaderboard />
      <SectionMitigate />
    </div>
  );
};

export default App;
