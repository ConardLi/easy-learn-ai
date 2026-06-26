/**
 * Section 04 · ONNX Runtime：同一个文件，硬件自己挑最快的算法
 *
 * 概念：光有 .onnx 文件还不够，得有个程序去「读图并算」。这个程序就是 ONNX Runtime。
 * 它的本事是：同一个文件，能用上不同硬件（CPU/GPU/NPU），自动挑当前机器最快的执行方式。
 *
 * 交互：tab 切换硬件后端（CPU / NVIDIA GPU / 手机 NPU），看相对速度条 + 说明。
 */
import React, { useState } from "react";
import { Cpu, Zap, Smartphone } from "lucide-react";

type Backend = "cpu" | "gpu" | "npu";

const DATA: Record<Backend, { label: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; speed: number; ep: string; note: string }> = {
  cpu: {
    label: "普通 CPU",
    Icon: Cpu,
    speed: 18,
    ep: "CPU Execution Provider",
    note: "啥机器都有，不挑硬件。慢一点，但保证能跑。",
  },
  gpu: {
    label: "NVIDIA 显卡",
    Icon: Zap,
    speed: 95,
    ep: "CUDA / TensorRT Provider",
    note: "有独显就交给它，同一个文件直接快好几倍。",
  },
  npu: {
    label: "手机 NPU",
    Icon: Smartphone,
    speed: 60,
    ep: "CoreML / NNAPI Provider",
    note: "手机里专门跑 AI 的芯片，省电又快，适合端上。",
  },
};

const SectionRunAnywhere: React.FC = () => {
  const [backend, setBackend] = useState<Backend>("gpu");
  const data = DATA[backend];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">onnx runtime</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          读这张图、并真正算出来的，是 ONNX Runtime
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/70 text-[16px] mb-8">
          <p>
            光有 <code className="font-mono text-[14px] bg-cream px-1.5 py-0.5 rounded border border-ink/15">.onnx</code> 文件还不够 —— 得有个程序去读它、照着图把运算做完。这个程序最常用的就是微软开源的 <strong className="text-ink">ONNX Runtime</strong>。
          </p>
          <p>
            它最实用的本事：同一个文件，能用上当前机器最快的硬件。有显卡就用显卡，手机上就用 NPU，啥都没有就用 CPU 兜底。你不用改模型。
          </p>
        </div>

        {/* tab */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {(Object.keys(DATA) as Backend[]).map((b) => {
            const on = b === backend;
            const Icon = DATA[b].Icon;
            return (
              <button
                key={b}
                onClick={() => setBackend(b)}
                className={[
                  "flex items-center gap-2.5 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                  on ? "bg-ink text-cream shadow-stamp-lg" : "bg-cream text-ink hover:bg-butter-tint",
                ].join(" ")}
              >
                <div className={["w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center shrink-0", on ? "bg-pop" : "bg-white"].join(" ")}>
                  <Icon className="w-4 h-4 text-ink" strokeWidth={2.4} />
                </div>
                <span className="font-display text-[13.5px] font-bold leading-tight">{DATA[b].label}</span>
              </button>
            );
          })}
        </div>

        {/* 速度卡 */}
        <div key={backend} className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-7 animate-enter-fade">
          <div className="font-mono text-[11px] text-ink/55 mb-1">运行同一个 model.onnx，交给</div>
          <div className="font-display text-[22px] font-bold text-ink mb-1">{data.label}</div>
          <div className="font-mono text-[11px] text-ink/45 mb-5">
            ONNX Runtime 内部走 {data.ep}
          </div>

          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
            相对推理速度（示意）
          </div>
          <div className="flex items-baseline gap-1.5 mb-2">
            <span className="font-display text-[44px] font-bold text-ink leading-none tabular-nums">{data.speed}</span>
            <span className="font-mono text-[13px] text-ink/50">/ 100</span>
          </div>
          <div className="h-3.5 bg-ink/8 rounded-full overflow-hidden border border-ink/15 mb-5">
            <div
              className="h-full bg-pop transition-all duration-500 ease-spring"
              style={{ width: `${data.speed}%` }}
            />
          </div>

          <p className="text-[14.5px] text-ink/80 leading-relaxed">{data.note}</p>
        </div>

        <p className="mt-5 font-mono text-[11px] text-ink/45 max-w-2xl">
          ONNX Runtime 把不同硬件的支持叫「Execution Provider」。示意速度，真实倍率随模型和硬件而变。
        </p>
      </div>
    </section>
  );
};

export default SectionRunAnywhere;
