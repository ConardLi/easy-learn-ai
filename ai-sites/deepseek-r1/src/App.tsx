/**
 * DeepSeek R1 · 一份手册
 *
 * 反模板设计（区别于 llm / agent / rag / quantization / distill / function-calling / moe / batch-size / nlp / rlhf 十站）：
 *   ─ Hero 直接带"R1 真实 reasoning trace 流式播放"（不是数轴 / 不是 textarea / 不是 7-pill / 不是 AB 偏好任务）
 *   ─ 主轴是"看模型自言自语"+ "你来当 GRPO 评分员"（任务模拟器 L4），不是 SFT→RM→PPO 三件套
 *   ─ Section 02 是 slider 拉训练 step 看两条曲线（pass@1 + 反思词频次），跟 rlhf 的 KL slider 不同 —— 这里 x 轴是训练步而非 β
 *   ─ Section 04 GRPO 模拟器：用规则奖励 + 组内对比算 advantage，跟 rlhf "A/B 偏好" 模拟器完全不同
 *   ─ Section 05 6 个 distill 模型 picker + benchmark 横向 bar，跟 distill 站的「温度 T slider + 概率柱」不同
 *   ─ Section 07 timeline snap-slider + accordion 复现，跟 rlhf SectionFamilies 的家谱卡片网格也不一样
 *
 * 节奏：
 *   01 是什么 + R1 真实 trace 流式播放（L3）
 *   02 反直觉：跳过 SFT 也能学推理 / slider + 关键词 chip（L3 + L2）
 *   03 aha moment 4 案例 + hover 联动（L2）
 *   04 你来当 GRPO 评分员（L4 任务模拟器）
 *   05 6 个 R1-Distill 模型 picker + 4 benchmark tab（L3 + L2）
 *   06 训练四阶段单步 trace（L2）
 *   07 R1 之后的家族时间线 snap-slider + 4 复现 accordion（L3 + L2）
 *
 * 交互形式 ≥ 8 种：trace 流式 / 双曲线 slider / 案例 tab + hover 联动 /
 *   任务模拟器 / 模型 picker grid / benchmark tab / 单步 trace / timeline slider / accordion
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionEmergence from "./components/SectionEmergence";
import SectionAhaCases from "./components/SectionAhaCases";
import SectionGRPO from "./components/SectionGRPO";
import SectionDistill from "./components/SectionDistill";
import SectionPipeline from "./components/SectionPipeline";
import SectionAfterR1 from "./components/SectionAfterR1";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionEmergence />
      <SectionAhaCases />
      <SectionGRPO />
      <SectionDistill />
      <SectionPipeline />
      <SectionAfterR1 />
    </div>
  );
};

export default App;
