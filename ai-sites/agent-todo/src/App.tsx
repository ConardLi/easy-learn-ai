/**
 * Agent TodoList · 一份手册（单页向下滚）
 *
 * 8 节循序渐进：
 *   01 Hero            Agent TodoList = 给 AI 的 Checklist，防遗忘 + 给用户看进度
 *   02 ForgetCase      长任务遗忘现场：滑条调步数，看跳步数量飙升（/daily-brief 真实案例）
 *   03 ThreeRoles      TODO 的三大作用：防遗忘 / 看进度 / 编排（pill 切换 + 拍肩膀细节）
 *   04 TodoWrite       TodoWrite 详解：18 步骤清单的单步生命周期 trace
 *   05 Task            Task 持久化系统：4 大特征 accordion 展开
 *   06 DepGraph        依赖图实战：勾选完成态看下游解锁（认证系统 4 个 task）
 *   07 Compare         TodoWrite vs Task 八维对比 + 决策树
 *   08 MixedUse        混用最佳实践 + 一条硬规则收尾
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionForgetCase from "./components/SectionForgetCase";
import SectionThreeRoles from "./components/SectionThreeRoles";
import SectionTodoWrite from "./components/SectionTodoWrite";
import SectionTask from "./components/SectionTask";
import SectionDepGraph from "./components/SectionDepGraph";
import SectionCompare from "./components/SectionCompare";
import SectionMixedUse from "./components/SectionMixedUse";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionForgetCase />
      <SectionThreeRoles />
      <SectionTodoWrite />
      <SectionTask />
      <SectionDepGraph />
      <SectionCompare />
      <SectionMixedUse />
    </div>
  );
};

export default App;
