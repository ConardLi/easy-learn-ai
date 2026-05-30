/**
 * Section 01 · Hero
 *
 * 进站第一秒：H1「GGUF 是什么？」+ 一句话定义。
 * 反模板：
 *   ─ 不做量化的 bit-pill selector（quantization 站用过）
 *   ─ 不做内存格 / 工具 accordion（deploy 站用过）
 *   ─ Hero 主交互 = 一个真实 .gguf 文件的字节流 layout 切片浏览器，
 *     用户点 5 段中任一段，下方面板换内容显示该段干嘛 / hex 样本
 *   ─ 第二可动元素 = 切换 quant（Q4_K_M / Q8_0 / F16），
 *     看同 8B 模型在不同 quant 下整体体积变，但 header + metadata 大小不变
 *
 * 数据：
 *   ─ Llama-3.1-8B-Instruct GGUF 实测大小 来自 bartowski/Meta-Llama-3.1-8B-Instruct-GGUF（HF 2026/05）
 *   ─ GGUF v3 spec 来自 ggml-org/ggml/docs/gguf.md（current version）
 */
import React, { useState } from "react";
import { ArrowDown, FileBox } from "lucide-react";

type SegmentId = "magic" | "header" | "metadata" | "tensorinfo" | "data";

type Segment = {
  id: SegmentId;
  name: string;
  /** 该段在 8B Q4_K_M 文件里的近似 byte size */
  bytes: number;
  /** 显示用的 size 文案 */
  sizeLabel: string;
  /** 颜色 token */
  tone: "ink" | "teal" | "coral" | "butter" | "pop";
  /** hex 样本（前 16 个字节左右） */
  hexSample: string;
  /** 读完这段你能写一句话： */
  oneliner: string;
  /** 内部到底装了啥 */
  innerLabels: string[];
};

const SEGMENTS: Segment[] = [
  {
    id: "magic",
    name: "Magic + Version",
    bytes: 8,
    sizeLabel: "8 B",
    tone: "ink",
    hexSample: "47 47 55 46 · 03 00 00 00",
    oneliner: "前 4 字节 ASCII 「GGUF」是文件签名，紧接 4 字节 uint32 写当前版本号。",
    innerLabels: ["magic = 0x47475546 「GGUF」", "version = 3 (current spec)"],
  },
  {
    id: "header",
    name: "Header counts",
    bytes: 16,
    sizeLabel: "16 B",
    tone: "teal",
    hexSample: "23 01 00 00 00 00 00 00 · 24 00 00 00 00 00 00 00",
    oneliner: "两个 uint64：tensor 数量 + metadata 键值对数量。loader 先读这个再分配空间。",
    innerLabels: [
      "tensor_count = 291  (uint64)",
      "metadata_kv_count = 36  (uint64)",
    ],
  },
  {
    id: "metadata",
    name: "Metadata KV pairs",
    bytes: 2_500_000,
    sizeLabel: "~2.5 MB",
    tone: "butter",
    hexSample: "「general.architecture」 → 「llama」 ...",
    oneliner: "架构 / 维度 / hyperparam / 完整 tokenizer 都在这。Llama 3 词表 128256 条占了大头。",
    innerLabels: [
      "general.architecture = \"llama\"",
      "llama.context_length = 131072",
      "llama.embedding_length = 4096",
      "tokenizer.ggml.tokens = [128256 strings]",
      "tokenizer.ggml.scores = [128256 f32]",
    ],
  },
  {
    id: "tensorinfo",
    name: "Tensor info entries",
    bytes: 35_000,
    sizeLabel: "~35 KB",
    tone: "coral",
    hexSample: "「blk.0.attn_q.weight」 · [4096,4096] · Q4_K · offset",
    oneliner: "每个 tensor 一条索引：名字 + 维度 + dtype + 在 data 块里的偏移。",
    innerLabels: [
      "name string + ndim u32 + shape u64[]",
      "ggml_type (Q4_K_M = 15, Q8_0 = 7, F16 = 1)",
      "offset (从 data block 起算)",
      "291 条 × ~120 B/条",
    ],
  },
  {
    id: "data",
    name: "Tensor data block",
    bytes: 4_920_000_000,
    sizeLabel: "4.92 GB",
    tone: "pop",
    hexSample: "<aligned 32 B 对齐 → 量化权重 raw bytes>",
    oneliner: "权重本体。按 tensor info 里的 offset + dtype 解码。mmap 直接读这块，不用全部入内存。",
    innerLabels: [
      "对齐到 general.alignment = 32 (默认)",
      "Q4_K_M 块结构：32 元素 super-block",
      "C 程序拿 offset + size 直接 read",
    ],
  },
];

/* 三种 quant 预设 · 数据来自 bartowski/Meta-Llama-3.1-8B-Instruct-GGUF HF 2026/05 */
const PRESETS = [
  { id: "q4km", label: "Q4_K_M", totalGB: 4.92, dataLabel: "4.92 GB" },
  { id: "q8", label: "Q8_0", totalGB: 8.54, dataLabel: "8.54 GB" },
  { id: "f16", label: "F16", totalGB: 16.07, dataLabel: "16.07 GB" },
];

const TONE_BG: Record<Segment["tone"], string> = {
  ink: "bg-ink text-cream",
  teal: "bg-teal text-cream",
  coral: "bg-coral text-cream",
  butter: "bg-butter text-ink",
  pop: "bg-pop text-cream",
};

const TONE_RING: Record<Segment["tone"], string> = {
  ink: "ring-ink",
  teal: "ring-teal",
  coral: "ring-coral",
  butter: "ring-butter-deep",
  pop: "ring-pop",
};

const SectionHero: React.FC = () => {
  const [active, setActive] = useState<SegmentId>("magic");
  const [preset, setPreset] = useState("q4km");

  const sel = SEGMENTS.find((s) => s.id === active)!;
  const cur = PRESETS.find((p) => p.id === preset)!;

  /* 视觉高度分配（log 化让所有段都看得见，但保留 data 占绝大头的视觉感） */
  const heightShares: Record<SegmentId, number> = {
    magic: 4,
    header: 5,
    metadata: 12,
    tensorinfo: 7,
    data: 72,
  };
  const totalShare = Object.values(heightShares).reduce((a, b) => a + b, 0);

  /* data 块大小随 quant 变化 */
  const dataLabel = sel.id === "data" ? cur.dataLabel : sel.sizeLabel;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮饰 */}
      <div aria-hidden className="absolute top-24 right-[6%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-32 left-[4%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                GGUF · GPT-Generated Unified Format
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              GGUF
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  llama.cpp 团队 2023 年定的二进制文件格式，把权重、tokenizer、架构信息一起塞进单个 .gguf 文件。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                一个 HuggingFace 原版模型有六七个文件 ——
                .safetensors 权重 + config.json + tokenizer.json + 一堆 Python loader。
                跑起来要装 transformers + Python + CUDA。
              </p>
              <p>
                GGUF 把这堆压成一个文件。C 程序 mmap 一打开就能跑，没 Python 没框架。
                Ollama / LM Studio / llama.cpp 全读这个。
              </p>
              <p>
                作者 Georgi Gerganov，2023-08 发布，目前 spec v3。HuggingFace 上 17 万多个 GGUF 模型在跑。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡是一个真实 .gguf 文件的字节流剖面。
              点任一段看每段装啥，切 quant 看 data 段怎么涨。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~9 分钟
              </div>
            </div>
          </div>

          {/* 右：字节流 layout 浏览器 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-5 lg:p-6">
              {/* 文件信息 + quant preset 切换 */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-cream border-2 border-ink rounded-lg">
                  <FileBox className="w-3.5 h-3.5 text-ink" strokeWidth={2.5} />
                  <span className="font-mono text-[11px] font-semibold text-ink">
                    Llama-3.1-8B-Instruct-{cur.label}.gguf
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mr-1.5">
                    quant
                  </span>
                  {PRESETS.map((p) => {
                    const on = p.id === preset;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPreset(p.id)}
                        className={[
                          "px-2.5 py-1 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                          on
                            ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                            : "bg-white text-ink/65 hover:bg-cream",
                        ].join(" ")}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 段标签 + total */}
              <div className="flex items-baseline justify-between mb-2 px-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  byte stream · top → bottom
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  total · <span className="font-bold text-ink">{cur.dataLabel}</span>
                </span>
              </div>

              {/* 字节流 5 段（垂直堆叠） */}
              <div className="grid grid-cols-12 gap-3">
                {/* 主图：垂直堆叠 segment 条 */}
                <div
                  className="col-span-5 sm:col-span-4 flex flex-col rounded-xl overflow-hidden border-2 border-ink"
                  style={{ height: 360 }}
                >
                  {SEGMENTS.map((seg) => {
                    const on = seg.id === active;
                    const h = (heightShares[seg.id] / totalShare) * 100;
                    return (
                      <button
                        key={seg.id}
                        onClick={() => setActive(seg.id)}
                        className={[
                          "relative flex-shrink-0 px-2 text-left transition-all duration-300 ease-editorial overflow-hidden",
                          TONE_BG[seg.tone],
                          on ? "ring-4 ring-inset z-10" : "opacity-90 hover:opacity-100",
                          on ? TONE_RING[seg.tone] : "",
                        ].join(" ")}
                        style={{ height: `${h}%`, minHeight: 30 }}
                      >
                        <div className="flex items-center justify-between h-full">
                          <div className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] leading-tight">
                            {seg.name}
                          </div>
                          <div className="font-mono text-[10px] sm:text-[11px] opacity-80 ml-2 whitespace-nowrap">
                            {seg.id === "data" ? cur.dataLabel : seg.sizeLabel}
                          </div>
                        </div>
                        {/* 装饰条纹（data 段才显示） */}
                        {seg.id === "data" && (
                          <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none opacity-25"
                            style={{
                              backgroundImage:
                                "repeating-linear-gradient(45deg, transparent 0 6px, rgba(255,255,255,0.4) 6px 8px)",
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 选中段详情面板 */}
                <div className="col-span-7 sm:col-span-8" key={active}>
                  <div className="bg-cream border-2 border-ink rounded-xl p-4 h-full animate-enter-fade">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span
                        className={[
                          "w-2.5 h-2.5 rounded-full border border-ink",
                          {
                            ink: "bg-ink",
                            teal: "bg-teal",
                            coral: "bg-coral",
                            butter: "bg-butter",
                            pop: "bg-pop",
                          }[sel.tone],
                        ].join(" ")}
                      />
                      <h3 className="font-display text-[18px] font-bold text-ink">
                        {sel.name}
                      </h3>
                      <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                        {dataLabel}
                      </span>
                    </div>

                    <p className="text-[13.5px] text-ink/80 leading-relaxed mb-3">
                      {sel.oneliner}
                    </p>

                    {/* hex sample 卡 */}
                    <div className="mb-3 px-2.5 py-2 bg-ink rounded-md">
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-cream/55 mb-1">
                        hex / sample
                      </div>
                      <div className="font-mono text-[12px] text-cream/95 leading-snug break-all">
                        {sel.hexSample}
                      </div>
                    </div>

                    {/* 字段列表 */}
                    <div className="space-y-1.5">
                      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/45 mb-1">
                        contains
                      </div>
                      {sel.innerLabels.map((l, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 font-mono text-[11.5px] text-ink/75"
                        >
                          <span className="text-ink/35 mt-[1px]">•</span>
                          <span className="leading-snug">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 注脚 */}
              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：bartowski/Meta-Llama-3.1-8B-Instruct-GGUF · HF 2026/05 · GGUF v3 spec ggml-org/ggml
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
