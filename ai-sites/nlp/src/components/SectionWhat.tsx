/**
 * Section 01 · Hero「NLP 是什么？」
 *
 * 反模板要点：
 *   ─ 直接「XXX 是什么？」 H1 + 一句话定义（陈述句、零比喻）
 *   ─ 右边一张 live 卡：输入框 → 切成 token 块 → 三个 token 的向量条 预览
 *     这就是 NLP 整个动作的浓缩 —— 字 → 数 → 向量
 *   ─ 不放任何模块导览之类的话
 */
import React, { useMemo, useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const DEFAULT_TEXT = "今天的天气真好";

/* 把一段中英文简化分词：中文按字、英文按词，标点单独成 token。
   这不是真实 BPE，但作为 hero「字 → 数」直觉够用了。 */
function naiveTokenize(text: string): string[] {
  const tokens: string[] = [];
  let buf = "";
  const flush = () => {
    if (buf) tokens.push(buf);
    buf = "";
  };
  for (const ch of text) {
    if (/\s/.test(ch)) {
      flush();
      continue;
    }
    if (/[\u4e00-\u9fff]/.test(ch) || /[。，！？、,.!?]/.test(ch)) {
      flush();
      tokens.push(ch);
      continue;
    }
    buf += ch;
  }
  flush();
  return tokens;
}

/* 给一个 token 算一个看起来稳定的「向量」 —— 真实 embedding 当然不这么算，
   但是给用户「不同 token → 不同数列」的直觉是对的。 */
function fakeVector(token: string, dim = 6): number[] {
  let seed = 0;
  for (const ch of token) seed = (seed * 131 + ch.charCodeAt(0)) % 99991;
  const out: number[] = [];
  for (let i = 0; i < dim; i++) {
    seed = (seed * 16807 + i * 311) % 2147483647;
    out.push((seed / 2147483647) * 2 - 1);
  }
  return out;
}

/* 给 token 算一个稳定的色调（butter / coral / teal / cream / ink soft） */
function tokenTone(token: string): string {
  const palette = [
    "bg-butter text-ink",
    "bg-cream text-ink",
    "bg-coral/85 text-cream",
    "bg-teal text-cream",
    "bg-white text-ink",
  ];
  let seed = 0;
  for (const ch of token) seed = (seed * 31 + ch.charCodeAt(0)) % 9973;
  return palette[seed % palette.length];
}

const SectionWhat: React.FC = () => {
  const [text, setText] = useState(DEFAULT_TEXT);

  const tokens = useMemo(() => naiveTokenize(text).slice(0, 36), [text]);
  const vecPreview = useMemo(
    () => tokens.slice(0, 3).map((t) => ({ t, v: fakeVector(t) })),
    [tokens],
  );

  const charCount = [...text].length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 浮动装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[7%] hidden lg:block animate-float-y"
      >
        <div className="w-12 h-12 bg-butter border-2 border-ink rounded-2xl shadow-stamp rotate-6 flex items-center justify-center font-mono text-[10px] font-bold text-ink">
          A→1
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-24 left-[6%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* 左：定义层 */}
          <div className="lg:col-span-5 lg:pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Natural Language Processing · 自然语言处理
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              自然语言处理
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
                  让计算机处理人类语言的一套技术 —— 从读懂、分类、翻译，到生成回答。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                计算机本来只会算数字。你写的每一句话，对它来说就是一串字符，没法直接拿来算。
              </p>
              <p>
                NLP
                干的就是中间这一道工序：先把字切成块，再把每个块变成一串数字，让一种叫
                <strong className="text-ink">神经网络</strong>
                （模仿大脑结构的计算模型）去算，最后输出一段译文、一个分类，或者一段新写的话。
              </p>
              <p>
                <strong className="text-ink">
                  60 年里这道工序换过 4 次方法：手写规则 → 概率统计 → 神经网络 → 现在主要靠大模型。
                </strong>
                §02 会讲怎么一路换过来的。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这张卡，就是 NLP
              的核心动作。把任何一句话输进去，看它怎么被切、怎么变成数字。
            </p>

            {/* 互链卡 A：先看 LLM 还是先看 NLP */}
            <a
              href="../llm/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">先看 LLM 还是先看 NLP？</span>
                <span className="text-ink/70">
                  {" "}
                  这站讲<strong className="text-ink">这门学科 70 年都在干什么</strong>（怎么把字变成数字、再交给模型算出来）。
                  「ChatGPT 这类大模型到底是什么」—— 先看《LLM》那一站更顺。
                </span>
              </span>
            </a>

            {/* 互链卡 B：想深挖切分 → token 站 */}
            <a
              href="../token/index.html"
              className="mt-3 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">想深挖切分？</span>
                <span className="text-ink/70">
                  {" "}
                  这站 §03 只带过三家切法概览。具体「字怎么切、为啥切怪、按 token 怎么计费」—— 去《Token》那一站。
                </span>
              </span>
            </a>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                继续往下看
              </div>
            </div>
            <p className="mt-3 max-w-md font-serif italic text-[13.5px] text-ink/55 leading-relaxed">
              先看这道工序 70 年换了哪 4 种方法 ↓
            </p>
          </div>

          {/* 右：live tokenize 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* ① 输入 */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ① 你输入一句话
                  </div>
                  <div className="font-mono text-[10px] text-ink/40 tabular-nums">
                    {charCount} 字符
                  </div>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, 80))}
                  rows={2}
                  spellCheck={false}
                  className="w-full px-4 py-3 bg-cream border-2 border-ink rounded-xl font-sans text-[16px] text-ink placeholder:text-ink/30 focus:outline-none focus:bg-white resize-none leading-snug"
                  placeholder="输点中文或英文都行"
                />
              </div>

              {/* ② tokens */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                    ② 每一块叫 token（token = 模型读写的最小文字块）
                  </div>
                  <div className="font-mono text-[10px] text-ink/40 tabular-nums">
                    {tokens.length} tokens
                  </div>
                </div>
                <div className="min-h-[60px] flex flex-wrap gap-1.5 p-3 bg-cream border-2 border-ink/15 rounded-xl">
                  {tokens.length === 0 && (
                    <span className="font-mono text-[12px] text-ink/35">
                      输点东西看看
                    </span>
                  )}
                  {tokens.map((t, i) => (
                    <span
                      key={`${i}-${t}`}
                      className={[
                        "inline-flex items-center px-2 py-1 rounded-md border-2 border-ink font-mono text-[12px] font-semibold shadow-[2px_2px_0_0_#241C15] animate-enter-pop",
                        tokenTone(t),
                      ].join(" ")}
                      style={{ animationDelay: `${i * 18}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ③ vector 预览 */}
              <div className="pt-5 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  ③ 每个 token 再被换成一串数字（embedding = 模型理解意思的数字向量，§04 会讲；这里只画前 3 个 token 的 6 维示意）
                </div>
                {vecPreview.length === 0 ? (
                  <div className="py-4 text-center font-mono text-[11px] text-ink/35">
                    输入框是空的
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {vecPreview.map(({ t, v }, idx) => (
                      <div
                        key={`${idx}-${t}`}
                        className="grid grid-cols-[80px_1fr] gap-3 items-center"
                      >
                        <div
                          className={[
                            "px-2 py-1 rounded-md border-2 border-ink font-mono text-[12px] font-semibold text-center truncate",
                            tokenTone(t),
                          ].join(" ")}
                          title={t}
                        >
                          {t}
                        </div>
                        <div className="grid grid-cols-6 gap-1">
                          {v.map((val, j) => {
                            const h = Math.abs(val) * 22 + 4;
                            const pos = val >= 0;
                            return (
                              <div
                                key={j}
                                className="flex items-center justify-center h-[28px] bg-cream border border-ink/30 rounded"
                                title={val.toFixed(3)}
                              >
                                <div
                                  className={[
                                    "w-3 rounded-sm transition-all duration-300 ease-spring",
                                    pos ? "bg-ink" : "bg-coral",
                                  ].join(" ")}
                                  style={{ height: `${h}px` }}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-3 font-mono text-[10px] text-ink/40">
                  真实 embedding 是 768–3072 维，每个 token 各得一串。这里画 6
                  维只是给眼睛看。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhat;
