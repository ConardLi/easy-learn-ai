/**
 * Section 06 · 分锅 + 2026 现状 + 互链
 *
 * 关键澄清：ONNX 跟 safetensors / GGUF 不是一回事，经常被搞混。
 *   - safetensors：只存权重数字
 *   - ONNX：存整张计算图（结构 + 权重），为了跨框架跨设备
 *   - GGUF：本地跑 LLM 的打包格式
 *
 * 三张分锅卡 + 2026 现状 + 跨站邮戳卡。
 */
import React from "react";
import StampLink from "./StampLink";

const ROLES = [
  {
    name: "safetensors",
    one: "只存权重数字",
    detail: "一袋子数字 + 目录。安全、加载快，但它不知道模型怎么搭的。",
    here: false,
    href: "../safetensors/index.html",
  },
  {
    name: "ONNX",
    one: "存整张计算图",
    detail: "结构 + 权重都在里面，记的是「要做哪些运算」，所以能跨框架跨设备跑。",
    here: true,
    href: "",
  },
  {
    name: "GGUF",
    one: "本地跑 LLM 的打包格式",
    detail: "权重 + 量化 + 运行元信息一锅端，专为 llama.cpp / Ollama 这类本地工具。",
    here: false,
    href: "../gguf/index.html",
  },
];

const SectionEcosystem: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">who does what · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          ONNX、safetensors、GGUF 到底谁干啥？
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          这三个后缀经常在 Hugging Face 一起出现，特别容易搞混。其实它们管的是不同的事。
        </p>

        {/* 三张分锅卡 */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {ROLES.map((r) => {
            const inner = (
              <>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-display text-[17px] font-bold text-ink">{r.name}</span>
                  {r.here && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-pop px-1.5 py-0.5 bg-pop/10 border border-pop/30 rounded">
                      本站
                    </span>
                  )}
                </div>
                <div className="font-display text-[14px] font-bold text-ink/90 mb-2">{r.one}</div>
                <p className="text-[13px] text-ink/65 leading-relaxed">{r.detail}</p>
              </>
            );
            if (r.here) {
              return (
                <div key={r.name} className="px-5 py-5 bg-pop/10 border-2 border-ink rounded-2xl shadow-stamp">
                  {inner}
                </div>
              );
            }
            return (
              <a
                key={r.name}
                href={r.href}
                className="block px-5 py-5 bg-cream border-2 border-ink rounded-2xl hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp transition-all duration-250 ease-spring"
              >
                {inner}
              </a>
            );
          })}
        </div>

        {/* 2026 现状 */}
        <div className="mb-10 px-5 py-4 bg-teal text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">2026 现状</div>
          <p className="text-[15px] leading-relaxed">
            在大语言模型这块，本地跑大多用 GGUF；但在传统模型、跨平台部署、手机和浏览器端，ONNX + ONNX Runtime 仍是最通用的选择。把模型「搬到生产环境」这件事，绕不开它。
          </p>
        </div>

        {/* 一句话 */}
        <div className="mb-10 px-5 py-4 bg-ink text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">一句话记住</div>
          <p className="text-[15px] leading-relaxed">
            ONNX = 模型的「通用语」。导出成一个 .onnx，配上 ONNX Runtime，就能在各种框架和设备上原样跑。
          </p>
        </div>

        {/* 跨站延伸 */}
        <h3 className="font-display text-[20px] font-bold text-ink mb-4">想接着看</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <StampLink
            href="../safetensors/index.html"
            title="Safetensors →"
            desc="只存权重数字的安全格式，跟 ONNX 经常被搞混。"
            compact
          />
          <StampLink
            href="../quantization/index.html"
            title="模型量化 →"
            desc="ONNX Runtime 也能跑 INT4/INT8 量化模型，让边缘设备更快。"
            compact
          />
          <StampLink
            href="../precision-formats/index.html"
            title="大模型精度格式 →"
            desc="FP32 / FP16 / FP8 是什么，模型里的数字到底用多少位存。"
            compact
          />
          <StampLink
            href="../deploy/index.html"
            title="模型部署 →"
            desc="把模型真正起成一个服务，ONNX 是其中一条主流路线。"
            compact
          />
        </div>

        <p className="mt-8 font-mono text-[10px] text-ink/40">
          来源 · onnx.ai · onnxruntime.ai · Open Neural Network Exchange (Microsoft / Meta, 2017 起) · 2026
        </p>
      </div>
    </section>
  );
};

export default SectionEcosystem;
