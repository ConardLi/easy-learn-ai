/**
 * AI 应用 → 作品集 Works
 *
 * 隐喻：个人工作室档案陈列（Mailchimp 早期 careers / Stripe Press 作者页）
 *   ─ 作者退场，作品本身为主角
 *   ─ Hero 是宣言 + 工具栏（分类 chip + 作品索引下拉）
 *   ─ 每件作品是一张"装裱过的展品"：stamp 大卡 + 截图 + 大字标题 + 自定义 actions
 *
 * 信息架构：
 *   1. HERO        宣言 + manifesto + 分类筛选 + 作品索引（快速跳转）
 *   2. WORKS       2 列 grid 大卡
 *   3. COLOPHON    底部"工坊版权页"
 *
 * 选中 demo 时：保留 Header 的全屏内嵌预览 + stamp sub-nav
 *
 * 关键能力：
 *   - WorkCard 渲染自定义 actions 数组：每件作品可配 N 个按钮，
 *     按钮文案任意，类型分 embed（站内 iframe）/ external（新窗跳转）
 *   - 旧数据 demoUrl / githubUrl 自动 fallback 到 actions
 *   - 作品索引下拉：搜索 + 单击 → scroll 到卡片 + coral 闪烁高亮 1.2s
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  ArrowUpRight,
} from "lucide-react";
import { aiApplicationData } from "../data/aiApplicationData";
import { AIApplicationItem, WorkAction } from "../types";
import { WorkFilter } from "../components/application/WorkFilter";

/* ──────────────────────────────────────────────────────────────
 * 分类色循环
 * ────────────────────────────────────────────────────────────── */
const CATEGORY_PALETTE = [
  { bg: "bg-butter", text: "text-ink", border: "border-ink" },
  { bg: "bg-coral", text: "text-white", border: "border-ink" },
  { bg: "bg-teal", text: "text-white", border: "border-ink" },
  { bg: "bg-cream", text: "text-ink", border: "border-ink" },
] as const;

const ALL_LABEL = "全部";

/* ──────────────────────────────────────────────────────────────
 * actions 兼容层
 *
 * 1) 显式 actions: 直接用
 * 2) 仅有 demoUrl/githubUrl 老数据: 自动转换为
 *      [ {label:"在线体验", type:"embed", url:demoUrl},
 *        {label:"源码",     type:"external", url:githubUrl} ]
 * ────────────────────────────────────────────────────────────── */
const normalizeActions = (item: AIApplicationItem): WorkAction[] => {
  if (item.actions && item.actions.length > 0) return item.actions;
  const acts: WorkAction[] = [];
  if (item.demoUrl) {
    acts.push({
      label: "在线体验",
      type: "embed",
      url: item.demoUrl,
      variant: "primary",
    });
  }
  if (item.githubUrl) {
    acts.push({
      label: "源码",
      type: "external",
      url: item.githubUrl,
      variant: "secondary",
    });
  }
  return acts;
};

/* 按数组顺序自动决定主次：第 0 个 primary，其余 secondary */
const resolveVariant = (
  action: WorkAction,
  index: number,
): "primary" | "secondary" =>
  action.variant ?? (index === 0 ? "primary" : "secondary");

const AIApplication: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL_LABEL);
  const [selectedDemo, setSelectedDemo] = useState<AIApplicationItem | null>(
    null,
  );
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const highlightTimerRef = useRef<number | null>(null);

  /* ── 数据派生 ───────────────────────────────────── */
  const orderedCategories = useMemo(() => {
    const unique: string[] = [];
    aiApplicationData.forEach((item) => {
      if (!unique.includes(item.category)) unique.push(item.category);
    });
    return [ALL_LABEL, ...unique];
  }, []);

  const countByCategory = useMemo(() => {
    const map = new Map<string, number>();
    aiApplicationData.forEach((item) => {
      map.set(item.category, (map.get(item.category) ?? 0) + 1);
    });
    return map;
  }, []);

  const filteredData = useMemo(
    () =>
      selectedCategory === ALL_LABEL
        ? aiApplicationData
        : aiApplicationData.filter(
            (item) => item.category === selectedCategory,
          ),
    [selectedCategory],
  );

  const numberMap = useMemo<Map<string, number>>(() => {
    const m = new Map<string, number>();
    aiApplicationData.forEach((item, i) => m.set(item.id, i + 1));
    return m;
  }, []);

  const colorForCategory = (cat: string) => {
    const idx = orderedCategories.indexOf(cat) - 1;
    if (idx < 0) return null;
    return CATEGORY_PALETTE[idx % CATEGORY_PALETTE.length];
  };

  /* ── 跳转到作品卡 + 闪烁高亮 ───────────────────── */
  const handleJumpTo = useCallback(
    (workId: string) => {
      const work = aiApplicationData.find((w) => w.id === workId);
      if (!work) return;
      /* 若该卡不在当前分类筛选下，先切回全部，让卡渲染出来 */
      if (
        selectedCategory !== ALL_LABEL &&
        work.category !== selectedCategory
      ) {
        setSelectedCategory(ALL_LABEL);
      }
      /* 等一帧让 DOM 更新到位再滚动 */
      requestAnimationFrame(() => {
        const el = document.getElementById(`work-${workId}`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setHighlightedId(workId);
        if (highlightTimerRef.current) {
          window.clearTimeout(highlightTimerRef.current);
        }
        highlightTimerRef.current = window.setTimeout(() => {
          setHighlightedId(null);
          highlightTimerRef.current = null;
        }, 1400);
      });
    },
    [selectedCategory],
  );

  useEffect(() => {
    return () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    };
  }, []);

  /* ── 路由：进入 / 退出 iframe demo ───────────────── */
  useEffect(() => {
    if (id) {
      const app = aiApplicationData.find((item) => item.id === id);
      if (!app) {
        navigate("/ai-application", { replace: true });
        return;
      }
      const allActions = normalizeActions(app);
      const firstEmbed = allActions.find((a) => a.type === "embed");
      if (!firstEmbed) {
        navigate("/ai-application", { replace: true });
        return;
      }
      setSelectedDemo(app);
      setEmbedUrl(firstEmbed.url);
      setIsLoading(true);
    } else {
      setSelectedDemo(null);
      setEmbedUrl(null);
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!selectedDemo) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") navigate("/ai-application");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedDemo, navigate]);

  /* ════════════════════════════════════════════════
   * IFRAME 预览模式 · 沉浸式 Floating Toolbar 方案
   *
   * 设计要点：
   *   ─ fixed inset-0 全屏覆盖（z-999 盖过全站 Header），demo 100% 占视野
   *   ─ 左上"复合品牌返回按钮"= butter E logo + ← 返回 + 项目名 三合一
   *     • E logo 提供 Easy AI 品牌识别（与 Header logo 完全一致）
   *     • 返回箭头 + 文案提供功能
   *     • 项目名 mono 副标提供"我在看什么"上下文
   *   ─ 右上外链按钮（仅 demo 有 external action 时显示）
   *   ─ 不再有任何 chrome 条带，demo 设计语言独占舞台
   * ════════════════════════════════════════════════ */
  if (selectedDemo && embedUrl) {
    /* 收集所有 external 类型 action —— 源码 / 下载 / 文档 等都可能并存 */
    const externalActs = normalizeActions(selectedDemo).filter(
      (a) => a.type === "external",
    );

    return (
      <div className="fixed inset-0 z-[999] bg-white overflow-hidden">
        {/* 左上 · 复合品牌返回按钮 */}
        <button
          onClick={() => navigate("/ai-application")}
          aria-label="返回作品集"
          className="group fixed top-4 left-4 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] max-w-[calc(100vw-32px)] sm:max-w-[360px]"
        >
          {/* 左半：butter E logo（与 Header logo 同款） */}
          <div className="flex-shrink-0 flex items-center justify-center w-11 bg-butter border-r-2 border-ink rounded-l-[14px]">
            <span className="font-sans font-extrabold text-[18px] text-ink leading-none">
              E
            </span>
          </div>

          {/* 右半：双行文字 */}
          <div className="flex flex-col items-start justify-center px-3.5 py-1.5 min-w-0">
            <span className="inline-flex items-center gap-1 font-sans font-bold text-[13px] text-ink leading-tight group-hover:text-coral transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 -ml-0.5" strokeWidth={2.5} />
              返回 Easy AI - 作品集
            </span>
            <span className="font-mono text-[10px] text-ink/55 leading-tight mt-1 truncate max-w-full">
              {selectedDemo.title}
            </span>
          </div>
        </button>

        {/* 右上 · 外链按钮组（分段式 stamp 卡，支持 1~N 个）*/}
        {externalActs.length > 0 && (
          <div className="fixed top-4 right-4 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-2xl shadow-stamp overflow-hidden divide-x-2 divide-ink max-w-[calc(100vw-32px)]">
            {externalActs.map((act, i) => (
              <a
                key={`${act.label}-${i}`}
                href={act.url}
                target="_blank"
                rel="noopener noreferrer"
                title={act.label}
                className="group/btn inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 font-sans font-bold text-[13px] text-ink hover:bg-butter transition-colors duration-200"
              >
                <ArrowUpRight
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px]"
                  strokeWidth={2.5}
                />
                <span className="hidden sm:inline truncate max-w-[140px]">
                  {act.label}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Loading 态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/95 backdrop-blur z-[1000]">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-8 py-6 text-center min-w-[260px]">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
              <div className="font-display font-extrabold text-[16px] text-ink mb-1">
                正在打开 Demo
              </div>
              <div className="font-mono text-[11px] text-ink/55 truncate max-w-[240px] mx-auto">
                {selectedDemo.title}
              </div>
            </div>
          </div>
        )}

        {/* iframe 全屏 */}
        <iframe
          src={embedUrl}
          className="w-full h-full block border-0"
          title={selectedDemo.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    );
  }

  /* ════════════════════════════════════════════════
   * 列表页
   * ════════════════════════════════════════════════ */
  const totalCount = aiApplicationData.length;

  return (
    <div className="relative bg-white">
      {/* ═════════ HERO · cream 工坊门厅 ═════════ */}
      <section className="relative bg-cream border-b-2 border-ink overflow-hidden">
        {/* 右上"装裱卡"装饰组 */}
        <div className="absolute top-8 lg:top-10 right-4 lg:right-8 hidden md:block pointer-events-none">
          <div className="relative w-[170px] h-[120px]">
            <div className="absolute top-2 -left-3 w-[150px] h-[100px] bg-coral border-2 border-ink rounded-xl shadow-stamp rotate-[-6deg]" />
            <div className="absolute -top-3 left-6 w-[150px] h-[100px] bg-butter border-2 border-ink rounded-xl shadow-stamp rotate-[7deg]" />
            <div className="absolute top-1 left-1 w-[150px] h-[100px] bg-white border-2 border-ink rounded-xl shadow-stamp rotate-[1deg] flex flex-col items-center justify-center">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-ink/45 mb-1">
                § Works
              </span>
              <span className="font-display font-extrabold text-[32px] text-ink leading-none tabular-nums">
                {String(totalCount).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-14 lg:pt-20 pb-12 lg:pb-16">
          <div className="max-w-[680px]">
            <div className="flex items-center gap-3 mb-6 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
              <span>§ Works · 作品陈列</span>
              <span className="hidden sm:inline-block flex-1 max-w-[120px] border-t border-ink/15" />
            </div>

            <h1 className="font-display font-extrabold text-ink leading-[1.05] tracking-[-0.02em] mb-7">
              <span
                className="block"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                我做过的
                <span className="relative inline-block ml-[0.1em]">
                  <span className="relative z-10">东西</span>
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-3 lg:h-4 bg-butter -z-0 rounded-sm"
                  />
                </span>
                。
              </span>
            </h1>

            <p className="font-sans text-[16px] lg:text-[17px] text-ink-secondary leading-[1.65] max-w-xl mb-8">
              花园老师开源的 Agent、Skills、工具、都在这里啦。
            </p>

            <div className="flex items-center gap-3 mb-5 font-mono text-[11px] lg:text-[12px] text-ink/55 tabular-nums">
              <span>
                共 <span className="font-bold text-ink">{totalCount}</span> 件作品
              </span>
              <span className="text-ink/25">·</span>
              <span>持续在做</span>
              {selectedCategory !== ALL_LABEL && (
                <>
                  <span className="text-ink/25">·</span>
                  <span>
                    本次显示{" "}
                    <span className="font-bold text-ink">
                      {filteredData.length}
                    </span>{" "}
                    件
                  </span>
                </>
              )}
            </div>

            {/* 工具栏：分类筛选 chip row + 作品索引下拉 */}
            <div className="flex flex-wrap items-center gap-2.5 lg:gap-3">
              {orderedCategories.map((cat) => {
                const active = selectedCategory === cat;
                const count =
                  cat === ALL_LABEL
                    ? totalCount
                    : countByCategory.get(cat) ?? 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-2 pl-4 pr-3 py-2 rounded-full border-2 border-ink font-sans font-bold text-[13px] transition-all duration-250 ease-spring ${
                      active
                        ? "bg-ink text-cream shadow-stamp"
                        : "bg-white text-ink shadow-[2px_2px_0_0_#241C15] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:4px_4px_0_0_#241C15]"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full font-mono font-bold text-[10px] tabular-nums ${
                        active
                          ? "bg-butter text-ink"
                          : "bg-cream text-ink-secondary"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}

              {/* 分隔点 */}
              <span className="hidden sm:inline-block w-px h-6 bg-ink/15 mx-1" />

              {/* 作品索引下拉 */}
              <WorkFilter
                works={aiApplicationData}
                numberMap={numberMap}
                onJump={handleJumpTo}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ WORKS · 2 列大卡 grid ═════════ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredData.map((item) => (
                <WorkCard
                  key={item.id}
                  item={item}
                  issueNumber={numberMap.get(item.id) ?? 0}
                  colorForCategory={colorForCategory}
                  isHighlighted={highlightedId === item.id}
                  onEmbed={() => navigate(`/ai-application/${item.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/20 rounded-2xl px-10 py-16 text-center max-w-md mx-auto">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3">
                § Empty
              </div>
              <h3 className="font-display font-extrabold text-[20px] text-ink mb-1.5">
                这个分类下还没有作品
              </h3>
              <p className="font-sans text-[14px] text-ink-secondary mb-6">
                可以切换其他分类，或者看全部作品。
              </p>
              <button
                onClick={() => setSelectedCategory(ALL_LABEL)}
                className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
              >
                看全部作品
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═════════ COLOPHON · 工坊版权页 ═════════ */}
      <section className="bg-cream border-t-2 border-ink">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-8 lg:px-12 py-10 lg:py-12 text-center max-w-2xl mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55 mb-3">
              § Colophon · 工坊版权页
            </div>
            <h2 className="font-display font-extrabold text-[24px] lg:text-[30px] text-ink leading-[1.2] mb-3 tracking-[-0.005em]">
              以上作品{" "}
              <span className="relative inline-block">
                <span className="relative z-10">100% 开源</span>
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-2.5 lg:h-3 bg-coral/40 -z-0 rounded-sm"
                />
              </span>
              。
            </h2>
            <p className="font-sans text-[15px] lg:text-[16px] text-ink-secondary mb-7 leading-[1.65] max-w-md mx-auto">
              想合作、报 bug、给建议、或者只是想聊聊？
              <br className="hidden sm:inline" />
              欢迎来 GitHub Issues，或者在公众号留言。
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://github.com/ConardLi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-cream border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
              >
                <Github className="w-4 h-4" strokeWidth={2.5} />
                GitHub Profile
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 闪烁高亮动画 keyframe（局部注入，避免污染全局） */}
      <style>{`
        @keyframes workFlash {
          0%   { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 0 rgba(224, 122, 95, 0.85); }
          25%  { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 8px rgba(224, 122, 95, 0.4); }
          100% { box-shadow: 4px 4px 0 0 #241C15, 0 0 0 0 rgba(224, 122, 95, 0); }
        }
        .work-flash { animation: workFlash 1.4s ease-out 1; }
      `}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * WorkCard · 作品大卡
 *
 * 关键变化：CTA 区不再硬编码两个按钮，而是渲染 actions 数组。
 *   - embed 按钮 onClick → 进入 iframe 路由（父层 onEmbed）
 *   - external 按钮直接 window.open
 *   - icon 按 type 自动选
 *   - variant 主次自动决定
 * ──────────────────────────────────────────────────────────────────── */

interface WorkCardProps {
  item: AIApplicationItem;
  issueNumber: number;
  colorForCategory: (cat: string) => {
    bg: string;
    text: string;
    border: string;
  } | null;
  isHighlighted: boolean;
  onEmbed: () => void;
}

const WorkCard: React.FC<WorkCardProps> = ({
  item,
  issueNumber,
  colorForCategory,
  isHighlighted,
  onEmbed,
}) => {
  const catColor = colorForCategory(item.category);
  const actions = normalizeActions(item);

  return (
    <article
      id={`work-${item.id}`}
      className={`group flex flex-col bg-white border-2 border-ink rounded-3xl shadow-stamp overflow-hidden transition-all duration-300 ease-spring hover:-translate-x-[3px] hover:-translate-y-[3px] hover:[box-shadow:8px_8px_0_0_#241C15] scroll-mt-24 ${
        isHighlighted ? "work-flash" : ""
      }`}
    >
      <div className="relative aspect-[20/9] bg-cream overflow-hidden border-b-2 border-ink">
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="block w-full h-full object-cover transition-transform duration-[600ms] ease-spring group-hover:scale-[1.04]"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />

        {catColor && (
          <div
            className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-1 ${catColor.bg} ${catColor.text} border-2 ${catColor.border} rounded-full font-sans font-bold text-[11px] shadow-[2px_2px_0_0_#241C15]`}
          >
            {item.category}
          </div>
        )}

        <div className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 bg-ink/85 text-cream backdrop-blur rounded-full font-mono font-bold text-[10px] uppercase tracking-[0.18em] tabular-nums">
          № {String(issueNumber).padStart(2, "0")}
        </div>
      </div>

      <div className="flex-1 flex flex-col p-5 lg:p-6">
        <h3 className="font-display font-extrabold text-[20px] lg:text-[22px] text-ink leading-[1.25] mb-2.5 tracking-[-0.005em] group-hover:text-coral transition-colors">
          {item.title}
        </h3>

        <p className="font-sans text-[14.5px] lg:text-[15px] text-ink-secondary leading-[1.6] mb-4 line-clamp-2">
          {item.description}
        </p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 bg-cream border border-ink/15 rounded-md font-mono font-semibold text-[11px] text-ink-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA · 自定义 actions */}
        <div className="flex items-stretch flex-wrap gap-2.5 mt-auto">
          {actions.length > 0 ? (
            actions.map((act, idx) => (
              <ActionButton
                key={`${act.type}-${idx}-${act.url}`}
                action={act}
                variant={resolveVariant(act, idx)}
                isOnlyOne={actions.length === 1}
                onEmbedClick={onEmbed}
              />
            ))
          ) : (
            <span className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cream text-ink-tertiary border-2 border-dashed border-ink/25 rounded-full font-sans font-bold text-[13px]">
              暂无可访问的链接
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * ActionButton · 单个 CTA 按钮
 *
 * variant 决定视觉权重；type 决定 icon 与点击行为。
 *   - primary   coral 实底 + flex-1（如果是唯一按钮也 flex-1 撑满）
 *   - secondary 白底 ink 边
 * ──────────────────────────────────────────────────────────────────── */

interface ActionButtonProps {
  action: WorkAction;
  variant: "primary" | "secondary";
  isOnlyOne: boolean;
  onEmbedClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  variant,
  isOnlyOne,
  onEmbedClick,
}) => {
  /* 根据 type 选 icon：embed 用 ExternalLink（打开 demo），
     external 用 ArrowUpRight（跳走）；github label 走 brand icon */
  const isGithubLabel = /github|源码|仓库|repo/i.test(action.label);
  const Icon = isGithubLabel
    ? Github
    : action.type === "embed"
    ? ExternalLink
    : ArrowUpRight;

  const className =
    variant === "primary"
      ? `${
          isOnlyOne ? "flex-1" : "flex-1"
        } inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15]`
      : `inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[3px_3px_0_0_#241C15] transition-all duration-250 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15] hover:bg-ink hover:text-cream`;

  if (action.type === "embed") {
    return (
      <button onClick={onEmbedClick} className={className}>
        <Icon className="w-4 h-4" strokeWidth={2.5} />
        {action.label}
      </button>
    );
  }

  return (
    <a
      href={action.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Icon className="w-4 h-4" strokeWidth={2.5} />
      {action.label}
    </a>
  );
};

export default AIApplication;
