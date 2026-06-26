/**
 * SectionAutoQA · 从一段文档自动生出问答对（04 · L3 输入 → 预览）
 *
 * 交互：选一段示例文档（三选一），点「生成问答对」，逐条蹦出工具从这段话里「读」出来的 Q+A。
 *   让人亲眼看到「一段陈述」是怎么被翻成「一问一答」的 —— 这是整条流水线最核心的一步。
 */
import React, { useEffect, useRef, useState } from "react";
import { MessageSquare, Wand2, RotateCcw } from "lucide-react";

const DOCS = [
  {
    key: "refund",
    label: "退货政策",
    text: "本店支持 7 天无理由退货。商品需保持完好、不影响二次销售。退货运费由买家承担，质量问题除外。",
    qa: [
      { q: "你们支持退货吗？", a: "支持，本店提供 7 天无理由退货。" },
      { q: "退货对商品有什么要求？", a: "商品需保持完好、不影响二次销售。" },
      { q: "退货运费谁出？", a: "运费由买家承担，但属于质量问题的除外。" },
    ],
  },
  {
    key: "battery",
    label: "产品说明",
    text: "本机内置 5000mAh 电池，满电状态下可连续播放视频约 12 小时。支持 65W 快充，30 分钟可充至 70%。",
    qa: [
      { q: "电池容量是多少？", a: "内置 5000mAh 电池。" },
      { q: "充满电能看多久视频？", a: "满电状态下可连续播放视频约 12 小时。" },
      { q: "快充多快？", a: "支持 65W 快充，30 分钟可充至 70%。" },
    ],
  },
  {
    key: "history",
    label: "知识百科",
    text: "活字印刷术由北宋的毕昇在公元 1041 年前后发明。他用胶泥刻字，烧硬后排版印刷，大大提高了印书效率。",
    qa: [
      { q: "活字印刷术是谁发明的？", a: "由北宋的毕昇发明。" },
      { q: "活字印刷术大约发明于哪一年？", a: "公元 1041 年前后。" },
      { q: "毕昇用什么材料刻字？", a: "用胶泥刻字，烧硬后用来排版印刷。" },
    ],
  },
];

const SectionAutoQA: React.FC = () => {
  const [docKey, setDocKey] = useState("refund");
  const [shown, setShown] = useState(0); // 已蹦出几条
  const [round, setRound] = useState(0); // 每次生成 +1，用于动画重播
  const doc = DOCS.find((d) => d.key === docKey)!;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const pick = (k: string) => {
    clearTimers();
    setDocKey(k);
    setShown(0);
  };
  const clear = () => {
    clearTimers();
    setShown(0);
  };
  const gen = () => {
    clearTimers();
    setShown(0);
    setRound((r) => r + 1);
    doc.qa.forEach((_, i) => {
      timers.current.push(setTimeout(() => setShown(i + 1), (i + 1) * 380));
    });
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10 bg-butter/20">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">04</span>
          <span className="section-anchor-label">Doc → Q&amp;A</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          核心一步：一段话，自动变成几问几答
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          整条流水线最关键的，就是这一步。挑一段文档，点「生成问答对」，
          看工具怎么从这段陈述里「读」出问题、再配上答案。
        </p>

        {/* 选文档 */}
        <div className="mt-9 flex flex-wrap gap-3">
          {DOCS.map((d) => {
            const on = d.key === docKey;
            return (
              <button
                key={d.key}
                onClick={() => pick(d.key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "bg-teal text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
              >
                {d.label}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 输入：文档段落 */}
          <div className="lg:col-span-5">
            <div className="card-stamp p-6 h-full flex flex-col">
              <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50 mb-3">
                输入 · 一段文档
              </div>
              <div className="flex-1 rounded-2xl border-2 border-ink bg-cream/70 p-5">
                <p className="font-serif text-[16px] leading-[1.85] text-ink/85">{doc.text}</p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button onClick={gen} className="btn-stamp bg-teal text-cream">
                  <Wand2 className="w-4 h-4" strokeWidth={2.4} />
                  生成问答对
                </button>
                <button onClick={clear} className="btn-stamp bg-cream text-ink">
                  <RotateCcw className="w-4 h-4" strokeWidth={2.4} />
                  清空
                </button>
              </div>
            </div>
          </div>

          {/* 输出：问答对 */}
          <div className="lg:col-span-7">
            <div className="card-stamp p-6 h-full">
              <div className="flex items-center justify-between mb-3">
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/50">
                  输出 · 自动生成的问答对
                </div>
                <div className="font-mono text-[10px] text-ink/45">{shown} / {doc.qa.length} 条</div>
              </div>

              {shown === 0 ? (
                <div className="flex h-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-ink/30">
                  <p className="font-sans text-[14px] text-ink/45">点左边「生成问答对」，结果会逐条蹦出来 →</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {doc.qa.slice(0, shown).map((qa, i) => (
                    <div key={`${round}-${i}`} className="rounded-2xl border-2 border-ink bg-white p-4 animate-enter-pop">
                      <div className="flex items-start gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-pop">
                          <MessageSquare className="h-3 w-3 text-cream" strokeWidth={2.5} />
                        </span>
                        <p className="font-display font-bold text-[15.5px] text-ink leading-snug pt-0.5">Q：{qa.q}</p>
                      </div>
                      <p className="mt-2 ml-8 font-sans text-[14.5px] leading-[1.7] text-ink/80">A：{qa.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-7 bg-ink text-cream rounded-2xl px-6 py-5 max-w-[860px]">
          <p className="font-display font-bold text-[16.5px] leading-[1.6]">
            一段几十字的陈述，就能拆出三四条问答。一整本手册跑下来，自动攒出几千上万条 —— 这就是工具帮你省的力气。
          </p>
        </div>
      </div>
    </section>
  );
};

export default SectionAutoQA;
