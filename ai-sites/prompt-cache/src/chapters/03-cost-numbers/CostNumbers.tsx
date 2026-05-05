import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./CostNumbers.css";

/**
 * Chapter 03 · cost-numbers — 关键数字 + 真实账（9 steps · ~80s）
 *
 * CSS prefix: .cn-
 * Theme tokens only. No hardcoded colors / font names.
 */
export default function CostNumbersChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 三组关键比例 hero：读 10% / 写 125% / 后续省 90%
   * 视觉演示：三个 hero 数字依次砸下，每个数字下方一根填充比例条
   *           （0.10× / 1.25× / 0.10×→0 表示节省 90%）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="cn-s0" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">Three numbers · the price tag</span>
        </div>

        <h2 className="cn-headline cn-headline-numbers">
          <MaskReveal show duration={900}>
            <span className="cn-zh">命中</span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="cn-zh cn-em">打一折</span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="cn-zh">，首次贵 25%，</span>
          </MaskReveal>
          <MaskReveal show delay={1000} duration={900}>
            <span className="cn-zh cn-em-soft">后面每次省 90%。</span>
          </MaskReveal>
        </h2>

        <ThreeRatios />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — TTL 时钟：5 分钟默认 / 自动续期 / 1 小时付费档
   * 视觉演示：两个 SVG 时钟（5 min / 1 hour），左边带 auto-renew 旋转环，
   *           右边带 PAID 角标
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="cn-s1" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">TTL · how long it lives</span>
        </div>

        <h2 className="cn-headline cn-headline-ttl">
          <MaskReveal show duration={900}>
            <span className="cn-zh">默认</span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="cn-zh cn-em">5 分钟</span>
          </MaskReveal>
          <MaskReveal show delay={600} duration={900}>
            <span className="cn-zh">，命中就续。</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={950} duration={900}>
            <span className="cn-zh cn-em-soft">想长一点？1 小时付费档。</span>
          </MaskReveal>
        </h2>

        <TTLClocks />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 门槛卡：Sonnet 4 / Opus 4 = 1024；Opus 4.5+ = 4096
   * 视觉演示：两张 model 卡，每张含 token bar 与 minimum 标线，旁边一条
   *           「短 prompt 命中失败」的灰化示例
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="cn-s2" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">Minimum cacheable length</span>
        </div>

        <h2 className="cn-headline cn-headline-floor">
          <MaskReveal show duration={900}>
            <span className="cn-zh">内容太短，</span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="cn-zh cn-em">缓存不上。</span>
          </MaskReveal>
        </h2>

        <ThresholdCards />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 案例 hero：10 万字的长对话
   * 视觉演示：超大 100K hero 数字 + 3 个参数标签（model / context / pricing）
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="cn-s3" className="cn-scene cn-scene-center">
        <div className="cn-case-hero">
          <div className="cn-case-kicker">
            <span className="cn-tag-dot" />
            <span className="cn-tag-text">A real bill · let&apos;s do the math</span>
          </div>
          <div className="cn-case-num">
            <span className="cn-case-num-fig hero-num">100,000</span>
            <span className="cn-case-num-unit">tokens</span>
          </div>
          <div className="cn-case-zh">
            <MaskReveal show delay={200} duration={1100}>
              <span className="cn-zh">≈ </span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={1100}>
              <span className="cn-zh cn-em">10 万字</span>
            </MaskReveal>
            <MaskReveal show delay={800} duration={1100}>
              <span className="cn-zh"> 的长对话</span>
            </MaskReveal>
          </div>
          <CaseParams />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 不开缓存账单：每轮 0.30 美金
   * 视觉演示：发票/账单条，4 行 ROUND 都标 $0.30，REPRICED FROM SCRATCH
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="cn-s4" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">Without cache · the dumb bill</span>
        </div>
        <h2 className="cn-headline cn-headline-billA">
          <MaskReveal show duration={900}>
            <span className="cn-zh">每轮 prefill 都从头算 — </span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="cn-zh cn-em">每轮 $0.30</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="cn-zh">。</span>
          </MaskReveal>
        </h2>
        <BillNoCache />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 5 — 开缓存账单：首次 0.375，之后 0.03
   * 视觉演示：发票，第 1 行写入 $0.375 标 WRITE +25%，第 2-N 行 $0.03 标 HIT 10%
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="cn-s5" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">With cache · the smart bill</span>
        </div>
        <h2 className="cn-headline cn-headline-billB">
          <MaskReveal show duration={900}>
            <span className="cn-zh">首次写入 </span>
          </MaskReveal>
          <MaskReveal show delay={300} duration={900}>
            <span className="cn-zh cn-em">$0.375</span>
          </MaskReveal>
          <MaskReveal show delay={600} duration={900}>
            <span className="cn-zh">，之后每轮 </span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={900}>
            <span className="cn-zh cn-em">$0.03</span>
          </MaskReveal>
          <MaskReveal show delay={1200} duration={900}>
            <span className="cn-zh">。</span>
          </MaskReveal>
        </h2>
        <BillWithCache />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 节省 hero：10 轮 → 省约 90%
   * 视觉演示：上下两根成本横条对比 — 上 $3.00 跑满，下 $0.65 仅 22%；
   *           右侧 hero "−90%"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="cn-s6" className="cn-scene cn-scene-center">
        <div className="cn-savings">
          <div className="cn-savings-kicker">
            <span className="cn-tag-dot" />
            <span className="cn-tag-text">10 rounds · the bottom line</span>
          </div>
          <SavingsBars />
          <div className="cn-savings-hero">
            <span className="cn-savings-minus">−</span>
            <span className="cn-savings-pct hero-num">90</span>
            <span className="cn-savings-percent">%</span>
          </div>
          <div className="cn-savings-foot">
            <MaskReveal show delay={1800} duration={900}>
              <span className="cn-zh cn-em-soft">10 轮 · input 成本 ≈ 一折</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 延迟收益：TTFT 显著下降
   * 视觉演示：两根 TTFT 横条对比（不开缓存长 / 开缓存短），
   *           数字递减动画从基线砸到末端
   * ──────────────────────────────────────────────────────────────── */
  if (step === 7) {
    return (
      <div key="cn-s7" className="cn-scene">
        <div className="cn-step-tag">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">Latency · TTFT also drops</span>
        </div>

        <h2 className="cn-headline cn-headline-ttft">
          <MaskReveal show duration={900}>
            <span className="cn-zh">不光省钱 — </span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={900}>
            <span className="cn-zh cn-em">第一个字</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={900}>
            <span className="cn-zh">出得也更快。</span>
          </MaskReveal>
        </h2>

        <TTFTBars />

        <div className="cn-ttft-foot">
          <MaskReveal show delay={3800} duration={700}>
            <span className="cn-zh cn-em-soft">
              不用重算的部分越多 · TTFT 越短
            </span>
          </MaskReveal>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 8 — 桥梁 hero：7 条经验都在讲前缀命中
   * 视觉演示：hero 双行大字 + 7 个数字 chip 依次点亮
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="cn-s8" className="cn-scene cn-scene-center">
      <div className="cn-bridge">
        <div className="cn-bridge-kicker">
          <span className="cn-tag-dot" />
          <span className="cn-tag-text">Coming up · 7 lessons, one idea</span>
        </div>

        <h1 className="cn-bridge-hero">
          <MaskReveal show duration={1100}>
            <span className="cn-zh">下面 </span>
          </MaskReveal>
          <MaskReveal show delay={350} duration={1100}>
            <span className="cn-zh cn-em">7 条经验</span>
          </MaskReveal>
          <MaskReveal show delay={700} duration={1100}>
            <span className="cn-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1100} duration={1100}>
            <span className="cn-zh">都在讲一件事 —</span>
          </MaskReveal>
        </h1>

        <div className="cn-bridge-sub">
          <MaskReveal show delay={1700} duration={1100}>
            <span className="cn-zh">怎么让前缀</span>
          </MaskReveal>
          <MaskReveal show delay={2050} duration={1100}>
            <span className="cn-zh cn-em">尽可能多</span>
          </MaskReveal>
          <MaskReveal show delay={2400} duration={1100}>
            <span className="cn-zh">地命中缓存。</span>
          </MaskReveal>
        </div>

        <SevenChips />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ThreeRatios (step 0)
 * 三个 hero 数字 + 比例条；READ 10% (短) / WRITE 125% (溢出) / SAVE 90% (倒着填)
 * ────────────────────────────────────────────────────────────────── */
function ThreeRatios() {
  const cols = [
    {
      kicker: "READ · cache hit",
      lead: "×",
      num: "0.10",
      unit: "of base price",
      ratio: 10,
      caption: "命中后只付 10%",
      barClass: "cn-ratio-bar-read",
      delay: 300,
    },
    {
      kicker: "WRITE · first call",
      lead: "×",
      num: "1.25",
      unit: "of base price",
      ratio: 125,
      caption: "首次贵 25%",
      barClass: "cn-ratio-bar-write",
      delay: 1100,
    },
    {
      kicker: "EVERY HIT AFTER",
      lead: "−",
      num: "90",
      unit: "% of input cost",
      ratio: 90,
      caption: "之后每次省 90%",
      barClass: "cn-ratio-bar-save",
      delay: 1900,
    },
  ];
  return (
    <div className="cn-ratios">
      {cols.map((c, i) => (
        <div
          key={c.kicker}
          className="cn-ratio"
          style={
            { "--ratio-delay": `${c.delay}ms` } as React.CSSProperties
          }
        >
          <div className="cn-ratio-kicker">{c.kicker}</div>
          <div className="cn-ratio-num">
            <span className="cn-ratio-lead">{c.lead}</span>
            <span className="cn-ratio-fig hero-num">{c.num}</span>
            {i === 2 && <span className="cn-ratio-percent">%</span>}
          </div>
          <div className="cn-ratio-unit">{c.unit}</div>
          <div className="cn-ratio-track">
            <div
              className={`cn-ratio-fill ${c.barClass}`}
              style={
                {
                  "--ratio-end": `${Math.min(c.ratio, 100)}%`,
                } as React.CSSProperties
              }
            />
            {c.ratio > 100 && (
              <div
                className="cn-ratio-fill cn-ratio-overflow"
                style={
                  {
                    "--ratio-end": `${c.ratio - 100}%`,
                  } as React.CSSProperties
                }
              />
            )}
            <div className="cn-ratio-baseline" />
          </div>
          <div className="cn-ratio-caption">{c.caption}</div>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: TTLClocks (step 1)
 * 两个 SVG 时钟 — 5 min 默认 + auto renew loop ; 1 hour PAID
 * ────────────────────────────────────────────────────────────────── */
function TTLClocks() {
  return (
    <div className="cn-clocks">
      <div className="cn-clock cn-clock-default">
        <div className="cn-clock-kicker">
          <span className="cn-clock-tag">DEFAULT</span>
          <span className="cn-clock-free">FREE</span>
        </div>
        <ClockSVG sweepDur="2200ms" sweepDelay="700ms" autoRenew />
        <div className="cn-clock-num">
          <span className="cn-clock-fig hero-num">5</span>
          <span className="cn-clock-unit">min</span>
        </div>
        <div className="cn-clock-foot">命中即续 · 不额外收钱</div>
      </div>

      <div className="cn-clock cn-clock-paid">
        <div className="cn-clock-kicker">
          <span className="cn-clock-tag cn-clock-tag-paid">PAID TIER</span>
          <span className="cn-clock-pricetag">$</span>
        </div>
        <ClockSVG sweepDur="3600ms" sweepDelay="1500ms" />
        <div className="cn-clock-num">
          <span className="cn-clock-fig hero-num">1</span>
          <span className="cn-clock-unit">hour</span>
        </div>
        <div className="cn-clock-foot">付费可选 · 长任务/批处理</div>
      </div>
    </div>
  );
}

interface ClockSVGProps {
  sweepDur: string;
  sweepDelay: string;
  autoRenew?: boolean;
}
function ClockSVG({ sweepDur, sweepDelay, autoRenew }: ClockSVGProps) {
  return (
    <div className="cn-clock-svg-wrap">
      <svg viewBox="0 0 200 200" className="cn-clock-svg" aria-hidden>
        {/* dial ticks */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
          const x1 = 100 + Math.cos(a) * 82;
          const y1 = 100 + Math.sin(a) * 82;
          const x2 = 100 + Math.cos(a) * (i % 3 === 0 ? 70 : 76);
          const y2 = 100 + Math.sin(a) * (i % 3 === 0 ? 70 : 76);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="cn-clock-tick"
            />
          );
        })}
        {/* outer rule ring */}
        <circle
          cx="100"
          cy="100"
          r="86"
          className="cn-clock-ring"
          fill="none"
        />
        {/* sweep arc — uses dasharray/offset trick to draw 0 → 360° */}
        <circle
          cx="100"
          cy="100"
          r="68"
          className="cn-clock-sweep"
          fill="none"
          style={
            {
              "--sweep-dur": sweepDur,
              "--sweep-delay": sweepDelay,
            } as React.CSSProperties
          }
          transform="rotate(-90 100 100)"
        />
        {/* center hub */}
        <circle cx="100" cy="100" r="5" className="cn-clock-hub" />
        {/* hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          className="cn-clock-hand"
          style={
            {
              "--sweep-dur": sweepDur,
              "--sweep-delay": sweepDelay,
            } as React.CSSProperties
          }
        />
      </svg>
      {autoRenew && (
        <div className="cn-clock-loop" aria-hidden>
          <svg viewBox="0 0 60 60" className="cn-clock-loop-svg">
            <path
              d="M 30 8 A 22 22 0 1 1 8 30"
              fill="none"
              className="cn-clock-loop-arc"
            />
            <polygon points="28,4 36,8 28,12" className="cn-clock-loop-tip" />
          </svg>
          <span className="cn-clock-loop-label">auto-renew</span>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ThresholdCards (step 2)
 * 两张 model 卡，每张：model 名 / token 条 / minimum 红线 / micro caption
 * ────────────────────────────────────────────────────────────────── */
function ThresholdCards() {
  const models = [
    {
      tag: "Sonnet 4 · Opus 4",
      threshold: 1024,
      hint: "the floor for older lines",
      delay: 700,
    },
    {
      tag: "Opus 4.5 +",
      threshold: 4096,
      hint: "newer models · higher floor",
      delay: 1500,
    },
  ];
  return (
    <div className="cn-thresh-wrap">
      <div className="cn-thresh-cards">
        {models.map((m, i) => (
          <div
            key={m.tag}
            className="cn-thresh-card"
            style={{ "--thr-delay": `${m.delay}ms` } as React.CSSProperties}
          >
            <div className="cn-thresh-card-head">
              <div className="cn-thresh-model">{m.tag}</div>
              <div className="cn-thresh-min">
                <span className="cn-thresh-min-label">MIN</span>
                <span className="cn-thresh-min-num hero-num">
                  {m.threshold.toLocaleString()}
                </span>
                <span className="cn-thresh-min-unit">tokens</span>
              </div>
            </div>
            <div className="cn-thresh-meter">
              <div className="cn-thresh-meter-track" />
              <div
                className="cn-thresh-meter-min"
                style={
                  {
                    left: `${(m.threshold / 6000) * 100}%`,
                    "--thr-delay": `${m.delay + 500}ms`,
                  } as React.CSSProperties
                }
              >
                <span className="cn-thresh-meter-min-line" />
                <span className="cn-thresh-meter-min-cap">cache floor</span>
              </div>
              <div className="cn-thresh-meter-scale">
                <span style={{ left: "0%" }}>0</span>
                <span style={{ left: "33%" }}>2K</span>
                <span style={{ left: "66%" }}>4K</span>
                <span style={{ left: "100%" }}>6K</span>
              </div>
            </div>
            <div className="cn-thresh-hint">{m.hint}</div>
            {i === 1 && (
              <div className="cn-thresh-stamp">
                <span className="cn-thresh-stamp-line" />
                <span className="cn-thresh-stamp-text">+3072 tokens</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="cn-thresh-shortprompt">
        <div className="cn-thresh-short-label">short prompt · &lt; 1024 tk</div>
        <div className="cn-thresh-short-bar">
          <span className="cn-thresh-short-fill" />
          <span className="cn-thresh-short-x">no cache</span>
        </div>
        <div className="cn-thresh-short-zh">
          短 prompt 没缓存的份 — 直接走完整 prefill
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CaseParams (step 3)
 * 三个参数 chip：model / pricing / context
 * ────────────────────────────────────────────────────────────────── */
function CaseParams() {
  const params = [
    { k: "model", v: "Claude Sonnet" },
    { k: "input price", v: "$3 / MTok" },
    { k: "context", v: "100K tokens · long chat" },
  ];
  return (
    <div className="cn-case-params">
      {params.map((p, i) => (
        <div
          key={p.k}
          className="cn-case-param"
          style={{ "--p-delay": `${1400 + i * 220}ms` } as React.CSSProperties}
        >
          <span className="cn-case-param-key">{p.k}</span>
          <span className="cn-case-param-val">{p.v}</span>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: BillNoCache (step 4)
 * 一张账单：4 行 ROUND × $0.30，TOTAL 高亮
 * ────────────────────────────────────────────────────────────────── */
function BillNoCache() {
  const rounds = [1, 2, 3, 4];
  return (
    <div className="cn-bill cn-bill-no">
      <div className="cn-bill-head">
        <span className="cn-bill-meta">RECEIPT · WITHOUT CACHE</span>
        <span className="cn-bill-meta">10 rounds · est.</span>
      </div>
      <div className="cn-bill-rows">
        {rounds.map((r, i) => (
          <div
            key={r}
            className="cn-bill-row"
            style={
              { "--row-delay": `${1400 + i * 280}ms` } as React.CSSProperties
            }
          >
            <span className="cn-bill-row-label">
              ROUND {String(r).padStart(2, "0")}
            </span>
            <span className="cn-bill-row-tag">prefill · 100K tokens</span>
            <span className="cn-bill-row-amt">$0.30</span>
          </div>
        ))}
        <div
          className="cn-bill-row cn-bill-row-ellipsis"
          style={{ "--row-delay": `${1400 + 4 * 280}ms` } as React.CSSProperties}
        >
          <span className="cn-bill-row-label">…</span>
          <span className="cn-bill-row-tag">repeat ×6 more</span>
          <span className="cn-bill-row-amt">$0.30</span>
        </div>
      </div>
      <div
        className="cn-bill-total"
        style={{ "--row-delay": `${3100}ms` } as React.CSSProperties}
      >
        <span className="cn-bill-total-label">TOTAL · 10 rounds</span>
        <span className="cn-bill-total-amt cn-bill-total-amt-bad hero-num">
          $3.00
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: BillWithCache (step 5)
 * 一张账单：第 1 行 WRITE $0.375 / 之后 HIT $0.03 + 总计 ~$0.65
 * ────────────────────────────────────────────────────────────────── */
function BillWithCache() {
  const hits = [2, 3, 4];
  return (
    <div className="cn-bill cn-bill-yes">
      <div className="cn-bill-head">
        <span className="cn-bill-meta">RECEIPT · WITH CACHE</span>
        <span className="cn-bill-meta">10 rounds · est.</span>
      </div>
      <div className="cn-bill-rows">
        <div
          className="cn-bill-row cn-bill-row-write"
          style={{ "--row-delay": `${1500}ms` } as React.CSSProperties}
        >
          <span className="cn-bill-row-label">ROUND 01</span>
          <span className="cn-bill-row-tag cn-bill-row-tag-write">
            WRITE · 1.25× base
          </span>
          <span className="cn-bill-row-amt">$0.375</span>
        </div>
        {hits.map((r, i) => (
          <div
            key={r}
            className="cn-bill-row cn-bill-row-hit"
            style={
              { "--row-delay": `${2100 + i * 220}ms` } as React.CSSProperties
            }
          >
            <span className="cn-bill-row-label">
              ROUND {String(r).padStart(2, "0")}
            </span>
            <span className="cn-bill-row-tag cn-bill-row-tag-hit">
              HIT · 0.10× base
            </span>
            <span className="cn-bill-row-amt">$0.03</span>
          </div>
        ))}
        <div
          className="cn-bill-row cn-bill-row-ellipsis"
          style={{ "--row-delay": `${2900}ms` } as React.CSSProperties}
        >
          <span className="cn-bill-row-label">…</span>
          <span className="cn-bill-row-tag cn-bill-row-tag-hit">
            repeat ×6 more
          </span>
          <span className="cn-bill-row-amt">$0.03</span>
        </div>
      </div>
      <div
        className="cn-bill-total"
        style={{ "--row-delay": `${3300}ms` } as React.CSSProperties}
      >
        <span className="cn-bill-total-label">TOTAL · 10 rounds</span>
        <span className="cn-bill-total-amt cn-bill-total-amt-good hero-num">
          ≈ $0.65
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: SavingsBars (step 6)
 * 两根成本横条：上 $3.00 跑满，下 $0.65 仅 ~22%
 * ────────────────────────────────────────────────────────────────── */
function SavingsBars() {
  return (
    <div className="cn-sb">
      <div className="cn-sb-row cn-sb-row-bad">
        <div className="cn-sb-label">
          <span className="cn-sb-label-tag">WITHOUT CACHE</span>
          <span className="cn-sb-label-amt">$3.00</span>
        </div>
        <div className="cn-sb-track">
          <div className="cn-sb-fill cn-sb-fill-bad" />
        </div>
      </div>
      <div className="cn-sb-row cn-sb-row-good">
        <div className="cn-sb-label">
          <span className="cn-sb-label-tag cn-sb-label-tag-good">
            WITH CACHE
          </span>
          <span className="cn-sb-label-amt">≈ $0.65</span>
        </div>
        <div className="cn-sb-track">
          <div className="cn-sb-fill cn-sb-fill-good" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: TTFTBars (step 7)
 * 两根 TTFT 横条 — without cache 长 / with cache 短，数字定格
 * ────────────────────────────────────────────────────────────────── */
function TTFTBars() {
  return (
    <div className="cn-ttft">
      <div className="cn-ttft-row cn-ttft-row-slow">
        <div className="cn-ttft-side">
          <span className="cn-ttft-side-tag">WITHOUT CACHE</span>
          <span className="cn-ttft-side-sub">full prefill on every turn</span>
        </div>
        <div className="cn-ttft-bar">
          <span className="cn-ttft-fill cn-ttft-fill-slow" />
          <span className="cn-ttft-num cn-ttft-num-slow hero-num">~3.0s</span>
        </div>
      </div>
      <div className="cn-ttft-row cn-ttft-row-fast">
        <div className="cn-ttft-side">
          <span className="cn-ttft-side-tag cn-ttft-side-tag-fast">
            WITH CACHE
          </span>
          <span className="cn-ttft-side-sub">reuse · skip prefix encode</span>
        </div>
        <div className="cn-ttft-bar">
          <span className="cn-ttft-fill cn-ttft-fill-fast" />
          <span className="cn-ttft-num cn-ttft-num-fast hero-num">~0.6s</span>
        </div>
      </div>
      <div className="cn-ttft-axis">
        <span className="cn-ttft-axis-tick" style={{ left: "0%" }}>
          0s
        </span>
        <span className="cn-ttft-axis-tick" style={{ left: "33%" }}>
          1s
        </span>
        <span className="cn-ttft-axis-tick" style={{ left: "66%" }}>
          2s
        </span>
        <span className="cn-ttft-axis-tick" style={{ left: "100%" }}>
          3s
        </span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: SevenChips (step 8)
 * 7 个序号 chip 依次点亮，最末一个挂 "→" 表示进入下一章
 * ────────────────────────────────────────────────────────────────── */
function SevenChips() {
  return (
    <div className="cn-chips">
      {Array.from({ length: 7 }, (_, i) => (
        <div
          key={i}
          className="cn-chip"
          style={{ "--chip-delay": `${3000 + i * 180}ms` } as React.CSSProperties}
        >
          <span className="cn-chip-num">{String(i + 1).padStart(2, "0")}</span>
        </div>
      ))}
      <div
        className="cn-chips-arrow"
        style={{ "--chip-delay": `${4400}ms` } as React.CSSProperties}
      >
        →
      </div>
    </div>
  );
}
