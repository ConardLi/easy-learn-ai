/**
 * System Prompt · 一份手册（单页向下滚）
 *
 * 6 节循序渐进：
 *   01 Hero          System Prompt = app 预先塞在对话最前面、用户看不到的那段指令
 *   02 VsUser        你打的字 = user 消息；system prompt 在它前面，谁写 / 在哪 / 谁优先
 *   03 WhatGoesIn    一条 system prompt 通常写哪几样（角色 / 语气 / 边界 / 格式）
 *   04 SwapSystem    同一个问题，换不同 system，回答风格变了
 *   05 Priority      system 一般压过 user，但精心构造的输入可能绕过
 *   06 Neighbors     互链 context-window / prompt / 兄弟站 + 收尾
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionVsUser from "./components/SectionVsUser";
import SectionWhatGoesIn from "./components/SectionWhatGoesIn";
import SectionSwapSystem from "./components/SectionSwapSystem";
import SectionPriority from "./components/SectionPriority";
import SectionNeighbors from "./components/SectionNeighbors";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionVsUser />
      <SectionWhatGoesIn />
      <SectionSwapSystem />
      <SectionPriority />
      <SectionNeighbors />
    </div>
  );
};

export default App;
