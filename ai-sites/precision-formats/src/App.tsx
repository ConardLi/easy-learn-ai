/**
 * 大模型精度格式 · 一份手册
 *
 * 学习路径（6 节）
 *   01 Hero       —— 一句话定义 + 直接拆一个浮点数（符号/指数/尾数三格，可调）
 *   02 ThreeParts —— 一个浮点数怎么拆：符号位 / 指数位(管范围) / 尾数位(管精度)
 *   03 Compare    —— FP32/FP16/BF16/FP8 位分配并排比，看「范围 vs 精度」权衡
 *   04 WhyBf16    —— 同样 16 位，BF16 牺牲精度保范围，训练不容易溢出
 *   05 Fp8Mixed   —— FP8 + 混合精度，2026 训练/推理现状
 *   06 Ecosystem  —— 跟量化分锅（浮点 vs 整数）+ 互链
 *
 * 视觉锚：coral + butter 的「位格子」隐喻（区别于 quantization 的数轴、onnx 的图）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionThreeParts from "./components/SectionThreeParts";
import SectionCompare from "./components/SectionCompare";
import SectionWhyBf16 from "./components/SectionWhyBf16";
import SectionFp8 from "./components/SectionFp8";
import SectionEcosystem from "./components/SectionEcosystem";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionThreeParts />
      <SectionCompare />
      <SectionWhyBf16 />
      <SectionFp8 />
      <SectionEcosystem />
    </div>
  );
};

export default App;
