/**
 * 数据标注 · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero          数据标注 = 给原始数据贴上「正确答案 / 标签」，模型才知道该往哪学
 *   02 WhyNeed       没标注的数据，模型学不会「该怎么答」（原始 vs 标注对比）
 *   03 ThreeKinds    三种标注对应三种训练（切换看真实样例 · L3）
 *   04 BeYjudge      当一回标注员：给两个回答排序（亲手标 · L3）
 *   05 SemiAuto      半自动：模型先标，人来审（单步 trace · L3）
 *   06 Quality       标注质量怎么保证（一致性 / 交叉 / 抽检）
 *   07 Recap         回顾 + 链到数据集构建
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionWhyNeed from "./components/SectionWhyNeed";
import SectionThreeKinds from "./components/SectionThreeKinds";
import SectionBeJudge from "./components/SectionBeJudge";
import SectionSemiAuto from "./components/SectionSemiAuto";
import SectionQuality from "./components/SectionQuality";
import SectionRecap from "./components/SectionRecap";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionWhyNeed />
      <SectionThreeKinds />
      <SectionBeJudge />
      <SectionSemiAuto />
      <SectionQuality />
      <SectionRecap />
    </div>
  );
};

export default App;
