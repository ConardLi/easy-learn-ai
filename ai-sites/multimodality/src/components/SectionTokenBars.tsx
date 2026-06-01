/**
 * Section 02 · 不同模态的 token 账本
 *
 * 钩子：一张照片就是 196 个数字。但视频比图还贵 30 倍，除非用 Gemini 2.5 的高效编码。
 *
 * 主交互：5 种模态各一根可拖 slider，调输入大小（字数 / 张数 / 秒数）→
 *        实时看 token 数 + 一根 log 缩放的 token 条 + 在 8K 上下文里占多少。
 *
 * 跟 Hero 用 chip pill 切换不一样：这里全是 slider 调连续值。
 */
import React, { useState } from "react";
import { FileText, Image as ImageIcon, Film, Mic, Zap } from "lucide-react";

type Modality = {
  id: string;
  icon: React.ReactNode;
  name: string;
  shortName: string;
  unit: string;
  unitLabel: string;
  min: number;
  max: number;
  step: number;
  default: number;
  /** 计算 token 数 */
  tokensFor: (v: number) => number;
  /** 简短说明 */
  caption: string;
  /** 数据来源 */
  source: string;
  /** 颜色色板 */
  color: string;
};

const MODALITIES: Modality[] = [
  {
    id: "text",
    icon: <FileText className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "中文文字",
    shortName: "字",
    unit: "字",
    unitLabel: "汉字",
    min: 10,
    max: 1000,
    step: 10,
    default: 50,
    tokensFor: (v) => Math.round(v * 1.5),
    caption: "中文 BPE 大约 1 字 ≈ 1.5 token",
    source: "OpenAI tiktoken cl100k_base 中文实测",
    color: "#241C15",
  },
  {
    id: "img-vit",
    icon: <ImageIcon className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "224×224 图 · ViT-B/16",
    shortName: "图",
    unit: "张",
    unitLabel: "张图",
    min: 1,
    max: 8,
    step: 1,
    default: 1,
    tokensFor: (v) => v * 196,
    caption: "224 ÷ 16 = 14，14×14 = 196 个 patch",
    source: "ViT 原论文 arXiv:2010.11929",
    color: "#1B4B5A",
  },
  {
    id: "img-llava",
    icon: <ImageIcon className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "336×336 图 · LLaVA",
    shortName: "高清图",
    unit: "张",
    unitLabel: "张图",
    min: 1,
    max: 8,
    step: 1,
    default: 1,
    tokensFor: (v) => v * 576,
    caption: "336 ÷ 14 = 24，24×24 = 576 个 patch",
    source: "LLaVA-1.5 用 CLIP ViT-L/14-336px",
    color: "#1B4B5A",
  },
  {
    id: "video-naive",
    icon: <Film className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "视频 · 老办法",
    shortName: "视频",
    unit: "秒",
    unitLabel: "秒视频",
    min: 5,
    max: 60,
    step: 5,
    default: 30,
    tokensFor: (v) => v * 1 * 196,
    caption: "每秒抽 1 帧，每帧 196 token",
    source: "LLaVA-Video / Video-LLaMA 默认配置",
    color: "#E07A5F",
  },
  {
    id: "video-gemini",
    icon: <Zap className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "视频 · Gemini 2.5 高效",
    shortName: "G2.5 视频",
    unit: "秒",
    unitLabel: "秒视频",
    min: 5,
    max: 600,
    step: 5,
    default: 60,
    tokensFor: (v) => Math.round((v / 60) * 1024),
    caption: "原生多模态压缩，约 1024 token / 分钟",
    source: "Gemini API 视频计费 2026/05",
    color: "#F4D35E",
  },
  {
    id: "audio",
    icon: <Mic className="w-3.5 h-3.5" strokeWidth={2.2} />,
    name: "音频 · GPT-4o 风格",
    shortName: "音频",
    unit: "秒",
    unitLabel: "秒音频",
    min: 5,
    max: 300,
    step: 5,
    default: 60,
    tokensFor: (v) => v * 25,
    caption: "音频帧 token，约 25 token / 秒",
    source: "GPT-4o realtime audio frame 实测",
    color: "#FF4D74",
  },
];

const MAX_TOKEN_DISPLAY = 6000; // log 缩放上限
const CONTEXT_8K = 8000;

const SectionTokenBars: React.FC = () => {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(MODALITIES.map((m) => [m.id, m.default]))
  );

  /* 视觉对比锚：50 字短消息 ≈ 75 token */
  const ANCHOR = 75;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        {/* section anchor */}
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">cost ledger</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-display-lg text-ink mb-5">
              一张照片，
              <br />
              就是
              <span className="relative inline-block ml-1">
                <span className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0" aria-hidden />
                <span className="relative z-10">196 个数字</span>
              </span>
              。
            </h2>
            <div className="space-y-3 text-[15px] text-ink/75 leading-relaxed max-w-md">
              <p>
                模态 = 文字 / 图 / 声音 / 视频这类不同的输入类型。把每种模态都变成 token 之后，就能横向比一比谁更贵：文字按字数收，图按面积收，视频按秒数 × 帧数收。
              </p>
              <p>
                视频是最贵的。一段 30 秒视频用老办法（每秒抽帧）就要 5880 token —— 跟一篇 4000 字短文一样长。
              </p>
              <p>
                Gemini 2.5 原生多模态训练时学了一套压缩，1 分钟视频只编 1024 token。差了 11 倍。
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/60 mb-3">
                token 横评 · 1 token ≈ 模型读到的 1 个数字
              </div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-[42px] font-bold text-butter leading-none tabular-nums">
                  {MODALITIES.reduce((sum, m) => sum + m.tokensFor(values[m.id]), 0).toLocaleString()}
                </span>
                <span className="font-mono text-[12px] text-cream/60">token</span>
              </div>
              <div className="font-mono text-[11px] text-cream/55 mb-5">
                下面 6 行加起来 · 拖 slider 看每一行单独多少
              </div>

              {/* 8K context 占用条 */}
              <div className="mb-2 flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream/60">
                  装进 8K 上下文里
                </div>
                <div className="font-mono text-[10px] text-cream/70 tabular-nums">
                  {Math.min(
                    100,
                    Math.round(
                      (MODALITIES.reduce((s, m) => s + m.tokensFor(values[m.id]), 0) / CONTEXT_8K) * 100
                    )
                  )}
                  %
                </div>
              </div>
              <div className="h-3 bg-cream/15 rounded-full overflow-hidden border border-cream/20">
                <div
                  className="h-full bg-butter transition-all duration-400 ease-spring"
                  style={{
                    width: `${Math.min(
                      100,
                      (MODALITIES.reduce((s, m) => s + m.tokensFor(values[m.id]), 0) / CONTEXT_8K) * 100
                    )}%`,
                  }}
                />
              </div>
              <p className="mt-2 font-mono text-[10px] text-cream/45">
                超 100% = 一个 8K 模型一次塞不下，得切窗口或扩容
              </p>
            </div>
          </div>
        </div>

        {/* 6 行 modality slider */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 bg-cream border-b-2 border-ink font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
            <div className="col-span-3">模态</div>
            <div className="col-span-4">输入大小</div>
            <div className="col-span-2 text-right">token 数</div>
            <div className="col-span-3 pl-3">相对 50 字消息 (ANCHOR)</div>
          </div>
          {MODALITIES.map((m, i) => {
            const v = values[m.id];
            const tokens = m.tokensFor(v);
            const ratio = tokens / ANCHOR;
            /* log 缩放，max ≈ 6000 */
            const barLen = Math.min(100, Math.max(2, (Math.log10(tokens + 1) / Math.log10(MAX_TOKEN_DISPLAY)) * 100));
            return (
              <div
                key={m.id}
                className={[
                  "grid grid-cols-12 gap-3 items-center px-6 py-4",
                  i !== MODALITIES.length - 1 ? "border-b border-ink/10" : "",
                ].join(" ")}
              >
                {/* 模态 */}
                <div className="col-span-3 flex items-center gap-2">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-md border-2 border-ink"
                    style={{ backgroundColor: m.color, color: m.id === "video-gemini" ? "#241C15" : "#FBEFE3" }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div className="font-display text-[14px] font-bold text-ink leading-tight">{m.shortName}</div>
                    <div className="font-mono text-[10px] text-ink/45 leading-tight">{m.name}</div>
                  </div>
                </div>

                {/* slider */}
                <div className="col-span-4">
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="font-mono text-[10px] text-ink/50">{m.min}</span>
                    <span className="font-display text-[18px] font-bold text-ink tabular-nums">
                      {v}
                      <span className="font-mono text-[10px] text-ink/55 ml-1">{m.unit}</span>
                    </span>
                    <span className="font-mono text-[10px] text-ink/50">{m.max}</span>
                  </div>
                  <input
                    type="range"
                    min={m.min}
                    max={m.max}
                    step={m.step}
                    value={v}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [m.id]: Number(e.target.value) }))
                    }
                    className="w-full accent-coral"
                  />
                </div>

                {/* token 数 */}
                <div className="col-span-2 text-right">
                  <span
                    key={tokens}
                    className="font-display text-[22px] font-bold text-ink tabular-nums animate-enter-pop inline-block"
                  >
                    {tokens.toLocaleString()}
                  </span>
                </div>

                {/* 相对锚条 */}
                <div className="col-span-3 pl-3">
                  <div className="relative h-4 bg-cream rounded-full border-2 border-ink overflow-hidden">
                    <div
                      className="h-full transition-all duration-400 ease-spring"
                      style={{ width: `${barLen}%`, backgroundColor: m.color }}
                    />
                    {/* 50 字基准刻度 */}
                    <div
                      className="absolute top-0 bottom-0 w-px bg-ink/30"
                      style={{
                        left: `${(Math.log10(ANCHOR + 1) / Math.log10(MAX_TOKEN_DISPLAY)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-mono text-[10px] text-ink/55 tabular-nums">
                      {ratio < 1 ? `${ratio.toFixed(2)}×` : `${ratio.toFixed(1)}×`}
                    </span>
                    <span className="font-mono text-[9px] text-ink/40">{m.caption}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 来源行 */}
        <div className="mt-4 grid sm:grid-cols-2 gap-2">
          {MODALITIES.map((m) => (
            <div key={m.id} className="font-mono text-[10px] text-ink/45 leading-tight">
              <span className="text-ink/65 font-semibold">{m.shortName}</span> · {m.source}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionTokenBars;
