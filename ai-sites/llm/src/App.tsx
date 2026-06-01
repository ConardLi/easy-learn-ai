/**
 * LLM 学习手册 · 单页向下滚 7 节
 *
 * 学习路径：
 *   §01 Hero          —— LLM 是什么（一句话定义 + 逐字预测演示）
 *   §02 ChatGPTMoment —— Base 只续写 vs Instruct 听话办事
 *   §03 HowBig        —— 参数 × 数据 × 算力（slider）
 *   §04 SurprisePowers—— 4 个出人意料的本事（ICL / 涌现 / 多步指令 / 推理）
 *   §05 Timeline      —— 6 年关键转折（10 条精选）
 *   §06 WhatYouGetToday —— 长上下文 / 多模态 / 幻觉
 *   §07 Limits        —— 不要期待清单 + 站尾互链
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionChatGPTMoment from "./components/SectionChatGPTMoment";
import SectionHowBig from "./components/SectionHowBig";
import SectionSurprisePowers from "./components/SectionSurprisePowers";
import SectionTimeline from "./components/SectionTimeline";
import SectionWhatYouGetToday from "./components/SectionWhatYouGetToday";
import SectionLimits from "./components/SectionLimits";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionChatGPTMoment />
      <SectionHowBig />
      <SectionSurprisePowers />
      <SectionTimeline />
      <SectionWhatYouGetToday />
      <SectionLimits />
    </div>
  );
};

export default App;
