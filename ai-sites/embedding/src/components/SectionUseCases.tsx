import React, { useMemo, useState } from "react";
import { BadgeCheck, CircleSlash, FileSearch, GitCompare, ListFilter, Rows } from "lucide-react";

type ScenarioId = "semantic" | "recommend" | "dedupe" | "exact";

const SCENARIOS = [
  {
    id: "semantic" as const,
    title: "按意思搜文档",
    icon: FileSearch,
    fit: 94,
    verdict: "很适合",
    reason: "用户说法经常和文档原文不一样，Embedding 能把近义说法拉到一起。",
  },
  {
    id: "recommend" as const,
    title: "推荐相似内容",
    icon: Rows,
    fit: 86,
    verdict: "适合",
    reason: "文章、商品、工单、图片都可以先变成数字，再找意思或内容接近的那几个。",
  },
  {
    id: "dedupe" as const,
    title: "合并重复问题",
    icon: GitCompare,
    fit: 78,
    verdict: "适合做第一筛",
    reason: "能快速发现意思接近的条目，但最终合并前最好让人或规则再看一眼。",
  },
  {
    id: "exact" as const,
    title: "查编号和金额",
    icon: CircleSlash,
    fit: 32,
    verdict: "单独用不稳",
    reason: "订单号、合同号、金额、日期需要精确匹配，应该优先用关键词、筛选条件或数据库查询。",
  },
];

const SectionUseCases: React.FC = () => {
  const [active, setActive] = useState<ScenarioId>("semantic");
  const [hybrid, setHybrid] = useState(true);
  const scenario = SCENARIOS.find((item) => item.id === active)!;
  const score = useMemo(() => Math.min(100, scenario.fit + (hybrid && active === "exact" ? 38 : 0)), [active, hybrid, scenario.fit]);
  const Icon = scenario.icon;

  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">when to use it</span>
        </div>

        <div className="mb-10 max-w-3xl">
          <h2 className="mb-5 font-display text-display-lg text-ink">
            要找“意思像”，
            <br />
            它就派得上用场。
          </h2>
          <div className="space-y-3 text-[15.5px] leading-relaxed text-ink/70">
            <p>
              Embedding 最适合处理“说法不同，但意思接近”的任务。
            </p>
            <p>
              如果任务要求一字不差地命中某个编号，先别只靠它。把它和关键词、筛选条件一起用，会稳很多。
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {SCENARIOS.map((item) => {
              const ItemIcon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={[
                    "flex items-center gap-3 rounded-2xl border-2 border-ink p-4 text-left transition-all duration-250 ease-spring",
                    active === item.id ? "bg-butter shadow-stamp" : "bg-cream hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp",
                  ].join(" ")}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-ink bg-white">
                    <ItemIcon className="h-5 w-5 text-ink" strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block font-display text-[17px] font-bold leading-tight text-ink">{item.title}</span>
                    <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                      fit {item.fit}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
            <div className="mb-5 flex items-center gap-4 rounded-2xl border-2 border-ink bg-white p-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-ink bg-teal text-cream shadow-stamp">
                <Icon className="h-7 w-7" strokeWidth={2.5} />
              </span>
              <div className="min-w-0">
                <div className="font-display text-[24px] font-bold leading-tight text-ink">{scenario.title}</div>
                <div className="mt-1 inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-butter px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink">
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
                  {scenario.verdict}
                </div>
              </div>
            </div>

            <p className="mb-5 min-h-[70px] text-[15px] leading-relaxed text-ink/70">
              {scenario.reason}
            </p>

            <div className="rounded-2xl border-2 border-ink bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/50">
                  推荐程度
                </span>
                <span className="font-mono text-[24px] font-bold text-ink">{score}</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full border-2 border-ink bg-cream">
                <div className={score > 75 ? "h-full bg-teal" : score > 55 ? "h-full bg-butter" : "h-full bg-coral"} style={{ width: `${score}%` }} />
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border-2 border-ink bg-cream px-3 py-3">
                <input
                  type="checkbox"
                  checked={hybrid}
                  onChange={(event) => setHybrid(event.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#241C15]"
                />
                <span>
                  <span className="flex items-center gap-2 font-display text-[15px] font-bold text-ink">
                    <ListFilter className="h-4 w-4" strokeWidth={2.4} />
                    同时打开关键词和筛选条件
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-ink/60">
                    对精确编号、日期、金额很有帮助。对按意思搜文档，也能少找回不相关的内容。
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionUseCases;
