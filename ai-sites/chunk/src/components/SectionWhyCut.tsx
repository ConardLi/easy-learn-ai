import React, { useState } from "react";
import { FileStack, Search, WalletCards } from "lucide-react";
import { MiniBadge, SectionShell, cx } from "./common";

const modes = [
  {
    id: "whole",
    title: "整本塞进去",
    icon: FileStack,
    good: "实现最省事。",
    bad: "资料一长就塞不下，也会把很多无关段落带给 AI。",
  },
  {
    id: "chunk",
    title: "切块后再找",
    icon: Search,
    good: "只取相关小片段，回答更容易贴着资料。",
    bad: "切法要调。切坏了，关键限制可能丢掉，也可能把没用的段落带进来。",
  },
] as const;

const SectionWhyCut: React.FC = () => {
  const [active, setActive] = useState<(typeof modes)[number]["id"]>("chunk");
  const current = modes.find((item) => item.id === active)!;
  const Icon = current.icon;

  return (
    <SectionShell num="02" label="why split" tone="white">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="font-display text-display-lg text-ink">为什么要先切成小块？</h2>
          <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink/70">
            <p>AI 一次能看的文字有上限。这个上限可以叫聊天窗口，专业说法是 context window。</p>
            <p>文档越长，越需要先切开。搜索时只拿相关块，能少塞无关内容，也能让来源更清楚。</p>
          </div>
          <div className="mt-6 rounded-2xl border-2 border-ink bg-butter p-5 shadow-stamp">
            <div className="mb-2 flex items-center gap-2 font-display text-[18px] font-bold">
              <WalletCards className="h-5 w-5" strokeWidth={2.5} />
              一个判断
            </div>
            <p className="text-sm leading-relaxed text-ink/75">
              如果答案只需要文档里的三句话，就别让 AI 读整本手册。Chunk 要做的事，就是让系统能直接搜到那几句相关内容。
            </p>
          </div>
        </div>

        <div className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-stamp-lg">
          <div className="mb-5 flex gap-2">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActive(mode.id)}
                className={cx(
                  "flex-1 rounded-full border-2 border-ink px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] transition-all duration-250 ease-spring",
                  active === mode.id ? "bg-ink text-cream shadow-stamp" : "bg-white text-ink hover:bg-butter-tint",
                )}
              >
                {mode.title}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-[150px_1fr] sm:items-center">
            <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-[28px] border-2 border-ink bg-white shadow-stamp">
              <Icon className="h-16 w-16 text-ink" strokeWidth={2} />
            </div>
            <div>
              <MiniBadge dark>{active === "whole" ? "one big input" : "searchable pieces"}</MiniBadge>
              <h3 className="mt-4 font-display text-[25px] font-bold leading-tight text-ink">{current.title}</h3>
              <div className="mt-4 grid gap-3">
                <InfoLine label="好处" text={current.good} tone="good" />
                <InfoLine label="代价" text={current.bad} tone="bad" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const InfoLine: React.FC<{ label: string; text: string; tone: "good" | "bad" }> = ({ label, text, tone }) => (
  <div className="rounded-xl border-2 border-ink bg-white p-4">
    <span
      className={cx(
        "mb-1 inline-flex rounded-full border-2 border-ink px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]",
        tone === "good" ? "bg-butter text-ink" : "bg-coral text-cream",
      )}
    >
      {label}
    </span>
    <p className="text-sm leading-relaxed text-ink/75">{text}</p>
  </div>
);

export default SectionWhyCut;
