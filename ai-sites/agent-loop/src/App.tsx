/**
 * Agent Loop · 一份手册（单页向下滚）
 *
 * 8 节循序渐进：
 *   01 Hero       Agent Loop 是什么 = 一句话定义 + 6 行伪代码
 *   02 WhyLoop    Single-pass 干不了的事 → 必须 Loop（4 个真实任务对照）
 *   03 FiveStages 一轮里的五阶段：感知 / 推理 / 规划 / 行动 / 观察（单步 trace）
 *   04 Demo       多轮串起来：3 轮搞定 Agent Memory 论文任务（slider 时间线）
 *   05 ThreeModes 业界三种主流玩法：ReAct / Plan-and-Execute / Reflexion（pill 切换 + 各自轨迹）
 *   06 Compare    横向 4 维对比（勾选维度 → 给推荐）
 *   07 Production 生产前三件事 + 停止条件模拟器（toggle 开关 + 仪表盘）
 *   08 VsForLoop  跟 for 循环差在哪 + 启发结尾：多 Loop 架构
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionWhyLoop from "./components/SectionWhyLoop";
import SectionFiveStages from "./components/SectionFiveStages";
import SectionThreeRoundDemo from "./components/SectionThreeRoundDemo";
import SectionThreeModes from "./components/SectionThreeModes";
import SectionModesCompare from "./components/SectionModesCompare";
import SectionProductionTraps from "./components/SectionProductionTraps";
import SectionVsForLoop from "./components/SectionVsForLoop";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionWhyLoop />
      <SectionFiveStages />
      <SectionThreeRoundDemo />
      <SectionThreeModes />
      <SectionModesCompare />
      <SectionProductionTraps />
      <SectionVsForLoop />
    </div>
  );
};

export default App;
