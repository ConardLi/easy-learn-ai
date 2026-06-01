/**
 * Agent 运行模式 · 入口
 *
 * 单页向下滚，8 个 section：
 *   01 Hero        — 是什么 / 定义
 *   02 Conflict    — 自主性 vs 安全性（slider）
 *   03 ThreeModes  — 三档速览 + 权限矩阵（pill）
 *   04 PlanMode    — Plan 四阶段（单步 trace）
 *   05 DefaultMode — 边做边审（审批模拟器）
 *   06 AutoMode    — Auto + 分类器（勾选）
 *   07 Matrix      — 三家命名对照（chip 选行）
 *   08 Workflow    — 三档组合工作流（拼装时间线）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionConflict from "./components/SectionConflict";
import SectionThreeModes from "./components/SectionThreeModes";
import SectionPlanMode from "./components/SectionPlanMode";
import SectionDefaultMode from "./components/SectionDefaultMode";
import SectionAutoMode from "./components/SectionAutoMode";
import SectionAgentMatrix from "./components/SectionAgentMatrix";
import SectionWorkflow from "./components/SectionWorkflow";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionConflict />
      <SectionThreeModes />
      <SectionPlanMode />
      <SectionDefaultMode />
      <SectionAutoMode />
      <SectionAgentMatrix />
      <SectionWorkflow />
    </div>
  );
};

export default App;
