import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./SubAgent.css";

/**
 * Chapter 09 · sub-agent — 子任务 + 账号警告（8 steps · ~75s）
 *
 * CSS prefix: .sa-
 * Theme tokens only. No hardcoded colors / font names.
 */
export default function SubAgentChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 桥梁问题：那需要小模型干活的时候怎么办？派子任务
   * 视觉：上半部问句灰化作为问题；下半部给出答案 hero "派子任务"
   * 配一个简单的"分叉"几何符号
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="sa-s0" className="sa-scene sa-scene-center">
        <div className="sa-bridge">
          <div className="sa-bridge-question">
            <MaskReveal show duration={900}>
              <span className="sa-zh">那需要</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={900}>
              <span className="sa-zh sa-em-soft">小模型</span>
            </MaskReveal>
            <MaskReveal show delay={600} duration={900}>
              <span className="sa-zh">干活的时候怎么办？</span>
            </MaskReveal>
          </div>
          <ForkGlyph />
          <div className="sa-bridge-answer">
            <MaskReveal show delay={1500} duration={1100}>
              <span className="sa-zh sa-em">派子任务。</span>
            </MaskReveal>
          </div>
          <div className="sa-bridge-en">
            <MaskReveal show delay={2100} duration={900}>
              <span className="sa-en">— delegate to a sub-agent.</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 子任务拓扑：主对话 + 独立分叉，两套缓存互不污染
   * 视觉：SVG 节点图。主对话一条横线 5 节点，从中段分叉出 3 节点子任务线
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="sa-s1" className="sa-scene">
        <div className="sa-step-tag">
          <span className="sa-tag-dot" />
          <span className="sa-tag-text">Independent Cache Lanes</span>
        </div>

        <h2 className="sa-headline sa-headline-topo">
          <MaskReveal show duration={900}>
            <span className="sa-zh">子任务有自己</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="sa-zh sa-em">独立的上下文和缓存</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="sa-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1050} duration={900}>
            <span className="sa-zh sa-em-soft">不污染主对话的缓存链。</span>
          </MaskReveal>
        </h2>

        <TopologyDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 任务交接流程：浓缩 → 传给子任务 → 只回结果
   * 视觉：三段流程框 + hand-off message 卡片在中间发出
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="sa-s2" className="sa-scene">
        <div className="sa-step-tag">
          <span className="sa-tag-dot" />
          <span className="sa-tag-text">Hand-off · how it works</span>
        </div>

        <h2 className="sa-headline sa-headline-handoff">
          <MaskReveal show duration={900}>
            <span className="sa-zh">主模型先写</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="sa-zh sa-em">"任务交接说明"</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="sa-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1050} duration={900}>
            <span className="sa-zh">把上下文</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={900}>
            <span className="sa-zh sa-em-soft">浓缩</span>
          </MaskReveal>
          <MaskReveal show delay={1550} duration={900}>
            <span className="sa-zh">好再发出去。</span>
          </MaskReveal>
        </h2>

        <HandoffFlow />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 真实案例：Claude Code 的 Explore agents
   * 视觉：案例徽章卡 + 三条特征 pill（Haiku / 独立上下文 / spawn-from-main）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="sa-s3" className="sa-scene">
        <div className="sa-step-tag">
          <span className="sa-tag-dot" />
          <span className="sa-tag-text">In the wild · Claude Code</span>
        </div>

        <h2 className="sa-headline sa-headline-case">
          <MaskReveal show duration={900}>
            <span className="sa-zh">Claude Code 的</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="sa-en sa-em">Explore agents</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={800} duration={900}>
            <span className="sa-zh sa-em-soft">就是这样跑的。</span>
          </MaskReveal>
        </h2>

        <ExploreCaseCard />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 实习生比喻：两台机器对比 + 任务说明纸条飞过去
   * 视觉：左边大主机（你的工位）右边小主机（实习生），中间纸条飞过去
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="sa-s4" className="sa-scene">
        <div className="sa-step-tag">
          <span className="sa-tag-dot" />
          <span className="sa-tag-text">An Analogy · The Intern</span>
        </div>

        <h2 className="sa-headline sa-headline-intern">
          <MaskReveal show duration={900}>
            <span className="sa-zh">你不会让</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="sa-zh sa-em-soft">实习生</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="sa-zh">坐到你工位上</span>
          </MaskReveal>
          <MaskReveal show delay={1100} duration={900}>
            <span className="sa-zh sa-em">用你的电脑。</span>
          </MaskReveal>
        </h2>

        <InternAnalogy />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 5 — 警告 hero：缓存是按账号隔离的
   * 视觉：账号锁图标 + hero 大字
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="sa-s5" className="sa-scene sa-scene-center">
        <div className="sa-warn-hero">
          <div className="sa-warn-kicker">
            <span className="sa-warn-bar" />
            <span className="sa-warn-kicker-text">
              Heads up · for the resellers
            </span>
            <span className="sa-warn-bar" />
          </div>
          <AccountLockIcon />
          <h1 className="sa-warn-title">
            <MaskReveal show delay={500} duration={1100}>
              <span className="sa-zh">缓存是按</span>
            </MaskReveal>
            <MaskReveal show delay={950} duration={1100}>
              <span className="sa-zh sa-em">账号</span>
            </MaskReveal>
            <MaskReveal show delay={1300} duration={1100}>
              <span className="sa-zh sa-em">隔离</span>
            </MaskReveal>
            <MaskReveal show delay={1700} duration={1100}>
              <span className="sa-zh">的。</span>
            </MaskReveal>
          </h1>
          <div className="sa-warn-en">
            <MaskReveal show delay={2300} duration={900}>
              <span className="sa-en">— cache is per-account.</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 反例：账号池中转 → 命中率掉 → 没赚到反而丢号
   * 视觉：6 个账号头像 + 红 X 划掉；右侧命中率仪表暴跌
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="sa-s6" className="sa-scene">
        <div className="sa-step-tag sa-step-tag-bad">
          <span className="sa-tag-dot sa-tag-dot-bad" />
          <span className="sa-tag-text">Anti-pattern · account pool</span>
        </div>

        <h2 className="sa-headline sa-headline-pool">
          <MaskReveal show duration={900}>
            <span className="sa-zh">用</span>
          </MaskReveal>
          <MaskReveal show delay={250} duration={900}>
            <span className="sa-en sa-em-soft">account pool</span>
          </MaskReveal>
          <MaskReveal show delay={600} duration={900}>
            <span className="sa-zh">搞中转 →</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="sa-zh sa-em">命中率掉</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={900}>
            <span className="sa-zh">→</span>
          </MaskReveal>
          <MaskReveal show delay={1550} duration={900}>
            <span className="sa-zh sa-em-soft">钱没赚到，号没了。</span>
          </MaskReveal>
        </h2>

        <AccountPoolFailure />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 提醒：cc switch 别聊两句就来回切
   * 视觉：终端 mock 显示快速账号切换 + 警告
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="sa-s7" className="sa-scene sa-scene-center">
      <div className="sa-cc">
        <div className="sa-cc-kicker">
          <span className="sa-tag-dot" />
          <span className="sa-tag-text">And one more for the switchers</span>
        </div>
        <CcSwitchTerminal />
        <div className="sa-cc-foot">
          <MaskReveal show delay={2500} duration={900}>
            <span className="sa-zh sa-em">别聊两句就来回切。</span>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ForkGlyph (step 0)
 * 一根线分叉成两根 — 主线 + 子线
 * ────────────────────────────────────────────────────────────────── */
function ForkGlyph() {
  return (
    <svg
      className="sa-fork-glyph"
      viewBox="0 0 220 80"
      aria-hidden
    >
      <path
        className="sa-fork-trunk"
        d="M 10 40 L 100 40"
        fill="none"
      />
      <path
        className="sa-fork-main"
        d="M 100 40 L 210 40"
        fill="none"
      />
      <path
        className="sa-fork-sub"
        d="M 100 40 Q 130 40 145 25 L 200 12"
        fill="none"
      />
      <circle className="sa-fork-knot" cx="100" cy="40" r="5" />
      <circle className="sa-fork-end-main" cx="210" cy="40" r="3.5" />
      <circle className="sa-fork-end-sub" cx="200" cy="12" r="3.5" />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: TopologyDiagram (step 1)
 * SVG: 主对话一条线（5 节点）+ 从中段分叉出独立子线（3 节点）
 * 主线标 "main · cache lane A"，子线标 "sub · cache lane B"
 * ────────────────────────────────────────────────────────────────── */
function TopologyDiagram() {
  const mainNodes = [120, 280, 440, 600, 760, 920, 1080];
  const subNodes = [600, 760, 920];
  return (
    <svg
      className="sa-topo"
      viewBox="0 0 1200 360"
      aria-hidden
    >
      {/* main lane track */}
      <line
        className="sa-topo-track sa-topo-track-main"
        x1="80"
        y1="200"
        x2="1130"
        y2="200"
      />
      {/* sub lane track */}
      <path
        className="sa-topo-track sa-topo-track-sub"
        d="M 600 200 Q 600 90 760 90 L 970 90"
        fill="none"
      />

      {/* main nodes */}
      {mainNodes.map((x, i) => (
        <g key={`m-${i}`} className="sa-topo-node sa-topo-node-main">
          <circle
            cx={x}
            cy={200}
            r={i === 3 ? 14 : 10}
            style={{ animationDelay: `${1500 + i * 90}ms` }}
          />
        </g>
      ))}

      {/* sub nodes */}
      {subNodes.map((x, i) => (
        <g key={`s-${i}`} className="sa-topo-node sa-topo-node-sub">
          <circle
            cx={x}
            cy={90}
            r={9}
            style={{ animationDelay: `${2700 + i * 110}ms` }}
          />
        </g>
      ))}

      {/* fork joint */}
      <circle
        className="sa-topo-fork-joint"
        cx="600"
        cy="200"
        r="16"
      />

      {/* lane labels */}
      <g className="sa-topo-label sa-topo-label-main">
        <text x="80" y="270">
          main conversation
        </text>
        <text x="80" y="296" className="sa-topo-label-sub-text">
          cache lane · A
        </text>
      </g>
      <g className="sa-topo-label sa-topo-label-sub">
        <text x="970" y="60">
          sub-agent
        </text>
        <text x="970" y="34" className="sa-topo-label-sub-text">
          cache lane · B
        </text>
      </g>

      {/* divider hint */}
      <line
        className="sa-topo-isolator"
        x1="80"
        y1="148"
        x2="1130"
        y2="148"
      />
      <text className="sa-topo-isolator-text" x="595" y="144">
        independent ←→ no cache pollution
      </text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: HandoffFlow (step 2)
 * [MAIN MODEL] → [hand-off message] → [SUB-AGENT] ── result ──→ MAIN
 * ────────────────────────────────────────────────────────────────── */
function HandoffFlow() {
  return (
    <div className="sa-handoff" aria-hidden>
      <div className="sa-handoff-row">
        <div className="sa-handoff-box sa-handoff-main">
          <div className="sa-handoff-tag">MAIN MODEL</div>
          <div className="sa-handoff-name">Sonnet · Opus</div>
          <div className="sa-handoff-context">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="sa-handoff-context-label">long context</div>
        </div>

        <div className="sa-handoff-arrow sa-handoff-arrow-1">
          <svg viewBox="0 0 220 60" aria-hidden>
            <path
              className="sa-handoff-arrow-line"
              d="M 0 30 L 200 30"
              fill="none"
            />
            <path
              className="sa-handoff-arrow-head"
              d="M 200 30 L 188 22 L 188 38 Z"
            />
          </svg>
          <div className="sa-handoff-message">
            <div className="sa-handoff-msg-tag">hand-off message</div>
            <div className="sa-handoff-msg-line" />
            <div className="sa-handoff-msg-line" />
            <div className="sa-handoff-msg-line" />
            <div className="sa-handoff-msg-foot">condensed · prefix-aligned</div>
          </div>
        </div>

        <div className="sa-handoff-box sa-handoff-sub">
          <div className="sa-handoff-tag sa-handoff-tag-sub">SUB-AGENT</div>
          <div className="sa-handoff-name">Haiku · independent ctx</div>
          <div className="sa-handoff-context sa-handoff-context-small">
            <span />
            <span />
            <span />
          </div>
          <div className="sa-handoff-context-label">fresh context</div>
        </div>
      </div>

      <div className="sa-handoff-return">
        <svg viewBox="0 0 1200 40" aria-hidden preserveAspectRatio="none">
          <path
            className="sa-handoff-return-line"
            d="M 1100 20 L 1100 35 L 200 35 L 200 20"
            fill="none"
          />
          <path
            className="sa-handoff-arrow-head sa-handoff-return-head"
            d="M 200 20 L 192 28 L 208 28 Z"
          />
        </svg>
        <div className="sa-handoff-return-label">
          result only · 不带回中间过程
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ExploreCaseCard (step 3)
 * Claude Code 案例卡 + 三条特征 pill
 * ────────────────────────────────────────────────────────────────── */
function ExploreCaseCard() {
  return (
    <div className="sa-case" aria-hidden>
      <div className="sa-case-card">
        <div className="sa-case-header">
          <div className="sa-case-product">
            <span className="sa-case-product-mark" />
            <span className="sa-case-product-name">Claude Code</span>
            <span className="sa-case-product-meta">/ exploration tool</span>
          </div>
          <div className="sa-case-feature">
            <span className="sa-case-feature-en">Explore agents</span>
            <span className="sa-case-feature-cn">探索模式</span>
          </div>
        </div>

        <div className="sa-case-body">
          <div className="sa-case-pill" style={{ animationDelay: "1700ms" }}>
            <div className="sa-case-pill-key">model</div>
            <div className="sa-case-pill-val">
              <code>Haiku</code>
              <span className="sa-case-pill-sub">小模型 · 便宜快</span>
            </div>
          </div>
          <div className="sa-case-pill" style={{ animationDelay: "2050ms" }}>
            <div className="sa-case-pill-key">context</div>
            <div className="sa-case-pill-val">
              <code>independent</code>
              <span className="sa-case-pill-sub">独立上下文 · 不污染主对话</span>
            </div>
          </div>
          <div className="sa-case-pill" style={{ animationDelay: "2400ms" }}>
            <div className="sa-case-pill-key">job</div>
            <div className="sa-case-pill-val">
              <code>探索 / 翻代码 / 摘要</code>
              <span className="sa-case-pill-sub">做完只回结果</span>
            </div>
          </div>
        </div>

        <div className="sa-case-foot">
          <span className="sa-case-foot-arrow">↳</span>
          spawn-from-main · result-only return
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: InternAnalogy (step 4)
 * 两台机器对比：
 *   左：你的机器（高规格）
 *   右：实习生的机器（独立）
 * 中间：任务说明纸条飞过去
 * ────────────────────────────────────────────────────────────────── */
function InternAnalogy() {
  return (
    <div className="sa-intern" aria-hidden>
      {/* left: your machine */}
      <div className="sa-machine sa-machine-yours">
        <div className="sa-machine-tag">YOUR DESK</div>
        <div className="sa-machine-frame">
          <div className="sa-machine-screen">
            <div className="sa-machine-head">
              <span className="sa-machine-dot" />
              <span className="sa-machine-dot" />
              <span className="sa-machine-dot" />
              <span className="sa-machine-title">main · long context</span>
            </div>
            <div className="sa-machine-body">
              <div className="sa-machine-line sa-machine-line-w-90" />
              <div className="sa-machine-line sa-machine-line-w-70" />
              <div className="sa-machine-line sa-machine-line-w-80" />
              <div className="sa-machine-line sa-machine-line-w-60" />
              <div className="sa-machine-line sa-machine-line-w-90" />
              <div className="sa-machine-line sa-machine-line-w-50" />
            </div>
            <div className="sa-machine-foot">
              <span className="sa-machine-cache">cache · A</span>
            </div>
          </div>
          <div className="sa-machine-base" />
        </div>
        <div className="sa-machine-label">你的电脑 · 主对话</div>
      </div>

      {/* note flying across */}
      <div className="sa-note-track">
        <div className="sa-note">
          <div className="sa-note-tag">task spec</div>
          <div className="sa-note-line" />
          <div className="sa-note-line sa-note-line-short" />
          <div className="sa-note-line" />
          <div className="sa-note-stamp">hand-off</div>
        </div>
      </div>

      {/* right: intern's machine */}
      <div className="sa-machine sa-machine-intern">
        <div className="sa-machine-tag sa-machine-tag-intern">INTERN'S DESK</div>
        <div className="sa-machine-frame sa-machine-frame-small">
          <div className="sa-machine-screen sa-machine-screen-small">
            <div className="sa-machine-head">
              <span className="sa-machine-dot" />
              <span className="sa-machine-dot" />
              <span className="sa-machine-dot" />
              <span className="sa-machine-title">sub · fresh ctx</span>
            </div>
            <div className="sa-machine-body">
              <div className="sa-machine-line sa-machine-line-w-90" />
              <div className="sa-machine-line sa-machine-line-w-70" />
              <div className="sa-machine-line sa-machine-line-w-50" />
            </div>
            <div className="sa-machine-foot">
              <span className="sa-machine-cache sa-machine-cache-b">cache · B</span>
            </div>
          </div>
          <div className="sa-machine-base sa-machine-base-small" />
        </div>
        <div className="sa-machine-label">独立的机器 · 子任务</div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: AccountLockIcon (step 5)
 * 一个 SVG 账号头像被锁包围
 * ────────────────────────────────────────────────────────────────── */
function AccountLockIcon() {
  return (
    <svg
      className="sa-acct-lock"
      viewBox="0 0 220 220"
      aria-hidden
    >
      {/* outer dashed ring */}
      <circle
        className="sa-acct-lock-ring"
        cx="110"
        cy="110"
        r="100"
      />
      {/* account silhouette */}
      <circle
        className="sa-acct-lock-head"
        cx="110"
        cy="92"
        r="26"
      />
      <path
        className="sa-acct-lock-body"
        d="M 60 158 C 60 132 84 120 110 120 C 136 120 160 132 160 158 L 160 168 L 60 168 Z"
      />
      {/* lock body */}
      <rect
        className="sa-acct-lock-box"
        x="148"
        y="124"
        width="48"
        height="40"
        rx="2"
      />
      <path
        className="sa-acct-lock-shackle"
        d="M 156 124 L 156 114 Q 156 100 172 100 Q 188 100 188 114 L 188 124"
        fill="none"
      />
      <circle
        className="sa-acct-lock-keyhole"
        cx="172"
        cy="142"
        r="4"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: AccountPoolFailure (step 6)
 * 6 个账号头像 → 一个个被红 X 划掉；右侧 hit-rate 仪表暴跌
 * ────────────────────────────────────────────────────────────────── */
function AccountPoolFailure() {
  const accts = [
    "acct-001",
    "acct-002",
    "acct-003",
    "acct-004",
    "acct-005",
    "acct-006",
  ];
  return (
    <div className="sa-pool" aria-hidden>
      <div className="sa-pool-grid">
        <div className="sa-pool-grid-tag">account pool · 6 accts mixed</div>
        <div className="sa-pool-grid-cells">
          {accts.map((a, i) => (
            <div
              key={a}
              className="sa-pool-cell"
              style={
                {
                  "--cell-delay": `${2200 + i * 220}ms`,
                } as React.CSSProperties
              }
            >
              <div className="sa-pool-avatar">
                <svg viewBox="0 0 60 60" aria-hidden>
                  <circle
                    className="sa-pool-avatar-head"
                    cx="30"
                    cy="22"
                    r="9"
                  />
                  <path
                    className="sa-pool-avatar-body"
                    d="M 12 50 C 12 38 22 32 30 32 C 38 32 48 38 48 50 Z"
                  />
                </svg>
              </div>
              <div className="sa-pool-id">{a}</div>
              <div className="sa-pool-cross">
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sa-pool-meter">
        <div className="sa-pool-meter-tag">hit rate</div>
        <div className="sa-pool-meter-track">
          <div className="sa-pool-meter-fill" />
          <div className="sa-pool-meter-marker">
            <span className="sa-pool-meter-marker-num">0%</span>
            <span className="sa-pool-meter-marker-tail">↓ collapse</span>
          </div>
        </div>
        <div className="sa-pool-meter-foot">
          <span className="sa-pool-meter-foot-icon" />
          号没了 · 钱没赚到
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CcSwitchTerminal (step 7)
 * 终端模拟一连串 cc switch 操作 + 警告盖章
 * ────────────────────────────────────────────────────────────────── */
function CcSwitchTerminal() {
  const lines: { delay: number; text: string; cls?: string }[] = [
    { delay: 200, text: "$ cc switch acct-A", cls: "sa-cc-cmd" },
    { delay: 600, text: "  ↳ chatting · 2 turns", cls: "sa-cc-trace" },
    { delay: 950, text: "$ cc switch acct-B", cls: "sa-cc-cmd" },
    { delay: 1300, text: "  ↳ chatting · 1 turn", cls: "sa-cc-trace" },
    { delay: 1600, text: "$ cc switch acct-A", cls: "sa-cc-cmd" },
    {
      delay: 1900,
      text: "  ↳ cache miss · cold start",
      cls: "sa-cc-warn",
    },
    { delay: 2200, text: "$ cc switch acct-C", cls: "sa-cc-cmd" },
    {
      delay: 2500,
      text: "  ↳ cache miss · cold start",
      cls: "sa-cc-warn",
    },
  ];
  return (
    <div className="sa-cc-term" aria-hidden>
      <div className="sa-cc-term-head">
        <span className="sa-machine-dot" />
        <span className="sa-machine-dot" />
        <span className="sa-machine-dot" />
        <span className="sa-cc-term-title">~/.cc/profile</span>
      </div>
      <div className="sa-cc-term-body">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`sa-cc-line ${l.cls ?? ""}`}
            style={{ animationDelay: `${l.delay}ms` }}
          >
            <span className="sa-cc-line-text">{l.text}</span>
          </div>
        ))}
        <div className="sa-cc-stamp">DON'T</div>
      </div>
    </div>
  );
}
