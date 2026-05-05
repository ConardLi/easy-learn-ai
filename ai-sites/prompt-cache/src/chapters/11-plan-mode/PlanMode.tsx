import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./PlanMode.css";

/**
 * Chapter 11 · plan-mode — 规划模式（9 steps · ~85s）
 *
 * CSS prefix: .pm-
 * Theme tokens only. No hardcoded hex / rgb / font names.
 *
 * The soul of this chapter is step 6 (System Prompt vs System Message
 * concept cards) — the visual must make POSITION different at a glance:
 *   • System Prompt sits inside the cached prefix bar (locked, static)
 *   • System Message sits as a bubble in the flowing conversation
 */
export default function PlanModeChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 概念卡: Plan Mode = 模型只思考、不执行
   * 视觉演示: 暂停图标 + 思考气泡 + 双语 hero 标题
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="pm-s0" className="pm-scene pm-scene-center">
        <div className="pm-step-tag">
          <span className="pm-tag-dot" />
          <span className="pm-tag-text">Lesson 06 · Plan Mode</span>
        </div>

        <div className="pm-concept">
          <div className="pm-concept-icons">
            <PauseIcon />
            <ThinkBubble />
          </div>

          <h1 className="pm-concept-hero">
            <MaskReveal show duration={1100}>
              <span className="pm-zh">规划</span>
            </MaskReveal>
            <MaskReveal show delay={380} duration={1100}>
              <span className="pm-zh pm-em">模式</span>
            </MaskReveal>
          </h1>
          <div className="pm-concept-en">
            <MaskReveal show delay={900} duration={900}>
              <span className="pm-en">Plan Mode</span>
            </MaskReveal>
          </div>

          <div className="pm-concept-rule" />

          <div className="pm-concept-sub">
            <MaskReveal show delay={1500} duration={900}>
              <span className="pm-zh pm-em-soft">只思考、只规划。</span>
            </MaskReveal>
            <MaskReveal show delay={1900} duration={900}>
              <span className="pm-zh">不执行任何操作。</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 反直觉做法: 进入移走 / 退出加回 → 破坏缓存
   * 视觉演示: 工具托盘里的工具被一个个移走（fade + 红 X 戳），
   *           再 fade 回来；底部红字 "破坏缓存"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="pm-s1" className="pm-scene">
        <div className="pm-step-tag">
          <span className="pm-tag-dot pm-tag-dot-warn" />
          <span className="pm-tag-text">The Naïve Approach</span>
        </div>

        <h2 className="pm-headline pm-headline-naive">
          <MaskReveal show duration={900}>
            <span className="pm-zh">按直觉，</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pm-zh">进规划就</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="pm-zh pm-em-soft">把执行工具移走</span>
          </MaskReveal>
          <MaskReveal show delay={1000} duration={900}>
            <span className="pm-zh">，退出再加回来。</span>
          </MaskReveal>
        </h2>

        <NaiveToolFlow />

        <div className="pm-naive-foot">
          <div className="pm-anti-tag">
            <span className="pm-anti-cross">✗</span>
            <span className="pm-anti-text">破坏缓存 · prefix 变了</span>
          </div>
          <div className="pm-anti-aside">
            <span className="pm-aside-line" />
            <span className="pm-aside-text">但 Anthropic 没这么干。</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — Anthropic 真实做法: 工具不动 + 加 2 个特殊工具
   * 视觉演示: 同一个工具托盘 — 所有原工具保持原位，
   *           尾部 pop 进 EnterPlanMode / ExitPlanMode 两个 accent chip
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="pm-s2" className="pm-scene">
        <div className="pm-step-tag">
          <span className="pm-tag-dot" />
          <span className="pm-tag-text">Anthropic&apos;s Way</span>
        </div>

        <h2 className="pm-headline pm-headline-anthropic">
          <MaskReveal show duration={900}>
            <span className="pm-zh">所有工具</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pm-zh pm-em-soft">保留不动</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pm-zh">，</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="pm-zh">加</span>
          </MaskReveal>
          <MaskReveal show delay={1200} duration={900}>
            <span className="pm-zh pm-em">两个特殊工具</span>
          </MaskReveal>
          <MaskReveal show delay={1550} duration={900}>
            <span className="pm-zh">。</span>
          </MaskReveal>
        </h2>

        <AnthropicToolFlow />

        <div className="pm-anth-foot">
          <span className="pm-good-tag">
            <span className="pm-good-check">✓</span>
            前缀保持不变 · 缓存稳稳的
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 调用流: 模型自己 call EnterPlanMode → think → ExitPlanMode
   * 视觉演示: mono 风格的工具调用流（terminal 行）, 自顶向下
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="pm-s3" className="pm-scene">
        <div className="pm-step-tag">
          <span className="pm-tag-dot" />
          <span className="pm-tag-text">Call Flow</span>
        </div>

        <h2 className="pm-headline pm-headline-flow">
          <MaskReveal show duration={900}>
            <span className="pm-zh">模型</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pm-zh pm-em-soft">自己调</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pm-zh">这两个工具</span>
          </MaskReveal>
          <MaskReveal show delay={1000} duration={900}>
            <span className="pm-zh">来切换状态。</span>
          </MaskReveal>
        </h2>

        <CallFlowTerminal />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 约束传达: 在对话流里插入一条系统消息
   * 视觉演示: 对话流（user / assistant 气泡）中间插一条 system 消息
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="pm-s4" className="pm-scene">
        <div className="pm-step-tag">
          <span className="pm-tag-dot" />
          <span className="pm-tag-text">How the Constraint is Delivered</span>
        </div>

        <h2 className="pm-headline pm-headline-inject">
          <MaskReveal show duration={900}>
            <span className="pm-zh">在对话中</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pm-zh pm-em">插入一条系统消息</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pm-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1000} duration={900}>
            <span className="pm-zh">告诉模型你</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={900}>
            <span className="pm-zh pm-em-soft">现在在规划。</span>
          </MaskReveal>
        </h2>

        <ConversationInject />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 5 — 强调 hero: 是在对话流里插一条消息, 不是去改系统指令
   * 视觉演示: 单一大字 hero. "插一条消息" ✓ , "改系统指令" ✗
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="pm-s5" className="pm-scene pm-scene-center">
        <div className="pm-callout">
          <div className="pm-callout-watch">
            <span className="pm-watch-dot" />
            <span className="pm-watch-text">Watch this distinction</span>
          </div>

          <h1 className="pm-callout-hero">
            <MaskReveal show duration={1100}>
              <span className="pm-zh">在</span>
            </MaskReveal>
            <MaskReveal show delay={300} duration={1100}>
              <span className="pm-zh pm-em">对话流里</span>
            </MaskReveal>
            <MaskReveal show delay={650} duration={1100}>
              <span className="pm-zh">插一条消息</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={1100} duration={1100}>
              <span className="pm-zh pm-em-soft">不是</span>
            </MaskReveal>
            <MaskReveal show delay={1450} duration={1100}>
              <span className="pm-zh">去</span>
            </MaskReveal>
            <MaskReveal show delay={1700} duration={1100}>
              <span className="pm-zh pm-strike-host">改系统指令</span>
            </MaskReveal>
            <MaskReveal show delay={2050} duration={900}>
              <span className="pm-zh">。</span>
            </MaskReveal>
          </h1>

          <div className="pm-callout-marks">
            <div className="pm-mark pm-mark-good">
              <span className="pm-mark-symbol">✓</span>
              <span className="pm-mark-label">insert a message</span>
            </div>
            <div className="pm-mark pm-mark-bad">
              <span className="pm-mark-symbol">✗</span>
              <span className="pm-mark-label">edit system prompt</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 概念区分双卡 (CHAPTER SOUL)
   * 视觉演示: 左 System Prompt — 锁在 cache prefix 框内 (静态)
   *           右 System Message — 飘在对话流中 (流动)
   *           位置不同 = 缓存命中或不命中
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="pm-s6" className="pm-scene">
        <div className="pm-step-tag">
          <span className="pm-tag-dot" />
          <span className="pm-tag-text">Two Different Things</span>
        </div>

        <h2 className="pm-headline pm-headline-distinct">
          <MaskReveal show duration={900}>
            <span className="pm-zh pm-em-soft">位置</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pm-zh">不同 → </span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pm-zh">缓存</span>
          </MaskReveal>
          <MaskReveal show delay={950} duration={900}>
            <span className="pm-zh pm-em">命中或不命中</span>
          </MaskReveal>
          <MaskReveal show delay={1300} duration={900}>
            <span className="pm-zh">。</span>
          </MaskReveal>
        </h2>

        <DistinctionCards />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 结果牌: 工具集始终不变 + 缓存始终有效
   * 视觉演示: 两条带 ✓ 的结果短句, 强 accent
   * ──────────────────────────────────────────────────────────────── */
  if (step === 7) {
    return (
      <div key="pm-s7" className="pm-scene pm-scene-center">
        <div className="pm-result">
          <div className="pm-result-stamp">
            <span className="pm-result-stamp-text">Result</span>
          </div>

          <div className="pm-result-rows">
            <div className="pm-result-row">
              <span className="pm-result-check">✓</span>
              <span className="pm-result-text">
                <span className="pm-zh">工具集</span>
                <span className="pm-zh pm-em">始终不变</span>
              </span>
            </div>
            <div className="pm-result-row">
              <span className="pm-result-check">✓</span>
              <span className="pm-result-text">
                <span className="pm-zh">缓存</span>
                <span className="pm-zh pm-em">始终有效</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 8 — 副产品: 模型自主进规划模式
   * 视觉演示: auto-detect 切换器 + "复杂任务自己先想清楚再动手"
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="pm-s8" className="pm-scene">
      <div className="pm-step-tag">
        <span className="pm-tag-dot" />
        <span className="pm-tag-text">A Bonus Side Effect</span>
      </div>

      <h2 className="pm-headline pm-headline-bonus">
        <MaskReveal show duration={900}>
          <span className="pm-zh">模型</span>
        </MaskReveal>
        <MaskReveal show delay={350} duration={900}>
          <span className="pm-zh pm-em">自己判断</span>
        </MaskReveal>
        <MaskReveal show delay={700} duration={900}>
          <span className="pm-zh">什么时候进规划。</span>
        </MaskReveal>
      </h2>

      <AutoDetectSwitch />

      <div className="pm-bonus-foot">
        <MaskReveal show delay={1700} duration={900}>
          <span className="pm-zh pm-em-soft">
            复杂任务自己先想清楚再动手 ——
          </span>
        </MaskReveal>
        <MaskReveal show delay={2100} duration={900}>
          <span className="pm-zh">不用你手动切换。</span>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PauseIcon (step 0)
 * 暂停图标 — 两根竖条, 整体 pulse-glow
 * ────────────────────────────────────────────────────────────────── */
function PauseIcon() {
  return (
    <div className="pm-pause" aria-hidden>
      <span className="pm-pause-bar" />
      <span className="pm-pause-bar" />
      <div className="pm-pause-halo" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ThinkBubble (step 0)
 * 思考气泡 — 三个尾随的小圆点
 * ────────────────────────────────────────────────────────────────── */
function ThinkBubble() {
  return (
    <div className="pm-bubble" aria-hidden>
      <div className="pm-bubble-body">
        <span className="pm-bubble-dot" />
        <span className="pm-bubble-dot" />
        <span className="pm-bubble-dot" />
      </div>
      <span className="pm-bubble-tail pm-bubble-tail-1" />
      <span className="pm-bubble-tail pm-bubble-tail-2" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Tool tray data — used by step 1 (naive removal) and step 2 (kept)
 * ────────────────────────────────────────────────────────────────── */
const EXEC_TOOLS = [
  { name: "Read", kind: "exec" },
  { name: "Write", kind: "exec" },
  { name: "Edit", kind: "exec" },
  { name: "Bash", kind: "exec" },
  { name: "Grep", kind: "exec" },
  { name: "Glob", kind: "exec" },
];

/* ──────────────────────────────────────────────────────────────────
 * Visual: NaiveToolFlow (step 1)
 * 工具托盘 → 移走 (translate + cross) → 加回来
 * ────────────────────────────────────────────────────────────────── */
function NaiveToolFlow() {
  return (
    <div className="pm-tray-flow" aria-hidden>
      <div className="pm-flow-stage">
        <div className="pm-flow-mode pm-flow-mode-enter">
          <span className="pm-flow-mode-tag">enter Plan Mode</span>
          <span className="pm-flow-mode-arrow">→</span>
        </div>
        <div className="pm-tray pm-tray-naive">
          <div className="pm-tray-label">tool set · 6</div>
          <div className="pm-tray-chips">
            {EXEC_TOOLS.map((t, i) => (
              <div
                key={t.name}
                className="pm-chip pm-chip-exec pm-chip-naive-out"
                style={
                  {
                    "--chip-i": String(i),
                  } as React.CSSProperties
                }
              >
                <span className="pm-chip-dot" />
                <span className="pm-chip-name">{t.name}</span>
                <span className="pm-chip-x">✗</span>
              </div>
            ))}
          </div>
          <div className="pm-tray-rim" />
        </div>
      </div>

      <div className="pm-flow-divider">
        <span className="pm-flow-divider-line" />
        <span className="pm-flow-divider-tag">破坏缓存</span>
        <span className="pm-flow-divider-line" />
      </div>

      <div className="pm-flow-stage">
        <div className="pm-flow-mode pm-flow-mode-exit">
          <span className="pm-flow-mode-tag">exit · 加回来</span>
          <span className="pm-flow-mode-arrow">↺</span>
        </div>
        <div className="pm-tray pm-tray-naive">
          <div className="pm-tray-label">tool set · 6</div>
          <div className="pm-tray-chips">
            {EXEC_TOOLS.map((t, i) => (
              <div
                key={t.name}
                className="pm-chip pm-chip-exec pm-chip-naive-in"
                style={
                  {
                    "--chip-i": String(i),
                  } as React.CSSProperties
                }
              >
                <span className="pm-chip-dot" />
                <span className="pm-chip-name">{t.name}</span>
              </div>
            ))}
          </div>
          <div className="pm-tray-rim" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: AnthropicToolFlow (step 2)
 * 同样的工具托盘, 6 个原 chip 安静保持; 末尾 pop 进 2 个 accent chip
 * ────────────────────────────────────────────────────────────────── */
function AnthropicToolFlow() {
  return (
    <div className="pm-tray-anth" aria-hidden>
      <div className="pm-tray pm-tray-anth-box">
        <div className="pm-tray-label-row">
          <span className="pm-tray-label">tool set</span>
          <span className="pm-tray-count">6 → 8</span>
        </div>

        <div className="pm-tray-chips pm-tray-chips-anth">
          {EXEC_TOOLS.map((t, i) => (
            <div
              key={t.name}
              className="pm-chip pm-chip-exec pm-chip-anth-keep"
              style={
                {
                  "--chip-i": String(i),
                } as React.CSSProperties
              }
            >
              <span className="pm-chip-dot" />
              <span className="pm-chip-name">{t.name}</span>
              <span className="pm-chip-tick">·</span>
            </div>
          ))}

          <div className="pm-chip-divider" />

          <div className="pm-chip pm-chip-special pm-chip-anth-new pm-chip-anth-new-1">
            <span className="pm-chip-plus">+</span>
            <span className="pm-chip-name pm-chip-name-mono">EnterPlanMode</span>
          </div>
          <div className="pm-chip pm-chip-special pm-chip-anth-new pm-chip-anth-new-2">
            <span className="pm-chip-plus">+</span>
            <span className="pm-chip-name pm-chip-name-mono">ExitPlanMode</span>
          </div>
        </div>
        <div className="pm-tray-rim pm-tray-rim-anth" />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CallFlowTerminal (step 3)
 * mono 终端风的调用流, 行依次出现
 * ────────────────────────────────────────────────────────────────── */
function CallFlowTerminal() {
  const lines: Array<{
    role: string;
    body: React.ReactNode;
    kind?: string;
    delay: number;
  }> = [
    {
      role: "user",
      body: <span>帮我重构这个模块</span>,
      delay: 800,
    },
    {
      role: "model",
      body: (
        <span>
          <span className="pm-term-call">tool_call</span>(
          <span className="pm-term-fn">EnterPlanMode</span>)
        </span>
      ),
      kind: "enter",
      delay: 1500,
    },
    {
      role: "·",
      body: (
        <span className="pm-term-think">
          [ thinking · 列出文件 · 设计步骤 · 评估风险 ]
        </span>
      ),
      kind: "think",
      delay: 2300,
    },
    {
      role: "model",
      body: (
        <span>
          <span className="pm-term-call">tool_call</span>(
          <span className="pm-term-fn">ExitPlanMode</span>)
        </span>
      ),
      kind: "exit",
      delay: 3300,
    },
    {
      role: "model",
      body: <span>开始执行 — 调用 Edit / Write …</span>,
      delay: 4000,
    },
  ];

  return (
    <div className="pm-term" aria-hidden>
      <div className="pm-term-head">
        <span className="pm-term-dot" />
        <span className="pm-term-dot" />
        <span className="pm-term-dot" />
        <span className="pm-term-title">conversation · model self-driven</span>
      </div>
      <div className="pm-term-body">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`pm-term-line pm-term-line-${l.kind || "plain"}`}
            style={
              {
                "--line-delay": `${l.delay}ms`,
              } as React.CSSProperties
            }
          >
            <span className="pm-term-role">{l.role}</span>
            <span className="pm-term-arrow">›</span>
            <span className="pm-term-body-text">{l.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ConversationInject (step 4)
 * 三条对话气泡 — user → [system message 插入] → assistant
 * 中间 system message 是 accent 色, 从上方 drop in
 * ────────────────────────────────────────────────────────────────── */
function ConversationInject() {
  return (
    <div className="pm-conv" aria-hidden>
      <div className="pm-conv-bubble pm-conv-bubble-user">
        <span className="pm-conv-role">user</span>
        <span className="pm-conv-text">帮我把支付链路重构一下</span>
      </div>

      <div className="pm-conv-bubble pm-conv-bubble-system">
        <div className="pm-conv-system-tag">
          <span className="pm-conv-system-pill">system message</span>
          <span className="pm-conv-system-injected">· injected</span>
        </div>
        <span className="pm-conv-text pm-conv-text-system">
          You are now in <strong>Plan Mode</strong>. Only explore the codebase
          and propose a plan. Do <strong>not</strong> edit files. Call{" "}
          <code>ExitPlanMode</code> when ready.
        </span>
        <span className="pm-conv-system-arrow">↓</span>
      </div>

      <div className="pm-conv-bubble pm-conv-bubble-assistant">
        <span className="pm-conv-role">assistant</span>
        <span className="pm-conv-text">
          收到 — 进入规划 · 先调 Read / Grep 看代码…
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: DistinctionCards (step 6) — CHAPTER SOUL
 * 左: System Prompt — 嵌在 cache prefix bar 里, locked, 静止
 * 右: System Message — 飘在 message 流中, flowing, 移动
 * 通过 "位置可视化" 让观众一眼看出区别
 * ────────────────────────────────────────────────────────────────── */
function DistinctionCards() {
  return (
    <div className="pm-cards" aria-hidden>
      {/* LEFT — System Prompt (locked into cache prefix) */}
      <div className="pm-card pm-card-prompt">
        <div className="pm-card-head">
          <span className="pm-card-name pm-card-name-mono">System Prompt</span>
          <span className="pm-card-lock">
            <LockIcon />
          </span>
        </div>
        <div className="pm-card-vis">
          <div className="pm-prefix-bar">
            <div className="pm-prefix-fill" />
            <div className="pm-prefix-piece pm-prefix-piece-prompt">
              system prompt
            </div>
            <div className="pm-prefix-piece pm-prefix-piece-tools">tools</div>
            <div className="pm-prefix-piece pm-prefix-piece-hist">history</div>
          </div>
          <div className="pm-prefix-tag">CACHE PREFIX · 钉死不动</div>
        </div>
        <div className="pm-card-attrs">
          <div className="pm-attr">
            <span className="pm-attr-key">位置</span>
            <span className="pm-attr-val">在缓存前缀里</span>
          </div>
          <div className="pm-attr">
            <span className="pm-attr-key">性质</span>
            <span className="pm-attr-val">固定 · 一改就破</span>
          </div>
        </div>
      </div>

      {/* RIGHT — System Message (flowing in conversation) */}
      <div className="pm-card pm-card-message">
        <div className="pm-card-head">
          <span className="pm-card-name pm-card-name-mono">System Message</span>
          <span className="pm-card-wave">
            <WaveIcon />
          </span>
        </div>
        <div className="pm-card-vis">
          <div className="pm-stream">
            <div className="pm-stream-msg pm-stream-msg-user">user</div>
            <div className="pm-stream-msg pm-stream-msg-sys">
              <span className="pm-stream-msg-sys-pill">system msg</span>
            </div>
            <div className="pm-stream-msg pm-stream-msg-asst">assistant</div>
            <div className="pm-stream-msg pm-stream-msg-user">user</div>
            <div className="pm-stream-msg pm-stream-msg-asst">assistant</div>
          </div>
          <div className="pm-stream-tag">CONVERSATION · 流动</div>
        </div>
        <div className="pm-card-attrs">
          <div className="pm-attr">
            <span className="pm-attr-key">位置</span>
            <span className="pm-attr-val">在对话流里</span>
          </div>
          <div className="pm-attr">
            <span className="pm-attr-key">性质</span>
            <span className="pm-attr-val">流动 · 不影响前缀</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg viewBox="0 0 36 16" width="34" height="16" aria-hidden>
      <path
        d="M0 8 Q 4 1, 8 8 T 16 8 T 24 8 T 32 8 T 40 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: AutoDetectSwitch (step 8)
 * 一个判断器: 任务复杂度 → 自动切换到 Plan Mode
 * ────────────────────────────────────────────────────────────────── */
function AutoDetectSwitch() {
  return (
    <div className="pm-auto" aria-hidden>
      <div className="pm-auto-row">
        <div className="pm-auto-task pm-auto-task-simple">
          <span className="pm-auto-task-label">simple</span>
          <span className="pm-auto-task-text">"加个 console.log"</span>
        </div>
        <div className="pm-auto-arrow pm-auto-arrow-simple">
          <span className="pm-auto-arrow-line" />
          <span className="pm-auto-arrow-tip">›</span>
        </div>
        <div className="pm-auto-state pm-auto-state-direct">
          <span className="pm-auto-state-label">direct execution</span>
          <span className="pm-auto-state-icon">
            <span className="pm-icon-arrow" />
          </span>
        </div>
      </div>

      <div className="pm-auto-row pm-auto-row-complex">
        <div className="pm-auto-task pm-auto-task-complex">
          <span className="pm-auto-task-label">complex</span>
          <span className="pm-auto-task-text">"重构整条支付链路"</span>
        </div>
        <div className="pm-auto-arrow pm-auto-arrow-complex">
          <span className="pm-auto-arrow-line" />
          <span className="pm-auto-arrow-tip">›</span>
        </div>
        <div className="pm-auto-state pm-auto-state-plan">
          <span className="pm-auto-state-label pm-auto-state-label-plan">
            auto · EnterPlanMode
          </span>
          <span className="pm-auto-state-icon pm-auto-state-icon-plan">
            <span className="pm-icon-pause">
              <span />
              <span />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
