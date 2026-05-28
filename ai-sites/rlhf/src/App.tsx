/**
 * RLHF · 一份手册
 *
 * 反模板（区别于 llm / agent / rag / quantization / distill / function-calling / moe 七站）：
 *   ─ 没有数轴 slider / 7-pill / temperature slider / JSON 协议 tab / textarea + 路由网格
 *   ─ 主交互轴：让用户当一回人类标注员（A/B 偏好任务模拟器，L4）
 *   ─ 中段是「KL 皮带」slider，调约束力度看模型回答从『贴 SFT』到『跑飞』
 *   ─ 三阶段 pipeline 是单步 trace，每步换主角模型（SFT→RM→PPO）
 *   ─ reward hacking 用真实案例 chip 阵列 + accordion（CoastRunners / METR o3 / sycophancy）
 *   ─ 结尾是 2026 对齐家族表 + 哪家在用（不是「未来展望」鸡汤）
 *
 * 节奏：定义 → 让你做一次 → 拆机制 → 调皮带 → 翻车现场 → 当代家谱
 */
import React from "react";
import SectionWhat from "./components/SectionWhat";
import SectionYouRank from "./components/SectionYouRank";
import SectionPipeline from "./components/SectionPipeline";
import SectionKLLeash from "./components/SectionKLLeash";
import SectionRewardHack from "./components/SectionRewardHack";
import SectionFamilies from "./components/SectionFamilies";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionWhat />
      <SectionYouRank />
      <SectionPipeline />
      <SectionKLLeash />
      <SectionRewardHack />
      <SectionFamilies />
    </div>
  );
};

export default App;
