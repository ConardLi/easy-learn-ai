/**
 * Loss · 一份手册
 *
 * 反模板（区别于 quantization 7-pill / distill 5-class softmax / batch-size 1D ball drop）：
 *   ─ Hero 用 slider 改"预测误差"，5 条 loss 曲线同框，5 个数同步刷新
 *   ─ Section 02 直接给 5 张训练 loss 病曲线缩略图，让用户挑哪条像他自己的实验
 *   ─ Section 03 散点拖离群点，3 种回归 loss 总和实时差出量级
 *   ─ Section 04 binary CE 算账本：y toggle + p slider + 逐项 -log 分解
 *   ─ Section 05 4 张 LLM 阶段 loss 卡，真实 β / γ / α 数字（含 DeepSeek V3 / Llama 3.1）
 *   ─ Section 06 选 loss 小测 + 4 条硬规则
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionCurveDoctor from "./components/SectionCurveDoctor";
import SectionRegression from "./components/SectionRegression";
import SectionCrossEntropy from "./components/SectionCrossEntropy";
import SectionLLMLosses from "./components/SectionLLMLosses";
import SectionPickRules from "./components/SectionPickRules";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionCurveDoctor />
      <SectionRegression />
      <SectionCrossEntropy />
      <SectionLLMLosses />
      <SectionPickRules />
    </div>
  );
};

export default App;
