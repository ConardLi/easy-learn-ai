/**
 * Batch Size · 一份手册
 *
 * 反模板（区别于 llm / agent / rag / quantization / distill / function-calling / moe 七站）：
 *   ─ Hero 主交互 = 连续 batch slider 联动 4 个数轴（噪声 / 步数 / 显存 / 泛化倾向）
 *     不是 quantization 的 7-pill 离散选择，也不是 distill 的温度 slider 5 类柱
 *   ─ 02 节是单步 forward → backward → step 的 trace 卡，外加"加速对比"
 *     不抢 quantization 的数轴吸附 / function-calling 的 messages 单步
 *   ─ 03 节用 1D loss landscape + 拖球 + warmup toggle 讲 sharp / flat
 *     全新视觉语言，没有任何姐妹站用过
 *   ─ 04 节是 micro × accum × dp 三档 stepper + 4 个真实场景预设
 *     不是 moe 的 257 网格 / quantization 的 chip 阵列
 *   ─ 05 节是 5 个真实模型的横向 batch 条 + 训练 / 微调 row 切换
 *     用 hover 看 ramp 策略，不照搬 moe 的 7 卡 sort
 *   ─ 06 节用 GPU 时间槽 SVG before / after 讲训练 batch ≠ 推理 continuous batching
 *     反模板结尾，不是"展望 / 陷阱"
 *
 * 6 个 section：是什么 → 一次更新 → 大 batch 诅咒 → effective 乘法器 → 2026 配方 → 训练 vs 推理。
 */
import React from "react";
import SectionWhatIs from "./components/SectionWhatIs";
import SectionOneUpdate from "./components/SectionOneUpdate";
import SectionSharpFlat from "./components/SectionSharpFlat";
import SectionEffective from "./components/SectionEffective";
import SectionRecipes from "./components/SectionRecipes";
import SectionTrainVsServe from "./components/SectionTrainVsServe";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionWhatIs />
      <SectionOneUpdate />
      <SectionSharpFlat />
      <SectionEffective />
      <SectionRecipes />
      <SectionTrainVsServe />
    </div>
  );
};

export default App;
