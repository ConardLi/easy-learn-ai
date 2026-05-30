/**
 * 学习率 · 一份手册
 *
 * 反模板（避开 batch-size / epochs / loss / distill / pretrain / quantization）：
 *   ─ Hero 是「LR 三档对比」3 条 loss 曲线同框 + 中间那条 LR slider 实时调
 *     不抢 batch-size 的 1D ball drop / epochs 的 train-val 双曲线 scrubber
 *   ─ 第 2 章是参数更新 1D 数轴 + step stepper（θ 球被 grad×lr 推一格）
 *   ─ 第 3 章是 6 个调度器形状画板 chip 切换 + 公式 + 用在哪
 *   ─ 第 4 章是 8 个真实 LLM LR 配方横排表 hover 联动详情
 *   ─ 第 5 章是 linear scaling 计算器：调 batch 倍数看 LR 跟着改多少
 *   ─ 第 6 章是 loss 第一步诊断器（输 vocab_size 看 ln(V)）+ 工程经验
 *
 * 6 个 section，按"定义 → 机制 → 调度器 → 真实配方 → 跟 batch 关系 → debug"递进。
 * 整站交互范式 ≥ 5：multi-curve sandbox / step stepper / chip + curve / matrix table /
 *   slider calc / input + diagnostic
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionStep from "./components/SectionStep";
import SectionSchedule from "./components/SectionSchedule";
import SectionRecipes from "./components/SectionRecipes";
import SectionScaling from "./components/SectionScaling";
import SectionDebug from "./components/SectionDebug";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionStep />
      <SectionSchedule />
      <SectionRecipes />
      <SectionScaling />
      <SectionDebug />
    </div>
  );
};

export default App;
