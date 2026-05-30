/**
 * Section 01 · Hero
 *
 * 进站第一秒看到「多模态是什么？」+ 一句话定义 + 白话补充。
 * 右边主交互卡：选一张图（4 张预设）+ 拖 patch 大小 → 实时看图怎么被切成 token grid + token 数。
 *
 * 跟 quantization Hero（slider 调 bits）不一样：这边主交互是「2D 网格切分」+ 图选择。
 */
import React, { useState, useMemo } from "react";
import { ArrowDown } from "lucide-react";

/* 4 张预设"图"，用 SVG 当输入 —— 每张是抽象色块构图（蛋糕图标 / 风景 / 表格截图 / 自拍照） */
type Preset = {
  id: string;
  label: string;
  caption: string;
  /** 渲染一张 224×224 的 SVG，等比映射到 canvas 内 */
  render: (size: number) => React.ReactNode;
};

const PRESETS: Preset[] = [
  {
    id: "cake",
    label: "生日蛋糕",
    caption: "一张照片",
    render: (s) => (
      <g>
        <rect x="0" y="0" width={s} height={s} fill="#FBE891" />
        <rect x={s * 0.18} y={s * 0.55} width={s * 0.64} height={s * 0.32} fill="#E07A5F" stroke="#241C15" strokeWidth="1.2" />
        <rect x={s * 0.24} y={s * 0.42} width={s * 0.52} height={s * 0.14} fill="#FBEFE3" stroke="#241C15" strokeWidth="1" />
        <rect x={s * 0.3} y={s * 0.32} width={s * 0.4} height={s * 0.12} fill="#FF4D74" stroke="#241C15" strokeWidth="1" />
        {/* 蜡烛 */}
        <line x1={s * 0.42} y1={s * 0.22} x2={s * 0.42} y2={s * 0.32} stroke="#241C15" strokeWidth="2" />
        <line x1={s * 0.58} y1={s * 0.22} x2={s * 0.58} y2={s * 0.32} stroke="#241C15" strokeWidth="2" />
        <circle cx={s * 0.42} cy={s * 0.2} r={s * 0.025} fill="#F4D35E" stroke="#241C15" strokeWidth="0.8" />
        <circle cx={s * 0.58} cy={s * 0.2} r={s * 0.025} fill="#F4D35E" stroke="#241C15" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: "landscape",
    label: "山水风景",
    caption: "一张风景",
    render: (s) => (
      <g>
        <rect x="0" y="0" width={s} height={s * 0.55} fill="#FBEFE3" />
        <rect x="0" y={s * 0.55} width={s} height={s * 0.45} fill="#1B4B5A" />
        {/* 太阳 */}
        <circle cx={s * 0.75} cy={s * 0.22} r={s * 0.08} fill="#F4D35E" stroke="#241C15" strokeWidth="1.2" />
        {/* 山 */}
        <polygon points={`0,${s * 0.55} ${s * 0.25},${s * 0.3} ${s * 0.45},${s * 0.55}`} fill="#241C15" />
        <polygon points={`${s * 0.35},${s * 0.55} ${s * 0.6},${s * 0.18} ${s * 0.85},${s * 0.55}`} fill="#5A5147" />
        {/* 水反光 */}
        <line x1="0" y1={s * 0.7} x2={s} y2={s * 0.7} stroke="#FBEFE3" strokeWidth="1.5" opacity="0.4" />
        <line x1={s * 0.2} y1={s * 0.82} x2={s * 0.55} y2={s * 0.82} stroke="#FBEFE3" strokeWidth="1.5" opacity="0.4" />
      </g>
    ),
  },
  {
    id: "doc",
    label: "Excel 表格",
    caption: "一张截图",
    render: (s) => {
      const cells = 6;
      const cw = s / cells;
      return (
        <g>
          <rect x="0" y="0" width={s} height={s} fill="#FBEFE3" />
          {Array.from({ length: cells + 1 }).map((_, i) => (
            <line key={`r${i}`} x1="0" y1={i * cw} x2={s} y2={i * cw} stroke="#241C15" strokeWidth="0.8" />
          ))}
          {Array.from({ length: cells + 1 }).map((_, i) => (
            <line key={`c${i}`} x1={i * cw} y1="0" x2={i * cw} y2={s} stroke="#241C15" strokeWidth="0.8" />
          ))}
          <rect x="0" y="0" width={s} height={cw} fill="#241C15" />
          <text x={s * 0.5} y={cw * 0.65} textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize={cw * 0.4} fill="#F4D35E" fontWeight="700">
            REVENUE
          </text>
          {/* 几个柱状数字 */}
          <rect x={cw * 0.2} y={cw * 1.2} width={cw * 0.6} height={cw * 0.6} fill="#E07A5F" />
          <rect x={cw * 1.2} y={cw * 1.4} width={cw * 0.6} height={cw * 0.4} fill="#F4D35E" />
          <rect x={cw * 2.2} y={cw * 1.1} width={cw * 0.6} height={cw * 0.7} fill="#E07A5F" />
          <rect x={cw * 3.2} y={cw * 1.5} width={cw * 0.6} height={cw * 0.3} fill="#F4D35E" />
        </g>
      );
    },
  },
  {
    id: "selfie",
    label: "人像自拍",
    caption: "一张自拍",
    render: (s) => (
      <g>
        <rect x="0" y="0" width={s} height={s} fill="#FBE891" />
        {/* 头 */}
        <circle cx={s * 0.5} cy={s * 0.42} r={s * 0.22} fill="#FBEFE3" stroke="#241C15" strokeWidth="1.4" />
        {/* 眼 */}
        <circle cx={s * 0.42} cy={s * 0.4} r={s * 0.02} fill="#241C15" />
        <circle cx={s * 0.58} cy={s * 0.4} r={s * 0.02} fill="#241C15" />
        {/* 笑 */}
        <path d={`M ${s * 0.42} ${s * 0.5} Q ${s * 0.5} ${s * 0.56} ${s * 0.58} ${s * 0.5}`} stroke="#241C15" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* 身体 */}
        <path d={`M ${s * 0.25} ${s} L ${s * 0.32} ${s * 0.7} Q ${s * 0.5} ${s * 0.62} ${s * 0.68} ${s * 0.7} L ${s * 0.75} ${s}`} fill="#E07A5F" stroke="#241C15" strokeWidth="1.4" />
        {/* 头发 */}
        <path d={`M ${s * 0.3} ${s * 0.35} Q ${s * 0.5} ${s * 0.18} ${s * 0.7} ${s * 0.35} L ${s * 0.68} ${s * 0.28} L ${s * 0.5} ${s * 0.22} L ${s * 0.32} ${s * 0.3} Z`} fill="#241C15" />
      </g>
    ),
  },
];

const PATCH_OPTIONS = [
  { px: 56, label: "56px", grid: 4 },
  { px: 32, label: "32px", grid: 7 },
  { px: 16, label: "16px", grid: 14 },
  { px: 8, label: "8px", grid: 28 },
];

const SectionHero: React.FC = () => {
  const [presetId, setPresetId] = useState("cake");
  const [patchIdx, setPatchIdx] = useState(2); // 默认 16px → 14×14

  const preset = PRESETS.find((p) => p.id === presetId) ?? PRESETS[0];
  const patch = PATCH_OPTIONS[patchIdx];
  const tokens = patch.grid * patch.grid;

  /* canvas 在 SVG 里固定 224 */
  const CANVAS = 224;
  const cellPx = CANVAS / patch.grid;

  /* 渲染每个 patch 单元，添加进入动画的 stagger delay */
  const cells = useMemo(() => {
    const arr: { x: number; y: number; i: number }[] = [];
    for (let r = 0; r < patch.grid; r++) {
      for (let c = 0; c < patch.grid; c++) {
        arr.push({ x: c * cellPx, y: r * cellPx, i: r * patch.grid + c });
      }
    }
    return arr;
  }, [patch.grid, cellPx]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Multimodality · 多模态
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              多模态
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
                  让同一个模型既能看图、听声音、看视频，又能用文字、图、语音回答。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                早些年图像、语音、文字各有各的模型。一个模型只会一件事。
              </p>
              <p>
                现在做法变了：图、音、视频先被切成一串数字（token），跟文字一起喂进同一个 transformer。
              </p>
              <p>
                一张 224×224 的照片，在 ViT-B/16 里就是 196 个 token —— 跟一段 50 字的中文消息一样长。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块卡，挑张图、拖一下 patch 大小，看它怎么被切成方块 token。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 6 章 · ~10 分钟
              </div>
            </div>
          </div>

          {/* 右：图 → patch 网格可视化 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 上排：图选择 chip */}
              <div className="flex items-baseline justify-between mb-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① pick an image
                </div>
                <div className="font-mono text-[10px] text-ink/45">{preset.caption} · 224×224</div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-6">
                {PRESETS.map((p) => {
                  const on = p.id === presetId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPresetId(p.id)}
                      className={[
                        "py-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
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

              {/* patch size slider（用 stamp pill 离散切，比 slider 清晰） */}
              <div className="flex items-baseline justify-between mb-2.5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② patch size
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[26px] font-bold text-ink leading-none tabular-nums">
                    {patch.grid}×{patch.grid}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">grid</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-5">
                {PATCH_OPTIONS.map((opt, idx) => {
                  const on = idx === patchIdx;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setPatchIdx(idx)}
                      className={[
                        "py-2 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                        on
                          ? "bg-coral text-cream shadow-[3px_3px_0_0_#241C15]"
                          : "bg-white text-ink/65 hover:bg-butter-tint",
                      ].join(" ")}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              {/* canvas: 图 + patch grid */}
              <div className="relative mb-5">
                <div className="relative bg-cream border-2 border-ink rounded-xl overflow-hidden aspect-square">
                  <svg
                    viewBox={`0 0 ${CANVAS} ${CANVAS}`}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* 底图 */}
                    {preset.render(CANVAS)}
                    {/* 网格切割线 */}
                    <g key={`grid-${patchIdx}`} className="animate-enter-fade">
                      {Array.from({ length: patch.grid + 1 }).map((_, i) => (
                        <g key={i}>
                          <line
                            x1={i * cellPx}
                            y1="0"
                            x2={i * cellPx}
                            y2={CANVAS}
                            stroke="#241C15"
                            strokeWidth={patch.grid > 20 ? 0.4 : 0.7}
                            opacity="0.85"
                          />
                          <line
                            x1="0"
                            y1={i * cellPx}
                            x2={CANVAS}
                            y2={i * cellPx}
                            stroke="#241C15"
                            strokeWidth={patch.grid > 20 ? 0.4 : 0.7}
                            opacity="0.85"
                          />
                        </g>
                      ))}
                      {/* 给 4 个角的 patch 加 ID 标注 */}
                      {patch.grid <= 14 && (
                        <g
                          fontFamily="Geist Mono, monospace"
                          fontSize={Math.max(4.5, cellPx * 0.25)}
                          fill="#FBEFE3"
                          fontWeight="700"
                          opacity="0.7"
                        >
                          <text x={2} y={cellPx * 0.45}>0</text>
                          <text x={(patch.grid - 1) * cellPx + 2} y={cellPx * 0.45}>{patch.grid - 1}</text>
                          <text x={2} y={(patch.grid - 1) * cellPx + cellPx * 0.45}>
                            {(patch.grid - 1) * patch.grid}
                          </text>
                          <text x={(patch.grid - 1) * cellPx + 2} y={(patch.grid - 1) * cellPx + cellPx * 0.45}>
                            {patch.grid * patch.grid - 1}
                          </text>
                        </g>
                      )}
                    </g>
                  </svg>
                </div>
              </div>

              {/* 底部：token 数 + 实际算账 */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-ink/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                    每块 patch
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[26px] font-bold text-ink tabular-nums">
                      {patch.px}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">px²</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                    切出 token
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span
                      key={tokens}
                      className="font-display text-[26px] font-bold text-coral tabular-nums animate-enter-pop"
                    >
                      {tokens}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">个</span>
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                    相当于
                  </div>
                  <div className="font-mono text-[12px] text-ink font-semibold leading-tight">
                    {tokens <= 50
                      ? "1 条短消息"
                      : tokens <= 200
                      ? "1 段对话"
                      : tokens <= 600
                      ? "1 段中文邮件"
                      : "1 篇短博客"}
                  </div>
                  <div className="font-mono text-[10px] text-ink/45 mt-0.5">
                    ≈ {Math.round(tokens * 0.6)} 个汉字
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：ViT「An Image is Worth 16×16 Words」arXiv:2010.11929 · LLaVA-1.5 用 336×336 / 14² = 576 token
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
