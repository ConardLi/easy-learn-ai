/**
 * Section 03 · ONNX 是把模型变成一张「计算图」
 *
 * 核心机制：一个 .onnx 文件，本质是一张图 —— 一串「算子」节点（加、乘、激活…）连起来，
 * 数据从输入流到输出。任何框架只要看懂这张图，就能照着算。
 *
 * 交互：单步 trace。一个 4 节点的小图（输入 → 矩阵乘 → 加偏置 → 激活 → 输出），
 * next 让数据一步步往下流，高亮当前算子 + 显示它在干嘛 + 当前数值。
 */
import React, { useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

type Node = {
  id: string;
  label: string;
  op: string;
  desc: string;
  value: string;
};

const NODES: Node[] = [
  { id: "in", label: "输入", op: "input", desc: "一组数字进来，比如一张图片的像素。", value: "[0.5, 0.8]" },
  { id: "matmul", label: "矩阵乘 MatMul", op: "MatMul", desc: "跟权重做矩阵乘法，这是模型最核心的运算。", value: "[1.21, 0.63]" },
  { id: "add", label: "加偏置 Add", op: "Add", desc: "加上一组偏置值，微调结果。", value: "[1.31, 0.43]" },
  { id: "relu", label: "激活 Relu", op: "Relu", desc: "把负数全压成 0，正数原样留着。模型靠这一下，才能学会复杂的弯弯绕。", value: "[1.31, 0.43]" },
  { id: "out", label: "输出", op: "output", desc: "算完，吐出最终结果。", value: "[1.31, 0.43]" },
];

const SectionGraph: React.FC = () => {
  const [step, setStep] = useState(0);
  const cur = NODES[step];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">it's a graph</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          .onnx 文件里装的，是一张「计算图」
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/70 text-[16px] mb-8">
          <p>
            一个模型说到底就是一连串运算：把输入数字乘一乘、加一加、过个激活函数，最后得到输出。
          </p>
          <p>
            ONNX 把这串运算画成一张图：每个方块是一个「算子」（一种运算），数据顺着箭头往下流。换个框架，只要照着这张图重新算一遍就行。
          </p>
        </div>

        {/* 图 */}
        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-4">
            数据从左流到右
          </div>
          <div className="flex items-stretch gap-1.5 sm:gap-2 overflow-x-auto pb-2">
            {NODES.map((n, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <React.Fragment key={n.id}>
                  <div
                    className={[
                      "flex-1 min-w-[88px] px-2 py-3 border-2 border-ink rounded-2xl text-center transition-all duration-300",
                      active
                        ? "bg-pop text-cream shadow-stamp -translate-y-1"
                        : done
                        ? "bg-teal text-cream"
                        : "bg-white text-ink/45",
                    ].join(" ")}
                  >
                    <div className="font-mono text-[9px] uppercase tracking-[0.1em] opacity-70 mb-1">
                      {n.op}
                    </div>
                    <div className="font-display text-[12.5px] font-bold leading-tight">{n.label}</div>
                  </div>
                  {i < NODES.length - 1 && (
                    <div className="flex items-center shrink-0">
                      <ArrowRight
                        className={["w-4 h-4 transition-colors", i < step ? "text-teal" : "text-ink/25"].join(" ")}
                        strokeWidth={2.6}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* 当前算子说明 */}
          <div key={step} className="mt-5 grid sm:grid-cols-3 gap-4 animate-enter-fade">
            <div className="sm:col-span-2 px-4 py-4 bg-white border-2 border-ink rounded-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-1">
                这一步：{cur.label}
              </div>
              <p className="text-[14.5px] text-ink/80 leading-relaxed">{cur.desc}</p>
            </div>
            <div className="px-4 py-4 bg-ink text-cream border-2 border-ink rounded-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
                此刻的数值
              </div>
              <div className="font-mono text-[18px] font-bold tabular-nums">{cur.value}</div>
            </div>
          </div>

          {/* 控制 */}
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={() => setStep((v) => Math.min(NODES.length - 1, v + 1))}
              disabled={step === NODES.length - 1}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-ink text-cream border-2 border-ink rounded-full font-bold text-[13px] disabled:opacity-35 hover:translate-x-0.5 transition-transform"
            >
              让数据往下流一步 <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => setStep(0)}
              className="inline-flex items-center justify-center w-10 h-10 bg-white border-2 border-ink rounded-full hover:rotate-[-30deg] transition-transform"
              title="重来"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <span className="font-mono text-[11px] text-ink/45 ml-1">
              {step + 1} / {NODES.length}
            </span>
          </div>
        </div>

        <p className="mt-5 text-[14px] text-ink/65 leading-relaxed max-w-2xl">
          所以 ONNX 里记的是「这个模型要做哪些运算、按什么顺序」，而不管你当初用 PyTorch 的什么代码写出来。这张图谁都能读。
        </p>
      </div>
    </section>
  );
};

export default SectionGraph;
