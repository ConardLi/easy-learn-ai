/**
 * 发展历程页 · 2026 完整数据
 *
 * 数据范围：2020.05（GPT-3）→ 2026.05（Gemini 3.5 Flash）
 * 设计：
 *   ─ HERO + 4 个统计数字
 *   ─ 顶部类型 chip 过滤（全部 / 闭源 / 开源 / 推理模型）
 *   ─ 按年份倒序展示（最新在上），每年内按月份倒序
 *   ─ 每个事件 = stamp 卡，含月份徽章 + 模型名 + 厂商 + 类型标签 + 一句话
 *
 * 数据来源：各官方博客 / 论文 / 2026.05 行业综述
 */
import React, { useMemo, useState } from "react";

type ModelType = "closed" | "open" | "reasoning" | "multimodal";

interface Event {
  month: string;
  name: string;
  by: string;
  type: ModelType;
  note: string;
}

interface YearBlock {
  year: number | string;
  events: Event[];
}

const TIMELINE: YearBlock[] = [
  {
    year: 2026,
    events: [
      {
        month: "Q2",
        name: "DeepSeek-V4",
        by: "DeepSeek",
        type: "open",
        note: "开源延续：推理优化、math/coding 强势，成本进一步降低。",
      },
      {
        month: "05",
        name: "Gemini 3.5 Flash",
        by: "Google",
        type: "multimodal",
        note: "Flash 级别比肩旗舰模型，$1.50 / $9 极致定价，4× 输出速度。",
      },
      {
        month: "04",
        name: "GPT-5.5「Spud」",
        by: "OpenAI",
        type: "closed",
        note: "Artificial Analysis Intelligence Index 第一，agentic / planning 领先。",
      },
      {
        month: "04",
        name: "Claude Opus 4.7",
        by: "Anthropic",
        type: "closed",
        note: "SWE-bench Pro 87.6%，全球代码 benchmark 第一；首支持高分辨率图像。",
      },
      {
        month: "02",
        name: "Gemini 3.1 Pro",
        by: "Google",
        type: "closed",
        note: "1 M 上下文标配，$2 / $12 价格屠夫；ARC-AGI-2 突破 77%。",
      },
    ],
  },
  {
    year: 2025,
    events: [
      {
        month: "H2",
        name: "GPT-5 · Claude 4 · Gemini 3.0",
        by: "OpenAI · Anthropic · Google",
        type: "closed",
        note: "全行业进入「4 字头」与「5 字头」时代，推理能力成为标配。",
      },
      {
        month: "04",
        name: "Llama 4 · o3 / o4-mini",
        by: "Meta · OpenAI",
        type: "open",
        note: "Llama 4 持续推动开源前沿；o3 全公开，推理模型大众化。",
      },
      {
        month: "03",
        name: "Claude 3.7 + Extended Thinking",
        by: "Anthropic",
        type: "reasoning",
        note: "首个可控制「思考时间」的混合模型，长 horizon 任务突破。",
      },
      {
        month: "02",
        name: "Qwen 3 · GPT-4.5 · Grok 3 · Gemini 2.5 Pro",
        by: "阿里 · OpenAI · xAI · Google",
        type: "multimodal",
        note: "2025 春季前沿模型集中发布，多模态全面升级。",
      },
      {
        month: "01",
        name: "DeepSeek-R1",
        by: "DeepSeek",
        type: "reasoning",
        note: "🌟 开源推理震撼业界 —— 性能比肩 o1，成本降至 1/10，全球开源圈轰动。",
      },
    ],
  },
  {
    year: 2024,
    events: [
      {
        month: "12",
        name: "Gemini 2.0 Flash · DeepSeek-V3",
        by: "Google · DeepSeek",
        type: "multimodal",
        note: "Gemini 2.0 原生多模态 + agent；DeepSeek-V3 671B MoE 训练仅 $558 万。",
      },
      {
        month: "11",
        name: "Claude 3.5 Haiku · Llama 3.2 Vision",
        by: "Anthropic · Meta",
        type: "multimodal",
        note: "小模型也开始支持视觉理解。",
      },
      {
        month: "10",
        name: "Claude Computer Use",
        by: "Anthropic",
        type: "closed",
        note: "首个能直接操作屏幕的 agent，Agentic 元年开端。",
      },
      {
        month: "09",
        name: "OpenAI o1-preview",
        by: "OpenAI",
        type: "reasoning",
        note: "🌟 推理模型时代正式开启，AIME 数学竞赛突破 80%。",
      },
      {
        month: "07",
        name: "Llama 3.1 405B",
        by: "Meta",
        type: "open",
        note: "🌟 开源首次追平闭源旗舰，15 T token 训练。",
      },
      {
        month: "06",
        name: "Claude 3.5 Sonnet",
        by: "Anthropic",
        type: "closed",
        note: "代码能力跃迁，SWE-bench Verified 49% → 长期领跑。",
      },
      {
        month: "05",
        name: "GPT-4o",
        by: "OpenAI",
        type: "multimodal",
        note: "原生多模态，端到端音频、实时语音对话。",
      },
      {
        month: "04",
        name: "Llama 3 (8B/70B)",
        by: "Meta",
        type: "open",
        note: "开源模型质量大幅提升，社区生态爆发。",
      },
      {
        month: "03",
        name: "Claude 3 Opus / Sonnet / Haiku",
        by: "Anthropic",
        type: "closed",
        note: "200 K 上下文 + 强推理，Anthropic 跻身第一梯队。",
      },
      {
        month: "02",
        name: "Gemini 1.5 Pro",
        by: "Google",
        type: "multimodal",
        note: "🌟 1 M 上下文创纪录，整本小说 / 整套代码可一次处理。",
      },
    ],
  },
  {
    year: 2023,
    events: [
      {
        month: "11",
        name: "GPT-4 Turbo · Grok-1 · Yi",
        by: "OpenAI · xAI · 零一万物",
        type: "closed",
        note: "128 K 上下文成新标准；xAI、零一万物等新玩家入场。",
      },
      {
        month: "09",
        name: "Mistral 7B",
        by: "Mistral AI",
        type: "open",
        note: "小而美的开源典范，效率 / 质量比领先。",
      },
      {
        month: "07",
        name: "LLaMA 2",
        by: "Meta",
        type: "open",
        note: "🌟 首个商用许可的强大开源模型，点燃开源大火。",
      },
      {
        month: "05",
        name: "PaLM 2 · ChatGLM · 通义千问 · 文心一言",
        by: "Google · 智谱 · 阿里 · 百度",
        type: "closed",
        note: "中国大模型集中发布，国内 LLM 元年。",
      },
      {
        month: "03",
        name: "GPT-4 · Claude",
        by: "OpenAI · Anthropic",
        type: "multimodal",
        note: "GPT-4 多模态首秀；Claude 主打安全对齐。",
      },
      {
        month: "02",
        name: "LLaMA 1",
        by: "Meta",
        type: "open",
        note: "🌟 开源火种被点燃，斯坦福 Alpaca 等迅速跟进。",
      },
    ],
  },
  {
    year: 2022,
    events: [
      {
        month: "11",
        name: "ChatGPT",
        by: "OpenAI",
        type: "closed",
        note: "🚀 5 天破百万用户、2 个月破亿，开启 LLM 大众化时代。",
      },
    ],
  },
  {
    year: 2020,
    events: [
      {
        month: "05",
        name: "GPT-3",
        by: "OpenAI",
        type: "closed",
        note: "🌟 175 B 参数，少样本学习能力震撼业界，LLM 元年。",
      },
    ],
  },
];

const TYPE_META: Record<ModelType, { label: string; bg: string; text: string }> = {
  closed: { label: "闭源", bg: "bg-ink", text: "text-cream" },
  open: { label: "开源", bg: "bg-teal", text: "text-white" },
  reasoning: { label: "推理", bg: "bg-coral", text: "text-white" },
  multimodal: { label: "多模态", bg: "bg-butter", text: "text-ink" },
};

const FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "全部" },
  { id: "closed", label: "闭源" },
  { id: "open", label: "开源" },
  { id: "reasoning", label: "推理模型" },
  { id: "multimodal", label: "多模态" },
];

const TimelinePage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return TIMELINE;
    return TIMELINE.map((year) => ({
      ...year,
      events: year.events.filter((e) => e.type === filter),
    })).filter((y) => y.events.length > 0);
  }, [filter]);

  const totalCount = useMemo(
    () =>
      filtered.reduce((sum, y) => sum + y.events.length, 0),
    [filtered],
  );

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="px-4 sm:px-6 lg:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="eyebrow mb-4">§ 04 · 发展历程</div>
          <h1 className="font-display text-display-xl text-ink mb-5 animate-enter-up">
            6 年，从 GPT-3 到{" "}
            <span className="relative inline-block">
              <span className="relative z-10">2026 全景</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-4 lg:h-5 bg-butter -z-0"
                aria-hidden
              />
            </span>
          </h1>
          <p className="font-sans text-[16px] lg:text-[18px] text-ink/70 max-w-2xl mx-auto leading-relaxed">
            2020 年 GPT-3 还是「学术新闻」，2026 年 Gemini Spark 已经 24 小时帮你处理事务。
            这是一份持续更新的、按年份倒序的关键节点清单。
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 sm:px-6 lg:px-8 mb-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: "100+", label: "全球关键模型发布", note: "2020–2026" },
            { num: "1000×", label: "上下文长度增长", note: "2 K → 2 M" },
            { num: "30 d", label: "2026 春最密集 19 款", note: "4 月–5 月" },
            { num: "1/10", label: "推理模型成本降幅", note: "R1 vs o1" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border-2 border-ink rounded-2xl p-4 shadow-stamp text-center"
            >
              <div className="font-display font-extrabold text-[28px] text-ink leading-none mb-2">
                {s.num}
              </div>
              <div className="font-sans font-bold text-[12px] text-ink mb-1 leading-tight">
                {s.label}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-ink/45">
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FILTERS */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8 sticky top-16 z-10 bg-cream/95 backdrop-blur py-3 border-y-2 border-ink">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 border-2 border-ink rounded-full font-sans font-bold text-[12px] transition-all duration-200 ease-spring ${
                    active
                      ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                      : "bg-white text-ink hover:bg-butter hover:-translate-y-[1px]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
            <span className="font-bold text-ink">{totalCount}</span> 个事件
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* 垂直竖线 */}
            <div className="absolute left-[28px] top-2 bottom-2 w-[3px] bg-ink hidden sm:block" aria-hidden />

            <div className="space-y-12">
              {filtered.map((year) => (
                <div key={year.year} className="relative">
                  {/* 年份节点 */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative z-10 flex-shrink-0 w-14 h-14 bg-butter border-2 border-ink rounded-full flex items-center justify-center shadow-stamp">
                      <span className="font-display font-extrabold text-[16px] text-ink leading-none">
                        '{String(year.year).slice(2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 mb-0.5">
                        Year
                      </div>
                      <div className="font-display font-extrabold text-[26px] text-ink leading-none">
                        {year.year}
                      </div>
                    </div>
                  </div>

                  {/* 当年事件 */}
                  <div className="ml-0 sm:ml-[72px] space-y-3">
                    {year.events.map((e, i) => {
                      const meta = TYPE_META[e.type];
                      return (
                        <div
                          key={`${e.name}-${i}`}
                          className="group bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5 transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
                        >
                          <div className="flex items-start gap-4">
                            {/* 月份徽章 */}
                            <div className="flex-shrink-0 inline-flex items-center justify-center min-w-[44px] h-9 bg-cream border-2 border-ink rounded-lg px-2">
                              <span className="font-mono font-bold text-[12px] text-ink uppercase tracking-wide">
                                {e.month}
                              </span>
                            </div>

                            {/* 内容 */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-3 mb-1 flex-wrap">
                                <h3 className="font-display font-extrabold text-[15px] lg:text-[17px] text-ink">
                                  {e.name}
                                </h3>
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-0.5 ${meta.bg} ${meta.text} rounded-md font-mono text-[10px] uppercase tracking-wide font-bold flex-shrink-0`}
                                >
                                  {meta.label}
                                </span>
                              </div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55 mb-2">
                                {e.by}
                              </div>
                              <p className="font-sans text-[13px] text-ink/70 leading-relaxed">
                                {e.note}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 持续更新提示 */}
          <div className="mt-12 px-5 py-4 bg-white border-2 border-ink rounded-2xl shadow-stamp text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1">
              § 持续更新
            </div>
            <p className="font-sans text-[13px] text-ink/70">
              数据基于 2026 年 5 月公开信息。Gemini 3.5 Pro / GPT-5.6 / Claude Sonnet 4.8 等
              6 月预期发布的模型将在第一时间补充。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TimelinePage;
