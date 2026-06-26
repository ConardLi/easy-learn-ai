/**
 * SectionQuality · 标注质量怎么保证（L2 切换三种把关手段）
 *
 * 交互：pill 切「多人交叉 / 一致性检查 / 抽检复核」，看每种手段在干嘛 + 一个小例子。
 */
import React, { useState } from "react";
import { Users, GitCompare, ClipboardCheck } from "lucide-react";

type Key = "cross" | "consistency" | "spot";

const WAYS: Record<
  Key,
  { title: string; icon: React.ElementType; what: string; example: string }
> = {
  cross: {
    title: "多人交叉标",
    icon: Users,
    what: "同一条数据让好几个人各标一遍，而不是一个人说了算。",
    example: "一句模棱两可的评论，3 个人有 2 个标「负面」，就按多数定。",
  },
  consistency: {
    title: "一致性检查",
    icon: GitCompare,
    what: "看大家标得一不一致。老是各标各的，说明标注规则太模糊，得先把规则讲清楚。",
    example: "如果一道题 10 个人标出 6 种答案，先别急着用，回去改标注指南。",
  },
  spot: {
    title: "抽检复核",
    icon: ClipboardCheck,
    what: "标完后，由资深的人随机抽一批重新核对，估算整批数据的错误率。",
    example: "抽 100 条复核，发现 5 条标错，就知道这批大概有 5% 不靠谱，决定要不要返工。",
  },
};

const ORDER: Key[] = ["cross", "consistency", "spot"];

const SectionQuality: React.FC = () => {
  const [active, setActive] = useState<Key>("cross");
  const w = WAYS[active];
  const Icon = w.icon;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 lg:py-24 border-t-2 border-ink/10">
      <div className="max-w-[1140px] mx-auto">
        <div className="section-anchor">
          <span className="section-anchor-num">06</span>
          <span className="section-anchor-label">Keep It Honest</span>
        </div>

        <h2 className="font-display font-extrabold text-display-lg text-ink max-w-[820px] leading-[1.12]">
          标得快没用，得标得准
        </h2>
        <p className="mt-5 font-sans text-[17px] leading-[1.75] text-ink/80 max-w-[720px]">
          标注是人做的，人会累、会走神、会理解不一样。所以要有几套办法盯着质量，
          别让标错的数据混进去。点开看三种常用手段。
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          {ORDER.map((key) => {
            const on = key === active;
            return (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={[
                  "px-5 py-2.5 rounded-full border-2 border-ink font-semibold text-[15px] transition-all duration-250 ease-spring",
                  on ? "bg-pop text-cream shadow-stamp -translate-y-0.5" : "bg-cream text-ink/60 hover:text-ink",
                ].join(" ")}
              >
                {WAYS[key].title}
              </button>
            );
          })}
        </div>

        <div key={active} className="mt-7 animate-enter-fade card-stamp p-7 max-w-[860px]">
          <div className="flex items-center gap-3 mb-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-butter">
              <Icon className="h-5 w-5 text-ink" strokeWidth={2.2} />
            </span>
            <h3 className="font-display font-extrabold text-[22px] text-ink">{w.title}</h3>
          </div>
          <p className="font-sans text-[16.5px] leading-[1.8] text-ink/85">{w.what}</p>
          <div className="mt-4 bg-cream border-2 border-ink rounded-2xl px-5 py-4">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink/45">举个例子</span>
            <p className="mt-1.5 font-sans text-[15px] leading-[1.7] text-ink/85">{w.example}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionQuality;
