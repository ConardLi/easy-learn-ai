/**
 * 多模态 · 一份手册
 *
 * 6 个 section，按"图先变 token → 不同模态多贵 → 怎么塞进 LLM → 谁能干啥 → 你来挑 → 真看懂了吗"递进。
 *
 * 跟 llm / nlp / quantization / agent / mcp / 其它 15 站的差异化设计：
 *   - Hero 主交互 = 真图被 patch 切分成 token grid（其他站没人用过图像）
 *   - 中段 = 三种融合做法架构 SVG 对比（其他站没用过架构家族图）
 *   - 末段 = 输入×输出任务模拟器（不是 trace，不是流程）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionTokenBars from "./components/SectionTokenBars";
import SectionFusion from "./components/SectionFusion";
import SectionMatrix from "./components/SectionMatrix";
import SectionAnyToAny from "./components/SectionAnyToAny";
import SectionBenchmark from "./components/SectionBenchmark";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionTokenBars />
      <SectionFusion />
      <SectionMatrix />
      <SectionAnyToAny />
      <SectionBenchmark />
    </div>
  );
};

export default App;
