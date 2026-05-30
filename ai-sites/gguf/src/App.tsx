/**
 * GGUF · 一份手册
 *
 * 反模板设计（区别于 quantization / deploy 两站，及其它 23 站）：
 *   ─ 主角是「文件格式本身」：二进制 layout、metadata KV、跨平台
 *   ─ 不做 bit selector（quantization 用过了）
 *   ─ 不做工具 accordion + 内存格（deploy 用过了）
 *   ─ Hero 给一个真实 .gguf 字节流的可点切片做 anchor
 *
 * 6 个 section：定义 → 拆开看里面 → 名字怎么读 → 装得下吗 → 演化史 → 在生态里位置
 */
import React from "react";
import SectionHero from "./components/SectionHero";
import SectionAnatomy from "./components/SectionAnatomy";
import SectionDecoder from "./components/SectionDecoder";
import SectionFitcheck from "./components/SectionFitcheck";
import SectionEvolution from "./components/SectionEvolution";
import SectionPlace from "./components/SectionPlace";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <SectionHero />
      <SectionAnatomy />
      <SectionDecoder />
      <SectionFitcheck />
      <SectionEvolution />
      <SectionPlace />
    </div>
  );
};

export default App;
