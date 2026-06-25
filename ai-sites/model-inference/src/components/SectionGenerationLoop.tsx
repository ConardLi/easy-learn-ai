import React, { useState } from "react";
import { CornerDownLeft, RotateCcw, StepForward } from "lucide-react";
import { Shell } from "./Shared";

const answer = ["今天", "身体", "不太", "舒服", "，", "想", "请假", "一天", "。"];

const SectionGenerationLoop: React.FC = () => {
  const [count, setCount] = useState(0);
  const done = count === answer.length;

  return (
    <Shell
      num="04"
      label="生成循环"
      title="回答为什么一个接一个地出现？"
      intro={<p>选出的 Token 会接回原文末尾。模型重新查看“输入 + 已写回答”，再选下一块。这个循环一直跑到回答结束。</p>}
      tone="white"
    >
      <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-7">
        <div className="card-stamp p-5 sm:p-7 overflow-hidden">
          <div className="font-mono text-[11px] tracking-widest text-ink/50">当前模型能看见的文字</div>
          <div className="mt-5 bg-cream border-2 border-ink rounded-2xl p-5 min-h-[150px] leading-loose">
            <span className="text-ink/55">帮我写一句请假消息　</span>
            {answer.slice(0, count).map((token, index) => (
              <span key={`${token}-${index}`} className="inline-block bg-butter border border-ink rounded-md px-1.5 py-0.5 mx-0.5 animate-enter-pop">{token}</span>
            ))}
            {!done && <span className="inline-block w-2 h-6 bg-coral align-middle ml-1 animate-pulse-dot" />}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="btn-stamp bg-ink text-white" onClick={() => setCount(Math.min(answer.length, count + 1))} disabled={done}>
              <StepForward className="w-4 h-4" /> 生成下一块
            </button>
            <button className="btn-stamp bg-coral" onClick={() => setCount(0)}>
              <RotateCcw className="w-4 h-4" /> 重来
            </button>
          </div>
        </div>

        <div className="bg-teal text-white border-2 border-ink rounded-[2rem] shadow-stamp-lg p-6">
          <div className="w-14 h-14 rounded-2xl bg-butter text-ink border-2 border-ink flex items-center justify-center">
            <CornerDownLeft className="w-7 h-7" />
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold">第 {Math.min(count + 1, answer.length)} 轮</h3>
          <p className="mt-3 leading-relaxed text-white/78">
            {done
              ? "模型选中了结束信号，这次生成停下。你看到的是完整回答。"
              : `前面已经写了 ${count} 个 Token。下一轮会把它们一起读进去，再决定后面接什么。`}
          </p>
          <div className="mt-7 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white text-ink border-2 border-ink rounded-xl p-3"><strong className="block text-xl">{count}</strong><span className="text-[10px]">已输出</span></div>
            <div className="bg-butter text-ink border-2 border-ink rounded-xl p-3"><strong className="block text-xl">{answer.length - count}</strong><span className="text-[10px]">还剩</span></div>
            <div className="bg-coral text-ink border-2 border-ink rounded-xl p-3"><strong className="block text-xl">{done ? "停" : "跑"}</strong><span className="text-[10px]">循环</span></div>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default SectionGenerationLoop;
