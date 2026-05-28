/**
 * 日报 archive 列表 · 报纸目录风
 *
 * 隐喻：杂志 / 数字简报的"往期目录"
 *
 * 渲染模式：
 *   - groups Map 传入 → 按月/年分组渲染，每组一个 mono volume head + 该组 issue 行
 *   - groups 未传 → 平铺渲染
 *
 * 月分组标题用 "Vol.MM / YYYY 年 M 月  ······  N ISSUES" 报纸风
 *
 * issueNumberMap：父层传入 date → № 编号的映射
 *   (因为编号要基于"日报在全集中的序号"，而非分组内顺序，否则切排序会乱)
 *
 * 三态：loading / error / empty 都用 stamp 风容器
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { DailyReport } from "../../types/daily";
import { DailyCard } from "./DailyCard";

interface DailyListProps {
  dailyList: DailyReport[];
  groups?: Map<string, DailyReport[]>;
  loading: boolean;
  error: string | null;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  /** date → 全集中的 № 编号 */
  issueNumberMap?: Map<string, number>;
  /** 跳过头条（第一条），避免与 TodayHero 重复 */
  skipDate?: string;
}

export const DailyList: React.FC<DailyListProps> = ({
  dailyList,
  groups,
  loading,
  error,
  hasActiveFilters,
  onClearFilters,
  issueNumberMap,
  skipDate,
}) => {
  const navigate = useNavigate();
  const handleDailyClick = (date: string) => {
    navigate(`/ai-daily/${date}`);
  };

  /* Loading */
  if (loading) {
    return (
      <div className="border border-ink/15 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          正在装订今日档案
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary">
          正在拉取最新日报…
        </p>
      </div>
    );
  }

  /* Error */
  if (error) {
    return (
      <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-12 text-center max-w-md mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-3">
          § Error
        </div>
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          档案打不开了
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary mb-6">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream font-sans font-bold text-[13px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
        >
          重新加载
        </button>
      </div>
    );
  }

  /* Empty */
  const totalAfterSkip = dailyList.filter((d) => d.date !== skipDate).length;
  if (totalAfterSkip === 0) {
    return (
      <div className="border border-dashed border-ink/20 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
          § Empty
        </div>
        <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
          {hasActiveFilters ? "没找到匹配的日报" : "暂无日报"}
        </h3>
        <p className="font-sans text-[14px] text-ink-secondary mb-6">
          {hasActiveFilters
            ? "试试别的关键词，或者清掉筛选条件再看看。"
            : "新一期日报正在编辑中，敬请期待。"}
        </p>
        {hasActiveFilters && onClearFilters && (
          <button
            onClick={onClearFilters}
            className="font-sans text-[13px] font-semibold text-ink underline underline-offset-4 decoration-2 decoration-coral hover:text-coral transition-colors"
          >
            清除筛选 →
          </button>
        )}
      </div>
    );
  }

  /* 分组渲染 */
  if (groups && groups.size > 0) {
    return (
      <div className="space-y-12 lg:space-y-14">
        {Array.from(groups.entries()).map(([groupKey, items]) => {
          const visibleItems = items.filter((d) => d.date !== skipDate);
          if (visibleItems.length === 0) return null;
          return (
            <section key={groupKey}>
              <VolumeHead label={groupKey} count={visibleItems.length} />
              <div>
                {visibleItems.map((daily) => (
                  <DailyCard
                    key={daily.date}
                    daily={daily}
                    issueNumber={issueNumberMap?.get(daily.date)}
                    onClick={handleDailyClick}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  /* 平铺渲染 */
  return (
    <div>
      {dailyList
        .filter((d) => d.date !== skipDate)
        .map((daily) => (
          <DailyCard
            key={daily.date}
            daily={daily}
            issueNumber={issueNumberMap?.get(daily.date)}
            onClick={handleDailyClick}
          />
        ))}
    </div>
  );
};

/* ──────────────────────────────────────────────
 * 分组标题 —— 报纸卷期风
 *   Vol.MM / YYYY 年 M 月  ··············  N ISSUES
 * ────────────────────────────────────────────── */
const VolumeHead: React.FC<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  /* 从 "2026 年 5 月" / "2026 年" 中解出 vol 编号（仅用于装饰，无意义校验） */
  const monthMatch = label.match(/(\d{4})\s*年\s*(\d{1,2})\s*月/);
  const yearMatch = label.match(/^(\d{4})\s*年$/);
  const volTag = monthMatch
    ? `Vol.${String(monthMatch[2]).padStart(2, "0")}`
    : yearMatch
    ? `Year ${yearMatch[1]}`
    : "§";

  return (
    <div className="mb-5 lg:mb-6">
      <div className="flex items-baseline gap-3 lg:gap-4 mb-2.5">
        <span className="font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
          {volTag}
        </span>
        <h2 className="font-display font-extrabold text-[20px] lg:text-[24px] text-ink leading-none">
          {label}
        </h2>
        <span className="flex-1 mx-2 border-t border-dotted border-ink/25 translate-y-[-3px]" />
        <span className="font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45 tabular-nums">
          {count} ISSUES
        </span>
      </div>
    </div>
  );
};
