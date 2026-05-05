import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./CacheSafeForking.css";

/**
 * Chapter 14 · cache-safe-forking — 缓存安全分叉（7 steps · ~59s）
 *
 * CSS prefix: .csf-
 * Theme tokens only (no hardcoded hex / rgb / font names).
 *
 * 节奏 / 节拍 来自 script.md（7 段），细节回 article.md §175-185。
 *   step 0 — 解法名 hero + 分叉示意
 *   step 1 — 做法卡：4 个必须完全相同的部件
 *   step 2 — 末尾追加：一条 user message 滑入
 *   step 3 — diff 视图（章节灵魂）：左右两栏 + 仅末尾一行 +highlight
 *   step 4 — 增量成本卡
 *   step 5 — 缓冲区警告：context window 提前留 buffer
 *   step 6 — 收束 hero
 */
export default function CacheSafeForkingChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * STEP 0 — 解法名 hero
   * 视觉：主对话主干 → 在某一点分叉出一条短旁路（"compact"），
   *        旁路与主干共享起点，象征"前缀复用"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="csf-s0" className="csf-scene csf-scene-center">
        <div className="csf-step-tag">
          <span className="csf-tag-dot" />
          <span className="csf-tag-text">Lesson 7 · The Trick</span>
        </div>

        <div className="csf-hero-block">
          <h1 className="csf-hero">
            <MaskReveal show duration={1000}>
              <span className="csf-zh">缓存</span>
            </MaskReveal>
            <MaskReveal show delay={350} duration={1000}>
              <span className="csf-zh">安全</span>
            </MaskReveal>
            <MaskReveal show delay={700} duration={1000}>
              <span className="csf-zh csf-em">分叉</span>
            </MaskReveal>
          </h1>
          <div className="csf-hero-en">
            <MaskReveal show delay={1300} duration={900}>
              <span className="csf-en">
                Cache-Safe <em>Forking</em>
              </span>
            </MaskReveal>
          </div>
          <div className="csf-hero-foot">
            <MaskReveal show delay={1900} duration={700}>
              <span className="csf-zh csf-em-soft">
                — Anthropic 的解决方案
              </span>
            </MaskReveal>
          </div>
        </div>

        <ForkDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 1 — 做法卡：4 件必须与主对话完全一样
   * 视觉：4 块结构件竖排，逐项亮起 + 每件挂 "= MAIN" 同位徽章
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="csf-s1" className="csf-scene">
        <div className="csf-step-tag">
          <span className="csf-tag-dot" />
          <span className="csf-tag-text">The Recipe</span>
        </div>

        <h2 className="csf-headline csf-headline-recipe">
          <MaskReveal show duration={900}>
            <span className="csf-zh">压缩请求</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="csf-zh">必须用</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="csf-zh csf-em">和主对话完全一样的</span>
          </MaskReveal>
          <MaskReveal show delay={1100} duration={900}>
            <span className="csf-zh">⋯</span>
          </MaskReveal>
        </h2>

        <RecipeStack />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 2 — 末尾追加：一条 compact 指令作为新的 user message
   * 视觉：左侧主对话尾部 → APPEND 箭头 → 一根新 message bubble 滑入末尾
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="csf-s2" className="csf-scene">
        <div className="csf-step-tag">
          <span className="csf-tag-dot" />
          <span className="csf-tag-text">Append Only</span>
        </div>

        <h2 className="csf-headline csf-headline-append">
          <MaskReveal show duration={900}>
            <span className="csf-zh">在末尾</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="csf-zh csf-em">追加一条</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="csf-zh">压缩指令，</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={900}>
            <span className="csf-zh csf-em-soft">作为新的 user message。</span>
          </MaskReveal>
        </h2>

        <AppendDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 3 — API 视角 diff（章节灵魂）
   * 视觉：左右两列 mono diff
   *   左列 = "previous request"（主对话上一次）
   *   右列 = "this request"（压缩请求）
   *   两列内容完全一致，仅右列底部一行 `+ user: "Compact this..."` 高亮
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="csf-s3" className="csf-scene">
        <div className="csf-step-tag">
          <span className="csf-tag-dot" />
          <span className="csf-tag-text">From the API's view</span>
        </div>

        <h2 className="csf-headline csf-headline-diff">
          <MaskReveal show duration={900}>
            <span className="csf-zh">这个请求 和 上一次，</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="csf-zh csf-em">几乎一模一样。</span>
          </MaskReveal>
        </h2>

        <DiffView />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 4 — 增量成本卡
   * 视觉：一根长 bar 代表整个 prompt，绝大多数被涂为 "cached / Δ=0"，
   *        末尾一小段（最后那条 compact 指令）被涂为 accent，
   *        旁边大字 Δ COST = ONE MESSAGE
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="csf-s4" className="csf-scene csf-scene-center">
        <div className="csf-cost-block">
          <div className="csf-cost-kicker">incremental cost</div>
          <div className="csf-cost-hero">
            <MaskReveal show duration={900}>
              <span className="csf-en csf-cost-delta">Δ</span>
            </MaskReveal>
            <MaskReveal show delay={250} duration={900}>
              <span className="csf-zh"> 只有 </span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={900}>
              <span className="csf-zh csf-em">最后那条指令</span>
            </MaskReveal>
            <MaskReveal show delay={800} duration={900}>
              <span className="csf-zh">本身。</span>
            </MaskReveal>
          </div>
          <CostBar />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 5 — 缓冲区警告
   * 视觉：context window 长条 ─ 主对话占大头（cached），尾部斜纹
   *        红色 reserved 区域 = "compaction buffer · 给摘要输出留位"，
   *        坏例：等填满才压缩，错过窗口
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="csf-s5" className="csf-scene">
        <div className="csf-step-tag">
          <span className="csf-tag-dot" />
          <span className="csf-tag-text">Reserve a Buffer</span>
        </div>

        <h2 className="csf-headline csf-headline-buffer">
          <MaskReveal show duration={900}>
            <span className="csf-zh">提前留 </span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="csf-en csf-em">buffer</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="csf-zh">，</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="csf-zh csf-em-soft">不能等窗口填满才压缩。</span>
          </MaskReveal>
        </h2>

        <BufferDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * STEP 6 — 收束 hero
   * 视觉：分叉示意收束 + hero 大字
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="csf-s6" className="csf-scene csf-scene-center">
      <div className="csf-close-block">
        <h1 className="csf-close-hero">
          <MaskReveal show duration={1000}>
            <span className="csf-zh">一次压缩，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={500} duration={1000}>
            <span className="csf-zh">复用</span>
          </MaskReveal>
          <MaskReveal show delay={800} duration={1000}>
            <span className="csf-zh csf-em">全部缓存</span>
          </MaskReveal>
          <MaskReveal show delay={1200} duration={1000}>
            <span className="csf-zh">。</span>
          </MaskReveal>
        </h1>
        <div className="csf-close-payoff">
          <MaskReveal show delay={2100} duration={900}>
            <span className="csf-zh csf-em-soft">几乎</span>
          </MaskReveal>
          <MaskReveal show delay={2400} duration={900}>
            <span className="csf-zh csf-em-bigsoft">不多花钱。</span>
          </MaskReveal>
        </div>
        <CloseFork />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: ForkDiagram — step 0
 * SVG: 主对话主干（一条横线 + 沿线分布的小 message dot）
 *      在中段分叉出一条向下短旁路（compact 请求），共享前缀
 * ════════════════════════════════════════════════════════════════════ */
function ForkDiagram() {
  return (
    <div className="csf-fork" aria-hidden>
      <svg
        viewBox="0 0 1200 240"
        preserveAspectRatio="xMidYMid meet"
        className="csf-fork-svg"
      >
        {/* shared prefix track */}
        <line
          x1="60"
          y1="100"
          x2="700"
          y2="100"
          className="csf-fork-shared"
        />
        {/* main conversation continues */}
        <line
          x1="700"
          y1="100"
          x2="1140"
          y2="100"
          className="csf-fork-main"
        />
        {/* fork branch curve down → compact */}
        <path
          d="M 700 100 Q 760 100 800 140 L 1080 140"
          className="csf-fork-branch"
          fill="none"
        />
        {/* dots along shared prefix */}
        {[140, 240, 340, 440, 540, 640].map((cx, i) => (
          <circle
            key={i}
            cx={cx}
            cy={100}
            r={6}
            className="csf-fork-dot csf-fork-dot-shared"
            style={{ animationDelay: `${1700 + i * 80}ms` }}
          />
        ))}
        {/* fork point */}
        <circle
          cx={700}
          cy={100}
          r={9}
          className="csf-fork-pivot"
        />
        {/* main continues dots */}
        {[820, 920, 1020].map((cx, i) => (
          <circle
            key={`m${i}`}
            cx={cx}
            cy={100}
            r={5}
            className="csf-fork-dot csf-fork-dot-main"
            style={{ animationDelay: `${2400 + i * 80}ms` }}
          />
        ))}
        {/* compact branch dot */}
        <circle
          cx={1080}
          cy={140}
          r={9}
          className="csf-fork-compact-dot"
        />
        {/* labels */}
        <text x={60} y={70} className="csf-fork-label-prefix">
          shared prefix · cached
        </text>
        <text x={830} y={84} className="csf-fork-label-main">
          main →
        </text>
        <text x={830} y={172} className="csf-fork-label-compact">
          compact ↘
        </text>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: RecipeStack — step 1
 * 4 块结构件竖排，每件 = 一个名 + 一段 placeholder 内容 + "= MAIN" 徽章
 * 逐项 stagger 进入。
 * ════════════════════════════════════════════════════════════════════ */
function RecipeStack() {
  const parts = [
    {
      key: "system_prompt",
      label: "system_prompt",
      hint: '"You are Claude Code, an interactive CLI tool…"',
    },
    {
      key: "user_context",
      label: "user_context",
      hint: "<environment>cwd: ~/proj  os: darwin  …</environment>",
    },
    {
      key: "tool_definitions",
      label: "tool_definitions",
      hint: "[ Read · Write · Bash · Grep · Edit · Glob · … ]",
    },
    {
      key: "messages",
      label: "messages · main conversation history",
      hint: "[ user → assistant → tool_use → … 主对话全部消息 ]",
    },
  ];
  return (
    <div className="csf-recipe">
      {parts.map((p, i) => (
        <div
          key={p.key}
          className="csf-recipe-row"
          style={{ animationDelay: `${1500 + i * 320}ms` }}
        >
          <div className="csf-recipe-key">{p.label}</div>
          <div className="csf-recipe-val">
            <span className="csf-recipe-hint">{p.hint}</span>
          </div>
          <div
            className="csf-recipe-badge"
            style={{ animationDelay: `${1700 + i * 320}ms` }}
          >
            <span className="csf-badge-eq">=</span> MAIN
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: AppendDiagram — step 2
 * 主对话 message 列尾部（已有的 user/assistant turn）+ 一根新 user
 * message 从右边滑入末尾，标 "+ append"
 * ════════════════════════════════════════════════════════════════════ */
function AppendDiagram() {
  const existing = [
    { role: "user", text: "fix the bug in auth.ts" },
    { role: "assistant", text: "I'll start by reading the file…" },
    { role: "tool", text: "Read(auth.ts) · 142 lines" },
    { role: "assistant", text: "found it — null check missing on L37" },
  ];
  return (
    <div className="csf-append" aria-hidden>
      <div className="csf-append-list">
        {existing.map((m, i) => (
          <div
            key={i}
            className={`csf-msg csf-msg-${m.role}`}
            style={{ animationDelay: `${1500 + i * 220}ms` }}
          >
            <span className="csf-msg-role">{m.role}</span>
            <span className="csf-msg-text">{m.text}</span>
          </div>
        ))}
        <div className="csf-append-arrow">
          <span className="csf-arrow-stem" />
          <span className="csf-arrow-tag">append ↘</span>
        </div>
        <div className="csf-msg csf-msg-user csf-msg-new">
          <span className="csf-msg-plus">+</span>
          <span className="csf-msg-role">user</span>
          <span className="csf-msg-text">
            Compact this conversation. Preserve all decisions, file paths, and
            open TODOs in a single summary message.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: DiffView — step 3 (章节灵魂)
 * 左右两列 mono diff
 *   左列 = previous request
 *   右列 = this request
 *   两列前 N 行内容完全一致 (黯色)，仅右列底部 1 行 + accent highlight
 * ════════════════════════════════════════════════════════════════════ */
function DiffView() {
  const lines: Array<{ k: string; v: string; cls?: string }> = [
    { k: "system_prompt", v: '"You are Claude Code…"' },
    { k: "user_context", v: "<environment>cwd: ~/proj …</environment>" },
    { k: "tool_definitions", v: "[ Read, Write, Bash, Grep, Edit, … ]" },
    { k: "messages[0]", v: 'user · "fix the bug in auth.ts"' },
    { k: "messages[1]", v: 'assistant · "I\'ll start by reading…"' },
    { k: "messages[2]", v: "tool · Read(auth.ts) · 142 lines" },
    { k: "messages[3]", v: 'assistant · "found it — null check missing"' },
    { k: "messages[4]", v: 'tool · Edit(auth.ts) · +3 -1' },
    { k: "messages[…]", v: "… 主对话全部历史 …" },
  ];

  return (
    <div className="csf-diff" aria-hidden>
      {/* left column — previous request */}
      <div className="csf-diff-col csf-diff-col-left">
        <div className="csf-diff-header">
          <span className="csf-diff-tag">PREV REQUEST</span>
          <span className="csf-diff-meta">main conversation · turn N</span>
        </div>
        <div className="csf-diff-body">
          {lines.map((ln, i) => (
            <div
              key={i}
              className="csf-diff-line"
              style={{ animationDelay: `${1500 + i * 70}ms` }}
            >
              <span className="csf-diff-mark"> </span>
              <span className="csf-diff-key">{ln.k}</span>
              <span className="csf-diff-val">{ln.v}</span>
            </div>
          ))}
          <div
            className="csf-diff-line csf-diff-line-blank"
            style={{ animationDelay: `${1500 + lines.length * 70}ms` }}
          >
            <span className="csf-diff-mark"> </span>
            <span className="csf-diff-key">&nbsp;</span>
            <span className="csf-diff-val csf-diff-val-empty">∅</span>
          </div>
        </div>
      </div>

      {/* right column — this request (compact) */}
      <div className="csf-diff-col csf-diff-col-right">
        <div className="csf-diff-header">
          <span className="csf-diff-tag csf-diff-tag-this">THIS REQUEST</span>
          <span className="csf-diff-meta">compact · cache-safe fork</span>
        </div>
        <div className="csf-diff-body">
          {lines.map((ln, i) => (
            <div
              key={i}
              className="csf-diff-line"
              style={{ animationDelay: `${1500 + i * 70}ms` }}
            >
              <span className="csf-diff-mark"> </span>
              <span className="csf-diff-key">{ln.k}</span>
              <span className="csf-diff-val">{ln.v}</span>
            </div>
          ))}
          {/* the only added line — heavily highlighted */}
          <div
            className="csf-diff-line csf-diff-line-add"
            style={{ animationDelay: `${1500 + lines.length * 70 + 600}ms` }}
          >
            <span className="csf-diff-mark csf-diff-mark-add">+</span>
            <span className="csf-diff-key">messages[N+1]</span>
            <span className="csf-diff-val csf-diff-val-add">
              user · "Compact this conversation…"
            </span>
          </div>
        </div>
      </div>

      {/* footer verdict */}
      <div className="csf-diff-verdict">
        <span className="csf-diff-verdict-num">1</span>
        <span className="csf-diff-verdict-label">
          line of difference · cache prefix reused
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: CostBar — step 4
 * 一根长 bar 代表整个请求的 token 量；前 ~94% 标 "cached"（dim），
 * 末尾 ~6% 标 accent + "Δ NEW"
 * ════════════════════════════════════════════════════════════════════ */
function CostBar() {
  return (
    <div className="csf-costbar">
      <div className="csf-costbar-track">
        <div className="csf-costbar-cached">
          <span className="csf-costbar-cached-label">
            cached prefix · system + tools + history
          </span>
        </div>
        <div className="csf-costbar-new">
          <span className="csf-costbar-new-label">+ Δ</span>
        </div>
      </div>
      <div className="csf-costbar-axis">
        <span className="csf-costbar-axis-l">0</span>
        <span className="csf-costbar-axis-r">~ entire request</span>
      </div>
      <div className="csf-costbar-callout">
        <span className="csf-costbar-callout-arrow">↑</span>
        <span className="csf-costbar-callout-text">
          ≈ a few dozen tokens · pays the full price for this only
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: BufferDiagram — step 5
 * 长方形 = 200K context window；
 *   主对话已占的部分 (~75%) → "cached / in use" dim 灰
 *   保留区 (~15%) → diagonal stripe accent → "compaction buffer · 摘要输出预留"
 *   错例 ✗ 等填满才压缩 → 标在最右端
 * ════════════════════════════════════════════════════════════════════ */
function BufferDiagram() {
  return (
    <div className="csf-buffer" aria-hidden>
      <div className="csf-buffer-window">
        <div className="csf-buffer-axis-top">
          <span className="csf-buffer-axis-cap">context window · 200K</span>
        </div>
        <div className="csf-buffer-bar">
          <div className="csf-buffer-used">
            <span className="csf-buffer-label">conversation in progress</span>
          </div>
          <div className="csf-buffer-reserved">
            <span className="csf-buffer-reserved-label">
              compaction buffer
            </span>
            <span className="csf-buffer-reserved-sub">
              reserved for summary output
            </span>
          </div>
        </div>
        <div className="csf-buffer-marks">
          <div className="csf-buffer-mark csf-buffer-mark-good">
            <span className="csf-buffer-mark-glyph">✓</span>
            <span className="csf-buffer-mark-text">
              start compacting <em>here</em> · with room to write the summary
            </span>
          </div>
          <div className="csf-buffer-mark csf-buffer-mark-bad">
            <span className="csf-buffer-mark-glyph">✗</span>
            <span className="csf-buffer-mark-text">
              waiting until <em>full</em> · summary has nowhere to go
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 * VISUAL: CloseFork — step 6
 * 一个简化的 fork 收束图：分叉的旁路收回主干（前缀复用 → 几乎不多花钱）
 * ════════════════════════════════════════════════════════════════════ */
function CloseFork() {
  return (
    <div className="csf-close-fork" aria-hidden>
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="xMidYMid meet"
        className="csf-close-fork-svg"
      >
        <line
          x1="40"
          y1="50"
          x2="960"
          y2="50"
          className="csf-close-trunk"
        />
        <path
          d="M 540 50 Q 600 50 640 80 L 880 80 L 920 50"
          className="csf-close-loop"
          fill="none"
        />
        <circle cx={540} cy={50} r={7} className="csf-close-pivot" />
        <circle cx={920} cy={50} r={9} className="csf-close-end" />
      </svg>
    </div>
  );
}
