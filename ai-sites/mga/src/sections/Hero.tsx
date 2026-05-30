import React, { useState } from "react";
import { ChevronDown, BookOpen, GraduationCap, Mic, Newspaper, FileText } from "lucide-react";

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
            Massive Genre-Audience · 数据重写式增强
          </p>
          <h1 className="font-display text-display-xl text-ink leading-[1.04] mb-8">
            MGA 是什么？
          </h1>

          <p className="text-2xl md:text-3xl font-display leading-snug">
            <span className="bg-butter px-2 box-decoration-clone">
              MGA 把同一篇文本按不同体裁和不同受众重写成多个版本，让训练语料成倍变多但不重复。
            </span>
          </p>

          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink-secondary max-w-xl">
            <p>
              高质量预训练语料快用完了。把同一批数据反复训练，模型会越训越差。
            </p>
            <p>
              MGA 用一个 3.3B 的小模型当「改写工」，给每篇原文配上五组「写给谁看 + 用什么文体」，按这些组合各写一遍。
            </p>
            <p className="text-ink-tertiary text-base">
              右边这五段，就是同一篇气候变化原文，被 MGA 改写出来的真实样子。点一下看看。
            </p>
          </div>

          <div className="mt-10 flex items-center gap-3 text-ink-tertiary text-sm">
            <ChevronDown className="w-4 h-4 animate-pulse-dot" />
            <span>下滚看完整故事</span>
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
