import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Order.css";

/**
 * Chapter 05 · order — 排好队形（8 steps · ~57s）
 *
 * CSS prefix: .od-
 * Theme tokens only — no hardcoded hex / rgb / font names.
 *
 * Beat plan (1 list item = 1 step — see CHAPTER-CRAFT.md):
 *   step 0: chapter title hero
 *   step 1: Anthropic best-practice memo intro
 *   step 2-5: 4-layer stack reveal, **one layer per step**
 *            (active layer lit; previous layers dim to context;
 *             future layers stay as ghost outlines)
 *   step 6: one-liner principle hero + stable↔volatile axis
 *   step 7: desk analogy (3-tier desk, CSS geometry)
 */
export default function OrderChapter({ step }: ChapterStepProps) {
  /* ──────────────────────────────────────────────────────────────────
   * Step 0 — 章节标题 hero
   * 主导动作：hero 大字 mask reveal + 底部 queue tick 预览（4 段竖条
   * 从左到右依次画出，预告"4 层"概念）
   * ────────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="od-s0" className="od-scene">
        <div className="od-title">
          <div className="od-kicker">
            <span className="od-kicker-dot" />
            <span>Order · Lesson 05 · 排好队形</span>
          </div>
          <h1 className="od-title-hero">
            <MaskReveal show duration={1100}>
              <span className="od-zh">排好</span>
            </MaskReveal>
            <MaskReveal show delay={420} duration={1100}>
              <span className="od-zh od-em">队形</span>
            </MaskReveal>
          </h1>
          <div className="od-title-en">
            <MaskReveal show delay={1100} duration={900}>
              <span className="od-en">Arranging the queue.</span>
            </MaskReveal>
          </div>
          <div className="od-title-sub">
            <MaskReveal show delay={1700} duration={900}>
              <span className="od-zh-body">
                既然缓存靠前缀匹配，提示词里东西的
                <span className="od-em">排列顺序</span>就至关重要。
              </span>
            </MaskReveal>
          </div>
          <QueuePreview />
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────
   * Step 1 — Anthropic 最佳实践牌引入
   * 主导动作：memo / spec 卡 fly-in（左侧 4px accent bar 拉出 + 标签
   * 与 4 个未填充的 layer slot 依次 fade-up）；右侧 hero 行 mask reveal
   * ────────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="od-s1" className="od-scene">
        <div className="od-practice">
          <div className="od-practice-text">
            <div className="od-kicker">
              <span className="od-kicker-dot" />
              <span>Best Practice · Anthropic</span>
            </div>
            <h2 className="od-practice-headline">
              <MaskReveal show duration={1000}>
                <span className="od-en od-em-soft">Anthropic</span>
              </MaskReveal>
              <MaskReveal show delay={300} duration={1000}>
                <span className="od-zh"> 的</span>
              </MaskReveal>
              <MaskReveal show delay={520} duration={1000}>
                <span className="od-zh od-em">最佳实践</span>
              </MaskReveal>
              <MaskReveal show delay={820} duration={1000}>
                <span className="od-zh">，是</span>
              </MaskReveal>
              <br />
              <MaskReveal show delay={1100} duration={1000}>
                <span className="od-zh">这样</span>
              </MaskReveal>
              <MaskReveal show delay={1340} duration={1000}>
                <span className="od-zh od-em-soft">排的。</span>
              </MaskReveal>
            </h2>
            <div className="od-practice-meta">
              <span className="od-meta-line" />
              <span className="od-meta-text">
                prompt cache · 4 layers · stable → volatile
              </span>
            </div>
          </div>

          <PracticeMemo />
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────
   * Step 2 — Layer 1 揭示：系统指令 + 工具定义
   * 主导动作：底层第 1 层卡片"砸入位"（slide up + accent glow），
   * 其余 3 层保持 ghost dashed outline；左侧 layer-spec 切换
   * ────────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return <StackScene activeLayer={1} stepKey="s2" />;
  }
  /* Step 3 — Layer 2: CLAUDE.md（layer 1 灰化作上下文） */
  if (step === 3) {
    return <StackScene activeLayer={2} stepKey="s3" />;
  }
  /* Step 4 — Layer 3: session_context（layer 1-2 灰化） */
  if (step === 4) {
    return <StackScene activeLayer={3} stepKey="s4" />;
  }
  /* Step 5 — Layer 4: messages（layer 1-3 灰化）—— 4 层完整图 */
  if (step === 5) {
    return <StackScene activeLayer={4} stepKey="s5" />;
  }

  /* ──────────────────────────────────────────────────────────────────
   * Step 6 — 一句话原则 hero
   * 主导动作：底色横向 stable ↔ volatile 坐标轴自绘 + 4 个 token 名按
   * 顺位依次 stamp 落位；hero 大字 mask reveal
   * ────────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="od-s6" className="od-scene od-scene-center">
        <div className="od-principle">
          <div className="od-kicker od-kicker-center">
            <span className="od-kicker-dot" />
            <span>The one-liner</span>
          </div>
          <h1 className="od-principle-hero">
            <MaskReveal show duration={1100}>
              <span className="od-zh">越</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={1100}>
              <span className="od-zh od-em-soft">不容易变</span>
            </MaskReveal>
            <MaskReveal show delay={620} duration={1100}>
              <span className="od-zh">的东西，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={1000} duration={1100}>
              <span className="od-zh">越</span>
            </MaskReveal>
            <MaskReveal show delay={1280} duration={1100}>
              <span className="od-zh od-em">往前</span>
            </MaskReveal>
            <MaskReveal show delay={1560} duration={1100}>
              <span className="od-zh">放。</span>
            </MaskReveal>
          </h1>
          <StabilityAxis />
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────────────
   * Step 7 — 书桌比喻插画
   * 主导动作：3 层书桌从下往上依次"摞起来"
   *   - 底层一排参考书脊（厚墩墩，accent 标签）
   *   - 中层资料 stack（横线纸 sheet 抽屉式露出）
   *   - 顶层草稿（皱褶的纸 + 笔，accent dot）
   *   动作错峰 0.5s 一层；底部副标语 "不用每天把整张桌子翻一遍"
   * ────────────────────────────────────────────────────────────────── */
  return (
    <div key="od-s7" className="od-scene">
      <div className="od-desk-wrap">
        <div className="od-desk-text">
          <div className="od-kicker">
            <span className="od-kicker-dot" />
            <span>Like tidying your desk · 收拾书桌</span>
          </div>
          <h2 className="od-desk-headline">
            <MaskReveal show duration={1000}>
              <span className="od-zh">就好比，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={420} duration={1000}>
              <span className="od-zh od-em">收拾</span>
            </MaskReveal>
            <MaskReveal show delay={680} duration={1000}>
              <span className="od-zh">一张书桌。</span>
            </MaskReveal>
          </h2>
          <ul className="od-desk-list">
            <li className="od-desk-li od-desk-li-1">
              <span className="od-desk-li-tag">底层</span>
              <span className="od-desk-li-text">
                常年不动的<span className="od-em-soft">参考书</span>
              </span>
            </li>
            <li className="od-desk-li od-desk-li-2">
              <span className="od-desk-li-tag">中间</span>
              <span className="od-desk-li-text">
                这周要看的<span className="od-em-soft">资料</span>
              </span>
            </li>
            <li className="od-desk-li od-desk-li-3">
              <span className="od-desk-li-tag">最上</span>
              <span className="od-desk-li-text">
                今天写的<span className="od-em">草稿</span>
              </span>
            </li>
          </ul>
          <div className="od-desk-foot">
            不用每天，把整张桌子翻一遍。
          </div>
        </div>
        <DeskIllustration />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Layer config — single source of truth for the 4-layer stack
 * ════════════════════════════════════════════════════════════════════ */

interface LayerSpec {
  n: 1 | 2 | 3 | 4;
  en: string;
  zh: string;
  scopeTag: string;
  scopeNote: string;
  sketch: string[];
  /** narration line displayed as headline when this layer is active */
  headline: { lead: string; emph: string; tail: string };
}

const LAYERS: LayerSpec[] = [
  {
    n: 1,
    en: "system_prompt + tool_definitions",
    zh: "系统指令 + 工具定义",
    scopeTag: "GLOBAL",
    scopeNote: "所有会话共享",
    sketch: [
      'role: "You are Claude, an AI assistant…"',
      "tools: [ bash, read_file, edit_file, glob, grep ]",
    ],
    headline: { lead: "最前面，放 ", emph: "系统指令 + 工具定义", tail: "。" },
  },
  {
    n: 2,
    en: "CLAUDE.md",
    zh: "项目文档",
    scopeTag: "PROJECT",
    scopeNote: "同项目内共享",
    sketch: [
      "# Project: prompt-cache",
      "stack: react · vite · typescript",
      "lint: tsc --noEmit  ·  never log secrets",
    ],
    headline: { lead: "第二层，", emph: "项目文档", tail: "。" },
  },
  {
    n: 3,
    en: "session_context",
    zh: "会话上下文",
    scopeTag: "SESSION",
    scopeNote: "单次会话共享",
    sketch: [
      "open_files: [ Order.tsx, Order.css ]",
      "goal: ship Chapter 5 visuals",
    ],
    headline: { lead: "第三层，", emph: "当前会话的上下文", tail: "。" },
  },
  {
    n: 4,
    en: "messages",
    zh: "对话消息",
    scopeTag: "PER-TURN",
    scopeNote: "每轮新增一条",
    sketch: [
      "user · turn 1 …",
      "assistant · turn 1 …",
      "user · turn 2  ← new",
    ],
    headline: { lead: "最后才是 ", emph: "聊天消息", tail: "。" },
  },
];

/* ════════════════════════════════════════════════════════════════════
 *  StackScene — shared layout for steps 2-5
 *  active layer lights up; previous → context dim; future → ghost
 * ════════════════════════════════════════════════════════════════════ */

function StackScene({
  activeLayer,
  stepKey,
}: {
  activeLayer: 1 | 2 | 3 | 4;
  stepKey: string;
}) {
  const active = LAYERS[activeLayer - 1];
  return (
    <div key={`od-${stepKey}`} className="od-scene od-scene-stack">
      <div className="od-stack-text">
        <div className="od-kicker">
          <span className="od-kicker-dot" />
          <span>Layer {activeLayer} / 4 · {active.en}</span>
        </div>
        <h2 className="od-stack-headline">
          <MaskReveal show duration={1000}>
            <span className="od-zh">{active.headline.lead}</span>
          </MaskReveal>
          <MaskReveal show delay={420} duration={1000}>
            <span className="od-zh od-em">{active.headline.emph}</span>
          </MaskReveal>
          <MaskReveal show delay={780} duration={1000}>
            <span className="od-zh">{active.headline.tail}</span>
          </MaskReveal>
        </h2>
        <div className="od-stack-scope">
          <span className="od-scope-tag">{active.scopeTag}</span>
          <span className="od-scope-note">{active.scopeNote}</span>
        </div>
        <StackAxis activeLayer={activeLayer} />
      </div>
      <Stack activeLayer={activeLayer} />
    </div>
  );
}

function Stack({ activeLayer }: { activeLayer: 1 | 2 | 3 | 4 }) {
  /* Render top-to-bottom (DOM): layer 4, 3, 2, 1 → matches visual stack
   * (messages on top, system at bottom of the screen). */
  const ordered = [...LAYERS].reverse();
  return (
    <div className="od-stack" aria-hidden>
      {ordered.map((layer) => {
        const state =
          layer.n === activeLayer
            ? "active"
            : layer.n < activeLayer
              ? "context"
              : "ghost";
        return (
          <div
            key={layer.n}
            className={`od-card od-card-${state}`}
            data-layer={layer.n}
          >
            <div className="od-card-rail">
              <span className="od-card-num">0{layer.n}</span>
              <span className="od-card-rail-line" />
            </div>
            <div className="od-card-body">
              <div className="od-card-head">
                <span className="od-card-en">{layer.en}</span>
                <span className="od-card-zh">{layer.zh}</span>
              </div>
              {state !== "ghost" && (
                <div className="od-card-sketch">
                  {layer.sketch.map((line, i) => (
                    <div key={i} className="od-card-line">
                      {line}
                    </div>
                  ))}
                </div>
              )}
              {state === "ghost" && (
                <div className="od-card-ghost-hint">
                  <span className="od-ghost-tick" />
                  <span className="od-ghost-tick" />
                  <span className="od-ghost-tick" />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Visual: StackAxis — left-side vertical "STABLE → VOLATILE" axis
 *  shown alongside the layer text panel during steps 2-5
 * ════════════════════════════════════════════════════════════════════ */

function StackAxis({ activeLayer }: { activeLayer: 1 | 2 | 3 | 4 }) {
  return (
    <div className="od-axis">
      <div className="od-axis-cap od-axis-cap-bot">STABLE · 不易变</div>
      <div className="od-axis-line">
        {[1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className={`od-axis-tick ${n === activeLayer ? "is-active" : ""}`}
            style={{ left: `${((n - 1) / 3) * 100}%` }}
          >
            <span className="od-axis-tick-num">0{n}</span>
          </span>
        ))}
      </div>
      <div className="od-axis-cap od-axis-cap-top">VOLATILE · 常变</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Visual: QueuePreview (step 0)
 *  4 short vertical bars on a baseline — previewing "4 layers" idea
 * ════════════════════════════════════════════════════════════════════ */

function QueuePreview() {
  return (
    <div className="od-queue" aria-hidden>
      <span className="od-queue-line" />
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="od-queue-tick"
          style={
            { "--qd": `${2400 + i * 220}ms` } as React.CSSProperties
          }
        >
          <span className="od-queue-tick-cap">0{i + 1}</span>
        </span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Visual: PracticeMemo (step 1)
 *  Memo / spec sheet card — accent left bar, header,
 *  4 numbered (still empty) layer slots awaiting reveal
 * ════════════════════════════════════════════════════════════════════ */

function PracticeMemo() {
  return (
    <div className="od-memo" aria-hidden>
      <div className="od-memo-bar" />
      <div className="od-memo-head">
        <span className="od-memo-label">SPEC · Memo</span>
        <span className="od-memo-id">cache_layout · v1</span>
      </div>
      <div className="od-memo-title">
        prompt-cache layout — front to back
      </div>
      <ol className="od-memo-list">
        {LAYERS.map((l, i) => (
          <li
            key={l.n}
            className="od-memo-li"
            style={{ animationDelay: `${1100 + i * 260}ms` }}
          >
            <span className="od-memo-li-n">0{l.n}</span>
            <span className="od-memo-li-en">{l.en}</span>
            <span className="od-memo-li-tag">{l.scopeTag}</span>
          </li>
        ))}
      </ol>
      <div className="od-memo-foot">
        — stable at the front, volatile at the back —
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Visual: StabilityAxis (step 6)
 *  Horizontal axis: STABLE ←————— VOLATILE
 *  with the 4 token names anchored along it
 * ════════════════════════════════════════════════════════════════════ */

function StabilityAxis() {
  return (
    <div className="od-saxis" aria-hidden>
      <div className="od-saxis-cap od-saxis-cap-l">
        <span className="od-saxis-cap-zh">不易变 · 往前</span>
        <span className="od-saxis-cap-en">stable</span>
      </div>
      <div className="od-saxis-track">
        <span className="od-saxis-line" />
        <span className="od-saxis-arrow">▶</span>
        {LAYERS.map((l, i) => (
          <div
            key={l.n}
            className="od-saxis-stop"
            style={{
              left: `${(i / 3) * 100}%`,
              animationDelay: `${1900 + i * 240}ms`,
            }}
          >
            <span className="od-saxis-dot" />
            <span className="od-saxis-stop-num">0{l.n}</span>
            <span className="od-saxis-stop-en">{l.en}</span>
          </div>
        ))}
      </div>
      <div className="od-saxis-cap od-saxis-cap-r">
        <span className="od-saxis-cap-zh">常变 · 往后</span>
        <span className="od-saxis-cap-en">volatile</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
 *  Visual: DeskIllustration (step 7)
 *  Pure-CSS desk geometry — 3 vertical tiers stacked top down:
 *      top: drafts (loose papers + pen)
 *      mid: this-week docs (paper stack)
 *      bot: reference books (book spines)
 *  Each tier slides in from the side, staggered.
 * ════════════════════════════════════════════════════════════════════ */

function DeskIllustration() {
  return (
    <div className="od-desk" aria-hidden>
      {/* lamp */}
      <div className="od-desk-lamp">
        <div className="od-desk-lamp-head" />
        <div className="od-desk-lamp-arm" />
        <div className="od-desk-lamp-base" />
        <div className="od-desk-lamp-glow" />
      </div>

      {/* tier 3 (top): drafts — loose papers + pen */}
      <div className="od-desk-tier od-desk-tier-3">
        <span className="od-desk-tier-label">today · drafts</span>
        <div className="od-desk-shelf">
          <div className="od-paper od-paper-tilt-l">
            <span className="od-paper-line" />
            <span className="od-paper-line od-paper-line-short" />
            <span className="od-paper-line" />
          </div>
          <div className="od-paper od-paper-tilt-r">
            <span className="od-paper-line od-paper-line-short" />
            <span className="od-paper-line" />
          </div>
          <div className="od-pen" />
        </div>
        <div className="od-desk-board" />
      </div>

      {/* tier 2 (mid): this-week documents — paper stack */}
      <div className="od-desk-tier od-desk-tier-2">
        <span className="od-desk-tier-label">this week · docs</span>
        <div className="od-desk-shelf">
          <div className="od-stack-paper">
            <span className="od-paper-line" />
            <span className="od-paper-line" />
            <span className="od-paper-line od-paper-line-short" />
            <span className="od-paper-line" />
          </div>
          <div className="od-stack-paper od-stack-paper-2">
            <span className="od-paper-line" />
            <span className="od-paper-line od-paper-line-short" />
            <span className="od-paper-line" />
          </div>
        </div>
        <div className="od-desk-board" />
      </div>

      {/* tier 1 (bottom): reference books — book spines */}
      <div className="od-desk-tier od-desk-tier-1">
        <span className="od-desk-tier-label">always · reference</span>
        <div className="od-desk-shelf od-desk-shelf-books">
          {[
            { w: 50, h: 150 },
            { w: 38, h: 138 },
            { w: 56, h: 158 },
            { w: 42, h: 144 },
            { w: 60, h: 152 },
            { w: 44, h: 146 },
            { w: 36, h: 140 },
            { w: 50, h: 156 },
          ].map((b, i) => (
            <div
              key={i}
              className="od-book"
              style={{
                width: `${b.w}px`,
                height: `${b.h}px`,
                animationDelay: `${2400 + i * 80}ms`,
              }}
            >
              <span className="od-book-band" />
              <span className="od-book-band od-book-band-2" />
            </div>
          ))}
        </div>
        <div className="od-desk-board od-desk-board-floor" />
      </div>
    </div>
  );
}
