/**
 * Multi Agent · 一份手册（单页向下滚）
 *
 * 8 节循序渐进：
 *   01 Hero            Multi Agent = 把一个大任务交给几个各管一摊的 AI，分工协作一起做完
 *   02 WhyOneFails     一个 AI 干所有事会怎么翻车（slider 调任务复杂度 → 出错率爬升）
 *   03 Roles           常见的几个角色（pill 切换：规划/执行/审查/总结）
 *   04 Architectures   几种多 Agent 架构（卡片切换 Network/Supervisor/Hierarchical/Custom + 图）
 *   05 FlowTrace       走一遍：任务在几个 Agent 间流转（单步 trace）
 *   06 Scheduling      谁来指挥、怎么不乱（有调度 vs 没调度 对比）
 *   07 VsSubAgent      跟 SubAgent / 单 Agent 分锅（pill 切换对比）
 *   08 WhenToUse       什么时候该上、什么时候别（收尾）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionWhyOneFails from "./components/SectionWhyOneFails";
import SectionRoles from "./components/SectionRoles";
import SectionArchitectures from "./components/SectionArchitectures";
import SectionFlowTrace from "./components/SectionFlowTrace";
import SectionScheduling from "./components/SectionScheduling";
import SectionVsSubAgent from "./components/SectionVsSubAgent";
import SectionWhenToUse from "./components/SectionWhenToUse";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionWhyOneFails />
      <SectionRoles />
      <SectionArchitectures />
      <SectionFlowTrace />
      <SectionScheduling />
      <SectionVsSubAgent />
      <SectionWhenToUse />
    </div>
  );
};

export default App;
