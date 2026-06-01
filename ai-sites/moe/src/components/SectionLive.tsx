/**
 * Section 01 · Hero · 实时路由器
 *
 * 反模板：核心交互直接放 hero。用户进站 1 秒内能改输入框看 257 个专家亮起几个。
 *
 * 区别于 quantization Hero：
 *   ─ quantization 用 7-pill 离散选择 bit 数 ──> 我用 input textarea（L4 用户内容）
 *   ─ quantization 用 8 个权重格 ──> 我用 257 个 expert dots 网格（16×16 + 1 shared）
 *
 * 可动元素：
 *   ① input textbox（L4 实时反映）
 *   ② 点击 token chip 聚焦该 token 的路由（L2）
 *   ③ hover token chip 也高亮（基础礼貌，不计入）
 */
import React, { useState, useMemo } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const DEFAULT_TEXT = "帮我用 Python 写一个快速排序，要带注释。";
const TOTAL_ROUTED = 256;
const TOP_K = 8;
const TOTAL_PARAMS_B = 671;
const ACTIVATED_B = 37; // 含 1 个 shared expert

/* deterministic hash · 不引随机源避免 hydration 抖 */
function strHash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) >>> 0;
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h >>> 0;
}

/* 给一个 token 选出 8 个 routed expert id（0..255） */
function routeOf(token: string): number[] {
  const ids = new Set<number>();
  let seed = strHash(token);
  while (ids.size < TOP_K) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    ids.add(seed % TOTAL_ROUTED);
  }
  return Array.from(ids).sort((a, b) => a - b);
}

/* 极简 tokenizer（视觉示意，非真实 BPE）：
   中文按字 / 英文按词 / 标点单独 */
function tokenize(text: string): string[] {
  const out: string[] = [];
  let buf = "";
  const punct = `,.!?;:，。！？；：、""''「」()（）-—…`;
  for (const ch of text) {
    const cp = ch.codePointAt(0)!;
    const isCJK =
      (cp >= 0x4e00 && cp <= 0x9fff) ||
      (cp >= 0x3000 && cp <= 0x303f) ||
      (cp >= 0xff00 && cp <= 0xffef);
    if (isCJK) {
      if (buf) {
        out.push(buf);
        buf = "";
      }
      out.push(ch);
    } else if (/\s/.test(ch)) {
      if (buf) {
        out.push(buf);
        buf = "";
      }
    } else if (punct.includes(ch)) {
      if (buf) {
        out.push(buf);
        buf = "";
      }
      out.push(ch);
    } else {
      buf += ch;
    }
  }
  if (buf) out.push(buf);
  return out;
}

const SectionLive: React.FC = () => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [focusIdx, setFocusIdx] = useState<number | null>(null);

  const tokens = useMemo(() => tokenize(text).slice(0, 20), [text]);

  /* 每个 token 的 8 个 expert ids（缓存） */
  const tokenRoutes = useMemo(() => tokens.map(routeOf), [tokens]);

  /* 全句激活的 expert 并集（基础视图） */
  const unionSet = useMemo(() => {
    const s = new Set<number>();
    for (const r of tokenRoutes) r.forEach((id) => s.add(id));
    return s;
  }, [tokenRoutes]);

  /* 当前显示的激活集合 */
  const activeSet =
    focusIdx !== null && tokenRoutes[focusIdx]
      ? new Set<number>(tokenRoutes[focusIdx])
      : unionSet;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div aria-hidden className="absolute top-24 right-[8%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Mixture of Experts · 混合专家
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              MoE
              <br />
              是什么？
            </h1>

            <p className="max-w-md font-display text-[20px] lg:text-[22px] font-bold text-ink leading-snug mb-5 animate-enter-up">
              <span className="relative inline-block">
                <span
                  className="absolute left-0 right-0 bottom-0.5 h-3 lg:h-4 bg-butter -z-0"
                  aria-hidden
                />
                <span className="relative z-10">
                  把一个大模型拆成很多个并列的小网络（专家），每次只用其中几个。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>传统模型每来一个词，显存里装的全部参数都要算一遍。</p>
              <p>
                MoE 改的是 transformer 层里的一块：attention 之后那块「前馈网络（FFN）」，被换成几十到几百个并列的小网络（专家），再加一个路由器（router）。每个 token（模型把句子切成的一小段一小段，约等于一个字 / 词）只送给其中几个专家去算。
              </p>
              <p>
                先钉死两个词：<strong className="text-ink">总参数</strong>＝权重全装在显存里；<strong className="text-ink">激活参数</strong>＝这一个词真正参与计算的那一份。MoE 的卖点就是总参数堆很大，但每个词的算力账单只按激活的那几份算。
              </p>
              <p>
                DeepSeek V3 总共 671B 参数 / 257 个专家（这是总参数），但每个 token 只激活其中 9 个、共 37B 参数（这是激活参数）—— 用全套知识，只付 5.5% 的算力账。
              </p>
            </div>

            {/* 互链卡：FFN 是 Transformer 内部结构 */}
            <a
              href="../transformer/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">先搞懂底座《Transformer》</span>
                <span className="text-ink/70">
                  {" "}
                  专家替换掉的那块「前馈层（FFN）」是 Transformer 内部结构。先看《Transformer》搞懂底座，再回来看 MoE 怎么改它。
                </span>
              </span>
            </a>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边那个输入框，就是路由器的「现场转播」。
              在里面打几个字，看 257 个方格里哪几个会被点亮。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看 ↓
              </div>
            </div>
            <p className="mt-3 max-w-md font-serif italic text-[13.5px] text-ink/55 leading-relaxed">
              先把那个路由器拆开，看它到底怎么挑专家 ↓
            </p>
          </div>

          {/* 右：可视化卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              <div className="flex items-baseline justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  live router · DeepSeek V3
                </div>
                <div className="font-mono text-[10px] text-ink/45">
                  256 routed + 1 shared
                </div>
              </div>

              {/* 输入框 */}
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1.5">
                ① 你的句子
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setFocusIdx(null);
                }}
                rows={2}
                className="w-full px-3 py-2.5 bg-cream border-2 border-ink rounded-xl font-sans text-[14.5px] text-ink resize-none focus:outline-none focus:shadow-stamp focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all duration-250"
                placeholder="比如：请帮我用 Python 写一个快速排序"
              />

              {/* tokens row */}
              <div className="mt-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ② 切成 {tokens.length} 个 token
                  </div>
                  <div className="font-mono text-[9.5px] text-ink/45">
                    {focusIdx === null ? "点 token 看它路由到哪 9 个专家" : `第 ${focusIdx + 1} 个 token · 9 个专家`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {tokens.map((t, i) => {
                    const on = focusIdx === i;
                    return (
                      <button
                        key={`${t}-${i}`}
                        onClick={() => setFocusIdx((p) => (p === i ? null : i))}
                        className={[
                          "px-2 py-1 rounded-md border-2 border-ink font-mono text-[11.5px] font-semibold transition-all duration-200 ease-spring",
                          on
                            ? "bg-coral text-white shadow-stamp"
                            : focusIdx === null
                              ? "bg-white text-ink hover:bg-butter/50 hover:-translate-y-0.5"
                              : "bg-cream text-ink/45 hover:bg-white",
                        ].join(" ")}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 257 expert grid */}
              <div className="mt-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ③ 257 个专家 · 亮 = 被选
                  </div>
                  <div className="font-mono text-[10px] text-coral font-semibold">
                    {activeSet.size + 1} / 257
                  </div>
                </div>

                {/* shared expert bar */}
                <div className="mb-1.5 flex items-center gap-2 px-2 py-1.5 bg-butter/30 border-2 border-ink rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
                  <span className="font-mono text-[10px] text-ink/70 font-semibold">
                    shared · 永远参与
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-ink/55">
                    1
                  </span>
                </div>

                {/* 256 routed experts: 16 × 16 */}
                <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(16, minmax(0, 1fr))" }}>
                  {Array.from({ length: 256 }).map((_, id) => {
                    const on = activeSet.has(id);
                    return (
                      <div
                        key={id}
                        title={`expert #${id}`}
                        className={[
                          "aspect-square rounded-[3px] border border-ink/15 transition-all duration-200",
                          on ? "bg-coral border-ink shadow-[0_0_0_1px_#241C15]" : "bg-cream/50",
                        ].join(" ")}
                      />
                    );
                  })}
                </div>
              </div>

              {/* 双指标 */}
              <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-ink/10">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    本句激活
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-ink tabular-nums leading-none">
                      {activeSet.size + 1}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">/ 257 个专家</span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className="h-full bg-ink transition-all duration-400 ease-spring"
                      style={{ width: `${((activeSet.size + 1) / 257) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    每 token 算力
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-[28px] font-bold text-coral tabular-nums leading-none">
                      {ACTIVATED_B}
                    </span>
                    <span className="font-mono text-[11px] text-ink/55">/ {TOTAL_PARAMS_B} B</span>
                    <span className="ml-1.5 font-mono text-[11px] text-coral font-semibold">
                      5.5%
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-ink/8 rounded-full overflow-hidden border border-ink/15">
                    <div
                      className="h-full bg-coral transition-all duration-400 ease-spring"
                      style={{ width: `${(ACTIVATED_B / TOTAL_PARAMS_B) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：DeepSeek V3 Tech Report · arXiv:2412.19437v2 · 每 token 选 8 个 routed + 1 个 shared
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionLive;
