import { useRef, useState } from "react";

interface ThemeMeta {
  id: string;
  name: string;
  nameZh: string;
  description: string;
  descriptionZh: string;
  mood: string[];
  bestFor: string[];
  preview: { shell?: string; surface?: string; text?: string; accent?: string };
}

interface Props {
  themes: ThemeMeta[];
  onPick(id: string): void;
}

export function Gallery({ themes, onPick }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<"standard" | "compact">("standard");
  const dark = themes.filter((t) => t.mood?.includes("dark"));
  const light = themes.filter((t) => !t.mood?.includes("dark"));
  const isCompact = viewMode === "compact";
  const compactThemes = [...dark, ...light];
  const changeViewMode = (mode: "standard" | "compact") => {
    setViewMode(mode);
    requestAnimationFrame(() => rootRef.current?.scrollTo({ top: 0 }));
  };

  return (
    <div ref={rootRef} className={`gallery-root${isCompact ? " is-compact" : ""}`}>
      <header className="gallery-hero">
        <div className="gallery-eyebrow">Web Video Presentation Skill</div>
        <h1 className="gallery-title">
          {themes.length} 个主题 · {themes.length} 段视频感
          <span className="gallery-title-em"> demo.</span>
        </h1>
        <p className="gallery-sub">
          每张卡片点开 = 一个 2 步演示，专为<strong>截 GIF</strong>而生 ——
          点击舞台或按 <kbd>→</kbd> 推进，按 <kbd>Esc</kbd> 回画廊。
        </p>
        <div className="gallery-keys">
          <span><kbd>click</kbd> 推进</span>
          <span><kbd>← →</kbd> 切换</span>
          <span><kbd>1</kbd>-<kbd>9</kbd> 跳步</span>
          <span><kbd>Esc</kbd> 返回</span>
        </div>
        <div className="gallery-view-switch" role="tablist" aria-label="Gallery view mode">
          <button
            type="button"
            className={`gallery-view-btn${viewMode === "standard" ? " is-active" : ""}`}
            onClick={() => changeViewMode("standard")}
            role="tab"
            aria-selected={viewMode === "standard"}
          >
            当前模式
          </button>
          <button
            type="button"
            className={`gallery-view-btn${viewMode === "compact" ? " is-active" : ""}`}
            onClick={() => changeViewMode("compact")}
            role="tab"
            aria-selected={viewMode === "compact"}
          >
            紧凑模式
          </button>
        </div>
      </header>

      {isCompact ? (
        <div className="gallery-compact-directory">
          <Grid themes={compactThemes} onPick={onPick} compact />
        </div>
      ) : (
        <>
          <Section title={`Dark · ${dark.length} themes`} subtitle="深色舞台 · 偏电影感 / 终端 / 高级感">
            <Grid themes={dark} onPick={onPick} />
          </Section>

          <Section title={`Light · ${light.length} themes`} subtitle="浅色舞台 · 偏编辑 / 印刷 / 课堂 / 企业">
            <Grid themes={light} onPick={onPick} />
          </Section>
        </>
      )}

      {!isCompact && (
        <footer className="gallery-foot">
          <span>
            每个 demo 用的是 <code>skills/web-video-presentation/themes/&lt;id&gt;/tokens.css</code>
            —— 与真实脚手架产出 100% 一致的视觉系统。
          </span>
        </footer>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="gallery-section">
      <div className="gallery-section-head">
        <h2 className="gallery-section-title">{title}</h2>
        <span className="gallery-section-sub">{subtitle}</span>
      </div>
      {children}
    </section>
  );
}

function Grid({
  themes,
  onPick,
  compact = false,
}: {
  themes: ThemeMeta[];
  onPick(id: string): void;
  compact?: boolean;
}) {
  return (
    <div className={`gallery-grid${compact ? " is-compact" : ""}`}>
      {themes.map((t) => (
        <Card key={t.id} theme={t} onPick={onPick} compact={compact} />
      ))}
    </div>
  );
}

function Card({
  theme,
  onPick,
  compact = false,
}: {
  theme: ThemeMeta;
  onPick(id: string): void;
  compact?: boolean;
}) {
  const { preview } = theme;
  return (
    <button
      className={`gallery-card${compact ? " is-compact" : ""}`}
      onClick={() => onPick(theme.id)}
      aria-label={`Open ${theme.nameZh} (${theme.name}) demo`}
      style={
        {
          "--card-shell": preview.shell ?? "#1a1a1a",
          "--card-surface": preview.surface ?? "#222222",
          "--card-text": preview.text ?? "#fafafa",
          "--card-accent": preview.accent ?? "#ff5500",
        } as React.CSSProperties
      }
    >
      <div className="gallery-card-frame">
        <div className="gallery-card-frame-inner">
          <div className="gallery-card-dots">
            <span style={{ background: preview.accent }} />
            <span style={{ background: preview.text, opacity: 0.7 }} />
            <span style={{ background: preview.text, opacity: 0.35 }} />
          </div>
          <div className="gallery-card-mono">{theme.id}</div>
          <div className="gallery-card-h">{theme.nameZh}</div>
          <div className="gallery-card-en">{theme.name}</div>
          <div className="gallery-card-bar" />
        </div>
      </div>
      {!compact && (
        <>
          <div className="gallery-card-meta">
            <div className="gallery-card-desc">{theme.descriptionZh}</div>
            <div className="gallery-card-tags">
              {(theme.bestFor ?? []).slice(0, 3).map((t) => (
                <span key={t} className="gallery-card-tag">{t}</span>
              ))}
            </div>
          </div>
          <div className="gallery-card-cta">
            <span>open demo</span>
            <span className="gallery-card-arrow">→</span>
          </div>
        </>
      )}
    </button>
  );
}
