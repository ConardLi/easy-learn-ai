/**
 * SectionWhereFrom · 数据从哪来（L3 勾选拼配 → 实时算覆盖面 + 成本/风险）
 *
 * 交互：四个来源（网页抓取 / 公开数据集 / 人工编写 / 模型合成）可勾可取消，
 *   右侧实时算出「覆盖广度 / 平均质量 / 成本」三条示意条 + 一句搭配点评。
 * 分锅：只讲来源，不讲怎么洗（→ 数据清洗站）、怎么标（→ 数据标注站）。
 */
import React, { useMemo, useState } from "react";
import { Globe, Database, PenLine, Bot, Check } from "lucide-react";

type SrcKey = "web" | "open" | "human" | "synth";

const SOURCES: Record<
  SrcKey,
  { label: string; icon: React.ElementType; desc: string; breadth: number; quality: number; cost: number }
> = {
  web: {
    label: "网页抓取",
    icon: Globe,
    desc: "从全网爬文章、论坛、百科。量大、便宜，但脏、杂、版权风险高。",
    breadth: 40,
    quality: 8,
    cost: 6,
  },
  open: {
    label: "公开数据集",
    icon: Database,
    desc: "别人整理好、可下载的现成数据集。省事、质量较稳，但别人也都在用。",
    breadth: 22,
    quality: 22,
    cost: 10,
  },
  human: {
    label: "人工编写",
    icon: PenLine,
    desc: "雇人专门写问答、改答案。质量最高、最贴需求，但慢、贵。",
    breadth: 14,
    quality: 38,
    cost: 42,
  },
  synth: {
    label: "模型合成",
    icon: Bot,
    desc: "用强模型批量造数据。来得快、想要啥造啥，但可能学到模型自己的毛病。",
    breadth: 26,
    quality: 20,
    cost: 18,
  },
};

const ORDER: SrcKey[] = ["web", "open", "human", "synth"];

const SectionWhereFrom: React.FC = () => {
  const [on, setOn] = useState<Record<SrcKey, boolean>>({
    web: true,
    open: false,
    human: false,
    synth: false,
  });

  const toggle = (k: SrcKey) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const { breadth, quality, cost, chosen } = useMemo(() => {
    const chosen = ORDER.filter((k) => on[k]);
    let breadth = 0;
    let cost = 0;
    let qSum = 0;
    chosen.forEach((k) => {
      breadth += SOURCES[k].breadth;
      cost += SOURCES[k].cost;
      qSum += SOURCES[k].quality;
    });
    const quality = chosen.length ? Math.round(qSum / chosen.length) : 0;
    return { breadth: Math.min(breadth, 100), quality: Math.min(quality, 100), cost: Math.min(cost, 100), chosen };
  }, [on]);

  const verdict = useMemo(() => {
    if (chosen.length === 0) return "一种都不选，模型没料可学。至少挑一个。";
    if (chosen.length === 1 && on.web) return "只靠网页：量够大，但又脏又杂，得花大力气清洗。";
    if (chosen.length === 1 && on.human) return "只靠人工：质量顶，但又慢又贵，量根本堆不起来。";
    if (chosen.length >= 3) return "多来源混着用：覆盖广、质量也补齐了，这正是真实大模型的做法。";
    return "几种搭着用，互相补短板 —— 这就是配比的活儿。";
  }, [chosen, on]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Where It Comes From</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          这么多材料，到底从哪弄来？
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          数据主要有四个来源，各有各的好和各的坑。
          勾选你想用的来源，右边实时看
          <span className="font-bold text-ink">覆盖广度、平均质量、成本</span>怎么变。
        </p>

        <div className="mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 勾选区 */}
          <div className="lg:col-span-7 space-y-3">
            {ORDER.map((k) => {
              const s = SOURCES[k];
              const Icon = s.icon;
              const active = on[k];
              return (
                <button
                  key={k}
                  onClick={() => toggle(k)}
                  className={[
                    "w-full flex items-start gap-4 border-2 border-ink rounded-2xl px-5 py-4 text-left transition-all duration-250 ease-spring",
                    active ? "bg-white shadow-stamp -translate-y-0.5" : "bg-cream/60 hover:bg-cream",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-ink transition-colors",
                      active ? "bg-teal" : "bg-white",
                    ].join(" ")}
                  >
                    {active ? (
                      <Check className="h-4 w-4 text-cream" strokeWidth={3} />
                    ) : (
                      <Icon className="h-3.5 w-3.5 text-ink" strokeWidth={2.2} />
                    )}
                  </span>
                  <span>
                    <span className="font-display font-bold text-[16px] text-ink">{s.label}</span>
                    <span className="block mt-1 font-sans text-[14px] leading-[1.65] text-ink/70">
                      {s.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* 实时面板 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-4">
                这套配比的效果（示意）
              </div>
              <Bar label="覆盖广度" value={breadth} color="#1B4B5A" />
              <Bar label="平均质量" value={quality} color="#E07A5F" />
              <Bar label="成本投入" value={cost} color="#FF4D74" />
              <div className="mt-5 bg-ink text-cream rounded-2xl px-5 py-4 flex-1 flex items-center">
                <p className="font-display font-bold text-[15px] leading-[1.6]">{verdict}</p>
              </div>
              <p className="mt-3 font-mono text-[10px] text-ink/40 leading-relaxed">
                示意数值，帮你感受搭配取舍，不是精确统计。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Bar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex justify-between items-baseline mb-1.5">
      <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/55">{label}</span>
      <span className="font-display font-bold text-[15px] text-ink">{value}</span>
    </div>
    <div className="h-3 bg-cream border-2 border-ink rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-400 ease-spring"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  </div>
);

export default SectionWhereFrom;
