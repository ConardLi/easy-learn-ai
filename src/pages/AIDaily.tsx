/**
 * AI 日报 · 数字简报 / 杂志 archive 风
 *
 * 隐喻：Easy AI 日报 = 每日出版的数字简报（Stratechery / Stripe Press / Substack archive 语言）
 *   ─ Mailchimp 本身就是 newsletter 产品出身，这是它视觉语言最自然的应用场景
 *
 * 信息架构：
 *   1. MASTHEAD    报头：大字刊名 + 副刊词 + 卷期 meta + 1px ink rule line
 *   2. TODAY       今日刊：最新一期单独头版头条卡（唯一保留 stamp 大卡）
 *   3. ARCHIVE     往期目录：轻量工具栏 + 按月分组 hr 行式条目
 *
 * 关键差异（vs AIBenchmark 工具页眉模板）：
 *   ─ 主角是"出版物"不是"档案管理工具"
 *   ─ 字号戏剧化对比撑出版物感（不引入 serif，靠 display + mono 元信息）
 *   ─ 去掉大装饰圆 / butter-tint 大色块
 *   ─ 工具栏下沉到 archive 区内，最新一期优先入眼
 *   ─ archive 条目是 hr 分隔行（不是 stamp 卡），密度高、轻装饰
 *
 * 数据：117 篇日报、320 标签 → 默认按月分组
 *   分组 key 用 Map（避免 V8 把 "2024" "2025" 数字 key 自动升序）
 */

import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ArrowRight } from "lucide-react";
import { useDailyList } from "../hooks/useDailyData";
import { useSearch } from "../hooks/useSearch";
import { useTagFilter } from "../hooks/useTagFilter";
import { DailyList } from "../components/daily/DailyList";
import { SearchBar } from "../components/daily/SearchBar";
import { TagFilter } from "../components/daily/TagFilter";
import { SortSelector, DailySortOption } from "../components/daily/SortSelector";
import {
  GroupSelector,
  DailyGroupBy,
} from "../components/daily/GroupSelector";
import { DailyReport } from "../types/daily";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

const AIDaily: React.FC = () => {
  const navigate = useNavigate();
  const { dailyList, loading, error } = useDailyList();

  const {
    selectedTags,
    allTags,
    filteredByTags,
    hasTagFilter,
    toggleTag,
    clearTags,
  } = useTagFilter(dailyList);
  const { searchTerm, setSearchTerm, filteredList, hasSearch } =
    useSearch(filteredByTags);

  const [sortOption, setSortOption] = useState<DailySortOption>("date-desc");
  const [groupBy, setGroupBy] = useState<DailyGroupBy>("month");

  const archiveRef = useRef<HTMLElement>(null);

  /* 全集 № 编号映射：最新一期 = № 最大 = totalCount */
  const issueNumberMap = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    const byDateDesc = [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const total = byDateDesc.length;
    byDateDesc.forEach((d, i) => {
      map.set(d.date, total - i);
    });
    return map;
  }, [dailyList]);

  /* 今日头条：原始数据中最新的一篇（不受筛选/排序影响） */
  const todayIssue = useMemo<DailyReport | undefined>(() => {
    if (dailyList.length === 0) return undefined;
    return [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];
  }, [dailyList]);

  /* archive 排序后列表 */
  const sortedList = useMemo<DailyReport[]>(() => {
    const arr = [...filteredList];
    arr.sort((a, b) => {
      const ta = new Date(a.date).getTime();
      const tb = new Date(b.date).getTime();
      return sortOption === "date-asc" ? ta - tb : tb - ta;
    });
    return arr;
  }, [filteredList, sortOption]);

  /* 分组 —— Map 保插入顺序 */
  const grouped = useMemo<Map<string, DailyReport[]> | undefined>(() => {
    if (groupBy === "none") return undefined;
    const map = new Map<string, DailyReport[]>();
    sortedList.forEach((d) => {
      const dateObj = new Date(d.date);
      const valid = !Number.isNaN(dateObj.getTime());
      const year = valid ? dateObj.getFullYear() : "未标注";
      const month = valid ? dateObj.getMonth() + 1 : "—";
      const key =
        groupBy === "year" ? `${year} 年` : `${year} 年 ${month} 月`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(d);
    });
    return map;
  }, [sortedList, groupBy]);

  /* 报头 meta：总刊数 / 卷起讫日期 */
  const masthead = useMemo(() => {
    if (dailyList.length === 0)
      return { total: 0, firstDate: "—", lastDate: "—" };
    const dates = dailyList
      .map((d) => new Date(d.date).getTime())
      .filter((t) => !Number.isNaN(t));
    if (dates.length === 0)
      return { total: dailyList.length, firstDate: "—", lastDate: "—" };
    const fmt = (t: number) => {
      const d = new Date(t);
      return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
        2,
        "0",
      )}`;
    };
    return {
      total: dailyList.length,
      firstDate: fmt(Math.min(...dates)),
      lastDate: fmt(Math.max(...dates)),
    };
  }, [dailyList]);

  const hasActiveFilters = hasSearch || hasTagFilter;
  const clearAll = () => {
    setSearchTerm("");
    clearTags();
  };

  const scrollToArchive = () => {
    archiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative bg-white">
      {/* ═══════════════════════════════════════════════════════════════
       * MASTHEAD · 报头
       *
       * 设计：极简，留白主导。1px rule line 上下夹住报头条。
       * 大字 "Easy AI 日报" + 副刊词，meta 信息一行 mono。
       * 不放装饰图形——出版物的视觉权威来自排版本身。
       * ═══════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-ink">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-16 lg:pt-20 pb-10 lg:pb-12">
          {/* 上 rule line + § eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              § Easy AI · Daily Brief
            </span>
            <span className="flex-1 border-t border-ink/15" />
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55 tabular-nums">
              EST. {masthead.firstDate}
            </span>
          </div>

          {/* 大字刊名 */}
          <h1 className="font-display font-extrabold text-ink mb-5 leading-[1.02] tracking-[-0.02em]">
            <span className="block text-[clamp(2.8rem,7vw,5.5rem)]">
              Easy AI{" "}
              <span className="relative inline-block">
                日报
                <span
                  className="absolute -bottom-2 lg:-bottom-3 left-0 right-0 h-[10px] lg:h-[14px] bg-butter -z-0 rounded-sm"
                  aria-hidden
                />
              </span>
            </span>
          </h1>

          {/* 副刊词 */}
          <p className="font-sans text-[16px] lg:text-[17px] text-ink-secondary leading-[1.6] max-w-2xl mb-7">
            每日为你装订最新的 AI 行业动态 ——
            企业、模型、Agent、基础设施，
            <span className="whitespace-nowrap">一份简报读完。</span>
          </p>

          {/* meta 行 —— 共 N 期 · 卷起讫 · 出版人 */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] lg:text-[12px] text-ink/55 tabular-nums">
            <span>
              共{" "}
              <span className="font-bold text-ink">{masthead.total}</span> 期
            </span>
            <span className="text-ink/25">·</span>
            <span>
              {masthead.firstDate} —— {masthead.lastDate}
            </span>
            <span className="text-ink/25">·</span>
            <span>{allTags.length} 标签维度</span>
            <span className="text-ink/25">·</span>
            <span>持续更新中</span>
            <button
              onClick={scrollToArchive}
              className="ml-auto inline-flex items-center gap-1 font-sans font-semibold text-[12px] text-ink hover:text-coral transition-colors group"
            >
              查阅往期归档
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
       * TODAY · 今日刊（头版头条）
       *
       * 这是 Hero CTA：让用户一进来就能看到 / 点击最新一期。
       * 唯一保留 stamp 大卡，强化"头版"地位。
       * 报纸式排版：mono 印记顶部 + 大字标题 + 标签 dot 链 + coral 主 CTA。
       * ═══════════════════════════════════════════════════════════════ */}
      {todayIssue && !loading && (
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
            <TodayHero
              daily={todayIssue}
              issueNumber={issueNumberMap.get(todayIssue.date) ?? 0}
              onOpen={() => navigate(`/ai-daily/${todayIssue.date}`)}
            />
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
       * ARCHIVE · 往期目录
       *
       * 工具栏在这里出现（不在最顶部）。
       * 视觉权重比"今日刊"低 ── 用 cream 极淡背景条 + 1px ink/15 rule 上分隔。
       * archive 条目是 hr 分隔行，密度高。
       * ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={archiveRef}
        className="relative z-20 bg-white border-t border-ink"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 lg:pt-14 pb-16 lg:pb-20">
          {/* archive head */}
          <div className="flex items-center gap-3 mb-8 lg:mb-10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              § Archive · 往期目录
            </span>
            <span className="flex-1 border-t border-ink/15" />
            <span className="font-mono text-[11px] font-semibold text-ink/55 tabular-nums">
              {hasActiveFilters
                ? `${sortedList.length} / ${masthead.total}`
                : `${masthead.total} ISSUES`}
            </span>
          </div>

          {/* 工具栏 —— 轻量 inline，不再套 white card stamp */}
          <div className="mb-10 lg:mb-12">
            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
              <TagFilter
                allTags={allTags}
                selectedTags={selectedTags}
                onTagToggle={toggleTag}
                onClearTags={clearTags}
              />
              <SortSelector value={sortOption} onChange={setSortOption} />
              <GroupSelector value={groupBy} onChange={setGroupBy} />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 mr-1">
                  Active
                </span>
                {hasSearch && (
                  <ActiveChip
                    label={`搜索 ${searchTerm}`}
                    onClose={() => setSearchTerm("")}
                  />
                )}
                {selectedTags.map((tag) => (
                  <ActiveChip
                    key={tag}
                    label={tag}
                    onClose={() => toggleTag(tag)}
                  />
                ))}
                <button
                  onClick={clearAll}
                  className="font-sans text-[12px] font-semibold text-ink-tertiary hover:text-coral underline underline-offset-2 ml-1"
                >
                  清除全部
                </button>
              </div>
            )}
          </div>

          {/* archive 列表 */}
          <DailyList
            dailyList={sortedList}
            groups={grouped}
            loading={loading}
            error={error}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAll}
            issueNumberMap={issueNumberMap}
            /* 不在 archive 重复展示今日头条 */
            skipDate={
              !hasActiveFilters && sortOption === "date-desc"
                ? todayIssue?.date
                : undefined
            }
          />
        </div>
      </section>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#241C15",
            color: "#F4ECD8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            borderRadius: "12px",
            border: "2px solid #241C15",
          },
        }}
      />
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * TodayHero · 今日刊头版头条
 * ──────────────────────────────────────────────────────────────────── */

interface TodayHeroProps {
  daily: DailyReport;
  issueNumber: number;
  onOpen: () => void;
}

const TodayHero: React.FC<TodayHeroProps> = ({
  daily,
  issueNumber,
  onOpen,
}) => {
  const dateObj = new Date(daily.date);
  const valid = !Number.isNaN(dateObj.getTime());
  const formattedDate = valid
    ? `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(
        2,
        "0",
      )}.${String(dateObj.getDate()).padStart(2, "0")}`
    : daily.date;
  const weekday = valid ? `周${WEEKDAYS[dateObj.getDay()]}` : "—";

  return (
    <article
      className="group relative bg-white border-2 border-ink rounded-3xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:8px_8px_0_0_#241C15] cursor-pointer overflow-hidden"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      {/* 顶部"刊期条" —— mono 元信息 + coral LATEST 印戳 */}
      <div className="flex items-center justify-between gap-4 px-6 lg:px-10 pt-6 lg:pt-7 pb-4 border-b border-dotted border-ink/25">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.18em] text-ink/65 tabular-nums">
          <span>§ Latest Issue</span>
          <span className="text-ink/25">·</span>
          <span>№ {String(issueNumber).padStart(3, "0")}</span>
          <span className="text-ink/25">·</span>
          <span>{formattedDate}</span>
          <span className="text-ink/25">·</span>
          <span>{weekday}</span>
        </div>
        <span className="hidden sm:inline-flex items-center px-2.5 py-1 bg-coral text-white border-2 border-ink rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] shadow-[2px_2px_0_0_#241C15]">
          Latest
        </span>
      </div>

      {/* 头版大字标题 */}
      <div className="px-6 lg:px-10 pt-8 lg:pt-10 pb-7">
        <h2 className="font-display font-extrabold text-ink leading-[1.18] tracking-[-0.01em] text-[clamp(1.6rem,3.2vw,2.4rem)] mb-6 lg:mb-7 group-hover:text-coral transition-colors duration-300">
          {daily.title}
        </h2>

        {/* 标签链 —— dot 分隔，报纸栏目风 */}
        {daily.tags && daily.tags.length > 0 && (
          <div className="flex flex-wrap items-center font-mono text-[12px] text-ink/55 mb-7 lg:mb-8">
            {daily.tags.slice(0, 6).map((tag, i) => (
              <span key={tag} className="inline-flex items-center">
                {i > 0 && <span className="mx-2 text-ink/25">·</span>}
                <span className="font-semibold text-ink-secondary">{tag}</span>
              </span>
            ))}
            {daily.tags.length > 6 && (
              <span className="ml-2 text-ink/35">+{daily.tags.length - 6}</span>
            )}
          </div>
        )}

        {/* CTA + 提示 */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onOpen();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[14px] shadow-stamp transition-all duration-250 ease-spring group-hover:bg-ink hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            阅读最新刊
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </span>
          <span className="font-mono text-[11px] text-ink/40 italic">
            "最新一期已送达 · 点击展开"
          </span>
        </div>
      </div>
    </article>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * 已选条件 chip · 极轻量
 * ──────────────────────────────────────────────────────────────────── */

const ActiveChip: React.FC<{ label: string; onClose: () => void }> = ({
  label,
  onClose,
}) => (
  <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-0.5 bg-cream border border-ink/15 rounded-full font-sans font-semibold text-[12px] text-ink">
    <span className="max-w-[180px] truncate">{label}</span>
    <button
      onClick={onClose}
      aria-label={`移除 ${label}`}
      className="inline-flex items-center justify-center w-4 h-4 rounded-full text-ink/55 hover:bg-ink/10 hover:text-ink transition-colors"
    >
      <span className="text-[14px] leading-none -mt-px">×</span>
    </button>
  </span>
);

export default AIDaily;
