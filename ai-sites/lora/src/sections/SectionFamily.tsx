import React, { useState } from "react";
import SectionFrame from "../components/SectionFrame";

type Variant = {
  id: string;
  name: string;
  year: string;
  paper: string;
  one: string;
  formula: string;
  change: string;
  benefit: string;
  when: string;
};

const FAMILY: Variant[] = [
  {
    id: "qlora",
    name: "QLoRA",
    year: "2023",
    paper: "arXiv:2305.14314 · Dettmers et al.",
    one: "把 base 模型量化到 4-bit，LoRA 旁路仍跑 fp16。",
    formula: "y = NF4(W)·x + BA·x",
    change: "base 权重量化为 NF4，反向只对 BA 求梯度。",
    benefit: "单张 48 GB GPU 可微调 65B 模型。",
    when: "显存紧、想训大模型必选。Unsloth 默认走这条路。",
  },
  {
    id: "dora",
    name: "DoRA",
    year: "2024",
    paper: "arXiv:2402.09353 · Liu et al.",
    one: "把 ΔW 分解为方向 + 长度两部分单独训。",
    formula: "W' = m·(W + BA)/‖W + BA‖",
    change: "新增一个标量 m 控制每列的长度（magnitude）。",
    benefit: "在低 r（r=4-8）时效果比 LoRA 高 1-3 个点。",
    when: "想在极低参数预算下逼近 Full FT 时考虑。",
  },
  {
    id: "rslora",
    name: "rsLoRA",
    year: "2023",
    paper: "arXiv:2312.03732 · Kalajdzievski",
    one: "缩放系数 α/r 改成 α/√r，让 r 加大时不爆。",
    formula: "ΔW = (α/√r)·BA",
    change: "纯数学修正 — 只改一个 scale 常数。",
    benefit: "r > 32 时训练更稳，效果随 r 增长不饱和。",
    when: "想跑高 r（64/128）的复杂任务时打开。",
  },
  {
    id: "lora+",
    name: "LoRA+",
    year: "2024",
    paper: "arXiv:2402.12354 · Hayou et al.",
    one: "B 的学习率比 A 大 16 倍，分别走两个 optimizer 组。",
    formula: "lr_B = 16 × lr_A",
    change: "把 B 和 A 当两类参数喂给 optimizer。",
    benefit: "训练收敛快 ~2×，最终效果略升。",
    when: "训练时长是瓶颈、追求快速 SFT 迭代时。",
  },
  {
    id: "pissa",
    name: "PiSSA",
    year: "2024",
    paper: "arXiv:2404.02948 · Meng et al.",
    one: "用 W 自己的 SVD 主成分初始化 A、B，剩余给冻结的 W。",
    formula: "W = U_r Σ_r V_rᵀ + W_res; B,A ← SVD",
    change: "初始化时已经在学最重要的主方向。",
    benefit: "收敛快，最终 loss 比随机初始化低。",
    when: "想从更好的起点出发、对训练 step 数敏感时。",
  },
  {
    id: "vera",
    name: "VeRA",
    year: "2023",
    paper: "arXiv:2310.11454 · Kopiczko et al.",
    one: "B 和 A 各层共享一对随机冻结矩阵，只训 vector scaling。",
    formula: "ΔW = Λ_b·B·Λ_d·A · (B, A 冻结)",
    change: "全模型只剩两个 per-layer vector 可训。",
    benefit: "可训参数再降 10×，存储 adapter 极小（<1 MB）。",
    when: "千个客户每人一个 adapter、存储成本敏感时。",
  },
];

export default function SectionFamily() {
  const [id, setId] = useState("qlora");
  const v = FAMILY.find((f) => f.id === id)!;

  return (
    <SectionFrame num="03" label="LoRA 家族" background="bg-butter/30">
      <h2 className="font-display text-display-lg text-ink leading-tight mb-3">
        LoRA 出来五年，被人各种「+1」过。
      </h2>
      <p className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-3xl">
        每个变体都是在原公式上动一处。挑一个看看它改了什么、好处在哪、什么时候打开。
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {FAMILY.map((f) => (
          <button
            key={f.id}
            onClick={() => setId(f.id)}
            className={`px-4 py-2 rounded-full border-2 transition-all duration-250 ease-spring ${
              id === f.id
                ? "bg-ink text-butter border-ink shadow-stamp -translate-y-[2px]"
                : "bg-white text-ink border-ink/30 hover:border-ink"
            }`}
          >
            <span className="font-display font-bold">{f.name}</span>
            <span className={`ml-2 font-mono text-xs ${id === f.id ? "text-butter/70" : "text-ink-tertiary"}`}>· {f.year}</span>
          </button>
        ))}
      </div>

      <div className="card-stamp p-7 bg-white" key={id}>
        <div className="animate-enter-fade grid md:grid-cols-[1.2fr_1fr] gap-8">
          <div>
            <div className="font-mono text-xs text-ink-tertiary mb-2">{v.paper}</div>
            <h3 className="font-display text-3xl text-ink leading-tight mb-4">
              {v.name} · <span className="text-coral">{v.one}</span>
            </h3>

            <div className="my-5 p-4 bg-cream border-2 border-ink rounded-xl">
              <div className="eyebrow text-ink-tertiary mb-2">改动后的公式</div>
              <code className="font-mono text-base text-ink break-all">{v.formula}</code>
            </div>

            <div className="space-y-4 text-base leading-relaxed">
              <Row label="改了什么" value={v.change} />
              <Row label="带来什么" value={v.benefit} />
            </div>
          </div>

          <div className="bg-butter/40 border-2 border-ink rounded-2xl p-6">
            <div className="eyebrow text-ink-tertiary mb-3">什么时候打开</div>
            <p className="text-ink leading-relaxed text-base mb-6">{v.when}</p>

            <div className="pt-4 border-t border-ink/15">
              <div className="eyebrow text-ink-tertiary mb-3">与原 LoRA 的关系</div>
              <div className="font-mono text-xs text-ink-secondary leading-relaxed">
                {v.id === "qlora" && "正交叠加 — QLoRA 改 base 的存储格式，不影响 LoRA 公式本身。可与下面任一变体组合。"}
                {v.id === "dora" && "扩展 — 在 LoRA 输出后多加一步 norm + 缩放。结构改变但训练成本接近。"}
                {v.id === "rslora" && "替换 — 只改 scale 常数。所有支持 LoRA 的框架都能 2 行代码切换。"}
                {v.id === "lora+" && "优化器侧改进 — 不改公式，只改 lr 分组策略。PEFT 0.13 已内置。"}
                {v.id === "pissa" && "初始化策略 — 训练公式不变，只换 A、B 的起始值。可与其他变体组合。"}
                {v.id === "vera" && "极限压缩版 — 牺牲一些表达力，把可训参数推到极小。多 adapter 场景下显著省。"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-20 flex-shrink-0 font-mono text-[10px] text-ink-tertiary uppercase tracking-widest mt-1">{label}</div>
      <div className="flex-1 text-ink">{value}</div>
    </div>
  );
}
