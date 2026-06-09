/**
 * AI 文章 · 详情页（cream chrome 画框 · 收/展同位置）
 *
 * 与「知视详情页」相同的 chrome 模式（左上 butter E 胶囊 + 标题 + 收起 / 展开），
 * 仅返回路径与文案不同。按用户要求两个详情页**各自独立维护**（不抽公共组件），
 * 保留各自的调整自由度。
 *
 *   ─ chrome 条：cream 米黄底 + ink 2px 底分割线
 *   ─ 收起 / 展开按钮永远在「左上同一位置」（肌肉记忆一致）
 *   ─ Esc 键始终一键返回文章列表
 *   ─ 404 / 空态用 Mailchimp-Freddie stamp 卡
 *
 * 文章本体（beautiful-article 生成的单文件 HTML）在 iframe 中加载，
 * iframe 占据 chrome 下方的所有剩余空间。
 */

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  AlertCircle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { AIArticleItem } from "../types";
import { findArticleById } from "../data/aiArticleData";

const AIArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* 优先使用 location.state 中的 item，否则按 id 查找 */
  let item: AIArticleItem | undefined = location.state?.item;
  if (!item && id) {
    item = findArticleById(id);
  }

  /* Esc 键返回列表 */
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/ai-article");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [item, navigate]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 404 · 文章不存在
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (!item) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-10 text-center max-w-md">
          <AlertCircle
            className="w-10 h-10 text-coral mx-auto mb-4"
            strokeWidth={2.5}
          />
          <div className="font-display font-extrabold text-[22px] text-ink mb-2">
            文章不存在
          </div>
          <p className="font-sans text-[13px] text-ink/55 mb-6">
            该文章可能已下架或链接失效
          </p>
          <button
            onClick={() => navigate("/ai-article")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-ink text-cream border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            返回编辑专栏
          </button>
        </div>
      </div>
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 空态 · 文章正在准备中（无 htmlUrl）
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  if (!item.htmlUrl) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-6">
        <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-10 py-10 text-center max-w-md">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 bg-butter border-2 border-ink rounded-full">
            <BookOpen className="w-6 h-6 text-ink" strokeWidth={2.2} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-2">
            COMING SOON
          </div>
          <div className="font-display font-extrabold text-[22px] text-ink mb-3">
            {item.title}
          </div>
          <p className="font-sans text-[13px] text-ink/65 mb-6 leading-relaxed">
            {item.lead}
          </p>
          <button
            onClick={() => navigate("/ai-article")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-ink border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] hover:bg-butter"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            返回编辑专栏
          </button>
        </div>
      </div>
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 正常 · iframe + 可收起 Chrome 条
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
  return (
    <div className="fixed inset-0 z-[999] bg-white overflow-hidden flex flex-col">
      {/* ━━━ 顶部 Chrome 区 ━━━ */}
      <div
        className={`flex-shrink-0 bg-cream overflow-hidden transition-[height,border-bottom-width] duration-300 ease-spring ${
          isCollapsed ? "h-0 border-b-0" : "h-14 border-b-2 border-ink"
        }`}
        aria-hidden={isCollapsed}
      >
        <div className="h-14 flex items-center gap-3 px-3 lg:px-4">
          {/* 左侧主控制区（与知视相同的三段 stamp 卡） */}
          <div className="flex items-stretch bg-white border-2 border-ink rounded-xl shadow-stamp overflow-hidden min-w-0 max-w-[min(calc(100%-160px),440px)]">
            <button
              onClick={() => navigate("/ai-article")}
              aria-label="返回编辑专栏"
              className="group flex items-stretch hover:bg-cream/60 transition-colors min-w-0"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-9 bg-butter border-r-2 border-ink">
                <span className="font-sans font-extrabold text-[15px] text-ink leading-none">
                  E
                </span>
              </div>
              <div className="flex flex-col items-start justify-center px-3 py-1 min-w-0">
                <span className="inline-flex items-center gap-1 font-sans font-bold text-[12px] text-ink leading-tight group-hover:text-coral transition-colors">
                  <ArrowLeft
                    className="w-3 h-3 -ml-0.5"
                    strokeWidth={2.5}
                  />
                  返回 Easy AI · 编辑专栏
                </span>
                <span className="font-mono text-[10px] text-ink/55 leading-tight mt-0.5 truncate max-w-full">
                  {item.title}
                </span>
              </div>
            </button>

            {/* 收起按钮 */}
            <button
              onClick={() => setIsCollapsed(true)}
              title="收起导航条（点击左上 E 胶囊重新展开）"
              aria-label="收起导航条"
              className="flex items-center justify-center px-2.5 border-l-2 border-ink hover:bg-cream/60 text-ink/60 hover:text-ink transition-colors"
            >
              <ChevronUp className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1" />

          {/* 右侧：新窗打开按钮 */}
          <a
            href={item.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="在新窗口打开（脱离边框全屏阅读）"
            className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-ink border-2 border-ink rounded-xl font-sans font-bold text-[12px] shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15] hover:bg-butter flex-shrink-0"
          >
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-[1px] group-hover/btn:-translate-y-[1px]"
              strokeWidth={2.5}
            />
            <span className="hidden sm:inline">在新窗打开</span>
          </a>
        </div>
      </div>

      {/* ━━━ iframe 容器（自适应剩余高度） ━━━ */}
      <div className="flex-1 relative">
        {/* 收起态浮动胶囊（位置 = 展开态 chrome 内复合按钮起始位置） */}
        {isCollapsed && (
          <button
            onClick={() => setIsCollapsed(false)}
            aria-label="展开导航条"
            title="展开导航 · Easy AI"
            className="group fixed top-3 left-3 z-[1001] flex items-stretch bg-white border-2 border-ink rounded-xl shadow-stamp overflow-hidden transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:5px_5px_0_0_#241C15]"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-r-2 border-ink">
              <span className="font-sans font-extrabold text-[15px] text-ink leading-none">
                E
              </span>
            </div>
            <div className="flex items-center justify-center w-9 h-9 text-ink/70 group-hover:text-ink group-hover:bg-cream/60 transition-colors">
              <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
            </div>
          </button>
        )}

        {/* Loading 态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-cream/95 backdrop-blur z-[1000]">
            <div className="bg-white border-2 border-ink rounded-2xl shadow-stamp px-8 py-6 text-center min-w-[260px]">
              <div className="inline-flex items-center justify-center w-10 h-10 mb-3 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
              <div className="font-display font-extrabold text-[16px] text-ink mb-1">
                正在打开文章
              </div>
              <div className="font-mono text-[11px] text-ink/55 truncate max-w-[240px] mx-auto">
                {item.title}
              </div>
            </div>
          </div>
        )}

        <iframe
          src={item.htmlUrl}
          className="w-full h-full block border-0"
          title={item.title}
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
};

export default AIArticleDetail;
