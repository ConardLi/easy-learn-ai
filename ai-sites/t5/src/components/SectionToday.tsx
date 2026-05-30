/**
 * Section 06 · 「2026 还该不该选 T5 系」
 *
 * 反模板：不复用 bert SectionLiveIn2026（4-6 张翻面卡）
 *   ─ 这里用「勾选组合 → 条件结论」交互：用户勾自己需求里的特征，
 *     右边动态给推荐 + 真实生产案例 + 数据
 *
 * 交互：L3 勾选组合（4-5 个开关）
 */
import React, { useMemo, useState } from "react";

type FeatureId =
  | "io_strict"
  | "multilingual"
  | "small_edge"
  | "long_ctx"
  | "tool_use"
  | "multimodal";

type Feature = {
  id: FeatureId;
  label: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    id: "io_strict",
    label: "输出严格格式",
    desc: "JSON、字段抽取、分类标签 —— 不能允许自由发挥",
  },
  {
    id: "multilingual",
    label: "多语种",
    desc: "服务用户语言 ≥ 10 种 / 包含小语种",
  },
  {
    id: "small_edge",
    label: "想塞到手机 / 边缘",
    desc: "模型必须 < 1 B 参数 · 低延迟离线跑",
  },
  {
    id: "long_ctx",
    label: "长上下文（≥ 16 K）",
    desc: "整本说明书、合同、长会议纪要要一次塞进去",
  },
  {
    id: "tool_use",
    label: "Agent 工具调用",
    desc: "需要 function calling / 多轮 reasoning / 自主规划",
  },
  {
    id: "multimodal",
    label: "图 / 视频输入",
    desc: "要看图说话 / 文档 OCR / 多模态 QA",
  },
];

type Recommendation = {
  pick: string;
  picked: "t5" | "flan-t5" | "t5gemma2" | "decoder-only";
  why: string;
  realCase?: string;
  realSource?: string;
};

/* 决策规则：用 set 包含来判 */
function decide(active: Set<FeatureId>): Recommendation {
  const has = (id: FeatureId) => active.has(id);

  /* 0 个特征 = 给个默认建议 */
  if (active.size === 0) {
    return {
      pick: "先看看你的实际需求",
      picked: "decoder-only",
      why: "勾几个左边的特征，告诉我你要干啥再说。普通对话场景 2026 默认就是 decoder-only（Gemini Flash / GPT / Claude Haiku）。",
    };
  }

  /* 工具调用、多模态、长上下文同时要 → 主流 decoder-only */
  if (has("tool_use") && has("long_ctx")) {
    return {
      pick: "Gemini 3.5 Flash 或 GPT 系",
      picked: "decoder-only",
      why: "Agent + 长上下文这个组合 2026 是 decoder-only LLM 的主场。T5 系没有专门优化工具调用，function calling 生态也不在它这边。",
      realCase: "Google I/O 2026 公开 Gemini 3.5 Flash 在 MCP Atlas tool-use 跑 83.6%。",
      realSource: "dev.to · Google I/O 2026 retrospective",
    };
  }

  if (has("multimodal") && has("long_ctx")) {
    return {
      pick: "T5Gemma 2 · 4B-4B",
      picked: "t5gemma2",
      why: "2025-12 Google 出的 T5Gemma 2 就是为这个场景造的：128 K 上下文 + SigLIP vision + encoder-decoder。比同尺寸 Gemma 3 在长文摘要 / 多模态推理上明显强。",
      realCase: "T5Gemma 2 paper · 4B-4B 模型在 long-context summarization 超过 Gemma 3 4B。",
      realSource: "arXiv:2512.14856 · 2025-12-18",
    };
  }

  if (has("small_edge") && has("multimodal")) {
    return {
      pick: "T5Gemma 2 · 270M-270M",
      picked: "t5gemma2",
      why: "270M-270M（总 ~370M）的多模态 encoder-decoder · 设计就是为「on-device 多模态」 · 是目前社区里最小的多模态 enc-dec 之一。",
      realCase: "T5Gemma 2 在 Kaggle / Hugging Face / Vertex AI 全平台开源。",
      realSource: "blog.google 2025-12-18",
    };
  }

  if (has("small_edge") && has("io_strict")) {
    return {
      pick: "FLAN-T5 Base / Small（250M / 80M）",
      picked: "flan-t5",
      why: "FLAN-T5 是 2026 仍在生产用的最经典「小尺寸严格输出」选择 · 量小、跑得快、prompt 一改就换任务、输出格式好控。Adobe Sensei GenAI 还在用。",
      realCase: "Adobe Sensei GenAI 文本生成组件用 google/flan-t5。",
      realSource: "Hugging Face 2026/03 retrospective · Adobe blog",
    };
  }

  if (has("io_strict") && has("multilingual")) {
    return {
      pick: "mT5 / FLAN-T5（多语版本暂用 mT0）",
      picked: "flan-t5",
      why: "严格格式 + 多语种 = encoder-decoder 主场。decoder-only 大模型多语翻译质量好，但 prompt 漂、输出不稳，要做正则后处理。T5 系直接输出字符串。",
      realCase: "客服分类、PII 标签、票据字段抽取等企业场景仍大量用 mT5 / FLAN-T5。",
      realSource: "Hugging Face 2026 hub 检索数据",
    };
  }

  if (has("multilingual") && !has("tool_use")) {
    return {
      pick: "mT5（580M / 1.2B / 3.7B）",
      picked: "flan-t5",
      why: "mT5 在 101 种语言上预训练 · 中小语种翻译、跨语言摘要、跨语言 QA 仍是公开权重里的强项。",
      realCase: "AfroLM、IndicT5 等区域模型都基于 mT5 继续训练。",
      realSource: "Xue et al. arXiv:2010.11934",
    };
  }

  if (has("io_strict")) {
    return {
      pick: "FLAN-T5 Base / Large",
      picked: "flan-t5",
      why: "「输出一定要符合 X 格式」这类任务，FLAN-T5 的 text-to-text 训练方式天然贴合：训练时见过几百种格式，prompt 一换就换任务，输出是字符串、好正则。",
      realCase: "客服意图分类、邮件标签、合同字段抽取等。",
      realSource: "Adobe Sensei · Chung et al. 2022",
    };
  }

  if (has("long_ctx")) {
    return {
      pick: "T5Gemma 2 · 1B-1B 或 4B-4B",
      picked: "t5gemma2",
      why: "长上下文 + 不需要 agent 工具 = T5Gemma 2 直接命中。enc-dec 对 prompt 的 bidirectional 读取在长输入上稳过 decoder-only。",
      realCase: "Google 实测：T5Gemma 2 在 long-context summarization 跟同算力 Gemma 3 比明显领先。",
      realSource: "T5Gemma 2 paper arXiv:2512.14856",
    };
  }

  if (has("tool_use")) {
    return {
      pick: "Gemini 3.5 Flash / Claude Haiku 4 等 decoder-only",
      picked: "decoder-only",
      why: "工具调用、Agent 规划 2026 的训练数据都集中在 decoder-only LLM 这边。T5 系训练里没专门做工具调用语料。",
      realCase: "MCP Atlas、Terminal-Bench 2.1 top 模型都是 decoder-only。",
      realSource: "Google I/O 2026 · DEV blog 2026",
    };
  }

  if (has("multimodal")) {
    return {
      pick: "T5Gemma 2 · 1B-1B 或 4B-4B",
      picked: "t5gemma2",
      why: "想要小尺寸 + 多模态 + 开源，T5Gemma 2 是 2026 第一选择。商业大模型（Gemini / GPT / Claude）那一档不开源。",
      realCase: "T5Gemma 2 上 Hugging Face / Kaggle / Vertex AI 同步开源。",
      realSource: "blog.google 2025-12-18",
    };
  }

  if (has("small_edge")) {
    return {
      pick: "T5Gemma 2 · 270M-270M",
      picked: "t5gemma2",
      why: "270M-270M 的 enc-dec · 比同尺寸 decoder-only 在「读 prompt」上更稳。专门为 on-device 设计。",
      realCase: "Kaggle / Hugging Face / Vertex AI 全开源。",
      realSource: "blog.google 2025-12-18",
    };
  }

  /* 兜底 */
  return {
    pick: "FLAN-T5",
    picked: "flan-t5",
    why: "你选的需求集合没特别极端 · FLAN-T5 仍然是 2026 最经济实惠的「能干就行」开源 seq2seq。",
  };
}

const PICK_TONE: Record<Recommendation["picked"], string> = {
  t5: "bg-butter text-ink",
  "flan-t5": "bg-coral text-cream",
  t5gemma2: "bg-teal text-cream",
  "decoder-only": "bg-ink text-cream",
};

const SectionToday: React.FC = () => {
  const [active, setActive] = useState<Set<FeatureId>>(new Set(["io_strict", "small_edge"]));

  const rec = useMemo(() => decide(active), [active]);

  const toggle = (id: FeatureId) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden bg-butter/15">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Should you use T5 in 2026</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-8">
          <div className="lg:col-span-7">
            <h2 className="font-display text-display-lg text-ink leading-[1.08]">
              2026 还该不该
              <br />
              选 T5 系？
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-ink/75 leading-relaxed">
              通用聊天战场被 decoder-only 拿下了，但 T5 系在「严格输出 / 边缘部署 / 多语种 / 长上下文 enc-dec」这些角落仍活着。勾下你的需求，给你点一个。
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* 左：勾选组合 */}
          <div className="lg:col-span-5">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp-lg p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                ① 勾选你的需求（可多选）
              </div>
              <div className="space-y-2.5">
                {FEATURES.map((f) => {
                  const on = active.has(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggle(f.id)}
                      className={[
                        "w-full text-left flex items-start gap-3 px-3.5 py-3 rounded-xl border-2 border-ink transition-all duration-250 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[3px_3px_0_0_#E07A5F]"
                          : "bg-white text-ink/75 hover:bg-cream hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "mt-0.5 flex items-center justify-center w-5 h-5 rounded border-2 border-ink font-mono text-[12px] font-extrabold flex-shrink-0",
                          on ? "bg-butter text-ink" : "bg-white text-transparent",
                        ].join(" ")}
                      >
                        ✓
                      </span>
                      <div>
                        <div className="font-display text-[14.5px] font-bold leading-snug">
                          {f.label}
                        </div>
                        <div
                          className={[
                            "font-mono text-[11px] leading-snug mt-0.5",
                            on ? "text-cream/65" : "text-ink/55",
                          ].join(" ")}
                        >
                          {f.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="font-mono text-[10px] text-ink/45 tabular-nums">
                  选了 {active.size} / {FEATURES.length}
                </div>
                <button
                  onClick={() => setActive(new Set())}
                  className="font-mono text-[10.5px] underline text-ink/55 hover:text-coral"
                >
                  清空
                </button>
              </div>
            </div>
          </div>

          {/* 右：推荐 */}
          <div className="lg:col-span-7">
            <div
              key={Array.from(active).sort().join("-")}
              className="bg-white border-2 border-ink rounded-2xl shadow-stamp-xl p-6 lg:p-7 animate-enter-fade"
            >
              <div className="flex items-baseline justify-between mb-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ② 给你点这个
                </div>
                <div
                  className={[
                    "px-2.5 py-1 rounded-full border-2 border-ink font-mono text-[10px] font-extrabold tracking-[0.1em] uppercase",
                    PICK_TONE[rec.picked],
                  ].join(" ")}
                >
                  {rec.picked === "decoder-only" ? "不是 T5" : rec.picked.replace("-", " ")}
                </div>
              </div>

              <h3 className="font-display text-[28px] lg:text-[32px] font-extrabold text-ink leading-tight mb-3">
                {rec.pick}
              </h3>

              <p className="text-[14.5px] text-ink/80 leading-relaxed mb-5">
                {rec.why}
              </p>

              {rec.realCase && (
                <div className="px-4 py-3 bg-cream border-2 border-ink/20 rounded-xl mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1">
                    生产案例
                  </div>
                  <p className="text-[13.5px] text-ink leading-relaxed">
                    {rec.realCase}
                  </p>
                </div>
              )}

              {rec.realSource && (
                <div className="font-mono text-[10px] text-ink/45">
                  来源：{rec.realSource}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 底部硬规则 */}
        <div className="mt-8 px-5 py-4 bg-ink text-cream rounded-2xl">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-butter mb-2">
            一句话总结
          </div>
          <p className="text-[14.5px] leading-relaxed">
            T5 思想（text-to-text）在 2026 还活着，但藏在两个地方：① FLAN-T5 在「严格输出 + 小尺寸」企业场景仍然在跑；② Google 用 T5Gemma 2 把 encoder-decoder 路线重启 · 专攻长上下文 + 多模态。通用对话 / Agent 战场仍是 decoder-only 的天下。
          </p>
          <p className="mt-2 font-mono text-[10px] text-cream/55">
            来源：blog.google 2025-12-18 · Hugging Face 2026/05 数据 · arXiv:2512.14856
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionToday;
