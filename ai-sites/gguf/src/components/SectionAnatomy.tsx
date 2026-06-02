/**
 * Section 02 · Anatomy
 *
 * Hero 讲了 GGUF「打包成一个文件」的价值，本段钻进文件里，看那块「说明书区」
 * （metadata KV）一个真实 .gguf 到底装了什么键值对。本段有 2 个可动元素：
 *   ① 4 个 category tab 切换 (general / llama / tokenizer / quant)
 *   ② 选中类别下的每一行 KV，点开后右侧 detail 卡换内容（值的形态 + GGUF 类型）
 *
 * 数据：Llama-3.1-8B-Instruct-Q4_K_M.gguf 真实 metadata（HF GGUF editor / llama.cpp gguf-dump 输出）
 *
 * 反模板：deploy 站用过「工具 accordion」（5 工具横向折叠），本段是 metadata 表格 + tab，结构和外观都不同。
 */
import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

type Category = "general" | "llama" | "tokenizer" | "quant";

type KV = {
  key: string;
  /** GGUF 类型枚举名 */
  type: string;
  /** 值的展示形态 */
  display: string;
  /** 选中后的展开内容 */
  detail: string;
  /** 是不是数组（粗体显示长度） */
  arrayLen?: number;
  /** 选中行的高亮意义 */
  why: string;
};

const KV_BY_CAT: Record<Category, KV[]> = {
  general: [
    {
      key: "general.architecture",
      type: "string",
      display: "\"llama\"",
      detail: "loader 看到这个值，知道按 Llama 架构去配 attention / FFN 形状。改成 \"qwen2\" / \"phi3\" 就走另一组配置。",
      why: "唯一必需 key，没它直接 load 失败",
    },
    {
      key: "general.name",
      type: "string",
      display: "\"Meta Llama 3.1 8B Instruct\"",
      detail: "人类友好的 model 名。Ollama / LM Studio UI 显示这个。",
      why: "只是文案，不影响推理",
    },
    {
      key: "general.file_type",
      type: "uint32",
      display: "15",
      detail: "枚举值。15 = MOSTLY_Q4_K_M。其他常见：1=F16, 7=Q8_0, 14=Q4_K_S, 17=Q5_K_M, 18=Q6_K。",
      why: "决定 quant-aware loader 走哪条解码路径",
    },
    {
      key: "general.quantization_version",
      type: "uint32",
      display: "2",
      detail: "这是量化块结构的版本号（第 2 代，256 个数一组），跟文件头那个 GGUF 格式版本号是两码事，别看混了。",
      why: "保证压缩块的排布不会跟旧程序错位",
    },
    {
      key: "general.alignment",
      type: "uint32",
      display: "32",
      detail: "tensor data 对齐字节数。默认 32。loader 用这个算 tensor data block 起点 + 每 tensor 偏移补齐。",
      why: "mmap 必须 page-aligned，靠它做 padding",
    },
  ],
  llama: [
    {
      key: "llama.context_length",
      type: "uint32",
      display: "131072",
      detail: "训练时 RoPE 配置的最长上下文。Llama 3.1 是 128K。loader 按这个分配 KV cache 上限。",
      why: "决定能塞多少 token",
    },
    {
      key: "llama.embedding_length",
      type: "uint32",
      display: "4096",
      detail: "每个 token 进 transformer 后的 hidden dim。Llama 3 8B 是 4096，70B 是 8192。",
      why: "整个模型 shape 的主轴",
    },
    {
      key: "llama.block_count",
      type: "uint32",
      display: "32",
      detail: "transformer block 层数。8B 是 32 层，70B 是 80 层。tensor 数量 ≈ block_count × ~9。",
      why: "决定有多少组 attention/FFN 张量",
    },
    {
      key: "llama.attention.head_count",
      type: "uint32",
      display: "32",
      detail: "Q 头数。Llama 3.1 8B 是 32，70B 是 64。结合 head_count_kv 算 GQA 分组。",
      why: "影响 attention 形状 + KV cache 大小",
    },
    {
      key: "llama.attention.head_count_kv",
      type: "uint32",
      display: "8",
      detail: "（进阶·懂 Transformer 再看）K/V 头数。比 Q 头数小，意味着多个 Q 头共用一组 K/V，省显存 —— 这套做法叫 GQA。",
      why: "Llama 3 系列都用了 GQA",
    },
    {
      key: "llama.rope.freq_base",
      type: "float32",
      display: "500000.0",
      detail: "（进阶·懂 Transformer 再看）位置编码 RoPE 的频率基数。Llama 3.1 加大到 50 万（Llama 2 是 1 万），让 128K 这么长的上下文不出乱。",
      why: "改这个等于改模型怎么记 token 的位置",
    },
  ],
  tokenizer: [
    {
      key: "tokenizer.ggml.model",
      type: "string",
      display: "\"gpt2\"",
      detail: "Llama 3 用 BPE，编码器复用 gpt2 类。Llama 2 是 \"llama\" (SentencePiece)。",
      why: "决定 tokenize 算法",
    },
    {
      key: "tokenizer.ggml.tokens",
      type: "[string]",
      display: "[\"<|begin_of_text|>\", \"<|end_of_text|>\", ..., \"!\", \"\\\"\", \"#\", ...]",
      arrayLen: 128256,
      detail: "完整词表。每个 token 的字符串形式。占 metadata 段绝大头（~2 MB）。loader load 完丢内存，不重复 mmap。",
      why: "GGUF 把 tokenizer 一并打包进文件的关键证据",
    },
    {
      key: "tokenizer.ggml.scores",
      type: "[float32]",
      display: "[0.0, 0.0, 0.0, ..., -1.0, -2.0, ...]",
      arrayLen: 128256,
      detail: "BPE merge 分数。greedy tokenizer 用这个排优先级。BPE 模型常常全 0，只有 SentencePiece 才用。",
      why: "跟 tokens 一起完成 tokenize",
    },
    {
      key: "tokenizer.ggml.bos_token_id",
      type: "uint32",
      display: "128000",
      detail: "begin-of-sequence token id。Llama 3 是 <|begin_of_text|>。chat template 渲染时插这个。",
      why: "对话开头总要它",
    },
    {
      key: "tokenizer.chat_template",
      type: "string",
      display: "\"<|begin_of_text|><|start_header_id|>{{role}}<|end_header_id|>\\n\\n{{content}}...\"",
      detail: "Jinja2 模板。Ollama / LM Studio 拿这个把 messages 渲染成模型实际看的输入。",
      why: "为啥同 GGUF 在不同框架下 chat 行为还能一致",
    },
  ],
  quant: [
    {
      key: "tensor: blk.0.attn_q.weight",
      type: "Q4_K (=12)",
      display: "shape=[4096, 4096]",
      detail: "Q (Query) 投影矩阵。K-quant 的「Medium」配方下，attention Q 通常保持 Q4_K，没特别提升。",
      why: "占模型大头的层之一",
    },
    {
      key: "tensor: blk.0.attn_v.weight",
      type: "Q6_K (=14)",
      display: "shape=[4096, 1024]",
      detail: "V 投影。Q4_K_M 里 V 升到 Q6_K —— 这就是「mixed precision」：重要的张量给更多比特。",
      why: "为啥 Q4_K_M 比朴素 Q4_0 质量高",
    },
    {
      key: "tensor: output.weight",
      type: "Q6_K (=14)",
      display: "shape=[4096, 128256]",
      detail: "最后一层 logits 投影。直接决定输出分布质量，所以哪怕你选 Q4_K_M，这层也升 Q6_K。",
      why: "K-quant 的核心策略：保护输出层",
    },
    {
      key: "tensor: blk.0.ffn_gate.weight",
      type: "Q4_K (=12)",
      display: "shape=[4096, 14336]",
      detail: "FFN gate 矩阵。FFN 内部的 gate / up / down 通常一起按 Q4_K 量化，省比特。",
      why: "FFN 占参数总量 ~67%，必须狠压",
    },
    {
      key: "tensor: token_embd.weight",
      type: "Q4_K (=12)",
      display: "shape=[4096, 128256]",
      detail: "token embedding 表。词表 128256 × 4096 = 525M 参数，是单 tensor 里最大的。Q4_K_L 子格式会把它升 Q6_K。",
      why: "K_S/M/L 子格式差异主要在这里",
    },
  ],
};

const CATS: { id: Category; label: string; sub: string; count: number }[] = [
  { id: "general", label: "general", sub: "通用元信息", count: 5 },
  { id: "llama", label: "llama", sub: "架构 hyperparam", count: 6 },
  { id: "tokenizer", label: "tokenizer", sub: "词表 + chat 模板", count: 5 },
  { id: "quant", label: "tensor", sub: "权重 dtype 抽样", count: 5 },
];

const SectionAnatomy: React.FC = () => {
  const [cat, setCat] = useState<Category>("general");
  const [selectedKey, setSelectedKey] = useState<string>(
    KV_BY_CAT.general[0].key,
  );

  const rows = KV_BY_CAT[cat];
  const sel = rows.find((r) => r.key === selectedKey) ?? rows[0];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* 段标号 */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">METADATA · 拆开里面看</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          一个真实 .gguf 文件，metadata 段里到底装了啥？
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          一个 .gguf 文件里，除了占大头的权重本身，还有一块叫 metadata 的「说明书区」—— 模型叫什么、多少层、
          词表多大，一条条「键: 值」记着（KV 就是 key-value）。外加 291 个权重张量（tensor）。挑 4 类最重要的看一眼，
          懂这些字段就懂 GGUF 为啥号称「自包含」（一个文件啥都不缺）。
        </p>

        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl overflow-hidden">
          {/* category tab 头 */}
          <div className="flex flex-wrap gap-0 border-b-2 border-ink">
            {CATS.map((c) => {
              const on = c.id === cat;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCat(c.id);
                    setSelectedKey(KV_BY_CAT[c.id][0].key);
                  }}
                  className={[
                    "flex-1 min-w-[140px] px-4 py-4 text-left transition-colors duration-200",
                    on ? "bg-ink text-cream" : "bg-white text-ink hover:bg-cream",
                    "border-r-2 border-ink last:border-r-0",
                  ].join(" ")}
                >
                  <div className="flex items-baseline justify-between mb-0.5">
                    <span className="font-mono text-[12px] font-bold tracking-wide">
                      {c.label}
                    </span>
                    <span
                      className={[
                        "font-mono text-[10px] tabular-nums",
                        on ? "text-butter" : "text-ink/45",
                      ].join(" ")}
                    >
                      {c.count} 条
                    </span>
                  </div>
                  <div
                    className={[
                      "text-[11.5px]",
                      on ? "text-cream/75" : "text-ink/55",
                    ].join(" ")}
                  >
                    {c.sub}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 主体：左 KV 列表 + 右 detail */}
          <div className="grid lg:grid-cols-12">
            {/* 列表 */}
            <div className="lg:col-span-7 border-r-0 lg:border-r-2 border-ink divide-y-2 divide-ink">
              {rows.map((r) => {
                const on = r.key === selectedKey;
                return (
                  <button
                    key={r.key}
                    onClick={() => setSelectedKey(r.key)}
                    className={[
                      "w-full px-5 py-4 text-left transition-colors duration-200",
                      on ? "bg-butter-tint" : "bg-white hover:bg-cream",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <ChevronRight
                        className={[
                          "w-3.5 h-3.5 flex-shrink-0 mt-1 transition-transform duration-300",
                          on ? "rotate-90 text-coral" : "text-ink/30",
                        ].join(" ")}
                        strokeWidth={3}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-mono text-[12.5px] font-bold text-ink break-all">
                            {r.key}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/45 px-1.5 py-0.5 bg-ink/5 border border-ink/10 rounded">
                            {r.type}
                          </span>
                          {r.arrayLen && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-coral px-1.5 py-0.5 bg-coral/10 border border-coral/30 rounded">
                              len={r.arrayLen.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="font-mono text-[11.5px] text-ink/65 leading-snug break-all">
                          {r.display}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* detail 面板 */}
            <div className="lg:col-span-5 bg-cream p-5 lg:p-6" key={sel.key}>
              <div className="animate-enter-fade">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-2">
                  selected key
                </div>
                <h3 className="font-mono text-[15px] font-bold text-ink leading-tight mb-3 break-all">
                  {sel.key}
                </h3>

                <div className="px-3 py-2.5 bg-white border-2 border-ink rounded-lg mb-4">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-1">
                    value
                  </div>
                  <div className="font-mono text-[13px] text-ink leading-snug break-all">
                    {sel.display}
                  </div>
                  {sel.arrayLen && (
                    <div className="mt-1.5 font-mono text-[10.5px] text-coral">
                      ↑ 数组共 {sel.arrayLen.toLocaleString()} 项 · 上面只列前几个
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mb-1.5">
                    啥意思
                  </div>
                  <p className="text-[13.5px] text-ink/80 leading-relaxed">
                    {sel.detail}
                  </p>
                </div>

                <div className="px-3 py-2 bg-ink rounded-lg">
                  <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-butter mb-0.5">
                    why it matters
                  </div>
                  <p className="font-mono text-[12px] text-cream leading-snug">
                    {sel.why}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 font-mono text-[10.5px] text-ink/45">
          来源：llama.cpp gguf-dump 输出 · HF GGUF editor (huggingface.co/spaces/CISCai/gguf-editor) · 2026/05
        </p>
      </div>
    </section>
  );
};

export default SectionAnatomy;
