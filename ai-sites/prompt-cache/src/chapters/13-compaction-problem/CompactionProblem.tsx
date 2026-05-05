import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./CompactionProblem.css";

/**
 * Chapter 13 · compaction-problem — 压缩的麻烦（5 steps · ~44s）
 *
 * CSS prefix: .cps-
 * Theme tokens only. No hardcoded colors / font names.
 *
 * 这章只讲"问题"，不讲解法 —— 解法在 Ch14 (cache-safe-forking)。
 * 节奏：标识 → 场景 → 朴素错误做法 → 双链断 → 成本警告
 */
export default function CompactionProblemChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 章节标识 hero
   * 视觉演示：编号牌（"LESSON 7 / 7"）+ 中文 hero + 英文副名 +
   *           "技术上最巧妙的一条" 印刷感装饰副标
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="cps-s0" className="cps-scene cps-scene-center">
        <div className="cps-finale">
          <div className="cps-finale-index">
            <span className="cps-finale-index-label">LESSON</span>
            <span className="cps-finale-index-num">07</span>
            <span className="cps-finale-index-of">/ 07</span>
          </div>

          <div className="cps-finale-rule" />

          <div className="cps-finale-kicker">
            <MaskReveal show duration={900}>
              <span className="cps-zh cps-em-soft">最后一条 ——</span>
            </MaskReveal>
          </div>

          <h1 className="cps-finale-hero">
            <MaskReveal show delay={400} duration={1100}>
              <span className="cps-zh">上下文</span>
            </MaskReveal>
            <MaskReveal show delay={760} duration={1100}>
              <span className="cps-zh cps-em">压缩</span>
            </MaskReveal>
            <MaskReveal show delay={1120} duration={1100}>
              <span className="cps-zh">。</span>
            </MaskReveal>
          </h1>

          <div className="cps-finale-en">
            <MaskReveal show delay={1500} duration={900}>
              <span className="cps-en">Context Compaction</span>
            </MaskReveal>
          </div>

          <div className="cps-finale-foot">
            <span className="cps-finale-foot-orn">❛</span>
            <MaskReveal show delay={2200} duration={900}>
              <span className="cps-zh cps-em-soft">技术上</span>
            </MaskReveal>
            <MaskReveal show delay={2500} duration={900}>
              <span className="cps-zh">最巧妙的一条</span>
            </MaskReveal>
            <span className="cps-finale-foot-orn">❜</span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 场景：上下文窗口填满 → 压缩腾空间
   * 视觉演示：进度条从 0 → 95% 填满（红色警告区），上方 token 计数
   *           跳动；填满后右侧出现 compact() 操作 → 压缩成 summary
   *           占用率回落到约 30%
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="cps-s1" className="cps-scene">
        <div className="cps-step-tag">
          <span className="cps-tag-dot" />
          <span className="cps-tag-text">The Setup · Context Window Fills Up</span>
        </div>

        <h2 className="cps-headline cps-headline-setup">
          <MaskReveal show duration={900}>
            <span className="cps-zh">长对话跑久了，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={420} duration={900}>
            <span className="cps-en cps-em">context window</span>
          </MaskReveal>
          <MaskReveal show delay={760} duration={900}>
            <span className="cps-zh"> 会被</span>
          </MaskReveal>
          <MaskReveal show delay={1080} duration={900}>
            <span className="cps-zh cps-em-soft">填满</span>
          </MaskReveal>
          <MaskReveal show delay={1380} duration={900}>
            <span className="cps-zh">。</span>
          </MaskReveal>
        </h2>

        <ContextWindowMeter />

        <div className="cps-setup-foot">
          <span className="cps-setup-foot-arrow">↘</span>
          <span className="cps-setup-foot-text">
            把之前的对话压缩成<em>摘要</em>，腾出空间继续聊
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 朴素错误做法
   * 视觉演示：两个 API 请求面板并排：
   *           LEFT  · MAIN CONVO REQ  (system_main / tools[14] / history)
   *           RIGHT · NAIVE COMPACT REQ (system "总结" / tools ∅ / history)
   *           三条 diff 线依次连接两侧字段并标 ✗
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="cps-s2" className="cps-scene">
        <div className="cps-step-tag cps-step-tag-bad">
          <span className="cps-tag-dot cps-tag-dot-bad" />
          <span className="cps-tag-text">The Naive Mistake</span>
        </div>

        <h2 className="cps-headline cps-headline-naive">
          <MaskReveal show duration={900}>
            <span className="cps-zh">另起请求做压缩，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={420} duration={900}>
            <span className="cps-zh">从第一个字开始，</span>
          </MaskReveal>
          <MaskReveal show delay={760} duration={900}>
            <span className="cps-zh cps-em">就跟主对话对不上了</span>
          </MaskReveal>
          <MaskReveal show delay={1080} duration={900}>
            <span className="cps-zh">。</span>
          </MaskReveal>
        </h2>

        <NaiveDiffPanels />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 双链断（短拍）
   * 视觉演示：两条平行的缓存链（CHAIN A / CHAIN B），中间一条
   *           断裂线 + 巨大 ⚡ 不复用标识 —— 快速一拳
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="cps-s3" className="cps-scene cps-scene-center">
        <div className="cps-broken">
          <ChainA />
          <div className="cps-broken-gap">
            <span className="cps-broken-cross">×</span>
            <span className="cps-broken-label">no reuse</span>
          </div>
          <ChainB />

          <div className="cps-broken-tagline">
            <MaskReveal show delay={600} duration={800}>
              <span className="cps-zh">两条缓存链，</span>
            </MaskReveal>
            <MaskReveal show delay={1100} duration={800}>
              <span className="cps-zh cps-em">互相不复用</span>
            </MaskReveal>
            <MaskReveal show delay={1500} duration={800}>
              <span className="cps-zh">。</span>
            </MaskReveal>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 成本警告：完整价 + 没有缓存折扣
   * 视觉演示：左：账单 / 收据视图，"NO CACHE DISCOUNT" 印章砸下
   *           右：折线图 —— x 轴对话长度 / y 轴成本，曲线陡升
   *           底部 hero 副标"对话越长越贵"
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="cps-s4" className="cps-scene">
      <div className="cps-step-tag cps-step-tag-bad">
        <span className="cps-tag-dot cps-tag-dot-bad" />
        <span className="cps-tag-text">The Bill</span>
      </div>

      <h2 className="cps-headline cps-headline-cost">
        <MaskReveal show duration={900}>
          <span className="cps-zh">付的是</span>
        </MaskReveal>
        <MaskReveal show delay={320} duration={900}>
          <span className="cps-zh cps-em">完整</span>
        </MaskReveal>
        <MaskReveal show delay={620} duration={900}>
          <span className="cps-zh">、</span>
        </MaskReveal>
        <MaskReveal show delay={920} duration={900}>
          <span className="cps-zh cps-em">没有缓存折扣</span>
        </MaskReveal>
        <MaskReveal show delay={1300} duration={900}>
          <span className="cps-zh">的费用。</span>
        </MaskReveal>
      </h2>

      <div className="cps-cost-grid">
        <ReceiptCard />
        <CostCurve />
      </div>

      <div className="cps-cost-tagline">
        <MaskReveal show delay={6000} duration={900}>
          <span className="cps-zh cps-em-soft">对话越</span>
        </MaskReveal>
        <MaskReveal show delay={6300} duration={900}>
          <span className="cps-zh cps-em">长</span>
        </MaskReveal>
        <MaskReveal show delay={6600} duration={900}>
          <span className="cps-zh cps-em-soft">，</span>
        </MaskReveal>
        <MaskReveal show delay={6900} duration={900}>
          <span className="cps-zh cps-em-soft">这次调用越</span>
        </MaskReveal>
        <MaskReveal show delay={7300} duration={900}>
          <span className="cps-zh cps-em">贵</span>
        </MaskReveal>
        <MaskReveal show delay={7700} duration={900}>
          <span className="cps-zh">。</span>
        </MaskReveal>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ContextWindowMeter (step 1)
 * 一根大进度条从 0 → 95%（红警），上方有 token 计数 + AT CAPACITY 标
 * 旁边出一个 "compact()" 箭头，把条变成 ~30% 的 summary 短条
 * ────────────────────────────────────────────────────────────────── */
function ContextWindowMeter() {
  return (
    <div className="cps-meter" aria-hidden>
      <div className="cps-meter-row cps-meter-row-before">
        <div className="cps-meter-head">
          <span className="cps-meter-label">context window</span>
          <span className="cps-meter-count">
            <span className="cps-meter-count-num">200,000</span>
            <span className="cps-meter-count-unit"> tokens</span>
          </span>
        </div>
        <div className="cps-meter-bar">
          <div className="cps-meter-fill" />
          <div className="cps-meter-cap-line" />
          <div className="cps-meter-cap-warn">AT CAPACITY · 95%</div>
        </div>
        <div className="cps-meter-axis">
          <span>0</span>
          <span>50K</span>
          <span>100K</span>
          <span>150K</span>
          <span className="cps-meter-axis-end">200K</span>
        </div>
      </div>

      <div className="cps-meter-arrow">
        <span className="cps-meter-arrow-stem" />
        <span className="cps-meter-arrow-label">compact()</span>
        <span className="cps-meter-arrow-head">▼</span>
      </div>

      <div className="cps-meter-row cps-meter-row-after">
        <div className="cps-meter-head">
          <span className="cps-meter-label">summary · 摘要</span>
          <span className="cps-meter-count">
            <span className="cps-meter-count-num">~60,000</span>
            <span className="cps-meter-count-unit"> tokens</span>
          </span>
        </div>
        <div className="cps-meter-bar">
          <div className="cps-meter-fill cps-meter-fill-after" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: NaiveDiffPanels (step 2)
 * 两个伪 API 请求面板：MAIN CONVO REQ / NAIVE COMPACT REQ
 * 三条字段 diff 线连接：system_prompt / tools / first_user_msg
 *   每条线伴随 "✗ MISMATCH" 戳错标
 * ────────────────────────────────────────────────────────────────── */
function NaiveDiffPanels() {
  return (
    <div className="cps-panels" aria-hidden>
      {/* LEFT — main conversation request (the cached one) */}
      <div className="cps-panel cps-panel-left">
        <div className="cps-panel-head">
          <span className="cps-panel-tag">MAIN CONVO · REQ</span>
          <span className="cps-panel-status cps-panel-status-cached">cached ✓</span>
        </div>
        <div className="cps-panel-body">
          <div className="cps-field cps-field-sys" data-diff="0">
            <span className="cps-field-key">system_prompt</span>
            <span className="cps-field-val">"You are Claude, a helpful agent…"</span>
          </div>
          <div className="cps-field cps-field-tools" data-diff="1">
            <span className="cps-field-key">tools</span>
            <span className="cps-field-val">
              <span className="cps-pill">read_file</span>
              <span className="cps-pill">edit</span>
              <span className="cps-pill">bash</span>
              <span className="cps-pill cps-pill-more">+11</span>
            </span>
          </div>
          <div className="cps-field cps-field-msg" data-diff="2">
            <span className="cps-field-key">history[0]</span>
            <span className="cps-field-val">"帮我重构 auth 模块…"</span>
          </div>
          <div className="cps-field">
            <span className="cps-field-key">history[1..N]</span>
            <span className="cps-field-val cps-field-val-mute">… 长对话 …</span>
          </div>
        </div>
      </div>

      {/* center diff column with 3 mismatches */}
      <div className="cps-diff-column">
        <div className="cps-diff-line cps-diff-line-1">
          <span className="cps-diff-mark">✗</span>
          <span className="cps-diff-label">prompt 不同</span>
        </div>
        <div className="cps-diff-line cps-diff-line-2">
          <span className="cps-diff-mark">✗</span>
          <span className="cps-diff-label">tools 缺失</span>
        </div>
        <div className="cps-diff-line cps-diff-line-3">
          <span className="cps-diff-mark">✗</span>
          <span className="cps-diff-label">第一条就分叉</span>
        </div>
      </div>

      {/* RIGHT — naive compaction request */}
      <div className="cps-panel cps-panel-right">
        <div className="cps-panel-head">
          <span className="cps-panel-tag cps-panel-tag-bad">NAIVE COMPACT · REQ</span>
          <span className="cps-panel-status cps-panel-status-miss">miss ✗</span>
        </div>
        <div className="cps-panel-body">
          <div className="cps-field cps-field-sys cps-field-bad" data-diff="0">
            <span className="cps-field-key">system_prompt</span>
            <span className="cps-field-val cps-field-val-bad">"请总结以下对话…"</span>
          </div>
          <div className="cps-field cps-field-tools cps-field-bad" data-diff="1">
            <span className="cps-field-key">tools</span>
            <span className="cps-field-val cps-field-val-empty">
              <span className="cps-pill cps-pill-empty">∅ none</span>
            </span>
          </div>
          <div className="cps-field cps-field-msg cps-field-bad" data-diff="2">
            <span className="cps-field-key">history[0]</span>
            <span className="cps-field-val cps-field-val-bad">"帮我重构 auth 模块…"</span>
          </div>
          <div className="cps-field">
            <span className="cps-field-key">history[1..N]</span>
            <span className="cps-field-val cps-field-val-mute">… 整段对话原文 …</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ChainA / ChainB (step 3)
 * 两条横向链，每条 5 个方块，链接符号 "—" 串联；上下分开
 * ────────────────────────────────────────────────────────────────── */
function ChainA() {
  return (
    <div className="cps-chain cps-chain-a" aria-hidden>
      <div className="cps-chain-tag">CHAIN A · main conversation</div>
      <div className="cps-chain-row">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="cps-chain-link"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="cps-chain-link-num">#{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChainB() {
  return (
    <div className="cps-chain cps-chain-b" aria-hidden>
      <div className="cps-chain-tag">CHAIN B · naive compaction</div>
      <div className="cps-chain-row">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="cps-chain-link cps-chain-link-b"
            style={{ animationDelay: `${300 + i * 60}ms` }}
          >
            <div className="cps-chain-link-num">#{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ReceiptCard (step 4)
 * 一张伪收据 / 账单卡：列出整段对话的 input token 费用，
 * 全无缓存折扣 → "NO CACHE DISCOUNT" 红章砸下来
 * ────────────────────────────────────────────────────────────────── */
function ReceiptCard() {
  return (
    <div className="cps-receipt" aria-hidden>
      <div className="cps-receipt-head">
        <span className="cps-receipt-title">naive_compaction.invoice</span>
        <span className="cps-receipt-meta">REQ · 200K tokens</span>
      </div>
      <div className="cps-receipt-body">
        <div className="cps-receipt-line">
          <span className="cps-receipt-key">input · system + tools</span>
          <span className="cps-receipt-val">200K × $3.00 / Mtok</span>
        </div>
        <div className="cps-receipt-line cps-receipt-line-strike">
          <span className="cps-receipt-key">cache hit discount</span>
          <span className="cps-receipt-val">— 90%</span>
        </div>
        <div className="cps-receipt-line cps-receipt-line-total">
          <span className="cps-receipt-key">total this call</span>
          <span className="cps-receipt-val cps-receipt-val-total">$0.60</span>
        </div>
      </div>
      <div className="cps-receipt-stamp">
        <span className="cps-receipt-stamp-line">NO CACHE</span>
        <span className="cps-receipt-stamp-line cps-receipt-stamp-line-2">DISCOUNT</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: CostCurve (step 4)
 * 二维折线图：x = 对话长度（轮次），y = 单次压缩调用成本
 * 曲线陡峭上升 + 数据点逐个亮起
 * ────────────────────────────────────────────────────────────────── */
function CostCurve() {
  // points hand-tuned to feel exponential, not linear
  const points: Array<[number, number, string]> = [
    [0.05, 0.92, "5轮"],
    [0.22, 0.82, "20轮"],
    [0.42, 0.66, "60轮"],
    [0.62, 0.42, "120轮"],
    [0.82, 0.18, "200轮"],
    [0.96, 0.05, "需压缩"],
  ];
  // build polyline path coordinates in 600x300 viewBox
  const VW = 600;
  const VH = 300;
  const PAD_L = 56;
  const PAD_R = 12;
  const PAD_T = 16;
  const PAD_B = 40;
  const px = (x: number) => PAD_L + x * (VW - PAD_L - PAD_R);
  const py = (y: number) => PAD_T + y * (VH - PAD_T - PAD_B);
  const polyline = points.map(([x, y]) => `${px(x)},${py(y)}`).join(" ");

  return (
    <div className="cps-curve" aria-hidden>
      <div className="cps-curve-head">
        <span className="cps-curve-title">cost / compaction call</span>
        <span className="cps-curve-axis-y">$ →</span>
      </div>
      <svg
        className="cps-curve-svg"
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="none"
      >
        {/* y grid */}
        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={PAD_L}
            x2={VW - PAD_R}
            y1={py(g)}
            y2={py(g)}
            className="cps-curve-grid"
          />
        ))}
        {/* axes */}
        <line
          x1={PAD_L}
          x2={PAD_L}
          y1={PAD_T}
          y2={VH - PAD_B}
          className="cps-curve-axis"
        />
        <line
          x1={PAD_L}
          x2={VW - PAD_R}
          y1={VH - PAD_B}
          y2={VH - PAD_B}
          className="cps-curve-axis"
        />
        {/* curve */}
        <polyline points={polyline} className="cps-curve-line" />
        {/* points */}
        {points.map(([x, y, label], i) => (
          <g key={i} style={{ animationDelay: `${1800 + i * 280}ms` }} className="cps-curve-pt">
            <circle cx={px(x)} cy={py(y)} r={6} className="cps-curve-pt-dot" />
            <text x={px(x)} y={VH - PAD_B + 22} className="cps-curve-pt-label">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
