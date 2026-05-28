/**
 * MoE · 一份手册
 *
 * 反模板设计（区别于 llm / agent / rag / quantization 四站）：
 *   ─ Hero 用「输入框 + 实时路由可视」（L4），不抢离散 pill / 数轴 slider
 *   ─ Section 02 是 2D 平面 + 可拖 token 看 router 内部，不是数轴 / chip
 *   ─ Section 03 是横排 7 个真实 MoE 模型对比卡 + 多轴 sort，不是 accordion
 *   ─ Section 04 让用户当 router（L4 任务模拟器），quantization 全站没有这种
 *   ─ Section 05 是 before/after toggle + 训练步数 slider，看 8 个专家利用率坍缩，独有视觉
 *   ─ Section 06 是双账本（算力 vs 显存）讲 MoE 的代价，反模板结尾
 *
 * 6 个 section，按「反直觉 → 拆解机制 → 真实生态 → 让你做一次 → 它怎么稳 → 代价」递进。
 */
import React from "react";
import SectionLive from "./components/SectionLive";
import SectionRouter from "./components/SectionRouter";
import SectionGallery from "./components/SectionGallery";
import SectionAsRouter from "./components/SectionAsRouter";
import SectionBalance from "./components/SectionBalance";
import SectionCost from "./components/SectionCost";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionLive />
      <SectionRouter />
      <SectionGallery />
      <SectionAsRouter />
      <SectionBalance />
      <SectionCost />
    </div>
  );
};

export default App;
