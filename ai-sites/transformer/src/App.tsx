/**
 * Transformer · 一份手册
 *
 * 反模板设计（区别于 bert / llm / nlp / moe 同主题站）：
 *   ─ Hero 直接带「RNN vs Transformer 时序播放器」交互（不是 attention 矩阵热力图，bert 已用）
 *   ─ section 顺序：定义 → 反直觉钩子 → Q/K/V 单步 trace → 3 种架构 → 内部组件 → 2026 现状
 *   ─ 不复用 bert 的 8×8 attention 热力图、不复用 llm 的 token 流式生成
 *   ─ 不复用 nlp 的 tokenizer 三栏对比、不复用 moe 的 257 expert 网格
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionPaper from "./components/SectionPaper";
import SectionQKV from "./components/SectionQKV";
import SectionArch3 from "./components/SectionArch3";
import SectionInside from "./components/SectionInside";
import SectionToday from "./components/SectionToday";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionPaper />
      <SectionQKV />
      <SectionArch3 />
      <SectionInside />
      <SectionToday />
    </div>
  );
};

export default App;
