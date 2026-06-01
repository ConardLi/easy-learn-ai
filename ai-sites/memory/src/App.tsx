/**
 * Agent 记忆系统 · 一份手册（单页向下滚）
 *
 * 7 节循序渐进：
 *   01 Hero            Agent 记忆系统 = 让 AI 在 context window 之外也持有信息
 *   02 Amnesia         一个失忆现场 + context window 滑条体验（短期 vs 长期）
 *   03 ThreeTypes      情景 / 语义 / 程序：三类记忆各管一摊
 *   04 WhereStored     Token / 隐式 / 参数级 三种存储形态 + 商业 API 用户的真实空间
 *   05 Lifecycle       一条记忆的一生：写入 → 维护 → 检索（单步 trace）
 *   06 VendorRound     业界三家方案：MemGPT / Mem0 / Claude Code（勾选维度 → 推荐）
 *   07 Minimal         最小可用版本：三步起步 + 一条硬规则
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionAmnesia from "./components/SectionAmnesia";
import SectionThreeTypes from "./components/SectionThreeTypes";
import SectionWhereStored from "./components/SectionWhereStored";
import SectionLifecycle from "./components/SectionLifecycle";
import SectionVendorRound from "./components/SectionVendorRound";
import SectionMinimal from "./components/SectionMinimal";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionAmnesia />
      <SectionThreeTypes />
      <SectionWhereStored />
      <SectionLifecycle />
      <SectionVendorRound />
      <SectionMinimal />
    </div>
  );
};

export default App;
