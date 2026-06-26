/**
 * Section 02 · 没有 ONNX 的痛
 *
 * 动机：训练用 PyTorch，但部署环境五花八门。没有统一格式时，每搬一个环境就得重写一遍模型。
 *
 * 交互：一个 N×M 的「兼容矩阵」。左边 pill 选「用什么训练」，
 * 上方选「有没有 ONNX」。切到「没有 ONNX」，格子里全是 ✗「得各自重写」；
 * 切到「有 ONNX」，全变 ✓「导出一次就行」。
 */
import React, { useState } from "react";
import { Check, X } from "lucide-react";

const TARGETS = ["手机 App", "浏览器", "C++ 服务", "边缘设备"];

const SectionPain: React.FC = () => {
  const [hasOnnx, setHasOnnx] = useState(false);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">the pain</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          没有它的时候，每换一个地方就得重写一遍
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-8">
          <p>
            假设你用 PyTorch 训好了一个模型。现在要让它在手机、浏览器、C++ 后端上都能跑。
          </p>
          <p>
            问题来了：这些环境各有各的运行方式。没有统一格式时，你得为每个环境单独折腾一遍 —— 翻译模型、对齐细节、反复调试。
          </p>
        </div>

        {/* 开关 */}
        <div className="inline-flex gap-1.5 p-1.5 bg-cream border-2 border-ink rounded-full mb-7">
          <button
            onClick={() => setHasOnnx(false)}
            className={[
              "px-5 py-2 rounded-full font-bold text-[13px] transition-all duration-250 ease-spring",
              !hasOnnx ? "bg-ink text-cream shadow-stamp" : "text-ink/60 hover:text-ink",
            ].join(" ")}
          >
            没有 ONNX
          </button>
          <button
            onClick={() => setHasOnnx(true)}
            className={[
              "px-5 py-2 rounded-full font-bold text-[13px] transition-all duration-250 ease-spring",
              hasOnnx ? "bg-ink text-cream shadow-stamp" : "text-ink/60 hover:text-ink",
            ].join(" ")}
          >
            有 ONNX
          </button>
        </div>

        <div className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="px-3 py-2 bg-white border-2 border-ink rounded-xl">
              <div className="font-mono text-[10px] text-ink/50">用它训练</div>
              <div className="font-display text-[15px] font-bold text-ink">PyTorch 模型</div>
            </div>
            <div className="font-mono text-[16px] text-ink/40">想跑到 →</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {TARGETS.map((t, i) => (
              <div
                key={t}
                className={[
                  "flex items-center gap-3 px-4 py-3.5 border-2 border-ink rounded-2xl transition-all duration-300",
                  hasOnnx ? "bg-teal text-cream" : "bg-white text-ink",
                ].join(" ")}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div
                  className={[
                    "w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center shrink-0",
                    hasOnnx ? "bg-butter" : "bg-coral",
                  ].join(" ")}
                >
                  {hasOnnx ? (
                    <Check className="w-4 h-4 text-ink" strokeWidth={3} />
                  ) : (
                    <X className="w-4 h-4 text-cream" strokeWidth={3} />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[14.5px] font-bold leading-tight">{t}</div>
                  <div className={["font-mono text-[10.5px] mt-0.5", hasOnnx ? "text-cream/70" : "text-ink/50"].join(" ")}>
                    {hasOnnx ? "用同一个 .onnx，导出一次就行" : "得为它单独重写一遍模型"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={[
              "mt-5 px-4 py-3 rounded-2xl border-2 border-ink text-[14.5px] leading-relaxed transition-colors duration-300",
              hasOnnx ? "bg-ink text-cream" : "bg-coral/15 text-ink",
            ].join(" ")}
          >
            {hasOnnx
              ? "导出成一个 .onnx，到处都能读。4 个环境，1 份模型。"
              : "4 个环境 = 4 套重写工作。模型越多、环境越多，越是灾难。"}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionPain;
