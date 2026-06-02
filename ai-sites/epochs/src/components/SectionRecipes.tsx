/**
 * Section 05 · 6 个常见任务的 epoch 配方 · accordion
 *
 * 反相邻：Repeat（slider + 曲线）→ 这里 accordion（L2）+ 展开看推荐 + 来源。
 *   不抢 whyfinetune SectionForget 的「accordion + 三柱对比」，这里是单卡片不是三柱，
 *   而且主轴是"epoch 推荐值"。
 *
 * 6 行：LLM 预训练 / SFT / DPO/RLHF / LoRA / 视觉小数据 / Kaggle 表格
 * 每行：默认 epoch 范围 + 一句话理由 + 展开看 3 个细节（数据规模 / 风险 / 来源）
 *
 * 可动元素：
 *   - 6 个 accordion 行点击展开/合（L2）
 *   - 顶部一个 toggle「按 epoch 升序 / 按数据规模升序」（L2）
 *   - hover：每行 epoch 数 hover 高亮（基础礼貌）
 */
import React, { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";

type Recipe = {
  id: string;
  label: string;
  sub: string;
  epochs: [number, number];
  dataScale: number; // 用于排序：log10 样本/token 量级
  oneLine: string;
  details: {
    数据规模: string;
    主要风险: string;
    出处: string;
  };
};

const RECIPES: Recipe[] = [
  {
    id: "pretrain",
    label: "LLM 预训练",
    sub: "Llama / DeepSeek / Qwen",
    epochs: [1, 1],
    dataScale: 13,
    oneLine: "数据多到走不完两遍。每 token 看一次就是全部。",
    details: {
      数据规模: "10-20 T tokens 起步",
      主要风险: "数据没去重 → 实际重复率超 4 epoch 等效",
      出处: "Llama 3 = 15.6T (arXiv:2407.21783) · DeepSeek V3 = 14.8T (arXiv:2412.19437)",
    },
  },
  {
    id: "sft",
    label: "SFT 监督微调",
    sub: "instruction following",
    epochs: [1, 3],
    dataScale: 6,
    oneLine: "2 epoch 是甜区。3 epoch 是上限。多了开始忘东西。",
    details: {
      数据规模: "1 万 - 100 万条 instruction",
      主要风险: "超过 3 epoch 边际收益骤降，还会开始忘旧本事（见上一节）",
      出处: "Tulu 3 默认 2 epoch (arXiv:2411.15124) · OpenHermes 1-2 epoch",
    },
  },
  {
    id: "dpo",
    label: "DPO / RLHF",
    sub: "偏好对齐",
    epochs: [1, 3],
    dataScale: 5,
    oneLine: "通常 1-3 epoch，按 reward gap 监控早停。",
    details: {
      数据规模: "5 千 - 50 万条 (chosen, rejected) 对",
      主要风险: "reward hacking + KL 漂移 → 看着分高，实际答非所问",
      出处: "Unsloth DPO 默认 3 epoch · TRL 库官方示例",
    },
  },
  {
    id: "lora",
    label: "LoRA / QLoRA",
    sub: "PEFT 微调",
    epochs: [1, 3],
    dataScale: 4,
    oneLine: "Unsloth 默认 1-3 epoch。小数据可拉到 4-8 epoch。",
    details: {
      数据规模: "几百到几万条 · 单卡 4090 起跑",
      主要风险: "rank 选小+epoch 多 → 学不会；rank 大+epoch 多 → 退化成 full FT",
      出处: "Unsloth Docs · LoRA Hyperparameters Guide 2026/05",
    },
  },
  {
    id: "vision-small",
    label: "视觉小数据",
    sub: "ResNet / EfficientNet on CIFAR",
    epochs: [30, 100],
    dataScale: 4.7,
    oneLine: "传统 DL 的写法。10-30 epoch 起步，配 cosine + 早停。",
    details: {
      数据规模: "1 万 - 100 万张图",
      主要风险: "数据增强不够 → 30 epoch 后疯狂过拟合",
      出处: "PyTorch examples · ImageNet 标准配方 90 epoch",
    },
  },
  {
    id: "kaggle",
    label: "Kaggle 表格",
    sub: "XGBoost / NN",
    epochs: [50, 500],
    dataScale: 3.5,
    oneLine: "靠早停救命：跑很多 epoch，但只保 val 最好那个 checkpoint。",
    details: {
      数据规模: "几千到几十万行 · 5-fold CV",
      主要风险: "leaderboard 过拟合 → public LB 漂亮，private LB 翻车",
      出处: "Kaggle 公开 solution · LightGBM early_stopping_rounds 实践",
    },
  },
];

type SortKey = "epochs" | "data";

const SectionRecipes: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("sft");
  const [sortKey, setSortKey] = useState<SortKey>("epochs");

  const sorted = [...RECIPES].sort((a, b) => {
    if (sortKey === "epochs") return a.epochs[0] - b.epochs[0];
    return a.dataScale - b.dataScale;
  });

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">配方 · 6 种任务的 epoch</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <h2 className="font-display text-display-lg text-ink max-w-3xl">
            不同任务，epoch 数差到 100 倍。
          </h2>
          <div className="inline-flex items-center gap-1 bg-white border-2 border-ink rounded-full p-1 shadow-stamp">
            <button
              onClick={() => setSortKey("epochs")}
              className={[
                "px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all duration-200",
                sortKey === "epochs"
                  ? "bg-ink text-cream"
                  : "text-ink/65 hover:text-ink",
              ].join(" ")}
            >
              按 epoch
            </button>
            <button
              onClick={() => setSortKey("data")}
              className={[
                "px-3 py-1 rounded-full font-mono text-[11px] font-semibold transition-all duration-200",
                sortKey === "data"
                  ? "bg-ink text-cream"
                  : "text-ink/65 hover:text-ink",
              ].join(" ")}
            >
              按数据量
            </button>
          </div>
        </div>
        <p className="max-w-3xl text-[15.5px] text-ink/75 leading-relaxed mb-8">
          LLM 预训练 1 个 epoch，Kaggle 表格能跑 500 个。数据少、模型大就少跑；
          数据多、模型小就多跑。下面是 6 种活儿的默认值。
        </p>

        <div className="space-y-2">
          {sorted.map((r) => {
            const open = openId === r.id;
            return (
              <div
                key={r.id}
                className={[
                  "border-2 border-ink rounded-2xl transition-all duration-300 ease-spring overflow-hidden",
                  open
                    ? "bg-white shadow-[6px_6px_0_0_#241C15]"
                    : "bg-white/80 shadow-stamp",
                ].join(" ")}
              >
                <button
                  onClick={() => setOpenId(open ? null : r.id)}
                  className="w-full px-4 py-3.5 flex items-center gap-3 text-left hover:bg-cream/60 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span className="font-display text-[18px] font-bold text-ink">
                        {r.label}
                      </span>
                      <span className="font-mono text-[10.5px] text-ink/55">
                        {r.sub}
                      </span>
                    </div>
                    <div className="text-[13px] text-ink/70 leading-snug mt-0.5">
                      {r.oneLine}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <EpochBadge lo={r.epochs[0]} hi={r.epochs[1]} />
                    <ChevronDown
                      className={[
                        "w-5 h-5 text-ink transition-transform duration-300",
                        open ? "rotate-180" : "",
                      ].join(" ")}
                      strokeWidth={2.2}
                    />
                  </div>
                </button>
                {open && (
                  <div className="px-4 pb-4 pt-1 border-t-2 border-ink/10">
                    <div className="grid sm:grid-cols-3 gap-2.5 mt-2">
                      {Object.entries(r.details).map(([k, v]) => (
                        <div
                          key={k}
                          className="px-3 py-2 bg-cream border-2 border-ink rounded-md"
                        >
                          <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55 font-semibold">
                            {k}
                          </div>
                          <div className="text-[12.5px] text-ink mt-1 leading-snug">
                            {v}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[11px] text-ink/45 leading-relaxed max-w-3xl">
          推荐范围综合：Unsloth Docs (2026/05)、Tulu 3 / OpenHermes / Magpie 默认 config、
          Llama 3 / DeepSeek V3 模型卡、TRL DPO 示例脚本、PyTorch examples ImageNet 90 epoch
          配方、Kaggle 公开 winning solutions。
        </p>

        <FourSetCard />
      </div>
    </section>
  );
};

/* ─── 微调四件套互链卡 ─── */
/* epoch 是开训前要一起设的四个超参之一，另外三个各有一站。 */
const FourSetCard: React.FC = () => {
  const links = [
    {
      href: "../learning-rate/index.html",
      name: "学习率 lr",
      desc: "每步往前迈多大",
    },
    {
      href: "../batch-size/index.html",
      name: "batch size",
      desc: "每步一起看多少条",
    },
    {
      href: "../lora-rank/index.html",
      name: "LoRA 的秩 r",
      desc: "那条补丁开多宽",
    },
  ];
  return (
    <div className="mt-12 bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 lg:p-6">
      <div className="flex items-baseline gap-2.5 mb-1.5">
        <span className="font-display text-[18px] font-bold text-ink">微调四件套</span>
        <span className="font-mono text-[10.5px] text-ink/55">开训前一起填的超参</span>
      </div>
      <p className="text-[13.5px] text-ink/70 leading-relaxed mb-4 max-w-2xl">
        微调一个模型，要一起设的超参就这四个：学习率、batch size、epoch、LoRA 的秩 r。
        你正在看 epoch（看几遍）这一件，另外三件各有一站。
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        <div className="px-3.5 py-3 bg-butter border-2 border-ink rounded-2xl">
          <div className="font-display text-[15px] font-bold text-ink leading-tight">epoch</div>
          <div className="font-mono text-[10.5px] text-ink/65 mt-1">你在这一站 · 看几遍</div>
        </div>
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="group px-3.5 py-3 bg-cream border-2 border-ink rounded-2xl hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp transition-all duration-250 ease-spring"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-[15px] font-bold text-ink leading-tight">
                {l.name}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-ink/55 group-hover:text-ink" strokeWidth={2.4} />
            </div>
            <div className="font-mono text-[10.5px] text-ink/65 mt-1">{l.desc}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

const EpochBadge: React.FC<{ lo: number; hi: number }> = ({ lo, hi }) => {
  const same = lo === hi;
  return (
    <div className="flex items-baseline gap-1 px-2.5 py-1 bg-butter border-2 border-ink rounded-md">
      <span className="font-display text-[18px] font-bold text-ink leading-none tabular-nums">
        {same ? lo : `${lo}-${hi}`}
      </span>
      <span className="font-mono text-[9.5px] text-ink/65 uppercase tracking-[0.16em]">
        epoch
      </span>
    </div>
  );
};

export default SectionRecipes;
