/**
 * Section 07 · 收尾硬规则
 *
 * 不写"未来展望"鸡汤，给三条 2026 工业实践硬规则（accordion 展开看依据）。
 *
 * 跟前 6 个 section 的交互全错开（chip / slider / 表格 / chip 阵列 / 单步 trace 都用过了）。
 * 这里是 accordion 折叠 + 一段尾注。
 *
 * 数据来源：
 *   - presenc.ai 2026 toolchain report
 *   - BigData Boutique 2026 fine-tuning guide
 *   - HuggingFace PEFT GitHub 2026
 *   - DoRA NVIDIA blog 2024
 */
import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const RULES: {
  id: string;
  num: string;
  title: string;
  punch: string;
  body: string[];
  source: string;
}[] = [
  {
    id: "no-full",
    num: "rule 01",
    title: "默认不要 full fine-tuning。",
    punch: "除非你是前沿实验室且有 cluster 算力。",
    body: [
      "2026 新微调项目中 LoRA + QLoRA 占 62%，full FT 不到 5%。",
      "原因：7B 模型 full FT 要 80GB 显存、几十小时 8 卡 A100；LoRA 一张 4090 几小时跑完，质量差距常在 2-5% 以内。",
      "Full FT 还有一个隐性代价 —— catastrophic forgetting，base 通用能力会被你的小数据集冲淡。LoRA 因为 ΔW 小，base 几乎不变。",
    ],
    source: "presenc.ai 2026/04 · BigData Boutique 2026",
  },
  {
    id: "lora-first",
    num: "rule 02",
    title: "先 LoRA，不够再 DoRA / QLoRA。",
    punch: "选型路径：LoRA → 显存不够换 QLoRA → 质量不够换 DoRA。",
    body: [
      "起手：LoRA r=8, α=16, target = q/k/v/o + gate/up/down 7 个 proj。Unsloth / Axolotl 默认就这套。",
      "显存不够：换 QLoRA。base 改 NF4 4-bit + double quant，paged_adamw_8bit 优化器。质量降 2-3% 通常能接受。",
      "质量不够：换 DoRA（use_dora=True）。慢 20-44% 但 rank=8 就能赶上 LoRA rank=32。或者上 rsLoRA（use_rslora=True）让 r ≥ 32 也稳。",
    ],
    source: "HuggingFace PEFT 0.13+ · Unsloth docs 2026 · DoRA arXiv:2402.09353",
  },
  {
    id: "multi-adapter",
    num: "rule 03",
    title: "线上一个 base + 多个 adapter 切换。",
    punch: "千万别每个客户跑一个独立 7B。",
    body: [
      "LoRA adapter 文件 30-50 MB，base 模型 14 GB（7B fp16）。线上一张 base 放显存里不动，按 request 加载/切换 adapter。",
      "vLLM 原生支持 LoRA hot-swap，LoRAX 和 SGLang 都做了 multi-tenant serving。切换延迟 < 50ms。",
      "如果每个客户跑独立 7B，4 个客户 56 GB；用 multi-adapter 14.04 GB 跑同样的 4 个 —— 4 倍的钱差就是这么省的。",
    ],
    source: "vLLM 0.6+ LoRA · LoRAX · SGLang multi-LoRA · BigData Boutique 2026",
  },
];

const SectionRules: React.FC = () => {
  const [open, setOpen] = useState<string | null>("no-full");

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-28 border-t-2 border-ink/10">
      <div className="max-w-4xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">hard rules</span>
        </div>

        <div className="mb-10 lg:mb-12">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">3 条 2026 硬规则</span>
            </span>
            ，不接受争论。
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            点开看依据。没有"也许""可能"，全是 2026 工业实践共识。
          </p>
        </div>

        <div className="space-y-3">
          {RULES.map((r) => {
            const on = open === r.id;
            return (
              <div
                key={r.id}
                className={[
                  "border-2 border-ink rounded-3xl transition-all duration-300",
                  on ? "bg-butter shadow-stamp-lg" : "bg-white shadow-stamp",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpen(on ? null : r.id)}
                  className="w-full flex items-start justify-between gap-4 p-5 lg:p-6 text-left"
                >
                  <div className="flex-1">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55 font-semibold mb-2">
                      {r.num}
                    </div>
                    <div className="font-display text-[19px] lg:text-[22px] font-bold text-ink leading-snug">
                      {r.title}
                    </div>
                    <div className="font-sans text-[13px] text-ink/70 mt-1.5 leading-snug">
                      {r.punch}
                    </div>
                  </div>
                  <div
                    className={[
                      "shrink-0 w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center transition-transform duration-300",
                      on ? "bg-ink text-cream rotate-180" : "bg-cream text-ink",
                    ].join(" ")}
                  >
                    {on ? (
                      <Minus className="w-4 h-4" strokeWidth={2.6} />
                    ) : (
                      <Plus className="w-4 h-4" strokeWidth={2.6} />
                    )}
                  </div>
                </button>
                {on && (
                  <div className="px-5 lg:px-6 pb-5 lg:pb-6 animate-enter-fade">
                    <div className="border-t-2 border-ink/15 pt-4 space-y-2.5">
                      {r.body.map((b, i) => (
                        <p key={i} className="text-[14px] text-ink/85 leading-relaxed">
                          {b}
                        </p>
                      ))}
                      <div className="pt-2 font-mono text-[10.5px] text-ink/55">
                        来源：{r.source}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 尾注 */}
        <div className="mt-12 pt-8 border-t-2 border-ink/10 text-center">
          <p className="font-mono text-[11px] text-ink/45 leading-relaxed">
            arXiv 编号汇总：
            1902.00751 Adapter ·
            2106.09685 LoRA ·
            2305.14314 QLoRA ·
            2312.03732 rsLoRA ·
            2402.09353 DoRA ·
            2403.03507 GaLore ·
            2310.11454 VeRA ·
            2404.02948 PiSSA
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionRules;
