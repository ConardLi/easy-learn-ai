/**
 * Token · 一份手册
 *
 * 反模板设计（跟 llm / nlp / agent / rag / quantization / ... 15 个站都换掉）：
 *   ─ Hero 把整站核心动作摆 C 位：用户输文字立刻切 token（单家深挖，不是 nlp 的三家对比）
 *   ─ §02 不是 contrast / "为什么用"，是「边缘案例画廊」翻面卡，反直觉钩子在这
 *   ─ §03 不是 mechanism / loop，是 BPE 5 步单步 trace
 *   ─ §04 不是 use-cases / scenarios，是 8 种语言成本 bar
 *   ─ §05 不是 architecture / building blocks，是双 slider 价格计算器
 *   ─ §06 不是 future / roadmap，是 context window 长度 log bar
 *   ─ §07 不是 summary / pitfalls，是 5 条硬规则 accordion
 *
 * 7 个 section，7 种不同交互范式（input / flip / trace / chip-bar / slider-calc / pill-bar / accordion）。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionEdges from "./components/SectionEdges";
import SectionBPE from "./components/SectionBPE";
import SectionLanguages from "./components/SectionLanguages";
import SectionPriceCalc from "./components/SectionPriceCalc";
import SectionContext from "./components/SectionContext";
import SectionRules from "./components/SectionRules";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionEdges />
      <SectionBPE />
      <SectionLanguages />
      <SectionPriceCalc />
      <SectionContext />
      <SectionRules />
    </div>
  );
};

export default App;
