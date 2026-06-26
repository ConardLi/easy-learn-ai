/**
 * 数据清洗 · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero          数据清洗 = 把又脏又乱的原始数据，挑掉没用的、留下能用的
 *   02 HowDirty      原始网页数据有多脏（真实脏样例展示）
 *   03 Pipeline      清洗五步走（单步 trace → 数据量逐步缩水 · L3）
 *   04 Dedup         去重为什么最关键（开关对比 · L3）
 *   05 LowQuality    怎么判断「低质」（调阈值 → 留存率示意 · L3）
 *   06 OverClean     洗过头的风险（误删好数据）
 *   07 Recap         回顾 + 跨线链到数据投毒 + 训练数据集
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionHowDirty from "./components/SectionHowDirty";
import SectionPipeline from "./components/SectionPipeline";
import SectionDedup from "./components/SectionDedup";
import SectionLowQuality from "./components/SectionLowQuality";
import SectionOverClean from "./components/SectionOverClean";
import SectionRecap from "./components/SectionRecap";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionHowDirty />
      <SectionPipeline />
      <SectionDedup />
      <SectionLowQuality />
      <SectionOverClean />
      <SectionRecap />
    </div>
  );
};

export default App;
