/**
 * Section 06 · PEFT 演进单步 trace
 *
 * 2019 Adapter → 2021 LoRA → 2023 QLoRA → 2024 DoRA → 2024 rsLoRA → 2024 VeRA/PiSSA/GaLore → 2026 现状
 *
 * 单步 next/prev/reset 控制（不是 autoplay），每步左侧 ASCII 时间线右移一格，
 * 右侧详情卡更新（论文 + 核心思想 + 解决了什么 + 2026 状态）。
 *
 * 跟前面 5 个 section 全部不同形式（chip / slider / 表格 / 拼装 / SVG）。
 *
 * 数据来源（每张卡都标 arXiv）：
 *   - Adapter: Houlsby et al. 2019 arXiv:1902.00751
 *   - LoRA: Hu et al. 2021 arXiv:2106.09685
 *   - Prefix Tuning: Li & Liang 2021 arXiv:2101.00190（提一句）
 *   - QLoRA: Dettmers et al. 2023 arXiv:2305.14314
 *   - rsLoRA: Kalajdzievski 2023 arXiv:2312.03732
 *   - DoRA: Liu et al. ICML 2024 arXiv:2402.09353
 *   - PiSSA: Meng et al. 2024 arXiv:2404.02948
 *   - GaLore: Zhao et al. ICML 2024 arXiv:2403.03507
 *   - VeRA: Kopiczko et al. 2023 arXiv:2310.11454
 *   - 2026 状态：presenc.ai 2026/04 toolchain report
 */
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

const STEPS = [
  {
    year: "2019",
    label: "Adapter",
    paper: "Houlsby et al. · arXiv:1902.00751",
    idea: "每层 transformer 中间插一个小 bottleneck（down-proj→nonlin→up-proj），只训这个插件，base 冻住。",
    solved: "第一次证明：训 3% 参数能赶上全参 95% 质量。",
    today:
      "推理多 5-15% 延迟，2026 在多任务系统里仍有人用，单任务被 LoRA 完整替代。",
    color: "bg-cream",
  },
  {
    year: "2021",
    label: "LoRA",
    paper: "Hu et al. · arXiv:2106.09685",
    idea: "ΔW = B·A（B 是 d×r，A 是 r×d）并联在每层 W 旁边。训完可以 merge 回 W，推理零延迟。",
    solved: "彻底解决 adapter 的推理延迟问题。0.1% 参数就够，r=8 是甜点。",
    today:
      "2026 PEFT 主流，HuggingFace PEFT 默认实现，Unsloth/Axolotl/TRL/LLaMA-Factory 全部一等公民。",
    color: "bg-butter",
  },
  {
    year: "2023",
    label: "QLoRA",
    paper: "Dettmers et al. · arXiv:2305.14314",
    idea:
      "base 模型先压成 NF4 4-bit（信息论最优的正态分布量化）+ LoRA adapter 仍 16-bit + paged optimizer。",
    solved:
      "单张 A100 80G 能 fine-tune Llama-65B。7B 模型 QLoRA 6-8 GB 显存，RTX 4090 24G 绰绰有余。",
    today:
      "消费级 GPU 训练首选。Llama-3.3-70B 单张 A100 ~30 小时跑完 5K 条。质量约 93-97% 对齐 full LoRA。",
    color: "bg-butter",
  },
  {
    year: "2023",
    label: "rsLoRA",
    paper: "Kalajdzievski · arXiv:2312.03732",
    idea: "把 LoRA 的缩放因子从 α/r 改成 α/√r，让高 rank（r ≥ 32）时梯度不爆。",
    solved: "原 LoRA 在 r 增大时表现饱和、甚至变差，rsLoRA 修了这个 bug。",
    today: "在 PEFT 包里一个开关：use_rslora=True。中大型项目偏爱开它。",
    color: "bg-butter-soft",
  },
  {
    year: "2024",
    label: "DoRA",
    paper: "Liu et al. ICML Oral · arXiv:2402.09353",
    idea: "把 ΔW 拆成方向 d 和长度 m 两个分量：方向用 LoRA 训，长度单独一个标量。",
    solved:
      "rank=8 的 DoRA 能赶上 rank=32 的 LoRA。质量天花板提到 98-100% 全参。",
    today:
      "PEFT 0.13+ 一个开关 use_dora=True。训慢 20-44%，但小 rank 项目质量贵 8 倍胜过 LoRA。占比 ~7% 上升中。",
    color: "bg-butter-soft",
  },
  {
    year: "2024",
    label: "VeRA / PiSSA / GaLore",
    paper: "并列三家",
    idea:
      "VeRA：A、B 用全局共享的随机矩阵，只训每层缩放向量（再省 100×）。PiSSA：用 W 的 top-r 奇异向量初始化 BA，收敛更快。GaLore：在梯度空间投影到低秩，全权重训但显存比 LoRA 还省。",
    solved:
      "VeRA 把 adapter 文件压到 KB 级；PiSSA 比 LoRA 收敛快 2-3 倍；GaLore 让全参训练上消费级 GPU。",
    today:
      "GaLore 在 pretrain 阶段抬头；VeRA/PiSSA 适合特定任务，但都没动 LoRA 的中位置。",
    color: "bg-butter-soft",
  },
  {
    year: "2026",
    label: "现状",
    paper: "presenc.ai toolchain report 2026/04",
    idea:
      "LoRA + QLoRA 占新微调项目 62%。Full FT < 5%（只剩前沿实验室）。DoRA 7% 上升中。GRPO/RLVR 是新的对齐路线。",
    solved:
      "「先 SFT 再 DPO/GRPO，全程用 LoRA/QLoRA」=2026 标配套路。",
    today:
      "HuggingFace PEFT 是事实标准。Unsloth 单卡速度+VRAM 王。Axolotl 多卡 YAML 王。TRL 是 RLHF/GRPO 上游。",
    color: "bg-coral",
  },
];

const SectionTimeline: React.FC = () => {
  const [cursor, setCursor] = useState(1); // 默认停在 LoRA

  const step = STEPS[cursor];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">timeline</span>
        </div>

        <div className="mb-10 lg:mb-12 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            从 2019 一路<br className="lg:hidden" />
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">走到 2026</span>
            </span>。
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            7 年里，PEFT 从一个学术 trick 变成工业默认。点 next 一步步看每代解决了上一代什么问题。
          </p>
        </div>

        {/* 时间轴节点行 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 mb-6">
          <div className="relative">
            {/* 横线 */}
            <div className="absolute left-3 right-3 top-[18px] h-0.5 bg-ink/20" />
            <div
              className="absolute left-3 top-[18px] h-0.5 bg-ink transition-all duration-500 ease-spring"
              style={{ width: `calc(${(cursor / (STEPS.length - 1)) * 100}% - 6px)` }}
            />

            {/* 节点 */}
            <div className="relative grid grid-cols-7 gap-1">
              {STEPS.map((s, i) => {
                const reached = i <= cursor;
                const active = i === cursor;
                return (
                  <button
                    key={i}
                    onClick={() => setCursor(i)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <span
                      className={[
                        "w-9 h-9 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ease-spring",
                        active
                          ? "bg-ink text-cream scale-110 shadow-[3px_3px_0_0_#E07A5F]"
                          : reached
                            ? "bg-butter text-ink"
                            : "bg-white text-ink/40",
                      ].join(" ")}
                    >
                      {i + 1}
                    </span>
                    <div className={[
                      "text-center transition-opacity duration-300",
                      reached ? "opacity-100" : "opacity-50",
                    ].join(" ")}>
                      <div className={`font-mono text-[10.5px] font-bold ${active ? "text-coral" : "text-ink/60"}`}>
                        {s.year}
                      </div>
                      <div className="font-display text-[11px] lg:text-[12px] font-bold text-ink leading-tight mt-0.5">
                        {s.label}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 控制条 */}
          <div className="flex items-center justify-between mt-7 pt-5 border-t border-ink/10">
            <button
              onClick={() => setCursor(Math.max(0, cursor - 1))}
              disabled={cursor === 0}
              className={[
                "btn-stamp bg-white text-ink",
                cursor === 0 ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
              prev
            </button>
            <button
              onClick={() => setCursor(1)}
              className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/55 hover:text-ink flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
              reset
            </button>
            <button
              onClick={() => setCursor(Math.min(STEPS.length - 1, cursor + 1))}
              disabled={cursor === STEPS.length - 1}
              className={[
                "btn-stamp bg-ink text-cream",
                cursor === STEPS.length - 1 ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
            >
              next
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 当前 step 的详情卡 */}
        <div
          key={cursor}
          className={`border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8 animate-enter-up ${step.color}`}
        >
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55 mb-1">
                {step.year}
              </div>
              <div className="font-display text-display-lg text-ink leading-tight mb-2">
                {step.label}
              </div>
              <div className="font-mono text-[11px] text-ink/65 leading-snug">
                {step.paper}
              </div>
            </div>
            <div className="lg:col-span-8 space-y-4">
              <Block label="核心思想" body={step.idea} />
              <Block label="解决了上一代什么" body={step.solved} />
              <Block label="2026 状态" body={step.today} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Block: React.FC<{ label: string; body: string }> = ({ label, body }) => (
  <div>
    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 font-semibold mb-1.5">
      {label}
    </div>
    <p className="text-[14.5px] text-ink/85 leading-relaxed">{body}</p>
  </div>
);

export default SectionTimeline;
