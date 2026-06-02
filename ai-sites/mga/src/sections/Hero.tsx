import React, { useState } from "react";
import { ChevronDown, BookOpen, GraduationCap, Mic, Newspaper, FileText, ExternalLink } from "lucide-react";

const SAMPLES = [
  {
    genre: "学术综述",
    audience: "气候科研人员",
    icon: BookOpen,
    snippet:
      "依据 IPCC AR6 综合报告，1850–2020 年间全球地表均温累计上升约 1.1 ℃，与人为温室气体强迫具有高置信关联……",
  },
  {
    genre: "亲子科普",
    audience: "8–10 岁小学生",
    icon: GraduationCap,
    snippet:
      "地球有一件叫『大气层』的薄毛衣。最近工厂的烟把毛衣织得越来越厚，热量散不出去，地球就开始出汗啦。",
  },
  {
    genre: "电台口播",
    audience: "通勤听众",
    icon: Mic,
    snippet:
      "好，下一条。地球今年又破了温度纪录，过去一百七十年我们一共把它热高了一度多——听着不多，体感差挺远。",
  },
  {
    genre: "新闻消息",
    audience: "城市白领",
    icon: Newspaper,
    snippet:
      "世界气象组织最新公报显示：全球均温距工业化前已升高 1.1 ℃，今年再次创下有观测以来年度最暖纪录。",
  },
  {
    genre: "政策简报",
    audience: "市级决策者",
    icon: FileText,
    snippet:
      "本市需在 2030 年前将单位 GDP 碳排放强度较 2020 年下降 35%，建议从交通电气化、建筑改造两端同步推进。",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const current = SAMPLES[active];
  const Icon = current.icon;

  return (
    <section className="relative px-6 md:px-12 lg:px-24 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.05fr_1fr] gap-12 md:gap-16 items-start">
        <div>
          <p className="eyebrow mb-6">
            Massive Genre-Audience（把一篇文章改写给不同读者看）· 数据重写式增强
          </p>
          <h1 className="font-display text-display-xl text-ink leading-[1.04] mb-8">
            MGA 是什么？
          </h1>

          <p className="text-2xl md:text-3xl font-display leading-snug">
            <span className="bg-butter px-2 box-decoration-clone">
              MGA 把同一篇文章，按不同读者、不同文体改写成好几份，让能拿来训练的文本成倍变多。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              从零喂海量文本、训出底层模型的那一步叫「预训练」；喂进去的那个文本库，就叫「语料」。麻烦在于：能放心拿来训大模型的干净网页和书，快不够用了 —— 业内把这道坎叫「数据墙」。
            </p>
            <p>
              那把现有的文本反复训几遍行不行？不行，同一批文本训太多遍，模型会越训越差。
            </p>
            <p>
              MGA 的办法：用一个 33 亿参数的小模型当「改写工」，给每篇原文配上五组「写给谁看 + 用什么文体」，按这些组合各重写一遍。原文一篇，干净的训练文本就多出好几篇。
            </p>
            <p className="text-ink-tertiary text-base">
              右边这五段，就是同一篇气候变化原文被 MGA 改写出来的真实样子。点一下看看。
            </p>
          </div>

          <a
            href="../pretrain/index.html"
            className="mt-7 inline-flex items-start gap-3 max-w-xl px-4 py-3 bg-butter border-2 border-ink rounded-2xl shadow-stamp hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-stamp-lg transition-all duration-250 ease-spring"
          >
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white border-2 border-ink flex items-center justify-center mt-0.5">
              <ExternalLink className="w-3.5 h-3.5 text-ink" strokeWidth={2.4} />
            </span>
            <span className="font-sans text-[13.5px] leading-[1.6] text-ink/85">
              <span className="font-bold text-ink">不清楚预训练、数据为什么会不够？</span>
              <span className="text-ink/70">
                {" "}
                base 模型从零吃的是什么数据、干净语料为什么会见底，
                <strong className="text-ink">看《预训练》那一站</strong>。
              </span>
            </span>
          </a>

          <p className="mt-7 max-w-xl text-base text-ink-secondary leading-relaxed">
            先往下看一段实验：同样的数据反复训第二遍、第三遍，模型的「考分」（loss，越低越好）为什么不降反升。
          </p>

          <div className="mt-8 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>继续往下看 ↓</span>
          </div>
        </div>

        <div className="relative">
          <div className="card-stamp p-6 md:p-7">
            <div className="flex flex-wrap gap-2 mb-5">
              {SAMPLES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono border-2 transition-all duration-250 ease-spring ${
                    i === active
                      ? "bg-ink text-butter border-ink shadow-stamp -translate-y-[1px]"
                      : "bg-white text-ink border-ink/30 hover:border-ink"
                  }`}
                >
                  v{String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-butter border-2 border-ink flex items-center justify-center">
                <Icon className="w-5 h-5 text-ink" />
              </div>
              <div className="font-mono text-xs leading-tight">
                <div className="text-ink-tertiary">体裁 · 受众</div>
                <div className="text-ink font-semibold">
                  {current.genre} → {current.audience}
                </div>
              </div>
            </div>

            <div
              key={active}
              className="text-base text-ink leading-relaxed bg-butter/20 border-l-4 border-coral pl-4 py-3 animate-enter-fade min-h-[120px]"
            >
              {current.snippet}
            </div>

            <div className="mt-5 flex items-center justify-between text-xs font-mono text-ink-tertiary">
              <span>原文：1 篇气候变化科普 · 约 600 字</span>
              <span className="text-ink font-semibold">→ 改写 5 份</span>
            </div>
          </div>

          <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-pop text-white text-xs font-mono rounded-full border-2 border-ink shadow-stamp rotate-3">
            v0{active + 1} / 05
          </div>
        </div>
      </div>
    </section>
  );
}
