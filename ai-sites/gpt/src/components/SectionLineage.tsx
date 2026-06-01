/**
 * Section 03 · OpenAI 旗舰族谱（3 支流，时间往下流，到 GPT-5 三支合一）
 *
 * 跟其他 timeline 站的区别（这是反模板红线）：
 *   ─ llm 站：横向 timeline + chip 过滤厂商
 *   ─ bert 家族站：横向时间节点 + GLUE 折线
 *   ─ deepseek-r1 distill 站：6 模型 picker + bar 对比
 *   本站：纵向「河流」族谱树 —— base / product / reasoning 三支流，
 *         时间往下，到 GPT-5 处三支合一（unified system）；Sora 那支单独枯掉
 *
 * 主交互（L3）：点 SVG 上任一节点 → 右侧详情卡切换
 * 次交互（L2）：左上 3 个支线 chip 高亮整支
 *
 * 数据来源：各模型 OpenAI 官方博客 / 维基百科 / arXiv（全部具体到节点）
 */
import React, { useState } from "react";

type Branch = "base" | "product" | "reason";

type Node = {
  id: string;
  name: string;
  date: string;
  branch: Branch;
  /* SVG 坐标（viewBox 360×640 内） */
  x: number;
  y: number;
  /* 视觉尺寸 */
  size: "sm" | "md" | "lg";
  /* 详情面板内容 */
  highlight: string;
  notes: string[];
  ref: string;
};

const NODES: Node[] = [
  {
    id: "gpt1",
    name: "GPT-1",
    date: "2018-06",
    branch: "base",
    x: 80,
    y: 50,
    size: "sm",
    highlight: "117 M 参数 · 12 层 decoder",
    notes: [
      "首篇 GPT 论文 · Improving Language Understanding by Generative Pre-Training",
      "BookCorpus 4.5 GB · 7000 本未出版小说",
      "训练路子：先海量读文章自学 → 再拿标注数据专门练一遍 → 当时还不会靠 prompt 里塞例子现学",
    ],
    ref: "Radford et al. 2018 · OpenAI tech report",
  },
  {
    id: "gpt2",
    name: "GPT-2",
    date: "2019-02",
    branch: "base",
    x: 80,
    y: 100,
    size: "sm",
    highlight: "1.5 B 参数 · 「too dangerous to release」",
    notes: [
      "WebText 40 GB · 8 M Reddit 高赞外链",
      "首发只放 117 M，11 月才全量放 1.5 B",
      "争议落空：到 11 月 OpenAI 自己说「未见严重滥用」",
    ],
    ref: "Radford et al. 2019 · OpenAI blog 2019-02-14",
  },
  {
    id: "gpt3",
    name: "GPT-3",
    date: "2020-05",
    branch: "base",
    x: 80,
    y: 160,
    size: "lg",
    highlight: "175 B · few-shot 时代开启",
    notes: [
      "300 B token · Common Crawl + Books + Wiki",
      "首次大规模 in-context learning：example 写在 prompt 里就能学",
      "训练成本估 ~$4.6 M · Lambda Labs 2020 分析",
    ],
    ref: "arXiv:2005.14165 · Brown et al. 2020",
  },
  {
    id: "ig",
    name: "InstructGPT",
    date: "2022-01",
    branch: "base",
    x: 80,
    y: 215,
    size: "sm",
    highlight: "RLHF 第一次产品级落地",
    notes: [
      "SFT → 奖励模型 → PPO 三步走",
      "1.3 B InstructGPT 在人偏好上压住 175 B GPT-3",
      "是 ChatGPT 的直接前身",
    ],
    ref: "arXiv:2203.02155 · Ouyang et al.",
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    date: "2022-11-30",
    branch: "product",
    x: 200,
    y: 260,
    size: "lg",
    highlight: "5 天破百万用户 · 现象级",
    notes: [
      "基于 GPT-3.5 套上对话界面 + RLHF",
      "Sam Altman 推文 2022-12-05：1 M users",
      "2 个月破 1 亿 MAU · UBS 估算（最快消费产品记录）",
    ],
    ref: "openai.com/blog/chatgpt 2022-11-30",
  },
  {
    id: "gpt4",
    name: "GPT-4",
    date: "2023-03-14",
    branch: "base",
    x: 80,
    y: 305,
    size: "md",
    highlight: "首支多模态 · 训练成本 > $100 M",
    notes: [
      "文 + 图输入，文输出",
      "上下文 8 K → Turbo 128 K（2023-11）",
      "Altman 在 MIT：「>$100 M」· 行业估参数 ~1.7 T (MoE)",
    ],
    ref: "GPT-4 Technical Report 2023 · Wired 2023-04",
  },
  {
    id: "dalle3",
    name: "DALL·E 3",
    date: "2023-09",
    branch: "product",
    x: 200,
    y: 345,
    size: "sm",
    highlight: "图像生成 · 自然语言提示",
    notes: [
      "直接挂在 ChatGPT 里，自动改写 prompt",
      "2026 已迭代到 ChatGPT Images 2",
    ],
    ref: "openai.com/index/dall-e-3 2023-09-20",
  },
  {
    id: "4o",
    name: "GPT-4o",
    date: "2024-05-13",
    branch: "base",
    x: 80,
    y: 380,
    size: "md",
    highlight: "原生多模态 · 320 ms 音频延迟",
    notes: [
      "文 / 图 / 音三模态走同一个模型，不再走 vision encoder",
      "上下文 128 K · 训练数据截止 2023-10",
      "API 价 $5 / $15 per 1M token",
    ],
    ref: "openai.com/index/hello-gpt-4o 2024-05-13",
  },
  {
    id: "o1",
    name: "o1",
    date: "2024-12-05",
    branch: "reason",
    x: 320,
    y: 415,
    size: "md",
    highlight: "OpenAI 首支 reasoning model",
    notes: [
      "9-12 preview，12-05 GA",
      "训练用大规模 RL on chain-of-thought",
      "AIME 2024 74.3% · 老 GPT-4o 仅 9.3%",
    ],
    ref: "openai.com/index/learning-to-reason-with-llms 2024-09-12",
  },
  {
    id: "o3m",
    name: "o3-mini",
    date: "2025-01-31",
    branch: "reason",
    x: 320,
    y: 455,
    size: "sm",
    highlight: "小尺寸 · 三档思考努力度",
    notes: [
      "free 用户首次能用 reasoning",
      "low / medium / high reasoning effort 三档",
    ],
    ref: "openai.com/index/openai-o3-mini 2025-01-31",
  },
  {
    id: "41",
    name: "GPT-4.1",
    date: "2025-04-14",
    branch: "base",
    x: 80,
    y: 460,
    size: "sm",
    highlight: "API only · 1 M 上下文",
    notes: [
      "三档 mini / nano · nano $0.10 / $0.40 per 1M",
      "ChatGPT 不上，专给开发者用",
    ],
    ref: "openai.com/index/gpt-4-1 2025-04-14",
  },
  {
    id: "o3o4",
    name: "o3 / o4-mini",
    date: "2025-04-16",
    branch: "reason",
    x: 320,
    y: 500,
    size: "md",
    highlight: "首支会用工具的 reasoning",
    notes: [
      "可在 think 里主动调 Python、search、image edit",
      "AIME 2024 93.4% · SWE-bench Verified 69.1%",
    ],
    ref: "openai.com/index/introducing-o3-and-o4-mini 2025-04-16",
  },
  {
    id: "gpt5",
    name: "GPT-5",
    date: "2025-08-07",
    branch: "base",
    x: 200,
    y: 540,
    size: "lg",
    highlight: "三支合一 · unified system",
    notes: [
      "「knows when to respond quickly and when to think longer」",
      "免费用户首次直接拿到推理模型",
      "三档 gpt-5 / mini / nano",
    ],
    ref: "openai.com/index/introducing-gpt-5 2025-08-07",
  },
  {
    id: "55",
    name: "GPT-5.5",
    date: "2026-04-23",
    branch: "base",
    x: 200,
    y: 590,
    size: "md",
    highlight: "2026 当下旗舰 · $5 / $30",
    notes: [
      "1.05 M 上下文（922 K input + 128 K output）",
      "GPT-5.5 Pro $30 / $180 per 1M token",
      "Plus / Pro / Business / Enterprise 全开",
    ],
    ref: "openai.com/index/introducing-gpt-5-5 2026-04-23",
  },
  {
    id: "sora2",
    name: "Sora 2 ✕",
    date: "2025-09 → 2026-04",
    branch: "product",
    x: 320,
    y: 570,
    size: "sm",
    highlight: "起飞 7 月后被砍",
    notes: [
      "2025-09-30 发布 · 同步音轨 · 物理更准",
      "2026-04-26 web/app 全部关停 · 9-24 API 关停",
      "OpenAI Help Center 官方公告",
    ],
    ref: "help.openai.com/articles/20001152 · 2026-03-28",
  },
];

const BRANCH_INFO: Record<Branch, { label: string; tone: string; ring: string }> = {
  base: { label: "base · 语言模型本体", tone: "#241C15", ring: "#241C15" },
  product: { label: "product · 用户产品", tone: "#E07A5F", ring: "#E07A5F" },
  reason: { label: "reasoning · o 系思考", tone: "#1B4B5A", ring: "#1B4B5A" },
};

/* 连边 · 从 → 到，标记同支线还是跨支线 */
const EDGES: { from: string; to: string; cross?: boolean }[] = [
  { from: "gpt1", to: "gpt2" },
  { from: "gpt2", to: "gpt3" },
  { from: "gpt3", to: "ig" },
  { from: "ig", to: "chatgpt", cross: true },
  { from: "ig", to: "gpt4" },
  { from: "gpt4", to: "dalle3", cross: true },
  { from: "gpt4", to: "4o" },
  { from: "4o", to: "o1", cross: true },
  { from: "o1", to: "o3m" },
  { from: "4o", to: "41" },
  { from: "o3m", to: "o3o4" },
  { from: "41", to: "gpt5" },
  { from: "o3o4", to: "gpt5", cross: true },
  { from: "dalle3", to: "sora2" },
  { from: "gpt5", to: "55" },
];

const SectionLineage: React.FC = () => {
  const [activeId, setActiveId] = useState("gpt5");
  const [filter, setFilter] = useState<Branch | "all">("all");

  const active = NODES.find((n) => n.id === activeId)!;

  const visible = (id: string) => {
    if (filter === "all") return true;
    return NODES.find((n) => n.id === id)?.branch === filter;
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">03</span>
          <span className="section-anchor-label">three branches · one river</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 mb-9">
          <div className="lg:col-span-8">
            <h2 className="font-display text-display-lg text-ink leading-[1.08] mb-4">
              三条支流，
              <br />
              <span className="bg-coral/20 px-1.5">2025 年 8 月汇成一条。</span>
            </h2>
            <p className="text-[15.5px] text-ink/75 leading-relaxed max-w-[64ch]">
              OpenAI 的旗舰路线从 GPT-3 之后就长成了三股 —— 语言本体（GPT-3/4/4o），
              用户产品（ChatGPT / DALL·E / Sora），思考模型（o 系）。
              GPT-5 把三股合在一个模型里：自己决定快答还是先 think。
            </p>
          </div>
          <div className="lg:col-span-4 lg:pt-3 space-y-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
              切支线
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "base", "product", "reason"] as const).map((b) => {
                const on = filter === b;
                const label =
                  b === "all" ? "全部" : BRANCH_INFO[b as Branch].label.split(" · ")[0];
                const tone = b === "all" ? "#241C15" : BRANCH_INFO[b as Branch].tone;
                return (
                  <button
                    key={b}
                    onClick={() => setFilter(b)}
                    className={[
                      "px-3 py-1.5 rounded-full border-2 border-ink font-mono text-[11px] font-bold transition-all duration-250 ease-spring",
                      on
                        ? "text-cream shadow-[3px_3px_0_0_#241C15]"
                        : "bg-white text-ink/65 hover:bg-cream",
                    ].join(" ")}
                    style={on ? { backgroundColor: tone } : undefined}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* 左：SVG 族谱树 */}
          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-5">
              {/* 顶 column 标签 */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {(["base", "product", "reason"] as Branch[]).map((b) => (
                  <div
                    key={b}
                    className="text-center font-mono text-[10px] uppercase tracking-[0.18em] font-bold"
                    style={{ color: BRANCH_INFO[b].tone }}
                  >
                    {BRANCH_INFO[b].label.split(" · ")[0]}
                  </div>
                ))}
              </div>

              <div className="relative">
                <svg viewBox="0 0 400 660" className="w-full h-auto">
                  {/* 三条主竖线（时间轴） */}
                  {(["base", "product", "reason"] as Branch[]).map((b, idx) => {
                    const x = [80, 200, 320][idx];
                    return (
                      <line
                        key={`spine-${b}`}
                        x1={x}
                        y1="20"
                        x2={x}
                        y2="630"
                        stroke={BRANCH_INFO[b].tone}
                        strokeWidth="1"
                        strokeDasharray="2 3"
                        opacity="0.18"
                      />
                    );
                  })}

                  {/* 年份刻度 */}
                  {[
                    { y: 50, l: "2018" },
                    { y: 160, l: "2020" },
                    { y: 260, l: "2022" },
                    { y: 380, l: "2024" },
                    { y: 540, l: "2025-08" },
                    { y: 590, l: "2026" },
                  ].map((m) => (
                    <g key={m.l}>
                      <text
                        x="14"
                        y={m.y + 4}
                        fontFamily="Geist Mono, monospace"
                        fontSize="9"
                        fill="#88837C"
                        opacity="0.65"
                      >
                        {m.l}
                      </text>
                      <line
                        x1="42"
                        y1={m.y}
                        x2="380"
                        y2={m.y}
                        stroke="#88837C"
                        strokeWidth="0.6"
                        strokeDasharray="2 3"
                        opacity="0.18"
                      />
                    </g>
                  ))}

                  {/* 连边 */}
                  {EDGES.map((e, i) => {
                    const a = NODES.find((n) => n.id === e.from)!;
                    const b = NODES.find((n) => n.id === e.to)!;
                    const dim =
                      filter !== "all" && (a.branch !== filter || b.branch !== filter);
                    const color = e.cross
                      ? "#88837C"
                      : BRANCH_INFO[a.branch].tone;
                    return (
                      <line
                        key={i}
                        x1={a.x}
                        y1={a.y + 12}
                        x2={b.x}
                        y2={b.y - 12}
                        stroke={color}
                        strokeWidth={e.cross ? 1.2 : 1.6}
                        strokeDasharray={e.cross ? "3 3" : "0"}
                        opacity={dim ? 0.12 : e.cross ? 0.4 : 0.55}
                      />
                    );
                  })}

                  {/* 节点 */}
                  {NODES.map((n) => {
                    const on = n.id === activeId;
                    const dimmed = filter !== "all" && n.branch !== filter;
                    const r = n.size === "lg" ? 13 : n.size === "md" ? 10 : 8;
                    const branchColor = BRANCH_INFO[n.branch].tone;
                    return (
                      <g
                        key={n.id}
                        transform={`translate(${n.x},${n.y})`}
                        onClick={() => setActiveId(n.id)}
                        className="cursor-pointer"
                        style={{ opacity: dimmed ? 0.25 : 1 }}
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={r + 3}
                          fill="#FFFFFF"
                          stroke="#241C15"
                          strokeWidth={on ? 2.5 : 1.6}
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={r}
                          fill={on ? branchColor : "#FFFFFF"}
                          stroke={branchColor}
                          strokeWidth="1.6"
                        />
                        {on && (
                          <circle
                            cx="0"
                            cy="0"
                            r={r + 6}
                            fill="none"
                            stroke={branchColor}
                            strokeWidth="1.2"
                            strokeDasharray="2 3"
                            className="animate-pulse-dot"
                          />
                        )}
                        <text
                          x={n.branch === "reason" ? -(r + 8) : r + 8}
                          y="3.5"
                          textAnchor={n.branch === "reason" ? "end" : "start"}
                          fontFamily="Geist Mono, monospace"
                          fontSize={n.size === "lg" ? 11 : 10}
                          fontWeight={on ? 800 : 600}
                          fill="#241C15"
                        >
                          {n.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              <p className="mt-2 font-mono text-[10.5px] text-ink/50 leading-relaxed text-center">
                ↑ 点节点切换右侧详情。实线 = 同支演进，虚线 = 跨支衍生。
              </p>
            </div>
          </div>

          {/* 右：选中节点详情 */}
          <div className="lg:col-span-5">
            <div
              key={activeId}
              className="bg-white border-2 border-ink rounded-3xl shadow-stamp-lg p-6 animate-enter-fade"
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.18em] font-bold px-2 py-0.5 border-[1.5px] border-ink rounded-full"
                  style={{
                    color: BRANCH_INFO[active.branch].tone,
                    backgroundColor: "#FBEFE3",
                  }}
                >
                  {BRANCH_INFO[active.branch].label.split(" · ")[0]}
                </span>
                <span className="font-mono text-[11px] text-ink/55">{active.date}</span>
              </div>

              <h3 className="font-display text-[28px] font-bold text-ink leading-tight mb-2">
                {active.name}
              </h3>
              <p
                className="font-display text-[14.5px] font-bold leading-snug mb-4 inline-block px-1.5 py-0.5"
                style={{ backgroundColor: "rgba(244,211,94,0.4)" }}
              >
                {active.highlight}
              </p>

              <ul className="space-y-2 mb-4">
                {active.notes.map((n, i) => (
                  <li key={i} className="flex gap-2 text-[14px] text-ink/80 leading-relaxed">
                    <span
                      className="mt-1.5 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: BRANCH_INFO[active.branch].tone }}
                    />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-ink/10 font-mono text-[10.5px] text-ink/55">
                来源：{active.ref}
              </div>
            </div>

            {/* 小提示 · 帮助识别"GPT-5 三支合一" */}
            <div className="mt-3 p-3 bg-butter/40 border-2 border-ink rounded-2xl">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/60 mb-1">
                关键节点
              </div>
              <p className="text-[13px] text-ink/75 leading-relaxed">
                GPT-5 是收口节点。OpenAI 自己说它「knows when to respond quickly and when to think longer」——
                base 和 o 系合二为一，用户不用再选模型。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLineage;
