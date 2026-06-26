/**
 * Safetensors · 一份手册
 *
 * 学习路径（6 节，递进：是什么 → 老格式的雷 → 文件长啥样 → 为啥快 → 存啥不存啥 → 2026 现状）
 *   01 Hero        —— 一句话定义 + 直接拆一个 safetensors 文件（目录 + 数据区）
 *   02 PickleRisk  —— 老格式 .bin/.pt 加载时会偷偷跑代码（pickle 风险，可交互对比）
 *   03 Anatomy     —— 文件三段：8 字节长度 + JSON 目录 + 紧凑数据，单步拆
 *   04 ZeroCopy    —— 为啥加载快：按地址直接读（内存映射 / 零拷贝）
 *   05 WhatStores  —— 只存权重数字，不存代码 / 不存怎么算（跟 GGUF / ONNX 分锅）
 *   06 Ecosystem   —— 2026 现状 + 跨站互链
 *
 * 视觉锚：teal 主色 + 文件 / 锁的隐喻（区别于 quantization 的数轴、gguf 的盒子）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionPickleRisk from "./components/SectionPickleRisk";
import SectionAnatomy from "./components/SectionAnatomy";
import SectionZeroCopy from "./components/SectionZeroCopy";
import SectionWhatStores from "./components/SectionWhatStores";
import SectionEcosystem from "./components/SectionEcosystem";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionPickleRisk />
      <SectionAnatomy />
      <SectionZeroCopy />
      <SectionWhatStores />
      <SectionEcosystem />
    </div>
  );
};

export default App;
