/**
 * Llama · 一份手册
 *
 * 反模板设计（区别于已完成的 26 个站，特别是 llm / bert / deepseek-r1 / moe / transformer / pretrain，
 * 以及同期 gpt / t5 / gguf）：
 *   ─ Hero 不放反直觉钩子，是「年份 slider」拖出当月 Llama 旗舰 + 对手快照（L3）
 *   ─ Section 02 反直觉「Llama 1 不是发布是泄露」9 天事件 chip + 衍生模型节点（L2）
 *   ─ Section 03 5 代架构勾选累积，看 RMSNorm / SwiGLU / RoPE / GQA / MoE 怎么一招招叠起（L3）
 *   ─ Section 04 license 法务模拟器：勾选你的场景（公司大小 / 用途）→ 能不能用（L4）
 *   ─ Section 05 Llama 4 三兄弟，pill toggle Scout/Maverick + expert 网格 16 vs 128 配比（L2）
 *   ─ Section 06 Llama 衍生模型生态树 chip 阵列筛选（L2）
 *   ─ Section 07 2026 现状 before/after：Llama 时代 vs Muse Spark 时代（L2）
 *
 * 节奏：是什么 → 怎么开始的 → 一招招怎么进化 → 开源的小字 → Llama 4 长啥样 → 它带火了谁 → 它去哪了
 *
 * 整站交互形式 ≥ 7 种：slider+快照卡 / chip+事件卡 / 勾选+累积视觉 / 任务模拟器 /
 *   pill+配比网格 / chip 阵列 / before/after toggle
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionLeak from "./components/SectionLeak";
import SectionTricks from "./components/SectionTricks";
import SectionLicense from "./components/SectionLicense";
import SectionLlama4 from "./components/SectionLlama4";
import SectionEcosystem from "./components/SectionEcosystem";
import SectionAfterLlama from "./components/SectionAfterLlama";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionLeak />
      <SectionTricks />
      <SectionLicense />
      <SectionLlama4 />
      <SectionEcosystem />
      <SectionAfterLlama />
    </div>
  );
};

export default App;
