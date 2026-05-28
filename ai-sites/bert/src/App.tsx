/**
 * BERT · 一份手册
 *
 * 反模板（区别于 llm / agent / rag / quantization / distill / function-calling / moe /
 * batch-size / nlp / rlhf 已完成 10 站）：
 *   ─ Hero 是「MLM 让你来」 —— 用户点句子里任意词把它盖住，看 BERT top-4 候选
 *     （区别于 nlp 站的「字 → 数 → 向量」三段、llm 站的脑模型动画）
 *   ─ Section 02 双向 vs 单向 attention 矩阵，pill 切 BERT/GPT + 点 token 高亮一行
 *   ─ Section 03 MLM 6 步单步 trace + NSP 你来判断（避免 pill→pill）
 *   ─ Section 04 任务 head 切换：4 种任务 chip + BERT body SVG + head 形状
 *   ─ Section 05 BERT 家族时间线 + GLUE 折线（专注 encoder-only 一支）
 *   ─ Section 06 生产场景翻面卡 +「为什么不用 GPT-4」硬数字
 *
 * 6 个 section，整站交互形式：input mask / pill+矩阵 / 单步 trace / chip / 时间线 / 翻面卡
 */
import React from "react";
import SectionWhat from "./components/SectionWhat";
import SectionBothEyes from "./components/SectionBothEyes";
import SectionTrain from "./components/SectionTrain";
import SectionHeads from "./components/SectionHeads";
import SectionFamily from "./components/SectionFamily";
import SectionLiveIn2026 from "./components/SectionLiveIn2026";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionWhat />
      <SectionBothEyes />
      <SectionTrain />
      <SectionHeads />
      <SectionFamily />
      <SectionLiveIn2026 />
    </div>
  );
};

export default App;
