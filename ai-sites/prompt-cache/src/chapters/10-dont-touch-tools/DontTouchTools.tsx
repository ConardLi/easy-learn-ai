import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./DontTouchTools.css";

/**
 * Chapter 10 · dont-touch-tools — 别碰工具（5 steps · ~34s）
 *
 * CSS prefix: .dt-
 * Theme tokens only. No hardcoded colors / font names.
 *
 * 5 节拍：
 *   0  钩子          对话过程中，工具集不要动     + 工具盒 + 锁
 *   1  直觉做法      30 个工具中只留 3 个       + 看似更干净
 *   2  真相事实卡    工具定义是前缀的一部分     + 加减就断
 *   3  链断后果      整段缓存重建 / 代价对照     + 链节断裂
 *   4  收束金句      看着像优化，结果是添乱
 */
export default function DontTouchToolsChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 钩子：对话过程中，工具集不要动
   * 视觉：一个 mono 工具栏 panel（8 个 tool slot），
   *       中央一把 CSS 拼接的锁 + "DO NOT TOUCH" 红色封条带
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="dt-s0" className="dt-scene dt-scene-center">
        <div className="dt-step-tag">
          <span className="dt-tag-dot" />
          <span className="dt-tag-text">Tool Set · Don't Touch</span>
        </div>

        <h1 className="dt-headline dt-headline-hook">
          <MaskReveal show duration={1000}>
            <span className="dt-zh">对话过程中，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={420} duration={1000}>
            <span className="dt-zh dt-em">工具集不要动。</span>
          </MaskReveal>
        </h1>

        <ToolboxLocked />

        <div className="dt-hook-foot">
          <MaskReveal show delay={2400} duration={700}>
            <span className="dt-en">— same root rule, again.</span>
          </MaskReveal>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 直觉做法图：30 个工具中只留 3 个
   * 视觉：6×5 工具网格，27 个被划掉/灰化，3 个高亮 accent
   *       底部加一行"看起来更干净 ✓"绿色对勾（误导）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="dt-s1" className="dt-scene">
        <div className="dt-step-tag">
          <span className="dt-tag-dot" />
          <span className="dt-tag-text">An Intuitive Move</span>
        </div>

        <h2 className="dt-headline dt-headline-naive">
          <MaskReveal show duration={900}>
            <span className="dt-zh">当前任务只用 </span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="dt-en dt-em">3</span>
          </MaskReveal>
          <MaskReveal show delay={550} duration={900}>
            <span className="dt-zh"> 个工具，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={900} duration={900}>
            <span className="dt-zh">另外 </span>
          </MaskReveal>
          <MaskReveal show delay={1180} duration={900}>
            <span className="dt-en dt-em-soft">30</span>
          </MaskReveal>
          <MaskReveal show delay={1450} duration={900}>
            <span className="dt-zh"> 个移走，</span>
          </MaskReveal>
          <MaskReveal show delay={1750} duration={900}>
            <span className="dt-zh dt-em-soft">不更干净吗？</span>
          </MaskReveal>
        </h2>

        <ToolGrid />

        <div className="dt-naive-verdict">
          <span className="dt-verdict-check">✓</span>
          <span className="dt-verdict-text">看起来更干净</span>
          <span className="dt-verdict-en">— feels clean, right?</span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 真相事实卡：工具定义是缓存前缀的一部分
   * 视觉：一条横向前缀条 [SYSTEM | TOOLS | HISTORY | MSG]，
   *       TOOLS 段被聚光灯锁定 + "你以为它独立 / 其实在前缀里"标注
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="dt-s2" className="dt-scene">
        <div className="dt-step-tag">
          <span className="dt-tag-dot" />
          <span className="dt-tag-text">But — The Truth</span>
        </div>

        <h2 className="dt-headline dt-headline-truth">
          <MaskReveal show duration={1000}>
            <span className="dt-zh">工具定义</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={1000}>
            <span className="dt-zh">是</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={1000}>
            <span className="dt-zh dt-em">缓存前缀</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={1000}>
            <span className="dt-zh">的一部分。</span>
          </MaskReveal>
        </h2>

        <PrefixBar />

        <div className="dt-truth-foot">
          <MaskReveal show delay={4200} duration={700}>
            <span className="dt-zh">加一个，减一个 — </span>
          </MaskReveal>
          <MaskReveal show delay={4600} duration={700}>
            <span className="dt-zh dt-em">缓存就断了。</span>
          </MaskReveal>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 链断后果：移除一个工具 → 整段缓存重建
   * 视觉：cache chain 4 节链节横排 [system]-[tools]-[history]-[msg]，
   *       链节中间有连接环；tools 节震动、连环断裂、其后所有节染红
   *       底部双横条对照：「省下的体积」（极小）vs「重建代价」（极大）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="dt-s3" className="dt-scene">
        <div className="dt-step-tag">
          <span className="dt-tag-dot" />
          <span className="dt-tag-text">The Chain Breaks</span>
        </div>

        <h2 className="dt-headline dt-headline-break">
          <MaskReveal show duration={900}>
            <span className="dt-zh">一断，</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="dt-zh dt-em">整段对话</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="dt-zh">的缓存</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={900}>
            <span className="dt-zh dt-em-soft">全部重建。</span>
          </MaskReveal>
        </h2>

        <CacheChain />

        <CostCompare />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 收束金句：看着像优化，结果是添乱
   * 视觉：双行 hero。第一行有删除线（看似优化），
   *       第二行 accent + 红章 stamp（实则添乱）
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="dt-s4" className="dt-scene dt-scene-center">
      <div className="dt-coda">
        <div className="dt-coda-line dt-coda-line-1">
          <MaskReveal show duration={1000}>
            <span className="dt-zh">看着像</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={1000}>
            <span className="dt-zh dt-coda-strike">优化，</span>
          </MaskReveal>
        </div>
        <div className="dt-coda-line dt-coda-line-2">
          <MaskReveal show delay={1100} duration={1100}>
            <span className="dt-zh">结果是</span>
          </MaskReveal>
          <MaskReveal show delay={1500} duration={1100}>
            <span className="dt-zh dt-em dt-coda-stamp-anchor">添乱。</span>
          </MaskReveal>
        </div>
        <div className="dt-coda-stamp" aria-hidden>
          <span className="dt-coda-stamp-text">net &nbsp;loss</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ToolboxLocked (step 0)
 * 一个 mono 工具栏 panel（顶部标 TOOLSET），8 个 tool slot
 * 中央覆盖一把 CSS 拼接的锁；下沿一条红色"DO NOT TOUCH"封条
 * ────────────────────────────────────────────────────────────────── */
function ToolboxLocked() {
  return (
    <div className="dt-toolbox" aria-hidden>
      <div className="dt-toolbox-frame">
        <div className="dt-toolbox-header">
          <span className="dt-toolbox-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="dt-toolbox-title">TOOLSET · session</span>
          <span className="dt-toolbox-count">8 tools loaded</span>
        </div>
        <div className="dt-toolbox-grid">
          {TOOLBOX_GLYPHS.map((g, i) => (
            <div
              key={i}
              className="dt-toolbox-slot"
              style={{ animationDelay: `${800 + i * 60}ms` }}
            >
              <ToolGlyph kind={g} />
              <span className="dt-toolbox-slot-name">tool_{String(i + 1).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dt-lock">
        <div className="dt-lock-shackle" />
        <div className="dt-lock-body">
          <div className="dt-lock-keyhole" />
        </div>
      </div>

      <div className="dt-tape">
        <span className="dt-tape-text">
          do not touch &nbsp;·&nbsp; do not touch &nbsp;·&nbsp; do not touch
        </span>
      </div>
    </div>
  );
}

const TOOLBOX_GLYPHS = [
  "shell",
  "search",
  "doc",
  "db",
  "arrow",
  "ring",
  "shell",
  "search",
] as const;

type GlyphKind = (typeof TOOLBOX_GLYPHS)[number];

/* tiny CSS-only icon glyphs (no emoji, no SVG inline) */
function ToolGlyph({ kind }: { kind: GlyphKind }) {
  return <div className={`dt-glyph dt-glyph-${kind}`} aria-hidden />;
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ToolGrid (step 1)
 * 6×5 = 30 个工具卡，仅 idx ∈ KEEP_IDX 三个保留，其它划掉
 * ────────────────────────────────────────────────────────────────── */
const KEEP_IDX = new Set([5, 16, 27]); // 3 of 33 stay

function ToolGrid() {
  const cycle: GlyphKind[] = ["shell", "search", "doc", "db", "arrow", "ring"];
  return (
    <div className="dt-grid" aria-hidden>
      {Array.from({ length: 33 }, (_, i) => {
        const kept = KEEP_IDX.has(i);
        const glyph = cycle[i % cycle.length];
        const baseDelay = 1500 + i * 70;
        return (
          <div
            key={i}
            className={`dt-grid-tool ${kept ? "is-kept" : "is-cut"}`}
            style={
              {
                "--tool-delay": `${baseDelay}ms`,
                "--cut-delay": `${baseDelay + 1400}ms`,
              } as React.CSSProperties
            }
          >
            <ToolGlyph kind={glyph} />
            <span className="dt-grid-name">
              tool_{String(i + 1).padStart(2, "0")}
            </span>
            {!kept && <span className="dt-grid-strike" />}
            {kept && <span className="dt-grid-keep-mark">KEEP</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefixBar (step 2)
 * 横向 bar 标 [system | tools | history | new msg]
 * tools 段聚光 / 框选 + 标注线指向 "在前缀里"
 * ────────────────────────────────────────────────────────────────── */
function PrefixBar() {
  return (
    <div className="dt-prefix" aria-hidden>
      <div className="dt-prefix-meta">
        <span className="dt-prefix-meta-label">cache prefix</span>
        <span className="dt-prefix-meta-rule" />
        <span className="dt-prefix-meta-arrow">▶</span>
      </div>
      <div className="dt-prefix-bar">
        <div
          className="dt-prefix-seg dt-prefix-seg-system"
          style={{ flex: "0 0 22%" }}
        >
          <span className="dt-seg-label">system</span>
          <span className="dt-seg-sub">instructions</span>
        </div>
        <div
          className="dt-prefix-seg dt-prefix-seg-tools"
          style={{ flex: "0 0 26%" }}
        >
          <span className="dt-seg-label">tools</span>
          <span className="dt-seg-sub">definitions</span>
          <span className="dt-seg-spotlight" />
          <span className="dt-seg-callout-line" />
          <span className="dt-seg-callout-text">
            ← 你以为它能随便改？<br />
            <em>它绑死在前缀里。</em>
          </span>
        </div>
        <div
          className="dt-prefix-seg dt-prefix-seg-history"
          style={{ flex: "0 0 32%" }}
        >
          <span className="dt-seg-label">history</span>
          <span className="dt-seg-sub">19 turns</span>
        </div>
        <div
          className="dt-prefix-seg dt-prefix-seg-msg"
          style={{ flex: "1" }}
        >
          <span className="dt-seg-label">new msg</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CacheChain (step 3)
 * 4 节链节 [system]-[tools]-[history]-[msg]，链环连接
 * tools 节震动 → 与 history 之间的链环断裂 → tools/history/msg
 * 三节染红 + REBUILD 戳；system 节保留 cached 灰
 * ────────────────────────────────────────────────────────────────── */
function CacheChain() {
  const links = [
    { id: "system", label: "system", note: "instructions" },
    { id: "tools", label: "tools", note: "definitions" },
    { id: "history", label: "history", note: "19 turns" },
    { id: "msg", label: "new msg", note: "this turn" },
  ];
  return (
    <div className="dt-chain" aria-hidden>
      {links.map((l, i) => (
        <div key={l.id} className={`dt-chain-link dt-chain-link-${l.id}`}>
          <div className="dt-chain-block">
            <span className="dt-chain-label">{l.label}</span>
            <span className="dt-chain-note">{l.note}</span>
            <span className="dt-chain-status">
              <span className="dt-chain-status-dot" />
              <span className="dt-chain-status-text">cached</span>
            </span>
            <span className="dt-chain-rebuild-stamp">REBUILD</span>
          </div>
          {i < links.length - 1 && (
            <div className="dt-chain-ring">
              <span className="dt-chain-ring-half dt-chain-ring-half-l" />
              <span className="dt-chain-ring-half dt-chain-ring-half-r" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CostCompare (step 3 footer)
 * 双横条对照
 *   省下的体积 ≈ 几个工具定义 (短)
 *   重建的代价 ≈ 整段对话 (长)
 * ────────────────────────────────────────────────────────────────── */
function CostCompare() {
  return (
    <div className="dt-cost" aria-hidden>
      <div className="dt-cost-row dt-cost-row-saved">
        <div className="dt-cost-label">
          <span className="dt-cost-label-cn">省下的</span>
          <span className="dt-cost-label-en">saved · few tool defs</span>
        </div>
        <div className="dt-cost-bar dt-cost-bar-saved" />
      </div>
      <div className="dt-cost-row dt-cost-row-paid">
        <div className="dt-cost-label">
          <span className="dt-cost-label-cn">付出的</span>
          <span className="dt-cost-label-en">paid · whole conversation</span>
        </div>
        <div className="dt-cost-bar dt-cost-bar-paid" />
      </div>
      <div className="dt-cost-verdict">
        代价远超 &gt;&gt; 多放几个工具占的那点空间
      </div>
    </div>
  );
}
