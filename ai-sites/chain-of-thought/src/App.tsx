/**
 * Chain of Thought · 一份手册（单页向下滚）
 *
 * 6 节循序渐进：
 *   01 Hero          Chain of Thought = 让模型在给答案前，先把一步步的推理写出来
 *   02 TwoTries      同一道绕弯的题：直接答 vs 先想再答（pill + 难度 slider，示意）
 *   03 Triggers      怎么让模型先想再答（chip 拼触发方式 + 实时预览 prompt）
 *   04 Trace         单步看一条推理链从题目走到答案（next / prev / reset）
 *   05 WhenWorth     什么时候值得用（勾选题目特征 → 值得 / 不值得 + 代价提示）
 *   06 Neighbors     CoT 的邻居：few-shot CoT / 2026 推理模型默认先想 / 它是一种 prompt 技巧
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionTwoTries from "./components/SectionTwoTries";
import SectionTriggers from "./components/SectionTriggers";
import SectionTrace from "./components/SectionTrace";
import SectionWhenWorth from "./components/SectionWhenWorth";
import SectionNeighbors from "./components/SectionNeighbors";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionTwoTries />
      <SectionTriggers />
      <SectionTrace />
      <SectionWhenWorth />
      <SectionNeighbors />
    </div>
  );
};

export default App;
