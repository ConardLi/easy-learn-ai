/**
 * GPT · 一份手册
 *
 * 反模板设计（区别于 llm / bert / deepseek-r1 / llama / t5 这几个相邻具体模型站）：
 *   ─ 不做 llm 站那种 6 年大模型横向时间线 + 厂商 chip 过滤
 *   ─ 不做 bert 家族站那种横向时间节点 + GLUE 折线
 *   ─ 不做 deepseek-r1 那种 6 模型 picker + bar 对比
 *
 * 7 个 section，专注「OpenAI 闭源 decoder-only 旗舰这一支」的演进。
 * 整站交互形式：天数 slider · token 比例条 · 三分支族谱树 · few-shot slider ·
 *               价格代际切换 + 对数 bar · pill + think trace · accordion
 */
import React from "react";
import SectionWhat from "./components/SectionWhat";
import SectionOneIdea from "./components/SectionOneIdea";
import SectionLineage from "./components/SectionLineage";
import SectionFewShot from "./components/SectionFewShot";
import SectionPrice from "./components/SectionPrice";
import SectionReasoning from "./components/SectionReasoning";
import SectionAfter5 from "./components/SectionAfter5";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionWhat />
      <SectionOneIdea />
      <SectionLineage />
      <SectionFewShot />
      <SectionPrice />
      <SectionReasoning />
      <SectionAfter5 />
    </div>
  );
};

export default App;
