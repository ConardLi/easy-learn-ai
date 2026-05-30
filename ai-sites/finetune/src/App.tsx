/**
 * Finetune Methods · 一份手册
 *
 * 反模板设计 —— 跟同期 5 个训练站（pretrain / sft / whyfinetune / epochs / quantization）拉开：
 *   ─ Hero 是 6 方法横向 chip 对比（不是数轴 / 不是 ZeRO 三柱 / 不是 5 维 segmented）
 *   ─ Section 02 单独把 LoRA 数学拆解放出来当核心动作
 *   ─ 训练计算器是 4 维 chip 拼装实时算（L4）
 *   ─ 结尾是硬规则 accordion，不是鸡汤
 *
 * 7 个 section，按"对比 → 拆解 → 矩阵 → 算账 → 实战 → 演进 → 硬规则"递进。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionDecompose from "./components/SectionDecompose";
import SectionMatrix from "./components/SectionMatrix";
import SectionCalc from "./components/SectionCalc";
import SectionAdapterSwap from "./components/SectionAdapterSwap";
import SectionTimeline from "./components/SectionTimeline";
import SectionRules from "./components/SectionRules";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionDecompose />
      <SectionMatrix />
      <SectionCalc />
      <SectionAdapterSwap />
      <SectionTimeline />
      <SectionRules />
    </div>
  );
};

export default App;
