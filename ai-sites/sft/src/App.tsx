/**
 * SFT · 一份手册
 *
 * 反模板设计：
 *   ─ Hero 直接展示「base 续写 vs SFT 后对话」核心反差（不是 6 步漫游、不是 5 维诊断）
 *   ─ Section 02 把 chat template 拼装暴露出来 —— 这是 SFT 的"灵魂动作"
 *   ─ Section 03 让用户当 loss-mask 标注员（避开 RLHF / loss 站的曲线游戏）
 *   ─ Section 04 LIMA 假说验证（少量高质量 vs 大量低质量）
 *   ─ Section 05 4 个真实 SFT 配方横向对比（Tulu 3 / OpenHermes / Magpie / LIMA）
 *   ─ Section 06 alignment tax + 训练前后能力曲线
 *   ─ Section 07 实战提醒（4 条硬规则）
 *
 * 7 章，递进：是什么 → 怎么拼 → 怎么算 loss → 数据量谜题 → 真实配方 → 代价 → 怎么不踩坑
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionTemplate from "./components/SectionTemplate";
import SectionLossMask from "./components/SectionLossMask";
import SectionLimaBet from "./components/SectionLimaBet";
import SectionRecipes from "./components/SectionRecipes";
import SectionTax from "./components/SectionTax";
import SectionRules from "./components/SectionRules";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionTemplate />
      <SectionLossMask />
      <SectionLimaBet />
      <SectionRecipes />
      <SectionTax />
      <SectionRules />
    </div>
  );
};

export default App;
