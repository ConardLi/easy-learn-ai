/**
 * AI 文章 · 编辑专栏 · Mailchimp-Freddie 风
 *
 * 信息架构（与「知视」刻意区分）：
 *   1. HERO（cream · 暖白纸质感）—— 全宽居中：eyebrow + 大标题 + 副标 + 类型 chips
 *   2. TIMELINE（cream → 白）—— 博客式时间线：年份分组，每条 = 元信息行 + 大标题 + Lead + 标签
 *      ＊ 无封面图、无卡片阴影 —— "文字本身值得点开"
 *   3. CTA（ink）—— 「想读什么？开个 Issue 告诉我」
 *
 * 设计差异化说明：
 *   - 知视是「图书馆查询台」—— 一个个概念卡片，看封面识别概念
 *   - 文章是「编辑桌」—— 一篇篇长读，按时间倒序浏览，元信息驱动而非视觉驱动
 *   - 两者共享 stamp / butter / coral / ink 调色板，但栏目人设和列表形态完全不同
 *
 * 详情页（iframe）走独立 AIArticleDetail.tsx，与知视 detail 同款 chrome 但独立维护。
 */

import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, ExternalLink } from "lucide-react";
import {
  aiArticleData,
  articleCategories,
  articleCategoryColor,
} from "../data/aiArticleData";
import { AIArticleItem } from "../types";
import {
  Sparkle4,
  Star,
  DotGrid,
  HandUnderline,
} from "../components/Decorations";
import { IllustrationImage } from "../components/IllustrationImage";

const AIArticles: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  /* 数据：按 publishDate 倒序，按类型过滤 */
  const filteredArticles = useMemo(() => {
    const sorted = [...aiArticleData].sort((a, b) =>
      b.publishDate.localeCompare(a.publishDate),
    );
    return selectedCategory === "全部"
      ? sorted
      : sorted.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  /* 按年分组（保持时间线降序） */
  const groupedByYear = useMemo(() => {
    const map = new Map<string, AIArticleItem[]>();
    for (const item of filteredArticles) {
      const year = item.publishDate.slice(0, 4);
      if (!map.has(year)) map.set(year, []);
      map.get(year)!.push(item);
    }
    return Array.from(map.entries());
  }, [filteredArticles]);

  /* chip 计数（用全集统计，不随筛选变；这样选了某类型也能看到其它类型的数量） */
  const categoriesWithCount = useMemo(
    () =>
      articleCategories.map((c) => ({
        id: c,
        count:
          c === "全部"
            ? aiArticleData.length
            : aiArticleData.filter((a) => a.category === c).length,
      })),
    [],
  );

  const handleArticleClick = (item: AIArticleItem) => {
    navigate(`/ai-article/${item.id}`, { state: { item } });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      {/* ═══════════════════ HERO · cream 暖纸感 ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
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

        <div className="relative max-w-[920px] mx-auto px-6 lg:px-10 pt-20 lg:pt-24 pb-14 lg:pb-16 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp font-sans font-semibold text-[12px] uppercase tracking-wider text-ink mb-8">
            <Star className="w-3.5 h-3.5" color="#E07A5F" filled />
            <span>§ 编辑专栏 · Editor&rsquo;s Desk</span>
          </div>

          {/* 主标题 */}
          <h1 className="font-display font-extrabold text-display-xl text-ink">
            <span className="whitespace-nowrap">把一篇文章，</span>{" "}
            <span className="whitespace-nowrap">
              编辑成你
              <span className="relative inline-block ml-[0.05em]">
                <span className="relative z-10">愿意读完</span>
                <HandUnderline
                  className="absolute -bottom-2 left-0 right-0 w-full h-3"
                  color="#E07A5F"
                />
              </span>
              的样子。
            </span>
          </h1>

          <p className="font-sans font-medium text-[17px] md:text-[19px] leading-[1.65] text-ink/85 max-w-[640px] mx-auto mt-7">
            {aiArticleData.length} 篇精编长文 — 用{" "}
            <a
              href="https://github.com/ConardLi/web-design-skill/tree/main/skills/beautiful-article"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-coral decoration-2 hover:text-coral transition-colors"
            >
              beautiful-article
            </a>{" "}
            排版，离线可读、可分享。
          </p>

          {/* chips —— 仅类型过滤（无搜索框，数量少） */}
          {categoriesWithCount.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 mt-10">
              {categoriesWithCount.map(({ id, count }) => {
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
                    <span>{id}</span>
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
      </section>

      {/* ═══════════════════ TIMELINE · 博客式时间线 ═══════════════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        <div className="relative max-w-[860px] mx-auto px-6 lg:px-10 py-14 lg:py-18">
          {filteredArticles.length === 0 ? (
            <EmptyState
              category={selectedCategory}
              onClear={() => setSelectedCategory("全部")}
            />
          ) : (
            <div className="space-y-14 lg:space-y-18">
              {groupedByYear.map(([year, items]) => (
                <YearSection
                  key={year}
                  year={year}
                  items={items}
                  onSelect={handleArticleClick}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ CTA · 左文 + 右插画 ═══════════════════ */}
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
            <div className="lg:col-span-7">
              <h2 className="font-display font-extrabold text-display-lg text-white">
                <span className="whitespace-nowrap">想读什么？</span>{" "}
                <span className="whitespace-nowrap">
                  告诉我们，
                  <span className="text-butter">下一篇就写。</span>
                </span>
              </h2>
              <p className="font-serif italic text-[17px] text-white/65 mt-6 max-w-xl">
                这里的每篇文章都来自真实阅读 / 复盘 / 整理。提交 Issue
                或在知识星球留言，都会被认真读到。
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-10">
                <a
                  href="https://github.com/ConardLi/easy-learn-ai/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 bg-butter text-ink border-2 border-butter rounded-full font-sans font-extrabold text-[15px] shadow-[6px_6px_0_0_#E07A5F] transition-all duration-250 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:9px_9px_0_0_#E07A5F]"
                >
                  <span>提个选题给我们</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <IllustrationImage
                src="/imgs/site/Illustration-AIK-01.png"
                alt="拿着放大镜的角色在书桌前找一篇值得读的文章"
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
 * YearSection — 单一年份的时间线段
 *
 * heading 是大字年份 + 横线分隔（"── 2026 ──" 这种 ASCII 感）。
 * items 已经按日期倒序传入，本组件不再排序。
 */
const YearSection: React.FC<{
  year: string;
  items: AIArticleItem[];
  onSelect: (item: AIArticleItem) => void;
}> = ({ year, items, onSelect }) => (
  <section>
    {/* 年份 heading —— 双线分隔 + mono 大数字 */}
    <div className="flex items-center gap-4 mb-10">
      <div className="flex-1 h-0 border-t-2 border-ink/20 border-dashed" />
      <span className="font-mono font-bold text-[28px] md:text-[32px] text-ink leading-none tracking-tight tabular-nums">
        {year}
      </span>
      <div className="flex-1 h-0 border-t-2 border-ink/20 border-dashed" />
    </div>

    {/* 时间线条目列表 */}
    <ol className="space-y-10 lg:space-y-12">
      {items.map((item, idx) => (
        <TimelineEntry
          key={item.id}
          item={item}
          onSelect={onSelect}
          isLast={idx === items.length - 1}
        />
      ))}
    </ol>
  </section>
);

/**
 * TimelineEntry — 单篇文章的时间线条目
 *
 * 视觉结构：
 *   左侧细竖线（ink/20）+ 圆点 marker（类型色填充）
 *   右侧主区：日期/类型/时长/主题 元信息行 → 大标题 → Lead → 标签 → 行动按钮
 *
 * hover 行为：
 *   - 整块向左微移 2px（与 stamp 风「按下去」一致）
 *   - 标题底部出现 HandUnderline 手绘下划线
 *   - marker 圆点放大 + 描边变粗
 */
const TimelineEntry: React.FC<{
  item: AIArticleItem;
  onSelect: (item: AIArticleItem) => void;
  isLast: boolean;
}> = ({ item, onSelect, isLast }) => {
  const dotColor = articleCategoryColor[item.category] ?? "#F4D35E";
  /* publishDate "YYYY-MM-DD" → "MM.DD" 显示 */
  const md = `${item.publishDate.slice(5, 7)}.${item.publishDate.slice(8, 10)}`;

  return (
    <li className="group relative pl-8 lg:pl-10">
      {/* 左竖线 —— 最后一条不画到底，让时间线自然结束 */}
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[7px] lg:left-[9px] top-7 bottom-[-2.5rem] lg:bottom-[-3rem] w-0 border-l-2 border-dashed border-ink/15"
        />
      )}

      {/* marker 圆点 —— 类型色填充 + ink 描边 + stamp 微阴影 */}
      <span
        aria-hidden
        className="absolute left-0 top-[7px] w-[18px] h-[18px] lg:w-[22px] lg:h-[22px] rounded-full border-2 border-ink shadow-[2px_2px_0_0_#241C15] transition-all duration-250 ease-spring group-hover:scale-110 group-hover:shadow-[3px_3px_0_0_#241C15]"
        style={{ backgroundColor: dotColor }}
      />

      {/* 主区 —— 整块可点 */}
      <button
        onClick={() => onSelect(item)}
        className="block w-full text-left transition-transform duration-250 ease-spring group-hover:-translate-x-[2px]"
      >
        {/* 元信息行：MM.DD · 类型 · 时长 · 主题 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3 font-mono text-[12px] text-ink/55">
          <span className="font-bold text-ink/80 tabular-nums">{md}</span>
          <span className="text-ink/25">·</span>
          <span
            className="inline-flex items-center px-2 py-0.5 border border-ink rounded-full font-sans font-bold text-[10.5px] text-ink"
            style={{ backgroundColor: dotColor + "55" }}
          >
            {item.category}
          </span>
          {item.readingMinutes && (
            <>
              <span className="text-ink/25">·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" strokeWidth={2.5} />
                {item.readingMinutes} min
              </span>
            </>
          )}
          {item.theme && (
            <>
              <span className="text-ink/25">·</span>
              <span className="uppercase tracking-[0.15em] text-ink/45">
                {item.theme}
              </span>
            </>
          )}
        </div>

        {/* 标题 —— hover 时下方手绘下划线 */}
        <h3 className="relative font-display font-extrabold text-[24px] md:text-[28px] text-ink leading-[1.2] mb-3 inline-block">
          <span className="relative z-10 group-hover:text-coral transition-colors duration-250">
            {item.title}
          </span>
          <HandUnderline
            className="absolute -bottom-1.5 left-0 right-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-250"
            color="#E07A5F"
          />
        </h3>

        {/* Lead 摘要 —— serif 体现"长读"气质 */}
        <p className="font-serif text-[15.5px] md:text-[16.5px] text-ink-secondary leading-[1.7] max-w-[680px]">
          {item.lead}
        </p>

        {/* 标签行 + 行动按钮 */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 mt-4">
          {item.tags && item.tags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] text-ink/45">
              {item.tags.map((t) => (
                <span key={t} className="hover:text-ink/70 transition-colors">
                  #{t}
                </span>
              ))}
            </div>
          ) : (
            <span aria-hidden />
          )}

          <span className="inline-flex items-center gap-1.5 font-sans font-bold text-[13px] text-ink/65 group-hover:text-ink transition-colors">
            <span>打开阅读</span>
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </span>
        </div>
      </button>

      {/* 右上角小"新窗打开"按钮 —— 不打扰主点击区 */}
      <a
        href={item.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="在新窗口打开"
        aria-label="在新窗口打开"
        className="absolute top-1 right-0 w-8 h-8 hidden md:flex items-center justify-center rounded-full text-ink/40 hover:text-ink hover:bg-white border-2 border-transparent hover:border-ink hover:shadow-stamp transition-all duration-200 ease-spring"
      >
        <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
      </a>
    </li>
  );
};

const EmptyState: React.FC<{ category: string; onClear: () => void }> = ({
  category,
  onClear,
}) => (
  <div className="bg-white border-2 border-dashed border-ink/30 rounded-3xl p-16 text-center">
    <Sparkle4
      className="w-10 h-10 mx-auto text-ink/40 mb-6"
      color="#241C15"
    />
    <h3 className="font-display font-extrabold text-[24px] text-ink mb-3">
      还没有「{category}」的文章
    </h3>
    <p className="font-sans text-[15px] text-ink-secondary mb-8 max-w-md mx-auto">
      可以先看其他类型，或者告诉我们你想读这一类。
    </p>
    <button
      onClick={onClear}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-ink border-2 border-ink rounded-full font-sans font-semibold text-[14px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
    >
      看全部文章
    </button>
  </div>
);

export default AIArticles;
