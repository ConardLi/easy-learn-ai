/**
 * Section 06 · 跟量化分锅（浮点 vs 整数）+ 互链
 *
 * 最容易混的一对：精度格式 vs 量化。
 *   - 精度格式（本站）：换一种「浮点数」格式，还是带小数点的小数，只是位数/切法变了（FP32→BF16→FP8）
 *   - 量化：通常把浮点数换成「整数」（INT8/INT4），靠一个缩放比例还原，压得更狠
 * 两者都是为了更小更快，但走的是不同路子，经常一起用。
 *
 * 收尾：一张分锅卡 + 一句话记住 + 跨站邮戳卡。
 */
import React from "react";
import StampLink from "./StampLink";

const SectionEcosystem: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">precision vs quantization · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          精度格式 和 量化，到底差在哪
        </h2>
        <p className="max-w-2xl text-ink/70 text-[16px] mb-8">
          这两个词老一起出现，也老被搞混。都是为了让模型更小更快，但动的东西不一样。
        </p>

        {/* 分锅对比 */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <div className="px-5 py-5 bg-coral/10 border-2 border-ink rounded-2xl shadow-stamp">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-[17px] font-bold text-ink">精度格式</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-coral px-1.5 py-0.5 bg-coral/15 border border-coral/40 rounded">
                本站
              </span>
            </div>
            <div className="font-display text-[14px] font-bold text-ink/90 mb-2">换一种浮点数</div>
            <p className="text-[13px] text-ink/70 leading-relaxed">
              FP32 → BF16 → FP8，存的还是带小数点的小数，只是用的位数变少、切法变了。位越少越省，但能存的范围和精度也跟着缩。
            </p>
          </div>

          <a
            href="../quantization/index.html"
            className="block px-5 py-5 bg-cream border-2 border-ink rounded-2xl hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp transition-all duration-250 ease-spring"
          >
            <div className="font-display text-[17px] font-bold text-ink mb-2">量化</div>
            <div className="font-display text-[14px] font-bold text-ink/90 mb-2">换成整数</div>
            <p className="text-[13px] text-ink/70 leading-relaxed">
              通常把小数换成整数（INT8 / INT4），再配一个缩放比例还原回去。压得比浮点更狠，更小更快，但需要小心掉准。点开看细节 →
            </p>
          </a>
        </div>

        {/* 一句话 */}
        <div className="mb-10 px-5 py-4 bg-teal text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">一句话记住</div>
          <p className="text-[15px] leading-relaxed">
            精度格式 = 模型里每个数用多少位的浮点数存。位越少越省钱、跑得越快，代价是范围和精度。FP32 最准，BF16 训练稳，FP8 又小又快。
          </p>
        </div>

        {/* 跨站延伸 */}
        <h3 className="font-display text-[20px] font-bold text-ink mb-4">想接着看</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <StampLink
            href="../quantization/index.html"
            title="模型量化 →"
            desc="把浮点数压成整数，比换精度格式压得更狠，常跟它一起用。"
            compact
          />
          <StampLink
            href="../safetensors/index.html"
            title="Safetensors →"
            desc="存权重的安全格式，文件里那个 F16 / F32 标的就是精度格式。"
            compact
          />
          <StampLink
            href="../gguf/index.html"
            title="GGUF →"
            desc="本地跑模型的打包格式，文件名里的 Q4 / Q8 跟精度息息相关。"
            compact
          />
          <StampLink
            href="../deploy/index.html"
            title="模型部署 →"
            desc="选哪种精度，直接影响部署要多少显存、跑多快。"
            compact
          />
        </div>

        <p className="mt-8 font-mono text-[10px] text-ink/40">
          来源 · IEEE 754 浮点标准 · Google Brain bfloat16 · NVIDIA / Arm / Intel FP8 (OCP) · 2026
        </p>
      </div>
    </section>
  );
};

export default SectionEcosystem;
