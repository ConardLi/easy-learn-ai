/**
 * Section 02 · 切分的边缘案例
 *
 * 反直觉钩子放这里：「为什么模型数不出 strawberry 里有几个 r」+「为什么模型说 9.11 > 9.9」。
 * 6 张翻面卡，每张点一下从「token 切法」翻到「为什么这样切 / 后果」。
 *
 * 反相邻：Hero 用 textarea + chip。这里改成 flip card grid（点击翻面），交互形态完全不同。
 *
 * 数据来源：
 *   ─ strawberry → ["str", "aw", "berry"] 是 cl100k_base 经典样本（OpenAI Tokenizer 在线工具实测）
 *   ─ 9.11 / 9.9 → arxiv lucven.com 2024-08 / "How Tokenization Murders Math"
 *   ─ emoji 🍓 → o200k_base 把它当 4 个 byte（pre-BPE）合成 1-2 token
 *   ─ URL → token 数据自 tiktoken / agentwiki.org tokenizer_comparison
 *   ─ 中英混 → wildandfreetools.com 2026
 */
import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

type EdgeCase = {
  key: string;
  title: string;
  /* 正面：切分演示 */
  pieces: { text: string; tone: string }[];
  /* 正面下方一行 caption */
  caption: string;
  /* 翻面：为什么 + 后果 */
  why: string;
  consequence: string;
  source: string;
};

const T = {
  butter: "bg-butter text-ink",
  coral: "bg-coral text-cream",
  teal: "bg-teal text-cream",
  pop: "bg-pop text-cream",
  ink: "bg-ink text-cream",
  cream: "bg-white text-ink",
};

const CASES: EdgeCase[] = [
  {
    key: "strawberry",
    title: "strawberry",
    pieces: [
      { text: "str", tone: T.butter },
      { text: "aw", tone: T.coral },
      { text: "berry", tone: T.teal },
    ],
    caption: "3 个 token · 字母全藏在里面",
    why: "BPE 把高频组合压成一个 token。模型只看见 「str」「aw」「berry」 这三个数字 id，看不见 r 是哪个字母、出现了几次。",
    consequence: "所以 LLM 数不出 strawberry 里有几个 r —— 除非它在训练里恰好背过这个答案，或者调工具去算。",
    source: "OpenAI Tokenizer · cl100k_base 实测",
  },
  {
    key: "nine-eleven",
    title: "9.11 vs 9.9",
    pieces: [
      { text: "9", tone: T.cream },
      { text: ".", tone: T.cream },
      { text: "11", tone: T.coral },
      { text: " <", tone: T.cream },
      { text: " 9", tone: T.cream },
      { text: ".", tone: T.cream },
      { text: "9", tone: T.teal },
      { text: "?", tone: T.cream },
    ],
    caption: ".11 和 .9 是两个不同 token",
    why: "模型比的不是数值，是它见过的 token 顺序。在文本里 11 跟在数字后面比 9 出现得多得多 —— 版本号、时间、章节号都这么写。",
    consequence: "GPT-4 / Claude 3 一度集体翻车，说 9.11 > 9.9。现在主流模型靠 chain-of-thought 或 code interpreter 修这个洞。",
    source: "lucven.com Tokenization Math 2024 · OpenAI o1 release notes",
  },
  {
    key: "number",
    title: "1234567",
    pieces: [
      { text: "12", tone: T.butter },
      { text: "345", tone: T.coral },
      { text: "67", tone: T.teal },
    ],
    caption: "7 位数 → 3 段 · 不是一个数",
    why: "tiktoken 默认把 3 位以下数字合并、4 位以上切碎。「12」「345」「67」对模型来说是三个不相关的 id，没有 12 × 10⁵ 的概念。",
    consequence: "做 5 位以上的加减乘除时，模型必须靠工具或 code 来算 —— 直接让它心算只能猜。",
    source: "tiktoken o200k_base 实测 · GPT-4o tokenizer playground",
  },
  {
    key: "emoji",
    title: "🍓 🤖 👨‍👩‍👧",
    pieces: [
      { text: "🍓", tone: T.pop },
      { text: " 🤖", tone: T.pop },
      { text: " 👨", tone: T.coral },
      { text: "‍", tone: T.cream },
      { text: "👩", tone: T.coral },
      { text: "‍", tone: T.cream },
      { text: "👧", tone: T.coral },
    ],
    caption: "全家福 emoji = 7 个 token",
    why: "单 emoji 是 4 字节 unicode → 1-2 token。带 ZWJ 拼出来的「全家福 / 各种肤色」是好几个 emoji + 连接符拼起来的，会被切得很碎。",
    consequence: "聊天 app 加了一堆复合 emoji，账单按 token 算可能涨 3-5×。多模态客服 prompt 尤其要注意。",
    source: "o200k_base byte-level BPE · arXiv 2406.11214 GPT-4o tokenizer bias",
  },
  {
    key: "url",
    title: "https://api.openai.com/v1/chat",
    pieces: [
      { text: "https", tone: T.ink },
      { text: "://", tone: T.cream },
      { text: "api", tone: T.butter },
      { text: ".", tone: T.cream },
      { text: "openai", tone: T.teal },
      { text: ".com", tone: T.cream },
      { text: "/v", tone: T.cream },
      { text: "1", tone: T.coral },
      { text: "/chat", tone: T.cream },
    ],
    caption: "9 个 token · 比看起来贵",
    why: "URL 里斜杠、点、字母数字混在一起，几乎每段都跨 token 边界。哪怕 openai.com 这种高频域名也会被切成「openai」+「.com」两段。",
    consequence: "RAG 喂了一堆 URL 进 prompt 时，token 数会爆 —— 同样篇幅可能比纯文档贵 1.5 倍以上。",
    source: "tiktoken 实测 · OpenAI Cookbook 2025 prompt cost guide",
  },
  {
    key: "mixed",
    title: "我用 PyTorch 写 transformer",
    pieces: [
      { text: "我", tone: T.cream },
      { text: "用", tone: T.cream },
      { text: " Py", tone: T.coral },
      { text: "Torch", tone: T.coral },
      { text: " 写", tone: T.cream },
      { text: " trans", tone: T.teal },
      { text: "former", tone: T.teal },
    ],
    caption: "7 token · 中英切换处最碎",
    why: "中文 → 英文交界没有空格规则，tokenizer 会把混合处切得不稳定。同一段话换个字、加个空格就变成完全不同的切法。",
    consequence: "中英混排的 prompt 不要逐字优化 token 数 —— 改一个字可能省 1 个 token，也可能多 3 个，不可预测。",
    source: "GPT-4o playground 实测 · wildandfreetools.com 2026",
  },
];

const SectionEdges: React.FC = () => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  const [customInput, setCustomInput] = useState("");

  const toggle = (k: string) =>
    setFlipped((f) => ({ ...f, [k]: !f[k] }));
  const reset = () => setFlipped({});

  /* 用户自己输的「难切词」演示：按上面卡片同样的启发式做切分 */
  const customTokens = customInput
    ? quickSplit(customInput).map((t, i) => ({
        text: t,
        tone: [T.butter, T.coral, T.teal, T.pop, T.ink, T.cream][i % 6],
      }))
    : [];

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-24 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">§ 02</span>
          <span className="section-anchor-label">edge · 切到奇怪的地方</span>
        </div>
        <h2 className="font-display text-display-lg text-ink mb-4 max-w-3xl">
          <span className="relative inline-block">
            <span
              className="absolute left-0 right-0 bottom-1 h-3 lg:h-4 bg-butter -z-0"
              aria-hidden
            />
            <span className="relative z-10">为什么模型数不出 strawberry 里有几个 r？</span>
          </span>
        </h2>
        <p className="font-sans text-[15px] text-ink/65 max-w-2xl mb-10">
          因为它根本没看见字母。它看见的是 <code className="font-mono text-[13px] bg-white px-1.5 py-0.5 border border-ink/20 rounded">str + aw + berry</code> 三个号码。
          下面 6 张卡，点一下翻过来看「这样切的代价」。
        </p>

        {/* 翻面卡 grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map((c) => {
            const f = !!flipped[c.key];
            return (
              <button
                key={c.key}
                onClick={() => toggle(c.key)}
                className="text-left bg-white border-2 border-ink rounded-3xl shadow-stamp hover:shadow-stamp-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 ease-spring p-5 min-h-[230px] flex flex-col"
              >
                {/* 顶部：标题 + 翻面提示 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/45">
                    {f ? "为什么" : "切法"}
                  </div>
                  <div
                    className={[
                      "w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center font-mono text-[10px] font-bold transition-colors",
                      f ? "bg-ink text-cream" : "bg-cream text-ink",
                    ].join(" ")}
                  >
                    {f ? "←" : "?"}
                  </div>
                </div>

                {!f ? (
                  <>
                    <div className="font-display text-[20px] font-bold text-ink leading-tight mb-3 break-all">
                      {c.title}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3 min-h-[60px]">
                      {c.pieces.map((p, i) => (
                        <span
                          key={i}
                          className={[
                            "inline-flex items-center px-2 py-1 rounded-md border-2 border-ink font-mono text-[11px] font-bold leading-none",
                            p.tone,
                          ].join(" ")}
                        >
                          {p.text || "·"}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto font-mono text-[10.5px] text-ink/55 leading-snug">
                      {c.caption}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-display text-[15px] font-bold text-ink leading-snug mb-2">
                      {c.title}
                    </div>
                    <p className="font-sans text-[13px] text-ink/80 leading-relaxed mb-3">
                      {c.why}
                    </p>
                    <p className="font-sans text-[13px] text-ink leading-relaxed mb-auto">
                      <strong>后果：</strong>
                      {c.consequence}
                    </p>
                    <p className="mt-3 font-mono text-[9.5px] text-ink/40">
                      {c.source}
                    </p>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* 自己试 · 输入栏 */}
        <div className="mt-10 bg-white border-2 border-ink rounded-3xl shadow-stamp p-5 lg:p-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                自己试一个难切词
              </div>
              <div className="font-display text-[18px] font-bold text-ink">
                输点东西，看它会切成几段
              </div>
            </div>
            <button
              onClick={() => {
                setCustomInput("");
                reset();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cream border-2 border-ink rounded-full font-mono text-[10.5px] font-bold text-ink hover:bg-butter transition-colors"
            >
              <RotateCcw className="w-3 h-3" strokeWidth={2.5} />
              全部翻回去
            </button>
          </div>
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value.slice(0, 80))}
            placeholder="例如：unbelievable / pneumonoultramicroscopicsilicovolcanoconiosis / 双十一"
            className="w-full px-4 py-3 bg-cream border-2 border-ink rounded-xl font-mono text-[13px] text-ink focus:outline-none focus:bg-white"
          />
          <div className="mt-3 flex flex-wrap gap-1.5 min-h-[40px] items-center">
            {customTokens.length === 0 ? (
              <span className="font-mono text-[11px] text-ink/35">
                ↑ 试试 unbelievable / asdjkfh / 1234567890
              </span>
            ) : (
              <>
                {customTokens.map((t, i) => (
                  <span
                    key={i}
                    className={[
                      "inline-flex items-center px-2 py-1 rounded-md border-2 border-ink font-mono text-[12px] font-bold leading-none",
                      t.tone,
                    ].join(" ")}
                  >
                    {t.text}
                  </span>
                ))}
                <span className="ml-2 font-mono text-[11px] text-ink/55 tabular-nums">
                  → {customTokens.length} tokens
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* 简化切分：英文按 5 字符块、数字按 3 位块、其它单字 */
function quickSplit(s: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const ch = s[i];
    if (/\s/.test(ch)) {
      i++;
      continue;
    }
    if (/[a-zA-Z]/.test(ch)) {
      let j = i;
      while (j < s.length && /[a-zA-Z]/.test(s[j])) j++;
      const w = s.slice(i, j);
      if (w.length <= 6) out.push(w);
      else {
        for (let k = 0; k < w.length; k += 5) out.push(w.slice(k, k + 5));
      }
      i = j;
      continue;
    }
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < s.length && /[0-9]/.test(s[j])) j++;
      const n = s.slice(i, j);
      if (n.length <= 3) out.push(n);
      else {
        for (let k = 0; k < n.length; k += 3) out.push(n.slice(k, k + 3));
      }
      i = j;
      continue;
    }
    out.push(ch);
    i++;
  }
  return out;
}

export default SectionEdges;
