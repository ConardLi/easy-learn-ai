/**
 * AI 模型 · Mailchimp-Freddie 风（v2）
 *
 * v2 改造（v1 自检后）：
 *   - Hero 从 "深色营销舞台" → "浅奶油工具页眉"（不抢戏）
 *   - 删 Hero 大 stats 卡 —— 数字交给下方 StatsBar，避免 229 出现两次
 *   - 装饰 6 → 2 个 + 不对称分布（右侧锚定 / 左下点缀）
 *   - 副标改 1 行；Hero 高度从 ~520px 缩到 ~320px
 *   - 标题左对齐，工具页气质（不是营销页居中）
 *
 * 视觉差异化（区别于其他页 Hero）：
 *   首页 = 动画大插画
 *   AI 知视 = butter 黄 + 大搜索框 居中
 *   知识星球 = butter 黄 + 大 CTA 居中
 *   →→ 本页 = butter-tint 极浅奶油 + 左对齐 + 右侧 "档案印章" 锚
 *
 * 信息架构：
 *   1. HERO（butter-tint 极浅奶油·短·工具页眉）
 *   2. WORKBAR（cream 浅奶油底）—— StatsBar 主数据 + 工具栏
 *   3. CONTENT（白底）—— 卡片 / 树形列表
 */

import React, { useState, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { ArrowUpRight, KeyRound } from "lucide-react";
import {
  useModelList,
  useModelFilters,
  useModelSort,
  useModelGroup,
} from "../hooks/useModelData";
import { SearchBar } from "../components/model/SearchBar";
import { FilterPanel } from "../components/model/FilterPanel";
import { SortSelector } from "../components/model/SortSelector";
import { GroupSelector } from "../components/model/GroupSelector";
import { ModelList } from "../components/model/ModelList";
import { ModelTreeView } from "../components/model/ModelTreeView";
import { ViewToggle, ViewMode } from "../components/model/ViewToggle";
import { StatsBar } from "../components/model/StatsBar";
import { GroupByOption } from "../types/model";
import { Sparkle4, DotGrid } from "../components/Decorations";

const AIModel: React.FC = () => {
  const { modelList, loading, error } = useModelList();
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");

  const {
    filters,
    filteredModels,
    allCompanies,
    allTags,
    allOpenSourceStatuses,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  } = useModelFilters(modelList);

  const { sortOption, setSortOption, sortedModels } =
    useModelSort(filteredModels);
  const groupedModels = useModelGroup(sortedModels, groupBy);

  /* StatsBar 多维数据：公司数 / 标签数（接管 Hero 让出的数据展示） */
  const statsExtras = useMemo(() => {
    if (!modelList?.length) return [];
    const companies = new Set<string>();
    const tags = new Set<string>();
    modelList.forEach((m) => {
      companies.add(m.company);
      m.modelTags.forEach((t) => tags.add(t));
    });
    return [
      { label: "供应商", value: companies.size },
      { label: "能力标签", value: tags.size },
    ];
  }, [modelList]);

  /* Loading 态 —— stamp 风 */
  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            正在打开模型档案柜
          </h2>
          <p className="font-sans text-ink-secondary">
            正在获取最新模型信息…
          </p>
        </div>
      </div>
    );
  }

  /* Error 态 —— stamp 风 */
  if (error) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-5 bg-coral border-2 border-ink rounded-full text-3xl">
            😕
          </div>
          <h2 className="font-display font-extrabold text-display-lg text-ink mb-2">
            档案柜打不开了
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
      {/* ═══════════════════ HERO v2 · butter-tint 浅奶油「工具页眉」 ═══════════════════ */}
      <section className="relative bg-butter-tint border-b-2 border-ink overflow-hidden">
        {/* 右侧 "档案印章" 锚 —— butter 大圆 + Sparkle 叠加，不对称分布 */}
        <div
          className="absolute -top-10 -right-14 lg:-right-8 w-[260px] h-[260px] rounded-full bg-butter border-2 border-ink hidden md:block"
          aria-hidden
        >
          <Sparkle4
            className="absolute top-[44%] left-[24%] w-10 h-10 text-ink"
            color="#241C15"
          />
        </div>
        {/* 左下 DotGrid 点缀 —— 节奏对比 */}
        <DotGrid
          className="absolute bottom-6 left-[3%] w-24 h-10 text-ink opacity-25 hidden md:block"
          color="#241C15"
          rows={3}
          cols={6}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-12 lg:pb-14">
          <div className="grid lg:grid-cols-[minmax(0,640px)_minmax(320px,430px)] gap-8 lg:gap-16 items-center">
            <div>
              {/* eyebrow —— 小、克制 */}
              <div className="inline-flex items-center gap-1.5 mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/65">
                <span className="inline-block w-6 h-px bg-ink/45" />
                <span>§ 模型档案柜</span>
              </div>

              {/* 主标题 —— display-lg（不是 display-xl），缩一档 */}
              <h1 className="font-display font-extrabold text-display-lg text-ink mb-4 leading-[1.1]">
                收集主流 AI 大模型，
                <span className="whitespace-nowrap">一处对照查阅。</span>
              </h1>

              {/* 副标 —— 1 行 */}
              <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary leading-[1.65]">
                按公司 / 开源状态 / 模型标签多维筛选，支持卡片浏览与族谱树形视图。
              </p>
            </div>

            <TokenPromoCard />
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
              totalCount={modelList.length}
              filteredCount={filteredModels.length}
              hasActiveFilters={hasActiveFilters}
              extras={statsExtras}
            />
          </div>

          {/* 工具栏容器 —— 白底 stamp 卡 */}
          <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp p-4 lg:p-5">
            <div className="flex flex-wrap items-center gap-3">
              <ViewToggle mode={viewMode} onChange={setViewMode} />
              <SearchBar
                value={filters.searchQuery}
                onChange={(value) => updateFilters({ searchQuery: value })}
              />
              <FilterPanel
                filters={filters}
                allCompanies={allCompanies}
                allTags={allTags}
                allOpenSourceStatuses={allOpenSourceStatuses}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
                totalCount={modelList.length}
                filteredCount={filteredModels.length}
              />
              {viewMode === "card" && (
                <>
                  <SortSelector value={sortOption} onChange={setSortOption} />
                  <GroupSelector value={groupBy} onChange={setGroupBy} />
                </>
              )}
            </div>

            {/* 已选筛选条件 —— stamp chip */}
            {hasActiveFilters && (
              <div className="mt-4 pt-4 border-t-2 border-ink/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/55 mr-1">
                    已选条件
                  </span>
                  {filters.selectedCompanies.map((company) => (
                    <ActiveChip
                      key={company}
                      label={company}
                      color="butter"
                      onClose={() =>
                        updateFilters({
                          selectedCompanies: filters.selectedCompanies.filter(
                            (c) => c !== company,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedTags.map((tag) => (
                    <ActiveChip
                      key={tag}
                      label={tag}
                      color="coral"
                      onClose={() =>
                        updateFilters({
                          selectedTags: filters.selectedTags.filter(
                            (t) => t !== tag,
                          ),
                        })
                      }
                    />
                  ))}
                  {filters.selectedOpenSourceStatus.map((status) => (
                    <ActiveChip
                      key={status}
                      label={status}
                      color="teal"
                      onClose={() =>
                        updateFilters({
                          selectedOpenSourceStatus:
                            filters.selectedOpenSourceStatus.filter(
                              (s) => s !== status,
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

      {/* ═══════════════════ CONTENT · 白底列表 ═══════════════════ */}
      <section className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {viewMode === "card" ? (
            <ModelList
              models={groupedModels}
              showGroupHeaders={groupBy !== "none"}
            />
          ) : (
            <ModelTreeView models={sortedModels} />
          )}
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

/** Hero 右侧推广卡 —— API 中转站入口 */
const TokenPromoCard: React.FC = () => {
  const promoUrl =
    "https://token.mmh1.top/?utm_source=easy-ai&utm_medium=model_hero&utm_campaign=api_gateway";

  return (
    <aside className="relative z-10 w-full max-w-[430px] lg:justify-self-end">
      <a
        href={promoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block bg-white border-2 border-ink rounded-2xl shadow-stamp p-5 lg:p-6 transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15]"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-butter border-2 border-ink rounded-full font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
            <KeyRound className="w-3.5 h-3.5" strokeWidth={2.5} />
            开发者工具
          </div>
          <span className="inline-flex items-center justify-center w-9 h-9 bg-cream border-2 border-ink rounded-full transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4 text-ink" strokeWidth={2.5} />
          </span>
        </div>

        <h2 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-tight mb-2">
          Token 秘密花园
        </h2>
        <p className="font-sans text-[15px] font-bold text-ink mb-2">
          国内直连、低成本调用前沿 AI 模型
        </p>
        <p className="font-sans text-[13px] lg:text-[14px] text-ink-secondary leading-[1.65] mb-4">
          兼容主流 API 协议，支持文本、图像与多模态模型，适合开发测试和 AI 原型验证。
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {["GPT 5.5", "GPT Image 2", "Claude Opus 4.8", "Gemini 3.5"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-sans font-semibold text-[11px] text-ink-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink text-cream border-2 border-ink rounded-full font-sans text-[13px] font-bold transition-colors group-hover:bg-coral">
          立即体验
          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
        </div>
      </a>
    </aside>
  );
};

/** 已选条件 chip —— stamp 风可关闭 */
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

export default AIModel;
