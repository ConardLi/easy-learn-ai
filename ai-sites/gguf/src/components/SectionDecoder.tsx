/**
 * Section 03 · Quant Name Decoder
 *
 * GGUF 圈黑话「Q4_K_M」「IQ3_M」「Q8_0」 念出来怎么读。
 * 反模板：quantization 站用过 7-pill bit selector，本站不再列 bit。
 * 这里是「输入框 + 实时分解」 —— 用户敲一个 quant 名，分解出 4 个组件。
 *
 * 可动元素：
 *   ① 输入框 (L3) · 实时解析
 *   ② 9 个 preset chip (L2) · 一键填入
 *   两种交互形式都不同于上一节的 tab + click。
 *
 * 数据：
 *   ─ Q4_K_M = 4.83 bpw / Q5_K_M = 5.69 bpw / Q6_K = 6.57 bpw 来自 ertas.ai 2026/04
 *   ─ Llama 3.1 8B 各 quant 文件大小来自 bartowski/Meta-Llama-3.1-8B-Instruct-GGUF HF 2026/05
 *   ─ Perplexity 来自 arXiv:2601.14277 «Which Quantization Should I Use?» (Llama-3.1-8B-Instruct)
 */
import React, { useMemo, useState } from "react";

type Parsed = {
  raw: string;
  ok: boolean;
  /** Q vs IQ */
  family: "Q" | "IQ" | "F" | "BF" | null;
  /** bits (主要精度) */
  bits: number | null;
  /** K-quant 还是 legacy */
  isKquant: boolean;
  /** 是 legacy 0 还是 legacy 1 */
  legacyVariant: "0" | "1" | null;
  /** size suffix */
  size: "XXS" | "XS" | "S" | "M" | "L" | "XL" | null;
  /** 错误说明 */
  err?: string;
};

type Preset = {
  name: string;
  bpw: number;
  size8b: string;
  ppl: number | null;
  /** 跟 F16 baseline 7.32 比，PPL 增 % */
  pplDelta: number | null;
  tag: "甜区" | "高质" | "近无损" | "无损" | "省空间" | "极限" | "灾难";
  recommend: string;
};

const PRESETS: Preset[] = [
  { name: "F16", bpw: 16, size8b: "16.07 GB", ppl: 7.32, pplDelta: 0, tag: "无损", recommend: "研究 / baseline，普通跑没必要" },
  { name: "Q8_0", bpw: 8.5, size8b: "8.54 GB", ppl: 7.33, pplDelta: 0.1, tag: "近无损", recommend: "VRAM 富裕、对质量敏感（代码 / 长文本）" },
  { name: "Q6_K", bpw: 6.57, size8b: "6.60 GB", ppl: 7.35, pplDelta: 0.4, tag: "高质", recommend: "16-24 GB GPU 想要近 Q8 质量但更省空间" },
  { name: "Q5_K_M", bpw: 5.69, size8b: "5.73 GB", ppl: 7.40, pplDelta: 1.1, tag: "高质", recommend: "12-16 GB GPU 的稳妥选择" },
  { name: "Q4_K_M", bpw: 4.83, size8b: "4.92 GB", ppl: 7.56, pplDelta: 3.3, tag: "甜区", recommend: "默认就用它 · 8 GB+ GPU / Mac M-Pro 起" },
  { name: "Q4_K_S", bpw: 4.58, size8b: "4.69 GB", ppl: 7.62, pplDelta: 4.1, tag: "甜区", recommend: "Q4_K_M 装不下时退一步" },
  { name: "IQ4_XS", bpw: 4.32, size8b: "4.45 GB", ppl: 7.55, pplDelta: 3.1, tag: "省空间", recommend: "imatrix 校准过 · 比 Q4_K_S 又小又稳" },
  { name: "Q3_K_M", bpw: 3.44, size8b: "4.02 GB", ppl: 7.96, pplDelta: 8.7, tag: "省空间", recommend: "VRAM 紧 · 质量开始有可见下降" },
  { name: "Q2_K", bpw: 2.63, size8b: "3.18 GB", ppl: 29.26, pplDelta: 300, tag: "灾难", recommend: "8B 不要用 · 70B 才勉强能看（PPL 翻 4 倍）" },
];

/**
 * 朴素 quant name parser。
 * 接受形式：F16 / BF16 / Q[N]_[K|0|1][_S|_M|_L|_XS|_XL]?  /  IQ[N]_[XXS|XS|S|M|L|XL]
 */
function parse(raw: string): Parsed {
  const s = raw.trim().toUpperCase();
  if (!s) return emptyParsed(raw, "输入一个量化名");

  if (s === "F16" || s === "F32" || s === "BF16") {
    return {
      raw,
      ok: true,
      family: s.startsWith("BF") ? "BF" : "F",
      bits: s.endsWith("32") ? 32 : 16,
      isKquant: false,
      legacyVariant: null,
      size: null,
    };
  }

  // 区分 IQ / Q
  let rest = s;
  let family: "Q" | "IQ" = "Q";
  if (rest.startsWith("IQ")) {
    family = "IQ";
    rest = rest.slice(2);
  } else if (rest.startsWith("Q")) {
    family = "Q";
    rest = rest.slice(1);
  } else {
    return emptyParsed(raw, "得以 Q 或 IQ 或 F 开头");
  }

  // 提 bits（数字部分）
  const bitMatch = rest.match(/^(\d+)/);
  if (!bitMatch) return emptyParsed(raw, "Q 后面要跟 bit 数");
  const bits = parseInt(bitMatch[1], 10);
  rest = rest.slice(bitMatch[1].length);

  let isKquant = false;
  let legacyVariant: "0" | "1" | null = null;
  let size: Parsed["size"] = null;

  // 拆分 _ 段
  const parts = rest.split("_").filter(Boolean);
  for (const p of parts) {
    if (p === "K") {
      isKquant = true;
    } else if (p === "0" || p === "1") {
      legacyVariant = p;
    } else if (["XXS", "XS", "S", "M", "L", "XL"].includes(p)) {
      size = p as Parsed["size"];
    } else if (p === "K_M" || p === "K_S" || p === "K_L") {
      isKquant = true;
      size = p.slice(2) as Parsed["size"];
    }
  }

  // IQ 默认带 K 量化机制
  if (family === "IQ") isKquant = true;

  return { raw, ok: true, family, bits, isKquant, legacyVariant, size };
}

function emptyParsed(raw: string, err?: string): Parsed {
  return {
    raw,
    ok: false,
    family: null,
    bits: null,
    isKquant: false,
    legacyVariant: null,
    size: null,
    err,
  };
}

const SectionDecoder: React.FC = () => {
  const [text, setText] = useState("Q4_K_M");
  const parsed = useMemo(() => parse(text), [text]);
  const matchPreset = useMemo(
    () =>
      PRESETS.find(
        (p) => p.name.toUpperCase() === parsed.raw.trim().toUpperCase(),
      ) ?? null,
    [parsed],
  );

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">NAMING · 把名字念出来</span>
        </div>

        <h2 className="font-display text-display-lg text-ink mb-3 max-w-3xl">
          Q4_K_M / IQ3_M / Q8_0 —— 这堆看着像密码，每一段都有意义
        </h2>
        <p className="max-w-2xl text-[15.5px] text-ink/70 leading-relaxed mb-10">
          GGUF 圈给量化方案起的命名遵循固定模式。敲一个名字进框，下面会拆出
          4 个组件 + 给出该 quant 在 Llama 3.1 8B 上的实测大小、perplexity、推荐场景。
        </p>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：输入框 + 分解卡 */}
          <div className="lg:col-span-7">
            {/* 输入框 */}
            <div className="bg-cream border-2 border-ink rounded-2xl p-5 mb-5">
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-1.5 block">
                输入 quant 名 ↓
              </label>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Q4_K_M"
                className="w-full px-3 py-3 font-display text-[28px] lg:text-[36px] font-bold text-ink bg-white border-2 border-ink rounded-xl shadow-stamp tracking-wide uppercase outline-none focus:shadow-stamp-lg transition-shadow duration-300"
              />
              {parsed.err && (
                <p className="mt-2 font-mono text-[11px] text-coral">
                  ⚠ {parsed.err}
                </p>
              )}
              {parsed.ok && (
                <p className="mt-2 font-mono text-[11px] text-ink/55">
                  ✓ 解析成功 · 见下方组件分解
                </p>
              )}
            </div>

            {/* 分解 4 卡 */}
            <div className="grid grid-cols-2 gap-3" key={parsed.raw}>
              <DecodeCard
                label="① family"
                value={
                  parsed.family === "IQ"
                    ? "IQ"
                    : parsed.family === "Q"
                      ? "Q"
                      : parsed.family === "F"
                        ? "F"
                        : parsed.family === "BF"
                          ? "BF"
                          : "—"
                }
                tone="ink"
                desc={
                  parsed.family === "IQ"
                    ? "Importance-matrix 量化 · 用 imatrix 校准过哪些权重重要，比同 bit 的 Q 系列更稳"
                    : parsed.family === "Q"
                      ? "标准 ggml 量化族 · 整数压缩为主"
                      : parsed.family === "F"
                        ? "原浮点（IEEE-754）· 没量化，体积最大"
                        : parsed.family === "BF"
                          ? "bfloat16 · 训练用浮点，跟 F16 同 bit 但范围更宽"
                          : "未识别"
                }
              />
              <DecodeCard
                label="② bits"
                value={parsed.bits !== null ? `${parsed.bits}` : "—"}
                tone="teal"
                desc={
                  parsed.bits === null
                    ? "在 Q / IQ 之后写一个数字，从 2 到 8 都常见"
                    : parsed.bits >= 8
                      ? `${parsed.bits}-bit · 几乎跟原 F16 一样准`
                      : parsed.bits >= 5
                        ? `${parsed.bits}-bit · 体积小一半，质量基本不掉`
                        : parsed.bits >= 4
                          ? `${parsed.bits}-bit · 主流甜区。Llama 3 8B PPL +3-5%`
                          : parsed.bits >= 3
                            ? `${parsed.bits}-bit · 开始可见质量下降`
                            : `${parsed.bits}-bit · 极限压缩，质量风险大`
                }
              />
              <DecodeCard
                label="③ scheme"
                value={
                  parsed.legacyVariant
                    ? `legacy ${parsed.legacyVariant}`
                    : parsed.isKquant
                      ? "K"
                      : parsed.family === "F" || parsed.family === "BF"
                        ? "—"
                        : "?"
                }
                tone="butter"
                desc={
                  parsed.isKquant
                    ? "K-quant · 重要张量（attention V、output）保 6 bit，FFN 等压到 4 bit。混合精度比 legacy 强"
                    : parsed.legacyVariant === "0"
                      ? "Q4_0 / Q8_0 · 老式 round-to-nearest，所有张量同一档。2026 一般已不推荐"
                      : parsed.legacyVariant === "1"
                        ? "Q4_1 · 加了 zero-point 偏移的 legacy。略好于 _0 但还是被 K-quant 取代"
                        : parsed.family === "F" || parsed.family === "BF"
                          ? "浮点没 quant 方案"
                          : "K 或 0/1 总要有一个"
                }
              />
              <DecodeCard
                label="④ size"
                value={parsed.size ?? "—"}
                tone="coral"
                desc={
                  parsed.size === "XXS"
                    ? "extra-extra small · 最狠的子格式，IQ 系列才出现"
                    : parsed.size === "XS"
                      ? "extra small · 比 S 还小一档（IQ4_XS / IQ3_XS）"
                      : parsed.size === "S"
                        ? "small · 全张量按声明 bit 压紧"
                        : parsed.size === "M"
                          ? "medium · 关键张量升 1-2 bit。最受欢迎的子格式"
                          : parsed.size === "L"
                            ? "large · 比 M 更宽松 · token_embd 也升 Q6_K"
                            : parsed.size === "XL"
                              ? "extra large · 接近上一档 bit 数"
                              : "K-quant 才有 _S/_M/_L 三档（mix 多保留多少）"
                }
              />
            </div>

            {/* preset 一键填入 */}
            <div className="mt-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-2">
                试试这些常见 quant ↓
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESETS.map((p) => {
                  const on = p.name === parsed.raw.trim().toUpperCase();
                  return (
                    <button
                      key={p.name}
                      onClick={() => setText(p.name)}
                      className={[
                        "px-2.5 py-1.5 rounded-md border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 右：实测数据卡 */}
          <div className="lg:col-span-5">
            <div className="bg-ink rounded-2xl p-5 lg:p-6 sticky top-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-butter mb-1.5">
                实测 · Llama 3.1 8B Instruct
              </div>
              <h3 className="font-display text-[28px] font-bold text-cream mb-4">
                {matchPreset ? matchPreset.name : "—"}
              </h3>

              {matchPreset ? (
                <>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="px-3 py-2.5 bg-cream/8 border border-cream/20 rounded-lg">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/55 mb-0.5">
                        bpw
                      </div>
                      <div className="font-display text-[22px] font-bold text-cream tabular-nums">
                        {matchPreset.bpw}
                      </div>
                    </div>
                    <div className="px-3 py-2.5 bg-cream/8 border border-cream/20 rounded-lg">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/55 mb-0.5">
                        文件
                      </div>
                      <div className="font-display text-[18px] font-bold text-cream tabular-nums leading-tight">
                        {matchPreset.size8b}
                      </div>
                    </div>
                    <div className="px-3 py-2.5 bg-cream/8 border border-cream/20 rounded-lg">
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/55 mb-0.5">
                        PPL
                      </div>
                      <div className="font-display text-[18px] font-bold text-cream tabular-nums leading-tight">
                        {matchPreset.ppl ?? "—"}
                      </div>
                    </div>
                  </div>

                  {/* tag */}
                  <div className="mb-4">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-1.5">
                      标签
                    </div>
                    <span
                      className={[
                        "inline-block px-2.5 py-1 rounded-md border-2 font-mono text-[11px] font-bold",
                        matchPreset.tag === "甜区"
                          ? "bg-butter text-ink border-butter-deep"
                          : matchPreset.tag === "灾难"
                            ? "bg-pop text-cream border-pop"
                            : matchPreset.tag === "近无损" || matchPreset.tag === "无损"
                              ? "bg-teal text-cream border-teal"
                              : "bg-cream text-ink border-cream",
                      ].join(" ")}
                    >
                      {matchPreset.tag}
                    </span>
                    {matchPreset.pplDelta !== null && matchPreset.pplDelta !== 0 && (
                      <span className="ml-2 font-mono text-[11px] text-coral">
                        PPL +{matchPreset.pplDelta}%
                      </span>
                    )}
                  </div>

                  {/* PPL bar */}
                  <div className="mb-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-1.5">
                      跟 F16 baseline 比
                    </div>
                    <div className="h-2.5 bg-cream/15 rounded-full overflow-hidden border border-cream/20">
                      <div
                        className={[
                          "h-full transition-all duration-500 ease-spring",
                          matchPreset.pplDelta !== null && matchPreset.pplDelta < 5
                            ? "bg-teal"
                            : matchPreset.pplDelta !== null && matchPreset.pplDelta < 15
                              ? "bg-butter"
                              : "bg-pop",
                        ].join(" ")}
                        style={{
                          width: `${Math.min(100, (matchPreset.pplDelta ?? 0) / 30 * 100 + 4)}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* recommend */}
                  <div className="px-3 py-3 bg-butter/15 border border-butter/40 rounded-lg">
                    <div className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-butter mb-1">
                      推荐
                    </div>
                    <p className="text-[13px] text-cream/95 leading-relaxed">
                      {matchPreset.recommend}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-[14px] text-cream/65 leading-relaxed">
                  这个 quant 名我们没收实测数据。改成下面预设里的任一项看看具体数字。
                </p>
              )}

              <p className="mt-5 font-mono text-[9.5px] text-cream/40 leading-snug">
                数据：bartowski/Meta-Llama-3.1-8B-Instruct-GGUF · arXiv:2601.14277 · ertas.ai 2026/04
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DecodeCard: React.FC<{
  label: string;
  value: string;
  desc: string;
  tone: "ink" | "teal" | "butter" | "coral";
}> = ({ label, value, desc, tone }) => {
  const toneBg: Record<string, string> = {
    ink: "bg-ink text-cream",
    teal: "bg-teal text-cream",
    butter: "bg-butter text-ink",
    coral: "bg-coral text-cream",
  };
  return (
    <div className="bg-white border-2 border-ink rounded-xl overflow-hidden animate-enter-pop">
      <div className={`px-3 py-2 ${toneBg[tone]}`}>
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-80">
            {label}
          </span>
          <span className="font-display text-[20px] font-bold tabular-nums">
            {value}
          </span>
        </div>
      </div>
      <div className="px-3 py-2.5 text-[12px] text-ink/75 leading-snug min-h-[68px]">
        {desc}
      </div>
    </div>
  );
};

export default SectionDecoder;
