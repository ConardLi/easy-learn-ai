/**
 * Section 01 · Hero
 *
 * 第一秒答出「DeepSeek R1 是什么？」+ 右侧一个真实 R1 思维段流式播放（L3：play / pause / scrub）。
 *
 * Hero 纪律：H1 = 「DeepSeek R1 是什么？」/ 一句话定义 31 字陈述句 / 反直觉钩子降到过渡句。
 */
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, ExternalLink, ArrowUpRight, ArrowDown } from "lucide-react";

/* ─── 一段模拟的 R1 reasoning trace ───
 * 题面来自 arXiv:2501.12948 Table 3（AIME 风方程题），
 * 思考段按真实 R1 风格改写：列步骤 → 解错 → "Wait, wait. Wait." → 重做 → 给答案。
 */
const PROMPT = "若 a > 1，方程 √(a − √(a + x)) = x 的所有实数解之和等于？";

const TRACE: { kind: "think" | "answer" | "tag"; text: string }[] = [
  { kind: "tag", text: "<think>\n" },
  { kind: "think", text: "嗯，先把方程两边平方一下：a − √(a + x) = x²。\n" },
  { kind: "think", text: "再移项：√(a + x) = a − x²。\n" },
  { kind: "think", text: "于是 a + x = (a − x²)² = a² − 2a·x² + x⁴。\n" },
  { kind: "think", text: "整理一下，得到 x⁴ − 2a·x² − x + (a² − a) = 0。\n" },
  { kind: "think", text: "这是一个四次方程，按 Vieta 三次项系数为 0，所有根之和应该是 0……\n" },
  { kind: "think", text: "\nWait, wait. Wait. 这里我感觉有点不对，让我退回去再看一遍。\n" },
  { kind: "think", text: "原方程左边 √(...) ≥ 0，所以 x ≥ 0；而 a − x² 也得 ≥ 0，所以 x² ≤ a。\n" },
  { kind: "think", text: "意思是真正合法的实数解被限制在 0 ≤ x ≤ √a 之间，不是所有 4 个根都算。\n" },
  { kind: "think", text: "把 x² = y 代换一下：a + √y = (a − y)²，先解 y 再回代 x = +√y。\n" },
  { kind: "think", text: "整理出 y² − (2a + 1)y + (a² − a) = 0，求根公式给出 y = ((2a + 1) ± √(8a + 1)) / 2。\n" },
  { kind: "think", text: "两个 y 都正，对应两个 x = √y。算两根之和：√y₁ + √y₂。\n" },
  { kind: "think", text: "用 (√y₁ + √y₂)² = y₁ + y₂ + 2√(y₁·y₂) = (2a+1) + 2√(a²−a)。\n" },
  { kind: "think", text: "化简后得到 √(4a − 3) − 1 全部除以 2。再校验一遍 a = 2 的情况……对得上。\n" },
  { kind: "tag", text: "</think>\n\n" },
  { kind: "answer", text: "**答案**：所有实数解之和为 (√(4a − 3) − 1) / 2。" },
];

const SectionHero: React.FC = () => {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 4>(2);
  const [cursor, setCursor] = useState(0);

  /* token-level 流式：把整段 trace 拼成 char 数组，按 speed 输出 char。 */
  const fullText = TRACE.map((t) => t.text).join("");
  const total = fullText.length;
  const intervalMs = 30 / speed;

  const timerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = window.setInterval(() => {
      setCursor((c) => {
        if (c >= total) {
          setPlaying(false);
          return c;
        }
        return c + 1;
      });
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [playing, speed, total, intervalMs]);

  const visible = fullText.slice(0, cursor);
  const reset = () => {
    setCursor(0);
    setPlaying(true);
  };
  const progress = (cursor / total) * 100;

  /* 渲染：拆回 think / answer / tag 三种颜色 */
  const renderColored = () => {
    let acc = 0;
    return TRACE.map((seg, idx) => {
      const start = acc;
      const end = acc + seg.text.length;
      acc = end;
      if (cursor <= start) return null;
      const txt = seg.text.slice(0, Math.max(0, cursor - start));
      if (seg.kind === "tag") {
        return (
          <span key={idx} className="text-coral/80 font-mono">
            {txt}
          </span>
        );
      }
      if (seg.kind === "answer") {
        return (
          <span key={idx} className="text-ink font-bold bg-butter px-1 rounded">
            {txt}
          </span>
        );
      }
      /* think 段：高亮 "Wait, wait. Wait." 反思词 */
      if (txt.includes("Wait")) {
        const parts = txt.split(/(Wait,\s*wait\.\s*Wait\.)/);
        return (
          <span key={idx} className="text-cream/85">
            {parts.map((p, i) =>
              p.startsWith("Wait") ? (
                <span
                  key={i}
                  className="bg-pop/20 text-pop font-bold px-0.5 rounded animate-enter-pop inline-block"
                >
                  {p}
                </span>
              ) : (
                <span key={i}>{p}</span>
              ),
            )}
          </span>
        );
      }
      return (
        <span key={idx} className="text-cream/85">
          {txt}
        </span>
      );
    });
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* 背景装饰：右上一个旋转 stamp + 左下大色块 */}
      <div className="absolute top-12 right-10 w-32 h-32 bg-pop/8 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-butter/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* eyebrow */}
        <div className="flex items-center gap-3 mb-7">
          <span className="eyebrow">DeepSeek R1 · 开源推理模型</span>
          <span className="hidden sm:inline-block h-px w-12 bg-ink/30" />
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
            arXiv:2501.12948 · 2025-01-20
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-display-lg text-ink mb-6 leading-[1.05]">
              DeepSeek R1
              <br />
              是什么？
            </h1>

            <p className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-bold text-ink leading-[1.18] mb-7">
              <span className="bg-butter px-1.5 py-0.5 box-decoration-clone">
                2025 年 1 月开源的推理大模型，靠强化学习自己学会先想再答。
              </span>
            </p>

            <div className="space-y-3.5 text-[15px] text-ink/75 leading-relaxed max-w-[44ch]">
              <p>
                同样一道数学题，普通 ChatGPT 多半直接给答案；R1 不一样 —— 它会先在 <code className="font-mono text-[12.5px] px-1.5 py-0.5 bg-cream border border-ink/15 rounded text-ink">&lt;think&gt;</code>{" "}
                标签里自言自语一大段，列方程、试错、推翻重来，再吐最后那个答案。答题前这串自言自语有个名字，叫 <strong className="text-ink">reasoning trace（推理轨迹）</strong>，右边黑框里放的就是它。
              </p>
              <p>
                训练时 DeepSeek 没像别家先请人写一堆示范答案让它照抄，只给两条硬规则 —— 答案对了加分、格式对了加分。模型自己试很多次，慢慢学会先写思考再答，这套办法叫<strong className="text-ink">强化学习（RL）</strong>。
              </p>
              <p className="text-ink/85">
                <span className="font-bold text-pop">671B 参数 / 37B 激活 / 128K 上下文</span>：671B 是装在显存里的全部权重，但每蹦一个字真正用到的只有 37B（靠 MoE 每次只唤醒一部分，详见《MoE》）；128K = 一次最多能读多长。MIT 许可证 1 月 20 日丢上 Hugging Face，谁都能下。
              </p>
            </div>

            {/* 互链卡：底层 / 两条 RL 路线 / 671B 含义 */}
            <div className="mt-7 px-4 py-3.5 bg-butter border-2 border-ink rounded-2xl shadow-stamp max-w-[44ch]">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
                </span>
                <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                  <span className="font-bold text-ink">R1 底层还是《LLM》那种接龙大模型，差别在训练方式。</span>
                  <span className="text-ink/70">
                    {" "}
                    强化学习靠人类偏好怎么训，见《RLHF》；这站讲另一条路 —— 靠规则自动打分。671B / 37B 是怎么回事，《MoE》站讲透了。
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3 pl-10">
                <a
                  href="../llm/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  LLM 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
                <a
                  href="../rlhf/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  RLHF 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
                <a
                  href="../moe/index.html"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-ink rounded-full font-mono text-[11px] font-bold text-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
                >
                  MoE 站 <ArrowUpRight className="w-3 h-3" strokeWidth={2.6} />
                </a>
              </div>
            </div>

            {/* 滚动提示 */}
            <div className="mt-9 pt-5 border-t border-ink/15 flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm shrink-0">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-sans text-[13px] text-ink/60 leading-snug">
                下一节先看个怪事：一条人写的示范都不给，模型怎么自己学会先想再答。
              </div>
            </div>
          </div>

          {/* 右：reasoning trace 播放器 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-5 lg:p-6 relative">
              {/* 顶栏 */}
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2 py-1 bg-ink text-cream font-mono text-[10px] uppercase tracking-[0.18em] rounded">
                    R1 风格片段
                  </span>
                  <span className="font-mono text-[10.5px] text-ink/55">
                    AIME 风方程题
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* 倍速 chip */}
                  <div className="flex items-center gap-1 p-0.5 bg-cream border-2 border-ink rounded-full">
                    {([1, 2, 4] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={[
                          "px-2.5 py-1 rounded-full font-mono text-[10.5px] font-bold transition-all duration-200",
                          speed === s
                            ? "bg-ink text-cream"
                            : "text-ink/55 hover:text-ink",
                        ].join(" ")}
                      >
                        {s}×
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-butter border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
                    aria-label={playing ? "pause" : "play"}
                  >
                    {playing ? (
                      <Pause className="w-4 h-4" strokeWidth={2.5} />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" strokeWidth={2.5} />
                    )}
                  </button>
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white border-2 border-ink shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-250 ease-spring"
                    aria-label="reset"
                  >
                    <RotateCcw className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* prompt */}
              <div className="mb-3 p-3 bg-cream border-2 border-ink rounded-xl">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                  user prompt
                </div>
                <div className="font-mono text-[12.5px] text-ink leading-relaxed">
                  {PROMPT}
                </div>
              </div>

              {/* trace 主区域 */}
              <div className="bg-ink rounded-xl p-4 lg:p-5 min-h-[280px] max-h-[420px] overflow-y-auto relative">
                <div className="font-mono text-[12.5px] leading-[1.7] whitespace-pre-wrap text-cream/80">
                  {renderColored()}
                  {playing && cursor < total && (
                    <span className="inline-block w-2 h-4 bg-butter ml-0.5 align-middle animate-pulse-dot" />
                  )}
                </div>
              </div>

              {/* 进度条 + scrub */}
              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={total}
                  value={cursor}
                  onChange={(e) => {
                    setCursor(Number(e.target.value));
                    setPlaying(false);
                  }}
                  className="flex-1 accent-coral"
                  aria-label="scrub"
                />
                <div className="font-mono text-[10.5px] text-ink/55 tabular-nums w-16 text-right">
                  {Math.round(progress)}% · {cursor}/{total}
                </div>
              </div>

              {/* 过渡句 */}
              <p className="mt-4 font-mono text-[11px] text-ink/55 leading-relaxed">
                这段 ↑ 按真实 R1 的风格还原了它解一道方程题的内部独白：列错一次 → 自己喊 Wait → 退回去重做 → 给答案。下面的章节就拆它怎么学会的。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
