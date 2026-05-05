import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./DontSwitchModel.css";

/**
 * Chapter 08 · dont-switch-model — 别换模型（5 steps · ~37s）
 *
 * CSS prefix: .dm-
 * Theme tokens only. No hardcoded colors / font names.
 */
export default function DontSwitchModelChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 反直觉钩子 hero
   * 视觉演示：mono 角标"RULE · 03 · COUNTERINTUITIVE"，
   * hero 大字 mask reveal，下方三个标点节拍 ! ? ! 弹入抖动
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="dm-s0" className="dm-scene dm-scene-center">
        <div className="dm-counter">
          <div className="dm-counter-tag">
            <span className="dm-counter-tag-bracket">[</span>
            <span className="dm-counter-tag-num">RULE · 03</span>
            <span className="dm-counter-tag-sep">·</span>
            <span className="dm-counter-tag-text">COUNTERINTUITIVE</span>
            <span className="dm-counter-tag-bracket">]</span>
          </div>

          <h1 className="dm-counter-hero">
            <MaskReveal show duration={1100}>
              <span className="dm-zh">下一条，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={500} duration={1100}>
              <span className="dm-zh">对很多人来说</span>
            </MaskReveal>
            <MaskReveal show delay={950} duration={1100}>
              <span className="dm-zh dm-em">有点反直觉</span>
            </MaskReveal>
            <MaskReveal show delay={1450} duration={900}>
              <span className="dm-zh">。</span>
            </MaskReveal>
          </h1>

          <div className="dm-counter-marks" aria-hidden>
            <span className="dm-mark dm-mark-1">!</span>
            <span className="dm-mark dm-mark-2">?</span>
            <span className="dm-mark dm-mark-3">!</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 朴素直觉图
   * 视觉演示：两条路径分叉
   *   简单题 → Haiku（mono 标 + ✓ 省钱徽章）
   *   难题   → Opus
   * 副标"多合理啊。"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="dm-s1" className="dm-scene">
        <div className="dm-step-tag">
          <span className="dm-tag-dot" />
          <span className="dm-tag-text">A Naive Plan · seems reasonable</span>
        </div>

        <h2 className="dm-headline dm-headline-naive">
          <MaskReveal show duration={900}>
            <span className="dm-zh">简单题切</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="dm-en dm-em-soft">Haiku</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="dm-zh">省钱，难题切回</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={900}>
            <span className="dm-en dm-em-soft">Opus</span>
          </MaskReveal>
          <MaskReveal show delay={1350} duration={900}>
            <span className="dm-zh">。</span>
          </MaskReveal>
        </h2>

        <BranchPlan />

        <div className="dm-naive-foot">
          <MaskReveal show delay={5800} duration={700}>
            <span className="dm-zh">多合理啊。</span>
          </MaskReveal>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 真相反转
   * 视觉演示：缓存堆崩塌 —— Sonnet 缓存条带满载，model badge 切到 Opus
   *   → 所有 tile 出现红色 X 抖落，写上"INVALIDATED"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="dm-s2" className="dm-scene">
        <div className="dm-step-tag">
          <span className="dm-tag-dot" />
          <span className="dm-tag-text">The Truth · cache is model-bound</span>
        </div>

        <h2 className="dm-headline dm-headline-truth">
          <MaskReveal show duration={900}>
            <span className="dm-zh">缓存是</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="dm-zh dm-em">跟模型绑定的</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="dm-zh">。</span>
          </MaskReveal>
        </h2>

        <CacheCollapse />

        <div className="dm-truth-foot">
          <span className="dm-truth-foot-text">
            换模型 <span className="dm-truth-arrow">→</span> 之前所有缓存
            <span className="dm-em">全部作废，从头重建</span>。
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 重建代价
   * 视觉演示：两条横向 cost bar 对照
   *   REBUILD 整段缓存（满杠 + 红）
   *   DIRECT  Opus 直接答（短杠 + 中性）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="dm-s3" className="dm-scene">
        <div className="dm-step-tag">
          <span className="dm-tag-dot" />
          <span className="dm-tag-text">The Math · rebuild &gt; direct-answer</span>
        </div>

        <h2 className="dm-headline dm-headline-cost">
          <MaskReveal show duration={900}>
            <span className="dm-zh">重建成本 </span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="dm-en dm-em">&gt;</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="dm-zh"> 大模型直接答简单题成本</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={900}>
            <span className="dm-zh">。</span>
          </MaskReveal>
        </h2>

        <CostCompare />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 策略 hero
   * 视觉演示：一条粗 MAIN · Opus 模型轨道贯穿主线，
   * 中段一个 SUBTASK · Haiku 分叉（短弧线），主线无变更
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="dm-s4" className="dm-scene">
      <div className="dm-step-tag">
        <span className="dm-tag-dot" />
        <span className="dm-tag-text">The Strategy · single model end-to-end</span>
      </div>

      <h2 className="dm-headline dm-headline-strategy">
        <MaskReveal show duration={900}>
          <span className="dm-zh">主对话</span>
        </MaskReveal>
        <MaskReveal show delay={400} duration={900}>
          <span className="dm-zh dm-em">自始至终</span>
        </MaskReveal>
        <MaskReveal show delay={800} duration={900}>
          <span className="dm-zh">用同一个模型。</span>
        </MaskReveal>
      </h2>

      <MainTrack />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: BranchPlan (step 1)
 * 朴素直觉的两条路径 ——
 *   SIMPLE → Haiku（带 ✓ 省钱徽章）
 *   HARD   → Opus
 * 路径线 left→right 自绘，右侧模型 tag 弹入
 * ────────────────────────────────────────────────────────────────── */
function BranchPlan() {
  return (
    <div className="dm-branch" aria-hidden>
      {/* row 1 — SIMPLE → Haiku */}
      <div className="dm-branch-row dm-branch-row-1">
        <div className="dm-branch-source">
          <span className="dm-branch-source-tag">SIMPLE</span>
          <span className="dm-branch-source-zh">简单题</span>
        </div>
        <div className="dm-branch-line dm-branch-line-1">
          <span className="dm-branch-line-stem" />
          <span className="dm-branch-line-head">▶</span>
        </div>
        <div className="dm-branch-target dm-branch-target-1">
          <div className="dm-model-pill dm-model-pill-haiku">
            <span className="dm-model-mark">●</span>
            <span className="dm-model-name">claude-haiku</span>
          </div>
          <div className="dm-branch-badge">
            <span className="dm-branch-tick">✓</span>
            <span className="dm-branch-badge-text">省钱</span>
          </div>
        </div>
      </div>

      {/* row 2 — HARD → Opus */}
      <div className="dm-branch-row dm-branch-row-2">
        <div className="dm-branch-source">
          <span className="dm-branch-source-tag">HARD</span>
          <span className="dm-branch-source-zh">难题</span>
        </div>
        <div className="dm-branch-line dm-branch-line-2">
          <span className="dm-branch-line-stem" />
          <span className="dm-branch-line-head">▶</span>
        </div>
        <div className="dm-branch-target dm-branch-target-2">
          <div className="dm-model-pill dm-model-pill-opus">
            <span className="dm-model-mark">●</span>
            <span className="dm-model-name">claude-opus</span>
          </div>
        </div>
      </div>

      {/* mid divider — visual splitter */}
      <div className="dm-branch-divider" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CacheCollapse (step 2)
 * 一条缓存条带 + 顶部 model badge：badge 从 Sonnet 翻到 Opus，
 * 条带内所有 tile 抖落 + 红色 X 标记 + INVALIDATED 戳印
 * ────────────────────────────────────────────────────────────────── */
function CacheCollapse() {
  const tiles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="dm-collapse" aria-hidden>
      {/* model badge swap */}
      <div className="dm-collapse-binding">
        <span className="dm-collapse-binding-label">cache bound to</span>
        <div className="dm-collapse-badge">
          <div className="dm-collapse-badge-from">
            <span className="dm-model-mark" />
            <span className="dm-collapse-badge-name">claude-sonnet</span>
          </div>
          <span className="dm-collapse-badge-arrow">→</span>
          <div className="dm-collapse-badge-to">
            <span className="dm-model-mark" />
            <span className="dm-collapse-badge-name">claude-opus</span>
          </div>
        </div>
      </div>

      {/* cache strip */}
      <div className="dm-collapse-strip">
        <div className="dm-collapse-strip-label">
          <span>cache strip</span>
          <span className="dm-collapse-strip-count">12 / 12 blocks</span>
        </div>
        <div className="dm-collapse-tiles">
          {tiles.map((i) => (
            <div
              key={i}
              className="dm-collapse-tile"
              style={
                {
                  "--tile-delay": `${1700 + i * 90}ms`,
                  "--tile-fall-delay": `${4000 + i * 60}ms`,
                } as React.CSSProperties
              }
            >
              <span className="dm-collapse-tile-bar" />
              <span className="dm-collapse-tile-bar" />
              <span className="dm-collapse-tile-x" />
            </div>
          ))}
        </div>
        <div className="dm-collapse-stamp">INVALIDATED</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CostCompare (step 3)
 * 两条横向 cost bar：
 *   REBUILD（长，accent，标注 prefill 全部从头）
 *   DIRECT  （短，中性，Opus 直接回答简单题）
 * ────────────────────────────────────────────────────────────────── */
function CostCompare() {
  return (
    <div className="dm-cost" aria-hidden>
      <div className="dm-cost-row dm-cost-row-rebuild">
        <div className="dm-cost-label">
          <span className="dm-cost-label-num">A</span>
          <div className="dm-cost-label-text">
            <span className="dm-cost-label-title">REBUILD CACHE</span>
            <span className="dm-cost-label-sub">
              换模型后，前缀整段从头 prefill
            </span>
          </div>
        </div>
        <div className="dm-cost-bar">
          <div className="dm-cost-fill dm-cost-fill-rebuild" />
          <div className="dm-cost-bar-tail">
            <span className="dm-cost-bar-tag">full prefill ×N turns</span>
          </div>
        </div>
      </div>

      <div className="dm-cost-row dm-cost-row-direct">
        <div className="dm-cost-label">
          <span className="dm-cost-label-num">B</span>
          <div className="dm-cost-label-text">
            <span className="dm-cost-label-title">DIRECT ANSWER</span>
            <span className="dm-cost-label-sub">
              <span className="dm-mono">Opus</span> 直接答这道简单题
            </span>
          </div>
        </div>
        <div className="dm-cost-bar">
          <div className="dm-cost-fill dm-cost-fill-direct" />
          <div className="dm-cost-bar-tail">
            <span className="dm-cost-bar-tag">single turn</span>
          </div>
        </div>
      </div>

      <div className="dm-cost-verdict">
        <span className="dm-cost-verdict-symbol">A</span>
        <span className="dm-cost-verdict-gt">&gt;</span>
        <span className="dm-cost-verdict-symbol">B</span>
        <span className="dm-cost-verdict-text">省小钱赔大钱</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: MainTrack (step 4)
 * 一条粗主轨道 MAIN · Opus 贯穿，T1..T6 节点。
 * 中段从 T3 分叉一段细 SUBTASK · Haiku 弧线，回到主轨道继续。
 * ────────────────────────────────────────────────────────────────── */
function MainTrack() {
  const turns = [1, 2, 3, 4, 5, 6];
  return (
    <div className="dm-track" aria-hidden>
      <div className="dm-track-frame">
        {/* main track */}
        <div className="dm-track-main">
          <div className="dm-track-main-pill">
            <span className="dm-model-mark" />
            <span className="dm-track-main-name">MAIN · claude-opus</span>
          </div>
          <div className="dm-track-main-line">
            <div className="dm-track-main-fill" />
            {turns.map((t, i) => (
              <span
                key={t}
                className="dm-track-node"
                style={
                  {
                    "--node-delay": `${1300 + i * 250}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="dm-track-node-dot" />
                <span className="dm-track-node-label">T{t}</span>
              </span>
            ))}
          </div>
        </div>

        {/* subtask fork — drops down from T3, runs, returns */}
        <svg
          className="dm-track-fork"
          viewBox="0 0 1000 220"
          preserveAspectRatio="none"
        >
          <path
            className="dm-track-fork-down"
            d="M 330 0 Q 330 80 430 110"
          />
          <path
            className="dm-track-fork-mid"
            d="M 430 110 L 600 110"
          />
          <path
            className="dm-track-fork-up"
            d="M 600 110 Q 700 80 700 0"
          />
        </svg>

        <div className="dm-track-sub">
          <div className="dm-track-sub-pill">
            <span className="dm-model-mark" />
            <span className="dm-track-sub-name">SUBTASK · claude-haiku</span>
          </div>
          <span className="dm-track-sub-foot">
            独立上下文 · 独立缓存 · 不污染主对话
          </span>
        </div>
      </div>

      <div className="dm-track-foot">
        <span className="dm-track-foot-bullet" />
        <span>
          主轨道一条到底 ——
          <span className="dm-em-soft">缓存连续命中</span>
        </span>
      </div>
    </div>
  );
}
