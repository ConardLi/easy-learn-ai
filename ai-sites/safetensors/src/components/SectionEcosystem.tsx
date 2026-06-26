/**
 * Section 06 · 2026 现状 + 跨站互链
 *
 * 收尾：safetensors 在 2026 已是 Hugging Face 默认权重格式。
 * 3 个真实事实卡 + 一组跨站邮戳卡（量化 / 精度格式 / 部署）。
 */
import React from "react";
import StampLink from "./StampLink";

const FACTS = [
  {
    big: "默认",
    unit: "",
    label: "Hugging Face 上新模型的默认权重格式",
  },
  {
    big: "0",
    unit: "行代码",
    label: "加载时能被执行的代码：从设计上就是零",
  },
  {
    big: "~5×",
    unit: "更快",
    label: "大模型在 CPU 上加载相对 pickle 的提速（示意）",
  },
];

const SectionEcosystem: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-t-2 border-ink">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">where we are · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          2026：下载模型，基本都是它了
        </h2>
        <div className="max-w-2xl space-y-3 text-ink/75 text-[16px] mb-8">
          <p>
            现在去 Hugging Face 下模型，文件名后缀几乎都是 <code className="font-mono text-[14px] bg-cream px-1.5 py-0.5 rounded border border-ink/15">.safetensors</code>。它已经是默认选择。
          </p>
          <p>
            原因就是这两点：加载陌生模型不会跑代码（安全），按地址直接读（快）。
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-10">
          {FACTS.map((f, i) => (
            <div key={i} className="px-4 py-5 bg-cream border-2 border-ink rounded-2xl shadow-stamp">
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="font-display text-[34px] font-bold text-ink tabular-nums leading-none">{f.big}</span>
                {f.unit && <span className="font-mono text-[12px] text-ink/50">{f.unit}</span>}
              </div>
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink/55 leading-snug">
                {f.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mb-10 px-5 py-4 bg-teal text-cream rounded-2xl border-2 border-ink">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1.5">小结</div>
          <p className="text-[15px] leading-relaxed">
            Safetensors 是装模型权重的安全盒子：只装数字、带目录、能直接读。下载别人的模型，认准它。
          </p>
        </div>

        {/* 跨站延伸 */}
        <h3 className="font-display text-[20px] font-bold text-ink mb-4">想接着看</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <StampLink
            href="../precision-formats/index.html"
            title="大模型精度格式 →"
            desc="目录里那个 F16 / F32 是啥？看懂权重数字本身用多少位存。"
            compact
          />
          <StampLink
            href="../quantization/index.html"
            title="模型量化 →"
            desc="把权重数字压成更短的表示，模型更小更快。"
            compact
          />
          <StampLink
            href="../gguf/index.html"
            title="GGUF →"
            desc="本地跑模型用的打包格式，跟 safetensors 经常一起出现。"
            compact
          />
          <StampLink
            href="../deploy/index.html"
            title="模型部署 →"
            desc="模型加载好之后，怎么真正起成一个服务。"
            compact
          />
        </div>

        <p className="mt-8 font-mono text-[10px] text-ink/40">
          来源 · Hugging Face safetensors docs · github.com/huggingface/safetensors · 2026
        </p>
      </div>
    </section>
  );
};

export default SectionEcosystem;
