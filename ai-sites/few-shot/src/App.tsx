/**
 * Few-shot Learning · 一份手册（单页向下滚）
 *
 * 6 节循序渐进：
 *   01 Hero          Few-shot = 在问题前面先给模型几个「输入→输出」例子，让它照着做新题
 *   02 ZeroVsFew     同一道情感分类：给 0 / 1 / 3 个例子，输出从乱到齐（slider）
 *   03 Anatomy       一个例子长什么样（输入 + 输出 配对）+ 用户自己加例子拼 prompt（输入框 live preview）
 *   04 HowMany       给几个最合适：收益递减 + 吃 token（slider + 示意曲线）
 *   05 Pitfalls      三种翻车：例子选偏带歪 / 格式不统一 / 例子太长把窗口塞满（accordion）
 *   06 Neighbors     Few-shot 和邻居：一种 prompt 写法 / 跟微调的区别 / 常和 CoT 一起用（聚合卡 + 收尾）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionZeroVsFew from "./components/SectionZeroVsFew";
import SectionAnatomy from "./components/SectionAnatomy";
import SectionHowMany from "./components/SectionHowMany";
import SectionPitfalls from "./components/SectionPitfalls";
import SectionNeighbors from "./components/SectionNeighbors";

const App: React.FC = () => {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink antialiased">
      <SectionHero />
      <SectionZeroVsFew />
      <SectionAnatomy />
      <SectionHowMany />
      <SectionPitfalls />
      <SectionNeighbors />
    </div>
  );
};

export default App;
