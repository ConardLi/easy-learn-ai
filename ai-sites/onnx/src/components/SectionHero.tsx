/**
 * Section 01 · Hero
 *
 * 核心交互直接放 hero：左边一个「PyTorch 训练好的模型」，中间是 .onnx 文件，
 * 右边一排运行环境（手机 / 浏览器 / 服务器 / 摄像头）。点右边任意一个，连线高亮，
 * 说明「同一个 .onnx 文件，原样跑在这个环境上」。
 */
import React, { useState } from "react";
import { ArrowDown, Smartphone, Globe, Server, Cpu, Box } from "lucide-react";

const TARGETS = [
  { id: "phone", label: "手机 App", Icon: Smartphone, note: "在安卓 / iOS 上本地跑，不联网也能用。" },
  { id: "web", label: "浏览器", Icon: Globe, note: "用 ONNX Runtime Web，直接在网页里跑模型。" },
  { id: "server", label: "云服务器", Icon: Server, note: "C++ / C# / Java 后端加载同一个文件提供服务。" },
  { id: "edge", label: "摄像头 / 边缘设备", Icon: Cpu, note: "树莓派、工业相机这类小设备上也能跑。" },
];

const SectionHero: React.FC = () => {
  const [target, setTarget] = useState("web");
  const cur = TARGETS.find((t) => t.id === target)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-pop border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-pop animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                ONNX · 模型交换格式
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              ONNX
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
                <span className="relative z-10">
                  ONNX 是一种通用的模型描述格式，把一个模型导出成它，就能在各种工具和设备上原样运行。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                训练模型一般用 PyTorch 这类工具。但训练用的工具，跟最后部署模型的地方，往往不是一套环境。
              </p>
              <p>
                ONNX 是中间的「通用语」。把模型从 PyTorch 导出成一个 <code className="font-mono text-[13.5px] bg-cream px-1.5 py-0.5 rounded border border-ink/15">.onnx</code> 文件，手机、浏览器、C++ 服务都能读懂并运行它。
              </p>
              <p>
                ONNX 的全称是 Open Neural Network Exchange，意思就是「开放的神经网络交换格式」。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边点不同的运行环境，看同一个 .onnx 文件怎么哪都能跑。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/55 leading-snug max-w-[260px]">
                先看一眼「没有 ONNX 的时候有多麻烦」。
              </div>
            </div>
          </div>

          {/* 右：一次导出，到处运行 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 源头 */}
              <div className="flex items-center gap-3 mb-4">
                <div className="px-3 py-2 bg-cream border-2 border-ink rounded-xl">
                  <div className="font-mono text-[10px] text-ink/50">训练框架</div>
                  <div className="font-display text-[15px] font-bold text-ink">PyTorch</div>
                </div>
                <div className="font-mono text-[18px] text-ink/40">→</div>
                <div className="flex items-center gap-2 px-3 py-2 bg-pop border-2 border-ink rounded-xl">
                  <Box className="w-4 h-4 text-cream" strokeWidth={2.4} />
                  <div>
                    <div className="font-mono text-[10px] text-cream/70">导出</div>
                    <div className="font-display text-[15px] font-bold text-cream">model.onnx</div>
                  </div>
                </div>
              </div>

              {/* 分发线 */}
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                同一个文件，跑在哪？（点一个）
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {TARGETS.map((t) => {
                  const on = t.id === target;
                  const Icon = t.Icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTarget(t.id)}
                      className={[
                        "flex items-center gap-2.5 px-3.5 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                        on ? "bg-ink text-cream shadow-stamp-lg -translate-y-0.5" : "bg-white text-ink hover:bg-cream",
                      ].join(" ")}
                    >
                      <div className={["w-8 h-8 rounded-xl border-2 border-ink flex items-center justify-center shrink-0", on ? "bg-pop" : "bg-cream"].join(" ")}>
                        <Icon className="w-4 h-4 text-ink" strokeWidth={2.4} />
                      </div>
                      <span className="font-display text-[13.5px] font-bold leading-tight">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* 当前环境说明 */}
              <div key={target} className="px-4 py-3.5 bg-cream border-2 border-ink rounded-2xl animate-enter-fade">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 mb-1">
                  在 {cur.label} 上
                </div>
                <p className="text-[14.5px] text-ink/80 leading-relaxed">{cur.note}</p>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                关键：模型没重写，就是同一个 .onnx 文件。换的只是「读它的程序」。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
