import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./Pitfalls.css";

/**
 * Chapter 06 · pitfalls — 三个坑（5 steps · ~31s）
 *
 * CSS prefix: .pf-
 * Theme tokens only. No hardcoded hex / rgb / font names.
 *
 * Per step a different "thing happening" animation:
 *   step 0 — hazard chevrons sweep + hook hero
 *   step 1 — ticking clock digits embedded in a system prompt code block,
 *            cache row flashes red on every tick (BREAK stamp lands)
 *   step 2 — two tool list requests side by side, second one shuffles
 *            (a,b,c) → (c,a,b); a red diff line zigzags between them
 *   step 3 — one field flips inside a tool definition; a cascade wave
 *            paints every token after the change red ("整条前缀作废")
 *   step 4 — hero close-out + a chain of links snaps in the middle
 */
export default function PitfallsChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 章节钩子："这里有几个特别容易踩的坑"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="pf-s0" className="pf-scene pf-scene-center">
        <div className="pf-hook">
          <HazardChevrons />
          <div className="pf-step-tag pf-step-tag-center">
            <span className="pf-tag-dot" />
            <span className="pf-tag-text">Pitfalls · Three Cache Killers</span>
          </div>
          <h1 className="pf-hero pf-hero-hook">
            <MaskReveal show duration={1000}>
              <span className="pf-zh">这里有几个</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={400} duration={1000}>
              <span className="pf-zh">特别容易踩的</span>
            </MaskReveal>
            <MaskReveal show delay={900} duration={1000}>
              <span className="pf-zh pf-em">坑</span>
            </MaskReveal>
            <MaskReveal show delay={1200} duration={900}>
              <span className="pf-zh">。</span>
            </MaskReveal>
          </h1>
          <div className="pf-hook-counter">
            <span className="pf-counter-num">03</span>
            <span className="pf-counter-label">ways to break the prefix</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 坑 1：固定指令嵌当前时间（时钟跳秒动画）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="pf-s1" className="pf-scene">
        <div className="pf-step-tag">
          <span className="pf-tag-dot" />
          <span className="pf-tag-text">Pitfall 01 · Live Timestamps</span>
        </div>

        <h2 className="pf-headline">
          <MaskReveal show duration={900}>
            <span className="pf-zh">在固定指令里嵌了</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pf-zh pf-em">当前时间</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pf-zh">。</span>
          </MaskReveal>
        </h2>

        <ClockPitfall />

        <div className="pf-verdict pf-verdict-1">
          <span className="pf-verdict-bar" />
          <span className="pf-verdict-text">
            每秒都在变 <em>·</em> 缓存直接废
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 坑 2：工具定义用无序容器装（顺序对照）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="pf-s2" className="pf-scene">
        <div className="pf-step-tag">
          <span className="pf-tag-dot" />
          <span className="pf-tag-text">Pitfall 02 · Unordered Containers</span>
        </div>

        <h2 className="pf-headline">
          <MaskReveal show duration={900}>
            <span className="pf-zh">工具定义用</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pf-en pf-em">dict / set</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="pf-zh">装。</span>
          </MaskReveal>
        </h2>

        <OrderPitfall />

        <div className="pf-verdict pf-verdict-2">
          <span className="pf-verdict-bar" />
          <span className="pf-verdict-text">
            顺序不稳 <em>·</em> 前缀对不上
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 坑 3：工具参数改一字段（cascade red wave）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="pf-s3" className="pf-scene">
        <div className="pf-step-tag">
          <span className="pf-tag-dot" />
          <span className="pf-tag-text">Pitfall 03 · One-Field Edit</span>
        </div>

        <h2 className="pf-headline">
          <MaskReveal show duration={900}>
            <span className="pf-zh">工具参数</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="pf-zh pf-em">动一个字段</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="pf-zh">。</span>
          </MaskReveal>
        </h2>

        <FieldEditPitfall />

        <div className="pf-verdict pf-verdict-3">
          <span className="pf-verdict-bar" />
          <span className="pf-verdict-text">
            整条前缀的缓存 <em>·</em> 全部失效
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 收束 hero："一个小细节没注意，整条缓存链就断了"
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="pf-s4" className="pf-scene pf-scene-center">
      <div className="pf-close">
        <h1 className="pf-hero pf-hero-close">
          <MaskReveal show duration={1100}>
            <span className="pf-zh">一个小细节</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={1100}>
            <span className="pf-zh pf-em-soft">没注意，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={900} duration={1100}>
            <span className="pf-zh">整条</span>
          </MaskReveal>
          <MaskReveal show delay={1200} duration={1100}>
            <span className="pf-zh pf-em">缓存链</span>
          </MaskReveal>
          <MaskReveal show delay={1550} duration={1100}>
            <span className="pf-zh">就断了。</span>
          </MaskReveal>
        </h1>
        <ChainBreak />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: HazardChevrons (step 0)
 * 顶部一条向右扫的危险斜纹带（accent + transparent）
 * ────────────────────────────────────────────────────────────────── */
function HazardChevrons() {
  return <div className="pf-hazard" aria-hidden />;
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ClockPitfall (step 1)
 * 一个 mono 系统提示词代码块，里面有一行 `current_time:` 后跟跳秒时钟，
 * 时钟数字用 digit-ring 动画（CSS 步进），右侧有一个 cache 行随秒
 * 闪红 + 一枚 BROKEN 印章在动画末尾砸下。
 * ────────────────────────────────────────────────────────────────── */
function ClockPitfall() {
  return (
    <div className="pf-clock-card" aria-hidden>
      <div className="pf-code-card">
        <div className="pf-code-header">
          <span className="pf-code-dot" />
          <span className="pf-code-dot" />
          <span className="pf-code-dot" />
          <span className="pf-code-title">system_prompt.py</span>
        </div>
        <div className="pf-code-body">
          <div className="pf-code-line">
            <span className="pf-code-gutter">1</span>
            <span className="pf-code-kw">SYSTEM</span>
            <span className="pf-code-pun"> = </span>
            <span className="pf-code-str">"You are an assistant.</span>
          </div>
          <div className="pf-code-line">
            <span className="pf-code-gutter">2</span>
            <span className="pf-code-pun"> </span>
            <span className="pf-code-str">Today is </span>
            <span className="pf-code-fstr">{"{datetime.now()}"}</span>
            <span className="pf-code-str">."</span>
          </div>
          <div className="pf-code-line pf-code-line-time">
            <span className="pf-code-gutter">→</span>
            <span className="pf-code-comment">
              {"// rendered: "}
              <Clock />
            </span>
          </div>
        </div>
      </div>

      <div className="pf-cache-strip">
        <span className="pf-cache-strip-label">cache</span>
        <div className="pf-cache-cells">
          {Array.from({ length: 16 }, (_, i) => (
            <span
              key={i}
              className="pf-cache-cell"
              style={{ animationDelay: `${2400 + i * 60}ms` }}
            />
          ))}
        </div>
        <span className="pf-cache-stamp">BROKEN</span>
      </div>
    </div>
  );
}

function Clock() {
  return (
    <span className="pf-clock">
      <span className="pf-clock-static">14:37:</span>
      <DigitRing cycleMs={6000} />
      <DigitRing cycleMs={1000} />
    </span>
  );
}

function DigitRing({ cycleMs }: { cycleMs: number }) {
  return (
    <span className="pf-digit">
      <span
        className="pf-digit-ring"
        style={{ animationDuration: `${cycleMs * 10}ms` }}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="pf-digit-cell">
            {i % 10}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: OrderPitfall (step 2)
 * 两条并排的 request：
 *   REQ 1  tools = { "search", "edit", "run" }   ←   set/dict 序号
 *   REQ 2  tools = { "run", "search", "edit" }   ←   重新枚举顺序变了
 * 中间一条红色 "MISMATCH" 闪电连接两侧顺序错乱的工具行。
 * ────────────────────────────────────────────────────────────────── */
function OrderPitfall() {
  // both requests carry the SAME 3 tools, but iteration order differs.
  const reqA = ["search", "edit", "run"];
  const reqB = ["run", "search", "edit"];
  return (
    <div className="pf-order" aria-hidden>
      <div className="pf-order-side pf-order-side-a">
        <div className="pf-order-tag">REQUEST&nbsp;·&nbsp;1</div>
        <div className="pf-order-decl">
          <span className="pf-en">tools</span>
          <span className="pf-code-pun"> = set([…])</span>
        </div>
        <div className="pf-order-list">
          {reqA.map((name, i) => (
            <div
              key={name}
              className="pf-order-row"
              data-tool={name}
              style={{ animationDelay: `${1400 + i * 220}ms` }}
            >
              <span className="pf-order-num">{`0${i + 1}`}</span>
              <span className="pf-order-name">{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pf-order-mid">
        <span className="pf-order-vs">≠</span>
        <span className="pf-order-mismatch">MISMATCH</span>
      </div>

      <div className="pf-order-side pf-order-side-b">
        <div className="pf-order-tag pf-order-tag-bad">REQUEST&nbsp;·&nbsp;2</div>
        <div className="pf-order-decl">
          <span className="pf-en">tools</span>
          <span className="pf-code-pun"> = set([…])</span>
        </div>
        <div className="pf-order-list">
          {reqB.map((name, i) => (
            <div
              key={name}
              className="pf-order-row pf-order-row-shuffle"
              data-tool={name}
              style={{ animationDelay: `${2400 + i * 220}ms` }}
            >
              <span className="pf-order-num">{`0${i + 1}`}</span>
              <span className="pf-order-name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: FieldEditPitfall (step 3)
 * 一个 mono JSON-ish 工具定义卡：
 *   name: "Agent"
 *   subagents: ["explore", "review"]   ← 这一行 diff 后变成 +"test"
 * 字段变更后下方一条 token 流从修改点开始向右**级联染红**
 * (CSS keyframes 的逐 token delay)
 * ────────────────────────────────────────────────────────────────── */
function FieldEditPitfall() {
  return (
    <div className="pf-field" aria-hidden>
      <div className="pf-code-card pf-field-card">
        <div className="pf-code-header">
          <span className="pf-code-dot" />
          <span className="pf-code-dot" />
          <span className="pf-code-dot" />
          <span className="pf-code-title">tools/agent.json</span>
        </div>
        <div className="pf-code-body">
          <div className="pf-code-line">
            <span className="pf-code-gutter">1</span>
            <span className="pf-code-pun">{"{"}</span>
          </div>
          <div className="pf-code-line">
            <span className="pf-code-gutter">2</span>
            <span className="pf-code-key">{`  "name"`}</span>
            <span className="pf-code-pun">: </span>
            <span className="pf-code-str">"Agent"</span>
            <span className="pf-code-pun">,</span>
          </div>
          <div className="pf-code-line">
            <span className="pf-code-gutter">3</span>
            <span className="pf-code-key">{`  "description"`}</span>
            <span className="pf-code-pun">: </span>
            <span className="pf-code-str">"Dispatch a sub-agent."</span>
            <span className="pf-code-pun">,</span>
          </div>
          <div className="pf-code-line pf-code-line-diff-old">
            <span className="pf-code-gutter pf-code-gutter-minus">-</span>
            <span className="pf-code-key">{`  "subagents"`}</span>
            <span className="pf-code-pun">: [</span>
            <span className="pf-code-str">"explore"</span>
            <span className="pf-code-pun">, </span>
            <span className="pf-code-str">"review"</span>
            <span className="pf-code-pun">]</span>
          </div>
          <div className="pf-code-line pf-code-line-diff-new">
            <span className="pf-code-gutter pf-code-gutter-plus">+</span>
            <span className="pf-code-key">{`  "subagents"`}</span>
            <span className="pf-code-pun">: [</span>
            <span className="pf-code-str">"explore"</span>
            <span className="pf-code-pun">, </span>
            <span className="pf-code-str">"review"</span>
            <span className="pf-code-pun">, </span>
            <span className="pf-code-str pf-code-str-added">"test"</span>
            <span className="pf-code-pun">]</span>
          </div>
          <div className="pf-code-line">
            <span className="pf-code-gutter">5</span>
            <span className="pf-code-pun">{"}"}</span>
          </div>
        </div>
      </div>

      <div className="pf-cascade">
        <div className="pf-cascade-label">prefix tokens</div>
        <div className="pf-cascade-bar">
          {Array.from({ length: 36 }, (_, i) => (
            <span
              key={i}
              className={`pf-cascade-cell ${
                i < 14 ? "is-safe" : "is-burned"
              }`}
              style={{
                animationDelay:
                  i < 14 ? `${600 + i * 30}ms` : `${3400 + (i - 14) * 70}ms`,
              }}
            />
          ))}
        </div>
        <div className="pf-cascade-pointer">
          <span className="pf-cascade-arrow">↑</span>
          <span className="pf-cascade-note">edit lands here · 之后全部作废</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ChainBreak (step 4)
 * SVG: 8 个椭圆链环排成一行，正中间那个被一道闪光劈开成两半，
 *      两半向左右回弹错位，留下断裂处的火花十字。
 * ────────────────────────────────────────────────────────────────── */
function ChainBreak() {
  // viewBox 1200×220, links centered along y=110
  // each link is an oval, alternating rotation to read like a real chain
  const linkW = 110;
  const linkSpacing = 90;
  const startX = 90;
  const total = 8;
  const breakIdx = 3; // 0..(total-1) — which link snaps. picks one slightly left of center.
  const links = Array.from({ length: total }, (_, i) => i);

  return (
    <div className="pf-chain-wrap" aria-hidden>
      <svg
        className="pf-chain"
        viewBox="0 0 1200 220"
        preserveAspectRatio="xMidYMid meet"
      >
        {links.map((i) => {
          if (i === breakIdx) return null;
          const cx = startX + i * linkSpacing;
          const rotated = i % 2 === 0;
          const rx = rotated ? linkW / 2 : 28;
          const ry = rotated ? 28 : linkW / 2;
          return (
            <g
              key={i}
              className={`pf-chain-link ${
                i < breakIdx ? "is-left" : "is-right"
              }`}
              style={{ animationDelay: `${1400 + i * 70}ms` }}
            >
              <ellipse
                cx={cx}
                cy={110}
                rx={rx}
                ry={ry}
                className="pf-chain-link-stroke"
              />
            </g>
          );
        })}

        {/* the snapping link — drawn as two halves */}
        <g className="pf-chain-snap">
          <g className="pf-chain-half pf-chain-half-l">
            <path
              d={`M ${startX + breakIdx * linkSpacing - linkW / 2} 110
                  a ${linkW / 2} 28 0 0 1 ${linkW / 2} -28
                  l 6 28
                  l -6 28
                  a ${linkW / 2} 28 0 0 1 -${linkW / 2} -28 z`}
              className="pf-chain-half-stroke"
            />
          </g>
          <g className="pf-chain-half pf-chain-half-r">
            <path
              d={`M ${startX + breakIdx * linkSpacing + linkW / 2} 110
                  a ${linkW / 2} 28 0 0 1 -${linkW / 2} 28
                  l -6 -28
                  l 6 -28
                  a ${linkW / 2} 28 0 0 1 ${linkW / 2} 28 z`}
              className="pf-chain-half-stroke"
            />
          </g>

          {/* fracture flash */}
          <g
            className="pf-chain-spark"
            transform={`translate(${startX + breakIdx * linkSpacing} 110)`}
          >
            <line x1={-32} y1={0} x2={32} y2={0} className="pf-chain-spark-line" />
            <line x1={0} y1={-26} x2={0} y2={26} className="pf-chain-spark-line" />
            <line x1={-22} y1={-22} x2={22} y2={22} className="pf-chain-spark-line" />
            <line x1={22} y1={-22} x2={-22} y2={22} className="pf-chain-spark-line" />
          </g>
        </g>
      </svg>

      <div className="pf-chain-caption">
        <span className="pf-chain-cap-line" />
        <span className="pf-chain-cap-text">prefix → cache · broken</span>
      </div>
    </div>
  );
}
