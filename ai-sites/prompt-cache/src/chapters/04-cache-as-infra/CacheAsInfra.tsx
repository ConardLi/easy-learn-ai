import type { CSSProperties } from "react";
import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./CacheAsInfra.css";

/**
 * Chapter 04 · cache-as-infra — 缓存即基建（10 steps · ~95s）
 *
 * CSS prefix: .ci-
 * Theme tokens only. SRE / monitoring dashboard气质。
 */
export default function CacheAsInfraChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — Cache Hit Rate 作为基建级指标 / 健康 dashboard
   * 视觉演示：SRE-style 监控面板，cache hit rate 大数字 +
   * sparkline 平稳运行；旁边并列其它 infra 指标（uptime / req/s / p99）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="ci-s0" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot" />
          <span className="ci-tag-text">Infra-Level Metric</span>
        </div>

        <h2 className="ci-headline ci-headline-dash">
          <MaskReveal show duration={900}>
            <span className="ci-zh">把</span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="ci-zh ci-em">缓存命中率</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="ci-zh">，当</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1000} duration={900}>
            <span className="ci-zh ci-em-soft">基础设施级别的指标</span>
          </MaskReveal>
          <MaskReveal show delay={1400} duration={900}>
            <span className="ci-zh">在看。</span>
          </MaskReveal>
        </h2>

        <DashboardHealthy />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 命中率掉 → oncall 告警
   * 视觉演示：同样的 dashboard，cache hit rate 数字从健康 94.2% 跳到
   * 61.4%，sparkline 急转直下；右上角红色 ALERT 卡片滑入
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="ci-s1" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot ci-tag-dot-alert" />
          <span className="ci-tag-text">Hit-rate Dropped · Oncall Paged</span>
        </div>

        <h2 className="ci-headline ci-headline-alert">
          <MaskReveal show duration={900}>
            <span className="ci-zh">命中率一掉，</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ci-zh ci-em">触发值班告警。</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={900} duration={900}>
            <span className="ci-zh ci-em-soft">当线上事故处理。</span>
          </MaskReveal>
        </h2>

        <DashboardAlert />

        <div className="ci-uptime-note">
          <span className="ci-uptime-line" />
          <span className="ci-uptime-text">
            on par with{" "}
            <span className="ci-mono-em">server uptime</span> · 跟服务器在线率
            一个量级
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 术语解释卡：declare SEVs / Severity Incident
   * 视觉演示：mono 大字 "DECLARE SEVS"，下面三阶 Severity ladder
   * (SEV-3 → SEV-2 → SEV-1)，与"普通告警"做并排对比卡
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="ci-s2" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot" />
          <span className="ci-tag-text">原文 · Declare SEVs</span>
        </div>

        <h2 className="ci-headline ci-headline-sev">
          <MaskReveal show duration={900}>
            <span className="ci-zh">原文用的词是 </span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ci-en ci-em">declare SEVs</span>
          </MaskReveal>
          <MaskReveal show delay={800} duration={900}>
            <span className="ci-zh">。</span>
          </MaskReveal>
        </h2>

        <SevLadder />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 福利链：高命中率 → 省钱 → 给付费用户更宽松 rate limits
   * 视觉演示：3 节点因果链，箭头依次绘出（hit rate ↑ →
   * lower cost → looser rate limits）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="ci-s3" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot" />
          <span className="ci-tag-text">Why Anthropic Cares</span>
        </div>

        <h2 className="ci-headline ci-headline-chain">
          <MaskReveal show duration={900}>
            <span className="ci-zh">命中率高，</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="ci-zh">不光</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="ci-zh ci-em-soft">省钱</span>
          </MaskReveal>
          <MaskReveal show delay={1050} duration={900}>
            <span className="ci-zh">，还能给付费用户更宽松的</span>
          </MaskReveal>
          <MaskReveal show delay={1500} duration={900}>
            <span className="ci-en ci-em">rate limits</span>
          </MaskReveal>
          <MaskReveal show delay={1900} duration={900}>
            <span className="ci-zh">。</span>
          </MaskReveal>
        </h2>

        <BenefitChain />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 副标语 hero：命中率越高 / 同样价格 / 用得越多
   * 视觉演示：对照天平 + 一根使用量进度条逐步生长
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="ci-s4" className="ci-scene ci-scene-center">
        <div className="ci-subhero">
          <h1 className="ci-subhero-line">
            <MaskReveal show duration={1100}>
              <span className="ci-zh">命中率</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1100}>
              <span className="ci-zh ci-em">越高</span>
            </MaskReveal>
            <MaskReveal show delay={800} duration={1100}>
              <span className="ci-zh">，</span>
            </MaskReveal>
          </h1>
          <h1 className="ci-subhero-line ci-subhero-line-2">
            <MaskReveal show delay={1200} duration={1100}>
              <span className="ci-zh ci-em-soft">同样的价格下</span>
            </MaskReveal>
            <MaskReveal show delay={1600} duration={1100}>
              <span className="ci-zh">，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={2000} duration={1100}>
              <span className="ci-zh">用得</span>
            </MaskReveal>
            <MaskReveal show delay={2400} duration={1100}>
              <span className="ci-zh ci-em">越多</span>
            </MaskReveal>
            <MaskReveal show delay={2800} duration={1100}>
              <span className="ci-zh">。</span>
            </MaskReveal>
          </h1>
          <UsageBar />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 5 — 论断 hero：没有缓存，就没有 Claude Code
   * 视觉演示：上面 caveat 小字，下面金句砸下，"没有缓存"被斜体划掉，
   * "就没有 Claude Code" 同样被划掉，营造"两者绑定"的强意象
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="ci-s5" className="ci-scene ci-scene-center">
        <div className="ci-verdict">
          <div className="ci-verdict-pre">
            <MaskReveal show duration={900}>
              <span className="ci-zh ci-em-soft">不是</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="ci-zh ci-strike">锦上添花的优化</span>
            </MaskReveal>
            <MaskReveal show delay={600} duration={900}>
              <span className="ci-zh">，是</span>
            </MaskReveal>
            <MaskReveal show delay={900} duration={900}>
              <span className="ci-zh ci-em-soft">整个系统能跑起来的前提</span>
            </MaskReveal>
            <MaskReveal show delay={1200} duration={900}>
              <span className="ci-zh">。</span>
            </MaskReveal>
          </div>

          <h1 className="ci-verdict-hero">
            <MaskReveal show delay={1900} duration={1100}>
              <span className="ci-zh">没有</span>
            </MaskReveal>
            <MaskReveal show delay={2200} duration={1100}>
              <span className="ci-zh ci-em">缓存</span>
            </MaskReveal>
            <MaskReveal show delay={2500} duration={1100}>
              <span className="ci-zh">，</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={2900} duration={1100}>
              <span className="ci-zh">就没有 </span>
            </MaskReveal>
            <MaskReveal show delay={3200} duration={1100}>
              <span className="ci-en ci-em ci-verdict-cc">Claude Code</span>
            </MaskReveal>
            <MaskReveal show delay={3500} duration={1100}>
              <span className="ci-zh">。</span>
            </MaskReveal>
          </h1>

          <div className="ci-verdict-pair">
            <span className="ci-verdict-pair-cell">
              <span className="ci-verdict-pair-label">cache</span>
              <span className="ci-verdict-pair-strike" />
            </span>
            <span className="ci-verdict-pair-eq">⇒</span>
            <span className="ci-verdict-pair-cell">
              <span className="ci-verdict-pair-label">claude code</span>
              <span className="ci-verdict-pair-strike ci-verdict-pair-strike-2" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 长对话场景：会话几十轮
   * 视觉演示：垂直消息流瀑布，左右交替气泡，每条标 TURN N，
   * 一路推到 n=20+；右侧大数字 "n = 几十"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="ci-s6" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot" />
          <span className="ci-tag-text">Long Conversation · By Nature</span>
        </div>

        <h2 className="ci-headline ci-headline-long">
          <MaskReveal show duration={900}>
            <span className="ci-en ci-em">Claude Code</span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="ci-zh"> 这种 AI 编程助手，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={650} duration={900}>
            <span className="ci-zh">天然是</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="ci-zh ci-em">长对话</span>
          </MaskReveal>
          <MaskReveal show delay={1250} duration={900}>
            <span className="ci-zh">的。</span>
          </MaskReveal>
        </h2>

        <ConversationStream />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 痛苦场景：从头算 → cost / latency 爆炸
   * 视觉演示：双 hockey-stick 曲线，cost / latency 都在第 N 轮起飞
   * ──────────────────────────────────────────────────────────────── */
  if (step === 7) {
    return (
      <div key="ci-s7" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot ci-tag-dot-alert" />
          <span className="ci-tag-text">Without Cache · Cost &amp; Latency Explode</span>
        </div>

        <h2 className="ci-headline ci-headline-explode">
          <MaskReveal show duration={900}>
            <span className="ci-zh">每一轮都要把</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="ci-zh ci-em-soft">上文全带上</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="ci-zh">重发，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1100} duration={900}>
            <span className="ci-zh">每次都从头算 →</span>
          </MaskReveal>
          <MaskReveal show delay={1500} duration={900}>
            <span className="ci-zh ci-em">延迟和成本会爆炸。</span>
          </MaskReveal>
        </h2>

        <ExplodeCharts />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 8 — 概念锚 hero：前缀匹配
   * 视觉演示：两条横向请求条对齐，前缀部分高亮"复用"，尾部新差异
   * ──────────────────────────────────────────────────────────────── */
  if (step === 8) {
    return (
      <div key="ci-s8" className="ci-scene">
        <div className="ci-step-tag">
          <span className="ci-tag-dot" />
          <span className="ci-tag-text">The Core Principle</span>
        </div>

        <h1 className="ci-prefix-hero">
          <MaskReveal show duration={1100}>
            <span className="ci-zh ci-em">前缀匹配</span>
          </MaskReveal>
        </h1>
        <div className="ci-prefix-en">
          <MaskReveal show delay={500} duration={900}>
            <span className="ci-en">Prefix Matching</span>
          </MaskReveal>
        </div>
        <div className="ci-prefix-sub">
          <MaskReveal show delay={1100} duration={900}>
            <span className="ci-zh">下次请求的前缀，</span>
          </MaskReveal>
          <MaskReveal show delay={1500} duration={900}>
            <span className="ci-zh ci-em-soft">跟上次一样，就能复用之前的计算。</span>
          </MaskReveal>
        </div>

        <PrefixMatchDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 9 — 章节出口：最重要的那条经验，从这个原理长出来
   * 视觉演示：hero 大字 + 一条向下指向"下一章"的指引线 + 章节序号 04 → 05
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="ci-s9" className="ci-scene ci-scene-center">
      <div className="ci-outro">
        <div className="ci-outro-stamp">
          <span className="ci-outro-stamp-from">04 · cache-as-infra</span>
          <span className="ci-outro-stamp-arrow">→</span>
          <span className="ci-outro-stamp-to">05 · order</span>
        </div>
        <h1 className="ci-outro-hero">
          <MaskReveal show duration={1100}>
            <span className="ci-zh">最重要的那条经验，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={500} duration={1100}>
            <span className="ci-zh">就从这个</span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={1100}>
            <span className="ci-zh ci-em">原理</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={1100}>
            <span className="ci-zh ci-em-soft">长出来。</span>
          </MaskReveal>
        </h1>
        <div className="ci-outro-sprout">
          <span className="ci-outro-sprout-stem" />
          <span className="ci-outro-sprout-tip" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: DashboardHealthy (step 0)
 * 4 个监控 tile，cache hit rate 是主 tile（更大），其他三个并列：
 * uptime / req-rate / p99 latency
 * ────────────────────────────────────────────────────────────────── */
function DashboardHealthy() {
  return (
    <div className="ci-dash" aria-hidden>
      <div className="ci-dash-bar">
        <span className="ci-dash-bar-dot" />
        <span className="ci-dash-bar-text">
          anthropic / infra-metrics · live
        </span>
        <span className="ci-dash-bar-flex" />
        <span className="ci-dash-bar-text ci-dash-bar-text-mute">
          last 24h · auto-refresh
        </span>
      </div>

      <div className="ci-dash-grid">
        {/* primary tile */}
        <div className="ci-tile ci-tile-primary">
          <div className="ci-tile-label">cache hit rate</div>
          <div className="ci-tile-value">
            <span className="ci-tile-num">94.2</span>
            <span className="ci-tile-unit">%</span>
          </div>
          <Sparkline variant="healthy" />
          <div className="ci-tile-meta">
            <span className="ci-tile-meta-pill">prompt-cache</span>
            <span className="ci-tile-meta-pill">last 1h · steady</span>
          </div>
        </div>

        {/* sibling infra tiles — establish "infra-level" peer group */}
        <div className="ci-tile">
          <div className="ci-tile-label">server uptime</div>
          <div className="ci-tile-value ci-tile-value-sm">
            <span className="ci-tile-num">99.99</span>
            <span className="ci-tile-unit">%</span>
          </div>
          <div className="ci-tile-spark-mini">
            <span className="ci-mini-bar" style={{ height: "78%" }} />
            <span className="ci-mini-bar" style={{ height: "82%" }} />
            <span className="ci-mini-bar" style={{ height: "80%" }} />
            <span className="ci-mini-bar" style={{ height: "84%" }} />
            <span className="ci-mini-bar" style={{ height: "82%" }} />
            <span className="ci-mini-bar" style={{ height: "85%" }} />
            <span className="ci-mini-bar" style={{ height: "83%" }} />
            <span className="ci-mini-bar" style={{ height: "84%" }} />
          </div>
        </div>

        <div className="ci-tile">
          <div className="ci-tile-label">request rate</div>
          <div className="ci-tile-value ci-tile-value-sm">
            <span className="ci-tile-num">12.4</span>
            <span className="ci-tile-unit">k/s</span>
          </div>
          <div className="ci-tile-spark-mini">
            <span className="ci-mini-bar" style={{ height: "60%" }} />
            <span className="ci-mini-bar" style={{ height: "72%" }} />
            <span className="ci-mini-bar" style={{ height: "65%" }} />
            <span className="ci-mini-bar" style={{ height: "78%" }} />
            <span className="ci-mini-bar" style={{ height: "70%" }} />
            <span className="ci-mini-bar" style={{ height: "82%" }} />
            <span className="ci-mini-bar" style={{ height: "76%" }} />
            <span className="ci-mini-bar" style={{ height: "80%" }} />
          </div>
        </div>

        <div className="ci-tile">
          <div className="ci-tile-label">p99 latency</div>
          <div className="ci-tile-value ci-tile-value-sm">
            <span className="ci-tile-num">412</span>
            <span className="ci-tile-unit">ms</span>
          </div>
          <div className="ci-tile-spark-mini">
            <span className="ci-mini-bar" style={{ height: "62%" }} />
            <span className="ci-mini-bar" style={{ height: "58%" }} />
            <span className="ci-mini-bar" style={{ height: "65%" }} />
            <span className="ci-mini-bar" style={{ height: "60%" }} />
            <span className="ci-mini-bar" style={{ height: "63%" }} />
            <span className="ci-mini-bar" style={{ height: "59%" }} />
            <span className="ci-mini-bar" style={{ height: "64%" }} />
            <span className="ci-mini-bar" style={{ height: "61%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: Sparkline — SVG line chart
 * variant 'healthy' = 平稳波动；'crash' = 平稳后 → 急转直下
 * ────────────────────────────────────────────────────────────────── */
function Sparkline({ variant }: { variant: "healthy" | "crash" }) {
  const healthy =
    "M 0,30 L 12,28 L 24,32 L 36,26 L 48,30 L 60,28 L 72,32 L 84,29 L 96,30 L 108,27 L 120,31 L 132,28 L 144,30 L 156,27 L 168,31 L 180,28";
  const crash =
    "M 0,30 L 12,28 L 24,30 L 36,28 L 48,32 L 60,28 L 72,30 L 84,28 L 96,32 L 108,29 L 116,30 L 124,38 L 132,52 L 140,68 L 150,82 L 162,96 L 174,108 L 180,112";
  const d = variant === "healthy" ? healthy : crash;
  return (
    <div className="ci-sparkline" data-variant={variant}>
      <svg viewBox="0 0 180 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`ci-spark-grad-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.36" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* threshold (only meaningful in crash) */}
        {variant === "crash" && (
          <line
            x1="0"
            x2="180"
            y1="60"
            y2="60"
            className="ci-spark-threshold"
          />
        )}
        {/* fill under curve */}
        <path
          className="ci-spark-fill"
          d={`${d} L 180,120 L 0,120 Z`}
          fill={`url(#ci-spark-grad-${variant})`}
        />
        <path className="ci-spark-line" d={d} fill="none" />
        {/* live cursor dot */}
        <circle
          className="ci-spark-cursor"
          cx={variant === "healthy" ? 180 : 180}
          cy={variant === "healthy" ? 28 : 112}
          r="3"
        />
      </svg>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: DashboardAlert (step 1)
 * 同一个 dashboard layout，hit rate tile 数字从健康跌到 61.4%
 * sparkline 急转直下，右上一张红色 ALERT 卡片滑入
 * ────────────────────────────────────────────────────────────────── */
function DashboardAlert() {
  return (
    <div className="ci-dash" aria-hidden>
      <div className="ci-dash-bar">
        <span className="ci-dash-bar-dot ci-dash-bar-dot-alert" />
        <span className="ci-dash-bar-text">
          anthropic / infra-metrics · <span className="ci-mono-em">DEGRADED</span>
        </span>
        <span className="ci-dash-bar-flex" />
        <span className="ci-dash-bar-text ci-dash-bar-text-alert">
          oncall paged · 02:14:07 utc
        </span>
      </div>

      <div className="ci-dash-grid">
        {/* primary — DOWN */}
        <div className="ci-tile ci-tile-primary ci-tile-bad">
          <div className="ci-tile-label ci-tile-label-bad">
            cache hit rate · <span className="ci-mono-em">DROP</span>
          </div>
          <div className="ci-tile-value">
            <span className="ci-tile-num ci-tile-num-from">94.2</span>
            <span className="ci-tile-num ci-tile-num-to">61.4</span>
            <span className="ci-tile-unit">%</span>
            <span className="ci-tile-delta">▼ −32.8 pts</span>
          </div>
          <Sparkline variant="crash" />
          <div className="ci-tile-meta">
            <span className="ci-tile-meta-pill ci-tile-meta-pill-bad">
              threshold 80% breached
            </span>
            <span className="ci-tile-meta-pill ci-tile-meta-pill-bad">
              SLO violated
            </span>
          </div>
        </div>

        {/* alert toast in place of one tile */}
        <div className="ci-tile ci-tile-alert ci-tile-span-2">
          <div className="ci-alert-head">
            <span className="ci-alert-icon">!</span>
            <span className="ci-alert-title">ONCALL · ALERT</span>
            <span className="ci-alert-time">02:14:07</span>
          </div>
          <div className="ci-alert-body">
            <span className="ci-alert-row">
              <span className="ci-alert-key">trigger</span>
              <span className="ci-alert-val">cache_hit_rate &lt; 80%</span>
            </span>
            <span className="ci-alert-row">
              <span className="ci-alert-key">action</span>
              <span className="ci-alert-val">page primary oncall</span>
            </span>
            <span className="ci-alert-row">
              <span className="ci-alert-key">severity</span>
              <span className="ci-alert-val ci-mono-em">production incident</span>
            </span>
          </div>
        </div>

        {/* sibling row that stays normal */}
        <div className="ci-tile">
          <div className="ci-tile-label">server uptime</div>
          <div className="ci-tile-value ci-tile-value-sm">
            <span className="ci-tile-num">99.99</span>
            <span className="ci-tile-unit">%</span>
          </div>
          <div className="ci-tile-spark-mini">
            {Array.from({ length: 8 }, (_, i) => (
              <span
                key={i}
                className="ci-mini-bar"
                style={{ height: `${78 + ((i * 13) % 9)}%` }}
              />
            ))}
          </div>
        </div>

        <div className="ci-tile">
          <div className="ci-tile-label">p99 latency</div>
          <div className="ci-tile-value ci-tile-value-sm ci-tile-value-warn">
            <span className="ci-tile-num">688</span>
            <span className="ci-tile-unit">ms</span>
            <span className="ci-tile-delta ci-tile-delta-warn">▲ +276 ms</span>
          </div>
          <div className="ci-tile-spark-mini">
            <span className="ci-mini-bar" style={{ height: "55%" }} />
            <span className="ci-mini-bar" style={{ height: "58%" }} />
            <span className="ci-mini-bar" style={{ height: "60%" }} />
            <span className="ci-mini-bar" style={{ height: "62%" }} />
            <span className="ci-mini-bar ci-mini-bar-warn" style={{ height: "78%" }} />
            <span className="ci-mini-bar ci-mini-bar-warn" style={{ height: "92%" }} />
            <span className="ci-mini-bar ci-mini-bar-warn" style={{ height: "100%" }} />
            <span className="ci-mini-bar ci-mini-bar-warn" style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: SevLadder (step 2)
 * 左：普通 alert（小字 mute）；右：declare SEVs 完整事故响应链
 * SEV-3 → SEV-2 → SEV-1，箭头依次绘出
 * ────────────────────────────────────────────────────────────────── */
function SevLadder() {
  const stages = [
    { code: "SEV-3", label: "minor · investigate" },
    { code: "SEV-2", label: "major · all-hands" },
    { code: "SEV-1", label: "critical · postmortem" },
  ];
  return (
    <div className="ci-sev" aria-hidden>
      {/* left — ordinary alert card */}
      <div className="ci-sev-side ci-sev-side-old">
        <div className="ci-sev-tag ci-sev-tag-old">ordinary alert</div>
        <div className="ci-sev-points">
          <span className="ci-sev-point">page someone</span>
          <span className="ci-sev-point">log it</span>
          <span className="ci-sev-point">move on</span>
        </div>
        <div className="ci-sev-foot">普通告警</div>
      </div>

      <div className="ci-sev-divider">
        <span className="ci-sev-vs">vs</span>
      </div>

      {/* right — declare SEVs with severity ladder */}
      <div className="ci-sev-side ci-sev-side-new">
        <div className="ci-sev-tag ci-sev-tag-new">declare SEVs</div>
        <div className="ci-sev-ladder">
          {stages.map((s, i) => (
            <div
              key={s.code}
              className="ci-sev-rung"
              style={
                {
                  "--rung-delay": `${1400 + i * 350}ms`,
                } as CSSProperties
              }
            >
              <span className="ci-sev-rung-code">{s.code}</span>
              <span className="ci-sev-rung-label">{s.label}</span>
              {i < stages.length - 1 && (
                <span
                  className="ci-sev-rung-arrow"
                  style={
                    {
                      "--rung-delay": `${1600 + i * 350}ms`,
                    } as CSSProperties
                  }
                >
                  ↓
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="ci-sev-foot ci-sev-foot-new">
          走完整事故响应流程 · severity incident
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: BenefitChain (step 3)
 * 三节点因果链 + 进一步把箭头分别标注 ($ saved / + headroom)
 * ────────────────────────────────────────────────────────────────── */
function BenefitChain() {
  return (
    <div className="ci-chain" aria-hidden>
      <div className="ci-chain-node ci-chain-node-1">
        <div className="ci-chain-node-tag">cause</div>
        <div className="ci-chain-node-title">cache hit rate ↑</div>
        <div className="ci-chain-node-zh">命中率高</div>
        <div className="ci-chain-node-bar">
          <span className="ci-chain-node-bar-fill" />
        </div>
      </div>

      <div className="ci-chain-arrow ci-chain-arrow-1">
        <span className="ci-chain-arrow-stem" />
        <span className="ci-chain-arrow-head">▶</span>
        <span className="ci-chain-arrow-label">省下 inference 成本</span>
      </div>

      <div className="ci-chain-node ci-chain-node-2">
        <div className="ci-chain-node-tag">also</div>
        <div className="ci-chain-node-title">lower cost</div>
        <div className="ci-chain-node-zh">推理成本下降</div>
        <div className="ci-chain-node-bar">
          <span className="ci-chain-node-bar-fill ci-chain-node-bar-fill-2" />
        </div>
      </div>

      <div className="ci-chain-arrow ci-chain-arrow-2">
        <span className="ci-chain-arrow-stem" />
        <span className="ci-chain-arrow-head">▶</span>
        <span className="ci-chain-arrow-label">赋能 paid users</span>
      </div>

      <div className="ci-chain-node ci-chain-node-3">
        <div className="ci-chain-node-tag ci-chain-node-tag-em">effect</div>
        <div className="ci-chain-node-title ci-chain-node-title-em">
          looser rate limits
        </div>
        <div className="ci-chain-node-zh">更宽松的使用额度</div>
        <div className="ci-chain-node-bar">
          <span className="ci-chain-node-bar-fill ci-chain-node-bar-fill-3" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: UsageBar (step 4)
 * 一根价格区间内的"用量进度条"，从 baseline 向右生长，
 * 伴随刻度尺标注：1× / 3× / 6× / 10× headroom
 * ────────────────────────────────────────────────────────────────── */
function UsageBar() {
  const ticks = ["1×", "3×", "6×", "10×"];
  return (
    <div className="ci-usage" aria-hidden>
      <div className="ci-usage-row">
        <div className="ci-usage-label">same price · 同样花费</div>
        <div className="ci-usage-track">
          <span className="ci-usage-fill" />
          <span className="ci-usage-marker" />
        </div>
      </div>
      <div className="ci-usage-ticks">
        {ticks.map((t, i) => (
          <span
            key={t}
            className={`ci-usage-tick ${i === ticks.length - 1 ? "is-em" : ""}`}
            style={{ left: `${(i / (ticks.length - 1)) * 100}%` }}
          >
            <span className="ci-usage-tick-mark" />
            <span className="ci-usage-tick-label">{t}</span>
          </span>
        ))}
      </div>
      <div className="ci-usage-foot">
        每多 1% 命中率 · 每个用户多用一些 token / month
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ConversationStream (step 6)
 * 一连串聊天气泡，左右交替；每条标 TURN N，用 stagger 入场
 * 最后右下角大数字 "n = 几十"
 * ────────────────────────────────────────────────────────────────── */
function ConversationStream() {
  // 12 turns is enough to imply "几十"; numbered 01..12 with mono labels
  const turns = Array.from({ length: 12 }, (_, i) => ({
    n: i + 1,
    side: i % 2 === 0 ? "user" : "assistant",
    width: 38 + ((i * 19) % 35),
  }));
  return (
    <div className="ci-stream" aria-hidden>
      <div className="ci-stream-list">
        {turns.map((t, i) => (
          <div
            key={t.n}
            className={`ci-bubble ci-bubble-${t.side}`}
            style={
              {
                "--bubble-delay": `${1400 + i * 130}ms`,
                "--bubble-width": `${t.width}%`,
              } as CSSProperties
            }
          >
            <span className="ci-bubble-label">
              TURN {String(t.n).padStart(2, "0")}
            </span>
            <span className="ci-bubble-bars">
              <span />
              <span />
              <span />
            </span>
          </div>
        ))}
        <div className="ci-bubble ci-bubble-more">
          <span className="ci-bubble-more-dots">⋮</span>
          <span className="ci-bubble-more-text">…几十轮</span>
        </div>
      </div>
      <div className="ci-stream-side">
        <div className="ci-stream-counter">
          <span className="ci-stream-counter-label">turns / session</span>
          <span className="ci-stream-counter-num">几十</span>
          <span className="ci-stream-counter-en">n &gt; 20 · routinely</span>
        </div>
        <div className="ci-stream-payload">
          <span className="ci-stream-payload-label">each request carries</span>
          <span className="ci-stream-payload-val">all prior context</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ExplodeCharts (step 7)
 * 两张并排 hockey-stick 曲线 — cost / latency
 * SVG path 用 stroke-dashoffset 动画绘出
 * ────────────────────────────────────────────────────────────────── */
function ExplodeCharts() {
  return (
    <div className="ci-explode" aria-hidden>
      <ExplodeChart label="cost / turn" unit="$" peak="0.30 → 3.00+" />
      <ExplodeChart label="time-to-first-token" unit="ms" peak="412 → 5400+" />
    </div>
  );
}

function ExplodeChart({
  label,
  unit,
  peak,
}: {
  label: string;
  unit: string;
  peak: string;
}) {
  // hockey-stick path: flat at first, then steep climb at right
  const d =
    "M 0,140 L 30,138 L 60,135 L 90,131 L 120,124 L 150,114 L 180,100 L 210,80 L 240,55 L 270,28 L 300,8";
  return (
    <div className="ci-explode-chart">
      <div className="ci-explode-chart-head">
        <span className="ci-explode-chart-label">{label}</span>
        <span className="ci-explode-chart-unit">{unit}</span>
      </div>
      <div className="ci-explode-chart-body">
        <svg viewBox="0 0 300 160" preserveAspectRatio="none">
          {/* gridlines */}
          {[0, 35, 70, 105, 140].map((y) => (
            <line
              key={y}
              x1="0"
              x2="300"
              y1={y}
              y2={y}
              className="ci-explode-grid"
            />
          ))}
          {/* fill under curve */}
          <path
            d={`${d} L 300,160 L 0,160 Z`}
            className="ci-explode-fill"
          />
          <path d={d} className="ci-explode-line" fill="none" />
          {/* turn markers on x axis */}
        </svg>
        <div className="ci-explode-axis">
          {["n=1", "n=10", "n=20", "n=30", "n=50"].map((t, i) => (
            <span key={t} style={{ left: `${(i / 4) * 100}%` }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="ci-explode-chart-foot">
        <span className="ci-explode-chart-peak">{peak}</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefixMatchDiagram (step 8)
 * 两条横向请求条，第二条的 prefix 与第一条对齐 + glow 复用，
 * 尾部新增段标 NEW
 * ────────────────────────────────────────────────────────────────── */
function PrefixMatchDiagram() {
  return (
    <div className="ci-prefix" aria-hidden>
      <div className="ci-prefix-row ci-prefix-row-1">
        <div className="ci-prefix-row-label">
          <span className="ci-prefix-row-num">REQ&nbsp;n</span>
          <span className="ci-prefix-row-text">previous</span>
        </div>
        <div className="ci-prefix-bar">
          <div className="ci-prefix-piece ci-prefix-piece-prefix">
            shared prefix
          </div>
          <div className="ci-prefix-piece ci-prefix-piece-old">tail · n</div>
        </div>
      </div>

      <div className="ci-prefix-glow" />

      <div className="ci-prefix-row ci-prefix-row-2">
        <div className="ci-prefix-row-label ci-prefix-row-label-em">
          <span className="ci-prefix-row-num">REQ&nbsp;n+1</span>
          <span className="ci-prefix-row-text">next</span>
        </div>
        <div className="ci-prefix-bar">
          <div className="ci-prefix-piece ci-prefix-piece-prefix ci-prefix-piece-prefix-hit">
            shared prefix
            <span className="ci-prefix-piece-stamp">REUSED</span>
          </div>
          <div className="ci-prefix-piece ci-prefix-piece-new">
            tail · n+1
            <span className="ci-prefix-piece-tag">NEW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
