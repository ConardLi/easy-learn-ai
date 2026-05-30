/**
 * T5 · 一份手册
 *
 * 反模板设计（区别于 bert / transformer / llm / gpt 同期模型站 & 已完成 25 站）：
 *   ─ Hero 直接做「text-to-text 万能格式器」 —— 用户切任务前缀 + 改输入，
 *     看 T5 把所有 NLP 任务装成同一种字符串。
 *   ─ 不照搬 bert「mask 一个词 + top-4 候选」 —— 改做 span corruption（mask 连续 span）。
 *   ─ 不照搬 transformer SectionArch3 3 种架构总览 —— 这里走 T5 特化视角，
 *     做「同一任务发到 BERT / GPT / T5 三栏对比输出格式」。
 *   ─ 整站交互形式：chip + input / slider + input / pill 3 栏 / 点 token + 输入 / 纵向 accordion / 勾选组合
 *
 * 6 个 section：定义 → 预训练做啥 → 跟兄弟比 → encoder-decoder 信息流 → 家族演化 → 2026 谁还在用
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionSpanCorruption from "./components/SectionSpanCorruption";
import SectionBertGptT5 from "./components/SectionBertGptT5";
import SectionEncDecFlow from "./components/SectionEncDecFlow";
import SectionFamily from "./components/SectionFamily";
import SectionToday from "./components/SectionToday";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionSpanCorruption />
      <SectionBertGptT5 />
      <SectionEncDecFlow />
      <SectionFamily />
      <SectionToday />
    </div>
  );
};

export default App;
