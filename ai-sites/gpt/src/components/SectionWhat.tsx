/**
 * Section 01 · Hero「GPT 是什么？」
 *
 * 左 = 定义层（H1 + 一句话定义 + 白话三段 + 过渡 + 滚动提示）
 * 右 = ChatGPT 上线后 60 天用户数走廊：用户拖天数 slider，
 *      看 ChatGPT 数字不停爆涨，下方 5 个历史产品的「跑道」终点是各自破百万那天。
 *      当天数游标越过 day 5，ChatGPT 第一个亮起 ✓。
 *
 * 数据来源：
 *   ─ Sam Altman 2022-12-05 推文（5 days · 1M）
 *   ─ UBS 2023-02 报告（ChatGPT 100M MAU · 2 个月）
 *   ─ 各产品达 1M 注册用户公开数据（Netflix 41M / Facebook 10M / Spotify 150d /
 *     Instagram 75d / iPhone 74d）
 */
import React, { useMemo, useState } from "react";
import { ArrowDown, Check } from "lucide-react";

type Product = {
  name: string;
  daysTo1M: number;
  tone: string;
  textTone: string;
  note: string;
};

const PRODUCTS: Product[] = [
  { name: "ChatGPT", daysTo1M: 5, tone: "#241C15", textTone: "#F4D35E", note: "2022-12-05 · Sam Altman 推文" },
  { name: "iPhone", daysTo1M: 74, tone: "#1B4B5A", textTone: "#FBEFE3", note: "2007 · 74 天" },
  { name: "Instagram", daysTo1M: 75, tone: "#E07A5F", textTone: "#FBEFE3", note: "2010-10 · 2.5 月" },
  { name: "Spotify", daysTo1M: 150, tone: "#88837C", textTone: "#FBEFE3", note: "2008 · 5 月" },
  { name: "Facebook", daysTo1M: 300, tone: "#88837C", textTone: "#FBEFE3", note: "2004 · 10 月" },
];

const MAX_DAY = 60;

/* ChatGPT 真实增长插值锚点（百万） · 来自公开报道
 * day 0: 0 / day 5: 1.0 / day 14: 2.5 / day 30: 12 / day 45: 30 / day 60: 57 (推 100M 在 day 62) */
const ANCHORS: { d: number; m: number }[] = [
  { d: 0, m: 0 },
  { d: 1, m: 0.2 },
  { d: 5, m: 1.0 },
  { d: 14, m: 2.5 },
  { d: 30, m: 12 },
  { d: 45, m: 30 },
  { d: 60, m: 57 },
];

function chatGptUsers(day: number): number {
  for (let i = 1; i < ANCHORS.length; i++) {
    if (day <= ANCHORS[i].d) {
      const a = ANCHORS[i - 1];
      const b = ANCHORS[i];
      const t = (day - a.d) / (b.d - a.d);
      return a.m + (b.m - a.m) * t;
    }
  }
  return ANCHORS[ANCHORS.length - 1].m;
}

function fmtUsers(m: number): string {
  if (m < 1) return `${(m * 1000).toFixed(0)} 千`;
  if (m < 10) return `${m.toFixed(2)}M`;
  return `${m.toFixed(1)}M`;
}

const SectionWhat: React.FC = () => {
  const [day, setDay] = useState(5);

  const users = useMemo(() => chatGptUsers(day), [day]);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-20 lg:pb-24 overflow-hidden">
      <div aria-hidden className="absolute top-24 right-[7%] hidden lg:block animate-float-y">
        <div className="w-10 h-10 bg-coral border-2 border-ink rounded-2xl shadow-stamp rotate-12" />
      </div>
      <div aria-hidden className="absolute bottom-28 left-[5%] hidden lg:block animate-float-y-sm">
        <div className="w-8 h-8 bg-teal border-2 border-ink rounded-full shadow-stamp -rotate-6" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* 左：定义层 */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border-2 border-ink rounded-full shadow-stamp mb-7 animate-enter-pop">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-semibold">
                Generative Pre-trained Transformer · GPT
              </span>
            </div>

            <h1 className="font-display text-display-xl text-ink mb-6 animate-enter-up">
              GPT
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
                  OpenAI 从 2018 年起发布的 decoder-only 预训练语言模型系列，ChatGPT 是它的产品化。
                </span>
              </span>
            </p>

            <div className="max-w-md space-y-3 text-[15px] text-ink/75 leading-relaxed animate-enter-fade">
              <p>
                GPT 是模型家族的名字。GPT-1、GPT-2、GPT-3、GPT-4、GPT-5、o1、o3 都是这家族里的不同代。
              </p>
              <p>
                架构 8 年没换过：堆 transformer decoder 层，目标就一个 ——「猜下一个 token」。
                能力靠把模型做大、把数据做多、把训练时间拉长这三件事一起堆出来。
              </p>
              <p>
                ChatGPT 不是模型，是 2022-11-30 OpenAI 用 GPT-3.5 套了对话界面发布的产品。它捅破了那层窗户纸。
              </p>
            </div>

            <p className="mt-6 max-w-md font-sans text-[13.5px] text-ink/55 leading-relaxed animate-enter-fade">
              右边这条走廊，就是 ChatGPT 上线后 60 天。拖游标，看 5 天破百万到底有多离谱。
            </p>

            <div className="mt-9 inline-flex items-center gap-3 animate-enter-fade">
              <div className="flex items-center justify-center w-9 h-9 bg-ink text-cream rounded-full animate-float-y-sm">
                <ArrowDown className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                往下滚 · 7 个章节 · ~12 分钟
              </div>
            </div>
          </div>

          {/* 右：ChatGPT 60 天用户走廊 */}
          <div className="lg:col-span-7">
            <div className="relative bg-white border-2 border-ink rounded-3xl shadow-stamp-xl p-6 lg:p-7">
              {/* 头部：天数 + 用户数 */}
              <div className="flex items-end justify-between mb-1">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    ① ChatGPT 上线后第
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[44px] lg:text-[54px] font-bold text-ink leading-none tabular-nums">
                      {day}
                    </span>
                    <span className="font-mono text-[12px] text-ink/55">天</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-1">
                    注册用户数
                  </div>
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span
                      className={[
                        "font-display text-[34px] lg:text-[40px] font-bold leading-none tabular-nums",
                        users >= 50 ? "text-pop" : users >= 1 ? "text-coral" : "text-ink",
                      ].join(" ")}
                    >
                      {fmtUsers(users)}
                    </span>
                  </div>
                </div>
              </div>

              {/* 主 slider */}
              <div className="mt-6 mb-4">
                <input
                  type="range"
                  min={0}
                  max={MAX_DAY}
                  step={1}
                  value={day}
                  onChange={(e) => setDay(parseInt(e.target.value))}
                  className="w-full accent-coral cursor-pointer"
                  aria-label="ChatGPT 上线后天数"
                />
                <div className="flex justify-between font-mono text-[10px] text-ink/45 mt-1">
                  <span>day 0 · 2022-11-30</span>
                  <span>day 30</span>
                  <span>day 60 · 2023-01-29</span>
                </div>
              </div>

              {/* 5 条历史产品跑道 */}
              <div className="mt-6 pt-5 border-t border-ink/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/55 mb-3">
                  ② 历史产品 vs ChatGPT · 终点 = 各自第一次破 1M 用户
                </div>

                <div className="space-y-2.5">
                  {PRODUCTS.map((p) => {
                    const reached = day >= p.daysTo1M;
                    /* 进度：当前 day 在该产品 daysTo1M 的占比 */
                    const pct = Math.min(100, (day / p.daysTo1M) * 100);
                    /* 走道宽度（按 daysTo1M / 300 的相对比例，最短给 6% 留可见） */
                    const trackPct = Math.max(6, (p.daysTo1M / 300) * 100);
                    return (
                      <div key={p.name} className="flex items-center gap-3">
                        <div className="w-20 font-mono text-[11px] font-bold text-ink/85 shrink-0">
                          {p.name}
                        </div>
                        <div
                          className="relative h-7 bg-cream border-2 border-ink rounded-full overflow-hidden"
                          style={{ width: `${trackPct}%` }}
                        >
                          <div
                            className="absolute inset-y-0 left-0 transition-all duration-300 ease-spring"
                            style={{ width: `${pct}%`, backgroundColor: p.tone }}
                          />
                          {reached && (
                            <div className="absolute inset-y-0 right-1.5 flex items-center">
                              <span
                                className="inline-flex items-center justify-center w-4 h-4 rounded-full border-[1.5px] border-ink"
                                style={{ backgroundColor: p.textTone }}
                              >
                                <Check className="w-2.5 h-2.5" stroke={p.tone} strokeWidth={3.5} />
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="font-mono text-[10.5px] text-ink/55 ml-1 shrink-0">
                          {p.daysTo1M} 天
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-4 font-mono text-[10.5px] text-ink/50 leading-relaxed">
                  ChatGPT 跑道短得离谱：还没看清就到终点。Facebook 那条要等到 day 300，
                  这卡片宽度根本画不下。
                </p>
              </div>

              <p className="mt-4 font-mono text-[10px] text-ink/40">
                来源：Sam Altman 2022-12-05 推文、UBS 2023-02 估算、各产品官方公开数据
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionWhat;
