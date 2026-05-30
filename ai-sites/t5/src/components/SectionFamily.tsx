/**
 * Section 05 · 「T5 家族 · 6 个版本，时间轴」
 *
 * 反模板：跟 bert SectionFamily（时间线 + GLUE 折线）不同 ——
 *   ─ 这里用纵向 accordion 时间轴，点节点展开看变化点 + 数据
 *   ─ 没有折线图，没有 chip 阵列
 *   ─ 跟 distill / nlp 站时间线节点形式也不同
 *
 * 交互：点节点 → 展开 / 折叠 + 详情卡（参数、新加什么、用途）
 *   ─ L2 accordion 切换 + L1 hover 微高亮节点
 *
 * 数据：每个版本的核心改动 + 一句话评价 + 来源
 */
import React, { useState } from "react";

type Version = {
  id: string;
  name: string;
  year: string;
  org: string;
  /** 一句话核心改动 */
  oneLiner: string;
  /** 关键属性（K-V 表） */
  facts: { k: string; v: string }[];
  /** 来源 */
  source: string;
  /** 这一代留下的最强项 */
  legacy: string;
};

const VERSIONS: Version[] = [
  {
    id: "t5",
    name: "T5",
    year: "2019-10",
    org: "Google",
    oneLiner: "提出 text-to-text 框架，把 18 种 NLP 任务都装成字符串。",
    facts: [
      { k: "尺寸", v: "Small 60M · Base 220M · Large 770M · 3B · 11B" },
      { k: "训练数据", v: "C4 · 750 GB 英文清洗网页 · 34 B token" },
      { k: "预训练目标", v: "span corruption · 15% noise · mean span 3" },
      { k: "上下文", v: "512 tokens" },
    ],
    source: "Raffel et al. arXiv:1910.10683",
    legacy: "「任务前缀 + 输入」格式从此成了 seq2seq 业界默认。",
  },
  {
    id: "mt5",
    name: "mT5",
    year: "2020-10",
    org: "Google",
    oneLiner: "把 T5 训练数据换成多语言 · 101 种语言一起预训练。",
    facts: [
      { k: "尺寸", v: "Small 300M · Base 580M · Large 1.2B · XL 3.7B · XXL 13B" },
      { k: "训练数据", v: "mC4 · 101 语种 · 6.3 T token" },
      { k: "新意", v: "去掉英文专用 SentencePiece，词表扩到 250 K" },
      { k: "上下文", v: "1024 tokens" },
    ],
    source: "Xue et al. arXiv:2010.11934",
    legacy: "至今是开源中小型多语言 seq2seq 主力之一。",
  },
  {
    id: "t511",
    name: "T5.1.1",
    year: "2020-11",
    org: "Google",
    oneLiner: "干掉预训练里的有监督任务 · 全用 span corruption + 改激活。",
    facts: [
      { k: "尺寸", v: "Small/Base/Large/XL/XXL 同 T5" },
      { k: "改动", v: "全程 span corruption（不再混 supervised 任务）" },
      { k: "激活", v: "GeGLU 取代 ReLU · feed-forward 翻 1.5x 宽" },
      { k: "Dropout", v: "预训练阶段关闭 · 微调再打开" },
    ],
    source: "google-research/text-to-text-transfer-transformer README",
    legacy: "后面所有 T5 衍生（FLAN、UL2、T5Gemma）都基于 T5.1.1。",
  },
  {
    id: "flan",
    name: "FLAN-T5",
    year: "2022-10",
    org: "Google",
    oneLiner: "在 1,836 个 instruction-tuning 任务上继续训练 · 第一次 zero-shot 起来。",
    facts: [
      { k: "尺寸", v: "Small 80M · Base 250M · Large 780M · XL 3B · XXL 11B" },
      { k: "训练任务数", v: "1,836 · Muffin + T0-SF + NIV2 + CoT 四个 mixture" },
      { k: "新能力", v: "zero-shot · few-shot · chain-of-thought" },
      { k: "MMLU", v: "Flan-T5-XXL 11B 跑到 55.1%（同期 T5 是 26.7%）" },
    ],
    source: "Chung et al. arXiv:2210.11416 / JMLR 2024",
    legacy: "至今仍是 Adobe Sensei、客服路由、PII 检测的常用底模。",
  },
  {
    id: "ul2",
    name: "UL2 / Flan-UL2",
    year: "2022-05 / 2023-03",
    org: "Google",
    oneLiner: "训练目标拆三种「去噪模式」混着练 · 把 T5 和 GPT 思路融起来。",
    facts: [
      { k: "尺寸", v: "20B 单尺寸" },
      { k: "预训练", v: "Mixture-of-Denoisers · R-Denoiser + S-Denoiser + X-Denoiser" },
      { k: "上下文", v: "2048 tokens（Flan-UL2 进一步扩）" },
      { k: "意义", v: "证明 encoder-decoder + 多种目标 ≥ decoder-only 同等算力下表现" },
    ],
    source: "Tay et al. arXiv:2205.05131",
    legacy: "T5Gemma 用的就是 UL2 的 adaptation recipe。",
  },
  {
    id: "t5gemma",
    name: "T5Gemma",
    year: "2025-07",
    org: "Google",
    oneLiner: "把 Gemma 2（decoder-only）通过 UL2 adapt 回 encoder-decoder。",
    facts: [
      { k: "尺寸", v: "2B-2B / 9B-2B / 9B-9B · T5-Small/Base/Large/XL 重训版" },
      { k: "做法", v: "用 Gemma 2 预训练权重初始化 encoder/decoder 后续训练" },
      { k: "新意", v: "支持「不平衡」配置（9B encoder + 2B decoder）专吃长输入" },
      { k: "目标", v: "PrefixLM 或 UL2 二选一" },
    ],
    source: "Google Dev Blog 2025-07-09 · developers.googleblog.com/t5gemma",
    legacy: "把「encoder-decoder 路线」从坟里挖出来重启。",
  },
  {
    id: "t5gemma2",
    name: "T5Gemma 2",
    year: "2025-12-18",
    org: "Google",
    oneLiner: "基于 Gemma 3 · 第一个多模态 + 128K 长上下文 encoder-decoder。",
    facts: [
      { k: "尺寸", v: "270M-270M（~370M）/ 1B-1B（~1.7B）/ 4B-4B（~7B）" },
      { k: "新意", v: "Tied embeddings（编/解码共享词嵌入）+ merged attention" },
      { k: "上下文", v: "128 K tokens（Gemma 3 的滑窗注意力 + 全局注意力 5:1）" },
      { k: "多模态", v: "继承 Gemma 3 的 SigLIP vision encoder" },
    ],
    source: "T5Gemma 2 paper arXiv:2512.14856 · blog.google 2025-12-18",
    legacy: "目前社区第一个长上下文 encoder-decoder 开源模型。",
  },
];

const SectionFamily: React.FC = () => {
  const [openId, setOpenId] = useState<string>("flan");

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">05</span>
          <span className="section-anchor-label">T5 family timeline</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              T5 没有死，
              <br />
              它换了 6 次马甲。
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              2019 原版 → 2020 多语言 → 2022 FLAN（zero-shot 起来） → 2022 UL2（融合 GPT 目标） → 2025 T5Gemma（从 Gemma 2 adapt 回 enc-dec） → 2025 T5Gemma 2（多模态 + 128K）。点节点看每代具体改了啥。
            </p>
          </div>
        </div>

        {/* 时间轴 accordion */}
        <div className="relative">
          {/* 左侧竖线 */}
          <div className="absolute left-[15px] lg:left-[19px] top-3 bottom-3 w-[2px] bg-ink/15" />

          <div className="space-y-3">
            {VERSIONS.map((v, idx) => {
              const open = v.id === openId;
              return (
                <div key={v.id} className="relative pl-10 lg:pl-12">
                  {/* 圆点 */}
                  <button
                    onClick={() => setOpenId(open ? "" : v.id)}
                    aria-label={v.name}
                    className={[
                      "absolute left-0 top-3 w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-ink font-mono text-[10.5px] font-extrabold flex items-center justify-center transition-all duration-300 ease-spring",
                      open
                        ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F] scale-110"
                        : "bg-butter text-ink hover:bg-coral hover:text-cream hover:scale-105",
                    ].join(" ")}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </button>

                  {/* 卡片 */}
                  <button
                    onClick={() => setOpenId(open ? "" : v.id)}
                    className={[
                      "w-full text-left bg-white border-2 border-ink rounded-2xl transition-all duration-300 ease-spring",
                      open
                        ? "shadow-stamp-lg"
                        : "shadow-stamp hover:shadow-stamp-lg hover:-translate-x-0.5 hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    <div className="px-5 py-3.5 flex items-center gap-4 flex-wrap">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-[20px] font-extrabold text-ink">
                          {v.name}
                        </span>
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink/55">
                          {v.year} · {v.org}
                        </span>
                      </div>
                      <p className="text-[13.5px] text-ink/75 leading-snug flex-1 min-w-0">
                        {v.oneLiner}
                      </p>
                      <span className="font-mono text-[16px] text-ink/40 tabular-nums">
                        {open ? "−" : "+"}
                      </span>
                    </div>

                    {open && (
                      <div className="px-5 pb-5 pt-1 grid md:grid-cols-2 gap-4 border-t border-ink/10 animate-enter-fade">
                        {/* 属性表 */}
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                            关键数据
                          </div>
                          <dl className="space-y-1.5">
                            {v.facts.map((f) => (
                              <div key={f.k} className="grid grid-cols-[80px_1fr] gap-2">
                                <dt className="font-mono text-[11px] text-ink/55 pt-0.5">
                                  {f.k}
                                </dt>
                                <dd className="font-mono text-[12px] text-ink leading-snug">
                                  {f.v}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>

                        {/* 留下什么 */}
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-2">
                            留下了什么
                          </div>
                          <p className="text-[13.5px] text-ink/85 leading-relaxed mb-3">
                            {v.legacy}
                          </p>
                          <div className="font-mono text-[10px] text-ink/45">
                            来源：{v.source}
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionFamily;
