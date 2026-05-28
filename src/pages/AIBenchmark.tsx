/**
 * AI 评估 · Mailchimp-Freddie 风（v2）
 *
 * v2 改造（v1 自检后）：
 *   - Hero 从 "深色营销舞台" → "浅奶油工具页眉"
 *   - 删 Hero 大 stats 卡（数字交给下方 StatsBar，避免重复）
 *   - 装饰 6 → 2 个 + 不对称（右侧锚 / 左下点缀）
 *   - 副标 1 行；高度 ~520 → ~320px；标题左对齐
 *
 * 视觉差异化（区别于其他页 Hero）：
 *   AI 模型 = butter-tint 极浅奶油 + 右侧 "档案印章" 锚（butter 大圆）
 *   →→ 本页 = cream 中性奶油 + 右侧 "评测徽章" 锚（teal 大圆）
 *
 * 信息架构：
 *   1. HERO（cream·短·工具页眉）
 *   2. WORKBAR（butter-tint）—— StatsBar + 工具栏
 *   3. CONTENT（白底）—— 卡片网格
 */

import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { useBenchmarkData } from "../hooks/useBenchmarkData";
import { SearchBar } from "../components/benchmark/SearchBar";
import { FilterPanel } from "../components/benchmark/FilterPanel";
import { BenchmarkList } from "../components/benchmark/BenchmarkList";
import { StatsBar } from "../components/benchmark/StatsBar";
import { SortSelector } from "../components/benchmark/SortSelector";
import {
  GroupSelector,
  BenchmarkGroupBy,
} from "../components/benchmark/GroupSelector";
import { Star, DotGrid } from "../components/Decorations";
import { Benchmark } from "../types/benchmark";

const AIBenchmark: React.FC = () => {
  const {
    benchmarks,
    totalCount,
    loading,
    error,
    filters,
    sortOption,
    allTypes,
    allYears,
    allLicenses,
    updateFilters,
    clearFilters,
    setSortOption,
    hasActiveFilters,
  } = useBenchmarkData();

  /* 分组：默认按年份（新→旧）。"none" 时为平铺。 */
  const [groupBy, setGroupBy] = useState<BenchmarkGroupBy>("year");

  /**
   * 按 groupBy 把已筛选+已排序的 benchmarks 分组。
   *
   * ⚠️ 重要：返回 Map 而不是 Record / plain object！
   * 因为 V8 引擎会把 plain object 的数字字符串 key（"2024" "2025"）
   * 自动按数字升序排列，会让"年份 desc"分组完全失效（永远变成升序）。
   * Map 严格保持插入顺序，是这个场景唯一正确的容器。
   */
  const groupedBenchmarks = useMemo<
    Map<string, Benchmark[]> | undefined
  >(() => {
    if (groupBy === "none") return undefined;

    const map = new Map<string, Benchmark[]>();
    benchmarks.forEach((b) => {
      let key: string;
      if (groupBy === "year") {
        const y = b.year;
        key = y && y !== "n/a" ? String(y) : "未标注年份";
      } else {
        /* type 分组：用第一个类型 */
        key = b.type[0] || "未分类";
      }
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    });

    /**
     * 排序分组 key：
     * - groupBy="year" 时，"按年份排序"选项 (year-desc / year-asc) 改用于调整分组顺序方向
     *   默认 year-desc → 新→旧；选 year-asc → 旧→新
     *   选其他排序（examples / name）→ 分组顺序保持默认 desc，组内按所选排序
     * - groupBy="type" 时，分组 key 按字典序
     */
    const entries = Array.from(map.entries());
    if (groupBy === "year") {
      const ascending = sortOption === "year-asc";
      entries.sort(([a], [b]) => {
        const na = Number(a);
        const nb = Number(b);
        const aValid = Number.isFinite(na);
        const bValid = Number.isFinite(nb);
        if (aValid && bValid) return ascending ? na - nb : nb - na;
        if (aValid) return -1;
        if (bValid) return 1;
        return 0;
      });
    } else {
      entries.sort(([a], [b]) => a.localeCompare(b));
    }
    /* 用 Map 而不是 Object.fromEntries，避免数字 key 被 V8 自动升序 */
    return new Map(entries);
  }, [benchmarks, groupBy, sortOption]);

  /* Loading 态 */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            正在打开评测档案
          </h2>
          <p className="font-sans text-ink-secondary">
            正在获取最新基准测试…
          </p>
        </div>
      </div>
    );
  }

  /* Error 态 */
  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-coral border-2 border-ink rounded-full text-3xl">
            😕
          </div>
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            档案打不开了
          </h2>
          <p className="font-sans text-ink-secondary mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-ink text-cream font-sans font-bold text-[14px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-white">
      {/* ═══════════════════ HERO v2 · cream 中性奶油「工具页眉」 ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        {/* 右侧 "评测徽章" 锚 —— teal 大圆 + Star 叠加，不对称分布 */}
        <div
          className="absolute -top-12 -right-12 lg:-right-6 w-[260px] h-[260px] rounded-full bg-teal border-2 border-ink hidden md:block"
          aria-hidden
        >
          <Star
            className="absolute top-[42%] left-[26%] w-12 h-12 text-butter"
            color="#F2D047"
            filled
          />
        </div>
        {/* 左下 DotGrid 点缀 */}
        <DotGrid
          className="absolute bottom-6 left-[3%] w-24 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-12 lg:pb-14">
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
              <span className="inline-block w-6 h-px bg-ink/45" />
              <span>§ Benchmarks · 评测档案</span>
            </div>

            <h1 className="font-display font-extrabold text-display-lg text-ink mb-4 leading-[1.1]">
              衡量模型能力，
              <span className="whitespace-nowrap">先理清评测标准。</span>
            </h1>

            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.65]">
              汇总学界与业界主流基准测试，按领域 / 年份多维筛选，
              一键直达论文、代码与数据集。
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ WORKBAR · cream 工作台 ═══════════════════ */}
      {/* 注意：必须无 overflow-hidden + z-20 高于 content section，否则下拉面板会被裁/被卡片遮挡 */}
      <section className="relative z-20 bg-cream border-b-2 border-ink">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-10 pb-8">
          {/* 统计栏 —— 主数据展示（接管 Hero 让出的职责） */}
          <div className="mb-6">
            <StatsBar
              totalCount={totalCount}
              filteredCount={benchmarks.length}
              hasActiveFilters={hasActiveFilters}
              extras={[
                { label: "覆盖领域", value: allTypes.length },
                { label: "跨越年份", value: allYears.length },
              ]}
            />
          </div>

          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => updateFilters({ searchQuery: value })}
              />
              <FilterPanel
                filters={filters}
                allTypes={allTypes}
                allYears={allYears}
                allLicenses={allLicenses}
                onFilterChange={updateFilters}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                totalCount={totalCount}
                filteredCount={benchmarks.length}
              />
              <SortSelector value={sortOption} onChange={setSortOption} />
              <GroupSelector value={groupBy} onChange={setGroupBy} />
            </div>

            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t-2 border-ink/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 mr-1">
                    已选条件
                  </span>
                  {filters.selectedTypes.map((type) => (
                    <ActiveChip
                      key={type}
                      label={type}
                      color="butter"
                      onClose={() =>
                        updateFilters({
                          selectedTypes: filters.selectedTypes.filter(
                            (t) => t !== type,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedYears.map((year) => (
                    <ActiveChip
                      key={year}
                      label={year}
                      color="coral"
                      onClose={() =>
                        updateFilters({
                          selectedYears: filters.selectedYears.filter(
                            (y) => y !== year,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedLicenses.map((license) => (
                    <ActiveChip
                      key={license}
                      label={license}
                      color="teal"
                      onClose={() =>
                        updateFilters({
                          selectedLicenses: filters.selectedLicenses.filter(
                            (l) => l !== license,
                          ),
                        })
                      }
                    />
                  ))}
                  <button
                    onClick={clearFilters}
                    className="font-sans text-[12px] font-semibold text-ink-tertiary hover:text-ink underline underline-offset-2 ml-1"
                  >
                    清除全部
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTENT · 白底卡片网格（支持分组渲染） ═══════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <BenchmarkList
            benchmarks={benchmarks}
            groups={groupedBenchmarks as Map<string, Benchmark[]> | undefined}
            loading={loading}
            error={error}
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

/** 已选条件 chip */
const ActiveChip: React.FC<{
  label: string;
  color: "butter" | "coral" | "teal";
  onClose: () => void;
}> = ({ label, color, onClose }) => {
  const bg = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-white",
    teal: "bg-teal text-white",
  }[color];
  const closeHover = {
    butter: "hover:bg-ink/10",
    coral: "hover:bg-white/20",
    teal: "hover:bg-white/20",
  }[color];
  return (
    <span
      className={`inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full border-2 border-ink font-sans font-semibold text-[12px] ${bg}`}
    >
      {label}
      <button
        onClick={onClose}
        aria-label={`移除 ${label}`}
        className={`inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors ${closeHover}`}
      >
        <span className="text-[14px] leading-none -mt-px">×</span>
      </button>
    </span>
  );
};

export default AIBenchmark;
