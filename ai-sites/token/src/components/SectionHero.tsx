/**
 * Section 01 · Hero
 *
 * 进站第一秒就把「Token 是什么」摆 C 位 + 把整站最核心的动作（切分）直接放手里。
 *
 * 反模板：
 *   ─ nlp 站做的是「三家 tokenizer 并排对比」→ 这里只做单家深挖（GPT-4o o200k 风格），
 *     focus 是「每个 token 长什么样、id 是几、累计多少」，不做横向对比。
 *   ─ llm 站做的是「逐字流式生成」→ 这里 token 只用来读，不演示生成。
 *
 * 启发式切分（不是真 BPE，但方向和官方比例一致）：
 *   ─ 中文：常见 2 字词（今天 / 天气 / 公司 / 模型 / 学习 / 没什么 …）会合并成 1 token，
 *     不在表里就按字切；少数高频 3 字短语（人工智能 / 大语言模型）也合并
 *   ─ 英文：≤6 字母按整词；超过按 4-5 字母切 subword，开头加 ▁ 模拟 space prefix
 *   ─ 数字：每 3 位一组（mimic GPT-4o，避免逐字符），但 ≥5 位长串会被切碎
 *   ─ 空格附在下一个 token 前（mimic Ġ）
 *   ─ 标点 / emoji / URL 每个单独成 token
 *
 * Token id 用 hash 模 199997，模拟 o200k_base 词表大小区间。
 */
import React, { useMemo, useState } from "react";
import { ArrowDown, ExternalLink } from "lucide-react";

const TONES = ["bg-butter", "bg-coral", "bg-teal", "bg-pop", "bg-ink"];
const TONE_TEXT: Record<string, string> = {
  "bg-butter": "text-ink",
  "bg-coral": "text-cream",
  "bg-teal": "text-cream",
  "bg-pop": "text-cream",
  "bg-ink": "text-cream",
};

/* 真实 GPT-4o 已经把这些常见 2-3 字组合预定义成单 token —— 参考 o200k_base 词表样本 */
const ZH_BIGRAMS = new Set([
  "今天", "天气", "明天", "昨天", "公司", "学习", "工作", "时间",
  "什么", "可以", "我们", "他们", "你们", "这个", "那个", "因为",
  "所以", "但是", "不是", "就是", "一个", "知道", "看到", "想到",
  "中国", "美国", "日本", "上海", "北京", "模型", "数据", "训练",
  "网络", "电脑", "手机", "代码", "程序", "开发", "设计", "产品",
  "朋友", "家人", "孩子", "父母", "老师", "学生", "医生", "医院",
  "周末", "假期", "晚上", "早上", "中午", "下午", "现在", "以后",
  "应该", "可能", "一定", "已经", "刚刚", "马上", "立刻", "永远",
  "喜欢", "讨厌", "需要", "希望", "觉得", "认为", "感到", "看见",
  "确实", "其实", "真的", "好像", "似乎", "终于", "突然", "竟然",
  "公园", "饭店", "餐厅", "学校", "图书", "电影", "音乐", "运动",
]);
const ZH_TRIGRAMS = new Set([
  "人工智能", // 4 chars
  "大语言模型", // 5
  "深度学习",
  "机器学习",
  "自然语言",
  "好玩",
]);

const SAMPLES = [
  {
    label: "中英混排",
    text: "今天用 GPT-5 写了一段代码，3 分钟跑通了。",
  },
  {
    label: "纯英文",
    text: "Tokenization splits text into subword pieces.",
  },
  {
    label: "数字 / 表情",
    text: "9.11 vs 9.9 谁大？我赌 🍓 一颗。",
  },
  {
    label: "代码片段",
    text: "for i in range(10):\n  print(f'token {i}')",
  },
];

type Tok = { text: string; id: number; tone: string };

/* 用文本快速 hash 出一个稳定 token id（模拟 o200k_base vocab id） */
function stableId(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) * 16777619;
    h = h >>> 0;
  }
  return h % 199997;
}

function tokenize(text: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  let pendingSpace = false;

  while (i < text.length) {
    const ch = text[i];

    if (ch === "\n") {
      out.push({ text: "\\n", id: 198, tone: TONES[2] });
      pendingSpace = false;
      i++;
      continue;
    }
    if (/\s/.test(ch)) {
      pendingSpace = true;
      i++;
      continue;
    }

    /* 中文：先试 4-char / 5-char 短语 → 3-char → 2-char → 单字 */
    if (/[\u4e00-\u9fff]/.test(ch)) {
      let matched = "";
      for (const tri of ZH_TRIGRAMS) {
        if (text.startsWith(tri, i)) {
          matched = tri;
          break;
        }
      }
      if (!matched && /[\u4e00-\u9fff]/.test(text[i + 1] || "")) {
        const bi = text.slice(i, i + 2);
        if (ZH_BIGRAMS.has(bi)) matched = bi;
      }
      if (!matched) matched = ch;
      const display = pendingSpace ? "·" + matched : matched;
      out.push({
        text: display,
        id: stableId(matched),
        tone: TONES[(out.length + 0) % TONES.length],
      });
      pendingSpace = false;
      i += matched.length;
      continue;
    }

    /* 英文字母连串：按词切，长词分块 */
    if (/[a-zA-Z]/.test(ch)) {
      let j = i;
      while (j < text.length && /[a-zA-Z]/.test(text[j])) j++;
      const word = text.slice(i, j);
      const pieces: string[] = [];
      if (word.length <= 6) {
        pieces.push(word);
      } else {
        for (let k = 0; k < word.length; k += 5) {
          pieces.push(word.slice(k, k + 5));
        }
      }
      pieces.forEach((p, idx) => {
        const display = idx === 0 && pendingSpace ? "▁" + p : p;
        out.push({
          text: display,
          id: stableId(p + idx),
          tone: TONES[(out.length + 1) % TONES.length],
        });
      });
      pendingSpace = false;
      i = j;
      continue;
    }

    /* 数字串：≤3 位整体；≥4 位按 3 位切，但 5/7/8 位会切得奇怪（mimic 真实 BPE） */
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < text.length && /[0-9]/.test(text[j])) j++;
      const num = text.slice(i, j);
      const chunks: string[] = [];
      if (num.length <= 3) {
        chunks.push(num);
      } else if (num.length === 4) {
        chunks.push(num.slice(0, 1), num.slice(1));
      } else {
        for (let k = 0; k < num.length; k += 3) {
          chunks.push(num.slice(k, k + 3));
        }
      }
      chunks.forEach((c, idx) => {
        const display = idx === 0 && pendingSpace ? "▁" + c : c;
        out.push({
          text: display,
          id: stableId("num:" + c),
          tone: TONES[(out.length + 2) % TONES.length],
        });
      });
      pendingSpace = false;
      i = j;
      continue;
    }

    /* emoji / 其它 unicode 多字节：尝试合成 1 个 token */
    const code = text.codePointAt(i) || 0;
    if (code > 0xffff) {
      out.push({
        text: text.slice(i, i + 2),
        id: stableId("emoji:" + code),
        tone: TONES[(out.length + 3) % TONES.length],
      });
      pendingSpace = false;
      i += 2;
      continue;
    }

    /* 标点 / ASCII 符号 */
    out.push({
      text: pendingSpace ? "·" + ch : ch,
      id: stableId("p:" + ch),
      tone: TONES[(out.length + 4) % TONES.length],
    });
    pendingSpace = false;
    i++;
  }

  return out;
}

const SectionHero: React.FC = () => {
  const [text, setText] = useState(SAMPLES[0].text);
  const [activeSample, setActiveSample] = useState(0);

  const tokens = useMemo(() => tokenize(text), [text]);
  const charCount = [...text].length;
  const ratio = tokens.length === 0 ? 0 : charCount / tokens.length;

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      {/* 装饰 */}
      <div
        aria-hidden
        className="absolute top-24 right-[7%] hidden lg:block animate-float-y"
      >
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div
        aria-hidden
        className="absolute bottom-32 left-[5%] hidden lg:block animate-float-y-sm"
      >
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Token · 词元
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              Token
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
                  模型读写文本的最小单位 —— 比一个字大、比一个完整英文词小的一小段（技术圈叫「子词」 / subword）。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                你打的字模型本身看不见。先被一个<strong className="text-ink">切分器</strong>切成一块一块，每块叫 token（块的英文名），再配一个数字 id。
              </p>
              <p>
                模型从头到尾只看 id 序列。所以「怎么切」直接决定模型读到的是什么。
              </p>
              <p>
                一个英文词大约 1.3 个 token，一个汉字 1-2 个，emoji 1-4 个，数字 12345 会被切成两三段。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这块是按 GPT-4o 那套切法做的演示（OpenAI 内部叫 o200k 词表，约 20 万种固定块）。
              换样例或自己打字，看每个 token 的样子、id、累计数。
            </p>

            {/* 互链卡：分锅 Token vs LLM */}
            <a
              href="../llm/index.html"
              className="mt-7 inline-flex items-start gap-3 max-w-md px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
            >
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
                <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
              </span>
              <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
                <span className="font-bold text-ink">先看 LLM 还是先看 Token？</span>
                <span className="text-ink/70">
                  {" "}
                  这站讲<strong className="text-ink">模型怎么数文字 + 怎么计费</strong>（每条都跟「切成块」有关）。
                  「大模型怎么接话、为啥这么聪明」—— 看《LLM》那一站更对位。
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
              先看几个切得很怪的边缘案例 ↓
            </p>
          </div>

          {/* 右：tokenizer 卡 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* header */}
              <div className="flex items-center justify-between mb-4">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55">
                  ① 输入 · GPT-4o 切法（o200k 词表）
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-[32px] lg:text-[36px] font-bold text-ink leading-none tabular-nums">
                    {tokens.length}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink/50">
                    tokens
                  </span>
                </div>
              </div>

              {/* 样例 chip */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {SAMPLES.map((s, i) => {
                  const on = i === activeSample;
                  return (
                    <button
                      key={s.label}
                      onClick={() => {
                        setActiveSample(i);
                        setText(s.text);
                      }}
                      className={[
                        "px-3 py-1 rounded-full border-2 border-ink font-mono text-[10.5px] font-bold transition-all duration-200 ease-spring",
                        on
                          ? "bg-ink text-cream shadow-[2px_2px_0_0_#E07A5F]"
                          : "bg-white text-ink/70 hover:bg-cream",
                      ].join(" ")}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* 输入框 */}
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value.slice(0, 240));
                  setActiveSample(-1);
                }}
                rows={2}
                spellCheck={false}
                className="w-full px-4 py-3 bg-cream border-2 border-ink rounded-xl font-mono text-[13.5px] text-ink focus:outline-none focus:bg-white resize-none leading-snug"
              />
              <div className="mt-1.5 flex items-center justify-between font-mono text-[10px] text-ink/45">
                <span>≤ 240 字符 · 简化版切法，方向跟 GPT-4o 真实切法一致</span>
                <span className="tabular-nums">{charCount} chars</span>
              </div>

              {/* token 区 */}
              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-2">
                  ② 切分结果 · 每块下面是 id
                </div>
                <div className="min-h-[140px] flex flex-wrap gap-1.5 p-4 bg-cream border-2 border-ink/15 rounded-xl">
                  {tokens.length === 0 ? (
                    <span className="font-mono text-[11px] text-ink/35">
                      没东西可切
                    </span>
                  ) : (
                    tokens.map((t, i) => (
                      <div
                        key={`${i}-${t.text}`}
                        className="inline-flex flex-col items-center"
                      >
                        <span
                          className={[
                            "inline-flex items-center px-2 py-1 rounded-md border-2 border-ink font-mono text-[12px] font-bold leading-none",
                            t.tone,
                            TONE_TEXT[t.tone] || "text-ink",
                          ].join(" ")}
                        >
                          {t.text}
                        </span>
                        <span className="mt-0.5 font-mono text-[8.5px] text-ink/40 tabular-nums">
                          {t.id}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* 底部指标 */}
              <div className="mt-5 grid grid-cols-3 gap-3 pt-4 border-t border-ink/10">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                    chars / tok
                  </div>
                  <div className="font-display text-[22px] font-bold text-ink leading-none tabular-nums">
                    {ratio.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                    估价 · GPT-5.5
                  </div>
                  <div className="font-display text-[22px] font-bold text-ink leading-none tabular-nums">
                    ${((tokens.length / 1_000_000) * 5).toFixed(6)}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/45 mb-0.5">
                    词表大小（共多少种块）
                  </div>
                  <div className="font-display text-[22px] font-bold text-ink leading-none tabular-nums">
                    199,997
                  </div>
                </div>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40 leading-relaxed">
                来源：OpenAI tiktoken o200k_base 词表 199,997 · GPT-5.5 输入 $5/M ·
                ofox.ai 2026/05
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHero;
