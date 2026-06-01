/**
 * Section 02 · 「一个想法堆了 8 年没换」
 *
 * 反直觉钩子：GPT 系列每一代换了无数细节 —— 参数、层数、上下文、训练数据 ——
 *   但训练目标这一行公式 8 年没动过：「下一个 token 猜啥」。
 *
 * 主交互（L2）：5 代 GPT pill 切换（GPT-1 / 2 / 3 / 4 / 5）
 * 次视觉：手写 SVG 一座 decoder 塔，层数 + heads + dim 跟着 pill 变；
 *         顶上方框「训练目标」公式始终 `L = − Σ log P(xₜ | x_<t)`，岿然不动
 *
 * 数据来源：
 *   ─ GPT-1 / 2 / 3：arXiv:2005.14165 Table 2.1 + Wikipedia GPT-2/3 条目
 *   ─ GPT-4：Speechmatics summary + 行业估算（OpenAI 不公开参数）
 *   ─ GPT-5：openai.com/index/introducing-gpt-5/ 2025-08-07
 */
import React, { useState } from "react";

type Gen = {
  id: string;
  short: string;
  year: string;
  params: string;
  layers: number; /* 视觉用 */
  layersLabel: string;
  dim: string;
  heads: string;
  ctx: string;
  data: string;
  loss: string;
  ref: string;
  tone: string;
};

const GENS: Gen[] = [
  {
    id: "gpt1",
    short: "GPT-1",
    year: "2018-06",
    params: "117 M",
    layers: 6,
    layersLabel: "12 层 decoder",
    dim: "768",
    heads: "12",
    ctx: "512 token",
    data: "BookCorpus · 4.5 GB",
    loss: "next-token cross-entropy",
    ref: "Radford et al. 2018 · OpenAI tech report",
    tone: "#88837C",
  },
  {
    id: "gpt2",
    short: "GPT-2",
    year: "2019-02",
    params: "1.5 B",
    layers: 9,
    layersLabel: "48 层 decoder",
    dim: "1600",
    heads: "25",
    ctx: "1024 token",
    data: "WebText · 40 GB · Reddit 高赞外链",
    loss: "next-token cross-entropy",
    ref: "Radford et al. 2019 · OpenAI blog",
    tone: "#1B4B5A",
  },
  {
    id: "gpt3",
    short: "GPT-3",
    year: "2020-05",
    params: "175 B",
    layers: 12,
    layersLabel: "96 层 decoder",
    dim: "12 288",
    heads: "96",
    ctx: "2048 token",
    data: "Common Crawl + Books + Wiki · 300 B token",
    loss: "next-token cross-entropy",
    ref: "arXiv:2005.14165",
    tone: "#E07A5F",
  },
  {
    id: "gpt4",
    short: "GPT-4",
    year: "2023-03",
    params: "未公开 · 行业估 ~1.7 T",
    layers: 14,
    layersLabel: "层数未公开（MoE 风格估算）",
    dim: "未公开",
    heads: "未公开",
    ctx: "8 K → 128 K（Turbo）",
    data: "未公开 · 行业估 ~13 T token",
    loss: "next-token cross-entropy + RLHF 对齐",
    ref: "GPT-4 Technical Report 2023 · 不含架构细节",
    tone: "#F4D35E",
  },
  {
    id: "gpt5",
    short: "GPT-5",
    year: "2025-08",
    params: "未公开",
    layers: 16,
    layersLabel: "层数未公开 · 闭源",
    dim: "未公开",
    heads: "未公开",
    ctx: "400 K（ChatGPT）· 1 M（API 5.5）",
    data: "未公开 · 包含合成数据 + 推理轨迹",
    loss: "next-token + RL on reasoning chains",
    ref: "openai.com/index/introducing-gpt-5 · 2025-08-07",
    tone: "#FF4D74",
  },
];

const SectionOneIdea: React.FC = () => {
  const [gid, setGid] = useState("gpt3");
  const g = GENS.find((x) => x.id === gid)!;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-cream/40">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">02</span>
          <span className="section-anchor-label">one idea · 8 years</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              一个想法堆了 8 年，
              <br />
              <span className="bg-butter/55 px-1.5">公式一行没改。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              GPT-1 到 GPT-5 中间换了无数零件 —— 参数从 117 M 飙到几乎万亿，上下文从 512 拉到 1 M，
              数据从 4.5 GB 涨到几十 T token。
              但训练目标始终是同一行 ——「下一个 token 猜啥」。
            </p>
            <div className="mt-4 max-w-[64ch] text-[13.5px] text-ink/70 leading-relaxed bg-white border-2 border-ink/15 rounded-2xl p-4 space-y-1.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/45 mb-1">先把几个词说清</p>
              <p><strong className="text-ink">猜下一个 token（自回归）</strong>：写出一个字，再根据已经写的去猜下一个字，从左往右一个个往后蹦。Hero 里说的「一个字一个字接话」就是这件事。</p>
              <p><strong className="text-ink">decoder-only</strong>：模型只管往后写、不回头改前面，所以擅长聊天和续写。GPT 全系都是这一类。</p>
              <p><strong className="text-ink">预训练</strong>：先让模型海量读文章自学，不告诉它标准答案，只让它一遍遍练「下一个字是啥」。</p>
            </div>
          </div>
          <div className="lg:col-span-4 lg:pt-3">
            <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-stamp">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                训练目标 · 始终这一行
              </div>
              <div className="font-mono text-[14px] font-bold text-ink leading-relaxed bg-butter/60 inline-block px-2 py-1 rounded">
                L = − Σ log P(xₜ | x&lt;ₜ)
              </div>
              <p className="mt-2 font-mono text-[10.5px] text-ink/55 leading-relaxed">
                给一段前缀，最大化下一个真实 token 的对数概率。
              </p>
            </div>
          </div>
        </div>

        {/* 主交互卡 */}
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 lg:p-8">
          {/* pill 切代 */}
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mr-2">
              切代
            </div>
            {GENS.map((x) => {
              const on = x.id === gid;
              return (
                <button
                  key={x.id}
                  onClick={() => setGid(x.id)}
                  className={[
                    "px-3.5 py-1.5 rounded-full border-2 border-ink font-mono text-[11.5px] font-bold transition-all duration-250 ease-spring",
                    on
                      ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                      : "bg-white text-ink/70 hover:bg-cream",
                  ].join(" ")}
                >
                  {x.short}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* 左：手写 decoder 塔 */}
            <div className="lg:col-span-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① decoder 塔（层数示意）
              </div>
              <div className="relative h-[280px] bg-cream/60 border-2 border-ink rounded-2xl overflow-hidden">
                <svg viewBox="0 0 280 280" className="w-full h-full">
                  {/* 顶端 token 出口 */}
                  <g transform="translate(140,28)">
                    <rect
                      x="-44"
                      y="-14"
                      width="88"
                      height="28"
                      rx="6"
                      fill={g.tone}
                      stroke="#241C15"
                      strokeWidth="2"
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="11"
                      fontWeight="800"
                      fill="#241C15"
                      letterSpacing="0.5"
                    >
                      next token
                    </text>
                  </g>

                  {/* decoder 层堆叠 */}
                  {Array.from({ length: g.layers }).map((_, i) => {
                    const y = 70 + i * 12;
                    return (
                      <rect
                        key={`l-${gid}-${i}`}
                        x="90"
                        y={y}
                        width="100"
                        height="9"
                        rx="2"
                        fill="#FFFFFF"
                        stroke="#241C15"
                        strokeWidth="1.5"
                        opacity={0.4 + (i / g.layers) * 0.6}
                      />
                    );
                  })}

                  {/* 中部标签 */}
                  <g transform={`translate(140, ${70 + g.layers * 12 + 18})`}>
                    <text
                      x="0"
                      y="0"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fontWeight="700"
                      fill="#241C15"
                    >
                      {g.layersLabel}
                    </text>
                  </g>

                  {/* 底部输入 */}
                  <g transform="translate(140,250)">
                    <rect
                      x="-58"
                      y="-12"
                      width="116"
                      height="24"
                      rx="5"
                      fill="#FBEFE3"
                      stroke="#241C15"
                      strokeWidth="1.8"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      fontFamily="Geist Mono, monospace"
                      fontSize="10"
                      fontWeight="700"
                      fill="#241C15"
                    >
                      input tokens (x&lt;ₜ)
                    </text>
                  </g>

                  {/* 左右流动小箭头 */}
                  <line x1="140" y1="44" x2="140" y2="64" stroke="#241C15" strokeWidth="1.5" />
                  <polygon points="137,40 140,46 143,40" fill="#241C15" />
                  <line
                    x1="140"
                    y1={70 + g.layers * 12 + 28}
                    x2="140"
                    y2="238"
                    stroke="#241C15"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    opacity="0.4"
                  />
                </svg>
              </div>
              <p className="mt-3 font-mono text-[10.5px] text-ink/50 leading-relaxed">
                层数只是示意 —— 真实 GPT-1=12, GPT-2 XL=48, GPT-3 175B=96。
                GPT-4 / 5 闭源，没人知道。
              </p>
            </div>

            {/* 右：数字对比 + 训练目标 */}
            <div className="lg:col-span-7">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ② {g.short} · {g.year}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5" key={gid}>
                <Stat label="参数量" value={g.params} tone={g.tone} />
                <Stat label="dim · heads" value={`${g.dim} · ${g.heads}`} />
                <Stat label="上下文" value={g.ctx} />
                <Stat label="训练数据" value={g.data} />
              </div>

              <div className="p-4 bg-butter/30 border-2 border-ink rounded-2xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  本代训练目标
                </div>
                <div className="font-display text-[15px] font-bold text-ink leading-snug">
                  {g.loss}
                </div>
                <p className="mt-2 font-mono text-[10.5px] text-ink/55">
                  和 GPT-1 那行公式同一件事 —— 7 年只是把 Σ 后面那段做大、做长、做精。
                </p>
              </div>

              <p className="mt-3 font-mono text-[10px] text-ink/40">
                来源：{g.ref}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Stat: React.FC<{ label: string; value: string; tone?: string }> = ({
  label,
  value,
  tone,
}) => (
  <div className="p-3 bg-cream/60 border-2 border-ink rounded-xl animate-enter-fade">
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-1">
      {label}
    </div>
    <div
      className="font-display text-[15.5px] font-bold leading-tight tabular-nums"
      style={{ color: tone || "#241C15" }}
    >
      {value}
    </div>
  </div>
);

export default SectionOneIdea;
