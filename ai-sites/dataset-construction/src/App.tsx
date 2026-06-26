/**
 * 数据集构建 · 一份手册（单页向下滚）
 *
 * 实战 hub 站：把「收集 → 清洗 → 标注」三步，用 Easy Dataset 串成一条能跑的流水线。
 *
 * 7 节循序渐进：
 *   01 Hero        数据集构建 = 把一堆文档，自动变成模型能直接学的问答数据
 *   02 WhyHard     纯手工攒数据集有多累（手工 vs 工具对照）
 *   03 Pipeline    Easy Dataset 全流程六步（单步 trace · L3）
 *   04 AutoQA      核心：从一段文档自动生出问答对（输入 → 预览 · L3）
 *   05 Advanced    进阶玩法：数据蒸馏 / GA 对 / 多轮 / 图文（pill 切换 · L3）
 *   06 Export      导出即用：Alpaca / ShareGPT → 一键对接 LLaMA Factory（toggle · L3）
 *   07 Recap       回顾 + hub 聚合卡，把四站串成一条线
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionWhyHard from "./components/SectionWhyHard";
import SectionPipeline from "./components/SectionPipeline";
import SectionAutoQA from "./components/SectionAutoQA";
import SectionAdvanced from "./components/SectionAdvanced";
import SectionExport from "./components/SectionExport";
import SectionRecap from "./components/SectionRecap";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionWhyHard />
      <SectionPipeline />
      <SectionAutoQA />
      <SectionAdvanced />
      <SectionExport />
      <SectionRecap />
    </div>
  );
};

export default App;
