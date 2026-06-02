/**
 * Prompt 提示词 · 一份手册（单页向下滚）
 *
 * 6 节循序渐进：
 *   01 SectionHero      Prompt = 你打字发给 AI 的那段话，告诉它你要它干什么
 *   02 SectionAsk       同一个需求，问法不同结果差很多（模糊 vs 具体，pill 切换）
 *   03 SectionBlocks    一个清楚的 prompt 通常有哪几块（任务/背景/格式/约束，拼装编辑器 L4）
 *   04 SectionRecipes   几种常见写法套路（直接问/给角色/分步/指定格式，chip + 输入）
 *   05 SectionPitfalls  新手常见翻车（体检输入 + accordion）
 *   06 SectionFamily    Prompt 的进阶亲戚：System Prompt / Few-shot / CoT（hub 聚合卡 + 收尾）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionAsk from "./components/SectionAsk";
import SectionBlocks from "./components/SectionBlocks";
import SectionRecipes from "./components/SectionRecipes";
import SectionPitfalls from "./components/SectionPitfalls";
import SectionFamily from "./components/SectionFamily";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionAsk />
      <SectionBlocks />
      <SectionRecipes />
      <SectionPitfalls />
      <SectionFamily />
    </div>
  );
};

export default App;
