/**
 * MCP · 一份手册
 *
 * 反模板设计（区别于 function-calling / agent / llm / rag / quantization 等姐妹站）：
 *   ─ 不做 JSON 字段 chip 解剖（fc 站做过）
 *   ─ 不做 messages 数组单步增长（fc 站做过）
 *   ─ 不做 SVG gantt timeline（fc 站做过）
 *   ─ 主交互轴 = 「Host / Client / Server 三角」+「M×N → M+N 集成线对比」+「server 市场」
 *
 * 7 个 section，按「定义 → 在 MCP 之前 → 架构 → 三类 primitives → 协议来回 → 生态 → vs FC」递进。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionBeforeMcp from "./components/SectionBeforeMcp";
import SectionTriangle from "./components/SectionTriangle";
import SectionPrimitives from "./components/SectionPrimitives";
import SectionWire from "./components/SectionWire";
import SectionMarket from "./components/SectionMarket";
import SectionVsFc from "./components/SectionVsFc";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionBeforeMcp />
      <SectionTriangle />
      <SectionPrimitives />
      <SectionWire />
      <SectionMarket />
      <SectionVsFc />
    </div>
  );
};

export default App;
