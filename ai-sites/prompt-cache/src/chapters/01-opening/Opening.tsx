import type { CSSProperties } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Opening.css";

/**
 * Chapter 01 · opening — 引子 / 钩子（4 steps · ~27s）
 *
 * Per CHAPTER-CRAFT.md:
 *   - Each step takes the full screen
 *   - Theme-agnostic colors (--text / --accent / --text-mute) — no hex
 *   - Each step has its own visual演示 (字符雨 / 终端 prompt /
 *     博客元数据卡 / cache 容器)
 */
export default function OpeningChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 工程界老话 hero
   * 视觉演示：背景字符雨（CSS keyframes 滚动 mono 字符），
   * hero 大字 mask reveal，英文原句作为副标 mono 角标。
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="s0" className="op-scene op-scene-hero">
        <CharacterRain />
        <div className="op-old-saying">
          <div className="op-kicker">
            <span className="op-dot" /> An old saying in engineering
          </div>
          <h1 className="op-hero">
            <MaskReveal show duration={800}>
              <span className="op-zh">"缓存</span>
            </MaskReveal>
            <MaskReveal show delay={260} duration={800}>
              <span className="op-zh op-em op-hero-accent">统治</span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={800}>
              <span className="op-zh">的一切。"</span>
            </MaskReveal>
          </h1>
          <div className="op-en-quote">
            <MaskReveal show delay={900} duration={700}>
              <span className="op-en">
                Cache rules everything <em>around me.</em>
              </span>
            </MaskReveal>
          </div>
          <div className="op-attribution">
            <span className="op-attr-line" />
            <span className="op-attr-text">
              after Wu-Tang Clan · C.R.E.A.M.
            </span>
          </div>
        </div>
        <PrefixMatchDemo />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 时代锚定：到了 AI Agent 时代，这话还是对的
   * 视觉演示：一条时间线从 1990s 工程师 → 2020s AI Agent，
   * 当前节点（AI Agent）亮起；旁边一个 mono 终端 prompt
   * 从 `engineer$` 变成 `agent>`（已演示完毕的静态终态）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="s1" className="op-scene">
        <div className="op-era">
          <div className="op-era-headline">
            <MaskReveal show duration={1100}>
              <span className="op-zh">到了 </span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={1100}>
              <span className="op-en op-em">AI Agent</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={1100}>
              <span className="op-zh"> 时代，</span>
            </MaskReveal>
            <MaskReveal show delay={920} duration={1100}>
              <span className="op-zh op-em-soft">这话还是对的。</span>
            </MaskReveal>
          </div>
          <Timeline />
          <PromptComparison />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 题源 hero：Anthropic 工程师最近给出最佳实践
   * 视觉演示：一张伪博客元数据卡（meta block）
   *   - source / author / title / topic tags
   * 卡片信息逐项亮起，title 是 hero 大字
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="s2" className="op-scene">
        <div className="op-source">
          <BlogMetaCard />
          <div className="op-source-headline">
            <MaskReveal show delay={400} duration={1100}>
              <span className="op-zh">最近</span>
            </MaskReveal>
            <MaskReveal show delay={700} duration={1100}>
              <span className="op-zh">给出了 </span>
            </MaskReveal>
            <MaskReveal show delay={1000} duration={1100}>
              <span className="op-en op-em">Claude Code</span>
            </MaskReveal>
            <MaskReveal show delay={1300} duration={1100}>
              <span className="op-zh"> 提示词缓存设计的</span>
            </MaskReveal>
            <MaskReveal show delay={1600} duration={1100}>
              <span className="op-zh op-em-soft">最佳实践。</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 钩子收口：先一分钟搞懂提示词缓存到底是什么
   * 视觉演示：mono "BRIEFING · 60 SEC" + 一个空的 cache 容器框
   * （[CACHE]，里面只有空的占位 brackets，等待被填充）
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="s3" className="op-scene">
      <div className="op-hook">
        <div className="op-briefing-tag">
          <span className="op-dot" />
          <span className="op-briefing-text">Briefing · 60 seconds</span>
        </div>
        <div className="op-hook-headline">
          <MaskReveal show duration={1100}>
            <span className="op-zh">先用一分钟，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={420} duration={1100}>
            <span className="op-zh">搞懂</span>
          </MaskReveal>
          <MaskReveal show delay={760} duration={1100}>
            <span className="op-zh op-em">提示词缓存</span>
          </MaskReveal>
          <MaskReveal show delay={1100} duration={1100}>
            <span className="op-zh">到底</span>
          </MaskReveal>
          <MaskReveal show delay={1380} duration={1100}>
            <span className="op-zh op-em-soft">是什么。</span>
          </MaskReveal>
        </div>
        <CacheControlSnippet />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: 字符雨 — 背景层，慢速、低对比，不抢戏
 * 16 列 mono 字符，每列独立速度 / phase
 * ────────────────────────────────────────────────────────────────── */
function CharacterRain() {
  const cols = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="op-rain" aria-hidden>
      {cols.map((c) => {
        const dur = 14 + ((c * 7) % 11); // 14..24s, deterministic pseudo-random
        const delay = -1 * ((c * 13) % 18);
        return (
          <div
            key={c}
            className="op-rain-col"
            style={{
              left: `${(c / cols.length) * 100}%`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {RAIN_GLYPHS.split("").map((g, i) => (
              <span key={i} className="op-rain-glyph">
                {g}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* deterministic mix of mono-friendly glyphs (no emoji, no CJK to keep grid) */
const RAIN_GLYPHS = "01CACHEKVRULESEVERYTHINGABCDEFGH0123456789#&%*";

/* ──────────────────────────────────────────────────────────────────
 * Visual: Timeline — 三个 era 节点，最后一个亮起为 accent
 * ────────────────────────────────────────────────────────────────── */
function Timeline() {
  const eras = [
    { tag: "1990s", label: "Mainframe / Web · server uptime" },
    { tag: "2010s", label: "Distributed · CDN cache hit rate" },
    { tag: "2020s", label: "AI Agent · prompt cache hit rate", active: true },
  ];
  return (
    <div className="op-timeline">
      <div className="op-timeline-track" />
      {eras.map((e, i) => (
        <div
          key={i}
          className={`op-era-node ${e.active ? "is-active" : ""}`}
          style={{ left: `${(i / (eras.length - 1)) * 100}%` }}
        >
          <div className="op-era-dot" />
          <div className="op-era-tag">{e.tag}</div>
          <div className="op-era-label">{e.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PromptComparison — 两段终端对比
 * 左：engineer$ legacy · 右：agent> 现在
 * ────────────────────────────────────────────────────────────────── */
function PromptComparison() {
  return (
    <div className="op-prompts">
      <div className="op-prompt op-prompt-old">
        <div className="op-prompt-header">engineer · 1990s</div>
        <div className="op-prompt-body">
          <span className="op-prompt-prefix">$</span>{" "}
          <span className="op-prompt-cmd">curl --cache-control http://...</span>
        </div>
      </div>
      <div className="op-prompt op-prompt-new">
        <div className="op-prompt-header">agent · today</div>
        <div className="op-prompt-body">
          <span className="op-prompt-prefix op-prompt-prefix-new">{">"}</span>{" "}
          <span className="op-typewriter">
            cache_control:{" "}
            <span className="op-prompt-arg">{"{ type: 'ephemeral' }"}</span>
          </span>
          <span className="op-prompt-cursor" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: BlogMetaCard — 伪博客元数据卡
 * 一个 mono 风格的元数据 block，逐行显现
 * ────────────────────────────────────────────────────────────────── */
function BlogMetaCard() {
  return (
    <div className="op-meta">
      <div className="op-meta-header">
        <span className="op-meta-source">ANTHROPIC · ENGINEERING</span>
        <span className="op-meta-date">Issue · 2025</span>
      </div>
      <h2 className="op-meta-title">
        <MaskReveal show duration={1100}>
          <span className="op-en op-em">Prompt Caching</span>
        </MaskReveal>
        <MaskReveal show delay={400} duration={1100}>
          <span className="op-zh"> 是 </span>
        </MaskReveal>
        <MaskReveal show delay={700} duration={1100}>
          <span className="op-zh op-em-soft">一切。</span>
        </MaskReveal>
      </h2>
      <div className="op-meta-rows">
        <div className="op-meta-row">
          <span className="op-meta-key">author</span>
          <span className="op-meta-val">
            Thariq Shihipar
            <span className="op-meta-tag">Claude Code Team</span>
          </span>
        </div>
        <div className="op-meta-row">
          <span className="op-meta-key">topic</span>
          <span className="op-meta-val op-meta-tags">
            <span className="op-meta-pill">cache_control</span>
            <span className="op-meta-pill">prefix matching</span>
            <span className="op-meta-pill">long conversations</span>
            <span className="op-meta-pill">7 lessons</span>
          </span>
        </div>
        <div className="op-meta-row">
          <span className="op-meta-key">stake</span>
          <span className="op-meta-val">
            <span className="op-meta-strong">没有缓存，就没有 Claude Code.</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefixMatchDemo (step 0)
 * 两条请求条 — REQ n 自身建立 token 序列，REQ n+1 重用前缀（accent
 * 高亮），尾部追加 NEW token。所有动画走 CSS keyframes，循环演示
 * "提示词缓存就是前缀匹配 + 复用"。
 * ────────────────────────────────────────────────────────────────── */
function PrefixMatchDemo() {
  const tokens = [
    { label: "system", n: 5 },
    { label: "tools", n: 4 },
    { label: "CLAUDE.md", n: 3 },
    { label: "turn 1", n: 4 },
    { label: "turn 2", n: 3 },
  ];
  return (
    <div className="op-demo" aria-hidden>
      <div className="op-demo-head">
        <span className="op-demo-dot" />
        <span className="op-demo-title">live · prompt cache · prefix matching</span>
        <span className="op-demo-flex" />
        <span className="op-demo-counter">
          <span className="op-demo-counter-label">cache hit</span>
          <span className="op-demo-counter-num">
            5 / 6 <span className="op-demo-counter-pct">tokens</span>
          </span>
        </span>
      </div>

      <div className="op-demo-rows">
        {/* REQ n — building */}
        <div className="op-demo-row op-demo-row-1">
          <span className="op-demo-row-label">
            <span className="op-demo-row-num">REQ&nbsp;n</span>
            <span className="op-demo-row-state">previous</span>
          </span>
          <span className="op-demo-row-bar">
            {tokens.map((t, i) => (
              <span
                key={`r1-${i}`}
                className="op-demo-tok op-demo-tok-built"
                style={
                  {
                    "--tok-delay": `${1500 + i * 180}ms`,
                    "--tok-w": `${t.n}`,
                  } as CSSProperties
                }
              >
                <span className="op-demo-tok-label">{t.label}</span>
              </span>
            ))}
          </span>
        </div>

        <div className="op-demo-glow" />

        {/* REQ n+1 — reusing prefix + new tail */}
        <div className="op-demo-row op-demo-row-2">
          <span className="op-demo-row-label op-demo-row-label-em">
            <span className="op-demo-row-num">REQ&nbsp;n+1</span>
            <span className="op-demo-row-state">next</span>
          </span>
          <span className="op-demo-row-bar">
            {tokens.map((t, i) => (
              <span
                key={`r2-${i}`}
                className="op-demo-tok op-demo-tok-hit"
                style={
                  {
                    "--tok-delay": `${2700 + i * 150}ms`,
                    "--tok-w": `${t.n}`,
                  } as CSSProperties
                }
              >
                <span className="op-demo-tok-label">{t.label}</span>
                <span className="op-demo-tok-stamp">REUSED</span>
              </span>
            ))}
            <span
              className="op-demo-tok op-demo-tok-new"
              style={
                {
                  "--tok-delay": `3700ms`,
                  "--tok-w": `4`,
                } as CSSProperties
              }
            >
              <span className="op-demo-tok-label">turn 3</span>
              <span className="op-demo-tok-tag">NEW</span>
            </span>
          </span>
        </div>
      </div>

      <div className="op-demo-foot">
        <span className="op-demo-foot-line" />
        <span className="op-demo-foot-text">
          前 5 个 token 命中缓存 · 只算最后那个 NEW
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CacheControlSnippet (step 3)
 * 一段自打字的 JSON 请求体，cache_control 字段被 accent 高亮，
 * 旁边箭头指出"主角"。把"提示词缓存到底是什么"具象化为一个
 * API 参数。
 * ────────────────────────────────────────────────────────────────── */
function CacheControlSnippet() {
  return (
    <div className="op-snippet" aria-hidden>
      <div className="op-snippet-head">
        <span className="op-snippet-dot" />
        <span className="op-snippet-method">POST</span>
        <span className="op-snippet-url">api.anthropic.com / v1 / messages</span>
        <span className="op-snippet-flex" />
        <span className="op-snippet-status">200 ok · with cache</span>
      </div>
      <div className="op-snippet-body">
        <span className="op-snippet-line" style={{ "--ln-delay": "2400ms" } as CSSProperties}>
          <span className="op-snippet-key">"model"</span>
          <span className="op-snippet-colon">:</span>
          <span className="op-snippet-val">"claude-sonnet-4-…"</span>
          <span className="op-snippet-comma">,</span>
        </span>
        <span className="op-snippet-line" style={{ "--ln-delay": "2700ms" } as CSSProperties}>
          <span className="op-snippet-key">"system"</span>
          <span className="op-snippet-colon">:</span>
          <span className="op-snippet-val">[ … ]</span>
          <span className="op-snippet-comma">,</span>
        </span>
        <span className="op-snippet-line" style={{ "--ln-delay": "3000ms" } as CSSProperties}>
          <span className="op-snippet-key">"tools"</span>
          <span className="op-snippet-colon">:</span>
          <span className="op-snippet-val">[ … ]</span>
          <span className="op-snippet-comma">,</span>
        </span>
        <span className="op-snippet-line" style={{ "--ln-delay": "3300ms" } as CSSProperties}>
          <span className="op-snippet-key">"messages"</span>
          <span className="op-snippet-colon">:</span>
          <span className="op-snippet-val">[ … ]</span>
          <span className="op-snippet-comma">,</span>
        </span>
        <span
          className="op-snippet-line op-snippet-line-em"
          style={{ "--ln-delay": "3700ms" } as CSSProperties}
        >
          <span className="op-snippet-key op-snippet-key-em">"cache_control"</span>
          <span className="op-snippet-colon">:</span>
          <span className="op-snippet-val-em">{`{ "type": "ephemeral" }`}</span>
          <span className="op-snippet-pointer">
            <span className="op-snippet-pointer-arrow">←</span>
            <span className="op-snippet-pointer-text">主角</span>
          </span>
        </span>
      </div>
    </div>
  );
}
