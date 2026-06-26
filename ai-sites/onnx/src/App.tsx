/**
 * ONNX · 一份手册
 *
 * 学习路径（6 节）
 *   01 Hero        —— 一句话定义 + 「一次导出，到处运行」的可点切换图
 *   02 Pain        —— 没有 ONNX 时：PyTorch 训的模型搬到手机/浏览器/C++ 要重写
 *   03 Graph       —— ONNX 是把模型变成一张「计算图」，单步看一个算子图
 *   04 RunAnywhere —— ONNX Runtime 在 CPU/GPU/NPU 上跑同一个文件
 *   05 Pitfalls    —— opset 版本 / 算子不支持这些真实坑
 *   06 Ecosystem   —— 分锅（safetensors/gguf）+ 2026 现状 + 互链
 *
 * 视觉锚：pop 紫 + 计算图节点连线的隐喻（区别于 safetensors 的文件/锁、quantization 的数轴）
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionPain from "./components/SectionPain";
import SectionGraph from "./components/SectionGraph";
import SectionRunAnywhere from "./components/SectionRunAnywhere";
import SectionPitfalls from "./components/SectionPitfalls";
import SectionEcosystem from "./components/SectionEcosystem";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionPain />
      <SectionGraph />
      <SectionRunAnywhere />
      <SectionPitfalls />
      <SectionEcosystem />
    </div>
  );
};

export default App;
