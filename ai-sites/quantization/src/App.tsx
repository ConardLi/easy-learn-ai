/**
 * Quantization · 一份手册
 *
 * 反模板设计（区别于 llm / agent / rag 三站）：
 *   ─ Hero 直接带核心交互（不是 Opening → Contrast → Loop 三件套）
 *   ─ 没有 Contrast / BuildingBlocks / Challenges 三个常驻 section
 *   ─ 结尾收在「展望 1-bit 未来」，而非常见的「陷阱」
 *
 * 6 个 section，按"反直觉 → 机制 → 真实任务 → 方法 → 生态 → 未来"递进。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionNumberLine from "./components/SectionNumberLine";
import SectionFitTask from "./components/SectionFitTask";
import SectionMethods from "./components/SectionMethods";
import SectionEcosystem from "./components/SectionEcosystem";
import SectionFuture from "./components/SectionFuture";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionNumberLine />
      <SectionFitTask />
      <SectionMethods />
      <SectionEcosystem />
      <SectionFuture />
    </div>
  );
};

export default App;
