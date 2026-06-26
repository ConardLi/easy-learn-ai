/**
 * Section 05 · 真实的坑（opset 版本 / 算子不支持）
 *
 * 诚实地讲：ONNX 不是导出就万事大吉。最常见两个坑：
 *   1. opset 版本对不上 —— ONNX 的「算子词典」一直在更新，导出端和运行端版本得对得上
 *   2. 有些算子还没被支持 —— 模型里某个新奇操作，ONNX 还没收录，导出会报错
 *
 * 交互：两张可点开的「坑卡」，点开看「症状 / 为啥 / 怎么办」。
 */
import React, { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";

type Pit = {
  title: string;
  symptom: string;
  why: string;
  fix: string;
};

const PITS: Pit[] = [
  {
    title: "opset 版本对不上",
    symptom: "导出能成，但拿到另一台机器上加载，报「不认识这个算子版本」。",
    why: "opset 是 ONNX 的「算子词典版本号」。这个词典一直在更新，新版加进来的写法，旧版的运行程序看不懂。",
    fix: "导出时指定一个双方都支持的 opset 版本（比如 opset 17），别用最新的就完事。",
  },
  {
    title: "有些算子还没被支持",
    symptom: "导出时直接报错：某个操作无法转成 ONNX。",
    why: "模型里用了个比较新或比较冷门的操作，ONNX 的算子表还没收录它。",
    fix: "换一种等价写法绕开它，或者把这部分拆出来单独处理，等 ONNX 后续版本补上支持。",
  },
];

const SectionPitfalls: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">the real catch</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          它不是导出就一定顺，有两个常见坑
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          ONNX 很好用，但说它「点一下就全平台跑通」是骗人的。真实里最常卡在这两件事上。点开看看。
        </p>

        <div className="space-y-3">
          {PITS.map((p, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                >
                  <div className="flex items-center justify-center w-9 h-9 bg-coral border-2 border-ink rounded-xl shrink-0">
                    <AlertTriangle className="w-4 h-4 text-cream" strokeWidth={2.4} />
                  </div>
                  <span className="font-display text-[17px] font-bold text-ink flex-1">{p.title}</span>
                  <ChevronDown
                    className={["w-5 h-5 text-ink/50 transition-transform duration-300", isOpen ? "rotate-180" : ""].join(" ")}
                    strokeWidth={2.5}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 space-y-3 animate-enter-fade">
                    <Row tag="症状" tone="coral" text={p.symptom} />
                    <Row tag="为啥" tone="ink" text={p.why} />
                    <Row tag="怎么办" tone="teal" text={p.fix} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Row: React.FC<{ tag: string; tone: "coral" | "ink" | "teal"; text: string }> = ({ tag, tone, text }) => {
  const bg = { coral: "bg-coral", ink: "bg-ink", teal: "bg-teal" }[tone];
  return (
    <div className="flex gap-3">
      <span className={[bg, "shrink-0 h-fit px-2.5 py-1 rounded-full font-mono text-[10px] font-bold text-cream uppercase tracking-[0.12em]"].join(" ")}>
        {tag}
      </span>
      <p className="text-[14.5px] text-ink/80 leading-relaxed pt-0.5">{text}</p>
    </div>
  );
};

export default SectionPitfalls;
