/**
 * AI 知视 · Mailchimp-Freddie 风
 *
 * 信息架构：
 *   1. HERO（butter 黄·"图书馆查询台"）
 *      —— 全宽居中：大标题 + 大搜索框 + 分类 chips 一体作为筛选入口
 *   2. CATALOG（cream）—— 结果摘要 + 4 列 stamp 风卡片网格
 *   3. CTA（ink 深色·双栏）—— 左文字 + 右 AIK-01 插画位
 *
 * 视觉语言（区别于首页 Hero）：
 *   首页 Hero = 双栏 + 大动画插画（品牌门面）
 *   AI 知视 Hero = 全宽居中 + 大搜索为主（工具入口）
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { aiKnowledgeData, categoryColors } from "../data/aiKnowledgeData";
import { AIKnowledgeItem } from "../types";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";
import { COVER_MAP } from "../components/KnowledgeCovers";

const AIKnowledge: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");
  const [searchQuery, setSearchQuery] = useState<string>("");

  /* 分类列表 + 每类计数 */
  const categoriesWithCount = useMemo(() => {
    const counts = new Map<string, number>();
    aiKnowledgeData.forEach((i) => {
      counts.set(i.category, (counts.get(i.category) || 0) + 1);
    });
    return [
      { name: "全部", count: aiKnowledgeData.length },
      ...Array.from(counts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count })),
    ];
  }, []);

  /* 筛选 */
  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return aiKnowledgeData.filter((item) => {
      const cat =
        selectedCategory === "全部" || item.category === selectedCategory;
      const match =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return cat && match;
    });
  }, [selectedCategory, searchQuery]);

  const handleCardClick = (item: AIKnowledgeItem) => {
    navigate(`/ai-knowledge/${item.id}`, { state: { item } });
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

          {/* 副标 */}
          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[640px] mx-auto mt-7">
            {aiKnowledgeData.length} 个概念 · {categoriesWithCount.length - 1}{" "}
            个方向 — 每张图都按 &ldquo;
            <span className="font-bold">真的看得懂</span>&rdquo;
            反复改过。
          </p>

          {/* 大搜索框 —— Hero 视觉主角 */}
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

          {/* 分类 chips 居中（Hero 内置筛选器） */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categoriesWithCount.map(({ name, count }) => {
              const active = selectedCategory === name;
              return (
                <button
                  key={name}
                  onClick={() => setSelectedCategory(name)}
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
        </div>
      </section>

      {/* ═══════════════════ CATALOG · 分组 / 扁平自动切换 ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10 py-16 lg:py-20">
          {/* 渲染模式判定：
              - "全部" + 无搜索 → 分组模式（按 category 拆 9 个 section）
              - 否则 → 扁平模式（单一结果列表） */}
          {selectedCategory === "全部" && !searchQuery.trim() ? (
            <GroupedCatalog
              categories={categoriesWithCount
                .filter((c) => c.name !== "全部")
                .map((c) => c.name)}
              onJumpCategory={setSelectedCategory}
              onCardClick={handleCardClick}
            />
          ) : (
            <FlatCatalog
              data={filteredData}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              total={aiKnowledgeData.length}
              onClear={() => {
                setSelectedCategory("全部");
                setSearchQuery("");
              }}
              onCardClick={handleCardClick}
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
 * 按 category 分组渲染，每组一个 section（heading + 网格），
 * 让用户进页面就看到"被认真整理过"的层次感，而不是 37 张卡的瀑布流。
 *
 * 分类顺序由父组件传入（已按数量降序排好）。
 * heading 上的"看专区 →"按钮可一键切换到该分类的扁平视图。
 */
const GroupedCatalog: React.FC<{
  categories: string[];
  onJumpCategory: (name: string) => void;
  onCardClick: (item: AIKnowledgeItem) => void;
}> = ({ categories, onJumpCategory, onCardClick }) => {
  /* 按分类预切片，避免每个 group 都跑一次 filter */
  const groups = useMemo(() => {
    const map = new Map<string, AIKnowledgeItem[]>();
    aiKnowledgeData.forEach((item) => {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)!.push(item);
    });
    return categories.map((name) => ({
      name,
      items: map.get(name) || [],
    }));
  }, [categories]);

  return (
    <div className="space-y-16 lg:space-y-20">
      {groups.map(({ name, items }) => (
        <CategoryGroup
          key={name}
          name={name}
          items={items}
          onJump={() => onJumpCategory(name)}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

/**
 * CategoryGroup — 单个分类的 section
 *
 * heading 用对应 categoryColors 的色块作为视觉锚点（一眼区分分类），
 * 右侧"看专区 →"切换到该分类的扁平视图（聚焦读这一类）。
 */
const CategoryGroup: React.FC<{
  name: string;
  items: AIKnowledgeItem[];
  onJump: () => void;
  onCardClick: (item: AIKnowledgeItem) => void;
}> = ({ name, items, onJump, onCardClick }) => {
  const tagClass = categoryColors[name] || "bg-cream text-ink";

  return (
    <section>
      {/* heading：色块 + 大字分类名 + 计数 + 右侧"看专区" */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8 pb-5 border-b-2 border-ink">
        <div className="flex items-center gap-4">
          {/* 色块徽章 —— 用 categoryColors 标识分类 */}
          <span
            className={`inline-flex items-center justify-center w-10 h-10 border-2 border-ink rounded-2xl shadow-[3px_3px_0_0_#241C15] ${tagClass}`}
            aria-hidden
          >
            <Sparkle4 className="w-4 h-4" color="currentColor" />
          </span>
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink/50">
              Topic
            </div>
            <h3 className="font-display font-extrabold text-[26px] md:text-[30px] text-ink leading-[1.1] mt-0.5">
              {name}
              <span className="font-mono text-[14px] text-ink/45 ml-3 align-middle">
                {items.length}
              </span>
            </h3>
          </div>
        </div>

        {/* 看专区 —— 切换到该分类扁平视图 */}
        {items.length > 1 && (
          <button
            onClick={onJump}
            className="group inline-flex items-center gap-1.5 px-4 py-2 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <span>只看「{name}」</span>
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
 */
const FlatCatalog: React.FC<{
  data: AIKnowledgeItem[];
  selectedCategory: string;
  searchQuery: string;
  total: number;
  onClear: () => void;
  onCardClick: (item: AIKnowledgeItem) => void;
}> = ({ data, selectedCategory, searchQuery, total, onClear, onCardClick }) => {
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
              selectedCategory
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
 * KnowCard — 知识卡片
 *
 * 修复 v2 的"过瘦"问题：
 *   - 封面比例 4:3 → 16:10（更扁，卡片整体不那么高）
 *   - 删除底部 border + 箭头行（箭头改为 hover 浮在右下）
 *   - "轻松理解" chip → 小预告条（mono 字体 + 小字号），与主标题分层
 *   - padding 5 → 4，密度更紧
 */
const KnowCard: React.FC<{
  item: AIKnowledgeItem;
  onClick: () => void;
}> = ({ item, onClick }) => {
  const tagClass = categoryColors[item.category] || "bg-cream text-ink";
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
      {/* 封面图 16:10 */}
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
        {/* 分类 chip 更小，更内敛 */}
        <span
          className={`absolute top-2.5 left-2.5 inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[10.5px] shadow-[1.5px_1.5px_0_0_#241C15] ${tagClass}`}
        >
          {item.category}
        </span>
      </div>

      {/* 文字区 —— 标题分层（小预告条 + 大主名） */}
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

      {/* hover 箭头浮在右下，默认隐藏 */}
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
