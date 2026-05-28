/**
 * Section 02 · "跳过 SFT" 反直觉钩子
 *
 * 主轴：slider 拖训练步数 0 → 8000，看 R1-Zero 的 AIME 2024 pass@1 怎么从 15.6 涨到 71.0，
 *     同时 CoT 里反思词的频率怎么从 ~0 涨到峰值。
 * 第二个可动元素：3 个反思关键词 chip 切换（"wait" / "verify" / "however"），换不同的频率曲线。
 *
 * 数据来源：arXiv:2501.12948 + Nature 2025 Extended Data Fig.1b（"wait" 频率在 step ~8000 后陡升）。
 */
import React, { useMemo, useState } from "react";

/**
 * 训练步与 AIME pass@1 的近似曲线。
 * 来源：DeepSeek-R1 paper Figure 2，0 步 ≈ 15.6%，8000 步 ≈ 71.0% pass@1（86.7% maj@64）。
 * 我用一条 sigmoid-like 拟合，不是精确复刻图表。
 */
function aimeAt(step: number): number {
  /* sigmoid 在 step≈4500 时拐弯 */
  const p = 1 / (1 + Math.exp(-(step - 4500) / 1100));
  return 15.6 + (71 - 15.6) * p;
}

/** 反思关键词在 CoT 里出现的相对频次（按 Nature 论文 Extended Data Fig.1b 风格） */
type WordKey = "wait" | "verify" | "however";
const WORD_CFG: Record<WordKey, { color: string; peak: number; mid: number; sharp: number; note: string }> = {
  /* "wait" 在 step ≈ 8000 后陡升，是最戏剧的那条 */
  wait: { color: "#FF4D74", peak: 1.0, mid: 7800, sharp: 800, note: "step 8000 后陡升，aha moment 的语言标志" },
  /* "verify" 提前出现，缓慢爬升 */
  verify: { color: "#1B4B5A", peak: 0.7, mid: 5200, sharp: 1300, note: "step 4000-7000 缓慢爬升，校验式反思" },
  /* "however" 中段出现 */
  however: { color: "#E07A5F", peak: 0.55, mid: 6000, sharp: 1100, note: "中段开始出现，反驳式自我修正" },
};
function freqAt(word: WordKey, step: number): number {
  const c = WORD_CFG[word];
  const p = 1 / (1 + Math.exp(-(step - c.mid) / c.sharp));
  return c.peak * p;
}

const SectionEmergence: React.FC = () => {
  const [step, setStep] = useState(0);
  const [word, setWord] = useState<WordKey>("wait");

  const aime = aimeAt(step);
  const freq = freqAt(word, step);

  /* 曲线点位 */
  const aimePts = useMemo(() => {
    return Array.from({ length: 81 }).map((_, i) => {
      const s = i * 100;
      return { s, v: aimeAt(s) };
    });
  }, []);
  const wordPts = useMemo(() => {
    return Array.from({ length: 81 }).map((_, i) => {
      const s = i * 100;
      return { s, v: freqAt(word, s) };
    });
  }, [word]);

  /* SVG 坐标系：宽 480 高 200，左边距 36，右 8，上 14，下 22 */
  const W = 480;
  const H = 200;
  const PL = 36;
  const PR = 8;
  const PT = 14;
  const PB = 22;
  const innerW = W - PL - PR;
  const innerH = H - PT - PB;

  const sx = (s: number) => PL + (s / 8000) * innerW;
  /* aime 轴 0-100，word freq 轴 0-1 */
  const ya = (v: number) => PT + innerH - (v / 100) * innerH;
  const yw = (v: number) => PT + innerH - v * innerH;

  const aimeD = aimePts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.s).toFixed(1)} ${ya(p.v).toFixed(1)}`)
    .join(" ");
  const wordD = wordPts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${sx(p.s).toFixed(1)} ${yw(p.v).toFixed(1)}`)
    .join(" ");

  /* 当前游标位置 */
  const cx = sx(step);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">From Zero · Pure RL</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.1] mb-4">
              一条人写示范都没给，
              <br className="hidden sm:block" />
              <span className="bg-coral/20 px-1.5">只靠"答对加分 / 格式对加分"两条规则。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[60ch]">
              DeepSeek 把 V3-Base 直接丢进 GRPO，没经过 SFT。AIME 2024 pass@1 从 15.6 涨到 71.0，论文叫这版本 R1-Zero。
              更怪的是：模型在 CoT 里"自言自语"用的反思词（wait / verify / however）频次几乎同步爬起来 —— 反思能力是 RL 副产物。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-6">
            <div className="p-4 bg-butter border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70 mb-1.5">
                aime 2024 涨幅
              </div>
              <div className="font-display text-[42px] leading-none font-bold text-ink">
                +55.4
              </div>
              <div className="font-mono text-[10.5px] text-ink/65 mt-1">
                pp · 15.6 → 71.0（pass@1）
              </div>
              <div className="mt-3 pt-3 border-t border-ink/20 font-mono text-[10px] text-ink/55 leading-relaxed">
                paper Fig.2 · arXiv:2501.12948
              </div>
            </div>
          </div>
        </div>

        {/* 主图卡 */}
        <div className="card-stamp p-5 lg:p-7">
          {/* 顶栏：步数 slider + 关键词 chip */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-8 mb-5">
            <div className="flex-1">
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                  RL 训练步
                </div>
                <div className="font-mono text-[12px] text-ink tabular-nums">
                  step <span className="font-bold">{step.toLocaleString()}</span> / 8,000
                </div>
              </div>
              <input
                type="range"
                min={0}
                max={8000}
                step={50}
                value={step}
                onChange={(e) => setStep(Number(e.target.value))}
                className="w-full accent-coral"
              />
              <div className="flex justify-between mt-1 font-mono text-[9.5px] text-ink/40 tabular-nums">
                <span>0</span>
                <span>2000</span>
                <span>4000</span>
                <span>6000</span>
                <span>8000</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                反思词
              </span>
              {(Object.keys(WORD_CFG) as WordKey[]).map((k) => {
                const on = k === word;
                return (
                  <button
                    key={k}
                    onClick={() => setWord(k)}
                    className={[
                      "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-200",
                      on
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                        : "bg-white text-ink/70 hover:bg-cream",
                    ].join(" ")}
                  >
                    "{k}"
                  </button>
                );
              })}
            </div>
          </div>

          {/* 双曲线图 */}
          <div className="relative bg-cream border-2 border-ink rounded-2xl p-3 lg:p-4">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* 网格 */}
              <g stroke="#241C15" strokeWidth="0.5" opacity="0.12">
                {[0, 25, 50, 75, 100].map((p) => (
                  <line key={`hg-${p}`} x1={PL} x2={PL + innerW} y1={ya(p)} y2={ya(p)} />
                ))}
                {[0, 2000, 4000, 6000, 8000].map((s) => (
                  <line key={`vg-${s}`} x1={sx(s)} x2={sx(s)} y1={PT} y2={PT + innerH} />
                ))}
              </g>
              {/* 左轴标签 */}
              <g
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#88837C"
                textAnchor="end"
              >
                {[0, 25, 50, 75, 100].map((p) => (
                  <text key={p} x={PL - 4} y={ya(p) + 3}>
                    {p}
                  </text>
                ))}
              </g>
              {/* 底轴标签 */}
              <g
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#88837C"
                textAnchor="middle"
              >
                {[0, 2000, 4000, 6000, 8000].map((s) => (
                  <text key={s} x={sx(s)} y={H - 6}>
                    {s.toLocaleString()}
                  </text>
                ))}
              </g>
              <text
                x={PL - 26}
                y={PT + 12}
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#241C15"
                fontWeight="600"
              >
                pass@1
              </text>
              <text
                x={PL + innerW - 4}
                y={PT + 12}
                fontFamily="Geist Mono, monospace"
                fontSize="9"
                fill="#FF4D74"
                fontWeight="600"
                textAnchor="end"
              >
                CoT freq · {word}
              </text>

              {/* AIME 曲线 */}
              <path d={aimeD} fill="none" stroke="#241C15" strokeWidth="2.2" />
              {/* 关键词曲线 */}
              <path
                d={wordD}
                fill="none"
                stroke={WORD_CFG[word].color}
                strokeWidth="2.2"
                strokeDasharray="4 3"
              />

              {/* 当前游标 */}
              <line
                x1={cx}
                x2={cx}
                y1={PT}
                y2={PT + innerH}
                stroke="#241C15"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                opacity="0.5"
              />
              <circle cx={cx} cy={ya(aime)} r="5" fill="#F4D35E" stroke="#241C15" strokeWidth="2" />
              <circle cx={cx} cy={yw(freq)} r="5" fill={WORD_CFG[word].color} stroke="#241C15" strokeWidth="2" />
            </svg>

            {/* 双数值卡 */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="p-3 bg-white border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
                  AIME 2024 pass@1
                </div>
                <div className="font-display text-[26px] font-bold text-ink leading-none mt-1 tabular-nums">
                  {aime.toFixed(1)}%
                </div>
              </div>
              <div
                className="p-3 border-2 border-ink rounded-xl"
                style={{ backgroundColor: `${WORD_CFG[word].color}15` }}
              >
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/55">
                  "{word}" 出现频率（相对峰值）
                </div>
                <div
                  className="font-display text-[26px] font-bold leading-none mt-1 tabular-nums"
                  style={{ color: WORD_CFG[word].color }}
                >
                  {(freq * 100).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 font-mono text-[11px] text-ink/55 leading-relaxed max-w-[64ch]">
            注：曲线为 Nature 2025 论文 Extended Data Fig.1b 趋势拟合，{WORD_CFG[word].note}。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionEmergence;
