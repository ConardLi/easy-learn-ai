/**
 * Section 07 · 全家桶 + 怎么跟 FSDP / Megatron / vLLM 选
 *
 * 反结尾鸡汤：
 *   ─ 上半 = 6 个 DeepSpeed 子库的网格（hover 看细节）
 *   ─ 下半 = 3 tab 对比（vs FSDP / vs Megatron / vs vLLM）
 *   每 tab 是 3 行决策建议（不是空泛的「优劣」）
 *
 * 数据来源（2026/05 验证）：
 *   DeepSpeed v0.19.1 release notes (2026/05/27) · github.com/deepspeedai/DeepSpeed
 *   VRLA Tech: DeepSpeed vs PyTorch FSDP 2026
 *   callsphere.ai/blog/distributed-training-pytorch-fsdp2-deepspeed-megatron-2026
 *   DeepSpeed-FastGen arXiv:2401.08671 (vs vLLM 2.3x throughput)
 *   DeepSpeed-Ulysses arXiv:2309.14509 (1M token sequence)
 *   System DMA (SDMA) for ZeRO-3 · DeepSpeed blog 2026/05
 */
import React, { useState } from "react";

type Family = {
  id: string;
  name: string;
  oneLine: string;
  detail: string;
  year: string;
  color: "coral" | "teal" | "butter" | "pop" | "ink";
};

const FAMILY: Family[] = [
  {
    id: "zero",
    name: "ZeRO 1 / 2 / 3",
    oneLine: "三档拆分 · 训练显存的基础设施",
    detail:
      "把优化器状态、梯度、参数按层级摊到多卡。整个 DeepSpeed 的根。2026/05 还在迭代：AMD GPU 加了 System DMA 让 ZeRO-3 通信不抢算力。",
    year: "2019",
    color: "coral",
  },
  {
    id: "offload",
    name: "ZeRO-Offload",
    oneLine: "优化器状态搬 CPU 内存",
    detail:
      "把 Adam 状态从 GPU HBM offload 到 CPU RAM。每步要 PCIe 拷回，慢 20-30%，但同样卡能训更大模型。",
    year: "2021",
    color: "butter",
  },
  {
    id: "infinity",
    name: "ZeRO-Infinity",
    oneLine: "再 offload 到 NVMe SSD",
    detail:
      "ZeRO-3 + CPU + NVMe 三层流水。8 张 H100 训 1T 模型的标配。NVMe 7 GB/s 读写也得用上。",
    year: "2021",
    color: "teal",
  },
  {
    id: "ulysses",
    name: "DeepSpeed-Ulysses",
    oneLine: "把一条超长文本切到多卡",
    detail:
      "训练超长上下文时，把一整条长文本切成几段分到多卡。64 张 A100 上能训 100 万 token 的上下文。",
    year: "2023",
    color: "pop",
  },
  {
    id: "mii",
    name: "DeepSpeed-MII / FastGen",
    oneLine: "推理服务化 · 跟 vLLM 抢生意",
    detail:
      "Dynamic SplitFuse + 连续 batching + 阻塞 KV cache。Llama-2 70B 上对 vLLM 有 2.3× 有效吞吐。",
    year: "2023",
    color: "coral",
  },
  {
    id: "chat",
    name: "DeepSpeed-Chat",
    oneLine: "把 RLHF 训练串成一条龙",
    detail:
      "把 SFT → 奖励模型 → PPO 三步打包到一起跑。（RLHF / PPO 是一类训练方法，另有专站讲。）",
    year: "2023",
    color: "ink",
  },
];

type TabId = "fsdp" | "megatron" | "vllm";

type Comparison = {
  versus: string;
  versusSub: string;
  intro: string;
  headline: string;
  rows: { topic: string; ds: string; them: string; winner: "ds" | "them" | "tie" }[];
  verdict: string;
  source: string;
};

const COMP: Record<TabId, Comparison> = {
  fsdp: {
    versus: "vs PyTorch FSDP2",
    versusSub: "原生 PyTorch · 自己人",
    intro: "FSDP 是 PyTorch 自带的多卡分片功能，把模型和状态切到多张卡 —— 思路跟 ZeRO 很像。",
    headline: "想要原生体验选 FSDP2，想把状态狠狠 offload 到 CPU / 硬盘选 DeepSpeed。",
    rows: [
      {
        topic: "编程模型",
        ds: "config 驱动 · 一份 JSON 改 stage",
        them: "原生 PyTorch · fully_shard + DTensor + DeviceMesh",
        winner: "them",
      },
      {
        topic: "CPU / NVMe offload",
        ds: "ZeRO-Infinity 是它的招牌",
        them: "有，但不是核心故事",
        winner: "ds",
      },
      {
        topic: "2026 默认选择",
        ds: "组织已经基于 DeepSpeed 运维",
        them: "新项目 7-70B 微调 · HF Trainer / TRL 默认",
        winner: "them",
      },
    ],
    verdict:
      "70B 以下微调用 FSDP2 更省心。要把状态推到 CPU / NVMe，DeepSpeed 仍是首选。",
    source: "VRLA Tech 2026 · DeepSpeed vs PyTorch FSDP",
  },
  megatron: {
    versus: "vs Megatron-LM (NVIDIA)",
    versusSub: "NVIDIA · 极致并行",
    intro: "Megatron 是 NVIDIA 的大模型并行训练框架，专攻把一层切开（TP）、把模型按层切段（PP）。",
    headline: "Megatron 负责怎么切层切矩阵，DeepSpeed 负责怎么省显存，训大模型常两个一起上。",
    rows: [
      {
        topic: "强项",
        ds: "ZeRO + offload · 内存优化的天花板",
        them: "TP / PP / EP / CP 全套并行 · 极致吞吐",
        winner: "tie",
      },
      {
        topic: "适合规模",
        ds: "中等到大 · 显存吃紧时",
        them: "70B+ 的预训练 · 16K 卡级别",
        winner: "them",
      },
      {
        topic: "联合使用",
        ds: "Megatron-DeepSpeed 项目 · BLOOM 175B 走的路",
        them: "Llama 3 405B 用 Megatron-Core + DeepSpeed offload",
        winner: "tie",
      },
    ],
    verdict:
      "现实是「Megatron-Core 提供并行 + DeepSpeed 提供内存」组合栈。NeMo / TorchTitan 都在这层上面包一层。",
    source: "bestaiweb.ai/how-to-pre-train-a-language-model-2026",
  },
  vllm: {
    versus: "vs vLLM (推理)",
    versusSub: "DeepSpeed-FastGen 这边",
    intro: "vLLM 是把模型部署上线、对外提供回答的推理框架，不参与训练。DeepSpeed 这边对应的是 MII / FastGen。",
    headline: "推理这块，FastGen 靠 Dynamic SplitFuse 主打长 prompt 场景。",
    rows: [
      {
        topic: "调度策略",
        ds: "Dynamic SplitFuse · prompt 和 generation 混批",
        them: "Continuous Batching + PagedAttention",
        winner: "ds",
      },
      {
        topic: "Llama-2 70B 吞吐",
        ds: "1.36 rps · 9s 延迟",
        them: "0.67 rps · 9s 延迟",
        winner: "ds",
      },
      {
        topic: "生态 / 易用",
        ds: "MII 包了一层 · 但社区比 vLLM 小",
        them: "vLLM 是 2026 推理默认 · 模型支持最全",
        winner: "them",
      },
    ],
    verdict:
      "长 prompt + 严格 SLA 场景选 FastGen；通用推理选 vLLM。架构上 FastGen 的 SplitFuse 已被 vLLM v0.7 借鉴。",
    source: "DeepSpeed-FastGen arXiv:2401.08671 · vLLM blog 2026",
  },
};

const SectionFamily: React.FC = () => {
  const [tab, setTab] = useState<TabId>("fsdp");
  const c = COMP[tab];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">07</span>
          <span className="section-anchor-label">family & picking</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-5 max-w-3xl">
          DeepSpeed 是一整套工具，
          <br />
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0 -rotate-1"
              aria-hidden
            />
            <span className="relative z-10">不只有 ZeRO</span>
          </span>
          。
        </h2>
        <p className="max-w-2xl text-ink/65 text-[16px] mb-9">
          它是一整个家族：训练有 ZeRO 系列、长文本有 Ulysses、推理有 MII / FastGen、RLHF 训练有 Chat。
          先看下面 6 块卡，再切 tab 看它跟 PyTorch FSDP / Megatron-LM / vLLM 怎么选。
        </p>

        {/* 6 家族卡 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {FAMILY.map((f) => (
            <FamilyCard key={f.id} f={f} />
          ))}
        </div>

        {/* 分隔 */}
        <div className="flex items-center gap-3 mb-7">
          <div className="h-px flex-1 bg-ink/15" />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
            那 · 跟谁怎么选
          </span>
          <div className="h-px flex-1 bg-ink/15" />
        </div>

        {/* tab */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {(Object.keys(COMP) as TabId[]).map((id) => {
            const on = id === tab;
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={[
                  "px-4 py-3 border-2 border-ink rounded-2xl text-left transition-all duration-250 ease-spring",
                  on
                    ? "bg-ink text-cream shadow-stamp-lg"
                    : "bg-white text-ink hover:bg-cream hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#241C15]",
                ].join(" ")}
              >
                <div className="font-display text-[14px] font-bold leading-tight">
                  {COMP[id].versus}
                </div>
                <div
                  className={[
                    "font-mono text-[10px] mt-0.5",
                    on ? "text-cream/55" : "text-ink/50",
                  ].join(" ")}
                >
                  {COMP[id].versusSub}
                </div>
              </button>
            );
          })}
        </div>

        {/* 对比 panel */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8" key={tab}>
          <p className="text-[13.5px] text-ink/65 leading-relaxed mb-3 animate-enter-fade">
            {c.intro}
          </p>
          <h3 className="font-display text-[22px] lg:text-[26px] font-bold text-ink leading-tight mb-5 animate-enter-fade">
            {c.headline}
          </h3>

          {/* 3 行对比 */}
          <div className="space-y-3 mb-6">
            {c.rows.map((r, i) => (
              <CompareRow key={i} row={r} />
            ))}
          </div>

          {/* 结论 */}
          <div className="px-4 py-3 bg-cream border-2 border-ink rounded-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-coral mb-1">
              所以
            </div>
            <p className="text-[14.5px] text-ink/85 leading-relaxed">{c.verdict}</p>
          </div>

          <p className="mt-3 font-mono text-[10px] text-ink/40">来源 · {c.source}</p>
        </div>

        {/* 收尾硬规则 · 替代鸡汤 */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Rule
            num="01"
            text="单卡 7B 微调 → 别上 DeepSpeed，QLoRA + bitsandbytes 就够。"
          />
          <Rule
            num="02"
            text="8 卡 70B 微调 → 直接 ZeRO-3 + HuggingFace Accelerate。"
          />
          <Rule
            num="03"
            text="想训比集群显存大 2 倍的模型 → ZeRO-Infinity offload 是仅有的合法选项。"
          />
        </div>
      </div>
    </section>
  );
};

const FamilyCard: React.FC<{ f: Family }> = ({ f }) => {
  const colorMap = {
    coral: { dot: "bg-coral", tag: "bg-coral/15 text-coral" },
    teal: { dot: "bg-teal", tag: "bg-teal/15 text-teal" },
    butter: { dot: "bg-butter-deep", tag: "bg-butter/35 text-ink" },
    pop: { dot: "bg-pop", tag: "bg-pop/15 text-pop" },
    ink: { dot: "bg-ink", tag: "bg-ink/10 text-ink" },
  }[f.color];
  return (
    <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-stamp-lg">
      <div className="flex items-baseline gap-2 mb-2">
        <span className={`w-2.5 h-2.5 ${colorMap.dot} border border-ink rounded-sm`} />
        <span className="font-display text-[17px] font-bold text-ink leading-tight">
          {f.name}
        </span>
        <span className={`ml-auto font-mono text-[9px] px-1.5 py-0.5 rounded ${colorMap.tag}`}>
          {f.year}
        </span>
      </div>
      <p className="font-display text-[13.5px] font-bold text-ink/85 mb-2 leading-snug">
        {f.oneLine}
      </p>
      <p className="text-[12.5px] text-ink/65 leading-relaxed">{f.detail}</p>
    </div>
  );
};

const CompareRow: React.FC<{
  row: { topic: string; ds: string; them: string; winner: "ds" | "them" | "tie" };
}> = ({ row }) => {
  return (
    <div className="grid grid-cols-12 gap-3 items-stretch">
      <div className="col-span-12 sm:col-span-2 flex items-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
          {row.topic}
        </span>
      </div>
      <div
        className={[
          "col-span-12 sm:col-span-5 px-3 py-2.5 border-2 rounded-lg",
          row.winner === "ds"
            ? "border-ink bg-cream shadow-[2px_2px_0_0_#241C15]"
            : "border-ink/25 bg-white",
        ].join(" ")}
      >
        <div className="font-mono text-[9px] text-coral font-bold uppercase tracking-[0.16em] mb-0.5">
          DeepSpeed
        </div>
        <p className="text-[13px] text-ink/80 leading-snug">{row.ds}</p>
      </div>
      <div
        className={[
          "col-span-12 sm:col-span-5 px-3 py-2.5 border-2 rounded-lg",
          row.winner === "them"
            ? "border-ink bg-cream shadow-[2px_2px_0_0_#241C15]"
            : "border-ink/25 bg-white",
        ].join(" ")}
      >
        <div className="font-mono text-[9px] text-teal font-bold uppercase tracking-[0.16em] mb-0.5">
          对方
        </div>
        <p className="text-[13px] text-ink/80 leading-snug">{row.them}</p>
      </div>
    </div>
  );
};

const Rule: React.FC<{ num: string; text: string }> = ({ num, text }) => (
  <div className="px-4 py-3 bg-ink text-cream rounded-2xl">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-1">
      规则 {num}
    </div>
    <p className="text-[13.5px] leading-relaxed">{text}</p>
  </div>
);

export default SectionFamily;
