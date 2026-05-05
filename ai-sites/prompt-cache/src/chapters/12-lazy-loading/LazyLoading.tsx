import { MaskReveal } from "../../components/MaskReveal";
import type { ChapterStepProps } from "../../registry/types";
import "./LazyLoading.css";

/**
 * Chapter 12 · lazy-loading — 延迟加载（8 steps · ~66s）
 *
 * CSS prefix: .ll-
 * Theme tokens only. No hardcoded hex / rgb / font names.
 *
 * Each step演示 a different visual:
 *   0 · 工具墙 (50 stub tiles)              — sheer mass
 *   1 · 困境双面卡 (red X, both bad)        — dilemma
 *   2 · 解法 hero (lazy loading)           — name reveal
 *   3 · stub + defer_loading 列表           — code surfaces
 *   4 · Tool Search 三段流程                — model → search → schema
 *   5 · 前缀稳定条 (stubs unchanged)        — cache stays
 *   6 · 图书馆比喻 (catalog → shelf → book) — analogy
 *   7 · API · public 福利尾标               — open to all
 */
export default function LazyLoadingChapter({ step }: ChapterStepProps) {
  /* ────────────────────────────────────────────────────────────────
   * Step 0 — 几十个外部工具
   * 视觉：50 个 stub 工具瓦片像墙一样平铺，逐次点亮 →
   *   hero 大字 "几十个" + 副标 "MCP · External Tools · ~50"
   * ──────────────────────────────────────────────────────────────── */
  if (step === 0) {
    return (
      <div key="ll-s0" className="ll-scene">
        <ToolWall />
        <div className="ll-s0-foreground">
          <div className="ll-s0-headline">
            <MaskReveal show duration={1000}>
              <span className="ll-zh">Claude Code 可能要</span>
            </MaskReveal>
            <br />
            <MaskReveal show delay={420} duration={1000}>
              <span className="ll-zh">接入</span>
            </MaskReveal>
            <MaskReveal show delay={780} duration={1000}>
              <span className="ll-zh ll-em">几十个</span>
            </MaskReveal>
            <MaskReveal show delay={1100} duration={1000}>
              <span className="ll-zh ll-em-soft">外部工具。</span>
            </MaskReveal>
          </div>
          <div className="ll-s0-meta">
            <span className="ll-s0-counter">
              <span className="ll-s0-counter-label">tools loaded</span>
              <span className="ll-s0-counter-num hero-num">~50</span>
            </span>
            <span className="ll-s0-meta-divider" />
            <span className="ll-s0-meta-tag">
              <span className="ll-mono">MCP · External Tools</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 1 — 困境双面卡
   * 全定义塞进提示词 = 太占空间 / 按需加减 = 破坏缓存
   * 两张卡都标红 X
   * ──────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <div key="ll-s1" className="ll-scene ll-scene-center">
        <div className="ll-s1-headline">
          <MaskReveal show duration={900}>
            <span className="ll-zh">两条路 — </span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ll-zh ll-em-soft">都走不通。</span>
          </MaskReveal>
        </div>
        <DilemmaCards />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 2 — 解法 hero："延迟加载"
   * MaskReveal 大字 + mono 副标 lazy loading
   * ──────────────────────────────────────────────────────────────── */
  if (step === 2) {
    return (
      <div key="ll-s2" className="ll-scene ll-scene-center">
        <div className="ll-s2-solution">
          <div className="ll-s2-from">
            <span className="ll-mono">Anthropic · the middle way</span>
          </div>
          <h1 className="ll-s2-hero">
            <MaskReveal show duration={1100}>
              <span className="ll-zh ll-em">延迟</span>
            </MaskReveal>
            <MaskReveal show delay={500} duration={1100}>
              <span className="ll-zh ll-em">加载</span>
            </MaskReveal>
          </h1>
          <div className="ll-s2-en">
            <MaskReveal show delay={1200} duration={900}>
              <span className="ll-en">lazy loading</span>
            </MaskReveal>
          </div>
          <div className="ll-s2-rule" />
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 3 — 实现示意：stub + defer_loading: true
   * 工具列表只放轻量占位符，模型只看到工具名
   * ──────────────────────────────────────────────────────────────── */
  if (step === 3) {
    return (
      <div key="ll-s3" className="ll-scene">
        <h2 className="ll-s3-headline">
          <MaskReveal show duration={900}>
            <span className="ll-zh">每个工具只放一个</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ll-zh ll-em">轻量占位符</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="ll-zh">。</span>
          </MaskReveal>
        </h2>
        <StubList />
        <div className="ll-s3-eye">
          <span className="ll-s3-eye-icon" aria-hidden>
            <span className="ll-s3-eye-dot" />
          </span>
          <span className="ll-s3-eye-text">
            model sees <em>names only</em> · no schemas
          </span>
        </div>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 4 — 触发机制：Tool Search → 拉取完整定义
   * 三段：模型 → Tool Search → 完整 schema (展开)
   * ──────────────────────────────────────────────────────────────── */
  if (step === 4) {
    return (
      <div key="ll-s4" className="ll-scene">
        <h2 className="ll-s4-headline">
          <MaskReveal show duration={900}>
            <span className="ll-zh">真要用了？</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ll-zh">通过 </span>
          </MaskReveal>
          <MaskReveal show delay={650} duration={900}>
            <span className="ll-en ll-em">Tool Search</span>
          </MaskReveal>
          <MaskReveal show delay={900} duration={900}>
            <span className="ll-zh ll-em-soft"> 去取。</span>
          </MaskReveal>
        </h2>
        <ToolSearchFlow />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 5 — 福利说明：前缀只含 stub → 不变 → 缓存稳
   * 视觉：一根 prefix 长条上标着 [stubs..stubs..stubs] —— 加载工具时高亮独立
   * "fetch happens out of band" 不影响前缀
   * ──────────────────────────────────────────────────────────────── */
  if (step === 5) {
    return (
      <div key="ll-s5" className="ll-scene">
        <h2 className="ll-s5-headline">
          <MaskReveal show duration={900}>
            <span className="ll-zh">前缀里始终只有</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ll-zh ll-em">轻量占位符</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="ll-zh">，</span>
          </MaskReveal>
          <br />
          <MaskReveal show delay={1100} duration={900}>
            <span className="ll-zh">缓存</span>
          </MaskReveal>
          <MaskReveal show delay={1350} duration={900}>
            <span className="ll-zh ll-em-soft">稳稳的。</span>
          </MaskReveal>
        </h2>
        <PrefixStability />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 6 — 图书馆比喻：翻目录 → 找到 → 才去书架取
   * 三段并列：CATALOG (索引卡) → MATCH (定位高亮) → SHELF (书架抽出一本)
   * ──────────────────────────────────────────────────────────────── */
  if (step === 6) {
    return (
      <div key="ll-s6" className="ll-scene">
        <div className="ll-s6-kicker">
          <span className="ll-mono">An analogy · the library</span>
        </div>
        <h2 className="ll-s6-headline">
          <MaskReveal show duration={900}>
            <span className="ll-zh">先翻目录，</span>
          </MaskReveal>
          <MaskReveal show delay={400} duration={900}>
            <span className="ll-zh">找到了</span>
          </MaskReveal>
          <MaskReveal show delay={750} duration={900}>
            <span className="ll-zh ll-em-soft">才去书架取。</span>
          </MaskReveal>
        </h2>
        <LibraryAnalogy />
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * Step 7 — 福利尾标：Tool Search 已通过 API 对外开放
   * mono 大徽章 "API · public" + hero "Tool Search" + 中文副标
   * ──────────────────────────────────────────────────────────────── */
  return (
    <div key="ll-s7" className="ll-scene ll-scene-center">
      <div className="ll-s7-bonus">
        <div className="ll-s7-stamp">
          <span className="ll-s7-stamp-dot" />
          <span className="ll-s7-stamp-text">API · public</span>
        </div>
        <h1 className="ll-s7-hero">
          <MaskReveal show duration={1100}>
            <span className="ll-en ll-em">Tool Search</span>
          </MaskReveal>
        </h1>
        <div className="ll-s7-zh">
          <MaskReveal show delay={500} duration={900}>
            <span className="ll-zh">已通过</span>
          </MaskReveal>
          <MaskReveal show delay={800} duration={900}>
            <span className="ll-zh ll-em">接口对外开放</span>
          </MaskReveal>
        </div>
        <div className="ll-s7-rule" />
        <div className="ll-s7-foot">
          <MaskReveal show delay={1500} duration={900}>
            <span className="ll-zh ll-em-soft">
              开发者可以直接用 — 简化自己的工具管理。
            </span>
          </MaskReveal>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ToolWall (step 0)
 * 50 个 stub 瓦片，按 mono 字样的工具名平铺成网格，
 * 每个 staggered fade-up + 角标点亮成 accent。
 * ────────────────────────────────────────────────────────────────── */
const TOOL_NAMES = [
  "bash", "read_file", "write_file", "edit_file", "list_dir",
  "grep", "glob", "web_search", "web_fetch", "git_status",
  "git_diff", "git_commit", "git_push", "git_log", "npm_install",
  "npm_run", "pytest", "docker_run", "kubectl", "terraform",
  "aws_s3", "aws_lambda", "gcs_upload", "slack_post", "slack_dm",
  "gmail_send", "calendar_add", "notion_page", "linear_issue", "jira_create",
  "github_pr", "github_issue", "stripe_charge", "twilio_sms", "sendgrid",
  "datadog_query", "sentry_event", "grafana_panel", "pg_query", "mongo_find",
  "redis_get", "elastic_search", "openai_call", "anthropic_msg", "image_gen",
  "asana_task", "figma_export", "airtable_row", "trello_card", "zapier_run",
];

function ToolWall() {
  return (
    <div className="ll-toolwall" aria-hidden>
      <div className="ll-toolwall-grid">
        {TOOL_NAMES.map((name, i) => {
          const delay = 100 + i * 55;
          return (
            <div
              key={name}
              className="ll-tool-tile"
              style={
                {
                  "--tile-delay": `${delay}ms`,
                } as React.CSSProperties
              }
            >
              <span className="ll-tool-mark" />
              <span className="ll-tool-name">{name}</span>
            </div>
          );
        })}
      </div>
      <div className="ll-toolwall-fade" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: DilemmaCards (step 1)
 * 两张并排卡，都标红 X 戳；左边 "全塞进去" → tokens overflow，
 * 右边 "按需加减" → cache breaks
 * ────────────────────────────────────────────────────────────────── */
function DilemmaCards() {
  return (
    <div className="ll-dilemma">
      <div className="ll-dil-card ll-dil-card-a">
        <div className="ll-dil-tag">
          <span className="ll-mono">option · A</span>
        </div>
        <div className="ll-dil-title">全部完整定义塞进去</div>
        <div className="ll-dil-body">
          <div className="ll-dil-bar-stack">
            <div className="ll-dil-bar ll-dil-bar-1" />
            <div className="ll-dil-bar ll-dil-bar-2" />
            <div className="ll-dil-bar ll-dil-bar-3" />
            <div className="ll-dil-bar ll-dil-bar-4" />
            <div className="ll-dil-bar ll-dil-bar-5" />
            <div className="ll-dil-bar-overflow">overflow ▸</div>
          </div>
        </div>
        <div className="ll-dil-verdict">
          <span className="ll-dil-verdict-x">×</span>
          <span className="ll-dil-verdict-text">太占空间</span>
          <span className="ll-mono ll-dil-verdict-mono">tokens balloon</span>
        </div>
      </div>

      <div className="ll-dil-divider">
        <span className="ll-dil-vs">or</span>
      </div>

      <div className="ll-dil-card ll-dil-card-b">
        <div className="ll-dil-tag">
          <span className="ll-mono">option · B</span>
        </div>
        <div className="ll-dil-title">按需加减</div>
        <div className="ll-dil-body">
          <div className="ll-dil-cache">
            <div className="ll-dil-cache-row">
              <span className="ll-dil-cache-cell ll-is-hit" />
              <span className="ll-dil-cache-cell ll-is-hit" />
              <span className="ll-dil-cache-cell ll-is-hit" />
              <span className="ll-dil-cache-cut">✂</span>
              <span className="ll-dil-cache-cell ll-is-miss" />
              <span className="ll-dil-cache-cell ll-is-miss" />
            </div>
            <div className="ll-dil-cache-label">prefix · invalidated</div>
          </div>
        </div>
        <div className="ll-dil-verdict">
          <span className="ll-dil-verdict-x">×</span>
          <span className="ll-dil-verdict-text">破坏缓存</span>
          <span className="ll-mono ll-dil-verdict-mono">cache breaks</span>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: StubList (step 3)
 * 一份 mono 风格的工具列表，每项形如：
 *   { name: "bash", stub: true, defer_loading: true }
 * stub / defer_loading 是 accent 高亮 token，逐项揭示
 * ────────────────────────────────────────────────────────────────── */
function StubList() {
  const stubs = [
    "bash",
    "git_commit",
    "web_search",
    "slack_post",
    "pg_query",
  ];
  return (
    <div className="ll-stub-list">
      <div className="ll-stub-header">
        <span className="ll-mono">tools.json</span>
        <span className="ll-stub-header-meta">
          <span className="ll-mono">5 of ~50 shown</span>
        </span>
      </div>
      <div className="ll-stub-rows">
        {stubs.map((name, i) => {
          const delay = 700 + i * 280;
          return (
            <div
              key={name}
              className="ll-stub-row"
              style={
                {
                  "--row-delay": `${delay}ms`,
                } as React.CSSProperties
              }
            >
              <span className="ll-stub-brace">{"{"}</span>
              <span className="ll-stub-key">name</span>
              <span className="ll-stub-colon">:</span>
              <span className="ll-stub-val">"{name}"</span>
              <span className="ll-stub-comma">,</span>
              <span className="ll-stub-key">stub</span>
              <span className="ll-stub-colon">:</span>
              <span className="ll-stub-bool ll-em">true</span>
              <span className="ll-stub-comma">,</span>
              <span className="ll-stub-key">defer_loading</span>
              <span className="ll-stub-colon">:</span>
              <span className="ll-stub-bool ll-em">true</span>
              <span className="ll-stub-brace">{" }"}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: ToolSearchFlow (step 4)
 * 三个节点 + 连线：
 *   model · "I need git_commit" → Tool Search · query("git*") → full schema(展开)
 * 节点依次点亮，连线依次画出
 * ────────────────────────────────────────────────────────────────── */
function ToolSearchFlow() {
  return (
    <div className="ll-flow">
      <div className="ll-flow-node ll-flow-node-1">
        <div className="ll-flow-node-tag">
          <span className="ll-mono">model</span>
        </div>
        <div className="ll-flow-node-body">
          <span className="ll-flow-node-quote">"I need </span>
          <span className="ll-flow-node-call">git_commit</span>
          <span className="ll-flow-node-quote">"</span>
        </div>
      </div>

      <div className="ll-flow-arrow ll-flow-arrow-1">
        <span className="ll-flow-arrow-stem" />
        <span className="ll-flow-arrow-head">▸</span>
      </div>

      <div className="ll-flow-node ll-flow-node-2">
        <div className="ll-flow-node-tag is-accent">
          <span className="ll-mono">Tool Search</span>
        </div>
        <div className="ll-flow-node-body">
          <span className="ll-flow-fn">query</span>
          <span className="ll-flow-paren">(</span>
          <span className="ll-flow-arg">"git*"</span>
          <span className="ll-flow-paren">)</span>
        </div>
      </div>

      <div className="ll-flow-arrow ll-flow-arrow-2">
        <span className="ll-flow-arrow-stem" />
        <span className="ll-flow-arrow-head">▸</span>
      </div>

      <div className="ll-flow-node ll-flow-node-3">
        <div className="ll-flow-node-tag">
          <span className="ll-mono">full schema</span>
        </div>
        <div className="ll-flow-node-body">
          <div className="ll-flow-schema-line">
            <span className="ll-flow-schema-key">name</span>
            <span className="ll-flow-schema-val">: "git_commit"</span>
          </div>
          <div className="ll-flow-schema-line">
            <span className="ll-flow-schema-key">params</span>
            <span className="ll-flow-schema-val">: {"{ message, files… }"}</span>
          </div>
          <div className="ll-flow-schema-line">
            <span className="ll-flow-schema-key">returns</span>
            <span className="ll-flow-schema-val">: {"{ sha, branch }"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: PrefixStability (step 5)
 * 一根 prefix 长条 = 一连串轻量 stub 块（label 都是工具名）。
 * 上面 "REQ 1" 静态 stub 一排；
 * 下面 "REQ 2" 同样的 stub 一排，外加一支额外箭头从一个 stub
 * 拉出去取 schema（标 "out of band, no prefix change"），
 * 但 prefix 本身没动，缓存盒亮绿"REUSED"。
 * ────────────────────────────────────────────────────────────────── */
function PrefixStability() {
  const stubs = ["bash", "read_file", "git", "web", "slack", "pg", "k8s", "..."];
  return (
    <div className="ll-prefix">
      <div className="ll-prefix-row">
        <div className="ll-prefix-label">
          <span className="ll-mono">REQ 1</span>
          <span className="ll-prefix-sub">prompt prefix</span>
        </div>
        <div className="ll-prefix-bar">
          {stubs.map((s) => (
            <span key={s} className="ll-prefix-cell">
              <span className="ll-prefix-cell-name">{s}</span>
            </span>
          ))}
        </div>
        <div className="ll-prefix-status">
          <span className="ll-prefix-status-dot" />
          <span className="ll-mono">stored</span>
        </div>
      </div>

      <div className="ll-prefix-row ll-prefix-row-2">
        <div className="ll-prefix-label">
          <span className="ll-mono">REQ 2</span>
          <span className="ll-prefix-sub">same prefix</span>
        </div>
        <div className="ll-prefix-bar">
          {stubs.map((s, i) => (
            <span
              key={s}
              className={`ll-prefix-cell ll-prefix-cell-stable ${
                i === 2 ? "ll-prefix-cell-fetched" : ""
              }`}
            >
              <span className="ll-prefix-cell-name">{s}</span>
              {i === 2 && (
                <>
                  <span className="ll-prefix-fetch-arc" />
                  <span className="ll-prefix-fetch-tag">
                    <span className="ll-mono">fetch · out of band</span>
                  </span>
                </>
              )}
            </span>
          ))}
        </div>
        <div className="ll-prefix-status ll-prefix-status-hit">
          <span className="ll-prefix-status-dot" />
          <span className="ll-mono">REUSED · 100%</span>
        </div>
      </div>

      <div className="ll-prefix-foot">
        <span className="ll-mono">prefix unchanged → cache stable</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
 * Visual: LibraryAnalogy (step 6)
 * 三段式：CATALOG (索引卡) → MATCH (一张卡片高亮) → SHELF (书架抽一本)
 * 全部用 CSS 几何 — 无 emoji，无图片
 * ────────────────────────────────────────────────────────────────── */
function LibraryAnalogy() {
  const cards = [
    "BSH · Bash & Shells",
    "GIT · Version Control",
    "WEB · Search & Fetch",
    "SQL · Databases",
    "MSG · Messaging",
  ];
  return (
    <div className="ll-library">
      <div className="ll-lib-stage ll-lib-stage-1">
        <div className="ll-lib-tag">
          <span className="ll-mono">1 · catalog</span>
        </div>
        <div className="ll-lib-catalog">
          {cards.map((c, i) => (
            <div
              key={c}
              className={`ll-lib-card ${i === 1 ? "ll-lib-card-target" : ""}`}
              style={
                {
                  "--card-delay": `${500 + i * 110}ms`,
                } as React.CSSProperties
              }
            >
              <div className="ll-lib-card-tab" />
              <div className="ll-lib-card-line ll-lib-card-line-title">
                {c}
              </div>
              <div className="ll-lib-card-line ll-lib-card-line-thin" />
              <div className="ll-lib-card-line ll-lib-card-line-thin" />
            </div>
          ))}
        </div>
        <div className="ll-lib-cap">先翻目录</div>
      </div>

      <div className="ll-lib-arrow">▸</div>

      <div className="ll-lib-stage ll-lib-stage-2">
        <div className="ll-lib-tag is-accent">
          <span className="ll-mono">2 · match</span>
        </div>
        <div className="ll-lib-match">
          <div className="ll-lib-match-card">
            <div className="ll-lib-match-callout">GIT · Version Control</div>
            <div className="ll-lib-match-loc">
              <span className="ll-mono">shelf · G-04 · row 7</span>
            </div>
          </div>
          <div className="ll-lib-match-cross" />
        </div>
        <div className="ll-lib-cap">找到那本</div>
      </div>

      <div className="ll-lib-arrow">▸</div>

      <div className="ll-lib-stage ll-lib-stage-3">
        <div className="ll-lib-tag">
          <span className="ll-mono">3 · shelf</span>
        </div>
        <div className="ll-lib-shelf">
          <div className="ll-lib-shelf-board" />
          <div className="ll-lib-books">
            <span className="ll-lib-book ll-lib-book-1" />
            <span className="ll-lib-book ll-lib-book-2" />
            <span className="ll-lib-book ll-lib-book-3 ll-lib-book-pulled">
              <span className="ll-lib-book-spine">git_commit</span>
            </span>
            <span className="ll-lib-book ll-lib-book-4" />
            <span className="ll-lib-book ll-lib-book-5" />
            <span className="ll-lib-book ll-lib-book-6" />
            <span className="ll-lib-book ll-lib-book-7" />
          </div>
          <div className="ll-lib-shelf-board ll-lib-shelf-board-bottom" />
        </div>
        <div className="ll-lib-cap">才去取出</div>
      </div>
    </div>
  );
}
