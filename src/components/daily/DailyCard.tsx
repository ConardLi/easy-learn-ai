/**
 * 日报条目 · "Archive 目录行"
 *
 * 隐喻：纸质杂志 / 数字简报的"往期目录"
 *   ─ 不是 stamp 卡，不是 SaaS 大块
 *   ─ 是一行：№编号 / 日期 / 标题 / 标签 / arrow
 *   ─ 只有底部一根 1px ink/10 横线，hover 整行 cream 微染
 *
 * 视觉关键：
 *   ─ 极低视觉重量（让用户能"流"过 117 期）
 *   ─ 标题用 display 800 weight 撑出版物感
 *   ─ 元信息用 Geist Mono，做出"印刷品"的目录排版
 *   ─ 标签链：dot 分隔的内联文字（不是 chip），更像报纸栏目标签
 */

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { DailyReport } from "../../types/daily";

interface DailyCardProps {
  daily: DailyReport;
  issueNumber?: number;
  onClick: (date: string) => void;
}

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) throw new Error("invalid");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const w = `周${WEEKDAYS[d.getDay()]}`;
    return { mmdd: `${mm}—${dd}`, weekday: w };
  } catch {
    return { mmdd: "—", weekday: "—" };
  }
};

export const DailyCard: React.FC<DailyCardProps> = ({
  daily,
  issueNumber,
  onClick,
}) => {
  const { mmdd, weekday } = formatDate(daily.date);
  const tagsToShow = (daily.tags || []).slice(0, 3);
  const overflowCount = (daily.tags?.length || 0) - tagsToShow.length;

  return (
    <button
      type="button"
      onClick={() => onClick(daily.date)}
      className="group w-full grid items-center gap-x-5 lg:gap-x-7 py-4 lg:py-5 px-3 lg:px-4 -mx-3 lg:-mx-4 rounded-md border-b border-ink/10 transition-colors duration-200 hover:bg-cream/50 text-left"
      style={{
        gridTemplateColumns:
          "minmax(48px, auto) minmax(86px, auto) minmax(0, 1fr) auto auto",
      }}
    >
      {/* № 编号 */}
      <span className="font-mono text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.06em] text-ink/40 tabular-nums">
        {issueNumber != null
          ? `№ ${String(issueNumber).padStart(3, "0")}`
          : "— —"}
      </span>

      {/* 日期 + 周几 —— 比 № 编号略亮，作为目录行的"次要主语" */}
      <span className="font-mono text-[12px] lg:text-[13px] font-semibold text-ink/85 tabular-nums whitespace-nowrap">
        {mmdd}
        <span className="font-normal text-ink/45 ml-1.5">{weekday}</span>
      </span>

      {/* 标题 */}
      <h3 className="font-display font-extrabold text-[15px] lg:text-[17px] text-ink leading-[1.45] line-clamp-2 group-hover:text-coral transition-colors min-w-0">
        {daily.title}
      </h3>

      {/* 标签链 —— 内联文字，dot 分隔，hidden on mobile */}
      {tagsToShow.length > 0 && (
        <div className="hidden lg:flex items-center font-mono text-[11px] text-ink/45 whitespace-nowrap">
          {tagsToShow.map((tag, i) => (
            <span key={tag} className="inline-flex items-center">
              {i > 0 && <span className="mx-1.5 text-ink/25">·</span>}
              <span className="max-w-[120px] truncate">{tag}</span>
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="ml-1.5 text-ink/30">+{overflowCount}</span>
          )}
        </div>
      )}

      {/* arrow */}
      <span
        className="inline-flex items-center justify-center w-6 h-6 text-ink/35 transition-all duration-200 group-hover:text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden
      >
        <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2} />
      </span>
    </button>
  );
};
