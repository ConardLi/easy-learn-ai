/**
 * NLP · 一份手册
 *
 * 反模板（区别于 llm / agent / rag / quantization / distill / function-calling / moe 七个姐妹站）：
 *   ─ 不抄 llm 站的 6 年模型时间线 —— 我们走 70 年做法换代，焦点是「方法换了 4 次」
 *   ─ Hero 直接给「输入一句话 → 看它被切成 token / 变成向量」 mini 演示（L4）
 *   ─ 整站围绕 NLP 的核心动作：「把字变数字」—— Section 3 是三家 tokenizer 实时对比
 *   ─ Section 4 拿 Word2Vec king−man+woman 经典做向量直觉，配 2026 MTEB 排行
 *   ─ Section 5 是「2016 vs 2026」管线对比 toggle —— 6 步老 pipeline 被 LLM 一步替掉
 *   ─ Section 6 任务大地图，可按「被 LLM 吃掉的程度」排序
 *
 * 6 个 section，按「定义 → 历史 → tokenize → embed → pipeline → 任务现状」递进。
 */
import React from "react";
import SectionWhat from "./components/SectionWhat";
import SectionParadigms from "./components/SectionParadigms";
import SectionTokenizer from "./components/SectionTokenizer";
import SectionEmbedding from "./components/SectionEmbedding";
import SectionPipelineDiff from "./components/SectionPipelineDiff";
import SectionTasksToday from "./components/SectionTasksToday";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionWhat />
      <SectionParadigms />
      <SectionTokenizer />
      <SectionEmbedding />
      <SectionPipelineDiff />
      <SectionTasksToday />
    </div>
  );
};

export default App;
