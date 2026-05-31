/**
 * Section 06 · 三种模式怎么选 · 横向对比
 *
 * 维度：灵活性 / Token 成本 / 延迟 / 容错能力
 * 每个模式在每维度上 1-3 分。
 *
 * 交互：勾选你最在意的维度（多选）→ 表格里对应行高亮，每行最高分 cell 额外强调；
 *      底部"按你的需求推荐"会按勾选维度累加得分，给出最匹配的模式。
 *
 * L3 勾选组合 + 实时反映推荐 —— 跟 S7 都涉及勾选，但 S6 = 多维度评估，S7 = 安全保险叠加，
 * 语义和视觉完全不同。
 */
import React, { useMemo, useState } from "react";
import { Trophy, Activity, Coins, Timer, Shield } from "lucide-react";

type DimId = "flex" | "cost" | "latency" | "tolerance";

type Dim = {
  id: DimId;
  label: string;
  hint: string;
  icon: React.ElementType;
};

const DIMS: Dim[] = [
  {
    id: "flex",
    label: "灵活性",
    hint: "能不能边做边改策略",
    icon: Activity,
  },
  {
    id: "cost",
    label: "Token 成本",
    hint: "贵不贵 · 越低越好",
    icon: Coins,
  },
  {
    id: "latency",
    label: "延迟",
    hint: "出结果快不快 · 越快越好",
    icon: Timer,
  },
  {
    id: "tolerance",
    label: "容错能力",
    hint: "出错时能不能挽回",
    icon: Shield,
  },
];

// 1-3 分（分数 = "在这个维度上表现好"）
type Score = 1 | 2 | 3;

type ModeRow = {
  id: "react" | "plan" | "reflexion";
  name: string;
  cn: string;
  decision: string;
  fit: string;
  scores: Record<DimId, Score>;
  detail: Record<DimId, string>;
};

const ROWS: ModeRow[] = [
  {
    id: "react",
    name: "ReAct",
    cn: "边想边做",
    decision: "每步都推理",
    fit: "路径不确定",
    scores: { flex: 3, cost: 1, latency: 2, tolerance: 3 },
    detail: {
      flex: "每一步都可独立决策，方向随时调",
      cost: "每轮都调 LLM，步骤多就贵",
      latency: "中等 · 每步一次 LLM 调用",
      tolerance: "异常发生当轮就能感知并修正",
    },
  },
  {
    id: "plan",
    name: "Plan-and-Execute",
    cn: "先想好再做",
    decision: "先规划后执行",
    fit: "步骤明确",
    scores: { flex: 1, cost: 3, latency: 3, tolerance: 1 },
    detail: {
      flex: "执行阶段几乎不调整",
      cost: "LLM 只调用 1 次做规划，最省",
      latency: "执行阶段是确定逻辑，最快",
      tolerance: "计划错或环境变就跑偏",
    },
  },
  {
    id: "reflexion",
    name: "Reflexion",
    cn: "做完回头看",
    decision: "执行后反思改进",
    fit: "需要迭代提升",
    scores: { flex: 2, cost: 1, latency: 1, tolerance: 3 },
    detail: {
      flex: "反思后下一轮可换路，但单轮内类 ReAct",
      cost: "比 ReAct 还多一次反思调用，最贵",
      latency: "至少 2 轮执行 + 反思，延迟最高",
      tolerance: "从失败中学习，长期容错最强",
    },
  },
];

const SectionModesCompare: React.FC = () => {
  type DimSet = Set<DimId>;
  // 默认全选
  const [selected, setSelected] = useState(
    new Set(DIMS.map((d) => d.id)) as DimSet,
  );

  const toggle = (id: DimId) => {
    setSelected((s) => {
      const next = new Set(s) as DimSet;
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 找各列在勾选维度下的累加分
  const scoreByMode = useMemo(() => {
    return ROWS.map((row) => {
      let total = 0;
      selected.forEach((d) => {
        total += row.scores[d];
      });
      return { id: row.id, name: row.name, total };
    });
  }, [selected]);

  // 每个维度行内"最高分模式"
  const winnerByDim = useMemo(() => {
    type ModeKey = "react" | "plan" | "reflexion";
    const map: Partial<Record<DimId, ModeKey>> = {};
    DIMS.forEach((d) => {
      let best: ModeRow | null = null;
      ROWS.forEach((r) => {
        if (!best || r.scores[d.id] > best.scores[d.id]) best = r;
      });
      if (best) map[d.id] = best.id;
    });
    return map;
  }, []);

  const top = useMemo(() => {
    if (selected.size === 0) return null;
    const sorted = [...scoreByMode].sort((a, b) => b.total - a.total);
    if (sorted.length < 2 || sorted[0].total === sorted[1].total) {
      return { tie: true, items: sorted };
    }
    return { tie: false, items: sorted };
  }, [scoreByMode, selected]);

  return (
    <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
      <div className="relative max-w-[1180px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Compare · 横向五维对照</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[860px] leading-tight">
          先想清楚{" "}
          <span className="inline-block bg-butter px-2 -mx-2 -mb-1 pb-1">
            你最在意哪个维度
          </span>
          ，再选模式。
        </h2>
        <p className="font-sans text-[16px] text-ink/75 max-w-[720px] mt-5 leading-relaxed">
          下面 4 个维度，按你的实际场景勾选。表格里会高亮你勾的行 +
          每行最强模式，底部按权重给个推荐。
        </p>

        {/* 维度筛选 chip */}
        <div className="mt-9">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink/55 mb-3">
            勾你在意的维度（多选）
          </div>
          <div className="flex flex-wrap gap-2">
            {DIMS.map((d) => {
              const isOn = selected.has(d.id);
              const Icon = d.icon;
              return (
                <button
                  key={d.id}
                  onClick={() => toggle(d.id)}
                  title={d.hint}
                  className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-ink font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
                    isOn
                      ? "bg-coral text-white shadow-stamp"
                      : "bg-white text-ink/55 hover:text-ink hover:shadow-stamp"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  {d.label}
                  <span
                    className={`w-4 h-4 rounded-full border-2 border-ink flex items-center justify-center text-[9px] font-mono font-bold ${isOn ? "bg-white text-ink" : "bg-cream text-ink/40"}`}
                  >
                    {isOn ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 表格 */}
        <div className="mt-8 bg-white border-2 border-ink rounded-3xl shadow-stamp-lg overflow-hidden">
          {/* 表头 */}
          <div className="grid grid-cols-[140px_repeat(3,1fr)] border-b-2 border-ink">
            <div className="p-4 bg-ink text-cream font-mono text-[10.5px] uppercase tracking-[0.22em] flex items-center">
              维度
            </div>
            {ROWS.map((r) => (
              <div
                key={r.id}
                className="p-4 border-l-2 border-ink bg-ink/95"
              >
                <div className="font-display font-extrabold text-cream text-[15px] leading-tight">
                  {r.name}
                </div>
                <div className="font-mono text-[10.5px] text-cream/55 tracking-wider mt-0.5">
                  {r.cn}
                </div>
              </div>
            ))}
          </div>

          {/* 决策方式行（静态描述） */}
          <DescriptionRow
            label="决策方式"
            values={ROWS.map((r) => r.decision)}
          />
          <DescriptionRow
            label="适合场景"
            values={ROWS.map((r) => r.fit)}
          />

          {/* 可评分维度行 */}
          {DIMS.map((d) => {
            const isSelected = selected.has(d.id);
            const winner = winnerByDim[d.id];
            return (
              <div
                key={d.id}
                className={`grid grid-cols-[140px_repeat(3,1fr)] border-t-2 border-ink/12 transition-colors duration-250 ${isSelected ? "bg-butter/25" : "bg-white opacity-60"}`}
              >
                <div className="p-4 border-r-2 border-ink/12 flex items-center gap-2">
                  <d.icon className="w-3.5 h-3.5 text-ink/65" strokeWidth={2.2} />
                  <div>
                    <div className="font-sans font-bold text-[13px] text-ink">
                      {d.label}
                    </div>
                    <div className="font-mono text-[9.5px] text-ink/55 mt-0.5">
                      {d.hint}
                    </div>
                  </div>
                </div>
                {ROWS.map((r) => {
                  const score = r.scores[d.id];
                  const isWinner = isSelected && winner === r.id;
                  return (
                    <div
                      key={r.id}
                      className={`p-4 border-l-2 border-ink/12 transition-all ${isWinner ? "bg-coral/15" : ""}`}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <ScorePips score={score} />
                        {isWinner && (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-coral text-white font-mono text-[9px] font-bold">
                            <Trophy className="w-2.5 h-2.5" strokeWidth={2.5} />
                            最佳
                          </span>
                        )}
                      </div>
                      <div className="font-sans text-[12px] text-ink/75 leading-relaxed">
                        {r.detail[d.id]}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* 推荐结论 */}
        <div className="mt-8 bg-ink text-cream rounded-3xl border-2 border-ink shadow-stamp-lg p-6 lg:p-7">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-cream/55 mb-2">
            按你勾的 {selected.size} 个维度推荐
          </div>
          {selected.size === 0 ? (
            <p className="font-sans text-[15px] text-cream/85 leading-relaxed">
              你一个维度都没勾 —— 那就看上面"适合场景"那行，按场景对号入座吧。
            </p>
          ) : top?.tie ? (
            <p className="font-sans text-[16px] text-cream/90 leading-relaxed">
              你勾的维度让 <span className="font-bold text-butter">{top.items.filter((i) => i.total === top.items[0].total).map((i) => i.name).join(" / ")}</span> 打平。
              可以再勾或减一个维度，或者按"适合场景"决定。
            </p>
          ) : (
            <div className="flex flex-wrap items-end gap-4 lg:gap-6">
              <div>
                <div className="font-mono text-[10.5px] uppercase tracking-wider text-butter mb-1">
                  推荐
                </div>
                <div className="font-display font-extrabold text-[36px] text-butter leading-none">
                  {top!.items[0].name}
                </div>
              </div>
              <div className="font-mono text-[12px] text-cream/55 mb-1.5 space-y-0.5">
                {top!.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={idx === 0 ? "text-cream" : "text-cream/45"}
                  >
                    {idx === 0 ? "▸" : "·"} {item.name} · 得分 {item.total}
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="font-serif italic text-[13px] text-cream/55 mt-4 max-w-[700px] leading-relaxed">
            实际工程里这三种经常混着用：Plan-and-Execute 做顶层框架，每个子步骤用 ReAct 处理不确定性，整体再加 Reflexion 做复盘。
          </p>
        </div>
      </div>
    </section>
  );
};

/* ────── 子件 ────── */

const ScorePips: React.FC<{ score: Score }> = ({ score }) => (
  <div className="inline-flex items-center gap-0.5">
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className={`w-2.5 h-2.5 rounded-sm border border-ink ${i <= score ? "bg-ink" : "bg-cream"}`}
      />
    ))}
    <span className="ml-1.5 font-mono text-[10px] text-ink/55">
      {score}/3
    </span>
  </div>
);

const DescriptionRow: React.FC<{ label: string; values: string[] }> = ({
  label,
  values,
}) => (
  <div className="grid grid-cols-[140px_repeat(3,1fr)] border-t-2 border-ink/12">
    <div className="p-4 border-r-2 border-ink/12 bg-cream/30">
      <div className="font-sans font-bold text-[13px] text-ink">{label}</div>
    </div>
    {values.map((v, i) => (
      <div
        key={i}
        className="p-4 border-l-2 border-ink/12 font-sans text-[13px] text-ink/85"
      >
        {v}
      </div>
    ))}
  </div>
);

export default SectionModesCompare;
