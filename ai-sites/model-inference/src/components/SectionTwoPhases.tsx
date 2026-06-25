import React, { useState } from "react";
import { BookOpenCheck, PenLine } from "lucide-react";
import { Shell, StampLink } from "./Shared";

const SectionTwoPhases: React.FC = () => {
  const [phase, setPhase] = useState<"prefill" | "decode">("prefill");
  const isPrefill = phase === "prefill";

  return (
    <Shell
      num="06"
      label="两段工作"
      title="等第一个字，和继续生成，有什么不同？"
      intro={<p>一次生成分成两段。<strong className="text-ink">Prefill</strong> 是先读完整段输入；<strong className="text-ink">Decode</strong> 是之后每轮只追加一个 Token。点两张卡切换观察。</p>}
      tone="cream"
    >
      <div className="grid md:grid-cols-2 gap-5">
        <button
          onClick={() => setPhase("prefill")}
          className={`text-left border-2 border-ink rounded-3xl p-6 transition-all duration-250 ease-spring ${isPrefill ? "bg-butter shadow-stamp-lg -translate-x-0.5 -translate-y-0.5" : "bg-white"}`}
        >
          <BookOpenCheck className="w-8 h-8" />
          <span className="block mt-4 font-mono text-[11px] tracking-widest">PREFILL · 先读完</span>
          <strong className="block mt-2 font-display text-2xl">输入越长，这段越忙</strong>
          <span className="block mt-3 text-[14px] leading-relaxed text-ink/70">模型一次处理你刚发来的全部文字。首个字迟迟没出现，常在等这段工作完成。</span>
        </button>
        <button
          onClick={() => setPhase("decode")}
          className={`text-left border-2 border-ink rounded-3xl p-6 transition-all duration-250 ease-spring ${!isPrefill ? "bg-coral shadow-stamp-lg -translate-x-0.5 -translate-y-0.5" : "bg-white"}`}
        >
          <PenLine className="w-8 h-8" />
          <span className="block mt-4 font-mono text-[11px] tracking-widest">DECODE · 接着写</span>
          <strong className="block mt-2 font-display text-2xl">每轮多写一个 Token</strong>
          <span className="block mt-3 text-[14px] leading-relaxed text-ink/70">模型反复选择下一块。回答长不长，会直接影响这段跑多少轮。</span>
        </button>
      </div>

      <div className="mt-7 bg-ink text-white border-2 border-ink rounded-[2rem] shadow-stamp-lg p-6 sm:p-8">
        <div className="grid sm:grid-cols-[160px_1fr] gap-6 items-center">
          <div className={`w-36 h-36 mx-auto rounded-full border-2 border-white flex items-center justify-center ${isPrefill ? "bg-butter text-ink" : "bg-coral text-ink"}`}>
            <span className="font-display text-3xl font-bold">{isPrefill ? "先读" : "再写"}</span>
          </div>
          <div key={phase} className="animate-enter-up">
            <h3 className="font-display text-3xl font-bold">{isPrefill ? "影响首字等待时间" : "影响后续生成速度"}</h3>
            <p className="mt-4 leading-relaxed text-white/75">
              {isPrefill
                ? "贴一份很长的文档，模型要先把它读完。即使回答只有一句，第一字也可能等更久。"
                : "回答开始出现后，你会感到它持续往外写。每秒能生成多少 Token，描述的是这段速度。"}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-7 max-w-[720px]">
        <StampLink href="../context-window/index.html" title="输入能装多少，去看 Context Window" compact>
          这里关心读和写的时间。窗口站专门讲模型一次最多能看见多少文字。
        </StampLink>
      </div>
    </Shell>
  );
};

export default SectionTwoPhases;
