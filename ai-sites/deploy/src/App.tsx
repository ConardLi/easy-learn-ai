/**
 * 模型部署 · 一份手册
 *
 * 6 个 section，按「直接看差距 → 三个世界 → 招牌技术 → 工具谱 → 自己算 → 自己选」递进。
 * 反模板：
 *   ─ Hero 不堆 7-pill / 数轴（quantization 已用）；用 slider + 4 条曲线
 *   ─ 不画 GPU 显存堆叠柱（deepspeed 已用）；用块网格内存碎片对比
 *   ─ 不做 9400 服务货架（mcp 已用）；用 accordion 加迷你 sketch
 *   ─ 不堆乘法计算器（batch-size 已用）；用 4 步任务式问答
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionThreeWorlds from "./components/SectionThreeWorlds";
import SectionPagedAttention from "./components/SectionPagedAttention";
import SectionTools from "./components/SectionTools";
import SectionMetrics from "./components/SectionMetrics";
import SectionPicker from "./components/SectionPicker";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionThreeWorlds />
      <SectionPagedAttention />
      <SectionTools />
      <SectionMetrics />
      <SectionPicker />
    </div>
  );
};

export default App;
