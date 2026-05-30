/**
 * 为什么要微调 · 一份手册
 *
 * 反模板叙事（区别于 rag / rlhf / distill / function-calling / mcp 等 15 站）：
 *   ─ 主题不是讲清一个概念，是替读者做一次决策（长 context / RAG / 微调 三选一）
 *   ─ Hero 先放定义 + 一个 mini 三选一决策器，立刻让用户产生选择
 *   ─ 中段一道"灵魂诊断器"作为整站视觉锚（多 slider/勾选 → 决策路径）
 *   ─ 不复制 rag 的检索拼接 demo / 不复制 rlhf 的三步流水线 / 不复制 distill 的温度概率柱
 *
 * 7 个 section，按"定义 → 三选项 → 替你做选择 → 长 context 的坑 → 微调的坑 → 算账 → 案例练手"。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionThreeForks from "./components/SectionThreeForks";
import SectionDiagnose from "./components/SectionDiagnose";
import SectionLostInTheMiddle from "./components/SectionLostInTheMiddle";
import SectionForget from "./components/SectionForget";
import SectionCalc from "./components/SectionCalc";
import SectionCases from "./components/SectionCases";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionThreeForks />
      <SectionDiagnose />
      <SectionLostInTheMiddle />
      <SectionForget />
      <SectionCalc />
      <SectionCases />
    </div>
  );
};

export default App;
