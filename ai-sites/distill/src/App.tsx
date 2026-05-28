/**
 * Distill · 一份手册
 *
 * 反模板（区别于 llm / agent / rag / quantization 四个姐妹站）：
 *   ─ 不是「Opening → Contrast → CoreLoop → BuildingBlocks → Patterns → Challenges」老 6 件套
 *   ─ 不用 quantization 的「数轴 + 7-pill 选择器 + chip 阵列任务推荐 + accordion 方法对比」
 *   ─ 节奏：反直觉钩子 → teacher 视角拆解 → 双 loss 拉绳 → 真实战绩 → 11 年家谱 → 三个坑
 *   ─ 6 种交互形式：连续 slider / thumbnail picker / 双 slider / benchmark tab / 时间线 snap-slider / 卡片翻面
 *
 * section 间用 cream / white 交替制造节奏。
 */
import React from "react";
import SectionDarkKnowledge from "./components/SectionDarkKnowledge";
import SectionTeacherEyes from "./components/SectionTeacherEyes";
import SectionTwoLosses from "./components/SectionTwoLosses";
import SectionR1Scoreboard from "./components/SectionR1Scoreboard";
import SectionLineage from "./components/SectionLineage";
import SectionTraps from "./components/SectionTraps";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionDarkKnowledge />
      <SectionTeacherEyes />
      <SectionTwoLosses />
      <SectionR1Scoreboard />
      <SectionLineage />
      <SectionTraps />
    </div>
  );
};

export default App;
