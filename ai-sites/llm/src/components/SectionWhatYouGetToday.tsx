/**
 * Section 06 · What You Get Today · 今天能干啥
 *
 * 反模板：
 *   §05 = 单步切换的水平时间线
 *   §06 = 3 callout + 一张上下文长度演化曲线（hover · L1）
 *
 * 内容：3 件大事 + 1 个大坑（幻觉收尾，连到 §07 限制）
 *   06.1 长上下文     —— ContextEvolutionChart 带"示意"标
 *   06.2 多模态        —— 静态描述
 *   06.3 幻觉          —— 静态描述（铺垫 §07）
 */
import React, { useMemo, useState } from "react";
import { ScrollText, Camera, AlertTriangle, ExternalLink } from "lucide-react";

/* ──────────────────────────────────────
 * 子组件：上下文长度演化曲线（hover · L1）
 * ────────────────────────────────────── */
interface CtxPoint {
  year: string;
  model: string;
  tokens: number; // K
  note: string;
}

const CTX_HISTORY: CtxPoint[] = [
  { year: "2020", model: "GPT-3", tokens: 2, note: "约半页论文" },
  { year: "2022", model: "ChatGPT", tokens: 4, note: "几页对话" },
  { year: "2023.03", model: "GPT-4", tokens: 8, note: "一段长文章" },
  { year: "2023.11", model: "GPT-4 Turbo", tokens: 128, note: "一本中篇小说" },
  { year: "2024.03", model: "Claude 3 Opus", tokens: 200, note: "整本中篇" },
  { year: "2024.06", model: "Gemini 1.5 Pro", tokens: 1000, note: "一整套代码 / 整本《红楼梦》" },
  { year: "2025", model: "Gemini 2.5 Pro", tokens: 2000, note: "整套代码 + 长视频脚本" },
  { year: "2026.05", model: "Gemini 3.5 Flash", tokens: 1000, note: "默认 100 万 · 多模态长视频" },
];

const ContextEvolutionChart: React.FC = () => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const points = useMemo(() => {
    const maxLog = Math.log10(2000);
    const minLog = Math.log10(2);
    return CTX_HISTORY.map((p, i) => {
      const x = (i / (CTX_HISTORY.length - 1)) * 100;
      const y =
        100 - ((Math.log10(p.tokens) - minLog) / (maxLog - minLog)) * 95;
      return { ...p, x, y, i };
    });
  }, []);

  const pathD = useMemo(
    () => points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" "),
    [points],
  );

  const active =
    hoverIdx !== null ? points[hoverIdx] : points[points.length - 1];

  const tokensLabel = (k: number) =>
    k >= 1000 ? `${(k / 1000).toFixed(k % 1000 === 0 ? 0 : 1)} M` : `${k} K`;

  return (
    <div className="bg-cream border-2 border-ink rounded-2xl p-5 lg:p-6">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-coral mb-1">
            悬停查看 · 6 年跃迁
          </div>
          <h4 className="font-display font-extrabold text-[18px] text-ink">
            上下文窗口 · 从半页到一整套代码库
          </h4>
        </div>
        <span className="inline-flex items-center px-2 py-0.5 bg-white border border-ink/30 rounded-md font-mono text-[9.5px] uppercase tracking-wide text-ink/55">
          示意
        </span>
      </div>

      {/* 悬停信息卡 */}
      <div className="bg-white border-2 border-ink rounded-xl px-4 py-3 mb-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink/55">
              {active.year}
            </div>
            <div className="font-display font-extrabold text-[15px] text-ink mt-0.5">
              {active.model}
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-extrabold text-[18px] text-coral leading-none">
              {tokensLabel(active.tokens)}
            </div>
            <div className="font-mono text-[10px] text-ink/55 mt-1 max-w-[180px]">
              ≈ {active.note}
            </div>
          </div>
        </div>
      </div>

      {/* SVG 曲线 */}
      <div className="relative bg-white border-2 border-ink rounded-xl p-4">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-[180px]"
          preserveAspectRatio="none"
        >
          {/* 参考线 */}
          {[
            { tokens: 4, label: "4K" },
            { tokens: 128, label: "128K" },
            { tokens: 1000, label: "1M" },
          ].map(({ tokens, label }) => {
            const y =
              100 -
              ((Math.log10(tokens) - Math.log10(2)) /
                (Math.log10(2000) - Math.log10(2))) *
                95;
            return (
              <g key={label}>
                <line
                  x1="0"
                  x2="100"
                  y1={y}
                  y2={y}
                  stroke="#241C15"
                  strokeOpacity="0.1"
                  strokeDasharray="2 2"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}

          {/* 折线 */}
          <path
            d={pathD}
            fill="none"
            stroke="#241C15"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 节点 */}
          {points.map((p) => (
            <g
              key={p.i}
              onMouseEnter={() => setHoverIdx(p.i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={hoverIdx === p.i ? 4 : 2.5}
                fill={hoverIdx === p.i ? "#E07A5F" : "#F4D35E"}
                stroke="#241C15"
                strokeWidth="1.2"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={p.x} cy={p.y} r="8" fill="transparent" />
            </g>
          ))}
        </svg>
        <div className="flex justify-between mt-2 font-mono text-[9px] uppercase tracking-wide text-ink/55">
          <span>2020</span>
          <span>2022</span>
          <span>2024</span>
          <span>2026</span>
        </div>
      </div>

      <p className="mt-3 font-mono text-[10px] text-ink/40">
        曲线是按公开发布的最大上下文画的（纵轴对数轴），帮你看趋势 · 不是精确测量。
      </p>
    </div>
  );
};

/* ──────────────────────────────────────
 * Section 主体
 * ────────────────────────────────────── */
const SectionWhatYouGetToday: React.FC = () => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-white border-y-2 border-ink">
      <div className="max-w-6xl mx-auto">
        {/* 段头 */}
        <div className="mb-12 max-w-3xl">
          <div className="section-anchor">
            <span className="section-anchor-num">06</span>
            <span className="section-anchor-label">今天能干啥</span>
          </div>
          <h2 className="font-display text-display-lg text-ink mb-4">
            打开它 · 今天能做的 3 件大事 +
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">1 个大坑</span>
              <span
                className="absolute left-0 right-0 bottom-1 h-3.5 lg:h-5 bg-coral/55 -z-0"
                aria-hidden
              />
            </span>
          </h2>
          <p className="font-sans text-[15px] text-ink/75 leading-relaxed">
            过完前 5 节，你已经知道 LLM 长啥样、怎么变强、为啥能听话。下面这一节告诉你
            ——
            <strong className="text-ink"> 现在打开 ChatGPT / Claude / Gemini，能跟它做哪些以前做不了的事</strong>
            ，以及一个还没解决的大坑。
          </p>
        </div>

        {/* 06.1 长上下文 */}
        <div className="mb-10 lg:mb-14">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-butter border-2 border-ink rounded-2xl shadow-stamp flex items-center justify-center">
                  <ScrollText className="w-5 h-5 text-ink" strokeWidth={2.2} />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                    06.1 · 长上下文
                  </div>
                  <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight mt-0.5">
                    给它 50 轮聊天 / 整本 PDF · 它都还记得
                  </h3>
                </div>
              </div>
              <div className="space-y-3 font-sans text-[14.5px] text-ink/75 leading-relaxed">
                <p>
                  2020 年 GPT-3 一次只能吃下半页论文（约 2000 字）。
                  现在 Gemini / Claude 顶级版能一次性读完
                  <strong className="text-ink"> 一整套项目代码 + 整本《红楼梦》</strong>
                  。
                </p>
                <p className="bg-cream border-2 border-ink rounded-xl px-4 py-3 shadow-stamp">
                  <strong className="text-ink">具体长啥样：</strong>
                  你把一份 100 页的产品说明书 PDF 整个塞进去，让它"挑出所有跟保修期有关的条款" ——
                  它能扫一遍全部内容，挑准。三年前这件事得自己写代码做检索。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContextEvolutionChart />
            </div>
          </div>
        </div>

        {/* 06.2 多模态 */}
        <div className="mb-10 lg:mb-14 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-coral border-2 border-ink rounded-2xl shadow-stamp flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" strokeWidth={2.2} />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  06.2 · 多模态
                </div>
                <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight mt-0.5">
                  能看图 · 能看视频 · 能听声音
                </h3>
              </div>
            </div>
            <div className="space-y-3 font-sans text-[14.5px] text-ink/75 leading-relaxed">
              <p>
                以前的 LLM 只认字。2024 年开始，主流模型变成
                <strong className="text-ink"> 一个嘴 + 一双眼 + 一对耳朵</strong> ——
                同一个模型能直接处理文字、图片、声音、视频。
              </p>

              {/* 互链卡 · 多模态怎么做到的 → multimodality */}
              <a
                href="../multimodality/index.html"
                className="inline-flex items-start gap-3 px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                  <span className="font-bold text-ink">它是怎么"看懂"图和声音的？</span>
                  <span className="text-ink/70">
                    {" "}
                    模型现在不只读文字，还能看图、听声音、看视频。这套本事是怎么接到「只会接龙」上的 —— 去《多模态》那一站。
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            <ExampleCard
              tone="butter"
              title="拍菜单翻译"
              body="在国外餐厅拍一张全是法语的菜单照片，让它告诉你每道菜大概是什么。"
            />
            <ExampleCard
              tone="coral"
              title="听一段会议"
              body="把 30 分钟会议录音传上去，让它整理出待办清单和分歧点。"
            />
            <ExampleCard
              tone="teal"
              title="看图找问题"
              body="拍一张 Excel 报错截图，让它告诉你公式哪里写错了。"
            />
            <ExampleCard
              tone="ink"
              title="看视频写摘要"
              body="一小时教程视频丢进去，它会按时间戳列出讲了什么。"
            />
          </div>
        </div>

        {/* 06.3 幻觉 · 大坑 */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pop border-2 border-ink rounded-2xl shadow-stamp flex items-center justify-center">
                <AlertTriangle
                  className="w-5 h-5 text-white"
                  strokeWidth={2.4}
                />
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-pop">
                  06.3 · 大坑（重点）
                </div>
                <h3 className="font-display font-extrabold text-[20px] text-ink leading-tight mt-0.5">
                  它会很自信地<strong>胡编</strong>
                </h3>
              </div>
            </div>
            <div className="space-y-3 font-sans text-[14.5px] text-ink/75 leading-relaxed">
              <p>
                别忘了 §01 那个比喻：它是
                <strong className="text-ink"> 在猜下一个最像的字</strong>。所以
                只要"听起来像那么回事"，它就会说出来 ——
                哪怕这件事根本不存在。
              </p>
              <p>
                行话叫
                <span className="font-mono font-bold text-pop"> 幻觉（hallucination）</span>。
                2026 年比 2023 年好很多，但<strong className="text-ink">没有根除</strong>。
              </p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-ink text-cream border-2 border-ink rounded-3xl shadow-stamp-lg p-5 lg:p-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-butter mb-3">
              典型翻车场景
            </div>
            <ul className="space-y-3.5">
              <HallucinationItem
                q="2023 年世界杯亚军是谁？"
                a="可能信誓旦旦给你一个国家名 —— 但其实那年根本没有世界杯。"
              />
              <HallucinationItem
                q="帮我引用一篇 2024 年关于 X 的论文"
                a="可能伪造一个看起来很真的论文标题、作者、期刊号 —— 全部是编的。"
              />
              <HallucinationItem
                q="《XXX 这本书》第 7 章在讲什么？"
                a="如果它没读过这本书，会按「听起来像」编一段听上去合理的内容。"
              />
            </ul>
            <div className="mt-5 pt-4 border-t border-cream/15 font-sans text-[12.5px] text-cream/70 leading-relaxed">
              用法上的硬规矩：
              <strong className="text-butter"> 涉及事实、数字、引用，要么自己核对、要么让它带链接</strong>
              。下面 §07 再讲哪些事干脆别期待它做对。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExampleCard: React.FC<{
  tone: "butter" | "coral" | "teal" | "ink";
  title: string;
  body: string;
}> = ({ tone, title, body }) => {
  const head: Record<typeof tone, string> = {
    butter: "bg-butter text-ink",
    coral: "bg-coral text-white",
    teal: "bg-teal text-cream",
    ink: "bg-ink text-cream",
  };
  return (
    <div className="bg-cream border-2 border-ink rounded-2xl shadow-stamp overflow-hidden">
      <div
        className={`${head[tone]} px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] font-bold border-b-2 border-ink`}
      >
        例
      </div>
      <div className="p-4">
        <div className="font-display font-extrabold text-[15px] text-ink mb-1.5">
          {title}
        </div>
        <p className="font-sans text-[12.5px] text-ink/70 leading-relaxed">
          {body}
        </p>
      </div>
    </div>
  );
};

const HallucinationItem: React.FC<{ q: string; a: string }> = ({ q, a }) => (
  <li className="flex items-start gap-3">
    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-pop" />
    <div className="flex-1">
      <div className="font-mono text-[11.5px] text-cream font-bold leading-snug">
        Q：{q}
      </div>
      <div className="font-sans text-[12.5px] text-cream/75 leading-relaxed mt-1">
        A：{a}
      </div>
    </div>
  </li>
);

export default SectionWhatYouGetToday;
