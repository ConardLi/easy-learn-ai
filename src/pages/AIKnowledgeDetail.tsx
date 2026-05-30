/**
 * AI 知视 · 详情页（cream chrome 画框 · 收/展同位置）
 *
 * 设计要点：
 *   ─ chrome 条：cream 米黄底 + ink 2px 底分割线（全站统一 stamp 语言，无突兀）
 *   ─ 收起 / 展开按钮永远在"左上同一位置"：
 *     • 展开态：chrome 内左侧三段卡 = [butter E | ← 返回文字 | ⌃ 收起]
 *     • 收起态：同位置浮动两段胶囊 = [butter E | ⌄ 展开]
 *     • 两态切换 = 同位置形态变化，用户操作肌肉记忆一致
 *   ─ 收起态仅一个胶囊（不再保留新窗按钮，按用户要求极简）
 *   ─ "新窗打开"仅在展开态 chrome 右侧出现（需要时展开即可用）
 *   ─ Esc 键始终一键返回知视列表
 *   ─ 404 / 空态用 Mailchimp-Freddie stamp 卡
 *
 * 视频形态说明：
 *   视频精讲（type === "video"）的 B 站封面 + 跳转按钮只出现在「列表卡片」上，
 *   详情页本身保持沉浸式 PPT 阅读，不再插入视频元素 —— 用户进入详情页时
 *   就是想专心看 PPT，不需要再被视频入口打扰。
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
import { AIKnowledgeItem } from "../types";
import { findKnowledgeItemById } from "../data/knowledgeLookup";

const AIKnowledgeDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* 优先使用 location.state 中的 item，没有则按 id 查找 */
  let item: AIKnowledgeItem | undefined = location.state?.item;
  if (!item && id) {
    item = findKnowledgeItemById(id);
  }

  /* Esc 键返回列表 */
  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/ai-knowledge");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [item, navigate]);

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 404 · 内容不存在
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
            内容不存在
          </div>
          <p className="font-sans text-[13px] text-ink/55 mb-6">
            该内容可能已下架或链接失效
          </p>
          <button
            onClick={() => navigate("/ai-knowledge")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-ink text-cream border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            返回知视
          </button>
        </div>
      </div>
    );
  }

  /* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 空态 · 内容正在准备中（无 htmlUrl）
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
            {item.description}
          </p>
          <button
            onClick={() => navigate("/ai-knowledge")}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-ink border-2 border-ink rounded-2xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] hover:bg-butter"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            返回知视
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
          {/* ━━ 左侧主控制区（三段 stamp 卡）━━
              位置 = 收起后 E 胶囊出现的同一位置 = 左上 */}
          <div className="flex items-stretch bg-white border-2 border-ink rounded-xl shadow-stamp overflow-hidden min-w-0 max-w-[min(calc(100%-160px),400px)]">
            {/* 段 1+2：butter E + 返回文字（合体作为返回按钮） */}
            <button
              onClick={() => navigate("/ai-knowledge")}
              aria-label="返回 AI 知视"
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
                  返回 Easy AI · AI 知视
                </span>
                <span className="font-mono text-[10px] text-ink/55 leading-tight mt-0.5 truncate max-w-full">
                  {item.title}
                </span>
              </div>
            </button>

            {/* 段 3：收起按钮（与返回按钮共享 stamp 容器，物理紧贴在左上） */}
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
            {/* 左：butter E logo（品牌锚，与展开态完全同款） */}
            <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-butter border-r-2 border-ink">
              <span className="font-sans font-extrabold text-[15px] text-ink leading-none">
                E
              </span>
            </div>
            {/* 右：展开图标 */}
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
                正在打开内容
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

export default AIKnowledgeDetail;
