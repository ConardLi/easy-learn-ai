/**
 * 日报详情 · 数字简报 article 排版
 *
 * 隐喻继续与列表页统一：Easy AI 日报 = 每日出版的数字简报
 *   ─ 顶部 sticky 导航条（返回 + 分享 + 新窗）
 *   ─ Detail Masthead：刊期条 + 大字标题 + 标签 dot 链
 *   ─ Article：完全自定义 ReactMarkdown components，替换掉 github-markdown.css
 *   ─ Footer：上一刊 / 下一刊 prev-next 卡片 + 返回 archive
 *
 * 设计关键：
 *   ─ 不引入 serif（与首页一致），靠 display + sans + mono 三套字体的
 *     字号、weight、tracking 对比，撑起出版物排版
 *   ─ 主体放在 max-w-[720px] 阅读宽度（约 16em，单栏长读最舒适）
 *   ─ 链接 coral 下划线 / 引用块 cream 左边线 / 代码块 cream 底
 */

import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Share2, ExternalLink, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import toast from "react-hot-toast";
import { useDailyList, useDailyContent } from "../../hooks/useDailyData";
import { DailyReport } from "../../types/daily";

const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) throw new Error("invalid");
    return {
      ymd: `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(
        2,
        "0",
      )}.${String(d.getDate()).padStart(2, "0")}`,
      weekday: `周${WEEKDAYS[d.getDay()]}`,
    };
  } catch {
    return { ymd: dateStr, weekday: "—" };
  }
};

export const DailyDetail: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const { content, loading, error } = useDailyContent(date || "");
  const { dailyList } = useDailyList();

  useEffect(() => {
    if (!date) navigate("/ai-daily");
  }, [date, navigate]);

  /* 当前刊 + 前后两期（按日期降序：prev = 更老一期，next = 更新一期） */
  const { current, prev, next, issueNumber } = useMemo<{
    current?: DailyReport;
    prev?: DailyReport;
    next?: DailyReport;
    issueNumber?: number;
  }>(() => {
    if (!dailyList.length || !date) return {};
    const sorted = [...dailyList].sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const idx = sorted.findIndex((d) => d.date === date);
    if (idx < 0) return {};
    return {
      current: sorted[idx],
      /* prev：在视觉上"上一期"对应"更老一期"（按时间，往后看） */
      prev: sorted[idx + 1],
      next: sorted[idx - 1],
      issueNumber: sorted.length - idx,
    };
  }, [dailyList, date]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: current?.title || `Easy AI 日报 · ${date}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("链接已复制到剪贴板");
      }
    } catch {
      /* 用户取消分享不算错 */
    }
  };

  /* ─── Loading ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-20 pb-20 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 mb-5 border-[3px] border-ink/15 border-t-ink rounded-full animate-spin" />
          <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
            正在打开本期日报
          </h2>
          <p className="font-sans text-[14px] text-ink-secondary">
            正在加载正文内容…
          </p>
        </div>
      </div>
    );
  }

  /* ─── Error ───────────────────────────────────────────── */
  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-16 pb-20">
          <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp px-10 py-12 text-center max-w-md mx-auto">
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-coral mb-3">
              § Error
            </div>
            <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
              本期日报打不开了
            </h2>
            <p className="font-sans text-[14px] text-ink-secondary mb-6">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream font-sans font-bold text-[13px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Empty content ───────────────────────────────────── */
  if (!content) {
    return (
      <div className="min-h-screen bg-white">
        <DetailNav onBack={() => navigate("/ai-daily")} />
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-20 pb-20 text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 mb-3">
            § Not Found
          </div>
          <h2 className="font-display font-extrabold text-[22px] text-ink mb-1.5">
            未找到这期日报
          </h2>
          <p className="font-sans text-[14px] text-ink-secondary mb-6">
            可能链接已失效，或这期还未出版。
          </p>
          <Link
            to="/ai-daily"
            className="inline-flex items-center gap-2 px-5 py-2 bg-ink text-cream font-sans font-bold text-[13px] rounded-full border-2 border-ink shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            返回往期目录
          </Link>
        </div>
      </div>
    );
  }

  const dateInfo = formatDate(date || "");
  const tags = current?.tags || [];

  return (
    <div className="min-h-screen bg-white">
      {/* ═════════ 顶部 sticky 导航条 ═════════ */}
      <DetailNav onBack={() => navigate("/ai-daily")} onShare={handleShare} />

      {/* ═════════ Detail Masthead ═════════ */}
      {/* 删去 title（日报标题过长，放大字会非常丑）。
         没有 title 之后，让 № 编号成为头部视觉主角，
         分类区放大成 Masthead 主体。 */}
      <header className="bg-white border-b border-ink/10">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-12 lg:pt-16 pb-10 lg:pb-12">
          {/* eyebrow rule */}
          <div className="flex items-center gap-3 mb-7 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
            <span>§ Latest Issue · 本期日报</span>
            <span className="flex-1 border-t border-dotted border-ink/20" />
            <span className="text-ink/45 hidden sm:inline">
              Easy AI Daily
            </span>
          </div>

          {/* № 编号 大字 + 日期 baseline 对齐 —— 替代被删去的标题，成为视觉主角 */}
          <div className="flex items-end gap-5 lg:gap-7 mb-12 lg:mb-14 flex-wrap">
            {issueNumber != null && (
              <div
                className="font-display font-extrabold text-ink leading-none tracking-[-0.02em] tabular-nums"
                style={{ fontSize: "clamp(3.5rem, 8vw, 5.75rem)" }}
              >
                № {String(issueNumber).padStart(3, "0")}
              </div>
            )}
            <div className="pb-2 lg:pb-3 font-mono tabular-nums flex flex-col gap-1">
              <span className="font-bold text-ink text-[16px] lg:text-[18px]">
                {dateInfo.ymd}
              </span>
              <span className="text-ink/55 text-[12px] lg:text-[13px]">
                出版于 · {dateInfo.weekday}
              </span>
            </div>
          </div>

          {/* ─── filed under · 分类区 ─── 成为 Masthead 的次重点 */}
          {tags.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/55">
                <span>¶ Filed Under · 本期分类</span>
                <span className="flex-1 border-t border-ink/15" />
                <span className="text-ink/45 tabular-nums">
                  {String(tags.length).padStart(2, "0")} 个
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 lg:gap-3">
                {tags.map((tag) => (
                  <TagChip key={tag} label={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═════════ Article ═════════ */}
      <article className="bg-white">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-16 lg:pb-20">
          <div className="daily-article">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={mdComponents}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      {/* ═════════ Footer · 上一刊 / 下一刊 ═════════ */}
      <footer className="bg-white border-t border-ink">
        <div className="max-w-[920px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <div className="flex items-center gap-3 mb-7 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-ink/55">
            <span>§ More Issues</span>
            <span className="flex-1 border-t border-ink/15" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-5 mb-8">
            <PrevNextCard
              direction="prev"
              daily={prev}
              issueNumber={
                issueNumber != null && prev ? issueNumber - 1 : undefined
              }
              onClick={(d) => navigate(`/ai-daily/${d.date}`)}
            />
            <PrevNextCard
              direction="next"
              daily={next}
              issueNumber={
                issueNumber != null && next ? issueNumber + 1 : undefined
              }
              onClick={(d) => navigate(`/ai-daily/${d.date}`)}
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/ai-daily"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
              返回往期目录
            </Link>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-coral text-white border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15]"
            >
              <Share2 className="w-4 h-4" strokeWidth={2.5} />
              分享本期
            </button>
          </div>
        </div>
      </footer>

      {/* ═════════ Article 自定义 prose 样式 ═════════ */}
      <style>{articleStyles}</style>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * TagChip · "分类邮戳"
 *
 * 设计：所有 chip 都用 butter 底 + ink 边 + 小 stamp 阴影。
 *   - 同色让"本期分类"成为一个统一识别的视觉块
 *   - stamp 阴影让它真的像贴在档案袋上的小邮戳
 *   - hover 微弹起：1px shift + 阴影加深
 *   - 点击跳转到 archive 并预选该分类标签
 * ──────────────────────────────────────────────────────────────────── */

const TagChip: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Link
      to={`/ai-daily?tag=${encodeURIComponent(label)}`}
      onClick={(e) => {
        /* HashRouter 不支持 query，直接跳列表页（archive 会清空筛选）。
           保留 href 用于右键复制链接，但实际只是回列表。 */
        e.preventDefault();
        window.location.hash = `#/ai-daily`;
      }}
      className="inline-flex items-center px-3.5 py-1.5 bg-butter text-ink border-2 border-ink rounded-full font-sans font-bold text-[13px] shadow-[2px_2px_0_0_#241C15] transition-all duration-200 ease-spring hover:-translate-x-[1px] hover:-translate-y-[1px] hover:[box-shadow:3px_3px_0_0_#241C15]"
    >
      {label}
    </Link>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * 顶部 sticky 导航条
 * ──────────────────────────────────────────────────────────────────── */

const DetailNav: React.FC<{
  onBack: () => void;
  onShare?: () => void;
}> = ({ onBack, onShare }) => {
  const handleOpenNewTab = () => window.open(window.location.href, "_blank");

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-ink/10">
      <div className="max-w-[920px] mx-auto px-6 lg:px-10 h-12 lg:h-14 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-sans font-semibold text-[13px] text-ink-secondary hover:text-ink hover:bg-cream transition-colors -ml-2.5"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          往期目录
        </button>
        <div className="flex items-center gap-1">
          {onShare && (
            <button
              onClick={onShare}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-secondary hover:text-ink hover:bg-cream transition-colors"
              aria-label="分享"
            >
              <Share2 className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          )}
          <button
            onClick={handleOpenNewTab}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-ink-secondary hover:text-ink hover:bg-cream transition-colors"
            aria-label="新窗口打开"
          >
            <ExternalLink className="w-[18px] h-[18px]" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * 上一刊 / 下一刊 卡
 * ──────────────────────────────────────────────────────────────────── */

const PrevNextCard: React.FC<{
  direction: "prev" | "next";
  daily?: DailyReport;
  issueNumber?: number;
  onClick: (d: DailyReport) => void;
}> = ({ direction, daily, issueNumber, onClick }) => {
  const isPrev = direction === "prev";

  if (!daily) {
    return (
      <div className="border border-dashed border-ink/20 rounded-2xl p-5 lg:p-6 flex items-center justify-center min-h-[120px]">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/35">
          § {isPrev ? "No Older Issue" : "Already Latest"}
        </span>
      </div>
    );
  }

  const dateInfo = formatDate(daily.date);

  return (
    <button
      type="button"
      onClick={() => onClick(daily)}
      className="group bg-white border-2 border-ink rounded-2xl p-5 lg:p-6 shadow-stamp transition-all duration-250 ease-spring hover:-translate-x-[2px] hover:-translate-y-[2px] hover:[box-shadow:6px_6px_0_0_#241C15] text-left flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/55">
        {isPrev ? (
          <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
        ) : null}
        <span>{isPrev ? "Previous · 上一刊" : "Next · 下一刊"}</span>
        {!isPrev ? (
          <ArrowRight className="w-3.5 h-3.5 ml-auto" strokeWidth={2.5} />
        ) : null}
      </div>

      <div className="font-mono text-[11px] text-ink/55 tabular-nums">
        {issueNumber != null && (
          <>
            <span className="font-semibold text-ink/80">
              № {String(issueNumber).padStart(3, "0")}
            </span>
            <span className="mx-1.5 text-ink/25">·</span>
          </>
        )}
        <span>{dateInfo.ymd}</span>
        <span className="ml-1 text-ink/35">{dateInfo.weekday}</span>
      </div>

      <h4 className="font-display font-extrabold text-[15px] lg:text-[16px] text-ink leading-[1.4] line-clamp-2 group-hover:text-coral transition-colors">
        {daily.title}
      </h4>
    </button>
  );
};

/* ════════════════════════════════════════════════════════════════════
 * ReactMarkdown components 覆盖
 *
 * 关键：替换 github-markdown.css 默认样式，让正文与 Mailchimp-Freddie
 * 风一致。所有元素都使用 design tokens（font-display / font-sans /
 * font-mono / text-ink / coral / cream / butter）。
 * ──────────────────────────────────────────────────────────────────── */

/* 注意：因 react-markdown 类型对子组件 props 极宽松，这里给最常用元素
 * 做自定义；未列出元素走 daily-article 全局 CSS 样式。 */
type MdProps = {
  children?: React.ReactNode;
  href?: string;
  src?: string;
  alt?: string;
  inline?: boolean;
  className?: string;
  node?: unknown;
};

const mdComponents = {
  /* h1 → 极少用；预留为大字标题 */
  h1: ({ children }: MdProps) => (
    <h2 className="font-display font-extrabold text-[26px] lg:text-[30px] text-ink leading-[1.2] mt-12 mb-5 tracking-[-0.01em]">
      {children}
    </h2>
  ),
  /* h2 → 节标题，coral dot 前缀 */
  h2: ({ children }: MdProps) => (
    <h3 className="font-display font-extrabold text-[20px] lg:text-[24px] text-ink leading-[1.25] mt-12 mb-5 tracking-[-0.01em]">
      <span className="inline-block w-2 h-2 rounded-full bg-coral mr-3 align-middle -translate-y-1" />
      {children}
    </h3>
  ),
  /* h3 → 三级；预留 */
  h3: ({ children }: MdProps) => (
    <h4 className="font-display font-extrabold text-[18px] lg:text-[20px] text-ink leading-[1.35] mt-10 mb-4 tracking-[-0.005em]">
      {children}
    </h4>
  ),
  /* ★ h4 → 日报"栏目分类"（关键路标）★
     实测日报 markdown 用 #### 作为大栏目分类（"研究与方法" / "Agent 与工具链" / "模型与能力" 等）。
     必须是文章里最显眼的视觉路标，不能淹没在正文里。
     设计：上方留白 + coral § eyebrow + display 大字 + 粗 ink 下划线。 */
  h4: ({ children }: MdProps) => (
    <div className="mt-16 lg:mt-20 mb-7 first:mt-3">
      <div className="flex items-center gap-2.5 mb-3 font-mono text-[10px] lg:text-[11px] font-semibold uppercase tracking-[0.3em] text-coral">
        <span className="text-[14px] leading-none">§</span>
        <span>Section · 本期栏目</span>
        <span className="flex-1 border-t border-dotted border-ink/20" />
      </div>
      <h2 className="font-display font-extrabold text-[24px] lg:text-[28px] text-ink leading-[1.2] tracking-[-0.01em] pb-3 border-b-[3px] border-ink">
        {children}
      </h2>
    </div>
  ),
  /* ★ h5 → 日报"新闻条目标题" ★
     日报 markdown 用 ##### 作为每条新闻的标题。
     比 h4 (栏目分类) 弱一档，但比正文显眼。 */
  h5: ({ children }: MdProps) => (
    <h3 className="font-display font-extrabold text-[17px] lg:text-[19px] text-ink leading-[1.4] mt-9 mb-3 tracking-[-0.005em]">
      {children}
    </h3>
  ),
  /* h6 → 兜底 */
  h6: ({ children }: MdProps) => (
    <h4 className="font-display font-bold text-[15px] lg:text-[16px] text-ink-secondary leading-[1.45] mt-7 mb-2.5">
      {children}
    </h4>
  ),
  p: ({ children }: MdProps) => (
    <p className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5">
      {children}
    </p>
  ),
  a: ({ children, href }: MdProps) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-ink font-semibold underline decoration-coral decoration-2 underline-offset-[3px] hover:text-coral transition-colors"
    >
      {children}
    </a>
  ),
  ul: ({ children }: MdProps) => (
    <ul className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 pl-0 list-none">
      {children}
    </ul>
  ),
  ol: ({ children }: MdProps) => (
    <ol className="font-sans text-[15.5px] lg:text-[16.5px] text-ink leading-[1.85] mb-5 space-y-2 pl-0 list-none counter-reset-[md-li]">
      {children}
    </ol>
  ),
  li: ({ children }: MdProps) => (
    <li className="relative pl-5 before:content-['—'] before:absolute before:left-0 before:top-0 before:text-coral before:font-bold">
      {children}
    </li>
  ),
  /* blockquote → 日报常用作"相关链接"附注块。
     不用 italic（中文强制斜体会糊）；用 cream 底 + coral 左条 + 略小字号区分主次。 */
  blockquote: ({ children }: MdProps) => (
    <blockquote className="my-5 pl-4 pr-4 py-3 bg-cream/60 border-l-[3px] border-coral rounded-r-lg font-sans text-[13.5px] lg:text-[14px] text-ink-secondary leading-[1.7]">
      {children}
    </blockquote>
  ),
  code: ({ inline, children, className }: MdProps) => {
    if (inline) {
      return (
        <code className="px-1.5 py-0.5 mx-0.5 bg-cream border border-ink/10 rounded font-mono text-[0.88em] text-ink-secondary">
          {children}
        </code>
      );
    }
    return (
      <code className={`${className || ""} font-mono text-[13px] leading-[1.7]`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: MdProps) => (
    <pre className="my-6 px-5 py-4 bg-cream border-2 border-ink rounded-xl shadow-stamp overflow-x-auto font-mono text-[13px] leading-[1.7] text-ink">
      {children}
    </pre>
  ),
  hr: () => (
    <div className="my-10 flex items-center gap-3" aria-hidden>
      <span className="flex-1 border-t border-ink/15" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/35">
        §
      </span>
      <span className="flex-1 border-t border-ink/15" />
    </div>
  ),
  img: ({ src, alt }: MdProps) => (
    <span className="block my-7">
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className="block w-full h-auto rounded-2xl border-2 border-ink shadow-stamp"
      />
      {alt && (
        <span className="block text-center font-mono text-[11px] text-ink/55 mt-2.5">
          {alt}
        </span>
      )}
    </span>
  ),
  strong: ({ children }: MdProps) => (
    <strong className="font-bold text-ink">{children}</strong>
  ),
  em: ({ children }: MdProps) => (
    <em className="italic text-ink-secondary">{children}</em>
  ),
  table: ({ children }: MdProps) => (
    <div className="my-6 overflow-x-auto border-2 border-ink rounded-xl shadow-stamp">
      <table className="w-full font-sans text-[14px] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: MdProps) => (
    <thead className="bg-cream border-b-2 border-ink">{children}</thead>
  ),
  th: ({ children }: MdProps) => (
    <th className="px-4 py-2.5 text-left font-mono font-semibold text-[12px] uppercase tracking-[0.08em] text-ink/75">
      {children}
    </th>
  ),
  td: ({ children }: MdProps) => (
    <td className="px-4 py-2.5 border-t border-ink/10 text-ink">{children}</td>
  ),
};

/* daily-article 全局兜底（未被 components 覆盖的 case） */
const articleStyles = `
  .daily-article > :first-child { margin-top: 0 !important; }
  .daily-article > :last-child { margin-bottom: 0 !important; }
  .daily-article ul ul, .daily-article ol ol,
  .daily-article ul ol, .daily-article ol ul {
    margin-top: 0.5rem;
    margin-bottom: 0;
    padding-left: 0;
  }
`;
