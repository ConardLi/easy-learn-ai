/**
 * Section 05 · 2026 真实生态
 *
 * tab 切换三个视角（服务推理 / 本地 / 训练）。
 * 每个 tab 内：3 个核心数字 + 标杆方案列表 + 一段当代行情口语注释。
 *
 * 数据来源：
 *   DeepSeek V3 Technical Report (arXiv:2412.19437v2)
 *   BitNet b1.58 2B4T (arXiv:2504.12285)
 *   llmhardware.io / insiderllm.com / nordicsilicon.io · 2026/03-05
 */
import React, { useState } from "react";
import { Cloud, Laptop, GraduationCap, ExternalLink } from "lucide-react";

type TabId = "serve" | "local" | "train";

const TABS: { id: TabId; label: string; sub: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "serve", label: "服务化推理", sub: "云端 / 大批量", Icon: Cloud },
  { id: "local", label: "本地 · 消费级", sub: "Mac / 单卡 / 个人", Icon: Laptop },
  { id: "train", label: "训练 · 微调", sub: "FP8 / QLoRA / 1-bit", Icon: GraduationCap },
];

type TabContent = {
  headline: string;
  intro: string;
  stats: { value: string; unit: string; label: string }[];
  benchmark: { name: string; bits: string; meta: string; tone: "coral" | "teal" | "butter" }[];
  closing: string;
  source: string;
};

const CONTENT: Record<TabId, TabContent> = {
  serve: {
    headline: "服务化推理：INT4 是 2026 默认。",
    intro:
      "云上跑 LLM 早就不「跑 FP16」了。AWQ / GPTQ INT4 占据绝大多数 vLLM / TensorRT-LLM 部署；Hopper 起的硬件原生 FP8，Blackwell 直接给到原生 FP4。",
    stats: [
      { value: "2×", unit: "FLOPS", label: "FP8 vs FP16 · Hopper" },
      { value: "<1%", unit: "", label: "AWQ INT4 vs FP16 质量差" },
      { value: "6×", unit: "tps", label: "B200 FP4 / H100 FP8 推理吞吐" },
    ],
    benchmark: [
      { name: "vLLM + AWQ INT4", bits: "4-bit", meta: "Llama-70B 默认部署", tone: "teal" },
      { name: "TensorRT-LLM + FP8", bits: "8-bit", meta: "H100/H200 Tensor Engine 原生", tone: "coral" },
      { name: "SGLang + GPTQ", bits: "4-bit", meta: "RadixAttention 优化", tone: "butter" },
      { name: "Blackwell B200 FP4", bits: "4-bit", meta: "原生硬件支持 · 2025 起", tone: "coral" },
    ],
    closing:
      "如果你今天在云上裸跑 FP16 提供 LLM 服务，那基本是把钱往海里扔。INT4 / FP8 切换基本是按个开关的事。",
    source: "vLLM docs · NVIDIA Blackwell whitepaper · 2026",
  },
  local: {
    headline: "本地 · 消费级：Q4_K_M 是默认。",
    intro:
      "GGUF 是事实标准。Mac unified memory + Ollama + LM Studio 让「在自己电脑跑 70B」从极客玩具变成日常。Q4_K_M 是 95% 用户的甜蜜点。",
    stats: [
      { value: "42", unit: "GB", label: "Llama 3 70B Q4_K_M 体积" },
      { value: "22", unit: "tok/s", label: "双 4090 跑 70B Q4 实测" },
      { value: "48", unit: "GB", label: "Mac M4 Pro 起跑 70B 门槛" },
    ],
    benchmark: [
      { name: "llama.cpp · GGUF", bits: "2~8-bit", meta: "C++ 内核 · 跨平台事实标准", tone: "butter" },
      { name: "Ollama", bits: "Q4_K_M default", meta: "桌面应用 · 一行命令跑", tone: "teal" },
      { name: "LM Studio", bits: "GGUF", meta: "GUI + 模型市场", tone: "coral" },
      { name: "MLX (Apple)", bits: "4 / 8-bit", meta: "Apple Silicon 原生", tone: "butter" },
    ],
    closing:
      "Mac Studio M4 Ultra 192GB 可以裸跑 Llama 3 70B Q8。这是 2 年前需要 4 张 A100 才能干的事。",
    source: "llmhardware.io · nordicsilicon.io · insiderllm.com · 2026/03-05",
  },
  train: {
    headline: "训练 · 微调：FP8 落地，1-bit 已起步。",
    intro:
      "DeepSeek V3 是第一个开源大规模 FP8 训练验证 —— 671B 参数、14.8T tokens，loss 偏差只有 0.25%。BitNet b1.58 把推理时的 1-bit 直接前移到训练时。QLoRA NF4 仍是单卡微调最佳路径。",
    stats: [
      { value: "0.25%", unit: "", label: "DeepSeek V3 FP8 vs BF16 loss 偏差" },
      { value: "2.79M", unit: "GPUh", label: "DeepSeek V3 671B 总训练成本" },
      { value: "0.4", unit: "GB", label: "BitNet b1.58 2B 内存（vs 同尺寸 2GB）" },
    ],
    benchmark: [
      { name: "DeepSeek V3 · FP8 训练", bits: "8-bit", meta: "首个开源大规模 FP8 训练 · arXiv 2412.19437", tone: "coral" },
      { name: "BitNet b1.58 2B4T", bits: "1.58-bit", meta: "native 1-bit · 跑分接近 Qwen2.5 1.5B FP16", tone: "teal" },
      { name: "QLoRA · NF4", bits: "4-bit", meta: "24GB 单卡微调 70B · 仍是研究标准", tone: "butter" },
      { name: "DeepGEMM", bits: "8-bit", meta: "DeepSeek 开源 FP8 GEMM 内核", tone: "coral" },
    ],
    closing:
      "FP8 训练已经从「赌」变成「工业可复现」。再下一阶段，整个产业在等 1-bit / FP4 训练真正起飞。",
    source: "DeepSeek V3 Tech Report · BitNet b1.58 2B4T (arXiv:2504.12285)",
  },
};

const SectionEcosystem: React.FC = () => {
  const [tab, setTab] = useState<TabId>("serve");
  const data = CONTENT[tab];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">where we are · 2026</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          2026 真实生态：
          <br />
          <span className="relative inline-block">
            <span className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1" aria-hidden />
            <span className="relative z-10">从云到桌面</span>
          </span>
          ，量化在哪里发生？
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-8">
          量化已经是 2026 整个 LLM 行业的<strong className="text-ink">默认状态</strong>。
          从云端服务到 Mac mini，从训练到推理，三个视角看真实在用什么。
        </p>

        {/* tab 切换 */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {TABS.map((t) => {
            const on = t.id === tab;
            const Icon = t.Icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={[
                  "flex items-center gap-3 px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-white text-ink hover:bg-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                ].join(" ")}
              >
                <div
                  className={[
                    "w-9 h-9 rounded-xl border-2 border-ink flex items-center justify-center shrink-0",
                    on ? "bg-butter" : "bg-cream",
                  ].join(" ")}
                >
                  <Icon className="w-4 h-4 text-ink" strokeWidth={2.4} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[14.5px] font-bold leading-tight">
                    {t.label}
                  </div>
                  <div
                    className={[
                      "font-mono text-[10px] mt-0.5",
                      on ? "text-cream/55" : "text-ink/50",
                    ].join(" ")}
                  >
                    {t.sub}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* tab 内容 */}
        <div key={tab} className="bg-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 animate-enter-fade">
          <h3 className="font-display text-[24px] lg:text-[28px] font-bold text-ink leading-tight mb-3">
            {data.headline}
          </h3>
          <p className="text-[15px] text-ink/75 leading-relaxed max-w-2xl mb-7">
            {data.intro}
          </p>

          {/* 3 个核心数字 */}
          <div className="grid sm:grid-cols-3 gap-3 mb-7">
            {data.stats.map((s, i) => (
              <div key={i} className="px-4 py-4 bg-white border-2 border-ink rounded-2xl">
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-display text-[32px] font-bold text-ink tabular-nums leading-none">
                    {s.value}
                  </span>
                  {s.unit && (
                    <span className="font-mono text-[12px] text-ink/50">{s.unit}</span>
                  )}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* 标杆方案列表 */}
          <div className="mb-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-2">
              代表方案
            </div>
            <div className="space-y-1.5">
              {data.benchmark.map((b, i) => (
                <BenchmarkRow key={i} {...b} />
              ))}
            </div>
          </div>

          {/* 结尾口语 */}
          <div className="px-4 py-3 bg-ink text-cream rounded-xl border-2 border-ink">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
              所以
            </div>
            <p className="text-[14.5px] leading-relaxed">{data.closing}</p>
          </div>

          <p className="mt-3 font-mono text-[10px] text-ink/40">来源 · {data.source}</p>

          {/* 跨站延伸：按 tab 给不同邻居 */}
          {tab === "train" ? (
            <a
              href="../lora/index.html"
              className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-white border-2 border-ink rounded-xl hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
            >
              <ExternalLink className="w-3.5 h-3.5 text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-[13px] text-ink/75 leading-relaxed">
                QLoRA 怎么先把底模压成 NF4 再挂旁路、只训一小撮参数
                <span className="font-semibold text-ink"> → 见《LoRA》</span>。
              </span>
            </a>
          ) : (
            <a
              href="../deploy/index.html"
              className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-white border-2 border-ink rounded-xl hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
            >
              <ExternalLink className="w-3.5 h-3.5 text-ink mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="text-[13px] text-ink/75 leading-relaxed">
                vLLM / Ollama 这些工具怎么把量化好的模型真正起成服务
                <span className="font-semibold text-ink"> → 见《模型部署》</span>。
              </span>
            </a>
          )}
        </div>

        {/* 两张对称分锅卡：省显存 / 让模型变小 */}
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
            <h3 className="font-display text-[18px] font-bold text-ink mb-1">省显存，有三条路</h3>
            <p className="text-[13px] text-ink/60 mb-4">想让一个模型占更少显存，常见三种做法。</p>
            <div className="space-y-2.5">
              <ForkRow
                here
                name="量化"
                desc="把每个数字压短，同一个模型占的显存直接变小（本站）。"
              />
              <ForkRow
                href="../lora/index.html"
                name="LoRA"
                desc="冻住大模型，只额外训一小撮参数，训练时省的是优化器显存。"
              />
              <ForkRow
                href="../deepspeed/index.html"
                name="DeepSpeed"
                desc="把模型和优化器状态切开，摊到多张卡上分着扛。"
              />
            </div>
          </div>

          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5">
            <h3 className="font-display text-[18px] font-bold text-ink mb-1">让模型变小，有两条路</h3>
            <p className="text-[13px] text-ink/60 mb-4">「变小」可以是同一个模型砍精度，也可以是干脆换个小的。</p>
            <div className="space-y-2.5">
              <ForkRow
                here
                name="量化"
                desc="还是同一个模型，把每个数字的精度砍掉（本站）。"
              />
              <ForkRow
                href="../precision-formats/index.html"
                name="精度格式"
                desc="搞懂 FP32 / BF16 / FP8 这些浮点格式，就知道量化是从哪种精度往下压的。"
              />
              <ForkRow
                href="../distill/index.html"
                name="蒸馏"
                desc="直接换一个小模型当学生，让它跟大模型学，模型结构本身变小。"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ForkRow: React.FC<{
  name: string;
  desc: string;
  href?: string;
  here?: boolean;
}> = ({ name, desc, href, here }) => {
  const inner = (
    <>
      <div className="flex items-center gap-2 mb-0.5">
        <span className="font-display text-[14px] font-bold text-ink">{name}</span>
        {here ? (
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-coral px-1.5 py-0.5 bg-coral/10 border border-coral/30 rounded">
            本站
          </span>
        ) : (
          <ExternalLink className="w-3 h-3 text-ink/45" strokeWidth={2.5} />
        )}
      </div>
      <p className="text-[12.5px] text-ink/70 leading-snug">{desc}</p>
    </>
  );
  if (here) {
    return <div className="px-3.5 py-3 bg-cream border-2 border-ink rounded-xl">{inner}</div>;
  }
  return (
    <a
      href={href}
      className="block px-3.5 py-3 bg-cream border-2 border-ink rounded-xl hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring"
    >
      {inner}
    </a>
  );
};

const BenchmarkRow: React.FC<{
  name: string;
  bits: string;
  meta: string;
  tone: "coral" | "teal" | "butter";
}> = ({ name, bits, meta, tone }) => {
  const dot = { coral: "bg-coral", teal: "bg-teal", butter: "bg-butter-deep" }[tone];
  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white border border-ink/15 rounded-lg hover:border-ink hover:shadow-[2px_2px_0_0_#241C15] hover:-translate-y-0.5 transition-all duration-200">
      <div className={`w-2.5 h-2.5 rounded-full ${dot} border border-ink shrink-0`} />
      <div className="font-display text-[14px] font-bold text-ink min-w-0 truncate">
        {name}
      </div>
      <div className="font-mono text-[10px] text-ink/55 px-1.5 py-0.5 bg-cream rounded shrink-0">
        {bits}
      </div>
      <div className="text-[12.5px] text-ink/60 truncate flex-1 text-right">{meta}</div>
    </div>
  );
};

export default SectionEcosystem;
