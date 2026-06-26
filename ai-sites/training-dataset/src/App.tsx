/**
 * 训练数据集 · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero          训练数据集 = 喂给模型「学习」用的那一大批材料
 *   02 SameModel     同一套架构，喂不同数据会变成两个模型（A/B 对比）
 *   03 ThreeTypes    数据分三种，对应训练三阶段（切换看样例 · L3）
 *   04 WhereFrom     数据从哪来：抓取/公开集/人工写/模型合成（拼配看覆盖 · L3）
 *   05 Quality       为什么质量比数量重要（slider 调脏数据比例 → 示意曲线 · L3）
 *   06 Pipeline      一条数据上桌前要过哪几关（串起收集→清洗→标注→构建 + 互链）
 *   07 Recap         常见误区 + 一句话回顾
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionSameModel from "./components/SectionSameModel";
import SectionThreeTypes from "./components/SectionThreeTypes";
import SectionWhereFrom from "./components/SectionWhereFrom";
import SectionQuality from "./components/SectionQuality";
import SectionPipeline from "./components/SectionPipeline";
import SectionRecap from "./components/SectionRecap";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionSameModel />
      <SectionThreeTypes />
      <SectionWhereFrom />
      <SectionQuality />
      <SectionPipeline />
      <SectionRecap />
    </div>
  );
};

export default App;
