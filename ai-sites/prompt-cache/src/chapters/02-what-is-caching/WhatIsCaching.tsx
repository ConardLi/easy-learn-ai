import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./WhatIsCaching.css";

/**
 * Chapter 02 · what-is-caching — 什么是提示词缓存（5 steps · ~63s）
 *
 * CSS prefix: .wc-
 * Theme tokens only. No hardcoded colors / font names.
 */
export default function WhatIsCachingChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — prefill 概念图
   * 视觉演示：三色文本流入处理盒 → 扫描线逐 token 编码 → 内部表示
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="wc-s0" className="wc-scene">
        <div className="wc-step-tag">
          <span className="wc-tag-dot" />
          <span className="wc-tag-text">What is Prompt Caching</span>
        </div>

        <h2 className="wc-headline wc-headline-prefill">
          <MaskReveal show duration={900}>
            <span className="wc-zh">每次发消息，后台都要把</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={350} duration={900}>
            <span className="wc-zh">所有文本</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="wc-zh wc-em-soft">从头到尾</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="wc-zh wc-em">编码一遍</span>
          </MaskReveal>
          <MaskReveal show delay={1250} duration={900}>
            <span className="wc-zh">。</span>
          </MaskReveal>
        </h2>

        <PrefillDiagram />

        <div className="wc-prefill-cost">
          <span className="wc-cost-icon" />
          <span className="wc-cost-text">
            this <em>prefill</em> step — 延迟 &amp; 成本的大头
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 浪费图示：聊到第 20 轮，前 19 轮重新算
   * 视觉演示：20 个轮次格子，前 19 个染红 + 闪烁"REDONE"，第 20 个绿色 NEW
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="wc-s1" className="wc-scene">
        <div className="wc-step-tag">
          <span className="wc-tag-dot" />
          <span className="wc-tag-text">The Waste</span>
        </div>

        <h2 className="wc-headline wc-headline-waste">
          <MaskReveal show duration={900}>
            <span className="wc-zh">第 </span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="wc-en wc-em">20</span>
          </MaskReveal>
          <MaskReveal show delay={600} duration={900}>
            <span className="wc-zh"> 轮请求里，前 </span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={900}>
            <span className="wc-en wc-em">19</span>
          </MaskReveal>
          <MaskReveal show delay={1200} duration={900}>
            <span className="wc-zh"> 轮，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1500} duration={900}>
            <span className="wc-zh wc-em-soft">还得从第一个字重新算。</span>
          </MaskReveal>
        </h2>

        <RoundsGrid />

        <div className="wc-waste-tally">
          <span className="wc-tally-num">19×</span>
          <span className="wc-tally-text">redundant rounds · 白白做的重复劳动</span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 解法宣告 hero
   * 视觉演示：PROBLEM → SOLUTION 反转，hero 大字砸下
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="wc-s2" className="wc-scene wc-scene-center">
        <div className="wc-solution">
          <div className="wc-solution-flip">
            <span className="wc-flip-from">PROBLEM</span>
            <span className="wc-flip-arrow">→</span>
            <span className="wc-flip-to">SOLUTION</span>
          </div>
          <h1 className="wc-solution-hero">
            <MaskReveal show duration={1100}>
              <span className="wc-zh wc-em">提示词缓存</span>
            </MaskReveal>
          </h1>
          <div className="wc-solution-en">
            <MaskReveal show delay={500} duration={900}>
              <span className="wc-en">Prompt Caching</span>
            </MaskReveal>
          </div>
          <div className="wc-solution-foot">
            <MaskReveal show delay={1100} duration={700}>
              <span className="wc-zh wc-em-soft">— 就是来解决这个的。</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — cache_control 机制图
   * 视觉演示：请求被一刀切成 cached prefix + new tail；
   * 下次同请求来 → prefix 走 SKIP 快速通道，new 走 prefill
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="wc-s3" className="wc-scene">
        <div className="wc-step-tag">
          <span className="wc-tag-dot" />
          <span className="wc-tag-text">The Mechanism</span>
        </div>

        <h2 className="wc-headline wc-headline-mech">
          <MaskReveal show duration={900}>
            <span className="wc-zh">在请求里标一个</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="wc-zh wc-em">断点</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="wc-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1050} duration={900}>
            <span className="wc-zh">下次同前缀</span>
          </MaskReveal>
          <MaskReveal show delay={1350} duration={900}>
            <span className="wc-zh wc-em-soft">直接复用。</span>
          </MaskReveal>
        </h2>

        <MechanismDiagram />
        <a className="wc-neighbor-card" href="../kv-cache/index.html" data-no-advance>
          <span className="wc-neighbor-icon" aria-hidden>
            ↗
          </span>
          <span>
            <strong>这里复用的是多个请求共有的前缀。</strong>
            <small>一次回答内部怎样复用历史计算，去看《KV Cache》。</small>
          </span>
        </a>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 论文比喻
   * 视觉演示：左边 "重抄" 慢吞吞 vs 右边 "快进+只写新章"
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="wc-s4" className="wc-scene">
      <div className="wc-step-tag">
        <span className="wc-tag-dot" />
        <span className="wc-tag-text">An Analogy · Writing a Thesis</span>
      </div>

      <h2 className="wc-headline wc-headline-analogy">
        <MaskReveal show duration={900}>
          <span className="wc-zh">每次写论文，</span>
        </MaskReveal>
        <MaskReveal show delay={400} duration={900}>
          <span className="wc-zh">都要先</span>
        </MaskReveal>
        <MaskReveal show delay={700} duration={900}>
          <span className="wc-zh wc-em-soft">重抄目录和前几章</span>
        </MaskReveal>
        <MaskReveal show delay={1050} duration={900}>
          <span className="wc-zh">？</span>
        </MaskReveal>
      </h2>

      <ThesisAnalogy />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefillDiagram (step 0)
 * 三种文本块（系统指令 / 历史对话 / 新消息）依次进入处理盒，
 * 处理盒内一根扫描线从左到右扫过，下方输出 token 网格
 * ────────────────────────────────────────────────────────────────── */
function PrefillDiagram() {
  return (
    <div className="wc-prefill" aria-hidden>
      <div className="wc-prefill-input">
        <div className="wc-input-block wc-input-sys">
          <span className="wc-block-label">SYSTEM</span>
          <span className="wc-block-bars">
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
          </span>
        </div>
        <div className="wc-input-block wc-input-hist">
          <span className="wc-block-label">HISTORY · 19 turns</span>
          <span className="wc-block-bars">
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
            <span className="wc-bar" />
          </span>
        </div>
        <div className="wc-input-block wc-input-new">
          <span className="wc-block-label">NEW MSG</span>
          <span className="wc-block-bars">
            <span className="wc-bar" />
            <span className="wc-bar" />
          </span>
        </div>
      </div>
      <div className="wc-prefill-arrow">
        <span className="wc-arrow-stem" />
        <span className="wc-arrow-head">▶</span>
      </div>
      <div className="wc-prefill-box">
        <div className="wc-box-label">prefill( )</div>
        <div className="wc-box-grid">
          {Array.from({ length: 60 }, (_, i) => (
            <span key={i} className="wc-grid-cell" style={{ animationDelay: `${1500 + i * 28}ms` }} />
          ))}
        </div>
        <div className="wc-box-scanner" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: RoundsGrid (step 1)
 * 20 个轮次方块，1-19 红色 redone X 戳，第 20 个绿色 NEW
 * ────────────────────────────────────────────────────────────────── */
function RoundsGrid() {
  return (
    <div className="wc-rounds" aria-hidden>
      {Array.from({ length: 20 }, (_, i) => {
        const isNew = i === 19;
        const baseDelay = 2200 + i * 100;
        return (
          <div
            key={i}
            className={`wc-round ${isNew ? "is-new" : "is-redone"}`}
            style={
              {
                "--round-delay": `${baseDelay}ms`,
              } as React.CSSProperties
            }
          >
            <div className="wc-round-num">{String(i + 1).padStart(2, "0")}</div>
            <div className="wc-round-bars">
              <span />
              <span />
              <span />
            </div>
            {!isNew && <div className="wc-round-stamp">REDONE</div>}
            {isNew && <div className="wc-round-stamp wc-round-stamp-new">NEW</div>}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: MechanismDiagram (step 3)
 * 两条请求堆叠：上面 = 第一次（标 cache_control 断点 → 写入缓存）
 *              下面 = 第二次（前缀命中 → SKIP 快速通道）
 * ────────────────────────────────────────────────────────────────── */
function MechanismDiagram() {
  return (
    <div className="wc-mech" aria-hidden>
      {/* request 1 — write */}
      <div className="wc-mech-row wc-mech-row-1">
        <div className="wc-mech-label">
          <span className="wc-mech-label-num">REQ&nbsp;1</span>
          <span className="wc-mech-label-text">first call · WRITE</span>
        </div>
        <div className="wc-mech-bar">
          <div className="wc-mech-prefix">
            <span className="wc-mech-piece-text">system + history</span>
          </div>
          <div className="wc-mech-breakpoint">
            <span className="wc-bp-marker">⟦</span>
            <span className="wc-bp-code">cache_control</span>
          </div>
          <div className="wc-mech-tail">
            <span className="wc-mech-piece-text">new msg</span>
          </div>
        </div>
        <div className="wc-mech-action wc-mech-action-write">
          <span className="wc-action-pulse" />
          stored
        </div>
      </div>

      {/* request 2 — hit */}
      <div className="wc-mech-row wc-mech-row-2">
        <div className="wc-mech-label">
          <span className="wc-mech-label-num">REQ&nbsp;2</span>
          <span className="wc-mech-label-text">same prefix · HIT</span>
        </div>
        <div className="wc-mech-bar">
          <div className="wc-mech-prefix wc-mech-prefix-hit">
            <span className="wc-mech-piece-text">system + history</span>
            <span className="wc-mech-skip-stamp">SKIP · cached</span>
          </div>
          <div className="wc-mech-breakpoint wc-mech-breakpoint-dim">
            <span className="wc-bp-marker">⟦</span>
            <span className="wc-bp-code">cache_control</span>
          </div>
          <div className="wc-mech-tail">
            <span className="wc-mech-piece-text">new msg</span>
          </div>
        </div>
        <div className="wc-mech-action wc-mech-action-hit">
          <span className="wc-action-pulse" />
          reused
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ThesisAnalogy (step 4)
 * 左：每次重抄整本论文的前几章 + 新章（费力，慢）
 * 右：缓存命中 → 之前章节 SKIP，只写新章节（快）
 * ────────────────────────────────────────────────────────────────── */
function ThesisAnalogy() {
  const oldChapters = [
    { tag: "TOC", label: "目录" },
    { tag: "CH1", label: "第 1 章 · 引言" },
    { tag: "CH2", label: "第 2 章 · 方法" },
    { tag: "CH3", label: "第 3 章 · 实验" },
  ];
  return (
    <div className="wc-thesis">
      {/* left side — without cache, redo every time */}
      <div className="wc-thesis-side wc-thesis-side-old">
        <div className="wc-thesis-tag wc-thesis-tag-old">WITHOUT CACHE</div>
        <div className="wc-thesis-doc">
          {oldChapters.map((c, i) => (
            <div
              key={c.tag}
              className="wc-thesis-chapter wc-thesis-chapter-redo"
              style={
                {
                  "--ch-delay": `${1500 + i * 250}ms`,
                } as React.CSSProperties
              }
            >
              <span className="wc-thesis-ch-tag">{c.tag}</span>
              <span className="wc-thesis-ch-label">{c.label}</span>
              <span className="wc-thesis-redraw" />
            </div>
          ))}
          <div
            className="wc-thesis-chapter wc-thesis-chapter-new wc-thesis-chapter-new-old"
            style={
              {
                "--ch-delay": `${1500 + oldChapters.length * 250}ms`,
              } as React.CSSProperties
            }
          >
            <span className="wc-thesis-ch-tag">NEW</span>
            <span className="wc-thesis-ch-label">新增内容</span>
          </div>
        </div>
        <div className="wc-thesis-cost wc-thesis-cost-bad">
          每次都从第一页重写
        </div>
      </div>

      {/* divider */}
      <div className="wc-thesis-divider">
        <span className="wc-divider-vs">vs</span>
      </div>

      {/* right side — with cache, skip cached chapters */}
      <div className="wc-thesis-side wc-thesis-side-new">
        <div className="wc-thesis-tag wc-thesis-tag-new">WITH CACHE</div>
        <div className="wc-thesis-doc">
          {oldChapters.map((c, i) => (
            <div
              key={c.tag}
              className="wc-thesis-chapter wc-thesis-chapter-skip"
              style={
                {
                  "--ch-delay": `${3000 + i * 200}ms`,
                } as React.CSSProperties
              }
            >
              <span className="wc-thesis-ch-tag">{c.tag}</span>
              <span className="wc-thesis-ch-label">{c.label}</span>
              <span className="wc-thesis-fastforward">»</span>
            </div>
          ))}
          <div
            className="wc-thesis-chapter wc-thesis-chapter-new"
            style={
              {
                "--ch-delay": `${3000 + oldChapters.length * 200}ms`,
              } as React.CSSProperties
            }
          >
            <span className="wc-thesis-ch-tag">NEW</span>
            <span className="wc-thesis-ch-label">新增内容</span>
          </div>
        </div>
        <div className="wc-thesis-cost wc-thesis-cost-good">
          抄过的快进 · 只写新的那段
        </div>
      </div>
    </div>
  );
}
