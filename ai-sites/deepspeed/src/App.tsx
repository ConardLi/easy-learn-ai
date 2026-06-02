/**
 * DeepSpeed · 一份手册
 *
 * 反模板设计（区别于已完成的 10 站）：
 *   ─ Hero 主交互 = ZeRO stage × GPU 数 chip 组合 → N 张卡的显存堆叠柱
 *     不是 batch-size 的连续 slider，也不是 quantization 的 7-pill bit 选择
 *   ─ 02 是「显存账单」: model size slider 拖 1B→1T，4 段堆叠柱实时变
 *     新视觉语言，没有姐妹站用过类似 4-段堆叠
 *   ─ 03 单步 trace ZeRO 0→1→2→3：4 GPU × 3 块状态的拆分动画
 *     trace 但题材完全不同于 batch-size 的 fwd/bwd/step
 *   ─ 04 三段 toggle (GPU only / +CPU / +NVMe) + 速度 vs 显存双柱
 *     新组合，没有别站用过
 *   ─ 05 3D 并行 stepper：DP/TP/PP 三档调，16 GPU 矩阵按三维着色
 *     stepper 但产物完全不同：是 3D 网格着色，不是 batch-size 的乘法器
 *   ─ 06 双 chip 阵列：模型 × 集群 → 推荐配置
 *     借鉴 quantization 的 Fit 形式但题材完全不同（这里是「能不能训」不是「跑得动」）
 *   ─ 07 家族 + tab 对比：6 个 DeepSpeed 子库 + vs FSDP / Megatron / vLLM
 *     收尾用工程选型表，不写鸡汤
 *
 * 跟 batch-size 站差异化（同属"训练工程"主题）：
 *   batch-size 讲「每步看多少样本」（数据维度）
 *   这站讲「模型 / 状态 / 计算怎么分摊到多卡」（显存 + 并行维度）
 *   batch-size 用 1D loss landscape 球 / micro×accum×dp 乘法 / GPU 时间槽
 *   这站用 N 卡显存柱 / 4 段堆叠柱 / 3D 立方网格 / offload 阶梯
 *
 * 7 个 section：是什么 → 显存账单 → ZeRO 怎么拆 → 装不下就 offload → 3D 切 → 真实配置 → 全家桶选型。
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionMemoryBill from "./components/SectionMemoryBill";
import SectionZeRO from "./components/SectionZeRO";
import SectionOffload from "./components/SectionOffload";
import Section3D from "./components/Section3D";
import SectionFit from "./components/SectionFit";
import SectionFamily from "./components/SectionFamily";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionMemoryBill />
      <SectionZeRO />
      <SectionOffload />
      <Section3D />
      <SectionFit />
      <SectionFamily />
    </div>
  );
};

export default App;
