/**
 * Section 06 · 「2026 还是 transformer · 但加了 4 层补丁 + 一个挑战者」
 *
 * accordion 形式（跟 Section 04 pill / Section 05 stepper 都不同种）：
 *   ─ 5 个改进项 click 展开 → 看 what / why / who uses / 数据
 *   ─ Mamba-3 单列「挑战者」卡片在底部
 *
 * 2026 数据全用 WebSearch 查证，每项都标来源。
 */
import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Patch = {
  id: string;
  title: string;
  /** 一句话 */
  punchline: string;
  /** 解决什么问题 */
  problem: string;
  /** 怎么改的 */
  fix: string;
  /** 谁用 */
  users: string;
  /** 关键数字 */
  stat: { label: string; value: string };
  source: string;
  tone: "coral" | "teal" | "butter" | "ink";
};

const PATCHES: Patch[] = [
  {
    id: "fa4",
    title: "Flash Attention 4",
    punchline: "把同样的 attention 算得更快、更省显存。",
    problem:
      "vanilla attention 每个 head 都要把 N×N 的中间矩阵存到 HBM 里，N=8K 时显存爆炸、来回搬运慢。",
    fix:
      "把 Q/K/V 切 tile 流式算，只往显存写最终结果；FA-4 进一步用 Blackwell 的异步 MMA + 软件模拟 exp，单卡算到 1613 TFLOPs/s（71% 利用率）。",
    users: "几乎所有训练框架默认开。vLLM / SGLang / TGI / TensorRT-LLM 都集成。",
    stat: { label: "B200 BF16 vs Triton", value: "2.7× 快" },
    source: "arXiv:2603.05451 · together.ai blog 2026-03-05 · Lambda blog 2026-03-05",
    tone: "coral",
  },
  {
    id: "gqa",
    title: "Grouped-Query Attention (GQA)",
    punchline: "几路 query 共享一份 key/value，KV cache 直接砍 8×。",
    problem:
      "LLM 推理瓶颈是 KV cache，不是算力。70B 模型 8K 上下文 KV cache 单序列几 GB，batch 起不来。",
    fix:
      "把 N 个 query head 分成 G 组，每组共享一份 K/V。Llama 3.1 70B 用 64 query head + 8 KV head → KV cache 1/8。",
    users:
      "2026 默认款：Llama 3.1 / 4、Qwen 2.5 / 3、Mistral Large 2（12:1）、Gemma、Starcoder 全用。",
    stat: { label: "Llama 3 KV cache", value: "1/8 MHA" },
    source: "Ainslie et al. arXiv:2305.13245 · zeroentropy.dev 2026 · pythonalchemist GQA 2026",
    tone: "teal",
  },
  {
    id: "mla",
    title: "Multi-Head Latent Attention (MLA)",
    punchline: "DeepSeek 系自创：把 K/V 压成低维 latent，更狠。",
    problem:
      "GQA 砍 8× 已经很猛，但长上下文（128K+）单序列 KV 还是占主导，企业部署成本下不来。",
    fix:
      "把所有 head 的 K/V 投到一个 ~512 维的共享 latent + 一小段 RoPE。推理时再 reconstruct。压得比 GQA 更狠，但要自己写 kernel。",
    users:
      "DeepSeek-V2 / V3 / V3.2、Kimi-Linear 用。Llama / Qwen / Gemini 阵营保留 GQA（生态兼容性赢）。",
    stat: { label: "vs MHA", value: "~10× 压缩" },
    source: "DeepSeek-V2 arXiv:2405.04434 · DeepSeek-V3 tech report 2024-12",
    tone: "butter",
  },
  {
    id: "swa",
    title: "Sliding Window Attention",
    punchline: "每个 token 只看左右 W 个邻居，不算全局 N×N。",
    problem:
      "100K+ 上下文里，大部分 token 跟远处那些没啥关系，全局 attention 是浪费。",
    fix:
      "限定每个 token 只能 attend 一个 W token 的滑动窗口（W=4K 是常见值），N² → N·W。Mistral 7B 是第一个开窗的主流模型。",
    users:
      "Mistral 7B（W=4K）、Mixtral、Gemma 2/3、ModernBERT 局部/全局交替。Llama 4 Scout 也用滑窗 + GQA 撑到 10M 上下文。",
    stat: { label: "复杂度", value: "O(N·W)" },
    source: "Mistral 7B arXiv:2310.06825 · Gemma 2 tech report 2024",
    tone: "ink",
  },
  {
    id: "rope",
    title: "RoPE (Rotary Position Embedding)",
    punchline: "位置不再加在输入，加进 Q/K 的旋转里。",
    problem:
      "原版 sin/cos 加在 embedding 上，模型很难外推到训练长度之外。learned 也是。",
    fix:
      "把 token 在 Q/K 矩阵的每对维度上「旋转」一个跟位置成正比的角度。点积时位置自动算进去。可以靠 NTK / YaRN scaling 外推。",
    users:
      "2026 大半数主流：Llama 全系、Qwen、Mistral、Gemma、DeepSeek、ChatGLM、ModernBERT、Mixtral。",
    stat: { label: "采用占比", value: "≈ 80%+" },
    source: "Su et al. arXiv:2104.09864 · YaRN arXiv:2309.00071",
    tone: "coral",
  },
];

const TONE_BG: Record<Patch["tone"], string> = {
  ink: "bg-ink text-cream border-ink",
  coral: "bg-coral text-cream border-ink",
  teal: "bg-teal text-cream border-ink",
  butter: "bg-butter text-ink border-ink",
};

const SectionToday: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("fa4");

  const toggle = (id: string) => {
    setOpenId((cur) => (cur === id ? null : id));
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Patches · 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              9 年没换骨架，
              <br />
              但零件换了好几轮。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              2017 的原版 transformer 推到 2026 大模型，吃不消。每一层都被换过零件：算 attention 用 Flash Attention 4，KV 缓存用 GQA / MLA，位置编码用 RoPE，上下文长靠 sliding window —— 加起来才有今天能跑 1M token 的 Claude / Gemini。
            </p>
          </div>
        </div>

        {/* accordion */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-3 lg:p-4 overflow-hidden">
          <div className="space-y-2">
            {PATCHES.map((p) => {
              const open = openId === p.id;
              return (
                <div
                  key={p.id}
                  className={[
                    "rounded-2xl border-2 transition-all duration-300 ease-spring overflow-hidden",
                    open ? "border-ink bg-cream" : "border-ink/15 bg-white",
                  ].join(" ")}
                >
                  <button
                    onClick={() => toggle(p.id)}
                    className="w-full flex items-center justify-between gap-4 px-4 lg:px-5 py-4 text-left hover:bg-cream transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={[
                          "inline-flex items-center justify-center w-9 h-9 rounded-full border-2 font-mono text-[11px] font-bold shrink-0",
                          TONE_BG[p.tone],
                        ].join(" ")}
                      >
                        {PATCHES.indexOf(p) + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-[17px] font-bold text-ink leading-tight">
                          {p.title}
                        </div>
                        <div className="font-mono text-[11px] text-ink/55 mt-0.5 truncate">
                          {p.punchline}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:block text-right">
                        <div className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-ink/45">
                          {p.stat.label}
                        </div>
                        <div className="font-display text-[14px] font-bold text-ink tabular-nums">
                          {p.stat.value}
                        </div>
                      </div>
                      <ChevronDown
                        className={[
                          "w-4 h-4 text-ink transition-transform duration-300 ease-spring",
                          open ? "rotate-180" : "",
                        ].join(" ")}
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  {open && (
                    <div className="px-4 lg:px-5 pb-5 grid lg:grid-cols-12 gap-5 animate-enter-fade">
                      <div className="lg:col-span-6">
                        <Field label="为什么要改" value={p.problem} />
                        <Field label="怎么改的" value={p.fix} />
                      </div>
                      <div className="lg:col-span-6">
                        <Field label="谁在用" value={p.users} />
                        <div className="px-3 py-2.5 bg-white border-2 border-ink/15 rounded-lg">
                          <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55">
                            {p.stat.label}
                          </div>
                          <div className="font-display text-[20px] font-bold text-ink tabular-nums">
                            {p.stat.value}
                          </div>
                        </div>
                        <p className="mt-3 font-mono text-[10px] text-ink/45 leading-relaxed">
                          来源：{p.source}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mamba 挑战者 */}
        <div className="mt-8 grid lg:grid-cols-12 gap-7">
          <div className="lg:col-span-7">
            <div className="px-6 py-5 bg-ink text-cream rounded-3xl border-2 border-ink">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-2">
                挑战者 · 2026-03
              </div>
              <div className="font-display text-[26px] font-bold text-cream leading-tight mb-2">
                Mamba-3 把 transformer 干掉了吗？
              </div>
              <p className="text-[14px] text-cream/85 leading-relaxed mb-3">
                没。Mamba-3（Together AI + CMU + Princeton + Cartesia，ICLR 2026）在 1.5B 参数语言建模上比同尺寸 transformer 准 4%、长序列快 7×，Apache 2.0 开源，state-spaces/mamba GitHub 17.5k+ star。
              </p>
              <p className="text-[14px] text-cream/85 leading-relaxed">
                但 transformer 在 retrieval / 复杂推理上仍领先，pure SSM 没把 transformer 替掉。现在更多走混合路线：NVIDIA Nemotron-H、IBM Bamba、Kimi-Linear、Qwen3 已经在 transformer 层里夹 Mamba / linear-attention 层。
              </p>
              <p className="mt-3 font-mono text-[10px] text-cream/55">
                来源：arXiv:2603.15569 · Princeton PLI blog 2026 · topaiproduct 2026-03-21
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 space-y-3">
            <div className="px-5 py-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
                挑模型的经验
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug">
                商用对话模型多半是 decoder-only + GQA + RoPE，用 vLLM / TGI 一般能直接跑。架构特别的（自创 attention / SSM 混合）才可能要自己写 kernel。
              </p>
            </div>
            <div className="px-5 py-4 bg-butter/40 border-2 border-ink rounded-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/65 mb-1">
                数字事实
              </div>
              <p className="font-display text-[15px] font-bold text-ink leading-snug">
                2026 年 Top-10 闭源 LLM 全部是 decoder-only transformer 变体。0 个例外。
              </p>
              <p className="mt-1.5 font-mono text-[10px] text-ink/55">
                来源：LMSYS Arena 2026/05 + 各家发布说明汇总
              </p>
            </div>
          </div>
        </div>

        {/* 站尾分支互链：底座 → 三种形态 */}
        <div className="mt-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
            接下来看哪个
          </div>
          <p className="text-[15px] text-ink/75 leading-relaxed mb-5 max-w-2xl">
            这套骨架按「读 / 写」拆出三种形态 —— 后来还被搬去处理图像和声音。挑一个往下看，看它怎么用 Transformer 这堆零件干活。
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              {
                href: "../attention/index.html",
                name: "注意力机制",
                kind: "先懂一个头怎样挑重点",
                desc: "从 Q、K、V 开始，亲手调权重，看当前位置怎样拿回相关信息。",
              },
              {
                href: "../multi-head-attention/index.html",
                name: "多头注意力",
                kind: "多个观察角度",
                desc: "把一套注意力复制成多个头，并行观察指代、动作和位置等关系。",
              },
              {
                href: "../multi-query-attention/index.html",
                name: "Multi-Query Attention",
                kind: "多个 Q 共享 K/V",
                desc: "生成回答时减少 K/V 缓存和读取量，理解它为什么能加快解码。",
              },
              {
                href: "../bert/index.html",
                name: "BERT",
                kind: "encoder-only",
                desc: "只读不写：盖住词让模型猜，做填空 / 打分 / 分类。",
              },
              {
                href: "../gpt/index.html",
                name: "GPT",
                kind: "decoder-only",
                desc: "只往后写：一个字一个字续，做聊天 / 续写。",
              },
              {
                href: "../t5/index.html",
                name: "T5",
                kind: "encoder-decoder",
                desc: "先读后写：把任务变成「文字进、文字出」做翻译 / 改写。",
              },
              {
                href: "../llama/index.html",
                name: "Llama",
                kind: "decoder-only · 开源",
                desc: "跟 GPT 同类，开源权重能自己下来跑。",
              },
              {
                href: "../multimodality/index.html",
                name: "多模态",
                kind: "同架构 · 处理图像/音频",
                desc: "同一套 Transformer，现在也用来读图和声音。看它怎么把一张图切成 token。",
              },
              {
                href: "../model-inference/index.html",
                name: "模型推理",
                kind: "把模型真正跑起来",
                desc: "输入进来以后，模型怎样一步步选出下一个 token，并拼成完整回答。",
              },
              {
                href: "../kv-cache/index.html",
                name: "KV Cache",
                kind: "复用注意力计算",
                desc: "Q/K/V 已经看懂了，再看生成时怎样存住 K/V，避免把前文反复重算。",
              },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="group flex flex-col gap-2 px-4 py-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[17px] font-bold text-ink">
                    {s.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-ink/60" strokeWidth={2.4} />
                </div>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/55">
                  {s.kind}
                </span>
                <span className="text-[12.5px] text-ink/75 leading-relaxed">
                  {s.desc}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
        {label}
      </div>
      <p className="text-[14px] text-ink leading-relaxed">{value}</p>
    </div>
  );
}

export default SectionToday;
