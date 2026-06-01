/**
 * Context Window · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero                 Context Window = 模型每次推理能「看见」的全部文本
 *   02 Anatomy              拆开一根 context 长条：system / tools / history / RAG / now
 *   03 Sizes                2026 主流模型窗口大小对比 + 用户输入估算
 *   04 FillSpeed            实际开发里 context 烧得多快（200 格网格 + slider）
 *   05 FillEffects          撑爆后的 4 种症状（注意力分散 / 走神 / 答非所问 / 中间丢失）
 *   06 ShortStrategies      短期内 4 种管理招（截断 / 压缩 / 摘要 / 工具回声去重）
 *   07 ContextEngineering   主动管理 + 收尾 + 跨会话引到 agent-memory 站
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionAnatomy from "./components/SectionAnatomy";
import SectionSizes from "./components/SectionSizes";
import SectionFillSpeed from "./components/SectionFillSpeed";
import SectionFillEffects from "./components/SectionFillEffects";
import SectionShortStrategies from "./components/SectionShortStrategies";
import SectionContextEngineering from "./components/SectionContextEngineering";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionAnatomy />
      <SectionSizes />
      <SectionFillSpeed />
      <SectionFillEffects />
      <SectionShortStrategies />
      <SectionContextEngineering />
    </div>
  );
};

export default App;
