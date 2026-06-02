/**
 * AI 知视 · Mailchimp-Freddie 风
 *
 * 信息架构：
 *   1. HERO（butter 黄·"图书馆查询台"）
 *      —— 全宽居中：大标题 + 大搜索框 + [TypeSegmented | 分类 chips] 同行筛选
 *   2. CATALOG（cream）—— 根据 type 切换渲染：
 *        • 概念讲解 = 分组（默认）/ 扁平（筛选/搜索时）卡片网格
 *        • 视频精讲 = 一行一个的横向卡片（左视频封面 + 右 PPT 网站预览）
 *   3. CTA（ink 深色·双栏）—— 左文字 + 右 AIK-01 插画位
 *
 * 形态切换说明：
 *   - 两种形态完全独立 —— 没有"全部混合"模式
 *   - 默认进入概念讲解
 *   - 视频精讲模式：不分类、不分组、不搜索（视频站数量少 + 形态本身已足够直观）
 *   - 视频形态的封面 / B 站跳转 / 时长徽章 都在「列表卡片」上展示
 *   - 详情页（PPT 网站）不再插入视频元素，保持沉浸式 PPT 阅读
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  LayoutGrid,
  Network,
  Play,
  PlayCircle,
  Search,
  X,
} from "lucide-react";
import {
  aiKnowledgeConceptData,
  categoryColors,
  LEARNING_LINES,
  lineById,
} from "../data/aiKnowledgeConceptData";
import ConceptMap from "../components/ConceptMap";
import { aiKnowledgeVideoData } from "../data/aiKnowledgeVideoData";
import {
  AIKnowledgeConceptItem,
  AIKnowledgeVideoItem,
  KnowledgeType,
} from "../types";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";
import { COVER_MAP } from "../components/KnowledgeCovers";

/** 概念形态下的视图：目录卡片 / 全景图谱 */
type ConceptView = "catalog" | "map";

const AIKnowledge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedType, setSelectedType] = useState<KnowledgeType>("concept");
  /* 概念形态下的两种视图：catalog 目录卡片 / map 全景图谱（视频形态不受影响） */
  const [conceptView, setConceptView] = useState<ConceptView>("catalog");

  /* 两类数据源独立维护，计数直接取数组长度 */
  const typeCounts = useMemo(
    () => ({
      concept: aiKnowledgeConceptData.length,
      video: aiKnowledgeVideoData.length,
    }),
    [],
  );

  /* 按浏览模式切换数据源 —— 不再从单一数组里 filter type */
  const dataByType = useMemo(() => {
    return selectedType === "concept"
      ? aiKnowledgeConceptData
      : aiKnowledgeVideoData;
  }, [selectedType]);

  /* 学习线列表 + 每条计数（仅概念模式用，顺序按 LEARNING_LINES）
     id = 学习线 id（"全部" 为全选哨兵）；name = 短角标，用于 chip 显示 */
  const categoriesWithCount = useMemo(() => {
    if (selectedType !== "concept") return [];
    const counts = new Map<string, number>();
    dataByType.forEach((i) => {
      const line = (i as AIKnowledgeConceptItem).line;
      counts.set(line, (counts.get(line) || 0) + 1);
    });
    return [
      { id: "全部", name: "全部", count: dataByType.length },
      ...LEARNING_LINES.filter((l) => counts.has(l.id)).map((l) => ({
        id: l.id,
        name: l.tag,
        count: counts.get(l.id) || 0,
      })),
    ];
  }, [dataByType, selectedType]);

  /* 切换 type tab 时重置筛选（视频模式没有学习线概念） */
  React.useEffect(() => {
    setSelectedCategory("全部");
  }, [selectedType]);

  /* 最终筛选（仅概念模式生效；视频模式直接用 dataByType）
     selectedCategory 存学习线 id，"全部" 为不筛选 */
  const filteredData = useMemo(() => {
    if (selectedType !== "concept") return dataByType;
    const q = searchQuery.trim().toLowerCase();
    return (dataByType as AIKnowledgeConceptItem[]).filter((item) => {
      const inLine = selectedCategory === "全部" || item.line === selectedCategory;
      const match =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return inLine && match;
    });
  }, [dataByType, selectedCategory, searchQuery, selectedType]);

  const isConcept = selectedType === "concept";
  const isMapView = isConcept && conceptView === "map";

  const handleConceptClick = (item: AIKnowledgeConceptItem) => {
    navigate(`/ai-knowledge/${item.id}`, { state: { item, type: "concept" } });
  };

  /* 全景图谱点节点 → 按 id 找到概念再进站 */
  const handleConceptById = (id: string) => {
    const item = aiKnowledgeConceptData.find((i) => i.id === id);
    if (item) handleConceptClick(item);
  };

  const handleVideoClick = (item: AIKnowledgeVideoItem) => {
    navigate(`/ai-knowledge/${item.id}`, { state: { item, type: "video" } });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · 全宽居中工具感 ═══════════════════ */}
      <section className="relative bg-butter border-b-2 border-ink overflow-hidden">
        {/* "卡片墙"背景装饰 —— 暗示这是图书馆/目录入口 */}
        <BgStampCards />

        <DotGrid
          className="absolute bottom-10 left-[10%] w-20 h-12 text-ink opacity-40 hidden md:block"
          color="#241C15"
          rows={3}
          cols={5}
        />
        <Sparkle4
          className="absolute top-16 left-[8%] w-7 h-7 text-ink hidden md:block"
          color="#241C15"
        />
        <Star
          className="absolute top-20 right-[7%] w-8 h-8 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[920px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-16 lg:pb-20 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ 知视目录</span>
          </div>

          {/* 主标题 */}
          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">把每个 AI 概念，</span>{" "}
            <span className="whitespace-nowrap">
              讲到你能
              <span className="relative inline-block ml-[0.05em]">
                <span className="relative z-10">看懂</span>
                <HandUnderline
                  className="absolute -bottom-2 left-0 right-0 w-full h-3"
                  color="#E07A5F"
                />
              </span>
              。
            </span>
          </h1>

          {/* 副标 —— 数字随 type 切换变 */}
          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[640px] mx-auto mt-7">
            {isConcept ? (
              <>
                {typeCounts.concept} 个概念讲解 — 每张图都按 &ldquo;
                <span className="font-bold">真的看得懂</span>&rdquo; 反复改过。
              </>
            ) : (
              <>
                {typeCounts.video} 个视频精讲 — 一边看 B 站视频，一边对照 PPT
                网站。
              </>
            )}
          </p>

          {/* 大搜索框 —— 仅概念·目录视图显示（视频/全景视图不需要搜） */}
          {isConcept && conceptView === "catalog" && (
            <div className="relative mt-10 max-w-[640px] mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜搜你想学的概念，例如 RAG / Agent / 微调…"
                className="w-full pl-14 pr-14 py-5 bg-white border-2 border-ink rounded-full font-sans text-[16px] text-ink placeholder:text-ink/40 shadow-stamp-lg transition-all duration-250 ease-spring focus:outline-none focus:-translate-x-[3px] focus:-translate-y-[3px] focus:[box-shadow:9px_9px_0_0_#241C15]"
              />
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-ink/55"
                strokeWidth={2.5}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="清除搜索"
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-ink/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-ink/60" strokeWidth={2.5} />
                </button>
              )}
            </div>
          )}

          {/* ───── 控制区（两行）─────
              第一行：形态切换（concept ↔ video）+ 视图切换（目录 ↔ 全景）
              第二行：分类 chips（仅概念·目录视图） */}
          <div className={`flex flex-col items-center gap-4 ${isConcept ? "mt-8" : "mt-10"}`}>
            {/* 第一行：切换器 */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <TypeSegmented active={selectedType} onChange={setSelectedType} />
              {isConcept && (
                <ViewSegmented active={conceptView} onChange={setConceptView} />
              )}
            </div>

            {/* 第二行：分类 chips */}
            {isConcept &&
              conceptView === "catalog" &&
              categoriesWithCount.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
                  {categoriesWithCount.map(({ id, name, count }) => {
                    const active = selectedCategory === id;
                    return (
                      <button
                        key={id}
                        onClick={() => setSelectedCategory(id)}
                        className={`group inline-flex items-baseline gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] border-2 border-ink transition-all duration-250 ease-spring ${
                          active
                            ? "bg-ink text-white shadow-[3px_3px_0_0_#241C15]"
                            : "bg-white/70 text-ink hover:bg-white hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:4px_4px_0_0_#241C15]"
                        }`}
                      >
                        <span>{name}</span>
                        <span
                          className={`font-mono text-[10.5px] ${active ? "text-white/60" : "text-ink/45"}`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CATALOG · 按形态切换渲染 ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-14 lg:py-18">
          {isMapView ? (
            /* 概念·全景视图：知视图谱（地铁线路 + 关联高亮） */
            <ConceptMap onSelectConcept={handleConceptById} />
          ) : isConcept ? (
            /* 概念·目录视图：默认分组渲染，筛选 / 搜索时切扁平 */
            selectedCategory === "全部" && !searchQuery.trim() ? (
              <GroupedCatalog
                data={dataByType as AIKnowledgeConceptItem[]}
                lineIds={categoriesWithCount
                  .filter((c) => c.id !== "全部")
                  .map((c) => c.id)}
                onJumpCategory={setSelectedCategory}
                onCardClick={handleConceptClick}
              />
            ) : (
              <FlatCatalog
                data={filteredData as AIKnowledgeConceptItem[]}
                categoryLabel={lineById[selectedCategory]?.name ?? selectedCategory}
                searchQuery={searchQuery}
                total={dataByType.length}
                onClear={() => {
                  setSelectedCategory("全部");
                  setSearchQuery("");
                }}
                onCardClick={handleConceptClick}
              />
            )
          ) : (
            /* 视频模式：一行一个的横向卡片，不分类不搜索 */
            <VideoRowList
              data={filteredData as AIKnowledgeVideoItem[]}
              onCardClick={handleVideoClick}
            />
          )}
        </div>
      </section>

      {/* ═══════════════════ CTA · 左文 + 右 AIK-01 插画 ═══════════════════ */}
      <section className="relative bg-ink border-b-2 border-ink overflow-hidden">
        <Sparkle4
          className="absolute top-12 left-[8%] w-7 h-7 text-butter hidden md:block"
          color="#F4D35E"
        />
        <Star
          className="absolute bottom-14 right-[8%] w-9 h-9 -rotate-12 text-coral hidden md:block"
          color="#E07A5F"
          filled
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* 左：文案 + CTA */}
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-lg text-white">
                <span className="whitespace-nowrap">没找到想读的？</span>{" "}
                <span className="whitespace-nowrap">
                  告诉我们，
                  <span className="text-butter">下一个就写。</span>
                </span>
              </h2>
              <p className="font-serif italic text-[17px] text-white/65 mt-6 max-w-xl">
                这里的每个概念都来自真实学习需求。提交 Issue
                或在知识星球留言，都会被认真读到。
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <span>提个概念给我们</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </div>

            {/* 右：AIK-01 插画 —— 拿放大镜的角色在书架前寻找概念 */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-AIK-01.png"
                alt="拿着放大镜的角色在书架前寻找新的 AI 概念"
                animation="up"
                className="max-w-[400px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ────────────── 子组件 ────────────── */

/**
 * GroupedCatalog — 默认"全部"模式下的分组视图
 *
 * 按 category 分组渲染，每组一个 section（heading + 网格）。
 *
 * 数据由父组件传入（概念数据源），不再直接读 aiKnowledgeConceptData。
 * 分类顺序由父组件传入（已按数量降序排好）。
 * heading 上的"看专区 →"按钮可一键切换到该分类的扁平视图。
 */
const GroupedCatalog: React.FC<{
  data: AIKnowledgeConceptItem[];
  lineIds: string[];
  onJumpCategory: (lineId: string) => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({ data, lineIds, onJumpCategory, onCardClick }) => {
  /* 按学习线预切片，避免每个 group 都跑一次 filter */
  const groups = useMemo(() => {
    const map = new Map<string, AIKnowledgeConceptItem[]>();
    data.forEach((item) => {
      if (!map.has(item.line)) map.set(item.line, []);
      map.get(item.line)!.push(item);
    });
    return lineIds.map((id) => ({
      id,
      items: map.get(id) || [],
    }));
  }, [data, lineIds]);

  return (
    <div className="space-y-16 lg:space-y-20">
      {groups.map(({ id, items }) => (
        <CategoryGroup
          key={id}
          lineId={id}
          items={items}
          onJump={() => onJumpCategory(id)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

/**
 * CategoryGroup — 单条学习线的 section
 *
 * heading 用学习线主色的色块作为视觉锚点（一眼区分），
 * 右侧"只看…"切换到该线的扁平视图（聚焦读这一条线）。
 */
const CategoryGroup: React.FC<{
  lineId: string;
  items: AIKnowledgeConceptItem[];
  onJump: () => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({ lineId, items, onJump, onCardClick }) => {
  const meta = lineById[lineId];
  const color = meta?.color ?? "#241C15";

  return (
    <section>
      {/* heading：色块 + 大字线名 + 计数 + 右侧"只看" */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8 pb-5 border-b-2 border-ink">
        <div className="flex items-center gap-4">
          {/* 色块徽章 —— 用学习线主色标识 */}
          <span
            className="inline-flex items-center justify-center w-10 h-10 border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_#241C15] text-white"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            <Sparkle4 className="w-4 h-4" color="currentColor" />
          </span>
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">
              {meta?.startHint ?? "Topic"}
            </div>
            <h3 className="font-display font-extrabold text-[26px] md:text-[30px] text-ink leading-[1.1] mt-0.5">
              {meta?.name ?? lineId}
              <span className="font-mono text-[14px] text-ink/45 ml-3 align-middle">
                {items.length}
              </span>
            </h3>
          </div>
        </div>

        {/* 只看 —— 切换到该线扁平视图 */}
        {items.length > 1 && (
          <button
            onClick={onJump}
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <span>只看「{meta?.tag ?? lineId}」</span>
            <ArrowRight
              className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </button>
        )}
      </div>

      {/* 卡片网格 —— 3 列上限，让卡片更宽 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {items.map((item) => (
          <KnowCard
            key={item.id}
            item={item}
            onClick={() => onCardClick(item)}
          />
        ))}
      </div>
    </section>
  );
};

/**
 * FlatCatalog — 选了具体分类 / 搜索时的扁平视图
 *
 * 单一结果列表 + 简洁的"结果摘要 + 清除"行。
 * total 是当前 type 下的总数（不是全站），用作 "N/M" 显示。
 */
const FlatCatalog: React.FC<{
  data: AIKnowledgeConceptItem[];
  categoryLabel: string;
  searchQuery: string;
  total: number;
  onClear: () => void;
  onCardClick: (item: AIKnowledgeConceptItem) => void;
}> = ({
  data,
  categoryLabel,
  searchQuery,
  total,
  onClear,
  onCardClick,
}) => {
  const isSearching = !!searchQuery.trim();
  return (
    <>
      {/* 结果摘要 */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8 pb-6 border-b-2 border-ink/15">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55 mb-1.5">
            {isSearching ? "Search results" : "Browsing"}
          </div>
          <h2 className="font-display font-extrabold text-[22px] md:text-[28px] text-ink leading-tight">
            {isSearching ? (
              <>
                关键词「
                <span className="text-coral">{searchQuery}</span>」
              </>
            ) : (
              categoryLabel
            )}
            <span className="font-mono text-[14px] text-ink/55 ml-3 align-middle">
              {data.length} / {total}
            </span>
          </h2>
        </div>
        <button
          onClick={onClear}
          className="font-sans text-[13px] text-ink/60 hover:text-ink underline underline-offset-4 transition-colors"
        >
          清除筛选 / 看全部
        </button>
      </div>

      {/* 卡片网格 或 空状态 */}
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {data.map((item) => (
            <KnowCard
              key={item.id}
              item={item}
              onClick={() => onCardClick(item)}
            />
          ))}
        </div>
      ) : (
        <EmptyState query={searchQuery} onClear={onClear} />
      )}
    </>
  );
};

/**
 * TypeSegmented — 概念讲解 / 视频精讲 形态切换（紧凑 inline 版）
 *
 * 与分类 chips 同行，作为筛选区第一控件。两段 segmented control：
 *   📖 概念讲解   ▶ 视频精讲
 *
 * 视觉：stamp pill 双段；选中段为深底白字，未选中段为白底深字，悬浮上提。
 * 完全无 "全部" 概念 —— 两种形态彻底独立。
 */
const TypeSegmented: React.FC<{
  active: KnowledgeType;
  onChange: (t: KnowledgeType) => void;
}> = ({ active, onChange }) => {
  const options: {
    id: KnowledgeType;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "concept", label: "概念讲解", icon: BookOpen },
    { id: "video", label: "视频精讲", icon: Play },
  ];

  return (
    <div className="inline-flex items-stretch bg-white border-2 border-ink rounded-full shadow-stamp p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
              isActive
                ? "bg-ink text-cream shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Icon
              className={`w-3.5 h-3.5 ${isActive && opt.id === "video" ? "fill-cream" : ""}`}
              strokeWidth={2.5}
            />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * ViewSegmented — 概念形态下「目录 / 全景」视图切换
 *
 * 与 TypeSegmented 同款 stamp pill 风格，仅在概念形态出现。
 * 目录 = 现有卡片网格；全景 = 知视图谱（地铁线路 + 关联高亮）。
 */
const ViewSegmented: React.FC<{
  active: ConceptView;
  onChange: (v: ConceptView) => void;
}> = ({ active, onChange }) => {
  const options: {
    id: ConceptView;
    label: string;
    icon: React.ElementType;
  }[] = [
    { id: "catalog", label: "目录视图", icon: LayoutGrid },
    { id: "map", label: "全景视图", icon: Network },
  ];

  return (
    <div className="inline-flex items-stretch bg-white border-2 border-ink rounded-full shadow-stamp p-1">
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = active === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
              isActive
                ? "bg-coral text-white shadow-[2px_2px_0_0_#241C15]"
                : "text-ink/65 hover:text-ink"
            }`}
          >
            <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/**
 * VideoRowList — 视频精讲专属列表（一行一个横向卡片）
 *
 * 与概念模式的"卡片网格"完全不同的形态：
 *   每行一张超宽卡片，内部「左：B 站视频封面 + ▶」「右：PPT 网站预览 + ↗」「下：标题/描述/CTA」
 *
 * 设计意图：
 *   视频精讲数量本身就少（4-5 个），用网格反而显得空；
 *   一行一个 + 视频/网站并排，明确暗示两种学习路径同时可用。
 */
const VideoRowList: React.FC<{
  data: AIKnowledgeVideoItem[];
  onCardClick: (item: AIKnowledgeVideoItem) => void;
}> = ({ data, onCardClick }) => {
  if (data.length === 0) {
    return (
      <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
        <Play className="w-10 h-10 mx-auto text-ink/40 mb-6" strokeWidth={2} />
        <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
          视频精讲正在录制中
        </h3>
        <p className="font-sans text-[15px] text-ink-secondary max-w-md mx-auto">
          每一集都对照一个 PPT 网站。新视频上线时会出现在这里。
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-7 lg:space-y-8">
      {data.map((item) => (
        <VideoRowCard
          key={item.id}
          item={item}
          onClick={() => onCardClick(item)}
        />
      ))}
    </div>
  );
};

/**
 * VideoRowCard — 视频精讲单行卡片
 *
 * 布局（lg+）：
 *   左列 60%  → 双联预览：视频缩略 | PPT 网站缩略，两个都可独立点击
 *   右列 40%  → 标题 / 描述 / 双 CTA（B 站观看 + 打开 PPT）
 *
 * 响应式：
 *   md 以下双联竖叠 + 右列在下方
 */
const VideoRowCard: React.FC<{
  item: AIKnowledgeVideoItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const tagClass = categoryColors[item.category] || "bg-cream text-ink";
  const easyPrefix = "轻松理解";
  const isEasy = item.title.startsWith(easyPrefix);
  const coreName = isEasy
    ? item.title.slice(easyPrefix.length).trim()
    : item.title;

  const Cover = COVER_MAP[item.id];
  const hasBilibili = !!item.bilibiliUrl;

  const openBilibili = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasBilibili) window.open(item.bilibiliUrl, "_blank", "noopener");
  };

  return (
    <article className="group bg-white border-2 border-ink rounded-3xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ───── 双联预览（左 7/12）───── */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-b-2 lg:border-b-0 lg:border-r-2 border-ink">
          {/* 视频封面 —— sm 左 / 移动端上 */}
          <button
            onClick={openBilibili}
            disabled={!hasBilibili}
            className="relative group/v bg-ink/95 aspect-[16/10] sm:aspect-auto sm:min-h-[220px] border-b-2 sm:border-b-0 sm:border-r-2 border-ink overflow-hidden disabled:cursor-not-allowed"
            title={hasBilibili ? "在 B 站观看" : "视频上线中"}
          >
            {item.videoCoverUrl ? (
              <img
                src={item.videoCoverUrl}
                alt={`${item.title} · B 站封面`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-500 ease-spring group-hover/v:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Play
                    className="w-12 h-12 mx-auto text-cream/40 mb-2"
                    strokeWidth={2}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cream/45">
                    Cover Coming
                  </span>
                </div>
              </div>
            )}

            {/* 顶部标签 */}
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 bg-pop text-white border-2 border-ink rounded-full font-mono text-[10px] font-bold shadow-[2px_2px_0_0_#241C15]">
              <Play className="w-2.5 h-2.5 fill-white" strokeWidth={3} />
              B 站视频
            </span>

            {/* 大 ▶ 中心 */}
            {hasBilibili && (
              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-16 h-16 flex items-center justify-center bg-pop/95 border-[3px] border-white rounded-full shadow-[4px_4px_0_0_#241C15] transition-transform duration-300 ease-spring group-hover/v:scale-110">
                  <PlayCircle
                    className="w-9 h-9 text-white"
                    strokeWidth={2.5}
                  />
                </span>
              </span>
            )}

            {/* 时长 / 状态 */}
            {hasBilibili ? (
              item.duration && (
                <span className="absolute bottom-3 right-3 inline-flex items-center px-2 py-0.5 bg-ink/85 text-white rounded-md font-mono text-[10.5px] font-bold">
                  {item.duration}
                </span>
              )
            ) : (
              <span className="absolute bottom-3 right-3 inline-flex items-center px-2 py-0.5 bg-cream/15 text-cream/70 border border-cream/30 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider">
                Coming Soon
              </span>
            )}
          </button>

          {/* PPT 网站封面 —— sm 右 / 移动端下 */}
          <button
            onClick={onClick}
            className="relative group/p bg-cream aspect-[16/10] sm:aspect-auto sm:min-h-[220px] overflow-hidden"
            title="打开 PPT 网站"
          >
            {Cover ? (
              <div className="absolute inset-0">
                <Cover />
              </div>
            ) : (
              <img
                src={item.imageUrl}
                alt={`${item.title} · 配套 PPT`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-spring group-hover/p:scale-105"
              />
            )}

            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 bg-white text-ink border-2 border-ink rounded-full font-mono text-[10px] font-bold shadow-[2px_2px_0_0_#241C15]">
              <BookOpen className="w-2.5 h-2.5" strokeWidth={3} />
              配套 PPT
            </span>

            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 bg-ink text-white rounded-full font-sans font-semibold text-[11px] opacity-0 group-hover/p:opacity-100 transition-opacity duration-250">
              <ArrowUpRight className="w-3 h-3" strokeWidth={3} />
              打开
            </span>
          </button>
        </div>

        {/* ───── 右列：内容 + CTA（右 5/12）───── */}
        <div className="lg:col-span-5 flex flex-col p-6 lg:p-7">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[11px] shadow-[1.5px_1.5px_0_0_#241C15] ${tagClass}`}
            >
              {item.category}
            </span>
            {isEasy && (
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                轻松理解
              </span>
            )}
          </div>

          <h3 className="font-display font-extrabold text-[22px] md:text-[24px] text-ink leading-[1.2] mb-3">
            {coreName}
          </h3>

          <p className="font-sans text-[14px] text-ink-secondary leading-[1.65] flex-1">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-5 border-t-2 border-ink/10">
            <button
              onClick={openBilibili}
              disabled={!hasBilibili}
              className={`group/b inline-flex items-center gap-1.5 px-4 py-2 border-2 border-ink rounded-full font-sans font-semibold text-[13px] transition-all duration-250 ease-spring ${
                hasBilibili
                  ? "bg-pop text-white shadow-stamp hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
                  : "bg-cream text-ink/40 border-ink/30 cursor-not-allowed"
              }`}
            >
              <Play
                className={`w-3.5 h-3.5 ${hasBilibili ? "fill-white" : ""}`}
                strokeWidth={2.5}
              />
              <span>{hasBilibili ? "B 站观看" : "视频待上线"}</span>
              {hasBilibili && (
                <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
              )}
            </button>

            <button
              onClick={onClick}
              className="group/p inline-flex items-center gap-1.5 px-4 py-2 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:5px_5px_0_0_#241C15]"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={2.5} />
              <span>打开配套视频素材</span>
              <ArrowUpRight
                className="w-3 h-3 transition-transform duration-250 group-hover/p:translate-x-0.5 group-hover/p:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

/**
 * KnowCard — 概念讲解卡片（仅概念模式使用）
 *
 * 视频精讲走独立的 VideoRowCard，不复用此组件。
 *
 * 设计：16:10 封面 + 分层标题 + 描述。hover 时整卡上提 + 右下露出深色箭头。
 */
const KnowCard: React.FC<{
  item: AIKnowledgeConceptItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const lineMeta = lineById[item.line];
  const easyPrefix = "轻松理解";
  const isEasy = item.title.startsWith(easyPrefix);
  const coreName = isEasy
    ? item.title.slice(easyPrefix.length).trim()
    : item.title;

  /* 命中专属封面组件则用 SVG 封面，否则 fall back 到截图 */
  const Cover = COVER_MAP[item.id];

  return (
    <button
      onClick={onClick}
      className="group relative text-left flex flex-col bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-300 ease-spring hover:-translate-x-1 hover:-translate-y-1 hover:[box-shadow:8px_8px_0_0_#241C15] overflow-hidden"
    >
      <div className="relative bg-cream border-b-2 border-ink aspect-[16/10] overflow-hidden">
        {Cover ? (
          <Cover />
        ) : (
          <img
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
          />
        )}

        <span
          className="absolute top-2.5 left-2.5 inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[10.5px] shadow-[1.5px_1.5px_0_0_#241C15] text-white"
          style={{ backgroundColor: lineMeta?.color ?? "#241C15" }}
        >
          {lineMeta?.tag ?? item.category}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-4 lg:p-[18px]">
        {isEasy && (
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45 mb-1">
            轻松理解
          </div>
        )}
        <h3 className="font-display font-extrabold text-[17px] md:text-[18px] text-ink leading-[1.25] mb-2 line-clamp-2">
          {coreName}
        </h3>
        <p className="font-sans text-[13px] text-ink-secondary leading-[1.6] line-clamp-2 flex-1">
          {item.description}
        </p>
      </div>

      <span className="absolute bottom-3.5 right-3.5 w-8 h-8 flex items-center justify-center bg-ink text-white rounded-full opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 ease-spring">
        <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} />
      </span>
    </button>
  );
};

/**
 * BgStampCards — Hero 背景"卡片墙"装饰
 *
 * 暗示「图书馆/目录」氛围。3 张半透明 stamp 风迷你卡随机旋转分布，
 * 在大屏可见，移动端隐藏避免视觉拥挤。
 */
const BgStampCards: React.FC = () => (
  <>
    <div
      className="hidden lg:block absolute top-[18%] right-[8%] w-[120px] h-[80px] bg-white/30 border-2 border-ink/25 rounded-2xl"
      style={{ transform: "rotate(8deg)" }}
      aria-hidden
    />
    <div
      className="hidden lg:block absolute bottom-[22%] left-[6%] w-[100px] h-[70px] bg-white/25 border-2 border-ink/20 rounded-2xl"
      style={{ transform: "rotate(-7deg)" }}
      aria-hidden
    />
    <div
      className="hidden lg:block absolute top-[58%] right-[5%] w-[90px] h-[60px] bg-white/20 border-2 border-ink/20 rounded-2xl"
      style={{ transform: "rotate(14deg)" }}
      aria-hidden
    />
  </>
);

const EmptyState: React.FC<{ query: string; onClear: () => void }> = ({
  query,
  onClear,
}) => (
  <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
    <Sparkle4
      className="w-10 h-10 mx-auto text-ink/40 mb-6"
      color="#241C15"
    />
    <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
      没有找到相关内容
    </h3>
    <p className="font-sans text-[15px] text-ink-secondary mb-8 max-w-md mx-auto">
      {query
        ? `「${query}」目前还没写，可以换个关键词试试，或者告诉我们你想读这个概念。`
        : "这个分类暂时还没有内容，可以选其他分类先看看。"}
    </p>
    <button
      onClick={onClear}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[14px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      <X className="w-4 h-4" strokeWidth={2.5} />
      清除筛选
    </button>
  </div>
);

export default AIKnowledge;
