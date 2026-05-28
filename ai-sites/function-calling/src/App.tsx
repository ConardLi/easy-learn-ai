/**
 * Function Calling · 一份手册
 *
 * 反模板设计（区别于 llm / agent / rag / quantization 四个姐妹站）：
 *   ─ Hero 不是数轴 slider 也不是 7-pill —— 是 raw API JSON 解剖 + 三家协议 tab 切换
 *   ─ 没有 Think-Act-Observe 循环（agent 站的领域）—— 我们讲单次调用的 message 协议
 *   ─ 主交互轴是「messages 数组」「JSON schema」「timeline」，纯协议层
 *   ─ 结尾 dark section 讲 MCP 标准化 + 4 种 production 失败模式
 *
 * 6 个 section · 反直觉钩子 → 协议机制 → schema → 时序 → 评测 → 失败/MCP
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionRoundTrip from "./components/SectionRoundTrip";
import SectionSchemaEditor from "./components/SectionSchemaEditor";
import SectionParallel from "./components/SectionParallel";
import SectionBench from "./components/SectionBench";
import SectionMCP from "./components/SectionMCP";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionRoundTrip />
      <SectionSchemaEditor />
      <SectionParallel />
      <SectionBench />
      <SectionMCP />
    </div>
  );
};

export default App;
