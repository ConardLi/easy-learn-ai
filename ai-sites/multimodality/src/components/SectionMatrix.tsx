/**
 * Section 04 · 2026 谁能听、谁能看、谁能拍
 *
 * 7 个主流模型 × 6 种模态能力的矩阵。
 * 主交互：(1) 点击列头切换排序高亮 (2) 点击某模型行展开细节卡
 *
 * 跟其他站完全不一样：没人做过模型 × 模态矩阵。
 */
import React, { useState } from "react";
import { Check, X, Triangle } from "lucide-react";

type Capability = "native" | "yes" | "partial" | "no";

type Row = {
  id: string;
  name: string;
  vendor: string;
  style: "native" | "late" | "contrast";
  released: string;
  caps: {
    textIn: Capability;
    imgIn: Capability;
    videoIn: Capability;
    audioIn: Capability;
    imgOut: Capability;
    audioOut: Capability;
  };
  highlight?: string;
  context: string;
  source: string;
};

const COLS = [
  { key: "textIn", short: "文 in", long: "文字输入" },
  { key: "imgIn", short: "图 in", long: "图像输入" },
  { key: "videoIn", short: "视频 in", long: "视频输入" },
  { key: "audioIn", short: "音频 in", long: "音频输入" },
  { key: "imgOut", short: "图 out", long: "图像输出" },
  { key: "audioOut", short: "音 out", long: "音频输出" },
] as const;

const ROWS: Row[] = [
  {
    id: "gemini-25-pro",
    name: "Gemini 2.5 Pro",
    vendor: "Google",
    style: "native",
    released: "2025/03",
    caps: { textIn: "native", imgIn: "native", videoIn: "native", audioIn: "native", imgOut: "yes", audioOut: "yes" },
    highlight: "唯一一个 4 输入全 native 的旗舰，视频/音频不用先转文字",
    context: "2M token，6/6 能力齐",
    source: "Google AI blog 2025-03 · Gemini 2.5 Pro release",
  },
  {
    id: "gemini-35-flash",
    name: "Gemini 3.5 Flash",
    vendor: "Google",
    style: "native",
    released: "2026/05",
    caps: { textIn: "native", imgIn: "native", videoIn: "native", audioIn: "native", imgOut: "yes", audioOut: "yes" },
    highlight: "MMMU-Pro 84%，截至 2026/05 多模态最高分",
    context: "1M token · 280+ tok/s 速度",
    source: "Memeburn 2026-05-19 Gemini 3.5 Flash 发布",
  },
  {
    id: "gpt5",
    name: "GPT-5.5",
    vendor: "OpenAI",
    style: "late",
    released: "2026/02",
    caps: { textIn: "native", imgIn: "native", videoIn: "no", audioIn: "partial", imgOut: "partial", audioOut: "partial" },
    highlight: "文+图 in 是 native；视频要走帧抽取 pipeline；音/图 out 走独立模型",
    context: "Intelligence Index 60 · 但视频/音频要拼模型",
    source: "CherCode 2026 GPT-5.5 vs Gemini 2.5 Pro",
  },
  {
    id: "claude-47",
    name: "Claude Opus 4.7",
    vendor: "Anthropic",
    style: "late",
    released: "2026/04",
    caps: { textIn: "native", imgIn: "native", videoIn: "no", audioIn: "no", imgOut: "no", audioOut: "no" },
    highlight: "只吃文+图。视频/音频要外接工具，跟 Gemini 路线分叉",
    context: "纯文本/编码强，多模态最窄",
    source: "PADISO Opus 4.7 vs Gemini 2.5 Pro 2026",
  },
  {
    id: "llama4-maverick",
    name: "Llama 4 Maverick",
    vendor: "Meta",
    style: "native",
    released: "2025/04",
    caps: { textIn: "native", imgIn: "native", videoIn: "partial", audioIn: "no", imgOut: "no", audioOut: "no" },
    highlight: "early fusion 训出来，但视频/音频 out 还没开放。17B active / 400B 总参 (MoE)",
    context: "开源、可商用、native 路线",
    source: "Meta AI blog 2025-04 Llama 4 herd",
  },
  {
    id: "qwen3-vl",
    name: "Qwen3-VL 235B-A22B",
    vendor: "Alibaba",
    style: "native",
    released: "2025/09",
    caps: { textIn: "native", imgIn: "native", videoIn: "native", audioIn: "no", imgOut: "no", audioOut: "no" },
    highlight: "原生 256K 上下文 + 小时级视频理解。开源 MoE 里最强",
    context: "MMMU/MathVista 跟 Gemini-2.5-Pro / GPT-5 一档",
    source: "Qwen3-VL 技术报告 ResearchGate 398026379",
  },
  {
    id: "chameleon",
    name: "Chameleon 34B",
    vendor: "Meta",
    style: "native",
    released: "2024/05",
    caps: { textIn: "native", imgIn: "native", videoIn: "no", audioIn: "no", imgOut: "yes", audioOut: "no" },
    highlight: "第一个 fully token-based early-fusion 开源模型 · 4.4T 多模态 token 训",
    context: "学术原型，能反向生图",
    source: "Chameleon arXiv:2405.09818 · Meta 2024-05",
  },
  {
    id: "pixtral",
    name: "Pixtral 12B",
    vendor: "Mistral",
    style: "late",
    released: "2024/09",
    caps: { textIn: "native", imgIn: "native", videoIn: "no", audioIn: "no", imgOut: "no", audioOut: "no" },
    highlight: "12B 开源 · 原生分辨率输图 · MM-IF-Eval 强",
    context: "Apache 2.0 · 128K 上下文",
    source: "Pixtral arXiv:2410.07073 · BentoML 2026 VLM 综述",
  },
];

const CAP_VIZ: Record<Capability, { bg: string; fg: string; label: string; icon: React.ReactNode }> = {
  native: { bg: "#1B4B5A", fg: "#FBEFE3", label: "原生", icon: <Check className="w-3.5 h-3.5" strokeWidth={3} /> },
  yes: { bg: "#F4D35E", fg: "#241C15", label: "支持", icon: <Check className="w-3.5 h-3.5" strokeWidth={2.8} /> },
  partial: { bg: "#E07A5F", fg: "#FBEFE3", label: "拼接", icon: <Triangle className="w-3 h-3" strokeWidth={2.8} /> },
  no: { bg: "#FBEFE3", fg: "#88837C", label: "不行", icon: <X className="w-3 h-3" strokeWidth={2.5} /> },
};

const STYLE_BADGE: Record<Row["style"], { bg: string; label: string }> = {
  native: { bg: "bg-teal text-cream", label: "原生" },
  late: { bg: "bg-coral text-cream", label: "后融合" },
  contrast: { bg: "bg-pop text-white", label: "对比塔" },
};

const SectionMatrix: React.FC = () => {
  const [activeRow, setActiveRow] = useState<string | null>(ROWS[0].id);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);

  const active = ROWS.find((r) => r.id === activeRow);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">2026 lineup</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5">
              2026 年谁能听、
              <br />
              谁能看、谁能拍
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                到 2026 年中，主流大模型一半已经原生多模态（图/视频/音同一个模型吃），另一半还在拼接外接模型。
              </p>
              <p>
                Gemini 那一脉走得最齐 —— 文/图/视频/音 4 路全 native。GPT 和 Claude 还是文+图为主，视频音频靠外接 pipeline。
              </p>
              <p>
                绿色「原生」 = 从训练就一起来。黄「支持」 = 输出能力但走分拆。橙「拼接」 = 调外部模型。空白「不行」 = 不支持。
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            {/* legend */}
            <div className="flex flex-wrap gap-2 mb-3">
              {(["native", "yes", "partial", "no"] as Capability[]).map((c) => {
                const v = CAP_VIZ[c];
                return (
                  <div key={c} className="flex items-center gap-1.5 px-2.5 py-1 bg-white border-2 border-ink rounded-full">
                    <span
                      className="flex items-center justify-center w-4 h-4 rounded-sm border border-ink"
                      style={{ backgroundColor: v.bg, color: v.fg }}
                    >
                      {v.icon}
                    </span>
                    <span className="font-mono text-[10px] text-ink/75 font-semibold">{v.label}</span>
                  </div>
                );
              })}
            </div>

            {/* matrix table */}
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-cream border-b-2 border-ink">
                      <th className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 font-semibold">
                        模型
                      </th>
                      {COLS.map((c) => (
                        <th
                          key={c.key}
                          onMouseEnter={() => setHoveredCol(c.key)}
                          onMouseLeave={() => setHoveredCol(null)}
                          className={[
                            "px-2 py-3 font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-center transition-colors duration-200 cursor-default",
                            hoveredCol === c.key ? "bg-butter text-ink" : "text-ink/55",
                          ].join(" ")}
                        >
                          {c.short}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map((row) => {
                      const on = row.id === activeRow;
                      return (
                        <tr
                          key={row.id}
                          onClick={() => setActiveRow(row.id)}
                          className={[
                            "border-b border-ink/10 last:border-b-0 cursor-pointer transition-colors duration-200",
                            on ? "bg-butter-tint" : "hover:bg-cream",
                          ].join(" ")}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className={["px-1.5 py-0.5 rounded-md border border-ink text-[9px] font-mono uppercase font-bold", STYLE_BADGE[row.style].bg].join(" ")}>
                                {STYLE_BADGE[row.style].label}
                              </div>
                              <div>
                                <div className="font-display text-[13px] font-bold text-ink leading-tight">{row.name}</div>
                                <div className="font-mono text-[10px] text-ink/45">{row.vendor} · {row.released}</div>
                              </div>
                            </div>
                          </td>
                          {COLS.map((c) => {
                            const cap = row.caps[c.key as keyof typeof row.caps] as Capability;
                            const v = CAP_VIZ[cap];
                            const colHover = hoveredCol === c.key;
                            return (
                              <td key={c.key} className="px-2 py-3 text-center">
                                <div
                                  className={[
                                    "inline-flex items-center justify-center w-8 h-8 rounded-md border-2 border-ink transition-all duration-200",
                                    colHover ? "scale-110 shadow-[2px_2px_0_0_#241C15]" : "",
                                  ].join(" ")}
                                  style={{ backgroundColor: v.bg, color: v.fg }}
                                  title={`${c.long} · ${v.label}`}
                                >
                                  {v.icon}
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
            </div>

            {/* active row detail card */}
            {active && (
              <div
                key={`row-${active.id}`}
                className="mt-4 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6 animate-enter-fade"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-display text-[22px] font-bold text-butter">{active.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/55">
                    {active.vendor} · {active.released}
                  </span>
                </div>
                <p className="text-[14px] text-cream/85 leading-relaxed mb-2">{active.highlight}</p>
                <div className="font-mono text-[11px] text-butter/85 mb-3">{active.context}</div>
                <div className="font-mono text-[10px] text-cream/45 pt-3 border-t border-cream/15">
                  来源 · {active.source}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionMatrix;
