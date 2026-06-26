/**
 * Section 03 · 文件长什么样（单步拆）
 *
 * 把一个 safetensors 文件从头读一遍，分 3 步：
 *   step0 开头 8 字节 = 一个数字，告诉你「目录有多长」
 *   step1 紧接着是 JSON 目录 = 每个张量的名字 / 类型 / 形状 / 在数据区的位置
 *   step2 剩下全是数据 = 一个个张量的数字，紧挨着排，没有分隔
 *
 * 交互：next / prev 单步 trace，高亮文件对应段 + 解释。
 */
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

type Step = {
  key: string;
  title: string;
  desc: string;
  highlight: "len" | "json" | "data";
};

const STEPS: Step[] = [
  {
    key: "len",
    title: "开头 8 个字节：目录有多长",
    desc: "文件最前面是一个数字，意思是「接下来这段目录占了 N 个字节」。读它，程序就知道目录读到哪里为止。",
    highlight: "len",
  },
  {
    key: "json",
    title: "接着是 JSON 目录：每个张量的登记表",
    desc: "一段 JSON，把每个张量登记清楚：叫什么名、什么数据类型、形状多大、数字存在数据区的第几到第几字节。",
    highlight: "json",
  },
  {
    key: "data",
    title: "剩下全是数据：紧挨着的数字",
    desc: "目录之后就是纯数字，一个张量接一个张量紧紧排着，中间没有任何分隔符。靠的就是目录里记的位置去切分。",
    highlight: "data",
  },
];

const SectionAnatomy: React.FC = () => {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">anatomy</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          一个 safetensors 文件，从头读到尾就三段
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          它的结构特别简单：先说目录有多长，再放目录（就是一段记账用的文本，格式叫 JSON），最后堆数据。一步一步看。
        </p>

        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* 左：文件竖向条 */}
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
              model.safetensors · 从上往下读
            </div>
            <div className="space-y-2">
              <FileBlock
                label="8 字节"
                title="目录长度"
                sample="00 00 02 1C 00 00 00 00"
                color="bg-butter"
                active={step.highlight === "len"}
              />
              <FileBlock
                label="JSON 目录"
                title="张量登记表"
                sample={'{"embed.weight":{"dtype":"F16","shape":[32000,768],"offsets":[0,49152000]}, ... }'}
                color="bg-teal"
                textLight
                active={step.highlight === "json"}
              />
              <FileBlock
                label="数据区"
                title="一堆数字，紧挨着"
                sample="3C00 BBE8 4120 ... （embed）（attn.q）（attn.k）..."
                color="bg-coral"
                active={step.highlight === "data"}
                tall
              />
            </div>
          </div>

          {/* 右：当前 step 解释 */}
          <div className="lg:sticky lg:top-8">
            <div key={i} className="bg-cream border-2 border-ink rounded-3xl shadow-stamp p-6 lg:p-7 animate-enter-fade">
              <div className="font-mono text-[11px] text-ink/50 mb-2">
                第 {i + 1} 步 / 共 {STEPS.length} 步
              </div>
              <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-tight mb-3">
                {step.title}
              </h3>
              <p className="text-[15.5px] text-ink/75 leading-relaxed">{step.desc}</p>
            </div>

            {/* 控制 */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setI((v) => Math.max(0, v - 1))}
                disabled={i === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border-2 border-ink rounded-full font-bold text-[13px] disabled:opacity-35 hover:-translate-x-0.5 transition-transform"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={2.5} /> 上一步
              </button>
              <button
                onClick={() => setI((v) => Math.min(STEPS.length - 1, v + 1))}
                disabled={i === STEPS.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-ink text-cream border-2 border-ink rounded-full font-bold text-[13px] disabled:opacity-35 hover:translate-x-0.5 transition-transform"
              >
                下一步 <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
              </button>
              <button
                onClick={() => setI(0)}
                className="inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-ink rounded-full hover:rotate-[-30deg] transition-transform"
                title="重来"
              >
                <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            <div className="mt-5 px-4 py-3 bg-ink text-cream rounded-2xl border-2 border-ink">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">关键</div>
              <p className="text-[14px] leading-relaxed">
                只要读完前面那点目录，程序就知道每个张量在哪、占多少字节，可以挑着读，不用把整个文件全搬进内存。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FileBlock: React.FC<{
  label: string;
  title: string;
  sample: string;
  color: string;
  active: boolean;
  textLight?: boolean;
  tall?: boolean;
}> = ({ label, title, sample, color, active, textLight, tall }) => (
  <div
    className={[
      "border-2 border-ink rounded-2xl overflow-hidden transition-all duration-300",
      active ? "shadow-stamp -translate-x-1 -translate-y-1" : "opacity-55",
    ].join(" ")}
  >
    <div className={[color, "px-4 py-2 flex items-center justify-between"].join(" ")}>
      <span className={["font-display text-[14px] font-bold", textLight ? "text-cream" : "text-ink"].join(" ")}>
        {title}
      </span>
      <span
        className={[
          "font-mono text-[10px] px-2 py-0.5 rounded-full border",
          textLight ? "text-cream border-cream/40" : "text-ink border-ink/30",
        ].join(" ")}
      >
        {label}
      </span>
    </div>
    <div className={["bg-white px-4 py-2.5 font-mono text-[10.5px] text-ink/65 break-all", tall ? "py-4" : ""].join(" ")}>
      {sample}
    </div>
  </div>
);

export default SectionAnatomy;
