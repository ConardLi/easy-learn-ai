import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./DontEditPrompt.css";

/**
 * Chapter 07 · dont-edit-prompt — 别动指令（4 steps · ~41s）
 *
 * CSS prefix: .de-
 * Theme tokens only. No hardcoded colors / font names.
 *
 * Beats:
 *   step 0 — 问题场景：system_prompt 里的时间戳过期了怎么办
 *   step 1 — 解法 hero：别改指令，把更新塞进下一轮消息里
 *   step 2 — 实现示意：<system-reminder> 夹带 vs system_prompt 锁死不动
 *   step 3 — 分层双卡：地基（钉死）vs 流水（任改）
 */
export default function DontEditPromptChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 问题场景：system_prompt 里嵌着时间戳，但现实已经走远了
   * 视觉演示：左边一块 "system_prompt" 卡，里面 current_time 字段固化在
   *   2024-01-01；右边一个真实时钟跳到 2026-05-05 11:30；中间一道红色
   *   "STALE / 缓存命脉" 提示线把两边的时间差标出来
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="de-s0" className="de-scene">
        <div className="de-step-tag">
          <span className="de-tag-dot" />
          <span className="de-tag-text">The Problem · Stale Info</span>
        </div>

        <h2 className="de-headline de-headline-problem">
          <MaskReveal show duration={800}>
            <span className="de-zh">那信息</span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={800}>
            <span className="de-zh de-em-soft">过时</span>
          </MaskReveal>
          <MaskReveal show delay={600} duration={800}>
            <span className="de-zh">了怎么办？</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1100} duration={800}>
            <span className="de-zh-sub">比如</span>
          </MaskReveal>
          <MaskReveal show delay={1350} duration={800}>
            <span className="de-zh-sub de-em">时间</span>
          </MaskReveal>
          <MaskReveal show delay={1600} duration={800}>
            <span className="de-zh-sub"> / </span>
          </MaskReveal>
          <MaskReveal show delay={1800} duration={800}>
            <span className="de-zh-sub de-em">文件状态</span>
          </MaskReveal>
          <MaskReveal show delay={2050} duration={800}>
            <span className="de-zh-sub">这些。</span>
          </MaskReveal>
        </h2>

        <StaleScene />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 解法 hero：别去改系统指令，把更新塞进下一轮的消息里
   * 视觉演示：一支 mono 笔靠近 "SYSTEM_PROMPT" 卡 → 卡上盖下红色
   *   "DO NOT TOUCH" 戳；下方箭头折向右侧的 "next message" 卡
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="de-s1" className="de-scene de-scene-center">
        <div className="de-solution">
          <div className="de-solution-kicker">
            <span className="de-solution-kicker-text">
              Anthropic&apos;s answer
            </span>
            <span className="de-solution-kicker-line" />
          </div>

          <h1 className="de-solution-hero">
            <MaskReveal show duration={1000}>
              <span className="de-zh-hero">别去</span>
            </MaskReveal>
            <MaskReveal show delay={400} duration={1000}>
              <span className="de-zh-hero de-em-strike">改系统指令</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={1100} duration={1000}>
              <span className="de-zh-hero">把更新</span>
            </MaskReveal>
            <MaskReveal show delay={1500} duration={1000}>
              <span className="de-zh-hero de-em">塞进</span>
            </MaskReveal>
            <MaskReveal show delay={1800} duration={1000}>
              <span className="de-zh-hero">下一轮的</span>
            </MaskReveal>
            <MaskReveal show delay={2200} duration={1000}>
              <span className="de-zh-hero de-em">消息</span>
            </MaskReveal>
            <MaskReveal show delay={2600} duration={1000}>
              <span className="de-zh-hero">里。</span>
            </MaskReveal>
          </h1>

          <ReroutingArrow />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 实现示意：<system-reminder> 夹带在用户消息里
   * 视觉演示：左侧 system_prompt 卡（顶部一把锁，整块灰化、纹丝不动）；
   *   右侧 messages 流：旧 user / assistant 消息淡灰，最新 user 消息里
   *   一段亮起来的 <system-reminder> XML 块，用 mono 字体逐行打字。
   *   底部 "system prompt UNCHANGED · cache safe" 印章。
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="de-s2" className="de-scene">
        <div className="de-step-tag">
          <span className="de-tag-dot" />
          <span className="de-tag-text">
            How · embed <code className="de-tag-code">&lt;system-reminder&gt;</code>
          </span>
        </div>

        <h2 className="de-headline de-headline-impl">
          <MaskReveal show duration={800}>
            <span className="de-zh">在下一条用户消息里附一段</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={800}>
            <span className="de-en de-em">&lt;system-reminder&gt;</span>
          </MaskReveal>
          <MaskReveal show delay={800} duration={800}>
            <span className="de-zh-sub de-em-soft"> · 系统指令纹丝不动。</span>
          </MaskReveal>
        </h2>

        <ImplDiagram />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 分层双卡：地基（system_prompt 钉死）vs 流水（messages 任改）
   * 视觉演示：上下两层卡片
   *   - 上：地基 — 重墩底色 + 锚点图标 + "钉死不动" 钉子
   *   - 下：流水 — 横向流动的水平线条 + 信息块漂过
   *   底部副标 hero："这样一分，缓存就稳了"
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="de-s3" className="de-scene">
      <div className="de-step-tag">
        <span className="de-tag-dot" />
        <span className="de-tag-text">The Split · Foundation vs Flow</span>
      </div>

      <FoundationFlow />

      <div className="de-coda">
        <span className="de-coda-rule" />
        <h2 className="de-coda-text">
          <MaskReveal show delay={2400} duration={1000}>
            <span className="de-zh">这样一分，</span>
          </MaskReveal>
          <MaskReveal show delay={2900} duration={1000}>
            <span className="de-zh de-em">缓存就稳了。</span>
          </MaskReveal>
        </h2>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: StaleScene (step 0)
 * 左侧 system_prompt 卡 — current_time 字段冻在过去
 * 右侧 wall clock — 实时时间已经走到 2026-05-05 11:30
 * 中间一道红色 staleness 缝
 * ────────────────────────────────────────────────────────────────── */
function StaleScene() {
  return (
    <div className="de-stale" aria-hidden>
      {/* 左：被冻住的 system_prompt */}
      <div className="de-stale-prompt">
        <div className="de-stale-prompt-bar">
          <span className="de-stale-prompt-label">SYSTEM_PROMPT</span>
          <span className="de-stale-prompt-meta">cached · prefix</span>
        </div>
        <pre className="de-stale-code">
          <span className="de-line de-line-dim">
            <span className="de-line-no">1</span>
            <span className="de-line-text">
              <span className="de-mono-key">role</span>
              <span className="de-mono-punct">:</span>{" "}
              <span className="de-mono-str">"system"</span>
              <span className="de-mono-punct">,</span>
            </span>
          </span>
          <span className="de-line de-line-dim">
            <span className="de-line-no">2</span>
            <span className="de-line-text">
              <span className="de-mono-key">content</span>
              <span className="de-mono-punct">:</span> {`{`}
            </span>
          </span>
          <span className="de-line de-line-dim">
            <span className="de-line-no">3</span>
            <span className="de-line-text">
              {"  "}
              <span className="de-mono-comment"># model identity ...</span>
            </span>
          </span>
          <span className="de-line de-line-stale">
            <span className="de-line-no">4</span>
            <span className="de-line-text">
              {"  "}
              <span className="de-mono-key">current_time</span>
              <span className="de-mono-punct">:</span>{" "}
              <span className="de-mono-str de-mono-str-stale">
                "2024-01-01T00:00Z"
              </span>
              <span className="de-mono-punct">,</span>
              <span className="de-stale-stamp">STALE</span>
            </span>
          </span>
          <span className="de-line de-line-dim">
            <span className="de-line-no">5</span>
            <span className="de-line-text">
              {"  "}
              <span className="de-mono-key">tools</span>
              <span className="de-mono-punct">:</span> [...]
            </span>
          </span>
          <span className="de-line de-line-dim">
            <span className="de-line-no">6</span>
            <span className="de-line-text">{`}`}</span>
          </span>
        </pre>
      </div>

      {/* 中间 staleness 缝 */}
      <div className="de-stale-gap">
        <span className="de-stale-gap-label">drift</span>
        <span className="de-stale-gap-arrow">→</span>
      </div>

      {/* 右：现实墙钟 */}
      <div className="de-stale-clock">
        <div className="de-stale-clock-tag">REAL CLOCK · NOW</div>
        <div className="de-stale-clock-time">
          <span className="de-clock-date">2026-05-05</span>
          <span className="de-clock-hms">
            <span className="de-clock-h">11</span>
            <span className="de-clock-sep">:</span>
            <span className="de-clock-m">30</span>
            <span className="de-clock-sep">:</span>
            <span className="de-clock-s">
              <span className="de-clock-s-tick">42</span>
            </span>
          </span>
        </div>
        <div className="de-stale-clock-delta">
          <span className="de-delta-num">+ 491</span>
          <span className="de-delta-unit">days drifted</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ReroutingArrow (step 1)
 * 一根从左侧 SYSTEM_PROMPT（盖了 DO NOT TOUCH 戳）出发的折弯箭头，
 * 拐到右侧 MESSAGES 框 — 视觉上"绕开"指令、走消息层
 * ────────────────────────────────────────────────────────────────── */
function ReroutingArrow() {
  return (
    <div className="de-reroute" aria-hidden>
      <div className="de-reroute-card de-reroute-card-locked">
        <span className="de-reroute-icon">⊘</span>
        <div>
          <div className="de-reroute-card-tag">SYSTEM_PROMPT</div>
          <div className="de-reroute-card-sub">do not touch</div>
        </div>
      </div>

      <svg
        className="de-reroute-svg"
        viewBox="0 0 600 80"
        preserveAspectRatio="none"
      >
        <path
          d="M 4 40 L 220 40 L 280 12 L 380 12 L 596 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="de-reroute-path"
        />
        <polygon
          points="596,40 584,34 584,46"
          fill="currentColor"
          className="de-reroute-arrow"
        />
      </svg>

      <div className="de-reroute-card de-reroute-card-flow">
        <span className="de-reroute-icon de-reroute-icon-flow">»</span>
        <div>
          <div className="de-reroute-card-tag">NEXT MESSAGE</div>
          <div className="de-reroute-card-sub">stash the update here</div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ImplDiagram (step 2)
 * 左侧 system_prompt：上锁、整块灰、有锁图标、"UNCHANGED" 印章
 * 右侧 messages：上下流式排列；最新 user message 内嵌一段被高亮的
 *   <system-reminder> XML，逐行打字
 * ────────────────────────────────────────────────────────────────── */
function ImplDiagram() {
  return (
    <div className="de-impl" aria-hidden>
      {/* 左：锁死的 system_prompt */}
      <div className="de-impl-system">
        <div className="de-impl-system-bar">
          <span className="de-impl-lock">⌷</span>
          <span className="de-impl-system-tag">SYSTEM_PROMPT</span>
          <span className="de-impl-system-meta">untouched</span>
        </div>
        <div className="de-impl-system-body">
          <div className="de-system-line de-system-line-1" />
          <div className="de-system-line de-system-line-2" />
          <div className="de-system-line de-system-line-3" />
          <div className="de-system-line de-system-line-4" />
          <div className="de-system-line de-system-line-5" />
          <div className="de-system-line de-system-line-6" />
        </div>
        <div className="de-impl-stamp">UNCHANGED · cache safe</div>
      </div>

      {/* 右：流动的 messages */}
      <div className="de-impl-messages">
        <div className="de-impl-msg-bar">
          <span className="de-impl-msg-tag">MESSAGES</span>
          <span className="de-impl-msg-meta">free to mutate</span>
        </div>

        <div className="de-msg de-msg-old de-msg-old-1">
          <span className="de-msg-role">user</span>
          <span className="de-msg-bar de-msg-bar-1" />
        </div>
        <div className="de-msg de-msg-old de-msg-old-2">
          <span className="de-msg-role">assistant</span>
          <span className="de-msg-bar de-msg-bar-2" />
        </div>
        <div className="de-msg de-msg-old de-msg-old-3">
          <span className="de-msg-role">user</span>
          <span className="de-msg-bar de-msg-bar-3" />
        </div>

        {/* 新的、夹带 system-reminder 的 user message */}
        <div className="de-msg de-msg-new">
          <span className="de-msg-role de-msg-role-new">user</span>
          <div className="de-msg-new-body">
            <pre className="de-reminder">
              <span className="de-reminder-line de-reminder-line-1">
                <span className="de-mono-tag">&lt;system-reminder&gt;</span>
              </span>
              <span className="de-reminder-line de-reminder-line-2">
                {"  "}
                <span className="de-mono-key">current_time</span>
                <span className="de-mono-punct">:</span>{" "}
                <span className="de-mono-str">2026-05-05 11:30</span>
              </span>
              <span className="de-reminder-line de-reminder-line-3">
                {"  "}
                <span className="de-mono-key">file_status</span>
                <span className="de-mono-punct">:</span>{" "}
                <span className="de-mono-str">3 modified · 1 staged</span>
              </span>
              <span className="de-reminder-line de-reminder-line-4">
                <span className="de-mono-tag">&lt;/system-reminder&gt;</span>
              </span>
              <span className="de-reminder-line de-reminder-line-5">
                Refactor the auth module please.
              </span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: FoundationFlow (step 3)
 * 上层：地基 — 厚重水泥块 + 锚点 + 钉子，"system_prompt = FOUNDATION"
 * 下层：流水 — 横向流动的水平线条 + 漂过的信息块，"messages = FLOW"
 * ────────────────────────────────────────────────────────────────── */
function FoundationFlow() {
  return (
    <div className="de-fnd" aria-hidden>
      {/* 地基 */}
      <div className="de-fnd-foundation">
        <div className="de-fnd-foundation-row">
          <div className="de-fnd-foundation-meta">
            <div className="de-fnd-tag">SYSTEM_PROMPT</div>
            <div className="de-fnd-name">
              <span className="de-zh">地基</span>
              <span className="de-fnd-name-en">FOUNDATION</span>
            </div>
            <div className="de-fnd-rule-mono">pinned · do not edit</div>
          </div>

          <div className="de-fnd-foundation-block">
            {/* 钉子 */}
            <span className="de-fnd-pin de-fnd-pin-1" />
            <span className="de-fnd-pin de-fnd-pin-2" />
            <span className="de-fnd-pin de-fnd-pin-3" />
            <span className="de-fnd-pin de-fnd-pin-4" />
            {/* 水泥纹理 */}
            <span className="de-fnd-stripe de-fnd-stripe-1" />
            <span className="de-fnd-stripe de-fnd-stripe-2" />
            <span className="de-fnd-stripe de-fnd-stripe-3" />
            <span className="de-fnd-stripe de-fnd-stripe-4" />
            <span className="de-fnd-stripe de-fnd-stripe-5" />
            <svg
              className="de-fnd-anchor"
              viewBox="0 0 64 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="32" cy="10" r="6" />
              <line x1="32" y1="16" x2="32" y2="64" />
              <line x1="20" y1="28" x2="44" y2="28" />
              <path d="M 6 50 Q 6 70 32 70 Q 58 70 58 50" />
              <line x1="6" y1="50" x2="14" y2="44" />
              <line x1="6" y1="50" x2="2" y2="42" />
              <line x1="58" y1="50" x2="50" y2="44" />
              <line x1="58" y1="50" x2="62" y2="42" />
            </svg>
          </div>
        </div>
      </div>

      {/* 流水 */}
      <div className="de-fnd-flow">
        <div className="de-fnd-flow-row">
          <div className="de-fnd-flow-meta">
            <div className="de-fnd-tag de-fnd-tag-flow">MESSAGES</div>
            <div className="de-fnd-name">
              <span className="de-zh">流水</span>
              <span className="de-fnd-name-en">FLOW</span>
            </div>
            <div className="de-fnd-rule-mono">free to mutate</div>
          </div>

          <div className="de-fnd-flow-block">
            <div className="de-flow-current de-flow-current-1" />
            <div className="de-flow-current de-flow-current-2" />
            <div className="de-flow-current de-flow-current-3" />
            <div className="de-flow-pkt de-flow-pkt-1">user</div>
            <div className="de-flow-pkt de-flow-pkt-2">assistant</div>
            <div className="de-flow-pkt de-flow-pkt-3">user · reminder</div>
            <div className="de-flow-pkt de-flow-pkt-4">assistant</div>
          </div>
        </div>
      </div>
    </div>
  );
}
