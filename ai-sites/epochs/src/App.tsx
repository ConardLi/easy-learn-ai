/**
 * Epochs · 训练轮数 · 一份手册
 *
 * 反模板设计（区别于 batch-size / loss / pretrain / sft / finetune / whyfinetune）：
 *   ─ Hero 是 timeline scrubber + train/val 双曲线（不是 batch-size 的 ball drop，
 *     也不是 loss 的 chip 选场景）
 *   ─ 中段 catastrophic forgetting 灾难模拟器（用户当工程师选 ship epoch）
 *   ─ Muennighoff 2023 半衰期曲线（业内"1 epoch 预训练"理论根源）
 *   ─ 6 配方 accordion + 6 真实大模型横切
 *
 * 6 个 section，按"概念 → 数学 → 危险 → 理论 → 配方 → 实证"递进。
 * 整站交互范式 ≥ 5：scrub slider / stepper+chip / task simulator / slider+curve /
 *   accordion+toggle / pill+matrix
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionMath from "./components/SectionMath";
import SectionDanger from "./components/SectionDanger";
import SectionRepeat from "./components/SectionRepeat";
import SectionRecipes from "./components/SectionRecipes";
import SectionRealConfigs from "./components/SectionRealConfigs";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionMath />
      <SectionDanger />
      <SectionRepeat />
      <SectionRecipes />
      <SectionRealConfigs />
    </div>
  );
};

export default App;
