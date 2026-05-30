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
 * v3 视频形态支持：
 *   ─ type === "video" 时 chrome 右侧多一个 coral「📺 视频版」按钮（跳 B 站）
 *   ─ chrome 下方追加一条 banner，左侧视频封面缩略图占位（用户后补 videoCoverUrl）
 *   ─ bilibiliUrl 未填时按钮 / banner 退化为「视频上线中」灰态，保留展位
 *   ─ banner 跟 chrome 一起收起（用户进入沉浸阅读时不打扰）
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
  PlayCircle,
  Image as ImageIcon,
} from "lucide-react";
import { AIKnowledgeItem } from "../types";
import { aiKnowledgeData } from "../data/aiKnowledgeData";

const AIKnowledgeDetail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  /* 优先使用 location.state 中的 item，没有则按 id 查找 */
  let item: AIKnowledgeItem | undefined = location.state?.item;
  if (!item && id) {
    item = aiKnowledgeData.find((data) => data.id === id);
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
  const isVideo = item.type === "video";
  const hasVideoUrl = isVideo && !!item.bilibiliUrl;
  /* chrome 总高度 = 主控制条 56 + 视频形态下 banner 86 */
  const chromeHeight = isVideo ? 56 + 86 : 56;
  /* 视频封面来源：优先 videoCoverUrl，回退 imageUrl */
  const videoCover = item.videoCoverUrl || item.imageUrl;

  return (
    <div className="fixed inset-0 z-[999] bg-white overflow-hidden flex flex-col">
      {/* ━━━ 顶部 Chrome 区（主控制条 + 可选视频 banner） ━━━ */}
      <div
        className={`flex-shrink-0 bg-cream overflow-hidden transition-[height,border-bottom-width] duration-300 ease-spring ${
          isCollapsed ? "h-0 border-b-0" : "border-b-2 border-ink"
        }`}
        style={{ height: isCollapsed ? 0 : chromeHeight }}
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

          {/* 右侧：视频形态加「📺 视频版」入口（先于"新窗打开"） */}
          {isVideo &&
            (hasVideoUrl ? (
              <a
                href={item.bilibiliUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="在 B 站观看视频版"
                className="group/btn inline-flex items-center gap-1.5 px-3.5 py-2 bg-pop text-white border-2 border-ink rounded-xl font-sans font-bold text-[12px] shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15] flex-shrink-0"
              >
                <PlayCircle className="w-3.5 h-3.5 fill-white text-pop" strokeWidth={2.5} />
                <span className="hidden sm:inline">看 B 站视频</span>
              </a>
            ) : (
              <span
                title="视频链接待补充"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-ink/40 border-2 border-dashed border-ink/30 rounded-xl font-sans font-bold text-[12px] flex-shrink-0 cursor-not-allowed"
              >
                <PlayCircle className="w-3.5 h-3.5" strokeWidth={2.5} />
                <span className="hidden sm:inline">视频上线中</span>
              </span>
            ))}

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

        {/* ━━ 视频 banner —— 仅 type=video 显示，跟 chrome 一起收起 ━━ */}
        {isVideo && (
          <VideoBanner
            cover={videoCover}
            hasFallbackCover={!item.videoCoverUrl}
            duration={item.duration}
            bilibiliUrl={item.bilibiliUrl}
            title={item.title}
          />
        )}
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

/**
 * VideoBanner — 视频形态 chrome 下方的展位条
 *
 * 视觉：白底 stamp 卡条，高 86 px。
 * 左：视频封面缩略图（128×72，2px ink 边）+ 播放角标；
 * 中：标题 + 时长 + 简介；
 * 右：「在 B 站观看 →」实色按钮（无 URL 时灰态保留展位）。
 *
 * 数据来源：item.videoCoverUrl / item.bilibiliUrl / item.duration（用户后补）
 */
const VideoBanner: React.FC<{
  cover: string;
  hasFallbackCover: boolean;
  duration?: string;
  bilibiliUrl?: string;
  title: string;
}> = ({ cover, hasFallbackCover, duration, bilibiliUrl, title }) => {
  const ready = !!bilibiliUrl;

  return (
    <div className="h-[86px] bg-white border-t-2 border-ink/15 flex items-center gap-3 px-3 lg:px-4">
      {/* 左：视频封面 + ▶ 角标 */}
      <a
        href={ready ? bilibiliUrl : undefined}
        target={ready ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={`relative flex-shrink-0 w-[128px] h-[72px] bg-cream border-2 border-ink rounded-lg shadow-[2px_2px_0_0_#241C15] overflow-hidden group/cover ${ready ? "cursor-pointer" : "cursor-not-allowed opacity-80"}`}
      >
        {hasFallbackCover ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ink/35 gap-1">
            <ImageIcon className="w-5 h-5" strokeWidth={2} />
            <span className="font-mono text-[9px] uppercase tracking-wider">封面待补</span>
          </div>
        ) : (
          <img src={cover} alt={title} className="w-full h-full object-cover" />
        )}
        {/* 半透明浮层 + 大 ▶ 图标 */}
        <div className="absolute inset-0 bg-ink/15 flex items-center justify-center transition-opacity duration-200 group-hover/cover:bg-ink/0">
          <PlayCircle className="w-9 h-9 text-white drop-shadow-[2px_2px_0_#241C15] fill-pop" strokeWidth={2} />
        </div>
        {/* 时长徽章 */}
        {duration && (
          <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-ink/85 text-white rounded font-mono text-[9.5px] font-bold">
            {duration}
          </span>
        )}
      </a>

      {/* 中：标题 + 状态文字 */}
      <div className="flex-1 min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1">
          配套视频 · B 站
        </div>
        <div className="font-sans font-bold text-[14px] text-ink leading-tight truncate">
          {title}
        </div>
        <div className="font-mono text-[11px] text-ink/55 mt-0.5">
          {ready
            ? `点击封面或右侧按钮，跳转 B 站观看完整讲解${duration ? `（${duration}）` : ""}。`
            : "视频链接即将补充。补全后点击封面即可跳转 B 站。"}
        </div>
      </div>

      {/* 右：CTA 按钮 */}
      {ready ? (
        <a
          href={bilibiliUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 bg-pop text-white border-2 border-ink rounded-xl font-sans font-bold text-[13px] shadow-stamp transition-all duration-200 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] flex-shrink-0"
        >
          <PlayCircle className="w-4 h-4 fill-white text-pop" strokeWidth={2} />
          <span>在 B 站观看</span>
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover/cta:translate-x-[1px] group-hover/cta:-translate-y-[1px]"
            strokeWidth={2.5}
          />
        </a>
      ) : (
        <span className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 bg-white text-ink/40 border-2 border-dashed border-ink/30 rounded-xl font-sans font-bold text-[13px] flex-shrink-0">
          <PlayCircle className="w-4 h-4" strokeWidth={2} />
          视频上线中
        </span>
      )}
    </div>
  );
};

export default AIKnowledgeDetail;
