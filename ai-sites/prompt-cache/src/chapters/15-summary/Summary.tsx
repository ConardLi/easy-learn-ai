import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Summary.css";

/**
 * Chapter 15 · summary — 总结：前缀匹配（8 steps · ~84s）
 *
 * Final chapter — cinematic close. Five lessons revealed one-by-one as a
 * cumulative stack (past dim / active bright / pending faint), then two
 * hero closers with maximum whitespace.
 *
 * Per CHAPTER-CRAFT.md:
 *   - 1 lesson = 1 step (no list dump)
 *   - Each step has its own dominant motion
 *   - Theme tokens only — no hex / no emoji
 *   - Animations ≤ narration time
 */
export default function SummaryChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 章节标识 hero："缓存就是前缀匹配"
   *   Visual: 一条横向 prefix track 自绘，末端是 [CACHE HIT] 标记
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="s0" className="sm-scene">
        <div className="sm-open">
          <div className="sm-kicker">
            <span className="sm-dot" />
            Chapter 15 · Summary · 7 lessons in one line
          </div>
          <h1 className="sm-open-hero">
            <MaskReveal show duration={1100}>
              <span className="sm-zh">缓存</span>
            </MaskReveal>
            <MaskReveal show delay={420} duration={1100}>
              <span className="sm-zh sm-em-soft">就是</span>
            </MaskReveal>
            <MaskReveal show delay={780} duration={1100}>
              <span className="sm-zh sm-em">前缀匹配。</span>
            </MaskReveal>
          </h1>
          <div className="sm-open-en">
            <MaskReveal show delay={1500} duration={900}>
              <span className="sm-en">
                Cache <em>is</em> prefix match.
              </span>
            </MaskReveal>
          </div>
          <PrefixTrack />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Steps 1-5 — 5-row lesson stack, cumulative reveal
   *   step 1 → activeIndex 0 (lesson 01)
   *   step 5 → activeIndex 4 (lesson 05)
   * ──────────────────────────────────────────────────────────────── */
  if (step >= 1 && step <= 5) {
    const activeIndex = step - 1;
    return (
      <div key={`s${step}`} className="sm-scene">
        <div className="sm-list-wrap">
          <div className="sm-list-header">
            <span className="sm-list-tag">Five Rules · Prefix Match</span>
            <span className="sm-list-progress">
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="sm-list-progress-sep">/</span> 05
            </span>
          </div>
          <LessonStack activeIndex={activeIndex} />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 收束 hero：别改指令，别动工具…
   *   Visual: 7-segment cache chain w/ one connector broken
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="s6" className="sm-scene">
        <div className="sm-close">
          <div className="sm-close-kicker">
            <span className="sm-dot" />
            One constraint · everything follows
          </div>
          <h2 className="sm-close-hero">
            <div className="sm-close-line">
              <MaskReveal show duration={1100}>
                <span className="sm-zh sm-em-soft">别改</span>
              </MaskReveal>
              <MaskReveal show delay={300} duration={1100}>
                <span className="sm-zh sm-em">指令</span>
              </MaskReveal>
              <MaskReveal show delay={600} duration={1100}>
                <span className="sm-zh sm-em-soft">，别动</span>
              </MaskReveal>
              <MaskReveal show delay={900} duration={1100}>
                <span className="sm-zh sm-em">工具</span>
              </MaskReveal>
              <MaskReveal show delay={1200} duration={1100}>
                <span className="sm-zh sm-em-soft">——</span>
              </MaskReveal>
            </div>
            <div className="sm-close-line sm-close-line-2">
              <MaskReveal show delay={1700} duration={1100}>
                <span className="sm-zh">一碰，整条缓存链就</span>
              </MaskReveal>
              <MaskReveal show delay={2100} duration={1100}>
                <span className="sm-zh sm-em">断</span>
              </MaskReveal>
              <MaskReveal show delay={2400} duration={1100}>
                <span className="sm-zh">。</span>
              </MaskReveal>
            </div>
          </h2>
          <CacheChain />
          <div className="sm-close-tail">
            <MaskReveal show delay={4500} duration={1100}>
              <span className="sm-zh sm-tail-text">
                换模型、切账号、另起炉灶——
              </span>
            </MaskReveal>
            <MaskReveal show delay={4900} duration={1100}>
              <span className="sm-zh sm-tail-text sm-em-soft">
                同一个道理。
              </span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 终章信念 hero
   *   Visual: 静止 halo + 慢呼吸光晕；最大留白；最大字号
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="s7" className="sm-scene">
      <div className="sm-creed">
        <div className="sm-halo" aria-hidden />
        <div className="sm-creed-kicker">
          <span className="sm-creed-rule" />
          <span>Design philosophy · fin.</span>
          <span className="sm-creed-rule" />
        </div>
        <h1 className="sm-creed-hero">
          <div className="sm-creed-line">
            <MaskReveal show duration={1300}>
              <span className="sm-zh">先认死那条</span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={1300}>
              <span className="sm-zh sm-em">绕不开的限制</span>
            </MaskReveal>
            <MaskReveal show delay={1100} duration={1300}>
              <span className="sm-zh">，</span>
            </MaskReveal>
          </div>
          <div className="sm-creed-line sm-creed-line-2">
            <MaskReveal show delay={2000} duration={1300}>
              <span className="sm-zh">再围着它，</span>
            </MaskReveal>
            <MaskReveal show delay={2600} duration={1300}>
              <span className="sm-zh sm-em">把整个系统搭起来。</span>
            </MaskReveal>
          </div>
        </h1>
        <div className="sm-creed-en">
          <MaskReveal show delay={4000} duration={1100}>
            <span className="sm-en">
              <em>Embrace</em> the constraint, then build the system around it.
            </span>
          </MaskReveal>
        </div>
        <div className="sm-creed-signoff">
          <span className="sm-creed-signoff-line" />
          <span className="sm-creed-signoff-text">
            Prompt Caching · End of brief
          </span>
          <span className="sm-creed-signoff-line" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefixTrack — 一条横向轨道 + 同色 prefix 块 + [CACHE HIT]
 *   step 0 装饰，自绘进入
 * ────────────────────────────────────────────────────────────────── */
function PrefixTrack() {
  const blocks = ["system", "tools", "messages", "user[1]", "asst[1]", "user[2]"];
  return (
    <div className="sm-track" aria-hidden>
      <div className="sm-track-line" />
      <div className="sm-track-blocks">
        {blocks.map((b, i) => (
          <div
            key={b}
            className="sm-track-block"
            style={{ animationDelay: `${1800 + i * 140}ms` }}
          >
            {b}
          </div>
        ))}
        <div className="sm-track-block sm-track-hit">
          <span className="sm-track-hit-bracket">[</span>
          CACHE HIT
          <span className="sm-track-hit-bracket">]</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: LessonStack — 5 行累积揭示
 *   past:    dim, scale 0.94, no border
 *   active:  accent border + glow + scale 1.0 + entrance animation
 *   pending: 仅显示 row scaffolding（数字灰 + dotted line 占位）
 * ────────────────────────────────────────────────────────────────── */
const LESSONS = [
  {
    n: "01",
    title: "前缀匹配决定一切",
    detail: "前缀里任何位置的变化，都会让其后所有内容的缓存失效",
    code: "prefix.diff() → invalidate · all-after",
  },
  {
    n: "02",
    title: "用消息代替指令修改",
    detail: "切换模式、时间更新——塞进对话消息，别去动系统指令",
    code: "<system-reminder> · not edit-prompt",
  },
  {
    n: "03",
    title: "别中途切工具 / 模型",
    detail: "用工具表达状态转换；延迟加载代替工具增删",
    code: "defer_loading: true · tool-state-machine",
  },
  {
    n: "04",
    title: "像监控在线率一样监控命中率",
    detail: "Anthropic 对缓存中断发告警，当线上事故处理",
    code: "cache_hit_rate < threshold → SEV",
  },
  {
    n: "05",
    title: "分叉必须共享主对话前缀",
    detail: "压缩、摘要、子任务——全部用相同的参数",
    code: "Cache-Safe Forking · shared-prefix",
  },
] as const;

function LessonStack({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="sm-stack">
      {LESSONS.map((l, i) => {
        const state =
          i < activeIndex ? "past" : i === activeIndex ? "active" : "pending";
        return (
          <li key={i} className={`sm-row sm-row-${state}`}>
            <div className="sm-row-num">{l.n}</div>
            <div className="sm-row-body">
              <div className="sm-row-title">{l.title}</div>
              <div className="sm-row-detail">{l.detail}</div>
            </div>
            <div className="sm-row-code">{l.code}</div>
            <div className="sm-row-marker" />
          </li>
        );
      })}
    </ol>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CacheChain — 7 段缓存块 + accent 连接，第 4 个连接断裂
 *   step 6 装饰，连接线从左到右依次出现，断点闪烁
 * ────────────────────────────────────────────────────────────────── */
function CacheChain() {
  const segments = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="sm-chain" aria-hidden>
      {segments.map((n, i) => (
        <div key={n} className="sm-chain-group">
          <div
            className="sm-chain-block"
            style={{ animationDelay: `${2700 + i * 90}ms` }}
          >
            <span className="sm-chain-block-num">{String(n).padStart(2, "0")}</span>
          </div>
          {i < segments.length - 1 && (
            <div
              className={`sm-chain-link ${i === 3 ? "is-broken" : ""}`}
              style={{ animationDelay: `${2750 + i * 90}ms` }}
            >
              {i === 3 && (
                <>
                  <span className="sm-chain-spark" />
                  <span className="sm-chain-break-label">break</span>
                </>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
