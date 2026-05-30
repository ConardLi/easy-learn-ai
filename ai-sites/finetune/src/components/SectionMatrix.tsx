/**
 * Section 03 · 6 × 8 方法 / 维度对照矩阵
 *
 * 6 行方法 × 8 列维度，每格按"好/中/差"上 butter / cream / coral 色。
 * 交互：
 *   - 点击列头 → 全表只高亮那一列，把这 6 个方法在那一维度排个等级
 *   - 点击方法行 → 弹出该方法的一句话总结
 *
 * 跟 Hero 的 chip 单选不同，这里是"全表横向比较"，跟 deepspeed 的 3D 显存柱完全不同。
 *
 * 数据来源：
 *   - presenc.ai 2026/04 采纳度
 *   - effloow.com 2026 · localaimaster.com 2026/05 显存表
 *   - NVIDIA blog DoRA / arxiv:2402.09353 性能对比
 *   - agentfactory.panaversity.org DoRA rank 8 ≈ LoRA rank 32
 */
import React, { useState } from "react";

type Tone = "good" | "ok" | "bad";

type Cell = {
  text: string;
  tone: Tone;
};

const COLS = [
  { key: "params", label: "训练参数", sub: "% of base" },
  { key: "vram", label: "7B 显存", sub: "GB" },
  { key: "speed", label: "训练速度", sub: "× 全参" },
  { key: "quality", label: "质量保留", sub: "% of full" },
  { key: "infer", label: "推理延迟", sub: "vs base" },
  { key: "data", label: "数据需求", sub: "条数级别" },
  { key: "deploy", label: "部署灵活", sub: "adapter 切换" },
  { key: "forget", label: "遗忘风险", sub: "base 能力" },
];

type Row = {
  id: string;
  name: string;
  paren: string;
  cells: Cell[];
  oneLiner: string;
};

const ROWS: Row[] = [
  {
    id: "full",
    name: "Full FT",
    paren: "全参微调",
    cells: [
      { text: "100%", tone: "bad" },
      { text: "60-80", tone: "bad" },
      { text: "1×", tone: "ok" },
      { text: "100% 基线", tone: "good" },
      { text: "0", tone: "good" },
      { text: "10K+", tone: "bad" },
      { text: "整模型加载", tone: "bad" },
      { text: "高", tone: "bad" },
    ],
    oneLiner:
      "改所有 7B 个权重，效果上限最高，代价也最高。2026 只剩前沿实验室在用。",
  },
  {
    id: "freeze",
    name: "Freeze",
    paren: "冻结后几层",
    cells: [
      { text: "20-40%", tone: "ok" },
      { text: "30-45", tone: "ok" },
      { text: "1.3×", tone: "ok" },
      { text: "85-92%", tone: "ok" },
      { text: "0", tone: "good" },
      { text: "1K-10K", tone: "ok" },
      { text: "整模型", tone: "bad" },
      { text: "中", tone: "ok" },
    ],
    oneLiner: "土办法，砍掉前几层的梯度。省一半显存，质量也降一档。",
  },
  {
    id: "adapter",
    name: "Adapter",
    paren: "Houlsby 2019",
    cells: [
      { text: "0.5-3%", tone: "good" },
      { text: "14-18", tone: "good" },
      { text: "1.2×", tone: "ok" },
      { text: "92-95%", tone: "good" },
      { text: "+5-15%", tone: "bad" },
      { text: "500-5K", tone: "good" },
      { text: "可切换", tone: "good" },
      { text: "低", tone: "good" },
    ],
    oneLiner:
      "每层中间插小 bottleneck（down-up MLP），只训插件，推理多 5-15% 延迟。",
  },
  {
    id: "lora",
    name: "LoRA",
    paren: "Hu 2021 · 主流",
    cells: [
      { text: "0.1-1%", tone: "good" },
      { text: "10-16", tone: "good" },
      { text: "3×", tone: "good" },
      { text: "95-98%", tone: "good" },
      { text: "0 · 可 merge", tone: "good" },
      { text: "500-5K", tone: "good" },
      { text: "可切换", tone: "good" },
      { text: "低", tone: "good" },
    ],
    oneLiner: "在每层 attention 旁并联 BA，训完可 merge 回 W。2026 主流选择。",
  },
  {
    id: "qlora",
    name: "QLoRA",
    paren: "Dettmers 2023",
    cells: [
      { text: "0.1-1%", tone: "good" },
      { text: "5-8", tone: "good" },
      { text: "1.5×", tone: "ok" },
      { text: "93-97%", tone: "good" },
      { text: "0 · 可 merge", tone: "good" },
      { text: "500-5K", tone: "good" },
      { text: "可切换", tone: "good" },
      { text: "低", tone: "good" },
    ],
    oneLiner:
      "base 先 4-bit 量化再挂 LoRA。70B 模型一张 80G A100 就能 fine-tune。",
  },
  {
    id: "dora",
    name: "DoRA",
    paren: "Liu ICML 2024",
    cells: [
      { text: "0.1-1%+", tone: "good" },
      { text: "16-20", tone: "good" },
      { text: "0.8×", tone: "ok" },
      { text: "98-100%", tone: "good" },
      { text: "0 · 可 merge", tone: "good" },
      { text: "500-5K", tone: "good" },
      { text: "可切换", tone: "good" },
      { text: "低", tone: "good" },
    ],
    oneLiner:
      "把 ΔW 拆方向 + 长度。rank=8 就能赶上 LoRA rank=32，慢一点但质量天花板更高。",
  },
];

const TONE_STYLE: Record<Tone, string> = {
  good: "bg-butter text-ink",
  ok: "bg-cream text-ink/70",
  bad: "bg-coral/85 text-cream",
};

const SectionMatrix: React.FC = () => {
  const [activeCol, setActiveCol] = useState<number | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>("lora");

  const active = ROWS.find((r) => r.id === activeRow);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">side-by-side</span>
        </div>

        <div className="mb-8 lg:mb-10 max-w-3xl">
          <h2 className="font-display text-display-lg text-ink mb-4 leading-tight">
            6 方法 × 8 维度，<br className="lg:hidden" />
            <span className="relative inline-block">
              <span
                className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
                aria-hidden
              />
              <span className="relative z-10">摆在一张表上同看</span>
            </span>。
          </h2>
          <p className="text-[15px] lg:text-[16px] text-ink/70 max-w-2xl leading-relaxed">
            黄 = 好 / 米 = 中 / 红 = 差。点列头按那一维度排队，点方法名看一句话总结。
          </p>
        </div>

        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
          {/* 表格 */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b-2 border-ink">
                  <th className="text-left p-3 lg:p-4 bg-ink/5 sticky left-0 z-10">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                      方法
                    </div>
                  </th>
                  {COLS.map((c, i) => {
                    const on = activeCol === i;
                    return (
                      <th
                        key={c.key}
                        onClick={() => setActiveCol(on ? null : i)}
                        className={[
                          "text-left p-3 lg:p-4 cursor-pointer transition-all duration-250 select-none",
                          on
                            ? "bg-ink text-cream"
                            : "bg-ink/5 hover:bg-cream",
                        ].join(" ")}
                      >
                        <div className={`font-display text-[13px] font-bold leading-tight ${on ? "text-cream" : "text-ink"}`}>
                          {c.label}
                        </div>
                        <div className={`font-mono text-[9.5px] mt-0.5 ${on ? "text-cream/65" : "text-ink/45"}`}>
                          {c.sub}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => {
                  const rowOn = activeRow === r.id;
                  return (
                    <tr
                      key={r.id}
                      onClick={() => setActiveRow(rowOn ? null : r.id)}
                      className={[
                        "border-b border-ink/10 last:border-0 cursor-pointer transition-colors duration-250",
                        rowOn ? "bg-butter/20" : "hover:bg-cream/40",
                      ].join(" ")}
                    >
                      <td className="p-3 lg:p-4 sticky left-0 bg-inherit z-[5]">
                        <div className="font-display text-[15px] font-bold text-ink leading-tight">
                          {r.name}
                        </div>
                        <div className="font-mono text-[10px] text-ink/45 mt-0.5">
                          {r.paren}
                        </div>
                      </td>
                      {r.cells.map((cell, j) => {
                        const colOn = activeCol === j;
                        return (
                          <td key={j} className="p-2 lg:p-3">
                            <div
                              className={[
                                "px-2.5 py-1.5 rounded-md border-2 border-ink/15 font-mono text-[11.5px] font-bold tabular-nums text-center transition-all duration-250",
                                TONE_STYLE[cell.tone],
                                colOn ? "border-ink shadow-[2px_2px_0_0_#241C15]" : "",
                                !colOn && activeCol !== null ? "opacity-40" : "",
                              ].join(" ")}
                            >
                              {cell.text}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 行高亮：一句话总结 */}
          {active && (
            <div className="border-t-2 border-ink/10 px-5 lg:px-7 py-5 bg-butter/15 animate-enter-fade">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="font-display text-[18px] font-bold text-ink">
                  {active.name}
                </span>
                <span className="font-mono text-[11px] text-ink/55">
                  {active.paren}
                </span>
              </div>
              <p className="mt-1.5 text-[14px] lg:text-[15px] text-ink/80 leading-relaxed max-w-3xl">
                {active.oneLiner}
              </p>
            </div>
          )}
        </div>

        {/* 看完要 take away 的话 */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          <Insight
            num="01"
            text="只看「质量保留」这一列，LoRA 系全在 93% 以上，跟全参的差距比想象小得多。"
          />
          <Insight
            num="02"
            text="只看「7B 显存」，QLoRA 比 Full FT 省 10×，是消费级 GPU 唯一靠谱选项。"
          />
          <Insight
            num="03"
            text="只看「推理延迟」，Adapter 是唯一会拖慢线上的；LoRA 系训完都能 merge 回去。"
          />
        </div>
      </div>
    </section>
  );
};

const Insight: React.FC<{ num: string; text: string }> = ({ num, text }) => (
  <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral font-bold mb-2">
      take-away {num}
    </div>
    <p className="text-[13.5px] text-ink/85 leading-snug">{text}</p>
  </div>
);

export default SectionMatrix;
