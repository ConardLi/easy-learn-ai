/**
 * 预训练 · 一份手册
 *
 * 反模板设计（区别于已完成 20 站 & 同期 sft/finetune/epochs）：
 *   ─ Hero 主交互不是 H1 钩子，而是「4 个真实旗舰 base model 训练账本」chip+slider
 *   ─ 整站视觉锚是 Chinchilla 双 stepper + 散点（不是 batch-size 1D loss ball / loss 5 曲线）
 *   ─ Emerge 不用 chip 阵列（quantization 用了）也不用蛛网（mcp 用了），改 FLOPs slider 解锁能力
 *   ─ After 不用拼装编辑器（whyfinetune 用了），改 3 步 trace 同 prompt 三种响应对比
 *
 * 6 个 section，按"是什么 → 唯一动作 → 数据食谱 → 能力解锁 → 算账 → 训完之后"递进。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionPredict from "./components/SectionPredict";
import SectionDataMix from "./components/SectionDataMix";
import SectionEmerge from "./components/SectionEmerge";
import SectionChinchilla from "./components/SectionChinchilla";
import SectionAfter from "./components/SectionAfter";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionPredict />
      <SectionDataMix />
      <SectionEmerge />
      <SectionChinchilla />
      <SectionAfter />
    </div>
  );
};

export default App;
